import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--mt-serif",
  display: "swap",
});

export const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--mt-sans",
  display: "swap",
});

export const fontVars = `${cormorant.variable} ${beVietnam.variable}`;
