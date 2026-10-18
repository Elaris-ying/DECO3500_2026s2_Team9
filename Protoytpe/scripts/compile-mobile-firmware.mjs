import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// 用本机真实 Nano ESP32 SDK 和 Arduino IDE 已编译的同配置核心/库重新链接。
// 只生成本地 .o/.elf/.bin，不打开串口，不上传、不擦除，也不修改 Arduino 缓存。
const root = fileURLToPath(new URL('..', import.meta.url));
const option = (name, fallback) => {
  const index = process.argv.indexOf(name);
  if (index < 0) return fallback;
  assert.ok(process.argv[index + 1], `${name} 缺少路径`);
  return path.resolve(process.argv[index + 1]);
};
const localAppData = process.env.LOCALAPPDATA || 'C:/Users/yf/AppData/Local';
const platform = option('--platform', path.join(localAppData, 'Arduino15/packages/arduino/hardware/esp32/2.0.18-arduino.5'));
const toolchain = option('--toolchain', path.join(localAppData, 'Arduino15/packages/esp32/tools/s3-gcc/2021r2-p5/bin'));
const imageTool = option('--esptool', path.join(localAppData, 'Arduino15/packages/esp32/tools/esptool_py/4.5.1/esptool.exe'));
const outputRoot = option('--output', path.join(root, '.firmware-build'));
const source = path.join(root, 'firmware/gallery_echoes_wifi/gallery_echoes_wifi.ino');
const assetHeader = path.join(path.dirname(source), 'mobile_assets.h');
const maximumSize = 3145728;
const compiler = path.join(toolchain, 'xtensa-esp32s3-elf-g++.exe');
const sizeTool = path.join(toolchain, 'xtensa-esp32s3-elf-size.exe');
const expectedFqbn = 'arduino:esp32:nano_nora:USBMode=default,PartitionScheme=default,PinNumbers=default';
const fingerprint = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const normalize = value => value.replaceAll('\\', '/').toLowerCase();
for (const file of [source, assetHeader, compiler, sizeTool, imageTool, path.join(platform, 'platform.txt')]) {
  assert.ok(fs.existsSync(file), `缺少 ${file}；先生成手机资源，并安装 Arduino ESP32 Boards 2.x`);
}

const cacheBase = path.join(process.env.TEMP || path.join(localAppData, 'Temp'), 'arduino/sketches');
const requestedCache = option('--cache', null);
const cacheCandidates = requestedCache ? [requestedCache] : fs.existsSync(cacheBase)
  ? fs.readdirSync(cacheBase, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => path.join(cacheBase, entry.name))
  : [];
const caches = cacheCandidates.map(directory => {
  try {
    const options = JSON.parse(fs.readFileSync(path.join(directory, 'build.options.json'), 'utf8'));
    const commands = JSON.parse(fs.readFileSync(path.join(directory, 'compile_commands.json'), 'utf8'));
    const command = commands.find(item => item.file?.endsWith('.ino.cpp'));
    if (options.fqbn !== expectedFqbn || !command || !command.arguments.some(argument => normalize(argument).includes(normalize(platform)))) return null;
    return { directory, options, command, modified: fs.statSync(path.join(directory, 'core/core.a')).mtimeMs };
  } catch { return null; }
}).filter(Boolean).sort((a, b) => b.modified - a.modified);
assert.ok(caches.length, '找不到同 SDK、默认分区/引脚/USB 配置的 Nano ESP32 完整编译缓存；先在 Arduino IDE 验证一次，再指定 --cache <目录>。');
const cache = caches[0];
const archive = path.join(cache.directory, 'core/core.a');
// Arduino IDE 将板级 variant 对象单独链接，并不放入通用 core.a。
// 保留真实引脚映射与 Nano 的双击复位/恢复初始化，不能只链接核心归档。
const variantObjects = ['dfu_callbacks.cpp.o', 'double_tap.c.o', 'io_pin_remap.cpp.o', 'variant.cpp.o'].map(name => path.join(cache.directory, 'core', name));
for (const object of variantObjects) assert.ok(fs.existsSync(object), `缺少真实 Nano variant 对象 ${object}`);
for (const name of ['build_opt.h', 'file_opts']) {
  const file = path.join(cache.directory, name);
  assert.equal(fs.readFileSync(file, 'utf8').trim(), '', `缓存 ${name} 含额外构建选项，不能保证与此验证配置一致`);
}

const properties = Object.fromEntries(fs.readFileSync(path.join(platform, 'platform.txt'), 'utf8').split(/\r?\n/)
  .filter(line => line && !line.startsWith('#') && line.includes('='))
  .map(line => [line.slice(0, line.indexOf('=')), line.slice(line.indexOf('=') + 1)]));
