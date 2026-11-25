import { redirect } from "next/navigation";
import { isValidReferralFormat, normalizeReferralCode } from "@/lib/partners/codes";

export const dynamic = "force-dynamic";

/** Short track link: /r/CTV001 → /?ref=CTV001 (+ UTM). Cookie `tct_ref` set bởi proxy. */
export default async function PartnerTrackRedirectPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { code: raw } = await params;
  const code = normalizeReferralCode(raw);
  if (!code || !isValidReferralFormat(code)) {
    redirect("/");
  }

  const query = await searchParams;
  const to =
    typeof query.to === "string" && query.to.startsWith("/")
      ? query.to
      : "/";
  const url = new URL(to, "https://local.invalid");
  url.searchParams.set("ref", code);
  url.searchParams.set("utm_source", "partner");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", code);
  redirect(`${url.pathname}${url.search}`);
}
