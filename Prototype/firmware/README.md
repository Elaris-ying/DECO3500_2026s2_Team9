# Gallery Echoes · 原程序直驱 RGB 固件

当前版本 **1.2.0**，按用户原程序简化：`GalleryEchoes` 无密码热点、`http://192.168.4.1`、三路 `analogWrite(pin, 255 - channel)`、`/set?hex=rrggbb` 与 `/off` 均保留。文件为正常 Arduino C++，没有聊天粘贴中的反斜杠、`&#x20;` 或 Kotlin 标记。

`setRGB(int r, int g, int b)` 先将三路限制在 0–255，再直接输出反相 PWM。已移除 1.1.x 的 PWM 读回、等待、失败回滚和状态协议，避免额外检查把选择的颜色恢复为关灯。保留输入校验、本机 Go Live 所需的跨域响应，以及原生页面的发送排队与应答反馈。

## 上传与连接

1. 用 USB 数据线连接 Nano ESP32 和电脑，持续给板子供电。
2. Arduino IDE 选择 **Arduino ESP32 Boards by Arduino 2.x → Arduino Nano ESP32**，选择实际 USB 端口。本机使用 `2.0.18-arduino.5`；本文件的目标为该 2.x 核心。
3. 关闭 IDE 中的旧程序，从文件打开 `E:\UQ\figma\firmware\gallery_echoes_wifi\gallery_echoes_wifi.ino`。搜索 `1.2.0`，确认打开的是本版。
4. 点击 ✓ Verify，再点击 **→ Upload**，等待上传完成。Verify、修改电脑文件或刷新网页均不会更新板上的程序。
5. 手机或电脑重新连接 **GalleryEchoes**，无密码。热点无互联网，保持此连接。
6. 打开 [板载调色页](http://192.168.4.1)，页面应显示 **Firmware 1.2.0**。先点 Red / Green / Blue，再测试 Yellow / Cyan / Magenta / White；也可打开颜色选择器自由调色。

开始时全灭，打开页面不会自动点灯。每次选择颜色会发送，也可点击 **Send current colour** 重发当前颜色；关灯后重新发送同一个颜色也可开灯。手机颜色选择器同时监听 `input` 和 `change`，兼容拖动及完成选色两种事件。连续选色只有一条在途请求，待发送颜色始终取最新值。

本次完成本地代码与编译检查，尚未替你上传或进行实物颜色验证。

## RGB 混色

板载 RGB 为 active-low，光强 0 对应 PWM 255（灭），光强 255 对应 PWM 0（最亮）。每个通道可取 0–255，支持完整 24 位 RGB 组合和中间色；**黑色 #000000 本来就是关灯**。低亮度接近黑色时肉眼可能很暗，板载 LED 的颜色也可能与屏幕存在差异。

| 颜色 | HEX | RGB |
| --- | --- | --- |
| 红 | FF0000 | 255, 0, 0 |
| 绿 | 00FF00 | 0, 255, 0 |
| 蓝 | 0000FF | 0, 0, 255 |
| 黄 | FFFF00 | 255, 255, 0 |
| 青 | 00FFFF | 0, 255, 255 |
| 紫红 | FF00FF | 255, 0, 255 |
| 白 | FFFFFF | 255, 255, 255 |
| 关闭 | 000000 | 0, 0, 0 |

使用 `LED_RED`、`LED_GREEN`、`LED_BLUE` 板级名称，不硬编码 GPIO。仅当红色正确、绿色和蓝色实际反色时，把顶部 `SWAP_GREEN_BLUE` 改为 `1` 再 Upload；正常板保留 `0`。

## 原接口与现有原型

| 请求 | 作用 | 返回 |
| --- | --- | --- |
| `GET /` | 原生调色页，title 为 Gallery Echoes，颜色输入 id 为 picker | HTML |
| `GET /set?hex=ff0000` | 将六位 HEX 逐字符校验并转成 RGB，直接调用 setRGB | 纯文本 `OK` |
| `GET /off` | 调用 setRGB(0,0,0) | 纯文本 `OFF` |

HEX 不带 `#`，大小写均可；无效字符、错误长度、重复 hex 返回 400，不改灯。`seq` 等其他参数和用户原程序一样不参与输出，原型不需要修改请求格式。错误方法返回 405，未知路径返回 404。

本版 **不提供 `/status`**，打开该地址返回 404 是正常行为。当前美术馆原型已支持原接口：先探测 `/status`，遇到 404 后识别 Gallery Echoes 调色主页，再通过 `/set`、`/off` 控制；界面显示 **Last acknowledged request**。`OK/OFF` 表示执行了颜色写入代码并回复请求，不代表驱动读回或光传感器测量。

从电脑 Go Live 打开完整原型，例如 `http://127.0.0.1:5500/index.html`，进入 **Colour studio → Wi-Fi light control**，地址填 `http://192.168.4.1`，点击 **Connect to board**。想看鲜明测试色时，Light power 开启、Brightness 设为 100%。网页先缩放亮度，例如红色 50% 发送 `/set?hex=800000`，板子不重复缩放。

跨域只允许 `http://localhost`、`http://127.0.0.1` 的合法端口及板载同源 `http://192.168.4.1` / `:80`，支持 OPTIONS；不绕过浏览器权限。手机可直接打开板载页，手机经电脑局域网地址访问完整原型需要额外配置来源。用户最初原版没有跨域响应，Go Live 控灯仍需上传本版一次。

## 灯光排查

先停止演示、断开其他控灯页面，避免多客户端覆盖。直接打开 [红色](http://192.168.4.1/set?hex=ff0000)、[绿色](http://192.168.4.1/set?hex=00ff00)、[蓝色](http://192.168.4.1/set?hex=0000ff) 测试，再用 [关灯](http://192.168.4.1/off) 停止。

如果还看到 `RGB PWM could not apply the requested colour.`，说明板子仍运行旧版：本版没有这条错误消息。重新确认 Upload 完成，并刷新板载主页查看 **Firmware 1.2.0**。如果返回 OK 而三色全不亮，核对板型、上传文件与板载 RGB 灯；绿色电源指示灯不是调色目标。串口监视器设 115200，可以查看实际收到的 RGB 三个数值。

## 检查与依据

本地检查提取实际 setRGB 函数，验证三路完整 0–255 光强、混色和边界限制，并检查原生网页 JavaScript。SDK 编译检查使用本机 Arduino Nano ESP32 2.0.18-arduino.5，正常及交换绿蓝两种配置；目标文件编译不代替 IDE 完整链接和实物验证。

- [Arduino Nano ESP32：RGB 与 active-low](https://docs.arduino.cc/tutorials/nano-esp32/cheat-sheet/)
- [Arduino 官方：部分早期板绿蓝反置](https://support.arduino.cc/hc/en-us/articles/9589073738012-About-Nano-ESP32-boards-with-inverted-green-and-blue-pins)
- [Espressif 官方：2.x analogWrite 实现](https://github.com/espressif/arduino-esp32/blob/2.0.17/cores/esp32/esp32-hal-ledc.c)
