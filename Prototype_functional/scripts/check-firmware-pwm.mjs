import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

// 保留旧文件名方便已有命令继续使用；本版检验直接 PWM 调色，不再模拟驱动读回时序。
// 提取实际 .ino 的 setRGB / HEX 函数运行，仅验证软件数值与页面协议，不代表实机发光。
const sourceOption = process.argv.indexOf('--source');
assert.ok(sourceOption < 0 || process.argv[sourceOption + 1], '--source 后需要指定 .ino 路径');
const sourcePath = sourceOption < 0
  ? fileURLToPath(new URL('../firmware/gallery_echoes_wifi/gallery_echoes_wifi.ino', import.meta.url))
  : path.resolve(process.argv[sourceOption + 1]);
const source = fs.readFileSync(sourcePath, 'utf8');
console.log(`直接 RGB / HEX 软件回归（非实机验证）：${sourcePath}`);

// 只提取普通 C++ 函数，扫描时跳过注释和字符串中的花括号。
function extractFunction(name, type) {
  const match = new RegExp(`\\b${type}\\s+${name}\\s*\\(([^)]*)\\)\\s*\\{`).exec(source);
  assert.ok(match, `无法从真实固件提取 ${type} ${name}`);
  let depth = 1;
  let end = match.index + match[0].length;
  let quote = null;
  let comment = null;
  for (; end < source.length && depth; ++end) {
    const current = source[end], next = source[end + 1];
    if (comment === '//') { if (current === '\n') comment = null; continue; }
    if (comment === '/*') { if (current === '*' && next === '/') { comment = null; ++end; } continue; }
    if (quote) { if (current === '\\') ++end; else if (current === quote) quote = null; continue; }
    if (current === '/' && (next === '/' || next === '*')) { comment = `/${next}`; ++end; continue; }
    if (current === '"' || current === "'") { quote = current; continue; }
    if (current === '{') ++depth;
    else if (current === '}') --depth;
  }
  assert.equal(depth, 0, `${name} 的函数体括号不完整`);
  return { parameters: match[1], body: source.slice(match.index + match[0].length, end - 1) };
}

