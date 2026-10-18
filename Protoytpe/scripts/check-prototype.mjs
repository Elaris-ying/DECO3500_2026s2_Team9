import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { Script } from 'node:vm';
import { build } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// 直接渲染真实业务组件，检查路由保护与持久化初始状态；不启动浏览器、不模拟布局。
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const source = await readFile(path.join(projectRoot, 'src/App.jsx'), 'utf8');
const routeLiteral = source.match(/const ROUTES\s*=\s*(\[[^;]+\]);/)?.[1];
assert.ok(routeLiteral, '未找到路由白名单');
const routes = JSON.parse(routeLiteral.replaceAll("'", '"'));
const results = [];
const compiled = await build({ root: projectRoot, logLevel: 'error', build: { ssr: path.join(projectRoot, 'src/App.jsx'), lib: false, write: false, minify: false, rollupOptions: { external: id => /^react(?:-dom)?(?:\/|$)/.test(id), output: { format: 'cjs' } } } });
const output = (Array.isArray(compiled) ? compiled : [compiled]).flatMap(result => result.output);
const serverCode = output.find(chunk => chunk.type === 'chunk' && chunk.isEntry)?.code;
assert.ok(serverCode, '未生成内存中的 SSR 入口');

function storage(seed = {}, blocked = false) {
  const entries = new Map(Object.entries(seed));
  return {
    getItem(key) { if (blocked) throw new Error('Storage unavailable'); return entries.get(key) ?? null; },
    setItem(key, value) { if (blocked) throw new Error('Storage unavailable'); entries.set(key, String(value)); },
    removeItem(key) { entries.delete(key); },
  };
}

function environment(baseURL, query, seed = {}, blocked = false) {
  const currentURL = new URL(query, baseURL);
  const local = storage(seed, blocked);
  globalThis.localStorage = local;
  globalThis.window = {
    location: { href: currentURL.href, search: currentURL.search },
    localStorage: local,
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    addEventListener() {}, removeEventListener() {},
  };
  globalThis.document = { baseURI: currentURL.href, title: '' };
}

async function check(name, callback) {
  try { await callback(); results.push({ name, passed: true }); }
  catch (error) { results.push({ name, passed: false, error: String(error.message).split('\n')[0].slice(0, 240) }); }
}

