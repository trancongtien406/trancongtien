import localFont from "next/font/local";

/** Phông tự lưu cục bộ (OFL, tải từ Google Fonts): mỗi subset một file, xếp chồng vietnamese -> latin -> latin-ext. */
export const tmSansvi = localFont({ src: [{ path: "./fonts/inter-vietnamese-normal-400_600.woff2", weight: "400 600", style: "normal" }], variable: "--tm-fs-vi", display: "swap", adjustFontFallback: false });
export const tmSanslat = localFont({ src: [{ path: "./fonts/inter-latin-normal-400_600.woff2", weight: "400 600", style: "normal" }], variable: "--tm-fs-lat", display: "swap", adjustFontFallback: false });
export const tmSansext = localFont({ src: [{ path: "./fonts/inter-latin-ext-normal-400_600.woff2", weight: "400 600", style: "normal" }], variable: "--tm-fs-ext", display: "swap", adjustFontFallback: false, preload: false });
export const tmSerifvi = localFont({ src: [{ path: "./fonts/newsreader-vietnamese-italic-400_600.woff2", weight: "400 600", style: "italic" }, { path: "./fonts/newsreader-vietnamese-normal-400_600.woff2", weight: "400 600", style: "normal" }], variable: "--tm-fi-vi", display: "swap", adjustFontFallback: false });
export const tmSeriflat = localFont({ src: [{ path: "./fonts/newsreader-latin-italic-400_600.woff2", weight: "400 600", style: "italic" }, { path: "./fonts/newsreader-latin-normal-400_600.woff2", weight: "400 600", style: "normal" }], variable: "--tm-fi-lat", display: "swap", adjustFontFallback: false });
export const tmSerifext = localFont({ src: [{ path: "./fonts/newsreader-latin-ext-italic-400_600.woff2", weight: "400 600", style: "italic" }, { path: "./fonts/newsreader-latin-ext-normal-400_600.woff2", weight: "400 600", style: "normal" }], variable: "--tm-fi-ext", display: "swap", adjustFontFallback: false, preload: false });
export const tmBoldvi = localFont({ src: [{ path: "./fonts/bevn-vietnamese-normal-700.woff2", weight: "700", style: "normal" }], variable: "--tm-fb-vi", display: "swap", adjustFontFallback: false });
export const tmBoldlat = localFont({ src: [{ path: "./fonts/bevn-latin-normal-700.woff2", weight: "700", style: "normal" }], variable: "--tm-fb-lat", display: "swap", adjustFontFallback: false });
export const tmBoldext = localFont({ src: [{ path: "./fonts/bevn-latin-ext-normal-700.woff2", weight: "700", style: "normal" }], variable: "--tm-fb-ext", display: "swap", adjustFontFallback: false, preload: false });

export const fontVars = [tmSansvi, tmSanslat, tmSansext, tmSerifvi, tmSeriflat, tmSerifext, tmBoldvi, tmBoldlat, tmBoldext].map((f) => f.variable).join(" ");
