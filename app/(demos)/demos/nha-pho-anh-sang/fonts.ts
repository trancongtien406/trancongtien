import { Archivo, Newsreader, JetBrains_Mono } from "next/font/google";

export const archivo = Archivo({ subsets: ["vietnamese", "latin", "latin-ext"], axes: ["wdth"], variable: "--np-archivo", display: "swap" });
export const newsreader = Newsreader({ subsets: ["vietnamese", "latin", "latin-ext"], style: ["italic", "normal"], variable: "--np-serif", display: "swap" });
export const mono = JetBrains_Mono({ subsets: ["vietnamese", "latin", "latin-ext"], variable: "--np-monof", display: "swap" });

export const fontVars = [archivo, newsreader, mono].map((f) => f.variable).join(" ");
