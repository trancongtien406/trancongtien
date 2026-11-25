import localFont from "next/font/local";

/**
 * Lora (heading, biến thiên wght 400-700 + italic) và Manrope (body, wght 200-800), OFL.
 * Mỗi subset một file woff2; stack CSS xếp vietnamese -> latin -> latin-ext (vietnamese TRƯỚC để Chrome lấy glyph dựng sẵn).
 * adjustFontFallback:false là BẮT BUỘC để next/font không chèn Arial xen giữa các subset (lỗi Ế thành Ê + dấu rời).
 */
export const loraVi = localFont({ src: "./fonts/lora-vietnamese-wght-normal.woff2", weight: "400 700", variable: "--hm-fl-vi", display: "swap", adjustFontFallback: false });
export const loraLat = localFont({ src: "./fonts/lora-latin-wght-normal.woff2", weight: "400 700", variable: "--hm-fl-lat", display: "swap", adjustFontFallback: false });
export const loraExt = localFont({ src: "./fonts/lora-latin-ext-wght-normal.woff2", weight: "400 700", variable: "--hm-fl-ext", preload: false, display: "swap", adjustFontFallback: false });
export const loraViI = localFont({ src: "./fonts/lora-vietnamese-wght-italic.woff2", weight: "400 700", style: "italic", variable: "--hm-fli-vi", display: "swap", adjustFontFallback: false });
export const loraLatI = localFont({ src: "./fonts/lora-latin-wght-italic.woff2", weight: "400 700", style: "italic", variable: "--hm-fli-lat", display: "swap", adjustFontFallback: false });
export const loraExtI = localFont({ src: "./fonts/lora-latin-ext-wght-italic.woff2", weight: "400 700", style: "italic", variable: "--hm-fli-ext", preload: false, display: "swap", adjustFontFallback: false });
export const manVi = localFont({ src: "./fonts/manrope-vietnamese-wght-normal.woff2", weight: "200 800", variable: "--hm-fm-vi", display: "swap", adjustFontFallback: false });
export const manLat = localFont({ src: "./fonts/manrope-latin-wght-normal.woff2", weight: "200 800", variable: "--hm-fm-lat", display: "swap", adjustFontFallback: false });
export const manExt = localFont({ src: "./fonts/manrope-latin-ext-wght-normal.woff2", weight: "200 800", variable: "--hm-fm-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [loraVi, loraLat, loraExt, loraViI, loraLatI, loraExtI, manVi, manLat, manExt].map((f) => f.variable).join(" ");
