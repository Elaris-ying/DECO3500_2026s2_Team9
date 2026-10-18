# Gallery Echoes · 手机完整版与扫码使用

当前手机固件 **1.3.0** 把全部 24 个原型页面、作品图片、样式及脚本放入 Nano ESP32。手机连接板子热点后，直接由板子提供完整界面及 RGB 控制，不需要电脑继续运行 Go Live，也不需要互联网。它是手机浏览器可运行的网页应用。

## 先上传一次完整版

1. 解压 `deliverables/Gallery-Echoes-Mobile-1.3.0.zip`，或直接打开项目的 `firmware/gallery_echoes_wifi` 文件夹。
2. 确保 **gallery_echoes_wifi.ino 与 mobile_assets.h 在同一个文件夹**。后者包含完整界面与图片，不能只复制 .ino 中的代码。
3. 用 USB 数据线连接 Nano ESP32。在 Arduino IDE 选择 **Arduino ESP32 Boards by Arduino 2.x → Arduino Nano ESP32**、正确 USB 端口。保留默认分区和默认引脚设置；本机使用 2.0.18-arduino.5。
4. 打开 `gallery_echoes_wifi.ino`，先 ✓ Verify，再 **→ Upload**，等待上传完成。上传替换旧固件；已验证正常的三路 analogWrite 控灯方式保持不变。
5. 板子保持供电。后续手机使用不需要电脑持续运行；可使用稳定 USB 电源供电。

## 用户扫码流程

1. 手机连接 **GalleryEchoes**，无密码。可以手动选择热点，或扫描 `mobile-qr/gallery-echoes-wifi-qr.png` 并确认加入。若提示“无互联网”，保持此 Wi-Fi 连接。
2. 扫描 **mobile-qr/gallery-echoes-app-qr.png**，点击打开 **http://192.168.4.1/**。使用 Safari、Chrome 等系统浏览器。
3. 进入完整 Gallery Echoes 界面，可浏览作品、选择感受、留下本地 Echo、查看地图及收藏。
4. 首页点击 **Connect your light**，或从页头 Wristband 进入 Colour studio，再点击面板内 **Connect your light**。手机无需输入 IP；连接成功后调色、色相、HEX、亮度及 Light power 直接向板子发送。
5. 测试时 Light power 开启、Brightness 设为 100%，先选红绿蓝。黑色表示关灯。选择的色同时作用于腕带预览与实体 RGB 灯。

普通二维码分别编码“加入 Wi-Fi”或“打开网页”，不能保证一次扫描同时完成两项。现场可打印 `mobile-qr/scan-card.html`：上面有两个顺序明确的二维码。已经连接热点的访客只需扫描网页入口码。

## 保留的入口

- **完整手机应用**：http://192.168.4.1/
- **直接进入调色面板**：http://192.168.4.1/?screen=device
- **原生灯光测试页**：http://192.168.4.1/controller ，页面显示 Firmware 1.3.0。
- **原有接口**：`/set?hex=rrggbb` 与 `/off`，仍回复 OK / OFF。没有恢复 PWM 读回或失败回滚。
- **电脑 Go Live**：根目录 index.html 继续可用，使用原始 PNG；板载版本使用压缩 WebP。

页面在手机全屏布局下使用真实系统状态栏、安全区、较大的触摸区和 16px 输入框。手环模拟、自由调色、七色测试、安静模式与滑动交互保留。第一次打开或刷新后，需要明确点击连接，网页不会擅自切换手机 Wi-Fi 或自动开灯。

## 使用边界

完整资源从单片机提供，“无需互联网”仍需要板子供电和手机连上其 Wi-Fi。其他手机最后发送的颜色会覆盖前一条指令；它们控制的是同一块板子上的同一个 RGB 灯。Echo 与偏好按浏览器保存在手机；本次浏览记录、上传草图及点赞保留在当前访问的内存。访客感想示例、地图位置、NFC 与振动仍沿用原型模拟。

本地 HTTP 不提供 Service Worker 离线缓存承诺。能否添加主屏幕由手机浏览器决定；即使添加，也需要连接板子才能重新加载。Wi-Fi QR 与网页 QR 已生成；手机实扫及升级后实体联调仍需现场确认。

## 修改后重新打包

```powershell
node .\scripts\export-mobile.mjs
node .\node_modules\vite\bin\vite.js build
node .\scripts\check-prototype.mjs
node .\scripts\check-firmware-pwm.mjs
node .\scripts\check-wifi-light.mjs --http
node .\scripts\check-mobile-export.mjs --http
```

导出脚本保留原图，把手机用图转换为 WebP，压缩脚本和样式，并生成同目录 mobile_assets.h。图片转换需要 sharp；本机已配置，其他电脑可在项目安装 sharp。生成脚本限制资源预算，完整固件必须适合默认 **3 MiB 应用分区**。SDK 完整链接及容量检查结果位于 `.firmware-build/compile-report.json`；该检查只生成文件，不上传板子。
