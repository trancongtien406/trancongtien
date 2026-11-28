import localFont from "next/font/local";

/** Plus Jakarta Sans (biến thiên wght, OFL), mỗi subset một file woff2; xếp vietnamese -> latin -> latin-ext. */
const vi = localFont({ src: "./fonts/plus-jakarta-sans-vietnamese-wght-normal.woff2", weight: "100 900", variable: "--vc-f-vi", display: "swap", adjustFontFallback: false });
const lat = localFont({ src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2", weight: "100 900", variable: "--vc-f-lat", display: "swap", adjustFontFallback: false });
const ext = localFont({ src: "./fonts/plus-jakarta-sans-latin-ext-wght-normal.woff2", weight: "100 900", variable: "--vc-f-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [vi, lat, ext].map((f) => f.variable).join(" ");
