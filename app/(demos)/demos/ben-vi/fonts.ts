import localFont from "next/font/local";

/**
 * Fraunces (biến thiên wght 100-900, OFL) và Barlow (400/500/600/700, OFL).
 * Mỗi subset là một file woff2 riêng; stack CSS xếp vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false là BẮT BUỘC để dấu tiếng Việt không bị tách khỏi chữ.
 * (next/font yêu cầu tuỳ chọn viết dạng literal nên không dùng hàm trợ giúp.)
 */
export const frVi = localFont({ src: "./fonts/fraunces-vietnamese.woff2", weight: "100 900", variable: "--bv-ff-vi", display: "swap", adjustFontFallback: false });
export const frLat = localFont({ src: "./fonts/fraunces-latin.woff2", weight: "100 900", variable: "--bv-ff-lat", display: "swap", adjustFontFallback: false });
export const frExt = localFont({ src: "./fonts/fraunces-latin-ext.woff2", weight: "100 900", variable: "--bv-ff-ext", preload: false, display: "swap", adjustFontFallback: false });
export const bwVi = localFont({
  src: [
    { path: "./fonts/barlow-vietnamese-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/barlow-vietnamese-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/barlow-vietnamese-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-vietnamese-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--bv-fb-vi", display: "swap", adjustFontFallback: false,
});
export const bwLat = localFont({
  src: [
    { path: "./fonts/barlow-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/barlow-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/barlow-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--bv-fb-lat", display: "swap", adjustFontFallback: false,
});
export const bwExt = localFont({
  src: [
    { path: "./fonts/barlow-latin-ext-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/barlow-latin-ext-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/barlow-latin-ext-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-latin-ext-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--bv-fb-ext", preload: false, display: "swap", adjustFontFallback: false,
});

export const fontVars = [frVi, frLat, frExt, bwVi, bwLat, bwExt].map((f) => f.variable).join(" ");
