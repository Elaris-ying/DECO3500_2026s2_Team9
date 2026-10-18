import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { Script } from 'node:vm';
import { build } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createWifiLightController } from '../src/wifi-light.mjs';
import { getLightOutput } from '../src/device-colour.mjs';

// 校验真实导出文件、真实组件 SSR 与固件数组；--http 只启动本机假设备，不连接实物。
const root = fileURLToPath(new URL('../', import.meta.url));
const exportRoot = path.join(root, 'mobile-export');
const require = createRequire(import.meta.url);
const results = [];
const records = new Map();
const digest = value => createHash('sha256').update(value).digest('hex');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function check(name, callback) {
  try { await callback(); results.push({ name, passed: true }); }
  catch (error) { results.push({ name, passed: false, error: String(error.message).split('\n')[0].slice(0, 300) }); }
}
async function until(predicate, message, timeout = 3000) {
  const deadline = Date.now() + timeout;
  while (!predicate()) {
    if (Date.now() > deadline) throw new Error(message);
    await delay(5);
  }
}

let manifest;
await check('导出清单、gzip、SHA 与 Flash 预算一致', async () => {
  manifest = JSON.parse(await readFile(path.join(exportRoot, 'mobile-manifest.json'), 'utf8'));
  assert.ok(Array.isArray(manifest.assets) && manifest.assets.length > 20, '完整应用的素材清单不完整');
  const unique = new Map();
  for (const asset of manifest.assets) {
    assert.ok(typeof asset.path === 'string' && asset.path.startsWith('/') && !asset.path.includes('\\'));
    assert.equal(path.posix.normalize(asset.path), asset.path, '素材路径未规范化');
    assert.equal(records.has(asset.path), false, '重复路径：' + asset.path);
    const diskPath = path.resolve(exportRoot, '.' + asset.path);
    assert.ok(diskPath.startsWith(exportRoot + path.sep), '素材路径越过导出目录');
    const plain = await readFile(diskPath);
    const stored = asset.gzip ? await readFile(diskPath + '.gz') : plain;
    assert.equal(stored.length, asset.storedBytes, asset.path + ' 存储长度不匹配');
    assert.equal(plain.length, asset.originalBytes, asset.path + ' 原始长度不匹配');
    assert.equal(digest(stored), asset.sha256, asset.path + ' SHA 不匹配');
    if (asset.gzip) assert.deepEqual(gunzipSync(stored), plain, asset.path + ' gzip 内容不匹配');
    assert.match(asset.symbol, /^MOBILE_DATA_\d+$/);
    if (unique.has(asset.symbol)) assert.equal(unique.get(asset.symbol).sha256, asset.sha256, '共享固件数组的内容不同');
    else unique.set(asset.symbol, asset);
    records.set(asset.path, { ...asset, plain, stored });
  }
  assert.equal([...unique.values()].reduce((sum, asset) => sum + asset.storedBytes, 0), manifest.uniqueStoredBytes);
  assert.ok(manifest.uniqueStoredBytes <= manifest.budgetBytes, '固件素材超出声明预算');
  for (const assetPath of ['/index.html', '/dist/app.js', '/dist/style.css', '/manifest.webmanifest']) assert.ok(records.has(assetPath), '缺少入口素材：' + assetPath);
});

await check('固件嵌入数组逐字节对应导出清单', async () => {
  assert.ok(records.size, '先修复导出清单');
  const header = await readFile(path.join(root, 'firmware/gallery_echoes_wifi/mobile_assets.h'), 'utf8');
  const symbols = new Map();
  for (const asset of records.values()) if (!symbols.has(asset.symbol)) symbols.set(asset.symbol, asset);
  const found = new Set();
  for (const match of header.matchAll(/static const uint8_t (MOBILE_DATA_\d+)\[\] PROGMEM = \{\s*([\s\S]*?)\n\};/g)) {
    const asset = symbols.get(match[1]);
    assert.ok(asset, '固件中有清单之外的数组：' + match[1]);
    const bytes = Buffer.alloc(asset.storedBytes);
    let index = 0;
    for (const byte of match[2].matchAll(/0x([0-9a-f]{2})/gi)) {
      assert.ok(index < bytes.length, match[1] + ' 数组过长');
      bytes[index++] = parseInt(byte[1], 16);
    }
    assert.equal(index, bytes.length, match[1] + ' 数组过短');
    assert.equal(digest(bytes), asset.sha256, match[1] + ' 的编译输入与导出文件不同');
    found.add(match[1]);
  }
  assert.equal(found.size, symbols.size, '固件缺少清单数组');
  for (const asset of records.values()) {
    const row = `{${JSON.stringify(asset.path)}, ${JSON.stringify(asset.type)}, ${asset.symbol}, ${asset.storedBytes}, ${asset.gzip}}`;
    assert.ok(header.includes(row), '固件路由缺少或元数据不匹配：' + asset.path);
  }
});

