"use client";

import type { ReactNode } from "react";
import { prefersReducedMotion } from "@/features/showroom/effects";

export type Preset = { type: string; material: string; stone: string; size: number; stoneMm?: number };

/** Nút "Cấu hình mẫu này": gửi sự kiện cho công cụ cấu hình rồi cuộn tới đó. Không JS thì là link neo #cau-hinh. */
export function PresetButton({ preset, className, children, cursor }: { preset: Preset; className?: string; children: ReactNode; cursor?: string }) {
  return (
    <a
      href="#cau-hinh"
      className={className}
      data-cursor={cursor}
      onClick={(e) => {
        const target = document.getElementById("cau-hinh");
        if (!target) return;
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("kn:preset", { detail: preset }));
        target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", "#cau-hinh");
      }}
    >
      {children}
    </a>
  );
}
