"use client";

import { Children, useRef, type CSSProperties, type ReactNode } from "react";
import { clamp, gsap, hasFinePointer, markReady, on, prefersReducedMotion, useFx } from "./core";

/* ------------------------------------------------------------------ 18. DraggableGallery */

export type DraggableGalleryProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  style?: CSSProperties;
  gap?: string;
  /** px mỗi lần bấm nút / phím mũi tên; mặc định = chiều rộng phần tử đầu + gap */
  step?: number;
  /** hệ số ma sát quán tính 0..1 (càng gần 1 càng trôi lâu) */
  friction?: number;
  showButtons?: boolean;
  buttonClassName?: string;
  prevLabel?: string;
  nextLabel?: string;
  label?: string;
  /** ảnh/thẻ có thể nhận focus riêng; viewport luôn focus được để dùng phím mũi tên */
  hideScrollbar?: boolean;
};

/**
 * Cuộn ngang NATIVE (chạm, bàn phím, thanh cuộn) + kéo chuột có quán tính + nút trước/sau.
 * Không-kéo vẫn đủ dùng: nút, phím ←/→/Home/End, cuộn ngang bằng bàn di chuột.
 */
export function DraggableGallery({
  children, className, trackClassName, style, gap = "1rem", step, friction = 0.94, showButtons = true, buttonClassName,
  prevLabel = "Xem ảnh trước", nextLabel = "Xem ảnh sau", label = "Thư viện ảnh, kéo ngang hoặc dùng phím mũi tên", hideScrollbar = false,
}: DraggableGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  useFx(ref, (root) => {
    const vp = root.querySelector<HTMLElement>("[data-fx-viewport]")!;
    const prev = root.querySelector<HTMLButtonElement>("[data-fx-prev]");
    const next = root.querySelector<HTMLButtonElement>("[data-fx-next]");
    const reduced = prefersReducedMotion();
    const stepPx = () => step ?? ((vp.querySelector("[data-fx-item]") as HTMLElement | null)?.offsetWidth ?? 280) + parseFloat(getComputedStyle(vp.firstElementChild as Element).columnGap || "16");
    const sync = () => {
      const max = vp.scrollWidth - vp.clientWidth;
      if (prev) { prev.disabled = vp.scrollLeft <= 1; }
      if (next) { next.disabled = vp.scrollLeft >= max - 1; }
    };
    const go = (dx: number) => vp.scrollBy({ left: dx, behavior: reduced ? "auto" : "smooth" });
    let vel = 0, down = false, moved = 0, lastX = 0, lastT = 0, tickOn = false;
    const stopTick = () => { if (tickOn) { gsap.ticker.remove(tick); tickOn = false; } };
    function tick(_t: number, dms: number) {
      vp.scrollLeft -= vel * (dms / 16.67);
      vel *= Math.pow(friction, dms / 16.67);
      if (Math.abs(vel) < 0.15) { stopTick(); vp.style.scrollSnapType = ""; }
    }
    const fine = hasFinePointer();
    const offs = [
      on(vp, "scroll", sync, { passive: true }),
      on(window, "resize", sync),
      on(vp, "keydown", (e) => {
        if (e.target !== vp) return;
        if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) stopTick(); // dừng quán tính kéo để phím/nút không bị ticker ghi đè
        if (e.key === "ArrowRight") { e.preventDefault(); go(stepPx()); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); go(-stepPx()); }
        else if (e.key === "Home") { e.preventDefault(); vp.scrollTo({ left: 0, behavior: reduced ? "auto" : "smooth" }); }
        else if (e.key === "End") { e.preventDefault(); vp.scrollTo({ left: vp.scrollWidth, behavior: reduced ? "auto" : "smooth" }); }
      }),
      ...(prev ? [on(prev, "click", () => { stopTick(); go(-stepPx()); })] : []),
      ...(next ? [on(next, "click", () => { stopTick(); go(stepPx()); })] : []),
    ];
    if (fine) {
      vp.style.cursor = "grab";
      offs.push(
        on(vp, "pointerdown", (e) => {
          if (e.pointerType === "touch" || e.button !== 0) return;
          // Không bắt con trỏ khi bấm vào phần tử tương tác bên trong (nút, liên kết, ô nhập): để click chạy bình thường.
          if ((e.target as Element | null)?.closest?.("button,a,input,select,textarea,label,summary,[role=button],[data-no-drag]")) return;
          down = true; moved = 0; vel = 0; lastX = e.clientX; lastT = performance.now();
          stopTick();
          vp.style.scrollSnapType = "none";
        }),
        on(vp, "pointermove", (e) => {
          if (!down) return;
          const dx = e.clientX - lastX, n = performance.now();
          moved += Math.abs(dx);
          if (!vp.hasPointerCapture(e.pointerId)) {
            if (moved < 5) { lastX = e.clientX; lastT = n; return; } // chưa đủ ngưỡng kéo: vẫn là click
            vp.setPointerCapture(e.pointerId); vp.style.cursor = "grabbing"; vp.style.userSelect = "none";
          }
          vp.scrollLeft -= dx;
          vel = dx / Math.max(1, n - lastT) * 16.67 * 0.9 + vel * 0.1;
          lastX = e.clientX; lastT = n;
        }),
        on(vp, "pointerup", () => {
          if (!down) return;
          down = false; vp.style.cursor = "grab"; vp.style.userSelect = "";
          if (reduced || Math.abs(vel) < 0.5) { vp.style.scrollSnapType = ""; return; }
          vel = clamp(vel, -60, 60);
          gsap.ticker.add(tick); tickOn = true;
        }),
        on(vp, "pointercancel", () => { down = false; vp.style.cursor = "grab"; vp.style.userSelect = ""; vp.style.scrollSnapType = ""; }),
        on(vp, "click", (e) => { if (moved > 5) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true),
        on(vp, "dragstart", (e) => e.preventDefault()),
      );
    }
    sync();
    markReady(root, reduced ? "static" : "1");
    return () => { offs.forEach((f) => f()); stopTick(); vp.style.cssText = ""; };
  }, [step, friction, items.length]);

  const btn: CSSProperties = { cursor: "pointer" };
  return (
    <div ref={ref} className={className} style={style} data-fx="DraggableGallery">
      {hideScrollbar && <style>{`[data-fx="DraggableGallery"] [data-fx-viewport]::-webkit-scrollbar{display:none}`}</style>}
      <div
        data-fx-viewport="" tabIndex={0} role="region" aria-label={label}
        style={{ overflowX: "auto", scrollSnapType: "x proximity", overscrollBehaviorX: "contain", scrollbarWidth: hideScrollbar ? "none" : "thin", touchAction: "pan-x pan-y" }}
      >
        <div className={trackClassName} style={{ display: "flex", gap, width: "max-content" }}>
          {items.map((c, i) => <div key={i} data-fx-item="" style={{ flex: "none", scrollSnapAlign: "start" }}>{c}</div>)}
        </div>
      </div>
      {showButtons && (
        <div data-fx-buttons="">
          <button type="button" data-fx-prev="" className={buttonClassName} style={btn} aria-label={prevLabel} disabled>←</button>
          <button type="button" data-fx-next="" className={buttonClassName} style={btn} aria-label={nextLabel}>→</button>
        </div>
      )}
    </div>
  );
}
