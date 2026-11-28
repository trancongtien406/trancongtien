import { Inter, Playfair_Display } from "next/font/google";

export const inter = Inter({ subsets: ["vietnamese", "latin", "latin-ext"], variable: "--vn-sans", display: "swap" });
export const playfair = Playfair_Display({ subsets: ["vietnamese", "latin", "latin-ext"], style: ["italic", "normal"], variable: "--vn-serif", display: "swap" });

export const fontVars = [inter, playfair].map((f) => f.variable).join(" ");
