"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AdminCard, AdminPageHeader, StatusBadge } from "@/components/admin/AdminChrome";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";
import {
  PARTNER_STATUS_OPTIONS,
  PARTNER_TYPE_OPTIONS,
} from "@/lib/enums";

export type PartnerRow = {
  id: string;
  code: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  commissionRate: number;
  ownershipDays: number;
  leadCount: number;
};

const empty: PartnerRow = {
  id: "",
  code: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  type: "REFERRAL",
  status: "APPLIED",
  commissionRate: 10,
  ownershipDays: 30,
  leadCount: 0,
};

export function PartnersManager({ partners }: { partners: PartnerRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<PartnerRow | null>(null);
  const [saving, setSaving] = useState(false);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const fd = new FormData(event.currentTarget);
    const body = Object.fromEntries(fd.entries());
    try {
      const response = await fetch("/api/admin/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) throw new Error(result?.error || "Không thể lưu đối tác");
      toast.success("Đã lưu đối tác");
      setEditing(null);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể lưu đối tác");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Chương trình đối tác"
        subtitle="Mã giới thiệu, quyền sở hữu lead và chính sách hoa hồng"
        actions={
          <button
            type="button"
            onClick={() => setEditing({ ...empty })}
            className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            + Thêm đối tác
          </button>
        }
      />
      <AdminCard className="overflow-hidden p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Đối tác</th>
                <th className="px-4 py-3">Loại</th>
                <th className="px-4 py-3">Lead</th>
                <th className="px-4 py-3">Hoa hồng</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr
                  key={partner.id}
                  onClick={() => setEditing(partner)}
                  className="cursor-pointer border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold">
                      {partner.code} · {partner.name}
                    </p>
                    <p className="text-xs text-slate-500">{partner.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={partner.type} />
                  </td>
                  <td className="px-4 py-3 tabular-nums">{partner.leadCount}</td>
                  <td className="px-4 py-3 tabular-nums">
                    {partner.commissionRate}%
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={partner.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {partners.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500">
              Chưa có đối tác. Tạo đối tác đầu tiên để cấp link giới thiệu.
            </p>
          ) : null}
        </div>
      </AdminCard>
      <AdminDialog
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? `Cập nhật ${editing.code}` : "Thêm đối tác"}
        size="lg"
      >
        {editing ? (
          <form
            onSubmit={(event) => void save(event)}
            className="grid gap-4 sm:grid-cols-2"
          >
            <input type="hidden" name="id" value={editing.id} />
            {(
              [
                ["code", "Mã đối tác"],
                ["name", "Tên"],
                ["company", "Công ty"],
                ["email", "Email"],
                ["phone", "Điện thoại"],
              ] as const
            ).map(([name, label]) => (
              <label key={name} className="text-sm">
                {label}
                <input
                  required={name === "code" || name === "name" || name === "email"}
                  name={name}
                  type={name === "email" ? "email" : "text"}
                  defaultValue={editing[name]}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
                />
              </label>
            ))}
            <label className="text-sm">
              Loại
              <select
                name="type"
                defaultValue={editing.type}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              >
                {PARTNER_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Trạng thái
              <select
                name="status"
                defaultValue={editing.status}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              >
                {PARTNER_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Hoa hồng %
              <input
                name="commissionRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                defaultValue={editing.commissionRate}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <label className="text-sm">
              Quyền sở hữu (ngày)
              <input
                name="ownershipDays"
                type="number"
                min="1"
                max="365"
                defaultValue={editing.ownershipDays}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <div className="flex justify-end gap-2 sm:col-span-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold"
              >
                Đóng
              </button>
              <button
                disabled={saving}
                className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Đang lưu..." : "Lưu đối tác"}
              </button>
            </div>
          </form>
        ) : null}
      </AdminDialog>
    </>
  );
}
