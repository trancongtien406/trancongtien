import { Jost, Playfair_Display } from "next/font/google";

/** Jost chưa có subset vietnamese: dấu tiếng Việt rơi xuống Playfair/hệ thống trong font stack. */
export const playfair = Playfair_Display({ subsets: ["vietnamese", "latin", "latin-ext"], weight: ["400", "500", "700"], style: ["normal", "italic"], variable: "--dn-playfair", display: "swap" });
export const jost = Jost({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600"], variable: "--dn-jost", display: "swap" });

export const fontVars = [playfair, jost].map((f) => f.variable).join(" ");
