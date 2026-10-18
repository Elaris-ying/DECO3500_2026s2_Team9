import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { makeDeviceHandoffUrl, readDeviceHandoff } from '../src/light-handoff.mjs';

// 纯链接与参数校验测试；不启动服务器，不请求手环，也不打开浏览器。
const results = [];
function check(name, callback) {
  try { callback(); results.push({ name, passed: true }); }
  catch (error) { results.push({ name, passed: false, error: error.message }); }
}
const valid = '?screen=device&colour=12abef&brightness=37&power=1';

check('固定设备地址、设备页与明确的四个参数', () => {
  const url = new URL(makeDeviceHandoffUrl({ colour:'#12ABEF',brightness:37,lightOn:true }));
  assert.equal(url.origin, 'http://192.168.4.1');
  assert.equal(url.pathname, '/');
  assert.equal(url.search, valid);
  assert.equal(url.hash, '');
  assert.equal(url.username, '');
  assert.equal(url.password, '');
});
check('生成器规范化常用 HEX，读取器返回统一命令格式', () => {
  const url = new URL(makeDeviceHandoffUrl({ colour:'#AbC',brightness:100,lightOn:true }));
  assert.deepEqual(readDeviceHandoff(url.search), { colour:'#aabbcc',brightness:100,lightOn:true });
  assert.deepEqual(readDeviceHandoff('?power=1&brightness=37&colour=12ABEF&screen=device'), { colour:'#12abef',brightness:37,lightOn:true });
});
check('关灯与零亮度保留选色，不把预填当作写灯', () => {
  for (const settings of [{ colour:'#ff00ff',brightness:0,lightOn:true },{ colour:'#123456',brightness:73,lightOn:false }]) {
    assert.deepEqual(readDeviceHandoff(new URL(makeDeviceHandoffUrl(settings)).search), settings);
  }
});
check('亮度端点 0 和 100 有效', () => {
  for (const brightness of [0,100]) assert.equal(readDeviceHandoff(`?screen=device&colour=abcdef&brightness=${brightness}&power=1`).brightness, brightness);
});
check('生成器拒绝非法色值、亮度和开关类型', () => {
  for (const colour of [undefined,null,'#xyz','red','#1234567']) assert.throws(() => makeDeviceHandoffUrl({colour,brightness:50,lightOn:true}));
  for (const brightness of [undefined,null,'50',NaN,Infinity,-1,101,1.5]) assert.throws(() => makeDeviceHandoffUrl({colour:'#123456',brightness,lightOn:true}));
  for (const lightOn of [undefined,null,0,1,'true']) assert.throws(() => makeDeviceHandoffUrl({colour:'#123456',brightness:50,lightOn}));
});
check('读取拒绝缺失字段和错误页面', () => {
  for (const query of ['',null,undefined,'?screen=home&colour=abcdef&brightness=50&power=1','?colour=abcdef&brightness=50&power=1','?screen=device&brightness=50&power=1','?screen=device&colour=abcdef&power=1','?screen=device&colour=abcdef&brightness=50']) assert.equal(readDeviceHandoff(query), null);
});
check('读取严格拒绝重复参数和经过编码的重复参数', () => {
  for (const extra of ['screen=device','colour=abcdef','brightness=50','power=0','%63olour=abcdef']) assert.equal(readDeviceHandoff(valid + '&' + extra), null);
});
check('读取严格拒绝未知参数及可疑命令', () => {
  for (const extra of ['endpoint=http://evil.example','connect=1','redirect=https://example.com','x=1','=value']) assert.equal(readDeviceHandoff(valid + '&' + extra), null);
});
check('读取拒绝不完整、带井号或非 HEX 的色值', () => {
  for (const colour of ['abc','%23abcdef','abcdef0','abcdeg','red','abcdef%0a','%20abcdef']) assert.equal(readDeviceHandoff(`?screen=device&colour=${colour}&brightness=50&power=1`), null);
});
check('读取拒绝小数、指数、符号、空白和越界亮度', () => {
  for (const brightness of ['','-1','101','1.5','1e2','%2b50','%2050','050','0x32','NaN','Infinity']) assert.equal(readDeviceHandoff(`?screen=device&colour=abcdef&brightness=${brightness}&power=1`), null);
});
check('读取只接受明确的 0 或 1 开关', () => {
  for (const power of ['','true','false','2','-1','01','1%20']) assert.equal(readDeviceHandoff(`?screen=device&colour=abcdef&brightness=50&power=${power}`), null);
});
check('读取不会接受 URL、hash 或大小写不同的字段名', () => {
  for (const query of ['http://192.168.4.1/' + valid,valid + '#connect','?Screen=device&colour=abcdef&brightness=50&power=1']) assert.equal(readDeviceHandoff(query), null);
});
const moduleSource = await readFile(new URL('../src/light-handoff.mjs', import.meta.url), 'utf8');
check('交接模块没有网络、窗口或自动导航副作用', () => {
  assert.doesNotMatch(moduleSource, /\bfetch\s*\(|\bconnectBoard\s*\(|window\s*\.\s*open\s*\(|location\s*\.\s*(?:assign|replace)\s*\(|location\s*\.\s*href\s*=/);
});
console.log(JSON.stringify({ checks:results.length,passed:results.filter(result => result.passed).length,results,limits:'仅验证链接和参数规则；不连接硬件或自动跳转。' },null,2));
if (results.some(result => !result.passed)) process.exitCode = 1;
