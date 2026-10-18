import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { DEFAULT_DEVICE_URL, DEVICE_ID, PROTOCOL_VERSION, WIFI_SSID, WIFI_PASSWORD, normalizeDeviceUrl, createWifiLightController } from '../src/wifi-light.mjs';

// 测试真实控制器；仅 --http 启动本机假设备，不连接用户的实物。
const results = [];
const RED = { colour: '#ff0000', brightness: 100, lightOn: true };
const BLUE = { colour: '#0000ff', brightness: 50, lightOn: true };
const GREEN = { colour: '#00ff00', brightness: 30, lightOn: true };
const OLD_PAGE = '<!doctype html><title>Gallery Echoes</title><input type="color" id="picker" value="#ff0000"><script>picker.oninput=()=>fetch("/set?hex="+picker.value.slice(1));function off(){fetch("/off")}</script>';
const CURRENT_FIRMWARE = await readFile(new URL('../firmware/gallery_echoes_wifi/gallery_echoes_wifi.ino', import.meta.url), 'utf8');
const CURRENT_PAGE = CURRENT_FIRMWARE.match(/R"GEHTML\(([\s\S]*?)\)GEHTML"/)?.[1];
assert.ok(CURRENT_PAGE, '未找到当前固件的真实板载页面');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function deferred() { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }
async function until(predicate, message, timeout = 1800) { const deadline = Date.now() + timeout; while (!predicate()) { if (Date.now() > deadline) throw new Error(message); await delay(3); } }
async function check(name, callback) { try { await callback(); results.push({ name, passed: true }); } catch (error) { results.push({ name, passed: false, error: String(error.message).split('\n')[0].slice(0, 240) }); } }
function packet(overrides = {}) { return { device: DEVICE_ID, protocol: PROTOCOL_VERSION, firmware: '1.1.0', revision: 0, seq: 0, lastCommand: 'boot', output: { r: 0, g: 0, b: 0 }, ...overrides }; }
function jsonResponse(value, status = 200) { return new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } }); }
function textResponse(value, status = 200, type = 'text/plain') { return new Response(value, { status, headers: { 'Content-Type': type } }); }
function wire(call) {
  const url = new URL(call.url), off = url.pathname === '/off', hex = url.searchParams.get('hex');
  assert.ok(off || (url.pathname === '/set' && /^[0-9a-f]{6}$/.test(hex)), '请求不符合原始 /set 或 /off 协议');
  return { path: url.pathname, seq: Number(url.searchParams.get('seq')), lastCommand: off ? 'off' : 'set', acknowledgement: off ? 'OFF' : 'OK', output: off ? { r: 0, g: 0, b: 0 } : { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16) } };
}
function readback(call, overrides = {}) { const command = wire(call); return packet({ revision: command.seq, seq: command.seq, lastCommand: command.lastCommand, output: command.output, ...overrides }); }
function fixture(options = {}) {
  const calls = [], snapshots = []; let active = 0, maximum = 0;
  const fetchImpl = (url, init = {}) => {
    const pending = deferred();
    const call = { index: calls.length, url: String(url), options: init, at: performance.now(), pending, json: value => pending.resolve(jsonResponse(value)), text: (value, status = 200, type = 'text/plain') => pending.resolve(textResponse(value, status, type)), fail: error => pending.reject(error) };
    calls.push(call); active += 1; maximum = Math.max(maximum, active);
    if (!options.ignoreAbort) init.signal?.addEventListener('abort', () => pending.reject(new DOMException('Aborted', 'AbortError')), { once: true });
    return pending.promise.finally(() => { active -= 1; });
  };
  const controller = createWifiLightController({ fetchImpl, onChange: value => snapshots.push(value), timeoutMs: 350, throttleMs: 15, heartbeatMs: 10000, ...options.controller });
  const call = async index => { await until(() => calls[index], `未收到第 ${index + 1} 个请求`); return calls[index]; };
  const begin = async (command = RED, mode = 'status', endpoint = DEFAULT_DEVICE_URL) => {
    const offset = calls.length, result = controller.connect(endpoint, command); result.catch(() => {});
    const probe = await call(offset); assert.equal(new URL(probe.url).pathname, '/status');
    if (mode === 'legacy') { probe.text('Not found', 404); (await call(offset + 1)).text(OLD_PAGE, 200, 'text/html'); } else probe.json(packet());
    return { result, write: await call(offset + (mode === 'legacy' ? 2 : 1)), mode };
  };
  const complete = async (write, mode = 'status', overrides = {}) => {
    write.text(wire(write).acknowledgement); if (mode === 'legacy') return null;
    const status = await call(write.index + 1); assert.equal(new URL(status.url).pathname, '/status'); status.json(readback(write, overrides)); return status;
  };
  return { controller, calls, snapshots, call, begin, complete, maximum: () => maximum, connect: async (command = RED, mode = 'status') => { const started = await begin(command, mode); await complete(started.write, mode); return started.result; } };
}
async function using(options, callback) { const f = fixture(options); try { await callback(f); } finally { f.controller.dispose(); } }

