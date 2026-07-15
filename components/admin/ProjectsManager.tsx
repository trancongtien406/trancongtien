"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";
import { AdminToolbar } from "@/components/admin/ui/AdminToolbar";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";

type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  status: string;
  role: string;
  coverUrl: string;
};

export function ProjectsManager({ projects }: { projects: ProjectRow[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState<ProjectRow | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects],
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = search.trim().toLowerCase();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return (
        matchQ &&
        (!category || p.category === category) &&
        (!status || p.status === status)
      );
    });
  }, [projects, search, category, status]);

  return (
    <>
      <AdminPageHeader
        title="Dự án"
        subtitle="Lọc / tìm kiếm — xem chi tiết trong dialog hoặc ngoài site"
      />
      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Tìm dự án..."
        filters={[
          {
            key: "category",
            label: "Tất cả loại",
            value: category,
            onChange: setCategory,
            options: categories.map((c) => ({ value: c, label: c })),
          },
          {
            key: "status",
            label: "Trạng thái",
            value: status,
            onChange: setStatus,
            options: [
              { value: "PUBLISHED", label: "Published" },
              { value: "DRAFT", label: "Draft" },
            ],
          },
        ]}
      />
      <AdminCard className="mt-4 overflow-hidden p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Dự án</th>
                <th className="px-4 py-3">Loại</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-xs text-slate-500">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setPreview(p)}
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200"
                    >
                      <Eye className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <AdminDialog
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.title || ""}
        description={preview?.category}
        size="xl"
        footer={
          preview ? (
            <div className="flex justify-end">
              <Link
                href={`/du-an/${preview.slug}`}
                target="_blank"
                className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
              >
                Xem trang chi tiết
              </Link>
            </div>
          ) : null
        }
      >
        {preview ? (
          <div className="space-y-3">
            {preview.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.coverUrl}
                alt={preview.title}
                className="max-h-72 w-full rounded-2xl object-cover"
              />
            ) : null}
            <StatusBadge status={preview.status} />
            <p className="text-sm text-slate-600">{preview.description}</p>
            <p className="text-xs text-slate-500">Vai trò: {preview.role}</p>
          </div>
        ) : null}
      </AdminDialog>
    </>
  );
}
