// 板载页面由导出脚本加入标记；Go Live 继续使用原始 PNG 和电脑预览。
export function isDeviceHosted() {
  return typeof document !== 'undefined' && document.documentElement?.dataset?.galleryDevice === 'true';
}

// 在线入口提供完整预览；实体灯操作使用显式链接进入单片机的同源页面。
export function isOnlineHosted() {
  return typeof document !== 'undefined' && document.documentElement?.dataset?.galleryOnline === 'true';
}

export function assetFileName(name) {
  const webp = typeof document !== 'undefined' && document.documentElement?.dataset?.galleryAssets === 'webp';
  return isDeviceHosted() || webp ? name.replace(/\.png$/i, '.webp') : name;
}

export function assetUrl(name) {
  return new URL('./public/assets/' + assetFileName(name), document.baseURI).href;
}
