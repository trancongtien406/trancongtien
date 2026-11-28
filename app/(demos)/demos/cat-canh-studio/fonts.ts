import localFont from "next/font/local";

/** Phông tự lưu cục bộ (OFL, tải từ Google Fonts): mỗi subset một file, xếp chồng vietnamese -> latin -> latin-ext. */
export const ccSansvi = localFont({ src: [{ path: "./fonts/inter-vietnamese-normal-300_600.woff2", weight: "300 600", style: "normal" }], variable: "--cc-fs-vi", display: "swap", adjustFontFallback: false });
export const ccSanslat = localFont({ src: [{ path: "./fonts/inter-latin-normal-300_600.woff2", weight: "300 600", style: "normal" }], variable: "--cc-fs-lat", display: "swap", adjustFontFallback: false });
export const ccSansext = localFont({ src: [{ path: "./fonts/inter-latin-ext-normal-300_600.woff2", weight: "300 600", style: "normal" }], variable: "--cc-fs-ext", display: "swap", adjustFontFallback: false, preload: false });
export const ccHandvi = localFont({ src: [{ path: "./fonts/patrick-vietnamese-normal-400.woff2", weight: "400", style: "normal" }], variable: "--cc-fh-vi", display: "swap", adjustFontFallback: false });
export const ccHandlat = localFont({ src: [{ path: "./fonts/patrick-latin-normal-400.woff2", weight: "400", style: "normal" }], variable: "--cc-fh-lat", display: "swap", adjustFontFallback: false });
export const ccHandext = localFont({ src: [{ path: "./fonts/patrick-latin-ext-normal-400.woff2", weight: "400", style: "normal" }], variable: "--cc-fh-ext", display: "swap", adjustFontFallback: false, preload: false });

export const fontVars = [ccSansvi, ccSanslat, ccSansext, ccHandvi, ccHandlat, ccHandext].map((f) => f.variable).join(" ");
