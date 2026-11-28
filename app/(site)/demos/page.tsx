import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Container, SectionEyebrow } from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import { DemoCard } from "@/features/showroom/DemoCard";
import { DEMOS } from "@/features/showroom/registry";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Website demo mẫu theo ngành nghề",
  description:
    "Bảy mươi website demo cho spa, villa, tour, cafe, nhà hàng, nha khoa, pilates, nội thất, ảnh cưới, tiệm tóc, bar, tiệm bánh, gym, trang sức, căn hộ và nhiều ngành khác. Thương hiệu minh hoạ do Trần Công Tiến thiết kế, mỗi demo một nhận diện riêng.",
  path: "/demos",
});

export default function DemosIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Demo theo ngành", path: "/demos" },
        ])}
      />
      <section className="border-b border-border bg-surface-muted">
        <Container className="py-16 lg:py-24">
          <SectionEyebrow>Showroom</SectionEyebrow>
          <h1 className="mt-5 max-w-4xl text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl">
            Website của bạn có thể trông như thế này
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-muted">
            Bảy mươi website demo cho bảy mươi ngành nghề, mỗi cái một nhận diện riêng: tên thương hiệu,
            logo, ảnh, chữ, màu và chuyển động. Bấm vào để dùng thử như một khách hàng.
          </p>
          <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-surface p-5 text-sm leading-7 text-ink-muted">
            <p className="font-semibold text-ink">Nói rõ để bạn không hiểu nhầm</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Tên thương hiệu, logo, giá, lịch và nội dung đều là minh hoạ do mình tạo ra, không phải doanh nghiệp có thật.</li>
              <li>Ảnh là ảnh stock chụp thật (có ghi công trong trang credits của từng demo), không phải ảnh của cơ sở nào trong demo.</li>
              <li>Các tính năng đặt chỗ, tính giá, lọc là mô phỏng chạy trên trình duyệt, chưa nối hệ thống thật. Chỉ form tư vấn của mình mới gửi được tới mình.</li>
            </ul>
          </div>
          <div className="mt-8">
            <Button href="/lien-he" size="lg" iconRight={<ArrowRight className="size-4" />}>
              Trao đổi dự án của bạn
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {DEMOS.map((demo, i) => (
              <li key={demo.slug}>
                <DemoCard demo={demo} priority={i < 3} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner title="Muốn một website riêng cho ngành của bạn?" href="/lien-he" />
    </>
  );
}
