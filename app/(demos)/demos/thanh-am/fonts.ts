import { Audiowide, Manrope } from "next/font/google";

/** Audiowide chưa có subset vietnamese: dấu tiếng Việt rơi xuống Manrope trong font stack. */
export const audiowide = Audiowide({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--ta-audiowide", display: "swap" });
export const manrope = Manrope({ subsets: ["vietnamese", "latin", "latin-ext"], weight: ["300", "400", "500", "700", "800"], variable: "--ta-manrope", display: "swap" });

export const fontVars = [audiowide, manrope].map((f) => f.variable).join(" ");
