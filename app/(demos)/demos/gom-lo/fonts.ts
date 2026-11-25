import localFont from "next/font/local";

/**
 * Yeseva One (heading, OFL), Patrick Hand (nét viết tay, OFL), Nunito Sans (body 400/600/700, OFL).
 * Mỗi subset một file woff2; stack CSS xếp vietnamese -> latin -> latin-ext. adjustFontFallback:false để dấu không bị tách.
 */
export const yeVi = localFont({ src: "./fonts/yeseva-vietnamese.woff2", weight: "400", variable: "--gl-ye-vi", display: "swap", adjustFontFallback: false });
export const yeLat = localFont({ src: "./fonts/yeseva-latin.woff2", weight: "400", variable: "--gl-ye-lat", display: "swap", adjustFontFallback: false });
export const yeExt = localFont({ src: "./fonts/yeseva-latin-ext.woff2", weight: "400", variable: "--gl-ye-ext", preload: false, display: "swap", adjustFontFallback: false });
export const paVi = localFont({ src: "./fonts/patrick-vietnamese.woff2", weight: "400", variable: "--gl-pa-vi", display: "swap", adjustFontFallback: false });
export const paLat = localFont({ src: "./fonts/patrick-latin.woff2", weight: "400", variable: "--gl-pa-lat", display: "swap", adjustFontFallback: false });
export const paExt = localFont({ src: "./fonts/patrick-latin-ext.woff2", weight: "400", variable: "--gl-pa-ext", preload: false, display: "swap", adjustFontFallback: false });
export const nuVi = localFont({
  src: [
    { path: "./fonts/nunito-vietnamese-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/nunito-vietnamese-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/nunito-vietnamese-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--gl-nu-vi", display: "swap", adjustFontFallback: false,
});
export const nuLat = localFont({
  src: [
    { path: "./fonts/nunito-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/nunito-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/nunito-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--gl-nu-lat", display: "swap", adjustFontFallback: false,
});
export const nuExt = localFont({
  src: [
    { path: "./fonts/nunito-latin-ext-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/nunito-latin-ext-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/nunito-latin-ext-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--gl-nu-ext", preload: false, display: "swap", adjustFontFallback: false,
});

export const fontVars = [yeVi, yeLat, yeExt, paVi, paLat, paExt, nuVi, nuLat, nuExt].map((f) => f.variable).join(" ");
