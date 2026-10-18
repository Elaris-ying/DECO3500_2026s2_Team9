import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { Script, createContext } from 'node:vm';
import { build } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readDeviceHandoff } from '../src/light-handoff.mjs';
import { getLightOutput } from '../src/device-colour.mjs';

// 只读取明确的公开导出文件和应用源码；不遍历工作区、.git 或任何凭据目录。
// SSR 与模拟 SW 环境不访问公网/私网、不调用硬件，也不自动打开交接链接。
const root = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = path.join(root, 'online-site/dist');
const publicOrigin = 'https://gallery-echoes-mobile.netlify.app';
const require = createRequire(import.meta.url);
const results = [];
const files = new Map();
let manifest, bootstrap, worker;
const onlineBuild = JSON.parse(await readFile(path.join(root, 'online-site/build-manifest.json'), 'utf8'));
async function check(name, callback) {
  try { await callback(); results.push({ name, passed:true }); }
  catch (error) { results.push({ name, passed:false, error:String(error.message).split('\n')[0].slice(0,280) }); }
}
function decoded(value) { return value.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"'); }

await check('公开资源清单路径与真实导出文件一致', async () => {
  manifest = JSON.parse(await readFile(path.join(root, 'mobile-export/mobile-manifest.json'), 'utf8'));
  for (const asset of manifest.assets) {
    assert.ok(asset.path.startsWith('/') && !asset.path.includes('\\'));
    assert.equal(path.posix.normalize(asset.path), asset.path);
    const filename = path.resolve(publicRoot, '.' + asset.path);
    assert.ok(filename.startsWith(publicRoot + path.sep));
    const bytes = await readFile(filename);
    if (onlineBuild.mode === 'web-only' && onlineBuild.appAssets[asset.path]) {
      const expected = onlineBuild.appAssets[asset.path];
      const { createHash } = await import('node:crypto');
      assert.equal(bytes.length, expected.originalBytes);
      assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256);
      assert.equal(onlineBuild.firmwareUntouched, true);
    } else if (asset.path !== '/index.html') {
      const source = await readFile(path.resolve(root, 'mobile-export', '.' + asset.path));
      assert.deepEqual(bytes, source, '公开导出与当前构建不同：' + asset.path);
      assert.equal(bytes.length, asset.originalBytes);
    }
    files.set(asset.path, bytes);
  }
  for (const filename of ['online-bootstrap.js','sw.js']) files.set('/' + filename, await readFile(path.join(publicRoot, filename)));
  assert.ok(files.size > 30);
});
await check('在线 HTML 使用独立标记和 HTTPS 同源入口，不冒充板载设备', () => {
  const html = files.get('/index.html').toString('utf8');
  assert.match(html, /data-gallery-online="true"/);
  assert.match(html, /data-gallery-assets="webp"/);
  assert.doesNotMatch(html, /data-gallery-device|<meta\s+name="gallery-echoes-device"/);
  assert.match(html, /viewport-fit=cover/);
  assert.doesNotMatch(html, /https?:\/\/(?:192\.168\.|127\.|10\.\d)/);
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const url = new URL(decoded(match[1]), publicOrigin + '/');
    assert.equal(url.origin, publicOrigin, '入口依赖非公开同源 URL：' + url.href);
    assert.ok(files.has(url.pathname), '入口资源未导出：' + url.pathname);
  }
  const inlineScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(match => !/\bsrc=/.test(match[1]));
  assert.ok(inlineScripts.every(match => !match[2].trim()), '入口不应包含自动访问设备的内联脚本');
});
await check('公开应用、bootstrap 和 Service Worker 可以独立解析', () => {
  const app = files.get('/dist/app.js').toString('utf8');
  const css = files.get('/dist/style.css').toString('utf8');
  bootstrap = files.get('/online-bootstrap.js').toString('utf8');
  worker = files.get('/sw.js').toString('utf8');
  for (const [name,code] of [['dist/app.js',app],['online-bootstrap.js',bootstrap],['sw.js',worker]]) new Script(code, {filename:name});
  assert.match(app, /wb-online-handoff/);
  assert.match(app, /galleryOnline/);
  assert.doesNotMatch(app, /@vite\/client|react-refresh|process\.env\.NODE_ENV|\brequire\s*\(/);
  assert.doesNotMatch(css, /@import\s|url\(\s*['"]?https?:/);
  assert.doesNotMatch(bootstrap, /192\.168\.|\bfetch\s*\(|location\s*\.\s*(?:assign|replace)\s*\(|location\s*\.\s*href\s*=|window\s*\.\s*open\s*\(/);
});
await check('bootstrap 只在 HTTPS 注册同源 SW，没有设备访问或导航副作用', () => {
  for (const protocol of ['https:','http:']) {
    const registrations = [];
    const context = {
      location:Object.freeze({protocol,origin:publicOrigin}),
      navigator:{serviceWorker:{register(value) { registrations.push(value); return Promise.resolve({}); }}},
      fetch() { throw new Error('bootstrap 不应发送 fetch'); },
      window:{open() { throw new Error('bootstrap 不应打开窗口'); }},
    };
    new Script(bootstrap).runInNewContext(context);
    assert.deepEqual(registrations, protocol === 'https:' ? ['./sw.js'] : []);
  }
});
await check('SW 缓存清单恰好对应公开资源，不拦截私网导航', async () => {
  const handlers = {}, precached = [], fetches = [];
  const context = createContext({
    URL,
    self:{location:{origin:publicOrigin},addEventListener(type,callback) { handlers[type] = callback; },skipWaiting() {},clients:{claim() {}}},
    caches:{
      open:async () => ({addAll:async paths => { precached.push(...paths); }}),
      keys:async () => [],delete:async () => true,match:async () => null,
    },
    fetch:async request => { fetches.push(request.url || String(request)); return {ok:true}; },
  });
  new Script(worker).runInContext(context);
  assert.ok(handlers.install && handlers.activate && handlers.fetch);
  let installing;
  handlers.install({waitUntil(value) { installing = value; }});
  await installing;
  const expected = [...manifest.assets.map(asset => asset.path),'/online-bootstrap.js'].sort();
  assert.deepEqual(precached.sort(), expected);
  assert.equal(new Set(precached).size, precached.length, '预缓存资源重复');
  for (const resource of precached) assert.ok(files.has(resource), 'SW 缓存了不存在的路径：' + resource);
  let intercepted = 0;
  for (const request of [
    {url:'http://192.168.4.1/?screen=device',method:'GET',mode:'navigate'},
    {url:'http://192.168.4.1/set?hex=ff0000',method:'GET',mode:'cors'},
    {url:publicOrigin + '/anything',method:'POST',mode:'cors'},
  ]) handlers.fetch({request,respondWith() { intercepted += 1; }});
  assert.equal(intercepted, 0);
  assert.equal(fetches.length, 0, 'SW 主动访问了设备或拦截了非 GET');
  let pending;
  handlers.fetch({request:{url:publicOrigin + '/dist/app.js?v=current',method:'GET',mode:'cors'},respondWith(value) { pending = value; }});
  assert.ok(pending, '同源静态资源没有进入 SW 流程');
  await pending;
  assert.deepEqual(fetches, [publicOrigin + '/dist/app.js?v=current']);
});

let App;
function environment(query = '?screen=welcome', seed = {}, mode = 'online', blocked = false) {
  const url = new URL(query, mode === 'device' ? 'http://192.168.4.1/' : publicOrigin + '/');
  const entries = new Map(Object.entries(seed));
  const local = {
    getItem(key) { if (blocked) throw Error('Storage unavailable'); return entries.get(key) ?? null; },
    setItem(key,value) { if (blocked) throw Error('Storage unavailable'); entries.set(key,String(value)); },
    removeItem:key => entries.delete(key),
  };
  globalThis.localStorage = local;
  globalThis.window = {location:url,localStorage:local,matchMedia:() => ({matches:false,addEventListener() {},removeEventListener() {}}),addEventListener() {},removeEventListener() {}};
  const dataset = mode === 'device' ? {galleryDevice:'true',galleryAssets:'webp'} : {galleryOnline:'true',galleryAssets:'webp'};
  globalThis.document = {baseURI:url.href,title:'',documentElement:{dataset}};
}
function render(query, seed, mode, blocked) {
  assert.ok(App, '实际组件尚未编译');
  environment(query,seed,mode,blocked);
  return renderToStaticMarkup(React.createElement(App));
}
function handoffFrom(html) {
  const anchor = html.match(/<a\b[^>]*class="[^"]*\bwb-handoff-link\b[^"]*"[^>]*>/)?.[0];
  assert.ok(anchor, '缺少显式设备交接链接');
  assert.match(anchor, /target="_blank"/);
  assert.match(anchor, /rel="noopener noreferrer"/);
  const href = decoded(anchor.match(/\bhref="([^"]+)"/)?.[1] || '');
  const url = new URL(href);
  assert.equal(url.origin, 'http://192.168.4.1');
  assert.equal(url.pathname, '/');
  return readDeviceHandoff(url.search);
}
const appSource = await readFile(path.join(root,'src/App.jsx'),'utf8');
const routes = JSON.parse(appSource.match(/const ROUTES\s*=\s*(\[[^;]+\]);/)[1].replaceAll("'",'"'));
assert.equal(routes.length,24);
await check('实际应用在在线环境内存编译', async () => {
  environment();
  const compiled = await build({root,logLevel:'error',build:{ssr:path.join(root,'src/App.jsx'),lib:false,write:false,minify:false,rollupOptions:{external:id => /^react(?:-dom)?(?:\/|$)/.test(id),output:{format:'cjs'}}}});
  const outputs = (Array.isArray(compiled) ? compiled : [compiled]).flatMap(result => result.output);
  const code = outputs.find(item => item.type === 'chunk' && item.isEntry)?.code;
  assert.ok(code);
  const module = {exports:{}};
  new Function('require','module','exports',code)(require,module,module.exports);
  App = module.exports.default || module.exports;
});
const images = new Set();
for (const route of routes) await check(`公开页面 ${route}：完整内容与 WebP/SVG 图片存在`, () => {
  const html = render(`?screen=${route}&artwork=5&location=16`);
  assert.match(html, /<main\b/);
  assert.match(html, /<h1\b/);
  assert.match(html, /class="[^"]*\bscreen\b/);
  assert.match(html, /data-echo-wifi-status="disconnected"/);
  assert.match(html, /data-echo-wifi-linked="false"/);
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    const url = new URL(decoded(match[1]),publicOrigin + '/');
    assert.equal(url.origin,publicOrigin);
    assert.match(url.pathname,/^\/public\/assets\/.+\.(?:webp|svg)$/i);
    assert.ok(files.has(url.pathname),'在线图片缺失：' + url.pathname);
    images.add(url.pathname);
  }
});
await check('在线调色卡仅提供主动交接，不出现直接设备连接表单', () => {
  const html = render('?screen=device');
  assert.match(html,/wb-colour-studio/);
  assert.match(html,/wb-online-handoff/);
  assert.match(html,/data-light-control="online-preview"/);
  assert.match(html,/Connect a wristband/);
  assert.match(html,/Open wristband controls/);
  assert.match(html,/wb-handoff-return/);
  assert.match(html,/返回画廊 · 继续参观/);
  assert.match(html,/关闭控灯标签页/);
  assert.match(html,/切回 <b>Gallery Echoes<\/b>/);
  assert.match(html,/Join GalleryEchoes Wi-Fi/);
  assert.match(html,/No password is needed/);
  assert.match(html,/class="wb-handoff-stage"[^>]*aria-expanded="false"/);
  assert.match(html,/class="wb-handoff-steps"[^>]*hidden=""/);
  assert.doesNotMatch(html,/wb-wifi-on-device|class="wb-wifi-connection|Board address|>Connect to board|>Connect your light|Go Live access/);
  assert.ok(html.indexOf('wb-studio-light-controls') < html.indexOf('wb-online-handoff'), '手环交接应位于选色/亮度控制后');
  assert.ok(handoffFrom(html));
});
await check('交接链接准确携带当前色值、亮度和开关', () => {
  for (const settings of [
    {customColour:'#12abef',brightness:37,lightOn:true},
    {customColour:'#ff00ff',brightness:64,lightOn:false},
    {customColour:'#abcdef',brightness:0,lightOn:true},
  ]) {
    const html = render('?screen=device',{'gallery-echoes-light-v1':JSON.stringify(settings)});
    assert.deepEqual(handoffFrom(html),{colour:settings.customColour,brightness:settings.brightness,lightOn:settings.lightOn});
    assert.match(html,/Preview only/);
    assert.match(html,/data-echo-wifi-linked="false"/);
  }
});
await check('在线入口忽略板载预填参数，保留访客自己的预览', () => {
  const settings = {customColour:'#ff00ff',brightness:64,lightOn:false};
  const html = render('?screen=device&colour=abcdef&brightness=99&power=1',{'gallery-echoes-light-v1':JSON.stringify(settings)});
  assert.deepEqual(handoffFrom(html),{colour:'#ff00ff',brightness:64,lightOn:false});
  assert.match(html,/data-echo-wifi-status="disconnected"/);
});
await check('板载合法交接只预填颜色，存储不可用时也不自动连接', () => {
  const query = '?screen=device&colour=12abef&brightness=37&power=0';
  for (const blocked of [false,true]) {
    const html = render(query,{},'device',blocked);
    assert.match(html,/--echo-color:#12abef/);
    assert.match(html,/data-echo-brightness="37"/);
    assert.match(html,/data-echo-light-on="false"/);
    assert.match(html,/--echo-led:#000000/);
    assert.match(html,/wb-wifi-on-device/);
    assert.match(html,/data-echo-wifi-status="disconnected"/);
    assert.match(html,/data-echo-wifi-linked="false"/);
    assert.match(html,/data-verification="none"/);
    assert.match(html,/No colour command has been acknowledged by a board/);
    assert.doesNotMatch(html,/wb-online-handoff/);
  }
});
await check('设备页首屏有明确本地返回，在线返回保留当前控制标签页', () => {
  const html = render('?screen=device&colour=12abef&brightness=37&power=0',{},'device');
  assert.match(html, /class="icon-button header-back-labeled"[^>]*aria-label="Back to gallery · 返回画廊"/);
  assert.ok(html.indexOf('header-back-labeled') < html.indexOf('wb-colour-studio'), '返回按钮不能藏在长色盘之后');
  assert.match(html, /顶部“返回画廊”可直接继续看展，无需互联网/);
  const link = html.match(/<a\b[^>]*href="https:\/\/gallery-echoes-mobile\.netlify\.app\/\?screen=home"[^>]*>/)?.[0];
  assert.ok(link, '设备页缺少原在线画廊入口');
  assert.match(link, /target="_blank"/);
  assert.match(link, /rel="noopener noreferrer"/);
  assert.match(html, /data-echo-light-on="false"/);
  assert.match(html, /data-echo-wifi-linked="false"/);
});
await check('板载拒绝非法交接，已有 Echo 仍与灯光入口独立', () => {
  const seed = {'gallery-echoes-light-v1':JSON.stringify({customColour:'#aabbcc',brightness:42,lightOn:true}),'gallery-echoes-colours-v1':JSON.stringify({monet:{feeling:'Curious',submittedAt:1000}})};
  const invalid = render('?screen=device&colour=12abef&brightness=37&power=0&power=1',seed,'device');
  assert.match(invalid,/--echo-color:#aabbcc/);
  assert.match(invalid,/data-echo-brightness="42"/);
  assert.match(render('?screen=detail&echo=monet',seed),/Your lavender echo is here/);
  assert.match(render('?screen=shared&echo=collection-1',seed),/perspective-first/);
  const expected = getLightOutput('#aabbcc',42,true).hex;
  assert.ok(invalid.includes('--echo-led:' + expected));
});

console.log(JSON.stringify({checks:results.length,passed:results.filter(result => result.passed).length,publicFiles:files.size,renderedRoutes:routes.length,referencedImages:images.size,results,limits:'只验证公开导出、真实组件初始 SSR、交接参数与模拟 SW 行为；不运行 React effects/点击、不代表浏览器布局或实物连接，也不验证线上托管权限。'},null,2));
if (results.some(result => !result.passed)) process.exitCode = 1;
