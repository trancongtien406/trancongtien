import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Download,
  Dumbbell,
  Mail,
  Music,
  Plane,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import {
  Container,
  SectionEyebrow,
  SectionHeading,
} from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import {
  IconFacebook,
  IconGithub,
  IconLinkedin,
} from "@/components/common/SocialIcons";
import { TechLogoGrid } from "@/components/common/TechBadge";
import { ABOUT_TECHS } from "@/lib/tech";
import { siteConfig } from "@/lib/site";

type ValueItem = { title: string; description: string };
type JourneyEntry = { year: string; title: string; description: string };

const floatingCards = [
  { title: "Tư duy sản phẩm", text: "Bài toán trước công nghệ" },
  { title: "Kỹ thuật vững chắc", text: "Code sạch, dễ scale" },
  { title: "Đồng hành dài hạn", text: "Không dừng ở bàn giao" },
];

const hobbies = [
  { icon: BookOpen, label: "Đọc sách" },
  { icon: Dumbbell, label: "Gym" },
  { icon: Plane, label: "Du lịch" },
  { icon: Music, label: "Âm nhạc" },
  { icon: Camera, label: "Nhiếp ảnh" },
];

const aboutStats = [
  { value: siteConfig.stats.projects, label: "Dự án hoàn thành" },
  { value: siteConfig.stats.domains, label: "Lĩnh vực kinh nghiệm" },
  { value: siteConfig.stats.years, label: "Năm kinh nghiệm" },
  { value: siteConfig.stats.satisfaction, label: "Khách hàng hài lòng" },
];

export function AboutPage({
  values,
  journey,
}: {
  values: ValueItem[];
  journey: JourneyEntry[];
}) {
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-brand-soft/40 to-surface">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="space-y-6">
            <SectionEyebrow>Về tôi</SectionEyebrow>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Xin chào, tôi là{" "}
              <span className="text-brand">{siteConfig.fullName}.</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Product Engineer giúp startup và doanh nghiệp biến ý tưởng thành
              sản phẩm số — với tư duy sản phẩm rõ ràng và kỹ thuật vững chắc.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/lien-he" iconRight={<ArrowRight className="size-4" />}>
                Đặt lịch trò chuyện
              </Button>
              <Button
                href="/lien-he"
                variant="secondary"
                iconLeft={<Download className="size-4" />}
              >
                Tải CV của tôi
              </Button>
            </div>
            <div className="flex gap-2 pt-2">
              {[
                { href: siteConfig.social.linkedin, Icon: IconLinkedin, label: "LinkedIn" },
                { href: siteConfig.social.github, Icon: IconGithub, label: "GitHub" },
                { href: siteConfig.social.facebook, Icon: IconFacebook, label: "Facebook" },
                { href: `mailto:${siteConfig.email}`, Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-ink-muted transition hover:border-brand hover:text-brand"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <Image
              src="/images/avatars/portrait-hero.png"
              alt={`${siteConfig.fullName} — chân dung Product Engineer`}
              width={640}
              height={800}
              className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-2xl"
              priority
            />
            <div className="absolute -right-3 top-8 hidden w-44 space-y-3 sm:block">
              {floatingCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-border bg-white p-3 shadow-lg"
                >
                  <p className="text-sm font-semibold text-ink">{card.title}</p>
                  <p className="text-xs text-ink-subtle">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20" id="story">
        <Container className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionEyebrow>Câu chuyện của tôi</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">
              Vì sao tôi làm Product Engineering
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              <p>
                Tôi bắt đầu từ lập trình web, rồi nhận ra sản phẩm thành công
                không chỉ đến từ code đẹp — mà từ việc hiểu đúng bài toán, người
                dùng và cách đo lường giá trị.
              </p>
              <p>
                Product Engineering Studio là nơi tôi kết hợp tư duy sản phẩm với
                kỹ thuật end-to-end để giúp đội ngũ ship nhanh hơn, ít rủi ro hơn.
              </p>
            </div>
            <blockquote className="mt-6 rounded-2xl bg-brand-soft p-5 text-sm italic text-ink-muted">
              “Công nghệ chỉ mạnh khi phục vụ đúng vấn đề — và đúng người dùng.”
            </blockquote>
          </div>
          <div className="lg:col-span-3">
            <SectionHeading title="Giá trị cốt lõi" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <h3 className="font-semibold text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Công nghệ tôi làm việc" />
            <TechLogoGrid names={[...ABOUT_TECHS]} className="mt-6" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-surface p-5 text-center"
              >
                <p className="font-display text-3xl font-bold text-brand">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20" id="journey">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Quá trình học tập & làm việc" />
            <ol className="relative mt-8 space-y-6 border-l-2 border-brand/20 pl-6">
              {journey.map((item) => (
                <li key={item.year} className="relative">
                  <span className="absolute -left-[1.9rem] top-1 size-3 rounded-full bg-brand" />
                  <p className="text-xs font-bold uppercase tracking-wide text-brand">
                    {item.year}
                  </p>
                  <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading title="Ngoài công việc" />
            <div className="mt-6 flex flex-wrap gap-3">
              {hobbies.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm text-ink-muted"
                >
                  <Icon className="size-4 text-brand" />
                  {label}
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl">
              <Image
                src="/images/illustrations/about-outdoors.png"
                alt="Khung cảnh núi non lúc hoàng hôn — sở thích du lịch và khám phá"
                width={800}
                height={500}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <p className="mt-4 text-center text-sm italic text-ink-muted">
              “Đi nhiều, đọc nhiều — để nhìn sản phẩm với góc nhìn rộng hơn.”
            </p>
          </div>
        </Container>
      </section>

      <CtaBanner title="Bạn có ý tưởng về một sản phẩm tuyệt vời? Hãy cùng bàn cách hiện thực hóa." />
    </>
  );
}
