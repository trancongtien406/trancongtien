"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";
import { AdminToolbar } from "@/components/admin/ui/AdminToolbar";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";
import { useRouter } from "next/navigation";

export type PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: string;
  categoryName: string;
  updatedAt: string;
  coverUrl: string;
};

export function PostsManager({
  posts,
  categories,
}: {
  posts: PostRow[];
  categories: Array<{ id: string; name: string }>;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState<PostRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const q = search.trim().toLowerCase();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      const matchS = !status || p.status === status;
      const matchC = !category || p.categoryName === category;
      return matchQ && matchS && matchC;
    });
  }, [posts, search, status, category]);

  async function remove(id: string) {
    if (!confirm("Xóa bài viết này?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Xóa bài viết thất bại");
      toast.success("Đã xóa bài viết");
      setPreview(null);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Xóa bài viết thất bại");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Blog"
        subtitle="Quản lý bài viết — tìm kiếm, lọc và chỉnh sửa"
        actions={
          <Link
            href="/admin/posts/new"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white"
          >
            <Plus className="size-4" /> Tạo bài viết
          </Link>
        }
      />

      <AdminToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Tìm theo tiêu đề, slug, excerpt..."
        filters={[
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
          {
            key: "category",
            label: "Tất cả danh mục",
            value: category,
            onChange: setCategory,
            options: categories.map((c) => ({ value: c.name, label: c.name })),
          },
        ]}
      />

      <AdminCard className="mt-4 overflow-hidden p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Bài viết</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Cập nhật</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50/70">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{p.title}</p>
                    <p className="text-xs text-slate-500">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.categoryName || "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">{p.updatedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => setPreview(p)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white"
                        title="Xem nhanh"
                      >
                        <Eye className="size-4" />
                      </button>
                      <Link
                        href={`/admin/posts/${p.id}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white"
                        title="Sửa"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        type="button"
                        disabled={deleting}
                        onClick={() => void remove(p.id)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                        title="Xóa"
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
            <p className="px-4 py-10 text-center text-sm text-slate-500">
              Không có bài viết phù hợp bộ lọc.
            </p>
          ) : null}
        </div>
      </AdminCard>

      <AdminDialog
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.title || ""}
        description={preview ? `/${preview.slug}` : undefined}
        size="xl"
        footer={
          preview ? (
            <div className="flex flex-wrap justify-end gap-2">
              <Link
                href={`/blog/${preview.slug}`}
                target="_blank"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold"
              >
                Xem ngoài site
              </Link>
              <Link
                href={`/admin/posts/${preview.id}`}
                className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
              >
                Chỉnh sửa đầy đủ
              </Link>
            </div>
          ) : null
        }
      >
        {preview ? (
          <div className="space-y-4">
            {preview.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.coverUrl}
                alt={`Cover ${preview.title}`}
                className="max-h-64 w-full rounded-2xl object-cover"
              />
            ) : null}
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={preview.status} />
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {preview.categoryName || "Không danh mục"}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{preview.excerpt}</p>
          </div>
        ) : null}
      </AdminDialog>
    </>
  );
}
