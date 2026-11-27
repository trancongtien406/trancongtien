import { Fraunces, Manrope } from "next/font/google";

const head = Fraunces({ subsets: ["vietnamese", "latin"], style: ["normal", "italic"], display: "swap", variable: "--lm-fh" });
const body = Manrope({ subsets: ["vietnamese", "latin"], display: "swap", variable: "--lm-fb" });

export const fontVars = `${head.variable} ${body.variable}`;
