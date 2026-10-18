# Gallery Echoes · Netlify 发布包 / deployment package

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
