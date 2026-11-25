import localFont from "next/font/local";

/**
 * Epilogue (biến thiên wght 100-900, OFL) cho tiêu đề đậm; Onest (biến thiên wght 100-900, OFL) cho nội dung.
 * Mỗi subset một file woff2; stack CSS xếp vietnamese -> latin -> latin-ext.
 */
export const epVi = localFont({ src: "./fonts/epilogue-vietnamese.woff2", weight: "100 900", variable: "--np-ep-vi", display: "swap", adjustFontFallback: false });
export const epLat = localFont({ src: "./fonts/epilogue-latin.woff2", weight: "100 900", variable: "--np-ep-lat", display: "swap", adjustFontFallback: false });
export const epExt = localFont({ src: "./fonts/epilogue-latin-ext.woff2", weight: "100 900", variable: "--np-ep-ext", preload: false, display: "swap", adjustFontFallback: false });
export const onVi = localFont({ src: "./fonts/onest-vietnamese.woff2", weight: "100 900", variable: "--np-on-vi", display: "swap", adjustFontFallback: false });
export const onLat = localFont({ src: "./fonts/onest-latin.woff2", weight: "100 900", variable: "--np-on-lat", display: "swap", adjustFontFallback: false });
export const onExt = localFont({ src: "./fonts/onest-latin-ext.woff2", weight: "100 900", variable: "--np-on-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [epVi, epLat, epExt, onVi, onLat, onExt].map((f) => f.variable).join(" ");
