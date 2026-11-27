import { Exo_2, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

export const exo = Exo_2({ subsets: ["vietnamese", "latin"], variable: "--vt-exo", display: "swap" });
export const plex = IBM_Plex_Sans({ subsets: ["vietnamese", "latin"], weight: "variable", variable: "--vt-plex", display: "swap" });
export const plexMono = IBM_Plex_Mono({ subsets: ["vietnamese", "latin"], weight: ["400", "500"], variable: "--vt-mono", display: "swap" });

export const fontVars = [exo, plex, plexMono].map((f) => f.variable).join(" ");
