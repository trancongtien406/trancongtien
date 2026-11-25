import localFont from "next/font/local";

/**
 * Archivo (biến thiên wght 100-900 + wdth 62-125, OFL) cho tiêu đề rộng (font-variation-settings "wdth" 125),
 * Epilogue (wght biến thiên, OFL) cho nội dung, JetBrains Mono (wght biến thiên, OFL) cho nhãn kỹ thuật.
 * Mỗi subset một file woff2; vietnamese khai báo trước latin. adjustFontFallback:false để dấu không tách.
 */
export const arVi = localFont({ src: "./fonts/archivo-vietnamese-wdth-normal.woff2", weight: "100 900", variable: "--pt-fh-vi", display: "swap", adjustFontFallback: false });
export const arLat = localFont({ src: "./fonts/archivo-latin-wdth-normal.woff2", weight: "100 900", variable: "--pt-fh-lat", display: "swap", adjustFontFallback: false });
export const arExt = localFont({ src: "./fonts/archivo-latin-ext-wdth-normal.woff2", weight: "100 900", variable: "--pt-fh-ext", display: "swap", adjustFontFallback: false, preload: false });
export const epVi = localFont({ src: "./fonts/epilogue-vietnamese-wght-normal.woff2", weight: "100 900", variable: "--pt-fb-vi", display: "swap", adjustFontFallback: false });
export const epLat = localFont({ src: "./fonts/epilogue-latin-wght-normal.woff2", weight: "100 900", variable: "--pt-fb-lat", display: "swap", adjustFontFallback: false });
export const epExt = localFont({ src: "./fonts/epilogue-latin-ext-wght-normal.woff2", weight: "100 900", variable: "--pt-fb-ext", display: "swap", adjustFontFallback: false, preload: false });
export const jbVi = localFont({ src: "./fonts/jetbrains-mono-vietnamese-wght-normal.woff2", weight: "100 800", variable: "--pt-fm-vi", display: "swap", adjustFontFallback: false });
export const jbLat = localFont({ src: "./fonts/jetbrains-mono-latin-wght-normal.woff2", weight: "100 800", variable: "--pt-fm-lat", display: "swap", adjustFontFallback: false });
export const jbExt = localFont({ src: "./fonts/jetbrains-mono-latin-ext-wght-normal.woff2", weight: "100 800", variable: "--pt-fm-ext", display: "swap", adjustFontFallback: false, preload: false });

export const fontVars = [arVi, arLat, arExt, epVi, epLat, epExt, jbVi, jbLat, jbExt].map((f) => f.variable).join(" ");
