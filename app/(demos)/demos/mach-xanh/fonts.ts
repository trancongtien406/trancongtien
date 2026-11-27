import { Sora, Inter } from "next/font/google";

/** Sora không có subset vietnamese: dấu tiếng Việt rơi xuống Inter (có vietnamese) theo thứ tự font-family. */
export const sora = Sora({ subsets: ["latin", "latin-ext"], variable: "--mx-sora", display: "swap" });
export const inter = Inter({ subsets: ["vietnamese", "latin"], variable: "--mx-inter", display: "swap" });

export const fontVars = [sora, inter].map((f) => f.variable).join(" ");
