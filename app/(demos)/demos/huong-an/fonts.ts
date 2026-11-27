import { Bodoni_Moda, Playfair_Display, Be_Vietnam_Pro } from "next/font/google";

/**
 * Bodoni Moda không có subset vietnamese: dùng latin + latin-ext, glyph có dấu tiếng Việt
 * rơi xuống Playfair Display (cùng họ chữ Didone, có vietnamese) theo thứ tự font-family.
 */
export const bodoni = Bodoni_Moda({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], axes: ["opsz"], variable: "--ha-bodoni", display: "swap" });
export const playfair = Playfair_Display({ subsets: ["vietnamese", "latin"], style: ["normal", "italic"], variable: "--ha-playfair", display: "swap" });
export const beVietnam = Be_Vietnam_Pro({ subsets: ["vietnamese", "latin"], weight: ["300", "400", "500", "600"], variable: "--ha-body", display: "swap" });

export const fontVars = [bodoni, playfair, beVietnam].map((f) => f.variable).join(" ");
