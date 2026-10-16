import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ARDUINO_DEMO_FRAMES, LIGHT_STORAGE_KEY, deriveLightPalette, getLightOutput, normalizeHex, normalizeLightSettings } from './device-colour.mjs';
import { DEFAULT_DEVICE_URL, createWifiLightController, normalizeDeviceUrl } from './wifi-light.mjs';
import { WristbandModel } from './WristbandModel';
import './wristband.css';
export { WristbandColourStudio } from './WristbandColourStudio';

// 手环、页面光晕与交互反馈共用同一色板，避免不同页面各自维护颜色。
const PALETTE = {
  amber: { name: 'Warm amber', color: '#bb9364', light: '#e6bb7b', soft: '#f2e7d4', ink: '#775734', rgb: '187, 147, 100' },
  blue: { name: 'Quiet blue', color: '#7a9ab0', light: '#91bdd8', soft: '#e3edf2', ink: '#476a83', rgb: '122, 154, 176' },
  lavender: { name: 'Soft lavender', color: '#a394bd', light: '#c1abe5', soft: '#eae4f1', ink: '#6d5b87', rgb: '163, 148, 189' },
  peach: { name: 'Warm peach', color: '#c8957e', light: '#e8af90', soft: '#f2e2d9', ink: '#855a47', rgb: '200, 149, 126' },
  sage: { name: 'Gentle sage', color: '#91a38a', light: '#b0c9a1', soft: '#e4eadf', ink: '#5c7456', rgb: '145, 163, 138' },
};

const FEELINGS = [
  { label: 'Calm', tone: 'blue', description: 'A quiet moment' },
  { label: 'Curious', tone: 'lavender', description: 'An invitation to explore' },
  { label: 'Nostalgic', tone: 'peach', description: 'A memory returning' },
  { label: 'Other feeling', tone: 'sage', description: 'Room for your own feeling' },
];

const SIGNALS = {
  idle: { label: 'Ready to explore', description: 'A slow amber breath marks the beginning of your visit.' },
  scanning: { label: 'Finding an artwork', description: 'A blue pulse follows the artwork scan.' },
  connected: { label: 'Your feeling, in light', description: 'The light and the interface share your selected feeling.' },
  saved: { label: 'Moment acknowledged', description: 'A gentle light pulse acknowledges this moment. Your feeling keeps its colour.' },
};

const FEEDBACK_MESSAGES = {
  submitted: 'Your echo has been added. Your feeling stays with you.',
  saved: 'Your moment is ready to keep.',
  connected: 'Your wristband light preview is ready.',
  preview: 'A gentle light and vibration preview.',
};
const PREFERENCES_KEY = 'gallery-echoes-feedback-preferences-v1';
const WIFI_ENDPOINT_KEY = 'gallery-echoes-wifi-endpoint-v1';

// 仅在本机保存体验偏好；浏览器禁用本地存储时仍能正常使用。
function readPreferences() {
  const defaults = { vibrationEnabled: true, quietMode: false };
  try {
    const saved = JSON.parse(window.localStorage.getItem(PREFERENCES_KEY) || 'null');
    return {
      vibrationEnabled: typeof saved?.vibrationEnabled === 'boolean' ? saved.vibrationEnabled : defaults.vibrationEnabled,
      quietMode: typeof saved?.quietMode === 'boolean' ? saved.quietMode : defaults.quietMode,
    };
  } catch { return defaults; }
}

function readLightSettings() {
  try { return normalizeLightSettings(JSON.parse(window.localStorage.getItem(LIGHT_STORAGE_KEY) || 'null')); }
  catch { return normalizeLightSettings(null); }
}

// 只记住上次输入的设备地址；刷新后始终未连接，绝不自动控制硬件。
function readWifiEndpoint() {
  try { return normalizeDeviceUrl(window.localStorage.getItem(WIFI_ENDPOINT_KEY) || DEFAULT_DEVICE_URL); }
  catch { return DEFAULT_DEVICE_URL; }
}
function initialWifiConnection() {
  return { status: 'disconnected', endpoint: DEFAULT_DEVICE_URL, device: null, lastApplied: null, lastSeenAt: null, error: null };
}

const WristbandContext = createContext(null);
const initialState = { mode: 'personal', feeling: 'Calm', signal: 'idle', feelingChosen: false };

