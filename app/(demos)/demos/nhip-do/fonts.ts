import { Teko, Barlow_Condensed, Archivo } from "next/font/google";

/**
 * Teko chỉ có subset latin / latin-ext / devanagari (không có vietnamese), nên các chữ có dấu tiếng Việt
 * (ị, ộ, ặ...) được lấy theo từng glyph từ Barlow Condensed, cũng là grotesk hẹp và có subset vietnamese.
 */
export const ndHead = Teko({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--nd-f-head",
  display: "swap",
});
export const ndHeadVi = Barlow_Condensed({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--nd-f-head-vi",
  display: "swap",
});
export const ndBody = Archivo({
  subsets: ["vietnamese", "latin"],
  variable: "--nd-f-body",
  display: "swap",
});

export const fontVars = [ndHead.variable, ndHeadVi.variable, ndBody.variable].join(" ");
