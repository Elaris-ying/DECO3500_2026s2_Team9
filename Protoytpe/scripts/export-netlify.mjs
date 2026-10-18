import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile, mkdir, writeFile, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 只读取已经验证的在线静态产物；不依赖任何原托管项目身份或凭据。
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(projectRoot, 'online-site', 'dist');
const packageRoot = path.join(projectRoot, 'netlify-site');
const destination = path.join(packageRoot, 'dist');

async function filesIn(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name, 'en'))) {
    assert.ok(!entry.isSymbolicLink(), `不复制符号链接：${entry.name}`);
    assert.ok(!entry.name.startsWith('.'), `不复制隐藏配置：${entry.name}`);
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await filesIn(path.join(directory, entry.name), relative));
    else {
      assert.ok(entry.isFile(), `资源不是常规文件：${relative}`);
      files.push(relative);
    }
  }
  return files;
}

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const sourceFiles = await filesIn(source);
assert.equal(sourceFiles.length, 40, '在线应用应包含已验证的 40 个文件；产物变化后请先重新验证。');
assert.ok(sourceFiles.includes('index.html') && sourceFiles.includes('dist/app.js'));
const sourceHtml = await readFile(path.join(source, 'index.html'), 'utf8');
assert.ok(sourceHtml.includes('data-gallery-online="true"'));
assert.ok(!sourceHtml.includes('data-gallery-device="true"'));

// 仅重建此脚本自己管理的发布目录；先确认绝对路径仍位于专用 Netlify 包内。
assert.equal(path.dirname(destination), packageRoot);
assert.equal(path.basename(destination), 'dist');
assert.ok(path.relative(projectRoot, destination).split(path.sep).join('/') === 'netlify-site/dist');
await mkdir(packageRoot, { recursive: true });
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });

const applicationFiles = [];
for (const relative of sourceFiles) {
  const bytes = await readFile(path.join(source, relative));
  // 旧托管域名不会带入新包；不改写已验证应用的任何字节。
  assert.ok(!bytes.includes(Buffer.from('chatgpt.site')), `资源仍包含旧托管域名：${relative}`);
  const target = path.join(destination, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(path.join(source, relative), target);
  const copied = await readFile(target);
  assert.equal(digest(copied), digest(bytes), `复制校验失败：${relative}`);
  applicationFiles.push({ path: relative, bytes: bytes.length, sha256: digest(bytes) });
}

// 所有无内容哈希文件都先向服务器重验证，避免更新后仍取到旧 JS/CSS。
// Service Worker 的应用内离线缓存保持原样；这里不添加 SPA 路径重写。
const headers = `/*
  Cache-Control: public, max-age=0, must-revalidate
  X-Content-Type-Options: nosniff

/sw.js
  Cache-Control: no-cache
`;
await writeFile(path.join(destination, '_headers'), headers);
const configuration = `# 在本目录作为项目根目录时，直接发布已有 dist；不运行构建。
[build]
  publish = "dist"
  command = ""
`;
await writeFile(path.join(packageRoot, 'netlify.toml'), configuration);

const readme = `# Gallery Echoes · Netlify 发布包 / deployment package

**内容：已构建的静态发布文件。导出不会发布站点或更改二维码；当前正式站点与维护记录见原项目 NETLIFY-SETUP.md。**
**Contents: prebuilt static files. Exporting does not deploy or change QR codes; consult NETLIFY-SETUP.md in the original project for the current live site.**

## 中文

1. 解压后，手动发布时将本包的 **dist 文件夹**上传到 Netlify；其中顶层必须能看到 index.html。不要只上传 dist 内的第二层 dist 文件夹。
2. 这是已经构建好的静态网站，手动上传不需要运行构建命令。若使用本目录作为仓库项目根目录，随附 netlify.toml 指定发布目录 dist，构建命令为空。
3. 保持网站对公众开放，访客应无需登录即可打开。部署后先在手机和无痕窗口验证所有页面，再以实际可访问的正式 HTTPS 网址重新生成公开二维码和说明。
4. 在线页面可以直接浏览完整美术馆原型；只有实体控灯需要主动连接 GalleryEchoes 无密码 Wi-Fi，再打开板子控制页。更换公开托管不会改变板子本地地址。
5. 本包以域名根路径发布。24 个页面通过查询参数切换，无需 SPA 全路径重写。_headers 只配置静态缓存重验证。

本包不包含账户身份、凭据、原托管配置、node_modules 或设备固件。应用文件与已验证 online-site/dist 的 40 个文件逐字节相同；package-manifest.json 记录每个文件的 SHA-256。

## English

- For a manual deployment, upload the included **dist folder**, with index.html at its top level. Do not upload the nested dist folder by itself.
- The site is prebuilt. Manual upload needs no build command. For this folder as a repository root, netlify.toml publishes dist with an empty build command.
- Make the deployed site public so visitors need no login. Verify the final HTTPS URL on a phone and in a private window before replacing the public QR code and documentation.
- The complete gallery opens online. Physical light control remains an explicit handoff to the password-free GalleryEchoes Wi-Fi and the board controller.
- Publish at the domain root. All 24 screens use query parameters; no catch-all SPA rewrite is included. The added _headers file requests static revalidation.
- No credentials, provider identity, original hosting configuration, node_modules or firmware are included. All 40 application files are byte-for-byte copies, recorded in package-manifest.json.

Official deployment guide: https://docs.netlify.com/deploy/create-deploys/

## 重新生成 / Re-export

在完整原项目中运行 / From the original project:

    node scripts/export-netlify.mjs

脚本只读取 online-site/dist 并重建 netlify-site/dist，不执行部署、不改原托管产物，也不生成正式网址或二维码。
The script reads online-site/dist and rebuilds netlify-site/dist. It does not deploy, modify the source build, assign a URL or regenerate QR codes.
`;
await writeFile(path.join(packageRoot, 'README.md'), readme);
// NETLIFY-SETUP.md 记录已上线站点和维护步骤；重新导出不能覆盖实际部署记录。

const applicationBytes = applicationFiles.reduce((sum, item) => sum + item.bytes, 0);
const manifest = {
  format: 1,
  status: 'ready-to-deploy',
  deployed: false,
  source: 'online-site/dist',
  publish: 'dist',
  basePath: '/',
  applicationFileCount: applicationFiles.length,
  applicationBytes,
  addedFiles: [{ path: 'dist/_headers', bytes: Buffer.byteLength(headers), sha256: digest(headers) }],
  applicationFiles,
};
await writeFile(path.join(packageRoot, 'package-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
const copiedFiles = await filesIn(destination);
assert.deepEqual(copiedFiles.filter(name => name !== '_headers'), sourceFiles);
console.log(JSON.stringify({
  destination,
  applicationFileCount: applicationFiles.length,
  applicationBytes,
  addedDistFiles: ['_headers'],
  applicationHashesVerified: true,
  deployed: false,
}, null, 2));
