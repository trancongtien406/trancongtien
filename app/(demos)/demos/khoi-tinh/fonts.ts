import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";

const head = Cormorant_Garamond({ subsets: ["vietnamese", "latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], display: "swap", variable: "--kt-fh" });
const body = Be_Vietnam_Pro({ subsets: ["vietnamese", "latin"], weight: ["300", "400", "500", "600"], display: "swap", variable: "--kt-fb" });

export const fontVars = `${head.variable} ${body.variable}`;
