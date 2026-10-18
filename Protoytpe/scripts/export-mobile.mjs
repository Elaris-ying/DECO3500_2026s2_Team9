import assert from 'node:assert/strict';
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { build } from 'vite';

// 完整原型打包到 Nano 的程序 Flash；不使用 CDN、文件系统上传器或电脑代理。
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'mobile-export');
const firmware = path.join(root, 'firmware/gallery_echoes_wifi');
const version = '1.4.1';
const budget = 2100000; // 默认 Nano 3 MiB 应用分区，余下空间留给真实 Wi-Fi 固件。
const require = createRequire(import.meta.url);
let sharp;
try { sharp = require('sharp'); }
catch {
  const configured = process.env.GALLERY_SHARP_MODULE || 'C:/Users/yf/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.cjs';
  try { sharp = require(configured); }
  catch { throw Error('Rebuilding needs sharp. Install sharp in this project or set GALLERY_SHARP_MODULE to its module path.'); }
}
await mkdir(path.join(output, 'public/assets'), { recursive: true });
await mkdir(path.join(output, 'dist'), { recursive: true });
await build({ root, logLevel: 'warn', build: { outDir: path.join(output, 'dist'), emptyOutDir: false, minify: true } });
const app = await readFile(path.join(output, 'dist/app.js'));
const css = await readFile(path.join(output, 'dist/style.css'));
const stamp = createHash('sha256').update(app).update(css).digest('hex').slice(0, 10);
const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="44" fill="#f7f3ec"/><circle cx="145" cy="48" r="19" fill="#c1abe5"/><text x="25" y="130" font-family="Georgia,serif" font-style="italic" font-size="102" letter-spacing="-9" fill="#292822">ge.</text></svg>';
const manifest = { name: 'Gallery Echoes', short_name: 'Echoes', start_url: '/', scope: '/', display: 'standalone', background_color: '#f7f3ec', theme_color: '#f7f3ec', icons: [{ src: '/app-icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/app-icon-512.png', sizes: '512x512', type: 'image/png' }] };
const html = `<!doctype html>
<html lang="en" data-gallery-device="true" data-gallery-assets="webp"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#f7f3ec"><meta name="gallery-echoes-device" content="nano-esp32-direct-rgb">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Gallery Echoes">
<meta name="description" content="Your gallery companion. Explore art, leave an echo, and choose your wristband light.">
<title>Gallery Echoes</title><link rel="icon" href="./app-icon.svg"><link rel="apple-touch-icon" href="./app-icon-192.png">
<link rel="manifest" href="./manifest.webmanifest"><link rel="stylesheet" href="./dist/style.css?v=${stamp}">
<script defer src="./dist/app.js?v=${stamp}"></script></head>
<body><div id="root"><p style="padding:24px;font-family:Georgia,serif;color:#514735">Gallery Echoes · Opening your visit…</p></div>
<noscript><p>Enable JavaScript for the complete gallery. <a href="/controller">Open the simple light controller</a>.</p></noscript></body></html>`;

const entries = [];
async function add(relative, bytes, type, compress = false) {
  const plain = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  await mkdir(path.dirname(path.join(output, relative)), { recursive: true });
  await writeFile(path.join(output, relative), plain);
  const zipped = compress ? gzipSync(plain, { level: 9 }) : null;
  const gzip = !!zipped && zipped.length < plain.length;
  const data = gzip ? zipped : plain;
  if (gzip) await writeFile(path.join(output, relative + '.gz'), data);
  entries.push({ path: '/' + relative.replaceAll('\\', '/'), type, gzip, bytes: data, originalBytes: plain.length, sha256: createHash('sha256').update(data).digest('hex') });
}
await add('index.html', html, 'text/html; charset=utf-8', true);
await add('dist/app.js', app, 'text/javascript; charset=utf-8', true);
await add('dist/style.css', css, 'text/css; charset=utf-8', true);
await add('manifest.webmanifest', JSON.stringify(manifest), 'application/manifest+json', true);
await add('app-icon.svg', icon, 'image/svg+xml', true);
for (const dimension of [192, 512]) await add(`app-icon-${dimension}.png`, await sharp(Buffer.from(icon)).resize(dimension).png().toBuffer(), 'image/png');

const names = (await readdir(path.join(root, 'public/assets'))).filter(name => /\.(?:png|svg)$/i.test(name)).sort();
const converted = [];
// 每次只压缩四张，避免大图同时解码占满内存；原始美术素材保留不改。
for (let offset = 0; offset < names.length; offset += 4) {
  const results = await Promise.all(names.slice(offset, offset + 4).map(async name => {
    const original = await readFile(path.join(root, 'public/assets', name));
    if (/\.svg$/i.test(name)) return { name, data: original, type: 'image/svg+xml', compress: true };
    const data = await sharp(original).rotate().resize({ width: 880, height: 1100, fit: 'inside', withoutEnlargement: true }).webp({ quality: 70, effort: 6 }).toBuffer();
    return { name: name.replace(/\.png$/i, '.webp'), data, type: 'image/webp', compress: false };
  }));
  for (const result of results) { await add('public/assets/' + result.name, result.data, result.type, result.compress); converted.push(result.name); }
}
const unique = new Map();
for (const entry of entries) if (!unique.has(entry.sha256)) unique.set(entry.sha256, { symbol: 'MOBILE_DATA_' + unique.size, bytes: entry.bytes });
const total = [...unique.values()].reduce((sum, item) => sum + item.bytes.length, 0);
assert.ok(total <= budget, `Mobile data is ${total} bytes, over ${budget}. Reduce image size/quality before compiling; do not change the board partition silently.`);
const declarations = [...unique.values()].map(({ symbol, bytes }) => {
  const lines = [];
  for (let offset = 0; offset < bytes.length; offset += 20) lines.push('  ' + [...bytes.subarray(offset, offset + 20)].map(value => '0x' + value.toString(16).padStart(2, '0')).join(',') + ',');
  return `static const uint8_t ${symbol}[] PROGMEM = {\n${lines.join('\n')}\n};`;
});
const rows = entries.map(entry => `  {${JSON.stringify(entry.path)}, ${JSON.stringify(entry.type)}, ${unique.get(entry.sha256).symbol}, ${entry.bytes.length}, ${entry.gzip}},`);
const header = `// Generated by scripts/export-mobile.mjs. Do not edit. Complete mobile app ${version}.\n#pragma once\n#include <Arduino.h>\nstruct MobileAsset { const char* path; const char* type; const uint8_t* data; size_t length; bool gzip; };\n${declarations.join('\n')}\nstatic const MobileAsset MOBILE_ASSETS[] = {\n${rows.join('\n')}\n};\nstatic const size_t MOBILE_ASSET_COUNT = sizeof(MOBILE_ASSETS) / sizeof(MOBILE_ASSETS[0]);\n`;
await writeFile(path.join(firmware, 'mobile_assets.h'), header);
const report = { firmwareVersion: version, entry: 'http://192.168.4.1/', stamp, uniqueStoredBytes: total, budgetBytes: budget, assets: entries.map(({ bytes, ...entry }) => ({ ...entry, storedBytes: bytes.length, symbol: unique.get(entry.sha256).symbol })) };
await writeFile(path.join(output, 'mobile-manifest.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ output, firmwareHeader: path.join(firmware, 'mobile_assets.h'), routes: entries.length, uniqueStoredBytes: total, budgetBytes: budget, imageFiles: converted.length, largestTransfer: Math.max(...entries.map(entry => entry.bytes.length)) }, null, 2));
