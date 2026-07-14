"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MediaUploader() {
  const router = useRouter();
  const [alt, setAlt] = useState("");
  const [msg, setMsg] = useState("");

  async function onUpload(file: File) {
    const fd = new FormData();
    fd.set("file", file);
    fd.set("alt", alt || file.name);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) {
      setMsg("Upload thất bại");
      return;
    }
    setMsg("Upload thành công");
    setAlt("");
    router.refresh();
  }

  return (
    <div className="mt-4 space-y-3">
      <input
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        placeholder="Alt text (SEO)"
        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
      />
      <label className="flex h-28 cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-500 hover:bg-slate-50">
        Chọn ảnh để upload
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onUpload(f);
          }}
        />
      </label>
      {msg ? <p className="text-sm text-emerald-600">{msg}</p> : null}
    </div>
  );
}
