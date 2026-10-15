import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';
import './wristband.css';

// 手环、页面光晕与交互反馈共用同一色板，避免不同页面各自维护颜色。
const PALETTE = {
  amber: { name: 'Warm amber', color: '#bb9364', soft: '#f2e7d4', ink: '#775734', rgb: '187, 147, 100' },
  blue: { name: 'Quiet blue', color: '#7a9ab0', soft: '#e3edf2', ink: '#476a83', rgb: '122, 154, 176' },
  lavender: { name: 'Soft lavender', color: '#a394bd', soft: '#eae4f1', ink: '#6d5b87', rgb: '163, 148, 189' },
  peach: { name: 'Warm peach', color: '#c8957e', soft: '#f2e2d9', ink: '#855a47', rgb: '200, 149, 126' },
  sage: { name: 'Gentle sage', color: '#91a38a', soft: '#e4eadf', ink: '#5c7456', rgb: '145, 163, 138' },
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
  saved: { label: 'Echo ready', description: 'A soft sage glow marks the completion of this step.' },
};

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
  // 扫描与保存是短暂的系统反馈；连接后恢复当前表达的颜色。
  if (signal === 'scanning') return 'blue';
  if (signal === 'saved') return 'sage';
  if (signal === 'idle') return 'amber';
  if (mode === 'team' && !feelingChosen) return 'lavender';
  return FEELINGS.find((item) => item.label === feeling)?.tone || 'amber';
}

export function WristbandProvider({ children }) {
  const [state, dispatch] = useReducer(wristbandReducer, initialState);
  const setMode = useCallback((value) => dispatch({ type: 'mode', value }), []);
  const setFeeling = useCallback((value) => dispatch({ type: 'feeling', value }), []);
  const setSignal = useCallback((value) => dispatch({ type: 'signal', value }), []);
  const value = useMemo(() => ({ mode: state.mode, feeling: state.feeling, signal: state.signal, setMode, setFeeling, setSignal }), [state.mode, state.feeling, state.signal, setMode, setFeeling, setSignal]);
  const tone = getTone(state);
  const palette = PALETTE[tone];

  return <WristbandContext.Provider value={{ ...value, tone, feelingChosen: state.feelingChosen }}>
    <div className="echo-experience" data-echo-tone={tone} data-echo-signal={state.signal} data-echo-mode={state.mode} style={{
      '--echo-color': palette.color, '--echo-soft': palette.soft, '--echo-ink': palette.ink, '--echo-rgb': palette.rgb,
    }}>{children}</div>
  </WristbandContext.Provider>;
}

export function useWristband() {
  const context = useContext(WristbandContext);
  if (!context) throw new Error('useWristband must be used inside WristbandProvider.');
  const { mode, setMode, feeling, setFeeling, signal, setSignal } = context;
  return { mode, setMode, feeling, setFeeling, signal, setSignal, feelingChosen: context.feelingChosen };
}

function useWristbandPresentation() {
  const context = useContext(WristbandContext);
  if (!context) throw new Error('Wristband components must be used inside WristbandProvider.');
  const palette = PALETTE[context.tone];
  const signal = SIGNALS[context.signal];
  const isTeamSync = context.mode === 'team' && context.signal === 'connected' && !context.feelingChosen;
  return { ...context, palette, label: isTeamSync ? 'Together in light' : signal.label, description: isTeamSync ? 'Lavender connects your group. Choose a feeling to make the light your own.' : signal.description };
}

export function WristbandPreview({ large = false }) {
  const { palette, signal, label } = useWristbandPresentation();

  return <div className={`wb-preview${large ? ' wb-preview-large' : ''}`} data-signal={signal} role="img" aria-label={`Wristband preview. ${palette.name}. ${label}. Prototype light simulation.`}>
    <div className="wb-preview-halo" aria-hidden="true" />
    <div className="wb-preview-ground" aria-hidden="true" />
    <div className="wb-band" aria-hidden="true">
      <div className="wb-band-edge" />
      <span className="wb-band-mark">echoes</span>
      <span className="wb-led"><span /></span>
    </div>
  </div>;
}

export function WristbandStatus({ compact = false }) {
  const { feeling, setFeeling, setSignal, signal, palette, label, description } = useWristbandPresentation();
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
      const maxHeight = Math.max(180, Math.min(boundary.bottom, window.innerHeight) - anchor.bottom - 24);
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
      <p className="wb-signal-description">{description}</p>
      <fieldset className="wb-feelings"><legend>How does the art make you feel?</legend><div className="wb-feeling-grid">{FEELINGS.map((item) => <button className="wb-feeling" type="button" key={item.label} aria-pressed={feeling === item.label} title={item.description} style={{ '--wb-swatch': PALETTE[item.tone].color }} onClick={() => {
        // 感觉选择立即同步页面色调和灯光，不触发页面跳转。
        setFeeling(item.label);
        setSignal('connected');
      }}><span className="wb-feeling-swatch" aria-hidden="true" /><span>{item.label}</span><span className="wb-feeling-check" aria-hidden="true">{feeling === item.label ? '✓' : ''}</span></button>)}</div></fieldset>
      <p className="wb-prototype-note"><span aria-hidden="true">◌</span> Prototype · light simulation</p>
      <p className="wb-hardware-note">This preview does not connect to a physical wristband.</p>
    </section>}
  </div>;
}
