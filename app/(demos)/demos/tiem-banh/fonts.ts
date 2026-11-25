import localFont from "next/font/local";

/**
 * Baloo 2 (biến thiên wght 400-800, OFL) cho tiêu đề; Nunito (biến thiên wght 200-1000, OFL) cho nội dung.
 * Mỗi subset một file woff2; stack CSS xếp vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false để dấu tiếng Việt không bị tách khỏi chữ.
 */
export const baVi = localFont({ src: "./fonts/baloo-vietnamese.woff2", weight: "400 800", variable: "--mk-ff-vi", display: "swap", adjustFontFallback: false });
export const baLat = localFont({ src: "./fonts/baloo-latin.woff2", weight: "400 800", variable: "--mk-ff-lat", display: "swap", adjustFontFallback: false });
export const baExt = localFont({ src: "./fonts/baloo-latin-ext.woff2", weight: "400 800", variable: "--mk-ff-ext", preload: false, display: "swap", adjustFontFallback: false });
export const nuVi = localFont({ src: "./fonts/nunito-vietnamese.woff2", weight: "200 1000", variable: "--mk-fb-vi", display: "swap", adjustFontFallback: false });
export const nuLat = localFont({ src: "./fonts/nunito-latin.woff2", weight: "200 1000", variable: "--mk-fb-lat", display: "swap", adjustFontFallback: false });
export const nuExt = localFont({ src: "./fonts/nunito-latin-ext.woff2", weight: "200 1000", variable: "--mk-fb-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [baVi, baLat, baExt, nuVi, nuLat, nuExt].map((f) => f.variable).join(" ");