await check('保留用户 GalleryEchoes 开放热点与原 HTTP 地址', () => { assert.equal(WIFI_SSID, 'GalleryEchoes'); assert.equal(WIFI_PASSWORD, ''); assert.equal(PROTOCOL_VERSION, 2); assert.equal(DEFAULT_DEVICE_URL, 'http://192.168.4.1'); });
await check('URL 只接受本地 HTTP 根地址，拒公网/凭据/路径/query/hash', () => {
  for (const value of ['http://192.168.4.1', 'http://10.0.0.8:8080/', 'http://172.16.0.1', 'http://172.31.255.254', 'http://localhost:5518', 'http://127.0.0.1:8080']) assert.equal(normalizeDeviceUrl(value), new URL(value).origin);
  assert.equal(normalizeDeviceUrl('192.168.4.1'), DEFAULT_DEVICE_URL);
  for (const value of ['', 'https://192.168.4.1', 'http://8.8.8.8', 'http://172.32.0.1', 'http://example.com', 'http://user:pass@192.168.4.1', 'http://192.168.4.1/status', 'http://192.168.4.1/?x=1', 'http://192.168.4.1/#x', 'javascript:alert(1)', 'file:///tmp/device']) assert.throws(() => normalizeDeviceUrl(value), undefined, `不应接受 ${value}`);
});
await check('增强协议：亮度先网页缩放，严格文本 ACK 后再回读确认', () => using({}, async f => {
  const { result, write } = await f.begin(BLUE);
  assert.equal(write.options.method || 'GET', 'GET'); assert.equal(wire(write).path, '/set'); assert.equal(new URL(write.url).searchParams.get('hex'), '000080'); assert.ok(wire(write).seq > 0);
  assert.notEqual(write.options.mode, 'no-cors'); assert.equal(f.controller.getSnapshot().lastApplied, null);
  write.text('OK'); const status = await f.call(write.index + 1); assert.equal(f.controller.getSnapshot().lastApplied, null, '仅文本 OK 就冒称状态已回读'); status.json(readback(write));
  const ack = await result; assert.equal(f.controller.getSnapshot().status, 'connected'); assert.equal(f.controller.getSnapshot().mode, 'status');
  assert.equal(ack.verification, 'state-confirmed'); assert.equal(ack.source, 'status'); assert.equal(ack.acknowledgement, 'OK'); assert.equal(ack.colour, BLUE.colour); assert.equal(ack.brightness, 50); assert.deepEqual(ack.output, { r: 0, g: 0, b: 128 });
}));
await check('关灯、零亮度、纯黑统一使用 /off，保留界面所选色', async () => {
  for (const command of [{ ...BLUE, lightOn: false }, { ...BLUE, brightness: 0 }, { colour: '#000000', brightness: 100, lightOn: true }]) await using({}, async f => {
    const { result, write } = await f.begin(command); assert.equal(wire(write).path, '/off'); assert.equal(new URL(write.url).searchParams.has('hex'), false); await f.complete(write); const ack = await result; assert.equal(ack.colour, command.colour); assert.equal(ack.acknowledgement, 'OFF'); assert.deepEqual(ack.output, { r: 0, g: 0, b: 0 });
  });
});
await check('仅 /status 的 404 可降级到原生 picker 页面', () => using({}, async f => {
  const { result, write } = await f.begin(BLUE, 'legacy'); assert.equal(wire(write).path, '/set'); write.text('OK'); const ack = await result;
  assert.equal(f.calls.length, 3); assert.equal(f.controller.getSnapshot().mode, 'legacy'); assert.equal(f.controller.getSnapshot().device.device, 'gallery-echoes-legacy'); assert.equal(ack.verification, 'request-acknowledged'); assert.equal(ack.source, 'text'); assert.equal(ack.revision, null); assert.notEqual(ack.verification, 'state-confirmed');
}));
await check('旧页面身份容忍合法属性次序和大小写，不接受普通路由器网页', async () => {
  const pages = [
    ['<TITLE> Gallery Echoes </TITLE><INPUT id="picker" class="colour" TYPE="color">', true],
    ['<title>Router login</title><input id="picker" type="color">', false],
    ['<title>Gallery Echoes</title><meta name="gallery-echoes-device" content="nano-esp32-direct-rgb">', true],
    ['<title>Gallery Echoes</title><meta content="nano-esp32-direct-rgb" name="gallery-echoes-device">', true],
    ['<title>Gallery Echoes</title><meta data-name="gallery-echoes-device" content="nano-esp32-direct-rgb">', false],
    ['<title>Gallery Echoes</title><meta name="gallery-echoes-device" data-content="nano-esp32-direct-rgb">', false],
    ['<title>Gallery Echoes</title><meta name="gallery-echoes-device" name="other" content="nano-esp32-direct-rgb">', false],
    ['<title>Gallery Echoes</title><input id="another" type="color">', false],
    ['<title>Gallery Echoes</title><input id="picker" type="text">', false],
    ['<title>Gallery Echoes</title><input data-id="picker" type="color">', false],
    ['<title>Gallery Echoes</title><input id="picker" data-type="color">', false],
    ["<title>Gallery Echoes</title><input id=\"picker\" data-note='type=\"color\"'>", false],
  ];
  for (const [page, valid] of pages) await using({}, async f => { const result = f.controller.connect(DEFAULT_DEVICE_URL, RED); result.catch(() => {}); (await f.call(0)).text('Not found', 404); (await f.call(1)).text(page, 200, 'text/html'); if (valid) { const write = await f.call(2); await f.complete(write, 'legacy'); await result; } else { await assert.rejects(result); assert.equal(f.calls.length, 2); assert.equal(f.controller.getSnapshot().lastApplied, null); } });
});
await check('错误身份/版本/JSON/HTTP500不得降级掩盖为旧固件', async () => {
  const responses = [jsonResponse(packet({ device: 'router' })), jsonResponse(packet({ protocol: 1 })), jsonResponse(packet({ revision: -1 })), jsonResponse(packet({ lastCommand: 'unknown' })), jsonResponse(packet({ output: { r: 999, g: 0, b: 0 } })), textResponse('<title>Gallery Echoes</title><input type="color" id="picker">', 200, 'text/html'), textResponse('Server error', 500)];
  for (const response of responses) await using({}, async f => { const result = f.controller.connect(DEFAULT_DEVICE_URL, RED); result.catch(() => {}); (await f.call(0)).pending.resolve(response); await assert.rejects(result); assert.equal(f.calls.length, 1); assert.equal(f.controller.getSnapshot().status, 'error'); assert.equal(f.controller.getSnapshot().lastApplied, null); });
});
await check('OK/OFF 严格对应命令，HTTP200网页或其他文本不算成功', async () => {
  for (const mode of ['status', 'legacy']) for (const [command, bad] of [[RED, 'OFF'], [RED, 'ok'], [RED, 'OK extra'], [RED, '<html>OK</html>'], [{ ...RED, lightOn: false }, 'OK'], [{ ...RED, lightOn: false }, '<html>OFF</html>']]) await using({}, async f => { const { result, write } = await f.begin(command, mode); write.text(bad); await assert.rejects(result); assert.equal(f.controller.getSnapshot().status, 'error'); assert.equal(f.controller.getSnapshot().lastApplied, null); assert.equal(f.calls.length, write.index + 1); });
});
await check('增强回读必须匹配本次 seq、命令种类和输出 RGB', async () => {
  for (const alter of [state => ({ ...state, seq: state.seq + 1 }), state => ({ ...state, lastCommand: 'off' }), state => ({ ...state, output: { r: 0, g: 255, b: 0 } }), state => ({ ...state, device: 'another-device' })]) await using({}, async f => { const { result, write } = await f.begin(RED); write.text('OK'); (await f.call(write.index + 1)).json(alter(readback(write))); await assert.rejects(result); assert.equal(f.controller.getSnapshot().lastApplied, null); assert.equal(f.controller.getSnapshot().status, 'error'); });
});
await check('离线报错后停止队列，必须明确重新连接', () => using({}, async f => { const result = f.controller.connect(DEFAULT_DEVICE_URL, RED); result.catch(() => {}); (await f.call(0)).fail(new TypeError('Failed to fetch')); await assert.rejects(result); assert.equal(f.controller.setLight(BLUE), false); await delay(35); assert.equal(f.calls.length, 1); assert.equal(f.controller.getSnapshot().status, 'error'); }));
await check('写请求或 JSON/text body 阻塞均超时，迟到内容不得复活', async () => {
  for (const stage of ['fetch', 'text', 'json']) await using({ controller: { timeoutMs: 35 }, ignoreAbort: true }, async f => { const { result, write } = await f.begin(RED); const body = deferred(); let blocked = write; if (stage === 'text') write.pending.resolve({ ok: true, status: 200, text: () => body.promise }); if (stage === 'json') { write.text('OK'); blocked = await f.call(write.index + 1); blocked.pending.resolve({ ok: true, status: 200, json: () => body.promise }); } await assert.rejects(result); assert.equal(blocked.options.signal.aborted, true); assert.equal(f.controller.getSnapshot().lastApplied, null); assert.equal(f.controller.getSnapshot().status, 'error'); if (stage === 'fetch') write.text('OK'); else body.resolve(stage === 'text' ? 'OK' : readback(write)); await delay(10); assert.equal(f.controller.getSnapshot().status, 'error'); });
});
await check('连续调色 latest-wins，文本写入与回读全程单并发', () => using({}, async f => { const { result, write: red } = await f.begin(RED); f.controller.setLight(BLUE); f.controller.setLight(GREEN); await delay(25); assert.equal(f.calls.length, 2); await f.complete(red); await result; const green = await f.call(3); assert.deepEqual(wire(green).output, { r: 0, g: 77, b: 0 }); assert.ok(wire(green).seq > wire(red).seq); await f.complete(green); await until(() => f.controller.getSnapshot().lastApplied?.colour === GREEN.colour, '最新颜色未确认'); assert.equal(f.maximum(), 1); }));
await check('相同状态去重、连续写操作遵循节流间隔', () => using({ controller: { throttleMs: 45 } }, async f => { await f.connect(); f.controller.setLight(RED); await delay(55); assert.equal(f.calls.length, 3); f.controller.setLight(BLUE); const blue = await f.call(3); await f.complete(blue); await until(() => f.controller.getSnapshot().lastApplied?.colour === BLUE.colour, '蓝色未确认'); f.controller.setLight(GREEN); const green = await f.call(5); assert.ok(green.at - blue.at >= 39, '未限制连续写请求'); await f.complete(green); assert.equal(f.maximum(), 1); }));
await check('后续坏 ACK 保留历史确认并停止积压命令', () => using({}, async f => { await f.connect(); const before = f.controller.getSnapshot().lastApplied; f.controller.setLight(BLUE); const write = await f.call(3); f.controller.setLight(GREEN); write.text('<html>OK</html>'); await until(() => f.controller.getSnapshot().status === 'error', '坏文本没有停止会话'); assert.deepEqual(f.controller.getSnapshot().lastApplied, before); await delay(35); assert.equal(f.calls.length, 4); }));
await check('断开中止 connect 并忽略迟到文本 ACK', () => using({ ignoreAbort: true }, async f => { const { result, write } = await f.begin(RED); f.controller.disconnect(); await assert.rejects(result, { name: 'AbortError' }); write.text('OK'); await delay(15); assert.equal(f.controller.getSnapshot().status, 'disconnected'); assert.equal(f.controller.getSnapshot().lastApplied, null); assert.equal(f.calls.length, 2); }));
await check('旧会话迟到文本或 JSON 不覆盖新连接', async () => {
  for (const stage of ['text', 'json']) await using({ ignoreAbort: true }, async f => { const first = await f.begin(RED); let stale = first.write; if (stage === 'json') { first.write.text('OK'); stale = await f.call(first.write.index + 1); } const fresh = await f.begin(BLUE, 'status', 'http://192.168.4.2'); await assert.rejects(first.result, { name: 'AbortError' }); await f.complete(fresh.write); await fresh.result; const applied = f.controller.getSnapshot().lastApplied; if (stage === 'text') stale.text('OK'); else stale.json(readback(first.write)); await delay(15); assert.equal(f.controller.getSnapshot().endpoint, 'http://192.168.4.2'); assert.equal(f.controller.getSnapshot().status, 'connected'); assert.deepEqual(f.controller.getSnapshot().lastApplied, applied); assert.equal(applied.colour, BLUE.colour); });
});
await check('新旧心跳都只读，错误身份/404停止会话且不改历史 ACK', async () => {
  for (const mode of ['status', 'legacy']) await using({ controller: { heartbeatMs: 35 } }, async f => { await f.connect(BLUE, mode); const applied = f.controller.getSnapshot().lastApplied; const beat = await f.call(3); assert.equal(new URL(beat.url).pathname, mode === 'status' ? '/status' : '/'); assert.equal(beat.options.method || 'GET', 'GET'); if (mode === 'status') beat.json(packet({ revision: 16, seq: 15 })); else beat.text(OLD_PAGE, 200, 'text/html'); await delay(8); assert.deepEqual(f.controller.getSnapshot().lastApplied, applied); const bad = await f.call(4); if (mode === 'status') bad.text('Not found', 404); else bad.text('<title>Router</title>', 200, 'text/html'); await until(() => f.controller.getSnapshot().status === 'error', '错误心跳未停止'); const count = f.calls.length; await delay(50); assert.equal(f.calls.length, count); });
});
await check('心跳不得与写入并发，dispose 后无新请求', () => using({ controller: { heartbeatMs: 25 } }, async f => { await f.connect(); f.controller.setLight(BLUE); const write = await f.call(3); await delay(65); assert.equal(f.calls.length, 4); assert.equal(f.maximum(), 1); f.controller.dispose(); assert.equal(write.options.signal.aborted, true); const count = f.calls.length; await delay(35); assert.equal(f.calls.length, count); }));
await check('同步状态回调断开时，不挂起或继续写入', async () => {
  for (const phase of ['connecting', 'handshake', 'sending']) { let controller; const f = fixture({ controller: { onChange: snapshot => { const matched = phase === 'connecting' ? snapshot.status === 'connecting' && !snapshot.device : phase === 'handshake' ? snapshot.status === 'connecting' && snapshot.device : snapshot.status === 'sending'; if (matched) controller.disconnect(); } } }); controller = f.controller; try { const result = controller.connect(DEFAULT_DEVICE_URL, RED); result.catch(() => {}); if (phase !== 'connecting') (await f.call(0)).json(packet()); await assert.rejects(Promise.race([result, delay(180).then(() => { throw new Error(`${phase} 断开后挂起`); })]), { name: 'AbortError' }); await delay(8); assert.equal(controller.getSnapshot().status, 'disconnected'); assert.equal(f.calls.length, phase === 'connecting' ? 0 : 1); } finally { controller.dispose(); } }
});

