import { normalizeHex, rgbToHex, getLightOutput } from './device-colour.mjs';

export const DEFAULT_DEVICE_URL = 'http://192.168.4.1';
export const WIFI_SSID = 'GalleryEchoes';
export const WIFI_PASSWORD = '';
export const DEVICE_ID = 'gallery-echoes-nano-esp32';
export const PROTOCOL_VERSION = 2;

// 只向用户明确输入的本地设备发请求，不扫描网络、不改变系统 Wi-Fi。
export function normalizeDeviceUrl(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('Enter the board address, for example http://192.168.4.1.');
  let url;
  try { url = new URL(value.trim().includes('://') ? value.trim() : `http://${value.trim()}`); }
  catch { throw new Error('Enter a valid local board address.'); }
  if (url.protocol !== 'http:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('Use a local HTTP address without a path, password or query.');
  const parts = url.hostname.split('.').map(Number);
  const ipv4 = /^\d+\.\d+\.\d+\.\d+$/.test(url.hostname) && parts.every(part => Number.isInteger(part) && part >= 0 && part <= 255);
  const local = url.hostname === 'localhost' || (ipv4 && (parts[0] === 127 || parts[0] === 10 || (parts[0] === 192 && parts[1] === 168) || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31)));
  if (!local) throw new Error('Use the board’s private Wi-Fi IP address.');
  return url.origin;
}

function normalizeCommand(command) {
  const colour = normalizeHex(command?.colour);
  if (!colour || typeof command?.brightness !== 'number' || !Number.isFinite(command.brightness) || command.brightness < 0 || command.brightness > 100 || typeof command?.lightOn !== 'boolean') throw new Error('Invalid colour, brightness or light power.');
  return { colour, brightness: Math.round(command.brightness), lightOn: command.lightOn };
}
const keyOf = command => `${command.colour}/${command.brightness}/${command.lightOn}`;
const integer = (value, max) => Number.isInteger(value) && value >= 0 && value <= max;
const validRgb = value => value && ['r', 'g', 'b'].every(channel => integer(value[channel], 255));
const wireCommand = command => {
  const output = getLightOutput(command.colour, command.brightness, command.lightOn);
  const off = !output.r && !output.g && !output.b;
  return { output: { r: output.r, g: output.g, b: output.b }, hex: output.hex.slice(1), action: off ? 'off' : 'set', acknowledgement: off ? 'OFF' : 'OK' };
};
const wireKey = command => { const wire = wireCommand(command); return `${wire.action}/${wire.hex}`; };

// 兼容版只读状态用于确认配置；旧版仅返回 OK/OFF，不伪造状态回读。
function validateStatus(data) {
  if (data?.device !== DEVICE_ID || data?.protocol !== PROTOCOL_VERSION) throw new Error('This address is not running the Gallery Echoes Nano ESP32 firmware.');
  if (typeof data.firmware !== 'string' || !data.firmware || data.firmware.length > 64 || !integer(data.revision, 4294967295) || !integer(data.seq, 2147483647) || !validRgb(data.output) || !['boot', 'set', 'off'].includes(data.lastCommand)) throw new Error('The board returned an invalid status.');
  return { device: data.device, protocol: data.protocol, firmware: data.firmware, revision: data.revision, seq: data.seq, lastCommand: data.lastCommand, output: { ...data.output }, mode: 'status' };
}

