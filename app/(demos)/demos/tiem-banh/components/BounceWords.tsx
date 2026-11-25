"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion, hasFinePointer } from "@/features/showroom/effects";

/**
 * Chữ nảy theo từ: lúc tải, từng từ rơi xuống và nảy (back.out) lệch nhịp nhau.
 * Rê chuột vào một từ thì từ đó nhún lên một lần. Không tách ký tự (an toàn dấu tiếng Việt).
 * Reduced-motion: chữ đứng yên. Chữ có sẵn trong HTML nên no-JS vẫn đọc được.
 */
export function BounceWords({ lines, className }: { lines: string[][]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    const ctx = gsap.context(() => {
      gsap.from(words, { y: -90, rotate: () => gsap.utils.random(-9, 9), opacity: 0, scaleY: 0.7, transformOrigin: "50% 100%", duration: 0.9, ease: "back.out(2.4)", stagger: 0.11, delay: 0.25 });
    }, el);
    const offs: (() => void)[] = [];
    if (hasFinePointer()) {
      words.forEach((w) => {
        const h = () => { if (!gsap.isTweening(w)) gsap.fromTo(w, { y: 0 }, { keyframes: [{ y: -14, rotate: -2.5, duration: 0.16, ease: "power2.out" }, { y: 0, rotate: 0, duration: 0.5, ease: "elastic.out(1,0.45)" }] }); };
        w.addEventListener("pointerenter", h);
        offs.push(() => w.removeEventListener("pointerenter", h));
      });
    }
    return () => { offs.forEach((f) => f()); ctx.revert(); };
  }, []);
  return (
    <h1 ref={ref} className={className} data-fx="BounceWords">
      {lines.map((ws, i) => (
        <span key={i} style={{ display: "block" }}>
          {ws.map((w, j) => (
            <span key={j}>
              <span data-w="" style={{ display: "inline-block", willChange: "transform" }}>{w}</span>{j < ws.length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
