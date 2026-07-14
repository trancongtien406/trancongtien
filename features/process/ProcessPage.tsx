import Image from "next/image";
import {
  ClipboardList,
  Cloud,
  Code2,
  Handshake,
  LineChart,
  Pencil,
  Search,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { OrgGraph } from "@/components/common/OrgGraph";
import {
  Breadcrumbs,
  Container,
  SectionEyebrow,
  SectionHeading,
} from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import { TechBadge } from "@/components/common/TechBadge";
import { PROCESS_TECH_GROUPS } from "@/lib/tech";

type Step = {
  step: string;
  title: string;
  tasks: string;
  time: string;
};

const principles = [
  {
    icon: Shield,
    title: "Minh bạch",
    text: "Cập nhật tiến độ và rủi ro rõ ràng mỗi tuần.",
  },
  {
    icon: Zap,
    title: "Hiệu quả",
    text: "Ưu tiên công việc tạo giá trị cao nhất trước.",
  },
  {
    icon: Sparkles,
    title: "Linh hoạt",
    text: "Điều chỉnh scope theo dữ liệu và phản hồi.",
  },
  {
    icon: Handshake,
    title: "Đồng hành",
    text: "Làm việc như một thành viên trong team của bạn.",
  },
];

const stepIcons = [Search, ClipboardList, Pencil, Code2, Cloud, LineChart];

const methods = [
  {
    title: "Agile / Scrum",
    text: "Làm việc theo sprint ngắn, demo định kỳ và phản hồi liên tục.",
  },
  {
    title: "Giao tiếp minh bạch",
    text: "Slack / Notion / Email — cập nhật trạng thái dễ theo dõi.",
  },
  {
    title: "Tập trung vào kết quả",
    text: "Ưu tiên outcome nghiệp vụ và trải nghiệm người dùng.",
  },
  {
    title: "Bảo mật & chất lượng",
    text: "Best practices, review code và kiểm thử trước khi ship.",
  },
];

export function ProcessPage({ steps }: { steps: Step[] }) {
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-brand-soft/40 to-surface">
        <Container className="py-14 lg:py-20">
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Quy trình" },
            ]}
          />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <SectionEyebrow>Quy trình làm việc</SectionEyebrow>
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Quy trình rõ ràng, Kết quả vượt mong đợi.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Làm việc theo khung khoa học và minh bạch giúp giảm rủi ro, giữ
                đúng tiến độ và luôn bám sát mục tiêu sản phẩm.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {principles.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <item.icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-muted">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src="/images/illustrations/process-roadmap.png"
                  alt="Sơ đồ lộ trình 6 bước phát triển sản phẩm với các mốc quan trọng"
                  width={900}
                  height={700}
                  className="w-full rounded-3xl object-cover shadow-xl"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-border bg-white/95 p-4 shadow-lg backdrop-blur sm:left-auto sm:right-6 sm:w-64">
                  <p className="text-sm font-semibold text-ink">Mục tiêu cuối cùng</p>
                  <p className="mt-1 text-sm text-ink-muted">
                    Sản phẩm chất lượng cao, mang lại giá trị thật cho người dùng.
                  </p>
                </div>
              </div>
              <OrgGraph className="w-full overflow-hidden rounded-3xl border border-border shadow-sm" />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            align="center"
            title="6 bước để tạo nên sản phẩm thành công"
            description="Từ khám phá đến đồng hành dài hạn — mỗi bước có đầu ra rõ ràng."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = stepIcons[index] ?? Search;
              return (
                <article
                  key={step.step}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-display text-2xl font-bold text-brand/25">
                      {step.step}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-bold text-ink">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {step.tasks}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand">
                    Thời gian: {step.time}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Công cụ & Công nghệ" />
            <div className="mt-8 space-y-5">
              {PROCESS_TECH_GROUPS.map((group) => (
                <div key={group.group}>
                  <h3 className="text-sm font-semibold text-ink">{group.group}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <TechBadge key={item} name={item} size="sm" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="Phương pháp làm việc" />
            <dl className="mt-8 space-y-4">
              {methods.map((method) => (
                <div
                  key={method.title}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <dt className="font-semibold text-ink">{method.title}</dt>
                  <dd className="mt-1 text-sm text-ink-muted">{method.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <CtaBanner
        variant="soft"
        title="Sẵn sàng bắt đầu dự án của bạn?"
        description="Đặt lịch tư vấn miễn phí để nhận đề xuất lộ trình phù hợp."
      />
    </>
  );
}
