import localFont from "next/font/local";

/**
 * Newsreader (biến thiên wght 200-800, OFL) và Sarabun (300/400/500, OFL).
 * Mỗi subset một file woff2; stack CSS xếp vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false để dấu tiếng Việt không bị tách khỏi chữ.
 */
export const nwVi = localFont({ src: "./fonts/newsreader-vietnamese.woff2", weight: "200 800", variable: "--tt-nw-vi", display: "swap", adjustFontFallback: false });
export const nwLat = localFont({ src: "./fonts/newsreader-latin.woff2", weight: "200 800", variable: "--tt-nw-lat", display: "swap", adjustFontFallback: false });
export const nwExt = localFont({ src: "./fonts/newsreader-latin-ext.woff2", weight: "200 800", variable: "--tt-nw-ext", preload: false, display: "swap", adjustFontFallback: false });
export const saVi = localFont({
  src: [
    { path: "./fonts/sarabun-vietnamese-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/sarabun-vietnamese-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/sarabun-vietnamese-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--tt-sa-vi", display: "swap", adjustFontFallback: false,
});
export const saLat = localFont({
  src: [
    { path: "./fonts/sarabun-latin-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/sarabun-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/sarabun-latin-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--tt-sa-lat", display: "swap", adjustFontFallback: false,
});
export const saExt = localFont({
  src: [
    { path: "./fonts/sarabun-latin-ext-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/sarabun-latin-ext-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/sarabun-latin-ext-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--tt-sa-ext", preload: false, display: "swap", adjustFontFallback: false,
});

export const fontVars = [nwVi, nwLat, nwExt, saVi, saLat, saExt].map((f) => f.variable).join(" ");
