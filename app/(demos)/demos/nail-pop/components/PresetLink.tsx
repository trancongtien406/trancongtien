"use client";

import type { ReactNode } from "react";

/** Link cuộn tới công cụ và gửi cấu hình mẫu cho Builder qua sự kiện cửa sổ. */
export function PresetLink({ preset, className, children }: { preset: Record<string, string>; className?: string; children: ReactNode }) {
  return (
    <a className={className} href="#builder" data-cursor="Thử" onClick={() => window.dispatchEvent(new CustomEvent("np:preset", { detail: preset }))}>
      {children}
    </a>
  );
}
