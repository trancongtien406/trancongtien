import { Space_Grotesk, Syne } from "next/font/google";

/** Syne chưa có subset vietnamese: dấu tiếng Việt rơi xuống Space Grotesk trong font stack. */
export const syne = Syne({ subsets: ["latin", "latin-ext"], weight: ["600", "800"], variable: "--dp-syne", display: "swap" });
export const grotesk = Space_Grotesk({ subsets: ["vietnamese", "latin", "latin-ext"], weight: ["400", "500", "700"], variable: "--dp-grot", display: "swap" });

export const fontVars = [syne, grotesk].map((f) => f.variable).join(" ");
