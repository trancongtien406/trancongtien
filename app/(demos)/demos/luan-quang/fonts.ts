import { Barlow, Cinzel } from "next/font/google";

/** Cinzel chưa có subset vietnamese: dấu tiếng Việt rơi xuống Barlow trong font stack. */
export const cinzel = Cinzel({ subsets: ["latin", "latin-ext"], weight: ["400", "600", "800"], variable: "--lq-cinzel", display: "swap" });
export const barlow = Barlow({ subsets: ["vietnamese", "latin", "latin-ext"], weight: ["300", "400", "500", "600"], variable: "--lq-barlow", display: "swap" });

export const fontVars = [cinzel, barlow].map((f) => f.variable).join(" ");
