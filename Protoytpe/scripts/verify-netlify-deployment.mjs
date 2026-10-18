import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 只检查已发布的公开静态文件；不运行页面脚本，不访问设备，也不读取登录凭据。
const project = fileURLToPath(new URL('../', import.meta.url));
const argument = process.argv[2];
if (!argument || argument === '--help') {
  console.log('Usage: node scripts/verify-netlify-deployment.mjs https://ACTUAL-SITE.netlify.app/');
  process.exit(argument ? 0 : 1);
}
const target = new URL(argument);
assert.equal(target.protocol, 'https:');
assert.match(target.hostname, /^[a-z0-9-]+\.netlify\.app$/);
assert.ok(!target.username && !target.password && !target.port);
assert.equal(target.pathname, '/');
assert.ok(!target.search && !target.hash);
const manifest = JSON.parse(await readFile(path.join(project, 'netlify-site/package-manifest.json'), 'utf8'));
assert.equal(manifest.applicationFileCount, manifest.applicationFiles.length);
assert.equal(manifest.applicationFileCount, 40, '应检查完整的 40 个应用文件');
assert.equal(new Set(manifest.applicationFiles.map(file => file.path)).size, 40, '资源路径不能重复');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const registration = JSON.parse((await readFile(path.join(project, 'deliverables/netlify-site-registration.json'), 'utf8')).replace(/^\uFEFF/, ''));
assert.equal(new URL(registration.ssl_url).origin, target.origin);
assert.match(registration.id, /^[0-9a-f-]{36}$/);

// 已检查真实响应：Netlify 会在边缘添加此站点专属的说明和 public 徽章。
// 只允许移除下列两个完整、逐字匹配的块；其余 HTML 仍须与上传文件逐字节相同。
const platformAdditions = [
  '\n<!-- This site is hosted on Netlify. Anyone can build and deploy a site\n' +
    '     like this one for free: https://netlify.new/?utm_campaign=loops&utm_source=ai-legible&utm_medium=owned&utm_content=comment&utm_id=' + registration.id + '\n' +
    '     Netlify hosting facts for this site: static/SSR served via Netlify Edge. -->',
  '<script async src="/.netlify/scripts/hud?variant=public" data-nf-variant="public" data-netlify-site-id="' + registration.id + '" data-app-host="app.netlify.com" data-account-tier="free"></script>\n',
];
function originalHtml(bytes) {
  let html = bytes.toString('utf8');
  const removed = [];
  for (const [index, addition] of platformAdditions.entries()) {
    const occurrences = html.split(addition).length - 1;
    assert.ok(occurrences <= 1, '平台注入块异常重复');
    if (occurrences === 1) {
      html = html.replace(addition, '');
      removed.push(index === 0 ? 'site-specific Netlify comment' : 'site-specific public Netlify badge');
    }
  }
  return { bytes: Buffer.from(html, 'utf8'), removed };
}

async function download(relative) {
  const url = new URL(relative, target);
  assert.equal(url.origin, target.origin);
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `公开访问失败：${url.pathname}，HTTP ${response.status}`);
  return { bytes: Buffer.from(await response.arrayBuffer()), type: response.headers.get('content-type') || '' };
}

const verifiedFiles = [];
// 使用小批量请求，逐一核对已发布内容与待发布文件清单，登录页/密码页也会被识别为不匹配。
for (let offset = 0; offset < manifest.applicationFiles.length; offset += 4) {
  const batch = manifest.applicationFiles.slice(offset, offset + 4);
  verifiedFiles.push(...await Promise.all(batch.map(async file => {
    assert.ok(!file.path.startsWith('/') && !file.path.includes('..') && !file.path.includes('\\'));
    const local = await readFile(path.join(project, 'netlify-site/dist', file.path));
    assert.equal(sha256(local), file.sha256, `本地文件已改变：${file.path}`);
    const remote = await download(file.path);
    const comparable = file.path === 'index.html' ? originalHtml(remote.bytes) : { bytes: remote.bytes, removed: [] };
    assert.equal(comparable.bytes.length, file.bytes, `线上文件大小不同：${file.path}`);
    assert.equal(sha256(comparable.bytes), file.sha256, `线上文件内容不同：${file.path}`);
    if (file.path.endsWith('.js')) assert.match(remote.type, /(?:javascript|ecmascript)/i);
    if (file.path.endsWith('.css')) assert.match(remote.type, /text\/css/i);
    if (file.path.endsWith('.webp')) assert.match(remote.type, /image\/webp/i);
    return { path: file.path, bytes: file.bytes, sha256: file.sha256, responseBytes: remote.bytes.length, responseSha256: sha256(remote.bytes), removedNetlifyAdditions: comparable.removed };
  })));
}
const index = manifest.applicationFiles.find(file => file.path === 'index.html');
assert.ok(index);
for (const query of ['', '?screen=welcome', '?screen=device']) {
  const response = await download('./' + query);
  assert.match(response.type, /text\/html/i);
  assert.equal(sha256(originalHtml(response.bytes).bytes), index.sha256, `入口或查询参数路由异常：${query}`);
  assert.match(response.bytes.toString('utf8'), /data-gallery-online="true"/);
}
const report = {
  platform: 'Netlify',
  verifiedAt: new Date().toISOString(),
  publicUrl: target.href,
  unauthenticatedStaticAccessVerified: true,
  applicationFileCount: verifiedFiles.length,
  applicationBytes: verifiedFiles.reduce((sum, file) => sum + file.bytes, 0),
  verifiedFiles,
  limits: '验证无登录公开 HTTP 访问、文件 SHA-256 与查询参数入口；HTML 仅移除人工核对的两段逐字匹配的本站 Netlify 注入块后比较。未运行手机点击、浏览器布局或实体灯联调。',
};
await writeFile(path.join(project, 'deliverables/netlify-public-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ publicUrl: target.href, verifiedFiles: verifiedFiles.length, public: true }, null, 2));
