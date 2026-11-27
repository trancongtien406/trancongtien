import { Bebas_Neue, Anton, Montserrat } from "next/font/google";

/**
 * Bebas Neue không có subset vietnamese: chữ có dấu rơi xuống Anton (cùng kiểu condensed, có vietnamese).
 */
export const bebas = Bebas_Neue({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--ma-bebas", display: "swap" });
export const anton = Anton({ weight: "400", subsets: ["vietnamese", "latin"], variable: "--ma-anton", display: "swap" });
export const montserrat = Montserrat({ subsets: ["vietnamese", "latin"], variable: "--ma-mont", display: "swap" });

export const fontVars = [bebas, anton, montserrat].map((f) => f.variable).join(" ");