function validateLegacyPage(html) {
  const markup = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  const inputs = markup.match(/<input\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi) || [];
  const hasPicker = inputs.some(input => {
    // 按完整属性分词，避免把 data-id、data-type 或引号内的说明误当成真实控件。
    const attributes = new Map();
    for (const match of input.slice(6, -1).matchAll(/\s+([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
      const name = match[1].toLowerCase();
      if (attributes.has(name) && ['id', 'type'].includes(name)) return false;
      attributes.set(name, match[2] ?? match[3] ?? match[4] ?? '');
    }
    return attributes.get('id') === 'picker' && attributes.get('type')?.toLowerCase() === 'color';
  });
  if (!/<title>\s*Gallery Echoes\s*<\/title>/i.test(markup) || !hasPicker) throw new Error('This address does not show the existing Gallery Echoes colour controller.');
  return { device: 'gallery-echoes-legacy', protocol: 0, mode: 'legacy', verification: 'page-identified' };
}

function cancelled() {
  const error = new Error('Connection cancelled.');
  error.name = 'AbortError';
  return error;
}

// 单一会话、单一在途请求；连续拖色仅保留最后一帧，不积压过时指令。
export function createWifiLightController({ fetchImpl = globalThis.fetch, onChange = () => {}, timeoutMs = 3000, throttleMs = 100, heartbeatMs = 5000 } = {}) {
  const timeout = Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 3000;
  const throttle = Number.isFinite(throttleMs) && throttleMs >= 0 ? throttleMs : 100;
  const heartbeat = Number.isFinite(heartbeatMs) && heartbeatMs >= 0 ? heartbeatMs : 5000;
  let snapshot = { status: 'disconnected', endpoint: DEFAULT_DEVICE_URL, mode: null, device: null, lastApplied: null, lastSeenAt: null, error: null };
  let epoch = 0, active = false, ready = false, busy = false, disposed = false;
  let pending = null, sendTimer = null, heartbeatTimer = null, initialWaiter = null;
  let sequence = 0, lastStartedAt = -Infinity;
  const requests = new Set();
  const current = token => !disposed && active && token === epoch;
  const publish = changes => { snapshot = { ...snapshot, ...changes }; onChange(snapshot); };

  const clearSession = () => {
    epoch += 1; active = false; ready = false; busy = false; pending = null;
    clearTimeout(sendTimer); clearTimeout(heartbeatTimer); sendTimer = heartbeatTimer = null;
    for (const controller of requests) controller.abort();
    requests.clear();
    if (initialWaiter) { initialWaiter.reject(cancelled()); initialWaiter = null; }
  };
  const fail = (token, error) => {
    if (!current(token)) return;
    const waiter = initialWaiter;
    initialWaiter = null;
    clearSession();
    publish({ status: 'error', error: error.message || 'The board did not respond. Reconnect to try again.' });
    waiter?.reject(error);
  };

  async function request(token, path, { parser = 'status', allowNotFound = false, ...options } = {}) {
    if (!current(token)) throw cancelled();
    const controller = new AbortController();
    requests.add(controller);
    let deadline, onAbort;
    const abort = new Promise((_, reject) => { onAbort = () => reject(cancelled()); controller.signal.addEventListener('abort', onAbort, { once: true }); });
    const expiry = new Promise((_, reject) => { deadline = setTimeout(() => { reject(new Error('The board timed out. Check its Wi-Fi and reconnect.')); controller.abort(); }, timeout); });
    try {
      const work = (async () => {
        if (typeof fetchImpl !== 'function') throw new Error('This browser cannot send Wi-Fi requests.');
        const response = await fetchImpl(`${snapshot.endpoint}${path}`, { ...options, signal: controller.signal, mode: 'cors', credentials: 'omit', cache: 'no-store', redirect: 'error' });
        if (allowNotFound && response.status === 404) return null;
        if (!response.ok) throw new Error(`The board rejected the request (HTTP ${response.status}).`);
        if (parser !== 'status') {
          const text = await response.text();
          return parser === 'page' ? validateLegacyPage(text) : text.trim();
        }
        let data;
        try { data = await response.json(); } catch { throw new Error('The board did not return a valid JSON acknowledgement.'); }
        return validateStatus(data);
      })();
      const data = await Promise.race([work, expiry, abort]);
      if (!current(token)) throw cancelled();
      return data;
    } catch (error) {
      if (error?.name === 'TypeError') throw new Error('Board unreachable. Check Wi-Fi, the IP address and browser local network permission.');
      throw error;
    } finally {
      clearTimeout(deadline);
      controller.signal.removeEventListener('abort', onAbort);
      requests.delete(controller);
    }
  }

  function planHeartbeat(token) {
    clearTimeout(heartbeatTimer);
    if (!current(token) || !heartbeat) return;
    heartbeatTimer = setTimeout(async () => {
      heartbeatTimer = null;
      if (!current(token)) return;
      if (busy || pending) { planHeartbeat(token); return; }
      busy = true;
      try {
        const device = snapshot.mode === 'legacy' ? await request(token, '/', { parser: 'page' }) : await request(token, '/status');
        if (!current(token)) return;
        busy = false;
        // 心跳只确认在线，不冒充本应用刚刚应用了其他客户端的颜色。
        publish({ device, lastSeenAt: Date.now() });
        schedule(token);
        planHeartbeat(token);
      } catch (error) { fail(token, error); }
    }, heartbeat);
  }

  function schedule(token) {
    if (!current(token) || !ready || busy || sendTimer !== null || !pending) return;
    const knownWire = snapshot.mode === 'status' && snapshot.device ? `${snapshot.device.lastCommand}/${rgbToHex(snapshot.device.output).slice(1)}` : snapshot.lastApplied ? wireKey(snapshot.lastApplied) : null;
    if (snapshot.lastApplied && wireKey(pending) === knownWire) {
      pending = null;
      publish({ status: 'connected' });
      return;
    }
    sendTimer = setTimeout(() => { sendTimer = null; sendLatest(token); }, Math.max(0, throttle - (Date.now() - lastStartedAt)));
  }

  async function sendLatest(token) {
    if (!current(token) || busy || !pending) return;
    const command = pending;
    pending = null; busy = true; lastStartedAt = Date.now();
    const wire = wireCommand(command);
    sequence = sequence >= 2147483647 ? 1 : sequence + 1;
    const seq = sequence;
    publish({ status: 'sending', error: null });
    if (!current(token)) return;
    try {
      // 延续用户已有 /set?hex=... 与 /off；亮度在网页缩放一次，不要求板子理解新参数。
      const path = wire.action === 'off' ? `/off?seq=${seq}` : `/set?hex=${wire.hex}&seq=${seq}`;
      const acknowledgement = await request(token, path, { parser: 'text' });
      if (!current(token)) return;
      if (acknowledgement !== wire.acknowledgement) throw new Error(`The board did not acknowledge the request with ${wire.acknowledgement}.`);
      let device = snapshot.device;
      if (snapshot.mode === 'status') {
        device = await request(token, '/status');
        if (!current(token)) return;
        if (device.seq !== seq || device.lastCommand !== wire.action || ['r', 'g', 'b'].some(channel => device.output[channel] !== wire.output[channel])) throw new Error('The board status does not match the colour sent. Reconnect to try again.');
      }
      const confirmed = snapshot.mode === 'status';
      const lastApplied = { ...command, output: wire.output, seq, revision: confirmed ? device.revision : null, at: Date.now(), acknowledgement, verification: confirmed ? 'state-confirmed' : 'request-acknowledged', source: confirmed ? 'status' : 'text' };
      busy = false;
      if (pending && keyOf(pending) === keyOf(command)) pending = null;
      publish({ status: pending ? 'sending' : 'connected', device, lastApplied, lastSeenAt: lastApplied.at });
      if (initialWaiter?.token === token) { initialWaiter.resolve(lastApplied); initialWaiter = null; }
      schedule(token);
      planHeartbeat(token);
    } catch (error) { fail(token, error); }
  }

  return {
    getSnapshot: () => snapshot,
    async connect(endpoint, command) {
      if (disposed) throw new Error('This connection has been closed.');
      clearSession();
      let address, initial;
      try { address = normalizeDeviceUrl(endpoint); initial = normalizeCommand(command); }
      catch (error) { publish({ status: 'error', mode: null, device: null, lastApplied: null, lastSeenAt: null, error: error.message }); throw error; }
      active = true; ready = false; pending = initial; sequence = 0; lastStartedAt = -Infinity;
      const token = epoch;
      publish({ status: 'connecting', endpoint: address, mode: null, device: null, lastApplied: null, lastSeenAt: null, error: null });
      try {
        let device = await request(token, '/status', { allowNotFound: true });
        if (device === null) device = await request(token, '/', { parser: 'page' });
        if (!current(token)) throw cancelled();
        ready = true;
        publish({ device, mode: device.mode, lastSeenAt: Date.now() });
        if (!current(token)) throw cancelled();
        return await new Promise((resolve, reject) => { initialWaiter = { token, resolve, reject }; schedule(token); });
      } catch (error) { fail(token, error); throw error; }
    },
    setLight(command) {
      if (!active || disposed) return false;
      pending = normalizeCommand(command);
      schedule(epoch);
      return true;
    },
    disconnect() {
      clearSession();
      if (!disposed) publish({ status: 'disconnected', mode: null, device: null, error: null });
    },
    dispose() { clearSession(); disposed = true; },
  };
}
