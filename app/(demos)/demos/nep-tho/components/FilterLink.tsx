"use client";

import type { ReactNode } from "react";
import type { FilterDetail } from "./Timetable";

/** Nút/link neo phát sự kiện nt:filter để Timetable đặt bộ lọc và cuộn tới lịch. Không lưu gì. */
export function FilterLink({ detail, className, children, href = "#lich-tap" }: { detail: FilterDetail; className?: string; children: ReactNode; href?: string }) {
  return (
    <a className={className} href={href} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("nt:filter", { detail })); }}>
      {children}
    </a>
  );
}
