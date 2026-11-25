"use client";

import { Fragment, useEffect, useRef, type ElementType } from "react";
import { gsap, observeInView, prefersReducedMotion, hasFinePointer } from "@/features/showroom/effects";
import s from "../brand.module.css";

/**
 * Chữ nhảy theo từ, có kiểm soát: mỗi từ nhảy lên 0,16em rồi hạ xuống một nhịp (power2.out lên, power2.in xuống,
 * thêm một nảy nhỏ 0,04em), so le 55ms, chỉ một lần khi vào khung (hoặc khi tải trang với mode="enter").
 * Hover vào một từ thì từ đó nhảy lại. Cú pháp *cụm từ* tô nổi (class hl). SSR hiển thị đủ chữ.
 */
export function BounceWords({ text, as = "span", className, mode = "view", delay = 0 }: { text: string; as?: ElementType; className?: string; mode?: "view" | "enter"; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;
  const parts = text.split("*");
  const plain = text.replace(/\*/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    const reduced = prefersReducedMotion();
    const hop = (w: HTMLElement) => {
      if (reduced) return;
      gsap.timeline({ overwrite: false })
        .to(w, { y: "-0.16em", duration: 0.2, ease: "power2.out" })
        .to(w, { y: 0, duration: 0.2, ease: "power2.in" })
        .to(w, { y: "-0.04em", duration: 0.09, ease: "power1.out" })
        .to(w, { y: 0, duration: 0.09, ease: "power1.in" });
    };
    const offs: Array<() => void> = [];
    if (!reduced && hasFinePointer()) {
      words.forEach((w) => { const f = () => { if (!gsap.isTweening(w)) hop(w); }; w.addEventListener("pointerenter", f); offs.push(() => w.removeEventListener("pointerenter", f)); });
    }
    let stop = () => {};
    if (!reduced) {
      if (mode === "enter") {
        gsap.set(words, { y: "0.5em", opacity: 0 });
        gsap.to(words, { y: 0, opacity: 1, duration: 0.55, ease: "back.out(1.2)", stagger: 0.07, delay, onComplete: () => { gsap.set(words, { clearProps: "opacity" }); } });
      } else {
        stop = observeInView(el, (v) => {
          if (!v) return;
          words.forEach((w, i) => gsap.delayedCall(i * 0.055, () => hop(w)));
        }, { once: true, threshold: 0.6 });
      }
    }
    return () => { offs.forEach((f) => f()); stop(); gsap.killTweensOf(words); gsap.set(words, { clearProps: "all" }); };
  }, [mode, delay, text]);

  return (
    <Tag ref={ref} className={`${s.bw} ${className ?? ""}`} aria-label={plain} data-fx="BounceWords">
      <span aria-hidden="true">
        {parts.map((seg, pi) => {
          const hl = pi % 2 === 1;
          const ws = seg.split(" ").filter(Boolean);
          return (
            <Fragment key={pi}>
              {ws.map((w, i) => (
                <Fragment key={i}>
                  <span data-w="" className={`${s.bwWord} ${hl ? s.hl : ""}`}>{w}</span>{" "}
                </Fragment>
              ))}
            </Fragment>
          );
        })}
      </span>
    </Tag>
  );
}
