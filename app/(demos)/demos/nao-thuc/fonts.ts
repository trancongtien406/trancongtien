import { Space_Grotesk, Be_Vietnam_Pro } from "next/font/google";

const head = Space_Grotesk({ subsets: ["vietnamese", "latin"], display: "swap", variable: "--nao-fh" });
const body = Be_Vietnam_Pro({ subsets: ["vietnamese", "latin"], weight: ["300", "400", "500", "600", "700"], display: "swap", variable: "--nao-fb" });

export const fontVars = `${head.variable} ${body.variable}`;
