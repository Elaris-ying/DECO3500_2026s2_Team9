# Gallery Echoes

支持 VS Code Go Live 的移动美术馆导览原型。保留原有粉彩与有机形主题，升级作品排版、页面连续动效，以及情绪颜色与手环灯光的交互呼应。React 与所需样式已编译到本地，无需联网加载外部库。

## 直接使用 Go Live

1. 在 VS Code 中打开 `E:\UQ\figma` 文件夹。
2. 打开根目录的 `index.html`。
3. 点击右下角 **Go Live**，或右键选择 **Open with Live Server**。

首次预览无需运行终端命令，也无需启动 Node.js 或 Vite。请保留 `index.html`、`dist` 与 `public` 的相对目录关系。页面支持 `?screen=home`、`?screen=capture` 等直接预览参数，也可从父目录启动 Live Server。

若 VS Code 没有 Go Live 按钮，安装 **Live Server（Ritwick Dey）** 扩展后使用。

## 修改 React 源码

`src` 中保留了带中文注释的可维护源码。修改源码时，可使用 Vite 自动更新预览：

在项目目录打开 PowerShell 或 VS Code 终端：

```powershell
Set-Location 'E:\UQ\figma'
npm run dev
```

此命令打开 `dev.html` 源码开发入口。Go Live 使用的是根目录 `index.html` 与已生成的本地文件。

修改 `src` 后执行以下命令，将更新同步到 Go Live 使用的文件：

```powershell
npm run build
```

构建生成 `dist/app.js` 与 `dist/style.css`。在 Go Live 页面刷新即可看到更新；请不要手工修改这些自动生成的文件。也可用以下命令预览根目录静态入口：

```powershell
npm run preview
```

当前目录已包含依赖；在新的环境运行时，需要先准备 Node.js、npm 并执行 `npm install`。

如果当前终端有 Node.js，但没有 `npm` 命令，可直接使用现有依赖：

```powershell
node .\node_modules\vite\bin\vite.js --host 127.0.0.1 --open /dev.html
node .\node_modules\vite\bin\vite.js build
```

## 代码与设计说明

- [index.html](E:/UQ/figma/index.html)：Go Live 静态预览入口。
- [dev.html](E:/UQ/figma/dev.html)：Vite 源码开发入口。
- [App.jsx](E:/UQ/figma/src/App.jsx)：24 条页面路由、导航、浏览记录、草图上传和点赞交互，业务函数附有中文说明。
- [Wristband.jsx](E:/UQ/figma/src/Wristband.jsx)：统一手环、情绪与界面颜色状态。
- [WristbandModel.jsx](E:/UQ/figma/src/WristbandModel.jsx)：固定透视的立体腕带矢量图，灯带沿前侧弧线嵌入。
- [WristbandColourStudio.jsx](E:/UQ/figma/src/WristbandColourStudio.jsx)：自由调色、灯光控制和六步演示界面。
- [device-colour.mjs](E:/UQ/figma/src/device-colour.mjs)：HEX / RGB / HSV 色彩计算、亮度模拟和六步示例颜色。
- [wifi-light.mjs](E:/UQ/figma/src/wifi-light.mjs)：Nano ESP32 的 Wi-Fi 握手、颜色指令、节流、回执和断线处理。
- [固件与上传说明](E:/UQ/figma/firmware/README.md)：Arduino Nano ESP32 首次 USB 上传和热点连接步骤。
- [styles.css](E:/UQ/figma/src/styles.css)：排版、响应式布局和页面动效。
- [DESIGN-NOTES.md](E:/UQ/figma/DESIGN-NOTES.md)：已验证官方参考、实现范围、页面动效和功能验收清单。

原始代码备份位于 `E:\UQ\figma-backup-20261011`，包含升级前的 `src`、`index.html` 与 `package.json`，可用于对照。作品与主题素材仍位于本项目的 `public\assets`。

## 反馈改进与手环操作

- 首次点击 Begin your visit 时显示三步简短引导，可直接 Skip guide；以后也可从 How it works 再次查看。
- 在作品页选择 Blue / Lavender / Peach / Sage 常用色，点击一次 Send my echo。成功反馈显示颜色与作品名称，随后默认展示其他访客的示例 Echo。
- Skip for now 可直接继续参观；Look again 是可展开的建议。也可主动浏览示例而不提交自己的 Echo。
- 点击页头 Wristband 打开手环面板。左右滑动颜色卡、用鼠标拖动滑轨，或使用左右箭头/键盘方向键切换颜色；灯光与页面同时响应。桌面侧栏也提供同样的滑轨。
- 手环面板内可关闭 Vibration preview，或开启 Quiet mode。静音时保持稳定灯色与文字确认，不播放光波和屏幕振动模拟。
- 已提交的作品颜色、引导完成状态和反馈偏好保存在当前浏览器；在禁用本地存储的环境仍可使用本次访问的内存状态。

本轮修改前的代码与静态预览文件另存于 `E:\UQ\figma-backup-20261013`。

## 自由调色室

从首页的 Colour studio 卡片、页头 Wristband 面板或桌面侧栏的 Open colour studio 进入，也可在预览地址后添加 `?screen=device`。

- 拖动二维调色盘选择饱和度与明度，使用色相滑杆改变色系；也可使用系统颜色选择器、HEX 输入或常用色按钮。
- 自由颜色实时作用于手环预览和页面点缀；Brightness 调整模拟亮度，灯光开关可关灯并保留所选颜色。
- 示例演示按照提供的 Arduino `loop()` 顺序每秒切换：红 → 绿 → 蓝 → 黄 → 紫 → 全灭。停止后恢复原先的灯色设置；手动调色可直接接管。安静模式和系统减少动态效果设置会禁止自动轮播。
- 自由灯色、亮度和开关保存在当前浏览器。调色不会改写作品 Echo；明确选择作品的情绪色时，手环返回对应的情绪灯色。

