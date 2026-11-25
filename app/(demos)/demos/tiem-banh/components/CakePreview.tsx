import { CREAMS, DECOS, FINISHES, FLAVORS, SIZES, type BuilderState } from "../data/builder";

const INK = "#46251A";
const sw = 3.4;

const lum = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const inkOn = (bg: string) => (lum(bg) > 0.25 ? INK : "#FFF3EC");

const SPR = ["#FF5E86", "#4FC79A", "#FFC933", "#8E6BFF", "#FF9B54"];
/** vị trí cốm xác định (không random để SSR/CSR khớp) */
const SPR_POS = Array.from({ length: 30 }, (_, i) => {
  const t = (i * 137.5 * Math.PI) / 180;
  const r = Math.sqrt((i + 1) / 30) * 0.86;
  return { x: Math.cos(t) * r, y: Math.sin(t) * r, rot: (i * 47) % 180, c: SPR[i % SPR.length] };
});

export function CakePreview({ state }: { state: BuilderState }) {
  const size = SIZES.find((s) => s.id === state.size) ?? SIZES[1];
  const flavor = FLAVORS.find((f) => f.id === state.flavor) ?? FLAVORS[0];
  const cream = CREAMS.find((c) => c.id === state.cream) ?? CREAMS[0];
  const finish = FINISHES.find((f) => f.id === state.finish) ?? FINISHES[0];
  const has = (id: string) => state.decos.includes(id);
  const cx = 180;
  const plateY = 284;
  const heights = size.tiers === 2 ? [78, 64] : [size.diameters[0] > 200 ? 86 : 78];
  // y của tâm elip đáy tầng i
  let base = plateY - 10;
  const tiers = size.diameters.map((w, i) => {
    const h = heights[i];
    const ry = w * 0.085;
    const yb = base;
    const yt = yb - h;
    base = yt + 2;
    return { w, h, ry, yb, yt, x0: cx - w / 2, x1: cx + w / 2 };
  });
  const top = tiers[tiers.length - 1];
  const bottom = tiers[0];
  const bodyFill = finish.id === "min" ? cream.color : flavor.sponge;
  const bodyInk = inkOn(bodyFill);
  const text = state.text.trim();
  const tSize = text.length <= 12 ? 26 : text.length <= 18 ? 21 : 17;
  const tW = bottom.w * 0.82;
  const needFit = text.length * tSize * 0.52 > tW;
  const faceTier = bottom;
  const textY = faceTier.yt + faceTier.h * (finish.id === "chay" ? 0.72 : 0.6) + faceTier.ry * 0.9;

  const dripsFor = (t: (typeof tiers)[number], seed: number) => {
    const n = Math.round(t.w / 26);
    const gap = t.w / n;
    return Array.from({ length: n }, (_, i) => {
      const len = 16 + ((i * 7 + seed * 5) % 5) * 9 + (i % 3 === 0 ? 8 : 0);
      return { x: t.x0 + gap * i + gap * 0.18, w: gap * 0.64, len };
    });
  };

  const body = (t: (typeof tiers)[number], k: number) => {
    const d = `M${t.x0} ${t.yt}V${t.yb}A${t.w / 2} ${t.ry} 0 0 0 ${t.x1} ${t.yb}V${t.yt}Z`;
    return (
      <g key={k} stroke={INK} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round">
        <path d={d} fill={bodyFill} />
        {finish.id === "bong" && (
          <g fill="none" stroke={cream.color} strokeWidth="7">
            <path d={`M${t.x0 + 1.5} ${t.yt + t.h * 0.36}A${t.w / 2} ${t.ry} 0 0 0 ${t.x1 - 1.5} ${t.yt + t.h * 0.36}`} />
            <path d={`M${t.x0 + 1.5} ${t.yt + t.h * 0.66}A${t.w / 2} ${t.ry} 0 0 0 ${t.x1 - 1.5} ${t.yt + t.h * 0.66}`} />
          </g>
        )}
        {finish.id === "chay" && (
          <>
            <g fill={INK} stroke={INK} strokeWidth="7">
              <rect x={t.x0} y={t.yt} width={t.w} height="12" />
              {dripsFor(t, k).map((d, i) => <rect key={i} x={d.x} y={t.yt} width={d.w} height={d.len} rx={d.w / 2} />)}
            </g>
            <g fill={cream.color} stroke="none" data-drip="1">
              <rect x={t.x0 + 1.5} y={t.yt} width={t.w - 3} height="12" />
              {dripsFor(t, k).map((d, i) => <rect key={i} x={d.x} y={t.yt} width={d.w} height={d.len} rx={d.w / 2} />)}
            </g>
          </>
        )}
        {finish.id === "min" && <path d={`M${t.x0 + 1.5} ${t.yb - 8}A${t.w / 2} ${t.ry} 0 0 0 ${t.x1 - 1.5} ${t.yb - 8}`} fill="none" strokeWidth="2" opacity=".35" />}
        <ellipse cx={cx} cy={t.yt} rx={t.w / 2} ry={t.ry} fill={cream.color} />
        {finish.id === "bong" && Array.from({ length: Math.round(t.w / 22) }, (_, i) => {
          const ang = Math.PI * (0.06 + (0.88 * i) / (Math.round(t.w / 22) - 1));
          const px = cx + Math.cos(ang) * (t.w / 2 - 8) * -1;
          const py = t.yt + Math.sin(ang) * (t.ry - 2) + 3;
          return <circle key={i} cx={px} cy={py} r="7.5" fill={cream.color} strokeWidth="2.6" />;
        })}
      </g>
    );
  };

  return (
    <svg viewBox={size.tiers === 2 ? "0 36 360 296" : "0 108 360 224"} role="img" aria-label={`Bản xem trước: bánh ${size.label}, vị ${flavor.label.toLowerCase()}, ${cream.label.toLowerCase()}, ${finish.label.toLowerCase()}${text ? `, chữ "${text}"` : ""}`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
      <ellipse cx={cx} cy={plateY + 8} rx="158" ry="22" fill="#FFF3EC" stroke={INK} strokeWidth={sw} />
      <ellipse cx={cx} cy={plateY + 6} rx="124" ry="14" fill="none" stroke={INK} strokeWidth="1.8" opacity=".25" />
      {tiers.map((t, i) => body(t, i))}
      {/* chữ viết lên bánh */}
      {text && (
        <text
          x={cx}
          y={textY}
          textAnchor="middle"
          fill={finish.id === "min" ? cream.ink : bodyInk}
          style={{ fontFamily: "var(--mk-display)", fontWeight: 800, fontSize: tSize }}
          {...(needFit ? { textLength: tW, lengthAdjust: "spacingAndGlyphs" as const } : {})}
        >
          {text}
        </text>
      )}
      {/* trang trí chân bánh */}
      {has("hoa") && Array.from({ length: 7 }, (_, i) => {
        const ang = Math.PI * (0.08 + (0.84 * i) / 6);
        const px = cx - Math.cos(ang) * (bottom.w / 2 - 4);
        const py = bottom.yb + Math.sin(ang) * bottom.ry + 2;
        return (
          <g key={i} stroke={INK} strokeWidth="2.6">
            <circle cx={px} cy={py} r="10" fill={i % 2 ? "#FF8FAE" : "#FFE27D"} />
            <path d={`M${px - 4} ${py}a4 4 0 1 1 4 4`} fill="none" />
          </g>
        );
      })}
      {/* trang trí mặt bánh */}
      <g stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {has("com") && SPR_POS.map((p, i) => (
          <rect key={i} x={cx + p.x * (top.w / 2 - 10) - 4} y={top.yt + p.y * (top.ry - 3) - 1.6} width="8" height="3.4" rx="1.7" fill={p.c} stroke="none" transform={`rotate(${p.rot} ${cx + p.x * (top.w / 2 - 10)} ${top.yt + p.y * (top.ry - 3)})`} />
        ))}
        {has("dau") && [-0.62, -0.2, 0.22, 0.62].map((k, i) => {
          const px = cx + k * (top.w / 2 - 14);
          const py = top.yt - 6 + (i % 2) * 6;
          return (
            <g key={i}>
              <path d={`M${px - 9} ${py - 3}c0-8 18-8 18 0c0 8-9 14-9 14s-9-6-9-14z`} fill="#FF4D6D" />
              <path d={`M${px - 5} ${py - 7}l5 -4 5 4`} fill="none" stroke="#2F9E6B" strokeWidth="3" />
            </g>
          );
        })}
        {has("macaron") && [["#FF8FAE", -26, 4], ["#8FE0BE", 4, 8], ["#FFE27D", 32, 2]].map(([c, dx, dy], i) => {
          const px = cx + (dx as number);
          const py = top.yt - 8 + (dy as number);
          return (
            <g key={i}>
              <path d={`M${px - 13} ${py}a13 9 0 0 1 26 0z`} fill={c as string} />
              <rect x={px - 14} y={py} width="28" height="4" rx="2" fill="#FFF3EC" />
              <path d={`M${px - 13} ${py + 4}a13 9 0 0 0 26 0z`} fill={c as string} />
            </g>
          );
        })}
        {has("sao") && [[-0.7, 0.1], [0.55, -0.35], [0.1, 0.45], [-0.25, -0.5]].map(([a, b], i) => {
          const px = cx + a * (top.w / 2 - 14);
          const py = top.yt + b * (top.ry - 2) - 3;
          return <path key={i} d={`M${px} ${py - 9}l2.6 6 6.4.4-5 4 1.8 6.3-5.8-3.6-5.8 3.6 1.8-6.3-5-4 6.4-.4z`} fill="#FFD23F" />;
        })}
      </g>
      {/* nến và cờ */}
      {has("nen") && (
        <g stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          {[-34, 0, 34].map((dx, i) => {
            const px = cx + dx * (top.w / 230 + 0.35);
            const py = top.yt - 2 - (i === 1 ? 4 : 0);
            return (
              <g key={i}>
                <rect x={px - 4} y={py - 30} width="8" height="30" rx="2" fill={["#FF8FAE", "#8FE0BE", "#FFE27D"][i]} />
                <path className="mkFlame" d={`M${px} ${py - 52}c6 8 7 12 0 20c-7-8-6-12 0-20z`} fill="#FFB020" style={{ transformOrigin: `${px}px ${py - 32}px`, animationDelay: `${i * 0.25}s` }} />
              </g>
            );
          })}
          <path d={`M${top.x0 - 10} ${top.yt - 46}Q${cx} ${top.yt - 8} ${top.x1 + 10} ${top.yt - 46}`} fill="none" strokeWidth="2.2" />
          {Array.from({ length: 6 }, (_, i) => {
            const t = (i + 0.7) / 6.4;
            const px = (1 - t) * (1 - t) * (top.x0 - 10) + 2 * (1 - t) * t * cx + t * t * (top.x1 + 10);
            const py = (1 - t) * (1 - t) * (top.yt - 46) + 2 * (1 - t) * t * (top.yt - 8) + t * t * (top.yt - 46);
            return <path key={i} d={`M${px - 8} ${py}L${px + 8} ${py}L${px} ${py + 17}z`} fill={["#FF8FAE", "#8FE0BE", "#FFE27D"][i % 3]} strokeWidth="2.2" />;
          })}
        </g>
      )}
    </svg>
  );
}
