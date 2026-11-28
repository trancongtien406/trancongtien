import type { CSSProperties } from "react";

export interface Palette {
  bg: string;
  leaf: string;
  leafDark: string;
  flower: string;
  accent: string;
}

export const PALETTES: Record<string, Palette> = {
  sen: { bg: "#f3efe4", leaf: "#7f9a6a", leafDark: "#3f5636", flower: "#e1b0a0", accent: "#c9694f" },
  truc: { bg: "#e7efdd", leaf: "#9cb88b", leafDark: "#42603a", flower: "#f1e3b8", accent: "#b88a2c" },
  mai: { bg: "#f8f1e2", leaf: "#a2a67a", leafDark: "#575c33", flower: "#f1c3bf", accent: "#c4524a" },
  cuc: { bg: "#efe6d4", leaf: "#6d8a6a", leafDark: "#2f4a35", flower: "#e8c473", accent: "#a66a1d" },
  lam: { bg: "#e4ece8", leaf: "#6f9a96", leafDark: "#2f5652", flower: "#f2d3c4", accent: "#cc7a5c" },
};

const LEAF = "M0 0C16-24 44-28 62-10 44 8 16 16 0 0Z";

/** Mảng hoa văn lặp; dùng bên trong <defs>. */
export function FloralPattern({ id, p, size = 240 }: { id: string; p: Palette; size?: number }) {
  const k = size / 240;
  const flower = (x: number, y: number, s: number, r = 0) => (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="0" cy="-17" rx="8.5" ry="19" transform={`rotate(${a})`} fill={p.flower} stroke={p.leafDark} strokeWidth="1.3" />
      ))}
      <circle r="7" fill={p.accent} stroke={p.leafDark} strokeWidth="1.2" />
      <circle r="2.4" fill={p.bg} />
    </g>
  );
  const leaf = (x: number, y: number, r: number, s = 1) => (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill={p.leaf} stroke={p.leafDark} strokeWidth="1.3" strokeLinejoin="round">
      <path d={LEAF} />
      <path d="M2 0C20-6 40-8 58-9" fill="none" />
    </g>
  );
  return (
    <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform={`scale(${k})`}>
      <rect width="240" height="240" fill={p.bg} />
      <path d="M-10 120C30 70 80 170 120 120S210 70 250 120" fill="none" stroke={p.leafDark} strokeWidth="1.6" />
      <path d="M120 -10C70 30 170 80 120 120S70 210 120 250" fill="none" stroke={p.leafDark} strokeWidth="1.6" />
      {leaf(120, 120, -40, 1.1)}
      {leaf(120, 120, 140, 1.1)}
      {leaf(120, 120, 50, 0.9)}
      {leaf(120, 120, 230, 0.9)}
      {leaf(0, 0, 45, 0.8)}
      {leaf(240, 0, 135, 0.8)}
      {leaf(0, 240, -45, 0.8)}
      {leaf(240, 240, -135, 0.8)}
      {flower(120, 120, 0.95)}
      {flower(0, 0, 0.6)}
      {flower(240, 0, 0.6)}
      {flower(0, 240, 0.6)}
      {flower(240, 240, 0.6)}
      {flower(120, 8, 0.38)}
      {flower(120, 232, 0.38)}
      {flower(8, 120, 0.38)}
      {flower(232, 120, 0.38)}
    </pattern>
  );
}

const BASE = "/images/demos/lua-ha-dong";
const FABRIC_SRC: Record<string, string> = {
  sen: "hoa-1.webp",
  mai: "hoa-2.webp",
  cuc: "lua-xep.webp",
  truc: "det-mau.webp",
  lam: "lua-bong.webp",
  aodai: "ao-dai.webp",
  print: "in-hoa.webp",
};

/** Ảnh vải/lụa thật (Pexels, xem CREDITS.md trong public/images/demos/lua-ha-dong). */
export function Fabric({ variant = "sen", className, style, eager = false, alt = "" }: { id?: string; variant?: keyof typeof PALETTES | "aodai" | "print"; className?: string; style?: CSSProperties; fold?: boolean; eager?: boolean; alt?: string }) {
  const big = variant === "print";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} style={{ objectFit: "cover", ...style }} src={`${BASE}/${FABRIC_SRC[variant]}`} alt={alt} width={big ? 1600 : 720} height={big ? 1067 : 960} loading={eager ? "eager" : "lazy"} decoding="async" draggable={false} />
  );
}

export function Drop({ size = 24, className, color = "currentColor" }: { size?: number; className?: string; color?: string }) {
  return (
    <svg className={className} width={size} height={size * 1.3} viewBox="0 0 24 32" aria-hidden="true" focusable="false">
      <path d="M12 1C12 1 2 14 2 21a10 10 0 0 0 20 0C22 14 12 1 12 1Z" fill={color} />
      <path d="M7 21a5 5 0 0 0 4 4.9" stroke="#fff" strokeOpacity=".5" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Biểu tượng đan xen (loader / logo). */
export function Glyph({ size = 64, color = "#a9c997" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20c0-8 10-10 14-4s-2 12-8 12-8 6 0 10 14-2 14-8" />
      <path d="M52 44c0 8-10 10-14 4s2-12 8-12 8-6 0-10-14 2-14 8" />
      <path d="M22 32h20" />
    </svg>
  );
}

/** Ảnh xưởng dệt thật (làm mờ, thay cho bản phác thảo). */
export function FactorySketch({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={`${BASE}/xuong-det.webp`} alt="" width={1400} height={744} loading="lazy" decoding="async" draggable={false} />
  );
}
