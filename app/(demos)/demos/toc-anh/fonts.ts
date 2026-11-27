import { Chakra_Petch, Barlow } from "next/font/google";

const head = Chakra_Petch({ subsets: ["vietnamese", "latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], display: "swap", variable: "--ta-fh" });
const body = Barlow({ subsets: ["vietnamese", "latin"], weight: ["300", "400", "500", "600", "700"], display: "swap", variable: "--ta-fb" });

export const fontVars = `${head.variable} ${body.variable}`;
