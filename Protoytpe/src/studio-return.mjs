import { ARDUINO_DEMO_FRAMES, normalizeHex } from './device-colour.mjs';

// 演示帧转成普通灯设置；显式手动 HEX 保持原对象。
// 默认情绪模式需冻结当前可见颜色，防止返回后作品旧 Echo 恢复改变实际灯色。
// 所有分支都直接保留电源，不走“选色即开灯”的 setter。
export function snapshotStudioLight(settings, demoIndex = null, currentCommand = null) {
  if (demoIndex === null) {
    if (settings.customColour !== null || currentCommand === null) return settings;
    const colour = normalizeHex(currentCommand.colour);
    if (!colour || typeof currentCommand.brightness !== 'number' || !Number.isFinite(currentCommand.brightness) || currentCommand.brightness < 0 || currentCommand.brightness > 100 || typeof currentCommand.lightOn !== 'boolean') {
      throw new TypeError('A complete current light command is required.');
    }
    return { ...settings, customColour: colour, brightness: currentCommand.brightness, lightOn: currentCommand.lightOn };
  }
  if (!Number.isInteger(demoIndex) || demoIndex < 0 || demoIndex >= ARDUINO_DEMO_FRAMES.length) {
    throw new RangeError('A valid colour sequence frame is required.');
  }
  const frame = ARDUINO_DEMO_FRAMES[demoIndex];
  return { ...settings, customColour: frame.hex, brightness: 100, lightOn: frame.lightOn };
}
