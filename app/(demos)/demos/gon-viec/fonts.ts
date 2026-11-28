import { Inter } from "next/font/google";

/** Inter (biến thiên) có subset vietnamese; dùng chữ HOA nhỏ, giãn chữ nhẹ như bản gốc. */
export const inter = Inter({ subsets: ["vietnamese", "latin", "latin-ext"], display: "swap", variable: "--gv-font" });
export const fontVars = inter.variable;