// 同时支持 setFeeling('Calm') 与 React 的函数式 setter，方便页面原有状态迁移。
function wristbandReducer(state, action) {
  const value = typeof action.value === 'function' ? action.value(state[action.type]) : action.value;
  if (action.type === 'mode' && ['personal', 'team'].includes(value)) return state.mode === value ? state : { ...state, mode: value };
  if (action.type === 'feeling' && FEELINGS.some((item) => item.label === value)) return state.feeling === value && state.feelingChosen ? state : { ...state, feeling: value, feelingChosen: true };
  if (action.type === 'signal' && Object.hasOwn(SIGNALS, value)) return state.signal === value ? state : { ...state, signal: value };
  return state;
}

function getTone({ mode, feeling, signal, feelingChosen }) {
  // 扫描暂用蓝色提示；完成提交时保留情绪颜色，成功由短暂光波表达。
  if (signal === 'scanning') return 'blue';
  if (signal === 'idle') return 'amber';
  if (mode === 'team' && !feelingChosen) return 'lavender';
  return FEELINGS.find((item) => item.label === feeling)?.tone || 'amber';
}

export function WristbandProvider({ children }) {
  const [state, dispatch] = useReducer(wristbandReducer, initialState);
  const [preferences, setPreferences] = useState(readPreferences);
  const [lightSettings, setLightSettings] = useState(readLightSettings);
  const [demoIndex, setDemoIndex] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [wifiEndpoint, setWifiEndpoint] = useState(readWifiEndpoint);
  const [wifiConnection, setWifiConnection] = useState(initialWifiConnection);
  const [wifiSessionReady, setWifiSessionReady] = useState(false);
  const wifiControllerRef = useRef(null);
  const wifiAttemptRef = useRef(0);
  const lightCommandRef = useRef(null);
  const wifiEndpointRef = useRef(wifiEndpoint);
  const preferencesRef = useRef(preferences);
  const stateRef = useRef(state);
  const lightSettingsRef = useRef(lightSettings);
  const demoIndexRef = useRef(demoIndex);
  const demoOwnerRef = useRef(null);
  const demoTimer = useRef(null);
  const feedbackTimer = useRef(null);
  const feedbackId = useRef(0);
  preferencesRef.current = preferences;
  stateRef.current = state;
  lightSettingsRef.current = lightSettings;
  demoIndexRef.current = demoIndex;
  wifiEndpointRef.current = wifiEndpoint;

  // 会话放在全局 Provider 内，切换作品和页面不会断开；只有用户点击连接才发起网络请求。
  useEffect(() => {
    let active = true;
    const controller = createWifiLightController({ onChange: (snapshot) => {
      if (!active) return;
      setWifiConnection(snapshot);
      if (['disconnected', 'error'].includes(snapshot.status)) setWifiSessionReady(false);
    } });
    wifiControllerRef.current = controller;
    setWifiConnection(controller.getSnapshot());
    return () => {
      active = false;
      wifiAttemptRef.current += 1;
      wifiControllerRef.current = null;
      controller.dispose();
    };
  }, []);
  useEffect(() => {
    try { window.localStorage.setItem(WIFI_ENDPOINT_KEY, normalizeDeviceUrl(wifiEndpoint)); } catch { /* 未输入完整地址时不覆盖上次有效地址。 */ }
  }, [wifiEndpoint]);
  const connectBoard = useCallback(async (address) => {
    const endpoint = normalizeDeviceUrl(address ?? wifiEndpointRef.current);
    const controller = wifiControllerRef.current;
    if (!controller) throw new Error('Board controls are still preparing. Please try again.');
    const attempt = ++wifiAttemptRef.current;
    setWifiEndpoint(endpoint);
    setWifiSessionReady(false);
    try {
      await controller.connect(endpoint, lightCommandRef.current);
      // 真实握手和首次颜色 ACK 完成后才显示 Board linked；断开后的迟到回调不得重新点亮状态。
      if (attempt !== wifiAttemptRef.current || controller !== wifiControllerRef.current) return false;
      if (!['connected', 'sending'].includes(controller.getSnapshot().status)) return false;
      setWifiSessionReady(true);
      return true;
    } catch (error) {
      if (attempt !== wifiAttemptRef.current) return false;
      setWifiSessionReady(false);
      throw error;
    }
  }, []);
  const disconnectBoard = useCallback(() => {
    wifiAttemptRef.current += 1;
    setWifiSessionReady(false);
    wifiControllerRef.current?.disconnect();
  }, []);
  const stopColourDemo = useCallback((owner) => {
    if (owner !== undefined && demoOwnerRef.current !== owner) return;
    clearInterval(demoTimer.current); demoIndexRef.current = null; demoOwnerRef.current = null; setDemoIndex(null);
  }, []);
  const setMode = useCallback((value) => dispatch({ type: 'mode', value }), []);
  const setFeeling = useCallback((value, { preserveCustom = false } = {}) => {
    const next = typeof value === 'function' ? value(stateRef.current.feeling) : value;
    if (!FEELINGS.some((item) => item.label === next)) return;
    // 路由恢复旧 Echo 只更新情绪记录；明确选择情绪才接管自由灯色。
    if (!preserveCustom) {
      stopColourDemo();
      setLightSettings((current) => current.customColour === null && current.lightOn ? current : { ...current, customColour: null, lightOn: true });
    }
    dispatch({ type: 'feeling', value: next });
  }, [stopColourDemo]);
  const setSignal = useCallback((value) => dispatch({ type: 'signal', value }), []);
  const setCustomColour = useCallback((value) => {
    const next = typeof value === 'function' ? value(lightSettingsRef.current.customColour) : value;
    const hex = next === null ? null : normalizeHex(next);
    if (next !== null && !hex) return;
    stopColourDemo();
    // 手动选色会开灯，保留所选亮度；关灯本身不会丢失色值。
    setLightSettings((current) => current.customColour === hex && (hex === null || current.lightOn) ? current : { ...current, customColour: hex, lightOn: hex === null ? current.lightOn : true });
  }, [stopColourDemo]);
  const setBrightness = useCallback((value) => {
    const frame = demoIndexRef.current === null ? null : ARDUINO_DEMO_FRAMES[demoIndexRef.current];
    const next = Number(typeof value === 'function' ? value(frame ? 100 : lightSettingsRef.current.brightness) : value);
    if (!Number.isFinite(next)) return;
    stopColourDemo();
    const brightness = Math.round(Math.max(0, Math.min(100, next)));
    setLightSettings((current) => ({ ...current, ...(frame ? { customColour: frame.hex, lightOn: frame.lightOn } : {}), brightness }));
  }, [stopColourDemo]);
  const setLightOn = useCallback((value) => {
    const frame = demoIndexRef.current === null ? null : ARDUINO_DEMO_FRAMES[demoIndexRef.current];
    const next = Boolean(typeof value === 'function' ? value(frame ? frame.lightOn : lightSettingsRef.current.lightOn) : value);
    stopColourDemo();
    setLightSettings((current) => ({ ...current, ...(frame ? { customColour: frame.hex, brightness: 100 } : {}), lightOn: next }));
  }, [stopColourDemo]);
  const startColourDemo = useCallback((owner = null) => {
    if (preferencesRef.current.quietMode || !motionAllowed()) return false;
    demoIndexRef.current = 0;
    demoOwnerRef.current = owner;
    setDemoIndex(0);
    return true;
  }, []);
  const setVibrationEnabled = useCallback((value) => setPreferences((current) => {
    const next = Boolean(typeof value === 'function' ? value(current.vibrationEnabled) : value);
    return next === current.vibrationEnabled ? current : { ...current, vibrationEnabled: next };
  }), []);
  const setQuietMode = useCallback((value) => setPreferences((current) => {
    const next = Boolean(typeof value === 'function' ? value(current.quietMode) : value);
    return next === current.quietMode ? current : { ...current, quietMode: next };
  }), []);

  const triggerFeedback = useCallback((type = 'submitted', message) => {
    const current = preferencesRef.current;
    const next = { id: ++feedbackId.current, type, message: message || FEEDBACK_MESSAGES[type] || FEEDBACK_MESSAGES.submitted, simulatedVibration: current.vibrationEnabled && !current.quietMode };
    // 不调用 navigator.vibrate；振动仅在屏幕演示。独立 Wi-Fi 会话记录请求回执，不实测发光。
    clearTimeout(feedbackTimer.current);
    setFeedback(next);
    feedbackTimer.current = setTimeout(() => setFeedback((latest) => latest?.id === next.id ? null : latest), 3200);
    return next;
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)); } catch { /* 隐私模式下保留当前会话偏好即可。 */ }
  }, [preferences]);
  useEffect(() => {
    // 轮播使用独立临时帧，不每秒覆盖用户偏好或写入本地存储。
    try { window.localStorage.setItem(LIGHT_STORAGE_KEY, JSON.stringify(lightSettings)); } catch { /* 本地存储不可用时仍保留本次会话的调色。 */ }
  }, [lightSettings]);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReducedMotion(media.matches); if (media.matches) stopColourDemo(); };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [stopColourDemo]);
  const demoRunning = demoIndex !== null;
  useEffect(() => {
    if (!demoRunning) return undefined;
    if (preferences.quietMode || reducedMotion || !motionAllowed()) { stopColourDemo(); return undefined; }
    demoTimer.current = setInterval(() => setDemoIndex((current) => current === null ? null : (current + 1) % ARDUINO_DEMO_FRAMES.length), 1000);
    return () => clearInterval(demoTimer.current);
  }, [demoRunning, preferences.quietMode, reducedMotion, stopColourDemo]);
  useEffect(() => () => clearTimeout(feedbackTimer.current), []);

  const tone = getTone(state);
  const demoFrame = demoRunning ? ARDUINO_DEMO_FRAMES[demoIndex] : null;
  const custom = demoFrame?.hex || lightSettings.customColour;
  const palette = useMemo(() => custom ? deriveLightPalette(custom) : PALETTE[tone], [custom, tone]);
  const brightness = demoFrame ? 100 : lightSettings.brightness;
  const lightOn = demoFrame ? demoFrame.lightOn : lightSettings.lightOn;
  const activeColour = custom || palette.light;
  const lightOutput = getLightOutput(activeColour, brightness, lightOn);
  const lightActive = Math.max(lightOutput.r, lightOutput.g, lightOutput.b) > 0;
  const isFeelingColour = state.feelingChosen && !['idle', 'scanning'].includes(state.signal);
  const displayMode = custom ? 'custom' : isFeelingColour ? 'feeling' : 'ambient';
  const colourLabel = demoFrame ? `Arduino sequence · ${demoFrame.label}` : custom ? palette.name : isFeelingColour ? `${state.feeling} · ${palette.name}` : palette.name;
  const lightLabel = !lightOn ? `Light off · ${colourLabel}` : !lightActive ? `No light output · ${colourLabel}` : `${colourLabel}${brightness < 100 ? ` · ${brightness}%` : ''}`;
  const wifiConnected = wifiSessionReady && ['connected', 'sending'].includes(wifiConnection.status);
  lightCommandRef.current = { colour: activeColour, brightness, lightOn };
  // 连续拖动交给传输层节流、串行和合并；失败或断开后不再自动发送，保留屏幕模拟。
  useEffect(() => {
    if (['connecting', 'connected', 'sending'].includes(wifiConnection.status)) wifiControllerRef.current?.setLight({ colour: activeColour, brightness, lightOn });
  }, [activeColour, brightness, lightOn, wifiConnected, wifiConnection.status]);

  const value = useMemo(() => ({
    mode: state.mode, feeling: state.feeling, signal: state.signal, feelingChosen: state.feelingChosen,
    setMode, setFeeling, setSignal, ...preferences, setVibrationEnabled, setQuietMode,
    feedbackPreferences: preferences, feedback, triggerFeedback,
    customColour: lightSettings.customColour, setCustomColour, brightness, setBrightness, lightOn, setLightOn,
    activeColour, lightLabel, displayMode, lightOutput, lightActive, reducedMotion,
    demoRunning, demoStep: demoFrame ? { index: demoIndex, ...demoFrame } : null, startColourDemo, stopColourDemo,
    wifiEndpoint, setWifiEndpoint, wifiConnection, wifiConnected, connectBoard, disconnectBoard,
  }), [state, setMode, setFeeling, setSignal, preferences, setVibrationEnabled, setQuietMode, feedback, triggerFeedback, lightSettings.customColour, setCustomColour, brightness, setBrightness, lightOn, setLightOn, activeColour, lightLabel, displayMode, lightOutput.r, lightOutput.g, lightOutput.b, lightOutput.hex, lightActive, reducedMotion, demoRunning, demoIndex, demoFrame, startColourDemo, stopColourDemo, wifiEndpoint, wifiConnection, wifiConnected, connectBoard, disconnectBoard]);

  return <WristbandContext.Provider value={{ ...value, tone, palette }}>
    <div className="echo-experience" data-echo-tone={custom ? 'custom' : tone} data-echo-signal={state.signal} data-echo-mode={state.mode} data-echo-quiet={preferences.quietMode ? 'true' : 'false'} data-echo-vibration={preferences.vibrationEnabled ? 'true' : 'false'} data-echo-custom={custom ? 'true' : 'false'} data-echo-brightness={brightness} data-echo-light-on={lightOn ? 'true' : 'false'} data-echo-light-active={lightActive ? 'true' : 'false'} data-echo-demo={demoRunning ? 'running' : 'stopped'} data-echo-wifi-status={wifiConnection.status} data-echo-wifi-linked={wifiConnected ? 'true' : 'false'} style={{
      '--echo-color': palette.color, '--echo-led': lightOutput.hex, '--echo-soft': palette.soft, '--echo-ink': palette.ink, '--echo-rgb': palette.rgb,
      '--echo-led-rgb': `${lightOutput.r}, ${lightOutput.g}, ${lightOutput.b}`, '--echo-light-intensity': Math.max(lightOutput.r, lightOutput.g, lightOutput.b) / 255,
    }}>{children}<span className="wb-announcement" role="status" aria-live="polite" aria-atomic="true">{feedback?.message || ''}</span></div>
  </WristbandContext.Provider>;
}

