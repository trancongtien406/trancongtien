"use client";

import { useRef } from "react";
import { gsap, observeInView, prefersReducedMotion, useFxLayout } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { STEPS } from "../data/content";

/**
 * Quy trình 4 bước như cụm đèn xuất phát: khi vào khung, từng đèn sáng lần lượt (0.32s/đèn),
 * rồi dòng "GO" bật. no-JS và reduced-motion: tất cả đèn sáng sẵn.
 */
export function StartLights() {
  const ref = useRef<HTMLOListElement>(null);
  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const go = el.parentElement?.querySelector<HTMLElement>("[data-go]");
    items.forEach((i) => i.setAttribute("data-on", "0"));
    gsap.set(items, { opacity: 0.35, y: 16 });
    if (go) gsap.set(go, { opacity: 0, scale: 0.7 });
    return observeInView(el, (v) => {
      if (!v) return;
      const tl = gsap.timeline();
      items.forEach((it, i) => {
        tl.add(() => it.setAttribute("data-on", "1"), i * 0.32)
          .to(it, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, i * 0.32);
      });
      if (go) tl.to(go, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.4)" }, items.length * 0.32 + 0.1);
    }, { once: true, rootMargin: "0px 0px -18% 0px" });
  }, []);
  return (
    <div className={s.lights}>
      <ol ref={ref} className={s.lightsList}>
        {STEPS.map((st) => (
          <li key={st.n} className={s.lightStep} data-step="" data-on="1">
            <span className={s.lamp} aria-hidden="true"><i /></span>
            <span className={s.stepNo}>{st.n}</span>
            <h3 className={s.h3}>{st.t}</h3>
            <p>{st.d}</p>
          </li>
        ))}
      </ol>
      <p className={s.goWord} data-go="" aria-hidden="true">GO!</p>
    </div>
  );
}
