/*
 * Gallery Echoes · 基于用户原程序保留直接 RGB 控制。
 * Nano ESP32 / Arduino ESP32 Boards by Arduino 2.x。
 * GalleryEchoes 开放热点；http://192.168.4.1；/set -> OK，/off -> OFF。
 * 增加严格 HEX 校验、本机 Go Live CORS 和直接测试颜色，首次仍需 USB 上传。
 */
#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

#if defined(ESP_ARDUINO_VERSION_MAJOR) && ESP_ARDUINO_VERSION_MAJOR >= 3
#error "Select Arduino ESP32 Boards by Arduino (2.x) for this sketch."
#endif

// 早批次板子若只有绿、蓝颜色相反，再改为 1；不硬编码 GPIO。
#ifndef SWAP_GREEN_BLUE
#define SWAP_GREEN_BLUE 0
#endif
const uint8_t RED_PIN = LED_RED;
const uint8_t GREEN_PIN = SWAP_GREEN_BLUE ? LED_BLUE : LED_GREEN;
const uint8_t BLUE_PIN = SWAP_GREEN_BLUE ? LED_GREEN : LED_BLUE;
const char *ssid = "GalleryEchoes";
const IPAddress localIP(192, 168, 4, 1);
const IPAddress subnet(255, 255, 255, 0);
WebServer server(80);
bool networkReady = false;

// 恢复原程序的直接控制：板载 RGB 是 active-low，光强 255 对应 PWM 0。
// 不通过驱动读回判定灯是否亮，也不把已发送命令回滚成关灯。
void setRGB(int r, int g, int b) {
  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);
  b = constrain(b, 0, 255);
  analogWrite(RED_PIN, 255 - r);
  analogWrite(GREEN_PIN, 255 - g);
  analogWrite(BLUE_PIN, 255 - b);
  Serial.print("RGB: ");
  Serial.print(r); Serial.print(", ");
  Serial.print(g); Serial.print(", ");
  Serial.println(b);
}

int hexDigit(char character) {
  if (character >= '0' && character <= '9') return character - '0';
  if (character >= 'a' && character <= 'f') return character - 'a' + 10;
  if (character >= 'A' && character <= 'F') return character - 'A' + 10;
  return -1;
}

bool parseHex(const String &hex, uint8_t &r, uint8_t &g, uint8_t &b) {
  if (hex.length() != 6) return false;
  uint32_t rgb = 0;
  for (size_t index = 0; index < 6; ++index) {
    const int digit = hexDigit(hex[index]);
    if (digit < 0) return false;
    rgb = (rgb << 4) | uint32_t(digit);
  }
  r = (rgb >> 16) & 255;
  g = (rgb >> 8) & 255;
  b = rgb & 255;
  return true;
}

int argumentCount(const char *name) {
  int count = 0;
  for (int index = 0; index < server.args(); ++index) if (server.argName(index) == name) ++count;
  return count;
}

// CORS 只接受本机 Go Live 和设备自身；严格校验端口，不放行伪装的域名。
bool isAllowedOrigin(const String &origin) {
  if (!origin.length()) return true;
  if (!origin.startsWith("http://")) return false;
  const String authority = origin.substring(7);
  const int separator = authority.indexOf(':');
  const String host = separator < 0 ? authority : authority.substring(0, separator);
  if (host != "localhost" && host != "127.0.0.1" && host != "192.168.4.1") return false;
  if (separator < 0) return true;
  const String portText = authority.substring(separator + 1);
  if (!portText.length()) return false;
  uint32_t port = 0;
  for (size_t index = 0; index < portText.length(); ++index) {
    const char character = portText[index];
    if (character < '0' || character > '9') return false;
    port = port * 10 + uint32_t(character - '0');
    if (port > 65535) return false;
  }
  return port > 0 && (host != "192.168.4.1" || port == 80);
}

void sendError(int code, const char *message) {
  server.send(code, "text/plain; charset=utf-8", message);
}

bool prepareRequest() {
  server.sendHeader("Cache-Control", "no-store");
  const String origin = server.header("Origin");
  if (!isAllowedOrigin(origin)) { sendError(403, "Origin is not allowed."); return false; }
  if (origin.length()) server.sendHeader("Access-Control-Allow-Origin", origin);
  server.sendHeader("Vary", "Origin");
  server.sendHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
  server.sendHeader("Access-Control-Allow-Private-Network", "true");
  server.sendHeader("Access-Control-Max-Age", "600");
  return true;
}

bool getRequest() {
  if (!prepareRequest()) return false;
  if (server.method() == HTTP_OPTIONS) { server.send(204); return false; }
  if (server.method() != HTTP_GET) {
    server.sendHeader("Allow", "GET, OPTIONS");
    sendError(405, "Use GET for this endpoint.");
    return false;
  }
  return true;
}

void handleColor() {
  if (!getRequest()) return;
  uint8_t r, g, b;
  if (argumentCount("hex") != 1 || !parseHex(server.arg("hex"), r, g, b)) {
    sendError(400, "Use exactly six hexadecimal digits, without #.");
    return;
  }
  // 与原程序一致：额外参数（包括界面附带的 seq）忽略。
  setRGB(r, g, b);
  server.send(200, "text/plain", "OK");
}

void handleOff() {
  if (!getRequest()) return;
  setRGB(0, 0, 0);
  server.send(200, "text/plain", "OFF");
}

