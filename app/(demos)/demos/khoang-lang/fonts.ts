import { Quicksand, Be_Vietnam_Pro } from "next/font/google";

export const klHead = Quicksand({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--kl-f-head",
  display: "swap",
});
export const klBody = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--kl-f-body",
  display: "swap",
});

export const fontVars = [klHead.variable, klBody.variable].join(" ");
