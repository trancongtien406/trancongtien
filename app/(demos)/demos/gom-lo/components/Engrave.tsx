"use client";

import { Fragment, useRef, type ElementType } from "react";
import { markReady, observeInView, prefersReducedMotion, useFxLayout } from "@/features/showroom/effects";
import s from "../brand.module.css";

/**
 * Chữ hiện như được khắc vào đất: từng từ được "rạch" từ trái sang phải bằng clip-path, kèm rãnh lõm (text-shadow).
 * SSR/no-JS hiện sẵn; trạng thái ẩn chỉ đặt sau khi JS chạy. reduced-motion: hiện luôn.
 */
export function Engrave({ as = "h2", children, className = "", trigger = "view", delay = 0, id }: { id?: string; as?: ElementType; children: string; className?: string; trigger?: "view" | "load"; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as;
  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    el.setAttribute("data-eng", "pre");
    markReady(el, "1");
    const go = () => requestAnimationFrame(() => requestAnimationFrame(() => el.setAttribute("data-eng", "in")));
    if (trigger === "load") { const t = window.setTimeout(go, delay); return () => window.clearTimeout(t); }
    return observeInView(el, (v) => { if (v) go(); }, { once: true, rootMargin: "0px 0px -6% 0px" });
  }, [trigger, delay]);
  const words = children.normalize("NFC").split(" ");
  return (
    <Tag ref={ref} id={id} className={`${s.eng} ${className}`} data-fx="EngraveText">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className={s.engWord} style={{ ["--i" as string]: i }}><span className={s.engInk}>{w}</span></span>{i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
