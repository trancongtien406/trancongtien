import localFont from "next/font/local";

/**
 * Paytone One (display, 400, OFL) cho heading; Pacifico (400, OFL) cho chữ nhấn viết tay;
 * Readex Pro (variable wght 160-700, OFL) cho nội dung.
 * Mỗi subset một file woff2; thứ tự trong stack CSS: vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false để Chrome không lấy glyph tiếng Việt từ font hệ thống và tách dấu.
 */
export const pdVi = localFont({ src: [{ path: "./fonts/paytone-one-vietnamese-400-normal.woff2", weight: "400", style: "normal" }], variable: "--rs-d-vi", display: "swap", adjustFontFallback: false });
export const pdLat = localFont({ src: [{ path: "./fonts/paytone-one-latin-400-normal.woff2", weight: "400", style: "normal" }], variable: "--rs-d-lat", display: "swap", adjustFontFallback: false });
export const pdExt = localFont({ src: [{ path: "./fonts/paytone-one-latin-ext-400-normal.woff2", weight: "400", style: "normal" }], variable: "--rs-d-ext", preload: false, display: "swap", adjustFontFallback: false });
export const pcVi = localFont({ src: [{ path: "./fonts/pacifico-vietnamese-400-normal.woff2", weight: "400", style: "normal" }], variable: "--rs-s-vi", display: "swap", adjustFontFallback: false });
export const pcLat = localFont({ src: [{ path: "./fonts/pacifico-latin-400-normal.woff2", weight: "400", style: "normal" }], variable: "--rs-s-lat", display: "swap", adjustFontFallback: false });
export const pcExt = localFont({ src: [{ path: "./fonts/pacifico-latin-ext-400-normal.woff2", weight: "400", style: "normal" }], variable: "--rs-s-ext", preload: false, display: "swap", adjustFontFallback: false });
export const rxVi = localFont({ src: [{ path: "./fonts/readex-pro-vietnamese-wght-normal.woff2", weight: "160 700", style: "normal" }], variable: "--rs-b-vi", display: "swap", adjustFontFallback: false });
export const rxLat = localFont({ src: [{ path: "./fonts/readex-pro-latin-wght-normal.woff2", weight: "160 700", style: "normal" }], variable: "--rs-b-lat", display: "swap", adjustFontFallback: false });
export const rxExt = localFont({ src: [{ path: "./fonts/readex-pro-latin-ext-wght-normal.woff2", weight: "160 700", style: "normal" }], variable: "--rs-b-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [pdVi, pdLat, pdExt, pcVi, pcLat, pcExt, rxVi, rxLat, rxExt].map((f) => f.variable).join(" ");
