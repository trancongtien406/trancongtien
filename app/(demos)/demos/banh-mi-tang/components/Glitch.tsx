"use client";

import { createElement, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";

const BANDS = ["inset(8% 0 72% 0)", "inset(30% 0 48% 0)", "inset(52% 0 28% 0)", "inset(74% 0 6% 0)"];

/** Chữ nhiễu cắt lát: vài dải ngang lệch trái/phải rồi hội tụ. Phát lại bằng sự kiện "glitch" trên phần tử. */
export function Glitch({ as = "h2", text, className, trigger = "view", delay = 0 }: { as?: "h1" | "h2" | "h3" | "p"; text: string; className?: string; trigger?: "view" | "load" | "manual"; delay?: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const slices = Array.from(el.querySelectorAll<HTMLElement>("[data-s]"));
    const base = el.querySelector<HTMLElement>("[data-b]");
    let tl: gsap.core.Timeline | null = null;
    const play = () => {
      tl?.kill();
      tl = gsap.timeline();
      const steps = 7;
      for (let k = 0; k < steps; k++) {
        tl.set(slices, { opacity: () => (Math.random() > 0.25 ? 1 : 0), x: () => (Math.random() - 0.5) * (70 - k * 9) }, k * 0.07);
        tl.set(base, { opacity: k % 2 ? 1 : 0.55, skewX: () => (Math.random() - 0.5) * 6 * (1 - k / steps) }, k * 0.07);
      }
      tl.set(slices, { opacity: 0, x: 0 }, steps * 0.07);
      tl.set(base, { opacity: 1, skewX: 0 }, steps * 0.07);
    };
    const ctx = gsap.context(() => {
      if (trigger === "view") ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: play });
      else if (trigger === "load") gsap.delayedCall(delay, play);
    }, el);
    el.addEventListener("glitch", play);
    el.addEventListener("pointerenter", play);
    return () => {
      el.removeEventListener("glitch", play);
      el.removeEventListener("pointerenter", play);
      tl?.kill();
      ctx.revert();
    };
  }, [trigger, delay]);

  return createElement(
    as,
    { ref, className: `${styles.glitch} ${className ?? ""}` },
    <span data-b className={styles.glBase}>{text}</span>,
    ...BANDS.map((b, i) => (
      <span key={i} data-s aria-hidden="true" className={styles.glSlice} style={{ clipPath: b, color: i % 2 ? "#f26b1d" : "currentColor" }}>
        {text}
      </span>
    )),
  );
}
