import { Archivo } from "next/font/google";

const f = Archivo({ subsets: ["vietnamese", "latin"], display: "swap", variable: "--am-f" });

export const fontVars = f.variable;