export function useWristband() {
  const context = useContext(WristbandContext);
  if (!context) throw new Error('useWristband must be used inside WristbandProvider.');
  const { tone, palette, ...api } = context;
  return api;
}

function useWristbandPresentation() {
  const context = useContext(WristbandContext);
  if (!context) throw new Error('Wristband components must be used inside WristbandProvider.');
  const palette = context.palette;
  const signal = SIGNALS[context.signal];
  const isTeamSync = context.mode === 'team' && context.signal === 'connected' && !context.feelingChosen && context.displayMode !== 'custom';
  const controlled = context.displayMode === 'custom' || !context.lightOn || !context.lightActive;
  const description = context.wifiConnected ? context.wifiConnection.lastApplied?.verification === 'state-confirmed' ? 'The board reports its last colour state. The wristband image remains a visual preview; emitted light is not measured.' : 'The board acknowledged the colour request with OK/OFF. The wristband image remains a visual preview; emitted light is not verified.' : context.wifiConnection.status === 'error' ? 'The Wi-Fi link has stopped. Colours remain available as a screen preview. Reconnect from the colour studio to send again.' : controlled ? 'This light is previewed on screen. Manual colour changes turn the preview on and stop the sequence.' : isTeamSync ? 'Lavender connects your group. Choose a feeling to make the light your own.' : signal.description;
  return { ...context, palette, label: controlled ? context.lightLabel : isTeamSync ? 'Together in light' : signal.label, description };
}

