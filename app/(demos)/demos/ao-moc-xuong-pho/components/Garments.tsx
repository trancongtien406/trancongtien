import { useId } from "react";

/* Áo vẽ bằng SVG (viewBox 300x380), có mặt trước/sau. Không dùng ảnh người khác. */

export type Kind = "tee" | "tank" | "shirt" | "varsity" | "denim" | "jersey";

export interface Pal {
  body: string;
  trim: string;
  panel: string;
  ink: string;
  accent: string;
}

export interface Colorway {
  name: string; // tên thẻ treo
  swatch: string; // màu thẻ
  tagInk: string;
  wall: string; // tông tường khi xem chi tiết
  pal: Pal;
}

export interface Product {
  id: string;
  kind: Kind;
  name: string; // tên đầy đủ
  short: string; // chú thích ở giá treo
  price: number;
  note: string;
  cat: "Áo thun" | "Áo khoác" | "Sơ mi" | "Áo đấu";
  colors: Colorway[];
  backText?: string;
}

const WALL = {
  warm: "#e9dcbc",
  cool: "#dcd9ea",
  rose: "#eed3d8",
  grey: "#dfd5d3",
  sand: "#e6ddd0",
};

export const PRODUCTS: Product[] = [
  {
    id: "so-mi-vet-do", kind: "shirt", name: "Sơ mi tay dài Vết Đỏ", short: "Sơ mi tay dài Vết Đỏ — Trắng", price: 620000, cat: "Sơ mi",
    note: "Poplin cotton 120gsm, nút xà cừ, vết sơn đỏ in tay từng chiếc",
    colors: [
      { name: "TRẮNG", swatch: "#f2efe8", tagInk: "#222", wall: WALL.sand, pal: { body: "#f6f4ee", trim: "#e5e1d6", panel: "#fff", ink: "#1a1a1a", accent: "#b3121b" } },
      { name: "KEM", swatch: "#e6d6ae", tagInk: "#222", wall: WALL.warm, pal: { body: "#ecdfb9", trim: "#d9c993", panel: "#f3e9c9", ink: "#1a1a1a", accent: "#b3121b" } },
    ],
  },
  {
    id: "thun-la-ta", kind: "tee", name: "Áo thun Là Ta Không Phải Họ", short: "Áo thun Là Ta Không Phải Họ — Đen", price: 390000, cat: "Áo thun",
    note: "Cotton 260gsm giặt wash, dáng boxy, chữ in nứt phủ cao su",
    backText: "LÀ TA",
    colors: [
      { name: "ĐEN", swatch: "#2b2b2c", tagInk: "#fff", wall: WALL.grey, pal: { body: "#3a3938", trim: "#2c2b2b", panel: "#444", ink: "#d8d6d2", accent: "#d8d6d2" } },
      { name: "HỒNG", swatch: "#f08ca4", tagInk: "#222", wall: WALL.rose, pal: { body: "#ef9fb3", trim: "#e58198", panel: "#f3b0c1", ink: "#7a1d33", accent: "#7a1d33" } },
      { name: "VÀNG", swatch: "#f6e11f", tagInk: "#222", wall: WALL.warm, pal: { body: "#f7e32a", trim: "#e5cf12", panel: "#f9ea58", ink: "#222", accent: "#222" } },
    ],
  },
  {
    id: "ba-lo-son-loang", kind: "tank", name: "Áo ba lỗ Sơn Loang Rách", short: "Áo ba lỗ Sơn Loang Rách — Đen", price: 340000, cat: "Áo thun",
    note: "Cotton wash đá, rách tay thủ công, vẩy sơn trắng",
    backText: "ÁO MỘC",
    colors: [
      { name: "ĐEN", swatch: "#4a4948", tagInk: "#fff", wall: WALL.grey, pal: { body: "#575554", trim: "#3d3c3b", panel: "#666", ink: "#ece9e2", accent: "#ece9e2" } },
    ],
  },
  {
    id: "bong-chay", kind: "varsity", name: "Áo khoác bóng chày Áo Mộc", short: "Áo khoác bóng chày Áo Mộc — Đen", price: 1290000, cat: "Áo khoác",
    note: "Thân nỉ len, tay giả da kem, bo kẻ đỏ, thêu nổi sau lưng",
    colors: [
      { name: "ĐEN", swatch: "#1b1b1d", tagInk: "#fff", wall: WALL.grey, pal: { body: "#18181a", trim: "#c8202c", panel: "#f3ecdb", ink: "#111", accent: "#c8202c" } },
      { name: "XANH", swatch: "#1f3d78", tagInk: "#fff", wall: WALL.cool, pal: { body: "#1d3566", trim: "#e8c640", panel: "#f3ecdb", ink: "#111", accent: "#e8c640" } },
    ],
  },
  {
    id: "denim-nhat", kind: "denim", name: "Sơ mi denim Rửa Nhạt", short: "Sơ mi denim Rửa Nhạt — Xanh", price: 560000, cat: "Sơ mi",
    note: "Denim 6oz mềm, tay ngắn, túi ngực, đường chỉ vàng",
    colors: [
      { name: "XANH", swatch: "#7fa1c6", tagInk: "#111", wall: WALL.cool, pal: { body: "#7fa1c6", trim: "#6485ab", panel: "#9bb8d8", ink: "#e8c640", accent: "#e8c640" } },
      { name: "ĐEN", swatch: "#2d2f33", tagInk: "#fff", wall: WALL.grey, pal: { body: "#34363a", trim: "#26282b", panel: "#4a4d52", ink: "#e8c640", accent: "#e8c640" } },
    ],
  },
  {
    id: "ao-dau", kind: "jersey", name: "Áo đấu bóng đá Áo Mộc", short: "Áo đấu bóng đá Áo Mộc — Vàng", price: 480000, cat: "Áo đấu",
    note: "Lưới thoáng khí, sọc dệt chìm, số 25 in nhiệt",
    backText: "25",
    colors: [
      { name: "VÀNG", swatch: "#f2c814", tagInk: "#222", wall: WALL.warm, pal: { body: "#f6c70f", trim: "#2fa12b", panel: "#35ad2e", ink: "#2fa12b", accent: "#fff" } },
      { name: "XANH", swatch: "#1d52d6", tagInk: "#fff", wall: WALL.cool, pal: { body: "#1f56e0", trim: "#f6c70f", panel: "#7bd02a", ink: "#7bd02a", accent: "#fff" } },
    ],
  },
  {
    id: "thun-logo-cao-su", kind: "tee", name: "Áo thun Logo Cao Su", short: "Áo thun Logo Cao Su — Trắng", price: 360000, cat: "Áo thun",
    note: "Cotton 240gsm, logo cao su đỏ nổi ngực trái",
    backText: "ÁO MỘC",
    colors: [
      { name: "TRẮNG", swatch: "#f3f1ec", tagInk: "#222", wall: WALL.sand, pal: { body: "#f7f6f2", trim: "#e7e4dc", panel: "#fff", ink: "#d3212f", accent: "#d3212f" } },
      { name: "ĐEN", swatch: "#2b2b2c", tagInk: "#fff", wall: WALL.grey, pal: { body: "#2c2c2d", trim: "#1f1f20", panel: "#3a3a3b", ink: "#d3212f", accent: "#d3212f" } },
    ],
  },
];

