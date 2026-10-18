import { useEffect, useId, useRef, useState } from 'react';
import { ARDUINO_DEMO_FRAMES, hexToHsv, hsvToHex, normalizeHex } from './device-colour.mjs';
import { WIFI_SSID, WIFI_PASSWORD, normalizeDeviceUrl } from './wifi-light.mjs';
import { useWristband, WristbandPreview } from './Wristband';
import { isDeviceHosted, isOnlineHosted } from './device-runtime.mjs';
import { makeDeviceHandoffUrl } from './light-handoff.mjs';
import './wristband-colour-studio.css';

const COMMON_COLOURS = [
  ['Soft blue', '#91bdd8'], ['Lavender', '#c1abe5'], ['Peach', '#e8af90'], ['Sage', '#b0c9a1'],
  ['Red', '#ff0000'], ['Green', '#00ff00'], ['White', '#ffffff'], ['Black', '#000000'],
];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// 在线看展始终独立可用；只有用户主动点链接才导航到手环，不在 HTTPS 页面请求私网。
function OnlineLightHandoff({ colour, brightness, lightOn, onReturnToGallery }) {
  const [expanded, setExpanded] = useState(false);
  const ids = useId();
  const href = makeDeviceHandoffUrl({ colour, brightness, lightOn });
  return <section className="wb-online-handoff" data-light-control="online-preview" aria-labelledby={`${ids}-title`}>
    <div className="wb-handoff-heading"><p>OPTIONAL · YOUR WRISTBAND</p><span>Preview only</span></div>
    <h3 id={`${ids}-title`}>Bring your colour<br />to light.</h3>
    <p className="wb-handoff-intro">Your gallery visit is ready. Connect a wristband whenever you like.</p>
    <div className="wb-handoff-choice"><span style={{backgroundColor:colour}} aria-hidden="true" /><div><strong>{colour.toUpperCase()}</strong><small>{brightness}% brightness · {lightOn ? 'light on' : 'light off'} in preview</small></div></div>
    <button type="button" className="wb-handoff-stage" aria-expanded={expanded} aria-controls={`${ids}-steps`} onClick={() => setExpanded(current => !current)}>{expanded ? 'Hide connection steps' : 'Connect a wristband'}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
    <div className="wb-handoff-steps" id={`${ids}-steps`} hidden={!expanded}>
      <ol><li><strong>Choose your colour above.</strong><p>Your colour, brightness and light power travel with you.</p></li><li><strong>Join {WIFI_SSID} Wi-Fi.</strong><p>Open your phone's Wi-Fi settings. No password is needed. Keep this gallery tab open.</p></li><li><strong>Open wristband controls.</strong><p>The controls open in another tab. Use your existing light controls there, then switch back to Gallery Echoes.</p></li></ol>
      <a className="wb-handoff-link" href={href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">Open wristband controls<span aria-hidden="true">↗</span></a>
      <div className="wb-handoff-return">
        <strong>画廊会留在这里，随时继续。</strong>
        <p>变色完成后，关闭控灯标签页，或点击浏览器的标签页按钮，切回 <b>Gallery Echoes</b>。</p>
        <button type="button" onClick={onReturnToGallery}><span aria-hidden="true">←</span>返回画廊 · 继续参观</button>
        <small>需要加载新的线上内容时，请恢复手机流量或普通 Wi-Fi。</small>
      </div>
    </div>
  </section>;
}

// 连接只由明确点击触发；区分原程序的 OK/OFF 请求回执与增强状态确认，均不等于实测灯光。
function WifiLightConnection({ onReturnToGallery }) {
  const onDevice = isDeviceHosted();
  const onOnline = isOnlineHosted();
  const { wifiEndpoint, setWifiEndpoint, wifiConnection, wifiConnected, connectBoard, disconnectBoard, activeColour, brightness, lightOn } = useWristband();
  const [addressError, setAddressError] = useState('');
  const [connectionError, setConnectionError] = useState('');
  const ids = useId();
  // 所有 hooks 均在分支前调用；在线入口只呈现显式导航卡，不进入连接表单。
  if (onOnline) return <OnlineLightHandoff colour={activeColour} brightness={brightness} lightOn={lightOn} onReturnToGallery={onReturnToGallery} />;
  const connecting = wifiConnection.status === 'connecting' || (['sending', 'connected'].includes(wifiConnection.status) && !wifiConnected);
  const stateLabel = wifiConnected ? wifiConnection.status === 'sending' ? 'Sending…' : 'Connected' : connecting ? 'Connecting…' : wifiConnection.status === 'error' ? 'Connection stopped' : 'Disconnected';
  const last = wifiConnection.lastApplied;
  const stateConfirmed = last?.verification === 'state-confirmed';
  const acknowledgementLabel = stateConfirmed ? 'Last confirmed' : 'Last acknowledged request';
  const confirmedHex = last ? '#' + [last.output.r,last.output.g,last.output.b].map(value => value.toString(16).padStart(2,'0')).join('').toUpperCase() : '';
  const confirmedTime = last ? new Date(last.at) : null;
  const error = wifiConnection.error || connectionError;
  const message = wifiConnected ? stateConfirmed ? 'Board linked. Firmware state confirms the last command; colour changes send automatically.' : 'Board linked. Colour requests receive OK/OFF replies. Physical light output is not verified.' : connecting ? 'Waiting for the board. Your screen preview stays available.' : wifiConnection.status === 'error' ? 'Preview only. Sending has stopped. Reconnect to try again.' : last ? 'Preview only. Disconnected; sending has stopped.' : 'Preview only. Join the board Wi-Fi, then connect when its compatible firmware is ready.';
  const connect = async event => {
    event.preventDefault();
    if (connecting || wifiConnected) return;
    let endpoint;
    try { endpoint = normalizeDeviceUrl(wifiEndpoint); }
    catch (reason) { setAddressError(reason.message); return; }
    setAddressError(''); setConnectionError('');
    try { await connectBoard(endpoint); }
    catch (reason) { setConnectionError(reason.message || 'The board did not respond. Check its Wi-Fi and reconnect.'); }
  };
  const disconnect = () => { setConnectionError(''); setAddressError(''); disconnectBoard(); };
  return <section className={'wb-wifi-connection' + (onDevice ? ' wb-wifi-on-device' : '')} data-connection-status={wifiConnection.status} aria-labelledby={`${ids}-title`}>
    <div className="wb-wifi-heading"><div><p>ARDUINO NANO ESP32</p><h3 id={`${ids}-title`}>Wi-Fi light control</h3></div><span className="wb-wifi-state" data-linked={wifiConnected ? 'true' : 'false'}>{stateLabel}</span></div>
    {!wifiConnected && !onDevice && <div className="wb-wifi-setup"><ol><li>For Go Live access, upload this project's compatible firmware by USB.</li><li>Join <strong>{WIFI_SSID}</strong> in your system Wi-Fi.<br />{WIFI_PASSWORD ? <>Password: <code>{WIFI_PASSWORD}</code></> : <>No password</>}</li></ol><p>This page cannot switch your system Wi-Fi.</p></div>}
    {onDevice && !wifiConnected && <p className="wb-wifi-local-intro">Your wristband, a little closer. Connect once, then choose a colour.</p>}
    <form className="wb-wifi-form" onSubmit={connect}>{!onDevice && <><label htmlFor={`${ids}-address`}>Board address</label><input id={`${ids}-address`} type="text" inputMode="url" autoComplete="off" spellCheck={false} value={wifiEndpoint} disabled={connecting || wifiConnected} aria-invalid={!!addressError} aria-describedby={`${ids}-address-help${addressError ? ` ${ids}-address-error` : ''}`} onChange={event => { setWifiEndpoint(event.target.value); setAddressError(''); setConnectionError(''); }} /><p id={`${ids}-address-help`}>Local HTTP address · default 192.168.4.1</p></>}{addressError && <p className="wb-studio-error" id={`${ids}-address-error`} role="alert">{addressError}</p>}{wifiConnected || connecting ? <button type="button" className="wb-wifi-disconnect" onClick={disconnect}>{connecting ? 'Cancel connection' : 'Disconnect'}</button> : <button type="submit" className="wb-wifi-connect">{wifiConnection.status === 'error' ? 'Reconnect' : onDevice ? 'Connect your light' : 'Connect to board'}<span aria-hidden="true">↗</span></button>}</form>
    <p className="wb-wifi-message" role="status" aria-live="polite">{message}</p>
    {error && <p className="wb-wifi-error" role="alert">{error}</p>}
    <div className="wb-wifi-confirmed" data-verification={last?.verification || 'none'}>{last ? <><span className="wb-wifi-confirmed-swatch" style={{backgroundColor:confirmedHex}} aria-hidden="true" /><div><strong>{onDevice ? 'Colour sent' : acknowledgementLabel} · {confirmedHex}</strong><small><time dateTime={confirmedTime.toISOString()}>{confirmedTime.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'})}</time> · {last.brightness}% requested · {last.lightOn ? 'power requested on' : 'power requested off'}</small>{!onDevice && <><small>Selected {last.colour.toUpperCase()} · {stateConfirmed ? 'firmware state reported' : `request acknowledged: ${last.acknowledgement || (last.lightOn ? 'OK' : 'OFF')}`}</small><small>{stateConfirmed ? 'Reported firmware state; emitted light is not measured.' : 'OK/OFF acknowledges the request, not the measured light output.'}</small></>}</div></> : <p>No colour command has been acknowledged by a board.</p>}</div>
    {onDevice ? <details className="wb-wifi-advanced"><summary>About this connection</summary><p>Keep connected to {WIFI_SSID}. Colours are sent directly to your light. A reply acknowledges the command; emitted light is not measured.</p><p>Device: {wifiEndpoint}. Disconnect stops sending; use Light power to switch off.</p><a href="/controller">Simple light controls ↗</a></details> : <p className="wb-wifi-footnote">Disconnect stops new commands; it does not switch the board off. Screen colours and vibration previews remain available.</p>}
  </section>;
}

export function WristbandColourStudio({ onReturnToGallery } = {}) {
  const onOnline = isOnlineHosted();
  const {
    activeColour, customColour, setCustomColour, brightness, setBrightness, lightOn, setLightOn,
    lightLabel, lightOutput, lightActive, feeling, setFeeling, quietMode, reducedMotion,
    demoRunning, demoStep, startColourDemo, stopColourDemo,
    wifiConnected, wifiConnection,
  } = useWristband();
  const [hsv, setHsv] = useState(() => hexToHsv(activeColour));
  const [hexDraft, setHexDraft] = useState(activeColour.toUpperCase());
  const [hexError, setHexError] = useState('');
  const [dragging, setDragging] = useState(false);
  const hsvRef = useRef(hsv);
  const lastApplied = useRef(activeColour);
  const fieldRef = useRef(null);
  const pointerRef = useRef(null);
  const hexFocused = useRef(false);
  const ids = useId();
  hsvRef.current = hsv;

  useEffect(() => {
    if (activeColour !== lastApplied.current) {
      const next = hexToHsv(activeColour);
      // 灰色/黑色无法从 HEX 反推色相：保留最近色相，避免拖动 Hue 时跳回红色。
      setHsv((current) => ({ ...next, h: next.s === 0 ? current.h : next.h, s: next.v === 0 ? current.s : next.s }));
      lastApplied.current = activeColour;
    }
    if (!hexFocused.current) { setHexDraft(activeColour.toUpperCase()); setHexError(''); }
  }, [activeColour]);

  useEffect(() => () => {
    // 离开调色页面后停止自动轮播，回到用户自己的灯色；手动颜色继续保留。
    stopColourDemo(ids);
  }, [stopColourDemo, ids]);

  const applyHsv = (next) => {
    const bounded = { h: ((next.h % 360) + 360) % 360, s: clamp(next.s, 0, 100), v: clamp(next.v, 0, 100) };
    const hex = hsvToHex(bounded);
    hsvRef.current = bounded;
    setHsv(bounded);
    lastApplied.current = hex;
    setCustomColour(hex);
    setHexError('');
    if (!hexFocused.current) setHexDraft(hex.toUpperCase());
  };

  const applyColour = (value) => {
    const hex = normalizeHex(value);
    if (!hex) return false;
    const next = hexToHsv(hex);
    const current = hsvRef.current;
    const preserved = { ...next, h: next.s === 0 ? current.h : next.h, s: next.v === 0 ? current.s : next.s };
    hsvRef.current = preserved;
    setHsv(preserved);
    lastApplied.current = hex;
    setCustomColour(hex);
    setHexError('');
    return true;
  };

  const commitHex = () => {
    const hex = normalizeHex(hexDraft);
    if (!hex) { setHexError('Enter 3 or 6 hexadecimal digits, for example #91BDD8.'); return; }
    applyColour(hex);
    setHexDraft(hex.toUpperCase());
  };

  const updateFromPointer = (event) => {
    const bounds = fieldRef.current?.getBoundingClientRect();
    if (!bounds || !bounds.width || !bounds.height) return;
    applyHsv({ ...hsvRef.current, s: clamp((event.clientX - bounds.left) / bounds.width * 100, 0, 100), v: clamp(100 - (event.clientY - bounds.top) / bounds.height * 100, 0, 100) });
  };
  const finishPointer = (event) => {
    if (pointerRef.current !== event.pointerId) return;
    pointerRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const cycleBlocked = quietMode || reducedMotion;
  const blockedReason = quietMode ? 'Quiet mode keeps automatic colour changes off. You can still adjust colours by hand.' : reducedMotion ? 'Reduced motion keeps automatic colour changes off. You can still adjust colours by hand.' : '';
  const statusMessage = demoRunning ? `Arduino sequence running. One step each second. ${wifiConnected ? 'Sending colours over Wi-Fi.' : 'Preview only.'}` : !lightOn ? 'Light off in preview. Your chosen colour is kept for next time.' : !lightActive ? 'No light output. Raise brightness or choose a lighter colour.' : `${wifiConnected ? 'Wi-Fi light controls active' : 'Preview only'}. ${brightness}% brightness.`;

  return <div className="wb-colour-studio">
    <section className="wb-studio-preview" aria-label="Device light preview">
      <div className="wb-studio-preview-top"><span><i aria-hidden="true" />{wifiConnected ? 'Board linked' : 'Preview only'}</span><small>{demoRunning ? 'Sequence running' : lightOn && lightActive ? 'Light on' : 'No light output'}</small></div>
      <WristbandPreview interactive={false} />
      <div className="wb-studio-output"><span className="wb-studio-output-swatch" style={{ backgroundColor: lightOutput.hex }} aria-hidden="true" /><div><strong>{lightLabel}</strong><small>RGB {lightOutput.r}, {lightOutput.g}, {lightOutput.b} · {wifiConnected ? wifiConnection.status === 'sending' ? 'sending to board' : 'Wi-Fi controls active' : 'screen preview'}</small></div></div>
    </section>

    {!onOnline && <WifiLightConnection />}

    <section className="wb-studio-palette" aria-labelledby={`${ids}-field-title`}>
      <div className="wb-studio-section-heading"><h3 id={`${ids}-field-title`}>Colour field</h3><code>{activeColour.toUpperCase()}</code></div>
      <div className={`wb-studio-colour-field${dragging ? ' is-dragging' : ''}`} ref={fieldRef} tabIndex={0} role="group" aria-roledescription="two-dimensional colour control" aria-label={`Colour field. Saturation ${Math.round(hsv.s)} percent. Value ${Math.round(hsv.v)} percent.`} aria-describedby={`${ids}-field-help`} style={{ '--wb-studio-hue': hsvToHex({ h: hsv.h, s: 100, v: 100 }) }}
        onPointerDown={(event) => {
          if (pointerRef.current !== null || (event.pointerType === 'mouse' && event.button !== 0)) return;
          event.preventDefault();
          event.currentTarget.focus({ preventScroll: true });
          pointerRef.current = event.pointerId;
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
          updateFromPointer(event);
        }}
        onPointerMove={(event) => { if (pointerRef.current === event.pointerId) { event.preventDefault(); updateFromPointer(event); } }}
        onPointerUp={finishPointer} onPointerCancel={finishPointer} onLostPointerCapture={(event) => { if (pointerRef.current === event.pointerId) { pointerRef.current = null; setDragging(false); } }}
        onKeyDown={(event) => {
          if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const amount = event.shiftKey ? 10 : 1;
          const next = { ...hsvRef.current };
          if (event.key === 'ArrowLeft') next.s -= amount;
          if (event.key === 'ArrowRight') next.s += amount;
          if (event.key === 'ArrowUp') next.v += amount;
          if (event.key === 'ArrowDown') next.v -= amount;
          if (event.key === 'Home') next.s = 0;
          if (event.key === 'End') next.s = 100;
          applyHsv(next);
        }}><span className="wb-studio-field-thumb" style={{ left: `${hsv.s}%`, top: `${100 - hsv.v}%`, backgroundColor: hsvToHex(hsv) }} aria-hidden="true" /></div>
      <p className="wb-studio-help" id={`${ids}-field-help`}>Drag to choose · ← → saturation · ↑ ↓ value · Shift for larger steps</p>

      <label className="wb-studio-range-label" htmlFor={`${ids}-hue`}><span>Hue</span><output>{Math.round(hsv.h)}°</output></label>
      <input className="wb-studio-range wb-studio-hue-range" id={`${ids}-hue`} type="range" min="0" max="359" step="1" value={Math.min(359, Math.round(hsv.h))} aria-valuetext={`${Math.round(hsv.h)} degrees hue`} onChange={(event) => applyHsv({ ...hsvRef.current, h: Number(event.target.value) })} />

      <div className="wb-studio-inputs"><form className="wb-studio-hex-form" onSubmit={(event) => { event.preventDefault(); commitHex(); }}><label htmlFor={`${ids}-hex`}>HEX colour</label><div><input id={`${ids}-hex`} type="text" value={hexDraft} maxLength={7} autoComplete="off" autoCapitalize="characters" spellCheck={false} aria-invalid={!!hexError} aria-describedby={hexError ? `${ids}-hex-error` : undefined} onFocus={() => { hexFocused.current = true; }} onBlur={() => { hexFocused.current = false; commitHex(); }} onChange={(event) => {
        const next = event.target.value;
        setHexDraft(next);
        setHexError('');
        // 第三位不自动扩展，避免打断继续输入六位 HEX；完整六位可实时预览。
        if (/^#?[0-9a-f]{6}$/i.test(next.trim())) applyColour(next);
      }} /><button type="submit" aria-label="Apply HEX colour">↗</button></div></form><label className="wb-studio-native-colour" htmlFor={`${ids}-native`}><span>System picker</span><input id={`${ids}-native`} type="color" value={activeColour} aria-label="Open system colour picker" onChange={(event) => { applyColour(event.target.value); setHexDraft(event.target.value.toUpperCase()); }} /></label></div>
      {hexError && <p className="wb-studio-error" id={`${ids}-hex-error`} role="alert">{hexError}</p>}

      <details className="wb-studio-fine-tune"><summary>Fine-tune saturation and value</summary><div><label className="wb-studio-range-label" htmlFor={`${ids}-saturation`}><span>Saturation</span><output>{Math.round(hsv.s)}%</output></label><input className="wb-studio-range" id={`${ids}-saturation`} type="range" min="0" max="100" value={Math.round(hsv.s)} onChange={(event) => applyHsv({ ...hsvRef.current, s: Number(event.target.value) })} /><label className="wb-studio-range-label" htmlFor={`${ids}-value`}><span>Colour value</span><output>{Math.round(hsv.v)}%</output></label><input className="wb-studio-range" id={`${ids}-value`} type="range" min="0" max="100" value={Math.round(hsv.v)} onChange={(event) => applyHsv({ ...hsvRef.current, v: Number(event.target.value) })} /></div></details>

      <h3 className="wb-studio-subtitle">A few colours to begin</h3><div className="wb-studio-common-colours" role="group" aria-label="Common light colours">{COMMON_COLOURS.map(([name, hex]) => <button type="button" key={hex} aria-label={`${name}. ${hex.toUpperCase()}`} aria-pressed={!demoRunning && customColour === hex} onClick={() => { applyColour(hex); setHexDraft(hex.toUpperCase()); }}><span style={{ backgroundColor: hex }} aria-hidden="true">{!demoRunning && customColour === hex ? '✓' : ''}</span><small>{name}</small></button>)}</div>
    </section>

    <section className="wb-studio-light-controls" aria-label="Light output controls"><div className="wb-studio-power-row"><div><h3>Light power</h3><p>{lightOn ? 'Turn off without losing your colour.' : 'Your colour is kept while the light is off.'}</p></div><button className="wb-preference-switch" type="button" role="switch" aria-label="Light power" aria-checked={lightOn} onClick={() => setLightOn((current) => !current)}><span /></button></div><label className="wb-studio-range-label" htmlFor={`${ids}-brightness`}><span>Brightness</span><output>{brightness}%</output></label><input className="wb-studio-range" id={`${ids}-brightness`} type="range" min="0" max="100" step="1" value={brightness} aria-valuetext={`${brightness} percent brightness`} onChange={(event) => setBrightness(Number(event.target.value))} /><p className="wb-studio-help">Changing a colour turns this preview on. Brightness stays at your chosen level.</p><button className="wb-studio-reset" type="button" onClick={() => setFeeling(feeling)}>Use my feeling colour <span aria-hidden="true">↗</span></button></section>

    {onOnline && <WifiLightConnection onReturnToGallery={onReturnToGallery} />}

    <section className="wb-studio-demo" aria-labelledby={`${ids}-demo-title`}><div className="wb-studio-section-heading"><h3 id={`${ids}-demo-title`}>Arduino sequence</h3><small>1 second per step</small></div><div className="wb-studio-demo-frames" aria-label="Red, green, blue, yellow, purple, then off">{ARDUINO_DEMO_FRAMES.map((frame, index) => <span key={frame.label} className={demoRunning && demoStep?.index === index ? 'is-current' : ''}><i style={{ backgroundColor: frame.lightOn ? frame.hex : '#d7d2c7' }} aria-hidden="true" /><small>{frame.label}</small></span>)}</div><button className="wb-studio-demo-button" type="button" disabled={!demoRunning && cycleBlocked} aria-pressed={demoRunning} onClick={() => demoRunning ? stopColourDemo() : startColourDemo(ids)}><span aria-hidden="true">{demoRunning ? '■' : '▷'}</span>{demoRunning ? 'Stop sequence' : 'Start sequence'}</button><p className="wb-studio-help">{blockedReason || 'Red → green → blue → yellow → purple → off. Stop restores your light. Manual controls stop the sequence.'}</p></section>
    <p className="wb-studio-status" role="status" aria-live="polite">{statusMessage}</p>
    <p className="wb-studio-hardware-note">{onOnline ? 'Online colour preview. Bring this choice to a wristband whenever you are ready.' : wifiConnected ? wifiConnection.lastApplied?.verification === 'state-confirmed' ? 'Nano ESP32 linked over Wi-Fi. The card above reports the last firmware-confirmed state.' : 'Nano ESP32 linked over Wi-Fi. The card above shows the last OK/OFF request acknowledgement.' : 'Preview only until you explicitly connect your Nano ESP32 over Wi-Fi.'}<br />Vibration is a screen preview. Emitted LED light is not measured.</p>
  </div>;
}
