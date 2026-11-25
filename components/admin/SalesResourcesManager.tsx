"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";
import { CONTENT_STATUS_OPTIONS } from "@/lib/enums";

export type SalesResourceRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  body: string;
  fileUrl: string;
  partnerVisible: boolean;
  status: string;
  sortOrder: number;
};

const empty: SalesResourceRow = {
  id: "",
  title: "",
  slug: "",
  category: "POLICY",
  description: "",
  body: "",
  fileUrl: "",
  partnerVisible: false,
  status: "DRAFT",
  sortOrder: 0,
};

export function SalesResourcesManager({
  items,
}: {
  items: SalesResourceRow[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<SalesResourceRow | null>(null);
  const [saving, setSaving] = useState(false);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    const fd = new FormData(event.currentTarget);
    const body = {
      id: editing.id || undefined,
      title: String(fd.get("title") || ""),
      slug: String(fd.get("slug") || ""),
      category: String(fd.get("category") || "POLICY"),
      description: String(fd.get("description") || ""),
      body: String(fd.get("body") || ""),
      fileUrl: String(fd.get("fileUrl") || "") || null,
      partnerVisible: fd.get("partnerVisible") === "on",
      status: String(fd.get("status") || "DRAFT"),
      sortOrder: Number(fd.get("sortOrder") || 0),
    };
    try {
      const response = await fetch("/api/admin/sales-resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) throw new Error(result?.error || "Không thể lưu");
      toast.success("Đã lưu tài nguyên");
      setEditing(null);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể lưu");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Xoá tài nguyên này?")) return;
    setSaving(true);
    try {
      const response = await fetch("/api/admin/sales-resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) throw new Error(result?.error || "Không thể xoá");
      toast.success("Đã xoá");
      setEditing(null);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể xoá");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Tài nguyên bán hàng"
        subtitle="Policy, playbook và tài liệu đối tác"
        actions={
          <button
            type="button"
            onClick={() => setEditing({ ...empty })}
            className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            + Thêm tài nguyên
          </button>
        }
      />

      <AdminCard className="overflow-hidden p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Đối tác thấy</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Thứ tự</th>
                <th className="px-4 py-3 text-right">Sửa</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.slug}</p>
                  </td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">
                    {item.partnerVisible ? "Có" : "Không"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3">{item.sortOrder}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setEditing(item)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold"
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500">
              Chưa có tài nguyên bán hàng.
            </p>
          ) : null}
        </div>
      </AdminCard>

      <AdminDialog
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Sửa tài nguyên" : "Thêm tài nguyên"}
        size="lg"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            {editing?.id ? (
              <button
                type="button"
                disabled={saving}
                onClick={() => void remove(editing.id)}
                className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 disabled:opacity-60"
              >
                Xoá
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold"
            >
              Đóng
            </button>
            <button
              type="submit"
              form="sales-resource-form"
              disabled={saving}
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        }
      >
        {editing ? (
          <form id="sales-resource-form" onSubmit={(e) => void save(e)} className="grid gap-3 text-sm sm:grid-cols-2">
            <label className="sm:col-span-2">
              Tiêu đề
              <input
                name="title"
                required
                defaultValue={editing.title}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <label>
              Slug
              <input
                name="slug"
                defaultValue={editing.slug}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <label>
              Danh mục
              <input
                name="category"
                defaultValue={editing.category}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <label>
              Trạng thái
              <select
                name="status"
                defaultValue={editing.status}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              >
                {CONTENT_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Thứ tự
              <input
                name="sortOrder"
                type="number"
                defaultValue={editing.sortOrder}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <label className="sm:col-span-2">
              Mô tả
              <textarea
                name="description"
                rows={2}
                defaultValue={editing.description}
                className="mt-1 w-full rounded-xl border border-slate-200 p-3"
              />
            </label>
            <label className="sm:col-span-2">
              Nội dung
              <textarea
                name="body"
                rows={6}
                defaultValue={editing.body}
                className="mt-1 w-full rounded-xl border border-slate-200 p-3"
              />
            </label>
            <label className="sm:col-span-2">
              File URL
              <input
                name="fileUrl"
                defaultValue={editing.fileUrl}
                className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3"
              />
            </label>
            <label className="flex items-center gap-2 sm:col-span-2">
              <input
                name="partnerVisible"
                type="checkbox"
                defaultChecked={editing.partnerVisible}
                className="size-4 rounded border-slate-300"
              />
              Hiển thị cho đối tác
            </label>
          </form>
        ) : null}
      </AdminDialog>
    </>
  );
}
