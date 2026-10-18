const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

// 采用与 ReportLab 编码器独立的 jsQR，从导出的真实 PNG 解码，不访问网络。
// 将这两个库路径作为参数，避免把本机工具目录作为原型依赖或打入发布包。
const [decoderPath, pngReaderPath] = process.argv.slice(2);
assert.ok(decoderPath && pngReaderPath, 'Usage: node scripts/verify-mobile-qr.cjs <jsqr-module> <pngjs-module>');
const jsQR = require(decoderPath);
const { PNG } = require(pngReaderPath);
const project = path.resolve(__dirname, '..');
const output = path.join(project, 'mobile-qr');
const metadata = JSON.parse(fs.readFileSync(path.join(output, 'metadata.json'), 'utf8'));
const expected = 'https://gallery-echoes-mobile.netlify.app/';
assert.equal(metadata.app_url, expected);
const targets = [
  ...metadata.artifacts.map(item => ({ filename: item.name + '.png', payload: item.payload })),
  ...metadata.public_aliases.filter(item => item.name.endsWith('.png')).map(item => ({ filename: item.name, payload: item.payload })),
];
const decoded = targets.map(item => {
  assert.equal(path.basename(item.filename), item.filename);
  const bytes = fs.readFileSync(path.join(output, item.filename));
  const image = PNG.sync.read(bytes);
  const result = jsQR(new Uint8ClampedArray(image.data), image.width, image.height);
  assert.ok(result, '二维码未能解码：' + item.filename);
  assert.equal(result.data, item.payload, '二维码实际网址/内容不同：' + item.filename);
  return { file: item.filename, payload: result.data, width: image.width, height: image.height, sha256: createHash('sha256').update(bytes).digest('hex') };
});
assert.ok(decoded.some(item => item.file === 'gallery-echoes-netlify-qr.png' && item.payload === expected));
const report = { decoder: 'jsQR 1.4.0', independentDecodePassed: true, decoded, limits: '从真实 PNG 独立解码通过；没有替代真实手机扫码与硬件联调。' };
fs.writeFileSync(path.join(output, 'independent-decode.json'), JSON.stringify(report, null, 2) + '\n');
metadata.verification = 'PNG pixels, white quiet zone and encoded matrix checked; all PNG variants independently decoded with jsQR 1.4.0. No real phone scan has been used.';
metadata.independent_decoder_report = 'independent-decode.json';
fs.writeFileSync(path.join(output, 'metadata.json'), JSON.stringify(metadata, null, 2) + '\n');
console.log(JSON.stringify({ independentDecodePassed: true, pngFiles: decoded.length, appUrl: expected }, null, 2));
