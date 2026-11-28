import { Anton, Be_Vietnam_Pro } from "next/font/google";

const head = Anton({ subsets: ["vietnamese", "latin"], weight: "400", display: "swap", variable: "--bt-fh" });
const body = Be_Vietnam_Pro({ subsets: ["vietnamese", "latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--bt-fb" });

export const fontVars = `${head.variable} ${body.variable}`;
