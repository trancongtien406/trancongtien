import { ContactPage } from "@/features/contact/ContactPage";
import { getPublishedFaqs } from "@/lib/content";
import {
  breadcrumbJsonLd,
  buildMetadata,
  JsonLd,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Liên hệ",
  description:
    "Đặt lịch tư vấn miễn phí với Trần Công Tiến — Full-stack Developer, thiết kế app ứng dụng và AI Agent tại Đà Nẵng. Phản hồi trong 24 giờ.",
  path: "/lien-he",
});

export default async function Page() {
  const faqs = await getPublishedFaqs();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Liên hệ", path: "/lien-he" },
        ])}
      />
      <ContactPage
        faqs={faqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />
    </>
  );
}
