import { useId } from 'react';

// 固定透视的矢量腕带：顶面、内壁与前侧分别绘制，缩放时不会被容器拉成扁环。
export function WristbandModel() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const ref = name => `url(#${id}-${name})`;
  return <svg className="wb-model" viewBox="24 14 312 206" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-top`} x1="86" y1="36" x2="254" y2="167" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fffdf8" /><stop offset=".48" stopColor="#f0e9de" /><stop offset="1" stopColor="#e2d8c9" />
      </linearGradient>
      <linearGradient id={`${id}-front`} x1="180" y1="107" x2="180" y2="188" gradientUnits="userSpaceOnUse">
        <stop stopColor="#e9e0d2" /><stop offset=".45" stopColor="#d7cbb9" /><stop offset="1" stopColor="#c6b9a5" />
      </linearGradient>
      <linearGradient id={`${id}-inside`} x1="180" y1="59" x2="180" y2="107" gradientUnits="userSpaceOnUse">
        <stop stopColor="#b6a995" /><stop offset=".55" stopColor="#d9cebe" /><stop offset="1" stopColor="#eee7dc" />
      </linearGradient>
      <linearGradient id={`${id}-rim`} x1="180" y1="37" x2="180" y2="166" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity=".95" /><stop offset="1" stopColor="#fff9ec" stopOpacity=".3" />
      </linearGradient>
      <filter id={`${id}-shadow`} x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="5" /></filter>
      <filter id={`${id}-light`} x="-30%" y="-150%" width="160%" height="400%"><feGaussianBlur stdDeviation="3" /></filter>
    </defs>
    <ellipse cx="183" cy="197" rx="109" ry="9" fill="#6b5942" opacity=".12" filter={ref('shadow')} />
    <g transform="rotate(-10 180 110)">
      {/* 内侧后壁只有上半弧可见，开口保持透明，不填成一块白色平面。 */}
      <path d="M69 100 C69 77 119 60 180 60 C241 60 291 77 291 100 L286 112 C279 92 235 80 180 80 C125 80 81 92 74 112 Z" fill={ref('inside')} />
      {/* 连续的前侧厚度向左右收拢，形成柔软硅胶腕带的立体轮廓。 */}
      <path d="M44 100 C44 136 105 165 180 165 C255 165 316 136 316 100 L316 121 C316 157 255 186 180 186 C105 186 44 157 44 121 Z" fill={ref('front')} stroke="#bfb19d" strokeOpacity=".35" strokeWidth=".7" />
      <path d="M316 100 C316 136 255 165 180 165 C105 165 44 136 44 100 C44 64 105 35 180 35 C255 35 316 64 316 100 Z M291 100 C291 77 241 60 180 60 C119 60 69 77 69 100 C69 124 119 144 180 144 C241 144 291 124 291 100 Z" fill={ref('top')} fillRule="evenodd" />
      <path d="M45 100 C45 65 106 36 180 36 C254 36 315 65 315 100" fill="none" stroke={ref('rim')} strokeWidth="1.8" />
      <path d="M70 100 C70 124 120 144 180 144 C240 144 290 124 290 100" fill="none" stroke="#fffdf7" strokeOpacity=".75" strokeWidth="1.2" />
      <path d="M49 124 C61 157 113 182 180 182 C247 182 299 157 311 124" fill="none" stroke="#a89982" strokeOpacity=".22" strokeWidth="1" />
      {/* 细接缝与低对比标记提示真实腕带结构，不增加悬浮的装饰条。 */}
      <path d="M278 57 L290 67 M293 70 L284 84" fill="none" stroke="#c7bba9" strokeOpacity=".65" strokeWidth="1" strokeLinecap="round" />
      <text x="83" y="151" transform="rotate(20 83 151)" fill="#958772" fontFamily="Georgia, serif" fontSize="6.5" letterSpacing=".5">echoes</text>
      <path d="M120 168 Q180 186 240 168" fill="none" stroke="#b5a995" strokeWidth="13" strokeLinecap="round" opacity=".55" />
      <path className="wb-model-led-glow" d="M122 169 Q180 187 238 169" fill="none" strokeWidth="15" strokeLinecap="round" filter={ref('light')} />
      <path className="wb-model-led" d="M122 169 Q180 187 238 169" fill="none" strokeWidth="8" strokeLinecap="round" />
      <path className="wb-model-led-highlight" d="M125 167.5 Q180 184 235 167.5" fill="none" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  </svg>;
}
