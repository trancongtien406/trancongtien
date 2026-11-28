import { Cormorant_Garamond, Philosopher } from "next/font/google";

/* Chữ hoa loe, nét đều (gần với chữ trong video): Philosopher có subset vietnamese. */
const head = Philosopher({ subsets: ["vietnamese", "latin"], weight: ["400", "700"], display: "swap", variable: "--lh-fh" });
const body = Cormorant_Garamond({ subsets: ["vietnamese", "latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--lh-fb" });

export const fontVars = `${head.variable} ${body.variable}`;
