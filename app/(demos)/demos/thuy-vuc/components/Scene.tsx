/** Cảnh đáy biển vẽ procedural bằng SVG, cao 1:2, cuộn dọc theo độ sâu. Các nhóm có data-l để Fx làm parallax. */
const rnd = (n: number) => { const x = Math.sin(n * 91.7) * 10000; return Math.round((x - Math.floor(x)) * 1000) / 1000; };

function Fish({ x, y, s, c, cls }: { x: number; y: number; s: number; c: string; cls: string }) {
  return (
    <g className={cls} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C18 -14 44 -14 62 0 C44 14 18 14 0 0Z M62 0 L82 -12 L82 12Z" fill={c} />
      <circle cx="14" cy="-2" r="2.4" fill="#031c2c" />
    </g>
  );
}

export function Scene() {
  return (
    <svg viewBox="0 0 1200 2400" preserveAspectRatio="xMidYMin slice" role="img" aria-label="Minh hoạ cảnh dưới nước: tia nắng, đàn cá, rạn san hô, vách đá và cá đuối" className="tvSceneSvg">
      <defs>
        <linearGradient id="tvRay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b8f5ec" stopOpacity=".55" /><stop offset="1" stopColor="#b8f5ec" stopOpacity="0" /></linearGradient>
        <radialGradient id="tvSun" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffffff" stopOpacity=".9" /><stop offset="1" stopColor="#b8f5ec" stopOpacity="0" /></radialGradient>
        <linearGradient id="tvWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#06384a" /><stop offset="1" stopColor="#010a10" /></linearGradient>
      </defs>
      <g data-l="rays">
        <circle cx="720" cy="-40" r="320" fill="url(#tvSun)" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (<polygon key={i} className="tvRay" style={{ animationDelay: `${-i * 1.3}s` }} points={`${120 + i * 150},0 ${200 + i * 150},0 ${60 + i * 150 - 240 + 300},900 ${i * 150 - 40 + 100},900`} fill="url(#tvRay)" opacity={0.35 + (i % 3) * 0.12} />))}
      </g>
      <g data-l="far">
        <path d="M0 980 C140 900 260 930 380 880 C520 820 640 900 760 860 C900 820 1040 880 1200 840 V1500 H0Z" fill="#05485a" opacity=".55" />
        <path d="M0 1120 C180 1040 300 1100 480 1050 C640 1010 800 1100 1200 1030 V1600 H0Z" fill="#043447" opacity=".8" />
      </g>
      <g data-l="shoal">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<Fish key={i} cls={`tvFish tvF${i % 3}`} x={150 + rnd(i) * 800} y={380 + rnd(i + 9) * 260} s={0.34 + rnd(i + 3) * 0.3} c={i % 2 ? "#b8f5ec" : "#6fd9d4"} />))}
        {[0, 1, 2, 3, 4].map((i) => (<Fish key={`b${i}`} cls={`tvFish tvF${(i + 1) % 3}`} x={100 + rnd(i + 20) * 900} y={760 + rnd(i + 31) * 220} s={0.5 + rnd(i + 8) * 0.3} c="#ff9d86" />))}
      </g>
      <g data-l="mid">
        {Array.from({ length: 11 }).map((_, i) => {
          const x = 40 + i * 110 + rnd(i) * 40, h = 150 + rnd(i + 4) * 230, y = 1380;
          const col = ["#ff8a78", "#ffb48a", "#008f95", "#4fd1c5"][i % 4];
          return (
            <g key={i} className="tvCoral" style={{ animationDelay: `${-i * 0.7}s`, transformOrigin: `${x}px ${y}px` }} stroke={col} strokeWidth={10 + rnd(i) * 8} strokeLinecap="round" fill="none">
              <path d={`M${x} ${y} C${x - 20} ${y - h * 0.4} ${x + 30} ${y - h * 0.7} ${x} ${y - h}`} />
              <path d={`M${x} ${y - h * 0.4} C${x + 40} ${y - h * 0.55} ${x + 60} ${y - h * 0.7} ${x + 56} ${y - h * 0.9}`} />
              <path d={`M${x} ${y - h * 0.62} C${x - 40} ${y - h * 0.7} ${x - 56} ${y - h * 0.85} ${x - 46} ${y - h * 1.02}`} />
            </g>
          );
        })}
        <path d="M0 1380 C200 1330 380 1400 600 1360 C820 1320 1000 1400 1200 1350 V1560 H0Z" fill="#021f2c" />
      </g>
      <g data-l="wall">
        <path d="M0 1450 L1200 1450 L1200 2400 L0 2400Z" fill="url(#tvWall)" />
        <path d="M0 1500 L260 1480 L300 1700 L120 1790 L180 2000 L0 2100Z" fill="#021a25" />
        <path d="M1200 1520 L920 1560 L960 1800 L1100 1900 L1040 2150 L1200 2200Z" fill="#021a25" />
        {[0, 1, 2, 3].map((i) => (<path key={i} d={`M${200 + i * 210} ${1620 + i * 50} q60 -30 120 0 q-20 30 -60 24 q-40 6 -60 -24z`} fill="#0b6070" opacity=".55" />))}
      </g>
      <g data-l="manta">
        <g transform="translate(520 1840)">
          <path d="M0 0 C60 -70 200 -90 300 -40 C400 -90 540 -70 600 0 C500 18 400 20 300 60 C200 20 100 18 0 0Z" fill="#010a10" opacity=".92" />
          <path d="M300 60 L300 190" stroke="#010a10" strokeWidth="6" strokeLinecap="round" />
          <circle cx="260" cy="12" r="5" fill="#b8f5ec" opacity=".6" /><circle cx="340" cy="12" r="5" fill="#b8f5ec" opacity=".6" />
        </g>
      </g>
      <g data-l="glow">
        {Array.from({ length: 34 }).map((_, i) => (<circle key={i} className="tvGlow" style={{ animationDelay: `${-rnd(i) * 6}s` }} cx={rnd(i + 2) * 1200} cy={1980 + rnd(i + 5) * 400} r={2 + rnd(i + 7) * 5} fill="#8ff7e3" />))}
      </g>
    </svg>
  );
}
