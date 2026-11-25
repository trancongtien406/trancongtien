import localFont from "next/font/local";

/**
 * Noto Serif Display (biến thiên wght 100-900, thường + nghiêng, OFL) cho tiêu đề,
 * Nunito Sans (biến thiên wght, OFL) cho nội dung. Mỗi subset một file; vietnamese xếp trước latin.
 * adjustFontFallback:false để dấu tiếng Việt không bị tách khỏi chữ.
 */
export const nsVi = localFont({ src: "./fonts/noto-serif-display-vietnamese-wght-normal.woff2", weight: "100 900", style: "normal", variable: "--rv-fh-vi", display: "swap", adjustFontFallback: false });
export const nsLat = localFont({ src: "./fonts/noto-serif-display-latin-wght-normal.woff2", weight: "100 900", style: "normal", variable: "--rv-fh-lat", display: "swap", adjustFontFallback: false });
export const nsViI = localFont({ src: "./fonts/noto-serif-display-vietnamese-wght-italic.woff2", weight: "100 900", style: "italic", variable: "--rv-fhi-vi", display: "swap", adjustFontFallback: false });
export const nsLatI = localFont({ src: "./fonts/noto-serif-display-latin-wght-italic.woff2", weight: "100 900", style: "italic", variable: "--rv-fhi-lat", display: "swap", adjustFontFallback: false });
export const nuVi = localFont({ src: "./fonts/nunito-sans-vietnamese-wght-normal.woff2", weight: "200 1000", variable: "--rv-fb-vi", display: "swap", adjustFontFallback: false });
export const nuLat = localFont({ src: "./fonts/nunito-sans-latin-wght-normal.woff2", weight: "200 1000", variable: "--rv-fb-lat", display: "swap", adjustFontFallback: false });

export const fontVars = [nsVi, nsLat, nsViI, nsLatI, nuVi, nuLat].map((f) => f.variable).join(" ");
