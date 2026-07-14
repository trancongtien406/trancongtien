"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Save } from "lucide-react";
import toast from "react-hot-toast";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminChrome";
import { FileUploadField } from "@/components/admin/ui/FileUploadField";
import { RichTextEditor } from "@/components/admin/editor/RichTextEditor";
import { toSlug } from "@/lib/admin/slug";

export type PostFormData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  coverAlt: string;
  status: string;
  readTime: string;
  categoryId: string;
  tags: string;
};

export function PostForm({
  initial,
  categories,
}: {
  initial?: PostFormData;
  categories: Array<{ id: string; name: string }>;
}) {
  const router = useRouter();
  const isEdit = !!initial?.id;
  const [slugLocked, setSlugLocked] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PostFormData>(
    initial || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverUrl: "",
      coverAlt: "",
      status: "DRAFT",
      readTime: "5 phút đọc",
      categoryId: "",
      tags: "",
    },
  );

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...(isEdit ? { id: initial?.id } : {}),
      title: form.title,
      slug: form.slug || toSlug(form.title),
      excerpt: form.excerpt,
      content: form.content,
      coverUrl: form.coverUrl,
      coverAlt: form.coverAlt,
      status: form.status,
      readTime: form.readTime,
      categoryId: form.categoryId || null,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      const res = await fetch("/api/admin/posts", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Lưu thất bại. Kiểm tra slug trùng hoặc dữ liệu.");
      }
      const data = await res.json();
      toast.success(isEdit ? "Đã cập nhật bài viết" : "Đã tạo bài viết");
      router.push(`/admin/posts/${data.post.id}`);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Lưu thất bại. Kiểm tra slug trùng hoặc dữ liệu.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title={isEdit ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
        subtitle="Rich text, upload ảnh cover & ảnh trong nội dung, slug tự sinh"
        backHref="/admin/posts"
        actions={
          <button
            type="submit"
            form="post-form"
            disabled={saving}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Save className="size-4" /> {saving ? "Đang lưu..." : "Lưu bài viết"}
          </button>
        }
      />

      <form id="post-form" onSubmit={save} className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <AdminCard className="space-y-3">
            <label className="block text-sm font-medium">
              Tiêu đề
              <input
                required
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: slugLocked ? f.slug : toSlug(title),
                  }));
                }}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-brand/20"
              />
            </label>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium">Slug</span>
                <button
                  type="button"
                  onClick={() => {
                    setSlugLocked(false);
                    setForm((f) => ({ ...f, slug: toSlug(f.title) }));
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand"
                >
                  <RefreshCw className="size-3" /> Sinh lại từ tiêu đề
                </button>
              </div>
              <input
                required
                value={form.slug}
                onChange={(e) => {
                  setSlugLocked(true);
                  setForm((f) => ({ ...f, slug: toSlug(e.target.value) }));
                }}
                className="h-11 w-full rounded-xl border border-slate-200 px-3 font-mono text-sm outline-none focus:ring-2 focus:ring-brand/20"
              />
              <p className="mt-1 text-xs text-slate-500">
                Tự động bằng thư viện <code>slugify</code> (hỗ trợ tiếng Việt).
              </p>
            </div>
            <label className="block text-sm font-medium">
              Excerpt
              <textarea
                required
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="mt-1.5 min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/20"
              />
            </label>
          </AdminCard>

          <AdminCard>
            <p className="mb-3 text-sm font-medium">Nội dung</p>
            <RichTextEditor
              value={form.content}
              onChange={(html) => setForm((f) => ({ ...f, content: html }))}
            />
          </AdminCard>
        </div>

        <div className="space-y-4">
          <AdminCard>
            <FileUploadField
              label="Ảnh cover"
              value={form.coverUrl}
              alt={form.coverAlt || form.title}
              promptAlt
              altDialogTitle="Alt SEO cho ảnh cover bài viết"
              onChange={(url, media) =>
                setForm((f) => ({
                  ...f,
                  coverUrl: url,
                  coverAlt: media?.alt || f.coverAlt || f.title,
                }))
              }
            />
            <label className="mt-3 block text-sm font-medium">
              Alt ảnh cover
              <textarea
                value={form.coverAlt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, coverAlt: e.target.value }))
                }
                className="mt-1.5 min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/20"
                placeholder="Mô tả ảnh ngắn gọn để tối ưu SEO và accessibility"
              />
            </label>
          </AdminCard>
          <AdminCard className="space-y-3">
            <label className="block text-sm font-medium">
              Trạng thái
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </label>
            <label className="block text-sm font-medium">
              Danh mục
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, categoryId: e.target.value }))
                }
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Thời gian đọc
              <input
                value={form.readTime}
                onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm"
              />
            </label>
            <label className="block text-sm font-medium">
              Tags (phẩy)
              <input
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm"
              />
            </label>
          </AdminCard>
        </div>
      </form>
    </>
  );
}
