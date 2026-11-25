"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import s from "../brand.module.css";

const BASE = "/images/demos/nail-pop";

/**
 * Ảnh chuyển kiểu glitch màu nhẹ: hai bản sao lệch hồng/cobalt cắt lát, chạy ~0.5s khi vào khung lần đầu và khi hover.
 * Hiệu ứng chỉ là lớp trang trí (aria-hidden), reduced-motion: tắt.
 */
export function GlitchImage({ file, alt, sizes, priority = false, ratio }: { file: string; alt: string; sizes: string; priority?: boolean; ratio: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("data-fx", "GlitchImage");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.setAttribute("data-fx-ready", reduced ? "static" : "1");
    if (reduced) return;
    let t = 0;
    const play = () => { el.setAttribute("data-glitch", "1"); window.clearTimeout(t); t = window.setTimeout(() => el.removeAttribute("data-glitch"), 620); };
    const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { play(); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    const hov = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (hov) el.addEventListener("pointerenter", play);
    return () => { io.disconnect(); window.clearTimeout(t); el.removeEventListener("pointerenter", play); };
  }, []);
  const bg = { backgroundImage: `url(${BASE}/${file}-600.webp)` };
  return (
    <div ref={ref} className={s.glitch} style={{ aspectRatio: ratio }}>
      <Image src={`${BASE}/${file}-1200.webp`} alt={alt} fill sizes={sizes} priority={priority} className={s.glitchImg} />
      <span className={`${s.glitchGhost} ${s.ghostA}`} style={bg} aria-hidden="true" />
      <span className={`${s.glitchGhost} ${s.ghostB}`} style={bg} aria-hidden="true" />
    </div>
  );
}
