import { redirect } from "next/navigation";
import { PartnerLoginForm } from "@/features/partner/PartnerLoginForm";
import { getSessionPartner } from "@/lib/partners/auth";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Cổng đối tác",
  description:
    "Đăng nhập chương trình giới thiệu để gửi giải pháp, đăng ký lead và theo dõi trạng thái.",
  path: "/doi-tac",
  noindex: true,
});

export default async function PartnerLoginPage() {
  const partner = await getSessionPartner();
  if (partner) redirect("/doi-tac/bang-dieu-khien");
  return <PartnerLoginForm />;
}
