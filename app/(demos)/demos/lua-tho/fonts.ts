import { Lora, Nunito_Sans } from "next/font/google";

export const lora = Lora({ subsets: ["vietnamese", "latin"], style: ["normal", "italic"], variable: "--lt-lora", display: "swap" });
export const nunito = Nunito_Sans({ subsets: ["vietnamese", "latin"], variable: "--lt-nunito", display: "swap" });

export const fontVars = [lora, nunito].map((f) => f.variable).join(" ");
