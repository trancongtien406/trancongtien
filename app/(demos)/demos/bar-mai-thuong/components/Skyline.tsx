import s from "../brand.module.css";

/** Đường chân trời tự vẽ: toà nhà xác định (không ngẫu nhiên) + cầu dây văng, cửa sổ nhấp nháy chậm. */
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a * 1664525 + 1013904223) % 4294967296;
    return a / 4294967296;
  };
}

export function Skyline() {
  const r = rng(11);
  const blds: { x: number; w: number; h: number }[] = [];
  let x = -10;
  while (x < 1450) {
    const w = 28 + Math.floor(r() * 54);
    const h = 40 + Math.floor(r() * 150) + (x > 980 && x < 1180 ? 60 : 0);
    blds.push({ x, w, h });
    x += w + 3 + Math.floor(r() * 6);
  }
  const wins: { x: number; y: number; c: number; d: number }[] = [];
  blds.forEach((b, i) => {
    for (let yy = 360 - b.h + 10; yy < 350; yy += 14) {
      for (let xx = b.x + 5; xx < b.x + b.w - 6; xx += 10) {
        if (r() < 0.22) wins.push({ x: xx, y: yy, c: r() < 0.7 ? 0 : 1, d: (i * 7 + Math.floor(xx)) % 6 });
      }
    }
  });
  return (
    <svg className={s.skyline} viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="tm-sky-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1022" />
          <stop offset="1" stopColor="#07080f" />
        </linearGradient>
      </defs>
      <g fill="url(#tm-sky-fade)" stroke="rgba(0,229,255,.28)" strokeWidth="1">
        {blds.map((b, i) => (
          <rect key={i} x={b.x} y={360 - b.h} width={b.w} height={b.h + 2} />
        ))}
      </g>
      {/* cầu dây văng */}
      <g fill="none" stroke="rgba(255,60,172,.55)" strokeWidth="1.4">
        <path d="M120 360V210M120 210L40 340M120 210L200 340M120 240L60 340M120 240L180 340" />
        <path d="M0 340H260" />
      </g>
      <g>
        {wins.map((w, i) => (
          <rect key={i} className={s[`win${w.d}` as keyof typeof s]} x={w.x} y={w.y} width="4" height="6" fill={w.c ? "#00e5ff" : "#ff3cac"} opacity=".8" />
        ))}
      </g>
    </svg>
  );
}
