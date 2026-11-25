import localFont from "next/font/local";

/**
 * Unbounded (display, wght 300/500, OFL) cho heading, số độ sâu, wordmark;
 * Inter Tight (body, wght 400/500/600, OFL).
 * Mỗi subset một file woff2; thứ tự trong stack CSS: vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false bắt buộc để Chrome không lấy glyph Ế/Ầ từ font hệ thống và tách dấu.
 * (next/font cần tuỳ chọn viết dạng literal nên không dùng hàm trợ giúp.)
 */
export const unVi = localFont({
  src: [
    { path: "./fonts/unbounded-vietnamese-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/unbounded-vietnamese-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--lb-fd-vi", display: "swap", adjustFontFallback: false,
});
export const unLat = localFont({
  src: [
    { path: "./fonts/unbounded-latin-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/unbounded-latin-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--lb-fd-lat", display: "swap", adjustFontFallback: false,
});
export const unExt = localFont({
  src: [
    { path: "./fonts/unbounded-latin-ext-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/unbounded-latin-ext-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--lb-fd-ext", preload: false, display: "swap", adjustFontFallback: false,
});
export const itVi = localFont({
  src: [
    { path: "./fonts/inter-tight-vietnamese-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-tight-vietnamese-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-tight-vietnamese-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--lb-fb-vi", display: "swap", adjustFontFallback: false,
});
export const itLat = localFont({
  src: [
    { path: "./fonts/inter-tight-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-tight-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-tight-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--lb-fb-lat", display: "swap", adjustFontFallback: false,
});
export const itExt = localFont({
  src: [
    { path: "./fonts/inter-tight-latin-ext-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-tight-latin-ext-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-tight-latin-ext-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--lb-fb-ext", preload: false, display: "swap", adjustFontFallback: false,
});

export const fontVars = [unVi, unLat, unExt, itVi, itLat, itExt].map((f) => f.variable).join(" ");
