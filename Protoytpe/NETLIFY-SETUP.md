# Gallery Echoes · Netlify 正式部署

正式公开入口：[https://gallery-echoes-mobile.netlify.app/](https://gallery-echoes-mobile.netlify.app/)。当前使用 **Netlify Free**，任何访客无需登录，使用手机流量或普通 Wi-Fi 即可浏览完整原型。

当前采用**纯网页返回方案**：在线 **Open wristband controls** 用新标签页打开设备，保留原在线画廊。控灯后关闭设备标签页，或从手机标签页列表切回 **Gallery Echoes**，再点击原在线页的 **返回画廊 · 继续参观**。

**本次不动单片机，不需要 Upload 或新固件，现有正常控灯程序保持。**`192.168.4.1` 页面由设备存储，在线站点不能跨域直接给它添加按钮，因此不要求设备页变化。先前 1.4.1 固件包属于可选的板载升级方案，当前推荐方案不依赖它。原在线页的连接步骤内始终显示返回提示和按钮，不记录或判断控灯页是否打开，也不声称设备成功连接或变色。

需要重新加载联网内容时恢复普通 Wi-Fi 或手机流量。保留标签页不保证 GalleryEchoes 无互联网时整站可用；在线访问记录仍属于在线域名。

## 当前站点与验证

- Site ID：`6af768ac-2500-4d87-9cd9-fefba8517b39`
- 当前 Production Deploy ID：见 `deliverables/netlify-deployment.json` 当前报告；每次重新发布的 Deploy ID 不同，不将旧版 ID 当作本次网页更新结果。
- 正式 URL：`https://gallery-echoes-mobile.netlify.app/`
- 发布目录：`netlify-site/dist`，其顶层包含 `index.html`。
- 配置：`netlify-site/netlify.toml` 使用 `publish = "dist"`、空构建命令；无需 SPA 全路径回退。
- 当前公开访问证据：[deliverables/netlify-public-verification.json](E:/UQ/figma/deliverables/netlify-public-verification.json)，结果和资源容量以本次重新部署后的报告为准。校验对全部 **40 个应用文件**发起无登录请求，39 个非 HTML 资源的原始响应大小与 SHA-256 直接匹配发布包。HTML 响应包含 Netlify 在边缘注入的站点说明与 public 徽章；验证脚本只移除这两段完整、逐字匹配的本站注入块后再与发布文件比对，同时校验根入口与查询参数入口。报告另保留原始响应的大小与 SHA-256，不声称原始 HTML 响应和发布文件逐字节相同。

这些检查验证公开静态访问，不代表已完成手机扫码、触屏布局、浏览器权限或实体灯联调。完整 24 屏及交接逻辑另有本地软件检查。

## 二维码与交付

- [Netlify 主二维码](E:/UQ/figma/mobile-qr/gallery-echoes-netlify-qr.png) 指向上述正式公网地址；**本次 URL 不变，无需更换已有 Netlify 码**。
- [GalleryEchoes 入网码](E:/UQ/figma/mobile-qr/gallery-echoes-wifi-qr.png) 与本地控灯码用途不变，只在主动使用实体灯时需要。
- 先前固件交付包保留历史或可选用途；本次纯网页返回无需下载固件包。
- [连接后返回画廊的简短步骤](E:/UQ/figma/RETURN-TO-GALLERY.md)。
- 全部 5 个 PNG 二维码已由独立 jsQR 1.4.0 解码并核对载荷，证据在 `mobile-qr/independent-decode.json`；尚未完成真实手机现场扫码。

## 后续更新同一个站点

1. 修改网页源码、构建并完成相应软件检查。此次使用纯网页流程，不运行 `export-mobile.mjs`，不生成 `mobile_assets.h`，不执行 SDK 编译或 USB Upload：

   ```powershell
   npm run build
   node scripts/export-online.mjs --web-only
   node scripts/export-netlify.mjs
   ```

   `--web-only` 生成 `online-site/dist`；`export-netlify.mjs` 只读取该已验证网页产物并生成 `netlify-site/dist`，不部署，也不覆盖本文。固件和 `mobile-export` 保持原样。
2. 核对 `netlify-site/package-manifest.json`，确保静态包中的应用文件与源产物一致。使用预构建目录手动上传时，不需要构建命令。
3. 在 Netlify 打开 **现有 Gallery Echoes 项目**，确认 Site ID 仍为 `6af768ac-2500-4d87-9cd9-fefba8517b39`，将 `netlify-site/dist` 部署到同一站点的 Production。使用 CLI 或 API 时同样指定这个 Site ID。**无需新建站点。**
4. 保持公开访问且不启用登录或密码拦截，再运行：

   ```powershell
   node scripts/verify-netlify-deployment.mjs https://gallery-echoes-mobile.netlify.app/
   ```

5. 确认退出码成功和新验证报告后，记录新的 Deploy ID。Site ID 与正式 URL 保持不变；同网址的内容更新不需要重新生成 QR。

包的导出不意味着线上站点已经更新。认证令牌等凭据不得写入源码或交付包。

Netlify 官方操作说明：[Create deploys](https://docs.netlify.com/deploy/create-deploys/)。

## English

The production gallery is **https://gallery-echoes-mobile.netlify.app/**, hosted on **Netlify Free** and accessible to visitors without login. Use the current deployment and public-verification reports for this web update. Verification requests all 40 files without authentication, compares 39 non-HTML responses directly, and removes only two exact, site-specific Netlify additions before comparing HTML. This does not replace phone interaction or physical light testing.

For future releases, deploy the prebuilt `netlify-site/dist` folder to the **same site**, ID `6af768ac-2500-4d87-9cd9-fefba8517b39`; do not create another site. Verify the new deployment and update its report. The public URL and QR remain unchanged. Export using `node scripts/export-online.mjs --web-only`; do not regenerate board headers or compile firmware for this update.

The device controller opens in a new tab. After changing the light, close that tab or switch back to Gallery Echoes, then choose **返回画廊 · 继续参观** on the retained online page. The return hint and button are always shown within the connection steps; they do not track whether a tab opened or claim a board connection. **Keep the existing working board program: no Upload or new firmware is needed.** The earlier optional 1.4.1 board package is not required. Restore normal Wi-Fi or mobile data when online resources need loading; retaining a tab does not guarantee full offline operation on the device access point.