const sdk = path.join(platform, 'tools/sdk/esp32s3');
const splitFlags = value => [...value.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map(match => match[1] ?? match[2] ?? match[3]);
const listObjects = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const filename = path.join(directory, entry.name);
  return entry.isDirectory() ? listObjects(filename) : entry.name.endsWith('.o') ? [filename] : [];
});
const libraryRoot = path.join(cache.directory, 'libraries');
const libraryNames = fs.readdirSync(libraryRoot, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
assert.deepEqual(libraryNames, ['FS', 'WebServer', 'WiFi'], '缓存带有额外/缺失库；此脚本只重新使用原控制固件的真实库对象');
const libraryObjects = listObjects(libraryRoot).sort();
assert.ok(libraryObjects.length >= 10, 'Arduino 库对象缓存不完整');

// 原始编译数据库保留全部真实 SDK 包含目录、板级宏、TinyUSB 与默认引脚映射。
const originalArguments = cache.command.arguments.slice(1);
const compileArguments = [];
for (let index = 0; index < originalArguments.length; ++index) {
  const argument = originalArguments[index];
  if (argument === '-o') { ++index; continue; }
  if (normalize(argument) === normalize(cache.command.file)) continue;
  if (argument.startsWith('@')) continue; // 上面已验证这两份额外选项文件为空。
  compileArguments.push(argument);
}
for (const macro of ['-DBOARD_HAS_PIN_REMAP', '-DARDUINO_USB_MODE=0', '-DARDUINO_USB_CDC_ON_BOOT=1', '-DARDUINO_USB_DFU_ON_BOOT=1']) {
  assert.ok(compileArguments.includes(macro), `缓存缺少预期配置 ${macro}`);
}
const run = (executable, args, quiet = false) => {
  try {
    const log = execFileSync(executable, args, { cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 8 * 1024 * 1024 });
    if (!quiet && log.trim()) process.stdout.write(log);
    return log;
  } catch (error) {
    if (error.stdout) process.stderr.write(error.stdout);
    if (error.stderr) process.stderr.write(error.stderr);
    throw Error(`${path.basename(executable)} failed (exit ${error.status ?? error.code ?? 'unknown'}). See compiler output above.`);
  }
};
fs.mkdirSync(outputRoot, { recursive: true });
const report = {
  firmware: '1.4.1',
  validation: 'Real Nano ESP32 sketch compile, cached matching core/library relink, and ESP32 image generation; no upload or physical LED test.',
  fqbn: expectedFqbn,
  platform,
  cache: cache.directory,
  sourceSha256: fingerprint(source),
  mobileAssetsSha256: fingerprint(assetHeader),
  coreArchiveSha256: fingerprint(archive),
  variantObjects: variantObjects.map(file => ({ file, sha256: fingerprint(file) })),
  maximumBinaryBytes: maximumSize,
  builds: [],
};
for (const swap of [0, 1]) {
  const directory = path.join(outputRoot, `swap-${swap}`);
  fs.mkdirSync(directory, { recursive: true });
  const object = path.join(directory, 'gallery_echoes_wifi.o');
  const elf = path.join(directory, 'gallery_echoes_wifi.elf');
  const image = path.join(directory, 'gallery_echoes_wifi.bin');
  const map = path.join(directory, 'gallery_echoes_wifi.map');
  console.log(`Compiling actual sketch: SWAP_GREEN_BLUE=${swap}`);
  run(compiler, [...compileArguments, `-DSWAP_GREEN_BLUE=${swap}`, '-x', 'c++', source, '-o', object]);
  console.log(`Linking real Nano ESP32 core, WiFi, WebServer and FS: SWAP_GREEN_BLUE=${swap}`);
  run(compiler, [
    `-Wl,--Map=${map}`, `-L${path.join(sdk, 'lib')}`, `-L${path.join(sdk, 'ld')}`, `-L${path.join(sdk, 'qio_opi')}`,
    ...splitFlags(properties['compiler.c.elf.flags.esp32s3']),
    '-Wl,--start-group', object, ...libraryObjects, ...variantObjects, archive,
    ...splitFlags(properties['compiler.c.elf.libs.esp32s3']), '-Wl,--end-group', '-Wl,-EL', '-o', elf,
  ]);
  run(imageTool, ['--chip', 'esp32s3', 'elf2image', '--flash_mode', 'dio', '--flash_freq', '80m', '--flash_size', '16MB', '--elf-sha256-offset', '0xb0', '-o', image, elf]);
  const sections = run(sizeTool, ['-A', elf], true);
  fs.writeFileSync(path.join(directory, 'sections.txt'), sections);
  const binaryBytes = fs.statSync(image).size;
  assert.ok(binaryBytes <= maximumSize, `完整程序 ${binaryBytes} 字节超过默认 3 MiB 分区 ${maximumSize}；请压缩手机素材后重新生成。`);
  report.builds.push({ swapGreenBlue: swap, binaryBytes, freePartitionBytes: maximumSize - binaryBytes, imageSha256: fingerprint(image), image, elf, map });
  console.log(`PASS SWAP_GREEN_BLUE=${swap}: ${binaryBytes}/${maximumSize} bytes; ${maximumSize - binaryBytes} bytes remain.`);
}
fs.writeFileSync(path.join(outputRoot, 'compile-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`Full firmware size validation passed for both configurations. Report: ${path.join(outputRoot, 'compile-report.json')}`);
