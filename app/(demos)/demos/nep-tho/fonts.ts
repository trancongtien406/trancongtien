import localFont from "next/font/local";

/**
 * Lexend (heading, wght 100-900) và Mulish (body, wght 200-1000), cả hai OFL, biến thiên.
 * Sora (font ban đầu) KHÔNG có subset vietnamese (thiếu ế ở ơ ạ...), nên thay bằng Lexend: hình học thân thiện, đủ glyph Việt.
 * Stack CSS xếp vietnamese -> latin -> latin-ext. adjustFontFallback:false để next/font không chèn Arial.
 */
export const lexLatin = localFont({ src: "./fonts/lexend-latin-wght-normal.woff2", weight: "100 900", variable: "--nt-fl-lat", display: "swap", adjustFontFallback: false });
export const lexVi = localFont({ src: "./fonts/lexend-vietnamese-wght-normal.woff2", weight: "100 900", variable: "--nt-fl-vi", display: "swap", adjustFontFallback: false });
export const lexExt = localFont({ src: "./fonts/lexend-latin-ext-wght-normal.woff2", weight: "100 900", variable: "--nt-fl-ext", preload: false, display: "swap", adjustFontFallback: false });
export const mulLatin = localFont({ src: "./fonts/mulish-latin-wght-normal.woff2", weight: "200 1000", variable: "--nt-fm-lat", display: "swap", adjustFontFallback: false });
export const mulVi = localFont({ src: "./fonts/mulish-vietnamese-wght-normal.woff2", weight: "200 1000", variable: "--nt-fm-vi", display: "swap", adjustFontFallback: false });
export const mulExt = localFont({ src: "./fonts/mulish-latin-ext-wght-normal.woff2", weight: "200 1000", variable: "--nt-fm-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [lexLatin, lexVi, lexExt, mulLatin, mulVi, mulExt].map((f) => f.variable).join(" ");
