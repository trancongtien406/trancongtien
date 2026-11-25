import localFont from "next/font/local";

/**
 * Anybody (biến thiên wght 100-900, wdth 50-150, OFL) và Space Grotesk (wght 300-700, OFL).
 * Mỗi subset là một file woff2 riêng; stack CSS xếp vietnamese -> latin -> latin-ext (vietnamese TRƯỚC để Chrome dùng glyph dựng sẵn, không tách dấu).
 * adjustFontFallback:false là BẮT BUỘC: nếu không, next/font chèn font fallback (Arial) ngay sau
 * subset latin, trình duyệt lấy glyph Ế/Ỗ... từ Arial và tách dấu rời khỏi chữ.
 */
export const anybodyLatin = localFont({ src: "./fonts/anybody-latin.woff2", weight: "100 900", variable: "--rn-fa-lat", display: "swap", adjustFontFallback: false });
export const anybodyVi = localFont({ src: "./fonts/anybody-vietnamese.woff2", weight: "100 900", variable: "--rn-fa-vi", display: "swap", adjustFontFallback: false });
export const anybodyExt = localFont({ src: "./fonts/anybody-latin-ext.woff2", weight: "100 900", variable: "--rn-fa-ext", preload: false, display: "swap", adjustFontFallback: false });
export const grotLatin = localFont({ src: "./fonts/space-grotesk-latin.woff2", weight: "300 700", variable: "--rn-fs-lat", display: "swap", adjustFontFallback: false });
export const grotVi = localFont({ src: "./fonts/space-grotesk-vietnamese.woff2", weight: "300 700", variable: "--rn-fs-vi", display: "swap", adjustFontFallback: false });
export const grotExt = localFont({ src: "./fonts/space-grotesk-latin-ext.woff2", weight: "300 700", variable: "--rn-fs-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [anybodyLatin, anybodyVi, anybodyExt, grotLatin, grotVi, grotExt].map((f) => f.variable).join(" ");