// 有限语法转换：新 C++ 特性需要明确扩展，不能静默跳过生产逻辑。
function translateIntegers(body) {
  const translated = body
    .replace(/\bconst\s+(?:uint8_t|uint32_t|size_t|int)\s+/g, 'const ')
    .replace(/\b(?:uint8_t|uint32_t|size_t|int)\s+(?=[A-Za-z_]\w*\s*(?:=|,|;))/g, 'let ')
    .replace(/\buint32_t\s*\(/g, 'u32(')
    .replace(/\b(\d+)[uU]\b/g, '$1');
  assert.doesNotMatch(translated, /\b(?:uint8_t|uint32_t|size_t|int|static_cast|reinterpret_cast|sizeof)\b|#|::/, '函数包含未支持的 C++ 语法');
  return translated;
}

const setRGBSource = extractFunction('setRGB', 'void');
assert.match(setRGBSource.parameters, /^\s*int\s+r\s*,\s*int\s+g\s*,\s*int\s+b\s*$/, 'setRGB 要保留 int 输入，先限幅再输出');
const hexDigitSource = extractFunction('hexDigit', 'int');
const hexDigitBody = hexDigitSource.body.replace(/'([^'\\])'/g, (_, character) => String(character.charCodeAt(0)));
const hexDigit = new Function('character', hexDigitBody);
const parseHexSource = extractFunction('parseHex', 'bool');
assert.match(parseHexSource.parameters, /^\s*const\s+String\s*&hex\s*,\s*uint8_t\s*&r\s*,\s*uint8_t\s*&g\s*,\s*uint8_t\s*&b\s*$/, 'HEX 解析器参数需要显式适配');
const parseHexBody = translateIntegers(parseHexSource.body)
  .replace(/\bhex\.length\(\)/g, 'hex.length')
  .replace(/\bhex\[index\]/g, 'hex.charCodeAt(index)')
  // C++ 引用直接映射到对象字段，保留提前写入后返回 false 的可观察副作用。
  .replace(/\b([rgb])\b/g, 'output.$1');
const parseHex = new Function('hex', 'output', 'hexDigit', 'u32', parseHexBody);
const parse = (hex, output) => parseHex(hex, output, hexDigit, value => value >>> 0);
const PINS = [14, 15, 16];

function createWriter() {
  const writes = [];
  const serial = [];
  const analogWrite = (pin, duty) => {
    assert.ok(PINS.includes(pin), `错误引脚 ${pin}`);
    assert.ok(Number.isInteger(duty) && duty >= 0 && duty <= 255, `错误 PWM ${duty}`);
    writes.push({ pin, duty });
  };
  const constrain = (value, minimum, maximum) => Math.max(minimum, Math.min(value, maximum));
  const Serial = { print: value => serial.push(String(value)), println: value => serial.push(`${value}\n`) };
  const setRGB = new Function('analogWrite', 'constrain', 'Serial', 'RED_PIN', 'GREEN_PIN', 'BLUE_PIN', `return function setRGB(r, g, b) { ${translateIntegers(setRGBSource.body)} };`)(analogWrite, constrain, Serial, ...PINS);
  return { setRGB, writes, serial };
}

function expectWrite(writer, input, expected = input) {
  const previous = writer.writes.length;
  writer.setRGB(...input);
  assert.deepEqual(writer.writes.slice(previous), expected.map((value, index) => ({ pin: PINS[index], duty: 255 - value })), `RGB ${input} 应输出 ${expected}`);
}

test('保留原版 direct analogWrite，不再读回误判、回滚或定时覆盖用户颜色', () => {
  assert.match(source, /RED_PIN\s*=\s*LED_RED\s*;/);
  assert.match(source, /GREEN_PIN\s*=\s*SWAP_GREEN_BLUE\s*\?\s*LED_BLUE\s*:\s*LED_GREEN\s*;/);
  assert.match(source, /BLUE_PIN\s*=\s*SWAP_GREEN_BLUE\s*\?\s*LED_GREEN\s*:\s*LED_BLUE\s*;/);
  assert.doesNotMatch(source, /\b(?:analogGetChannel|ledcRead|pwmChannelMatches|commitRGB|pwmReady|LightState)\b/);
  assert.doesNotMatch(setRGBSource.body, /\b(?:delay|millis|while|for|return)\b/);
  const loop = extractFunction('loop', 'void').body;
  assert.match(loop, /server\.handleClient\s*\(\s*\)/);
  assert.doesNotMatch(loop, /\b(?:setRGB|analogWrite|digitalWrite|delay)\s*\(/);
  const setup = extractFunction('setup', 'void').body;
  assert.match(setup, /setRGB\s*\(\s*0\s*,\s*0\s*,\s*0\s*\)/);
  assert.match(setup, /analogWriteResolution\s*\(\s*8\s*\)/);
  assert.doesNotMatch(source, /server\.on\s*\(\s*"\/status"/);
});

test('每个 RGB 通道完整 0–255 范围均保持一一对应的 active-low PWM', () => {
  const writer = createWriter();
  for (let channel = 0; channel < 3; ++channel) {
    const observed = new Set();
    for (let value = 0; value <= 255; ++value) {
      const rgb = [0, 0, 0];
      rgb[channel] = value;
      expectWrite(writer, rgb);
      observed.add(writer.writes.at(-3 + channel).duty);
    }
    assert.equal(observed.size, 256, '不能把中间颜色压成开/关或遗漏某一级亮度');
  }
  assert.deepEqual(writer.writes.slice(0, 3).map(write => write.duty), [255, 255, 255], 'RGB 0 必须全灭');
});

test('4096 组边界与混色组合通过真实函数，包含白、黄、青、紫、灰及柔和色', () => {
  const writer = createWriter();
  const values = [0, 1, 2, 15, 16, 31, 32, 63, 64, 127, 128, 191, 223, 239, 254, 255];
  for (const r of values) for (const g of values) for (const b of values) expectWrite(writer, [r, g, b]);
  for (const hex of ['ff0000', '00ff00', '0000ff', 'ffff00', '00ffff', 'ff00ff', 'ffffff', '000000', '808080', '010101', 'fefefe', 'e6bb7b', '12abef', '591057', '7fa2bc', 'f7f3ec']) {
    const output = {};
    assert.equal(parse(hex, output), true);
    const expected = [0, 2, 4].map(index => Number.parseInt(hex.slice(index, index + 2), 16));
    assert.deepEqual([output.r, output.g, output.b], expected);
    expectWrite(writer, expected);
  }
});

test('setRGB 对超范围整数限幅，串口显示的是限幅后的 RGB', () => {
  const writer = createWriter();
  for (const input of [[-1, -10, -2147483648], [256, 300, 2147483647], [-50, 128, 500], [255, -1, 256]]) {
    const expected = input.map(value => Math.max(0, Math.min(value, 255)));
    const start = writer.serial.length;
    expectWrite(writer, input, expected);
    assert.equal(writer.serial.slice(start).join(''), `RGB: ${expected.join(', ')}\n`);
  }
});

test('实际 HEX 解析器接受每个通道所有字节及大小写，拒绝所有无效字符与长度', () => {
  for (let channel = 0; channel < 3; ++channel) {
    for (let value = 0; value <= 255; ++value) {
      const rgb = [18, 171, 239];
      rgb[channel] = value;
      const hex = rgb.map(byte => byte.toString(16).padStart(2, '0')).join('');
      for (const candidate of [hex, hex.toUpperCase()]) {
        const output = {};
        assert.equal(parse(candidate, output), true, candidate);
        assert.deepEqual([output.r, output.g, output.b], rgb);
      }
    }
  }
  const invalid = ['', '0', '00000', '0000000', '#ffffff', ' ffffff', 'ffffff ', '0x0000', '１２３４５６'];
  for (let code = 0; code < 128; ++code) {
    const character = String.fromCharCode(code);
    if (!/[0-9a-fA-F]/.test(character)) {
      for (let position = 0; position < 6; ++position) invalid.push(`${'0'.repeat(position)}${character}${'0'.repeat(5 - position)}`);
    }
  }
  for (const candidate of invalid) {
    const output = { r: 18, g: 171, b: 239 };
    assert.equal(parse(candidate, output), false, JSON.stringify(candidate));
    assert.deepEqual(output, { r: 18, g: 171, b: 239 }, '无效 HEX 不能部分改变输出');
  }
});

test('hexDigit 的所有 ASCII 字符处理与十六进制定义一致', () => {
  for (let code = 0; code < 128; ++code) {
    const character = String.fromCharCode(code);
    const expected = /^[0-9a-fA-F]$/.test(character) ? Number.parseInt(character, 16) : -1;
    assert.equal(hexDigit(code), expected, JSON.stringify(character));
  }
});

test('原生页面脚本可解析，并保留选择器、手动发送及七种快速测试颜色', () => {
  const page = /const\s+char\s+PAGE\[\]\s+PROGMEM\s*=\s*R"GEHTML\(([\s\S]*?)\)GEHTML"\s*;/.exec(source)?.[1];
  assert.ok(page, '没有找到实际固件 PAGE 原始字符串');
  assert.match(page, /<title>Gallery Echoes<\/title>/);
  assert.match(page, /<input\b[^>]*\btype="color"[^>]*\bid="picker"/);
  assert.match(page, /\bid="send"/);
  assert.match(page, /\b1\.2\.0\b/);
  const scripts = [...page.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.length > 0, '原生页需要实际发送请求的脚本');
  for (const [index, match] of scripts.entries()) new vm.Script(match[1], { filename: `firmware-native-page-${index}.js` });
  for (const hex of ['ff0000', '00ff00', '0000ff', 'ffff00', '00ffff', 'ff00ff', 'ffffff']) {
    assert.match(page, new RegExp(`<button\\b[^>]*\\bdata-hex="${hex}"`), `缺少快速颜色 ${hex}`);
  }
  const script = scripts.map(match => match[1]).join('\n');
  assert.match(script, /['"]\/set\?hex=['"]/);
  assert.match(script, /['"]\/off['"]/);
  assert.doesNotMatch(script, /['"]\/status['"]/);
});
