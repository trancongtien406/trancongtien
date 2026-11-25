import localFont from "next/font/local";

/**
 * IBM Plex (SIL OFL) — file woff2 nằm trong thư mục demo. Mỗi họ có 2 tập con
 * (latin + vietnamese) nối chuỗi font-family để từng glyph tự chọn đúng file.
 * adjustFontFallback tắt để font fallback không chen trước tập vietnamese.
 */
export const sansLat = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--kn-sans-lat",
  display: "swap",
  adjustFontFallback: false,
  fallback: [],
});
export const sansVi = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-sans-vietnamese-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ibm-plex-sans-vietnamese-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--kn-sans-vi",
  display: "swap",
  adjustFontFallback: false,
  fallback: [],
});
export const serifLat = localFont({
  src: [
    { path: "./fonts/ibm-plex-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-serif-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--kn-serif-lat",
  display: "swap",
  adjustFontFallback: false,
  fallback: [],
});
export const serifVi = localFont({
  src: [
    { path: "./fonts/ibm-plex-serif-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-serif-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-serif-vietnamese-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--kn-serif-vi",
  display: "swap",
  adjustFontFallback: false,
  fallback: [],
});

export const fontVars = [sansLat, sansVi, serifLat, serifVi].map((f) => f.variable).join(" ");
