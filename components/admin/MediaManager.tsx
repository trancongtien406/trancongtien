"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Copy } from "lucide-react";
import {
  AdminCard,
  AdminPageHeader,
} from "@/components/admin/AdminChrome";
import { AdminToolbar } from "@/components/admin/ui/AdminToolbar";
import { FileUploadField } from "@/components/admin/ui/FileUploadField";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";

type MediaRow = {
  id: string;
  filename: string;
  url: string;
  alt: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

export function MediaManager({ items }: { items: MediaRow[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<MediaRow | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (m) =>
        m.filename.toLowerCase().includes(q) ||
        m.alt.toLowerCase().includes(q) ||
        m.url.toLowerCase().includes(q),
    );
  }, [items, search]);

  return (
    <>
      <AdminPageHeader
        title="Media Library"
        subtitle="Upload kéo-thả — không cần dán link ảnh thủ công"
      />
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <AdminCard>
          <FileUploadField
            label="Upload ảnh mới"
            value={uploadUrl}
            onChange={(url) => {
              setUploadUrl(url);
              if (url) {
                setUploadUrl("");
                router.refresh();
              }
            }}
          />
        </AdminCard>
        <div>
          <AdminToolbar
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Tìm tên file, alt, url..."
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPreview(m)}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-brand/40"
              >
                <div className="relative aspect-video bg-slate-50">
                  {m.mimeType.startsWith("image/") ? (
                    <Image
                      src={m.url}
                      alt={m.alt || m.filename}
                      fill
                      className="object-cover"
                      sizes="240px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs">
                      {m.mimeType}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {m.filename}
                  </p>
                  <p className="truncate text-xs text-slate-500">{m.alt}</p>
                </div>
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="mt-8 text-center text-sm text-slate-500">
              Chưa có media phù hợp.
            </p>
          ) : null}
        </div>
      </div>

      <AdminDialog
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.filename || ""}
        size="lg"
        footer={
          preview ? (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(preview.url);
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold"
              >
                <Copy className="size-4" /> Copy URL
              </button>
            </div>
          ) : null
        }
      >
        {preview ? (
          <div className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-50">
              <Image
                src={preview.url}
                alt={preview.alt || preview.filename}
                fill
                className="object-contain"
              />
            </div>
            <p className="break-all text-sm text-slate-600">{preview.url}</p>
            <p className="text-xs text-slate-500">
              Alt: {preview.alt || "—"} · {(preview.size / 1024).toFixed(1)} KB ·{" "}
              {preview.createdAt}
            </p>
          </div>
        ) : null}
      </AdminDialog>
    </>
  );
}