await check('板载入口标记、脚本语法及本地资源完整', () => {
  const html = records.get('/index.html').plain.toString('utf8');
  const js = records.get('/dist/app.js').plain.toString('utf8');
  const css = records.get('/dist/style.css').plain.toString('utf8');
  assert.match(html, /data-gallery-device="true"/);
  assert.match(html, /<meta\s+name="gallery-echoes-device"\s+content="nano-esp32-direct-rgb"/);
  assert.match(html, /viewport-fit=cover/);
  assert.doesNotMatch(html, /<input\b[^>]*\bid="picker"/, '完整入口不应退化为原生调色页');
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const url = new URL(match[1], 'http://192.168.4.1/');
    assert.equal(url.origin, 'http://192.168.4.1', '入口依赖外网：' + url.href);
    if (url.pathname !== '/controller') assert.ok(records.has(url.pathname), '入口资源未打包：' + url.pathname);
  }
  new Script(js, { filename: 'mobile-export/dist/app.js' });
  assert.doesNotMatch(js, /\bimport\s*\(|\brequire\s*\(|@vite\/client|react-refresh|process\.env\.NODE_ENV/);
  assert.doesNotMatch(css, /@import\s|url\(\s*['"]?https?:/);
  assert.match(js, /wb-colour-studio/);
  assert.match(js, /assetFileName|\.webp/);
});

const source = await readFile(path.join(root, 'src/App.jsx'), 'utf8');
const routeLiteral = source.match(/const ROUTES\s*=\s*(\[[^;]+\]);/)?.[1];
assert.ok(routeLiteral, '未找到真实路由白名单');
const routes = JSON.parse(routeLiteral.replaceAll("'", '"'));
assert.equal(routes.length, 24, '原型必须保留全部 24 页');
let App;
function environment(query = '?screen=welcome', seed = {}) {
  const currentURL = new URL(query, 'http://192.168.4.1/');
  const entries = new Map(Object.entries(seed));
  const local = { getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, String(value)), removeItem: key => entries.delete(key) };
  globalThis.localStorage = local;
  globalThis.window = { location: currentURL, localStorage: local, matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }), addEventListener() {}, removeEventListener() {} };
  globalThis.document = { baseURI: currentURL.href, title: '', documentElement: { dataset: { galleryDevice: 'true' } } };
}
const render = (query, seed) => {
  assert.ok(App, '真实 SSR 编译失败');
  environment(query, seed);
  return renderToStaticMarkup(React.createElement(App));
};
await check('真实业务组件可以在板载环境内存编译', async () => {
  environment();
  const compiled = await build({ root, logLevel: 'error', build: { ssr: path.join(root, 'src/App.jsx'), lib: false, write: false, minify: false, rollupOptions: { external: id => /^react(?:-dom)?(?:\/|$)/.test(id), output: { format: 'cjs' } } } });
  const output = (Array.isArray(compiled) ? compiled : [compiled]).flatMap(result => result.output);
  const code = output.find(chunk => chunk.type === 'chunk' && chunk.isEntry)?.code;
  assert.ok(code, '没有生成 SSR 入口');
  const module = { exports: {} };
  new Function('require', 'module', 'exports', code)(require, module, module.exports);
  App = module.exports.default || module.exports;
});
const imagePaths = new Set();
for (const route of routes) await check(`板载页面 ${route}：真实 DOM 与全部图片已打包`, () => {
  const html = render(`?screen=${route}&artwork=5&location=16`);
  assert.match(html, /<main\b/);
  assert.match(html, /<h1\b/);
  assert.match(html, /class="[^"]*\bscreen\b/);
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), 'http://192.168.4.1/');
    assert.equal(url.origin, 'http://192.168.4.1', '页面依赖外网图片');
    assert.match(url.pathname, /^\/public\/assets\/.+\.(?:webp|svg)$/i, '板载图片未转换：' + url.pathname);
    assert.ok(records.has(url.pathname), '板载清单缺少图片：' + url.pathname);
    imagePaths.add(url.pathname);
  }
});
await check('板载紧凑连接卡不重复要求 USB、Go Live 或输入 IP', () => {
  const html = render('?screen=device', { 'gallery-echoes-wifi-endpoint-v1': 'http://192.168.4.99:8080' });
  const card = html.match(/<section\b[^>]*class="[^"]*\bwb-wifi-on-device\b[^\"]*"[\s\S]*?<\/section>/)?.[0];
  assert.ok(card, '没有使用板载紧凑卡');
  assert.doesNotMatch(card, /\bUSB\b|Go Live|Board address|<input\b/);
  assert.match(card, /Connect your light/);
  assert.match(card, /wb-wifi-advanced/);
  assert.match(card, /href="\/controller"/);
  assert.match(card, /Device: http:\/\/192\.168\.4\.1/);
  assert.doesNotMatch(card, /192\.168\.4\.99/);
  assert.match(html, /data-echo-wifi-status="disconnected"/);
  assert.match(html, /data-echo-wifi-linked="false"/);
  assert.match(html, /data-verification="none"/);
  assert.match(html, /No colour command has been acknowledged by a board/);
  assert.match(render('?screen=home'), /Connect your light\./);
});