export const fmtVnd = (n: number) => `${new Intl.NumberFormat("vi-VN").format(n)}đ`;

const TEE = "M112 46 L58 68 L10 142 L50 170 L74 136 L74 322 Q150 336 226 322 L226 136 L250 170 L290 142 L242 68 L188 46 Q150 80 112 46 Z";
const DENIM = "M110 46 L58 68 L26 128 L62 150 L76 120 L76 326 Q150 338 224 326 L224 120 L238 150 L274 128 L242 68 L190 46 Q150 72 110 46 Z";
const TANK = "M108 46 L128 46 Q150 104 172 46 L192 46 L208 116 Q228 138 226 170 L224 322 Q150 338 76 322 L74 170 Q72 138 92 116 Z";

function Hanger({ id }: { id: string }) {
  return (
    <g>
      <path d="M150 44V30c0-14 20-16 20-3 0 8-8 9-12 6" stroke="#9a9ca2" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <g stroke={`url(#${id}h)`} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M150 46Q112 58 68 80Q66 84 72 84L228 84Q234 84 232 80Q188 58 150 46Z" />
      </g>
      <path d="M74 82Q150 72 226 82" stroke="rgba(255,255,255,.28)" strokeWidth="1.4" fill="none" />
    </g>
  );
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}h`} x1="0" x2="1">
        <stop offset="0" stopColor="#6b3519" />
        <stop offset=".5" stopColor="#9a5a33" />
        <stop offset="1" stopColor="#5a2c14" />
      </linearGradient>
      <linearGradient id={`${id}s`} x1="0" x2="1" y1="0" y2="0.35">
        <stop offset="0" stopColor="#fff" stopOpacity=".16" />
        <stop offset=".45" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".2" />
      </linearGradient>
      <filter id={`${id}d`} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -7 4.1" result="m" />
        <feComposite in="SourceGraphic" in2="m" operator="in" />
      </filter>
    </defs>
  );
}

function Folds({ d = "M96 170Q110 220 100 300M204 170Q190 220 202 300M150 200Q146 250 152 320" }: { d?: string }) {
  return <path d={d} stroke="rgba(0,0,0,.12)" strokeWidth="2" fill="none" strokeLinecap="round" />;
}

function Splat({ x, y, c, s = 1 }: { x: number; y: number; c: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={c}>
      <circle r="5" />
      <circle cx="9" cy="-4" r="2.2" />
      <circle cx="-8" cy="6" r="2.6" />
      <circle cx="4" cy="11" r="1.6" />
      <circle cx="-12" cy="-6" r="1.4" />
    </g>
  );
}

export function Garment({ kind, pal, back = false, backText = "", title }: { kind: Kind; pal: Pal; back?: boolean; backText?: string; title?: string }) {
  const uid = useId().replace(/:/g, "");
  const sh = `url(#${uid}s)`;
  const dist = `url(#${uid}d)`;
  let art: React.ReactNode = null;

  if (kind === "tee") {
    art = (
      <g>
        <path d={TEE} fill={pal.body} />
        <path d={TEE} fill={sh} />
        <Folds />
        <path d="M112 47Q150 90 188 47" stroke={pal.trim} strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M112 47Q150 90 188 47" stroke="rgba(0,0,0,.15)" strokeWidth="1.2" fill="none" />
        {!back && pal.ink === "#d3212f" && (
          <g transform="translate(196 112)">
            <path d="M0 -14c6 0 10 4 10 9s-3 9-10 14c-7-5-10-9-10-14s4-9 10-9z" fill="#d3212f" />
            <circle cx="-3" cy="-6" r="2" fill="#fff" opacity=".5" />
          </g>
        )}
        {!back && pal.ink !== "#d3212f" && (
          <g filter={dist} fill={pal.ink} fontWeight="900" textAnchor="middle" fontFamily="var(--am-f),Archivo,sans-serif">
            <text x="150" y="152" fontSize="44" transform="scale(1 1.05)" letterSpacing="-1">LÀ TA</text>
            <text x="150" y="192" fontSize="34" letterSpacing="-0.5">KHÔNG</text>
            <text x="150" y="232" fontSize="34" letterSpacing="-0.5">PHẢI HỌ.</text>
          </g>
        )}
        {back && <path d="M112 47Q150 64 188 47" stroke="rgba(0,0,0,.25)" strokeWidth="2" fill="none" />}
        {back && (
          <g fill={pal.ink} fontWeight="900" textAnchor="middle" fontFamily="var(--am-f),Archivo,sans-serif" filter={pal.ink === "#d3212f" ? undefined : dist}>
            <text x="150" y="120" fontSize="15" letterSpacing="3">{backText || "ÁO MỘC"}</text>
            <text x="150" y="240" fontSize="64" letterSpacing="-2">{pal.ink === "#d3212f" ? "ÁM" : "TA"}</text>
          </g>
        )}
        <rect x="140" y="304" width="20" height="9" rx="1" fill="rgba(0,0,0,.35)" opacity={back ? 0 : 0.0} />
      </g>
    );
  } else if (kind === "tank") {
    art = (
      <g>
        <path d={TANK} fill={pal.body} />
        <path d={TANK} fill={sh} />
        <Folds d="M96 190Q106 250 98 310M204 190Q196 250 204 310" />
        <path d="M128 46Q150 100 172 46" stroke={pal.trim} strokeWidth="8" fill="none" />
        <g fill="#1c1b1b" opacity=".85">
          <ellipse cx="108" cy="168" rx="4" ry="3" /><ellipse cx="198" cy="150" rx="3" ry="4" /><ellipse cx="120" cy="300" rx="6" ry="3" />
          <ellipse cx="186" cy="312" rx="7" ry="3" /><ellipse cx="146" cy="326" rx="9" ry="2.5" />
        </g>
        <g fill="#f3efe8">
          {[[110, 250, 2], [126, 280, 1.6], [180, 240, 2.2], [196, 270, 1.4], [150, 290, 1.8], [100, 220, 1.3], [208, 300, 2], [140, 310, 1.5], [170, 190, 1.2], [118, 196, 1.6]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}
        </g>
        {!back ? (
          <g filter={dist} fill={pal.ink} fontWeight="900" textAnchor="middle" fontFamily="var(--am-f),Archivo,sans-serif">
            <text x="150" y="160" fontSize="29" letterSpacing="-.5">ÁO MỘC</text>
            <text x="150" y="176" fontSize="9" letterSpacing=".6">LÀ TA, KHÔNG PHẢI HỌ.</text>
          </g>
        ) : (
          <g filter={dist} fill={pal.ink} fontWeight="900" textAnchor="middle" fontFamily="var(--am-f),Archivo,sans-serif">
            <text x="150" y="150" fontSize="12" letterSpacing="4">{backText}</text>
            <text x="150" y="230" fontSize="40" letterSpacing="-1">XUỐNG PHỐ</text>
          </g>
        )}
      </g>
    );
  } else if (kind === "shirt") {
    const bodyP = "M104 52 L74 70 L68 332 Q150 346 232 332 L226 70 L196 52 L150 70 Z";
    const slL = "M74 70 L34 122 L20 322 L54 330 L72 150 Z";
    const slR = "M226 70 L266 122 L280 322 L246 330 L228 150 Z";
    art = (
      <g>
        <path d={slL} fill={pal.trim} /><path d={slR} fill={pal.trim} />
        <path d={bodyP} fill={pal.body} />
        <path d={bodyP} fill={sh} /><path d={slL} fill={sh} /><path d={slR} fill={sh} />
        <Folds d="M96 150Q108 250 98 320M204 150Q192 250 202 320M50 150Q44 240 40 310M250 150Q256 240 260 310" />
        <path d="M104 52 L150 70 L134 100 L96 74 Z M196 52 L150 70 L166 100 L204 74 Z" fill={pal.panel} stroke="rgba(0,0,0,.18)" strokeWidth="1.2" />
        {!back && <path d="M150 72V338" stroke="rgba(0,0,0,.2)" strokeWidth="1.6" />}
        {!back && [110, 150, 190, 230, 270, 310].map((y) => <circle key={y} cx="150" cy={y} r="2.6" fill="#d8d3c4" stroke="rgba(0,0,0,.25)" strokeWidth=".8" />)}
        {!back && <path d="M178 118h30v34h-30z" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="1.4" />}
        {back && <path d="M110 80Q150 100 190 80V108Q150 96 110 108Z" fill="rgba(0,0,0,.08)" />}
        <g fill={pal.accent}>
          <path d="M104 150c3 20 4 40 2 60 3 4 7 4 8 0-1-20-3-40-10-60z" />
          <Splat x={92} y={164} c={pal.accent} s={1.1} /><Splat x={118} y={190} c={pal.accent} s={0.8} />
          <Splat x={40} y={286} c={pal.accent} s={1.4} /><Splat x={30} y={266} c={pal.accent} s={0.8} /><Splat x={52} y={304} c={pal.accent} s={0.9} />
          <Splat x={262} y={190} c={pal.accent} s={0.9} />
        </g>
        {back && (
          <g fill={pal.accent} fontWeight="900" textAnchor="middle" fontFamily="var(--am-f),Archivo,sans-serif">
            <text x="150" y="170" fontSize="13" letterSpacing="5">VẾT ĐỎ</text>
          </g>
        )}
      </g>
    );
  } else if (kind === "varsity") {
    const bodyP = "M104 50 L60 74 L54 150 L64 332 L236 332 L246 150 L240 74 L196 50 Q150 76 104 50 Z";
    const slL = "M60 74 L18 134 L8 296 L54 304 L70 150 Z";
    const slR = "M240 74 L282 134 L292 296 L246 304 L230 150 Z";
    const stripe = (x: number, y: number, w: number, h: number) => (
      <g>
        <rect x={x} y={y} width={w} height={h} fill="#1b1b1d" />
        <rect x={x} y={y + h * 0.22} width={w} height={h * 0.18} fill="#f3ecdb" />
        <rect x={x} y={y + h * 0.6} width={w} height={h * 0.18} fill={pal.trim} />
      </g>
    );
    art = (
      <g>
        <path d={slL} fill={pal.panel} /><path d={slR} fill={pal.panel} />
        <path d={bodyP} fill={pal.body} />
        <path d={bodyP} fill={sh} /><path d={slL} fill={sh} /><path d={slR} fill={sh} />
        {stripe(64, 320, 172, 22)}
        <g transform="rotate(-6 31 300)">{stripe(10, 292, 46, 18)}</g>
        <g transform="rotate(6 269 300)">{stripe(246, 292, 46, 18)}</g>
        <path d="M104 50Q150 78 196 50" stroke="#1b1b1d" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M108 50Q150 74 192 50" stroke="#f3ecdb" strokeWidth="4" fill="none" />
        <path d="M112 53Q150 76 188 53" stroke={pal.trim} strokeWidth="3" fill="none" />
        {!back ? (
          <g>
            <path d="M150 74V320" stroke="rgba(255,255,255,.14)" strokeWidth="2" />
            {[96, 140, 184, 228, 272].map((y) => <circle key={y} cx="150" cy={y} r="5.5" fill="#cfd0d3" stroke="rgba(0,0,0,.4)" strokeWidth="1" />)}
            <ellipse cx="104" cy="130" rx="22" ry="17" fill={pal.trim} stroke="#f3ecdb" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="104" y="134" fontSize="8.5" fontWeight="900" fill="#fff" textAnchor="middle" fontFamily="var(--am-f),Archivo,sans-serif">ÁO MỘC</text>
            <path d="M184 118h30v30h-30z" fill={pal.trim} />
            <text x="199" y="141" fontSize="22" fontWeight="900" fill="#fff" textAnchor="middle" fontFamily="var(--am-f),Archivo,sans-serif">AM</text>
            <path d="M92 214h14v38H92zM194 214h14v38h-14z" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.4" />
          </g>
        ) : (
          <g fontFamily="var(--am-f),Archivo,sans-serif" fontWeight="900" textAnchor="middle">
            <ellipse cx="150" cy="170" rx="56" ry="46" fill={pal.trim} stroke="#f3ecdb" strokeWidth="2" />
            <text x="150" y="168" fontSize="30" fill="#fff" letterSpacing="-1">ÁO MỘC</text>
            <text x="150" y="190" fontSize="10" fill="#f3ecdb" letterSpacing="3">XUỐNG PHỐ</text>
          </g>
        )}
        <text x="270" y="230" fontSize="30" fill="#141414" fontStyle="italic" fontFamily="Georgia,'Times New Roman',serif" transform="rotate(-82 270 230)" textAnchor="start">áo mộc</text>
      </g>
    );
  } else if (kind === "denim") {
    art = (
      <g>
        <path d={DENIM} fill={pal.body} />
        <path d={DENIM} fill={sh} />
        <Folds />
        <path d="M110 46 L150 74 L128 100 L98 70 Z M190 46 L150 74 L172 100 L202 70 Z" fill={pal.panel} stroke="rgba(0,0,0,.25)" strokeWidth="1.2" />
        <path d="M150 76V334" stroke={pal.ink} strokeWidth="1.2" strokeDasharray="4 3" opacity=".8" />
        {!back && [112, 160, 208, 256, 304].map((y) => <circle key={y} cx="150" cy={y} r="3" fill="#d9dce0" stroke="rgba(0,0,0,.35)" strokeWidth=".8" />)}
        {!back && (
          <g>
            <path d="M172 112h38v42l-19 9-19-9z" fill={pal.panel} stroke={pal.ink} strokeWidth="1.2" strokeDasharray="3 2" />
            <rect x="204" y="152" width="9" height="16" fill={pal.ink} />
          </g>
        )}
        {back && <path d="M90 100Q150 118 210 100" stroke={pal.ink} strokeWidth="1.2" strokeDasharray="4 3" fill="none" opacity=".8" />}
        <path d="M76 326Q150 338 224 326" stroke={pal.ink} strokeWidth="1.2" strokeDasharray="4 3" fill="none" opacity=".8" />
        <g fill="rgba(255,255,255,.16)">
          <ellipse cx="116" cy="200" rx="22" ry="48" /><ellipse cx="190" cy="270" rx="20" ry="36" />
        </g>
      </g>
    );
  } else {
    // jersey
    art = (
      <g>
        <path d={TEE} fill={pal.body} />
        <path d="M74 136L74 322Q112 330 112 322Q96 230 106 176Q88 172 74 136Z M226 136L226 322Q188 330 188 322Q204 230 194 176Q212 172 226 136Z" fill={pal.panel} />
        <path d="M58 68L10 142L50 170L74 136L84 90Z M242 68L290 142L250 170L226 136L216 90Z" fill={pal.panel} />
        <path d="M112 46Q106 100 74 136M188 46Q194 100 226 136" stroke={pal.panel} strokeWidth="12" fill="none" />
        <path d={TEE} fill={sh} />
        <g stroke="rgba(0,0,0,.09)" strokeWidth="1">
          {Array.from({ length: 22 }).map((_, i) => <path key={i} d={`M112 ${130 + i * 9}H188`} />)}
        </g>
        <path d="M112 47Q150 90 188 47" stroke={pal.trim} strokeWidth="9" fill="none" strokeLinecap="round" />
        {!back ? (
          <g fontFamily="var(--am-f),Archivo,sans-serif" fontWeight="900" textAnchor="middle" fontStyle="italic">
            <text x="150" y="204" fontSize="36" fill={pal.ink} letterSpacing="-1">ÁO MỘC</text>
            <text x="150" y="222" fontSize="10" fill={pal.accent} letterSpacing="2.5" fontStyle="normal">XUỐNG PHỐ</text>
            <text x="116" y="130" fontSize="17" fill="none" stroke={pal.ink} strokeWidth="1.4">25</text>
            <circle cx="186" cy="128" r="11" fill="none" stroke={pal.ink} strokeWidth="2" />
            <path d="M180 128h12M186 122v12" stroke={pal.ink} strokeWidth="2.4" />
          </g>
        ) : (
          <g fontFamily="var(--am-f),Archivo,sans-serif" fontWeight="900" textAnchor="middle">
            <text x="150" y="118" fontSize="13" fill={pal.ink} letterSpacing="4">LÀ TA</text>
            <text x="150" y="212" fontSize="98" fill="none" stroke={pal.ink} strokeWidth="3">25</text>
          </g>
        )}
      </g>
    );
  }

  return (
    <svg viewBox="0 0 300 380" width="100%" role="img" aria-label={title} focusable="false" style={{ display: "block", overflow: "visible" }}>
      <Defs id={uid} />
      <g transform="translate(0 18)">{art}</g>
      <g transform="translate(0 -4)"><Hanger id={uid} /></g>
    </svg>
  );
}
