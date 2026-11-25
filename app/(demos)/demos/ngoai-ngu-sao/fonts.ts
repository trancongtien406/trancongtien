import localFont from "next/font/local";

/**
 * Baloo 2 (display, 600/800, OFL) cho heading và chữ động; Nunito (body, 400-800, OFL).
 * Subset vietnamese đặt trước latin; adjustFontFallback:false để dấu không bị tách.
 * Chữ Nhật/Hàn là hoạ tiết ngắn: Noto Sans JP/KR 700 subset khai báo @font-face trong brand.module.css.
 */
export const baVi = localFont({
  src: [
    { path: "./fonts/baloo-2-vietnamese-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/baloo-2-vietnamese-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--ns-fd-vi", display: "swap", adjustFontFallback: false,
});
export const baLat = localFont({
  src: [
    { path: "./fonts/baloo-2-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/baloo-2-latin-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--ns-fd-lat", display: "swap", adjustFontFallback: false,
});
export const nuVi = localFont({
  src: [
    { path: "./fonts/nunito-vietnamese-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/nunito-vietnamese-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/nunito-vietnamese-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/nunito-vietnamese-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--ns-fb-vi", display: "swap", adjustFontFallback: false,
});
export const nuLat = localFont({
  src: [
    { path: "./fonts/nunito-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/nunito-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/nunito-latin-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/nunito-latin-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--ns-fb-lat", display: "swap", adjustFontFallback: false,
});

export const fontVars = [baVi, baLat, nuVi, nuLat].map((f) => f.variable).join(" ");
