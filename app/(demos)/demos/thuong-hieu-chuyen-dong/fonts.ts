import localFont from "next/font/local";

/** Phông tự lưu cục bộ (OFL, tải từ Google Fonts): mỗi subset một file, xếp chồng vietnamese -> latin -> latin-ext. */
export const dhSansvi = localFont({ src: [{ path: "./fonts/inter-vietnamese-normal-400_700.woff2", weight: "400 700", style: "normal" }], variable: "--dh-fs-vi", display: "swap", adjustFontFallback: false });
export const dhSanslat = localFont({ src: [{ path: "./fonts/inter-latin-normal-400_700.woff2", weight: "400 700", style: "normal" }], variable: "--dh-fs-lat", display: "swap", adjustFontFallback: false });
export const dhSansext = localFont({ src: [{ path: "./fonts/inter-latin-ext-normal-400_700.woff2", weight: "400 700", style: "normal" }], variable: "--dh-fs-ext", display: "swap", adjustFontFallback: false, preload: false });
export const dhSerifvi = localFont({ src: [{ path: "./fonts/newsreader-vietnamese-italic-400_700.woff2", weight: "400 700", style: "italic" }, { path: "./fonts/newsreader-vietnamese-normal-400_700.woff2", weight: "400 700", style: "normal" }], variable: "--dh-fi-vi", display: "swap", adjustFontFallback: false });
export const dhSeriflat = localFont({ src: [{ path: "./fonts/newsreader-latin-italic-400_700.woff2", weight: "400 700", style: "italic" }, { path: "./fonts/newsreader-latin-normal-400_700.woff2", weight: "400 700", style: "normal" }], variable: "--dh-fi-lat", display: "swap", adjustFontFallback: false });
export const dhSerifext = localFont({ src: [{ path: "./fonts/newsreader-latin-ext-italic-400_700.woff2", weight: "400 700", style: "italic" }, { path: "./fonts/newsreader-latin-ext-normal-400_700.woff2", weight: "400 700", style: "normal" }], variable: "--dh-fi-ext", display: "swap", adjustFontFallback: false, preload: false });

export const fontVars = [dhSansvi, dhSanslat, dhSansext, dhSerifvi, dhSeriflat, dhSerifext].map((f) => f.variable).join(" ");
