import assert from 'node:assert/strict';
import { ARDUINO_DEMO_FRAMES, getLightOutput } from '../src/device-colour.mjs';
import { snapshotStudioLight } from '../src/studio-return.mjs';

// 验证返回前后真正发送的 RGB/开关，而非只比较界面名称；不访问设备或网络。
const results = [];
function check(name, callback) {
  try { callback(); results.push({ name, passed: true }); }
  catch (error) { results.push({ name, passed: false, error: error.message }); }
}

for (const [index, frame] of ARDUINO_DEMO_FRAMES.entries()) {
  check(`返回画廊保留演示 ${frame.label} 帧的实际输出与电源`, () => {
    const original = Object.freeze({ customColour: '#123456', brightness: 37, lightOn: true });
    const snapshot = snapshotStudioLight(original, index);
    const visibleOutput = getLightOutput(frame.hex, 100, frame.lightOn);
    assert.deepEqual(getLightOutput(snapshot.customColour, snapshot.brightness, snapshot.lightOn), visibleOutput);
    assert.equal(snapshot.customColour, frame.hex);
    assert.equal(snapshot.brightness, 100);
    assert.equal(snapshot.lightOn, frame.lightOn);
    assert.deepEqual(original, { customColour: '#123456', brightness: 37, lightOn: true });
    // 第二次返回、或组件卸载后，已成为普通设置，不会再恢复演示前的灯光。
    assert.equal(snapshotStudioLight(snapshot, null), snapshot);
  });
}

check('Off 帧不会恢复之前已开启的彩灯，仍保存选色供下次手动开灯', () => {
  const previous = Object.freeze({ customColour: '#ffffff', brightness: 100, lightOn: true });
  const offIndex = ARDUINO_DEMO_FRAMES.findIndex((frame) => !frame.lightOn);
  const snapshot = snapshotStudioLight(previous, offIndex);
  assert.equal(snapshot.lightOn, false);
  assert.equal(snapshot.customColour, '#ff00ff');
  assert.deepEqual(getLightOutput(snapshot.customColour, snapshot.brightness, snapshot.lightOn), { r: 0, g: 0, b: 0, hex: '#000000' });
});

check('手动颜色、关灯、零亮度及默认情绪模式返回时均不改任何设置', () => {
  const cases = [
    { customColour: '#abcdef', brightness: 46, lightOn: true },
    { customColour: '#ff00ff', brightness: 73, lightOn: false },
    { customColour: '#123456', brightness: 0, lightOn: true },
    { customColour: '#000000', brightness: 100, lightOn: true },
    { customColour: null, brightness: 37.5, lightOn: false },
    { customColour: null, brightness: 100, lightOn: true },
  ];
  for (const values of cases) {
    const original = Object.freeze(values);
    const snapshot = snapshotStudioLight(original, null);
    assert.equal(snapshot, original);
    assert.deepEqual(getLightOutput(snapshot.customColour || '#91bdd8', snapshot.brightness, snapshot.lightOn), getLightOutput(original.customColour || '#91bdd8', original.brightness, original.lightOn));
  }
});

check('返回已有 Echo 的作品时冻结默认情绪色，作品恢复不能改变当前光强', () => {
  const commands = [
    { colour: '#91bdd8', brightness: 37.5, lightOn: true },
    { colour: '#e8af90', brightness: 73, lightOn: false },
    { colour: '#c1abe5', brightness: 0, lightOn: true },
    { colour: '#000000', brightness: 100, lightOn: true },
  ];
  const restoredEchoColour = '#b0c9a1';
  for (const command of commands) {
    Object.freeze(command);
    const original = Object.freeze({ customColour: null, brightness: command.brightness, lightOn: command.lightOn });
    const snapshot = snapshotStudioLight(original, null, command);
    assert.equal(snapshot.customColour, command.colour);
    assert.equal(snapshot.brightness, command.brightness);
    assert.equal(snapshot.lightOn, command.lightOn);
    // go('home') 即使恢复另一作品的 Echo，显式冻结色仍优先于该作品的情绪色。
    assert.deepEqual(getLightOutput(snapshot.customColour || restoredEchoColour, snapshot.brightness, snapshot.lightOn), getLightOutput(command.colour, command.brightness, command.lightOn));
    assert.equal(original.customColour, null);
  }
});

check('已有手动 HEX 不会被额外的默认情绪命令覆盖，也不会因返回开灯', () => {
  const original = Object.freeze({ customColour: '#123456', brightness: 42, lightOn: false });
  assert.equal(snapshotStudioLight(original, null, { colour: '#ffffff', brightness: 100, lightOn: true }), original);
});

check('无法完整描述当前默认灯态时拒绝猜测亮度或电源', () => {
  const original = Object.freeze({ customColour: null, brightness: 20, lightOn: false });
  for (const command of [
    {},
    { colour: '#xyz', brightness: 20, lightOn: false },
    { colour: '#abcdef', brightness: NaN, lightOn: false },
    { colour: '#abcdef', brightness: 101, lightOn: false },
    { colour: '#abcdef', brightness: 20, lightOn: 'false' },
  ]) assert.throws(() => snapshotStudioLight(original, null, command), TypeError);
  assert.deepEqual(original, { customColour: null, brightness: 20, lightOn: false });
});

check('非法演示帧拒绝快照，不猜测颜色或意外开灯', () => {
  const original = Object.freeze({ customColour: '#abcdef', brightness: 25, lightOn: false });
  for (const index of [-1, ARDUINO_DEMO_FRAMES.length, 1.5, '0', NaN]) assert.throws(() => snapshotStudioLight(original, index), RangeError);
  assert.deepEqual(original, { customColour: '#abcdef', brightness: 25, lightOn: false });
});

console.log(JSON.stringify({ checks: results.length, passed: results.filter((result) => result.passed).length, results, limits: '纯灯态与输出回归检查；不连接、断开或写入硬件，不代替浏览器返回操作实测。' }, null, 2));
if (results.some((result) => !result.passed)) process.exitCode = 1;
