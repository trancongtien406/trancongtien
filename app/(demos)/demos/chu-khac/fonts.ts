import { Literata, Space_Mono } from "next/font/google";

export const ckHead = Literata({
  subsets: ["vietnamese", "latin"],
  style: ["normal", "italic"],
  variable: "--ck-f-head",
  display: "swap",
});
export const ckMono = Space_Mono({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "700"],
  variable: "--ck-f-mono",
  display: "swap",
});

export const fontVars = [ckHead.variable, ckMono.variable].join(" ");
