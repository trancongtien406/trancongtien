import localFont from "next/font/local";

/** Inter Tight (biến thiên wght, OFL), mỗi subset một file woff2; xếp vietnamese -> latin -> latin-ext. */
const vi = localFont({ src: "./fonts/inter-tight-vietnamese-wght-normal.woff2", weight: "100 900", variable: "--tv-f-vi", display: "swap", adjustFontFallback: false });
const lat = localFont({ src: "./fonts/inter-tight-latin-wght-normal.woff2", weight: "100 900", variable: "--tv-f-lat", display: "swap", adjustFontFallback: false });
const ext = localFont({ src: "./fonts/inter-tight-latin-ext-wght-normal.woff2", weight: "100 900", variable: "--tv-f-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [vi, lat, ext].map((f) => f.variable).join(" ");
