import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 将 React 一并打包成本地浏览器脚本，根目录 index.html 可直接使用 Go Live。
// 素材由相对路径 public/assets/ 加载，避免重复复制，也支持从父目录打开项目。
export default defineConfig(({ command }) => ({
  base: './',
  publicDir: false,
  plugins: [react()],
  define: command === 'build' ? { 'process.env.NODE_ENV': '"production"' } : undefined,
  build: {
    outDir: 'dist',
    minify: false,
    lib: {
      entry: fileURLToPath(new URL('./src/main.jsx', import.meta.url)),
      name: 'GalleryEchoes',
      formats: ['iife'],
      fileName: () => 'app.js',
      cssFileName: 'style',
    },
  },
}));
