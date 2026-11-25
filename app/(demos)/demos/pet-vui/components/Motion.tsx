"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/features/showroom/effects";

/**
 * Khoảnh khắc cuộn "bọt xà phòng loang": nền khối mở ra như vòng tròn từ cạnh trên theo tiến độ cuộn (scrub clip-path).
 * SSR/no-JS/reduced-motion: khối hiện đủ. Chỉ gắn trạng thái ẩn sau khi JS chạy.
 */
export function CircleWipe({ children, id, className, ...rest }: { children: ReactNode; id?: string; className?: string; "aria-labelledby"?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) { el?.setAttribute("data-fx-ready", "static"); return; }
    registerGsap();
    const ctx = gsap.context(() => {
      let tw: gsap.core.Tween | null = null;
      // đã loang hết một lần thì giữ nguyên, không thu lại khi cuộn ngược
      const finish = (st: ScrollTrigger) => {
        if (!tw) return;
        st.kill();
        tw.progress(1).kill();
        gsap.set(el, { clearProps: "clipPath" });
        el.setAttribute("data-fx-ready", "done");
        tw = null;
      };
      tw = gsap.fromTo(el, { clipPath: "circle(9% at 50% 0%)" }, {
        clipPath: "circle(150% at 50% 0%)", ease: "none",
        scrollTrigger: { trigger: el, start: "top 92%", end: "top 22%", scrub: 0.4, onUpdate: (st) => { if (st.progress >= 0.985) finish(st); } },
      });
      const st0 = tw.scrollTrigger;
      if (st0 && st0.progress >= 0.985) finish(st0);
      else el.setAttribute("data-fx-ready", "1");
    });
    return () => { ctx.revert(); ScrollTrigger.refresh(); };
  }, []);
  return <section ref={ref} id={id} className={className} data-fx="CircleWipe" {...rest}>{children}</section>;
}
