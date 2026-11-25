import localFont from "next/font/local";

/**
 * Spectral (display + chữ nghiêng, wght 200/300/400, OFL) cho tiêu đề và con số lớn;
 * Geologica (body + nhãn kỹ thuật, wght 300/400/500, OFL).
 * Mỗi subset một file woff2; thứ tự trong stack CSS: vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false để Chrome không lấy glyph Ế/Ề từ font hệ thống và tách dấu.
 */
export const specVi = localFont({
  src: [
    { path: "./fonts/spectral-vietnamese-200-normal.woff2", weight: "200", style: "normal" },
    { path: "./fonts/spectral-vietnamese-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/spectral-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/spectral-vietnamese-300-italic.woff2", weight: "300", style: "italic" },
  ],
  variable: "--cv-fd-vietnamese", display: "swap", adjustFontFallback: false,
});
export const specLat = localFont({
  src: [
    { path: "./fonts/spectral-latin-200-normal.woff2", weight: "200", style: "normal" },
    { path: "./fonts/spectral-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/spectral-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/spectral-latin-300-italic.woff2", weight: "300", style: "italic" },
  ],
  variable: "--cv-fd-latin", display: "swap", adjustFontFallback: false,
});
export const specExt = localFont({
  src: [
    { path: "./fonts/spectral-latin-ext-200-normal.woff2", weight: "200", style: "normal" },
    { path: "./fonts/spectral-latin-ext-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/spectral-latin-ext-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/spectral-latin-ext-300-italic.woff2", weight: "300", style: "italic" },
  ],
  variable: "--cv-fd-latin-ext", preload: false, display: "swap", adjustFontFallback: false,
});
export const geoVi = localFont({
  src: [
    { path: "./fonts/geologica-vietnamese-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/geologica-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/geologica-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--cv-fb-vietnamese", display: "swap", adjustFontFallback: false,
});
export const geoLat = localFont({
  src: [
    { path: "./fonts/geologica-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/geologica-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/geologica-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--cv-fb-latin", display: "swap", adjustFontFallback: false,
});
export const geoExt = localFont({
  src: [
    { path: "./fonts/geologica-latin-ext-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/geologica-latin-ext-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/geologica-latin-ext-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--cv-fb-latin-ext", preload: false, display: "swap", adjustFontFallback: false,
});

export const fontVars = [specVi, specLat, specExt, geoVi, geoLat, geoExt].map((f) => f.variable).join(" ");
