import localFont from "next/font/local";

/**
 * Saira 500/600/700/800 cho tiêu đề và số liệu (kiểu chữ kỹ thuật, OFL), Noto Sans 400/500/700 cho nội dung (OFL).
 * Mỗi subset một file woff2; stack CSS xếp vietnamese trước latin; adjustFontFallback:false để dấu không tách khỏi chữ.
 */
export const sVi = localFont({
  src: [
    { path: "./fonts/saira-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/saira-vietnamese-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/saira-vietnamese-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/saira-vietnamese-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--dx-s-vi",
  display: "swap",
  adjustFontFallback: false,
});
export const sLat = localFont({
  src: [
    { path: "./fonts/saira-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/saira-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/saira-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/saira-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--dx-s-lat",
  display: "swap",
  adjustFontFallback: false,
});
export const nVi = localFont({
  src: [
    { path: "./fonts/noto-sans-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-sans-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/noto-sans-vietnamese-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--dx-n-vi",
  display: "swap",
  adjustFontFallback: false,
});
export const nLat = localFont({
  src: [
    { path: "./fonts/noto-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/noto-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--dx-n-lat",
  display: "swap",
  adjustFontFallback: false,
});

export const fontVars = [sVi, sLat, nVi, nLat].map((f) => f.variable).join(" ");
