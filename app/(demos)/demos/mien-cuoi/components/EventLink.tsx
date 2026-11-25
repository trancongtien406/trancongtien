"use client";

import type { ReactNode } from "react";

/** Link neo (#id) có phát sự kiện để Care Navigator / Scheduler nhận giá trị chọn trước. Không lưu gì. */
export function EventLink({ href, event, detail, className, children }: {
  href: string; event: "mc:navigator" | "mc:scheduler"; detail: Record<string, string>; className?: string; children: ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={() => { window.dispatchEvent(new CustomEvent(event, { detail })); }}
    >
      {children}
    </a>
  );
}