export function WristbandPreview({ large = false, interactive = large }) {
  const { palette, signal, label, feedback, quietMode, vibrationEnabled, lightLabel, lightActive, wifiConnected } = useWristbandPresentation();
  const [acknowledgement, setAcknowledgement] = useState(0);
  const [hapticFeedback, setHapticFeedback] = useState(0);
  const acknowledgementSequence = useRef(0);
  const acknowledgementTimer = useRef(null);
  const hapticTimer = useRef(null);
  const previousSignal = useRef(null);
  const previousFeedbackId = useRef(0);
  useEffect(() => {
    const newFeedback = feedback?.id && feedback.id !== previousFeedbackId.current;
    const newAcknowledgement = newFeedback && ['submitted', 'saved', 'preview'].includes(feedback.type);
    const animate = !quietMode && lightActive && motionAllowed();
    if (!animate) { clearTimeout(acknowledgementTimer.current); setAcknowledgement(0); }
    else if (newAcknowledgement || (signal === 'saved' && previousSignal.current !== 'saved')) {
      clearTimeout(acknowledgementTimer.current);
      const id = ++acknowledgementSequence.current;
      setAcknowledgement(id);
      acknowledgementTimer.current = setTimeout(() => setAcknowledgement((current) => current === id ? 0 : current), 1600);
    }
    if (!animate || !vibrationEnabled) { clearTimeout(hapticTimer.current); setHapticFeedback(0); }
    else if (newFeedback && feedback.simulatedVibration) {
      clearTimeout(hapticTimer.current);
      setHapticFeedback(feedback.id);
      hapticTimer.current = setTimeout(() => setHapticFeedback(0), 500);
    }
    previousSignal.current = signal;
    if (feedback?.id) previousFeedbackId.current = feedback.id;
    // 每次完成只播放一次并移除；取消静音不会重播已经结束的成功提示。
  }, [signal, feedback?.id, feedback?.type, feedback?.simulatedVibration, quietMode, vibrationEnabled, lightActive]);
  useEffect(() => () => { clearTimeout(acknowledgementTimer.current); clearTimeout(hapticTimer.current); }, []);
  return <div className={`wb-preview-group${large ? ' wb-preview-group-large' : ''}`}>
    <div className={`wb-preview${large ? ' wb-preview-large' : ''}`} data-signal={signal} role="img" aria-label={`Wristband visual preview. ${palette.name}. ${label}. ${wifiConnected ? 'Board linked over Wi-Fi.' : 'Preview only. No board connection.'}`}>
      <div className="wb-preview-halo" aria-hidden="true" />
      {acknowledgement > 0 && <span key={acknowledgement} className="wb-feedback-wave" onAnimationEnd={() => setAcknowledgement(0)} aria-hidden="true" />}
      <div className="wb-band-motion" data-haptic={hapticFeedback ? 'true' : 'false'} key={`haptic-${hapticFeedback}`} onAnimationEnd={(event) => { if (event.target === event.currentTarget) setHapticFeedback(0); }} aria-hidden="true"><WristbandModel /></div>
      <span className="wb-preview-colour" aria-hidden="true"><i />{lightLabel}</span>
    </div>
    {interactive && <WristbandFeelingRail compact={large} />}
  </div>;
}

