import { Mulish, Outfit } from "next/font/google";

/** Outfit chưa có subset vietnamese: dấu tiếng Việt rơi xuống Mulish trong font stack. */
export const outfit = Outfit({ subsets: ["latin", "latin-ext"], weight: ["200", "300", "500", "700"], variable: "--tv-outfit", display: "swap" });
export const mulish = Mulish({ subsets: ["vietnamese", "latin", "latin-ext"], weight: ["300", "400", "600", "800"], variable: "--tv-mulish", display: "swap" });

export const fontVars = [outfit, mulish].map((f) => f.variable).join(" ");
