import { Oswald, Archivo } from "next/font/google";

const head = Oswald({ subsets: ["vietnamese", "latin"], display: "swap", variable: "--pd-fh" });
const body = Archivo({ subsets: ["vietnamese", "latin"], display: "swap", variable: "--pd-fb" });

export const fontVars = `${head.variable} ${body.variable}`;
