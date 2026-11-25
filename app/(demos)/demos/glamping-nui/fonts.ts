import localFont from "next/font/local";

/**
 * Alegreya (biến thiên wght 400-900, OFL) cho tiêu đề và Mulish (wght 200-1000, OFL) cho nội dung.
 * Mỗi subset một file woff2; thứ tự stack CSS: vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false để Chrome không lấy glyph Ế/Ộ/Ừ từ font hệ thống và tách dấu.
 */
export const alLatin = localFont({ src: "./fonts/alegreya-latin-wght-normal.woff2", weight: "400 900", variable: "--gl-fa-lat", display: "swap", adjustFontFallback: false });
export const alVi = localFont({ src: "./fonts/alegreya-vietnamese-wght-normal.woff2", weight: "400 900", variable: "--gl-fa-vi", display: "swap", adjustFontFallback: false });
export const alExt = localFont({ src: "./fonts/alegreya-latin-ext-wght-normal.woff2", weight: "400 900", variable: "--gl-fa-ext", preload: false, display: "swap", adjustFontFallback: false });
export const alItLatin = localFont({ src: "./fonts/alegreya-latin-wght-italic.woff2", weight: "400 900", style: "italic", variable: "--gl-fai-lat", preload: false, display: "swap", adjustFontFallback: false });
export const alItVi = localFont({ src: "./fonts/alegreya-vietnamese-wght-italic.woff2", weight: "400 900", style: "italic", variable: "--gl-fai-vi", preload: false, display: "swap", adjustFontFallback: false });
export const muLatin = localFont({ src: "./fonts/mulish-latin-wght-normal.woff2", weight: "200 1000", variable: "--gl-fm-lat", display: "swap", adjustFontFallback: false });
export const muVi = localFont({ src: "./fonts/mulish-vietnamese-wght-normal.woff2", weight: "200 1000", variable: "--gl-fm-vi", display: "swap", adjustFontFallback: false });
export const muExt = localFont({ src: "./fonts/mulish-latin-ext-wght-normal.woff2", weight: "200 1000", variable: "--gl-fm-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [alLatin, alVi, alExt, alItLatin, alItVi, muLatin, muVi, muExt].map((f) => f.variable).join(" ");
