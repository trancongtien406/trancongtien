import localFont from "next/font/local";

/**
 * Playfair Display (heading + caption nghiêng, wght 400-900) và Josefin Sans (body, wght 100-700), cả hai OFL, biến thiên.
 * Jost KHÔNG có subset tiếng Việt (thiếu ơ ư và các chữ có dấu chồng) nên body dùng Josefin Sans (cùng họ hình học kiểu Futura).
 * Stack CSS xếp vietnamese -> latin -> latin-ext. adjustFontFallback:false để next/font không chèn Arial giữa các subset.
 */
export const pfLatin = localFont({ src: "./fonts/playfair-display-latin-wght-normal.woff2", weight: "400 900", variable: "--tm-pf-lat", display: "swap", adjustFontFallback: false });
export const pfVi = localFont({ src: "./fonts/playfair-display-vietnamese-wght-normal.woff2", weight: "400 900", variable: "--tm-pf-vi", display: "swap", adjustFontFallback: false });
export const pfExt = localFont({ src: "./fonts/playfair-display-latin-ext-wght-normal.woff2", weight: "400 900", variable: "--tm-pf-ext", preload: false, display: "swap", adjustFontFallback: false });
export const pfiLatin = localFont({ src: "./fonts/playfair-display-latin-wght-italic.woff2", weight: "400 900", style: "italic", variable: "--tm-pfi-lat", display: "swap", adjustFontFallback: false });
export const pfiVi = localFont({ src: "./fonts/playfair-display-vietnamese-wght-italic.woff2", weight: "400 900", style: "italic", variable: "--tm-pfi-vi", display: "swap", adjustFontFallback: false });
export const pfiExt = localFont({ src: "./fonts/playfair-display-latin-ext-wght-italic.woff2", weight: "400 900", style: "italic", variable: "--tm-pfi-ext", preload: false, display: "swap", adjustFontFallback: false });
export const jsLatin = localFont({ src: "./fonts/josefin-sans-latin-wght-normal.woff2", weight: "100 700", variable: "--tm-js-lat", display: "swap", adjustFontFallback: false });
export const jsVi = localFont({ src: "./fonts/josefin-sans-vietnamese-wght-normal.woff2", weight: "100 700", variable: "--tm-js-vi", display: "swap", adjustFontFallback: false });
export const jsExt = localFont({ src: "./fonts/josefin-sans-latin-ext-wght-normal.woff2", weight: "100 700", variable: "--tm-js-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [pfLatin, pfVi, pfExt, pfiLatin, pfiVi, pfiExt, jsLatin, jsVi, jsExt].map((f) => f.variable).join(" ");
