# Gallery Echoes · 在线扫码与可选实体控灯

## 不连接单片机也能打开

正式公开入口：[Gallery Echoes](https://gallery-echoes-mobile.netlify.app/)，当前使用 **Netlify Free** 托管。

任何访客用手机流量或普通 Wi-Fi 都能打开，不需要登录，也不需要连接 GalleryEchoes。扫描 [Netlify 主二维码](E:/UQ/figma/mobile-qr/gallery-echoes-netlify-qr.png) 可进入完整 24 页原型，浏览作品、填写 Echo、查看收藏和预览颜色。

本次纯网页更新的公开 URL 不变，**已有 Netlify 主二维码无需更换**。只有更早的旧公网入口码或把 192.168.4.1 当作公开主入口的旧码需要替换。入网码和本地控灯码仍各自保持原用途。

## 只有实体变色时才切换 Wi-Fi

1. 在在线原型的 Colour studio 选择颜色、亮度和开关，手环预览与界面即时呼应。
2. 点击 **Connect a wristband**，展开实体灯连接步骤。
3. 打开手机系统 Wi-Fi 设置，连接 **GalleryEchoes**，无密码。无互联网提示时保持此连接。
4. 回到刚才的网页，点击 **Open wristband controls**。它会在**新标签页**打开 `192.168.4.1` 的设备控制页；原在线画廊标签页会保留。
5. 在设备现有页面按原方式完成变色。打开控灯链接不等于已经连接或发送成功，在线原页也不会据此显示设备已连接。

浏览在线画廊、拖动色盘和预览不会自动请求私网、切换手机 Wi-Fi、跳转或开灯。在线 HTTPS 页面通过用户主动的普通页面导航进入设备 HTTP 页面，避免把私网 HTTP 请求直接嵌入在线站点；没有关闭浏览器安全保护。

## 连接后返回画廊

变色完成后，**关闭控灯标签页**，或点手机浏览器的**标签页列表**，切回原来的 **Gallery Echoes**。原在线页连接步骤内始终显示返回提示和 **返回画廊 · 继续参观** 按钮，点击即可继续在线参观，不必依赖浏览器后退历史。

这个返回入口在**原在线页**，不在 `192.168.4.1` 内部。设备页由单片机存储，公网网页无法跨域直接给它添加新按钮；当前方案保持设备页面和程序原样，不要求上传。在线提示不记录或判断控灯页是否打开，不声称设备连接或变色成功，也不会因继续参观而发送开灯或关灯指令。

需要重新加载图片或其他联网内容时，恢复手机流量或普通 Wi-Fi。原标签页已加载内容可能仍可用，但**不保证 GalleryEchoes 无互联网时整站离线可用**。在线感想和浏览记录仍归在线域名，不会与设备域名自动同步。简短操作见 [RETURN-TO-GALLERY.md](E:/UQ/figma/RETURN-TO-GALLERY.md)。

## 不需要 Upload 或新固件

**保持当前已经正常控灯的程序即可。此次只更新在线网页，不用连接 USB，不用 Upload，不用安装新固件。**先前 1.4.1 包属于可选的板载升级方案，当前推荐返回方式不依赖它，也不要求设备内部出现新按钮。

## 二维码与打印卡

- [mobile-qr/gallery-echoes-netlify-qr.png](E:/UQ/figma/mobile-qr/gallery-echoes-netlify-qr.png)：Netlify 公开主入口，平时扫码用这个。
- `mobile-qr/gallery-echoes-wifi-qr.png`：可选的 GalleryEchoes 入网码，仅实体灯操作时使用。
- `mobile-qr/gallery-echoes-local-control-qr.png`：可选本地调色面板码，仅已连设备热点时使用。
- `mobile-qr/scan-card.html`：双语打印卡，清晰区分在线浏览和可选实体灯操作。

普通 QR 不能保证一次扫描既切换 Wi-Fi 又打开另一个网页。这里的主码只打开在线原型，实体连接由用户按页面步骤主动完成。

## 验证与范围

全部 5 个 PNG 二维码已由独立 jsQR 1.4.0 解码并核对真实载荷，记录在 `mobile-qr/independent-decode.json`；生成器也核对了整数像素与完整白边。

Netlify 正式站点已发布。无登录公开访问及全部 **40 个静态文件**的内容和查询参数入口校验通过：39 个资源直接核对原始响应大小和 SHA-256；HTML 只移除本站 Netlify 注入的两段完整匹配的说明与徽章后，再与发布文件比对。证据在 [netlify-public-verification.json](E:/UQ/figma/deliverables/netlify-public-verification.json)。24 页在线界面、资源和交接参数另有本地软件检查；这不等于已完成手机实扫、页面点击或硬件联调。在线版使用同源静态资源预缓存，但是否已在某台手机缓存完成取决于浏览器及首次网络请求，不能保证首次离线可打开。

本次采用 `scripts/export-online.mjs --web-only` 生成网页产物，不生成板载头文件、不编译或上传固件。公网更新结果见 `deliverables/netlify-deployment.json` 与当前公开校验报告。本次未完成手机实扫或实体灯现场联调。Echo 为本机记录，地图位置、NFC、振动和其他访客感想仍沿用原型的模拟范围。

后续更新继续部署到同一个 Netlify 站点，步骤和现有 Site ID 见 [NETLIFY-SETUP.md](E:/UQ/figma/NETLIFY-SETUP.md)，不需要重新创建网站。正式网址不变时也无需替换二维码。认证凭据不得写入源码。手机端视觉仍保留奶油白、衬线标题与粉彩主题。