if (process.argv.includes('--http')) {
  let server, endpoint, controller;
  const writes = [];
  let output = { r: 0, g: 0, b: 0 };
  await check('真实本机 HTTP 假设备可提供实际 gzip 导出文件', async () => {
    server = createServer((request, response) => {
      const url = new URL(request.url, 'http://127.0.0.1');
      response.setHeader('Access-Control-Allow-Origin', '*');
      if (request.method !== 'GET') { response.writeHead(405); response.end('GET only'); return; }
      if (url.pathname === '/status') { response.writeHead(404); response.end('Not found'); return; }
      if (url.pathname === '/set' || url.pathname === '/off') {
        const hex = url.searchParams.get('hex');
        if (url.pathname === '/set' && !/^[0-9a-f]{6}$/.test(hex || '')) { response.writeHead(400); response.end('Bad HEX'); return; }
        output = url.pathname === '/off' ? { r: 0, g: 0, b: 0 } : { r: parseInt(hex.slice(0,2),16), g: parseInt(hex.slice(2,4),16), b: parseInt(hex.slice(4,6),16) };
        writes.push({ path: url.pathname, hex, output: { ...output }, seq: Number(url.searchParams.get('seq')) });
        response.writeHead(200, { 'Content-Type': 'text/plain' }); response.end(url.pathname === '/off' ? 'OFF' : 'OK'); return;
      }
      const asset = records.get(url.pathname === '/' ? '/index.html' : url.pathname);
      if (!asset) { response.writeHead(404); response.end('Not found'); return; }
      response.setHeader('Content-Type', asset.type);
      response.setHeader('Content-Length', asset.stored.length);
      if (asset.gzip) response.setHeader('Content-Encoding', 'gzip');
      response.writeHead(200); response.end(asset.stored);
    });
    server.listen({ host: '127.0.0.1', port: 0 });
    await once(server, 'listening');
    endpoint = 'http://127.0.0.1:' + server.address().port;
    for (const asset of records.values()) {
      const response = await fetch(endpoint + asset.path);
      assert.equal(response.status, 200, asset.path);
      assert.equal(response.headers.get('Content-Type'), asset.type, asset.path);
      assert.equal(response.headers.get('Content-Encoding'), asset.gzip ? 'gzip' : null, asset.path);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), asset.plain, asset.path + ' 的 HTTP 解压结果不同');
    }
  });
  try {
    await check('真实控制器识别完整板载根页，文本 ACK 不冒充状态确认', async () => {
      assert.ok(endpoint, 'HTTP 假设备未启动');
      controller = createWifiLightController({ timeoutMs: 1500, throttleMs: 100, heartbeatMs: 0 });
      assert.equal(controller.getSnapshot().status, 'disconnected');
      assert.equal(writes.length, 0, '连接前已写灯');
      const applied = await controller.connect(endpoint, { colour: '#123456', brightness: 100, lightOn: true });
      assert.equal(controller.getSnapshot().status, 'connected');
      assert.equal(controller.getSnapshot().mode, 'legacy');
      assert.equal(applied.source, 'text');
      assert.equal(applied.verification, 'request-acknowledged');
      assert.equal(applied.acknowledgement, 'OK');
      assert.equal(applied.revision, null);
      assert.equal(writes.length, 1);
    });
    async function send(command) {
      assert.ok(controller && controller.getSnapshot().status === 'connected');
      const previous = controller.getSnapshot().lastApplied;
      const before = previous.seq;
      const writesBefore = writes.length;
      const expected = getLightOutput(command.colour, command.brightness, command.lightOn);
      const sameWireOutput = ['r','g','b'].every(channel => previous.output[channel] === expected[channel]);
      controller.setLight(command);
      if (sameWireOutput) {
        // 黑色、零亮度和关灯可产生同一 /off；去重不应伪造针对新逻辑设置的 ACK。
        await delay(150);
        assert.equal(controller.getSnapshot().status, 'connected');
        assert.equal(writes.length, writesBefore);
        assert.deepEqual(controller.getSnapshot().lastApplied, previous);
        assert.deepEqual(output, { r:expected.r,g:expected.g,b:expected.b });
        return previous;
      }
      try { await until(() => controller.getSnapshot().status === 'connected' && controller.getSnapshot().lastApplied?.seq > before, '新颜色未获 HTTP ACK'); }
      catch { throw new Error('新颜色未获 HTTP ACK：' + JSON.stringify({ command, status:controller.getSnapshot().status, last:controller.getSnapshot().lastApplied, recentWrites:writes.slice(-3) })); }
      const last = controller.getSnapshot().lastApplied;
      assert.deepEqual(last.output, { r: expected.r, g: expected.g, b: expected.b });
      assert.deepEqual(output, last.output);
      assert.equal(last.verification, 'request-acknowledged');
      assert.equal(last.source, 'text');
      assert.equal(last.revision, null);
      return last;
    }
    await check('七种颜色和亮度经过真实 GET /set 路径发送', async () => {
      for (const colour of ['#ff0000','#00ff00','#0000ff','#ffff00','#800080','#00ffff','#ffffff']) await send({ colour, brightness: 100, lightOn: true });
      await send({ colour: '#12abef', brightness: 37, lightOn: true });
      assert.equal(writes.at(-1).path, '/set');
      assert.equal(writes.at(-1).hex, '073f58', '亮度应在网页恰好缩放一次');
    });
    await check('关闭、零亮度和黑色通过真实 /off 返回 OFF', async () => {
      for (const command of [{ colour:'#ffffff',brightness:50,lightOn:false }, { colour:'#ffffff',brightness:0,lightOn:true }, { colour:'#000000',brightness:100,lightOn:true }]) {
        await send({ colour:'#abcdef',brightness:100,lightOn:true });
        const last = await send(command);
        assert.equal(writes.at(-1).path, '/off');
        assert.equal(last.acknowledgement, 'OFF');
        assert.deepEqual(output, { r:0,g:0,b:0 });
      }
    });
    await check('相同黑色输出去重，保留实际旧 ACK 而不伪造新回执', async () => {
      const before = controller.getSnapshot().lastApplied;
      await send({ colour:'#ff00ff',brightness:0,lightOn:true });
      assert.deepEqual(controller.getSnapshot().lastApplied, before);
    });
    await check('快速调色仅保留最后一帧；断开后不再发送', async () => {
      const before = writes.length;
      for (let index = 0; index < 20; index += 1) controller.setLight({ colour:'#0101' + index.toString(16).padStart(2,'0'), brightness:100, lightOn:true });
      await until(() => controller.getSnapshot().status === 'connected' && controller.getSnapshot().lastApplied?.colour === '#010113', '最后一帧未送达');
      assert.equal(writes.length, before + 1, '突发拖色积压了过时指令');
      const last = controller.getSnapshot().lastApplied;
      controller.disconnect();
      assert.equal(controller.getSnapshot().status, 'disconnected');
      controller.setLight({ colour:'#ff0000',brightness:100,lightOn:true });
      await delay(150);
      assert.equal(writes.length, before + 1, '断开后仍向板子发送');
      assert.deepEqual(controller.getSnapshot().lastApplied, last, '断开后虚构了新确认记录');
    });
  } finally {
    controller?.dispose();
    if (server?.listening) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
  }
}

console.log(JSON.stringify({ checks: results.length, passed: results.filter(result => result.passed).length, assets: records.size, renderedRoutes: routes.length, referencedImages: imagePaths.size, uniqueStoredBytes: manifest?.uniqueStoredBytes, httpRun: process.argv.includes('--http'), results, limits: 'SSR 不运行交互 effects 或检查视觉布局；HTTP 使用本机假设备和真实导出字节，只验证软件请求/响应与资源完整性，不代表已连接实物、浏览器手势、跨域策略或实测 LED 发光。' }, null, 2));
if (results.some(result => !result.passed)) process.exitCode = 1;