function motionAllowed() {
  return typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// 原生横向滚动负责触屏惯性与竖向手势分流；鼠标拖动只在明确横移后接管。
export function WristbandFeelingRail({ compact = false }) {
  const { feeling, feelingChosen, setFeeling, setSignal, quietMode, displayMode } = useWristband();
  const feelingSelected = feelingChosen && displayMode === 'feeling';
  const selectedIndex = Math.max(0, FEELINGS.findIndex((item) => item.label === feeling));
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const dragRef = useRef(null);
  const settleTimer = useRef(null);
  const programmaticTimer = useRef(null);
  const programmaticScroll = useRef(false);
  const positioned = useRef(false);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const headingId = useId();
  const instructionId = useId();

  const selectIndex = useCallback((index) => {
    const item = FEELINGS[Math.max(0, Math.min(FEELINGS.length - 1, index))];
    setFeeling(item.label);
    setSignal('connected');
  }, [setFeeling, setSignal]);

  const nearestIndex = () => {
    const track = trackRef.current;
    if (!track) return selectedIndex;
    const origin = cardRefs.current[0]?.offsetLeft || 0;
    return cardRefs.current.reduce((closest, card, index) => Math.abs(card.offsetLeft - origin - track.scrollLeft) < Math.abs(cardRefs.current[closest].offsetLeft - origin - track.scrollLeft) ? index : closest, 0);
  };

  const positionCard = useCallback((index, immediate = false) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    const left = card.offsetLeft - (cardRefs.current[0]?.offsetLeft || 0);
    if (Math.abs(track.scrollLeft - left) < 1) return;
    programmaticScroll.current = true;
    clearTimeout(programmaticTimer.current);
    track.scrollTo({ left, behavior: !immediate && !quietMode && motionAllowed() ? 'smooth' : 'auto' });
    programmaticTimer.current = setTimeout(() => { programmaticScroll.current = false; }, 650);
  }, [quietMode]);

  useLayoutEffect(() => {
    positionCard(selectedIndex, !positioned.current);
    positioned.current = true;
  }, [selectedIndex, positionCard]);
  useEffect(() => {
    let width = trackRef.current?.clientWidth;
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      const nextWidth = trackRef.current?.clientWidth;
      if (nextWidth !== width) { width = nextWidth; positionCard(selectedIndex, true); }
    });
    if (trackRef.current) observer?.observe(trackRef.current);
    return () => observer?.disconnect();
  }, [selectedIndex, positionCard]);
  useEffect(() => () => { clearTimeout(settleTimer.current); clearTimeout(programmaticTimer.current); }, []);

  const interruptScroll = () => {
    // 正在平滑翻页时，先停在当前可见位置，再让用户的真实手势接管。
    if (programmaticScroll.current && trackRef.current) trackRef.current.scrollTo({ left: trackRef.current.scrollLeft, behavior: 'auto' });
    programmaticScroll.current = false;
    clearTimeout(programmaticTimer.current);
    clearTimeout(settleTimer.current);
  };
  const finishDrag = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    setDragging(false);
    clearTimeout(settleTimer.current);
    if (drag.moved) {
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      let next = nearestIndex();
      const distance = event.currentTarget.scrollLeft - drag.left;
      // 鼠标拖过约五分之一张卡片即可翻页，轻拖也能获得明确反馈。
      if (next === drag.index && Math.abs(distance) > Math.min(48, event.currentTarget.clientWidth * .18)) next = Math.max(0, Math.min(FEELINGS.length - 1, drag.index + Math.sign(distance)));
      selectIndex(next);
      positionCard(next);
    }
  };

  return <section className={`wb-feeling-rail${compact ? ' wb-feeling-rail-compact' : ''}`} aria-labelledby={headingId} aria-roledescription="carousel">
    <div className="wb-rail-heading"><h3 id={headingId}>Find your colour</h3><span>{String(selectedIndex + 1).padStart(2, '0')} / 04</span></div>
    <div className={`wb-rail-track${dragging ? ' is-dragging' : ''}`} ref={trackRef} tabIndex={0} role="group" aria-label={`Wristband feeling colours. ${feeling}. ${PALETTE[FEELINGS[selectedIndex].tone].name}.`} aria-describedby={instructionId}
      onKeyDown={(event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
        selectIndex(event.key === 'Home' ? 0 : event.key === 'End' ? FEELINGS.length - 1 : selectedIndex + (event.key === 'ArrowRight' ? 1 : -1));
      }}
      onPointerDown={(event) => {
        interruptScroll();
        suppressClick.current = false;
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        dragRef.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, index: nearestIndex(), moved: false };
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (!drag) return;
        if (!event.buttons) { dragRef.current = null; setDragging(false); return; }
        const delta = event.clientX - drag.x;
        if (!drag.moved && (Math.abs(delta) < 6 || Math.abs(delta) < Math.abs(event.clientY - drag.y))) return;
        if (!drag.moved) { drag.moved = true; suppressClick.current = true; setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); }
        event.preventDefault();
        event.currentTarget.scrollLeft = drag.left - delta;
      }}
      onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={finishDrag} onPointerLeave={() => { if (dragRef.current && !dragRef.current.moved) dragRef.current = null; }} onWheel={interruptScroll}
      onClickCapture={(event) => { if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
      onScroll={() => {
        clearTimeout(settleTimer.current);
        if (programmaticScroll.current || dragRef.current?.moved) return;
        settleTimer.current = setTimeout(() => { if (!programmaticScroll.current && !dragRef.current?.moved) selectIndex(nearestIndex()); }, 180);
      }}>
      {FEELINGS.map((item, index) => <button key={item.label} type="button" className="wb-colour-card" ref={(node) => { cardRefs.current[index] = node; }} tabIndex={index === selectedIndex ? 0 : -1} aria-pressed={feelingSelected && index === selectedIndex} aria-label={`${item.label}. ${PALETTE[item.tone].name}. ${item.description}.`} style={{ '--wb-card-colour': PALETTE[item.tone].color, '--wb-card-soft': PALETTE[item.tone].soft, '--wb-card-ink': PALETTE[item.tone].ink }} onClick={() => selectIndex(index)}>
        <span className="wb-colour-orb" aria-hidden="true" /><span className="wb-colour-card-copy"><strong>{item.label}</strong><span>{PALETTE[item.tone].name}</span><small>{item.description}</small></span><span className="wb-colour-card-check" aria-hidden="true">{feelingSelected && index === selectedIndex ? '✓' : '+'}</span>
      </button>)}
    </div>
    <div className="wb-rail-controls"><button className="wb-rail-arrow" type="button" onClick={() => selectIndex(selectedIndex - 1)} disabled={selectedIndex === 0} aria-label="Previous feeling colour"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m9 4-4 4 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg></button><div className="wb-rail-dots" role="group" aria-label="Choose a feeling colour">{FEELINGS.map((item, index) => <button key={item.label} type="button" className="wb-rail-dot" onClick={() => selectIndex(index)} aria-label={item.label} aria-pressed={feelingSelected && index === selectedIndex} data-current={index === selectedIndex ? 'true' : 'false'} style={{ '--wb-dot-colour': PALETTE[item.tone].color }}><span /></button>)}</div><button className="wb-rail-arrow" type="button" onClick={() => selectIndex(selectedIndex + 1)} disabled={selectedIndex === FEELINGS.length - 1} aria-label="Next feeling colour"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg></button></div>
    <p className="wb-rail-instruction" id={instructionId}>Swipe or drag to change your light · ← → keys</p>
  </section>;
}

function WristbandFeedbackPreferences() {
  const { vibrationEnabled, setVibrationEnabled, quietMode, setQuietMode, triggerFeedback } = useWristband();
  return <section className="wb-preferences" aria-label="Wristband feedback preferences"><div className="wb-preferences-heading"><h3>A quieter visit</h3><span>Saved on this device</span></div><div className="wb-preference-row"><div><strong>Vibration preview</strong><p>{quietMode ? 'Muted while quiet mode is on' : 'A gentle on-screen acknowledgement'}</p></div><button type="button" role="switch" className="wb-preference-switch" aria-label="Vibration preview" aria-checked={vibrationEnabled} onClick={() => setVibrationEnabled((current) => !current)}><span /></button></div><div className="wb-preference-row"><div><strong>Quiet mode</strong><p>Steady light. Muted vibration preview.</p></div><button type="button" role="switch" className="wb-preference-switch" aria-label="Quiet mode" aria-checked={quietMode} onClick={() => setQuietMode((current) => !current)}><span /></button></div><button className="wb-feedback-test" type="button" onClick={() => triggerFeedback('preview', quietMode ? 'Quiet mode is on. Your light stays steady.' : 'Feedback preview. A gentle pulse in your chosen colour.')}><span aria-hidden="true">⌁</span>Try feedback preview</button></section>;
}

export function WristbandStatus({ compact = false, onOpenStudio }) {
  const { signal, palette, label, description, feedback, wifiConnected, wifiConnection } = useWristbandPresentation();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState({});
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const panelId = useId();
  const titleId = useId();

  useLayoutEffect(() => {
    if (!open || !containerRef.current) return undefined;
    const container = containerRef.current;
    const phone = container.closest('.phone');
    const updatePlacement = () => {
      const anchor = container.getBoundingClientRect();
      const boundary = phone?.getBoundingClientRect() || { left: 0, right: window.innerWidth, bottom: window.innerHeight };
      const leftEdge = Math.max(12, boundary.left + 16);
      const rightEdge = Math.min(window.innerWidth - 12, boundary.right - 16);
      const width = Math.min(320, Math.max(0, rightEdge - leftEdge));
      // Header 中间的按钮同样可以展开；浮层始终落在手机容器留白之内。
      const left = Math.max(leftEdge, Math.min(anchor.right - width, rightEdge - width)) - anchor.left;
      const viewportBoundary = container.closest('.route-viewport')?.getBoundingClientRect();
      const maxHeight = Math.max(180, Math.min(viewportBoundary?.bottom || boundary.bottom, window.innerHeight) - anchor.bottom - 24);
      const nextPlacement = { '--wb-popover-width': `${width}px`, '--wb-popover-left': `${left}px`, '--wb-popover-max-height': `${maxHeight}px` };
      setPlacement((current) => Object.keys(nextPlacement).every((key) => current[key] === nextPlacement[key]) ? current : nextPlacement);
    };
    updatePlacement();
    window.addEventListener('resize', updatePlacement);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updatePlacement);
    if (phone) observer?.observe(phone);
    observer?.observe(container);
    return () => { window.removeEventListener('resize', updatePlacement); observer?.disconnect(); };
  }, [open]);

  // Popover 可通过键盘、外部点击关闭；主动关闭时将焦点送回触发按钮。
  useEffect(() => {
    if (!open) return undefined;
    const firstControl = popoverRef.current?.querySelector('button');
    firstControl?.focus({ preventScroll: true });
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const close = () => { setOpen(false); triggerRef.current?.focus({ preventScroll: true }); };

  return <div className={`wb-status${compact ? ' wb-status-compact' : ''}`} ref={containerRef} onBlur={(event) => {
    // 焦点自然离开控件后关闭，不限制页面其余内容的键盘访问。
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <button className="wb-status-trigger" type="button" ref={triggerRef} aria-expanded={open} aria-controls={panelId} aria-label={`Wristband preview: ${palette.name}. ${label}.`} onClick={() => setOpen((current) => !current)}>
      <span className="wb-status-light" data-signal={signal} aria-hidden="true" />
      <span className="wb-status-text">{compact ? 'Wristband' : 'Wristband preview'}</span>
      <svg className="wb-status-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    {open && <section className="wb-popover" id={panelId} ref={popoverRef} aria-labelledby={titleId} style={placement}>
      <div className="wb-popover-heading"><div><p className="wb-eyebrow">YOUR VISIT, IN LIGHT</p><h2 id={titleId}>Wristband preview</h2></div><button type="button" className="wb-close" onClick={close} aria-label="Close wristband preview"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg></button></div>
      <WristbandPreview />
      <div className="wb-light-caption" aria-live="polite" aria-atomic="true"><span className="wb-caption-dot" aria-hidden="true" /><div><strong>{palette.name}</strong><span>{label}</span></div></div>
      <p className="wb-signal-description">{feedback?.message || description}</p>
      {onOpenStudio && <button type="button" className="wb-open-studio" onClick={() => { setOpen(false); onOpenStudio(); }}><span><strong>Open colour studio</strong><small>Choose any light colour and brightness</small></span><span aria-hidden="true">↗</span></button>}
      <WristbandFeelingRail />
      <WristbandFeedbackPreferences />
      <p className="wb-prototype-note"><span aria-hidden="true">◌</span>{wifiConnected ? 'Board linked · Wi-Fi colour control' : wifiConnection.status === 'error' ? 'Preview only · Wi-Fi link stopped' : 'Preview only · no board connection'}</p>
      <p className="wb-hardware-note">{wifiConnected ? <>Nano ESP32 is linked over Wi-Fi.<br />Colour requests are sent to the board. Vibration stays a screen preview.</> : <>Connect your Nano ESP32 from the colour studio.<br />Until then, light and vibration remain screen previews.</>}</p>
    </section>}
  </div>;
}
