"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";
import { AdminToolbar } from "@/components/admin/ui/AdminToolbar";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";
import { FileUploadField } from "@/components/admin/ui/FileUploadField";
import { toSlug } from "@/lib/admin/slug";

export type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "upload" | "checkbox";
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  slugFrom?: string;
};

type Row = Record<string, string | number | boolean | null | undefined> & {
  id: string;
};

export function EntityCrudManager({
  entity,
  title,
  subtitle,
  rows,
  fields,
  columns,
  searchKeys = ["title", "name", "question"],
}: {
  entity: string;
  title: string;
  subtitle?: string;
  rows: Row[];
  fields: FieldDef[];
  columns: Array<{ key: string; label: string }>;
  searchKeys?: string[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const q = search.trim().toLowerCase();
      const matchQ =
        !q ||
        searchKeys.some((k) => String(r[k] || "").toLowerCase().includes(q));
      const matchS = !status || String(r.status || "") === status;
      return matchQ && matchS;
    });
  }, [rows, search, status, searchKeys]);

  function openCreate() {
    setEditingId(null);
    const initial: Record<string, string> = { status: "PUBLISHED", sortOrder: "0" };
    fields.forEach((f) => {
      if (f.type === "checkbox") initial[f.key] = "true";
      else initial[f.key] = "";
    });
    setForm(initial);
    setMsg("");
    setOpen(true);
  }

  function openEdit(row: Row) {
    setEditingId(row.id);
    const initial: Record<string, string> = {};
    fields.forEach((f) => {
      initial[f.key] = String(row[f.key] ?? "");
    });
    setForm(initial);
    setMsg("");
    setOpen(true);
  }

  function setField(key: string, value: string) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      const slugField = fields.find((f) => f.key === "slug" && f.slugFrom);
      if (slugField?.slugFrom && key === slugField.slugFrom && !editingId) {
        next.slug = toSlug(value);
      }
      return next;
    });
  }

  async function save() {
    setSaving(true);
    setMsg("");
    const payload: Record<string, unknown> = { ...form };
    if (form.sortOrder !== undefined) payload.sortOrder = Number(form.sortOrder || 0);
    if (form.free !== undefined) payload.free = form.free === "true";

    const res = await fetch("/api/admin/entity", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entity,
        id: editingId || undefined,
        data: payload,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      setMsg("Lưu thất bại");
      return;
    }
    setOpen(false);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Xóa mục này?")) return;
    await fetch(`/api/admin/entity?entity=${entity}&id=${id}`, {
      method: "DELETE",
    });
    router.refresh();
  }

  const hasStatus = fields.some((f) => f.key === "status");

  return (
    <>
      <AdminPageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white"
          >
            <Plus className="size-4" /> Thêm mới
          </button>
        }
      />

      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Tìm kiếm..."
        filters={
          hasStatus
            ? [
                {
                  key: "status",
                  label: "Tất cả trạng thái",
                  value: status,
                  onChange: setStatus,
                  options: [
                    { value: "PUBLISHED", label: "Published" },
                    { value: "DRAFT", label: "Draft" },
                    { value: "ARCHIVED", label: "Archived" },
                  ],
                },
              ]
            : []
        }
      />

      <AdminCard className="mt-4 overflow-hidden p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-t border-slate-100">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3">
                      {c.key === "status" ? (
                        <StatusBadge status={String(row.status || "")} />
                      ) : (
                        <span className="line-clamp-2 text-slate-700">
                          {String(row[c.key] ?? "—")}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(row)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void remove(row.id)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-rose-200 text-rose-600"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">
              Chưa có dữ liệu.
            </p>
          ) : null}
        </div>
      </AdminCard>

      <AdminDialog
        open={open}
        onClose={() => setOpen(false)}
        title={editingId ? `Sửa ${title}` : `Thêm ${title}`}
        size="xl"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold"
            >
              Hủy
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void save()}
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {fields.map((f) => {
            if (f.type === "upload") {
              return (
                <div key={f.key} className="sm:col-span-2">
                  <FileUploadField
                    label={f.label}
                    value={form[f.key] || ""}
                    onChange={(url) => setField(f.key, url)}
                  />
                </div>
              );
            }
            if (f.type === "textarea") {
              return (
                <label key={f.key} className="block text-sm sm:col-span-2">
                  <span className="font-medium text-slate-700">{f.label}</span>
                  <textarea
                    value={form[f.key] || ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="mt-1.5 min-h-28 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </label>
              );
            }
            if (f.type === "select") {
              return (
                <label key={f.key} className="block text-sm">
                  <span className="font-medium text-slate-700">{f.label}</span>
                  <select
                    value={form[f.key] || ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    {(f.options || []).map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }
            if (f.type === "checkbox") {
              return (
                <label key={f.key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form[f.key] === "true"}
                    onChange={(e) =>
                      setField(f.key, e.target.checked ? "true" : "false")
                    }
                  />
                  <span className="font-medium text-slate-700">{f.label}</span>
                </label>
              );
            }
            return (
              <label key={f.key} className="block text-sm">
                <span className="font-medium text-slate-700">{f.label}</span>
                <input
                  type={f.type === "number" ? "number" : "text"}
                  value={form[f.key] || ""}
                  onChange={(e) => setField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-brand/20"
                />
              </label>
            );
          })}
          {msg ? <p className="text-sm text-rose-600 sm:col-span-2">{msg}</p> : null}
        </div>
      </AdminDialog>
    </>
  );
}
