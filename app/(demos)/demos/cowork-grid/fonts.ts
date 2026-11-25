import localFont from "next/font/local";

/**
 * Bai Jamjuree 400/500/600/700 (OFL) cho tiêu đề và nội dung; Space Mono 400/700 (OFL) cho số liệu và nhãn.
 * Mỗi subset một file woff2; stack CSS xếp vietnamese -> latin-ext -> latin để dấu không bị tách.
 * adjustFontFallback:false để dấu tiếng Việt không bị lệch khỏi chữ.
 */
export const bVi = localFont({
  src: [
    { path: "./fonts/bai-jamjuree-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/bai-jamjuree-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/bai-jamjuree-vietnamese-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/bai-jamjuree-vietnamese-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--cg-b-vi",
  display: "swap",
  adjustFontFallback: false,
});
export const bExt = localFont({
  src: [
    { path: "./fonts/bai-jamjuree-latin-ext-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/bai-jamjuree-latin-ext-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/bai-jamjuree-latin-ext-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/bai-jamjuree-latin-ext-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--cg-b-ext",
  display: "swap",
  adjustFontFallback: false,
});
export const bLat = localFont({
  src: [
    { path: "./fonts/bai-jamjuree-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/bai-jamjuree-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/bai-jamjuree-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/bai-jamjuree-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--cg-b-lat",
  display: "swap",
  adjustFontFallback: false,
});
export const mVi = localFont({
  src: [
    { path: "./fonts/space-mono-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-vietnamese-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--cg-m-vi",
  display: "swap",
  adjustFontFallback: false,
});
export const mExt = localFont({
  src: [
    { path: "./fonts/space-mono-latin-ext-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-latin-ext-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--cg-m-ext",
  display: "swap",
  adjustFontFallback: false,
});
export const mLat = localFont({
  src: [
    { path: "./fonts/space-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--cg-m-lat",
  display: "swap",
  adjustFontFallback: false,
});

export const fontVars = [bVi, bExt, bLat, mVi, mExt, mLat].map((f) => f.variable).join(" ");
