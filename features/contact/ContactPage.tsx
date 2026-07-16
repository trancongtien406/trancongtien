"use client";

import { useState } from "react";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  Headset,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Shield,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import {
  Container,
  SectionEyebrow,
  SectionHeading,
} from "@/components/common/Container";
import { CtaBanner } from "@/components/common/CtaBanner";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { isValidEmail, isValidVnPhone } from "@/lib/validation";

type FaqItem = { question: string; answer: string };

const perks = [
  { icon: Clock, label: "Phản hồi nhanh trong 24h" },
  { icon: Headset, label: "Tư vấn miễn phí" },
  { icon: Shield, label: "Bảo mật thông tin" },
];

const contactMethods = [
  {
    icon: Calendar,
    title: "Đặt lịch tư vấn",
    text: "Chọn khung giờ phù hợp — 30 phút miễn phí.",
    href: "#form",
    action: "Đặt lịch ngay",
  },
  {
    icon: Mail,
    title: "Gửi email",
    text: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    action: "Soạn email",
  },
  {
    icon: MessageCircle,
    title: "Chat Messenger",
    text: "Nhắn tin nhanh trên Facebook Messenger.",
    href: siteConfig.social.messenger,
    action: "Mở Messenger",
  },
  {
    icon: Phone,
    title: "Kết nối Zalo",
    text: siteConfig.phoneDisplay,
    href: siteConfig.social.zalo,
    action: "Mở Zalo",
  },
  {
    icon: Send,
    title: "Kết nối LinkedIn",
    text: "Kết nối chuyên nghiệp và trao đổi cơ hội.",
    href: siteConfig.social.linkedin,
    action: "Xem LinkedIn",
  },
];

const projectTypes = [
  "Web App / SaaS",
  "Mobile App",
  "Marketplace",
  "AI Agent / Automation",
  "Tư vấn / Audit",
  "Khác",
];

const budgets = [
  "< 50 triệu",
  "50 – 100 triệu",
  "100 – 300 triệu",
  "> 300 triệu",
  "Chưa xác định",
];

const timelines = ["ASAP", "1–2 tháng", "3–6 tháng", "Linh hoạt"];

