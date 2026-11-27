"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";

const PV = [
  ["#e8ff47", "#141414"],
  ["#fff", "#e8ff47"],
  ["#141414", "#e8ff47"],
  ["#e8ff47", "#fff"],
];

/** Hiệu ứng chủ đạo: con trỏ từ tính (quickTo + mix-blend difference), nút hút, chữ hero phản ứng, xem trước dự án đi theo chuột. */
export function Fx() {
  const cursor = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const preview = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-dp-root]");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const ctx = gsap.context(() => {
      /* reveal khi cuộn */
      if (!reduce) {
        const items = gsap.utils.toArray<HTMLElement>("[data-rv]", root);
        gsap.set(items, { y: 48, opacity: 0 });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08 }),
        });
        const letters = gsap.utils.toArray<HTMLElement>("[data-l]", root);
        gsap.from(letters, { yPercent: 60, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.04, delay: 0.1 });
      }
      if (reduce || !fine) return;

      const c = cursor.current!, lb = label.current!, pv = preview.current!;
      root.classList.add(styles.hasCursor);
      const cx = gsap.quickTo(c, "x", { duration: 0.35, ease: "power3" });
      const cy = gsap.quickTo(c, "y", { duration: 0.35, ease: "power3" });
      const lx = gsap.quickTo(lb, "x", { duration: 0.5, ease: "power3" });
      const ly = gsap.quickTo(lb, "y", { duration: 0.5, ease: "power3" });
      const px = gsap.quickTo(pv, "x", { duration: 0.7, ease: "power3" });
      const py = gsap.quickTo(pv, "y", { duration: 0.7, ease: "power3" });
      const prot = gsap.quickTo(pv, "rotation", { duration: 0.8, ease: "power3" });

      const magnets = gsap.utils.toArray<HTMLElement>("[data-magnet]", root).map((el) => {
        const inner = el.firstElementChild as HTMLElement;
        return { el, inner, x: gsap.quickTo(inner, "x", { duration: 1, ease: "elastic.out(1,0.35)" }), y: gsap.quickTo(inner, "y", { duration: 1, ease: "elastic.out(1,0.35)" }) };
      });
      const letters = gsap.utils.toArray<HTMLElement>("[data-l]", root).map((el) => ({ el, y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" }), s: gsap.quickTo(el, "scaleY", { duration: 0.6, ease: "power3" }) }));

      let lastX = 0;
      const onMove = (e: PointerEvent) => {
        gsap.to(c, { opacity: 1, duration: 0.2, overwrite: "auto" });
        cx(e.clientX); cy(e.clientY);
        lx(e.clientX + 18); ly(e.clientY + 18);
        px(e.clientX + 24); py(e.clientY - 120);
        prot(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6)); lastX = e.clientX;
        for (const m of magnets) {
          const r = m.el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          const near = Math.hypot(dx, dy) < Math.max(r.width, r.height) * 0.5 + 70;
          m.x(near ? dx * 0.4 : 0); m.y(near ? dy * 0.4 : 0);
        }
        for (const l of letters) {
          const r = l.el.getBoundingClientRect();
          const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
          const k = Math.max(0, 1 - d / 320);
          l.y(-k * 26); l.s(1 + k * 0.1);
        }
      };
      window.addEventListener("pointermove", onMove);

      let size = 1;
      const setCursor = (scale: number, text: string) => {
        size = scale;
        gsap.to(c, { scale, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        lb.textContent = text;
        gsap.to(lb, { opacity: text ? 1 : 0, duration: 0.2 });
      };
      const over = (e: Event) => {
        const t = e.target as HTMLElement;
        const cu = t.closest<HTMLElement>("[data-cursor]");
        const pvEl = t.closest<HTMLElement>("[data-pv]");
        if (pvEl) {
          const i = Number(pvEl.dataset.pv);
          pv.querySelectorAll<HTMLElement>("[data-pvi]").forEach((s) => (s.style.display = Number(s.dataset.pvi) === i ? "block" : "none"));
          gsap.to(pv, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        }
        if (cu) setCursor(3.4, cu.dataset.cursor ?? "");
        else if (t.closest("a,button,summary,label")) setCursor(2.2, "");
      };
      const out = (e: Event) => {
        const t = e.target as HTMLElement;
        if (t.closest("[data-pv]")) gsap.to(pv, { opacity: 0, scale: 0.6, duration: 0.3, overwrite: "auto" });
        if (t.closest("[data-cursor],a,button,summary,label") && size !== 1) setCursor(1, "");
      };
      root.addEventListener("pointerover", over);
      root.addEventListener("pointerout", out);
      const leave = () => gsap.to(c, { opacity: 0, duration: 0.2 });
      document.addEventListener("pointerleave", leave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerover", over);
        root.removeEventListener("pointerout", out);
        document.removeEventListener("pointerleave", leave);
        root.classList.remove(styles.hasCursor);
      };
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={cursor} className={styles.cursor} aria-hidden="true" />
      <span ref={label} className={styles.cursorLabel} aria-hidden="true" />
      <div ref={preview} className={styles.preview} aria-hidden="true">
        {PV.map(([a, b], i) => (
          <svg key={i} data-pvi={i} viewBox="0 0 400 500" style={{ display: i === 0 ? "block" : "none" }}>
            <rect width="400" height="500" fill={a} />
            {i % 2 === 0 ? <circle cx="200" cy="250" r="130" fill={b} /> : <path d="M0 500 L400 0 L400 500Z" fill={b} />}
            <rect x="40" y="40" width="120" height="14" fill={b} opacity=".5" />
            <rect x="40" y="64" width="80" height="14" fill={b} opacity=".5" />
          </svg>
        ))}
      </div>
    </>
  );
}
