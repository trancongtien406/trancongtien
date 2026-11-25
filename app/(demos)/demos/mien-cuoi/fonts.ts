import localFont from "next/font/local";

/**
 * Plus Jakarta Sans (heading, wght 200-800) và Public Sans (body, wght 100-900), cả hai OFL, biến thiên.
 * Mỗi subset một file woff2. Stack CSS xếp vietnamese -> latin -> latin-ext (vietnamese TRƯỚC để dùng glyph dựng sẵn).
 * adjustFontFallback:false là bắt buộc để next/font không chèn Arial chen giữa các subset.
 */
export const jakartaLatin = localFont({ src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2", weight: "200 800", variable: "--mc-fj-lat", display: "swap", adjustFontFallback: false });
export const jakartaVi = localFont({ src: "./fonts/plus-jakarta-sans-vietnamese-wght-normal.woff2", weight: "200 800", variable: "--mc-fj-vi", display: "swap", adjustFontFallback: false });
export const jakartaExt = localFont({ src: "./fonts/plus-jakarta-sans-latin-ext-wght-normal.woff2", weight: "200 800", variable: "--mc-fj-ext", preload: false, display: "swap", adjustFontFallback: false });
export const publicLatin = localFont({ src: "./fonts/public-sans-latin-wght-normal.woff2", weight: "100 900", variable: "--mc-fp-lat", display: "swap", adjustFontFallback: false });
export const publicVi = localFont({ src: "./fonts/public-sans-vietnamese-wght-normal.woff2", weight: "100 900", variable: "--mc-fp-vi", display: "swap", adjustFontFallback: false });
export const publicExt = localFont({ src: "./fonts/public-sans-latin-ext-wght-normal.woff2", weight: "100 900", variable: "--mc-fp-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [jakartaLatin, jakartaVi, jakartaExt, publicLatin, publicVi, publicExt].map((f) => f.variable).join(" ");
