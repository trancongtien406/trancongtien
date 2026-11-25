import localFont from "next/font/local";

/**
 * Big Shoulders Display (heading, 800/900, OFL), Chivo (body, 400/700, OFL), JetBrains Mono (nhãn stencil/số, 500/700, OFL).
 * Mỗi subset một file woff2; thứ tự trong stack CSS: vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false để Chrome không lấy glyph có dấu chồng (Ậ, Ế, Ổ) từ font hệ thống rồi tách dấu.
 * (next/font cần tuỳ chọn viết dạng literal nên không dùng hàm trợ giúp hay spread.)
 */
export const bsdVi = localFont({ src: [
  { path: "./fonts/bsd-vietnamese-800.woff2", weight: "800", style: "normal" },
  { path: "./fonts/bsd-vietnamese-900.woff2", weight: "900", style: "normal" },
], variable: "--sg-fd-vi", display: "swap", adjustFontFallback: false });
export const bsdLat = localFont({ src: [
  { path: "./fonts/bsd-latin-800.woff2", weight: "800", style: "normal" },
  { path: "./fonts/bsd-latin-900.woff2", weight: "900", style: "normal" },
], variable: "--sg-fd-lat", display: "swap", adjustFontFallback: false });
export const bsdExt = localFont({ src: [
  { path: "./fonts/bsd-latin-ext-800.woff2", weight: "800", style: "normal" },
  { path: "./fonts/bsd-latin-ext-900.woff2", weight: "900", style: "normal" },
], variable: "--sg-fd-ext", preload: false, display: "swap", adjustFontFallback: false });

export const chVi = localFont({ src: [
  { path: "./fonts/chivo-vietnamese-400.woff2", weight: "400", style: "normal" },
  { path: "./fonts/chivo-vietnamese-700.woff2", weight: "700", style: "normal" },
], variable: "--sg-fb-vi", display: "swap", adjustFontFallback: false });
export const chLat = localFont({ src: [
  { path: "./fonts/chivo-latin-400.woff2", weight: "400", style: "normal" },
  { path: "./fonts/chivo-latin-700.woff2", weight: "700", style: "normal" },
], variable: "--sg-fb-lat", display: "swap", adjustFontFallback: false });
export const chExt = localFont({ src: [
  { path: "./fonts/chivo-latin-ext-400.woff2", weight: "400", style: "normal" },
  { path: "./fonts/chivo-latin-ext-700.woff2", weight: "700", style: "normal" },
], variable: "--sg-fb-ext", preload: false, display: "swap", adjustFontFallback: false });

export const jbVi = localFont({ src: [
  { path: "./fonts/jbm-vietnamese-500.woff2", weight: "500", style: "normal" },
  { path: "./fonts/jbm-vietnamese-700.woff2", weight: "700", style: "normal" },
], variable: "--sg-fm-vi", display: "swap", adjustFontFallback: false });
export const jbLat = localFont({ src: [
  { path: "./fonts/jbm-latin-500.woff2", weight: "500", style: "normal" },
  { path: "./fonts/jbm-latin-700.woff2", weight: "700", style: "normal" },
], variable: "--sg-fm-lat", display: "swap", adjustFontFallback: false });
export const jbExt = localFont({ src: [
  { path: "./fonts/jbm-latin-ext-500.woff2", weight: "500", style: "normal" },
  { path: "./fonts/jbm-latin-ext-700.woff2", weight: "700", style: "normal" },
], variable: "--sg-fm-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [bsdVi, bsdLat, bsdExt, chVi, chLat, chExt, jbVi, jbLat, jbExt].map((f) => f.variable).join(" ");
