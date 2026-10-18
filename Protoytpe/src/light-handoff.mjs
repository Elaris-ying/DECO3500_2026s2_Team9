import { normalizeHex } from './device-colour.mjs';

const HANDOFF_ORIGIN = 'http://192.168.4.1/';
const HANDOFF_KEYS = new Set(['screen', 'colour', 'brightness', 'power']);

// 只生成顶层导航链接，不请求私网、不打开窗口，也不连接或写入手环。
export function makeDeviceHandoffUrl({ colour, brightness, lightOn } = {}) {
  const hex = normalizeHex(colour);
  if (!hex || !Number.isInteger(brightness) || brightness < 0 || brightness > 100 || typeof lightOn !== 'boolean') {
    throw new TypeError('A valid colour, integer brightness from 0 to 100 and boolean light power are required.');
  }
  const url = new URL(HANDOFF_ORIGIN);
  url.searchParams.set('screen', 'device');
  url.searchParams.set('colour', hex.slice(1));
  url.searchParams.set('brightness', String(brightness));
  url.searchParams.set('power', lightOn ? '1' : '0');
  return url.href;
}

// 仅解析完整、无重复的手环预填参数；调用方仍须限制在板载页使用，且不能自动写灯。
export function readDeviceHandoff(search) {
  if (typeof search !== 'string' || !search) return null;
  const query = new URLSearchParams(search);
  const keys = [...query.keys()];
  if (keys.length !== HANDOFF_KEYS.size || keys.some(key => !HANDOFF_KEYS.has(key))) return null;
  for (const key of HANDOFF_KEYS) if (query.getAll(key).length !== 1) return null;
  if (query.get('screen') !== 'device') return null;
  const colour = query.get('colour');
  const brightness = query.get('brightness');
  const power = query.get('power');
  if (!/^[0-9a-f]{6}$/i.test(colour) || !/^(?:0|[1-9]\d?|100)$/.test(brightness) || !/^[01]$/.test(power)) return null;
  return { colour: '#' + colour.toLowerCase(), brightness: Number(brightness), lightOn: power === '1' };
}
