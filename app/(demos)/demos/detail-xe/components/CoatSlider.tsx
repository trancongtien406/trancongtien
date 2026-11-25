"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { gsap, observeInView, prefersReducedMotion } from "@/features/showroom/effects";
import s from "../brand.module.css";

const P = "/images/demos/detail-xe";

/**
 * Slider "bề mặt chưa phủ / đã phủ": kéo, chạm hoặc dùng phím mũi tên (±5, Home/End).
 * Hai ảnh stock của hai bề mặt khác nhau, dùng để giải thích nguyên lý chống bám nước.
 * Lần đầu vào khung, tay cầm trượt nhẹ một lần để gợi ý thao tác (bỏ qua khi reduced-motion).
 */
export function CoatSlider() {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const touched = useRef(false);

  useEffect(() => {
    const el = box.current;
    if (!el || prefersReducedMotion()) return;
    const state = { v: 50 };
    let tw: gsap.core.Tween | null = null;
    const off = observeInView(el, (inView) => {
      if (!inView || touched.current || tw) return;
      tw = gsap.to(state, { v: 34, duration: 0.9, ease: "power2.inOut", yoyo: true, repeat: 1, onUpdate: () => { if (!touched.current) setPos(Math.round(state.v * 10) / 10); }, onComplete: () => { if (!touched.current) setPos(50); } });
    }, { threshold: 0.5, once: true });
    return () => { tw?.kill(); if (typeof off === "function") off(); };
  }, []);

  const setFrom = (clientX: number) => {
    const el = box.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  const down = (e: PointerEvent<HTMLDivElement>) => {
    touched.current = true; dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setFrom(e.clientX);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => { if (dragging.current) setFrom(e.clientX); };
  const up = () => { dragging.current = false; };
  const key = (e: KeyboardEvent<HTMLButtonElement>) => {
    const k = e.key; let v = pos;
    if (k === "ArrowLeft" || k === "ArrowDown") v -= 5;
    else if (k === "ArrowRight" || k === "ArrowUp") v += 5;
    else if (k === "Home") v = 0;
    else if (k === "End") v = 100;
    else return;
    e.preventDefault(); touched.current = true;
    setPos(Math.max(0, Math.min(100, v)));
  };

  return (
    <div
      ref={box} className={s.slider} style={{ ["--pos" as string]: `${pos}%` }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
    >
      <Image src={`${P}/be-mat-da-phu-1200.webp`} alt="Nước tụ thành giọt nhỏ trên bề mặt sơn đen đã phủ" fill sizes="(max-width: 960px) 100vw, 56vw" className={s.sliderImg} />
      <div className={s.sliderTop}>
        <Image src={`${P}/be-mat-chua-phu-1200.webp`} alt="Nước loang thành màng trên bề mặt sơn chưa phủ" fill sizes="(max-width: 960px) 100vw, 56vw" className={s.sliderImg} style={{ objectPosition: "50% 38%" }} />
      </div>
      <span className={`${s.sliderTag} ${s.sliderTagL}`}>Bề mặt chưa phủ</span>
      <span className={`${s.sliderTag} ${s.sliderTagR}`}>Đã phủ</span>
      <button
        type="button" role="slider" className={s.sliderHandle} aria-label="Kéo để so sánh bề mặt chưa phủ và đã phủ"
        aria-orientation="horizontal" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
        aria-valuetext={`Hiển thị ${Math.round(pos)} phần trăm bề mặt chưa phủ`} onKeyDown={key}
      >
        <span className={s.sliderKnob} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="2" /></svg>
        </span>
      </button>
    </div>
  );
}
