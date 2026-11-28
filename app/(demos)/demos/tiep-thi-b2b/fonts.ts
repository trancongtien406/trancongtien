import { Inter, Newsreader } from "next/font/google";

/** Inter (thân + tiêu đề grotesk) và Newsreader nghiêng (từ nhấn serif). Cả hai có subset vietnamese. */
export const inter = Inter({ subsets: ["vietnamese", "latin", "latin-ext"], display: "swap", variable: "--pv-sans" });
export const newsreader = Newsreader({ subsets: ["vietnamese", "latin", "latin-ext"], style: ["italic"], weight: ["300", "400"], display: "swap", variable: "--pv-serif" });
export const fontVars = [inter.variable, newsreader.variable].join(" ");
