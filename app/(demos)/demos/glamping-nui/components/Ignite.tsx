"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, markReady, observeInView, prefersReducedMotion, useFxLayout } from "@/features/showroom/effects";

/**
 * Ignite: chữ "bắt lửa". Từng từ sáng loé (brightness cao + mờ) rồi nguội về màu thường, lệch nhịp như than hồng bén lên.
 * Riêng của Rừng Thức, thay cho hiệu ứng tách từ đại trà. Nội dung hiện đủ khi SSR/no-JS/reduced-motion.
 */
export function Ignite({ as = "span", children, className, trigger = "view", delay = 0, stagger = 0.07 }: {
  as?: ElementType; children: string; className?: string; trigger?: "view" | "load"; delay?: number; stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;
  const words = children.normalize("NFC").split(/(?<=[ ])/u);
  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    const ws = Array.from(el.querySelectorAll<HTMLElement>("[data-ig]"));
    gsap.set(ws, { opacity: 0, y: 10, filter: "blur(7px) brightness(2.6)" });
    let tw: gsap.core.Tween | null = null;
    const play = () => { tw = gsap.to(ws, { opacity: 1, y: 0, filter: "blur(0px) brightness(1)", duration: 1.1, stagger, delay, ease: "power2.out", onComplete: () => { gsap.set(ws, { clearProps: "filter,transform,opacity" }); } }); };
    let off = () => {};
    if (trigger === "load") play(); else off = observeInView(el, (v) => { if (v && !tw) play(); }, { once: true, threshold: 0.2 });
    const safety = window.setTimeout(() => { if (!tw) play(); }, 9000);
    markReady(el);
    return () => { window.clearTimeout(safety); off(); };
  }, [children, trigger, delay, stagger]);
  return (
    <Tag ref={ref} className={className} data-fx="Ignite">
      {words.map((w, i) => <span key={i} data-ig="" style={{ display: "inline-block", whiteSpace: "pre" }}>{w}</span>)}
    </Tag>
  );
}

/**
 * Unfold: ảnh mở ra như cửa lều (khe dọc giữa nở sang hai bên) hoặc như lửa bùng lên từ đáy (variant "bloom").
 * Riêng của Rừng Thức; một lần khi vào khung; hiện đủ khi reduced/no-JS.
 */
export function Unfold({ children, className, variant = "flap", style }: { children: ReactNode; className?: string; variant?: "flap" | "bloom"; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    const inner = el.firstElementChild as HTMLElement | null;
    const from = variant === "flap" ? "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" : "circle(0% at 50% 92%)";
    const to = variant === "flap" ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "circle(150% at 50% 92%)";
    gsap.set(el, { clipPath: from });
    if (inner) gsap.set(inner, { scale: 1.18 });
    let played = false;
    const play = () => {
      played = true;
      gsap.to(el, { clipPath: to, duration: 1.35, ease: "power3.inOut", onComplete: () => { gsap.set(el, { clearProps: "clipPath" }); } });
      if (inner) gsap.to(inner, { scale: 1, duration: 1.8, ease: "power2.out", onComplete: () => { gsap.set(inner, { clearProps: "transform" }); } });
    };
    const off = observeInView(el, (v) => { if (v && !played) play(); }, { once: true, threshold: 0.15 });
    const safety = window.setTimeout(() => { if (!played) play(); }, 9000);
    markReady(el);
    return () => { window.clearTimeout(safety); off(); };
  }, [variant]);
  return <div ref={ref} className={className} style={style} data-fx="Unfold">{children}</div>;
}
