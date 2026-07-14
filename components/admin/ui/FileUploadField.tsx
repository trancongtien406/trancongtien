"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value?: string;
  onChange: (url: string) => void;
  alt?: string;
  label?: string;
  className?: string;
};

export function FileUploadField({
  value,
  onChange,
  alt = "",
  label = "Ảnh / File",
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("alt", alt || file.name);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload thất bại");
      const data = await res.json();
      onChange(data.media.url as string);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload thất bại");
    } finally {
      setLoading(false);
    }
  }

  function onFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) void upload(file);
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-slate-700">{label}</p>
      {value ? (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <div className="relative aspect-[16/9]">
            <Image src={value} alt={alt || "Uploaded"} fill className="object-cover" />
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
        accept="image/*"
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
