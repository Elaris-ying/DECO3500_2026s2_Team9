import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { WristbandProvider, WristbandPreview, WristbandStatus, useWristband } from './Wristband';
import { Icon } from './icons';

// 作品、速写及观众感想沿用原 Figma 的本地素材。

// 素材相对于当前 HTML 查找，兼容 Go Live、子目录预览和 Vite 源码入口。
const ASSET = new URL('./public/assets/', document.baseURI).href;

const COLLECTION = [
  {
    title: 'Exterior View of Saint-Lazare Station', artist: 'Claude Monet', image: 'collection-01.png',
    description: 'Claude Monet captures the energy of modern Paris through steam, light, and the busy atmosphere surrounding Saint-Lazare station.',
  },
  {
    title: 'The Swing', artist: 'Jean-Honoré Fragonard', image: 'collection-02.png',
    description: 'Jean-Honoré Fragonard creates a playful Rococo scene filled with romance, movement, soft colors, and a sense of hidden flirtation.',
  },
  {
    title: 'Ophelia', artist: 'John Everett Millais', image: 'collection-03.png',
    description: 'John Everett Millais portrays Ophelia floating quietly among flowers, combining beautiful natural detail with a tragic and dreamlike mood.',
  },
  {
    title: 'Primavera', artist: 'Sandro Botticelli', image: 'collection-04.png',
    description: 'Sandro Botticelli presents an elegant mythological scene celebrating spring, love, beauty, nature, and the idea of renewal.',
  },
  {
    title: 'Springtime', artist: 'Pierre-Auguste Cot', image: 'collection-05.png',
    description: 'Pierre-Auguste Cot shows two young lovers sharing a tender moment on a swing, surrounded by a warm and peaceful forest setting.',
  },
  {
    title: 'The Kiss', artist: 'Gustav Klimt', image: 'collection-06.png',
    description: 'Gustav Klimt depicts an intimate embrace surrounded by rich golden decoration, combining romance, symbolism, and luxurious decorative patterns.',
  },
];

const UNVISITED = Array.from({ length: 6 }, (_, index) => ({ number: index + 11, image: `unvisited-${index + 11}.png` }));
const SKETCHES = [
  { name: 'Mia', time: '8 min ago', likes: 12, image: 'sketch-mia.png', crop: 'mia' },
  { name: 'Leo', time: '14 min ago', likes: 9, image: 'sketch-leo.png', crop: 'leo' },
  { name: 'Anonymous', time: '20 min ago', likes: 6, image: 'sketch-anonymous.png', crop: 'anonymous' },
  { name: 'Rina', time: '31 min ago', likes: 15, image: 'sketch-rina.png', crop: 'rina' },
];
const REFLECTIONS = [
  ['“The reflection feels more vivid than the sky.”', 'Mia · 3 min ago', 'lavender'],
  ['“The bridge almost disappears into the water.”', 'Anonymous · 7 min ago', 'aqua'],
  ['“I noticed the ripples before I saw the lilies.”', 'Leo · 11 min ago', 'mint'],
  ['“The light makes the whole scene feel temporary.”', 'Rina · 18 min ago', 'aqua'],
];


const MONET = { title: 'Water Lilies and Bridge', artist: 'Claude Monet', image: 'water-lilies.png' };
const ROUTES = ['welcome','mode','pairTeam','teamConnected','home','proximity','detail','downloaded','thought','capture','collective','sharedSuccess','saved','collection','collectionArt','unvisited','location','map','shared','sketches','shareSketch','sketchShared','mine'];
const FEELINGS = [['Calm','calm','Blue'],['Curious','curious','Lavender'],['Nostalgic','nostalgic','Peach'],['Other feeling','other','Sage']];

