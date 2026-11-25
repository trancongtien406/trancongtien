"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";
import { PAYMENT_STATUS_OPTIONS } from "@/lib/enums";

export type CommercialLead = {
  id: string;
  leadNumber: string;
  name: string;
  partner: string;
  status: string;
};

export type ProposalRow = {
  id: string;
  title: string;
  leadLabel: string;
  version: number;
  amount: string;
  status: string;
  createdAt: string;
};

export type PaymentRow = {
  id: string;
  leadLabel: string;
  amount: string;
  status: string;
  reference: string;
  receivedAt: string;
  checkoutUrl: string;
  provider: string;
};

export type CommissionRow = {
  id: string;
  partner: string;
  amount: string;
  rate: string;
  status: string;
  earnedAt: string;
};

export function CommercialManager({
  leads,
  proposals,
  payments,
  commissions,
  payosReady,
}: {
  leads: CommercialLead[];
  proposals: ProposalRow[];
  payments: PaymentRow[];
  commissions: CommissionRow[];
  payosReady: boolean;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [leadId, setLeadId] = useState(leads[0]?.id || "");
  const [proposalTitle, setProposalTitle] = useState("Đề xuất dự án");
  const [proposalAmount, setProposalAmount] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("RECEIVED");

  async function post(body: Record<string, unknown>) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/commercial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await res.json().catch(() => null)) as {
        error?: string;
        checkoutUrl?: string;
      } | null;
      if (!res.ok) throw new Error(result?.error || "Thất bại");
      if (result?.checkoutUrl) {
        toast.success("Đã tạo link PayOS");
        window.open(result.checkoutUrl, "_blank", "noopener,noreferrer");
      } else {
        toast.success("Đã lưu");
      }
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Thất bại");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Thanh toán & hoa hồng"
        subtitle="Đề xuất, thanh toán thực nhận và sổ hoa hồng theo partner"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard>
          <h2 className="font-semibold text-slate-900">Tạo đề xuất</h2>
          <div className="mt-4 grid gap-3">
            <label className="text-sm">
              Lead
              <select
                value={leadId}
                onChange={(e) => setLeadId(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              >
                {leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.leadNumber} · {lead.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Tiêu đề
              <input
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <label className="text-sm">
              Giá trị (VND)
              <input
                type="number"
                min="1"
                value={proposalAmount}
                onChange={(e) => setProposalAmount(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <button
              type="button"
              disabled={saving || !leadId || !proposalAmount}
              onClick={() =>
                void post({
                  action: "create_proposal",
                  leadId,
                  title: proposalTitle,
                  amount: Number(proposalAmount),
                })
              }
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              Tạo đề xuất
            </button>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-semibold text-slate-900">Ghi nhận thanh toán</h2>
          <p className="mt-1 text-xs text-slate-500">
            Hoa hồng chỉ được tạo khi trạng thái là Đã nhận.
          </p>
          <div className="mt-4 grid gap-3">
            <label className="text-sm">
              Lead
              <select
                value={leadId}
                onChange={(e) => setLeadId(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              >
                {leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.leadNumber} · {lead.name}
                    {lead.partner ? ` · ${lead.partner}` : ""}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Số tiền đã nhận (VND)
              <input
                type="number"
                min="1"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <label className="text-sm">
              Mã tham chiếu
              <input
                value={paymentRef}
                onChange={(e) => setPaymentRef(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <label className="text-sm">
              Trạng thái
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              >
                {PAYMENT_STATUS_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              disabled={saving || !leadId || !paymentAmount}
              onClick={() =>
                void post({
                  action: "record_payment",
                  leadId,
                  amount: Number(paymentAmount),
                  reference: paymentRef,
                  status: paymentStatus,
                })
              }
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              Ghi nhận thủ công
            </button>
            <button
              type="button"
              disabled={saving || !leadId || !paymentAmount || !payosReady}
              onClick={() =>
                void post({
                  action: "create_payos_link",
                  leadId,
                  amount: Number(paymentAmount),
                  note: paymentRef,
                })
              }
              className="rounded-xl border border-brand px-4 py-2 text-sm font-semibold text-brand disabled:opacity-60"
            >
              {payosReady ? "Tạo link PayOS" : "PayOS chưa cấu hình"}
            </button>
          </div>
        </AdminCard>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <AdminCard className="overflow-hidden p-0 sm:p-0">
          <div className="border-b border-slate-100 px-4 py-3 font-semibold">
            Đề xuất
          </div>
          <ul className="divide-y divide-slate-100 text-sm">
            {proposals.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-slate-500">
                    {item.leadLabel} · v{item.version} · {item.amount}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={item.status} />
                  {item.status === "DRAFT" ? (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() =>
                        void post({
                          action: "send_proposal",
                          proposalId: item.id,
                        })
                      }
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold"
                    >
                      Gửi
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
            {proposals.length === 0 ? (
              <li className="px-4 py-8 text-center text-slate-500">Chưa có đề xuất.</li>
            ) : null}
          </ul>
        </AdminCard>

        <AdminCard className="overflow-hidden p-0 sm:p-0">
          <div className="border-b border-slate-100 px-4 py-3 font-semibold">
            Thanh toán
          </div>
          <ul className="divide-y divide-slate-100 text-sm">
            {payments.map((item) => (
              <li key={item.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{item.amount}</p>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {item.leadLabel} · {item.provider || "MANUAL"} ·{" "}
                  {item.reference || "—"} · {item.receivedAt || "—"}
                </p>
                {item.checkoutUrl ? (
                  <a
                    href={item.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-semibold text-brand"
                  >
                    Mở link PayOS
                  </a>
                ) : null}
              </li>
            ))}
            {payments.length === 0 ? (
              <li className="px-4 py-8 text-center text-slate-500">Chưa có thanh toán.</li>
            ) : null}
          </ul>
        </AdminCard>

        <AdminCard className="overflow-hidden p-0 sm:p-0">
          <div className="border-b border-slate-100 px-4 py-3 font-semibold">
            Hoa hồng
          </div>
          <ul className="divide-y divide-slate-100 text-sm">
            {commissions.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="font-medium">{item.amount}</p>
                  <p className="text-xs text-slate-500">
                    {item.partner} · {item.rate}% · {item.earnedAt || "—"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={item.status} />
                  {item.status === "EARNED" ? (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() =>
                        void post({
                          action: "pay_commission",
                          commissionId: item.id,
                        })
                      }
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold"
                    >
                      Đã trả
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
            {commissions.length === 0 ? (
              <li className="px-4 py-8 text-center text-slate-500">Chưa có hoa hồng.</li>
            ) : null}
          </ul>
        </AdminCard>
      </div>
    </>
  );
}