await check('当前 1.4.0 原生备用页：原型识别后七种混色与关灯均只显示请求应答', () => using({}, async f => {
  assert.match(CURRENT_PAGE, /Firmware 1\.4\.0/);
  const result = f.controller.connect(DEFAULT_DEVICE_URL, RED); result.catch(() => {});
  (await f.call(0)).text('Not found', 404);
  (await f.call(1)).text(CURRENT_PAGE, 200, 'text/html');
  await f.complete(await f.call(2), 'legacy');
  await result;
  let next = 3;
  for (const colour of ['#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff', '#000000']) {
    f.controller.setLight({ colour, brightness: 100, lightOn: true });
    const write = await f.call(next++);
    const expected = colour === '#000000' ? 'off' : 'set';
    assert.equal(wire(write).lastCommand, expected);
    if (expected === 'set') assert.equal(new URL(write.url).searchParams.get('hex'), colour.slice(1));
    await f.complete(write, 'legacy');
    await until(() => f.controller.getSnapshot().lastApplied?.colour === colour, '当前固件颜色请求未应答');
    assert.equal(f.controller.getSnapshot().lastApplied.verification, 'request-acknowledged');
    assert.equal(f.controller.getSnapshot().lastApplied.revision, null);
  }
  assert.equal(f.calls.filter(call => new URL(call.url).pathname === '/status').length, 1);
  assert.equal(f.maximum(), 1);
}));

