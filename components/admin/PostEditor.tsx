"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string };
type PostData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  status: string;
  readTime: string;
  categoryId: string;
  tags: string[];
};

export function PostEditor({
  categories,
  posts,
}: {
  categories: Category[];
  posts: PostData[];
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string>("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverUrl: "",
    status: "DRAFT",
    readTime: "5 phút đọc",
    categoryId: "",
    tags: "",
  });
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  function loadPost(id: string) {
    const p = posts.find((x) => x.id === id);
    if (!p) return;
    setEditingId(id);
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      coverUrl: p.coverUrl,
      status: p.status,
      readTime: p.readTime,
      categoryId: p.categoryId,
      tags: p.tags.join(", "),
    });
  }

  async function upload(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.set("file", file);
    fd.set("alt", form.title || file.name);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) {
      setMsg("Upload thất bại");
      return;
    }
    const data = await res.json();
    setForm((f) => ({ ...f, coverUrl: data.media.url }));
    setMsg("Đã upload ảnh cover");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const payload = {
      ...(editingId ? { id: editingId } : {}),
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      coverUrl: form.coverUrl,
      status: form.status,
      readTime: form.readTime,
      categoryId: form.categoryId || null,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    const res = await fetch("/api/admin/posts", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setMsg("Lưu thất bại");
      return;
    }
    setMsg("Đã lưu thành công");
    router.refresh();
  }

  async function remove() {
    if (!editingId) return;
    if (!confirm("Xóa bài viết này?")) return;
    await fetch(`/api/admin/posts?id=${editingId}`, { method: "DELETE" });
    setEditingId("");
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverUrl: "",
      status: "DRAFT",
      readTime: "5 phút đọc",
      categoryId: "",
      tags: "",
    });
    router.refresh();
  }

  return (
    <div className="mt-4 space-y-3">
      <select
        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
        value={editingId}
        onChange={(e) => {
          if (!e.target.value) {
            setEditingId("");
            return;
          }
          loadPost(e.target.value);
        }}
      >
        <option value="">+ Bài viết mới</option>
        {posts.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>

      <form onSubmit={save} className="space-y-3">
        <input
          required
          placeholder="Tiêu đề"
          value={form.title}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              title: e.target.value,
              slug:
                f.slug ||
                e.target.value
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, ""),
            }))
          }
          className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
        />
        <input
          required
          placeholder="slug"
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
        />
        <textarea
          required
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          className="min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <textarea
          required
          placeholder="Nội dung (Markdown)"
          value={form.content}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          className="min-h-40 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
        />
        <div className="flex gap-2">
          <input
            placeholder="Cover URL"
            value={form.coverUrl}
            onChange={(e) => setForm((f) => ({ ...f, coverUrl: e.target.value }))}
            className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-sm"
          />
          <label className="inline-flex h-10 cursor-pointer items-center rounded-xl border border-slate-200 px-3 text-sm">
            {uploading ? "..." : "Upload"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void upload(file);
              }}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
          <select
            value={form.categoryId}
            onChange={(e) =>
              setForm((f) => ({ ...f, categoryId: e.target.value }))
            }
            className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
          >
            <option value="">Danh mục</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <input
          placeholder="Tags (phẩy)"
          value={form.tags}
          onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
          className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="h-10 flex-1 rounded-xl bg-brand text-sm font-semibold text-white"
          >
            Lưu
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={remove}
              className="h-10 rounded-xl border border-rose-200 px-4 text-sm font-semibold text-rose-600"
            >
              Xóa
            </button>
          ) : null}
        </div>
        {msg ? <p className="text-sm text-emerald-600">{msg}</p> : null}
      </form>
    </div>
  );
}
