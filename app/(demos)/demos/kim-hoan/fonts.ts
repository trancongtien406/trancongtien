import localFont from "next/font/local";

/**
 * Libre Bodoni (heading, 400/500 + italic 400, OFL) và Montserrat (body, 300/400/500, OFL).
 * Mỗi subset một file woff2; thứ tự trong stack CSS: vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false để Chrome không lấy glyph có dấu chồng (Ệ, Ế, Ổ) từ font hệ thống rồi tách dấu.
 * (next/font cần tuỳ chọn viết dạng literal nên không dùng hàm trợ giúp hay spread.)
 */
export const lbVi = localFont({ src: [
  { path: "./fonts/libre-bodoni-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
  { path: "./fonts/libre-bodoni-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
  { path: "./fonts/libre-bodoni-vietnamese-400-italic.woff2", weight: "400", style: "italic" },
], variable: "--kn-fd-vi", display: "swap", adjustFontFallback: false });
export const lbLat = localFont({ src: [
  { path: "./fonts/libre-bodoni-latin-400-normal.woff2", weight: "400", style: "normal" },
  { path: "./fonts/libre-bodoni-latin-500-normal.woff2", weight: "500", style: "normal" },
  { path: "./fonts/libre-bodoni-latin-400-italic.woff2", weight: "400", style: "italic" },
], variable: "--kn-fd-lat", display: "swap", adjustFontFallback: false });
export const lbExt = localFont({ src: [
  { path: "./fonts/libre-bodoni-latin-ext-400-normal.woff2", weight: "400", style: "normal" },
  { path: "./fonts/libre-bodoni-latin-ext-500-normal.woff2", weight: "500", style: "normal" },
  { path: "./fonts/libre-bodoni-latin-ext-400-italic.woff2", weight: "400", style: "italic" },
], variable: "--kn-fd-ext", preload: false, display: "swap", adjustFontFallback: false });

export const msVi = localFont({ src: [
  { path: "./fonts/montserrat-vietnamese-300-normal.woff2", weight: "300", style: "normal" },
  { path: "./fonts/montserrat-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
  { path: "./fonts/montserrat-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
], variable: "--kn-fb-vi", display: "swap", adjustFontFallback: false });
export const msLat = localFont({ src: [
  { path: "./fonts/montserrat-latin-300-normal.woff2", weight: "300", style: "normal" },
  { path: "./fonts/montserrat-latin-400-normal.woff2", weight: "400", style: "normal" },
  { path: "./fonts/montserrat-latin-500-normal.woff2", weight: "500", style: "normal" },
], variable: "--kn-fb-lat", display: "swap", adjustFontFallback: false });
export const msExt = localFont({ src: [
  { path: "./fonts/montserrat-latin-ext-300-normal.woff2", weight: "300", style: "normal" },
  { path: "./fonts/montserrat-latin-ext-400-normal.woff2", weight: "400", style: "normal" },
  { path: "./fonts/montserrat-latin-ext-500-normal.woff2", weight: "500", style: "normal" },
], variable: "--kn-fb-ext", preload: false, display: "swap", adjustFontFallback: false });

export const fontVars = [lbVi, lbLat, lbExt, msVi, msLat, msExt].map((f) => f.variable).join(" ");
