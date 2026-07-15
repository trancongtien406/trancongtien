"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FileText, ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { AdminDialog } from "@/components/admin/ui/AdminDialog";

type UploadedMedia = {
  id?: string;
  url: string;
  filename?: string;
  alt?: string;
};

type Props = {
  value?: string;
  onChange: (url: string, media?: UploadedMedia) => void;
  alt?: string;
  label?: string;
  className?: string;
  promptAlt?: boolean;
  altDialogTitle?: string;
  accept?: string;
};

export function FileUploadField({
  value,
  onChange,
  alt = "",
  label = "Ảnh / File",
  className,
  promptAlt = false,
  altDialogTitle = "SEO alt text cho ảnh",
  accept = "image/*",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [draftAlt, setDraftAlt] = useState("");

  async function upload(file: File, imageAlt = alt || file.name) {
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("alt", imageAlt.trim() || file.name);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload thất bại");
      const data = await res.json();
      onChange(data.media.url as string, data.media as UploadedMedia);
      toast.success("Upload thành công");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Upload thất bại";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  function onFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (promptAlt) {
      setDraftAlt(alt || file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
      setPendingFile(file);
      return;
    }
    void upload(file);
  }

  const isImageValue = value
    ? /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(value)
    : false;

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-slate-700">{label}</p>
      {value ? (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <div className="relative aspect-video">
            {isImageValue ? (
              <Image src={value} alt={alt || "Uploaded"} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <FileText className="size-10" />
                  <span className="max-w-4/5 truncate text-xs font-medium">
                    {value.split("/").pop()}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-white px-3 py-2">
            <p className="truncate text-xs text-slate-500">{value}</p>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium"
              >
                Đổi ảnh
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2 py-1 text-xs font-medium text-rose-600"
              >
                <Trash2 className="size-3" /> Xóa
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            onFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-10 text-center transition",
            dragging
              ? "border-brand bg-brand-soft"
              : "border-slate-300 bg-slate-50 hover:border-brand/50 hover:bg-white",
          )}
        >
          {loading ? (
            <Loader2 className="size-8 animate-spin text-brand" />
          ) : (
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white shadow-sm">
              <ImagePlus className="size-6 text-brand" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {loading ? "Đang tải lên..." : "Kéo thả ảnh vào đây"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              hoặc bấm để chọn file (PNG, JPG, WEBP…)
            </p>
          </div>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
            <Upload className="size-3" /> Chọn file
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          onFiles(e.target.files);
          e.target.value = "";
        }}
      />
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
      <AdminDialog
        open={!!pendingFile}
        onClose={() => setPendingFile(null)}
        title={altDialogTitle}
        description="Mô tả ảnh ngắn gọn, tự nhiên. Google Images và screen reader sẽ đọc nội dung này."
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setPendingFile(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold"
            >
              Hủy
            </button>
            <button
              type="button"
              disabled={loading || !pendingFile}
              onClick={() => {
                if (!pendingFile) return;
                const file = pendingFile;
                setPendingFile(null);
                void upload(file, draftAlt);
              }}
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Đang upload..." : "Upload ảnh"}
            </button>
          </div>
        }
      >
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Alt text</span>
          <textarea
            value={draftAlt}
            onChange={(e) => setDraftAlt(e.target.value)}
            className="mt-1.5 min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand/20"
            placeholder="Ví dụ: Dashboard quản trị booking với biểu đồ doanh thu và lịch hẹn"
          />
        </label>
        <p className="mt-2 text-xs text-slate-500">
          File: {pendingFile?.name}. Tránh nhồi keyword; hãy mô tả đúng nội dung ảnh.
        </p>
      </AdminDialog>
    </div>
  );
}
