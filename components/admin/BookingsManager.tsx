"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";
import {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";
import { AdminToolbar } from "@/components/admin/ui/AdminToolbar";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";

export type BookingRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  status: string;
  scheduledAt: string;
  createdAt: string;
};

export function BookingsManager({ bookings }: { bookings: BookingRow[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<BookingRow | null>(null);
  const [nextStatus, setNextStatus] = useState("CONTACTED");
  const [scheduledAt, setScheduledAt] = useState("");
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const q = search.trim().toLowerCase();
      const matchQ =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.message.toLowerCase().includes(q);
      const matchS = !status || b.status === status;
      return matchQ && matchS;
    });
  }, [bookings, search, status]);

  async function save() {
    if (!selected) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.set("id", selected.id);
      fd.set("status", nextStatus);
      if (scheduledAt) fd.set("scheduledAt", scheduledAt);
      const res = await fetch("/api/admin/bookings", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Cập nhật liên hệ thất bại");
      toast.success("Đã cập nhật liên hệ");
      setSelected(null);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Cập nhật liên hệ thất bại");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Đặt lịch & Liên hệ"
        subtitle="Tìm kiếm, lọc trạng thái — mở dialog chi tiết (scroll an toàn)"
      />
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Tìm tên, email, SĐT, nội dung..."
        filters={[
          {
            key: "status",
            label: "Tất cả trạng thái",
            value: status,
            onChange: setStatus,
            options: [
              { value: "NEW", label: "NEW" },
              { value: "CONTACTED", label: "CONTACTED" },
              { value: "SCHEDULED", label: "SCHEDULED" },
              { value: "DONE", label: "DONE" },
              { value: "CANCELLED", label: "CANCELLED" },
            ],
          },
        ]}
      />
      <AdminCard className="mt-4 overflow-hidden p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Khách</th>
                <th className="px-4 py-3">Dự án</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Ngày gửi</th>
                <th className="px-4 py-3 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{b.name}</p>
                    <p className="text-xs text-slate-500">{b.email}</p>
                  </td>
                  <td className="px-4 py-3">{b.projectType || "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">{b.createdAt}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(b);
                        setNextStatus(b.status);
                        setScheduledAt("");
                      }}
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200"
                    >
                      <Eye className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">
              Không có liên hệ phù hợp.
            </p>
          ) : null}
        </div>
      </AdminCard>

      <AdminDialog
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name || ""}
        description={selected?.email}
        size="lg"
        footer={
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setSelected(null)}
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
              {saving ? "Đang lưu..." : "Cập nhật + Notify"}
            </button>
          </div>
        }
      >
        {selected ? (
          <div className="space-y-4 text-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <p>
                <span className="text-slate-500">SĐT:</span> {selected.phone || "—"}
              </p>
              <p>
                <span className="text-slate-500">Loại:</span>{" "}
                {selected.projectType || "—"}
              </p>
              <p>
                <span className="text-slate-500">Ngân sách:</span>{" "}
                {selected.budget || "—"}
              </p>
              <p>
                <span className="text-slate-500">Timeline:</span>{" "}
                {selected.timeline || "—"}
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium text-slate-700">Nội dung</p>
              <p className="whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-slate-600">
                {selected.message}
              </p>
            </div>
            <label className="block font-medium">
              Đổi trạng thái
              <select
                value={nextStatus}
                onChange={(e) => setNextStatus(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3"
              >
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="SCHEDULED">SCHEDULED</option>
                <option value="DONE">DONE</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </label>
            <label className="block font-medium">
              Lịch hẹn (nếu SCHEDULED)
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
          </div>
        ) : null}
      </AdminDialog>
    </>
  );
}
