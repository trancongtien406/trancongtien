import { siteConfig } from "@/lib/site";

/** Link theo dõi nguồn đối tác (first-party cookie `tct_ref` qua proxy). */
export function buildPartnerTrackLink(input: {
  path?: string;
  code: string;
  origin?: string;
}) {
  const origin = (input.origin || siteConfig.url).replace(/\/$/, "");
  const path = input.path || "/";
  const url = new URL(path.startsWith("http") ? path : `${origin}${path.startsWith("/") ? path : `/${path}`}`);
  url.searchParams.set("ref", input.code.toUpperCase());
  url.searchParams.set("utm_source", "partner");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", input.code.toUpperCase());
  return url.toString();
}

export function buildPartnerShortLink(code: string, origin?: string) {
  const base = (origin || siteConfig.url).replace(/\/$/, "");
  return `${base}/r/${code.toUpperCase()}`;
}

export const PARTNER_TRACK_TARGETS = [
  { path: "/", label: "Trang chủ" },
  { path: "/solutions", label: "Danh sách giải pháp" },
  { path: "/solutions/spa", label: "Spa & Beauty" },
  { path: "/solutions/real-estate", label: "Bất động sản" },
  { path: "/solutions/construction", label: "Xây dựng" },
  { path: "/solutions/clinic", label: "Y tế & Thẩm mỹ" },
  { path: "/solutions/fnb", label: "F&B" },
  { path: "/solutions/education", label: "Giáo dục" },
  { path: "/solutions/ecommerce", label: "Thương mại điện tử" },
  { path: "/solutions/logistics", label: "Logistics" },
  { path: "/solutions/hospitality", label: "Lưu trú" },
  { path: "/solutions/fitness", label: "Gym & Yoga" },
  { path: "/solutions/agency", label: "Agency & Studio" },
  { path: "/solutions/sme-ops", label: "Vận hành SME" },
  { path: "/lien-he", label: "Form tư vấn" },
] as const;
