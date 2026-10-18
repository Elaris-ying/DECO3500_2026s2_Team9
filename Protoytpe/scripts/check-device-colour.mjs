import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ARDUINO_DEMO_FRAMES, normalizeHex, hexToRgb, rgbToHex, hexToHsv, hsvToHex, deriveLightPalette, getLightOutput, normalizeLightSettings } from '../src/device-colour.mjs';

// 检查真实色彩模型的边界与往返精度，不依赖浏览器，也不声称验证了拖动手感。
test('HEX 接受长短格式并拒绝未完成或非法输入', () => {
  for (const [input, expected] of [['#aBc', '#aabbcc'], ['ABCDEF', '#abcdef'], ['  #123456  ', '#123456'], ['000', '#000000']]) assert.equal(normalizeHex(input), expected);
  for (const value of [null, undefined, 123, '', '#', '#12', '#abcd', '#gggggg', '#12345678', 'rgb(0,0,0)']) assert.equal(normalizeHex(value), null);
  assert.throws(() => hexToRgb('#not-a-colour'), TypeError);
});

test('RGB 转换和通道范围正确', () => {
  assert.deepEqual(hexToRgb('#12abef'), { r: 18, g: 171, b: 239 });
  assert.equal(rgbToHex({ r: 255, g: 0, b: 127.5 }), '#ff0080');
  assert.equal(rgbToHex({ r: -1, g: 999, b: NaN }), '#00ff00');
});

test('色相盘覆盖六个主方向、灰阶和环绕', () => {
  for (const [h, hex] of [[0, '#ff0000'], [60, '#ffff00'], [120, '#00ff00'], [180, '#00ffff'], [240, '#0000ff'], [300, '#ff00ff'], [360, '#ff0000'], [-60, '#ff00ff']]) assert.equal(hsvToHex({ h, s: 100, v: 100 }), hex);
  assert.equal(hsvToHex({ h: 178, s: 0, v: 50 }), '#808080');
  assert.equal(hsvToHex({ h: 178, s: 100, v: 0 }), '#000000');
  assert.deepEqual(hexToHsv('#000000'), { h: 0, s: 0, v: 0 });
  assert.deepEqual(hexToHsv('#ffffff'), { h: 0, s: 0, v: 100 });
});

test('4096 个 RGB 样本经 HSV 往返仍保留原色', () => {
  for (let r = 0; r <= 255; r += 17) for (let g = 0; g <= 255; g += 17) for (let b = 0; b <= 255; b += 17) {
    const hex = rgbToHex({ r, g, b });
    assert.equal(hsvToHex(hexToHsv(hex)), hex, hex);
  }
});

test('亮度与开关独立：关灯不修改输入选色', () => {
  assert.deepEqual(getLightOutput('#ff8040', 50), { r: 128, g: 64, b: 32, hex: '#804020' });
  assert.deepEqual(getLightOutput('#ff8040', 0), { r: 0, g: 0, b: 0, hex: '#000000' });
  assert.deepEqual(getLightOutput('#ff8040', 100, false), { r: 0, g: 0, b: 0, hex: '#000000' });
  assert.equal(getLightOutput('#ffffff', 200).hex, '#ffffff');
  assert.equal(getLightOutput('#ffffff', -1).hex, '#000000');
});

test('本机设置严格校验类型，坏存储有安全默认值', () => {
  const defaults = { customColour: null, brightness: 100, lightOn: true };
  for (const value of [null, false, 'broken', [], {}]) assert.deepEqual(normalizeLightSettings(value), defaults);
  assert.deepEqual(normalizeLightSettings({ customColour: '#AbC', brightness: 42.5, lightOn: false, ignored: true }), { customColour: '#aabbcc', brightness: 42.5, lightOn: false });
  assert.deepEqual(normalizeLightSettings({ customColour: 'wrong', brightness: '0', lightOn: 'false' }), defaults);
  assert.equal(normalizeLightSettings({ brightness: Infinity }).brightness, 100);
  assert.equal(normalizeLightSettings({ brightness: -10 }).brightness, 0);
  assert.equal(normalizeLightSettings({ brightness: 110 }).brightness, 100);
});

const luminance = hex => {
  const { r, g, b } = hexToRgb(hex);
  const [red, green, blue] = [r, g, b].map(channel => {
    const value = channel / 255;
    return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
  });
  return red * .2126 + green * .7152 + blue * .0722;
};

test('自定义灯色完整保留，浅底与深色正文保持可读', () => {
  for (const hex of ['#000000', '#ffffff', '#ffff00', '#00ffff', '#ff00ff', '#ff0000', '#00ff00', '#0000ff', '#808080']) {
    const palette = deriveLightPalette(hex);
    assert.equal(palette.color, hex);
    assert.equal(palette.light, hex);
    const { r, g, b } = hexToRgb(hex);
    assert.equal(palette.rgb, `${r}, ${g}, ${b}`);
    assert.ok((luminance(palette.soft) + .05) / (luminance(palette.ink) + .05) >= 4.5, `${hex}: 正文对比不足`);
  }
});

test('Arduino 示例保持六步顺序，紫色为红蓝相加，最后全灭', () => {
  assert.deepEqual(ARDUINO_DEMO_FRAMES.map(frame => frame.label), ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Off']);
  assert.deepEqual(ARDUINO_DEMO_FRAMES.slice(0, 5).map(frame => frame.hex), ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']);
  assert.ok(ARDUINO_DEMO_FRAMES.slice(0, 5).every(frame => frame.lightOn));
  assert.equal(getLightOutput(ARDUINO_DEMO_FRAMES[5].hex, 100, ARDUINO_DEMO_FRAMES[5].lightOn).hex, '#000000');
});
