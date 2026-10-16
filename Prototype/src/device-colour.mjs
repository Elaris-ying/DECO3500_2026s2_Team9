// 纯色彩模型：页面与屏幕灯光模拟共用，不依赖浏览器，也不连接真实设备。
export const LIGHT_STORAGE_KEY = 'gallery-echoes-light-v1';

const finite = (value, fallback = 0) => typeof value === 'number' && Number.isFinite(value) ? value : fallback;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// 接受常用 HEX 写法；未完成的输入交由表单显示校验，不替用户猜颜色。
export function normalizeHex(value) {
  if (typeof value !== 'string') return null;
  const hex = value.trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(hex)) return '#' + [...hex.toLowerCase()].map(char => char + char).join('');
  return /^[0-9a-f]{6}$/i.test(hex) ? '#' + hex.toLowerCase() : null;
}

export function hexToRgb(value) {
  const hex = normalizeHex(value);
  if (!hex) throw new TypeError('A valid HEX colour is required.');
  return { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) };
}

export function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map(value => Math.round(clamp(finite(value), 0, 255)).toString(16).padStart(2, '0')).join('');
}

// 饱和度、明度使用 0–100，色相按 360 度循环，方便拖动调色盘和键盘步进。
export function hsvToHex({ h, s, v }) {
  const hue = ((finite(h) % 360) + 360) % 360;
  const saturation = clamp(finite(s), 0, 100) / 100;
  const value = clamp(finite(v), 0, 100) / 100;
  const chroma = value * saturation;
  const secondary = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
  const match = value - chroma;
  const channels = hue < 60 ? [chroma, secondary, 0] : hue < 120 ? [secondary, chroma, 0] : hue < 180 ? [0, chroma, secondary] : hue < 240 ? [0, secondary, chroma] : hue < 300 ? [secondary, 0, chroma] : [chroma, 0, secondary];
  return rgbToHex({ r: (channels[0] + match) * 255, g: (channels[1] + match) * 255, b: (channels[2] + match) * 255 });
}

export function hexToHsv(value) {
  const { r, g, b } = hexToRgb(value);
  const red = r / 255, green = g / 255, blue = b / 255;
  const max = Math.max(red, green, blue), min = Math.min(red, green, blue), delta = max - min;
  let hue = 0;
  if (delta) hue = max === red ? ((green - blue) / delta) % 6 : max === green ? (blue - red) / delta + 2 : (red - green) / delta + 4;
  return { h: (hue * 60 + 360) % 360, s: max ? delta / max * 100 : 0, v: max * 100 };
}

function mix(hex, base, amount) {
  const colour = hexToRgb(hex), background = hexToRgb(base);
  return rgbToHex(Object.fromEntries(['r', 'g', 'b'].map(channel => [channel, colour[channel] * amount + background[channel] * (1 - amount)])));
}

// 自由色完整保留在 LED 上；文字与浅底单独派生，黄色/白色也不会冲淡正文。
export function deriveLightPalette(value) {
  const hex = normalizeHex(value);
  if (!hex) throw new TypeError('A valid HEX colour is required.');
  const { r, g, b } = hexToRgb(hex);
  return { name: `Custom ${hex.toUpperCase()}`, color: hex, light: hex, soft: mix(hex, '#fcfaf5', .13), ink: mix(hex, '#27231f', .24), rgb: `${r}, ${g}, ${b}` };
}

// 此处线性缩放仅供屏幕模拟/数值预览；真实 LED 的 PWM、极性和色彩校准待板型确认。
export function getLightOutput(value, brightness = 100, lightOn = true) {
  const colour = hexToRgb(value), intensity = lightOn ? clamp(finite(brightness, 100), 0, 100) / 100 : 0;
  const hex = rgbToHex(Object.fromEntries(['r', 'g', 'b'].map(channel => [channel, colour[channel] * intensity])));
  return { ...hexToRgb(hex), hex };
}

export function normalizeLightSettings(value) {
  const settings = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  return {
    customColour: normalizeHex(settings.customColour),
    brightness: clamp(finite(settings.brightness, 100), 0, 100),
    lightOn: typeof settings.lightOn === 'boolean' ? settings.lightOn : true,
  };
}

// 对应用户原始 loop()：每帧 1000 ms，红绿蓝黄紫后全灭。紫色是红+蓝同时亮。
export const ARDUINO_DEMO_FRAMES = Object.freeze([
  { label: 'Red', hex: '#ff0000', lightOn: true },
  { label: 'Green', hex: '#00ff00', lightOn: true },
  { label: 'Blue', hex: '#0000ff', lightOn: true },
  { label: 'Yellow', hex: '#ffff00', lightOn: true },
  { label: 'Purple', hex: '#ff00ff', lightOn: true },
  { label: 'Off', hex: '#ff00ff', lightOn: false },
].map(frame => Object.freeze(frame)));
