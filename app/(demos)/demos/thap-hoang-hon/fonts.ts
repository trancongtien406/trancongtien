import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";

export const serif = Newsreader({ subsets: ["vietnamese", "latin", "latin-ext"], style: ["normal", "italic"], weight: ["300", "400"], variable: "--th-serif", display: "swap" });
export const sans = Inter({ subsets: ["vietnamese", "latin", "latin-ext"], variable: "--th-sans", display: "swap" });
export const mono = IBM_Plex_Mono({ subsets: ["vietnamese", "latin", "latin-ext"], weight: ["400", "500"], variable: "--th-mono", display: "swap" });

export const fontVars = [serif, sans, mono].map((f) => f.variable).join(" ");
