import { Anton, Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";

/** Anton (chữ khối hoa, tiêu đề khổng lồ), Cormorant Garamond (tiêu đề serif), Be Vietnam Pro (thân). Cả ba có subset vietnamese. */
export const anton = Anton({ subsets: ["vietnamese", "latin", "latin-ext"], weight: "400", display: "swap", variable: "--gt-display" });
export const cormorant = Cormorant_Garamond({ subsets: ["vietnamese", "latin", "latin-ext"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap", variable: "--gt-serif" });
export const beVn = Be_Vietnam_Pro({ subsets: ["vietnamese", "latin", "latin-ext"], weight: ["300", "400", "500", "600"], display: "swap", variable: "--gt-sans" });
export const fontVars = [anton.variable, cormorant.variable, beVn.variable].join(" ");
