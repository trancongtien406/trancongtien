import { type MaterialId, type StoneId, type TypeId } from "../data/pricing";

const METAL: Record<MaterialId, [string, string, string, string]> = {
  g10: ["#efd88a", "#c9a53c", "#8f7119", "#e0c566"],
  g14: ["#f3dd83", "#d2ab2e", "#977712", "#e7c95a"],
  g18: ["#f8e28a", "#dcb02a", "#9d7a0f", "#eecb55"],
  w14: ["#fbfbfa", "#cfd2d6", "#8c9298", "#eceef0"],
  w18: ["#ffffff", "#d6d9dd", "#8f959b", "#f2f3f5"],
  s925: ["#f1f1f0", "#bfc3c8", "#868b91", "#dde0e3"],
};
const STONE: Record<Exclude<StoneId, "none">, [string, string, string]> = {
  syn: ["#ffffff", "#d8ebfb", "#8db4d9"],
  nat: ["#effffa", "#9fe0cf", "#4f9f8c"],
};

function Gem({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const d = `M${cx - r * 0.9} ${cy - r * 0.15} L${cx - r * 0.5} ${cy - r * 0.75} H${cx + r * 0.5} L${cx + r * 0.9} ${cy - r * 0.15} L${cx} ${cy + r}Z`;
  return (
    <g>
      <path d={d} fill={fill} stroke="rgba(255,255,255,.65)" strokeWidth="1" strokeLinejoin="round" />
      <path
        d={`M${cx - r * 0.9} ${cy - r * 0.15} H${cx + r * 0.9} M${cx - r * 0.5} ${cy - r * 0.75} L${cx - r * 0.22} ${cy - r * 0.15} L${cx} ${cy + r} M${cx + r * 0.5} ${cy - r * 0.75} L${cx + r * 0.22} ${cy - r * 0.15} L${cx} ${cy + r} M${cx - r * 0.22} ${cy - r * 0.15} L${cx} ${cy - r * 0.75} L${cx + r * 0.22} ${cy - r * 0.15}`}
        fill="none"
        stroke="rgba(255,255,255,.55)"
        strokeWidth=".8"
      />
      <path className="kn-twinkle" d={`M${cx + r * 0.9} ${cy - r * 1.2} q0 ${r * 0.5} ${r * 0.5} ${r * 0.5} q-${r * 0.5} 0 -${r * 0.5} ${r * 0.5} q0 -${r * 0.5} -${r * 0.5} -${r * 0.5} q${r * 0.5} 0 ${r * 0.5} -${r * 0.5}z`} fill="#fff7d6" />
    </g>
  );
}

/** Sơ đồ xem trước: hình vẽ đơn giản theo loại, màu theo chất liệu, tỉ lệ theo kích cỡ, viên đá theo cỡ đá. */
export function Preview({ uid, type, material, stone, stoneMm, size, finish }: { uid: string; type: TypeId; material: MaterialId; stone: StoneId; stoneMm: number; size: number; finish: string }) {
  const m = METAL[material];
  const g = `${uid}-m`;
  const gs = `${uid}-s`;
  const hi = `${uid}-h`;
  const gemFill = stone === "none" ? "none" : `url(#${gs})`;
  const gr = 7 + stoneMm * 3.1;
  const satin = finish === "satin";
  const engrave = finish === "engrave";
  const sw = (n: number) => n;
  return (
    <svg viewBox="0 0 400 340" role="img" aria-label="Sơ đồ xem trước cấu hình trang sức" className="kn-prev" data-type={type} data-material={material} data-stone={stone}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={m[0]} />
          <stop offset=".38" stopColor={m[1]} />
          <stop offset=".72" stopColor={m[2]} />
          <stop offset="1" stopColor={m[3]} />
        </linearGradient>
        {stone !== "none" ? (
          <linearGradient id={gs} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={STONE[stone][0]} />
            <stop offset=".55" stopColor={STONE[stone][1]} />
            <stop offset="1" stopColor={STONE[stone][2]} />
          </linearGradient>
        ) : null}
        <radialGradient id={hi} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#c9a227" stopOpacity=".22" />
          <stop offset="1" stopColor="#c9a227" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="180" rx="190" ry="150" fill={`url(#${hi})`} />
      {type === "ring" ? (() => {
        const sc = 0.8 + (size - 8) * 0.018;
        const R = 92 * sc;
        const cy = 196;
        const top = cy - R;
        return (
          <g>
            <circle cx="200" cy={cy} r={R} fill="none" stroke={`url(#${g})`} strokeWidth={sw(15 * sc + 3)} />
            {!satin ? <path d={`M${200 - R * 0.8} ${cy - R * 0.55} A${R} ${R} 0 0 1 ${200 - R * 0.2} ${cy - R * 0.98}`} fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2.2" strokeLinecap="round" /> : null}
            {engrave ? <circle cx="200" cy={cy} r={R} fill="none" stroke="rgba(30,20,0,.55)" strokeWidth="2" strokeDasharray="3 7" /> : null}
            <path d={`M${200 - 20} ${top - 2} h40 l-6 -18 h-28z`} fill={`url(#${g})`} />
            {stone !== "none" ? <Gem cx={200} cy={top - 20 - gr * 0.6} r={gr} fill={gemFill} /> : <circle cx="200" cy={top - 22} r="9" fill={`url(#${g})`} />}
          </g>
        );
      })() : null}
      {type === "pendant" ? (() => {
        const depth = 150 + (size - 40) * 3.6;
        const yb = 40 + depth * 0.5 + 6;
        return (
          <g>
            <path d={`M70 30 Q200 ${40 + depth} 330 30`} fill="none" stroke={`url(#${g})`} strokeWidth="4.5" strokeLinecap="round" strokeDasharray="7 3.2" />
            <circle cx="200" cy={yb} r="7" fill="none" stroke={`url(#${g})`} strokeWidth="3" />
            <path d={`M200 ${yb + 6} C ${200 + 34} ${yb + 40}, ${200 + 38} ${yb + 84}, 200 ${yb + 112} C ${200 - 38} ${yb + 84}, ${200 - 34} ${yb + 40}, 200 ${yb + 6}Z`} fill={`url(#${g})`} />
            {engrave ? <path d={`M200 ${yb + 22} V${yb + 92}`} stroke="rgba(30,20,0,.5)" strokeWidth="2" strokeDasharray="4 5" /> : null}
            {!satin ? <path d={`M${200 - 16} ${yb + 34} C ${200 - 22} ${yb + 56}, ${200 - 18} ${yb + 74}, ${200 - 8} ${yb + 90}`} fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="2.2" strokeLinecap="round" /> : null}
            {stone !== "none" ? <Gem cx={200} cy={yb + 56} r={Math.min(gr, 26)} fill={gemFill} /> : null}
          </g>
        );
      })() : null}
      {type === "earring" ? (() => {
        const r = 18 + (size - 10) * 2.4;
        return (
          <g>
            {[118, 282].map((x) => (
              <g key={x}>
                <circle cx={x} cy="68" r="5" fill={`url(#${g})`} />
                <circle cx={x} cy={96 + r} r={r} fill="none" stroke={`url(#${g})`} strokeWidth="9" />
                {engrave ? <circle cx={x} cy={96 + r} r={r} fill="none" stroke="rgba(30,20,0,.5)" strokeWidth="2" strokeDasharray="3 6" /> : null}
                {!satin ? <path d={`M${x - r * 0.75} ${96 + r - r * 0.5} A${r} ${r} 0 0 1 ${x - r * 0.1} ${96 + 0.02 * r}`} fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round" /> : null}
                {stone !== "none" ? <Gem cx={x} cy={96 + 2 * r + 2} r={Math.min(gr * 0.8, 20)} fill={gemFill} /> : null}
              </g>
            ))}
          </g>
        );
      })() : null}
      {type === "bracelet" ? (() => {
        const rx = 105 + (size - 16) * 11;
        const ry = 66;
        return (
          <g>
            <ellipse cx="200" cy="190" rx={rx} ry={ry} fill="none" stroke={`url(#${g})`} strokeWidth="13" strokeDasharray="15 4" strokeLinecap="round" />
            <ellipse cx="200" cy="190" rx={rx} ry={ry} fill="none" stroke="rgba(0,0,0,.28)" strokeWidth="2" strokeDasharray="15 4" transform="translate(0 4)" />
            {!satin ? <path d={`M${200 - rx * 0.6} ${190 + ry * 0.8} A${rx} ${ry} 0 0 0 ${200 + rx * 0.6} ${190 + ry * 0.8}`} fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" /> : null}
            <rect x="188" y={190 + ry - 12} width="24" height="22" rx="4" fill={`url(#${g})`} />
            {stone !== "none" ? <Gem cx={200} cy={190 + ry - 1} r={Math.min(gr, 22)} fill={gemFill} /> : null}
          </g>
        );
      })() : null}
    </svg>
  );
}
