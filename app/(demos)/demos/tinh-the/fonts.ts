import { Prata, Raleway } from "next/font/google";

export const ttHead = Prata({
  subsets: ["vietnamese", "latin"],
  weight: "400",
  variable: "--tt-f-head",
  display: "swap",
});
export const ttBody = Raleway({
  subsets: ["vietnamese", "latin"],
  variable: "--tt-f-body",
  display: "swap",
});

export const fontVars = [ttHead.variable, ttBody.variable].join(" ");