未连接设备时保持屏幕预览；Wi-Fi 控制沿用用户已有 Arduino Nano ESP32 程序的 `GalleryEchoes` 开放热点、`192.168.4.1`、`/set?hex=...` 和 `/off`。六步轮播由网页演示按钮保留，振动仍只在屏幕演示。

本轮开发期间的工作快照位于 `E:\UQ\figma-backup-20261013-colour-studio`。

## 用现有调色室控制 Nano ESP32

1. 用户原程序的板载网页可以同源控灯；要从电脑 **Go Live 的现有美术馆界面**控制，需要加上跨域支持。在 Arduino IDE 打开基于原程序修改的 [gallery_echoes_wifi.ino](E:/UQ/figma/firmware/gallery_echoes_wifi/gallery_echoes_wifi.ino)，用 USB 数据线连接板子，选择 **Arduino ESP32 Boards by Arduino 2.x → Arduino Nano ESP32** 和对应端口，先 Verify，再 Upload。当前 **1.2.0** 版保留原来的三路 `analogWrite`、`/set`、`/off` 和原生选色页面，增加跨域响应与七个基本测试色；详细步骤见 [固件说明](E:/UQ/figma/firmware/README.md)。上传会替换板上现有程序。
2. 保持开发板供电，在电脑系统 Wi-Fi 设置中连接 **GalleryEchoes，无密码**。热点没有互联网，选择保持连接；之后控制灯光无需 USB 数据连接。
3. 在 VS Code 对本项目 `index.html` 点 Go Live，使用电脑本机 `http://127.0.0.1:端口/…` 页面。进入 **Colour studio → Wi-Fi light control**，地址保留 **http://192.168.4.1**，点击 **Connect to board**。
4. 收到设备回复后，页面才显示 **Board linked**。调色、HEX、亮度、开关及六步演示使用相同旧接口；亮度由网页缩放成实际发送的 RGB，输出全黑时调用 `/off`。当前固件回复 `OK/OFF`，界面显示 **Last acknowledged request**，表示颜色请求已应答，不代表实测发光。1.2.0 不提供 `/status`，原型遇到 404 会自动识别原生调色主页并使用现有接口。

网页不会自动切换电脑 Wi-Fi，也不会在刷新后自动连接设备。网络失败会停止发送并提示 Reconnect；Disconnect 只停止发送新指令，不关灯。要灭灯，先关闭 Light power 并等待回执，再断开。

固件只允许本机 localhost / 127.0.0.1 原型来源以及板载同源页面。手机可连接同一热点打开 `http://192.168.4.1` 的简易自检页；它不是完整的美术馆原型。完整原型首次联调请从电脑 Go Live 打开。

浏览器如果询问本地网络访问，请为当前原型页面允许访问。权限与跨源检查仍由浏览器执行；不需要关闭浏览器保护。Chrome 的当前本地网络规则及 HTTPS 例外见 [官方说明](https://developer.chrome.com/blog/local-network-access)，各浏览器行为可能不同，首选上述本机 HTTP Go Live 入口。

本轮只修改程序，未执行 USB 上传或真实热点与 LED 联调。适配用户已有程序前的工作快照位于 `E:\UQ\figma-backup-20261015-before-existing-wifi`；前一轮 Wi-Fi 接入前的快照位于 `E:\UQ\figma-backup-20261015-before-wifi`。

板载网页能打开但灯不亮时，见 [固件排查说明](E:/UQ/figma/firmware/README.md)。根据用户要求，当前固件 **1.2.0** 回到原程序的直接 RGB 输出，移除 PWM 读回、等待、回滚关灯和状态协议。需要 USB 重新 Upload，刷新 Go Live 不会更新板上固件；板载主页应显示 Firmware 1.2.0。支持三路 0–255 混色，黑色表示关灯，实体颜色仍需观察开发板验证。

## 本地检查

修改源码后先构建，再运行：

```powershell
node .\scripts\check-prototype.mjs
node .\scripts\check-device-colour.mjs
node .\scripts\check-wifi-light.mjs
node .\scripts\check-firmware-pwm.mjs
```

第一个脚本检查全部 24 条路由的首次渲染、本地素材路径、作品 Echo 与自由灯色隔离、存储异常回退、Wi-Fi 初始未连接和 Go Live 静态文件。第二个脚本验证色彩模型，第三个脚本验证通信队列、回执、超时和取消；第三个加 `--http` 可用仅监听本机的假设备检查真实 HTTP 请求。它们不替代浏览器拖动、权限、视觉布局或实物验证。

第四个脚本保留原文件名，当前改为提取固件实际 setRGB 函数，检查完整通道范围、RGB 混色、边界限制和板载网页脚本；这是代码回归检查，不是实物测试或 C++ 完整编译。

## 原型范围

显式连接 Nano ESP32 后，灯色、亮度和开关通过 Wi-Fi 控制其板载 RGB LED。当前固件回复只确认请求，不做 PWM 读回或光学测量；原型仍兼容历史增强状态协议。实体腕带灯带、真实振动、NFC、组队和地图位置尚未接入。抽象视觉使用固定本地素材；草图与点赞只保留于当前页面访问的内存。实际灯色与屏幕可能有差异，腕带 LED 视角、厚度和固定方式需另做硬件验证。