// 原生测试页使用相同 /set、/off；ACK 仅表示命令已处理，不代表测量了实际亮度。
const char PAGE[] PROGMEM = R"GEHTML(<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Gallery Echoes</title>
<style>
body{margin:0;background:#f7f3ec;color:#514735;font:15px/1.6 system-ui}main{max-width:430px;margin:5vh auto;padding:28px}h1{font:38px/1.15 Georgia}p{color:#88775e}input{width:100%;height:80px;padding:6px;border:1px solid #d4c7b2;border-radius:16px;background:#fffaf1;box-sizing:border-box}button{padding:12px;border:1px solid #d4c7b2;border-radius:20px;background:#ece3d2;color:#514735;font:inherit;cursor:pointer}.colours{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:18px 0}.colours button{padding:12px 4px}.actions{display:flex;gap:10px}.actions button{flex:1}input:focus-visible,button:focus-visible{outline:2px solid #786242;outline-offset:4px}small{display:block;margin:18px 0;color:#88775e}
</style>
<main><h1>Gallery Echoes</h1><p>Choose a colour for the Nano ESP32's onboard RGB LED.</p>
<label for="picker">Light colour</label><input type="color" id="picker" value="#ff0000">
<div class="colours" aria-label="Quick test colours">
<button type="button" data-hex="ff0000">Red</button><button type="button" data-hex="00ff00">Green</button>
<button type="button" data-hex="0000ff">Blue</button><button type="button" data-hex="ffff00">Yellow</button>
<button type="button" data-hex="00ffff">Cyan</button><button type="button" data-hex="ff00ff">Magenta</button>
<button type="button" data-hex="ffffff">White</button></div>
<div class="actions"><button type="button" id="send">Send current colour</button><button type="button" id="off">Turn off</button></div>
<p id="message" role="status">Light starts off. Choose a colour or press Send current colour.</p>
<small>Firmware 1.2.0 · GalleryEchoes · 192.168.4.1<br>OK / OFF acknowledge a command; physical LED output is not measured. No internet is needed.</small></main>
<script>
const picker=document.getElementById('picker'),message=document.getElementById('message');
let pending=null,running=false,timer=null;
async function flush(){
  if(running||!pending)return;
  const command=pending;pending=null;running=true;message.textContent='Waiting for the board…';
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),5000);
  try{
    const response=await fetch(command.path,{cache:'no-store',signal:controller.signal}),text=await response.text();
    if(!response.ok||text!==command.ack)throw Error(text||'No acknowledgement');
    if(!pending)message.textContent=command.ack==='OFF'?'Board acknowledged OFF.':'Board acknowledged #'+command.hex.toUpperCase()+'.';
  }catch(error){if(!pending)message.textContent='Not acknowledged. '+error.message;}
  finally{clearTimeout(timeout);running=false;if(pending){clearTimeout(timer);timer=setTimeout(flush,60);}}
}
function queue(command){pending=command;clearTimeout(timer);timer=setTimeout(flush,60);}
function sendColour(){const hex=picker.value.slice(1);queue({path:'/set?hex='+hex,ack:'OK',hex});}
picker.addEventListener('input',sendColour);
picker.addEventListener('change',sendColour);
document.getElementById('send').addEventListener('click',sendColour);
document.querySelectorAll('[data-hex]').forEach(button=>button.addEventListener('click',()=>{picker.value='#'+button.dataset.hex;sendColour();}));
document.getElementById('off').addEventListener('click',()=>queue({path:'/off',ack:'OFF'}));
</script></html>)GEHTML";

void handleRoot() {
  if (getRequest()) server.send_P(200, "text/html; charset=utf-8", PAGE);
}

void setup() {
  Serial.begin(115200);
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  digitalWrite(RED_PIN, HIGH);
  digitalWrite(GREEN_PIN, HIGH);
  digitalWrite(BLUE_PIN, HIGH);
  // 明确 8 位 PWM，保持 RGB 0–255；不添加自动颜色循环。
  analogWriteResolution(8);
  analogWriteFrequency(1000);
  setRGB(0, 0, 0);
  WiFi.mode(WIFI_AP);
  networkReady = WiFi.softAPConfig(localIP, localIP, subnet) && WiFi.softAP(ssid);
  if (!networkReady) { Serial.println("GalleryEchoes AP could not start. Check power and restart."); return; }
  const char *headers[] = {"Origin"};
  server.collectHeaders(headers, 1);
  server.on("/", HTTP_ANY, handleRoot);
  server.on("/set", HTTP_ANY, handleColor);
  server.on("/off", HTTP_ANY, handleOff);
  // 不提供状态读回协议；现有原型遇到 /status 404 会使用 OK / OFF 应答模式。
  server.onNotFound([]() {
    if (!prepareRequest()) return;
    if (server.method() == HTTP_OPTIONS) server.send(204);
    else sendError(404, "Not found.");
  });
  server.begin();
  Serial.println("Gallery Echoes · Nano ESP32 · firmware 1.2.0");
  Serial.println("Wi-Fi: GalleryEchoes (open, no password)");
  Serial.print("Open http://"); Serial.println(WiFi.softAPIP());
  Serial.println("RGB commands use direct analogWrite; light starts OFF.");
}

void loop() {
  if (networkReady) server.handleClient();
}

