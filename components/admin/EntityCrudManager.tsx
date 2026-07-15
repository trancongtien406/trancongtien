"use client";

import {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";
import { AdminToolbar } from "@/components/admin/ui/AdminToolbar";
import { RichTextEditor } from "@/components/admin/editor/RichTextEditor";
import { FileUploadField } from "@/components/admin/ui/FileUploadField";
import { toSlug } from "@/lib/admin/slug";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export type FieldDef = {
  key: string;
  label: string;
  type?:
    | "text"
    | "textarea"
    | "richtext"
    | "select"
    | "multi-select"
    | "number"
    | "upload"
    | "checkbox";
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  slugFrom?: string;
  altKey?: string;
  promptAlt?: boolean;
  span?: "full";
};

type Row = Record<string, string | number | boolean | null | undefined> & {
  id: string;
};

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function MultiSelectField({
  label,
  value,
  options,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = splitList(value);

  function toggle(optionValue: string) {
    const next = selected.includes(optionValue)
      ? selected.filter((item) => item !== optionValue)
      : [...selected, optionValue];
    onChange(next.join(", "));
  }

  return (
    <div className="relative text-sm sm:col-span-2">
      <span className="font-medium text-slate-700">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="mt-1.5 flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left outline-none transition focus:ring-2 focus:ring-brand/20"
      >
        <span className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {selected.length > 0 ? (
            selected.map((item) => (
              <span
                key={item}
                className="inline-flex rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-slate-400">{placeholder || "Chọn nhiều mục"}</span>
          )}
        </span>
        <ChevronDown className="size-4 shrink-0 text-slate-400" />
      </button>

      {open ? (
        <div className="absolute z-90 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
          {options.map((option) => {
            const checked = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggle(option.value)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-slate-50",
                  checked && "bg-brand-soft text-brand",
                )}
              >
                <span>{option.label}</span>
                {checked ? <Check className="size-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

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
      if (initial[f.key] !== undefined) return;
      if (f.type === "checkbox") initial[f.key] = "true";
      else initial[f.key] = "";
      if (f.altKey && initial[f.altKey] === undefined) initial[f.altKey] = "";
    });
    setForm(initial);
    setOpen(true);
  }

  function openEdit(row: Row) {
    setEditingId(row.id);
    const initial: Record<string, string> = {};
    fields.forEach((f) => {
      initial[f.key] = String(row[f.key] ?? "");
      if (f.altKey) initial[f.altKey] = String(row[f.altKey] ?? "");
    });
    setForm(initial);
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
    const payload: Record<string, unknown> = { ...form };
    if (form.sortOrder !== undefined) payload.sortOrder = Number(form.sortOrder || 0);
    if (form.free !== undefined) payload.free = form.free === "true";

    try {
      const res = await fetch("/api/admin/entity", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity,
          id: editingId || undefined,
          data: payload,
        }),
      });
      if (!res.ok) throw new Error("Lưu thất bại");
      toast.success(editingId ? "Đã cập nhật mục" : "Đã thêm mục mới");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Xóa mục này?")) return;
    try {
      const res = await fetch(`/api/admin/entity?entity=${entity}&id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");
      toast.success("Đã xóa mục");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Xóa thất bại");
    }
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
          <table className="w-full min-w-160 text-left text-sm">
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
            const fullSpan = f.span === "full" ? "sm:col-span-2" : "";
            if (f.type === "upload") {
              return (
                <div key={f.key} className="sm:col-span-2">
                  <FileUploadField
                    label={f.label}
                    value={form[f.key] || ""}
                    alt={(f.altKey ? form[f.altKey] : "") || form.title || ""}
                    promptAlt={f.promptAlt}
                    onChange={(url, media) => {
                      setField(f.key, url);
                      if (f.altKey) {
                        setField(
                          f.altKey,
                          media?.alt || form[f.altKey] || form.title || "",
                        );
                      }
                    }}
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
            if (f.type === "richtext") {
              return (
                <div key={f.key} className="sm:col-span-2">
                  <p className="mb-1.5 text-sm font-medium text-slate-700">
                    {f.label}
                  </p>
                  <RichTextEditor
                    value={form[f.key] || ""}
                    onChange={(html) => setField(f.key, html)}
                    placeholder={f.placeholder}
                  />
                </div>
              );
            }
            if (f.type === "select") {
              return (
                <label key={f.key} className={cn("block text-sm", fullSpan)}>
                  <span className="font-medium text-slate-700">{f.label}</span>
                  <select
                    value={form[f.key] || ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">Chọn {f.label.toLowerCase()}</option>
                    {(f.options || []).map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }
            if (f.type === "multi-select") {
              return (
                <MultiSelectField
                  key={f.key}
                  label={f.label}
                  value={form[f.key] || ""}
                  options={f.options || []}
                  placeholder={f.placeholder}
                  onChange={(value) => setField(f.key, value)}
                />
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
              <label key={f.key} className={cn("block text-sm", fullSpan)}>
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
        </div>
      </AdminDialog>
    </>
  );
}
