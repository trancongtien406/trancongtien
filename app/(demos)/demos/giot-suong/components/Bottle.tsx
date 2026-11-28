import type { Ref } from "react";

/** Chai serum bằng SVG: thân kính ngọc lam, cổ bạc có chấm, quả bóp hồng phấn, ống nhỏ giọt. Nhóm "dropper" nâng lên bằng GSAP. */
export function Bottle({ id, dropperRef, dropRef, className, compact }: { id: string; dropperRef?: Ref<SVGGElement>; dropRef?: Ref<SVGGElement>; className?: string; compact?: boolean }) {
  return (
    <svg className={className} viewBox={compact ? "34 100 132 426" : "0 -230 200 750"} role="img" aria-label="Chai serum Giọt Sương có ống nhỏ giọt" focusable="false">
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" x2="1">
          <stop offset="0" stopColor="#a8e3db" stopOpacity=".7" />
          <stop offset=".35" stopColor="#e3faf6" stopOpacity=".5" />
          <stop offset=".7" stopColor="#a4ddd5" stopOpacity=".55" />
          <stop offset="1" stopColor="#7cc5bd" stopOpacity=".72" />
        </linearGradient>
        <linearGradient id={`${id}-liq`} x1="0" x2="1">
          <stop offset="0" stopColor="#58c2b7" stopOpacity=".7" />
          <stop offset=".5" stopColor="#a9ebe2" stopOpacity=".55" />
          <stop offset="1" stopColor="#36958e" stopOpacity=".75" />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" x2="1">
          <stop offset="0" stopColor="#8d949a" />
          <stop offset=".3" stopColor="#f4f6f7" />
          <stop offset=".55" stopColor="#aab1b6" />
          <stop offset="1" stopColor="#6e757b" />
        </linearGradient>
        <linearGradient id={`${id}-bulb`} x1="0" x2="1">
          <stop offset="0" stopColor="#e9c9c8" />
          <stop offset=".4" stopColor="#fff4f2" />
          <stop offset="1" stopColor="#d7aeae" />
        </linearGradient>
      </defs>
      <g ref={dropperRef} data-gs="dropper">
        <rect x="95" y="232" width="10" height="212" rx="5" fill={`url(#${id}-glass)`} stroke="#e8fffb" strokeOpacity=".55" />
        <rect x="97.5" y="300" width="5" height="140" rx="2.5" fill={`url(#${id}-liq)`} />
        <rect x="82" y="112" width="36" height="92" rx="17" fill={`url(#${id}-bulb)`} />
        <rect x="88" y="124" width="5" height="52" rx="2.5" fill="#fff" opacity=".75" />
        <rect x="68" y="196" width="64" height="46" rx="5" fill={`url(#${id}-metal)`} />
        {Array.from({ length: 24 }, (_, i) => (
          <circle key={i} cx={74 + (i % 6) * 10.4} cy={204 + Math.floor(i / 6) * 10} r="2" fill="#f6fbfb" stroke="#59616a" strokeWidth=".7" opacity=".85" />
        ))}
        <g ref={dropRef} data-gs="drop" opacity="0">
          <path d="M100 450 C94 462 94 470 100 474 C106 470 106 462 100 450Z" fill="#d6fbf5" stroke="#fff" strokeOpacity=".8" />
        </g>
      </g>
      <path d="M78 250 h44 v30 c0 8 28 14 28 40 v170 a22 22 0 0 1 -22 22 h-56 a22 22 0 0 1 -22 -22 v-170 c0 -26 28 -32 28 -40z" fill={`url(#${id}-glass)`} stroke="#e8fffb" strokeOpacity=".6" />
      <path d="M58 380 h84 v112 a18 18 0 0 1 -18 18 h-48 a18 18 0 0 1 -18 -18z" fill={`url(#${id}-liq)`} opacity=".8" />
      <rect x="62" y="330" width="76" height="110" rx="3" fill="#fff" opacity=".16" />
      <text x="100" y="402" textAnchor="middle" fontSize="12" fontWeight="500" letterSpacing="3.5" fill="#f4fffc" opacity=".9" fontFamily="var(--gs-fh), sans-serif">GIỌT SƯƠNG</text>
      <text x="100" y="420" textAnchor="middle" fontSize="6.5" letterSpacing="2" fill="#effaf8" opacity=".75" fontFamily="var(--gs-fb), sans-serif">HYALURONIC 2% · 30 ML</text>
      <path d="M66 300 c-2 50 -2 110 0 170" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".55" fill="none" />
    </svg>
  );
}
