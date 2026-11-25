"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/features/showroom/effects";
import { StickerArt, STICKER_LABEL, type StickerKind } from "./StickerArt";
import s from "../brand.module.css";

export type StickerSpec = { kind: StickerKind; x: number; y: number; size: number; rot: number; hideSm?: boolean };

/**
 * Nhãn dán kéo thả: Pointer Events, giữ trong khung cha, thả xuống nảy nhẹ một nhịp (không overshoot lớn).
 * Bàn phím: mũi tên dời 12px (Shift 36px), R xoay 15 độ. Reduced-motion: không nảy, không xoay chuyển động.
 */
export function DragStickers({ items, className }: { items: StickerSpec[]; className?: string }) {
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = field.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const cleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLElement>("[data-sticker]").forEach((el, i) => {
      const spec = items[i];
      let rot = spec.rot;
      let dx = 0, dy = 0;
      const apply = () => gsap.set(el, { x: dx, y: dy, rotation: rot });
      apply();
      const bounds = () => {
        const f = root.getBoundingClientRect(), b = el.getBoundingClientRect();
        // vị trí gốc (chưa dịch) = vị trí hiện tại - dịch
        const baseL = b.left - f.left - dx, baseT = b.top - f.top - dy;
        return { minX: -baseL, maxX: f.width - b.width - baseL, minY: -baseT, maxY: f.height - b.height - baseT };
      };
      const clampXY = () => {
        const b = bounds();
        dx = Math.min(b.maxX, Math.max(b.minX, dx));
        dy = Math.min(b.maxY, Math.max(b.minY, dy));
      };
      const settle = () => {
        if (reduced) return apply();
        gsap.fromTo(el, { scale: 1.1 }, { scale: 1, duration: 0.45, ease: "back.out(1.4)", overwrite: "auto" });
      };
      let sx = 0, sy = 0, ox = 0, oy = 0, drag = false, pid = -1;
      const down = (e: PointerEvent) => {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        drag = true; pid = e.pointerId; sx = e.clientX; sy = e.clientY; ox = dx; oy = dy;
        el.setPointerCapture(pid);
        el.dataset.drag = "1";
        el.style.zIndex = "5";
        if (!reduced) gsap.to(el, { scale: 1.12, duration: 0.18, ease: "power2.out", overwrite: "auto" });
      };
      const move = (e: PointerEvent) => {
        if (!drag) return;
        dx = ox + e.clientX - sx; dy = oy + e.clientY - sy;
        clampXY();
        gsap.set(el, { x: dx, y: dy });
      };
      const up = () => {
        if (!drag) return;
        drag = false; delete el.dataset.drag;
        try { el.releasePointerCapture(pid); } catch { /* đã nhả */ }
        settle();
      };
      const key = (e: KeyboardEvent) => {
        const step = e.shiftKey ? 36 : 12;
        let hit = true;
        if (e.key === "ArrowLeft") dx -= step;
        else if (e.key === "ArrowRight") dx += step;
        else if (e.key === "ArrowUp") dy -= step;
        else if (e.key === "ArrowDown") dy += step;
        else if (e.key === "r" || e.key === "R") rot += 15;
        else hit = false;
        if (!hit) return;
        e.preventDefault();
        clampXY();
        apply();
      };
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      el.addEventListener("keydown", key);
      cleanups.push(() => {
        el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up); el.removeEventListener("keydown", key);
        gsap.killTweensOf(el);
      });
    });
    return () => cleanups.forEach((f) => f());
  }, [items]);

  return (
    <div ref={field} className={`${s.stickerField} ${className ?? ""}`}>
      {items.map((it, i) => (
        <div
          key={i}
          data-sticker={it.kind}
          data-paw=""
          className={`${s.sticker} ${it.hideSm ? s.hideSm : ""}`}
          style={{ left: `calc(${it.x}% - ${((it.x / 100) * it.size).toFixed(1)}px)`, top: `calc(${it.y}% - ${((it.y / 100) * it.size).toFixed(1)}px)`, "--w": it.size } as React.CSSProperties}
          tabIndex={0}
          role="group"
          aria-roledescription="nhãn dán kéo thả"
          aria-label={`${STICKER_LABEL[it.kind]}. Kéo để dời, hoặc dùng phím mũi tên; phím R để xoay.`}
        >
          <StickerArt kind={it.kind} />
        </div>
      ))}
    </div>
  );
}
