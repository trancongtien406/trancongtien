import type { CSSProperties } from "react";

/* Ảnh thật (Pexels, xem public/images/demos/banh-mi-tang/CREDITS.md). Ổ bánh đã tách nền; 6 lớp là các dải cắt ngang từ chính ảnh đó. */
const BASE = "/images/demos/banh-mi-tang";

export const LAYERS = [
  { key: "top", name: "Nắp bánh mì mè", note: "Nướng bơ, vàng ruộm", src: `${BASE}/lop-1.webp`, w: 793, h: 154 },
  { key: "veg", name: "Cà chua & hành tím", note: "Tươi giòn, ngâm chua ngọt", src: `${BASE}/lop-2.webp`, w: 812, h: 87 },
  { key: "bacon", name: "Ba chỉ nướng", note: "Ướp sả, mật ong", src: `${BASE}/lop-3.webp`, w: 856, h: 80 },
  { key: "cheese", name: "Phô mai tan chảy", note: "Hai lát, phủ kín", src: `${BASE}/lop-4.webp`, w: 927, h: 80 },
  { key: "patty", name: "Gà chiên giòn & xà lách", note: "Tẩm bột, chiên vàng", src: `${BASE}/lop-5.webp`, w: 1045, h: 81 },
  { key: "bottom", name: "Đế bánh phết bơ tỏi", note: "Nướng xém mặt trong", src: `${BASE}/lop-6.webp`, w: 1100, h: 92 },
] as const;

export function LayerImg({ i }: { i: number }) {
  const l = LAYERS[i];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={l.src} alt="" width={l.w} height={l.h} loading="lazy" decoding="async" draggable={false} style={{ width: `${(l.w / 1100) * 100}%`, height: "auto", display: "block", margin: "0 auto" }} />
  );
}

/** Ổ bánh nguyên chiếc (ảnh thật đã tách nền). */
export function BurgerStatic({ className, style, eager = false }: { className?: string; style?: CSSProperties; eager?: boolean; crispy?: boolean; uid?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} style={style} src={`${BASE}/burger.webp`} alt="" width={1100} height={574} loading={eager ? "eager" : "lazy"} decoding="async" draggable={false} aria-hidden="true" />
  );
}

export function PhotoTile({ src, className, alt = "", eager = false }: { src: string; className?: string; alt?: string; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={`${BASE}/${src}`} alt={alt} width={560} height={560} loading={eager ? "eager" : "lazy"} decoding="async" draggable={false} />
  );
}

export function Roundel({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30" fill="#f26b1d" stroke="#fff" strokeWidth="2.5" strokeDasharray="3 3" />
      <circle cx="32" cy="32" r="22" fill="#d9511a" />
      <path d="M16 36c0-10 7-16 16-16s16 6 16 16H16Z" fill="#ffe0a0" />
      <rect x="14" y="38" width="36" height="5" rx="2.5" fill="#4b2616" />
      <rect x="16" y="45" width="32" height="5" rx="2.5" fill="#ffe0a0" />
    </svg>
  );
}
