import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Download,
  Goal,
  Mail,
  Plane,
  ShieldCheck,
  Volleyball,
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
  { title: "Uy tín", text: "Nói thật, làm thật" },
  { title: "Đúng sản phẩm", text: "Bài toán trước công nghệ" },
  { title: "Có trách nhiệm", text: "Theo sát đến cùng" },
];

const hobbies = [
  { icon: Volleyball, label: "Cầu lông" },
  { icon: Goal, label: "Đá bóng" },
  { icon: Plane, label: "Du lịch" },
  { icon: BadgeCheck, label: "Trải nghiệm cuộc sống" },
];

const principles = [
  {
    icon: ShieldCheck,
    title: "Uy tín trong cam kết",
    description:
      "Trao đổi rõ phạm vi, tiến độ và rủi ro; không hứa những điều sản phẩm không thể đáp ứng.",
  },
  {
    icon: BadgeCheck,
    title: "Làm đúng sản phẩm",
    description:
      "Bắt đầu từ nhu cầu người dùng và mục tiêu kinh doanh trước khi quyết định công nghệ.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Có trách nhiệm đến cùng",
    description:
      "Chủ động theo sát từ lúc làm rõ ý tưởng, phát triển, triển khai đến khi sản phẩm vận hành.",
  },
];

function getAge(birthDate: string) {
  const today = new Date();
  const birth = new Date(`${birthDate}T00:00:00`);
  let age = today.getFullYear() - birth.getFullYear();
  const hasNotHadBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  if (hasNotHadBirthday) age -= 1;
  return age;
}

export function AboutPage({
  values,
  journey,
  cvUrl,
}: {
  values: ValueItem[];
  journey: JourneyEntry[];
  cvUrl?: string;
}) {
  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-soft/40 to-surface">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="space-y-6">
            <SectionEyebrow>Về tôi</SectionEyebrow>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Xin chào, tôi là{" "}
              <span className="text-brand">{siteConfig.fullName}.</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Solo Full-stack Developer tại Đà Nẵng, nhận freelance và hợp đồng
              dự án cho startup, cá nhân — từ website, backend, mobile app đến AI.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-brand" />
                Sinh ngày 04/06/2003 · {getAge(siteConfig.birthDate)} tuổi
              </span>
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="size-4 text-brand" />
                Bắt đầu làm sản phẩm từ 2023
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/lien-he" iconRight={<ArrowRight className="size-4" />}>
                Đặt lịch trò chuyện
              </Button>
              <Button
                href={cvUrl || "#"}
                variant="secondary"
                iconLeft={<Download className="size-4" />}
                download
                className={!cvUrl ? "pointer-events-none opacity-60" : undefined}
              >
                {cvUrl ? "Tải CV của tôi" : "CV chưa cập nhật"}
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
          <figure className="relative mx-auto w-full max-w-md">
            <Image
              src={siteConfig.personImage}
              alt={`${siteConfig.fullName} — chân dung Full-stack Developer và AI Agent Builder`}
              width={640}
              height={800}
              className="aspect-4/5 w-full rounded-3xl object-cover object-top shadow-2xl"
              priority
            />
            <figcaption className="mt-3 text-center text-sm text-ink-muted">
              {siteConfig.fullName} — {siteConfig.tagline} tại Đà Nẵng
            </figcaption>
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
          </figure>
        </Container>
      </section>

      <section className="py-16 sm:py-20" id="story">
        <Container className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionEyebrow>Câu chuyện của tôi</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">
              Một người có thể đi cùng sản phẩm từ ý tưởng đến vận hành
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              <p>
                Tôi sinh năm 2003, bắt đầu đại học vào năm 2021 và chính thức làm
                sản phẩm từ năm 2023. Điểm xuất phát của tôi là website với Next.js,
                sau đó mở rộng sang backend bằng Node.js, NestJS, Python và Java.
              </p>
              <p>
                Để có thể xây dựng một sản phẩm trọn vẹn, tôi tiếp tục học mobile
                với Flutter, Dart và BLoC; làm việc với PostgreSQL, MySQL, MongoDB
                và ứng dụng Python vào các bài toán AI. Tôi hướng tới khả năng của
                một solo developer: hiểu và thực hiện toàn bộ hành trình từ giao diện,
                backend, dữ liệu, mobile đến triển khai.
              </p>
              <p>
                Tôi muốn đồng hành với startup và cá nhân ở nhiều bài toán thực tế
                như CRM, booking, e-commerce, landing page và các sản phẩm số mới.
                Điều quan trọng nhất với tôi không phải làm thật nhiều tính năng,
                mà là làm đúng sản phẩm và chịu trách nhiệm với điều mình đã cam kết.
              </p>
            </div>
            <blockquote className="mt-6 rounded-2xl bg-brand-soft p-5 text-sm italic text-ink-muted">
              “A ship in harbor is safe, but that is not what ships are built for.”
            </blockquote>
          </div>
          <div className="lg:col-span-3">
            <SectionHeading title="Điều tôi đặt lên hàng đầu" />
            <div className="mt-6 grid gap-4">
              {principles.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="flex gap-4 rounded-2xl border border-border bg-surface p-5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {values.length > 0 ? (
              <div className="mt-8">
                <h3 className="font-display text-xl font-bold text-ink">
                  Cách tôi làm việc mỗi ngày
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {values.slice(0, 4).map((value) => (
                    <div
                      key={value.title}
                      className="rounded-2xl bg-surface-muted p-4"
                    >
                      <p className="text-sm font-semibold text-ink">{value.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeading title="Công nghệ tôi sử dụng" />
            <TechLogoGrid names={[...ABOUT_TECHS]} className="mt-6" />
          </div>
          <div className="lg:col-span-2">
            <SectionHeading title="Phạm vi tôi có thể đảm nhận" />
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink-muted">
              {[
                "Frontend website và landing page với Next.js, React, TypeScript",
                "Backend API với Node.js, NestJS, Python hoặc Java",
                "Mobile app Flutter theo kiến trúc BLoC",
                "Cơ sở dữ liệu PostgreSQL, MySQL và MongoDB",
                "Tích hợp AI bằng Python vào sản phẩm và quy trình",
                "Các hệ thống CRM, booking, e-commerce và sản phẩm theo yêu cầu",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
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
                className="aspect-8/5 w-full object-cover"
              />
            </div>
            <p className="mt-4 text-center text-sm italic text-ink-muted">
              Tôi thích vận động, đi đây đó và trải nghiệm cuộc sống ngoài màn hình.
            </p>
          </div>
        </Container>
      </section>

      <CtaBanner title="Bạn có ý tưởng về một sản phẩm tuyệt vời? Hãy cùng bàn cách hiện thực hóa." />
    </>
  );
}
