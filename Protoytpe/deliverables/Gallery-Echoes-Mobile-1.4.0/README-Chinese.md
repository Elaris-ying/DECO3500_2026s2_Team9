# Gallery Echoes · 在线扫码与可选实体控灯

## 不连接单片机也能打开

新的公开入口：**https://gallery-echoes-mobile-visit.citrusdeer8.chatgpt.site/**

任何访客用手机流量或普通 Wi-Fi 都能打开，不需要登录，也不需要连接 GalleryEchoes。扫描 `mobile-qr/gallery-echoes-app-qr.png` 可进入完整 24 页原型，浏览作品、填写 Echo、查看收藏和预览颜色。

之前的二维码直接编码 192.168.4.1，只能在单片机网络内使用。请替换已经保存或打印的旧码；新主二维码编码的是上述公开 HTTPS 地址。

## 只有实体变色时才切换 Wi-Fi

1. 在在线原型的 Colour studio 选择颜色、亮度和开关，手环预览与界面即时呼应。
2. 点击 **Connect a wristband**，展开实体灯连接步骤。
3. 打开手机系统 Wi-Fi 设置，连接 **GalleryEchoes**，无密码。无互联网提示时保持此连接。
4. 回到刚才的网页，点击 **Open wristband controls**。它会在同一标签页打开板载调色面板，并带上已选颜色、亮度及电源状态。
5. 在板载面板点击 **Connect your light** 后才真正发送，后续调色和亮度直接作用于实体 RGB 灯。黑色或亮度 0 表示关灯。

浏览在线画廊、拖动色盘和预览不会自动请求私网、切换手机 Wi-Fi、跳转或开灯。在线 HTTPS 页面通过用户主动的普通页面导航进入设备 HTTP 页面，避免把私网 HTTP 请求直接嵌入在线站点；没有关闭浏览器安全保护。

回到普通 Wi-Fi 或手机流量后，可以重新打开同一个公开入口继续看展。线上和板载页面各有独立的浏览器存储；交接只传递灯色、亮度和电源，不上传作品感受或访客个人资料。

## 实体控灯衔接需上传 1.4.0 一次

单纯浏览公开原型 **不需要上传固件**。若要让选色自动带入板载完整面板，请上传 `deliverables/Gallery-Echoes-Mobile-1.4.0.zip` 中的新固件：

1. 解压后，确保 `firmware/gallery_echoes_wifi/gallery_echoes_wifi.ino` 和 `mobile_assets.h` 在同一文件夹。
2. USB 数据线连接 Nano ESP32。在 Arduino IDE 选择 **Arduino ESP32 Boards by Arduino 2.x → Arduino Nano ESP32**、默认分区/引脚与正确端口。
3. 打开 .ino，先 Verify，再 **→ Upload**，等待完成。不能只复制 .ino 到新草稿，因为完整界面在 mobile_assets.h 中。
4. 保持板子供电；手机连 GalleryEchoes 后，`http://192.168.4.1/controller` 显示 **Firmware 1.4.0**。

1.4.0 保留用户已确认正常的三路 `analogWrite` 控灯方式；只增加交接参数预填，不自动连接或写灯。根地址仍有完整本地界面，`/controller` 保留七色直接测试页，`/set?hex=...`、`/off` 接口保持原样。

## 二维码与打印卡

- `mobile-qr/gallery-echoes-app-qr.png`：公开主入口，平时扫码用这个。
- `mobile-qr/gallery-echoes-wifi-qr.png`：可选的 GalleryEchoes 入网码，仅实体灯操作时使用。
- `mobile-qr/gallery-echoes-local-control-qr.png`：可选本地调色面板码，仅已连设备热点时使用。
- `mobile-qr/scan-card.html`：双语打印卡，清晰区分在线浏览和可选实体灯操作。

普通 QR 不能保证一次扫描既切换 Wi-Fi 又打开另一个网页。这里的主码只打开在线原型，实体连接由用户按页面步骤主动完成。

## 验证与范围

在线站点已经发布，并设置为 public；部署、源码提交与公开状态记录在 `deliverables/online-deployment.json`。24 页在线界面、资源和交接参数的软件检查通过。在线版使用同源静态资源预缓存，但是否已在某台手机缓存完成取决于浏览器及首次网络请求，不能保证首次离线可打开。

固件两种绿蓝配置均完成真实 SDK 编译、完整链接和镜像生成，各 **1,671,520 字节**，适合默认 3 MiB 应用分区。尚未替用户 USB 上传或完成新版手机/实体灯现场联调；二维码已核对编码与像素，仍需手机实扫。Echo 为本机记录，地图位置、NFC、振动和其他访客感想仍沿用原型的模拟范围。

修改后依次运行 `scripts/export-mobile.mjs`、`scripts/export-online.mjs`，验证后通过 Sites 工作流更新同一个站点；不要创建重复站点。公开身份保存在 `online-site/.openai/hosting.json`，认证凭据不得写入源码。手机端视觉仍保留奶油白、衬线标题与粉彩主题。
