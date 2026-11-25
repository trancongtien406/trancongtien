import localFont from "next/font/local";

/**
 * Raleway (heading, biến thiên wght 100-900, OFL) và Commissioner (body, biến thiên wght 100-900, OFL).
 * Mỗi subset một file woff2; thứ tự trong stack CSS: vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false để Chrome không lấy glyph có dấu từ font hệ thống rồi tách dấu.
 */
export const rwVi = localFont({
  src: [{ path: "./fonts/raleway-vietnamese.woff2", weight: "100 900", style: "normal" }],
  variable: "--dx-fd-vi", display: "swap", adjustFontFallback: false,
});
export const rwLat = localFont({
  src: [{ path: "./fonts/raleway-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--dx-fd-lat", display: "swap", adjustFontFallback: false,
});
export const rwExt = localFont({
  src: [{ path: "./fonts/raleway-latin-ext.woff2", weight: "100 900", style: "normal" }],
  variable: "--dx-fd-ext", preload: false, display: "swap", adjustFontFallback: false,
});
export const cmVi = localFont({
  src: [{ path: "./fonts/commissioner-vietnamese.woff2", weight: "100 900", style: "normal" }],
  variable: "--dx-fb-vi", display: "swap", adjustFontFallback: false,
});
export const cmLat = localFont({
  src: [{ path: "./fonts/commissioner-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--dx-fb-lat", display: "swap", adjustFontFallback: false,
});
export const cmExt = localFont({
  src: [{ path: "./fonts/commissioner-latin-ext.woff2", weight: "100 900", style: "normal" }],
  variable: "--dx-fb-ext", preload: false, display: "swap", adjustFontFallback: false,
});

export const fontVars = [rwVi, rwLat, rwExt, cmVi, cmLat, cmExt].map((f) => f.variable).join(" ");
