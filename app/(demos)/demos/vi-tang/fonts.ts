import { Cormorant_Garamond, Barlow } from "next/font/google";

export const vtHead = Cormorant_Garamond({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--vt-f-head",
  display: "swap",
});
export const vtBody = Barlow({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--vt-f-body",
  display: "swap",
});

export const fontVars = [vtHead.variable, vtBody.variable].join(" ");
