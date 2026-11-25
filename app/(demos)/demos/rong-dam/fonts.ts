import localFont from "next/font/local";

/**
 * Bricolage Grotesque (biến thiên wght 200-800, OFL) cho heading và Lexend (wght 100-900, OFL) cho body.
 * Lý do đổi DM Sans -> Lexend: DM Sans trên Google Fonts/Fontsource không có subset vietnamese
 * (ă ế ộ ữ... sẽ rơi về font hệ thống). Lexend là sans hình học thân thiện, đọc rõ, có đủ Vietnamese.
 * Mỗi subset một file woff2; thứ tự trong stack CSS: vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false bắt buộc để Chrome không lấy glyph Ế/Ộ từ Arial và tách dấu.
 */
export const brLatin = localFont({ src: "./fonts/bricolage-grotesque-latin-wght-normal.woff2", weight: "200 800", variable: "--rd-fb-lat", display: "swap", adjustFontFallback: false });
export const brVi = localFont({ src: "./fonts/bricolage-grotesque-vietnamese-wght-normal.woff2", weight: "200 800", variable: "--rd-fb-vi", display: "swap", adjustFontFallback: false });
export const brExt = localFont({ src: "./fonts/bricolage-grotesque-latin-ext-wght-normal.woff2", weight: "200 800", variable: "--rd-fb-ext", preload: false, display: "swap", adjustFontFallback: false });
export const lxLatin = localFont({ src: "./fonts/lexend-latin-wght-normal.woff2", weight: "100 900", variable: "--rd-fl-lat", display: "swap", adjustFontFallback: false });
export const lxVi = localFont({ src: "./fonts/lexend-vietnamese-wght-normal.woff2", weight: "100 900", variable: "--rd-fl-vi", display: "swap", adjustFontFallback: false });
export const lxExt = localFont({ src: "./fonts/lexend-latin-ext-wght-normal.woff2", weight: "100 900", variable: "--rd-fl-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [brLatin, brVi, brExt, lxLatin, lxVi, lxExt].map((f) => f.variable).join(" ");
