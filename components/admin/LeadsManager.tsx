"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";
import { AdminCard, AdminPageHeader, StatusBadge } from "@/components/admin/AdminChrome";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";
import { AdminToolbar } from "@/components/admin/ui/AdminToolbar";
import {
  LEAD_PRIORITY_OPTIONS,
  LEAD_STATUS_OPTIONS,
} from "@/lib/enums";


export type LeadRow = {
  id: string;
  leadNumber: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
  status: string;
  priority: string;
  source: string;
  partner: string;
  partnerId: string;
  hasPartner: boolean;
  ownershipExpiresAt: string;
  nextFollowUpAt: string;
  lostReason: string;
  createdAt: string;
  scoreBand?: string;
  leadScore?: number | null;
  estimatePublicId?: string;
  activities: Array<{
    id: string;
    title: string;
    body: string;
    type: string;
    createdAt: string;
  }>;
};

export type PartnerOption = {
  id: string;
  label: string;
};

export function LeadsManager({
  leads,
  partners = [],
}: {
  leads: LeadRow[];
  partners?: PartnerOption[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<LeadRow | null>(
    () => leads.find((lead) => lead.id === params.get("id")) || null,
  );
  const [status, setStatus] = useState(selected?.status || "NEW");
  const [priority, setPriority] = useState(selected?.priority || "NORMAL");
  const [nextFollowUpAt, setNextFollowUpAt] = useState(
    selected?.nextFollowUpAt || "",
  );
  const [lostReason, setLostReason] = useState(selected?.lostReason || "");
  const [partnerId, setPartnerId] = useState(selected?.partnerId || "");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const filtered = useMemo(
    () =>
      leads.filter((lead) => {
        const query = search.trim().toLowerCase();
        return (
          (!filter || lead.status === filter) &&
          (!query ||
            [lead.leadNumber, lead.name, lead.company, lead.email, lead.phone].some(
              (value) => value.toLowerCase().includes(query),
            ))
        );
      }),
    [filter, leads, search],
  );

  function open(lead: LeadRow) {
    setSelected(lead);
    setStatus(lead.status);
    setPriority(lead.priority);
    setNextFollowUpAt(lead.nextFollowUpAt);
    setLostReason(lead.lostReason);
    setPartnerId(lead.partnerId);
    setNote("");
    router.replace(`/admin/leads?id=${lead.id}`, { scroll: false });
  }

  function close() {
    setSelected(null);
    router.replace("/admin/leads", { scroll: false });
  }

  async function save() {
    if (!selected) return;
    setSaving(true);
    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id: selected.id,
          status,
          priority,
          nextFollowUpAt,
          lostReason,
          note,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) throw new Error(result?.error || "Không thể cập nhật lead");
      toast.success("Đã cập nhật lead");
      close();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể cập nhật lead");
    } finally {
      setSaving(false);
    }
  }

  async function releaseOwnership() {
    if (!selected?.hasPartner) return;
    if (!window.confirm("Giải phóng ownership partner cho lead này?")) return;
    setSaving(true);
    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "release", id: selected.id }),
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) throw new Error(result?.error || "Không thể release");
      toast.success("Đã release ownership");
      close();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể release");
    } finally {
      setSaving(false);
    }
  }

  async function reassignPartner() {
    if (!selected || !partnerId) {
      toast.error("Chọn đối tác để gán");
      return;
    }
    if (partnerId === selected.partnerId) {
      toast.error("Lead đã thuộc đối tác này");
      return;
    }
    if (!window.confirm("Gán lại lead cho đối tác đã chọn?")) return;
    setSaving(true);
    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reassign",
          id: selected.id,
          partnerId,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) throw new Error(result?.error || "Không thể gán lại");
      toast.success("Đã gán lại đối tác");
      close();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể gán lại");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
    <AdminPageHeader title="Lead" subtitle="Pipeline, nguồn và lịch sử chăm sóc khách hàng" />
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Tìm lead, khách, công ty, email..."
        filters={[
          {
            key: "status",
            label: "Tất cả trạng thái",
            value: filter,
            onChange: setFilter,
            options: LEAD_STATUS_OPTIONS.map((item) => ({
              value: item.value,
              label: item.label,
            })),
          },
        ]}
      />
      <AdminCard className="mt-4 overflow-hidden p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-240 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Lead</th>
                <th className="px-4 py-3">Nhu cầu</th>
                <th className="px-4 py-3">Nguồn</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{lead.name}</p>
                    <p className="text-xs text-slate-500">
                      {lead.leadNumber} · {lead.company || lead.email}
                    </p>
                  </td>
                  <td className="px-4 py-3">{lead.projectType || lead.industry || "—"}</td>
                  <td className="px-4 py-3">{lead.partner || lead.source}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">{lead.createdAt}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => open(lead)}
                      aria-label={`Mở ${lead.leadNumber}`}
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200"
                    >
                      <Eye className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500">
              Chưa có lead phù hợp.
            </p>
          ) : null}
        </div>
      </AdminCard>
      <AdminDialog
        open={!!selected}
        onClose={close}
        title={selected ? `${selected.leadNumber} · ${selected.name}` : ""}
        description={selected?.email}
        size="lg"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            {selected?.hasPartner ? (
              <button
                type="button"
                disabled={saving}
                onClick={() => void releaseOwnership()}
                className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 disabled:opacity-60"
              >
                Giải phóng quyền sở hữu
              </button>
            ) : null}
            <button
              type="button"
              onClick={close}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold"
            >
              Đóng
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void save()}
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Đang lưu..." : "Lưu cập nhật"}
            </button>
          </div>
        }
      >
        {selected ? (
          <div className="space-y-5 text-sm">
            <dl className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Điện thoại</dt>
                <dd>{selected.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Partner</dt>
                <dd>{selected.partner || "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Ngành</dt>
                <dd>{selected.industry || "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Ngân sách</dt>
                <dd>{selected.budget || "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Lead score</dt>
                <dd>
                  {selected.scoreBand || "—"}
                  {selected.leadScore != null ? ` · ${selected.leadScore}` : ""}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Estimate</dt>
                <dd>
                  {selected.estimatePublicId ? (
                    <a
                      className="font-semibold text-brand"
                      href={`/estimate/${selected.estimatePublicId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selected.estimatePublicId}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Ownership hết hạn</dt>
                <dd>{selected.ownershipExpiresAt || "—"}</dd>
              </div>
            </dl>
            <div>
              <p className="mb-1 font-medium">Mô tả</p>
              <p className="whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-slate-600">
                {selected.description}
              </p>
            </div>
            {partners.length > 0 ? (
              <div className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3 sm:flex-row sm:items-end">
                <label className="min-w-0 flex-1 text-sm">
                  Gán / đổi đối tác
                  <select
                    value={partnerId}
                    onChange={(event) => setPartnerId(event.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
                  >
                    <option value="">— Chọn đối tác —</option>
                    {partners.map((partner) => (
                      <option key={partner.id} value={partner.id}>
                        {partner.label}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  disabled={saving || !partnerId}
                  onClick={() => void reassignPartner()}
                  className="h-10 shrink-0 rounded-xl border border-slate-200 px-4 text-sm font-semibold disabled:opacity-60"
                >
                  Gán lại
                </button>
              </div>
            ) : null}
            <div className="grid gap-3 sm:grid-cols-2">
                <label>
                Trạng thái
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
                >
                  {LEAD_STATUS_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Ưu tiên
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
                >
                  {LEAD_PRIORITY_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Follow-up tiếp theo
                <input
                  type="datetime-local"
                  value={nextFollowUpAt}
                  onChange={(event) => setNextFollowUpAt(event.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
                />
              </label>
              {status === "LOST" ? (
                <label>
                  Lý do lost
                  <input
                    value={lostReason}
                    onChange={(event) => setLostReason(event.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
                  />
                </label>
              ) : null}
            </div>
            <label className="block">
              Ghi chú mới
              <textarea
                rows={3}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 p-3"
              />
            </label>
            <div>
              <h3 className="font-semibold">Lịch sử</h3>
              <ol className="mt-3 space-y-3">
                {selected.activities.map((activity) => (
                  <li key={activity.id} className="border-l-2 border-brand/30 pl-3">
                    <p className="font-medium">{activity.title}</p>
                    {activity.body ? (
                      <p className="whitespace-pre-wrap text-slate-600">{activity.body}</p>
                    ) : null}
                    <p className="text-xs text-slate-400">{activity.createdAt}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}
      </AdminDialog>
    </>
  );
}
