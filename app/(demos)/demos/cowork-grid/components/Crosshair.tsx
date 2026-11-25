"use client";

import { useEffect, useRef } from "react";
import s from "../brand.module.css";

const pad = (n: number, l = 4) => String(Math.max(0, Math.round(n))).padStart(l, "0");

/**
 * Con trỏ chữ thập toàn trang + toạ độ theo lưới nền 80px (A1, B2...).
 * Chỉ khi có chuột (hover:hover, pointer:fine); ẩn khi con trỏ vào ô nhập liệu; không chặn sự kiện.
 * Tôn trọng reduced-motion: vẫn bám con trỏ (không có chuyển động trễ), bỏ hiệu ứng đổi màu mượt.
 */
export function Crosshair() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const h = el.querySelector<HTMLElement>("[data-h]")!;
    const v = el.querySelector<HTMLElement>("[data-v]")!;
    const tag = el.querySelector<HTMLElement>("[data-t]")!;
    let x = 0, y = 0, raf = 0, shown = false;
    const draw = () => {
      raf = 0;
      h.style.transform = `translate3d(0,${y}px,0)`;
      v.style.transform = `translate3d(${x}px,0,0)`;
      const flip = x > window.innerWidth - 160;
      tag.style.transform = `translate3d(${flip ? x - 112 : x + 12}px,${y > window.innerHeight - 50 ? y - 34 : y + 12}px,0)`;
      const col = String.fromCharCode(65 + Math.min(25, Math.floor(x / 80)));
      const row = Math.floor((y + window.scrollY) / 80) + 1;
      tag.textContent = `${col}${row} · X${pad(x)} Y${pad(y + window.scrollY)}`;
    };
    const show = (on: boolean) => { if (on !== shown) { shown = on; el.dataset.on = on ? "1" : ""; } };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement | null;
      const typing = !!t?.closest("input,textarea,select,[contenteditable='true']");
      show(!typing);
      el.dataset.hot = t?.closest("a,button,[role=radio],[role=option],summary") ? "1" : "";
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const out = () => show(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", out);
    window.addEventListener("blur", out);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", out);
      window.removeEventListener("blur", out);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={root} className={s.xh} aria-hidden="true" data-on="">
      <i data-h className={s.xhH} />
      <i data-v className={s.xhV} />
      <b data-t className={s.xhTag}>A1</b>
    </div>
  );
}
