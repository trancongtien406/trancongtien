/** Gốm vẽ bằng SVG thuần: thân + men nhúng + bóng trụ. Không dùng ảnh. */
export type Kind = "vase" | "bowl" | "cup" | "plate" | "jar" | "teapot" | "mug" | "bottle";

const BODY: Record<Kind, string> = {
  vase: "M82 18H118C118 40 114 52 108 62C146 84 170 120 170 160C170 206 138 226 100 226C62 226 30 206 30 160C30 120 54 84 92 62C86 52 82 40 82 18Z",
  bowl: "M16 84H184C184 148 150 196 100 196C50 196 16 148 16 84Z M70 196H130V214H70Z",
  cup: "M42 76H158L148 170C146 192 128 206 100 206C72 206 54 192 52 170Z",
  plate: "M6 126C6 108 48 98 100 98C152 98 194 108 194 126C194 150 152 164 100 164C48 164 6 150 6 126Z",
  jar: "M70 28H130V48C150 60 158 88 158 120V188C158 214 134 226 100 226C66 226 42 214 42 188V120C42 88 50 60 70 48Z",
  teapot: "M100 66C64 66 40 94 40 128C40 170 64 202 100 202C136 202 160 170 160 128C160 94 136 66 100 66Z M154 118C184 112 194 92 182 74L168 84C174 94 168 104 150 108Z M46 112C14 104 8 172 48 166L50 152C32 156 26 120 50 124Z",
  mug: "M48 66H152V176C152 200 132 212 100 212C68 212 48 200 48 176Z M150 90C190 84 192 156 150 150L150 138C170 142 172 100 150 104Z",
  bottle: "M88 14H112V70C140 90 150 120 150 170C150 206 130 224 100 224C70 224 50 206 50 170C50 120 60 90 88 70Z",
};
const TOP: Record<Kind, number> = { vase: 60, bowl: 84, cup: 76, plate: 98, jar: 28, teapot: 66, mug: 66, bottle: 14 };

export function Vessel({ kind, base, glaze, dip, id, label }: { kind: Kind; base: string; glaze: string; dip: number; id: string; label?: string }) {
  const y = TOP[kind] + dip;
  return (
    <svg viewBox="0 0 200 240" width="100%" height="100%" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      <defs>
        <clipPath id={`c${id}`}><path d={BODY[kind]} /></clipPath>
        <linearGradient id={`s${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".34" />
          <stop offset=".28" stopColor="#fff" stopOpacity=".3" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".42" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="232" rx="70" ry="6" fill="#000" opacity=".22" />
      <g clipPath={`url(#c${id})`}>
        <rect width="200" height="240" fill={base} />
        <path d={`M0 0H200V${y}C170 ${y + 14} 150 ${y - 6} 120 ${y + 10}C90 ${y + 24} 60 ${y - 4} 36 ${y + 12}C20 ${y + 20} 8 ${y + 6} 0 ${y + 10}Z`} fill={glaze} />
        <path d="M20 150H190M20 166H190" stroke="#000" strokeOpacity=".12" strokeWidth="2" />
        <rect width="200" height="240" fill={`url(#s${id})`} />
      </g>
    </svg>
  );
}
