import { Archivo, Be_Vietnam_Pro } from "next/font/google";

/** Archivo (trục wdth cho chữ condensed/extended) + Be Vietnam Pro cho thân bài. Cả hai có subset vietnamese. */
export const archivo = Archivo({ subsets: ["vietnamese", "latin", "latin-ext"], axes: ["wdth"], variable: "--vt-archivo", display: "swap" });
export const bevn = Be_Vietnam_Pro({ subsets: ["vietnamese", "latin", "latin-ext"], weight: ["400", "500", "600", "700"], variable: "--vt-bevn", display: "swap" });

export const fontVars = [archivo, bevn].map((f) => f.variable).join(" ");
