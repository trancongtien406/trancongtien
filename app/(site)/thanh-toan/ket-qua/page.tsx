import Link from "next/link";
import { Container } from "@/components/common/Container";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Thanh toán thành công",
  description: "Kết quả thanh toán PayOS",
  path: "/thanh-toan/ket-qua",
  noindex: true,
});

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const orderCode = typeof params.orderCode === "string" ? params.orderCode : "";
  const status = typeof params.status === "string" ? params.status : "";

  return (
    <section className="py-20">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Thanh toán
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink">
          Đã nhận kết quả từ cổng thanh toán
        </h1>
        <p className="mt-4 text-sm leading-7 text-ink-muted">
          Hệ thống sẽ xác nhận giao dịch qua webhook PayOS. Nếu tiền đã vào,
          trạng thái lead và hoa hồng đối tác sẽ được cập nhật tự động.
        </p>
        {(orderCode || status) && (
          <p className="mt-4 text-xs text-ink-subtle">
            Mã đơn: {orderCode || "—"} · Trạng thái: {status || "—"}
          </p>
        )}
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white"
        >
          Về trang chủ
        </Link>
      </Container>
    </section>
  );
}