for (const baseURL of ['http://localhost/index.html', 'http://localhost/figma/index.html']) {
  environment(baseURL, '?screen=welcome');
  {
    const module = { exports: {} };
    new Function('require', 'module', 'exports', serverCode)(require, module, module.exports);
    const App = module.exports.default || module.exports;
    const render = (query, seed, blocked) => {
      environment(baseURL, query, seed, blocked);
      return renderToStaticMarkup(React.createElement(App));
    };
    const scope = new URL(baseURL).pathname;

    await check(`${scope}: 全部路由首次渲染及素材存在`, async () => {
      const baseDirectory = new URL('.', baseURL).pathname;
      for (const route of routes) {
        let html;
        try { html = render(`?screen=${route}&artwork=5&location=16`, { 'gallery-echoes-guide-v1': 'seen' }); }
        catch (error) { throw new Error(`${route}: ${error.message}`); }
        assert.match(html, /<main\b/, `${route} 缺少应用内容`);
        assert.match(html, /<h1\b/, `${route} 缺少主标题`);
        assert.match(html, /class="[^"]*\bscreen\b/, `${route} 缺少页面结构`);
        for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
          const url = new URL(match[1].replaceAll('&amp;', '&'), baseURL);
          if (url.origin !== new URL(baseURL).origin) continue;
          assert.ok(url.pathname.startsWith(`${baseDirectory}public/assets/`), `${route} 的素材路径未保留 HTML 子目录：${url.pathname}`);
          await access(path.join(projectRoot, url.pathname.slice(baseDirectory.length)));
        }
      }
    });

    await check(`${scope}: 非法路由回退到欢迎页`, () => {
      assert.match(render('?screen=does-not-exist'), /welcome-screen/);
    });

    await check(`${scope}: 禁用或损坏存储仍能渲染`, () => {
      assert.match(render('?screen=home', {}, true), /<main\b/);
      assert.match(render('?screen=home', { 'gallery-echoes-colours-v1': '{broken json' }), /<main\b/);
    });

    await check(`${scope}: 默认先自己的 Echo，未提交不展示他人内容`, () => {
      const html = render('?screen=shared&echo=monet');
      assert.match(html, /perspective-first/);
      assert.doesNotMatch(html, /class="reflection-list"|class="echo-preview-list"/);
      assert.match(html, /View sample reflections without adding an echo/);
    });

    await check(`${scope}: A 作品提交不会解锁 B，且刷新恢复同作品 Echo`, () => {
      const seed = { 'gallery-echoes-colours-v1': JSON.stringify({ monet: { feeling: 'Calm', submittedAt: 1000 }, 'collection-0': { feeling: 'Curious', submittedAt: 2000 } }) };
      const another = render('?screen=shared&echo=collection-1', seed);
      assert.match(another, /perspective-first/);
      assert.doesNotMatch(another, /class="reflection-list"/);
      const saved = render('?screen=shared&echo=collection-0', seed);
      assert.match(saved, /class="reflection-list"/);
      assert.match(saved, /Exterior View of Saint-Lazare Station/);
      const collected = render('?screen=collectionArt&artwork=0&echo=monet', seed);
      assert.match(collected, /class="[^"]*\becho-feedback\b[^"]*"/);
      assert.match(collected, /Your lavender echo is here/);
      assert.doesNotMatch(collected, /Your blue echo is here/);
    });

    await check(`${scope}: 非法颜色和时间不解锁他人 Echo`, () => {
      const seed = { 'gallery-echoes-colours-v1': JSON.stringify({ monet: { feeling: 'Unknown', submittedAt: 1000 }, 'collection-0': { feeling: 'Calm', submittedAt: 'invalid' }, 'collection-99': { feeling: 'Calm', submittedAt: 1000 } }) };
      assert.match(render('?screen=shared&echo=monet', seed), /perspective-first/);
      assert.match(render('?screen=shared&echo=collection-0', seed), /perspective-first/);
      assert.match(render('?screen=shared&echo=collection-99', seed), /perspective-first/);
    });

    await check(`${scope}: 四色快捷提交、Skip 和默认折叠 Look Again`, () => {
      const html = render('?screen=capture&echo=monet');
      assert.equal([...html.matchAll(/class="quick-colour(?:\s|")/g)].length, 4);
      assert.match(html, /<button\b[^>]*disabled=""[^>]*><span>Send my echo/);
      assert.match(html, /Skip for now/);
      const details = html.match(/<details\b[^>]*class="look-again"[^>]*>/)?.[0];
      assert.ok(details, '缺少可忽略的 Look Again');
      assert.doesNotMatch(details, /\bopen(?:=|\s|>)/);
    });

    await check(`${scope}: Quiet 和振动偏好从本机存储恢复`, () => {
      const quiet = render('?screen=home', { 'gallery-echoes-feedback-preferences-v1': JSON.stringify({ quietMode: true, vibrationEnabled: false }) });
      assert.match(quiet, /data-echo-quiet="true"/);
      assert.match(quiet, /data-echo-vibration="false"/);
      const malformed = render('?screen=home', { 'gallery-echoes-feedback-preferences-v1': JSON.stringify({ quietMode: 'true', vibrationEnabled: 0 }) });
      assert.match(malformed, /data-echo-quiet="false"/);
      assert.match(malformed, /data-echo-vibration="true"/);
      const denied = render('?screen=home', {}, true);
      assert.match(denied, /data-echo-quiet="false"/);
    });

    await check(`${scope}: 自由调色页与常用入口可首次渲染`, () => {
      const html = render('?screen=device');
      assert.match(html, /device-screen/);
      assert.match(html, /wb-colour-studio/);
      assert.match(html, /Preview only/);
      assert.match(html, /Arduino Nano ESP32/);
      for (const label of ['HEX colour', 'Brightness', 'Light power', 'Arduino sequence']) assert.ok(html.includes(label), `缺少设备控制：${label}`);
      const home = render('?screen=home');
      assert.match(home, /studio-entry-card/);
      assert.match(home, /desktop-studio-entry/);
      assert.match(home, /aria-label="Open colour studio"/);
    });

    await check(`${scope}: 自由色和亮度恢复，作品 Echo 仍独立`, () => {
      const seed = {
        'gallery-echoes-light-v1': JSON.stringify({ customColour: '#12abef', brightness: 37, lightOn: true }),
        'gallery-echoes-colours-v1': JSON.stringify({ monet: { feeling: 'Curious', submittedAt: 1000 } }),
      };
      const device = render('?screen=device', seed);
      assert.match(device, /data-echo-custom="true"/);
      assert.match(device, /data-echo-brightness="37"/);
      assert.match(device, /data-echo-light-on="true"/);
      assert.match(device, /data-echo-light-active="true"/);
      assert.match(device, /data-echo-demo="stopped"/);
      assert.match(device, /--echo-color:#12abef/);
      assert.match(device, /--echo-led:#073f58/);
      const saved = render('?screen=detail&echo=monet', seed);
      assert.match(saved, /Your lavender echo is here/);
      assert.match(saved, /data-echo-custom="true"/);
      assert.match(saved, /--echo-color:#12abef/);
      assert.match(render('?screen=shared&echo=collection-1', seed), /perspective-first/);
    });

    await check(`${scope}: 关灯与零亮度保留自由色，LED 输出停用`, () => {
      for (const settings of [
        { customColour: '#ff00ff', brightness: 64, lightOn: false },
        { customColour: '#ff00ff', brightness: 0, lightOn: true },
        { customColour: '#000000', brightness: 100, lightOn: true },
      ]) {
        const html = render('?screen=device', { 'gallery-echoes-light-v1': JSON.stringify(settings) });
        assert.match(html, /data-echo-custom="true"/);
        assert.ok(html.includes(`data-echo-brightness="${settings.brightness}"`));
        assert.ok(html.includes(`data-echo-light-on="${settings.lightOn}"`));
        assert.match(html, /data-echo-light-active="false"/);
        assert.match(html, /--echo-led:#000000/);
        assert.match(html, /--echo-light-intensity:0(?:;|")/);
        assert.ok(html.includes(`--echo-color:${settings.customColour}`), '灯灭时丢失了已选颜色');
      }
    });

    await check(`${scope}: 自由色不会冒充已选择的作品情绪`, () => {
      const html = render('?screen=capture&echo=monet', { 'gallery-echoes-light-v1': JSON.stringify({ customColour: '#ff00ff', brightness: 50, lightOn: true }) });
      assert.match(html, /data-echo-custom="true"/);
      assert.match(html, /echo-studio-note/);
      assert.doesNotMatch(html, /class="quick-colour [^"]* selected"/);
      assert.match(html, /<button\b[^>]*disabled=""[^>]*><span>Send my echo/);
    });

    await check(`${scope}: 设备设置坏值回退且额外字段不恢复轮播`, () => {
      const bad = render('?screen=device', { 'gallery-echoes-light-v1': JSON.stringify({ customColour: 'invalid', brightness: '25', lightOn: 0, demoRunning: true, demoStep: 3 }) });
      assert.match(bad, /data-echo-custom="false"/);
      assert.match(bad, /data-echo-brightness="100"/);
      assert.match(bad, /data-echo-light-on="true"/);
      assert.match(bad, /data-echo-demo="stopped"/);
      for (const value of ['{broken json', 'null', '[]']) {
        const html = render('?screen=device', { 'gallery-echoes-light-v1': value });
        assert.match(html, /data-echo-custom="false"/);
        assert.match(html, /data-echo-brightness="100"/);
        assert.match(html, /data-echo-light-on="true"/);
      }
      const denied = render('?screen=device', {}, true);
      assert.match(denied, /data-echo-brightness="100"/);
      assert.match(denied, /data-echo-demo="stopped"/);
    });

    await check(`${scope}: Wi-Fi 初始未连接且没有虚构硬件应用记录`, () => {
      const html = render('?screen=device');
      assert.match(html, /data-echo-wifi-status="disconnected"/);
      assert.match(html, /data-echo-wifi-linked="false"/);
      assert.match(html, /class="wb-wifi-connection"[^>]*data-connection-status="disconnected"/);
      assert.match(html, /Connect to board/);
      assert.match(html, /No colour command has been acknowledged by a board/);
      assert.match(html, /GalleryEchoes/);
      assert.match(html, /No password/);
      assert.match(html, /For Go Live access/);
      assert.match(html, /data-verification="none"/);
      assert.doesNotMatch(html, /Password:|Echoes2026|Gallery-Echoes|data-echo-wifi-linked="true"|Last confirmed ·|Last acknowledged request ·/);
    });

    await check(`${scope}: 只恢复设备地址，连接与作品 Echo 相互独立`, () => {
      const seed = {
        'gallery-echoes-wifi-endpoint-v1': 'http://192.168.4.2:8080',
        'gallery-echoes-light-v1': JSON.stringify({ customColour: '#12abef', brightness: 37, lightOn: true }),
        'gallery-echoes-colours-v1': JSON.stringify({ monet: { feeling: 'Curious', submittedAt: 1000 } }),
      };
      const html = render('?screen=device', seed);
      assert.match(html, /value="http:\/\/192\.168\.4\.2:8080"/);
      assert.match(html, /data-echo-wifi-status="disconnected"/);
      assert.match(html, /data-echo-wifi-linked="false"/);
      assert.match(html, /No colour command has been acknowledged by a board/);
      assert.match(html, /--echo-led:#073f58/);
      assert.match(render('?screen=detail&echo=monet', seed), /Your lavender echo is here/);
      assert.match(render('?screen=shared&echo=collection-1', seed), /perspective-first/);
    });

    await check(`${scope}: 无效或被禁用的 Wi-Fi 地址存储回退到默认设备`, () => {
      for (const endpoint of ['http://example.com', 'https://192.168.4.1', 'http://192.168.4.1/set', '{"status":"connected","lastApplied":{"colour":"#ff0000"}}']) {
        const html = render('?screen=device', { 'gallery-echoes-wifi-endpoint-v1': endpoint });
        assert.match(html, /value="http:\/\/192\.168\.4\.1"/);
        assert.match(html, /data-echo-wifi-linked="false"/);
      }
      const denied = render('?screen=device', {}, true);
      assert.match(denied, /value="http:\/\/192\.168\.4\.1"/);
      assert.match(denied, /data-echo-wifi-status="disconnected"/);
    });
  }
}

await check('Go Live 静态入口的本地脚本与样式', async () => {
  const html = await readFile(path.join(projectRoot, 'index.html'), 'utf8');
  assert.match(html, /src="\.\/dist\/app\.js"/);
  assert.match(html, /href="\.\/dist\/style\.css"/);
  const js = await readFile(path.join(projectRoot, 'dist/app.js'), 'utf8');
  new Script(js, { filename: 'dist/app.js' });
  assert.doesNotMatch(js, /\bimport\s*\(|\brequire\s*\(|@vite\/client|react-refresh|process\.env\.NODE_ENV/);
  assert.match(js, /gallery-echoes-colours-v1/, 'Go Live 脚本尚未包含本次 Echo 存储功能，请重新构建');
  assert.match(js, /gallery-echoes-feedback-preferences-v1/, 'Go Live 脚本尚未包含手环偏好功能，请重新构建');
  assert.match(js, /wb-feeling-rail/, 'Go Live 脚本尚未包含滑动选色功能，请重新构建');
  assert.match(js, /gallery-echoes-light-v1/, 'Go Live 脚本尚未包含独立灯光设置，请重新构建');
  assert.match(js, /wb-colour-studio/, 'Go Live 脚本尚未包含自由调色页，请重新构建');
  assert.match(js, /gallery-echoes-nano-esp32/, 'Go Live 脚本尚未包含 Nano ESP32 通信协议，请重新构建');
  assert.match(js, /data-echo-wifi-status/, 'Go Live 脚本尚未包含独立 Wi-Fi 状态，请重新构建');
  assert.match(js, /request-acknowledged/, 'Go Live 脚本尚未区分旧协议请求回执，请重新构建');
  assert.match(js, /\/set\?hex=/, 'Go Live 脚本尚未使用用户原始调色协议，请重新构建');
  assert.match(js, /\/off\?seq=/, 'Go Live 脚本尚未使用用户原始关灯协议，请重新构建');
  assert.match(js, /["']\/status["']/, 'Go Live 脚本尚未使用增强只读状态协议，请重新构建');
  assert.match(js, /["']GalleryEchoes["']/, 'Go Live 脚本尚未使用用户原始开放热点名，请重新构建');
  assert.doesNotMatch(js, /Gallery-Echoes|Echoes2026|\/api\/light|\/api\/status/, 'Go Live 脚本仍残留替代用户原程序的热点或协议，请重新构建');
  assert.doesNotMatch(js, /navigator\s*(?:\?\.|\.)\s*(?:bluetooth|serial|usb)\b|navigator\s*\.\s*vibrate\s*\(/, '不得调用未实现的 USB/BLE/Serial 或系统振动 API；Wi-Fi HTTP 控制允许');
  const css = await readFile(path.join(projectRoot, 'dist/style.css'), 'utf8');
  assert.doesNotMatch(css, /@import\s|url\(\s*['"]?https?:/);
  assert.match(css, /quick-colours/, 'Go Live 样式尚未包含本次快捷选色，请重新构建');
  assert.match(css, /wb-colour-studio/, 'Go Live 样式尚未包含自由调色页，请重新构建');
  assert.match(css, /wb-wifi-connection/, 'Go Live 样式尚未包含 Wi-Fi 连接控件，请重新构建');
});

console.log(JSON.stringify({ checks: results.length, passed: results.filter(result => result.passed).length, results, limits: 'SSR 仅验证初始 DOM/路由保护/存储读取与静态包完整性，不运行 effects 或事件，不验证真实点击、调色拖动、定时轮播、振动、滚动、视觉布局或真实硬件。' }, null, 2));
if (results.some(result => !result.passed)) process.exitCode = 1;
