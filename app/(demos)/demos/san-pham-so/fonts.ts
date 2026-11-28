import { Hanken_Grotesk } from "next/font/google";

/** Hanken Grotesk (biến thiên) – grotesk rộng, nhẹ, gần với chữ trong video; có subset vietnamese. */
export const hanken = Hanken_Grotesk({
  subsets: ["vietnamese", "latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--sp-font",
});

export const fontVars = hanken.variable;
