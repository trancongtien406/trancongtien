import localFont from "next/font/local";

/**
 * Oswald (heading, wght 200-700) và Archivo (body, wght 100-900), cả hai OFL, biến thiên.
 * Mỗi subset một file woff2. Stack CSS xếp vietnamese -> latin -> latin-ext (vietnamese TRƯỚC để dùng glyph dựng sẵn).
 * adjustFontFallback:false để next/font không chèn font fallback giữa các subset.
 */
export const oswaldVi = localFont({ src: "./fonts/oswald-vietnamese-wght-normal.woff2", weight: "200 700", variable: "--nl-fo-vi", display: "swap", adjustFontFallback: false });
export const oswaldLatin = localFont({ src: "./fonts/oswald-latin-wght-normal.woff2", weight: "200 700", variable: "--nl-fo-lat", display: "swap", adjustFontFallback: false });
export const oswaldExt = localFont({ src: "./fonts/oswald-latin-ext-wght-normal.woff2", weight: "200 700", variable: "--nl-fo-ext", preload: false, display: "swap", adjustFontFallback: false });
export const archivoVi = localFont({ src: "./fonts/archivo-vietnamese-wght-normal.woff2", weight: "100 900", variable: "--nl-fa-vi", display: "swap", adjustFontFallback: false });
export const archivoLatin = localFont({ src: "./fonts/archivo-latin-wght-normal.woff2", weight: "100 900", variable: "--nl-fa-lat", display: "swap", adjustFontFallback: false });
export const archivoExt = localFont({ src: "./fonts/archivo-latin-ext-wght-normal.woff2", weight: "100 900", variable: "--nl-fa-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [oswaldVi, oswaldLatin, oswaldExt, archivoVi, archivoLatin, archivoExt].map((f) => f.variable).join(" ");
