import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Lightbulb,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import {
  Container,
  SectionEyebrow,
  SectionHeading,
} from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";

type ServiceItem = {
  id: string;
  number: string;
  title: string;
  slug: string;
  items: string[];
  color: string;
};

type ProcessItem = { step: string; title: string; description: string };

const pillars = [
  {
    icon: Lightbulb,
    title: "Tư duy sản phẩm",
    text: "Bám sát giá trị người dùng và mục tiêu kinh doanh.",
  },
  {
    icon: Code2,
    title: "Công nghệ hiện đại",
    text: "Stack phù hợp, dễ mở rộng và bảo trì.",
  },
  {
    icon: Zap,
    title: "Tốc độ có kiểm soát",
    text: "Ship nhanh với chất lượng ổn định.",
  },
  {
    icon: Shield,
    title: "An toàn & bền vững",
    text: "Bảo mật, monitoring và vận hành rõ ràng.",
  },
];

export function ServicesPage({
  services,
  process,
}: {
  services: ServiceItem[];
  process: ProcessItem[];
}) {
  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-soft/50 to-surface">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="space-y-6">
            <SectionEyebrow>Dịch vụ</SectionEyebrow>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Giải pháp phát triển sản phẩm toàn diện – Từ ý tưởng đến tăng
              trưởng
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Đồng hành cùng startup và doanh nghiệp ở mọi giai đoạn: khám phá,
              thiết kế, phát triển, triển khai và tối ưu liên tục.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <item.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm text-ink-muted">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-brand/10 blur-2xl" />
            <Image
              src="/images/illustrations/services-devices.webp"
              alt="Mockup laptop và smartphone hiển thị dashboard sản phẩm SaaS"
              width={900}
              height={700}
              className="relative w-full rounded-3xl object-cover shadow-xl"
              preload
            />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20" id="linh-vuc">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Lĩnh vực dịch vụ"
            title="Tôi có thể giúp bạn"
            description="Năm nhóm dịch vụ phủ trọn vòng đời sản phẩm số."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.slug}
                className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <div
                  className={`mb-4 flex size-12 items-center justify-center rounded-2xl text-base font-bold ${service.color}`}
                >
                  {service.number}
                </div>
                <h2 className="font-display text-lg font-bold text-ink">
                  {service.title}
                </h2>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-ink-muted"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/lien-he"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand"
                >
                  Tìm hiểu thêm <ArrowRight className="size-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <SectionHeading
              title="Quy trình rõ ràng – kết quả vượt mong đợi"
              description="Mỗi dự án đi theo khung 6 bước để giảm rủi ro, tăng minh bạch và giữ đúng tiến độ."
            />
            <Button href="/quy-trinh" iconRight={<ArrowRight className="size-4" />}>
              Xem chi tiết quy trình
            </Button>
          </div>
          <ol className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {process.map((step) => (
              <li
                key={step.step}
                className="rounded-2xl border border-border bg-surface p-4 text-center"
              >
                <p className="text-xs font-bold text-brand">{step.step}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{step.title}</p>
                <p className="mt-1 text-xs text-ink-subtle">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Những dự án đã thực hiện"
            action={
              <Link
                href="/du-an"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand"
              >
                Xem tất cả dự án <ArrowRight className="size-4" />
              </Link>
            }
          />
          <p className="mt-4 max-w-2xl text-ink-muted">
            Từ marketplace, booking, CRM đến AI — mỗi sản phẩm đều được xây với
            tư duy end-to-end và cam kết chất lượng production.
          </p>
        </Container>
      </section>

      <CtaBanner
        variant="navy"
        title="Bạn có ý tưởng sản phẩm?"
        description="Hãy bắt đầu bằng một buổi tư vấn miễn phí để làm rõ hướng đi phù hợp."
      />
    </>
  );
}
