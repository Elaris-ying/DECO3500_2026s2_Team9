# Gallery Echoes

支持 VS Code Go Live 的移动美术馆导览原型。保留原有粉彩与有机形主题，升级作品排版、页面连续动效，以及情绪颜色与手环灯光的交互呼应。React 与所需样式已编译到本地，无需联网加载外部库。

## 在线手机完整版与二维码

正式公开入口：[Gallery Echoes](https://gallery-echoes-mobile.netlify.app/)，当前托管于 **Netlify Free**。任何访客用手机流量或普通 Wi-Fi 即可浏览完整 24 页原型，不用登录，也不用先连接单片机。公开无登录访问与全部 40 个静态文件的校验结果见 [当前公开校验报告](E:/UQ/figma/deliverables/netlify-public-verification.json)：39 个资源直接核对原始响应；HTML 只移除本站 Netlify 注入的两段完整匹配的说明与徽章后核对。**本次只更新在线网页，正式 URL 和二维码均不变。**

- [手机使用与返回步骤](E:/UQ/figma/MOBILE-SETUP.md)
- [连接后如何返回画廊](E:/UQ/figma/RETURN-TO-GALLERY.md)
- [Netlify 网页入口二维码](E:/UQ/figma/mobile-qr/gallery-echoes-netlify-qr.png) 与 [连接热点二维码](E:/UQ/figma/mobile-qr/gallery-echoes-wifi-qr.png)
- [可打印的双语扫码卡](E:/UQ/figma/mobile-qr/scan-card.html)
- [Netlify 部署与后续更新](E:/UQ/figma/NETLIFY-SETUP.md)

在线浏览和屏幕调色直接可用。只有需要实体变色时，点击 Connect a wristband → 在系统设置加入 GalleryEchoes（无密码）→ 回网页点击 Open wristband controls。设备控制页在**新标签页**打开，原在线画廊保持打开；在设备现有页面按原方式完成变色。

**当前推荐纯网页返回：不修改单片机，不需要 Upload，也不需要新固件。**已装且正常控灯的程序保持原样。先前的 1.4.1 固件包属于可选板载升级方案，本次不依赖它。

变色后关闭控灯标签页，或打开手机浏览器的标签页列表，切回 **Gallery Echoes**。原在线页的连接步骤内始终显示返回提示和 **返回画廊 · 继续参观** 按钮，点击即可回到在线画廊首页。它不记录或判断控灯页是否打开、设备是否连接或变色成功，也不向设备发送开灯、关灯或变色指令。

`192.168.4.1` 页面由设备存储，在线网页无法跨域给它直接增加按钮；本方案不要求改设备页面。需要重新加载联网内容时，恢复普通 Wi-Fi 或手机流量。保留原标签页不等于保证 GalleryEchoes 无互联网时整站可离线加载。

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
- [先前固件与上传说明](E:/UQ/figma/firmware/README.md)：历史可选板载方案；本次纯网页返回不依赖上传或固件升级。
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
- 示例演示按照提供的 Arduino `loop()` 顺序每秒切换：红 → 绿 → 蓝 → 黄 → 紫 → 全灭。普通 Stop sequence 仍恢复原先的灯色设置；手动调色可直接接管。安静模式和系统减少动态效果设置会禁止自动轮播。在线页中的颜色和演示属于网页预览，不会因“返回画廊”而向设备发送指令。
- 自由灯色、亮度和开关保存在当前浏览器。调色不会改写作品 Echo；明确选择作品的情绪色时，手环返回对应的情绪灯色。

未连接设备时保持屏幕预览；Wi-Fi 控制沿用用户已有 Arduino Nano ESP32 程序的 `GalleryEchoes` 开放热点、`192.168.4.1`、`/set?hex=...` 和 `/off`。六步轮播由网页演示按钮保留，振动仍只在屏幕演示。

本轮开发期间的工作快照位于 `E:\UQ\figma-backup-20261013-colour-studio`。

## 保持现有 Nano ESP32 程序

1. 保持现有正常控灯程序和开发板供电；本次不用 USB 上传。
2. 在手机系统 Wi-Fi 设置连接 **GalleryEchoes，无密码**。热点没有互联网时按需保持连接。
3. 从在线画廊的 **Open wristband controls** 新开设备控制标签页，按设备现有页面操作。
4. 变色后关闭设备标签或切回原 **Gallery Echoes** 标签，再点击 **返回画廊 · 继续参观**。需要联网资源时恢复普通 Wi-Fi 或流量。

在线页面不会自动切换系统 Wi-Fi，不会根据打开链接推断设备成功，也不会通过 iframe、关闭窗口脚本或跨域修改来控制设备页的返回。当前网络/灯光状态仍以设备现有控制页与实际效果为准。线上和设备页面的浏览器记录属于不同域名，不会自动同步。

本轮只更新网页，不生成板载 `mobile_assets.h`、不编译固件，也未替用户进行手机实扫或实体灯联调。网页导出使用 `node scripts/export-online.mjs --web-only`；正式部署结果见当前报告。

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

