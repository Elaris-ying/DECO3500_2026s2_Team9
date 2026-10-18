# Gallery Echoes · 手机完整版固件 1.4.1

当前主入口为 [Gallery Echoes 在线版](https://gallery-echoes-mobile.netlify.app/)，使用 **Netlify Free** 托管；任何访客无需登录或连接单片机 Wi-Fi 即可浏览。公开入口码为 [Netlify 主二维码](E:/UQ/figma/mobile-qr/gallery-echoes-netlify-qr.png)，网址不变，无需更换现有 Netlify 二维码。**1.4.1 为板载界面增加返回画廊入口；已安装 1.4.0 的设备也需要上传新版 .ino 与 mobile_assets.h 一次。仅刷新公网网页不会更新板子。**

本固件用于可选实体控灯与本地副本，并将线上携带的灯色、亮度和电源预填为预览，仍须点击 Connect your light 才发送。此版本将完整 24 页 Gallery Echoes 原型放进 Arduino Nano ESP32。只有需要实体控灯时，手机才连接 **GalleryEchoes** 开放热点（无密码），再打开 **http://192.168.4.1/**。板子提供所有脚本、样式和压缩作品图片，不依赖电脑 Go Live 或互联网；公开主二维码仍指向在线版，不替用户切换 Wi-Fi。

用户已确认 1.2.0 直接 RGB 程序正常工作；本版保持原 setRGB 的三路 analogWrite 和 active-low 反转，不引入 PWM 读回、等待、回滚或自动颜色循环。

## 上传

板子已有 1.4.0 时，也按以下步骤升级一次，才能看到板载新按钮。已安装 1.4.1 后，日常浏览和同网址的公网更新不需要重复烧录。

1. 推荐使用 [Gallery-Echoes-Mobile-Netlify-1.4.1.zip](E:/UQ/figma/deliverables/Gallery-Echoes-Mobile-Netlify-1.4.1.zip)，解压后打开 `firmware/gallery_echoes_wifi/gallery_echoes_wifi.ino`。旧的 1.4.0 交付包保留历史。
2. **mobile_assets.h 必须与 .ino 保持同目录**，它包含完整应用。不要只复制 .ino 文字到另一个草稿。
3. Arduino IDE 选择 **Arduino ESP32 Boards by Arduino 2.x → Arduino Nano ESP32**、默认分区及默认引脚设置、实际 USB 端口。本机验证核心为 2.0.18-arduino.5。
4. 用 USB 数据线连接板子，先 Verify，再点击 **→ Upload**。修改电脑文件或刷新浏览器不会更新板上程序。
5. 上传完成后保持供电，手机重新加入 GalleryEchoes（无密码、无互联网）。打开 `http://192.168.4.1/` 应出现完整 Gallery Echoes 欢迎页；`/controller` 的原生备用页应显示 **Firmware 1.4.1**。

详细操作与二维码见 [MOBILE-SETUP.md](E:/UQ/figma/MOBILE-SETUP.md)，打印卡在 `mobile-qr/scan-card.html`。公开主码打开 Netlify 在线版；热点码用于加入 GalleryEchoes；本地控制码仅在已连接设备热点时打开板载面板。普通 QR 不能保证一次扫描同时加入 Wi-Fi 和打开网页。

## 手机上操作

欢迎页进入完整导览；首页 **Connect your light** 或页头 Wristband 可打开 Colour studio。点击面板里的 **Connect your light** 后，色盘、色相、HEX、亮度、开关和页面情绪色共用现有控灯链路。默认不自动连接或开灯。板载页面隐藏 IP 编辑和 USB 设置，保留可展开连接说明与原生测试页入口。

调色页顶部中文 **返回画廊** 和底部同名按钮直接进入同源板载首页，GalleryEchoes 没有互联网时也能继续看展。返回会保留当前颜色、亮度、开关并停止演示，不断开当前控灯连接；不会因返回而开灯或关灯。普通 **Stop sequence** 的恢复原设置行为不变。原生 `/controller` 也增加了本地 **Back to gallery / 返回画廊** 链接。

在线版的 **Open wristband controls** 在新标签页打开板子，原画廊标签页保留，可直接切回。设备页另有 **返回在线画廊** 外链，需要手机流量或普通 Wi-Fi；在线记录仍属于在线域名，不会与板载存储自动同步。简短步骤见 [RETURN-TO-GALLERY.md](E:/UQ/figma/RETURN-TO-GALLERY.md)。

屏幕预览和实体灯接收相同的选色；板载 RGB 支持各通道 0–255 混色，黑色或亮度 0 表示关灯。红绿蓝、黄青紫红和白色可以在 `/controller` 逐个测试。绿色电源指示灯不是调色目标。少数早期板绿蓝反色时，将 `SWAP_GREEN_BLUE` 改为 1 后重新 Upload。

## 路由与兼容

| 路径 | 行为 |
| --- | --- |
| `/`、`/index.html` | 完整手机原型，同源资源 |
| `/?screen=device` | 直接进入调色面板 |
| `/controller` | 原生七色测试与自由选色页，含返回板载画廊链接 |
| `/set?hex=rrggbb` | 校验六位 HEX，三路直接写入，纯文本 OK |
| `/off` | 三路关闭，纯文本 OFF |
| `/dist/...`、`/public/assets/...` | 仅发送打包清单内真实资源，缺失资源 404 |
| `/status` | 不提供，返回 404 |

额外 seq 等参数和原程序一样忽略。现有原型在 `/status` 404 后，识别原生 picker 或完整页面明确的设备标记，再使用 OK/OFF 请求应答模式；这不代表测量了实际光线。原生控制页同样串行发送、只保留最新待发颜色，并响应手机 input/change。

手机界面和灯光接口都在 `http://192.168.4.1:80`，无需跨域访问。电脑 Go Live 继续允许 localhost/127.0.0.1 合法端口；没有放开任意公网或其他局域网来源。多个用户最后发送的颜色会覆盖前一个颜色，因为控制的是同一盏灯。

## 打包与容量

`scripts/export-mobile.mjs` 把原始 PNG 保留在项目中，为板载版生成 WebP，压缩 JS/CSS/HTML，并生成 `mobile_assets.h`。本次资源条数、去重容量和各文件大小见 `mobile-export/mobile-manifest.json` 当前报告。二进制 gzip 使用 `send_P` 的显式长度，从 Flash 直接发送，不复制整份资源到 RAM。

1.4.1 的真实 Nano SDK 编译、完整链接、两种绿蓝配置镜像和分区容量结果见 `.firmware-build/compile-report.json` 当前报告；应核对报告固件版本为 1.4.1。不沿用 1.4.0 的二进制大小作为本版结果。没有使用额外文件系统上传插件。

本次未替用户执行 USB 上传或手机实体联调。公网 1.4.1 部署与无登录访问结果以 `deliverables/netlify-deployment.json`、`deliverables/netlify-public-verification.json` 当前报告为准。Netlify 主二维码无需连接板子即可浏览；新版板载返回按钮需要板子已安装完整 1.4.1 并保持供电。板载副本没有 Service Worker 离线缓存承诺，板子断电或手机离开热点后不能继续加载资源。

