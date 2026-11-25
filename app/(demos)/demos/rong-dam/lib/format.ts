import type { Lang } from "../data/tours";

const nf = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
/** Luôn VND, không đổi sang USD khi chuyển EN. Dùng NBSP giữa số và đơn vị. */
export function vnd(n: number): string {
  return nf.format(n).replace(/\s/g, " ");
}
export function pick<T extends { vi: string; en: string }>(v: T, lang: Lang): string {
  return v[lang];
}
