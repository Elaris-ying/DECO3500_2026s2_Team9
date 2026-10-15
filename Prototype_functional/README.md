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
- [App.jsx](E:/UQ/figma/src/App.jsx)：23 条页面路由、导航、浏览记录、草图上传和点赞交互，业务函数附有中文说明。
- [Wristband.jsx](E:/UQ/figma/src/Wristband.jsx)：统一手环、情绪与界面颜色状态。
- [styles.css](E:/UQ/figma/src/styles.css)：排版、响应式布局和页面动效。
- [DESIGN-NOTES.md](E:/UQ/figma/DESIGN-NOTES.md)：已验证官方参考、实现范围、页面动效和功能验收清单。

原始代码备份位于 `E:\UQ\figma-backup-20261011`，包含升级前的 `src`、`index.html` 与 `package.json`，可用于对照。作品与主题素材仍位于本项目的 `public\assets`。

## 原型范围

手环、NFC、组队与地图位置为本地模拟；抽象视觉使用本地预览素材；草图与点赞仅保留在当前页面访问的内存状态，刷新后重置。下载由浏览器处理，页面只提示下载已开始。具体边界见设计说明。
