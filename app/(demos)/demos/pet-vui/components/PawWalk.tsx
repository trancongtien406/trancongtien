"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/features/showroom/effects";
import s from "../brand.module.css";

/**
 * Chân thú bước theo quy trình: danh sách <ol> mà mỗi bước có một dấu chân "đóng dấu" khi cuộn tới.
 * Chỉ dùng IntersectionObserver + CSS (transform/opacity). No-JS và reduced-motion: dấu chân hiện sẵn.
 */
export function PawWalk({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    items.forEach((i) => i.setAttribute("data-stamp", "0"));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).setAttribute("data-stamp", "1"); io.unobserve(e.target); } }), { threshold: 0.35 });
    items.forEach((i) => io.observe(i));
    return () => { io.disconnect(); items.forEach((i) => i.removeAttribute("data-stamp")); };
  }, []);
  return <ol ref={ref} className={s.walk} data-fx="PawWalk">{children}</ol>;
}
