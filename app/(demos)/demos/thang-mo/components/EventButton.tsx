"use client";

import type { ReactNode } from "react";

/** Nút phát sự kiện window để Immersive Album / Moodboard nhận lệnh. Không lưu gì. */
export function EventButton({ event, detail, className, children, ariaLabel }: {
  event: "tm:album" | "tm:style" | "tm:package"; detail: Record<string, string>; className?: string; children: ReactNode; ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => { window.dispatchEvent(new CustomEvent(event, { detail: { ...detail, trigger: e.currentTarget } })); }}
    >
      {children}
    </button>
  );
}
