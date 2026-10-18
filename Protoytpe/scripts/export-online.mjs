import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

// 公共二维码使用 HTTPS 在线应用；只在用户选择实体控灯时跳转到板子同源界面。
const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'mobile-export');
const destination = path.join(root, 'online-site/dist');
const webOnly = process.argv.includes('--web-only');
assert.ok(process.argv.slice(2).every(argument => argument === '--web-only'), '仅支持 --web-only 参数');
const manifest = JSON.parse(await readFile(path.join(source, 'mobile-manifest.json'), 'utf8'));
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
// --web-only 只读取已压缩的图片/图标，不生成 mobile_assets.h，不调用固件导出或编译。
async function protectedSnapshot() {
  const files = {};
  async function scan(relative) {
    for (const entry of (await readdir(path.join(root, relative), { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
      assert.ok(!entry.isSymbolicLink(), '保护目录不能包含符号链接');
      const name = relative + '/' + entry.name;
      if (entry.isDirectory()) await scan(name);
      else if (entry.isFile()) files[name] = digest(await readFile(path.join(root, name)));
    }
  }
  await scan('firmware');
  await scan('mobile-export');
  return files;
}
const protectedBefore = webOnly ? await protectedSnapshot() : null;
await mkdir(destination, { recursive: true });
for (const asset of manifest.assets) {
  const relative = asset.path.slice(1);
  assert.ok(relative && !relative.includes('..'), '导出资源路径无效');
  await mkdir(path.dirname(path.join(destination, relative)), { recursive: true });
  await writeFile(path.join(destination, relative), await readFile(path.join(source, relative)));
}
let stamp = manifest.stamp;
if (webOnly) {
  const { build } = await import('vite');
  await build({ root, logLevel: 'warn', build: { outDir: path.join(destination, 'dist'), emptyOutDir: false, minify: true } });
  stamp = createHash('sha256').update(await readFile(path.join(destination, 'dist/app.js'))).update(await readFile(path.join(destination, 'dist/style.css'))).digest('hex').slice(0, 10);
}
let html = await readFile(path.join(destination, 'index.html'), 'utf8');
html = html.replace('data-gallery-device="true"', 'data-gallery-online="true"')
  .replace(/<meta name="gallery-echoes-device"[^>]*>\s*/, '')
  .replace(/<noscript>[\s\S]*?<\/noscript>/, '<noscript><p>Please enable JavaScript to explore Gallery Echoes.</p></noscript>')
  .replace('</head>', '<script defer src="./online-bootstrap.js"></script></head>')
  .replaceAll('?v=' + manifest.stamp, '?v=' + stamp);
assert.ok(html.includes('data-gallery-online="true"') && !html.includes('data-gallery-device="true"'));
await writeFile(path.join(destination, 'index.html'), html);
const cacheVersion = createHash('sha256').update(html).update(stamp).digest('hex').slice(0, 12);
const resources = [...manifest.assets.map(asset => asset.path), '/online-bootstrap.js'];
const worker = `// Same-origin static cache only. Private device navigation is never intercepted.
const CACHE='gallery-echoes-online-${cacheVersion}';
const FILES=${JSON.stringify(resources)};
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('gallery-echoes-online-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  if(request.mode==='navigate')event.respondWith(fetch(request).catch(()=>caches.match('/index.html')));
  else event.respondWith(caches.match(request,{ignoreSearch:true}).then(cached=>cached||fetch(request)));
});
`;
const bootstrap = `// Online caching improves browsing after Wi-Fi changes; no device request occurs here.
if(location.protocol==='https:'&&'serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{});}
`;
await writeFile(path.join(destination, 'sw.js'), worker);
await writeFile(path.join(destination, 'online-bootstrap.js'), bootstrap);
const appAssets = {};
for (const relative of ['dist/app.js', 'dist/style.css']) {
  const bytes = await readFile(path.join(destination, relative));
  appAssets['/' + relative] = { originalBytes: bytes.length, sha256: digest(bytes) };
}
if (webOnly) assert.deepEqual(await protectedSnapshot(), protectedBefore, '纯网页构建不得更改单片机文件或板载导出');
await writeFile(path.join(root, 'online-site/build-manifest.json'), JSON.stringify({
  mode: webOnly ? 'web-only' : 'device-copy', stamp, cacheVersion, appAssets,
  firmwareUntouched: webOnly ? true : null, protectedFiles: protectedBefore,
}, null, 2) + '\n');
await writeFile(path.join(root, 'online-site/README.md'), '# Gallery Echoes\n\nPublic mobile gallery, with optional explicit local wristband control.\n\nStatic build in dist/. No accounts, server storage, credentials or device proxy.\n');
console.log(JSON.stringify({ destination, mode: webOnly ? 'web-only' : 'device-copy', publicEntry: true, privateDeviceRequestsOnLoad: false, assets: resources.length + 1, cacheVersion, firmwareUntouched: webOnly ? true : null }, null, 2));
