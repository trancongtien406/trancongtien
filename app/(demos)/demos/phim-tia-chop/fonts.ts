import localFont from "next/font/local";

/** Barlow (OFL), tải về dạng woff2 theo từng subset; xếp vietnamese -> latin -> latin-ext. */
const vi = localFont({ src: [{ path: "./fonts/barlow-vietnamese-400.woff2", weight: "400", style: "normal" },{ path: "./fonts/barlow-vietnamese-500.woff2", weight: "500", style: "normal" },{ path: "./fonts/barlow-vietnamese-600.woff2", weight: "600", style: "normal" },{ path: "./fonts/barlow-vietnamese-700.woff2", weight: "700", style: "normal" }], variable: "--tc-f-vi", display: "swap", adjustFontFallback: false });
const lat = localFont({ src: [{ path: "./fonts/barlow-latin-400.woff2", weight: "400", style: "normal" },{ path: "./fonts/barlow-latin-500.woff2", weight: "500", style: "normal" },{ path: "./fonts/barlow-latin-600.woff2", weight: "600", style: "normal" },{ path: "./fonts/barlow-latin-700.woff2", weight: "700", style: "normal" }], variable: "--tc-f-lat", display: "swap", adjustFontFallback: false });
const ext = localFont({ src: [{ path: "./fonts/barlow-latin-ext-400.woff2", weight: "400", style: "normal" },{ path: "./fonts/barlow-latin-ext-500.woff2", weight: "500", style: "normal" },{ path: "./fonts/barlow-latin-ext-600.woff2", weight: "600", style: "normal" },{ path: "./fonts/barlow-latin-ext-700.woff2", weight: "700", style: "normal" }], variable: "--tc-f-ext", display: "swap", adjustFontFallback: false, preload: false });

export const fontVars = [vi, lat, ext].map((f) => f.variable).join(" ");
