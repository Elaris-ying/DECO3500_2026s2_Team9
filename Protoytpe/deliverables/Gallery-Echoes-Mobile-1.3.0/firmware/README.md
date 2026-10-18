# Gallery Echoes · 手机完整版固件 1.3.0

此版本将完整 24 页 Gallery Echoes 原型放进 Arduino Nano ESP32。手机连接 **GalleryEchoes** 开放热点，扫描入口二维码，打开 **http://192.168.4.1/** 就能浏览原型并直接调色。板子提供所有脚本、样式和压缩作品图片，不依赖电脑 Go Live 或互联网。

用户已确认 1.2.0 直接 RGB 程序正常工作；本版保持原 setRGB 的三路 analogWrite 和 active-low 反转，不引入 PWM 读回、等待、回滚或自动颜色循环。

## 上传

1. 推荐使用 `deliverables/Gallery-Echoes-Mobile-1.3.0.zip`，解压后打开 `firmware/gallery_echoes_wifi/gallery_echoes_wifi.ino`。
2. **mobile_assets.h 必须与 .ino 保持同目录**，它包含完整应用。不要只复制 .ino 文字到另一个草稿。
3. Arduino IDE 选择 **Arduino ESP32 Boards by Arduino 2.x → Arduino Nano ESP32**、默认分区及默认引脚设置、实际 USB 端口。本机验证核心为 2.0.18-arduino.5。
4. 用 USB 数据线连接板子，先 Verify，再点击 **→ Upload**。修改电脑文件或刷新浏览器不会更新板上程序。
5. 上传完成后保持供电，手机重新加入 GalleryEchoes（无密码、无互联网）。扫码打开根地址，应出现完整 Gallery Echoes 欢迎页；`/controller` 的原生备用页显示 Firmware 1.3.0。

详细操作与二维码见 [MOBILE-SETUP.md](E:/UQ/figma/MOBILE-SETUP.md)，打印卡在 `mobile-qr/scan-card.html`。普通 QR 不能保证一次扫描同时加入 Wi-Fi 和打开网页，因此提供热点码和网页入口码；已连接热点时只扫描网页码即可。

## 手机上操作

欢迎页进入完整导览；首页 **Connect your light** 或页头 Wristband 可打开 Colour studio。点击面板里的 **Connect your light** 后，色盘、色相、HEX、亮度、开关和页面情绪色共用现有控灯链路。默认不自动连接或开灯。板载页面隐藏 IP 编辑和 USB 设置，保留可展开连接说明与原生测试页入口。

屏幕预览和实体灯接收相同的选色；板载 RGB 支持各通道 0–255 混色，黑色或亮度 0 表示关灯。红绿蓝、黄青紫红和白色可以在 `/controller` 逐个测试。绿色电源指示灯不是调色目标。少数早期板绿蓝反色时，将 `SWAP_GREEN_BLUE` 改为 1 后重新 Upload。

## 路由与兼容

| 路径 | 行为 |
| --- | --- |
| `/`、`/index.html` | 完整手机原型，同源资源 |
| `/?screen=device` | 直接进入调色面板 |
| `/controller` | 原生七色测试与自由选色页 |
| `/set?hex=rrggbb` | 校验六位 HEX，三路直接写入，纯文本 OK |
| `/off` | 三路关闭，纯文本 OFF |
| `/dist/...`、`/public/assets/...` | 仅发送打包清单内真实资源，缺失资源 404 |
| `/status` | 不提供，返回 404 |

额外 seq 等参数和原程序一样忽略。现有原型在 `/status` 404 后，识别原生 picker 或完整页面明确的设备标记，再使用 OK/OFF 请求应答模式；这不代表测量了实际光线。原生控制页同样串行发送、只保留最新待发颜色，并响应手机 input/change。

手机界面和灯光接口都在 `http://192.168.4.1:80`，无需跨域访问。电脑 Go Live 继续允许 localhost/127.0.0.1 合法端口；没有放开任意公网或其他局域网来源。多个用户最后发送的颜色会覆盖前一个颜色，因为控制的是同一盏灯。

## 打包与容量

`scripts/export-mobile.mjs` 把原始 PNG 保留在项目中，为板载版生成 WebP，压缩 JS/CSS/HTML，并生成 `mobile_assets.h`。静态资源共 38 条路由，去重后 **928,615 字节**；最大单次资源传输 **95,927 字节**。二进制 gzip 使用 `send_P` 的显式长度，从 Flash 直接发送，不复制整份资源到 RAM。

本机已用真实 Nano SDK、与 Arduino IDE 配置相同的核心/库/板型对象完成 C++ 编译、完整链接和 ESP32 镜像生成；正常及交换绿蓝配置 `.bin` 均 **1,670,000 字节**，适合默认 **3,145,728 字节**应用分区，剩余 **1,475,728 字节**。没有更改分区，没有使用额外文件系统上传插件。

生成证据在 `.firmware-build/compile-report.json`。本次尚未执行 USB 上传或升级后手机实体联调；二维码需要上传完整版后才能打开完整界面。没有 Service Worker 离线缓存承诺，板子断电或手机离开热点后不能继续加载资源。
