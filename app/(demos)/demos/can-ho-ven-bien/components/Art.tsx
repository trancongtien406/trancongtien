/** Hình vẽ SVG thuần (không hook): đường chân trời nhiều lớp, sóng, lập diện toà tháp. */

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

/** Dải toà nhà xác định theo seed, nền y = base. */
export function skylinePath(seed: number, width: number, base: number, minH: number, maxH: number, minW = 26, maxW = 70) {
  const r = lcg(seed);
  let x = 0, d = `M0 ${base}`;
  while (x < width) {
    const w = minW + r() * (maxW - minW);
    const h = minH + r() * (maxH - minH);
    const top = base - h;
    d += ` L${x.toFixed(1)} ${top.toFixed(1)} L${(x + w).toFixed(1)} ${top.toFixed(1)}`;
    if (r() > 0.72) d += ` L${(x + w * 0.5).toFixed(1)} ${(top - 10 - r() * 14).toFixed(1)} L${(x + w).toFixed(1)} ${top.toFixed(1)}`;
    x += w;
    d += ` L${x.toFixed(1)} ${base}`;
  }
  return d + ` L${width} ${base} Z`;
}

export function Skyline({ seed, base = 200, minH = 30, maxH = 120, width = 1600, minW = 26, maxW = 70, className }: { seed: number; base?: number; minH?: number; maxH?: number; width?: number; minW?: number; maxW?: number; className?: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${width} ${base}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={skylinePath(seed, width, base, minH, maxH, minW, maxW)} fill="currentColor" />
    </svg>
  );
}

/** Đường sóng mảnh nhiều lớp, dùng làm lớp biển. */
export function SeaLines({ className, rows = 7 }: { className?: string; rows?: number }) {
  const lines = Array.from({ length: rows }, (_, i) => {
    const y = 8 + i * 17;
    const a = 3 + i * 0.8;
    let d = `M0 ${y}`;
    for (let x = 0; x < 1600; x += 80) d += ` q40 ${-a} 80 0`;
    return <path key={i} d={d} opacity={0.25 + i * 0.1} />;
  });
  return (
    <svg className={className} viewBox={`0 0 1600 ${rows * 17 + 12}`} preserveAspectRatio="none" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.1">
      {lines}
    </svg>
  );
}

/** Lập diện toà tháp bằng nét: thân, sàn, lan can, đường kích thước. Mọi nét có pathLength=1 để vẽ dần. */
export function TowerElevation({ className }: { className?: string }) {
  const floors = Array.from({ length: 35 }, (_, i) => 88 + (i + 1) * 12.2);
  return (
    <svg className={className} viewBox="0 0 520 600" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false">
      <path pathLength={1} d="M150 540V110l24-34h72l24 34v430" strokeWidth="1.8" strokeLinejoin="round" />
      <path pathLength={1} d="M150 120h120M150 540h120" />
      {floors.map((y, i) => <path key={i} pathLength={1} d={`M150 ${y.toFixed(1)}H${i % 3 === 0 ? 270 : 262}`} opacity={i % 3 === 0 ? 1 : 0.5} />)}
      <path pathLength={1} d="M190 120V540M230 120V540" opacity=".4" />
      <path pathLength={1} d="M70 540V330h60M300 540V380h80v160" strokeWidth="1.4" strokeLinejoin="round" />
      <path pathLength={1} d="M30 540h470" />
      <path pathLength={1} d="M40 556q10-8 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0" stroke="var(--cv-copper-l)" />
      <path pathLength={1} d="M110 90V540M104 90h12M104 232h12M104 386h12M104 540h12" stroke="var(--cv-copper-l)" />
      <path pathLength={1} d="M300 76h60M360 76v-24" opacity=".7" />
    </svg>
  );
}
