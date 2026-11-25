import localFont from "next/font/local";

/**
 * Unbounded (biến thiên wght 200-900, OFL) + Chakra Petch (400/500/600/700, OFL).
 * Mỗi subset một file woff2; stack CSS xếp vietnamese -> latin -> latin-ext.
 * adjustFontFallback:false bắt buộc để dấu tiếng Việt không bị tách khỏi chữ.
 */
export const unVi = localFont({ src: "./fonts/unbounded-vietnamese-wght-normal.woff2", weight: "200 900", variable: "--tm-fh-vi", display: "swap", adjustFontFallback: false });
export const unLat = localFont({ src: "./fonts/unbounded-latin-wght-normal.woff2", weight: "200 900", variable: "--tm-fh-lat", display: "swap", adjustFontFallback: false });
export const unExt = localFont({ src: "./fonts/unbounded-latin-ext-wght-normal.woff2", weight: "200 900", variable: "--tm-fh-ext", preload: false, display: "swap", adjustFontFallback: false });
export const cpVi = localFont({
  src: [
    { path: "./fonts/chakra-petch-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/chakra-petch-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/chakra-petch-vietnamese-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/chakra-petch-vietnamese-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--tm-fb-vi", display: "swap", adjustFontFallback: false,
});
export const cpLat = localFont({
  src: [
    { path: "./fonts/chakra-petch-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/chakra-petch-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/chakra-petch-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/chakra-petch-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--tm-fb-lat", display: "swap", adjustFontFallback: false,
});
export const cpExt = localFont({
  src: [
    { path: "./fonts/chakra-petch-latin-ext-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/chakra-petch-latin-ext-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/chakra-petch-latin-ext-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/chakra-petch-latin-ext-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--tm-fb-ext", preload: false, display: "swap", adjustFontFallback: false,
});

export const fontVars = [unVi, unLat, unExt, cpVi, cpLat, cpExt].map((f) => f.variable).join(" ");
