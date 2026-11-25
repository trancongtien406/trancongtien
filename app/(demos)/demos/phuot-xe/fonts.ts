import localFont from "next/font/local";

/**
 * Kanit (chỉ nghiêng 700/800/900, OFL) cho chữ tiêu đề; Roboto 400/500/700 cho nội dung;
 * Roboto Mono 500/700 cho số liệu. Mỗi subset một file woff2, stack CSS xếp vietnamese -> latin.
 * adjustFontFallback:false để dấu tiếng Việt không bị tách khỏi chữ.
 */
export const kVi = localFont({
  src: [
    { path: "./fonts/kanit-vietnamese-700-italic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/kanit-vietnamese-800-italic.woff2", weight: "800", style: "italic" },
    { path: "./fonts/kanit-vietnamese-900-italic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--vx-k-vi",
  display: "swap",
  adjustFontFallback: false,
});
export const kLat = localFont({
  src: [
    { path: "./fonts/kanit-latin-700-italic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/kanit-latin-800-italic.woff2", weight: "800", style: "italic" },
    { path: "./fonts/kanit-latin-900-italic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--vx-k-lat",
  display: "swap",
  adjustFontFallback: false,
});
export const rVi = localFont({
  src: [
    { path: "./fonts/roboto-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/roboto-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/roboto-vietnamese-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--vx-r-vi",
  display: "swap",
  adjustFontFallback: false,
});
export const rLat = localFont({
  src: [
    { path: "./fonts/roboto-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/roboto-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/roboto-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--vx-r-lat",
  display: "swap",
  adjustFontFallback: false,
});
export const mVi = localFont({
  src: [
    { path: "./fonts/roboto-mono-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/roboto-mono-vietnamese-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--vx-m-vi",
  display: "swap",
  adjustFontFallback: false,
});
export const mLat = localFont({
  src: [
    { path: "./fonts/roboto-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/roboto-mono-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--vx-m-lat",
  display: "swap",
  adjustFontFallback: false,
});

export const fontVars = [kVi, kLat, rVi, rLat, mVi, mLat].map((f) => f.variable).join(" ");
