import { Be_Vietnam_Pro, Bitter } from "next/font/google";

const body = Be_Vietnam_Pro({ subsets: ["vietnamese", "latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--cb-fb" });
const head = Bitter({ subsets: ["latin", "latin-ext"], weight: ["500", "600", "700"], display: "swap", variable: "--cb-fh" });

export const fontVars = `${body.variable} ${head.variable}`;
