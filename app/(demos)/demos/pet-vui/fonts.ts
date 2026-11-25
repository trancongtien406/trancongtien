import localFont from "next/font/local";

/**
 * Coiny (400, OFL) cho tiêu đề tròn dày; Quicksand (biến thiên wght 300-700, OFL) cho nội dung.
 * Mỗi subset một file woff2; stack CSS xếp vietnamese -> latin -> latin-ext.
 */
export const coVi = localFont({ src: "./fonts/coiny-vietnamese.woff2", weight: "400", variable: "--pv-ff-vi", display: "swap", adjustFontFallback: false });
export const coLat = localFont({ src: "./fonts/coiny-latin.woff2", weight: "400", variable: "--pv-ff-lat", display: "swap", adjustFontFallback: false });
export const coExt = localFont({ src: "./fonts/coiny-latin-ext.woff2", weight: "400", variable: "--pv-ff-ext", preload: false, display: "swap", adjustFontFallback: false });
export const quVi = localFont({ src: "./fonts/quicksand-vietnamese.woff2", weight: "300 700", variable: "--pv-fb-vi", display: "swap", adjustFontFallback: false });
export const quLat = localFont({ src: "./fonts/quicksand-latin.woff2", weight: "300 700", variable: "--pv-fb-lat", display: "swap", adjustFontFallback: false });
export const quExt = localFont({ src: "./fonts/quicksand-latin-ext.woff2", weight: "300 700", variable: "--pv-fb-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [coVi, coLat, coExt, quVi, quLat, quExt].map((f) => f.variable).join(" ");