export function ContactPage({ faqs }: { faqs: FaqItem[] }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-brand-soft/40 to-surface">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="space-y-6">
            <SectionEyebrow>Liên hệ</SectionEyebrow>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Hãy bắt đầu dự án của bạn ngay hôm nay
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Chia sẻ ý tưởng của bạn — cùng làm rõ bài toán và lộ trình biến nó
              thành sản phẩm thực tế.
            </p>
            <ul className="flex flex-wrap gap-4">
              {perks.map((perk) => (
                <li
                  key={perk.label}
                  className="inline-flex items-center gap-2 text-sm text-ink-muted"
                >
                  <perk.icon className="size-4 text-brand" />
                  {perk.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="rounded-2xl bg-brand-soft p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                Upcoming meeting
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-ink">
                Tư vấn khám phá
              </p>
              <p className="mt-1 text-sm text-ink-muted">30 phút · Online</p>
              <div className="mt-4 flex -space-x-2">
                <div className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-brand text-xs font-bold text-white">
                  T
                </div>
                <div className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-slate-700 text-xs font-bold text-white">
                  You
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-ink-muted">
              Chọn kênh liên hệ bên dưới hoặc gửi form — phản hồi trong 24h.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:border-brand/30 hover:shadow-md"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <method.icon className="size-4" />
                </div>
                <h2 className="mt-3 font-semibold text-ink">{method.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">{method.text}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  {method.action} <ArrowRight className="size-3.5" />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-14 sm:py-16" id="form">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-ink">
              Gửi yêu cầu cho tôi
            </h2>
            <form
              className="mt-6 grid gap-4 sm:grid-cols-2"
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus("loading");
                setError("");
                const form = e.currentTarget;
                const fd = new FormData(form);
                const payload = {
                  name: String(fd.get("name") || "").trim(),
                  email: String(fd.get("email") || "").trim(),
                  phone: String(fd.get("phone") || "").trim(),
                  projectType: String(fd.get("type") || ""),
                  budget: String(fd.get("budget") || ""),
                  timeline: String(fd.get("timeline") || ""),
                  message: String(fd.get("description") || "").trim(),
                };

                if (!isValidEmail(payload.email)) {
                  setStatus("error");
                  setError("Email không hợp lệ. Vui lòng kiểm tra lại.");
                  return;
                }
                if (!isValidVnPhone(payload.phone)) {
                  setStatus("error");
                  setError(
                    "Số điện thoại không hợp lệ. Ví dụ: 0382802406 hoặc +84382802406.",
                  );
                  return;
                }
                if (payload.message.length < 5) {
                  setStatus("error");
                  setError("Mô tả dự án cần ít nhất 5 ký tự.");
                  return;
                }

                try {
                  const res = await fetch("/api/bookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
                  const result = (await res.json().catch(() => null)) as {
                    error?: string;
                  } | null;
                  if (!res.ok) {
                    throw new Error(result?.error || "fail");
                  }
                  setStatus("ok");
                  form.reset();
                } catch (err) {
                  setStatus("error");
                  setError(
                    err instanceof Error && err.message !== "fail"
                      ? err.message
                      : "Gửi thất bại. Vui lòng thử lại hoặc gọi Zalo.",
                  );
                }
              }}
            >
              <label className="block text-sm sm:col-span-1">
                <span className="mb-1.5 block font-medium text-ink">Họ và tên</span>
                <input
                  required
                  name="name"
                  minLength={2}
                  autoComplete="name"
                  className="h-11 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-ink">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  className="h-11 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-ink">
                  Số điện thoại
                </span>
                <input
                  required
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="0382 802 406"
                  className="h-11 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-ink">Loại dự án</span>
                <select
                  name="type"
                  className="h-11 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                >
                  {projectTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-ink">
                  Ngân sách dự kiến
                </span>
                <select
                  name="budget"
                  className="h-11 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                >
                  {budgets.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-ink">
                  Thời gian dự kiến
                </span>
                <select
                  name="timeline"
                  className="h-11 w-full rounded-xl border border-border px-3 outline-none focus:ring-2 focus:ring-brand/30"
                >
                  {timelines.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1.5 block font-medium text-ink">
                  Mô tả dự án
                </span>
                <textarea
                  name="description"
                  rows={5}
                  className="w-full rounded-xl border border-border px-3 py-2 outline-none focus:ring-2 focus:ring-brand/30"
                  placeholder="Mô tả ngắn về ý tưởng, vấn đề cần giải quyết và kỳ vọng..."
                />
              </label>
              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  iconRight={<Send className="size-4" />}
                >
                  {status === "loading" ? "Đang gửi..." : "Gửi yêu cầu"}
                </Button>
                {status === "ok" ? (
                  <p className="mt-3 text-sm text-emerald-600">
                    Đã gửi thành công! Tôi sẽ phản hồi trong 24h (thông báo đã
                    được gửi về email/điện thoại admin).
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="mt-3 text-sm text-rose-600">{error}</p>
                ) : null}
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-ink">
              Thông tin liên hệ
            </h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 text-brand" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-brand">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 text-brand" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="hover:text-brand"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 text-brand" />
                <span>{siteConfig.location}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 text-brand" />
                <span>{siteConfig.workingHours}</span>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {(["linkedin", "facebook", "github", "youtube"] as const).map(
                (key) => (
                  <a
                    key={key}
                    href={siteConfig.social[key]}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold uppercase text-ink-muted hover:border-brand hover:text-brand"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {key}
                  </a>
                ),
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Bản đồ Đà Nẵng, Việt Nam"
              src="https://maps.google.com/maps?q=Da%20Nang%20Vietnam&t=&z=12&ie=UTF8&iwloc=&output=embed"
              className="h-80 w-full grayscale-20"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      <section className="pb-14 sm:pb-16">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <SectionHeading title="Câu hỏi thường gặp" />
            <a href="#form" className="text-sm font-semibold text-brand">
              Xem tất cả
            </a>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className={cn(
                    "rounded-2xl border border-border p-4 transition",
                    open ? "bg-surface-soft" : "bg-surface",
                  )}
                >
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-3 text-left"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : index)}
                  >
                    <span className="font-semibold text-ink">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "mt-0.5 size-4 shrink-0 text-ink-subtle transition",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                  {open ? (
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBanner title="Sẵn sàng biến ý tưởng thành sản phẩm?" />
    </>
  );
}
