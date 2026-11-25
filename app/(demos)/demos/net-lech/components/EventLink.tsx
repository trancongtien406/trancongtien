"use client";

import type { ReactNode } from "react";

/** Link neo (#id) phát sự kiện để Service Builder nhận lựa chọn từ phần Dịch vụ / Stylist. Không lưu gì. */
export function EventLink({ href, event, detail, className, children }: {
  href: string; event: "nl:add" | "nl:stylist"; detail: Record<string, string>; className?: string; children: ReactNode;
}) {
  return (
    <a className={className} href={href} onClick={() => { window.dispatchEvent(new CustomEvent(event, { detail })); }}>
      {children}
    </a>
  );
}
