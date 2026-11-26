"use client";

import type { ReactNode } from "react";
import { DraggableGallery } from "@/features/showroom/effects";

/**
 * Bọc DraggableGallery cho thẻ có nút bên trong. Thư viện bắt con trỏ (pointer capture) khi kéo bằng chuột,
 * nên click không rơi vào nút con; ở đây chuyển click không-kéo về nút nằm dưới con trỏ.
 */
export function StyleGallery({ children, className, trackClassName, buttonClassName }: { children: ReactNode; className?: string; trackClassName?: string; buttonClassName?: string }) {
  return (
    <div
      onClick={(e) => {
        const t = e.target as HTMLElement;
        if (!t.hasAttribute("data-fx-viewport")) return;
        const el = document.elementFromPoint(e.clientX, e.clientY)?.closest("button,a") as HTMLElement | null;
        if (el && el !== t) el.click();
      }}
    >
      <DraggableGallery className={className} trackClassName={trackClassName} gap="clamp(16px, 2.4vw, 32px)" friction={0.93} buttonClassName={buttonClassName} prevLabel="Xem phong cách trước" nextLabel="Xem phong cách sau" label="Bốn phong cách chụp, kéo ngang hoặc dùng phím mũi tên">
        {children}
      </DraggableGallery>
    </div>
  );
}