if (process.argv.includes('--http')) for (const mode of ['status', 'legacy']) await check(`本机实际 HTTP：${mode} 原 /set、/off 与缩放 RGB`, async () => {
  let current = packet(), controller; const received = [];
  const server = createServer((request, reply) => {
    const url = new URL(request.url, 'http://127.0.0.1'); received.push({ path: url.pathname, method: request.method, hex: url.searchParams.get('hex') }); reply.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    if (url.pathname === '/status' && mode === 'status') { reply.setHeader('Content-Type', 'application/json'); return reply.end(JSON.stringify(current)); }
    if (url.pathname === '/') { reply.setHeader('Content-Type', 'text/html'); return reply.end(mode === 'legacy' ? CURRENT_PAGE : OLD_PAGE); }
    if (url.pathname === '/set' || url.pathname === '/off') { const command = wire({ url: url.href }); current = readback({ url: url.href }); reply.setHeader('Content-Type', 'text/plain'); return reply.end(command.acknowledgement); }
    reply.statusCode = 404; reply.end('Not found');
  });
  try {
    server.listen(0, '127.0.0.1'); await once(server, 'listening'); controller = createWifiLightController({ timeoutMs: 1000, throttleMs: 10, heartbeatMs: 10000 });
    const ack = await controller.connect(`http://127.0.0.1:${server.address().port}`, BLUE); assert.deepEqual(ack.output, { r: 0, g: 0, b: 128 }); assert.equal(ack.verification, mode === 'status' ? 'state-confirmed' : 'request-acknowledged');
    controller.setLight({ ...BLUE, lightOn: false }); await until(() => controller.getSnapshot().lastApplied?.lightOn === false, '真实 HTTP 关灯未完成'); assert.deepEqual(controller.getSnapshot().lastApplied.output, { r: 0, g: 0, b: 0 });
    assert.ok(received.every(item => item.method === 'GET')); assert.equal(received.find(item => item.path === '/set').hex, '000080'); assert.equal(received.filter(item => item.path === '/off').length, 1); assert.ok(received.every(item => !item.path.startsWith('/api/')));
  } finally { controller?.dispose(); server.closeAllConnections(); if (server.listening) await new Promise(resolve => server.close(resolve)); }
});

console.log(JSON.stringify({ checks: results.length, passed: results.filter(result => result.passed).length, results, limits: '真实 JS 控制器的 mock/localhost HTTP 测试不证明浏览器 CORS/LNA、固件烧录或物理 LED。旧协议 OK/OFF 仅确认请求应答；增强 /status 确认报告状态，不测量发出的光。' }, null, 2));
if (results.some(result => !result.passed)) process.exitCode = 1;
