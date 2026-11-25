"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { partnerSafeLeadStatus } from "@/lib/commercial/labels";
import {
  buildPartnerShortLink,
  buildPartnerTrackLink,
  PARTNER_TRACK_TARGETS,
} from "@/lib/partners/track";
import { isValidEmail, isValidVnPhone } from "@/lib/validation";

type LeadItem = {
  id: string;
  leadNumber: string;
  name: string;
  company: string | null;
  status: string;
  industry: string | null;
  projectType: string | null;
  createdAt: string;
  scoreBand?: string | null;
  leadScore?: number | null;
  estimatedBudget?: string | null;
  source?: string | null;
  estimateRange?: {
    min: number;
    max: number;
    shareCode: string;
    publicId: string;
  } | null;
};

type CommissionItem = {
  id: string;
  amount: number;
  rate: number;
  status: string;
  earnedAt: string | null;
  paidAt: string | null;
};

export function PartnerDashboard({
  partner,
  leads,
  commissions,
}: {
  partner: {
    code: string;
    name: string;
    type: string;
    commissionRate: number;
    ownershipDays: number;
  };
  leads: LeadItem[];
  commissions: CommissionItem[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  return (
    <section className="py-12 sm:py-16">
      <Container className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand">{partner.code}</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-ink">
              Xin chào, {partner.name}
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              Hoa hồng {partner.commissionRate}% · Ownership {partner.ownershipDays}{" "}
              ngày · Chỉ hiện trạng thái được phép công khai
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={async () => {
              await fetch("/api/partner/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "logout" }),
              });
              router.push("/doi-tac");
              router.refresh();
            }}
          >
            Đăng xuất
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl font-bold text-ink">
              Đăng ký lead mới
            </h2>
            <form
              className="mt-5 grid gap-3 sm:grid-cols-2"
              onSubmit={async (event) => {
                event.preventDefault();
                setStatus("loading");
                setError("");
                const fd = new FormData(event.currentTarget);
                const payload = {
                  name: String(fd.get("name") || "").trim(),
                  company: String(fd.get("company") || "").trim(),
                  email: String(fd.get("email") || "").trim(),
                  phone: String(fd.get("phone") || "").trim(),
                  industry: String(fd.get("industry") || "").trim(),
                  projectType: String(fd.get("projectType") || "").trim(),
                  budget: String(fd.get("budget") || ""),
                  timeline: String(fd.get("timeline") || ""),
                  message: String(fd.get("message") || "").trim(),
                };
                if (!isValidEmail(payload.email)) {
                  setStatus("error");
                  setError("Email không hợp lệ");
                  return;
                }
                if (!isValidVnPhone(payload.phone)) {
                  setStatus("error");
                  setError("Số điện thoại không hợp lệ");
                  return;
                }
                try {
                  const res = await fetch("/api/partner/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
                  const result = (await res.json().catch(() => null)) as {
                    error?: string;
                    leadNumber?: string;
                  } | null;
                  if (!res.ok) throw new Error(result?.error || "Thất bại");
                  setStatus("ok");
                  event.currentTarget.reset();
                  router.refresh();
                } catch (err) {
                  setStatus("error");
                  setError(err instanceof Error ? err.message : "Thất bại");
                }
              }}
            >
              {(
                [
                  ["name", "Họ tên", true],
                  ["company", "Công ty", false],
                  ["email", "Email", true],
                  ["phone", "Điện thoại", true],
                  ["industry", "Ngành", false],
                  ["projectType", "Loại dự án", false],
                  ["budget", "Ngân sách", false],
                  ["timeline", "Thời gian dự kiến", false],
                ] as const
              ).map(([name, label, required]) => (
                <label key={name} className="text-sm">
                  {label}
                  <input
                    name={name}
                    required={required}
                    className="mt-1 h-10 w-full rounded-xl border border-border px-3"
                  />
                </label>
              ))}
              <label className="text-sm sm:col-span-2">
                Mô tả nhu cầu
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-border px-3 py-2"
                />
              </label>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Đang gửi..." : "Đăng ký lead"}
                </Button>
                {status === "ok" ? (
                  <p className="mt-2 text-sm text-emerald-600">
                    Đã đăng ký lead thành công.
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="mt-2 text-sm text-rose-600">{error}</p>
                ) : null}
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-surface p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                Link theo dõi (track link)
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Khi khách mở link, hệ thống gắn cookie nguồn 30 ngày. Lead từ
                form liên hệ hoặc chatbot ước tính (icon góc phải, mọi trang) đều
                gắn về mã {partner.code}. Đây là cổng đối tác — không dùng /admin.
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {PARTNER_TRACK_TARGETS.map((target) => {
                  const full = buildPartnerTrackLink({
                    path: target.path,
                    code: partner.code,
                  });
                  return (
                    <li
                      key={target.path}
                      className="rounded-2xl border border-border p-3"
                    >
                      <p className="font-medium text-ink">{target.label}</p>
                      <p className="mt-1 break-all text-xs text-ink-muted">{full}</p>
                      <button
                        type="button"
                        className="mt-2 text-xs font-semibold text-brand"
                        onClick={async () => {
                          await navigator.clipboard.writeText(full);
                        }}
                      >
                        Sao chép
                      </button>
                    </li>
                  );
                })}
                <li className="rounded-2xl border border-border bg-surface-muted p-3">
                  <p className="font-medium text-ink">Link ngắn</p>
                  <p className="mt-1 break-all text-xs text-ink-muted">
                    {buildPartnerShortLink(partner.code)}
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-xs font-semibold text-brand"
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        buildPartnerShortLink(partner.code),
                      );
                    }}
                  >
                    Sao chép link ngắn
                  </button>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-6">
              <h2 className="font-display text-xl font-bold text-ink">
                Bộ tài liệu bán hàng
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-muted">
                <li>
                  <Link className="font-semibold text-brand" href="/solutions/spa">
                    Giải pháp Spa & Beauty
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-semibold text-brand"
                    href="/solutions/real-estate"
                  >
                    Giải pháp bất động sản
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-semibold text-brand"
                    href="/solutions/construction"
                  >
                    Giải pháp xây dựng
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-6">
              <h2 className="font-display text-xl font-bold text-ink">Hoa hồng</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {commissions.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                  >
                    <span>
                      {item.amount.toLocaleString("vi-VN")} ₫ · {item.rate}%
                    </span>
                    <span className="text-ink-muted">
                      {item.status === "PAID"
                        ? "Đã trả"
                        : item.status === "EARNED"
                          ? "Đã ghi nhận"
                          : item.status}
                    </span>
                  </li>
                ))}
                {commissions.length === 0 ? (
                  <li className="text-ink-muted">
                    Chưa có hoa hồng — chỉ tính trên tiền thực nhận.
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6">
          <h2 className="font-display text-xl font-bold text-ink">Lead của bạn</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-180 text-left text-sm">
              <thead className="text-xs uppercase text-ink-subtle">
                <tr>
                  <th className="py-2">Lead</th>
                  <th className="py-2">Nhu cầu</th>
                  <th className="py-2">Trạng thái</th>
                  <th className="py-2">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-border">
                    <td className="py-3">
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-xs text-ink-subtle">{lead.leadNumber}</p>
                      {lead.scoreBand ? (
                        <p className="mt-1 text-xs font-semibold text-brand">
                          {lead.scoreBand}
                          {lead.leadScore != null ? ` · ${lead.leadScore}` : ""}
                        </p>
                      ) : null}
                    </td>
                    <td className="py-3">
                      {lead.projectType || lead.industry || "—"}
                      {lead.estimateRange ? (
                        <p className="mt-1 text-xs text-ink-muted">
                          Estimate {(lead.estimateRange.min / 1_000_000).toFixed(0)}–
                          {(lead.estimateRange.max / 1_000_000).toFixed(0)}M ·{" "}
                          <Link
                            href={`/e/${lead.estimateRange.shareCode}`}
                            className="text-brand underline-offset-2 hover:underline"
                          >
                            xem
                          </Link>
                        </p>
                      ) : lead.estimatedBudget ? (
                        <p className="mt-1 text-xs text-ink-muted">
                          NS: {lead.estimatedBudget}
                        </p>
                      ) : null}
                    </td>
                    <td className="py-3">{partnerSafeLeadStatus(lead.status)}</td>
                    <td className="py-3 text-ink-muted">
                      {new Date(lead.createdAt).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {leads.length === 0 ? (
              <p className="py-8 text-center text-sm text-ink-muted">
                Chưa có lead. Hãy đăng ký lead đầu tiên.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
