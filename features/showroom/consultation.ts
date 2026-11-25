import { getDemo } from "./registry";

/**
 * URL form tư vấn thật của website chính. Cookie `tct_ref` (đặt bởi proxy.ts khi
 * có ?ref=) là first-party nên tự đi theo khi điều hướng cùng domain; ta không cần
 * (và không được) tự đọc/ghi lại cookie này ở demo.
 */
export function buildConsultHref(slug: string) {
  const demo = getDemo(slug);
  const q = new URLSearchParams();
  if (demo) {
    q.set("industry", demo.industry);
    q.set("solution", demo.solutionSlug);
    q.set("utm_source", "showroom");
    q.set("utm_campaign", demo.slug);
  }
  const qs = q.toString();
  return `/lien-he${qs ? `?${qs}` : ""}`;
}

export function buildSolutionHref(slug: string) {
  const demo = getDemo(slug);
  return demo ? `/solutions/${demo.solutionSlug}` : "/solutions";
}