// 浏览器下载无法保证直接写入系统相册，成功页准确提示下载已开始。
function downloadAsset(fileName, downloadName) {
  const anchor = document.createElement('a');
  anchor.href = ASSET + fileName; anchor.download = downloadName;
  document.body.appendChild(anchor); anchor.click(); anchor.remove();
}
// 统一主次按钮样式、图标和可访问属性，供各业务页面复用。
function Button({ children, onClick, light = false, icon = 'arrow', className = '', ...props }) {
  return <button type="button" className={'button ' + (light ? 'button-light ' : 'button-dark ') + className} onClick={onClick} {...props}><span>{children}</span>{icon && <Icon name={icon} size={18} />}</button>;
}
// 使用短小的章节提示建立标题上方的信息层级。
function Eyebrow({ children }) { return <p className="eyebrow">{children}</p>; }
// 保留原主题的粉彩有机形，作为页面顶部的装饰光晕。
function ModeAura() { return <img className="mode-aura" src={ASSET + 'figma-mode-personal.svg'} alt="" />; }
// 页面页头提供返回、手环预览、模式切换及标题说明。
function Header({ title, go, subtitle, eyebrow = 'Gallery Echoes', back = true }) {
  const { mode } = useWristband();
  return <><ModeAura /><div className="topbar">{back ? <button type="button" className="icon-button" onClick={go.back} aria-label="Go back"><Icon name="back" /></button> : <span className="brand-monogram" aria-label="Gallery Echoes">ge.</span>}<WristbandStatus compact /><button type="button" className="mode-switch" onClick={() => go('mode')}>{mode === 'team' ? 'Team' : 'Personal'}<span aria-hidden="true">⌄</span></button></div><header className="screen-header"><Eyebrow>{eyebrow}</Eyebrow><h1 tabIndex={-1}>{title}</h1>{subtitle && <p className="intro">{subtitle}</p>}</header></>;
}
// 根据当前页面标记探索、地图或收藏入口，保持主导航位置一致。
function BottomNav({ go, screen }) {
  const active = ['collection','collectionArt','mine'].includes(screen) ? 'Collection' : ['map','location','unvisited'].includes(screen) ? 'Map' : 'Explore';
  return <nav className="bottom-nav" aria-label="Primary navigation">{[['Explore','home','explore'],['Map','map','map'],['Collection','collection','collection']].map(([label,route,icon]) => <button type="button" key={route} className={active === label ? 'active' : ''} aria-current={active === label ? 'page' : undefined} onClick={() => go(route)}><Icon name={icon} /><span>{label}</span><i /></button>)}</nav>;
}
// 欢迎页保留品牌三个粉彩光晕，缓慢移动而不抢占作品与文字的注意力。
function Welcome({ go }) {
  return <section className="screen welcome-screen"><img className="welcome-shape welcome-left" src={ASSET + 'figma-welcome-left.svg'} alt="" /><img className="welcome-shape welcome-top" src={ASSET + 'figma-welcome-top.svg'} alt="" /><img className="welcome-shape welcome-bottom" src={ASSET + 'figma-welcome-bottom.svg'} alt="" /><div className="welcome-brand"><span className="brand-monogram">ge.</span><span>A GALLERY COMPANION</span></div><div className="welcome-copy"><Eyebrow>Art is only the beginning.</Eyebrow><h1 tabIndex={-1}>Gallery<br /><em>Echoes.</em></h1><div className="fine-rule" /><p>See art. Share perspectives.<br />Leave your echo.</p></div><div className="welcome-bottom-copy"><p>Art connects us,<br />in different ways.</p><Button onClick={() => go('mode')}>Begin your visit</Button><small>Take your time. Make it yours.</small></div></section>;
}
// 选择个人或团队参观方式，并同步手环模式与后续页面。
function ChooseMode({ go }) {
  const { setMode, setSignal } = useWristband();
  const choose = mode => { setMode(mode); setSignal(mode === 'team' ? 'scanning' : 'idle'); go(mode === 'team' ? 'pairTeam' : 'home'); };
  return <section className="screen mode-screen"><Header title={<>Your visit,<br /><em>your way.</em></>} subtitle="A moment for yourself, or a perspective to share." eyebrow="Make yourself at home" go={go} /><div className="mode-options"><button className="mode-card personal-card" type="button" onClick={() => choose('personal')}><img src={ASSET + 'figma-mode-personal.svg'} alt="" /><span className="mode-card-number">01</span><div><strong>Personal</strong><p>Follow your own curiosity.</p></div><Icon name="arrow" /></button><button className="mode-card team-card" type="button" onClick={() => choose('team')}><img src={ASSET + 'figma-team-symbol.svg'} alt="" /><span className="mode-card-number">02</span><div><strong>Together</strong><p>See more through each other.</p></div><Icon name="arrow" /></button></div><p className="quiet-note">You can switch modes at any time.</p></section>;
}
// 沿用原型模拟 NFC / 组队，使用明确按钮，不将普通点击伪装为真实硬件扫描。
function ScanScreen({ go, team = false }) {
  return <section className={'screen scan-screen ' + (team ? 'pairing-screen' : 'proximity-screen')}><img className="scan-photo" src={ASSET + (team ? 'pair-team-bg.png' : 'nfc-proximity-bg.png')} alt={team ? 'Visitors connecting in the gallery' : 'Inside the gallery'} /><div className="scan-shade" /><button className="icon-button scan-back" type="button" onClick={go.back} aria-label="Cancel scan"><Icon name="back" /></button><div className="scan-copy"><Eyebrow>{team ? 'A shared beginning' : 'Discover something new'}</Eyebrow><h1 tabIndex={-1}>{team ? <>Bring your<br />wristbands together.</> : <>A little closer<br />to the artwork.</>}</h1><p>{team ? 'Let your lights find one another.' : 'Hold your wristband near the NFC tag.'}</p></div><div className="scan-target"><i /><i /><i /><i /><WristbandPreview /><span className="scan-orbit" /></div><div className="scan-footer"><span className="live-caption"><i />{team ? 'Finding your group' : 'Ready to discover'}<span className="animated-dots">…</span></span><Button onClick={() => go(team ? 'teamConnected' : 'detail')}>{team ? 'Preview team connection' : 'Preview artwork scan'}</Button><small>Interactive prototype · tap to simulate</small></div></section>;
}
// 展示模拟组队结果，引导已连接的团队开始探索。
function TeamConnected({ go }) {
  return <section className="screen connected-screen"><Header title="A shared perspective." eyebrow="Together mode" go={go} /><div className="connected-art"><img src={ASSET + 'figma-team-symbol.svg'} alt="Four pastel lights coming together" /><span className="success-mark"><Icon name="check" size={30} /></span></div><div className="center-copy"><h2>You're connected.</h2><p>Your group is ready to explore.<br />Different eyes. A shared experience.</p></div><div className="spacer" /><Button onClick={() => go('home')}>Start exploring</Button><p className="quiet-note">Team connection preview</p></section>;
}
// 首页提供作品扫描入口，并汇总本次浏览与草图分享数量。
function Home({ go, viewed, sketchCount }) {
  return <section className="screen home-screen"><Header title={<>Art, at<br /><em>your pace.</em></>} eyebrow="Welcome to your visit" subtitle="There is no right way to look. Just yours." back={false} go={go} /><button className="nfc-card" type="button" onClick={() => go('proximity')} aria-label="Scan an artwork"><div className="nfc-art"><img src={ASSET + 'nfc-card.png'} alt="" /><span className="nfc-ripple" /></div><div className="nfc-card-copy"><span className="eyebrow">NFC guide</span><h2>Every artwork<br />has a story.</h2><p>Tap a tag. Follow a feeling.</p><span className="card-action">Scan an artwork <Icon name="arrow" size={18} /></span></div></button><div className="section-heading"><h2>Your visit today</h2><span>A little collection of moments</span></div><div className="visit-stats"><button type="button" className="stat-card" onClick={() => go('collection')}><span className="stat-icon lavender"><Icon name="collection" /></span><strong>{String(viewed).padStart(2,'0')}</strong><span>artworks discovered</span><Icon name="arrow" size={16} /></button><button type="button" className="stat-card" onClick={() => go('mine')}><span className="stat-icon mint"><Icon name="sketch" /></span><strong>{String(sketchCount).padStart(2,'0')}</strong><span>sketch{sketchCount === 1 ? '' : 'es'} shared</span><Icon name="arrow" size={16} /></button></div><p className="home-endnote"><span />Stay a little longer with what moves you.</p></section>;
}
// 作品详情支持下载原图、查看下载提示及进入观展感想。
function ArtworkDetail({ go, downloaded = false }) {
  return <section className="screen detail-screen"><Header title="An encounter." eyebrow="Artwork 07 · Claude Monet" go={go} /><figure className="artwork-hero"><img src={ASSET + 'water-lilies.png'} alt="Water Lilies and Bridge by Claude Monet" /><button type="button" className="image-action" aria-label="Download artwork" onClick={() => { downloadAsset('water-lilies.png','water-lilies-and-bridge.png'); go('downloaded'); }}><Icon name="download" size={18} /></button><figcaption>07 / A moment by the water</figcaption></figure><div className="artwork-copy"><Eyebrow>Look a little closer</Eyebrow><h2>Water Lilies and Bridge</h2><p className="artist-name">Claude Monet</p><p className="body-copy">Pause with the water, the light, and the reflections. What is the first detail that draws you in?</p></div>{downloaded && <p className="inline-success" role="status"><Icon name="check" size={17} />Artwork download started</p>}<Button onClick={() => go('thought')} icon="thought">Add a thought</Button></section>;
}
// 引导观众记录感受，并发现围绕同一作品的感想与草图。
function Thought({ go }) {
  return <section className="screen thought-screen"><Header title={<>What stayed<br /><em>with you?</em></>} eyebrow="A moment of reflection" go={go} /><figure className="reflection-image"><img src={ASSET + 'reflection-art.png'} alt="Light and reflections on the water" /><figcaption>A quiet moment with this artwork</figcaption></figure><Button onClick={() => go('capture')} icon="spark">Share feelings</Button><div className="section-heading"><h2>Nearby footprints</h2><span>Other eyes. Other echoes.</span></div><div className="footprints"><button type="button" className="footprint-card" onClick={() => go('shared')}><span className="stat-icon peach"><Icon name="thought" /></span><div><strong>Someone noticed the reflection</strong><small>4 shared reflections · latest 3m ago</small></div><Icon name="arrow" size={16} /></button><button type="button" className="footprint-card" onClick={() => go('sketches')}><span className="stat-icon mint"><Icon name="sketch" /></span><div><strong>A different way of seeing</strong><small>Discover visitor sketches</small></div><Icon name="arrow" size={16} /></button></div></section>;
}
// 选择情绪时同步界面与手环颜色，并选择个人或共享视觉预览。
function CaptureResponse({ go }) {
  const { feeling, setFeeling, setSignal, feelingChosen } = useWristband();
  const [method, setMethod] = useState(feelingChosen ? 'memory' : '');
  // 在手环弹层里表达过的情绪也能直接用于此页；保留用户主动选择的共享方式。
  useEffect(() => { if (feelingChosen) setMethod(current => current === 'shared' ? current : 'memory'); }, [feeling, feelingChosen]);
  const choose = next => { setFeeling(next); setSignal('connected'); setMethod('memory'); };
  return <section className="screen capture-screen"><Header title={<>Give your feeling<br /><em>a colour.</em></>} eyebrow="Leave your echo" subtitle="There are no wrong answers." go={go} /><div className="section-label"><span>01</span><h2>Choose what resonates</h2></div><div className="feeling-cloud" role="group" aria-label="Choose a feeling">{FEELINGS.map(([label,className,colour]) => <button key={label} type="button" className={'feeling-orb ' + className + (feeling === label && method === 'memory' ? ' selected' : '')} onClick={() => choose(label)} aria-pressed={feeling === label && method === 'memory'}><span className="orb-glow" /><span className="orb-name">{label === 'Other feeling' ? 'Something else' : label}</span>{feeling === label && method === 'memory' && <Icon name="check" size={16} />}<small>{colour}</small></button>)}</div><p className="feeling-feedback" aria-live="polite">{method === 'memory' ? feeling + ' · your wristband and this space share a colour.' : 'Choose a feeling to see your wristband respond.'}</p><div className="section-label"><span>02</span><h2>Or join a shared perspective</h2></div><button type="button" className={'reference-method' + (method === 'shared' ? ' selected' : '')} onClick={() => { setMethod('shared'); setSignal('connected'); }} aria-pressed={method === 'shared'}><img src={ASSET + 'feeling-reference.png'} alt="A wheel of colours" /><div><strong>Our collective echo</strong><p>Become part of the bigger picture.</p></div><Icon name={method === 'shared' ? 'check' : 'plus'} /></button><Button disabled={!method} onClick={() => go(method === 'shared' ? 'sharedSuccess' : 'collective')} icon="spark">{method === 'shared' ? 'Join the shared visual' : 'Create my visual'}</Button><p className="quiet-note">A preview of your abstract memory.</p></section>;
}
// 展示本地抽象视觉预览，提供个人下载或共享感想入口。
function CollectiveVisual({ go, shared = false }) {
  const { feeling } = useWristband();
  return <section className={'screen collective-screen' + (shared ? ' shared-success-screen' : '')}><Header title={shared ? <>A feeling,<br /><em>shared.</em></> : <>Your own<br /><em>little echo.</em></>} eyebrow={shared ? 'Our collective visual' : 'An abstract memory'} subtitle={shared ? 'One perspective, woven into many.' : 'A colour. A feeling. A moment to keep.'} go={go} /><div className="memory-art"><div className="memory-aura" /><img src={ASSET + (shared ? 'shared-visual.png' : 'collective-visual.png')} alt={shared ? 'Shared abstract visual preview' : 'Abstract memory preview for ' + feeling} />{shared && <span className="memory-badge"><Icon name="users" size={15} />Shared echo</span>}</div><div className="memory-caption"><span className="colour-dot" /><span>{feeling}</span><span>—</span><small>{shared ? 'Part of something shared' : 'Your unique perspective'}</small></div><p className="quiet-note">Preview composition · inspired by this artwork</p><div className="spacer" />{shared ? <><Button onClick={() => go('home')}>Continue exploring</Button><Button light onClick={() => go('shared')} icon="thought">View shared reflections</Button><p className="quiet-note">Added to this prototype visit.</p></> : <Button onClick={() => { downloadAsset('collective-visual.png','gallery-echoes-memory.png'); go('saved'); }} icon="download">Save my visual</Button>}</section>;
}
// 准确提示视觉下载已开始，并允许再次下载或继续参观。
function SavedPhotos({ go }) {
  return <section className="screen saved-screen"><Header title="A moment to keep." eyebrow="Your abstract memory" go={go} /><div className="success-orbit"><span className="success-mark"><Icon name="check" size={30} /></span></div><div className="center-copy"><h2>Take your echo<br /><em>with you.</em></h2><p>Your visual download has started.<br />Keep it as a small reminder of your visit.</p></div><div className="spacer" /><Button onClick={() => go('home')}>Continue exploring</Button><Button light icon="download" onClick={() => downloadAsset('collective-visual.png','gallery-echoes-memory.png')}>Download again</Button></section>;
}
// 展示本次作品收藏，完成模拟扫描后加入第七件作品。
function Collection({ go, viewed }) {
  const arts = viewed > 6 ? [...COLLECTION,MONET] : COLLECTION;
  return <section className="screen collection-screen"><Header title={<>A visit worth<br /><em>remembering.</em></>} eyebrow="My collection" subtitle={arts.length + ' artworks. A collection of your encounters.'} go={go} /><div className="art-grid collection-grid">{arts.map((art,index) => <button type="button" key={art.image} onClick={() => go(index === 6 ? 'detail' : 'collectionArt', { artwork: index === 6 ? 0 : index })}><div className="art-thumb"><img src={ASSET + art.image} alt={art.title} loading="lazy" /><span>{String(index + 1).padStart(2,'0')}</span></div><strong>{art.title}</strong><small>{art.artist}</small></button>)}</div><Button light onClick={() => go('unvisited')}>Explore unvisited artworks</Button></section>;
}
// 按收藏索引展示对应作品的图片、艺术家和简短介绍。
function CollectionArtwork({ go, index }) {
  const art = COLLECTION[index] || COLLECTION[0];
  return <section className="screen collection-art-screen"><Header title="A closer look." eyebrow={'Your collection · ' + String(index + 1).padStart(2,'0')} go={go} /><figure className="collection-art-image"><img src={ASSET + art.image} alt={art.title} /></figure><div className="artwork-copy"><h2>{art.title}</h2><p className="artist-name">{art.artist}</p><div className="fine-rule" /><p className="body-copy">{art.description}</p></div><div className="spacer" /><Button light onClick={() => go('unvisited')}>Explore unvisited artworks</Button></section>;
}
// 列出尚未观看的作品，并让观众进入相应位置预览。
function Unvisited({ go }) {
  return <section className="screen unvisited-screen"><Header title={<>Let curiosity<br /><em>lead you.</em></>} eyebrow="Explore next" subtitle="6 more artworks are waiting to meet you." go={go} /><div className="art-grid unvisited-grid">{UNVISITED.map(art => <button type="button" key={art.number} onClick={() => go('location', { location: art.number })}><div className="art-thumb"><img src={ASSET + art.image} alt={'Artwork ' + art.number} loading="lazy" /><span><Icon name="map" size={14} /></span></div><strong>Artwork {art.number}</strong><small>Gallery {galleryFor(art.number)} <span aria-hidden="true">↗</span></small></button>)}</div><p className="quiet-note">Tap an artwork to find your way.</p></section>;
}
const MARKERS = { 11:[29,67],12:[103,123],13:[203,69],14:[285,123],15:[63,277],16:[276,290] };
const OVERVIEW_MARKERS = { 11:[58,86],12:[112,132],13:[226,90],14:[274,140],15:[72,286],16:[252,300] };
const VIEWED_MARKERS = [[35,63,'blue'],[95,103,'grey'],[229,57,'lavender'],[287,103,'mint'],[41,257,'yellow'],[285,257,'pink']];
// 地图内部沿用 Figma 平面图，坐标转为百分比后适应不同移动屏幕宽度。
function MuseumMap({ selected, onSelect, overview = false, viewed = 6 }) {
  const positions = overview ? OVERVIEW_MARKERS : MARKERS;
  const position = (left,top) => ({ left: left / 342 * 100 + '%', top: top / 385 * 100 + '%' });
  return <div className={'museum-map' + (overview ? ' overview-map' : '')} aria-label="Gallery floor plan"><div className="map-floor">{[1,2,3,4].map(n => <div key={n} className={'gallery-room room-' + n}><span>GALLERY {n}</span></div>)}<div className="central-hall" /><div className="top-corridor" /><div className="bottom-corridor" /><span className="entrance-label">ENTRANCE</span>{overview && VIEWED_MARKERS.map(([left,top,colour],index) => <button key={index} type="button" className={'viewed-marker ' + colour} style={position(left,top)} onClick={() => onSelect(index + 1)} aria-label={'Viewed artwork ' + (index + 1)} />)}{overview && viewed > 6 && <button type="button" className="viewed-marker aqua" style={position(80,320)} onClick={() => onSelect(7)} aria-label="Viewed artwork 7" />}{Object.entries(positions).map(([number,[left,top]]) => <button key={number} type="button" className={'map-marker' + (Number(number) === selected ? ' selected' : '')} style={position(left,top)} aria-pressed={Number(number) === selected} onClick={() => onSelect(Number(number))} aria-label={'Artwork ' + number}>{overview ? '' : number}</button>)}<span className="you-halo"><i /></span><small className="you-label">YOU</small></div><div className="map-legend">{overview ? <><span><i className="legend-viewed" />Viewed</span><span><i className="legend-not-viewed" />Not viewed</span></> : <span><i className="legend-art" />Artwork</span>}<span><i className="legend-you" />You are here</span></div></div>;
}
// 根据原型中的作品编号查找所属展厅。
function galleryFor(location) { return location < 13 ? 1 : location < 15 ? 2 : location === 15 ? 3 : 4; }
// 同步显示所选作品的地图标记、展厅信息和返回列表入口。
function ArtworkLocation({ go, location }) {
  return <section className="screen location-screen"><Header title="Find your next echo." eyebrow="Artwork location" subtitle={'Artwork ' + location + ' · Gallery ' + galleryFor(location)} go={go} /><MuseumMap selected={location} onSelect={number => go('location',{location:number})} /><div className="selected-art-card"><span className="stat-icon"><Icon name="map" /></span><div><Eyebrow>Your destination</Eyebrow><h2>Artwork {location}</h2><p>Gallery {galleryFor(location)} · {location % 2 ? 'North' : 'East'} wall</p></div></div><Button light onClick={() => go('unvisited')} icon="back">Back to artworks</Button><p className="quiet-note">Floor plan preview · position is illustrative.</p></section>;
}
// 汇总已看与未看作品，在地图标记和对应详情之间导航。
function MapOverview({ go, viewed }) {
  const open = number => number > 7 ? go('location',{location:number}) : number === 7 ? go('detail') : go('collectionArt',{artwork:number - 1});
  return <section className="screen map-screen"><Header title={<>Find your<br /><em>own path.</em></>} eyebrow="Gallery map · Level 1" subtitle={viewed + ' discovered · 6 still to explore'} go={go} /><MuseumMap overview viewed={viewed} onSelect={open} /><Button onClick={() => go('unvisited')}>Explore unvisited artworks</Button><Button light onClick={() => go('collection')} icon="collection">Viewed today</Button><p className="quiet-note">Floor plan preview · position is illustrative.</p></section>;
}
// 展示本地示例观展感想，并提供回应或继续探索的入口。
function SharedReflections({ go }) {
  return <section className="screen reflections-screen"><Header title={<>Through<br /><em>other eyes.</em></>} eyebrow="Nearby footprints" subtitle="Small observations around Water Lilies and Bridge." go={go} /><div className="reflection-list">{REFLECTIONS.map(([quote,meta,colour],index) => <article key={quote}><div className="reflection-meta"><span className={'colour-dot ' + colour} /><small>{meta}</small><span>{String(index + 1).padStart(2,'0')}</span></div><blockquote>{quote}</blockquote></article>)}</div><Button onClick={() => go('capture')} icon="thought">Add your thought</Button><Button light onClick={() => go('home')}>Continue exploring</Button><p className="quiet-note">Sample reflections from the prototype.</p></section>;
}
// 展示示例和本次上传的访客草图，支持保留本次访问的点赞状态。
function VisitorSketches({ go, sketches, liked, toggleLike }) {
  return <section className="screen sketches-screen"><Header title={<>A different<br /><em>kind of echo.</em></>} eyebrow="Visitor sketches" subtitle={sketches.length + ' perspectives inspired by this view.'} go={go} /><div className="sketch-grid">{sketches.map(sketch => <article key={sketch.id}><div className={'sketch-crop ' + (sketch.preview ? 'uploaded' : sketch.crop)}><img src={sketch.preview || ASSET + sketch.image} alt={sketch.name + "'s sketch"} /></div><div className="sketch-meta"><div><strong>{sketch.name}</strong><small>{sketch.time}</small></div><button type="button" className={liked[sketch.id] ? 'liked' : ''} onClick={() => toggleLike(sketch.id)} aria-pressed={!!liked[sketch.id]} aria-label={'Like ' + sketch.name + "'s sketch"}><Icon name="heart" size={16} /><span>{sketch.likes + (liked[sketch.id] ? 1 : 0)}</span></button></div></article>)}</div><Button onClick={() => go('shareSketch')} icon="plus">Share your sketch</Button><p className="quiet-note">Visitor gallery preview · saved for this visit.</p></section>;
}
// 校验并预览本地草图文件，按所选身份加入当前访客列表。
function ShareSketch({ go, onShare }) {
  const input = useRef(null);
  const [file,setFile] = useState(null), [preview,setPreview] = useState(''), [identity,setIdentity] = useState('profile'), [error,setError] = useState('');
  // 临时 URL 在更换图片/卸载时释放；提交后父组件创建独立 URL，确保跨页仍可查看。
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); },[preview]);
  const choose = event => { const next = event.target.files?.[0]; if (!next) return; if (!next.type.startsWith('image/')) { setError('Please choose an image.'); return; } if (next.size > 10 * 1024 * 1024) { setError('Please choose an image smaller than 10 MB.'); return; } setFile(next); setPreview(URL.createObjectURL(next)); setError(''); };
  const submit = () => { if (!file) { setError('Add your drawing before sharing.'); return; } onShare(file,identity); go('sketchShared'); };
  return <section className="screen share-sketch-screen"><Header title={<>Leave a little<br /><em>of yourself.</em></>} eyebrow="Share your sketch" subtitle="A drawing. A detail. Your way of seeing." go={go} /><button className={'upload-area' + (preview ? ' has-preview' : '')} type="button" onClick={() => input.current?.click()} aria-label={preview ? 'Change sketch image' : 'Add a sketch image'}>{preview ? <img src={preview} alt="Selected sketch preview" /> : <><span className="upload-icon"><Icon name="plus" size={28} /></span><strong>Bring your sketch here</strong><small>Choose a photo or drawing</small><span className="upload-formats">IMAGES · UP TO 10 MB</span></>}</button><input ref={input} hidden type="file" accept="image/*" onChange={choose} />{preview && <p className="quiet-note">Tap the image to choose another.</p>}{error && <p className="upload-error" role="alert">{error}</p>}<div className="section-label"><h2>How would you like to appear?</h2></div><div className="identity-options">{[['profile','My profile'],['anonymous','Anonymous']].map(([key,label]) => <button key={key} type="button" className={identity === key ? 'selected' : ''} aria-pressed={identity === key} onClick={() => setIdentity(key)}><Icon name={identity === key ? 'check' : 'users'} size={16} />{label}</button>)}</div><div className="spacer" /><Button onClick={submit} icon="sketch">Share sketch</Button><p className="quiet-note">Added locally to this prototype visit.</p></section>;
}
// 复用草图结果卡片，展示图片、分享身份与时间。
function SketchCard({ sketch }) {
  return <div className="shared-sketch-card"><div className={'latest-sketch' + (sketch?.preview ? ' uploaded' : '')}><img src={sketch?.preview || ASSET + 'my-sketch.png'} alt="Your latest sketch" /></div><div><strong>{sketch?.name || 'You'}</strong><small>{sketch?.time || 'From this visit'}</small><span>Light over water</span></div></div>;
}
// 展示本次草图分享结果，并连接访客草图列表和作品详情。
function SketchShared({ go, sketch }) {
  return <section className="screen sketch-shared-screen"><Header title="A new perspective." eyebrow="Sketch shared" go={go} /><div className="success-orbit"><span className="success-mark"><Icon name="check" size={30} /></span></div><div className="center-copy"><h2>Your echo belongs here.</h2><p>Your sketch has joined this visit's gallery.<br />Thank you for sharing your way of seeing.</p></div><SketchCard sketch={sketch} /><div className="spacer" /><Button onClick={() => go('sketches')}>See visitor sketches</Button><Button light onClick={() => go('detail')} icon="back">Back to artwork</Button></section>;
}
// 展示最新上传草图或原型示例，并提供继续分享的入口。
function MySketch({ go, sketch }) {
  return <section className="screen my-sketch-screen"><Header title={<>A trace of<br /><em>your visit.</em></>} eyebrow="My sketch" subtitle="Inspired by Water Lilies and Bridge." go={go} /><div className={'my-sketch-image latest-sketch' + (sketch?.preview ? ' uploaded' : '')}><img src={sketch?.preview || ASSET + 'my-sketch.png'} alt="Your latest sketch" /></div><div className="memory-caption"><Icon name="sketch" size={17} /><span>Light over water</span></div><p className="quiet-note">{sketch?.time || 'Your sketch from this visit'}</p><div className="spacer" /><Button onClick={() => go('sketches')}>View visitor sketches</Button><Button light onClick={() => go('shareSketch')} icon="plus">Add another sketch</Button></section>;
}
// 桌面伴随面板实时展示当前模式、情绪与手环灯光预览。
function DesktopCompanion() {
  const { mode,feeling,signal,feelingChosen } = useWristband();
  return <aside className="desktop-companion"><div className="desktop-brand"><span className="brand-monogram">ge.</span><span>GALLERY ECHOES</span></div><div className="desktop-editorial"><Eyebrow>See art. Share perspectives.</Eyebrow><h2>Every visit<br />leaves <em>an echo.</em></h2><p>A quieter way to connect with art,<br />yourself, and the people around you.</p></div><div className="desktop-band-card"><div className="band-card-top"><Eyebrow>Your wristband</Eyebrow><span><i />{signal === 'scanning' ? 'Discovering' : mode === 'team' ? 'Together mode' : 'Personal mode'}</span></div><WristbandPreview large /><div className="band-card-bottom"><span className="colour-dot" /><div><strong>{signal === 'scanning' ? 'A new encounter awaits' : signal === 'saved' ? 'A moment, kept' : signal === 'idle' ? 'Ready for your next encounter' : mode === 'team' && !feelingChosen ? 'Together in light' : feeling}</strong><p>Your light follows your experience.</p></div></div></div><div className="desktop-footnote"><span>ART CONNECTS US, IN DIFFERENT WAYS.</span><span>Interactive prototype</span></div></aside>;
}
// 读取并校验 URL 中的页面与作品参数，支持安全的直接预览。
function initialRoute() {
  const query = new URLSearchParams(window.location.search);
  return { screen: ROUTES.includes(query.get('screen')) ? query.get('screen') : 'welcome', artwork: Math.max(0,Math.min(5,Math.floor(Number(query.get('artwork')) || 0))), location: Math.max(11,Math.min(16,Math.floor(Number(query.get('location')) || 11))) };
}
// 管理页面历史、浏览记录、草图与点赞状态，并同步手环反馈。
function GalleryApp() {
  const [route,setRoute] = useState(initialRoute), [viewed,setViewed] = useState(6), [uploads,setUploads] = useState([]), [liked,setLiked] = useState({});
  const { setSignal, setMode } = useWristband();
  const viewport = useRef(null), routeRef = useRef(route), depth = useRef(0), transitionLayer = useRef(null), transitionTimer = useRef(null), objectURLs = useRef([]);
  const screen = route.screen; routeRef.current = route;
  // 离场层只保留当前页面的视觉副本，立即渲染下一页，不阻塞连续点击。
  // 副本禁用交互并对读屏隐藏；保留滚动位置，避免长页在淡出时跳动。
  const showRoute = useCallback(next => {
    const layer = transitionLayer.current;
    clearTimeout(transitionTimer.current);
    layer?.replaceChildren();
    if (viewport.current && layer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const previous = viewport.current;
      const snapshot = previous.cloneNode(true);
      snapshot.className = 'route-snapshot';
      snapshot.setAttribute('inert', '');
      snapshot.setAttribute('aria-hidden', 'true');
      snapshot.style.top = previous.offsetTop + 'px';
      snapshot.style.height = previous.clientHeight + 'px';
      snapshot.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      layer.appendChild(snapshot);
      snapshot.scrollTop = previous.scrollTop;
      transitionTimer.current = setTimeout(() => layer.replaceChildren(), 240);
    }
    flushSync(() => setRoute(next));
  }, []);
  const go = useCallback((nextScreen,params = {}) => {
    if (!ROUTES.includes(nextScreen)) return;
    const current = routeRef.current, next = { ...current,...params,screen:nextScreen };
    if (nextScreen === current.screen && next.artwork === current.artwork && next.location === current.location) return;
    if (nextScreen === 'detail' && current.screen === 'proximity') setViewed(7);
    const url = new URL(window.location.href);
    url.searchParams.set('screen',nextScreen); url.searchParams.set('artwork',next.artwork); url.searchParams.set('location',next.location);
    depth.current += 1; window.history.pushState({route:next,echoDepth:depth.current},'',url);
    showRoute(next);
  },[showRoute]);
  go.back = () => { if (depth.current > 0) window.history.back(); else go(screen === 'mode' ? 'welcome' : 'home'); };
  // 浏览器后退/前进与页面状态同步，保留 ?screen=... 直接预览所有原型页面的能力。
  useEffect(() => {
    window.history.replaceState({route:routeRef.current,echoDepth:0},'',window.location.href);
    const pop = event => { depth.current = event.state?.echoDepth || 0; showRoute(event.state?.route || initialRoute()); };
    window.addEventListener('popstate',pop); return () => window.removeEventListener('popstate',pop);
  },[showRoute]);
  useEffect(() => {
    viewport.current?.scrollTo({top:0}); viewport.current?.querySelector('h1')?.focus({preventScroll:true});
    document.title = (screen === 'welcome' ? 'See Art. Leave Your Echo.' : screen === 'home' ? 'Your visit' : screen.replace(/([A-Z])/g,' $1')) + ' · Gallery Echoes';
    if (['pairTeam','teamConnected'].includes(screen)) setMode('team');
    if (['proximity','pairTeam'].includes(screen)) setSignal('scanning');
    else if (['saved','downloaded','sketchShared'].includes(screen)) setSignal('saved');
    else if (['welcome','mode'].includes(screen)) setSignal('idle');
    else setSignal('connected');
  },[screen,setSignal,setMode]);
  useEffect(() => () => { clearTimeout(transitionTimer.current); objectURLs.current.forEach(url => URL.revokeObjectURL(url)); },[]);
  const onShare = (file,identity) => { const preview = URL.createObjectURL(file); objectURLs.current.push(preview); setUploads(current => [{id:'visit-' + Date.now(),name:identity === 'anonymous' ? 'Anonymous' : 'You',time:'just now',likes:0,preview},...current]); };
  const sketches = [...uploads,...SKETCHES.map(item => ({...item,id:item.crop}))];
  const screens = {
    welcome:<Welcome go={go} />, mode:<ChooseMode go={go} />, pairTeam:<ScanScreen go={go} team />, teamConnected:<TeamConnected go={go} />, home:<Home go={go} viewed={viewed} sketchCount={1 + uploads.length} />,
    proximity:<ScanScreen go={go} />, detail:<ArtworkDetail go={go} />, downloaded:<ArtworkDetail go={go} downloaded />, thought:<Thought go={go} />, capture:<CaptureResponse go={go} />,
    collective:<CollectiveVisual go={go} />, sharedSuccess:<CollectiveVisual go={go} shared />, saved:<SavedPhotos go={go} />, collection:<Collection go={go} viewed={viewed} />, collectionArt:<CollectionArtwork go={go} index={route.artwork} />,
    unvisited:<Unvisited go={go} />, location:<ArtworkLocation go={go} location={route.location} />, map:<MapOverview go={go} viewed={viewed} />, shared:<SharedReflections go={go} />, sketches:<VisitorSketches go={go} sketches={sketches} liked={liked} toggleLike={id => setLiked(current => ({...current,[id]:!current[id]}))} />,
    shareSketch:<ShareSketch go={go} onShare={onShare} />, sketchShared:<SketchShared go={go} sketch={uploads[0]} />, mine:<MySketch go={go} sketch={uploads[0]} />,
  };
  const immersive = ['welcome','pairTeam','proximity'].includes(screen);
  return <main className="app-shell"><DesktopCompanion /><div className={'phone' + (immersive ? ' immersive' : '')}><div className="device-top" aria-hidden="true"><span>9:41</span><span className="device-island" /><span className="device-status">▮▮▮ <span>▰</span></span></div><div className="route-viewport" ref={viewport}><div className="route-stage" key={screen + route.artwork + route.location}>{screens[screen]}</div></div><div className="transition-layer" ref={transitionLayer} aria-hidden="true" />{!immersive && <BottomNav go={go} screen={screen} />}<div className="home-indicator" aria-hidden="true" /></div></main>;
}
// 为整个导览应用注入统一手环状态，保持跨页面的灯光交互连续。
export default function App() { return <WristbandProvider><GalleryApp /></WristbandProvider>; }
