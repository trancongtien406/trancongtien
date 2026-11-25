"use client";

import { gsap, ScrollTrigger, registerGsap, useIsoLayoutEffect, prefersReducedMotion, on } from "@/features/showroom/effects";

const tcFmt = (sec: number) => {
  const m = Math.floor(sec / 60), r = Math.floor(sec % 60), f = Math.floor((sec % 1) * 25);
  return [m, r, f].map((n) => String(n).padStart(2, "0")).join(":");
};

/**
 * Chuyển động chung:
 * 1) Hero choreography: dòng chữ giải mã + tách từ (thư viện), ảnh mở vòng tròn, chữ phụ/nút/bảng chạy thử lên lần lượt.
 * 2) Moment cuộn: nội dung hero trôi lên mờ dần, ảnh hero lệch tốc độ; khối `data-pt="rv"` nổi lên theo lô.
 * 3) Timecode trên header chạy theo vị trí cuộn (đồng bộ với playhead), biến --sp cho dải tiến độ.
 * Reduced-motion: không chạy gì, nội dung hiện đủ. Trạng thái ẩn ban đầu chỉ đặt sau khi JS chạy.
 */
export function Motion() {
  useIsoLayoutEffect(() => {
    registerGsap();
    const root = document.querySelector<HTMLElement>('[data-site="phong-thu"]');
    if (!root) return;
    root.setAttribute("data-pt-js", "1");
    const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    const tcEl = root.querySelector<HTMLElement>('[data-pt="tc"]');
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const p = Math.min(1, Math.max(0, window.scrollY / max));
        root.style.setProperty("--sp", p.toFixed(4));
        if (tcEl) tcEl.textContent = tcFmt(p * 214);
      });
    };
    onScroll();
    const offScroll = on(window, "scroll", onScroll, { passive: true });
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(q('[data-pt="rv-hero"]'), { y: 22, opacity: 0, duration: 0.8, stagger: 0.16 }, 0.5)
        .from(q('[data-pt="wave"]'), { opacity: 0, duration: 1.0 }, 0.3)
        .from(q('[data-pt="header"]'), { yPercent: -100, duration: 0.7 }, 0.1);
      let yielded = false;
      const early = () => { if (!yielded && window.scrollY > 60 && tl.time() < 2.4) { yielded = true; tl.timeScale(5); } };
      const off = on(window, "scroll", early, { passive: true });

      const hero = root.querySelector<HTMLElement>('[data-pt="hero"]');
      const copy = root.querySelector<HTMLElement>('[data-pt="copy"]');
      const shot = root.querySelector<HTMLElement>('[data-pt="shot"]');
      if (hero && copy) gsap.to(copy, { yPercent: -9, opacity: 0.2, ease: "none", scrollTrigger: { trigger: hero, start: "30% top", end: "bottom top", scrub: 0.5 } });
      if (hero && shot) gsap.to(shot, { yPercent: 7, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 } });

      const rv = q('[data-pt="rv"]');
      gsap.set(rv, { opacity: 0, y: 30 });
      ScrollTrigger.batch(rv, {
        start: "top 90%", once: true,
        onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.1, overwrite: true }),
      });
      return () => { off(); };
    });
    if (prefersReducedMotion()) root.setAttribute("data-pt-static", "1");
    return () => { offScroll(); if (raf) cancelAnimationFrame(raf); mm.revert(); root.removeAttribute("data-pt-js"); };
  }, []);
  return null;
}
