import Link from "next/link";
import { Container } from "@/components/common/Container";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Huỷ thanh toán",
  description: "Thanh toán PayOS đã bị huỷ",
  path: "/thanh-toan/huy",
});

export default function PaymentCancelPage() {
  return (
    <section className="py-20">
      <Container className="max-w-xl text-center">
        <h1 className="font-display text-3xl font-bold text-ink">
          Thanh toán đã được huỷ
        </h1>
        <p className="mt-4 text-sm leading-7 text-ink-muted">
          Bạn có thể liên hệ lại nếu cần hỗ trợ tạo link thanh toán mới.
        </p>
        <Link
          href="/lien-he"
          className="mt-8 inline-flex rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white"
        >
          Liên hệ hỗ trợ
        </Link>
      </Container>
    </section>
  );
}
