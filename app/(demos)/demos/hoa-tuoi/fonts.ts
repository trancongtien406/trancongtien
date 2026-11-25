import localFont from "next/font/local";

/**
 * Prata (400, OFL) cho tiêu đề; Work Sans (biến thiên wght 100-900, OFL) cho nội dung.
 * Mỗi subset một file woff2; stack CSS xếp vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false để dấu tiếng Việt không bị tách khỏi chữ.
 */
export const prVi = localFont({ src: "./fonts/prata-vietnamese.woff2", weight: "400", variable: "--nr-ff-vi", display: "swap", adjustFontFallback: false });
export const prLat = localFont({ src: "./fonts/prata-latin.woff2", weight: "400", variable: "--nr-ff-lat", display: "swap", adjustFontFallback: false });
export const wsVi = localFont({ src: "./fonts/worksans-vietnamese.woff2", weight: "100 900", variable: "--nr-fb-vi", display: "swap", adjustFontFallback: false });
export const wsLat = localFont({ src: "./fonts/worksans-latin.woff2", weight: "100 900", variable: "--nr-fb-lat", display: "swap", adjustFontFallback: false });
export const wsExt = localFont({ src: "./fonts/worksans-latin-ext.woff2", weight: "100 900", variable: "--nr-fb-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [prVi, prLat, wsVi, wsLat, wsExt].map((f) => f.variable).join(" ");
