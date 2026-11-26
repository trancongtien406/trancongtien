"use client";

import { gsap, hasFinePointer, on, registerGsap, ScrollTrigger, useIsoLayoutEffect } from "@/features/showroom/effects";

/**
 * Chuyển động chung của trang.
 * 1) Hero choreography ~2.4 giây: ảnh nền hiện, đường lưới kẻ, nhãn stencil mở, chữ SẬT đóng dấu rồi quét axit, dòng khẩu hiệu, mô tả, nút, thanh thông số trượt lên.
 *    Người dùng cuộn sớm thì timeline nhường (tua nhanh mốc còn lại).
 * 2) Moment cuộn: ảnh hero trôi chậm, chữ SẬT tô axit theo cuộn khi rời hero, nhãn stencil mở theo lô, khối [data-sg=slam] "đóng dấu" rơi xuống theo lô, ảnh [data-sg=wipe] quét mở ngang.
 * 3) Hero: chuột trượt ngang qua chữ SẬT tô axit theo vị trí chuột (chỉ pointer fine).
 * Reduced-motion: không chạy gì, nội dung hiện đủ. Trạng thái ẩn ban đầu chỉ được đặt sau khi JS chạy.
 */
export function Motion() {
  useIsoLayoutEffect(() => {
    registerGsap();
    const root = document.querySelector<HTMLElement>('[data-site="sat-gym"]');
    if (!root) return;
    root.setAttribute("data-sg-js", "1");
    const mm = gsap.matchMedia();
    const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    const one = (sel: string) => root.querySelector<HTMLElement>(sel);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const word = one('[data-sg="hero-word"]');
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const media = one('[data-sg="hero-media"]');
      if (media) tl.fromTo(media, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 0);
      tl.from(q('[data-sg="hero-lines"] i'), { scaleY: 0, transformOrigin: "50% 0%", duration: 0.9, stagger: 0.08, ease: "power3.inOut" }, 0.1)
        .from(q('[data-sg="logo"]'), { clipPath: "inset(0 100% 0 0)", duration: 0.7 }, 0.2)
        .from(q('[data-sg="hero-eyebrow"]'), { clipPath: "inset(0 100% 0 0)", duration: 0.7, ease: "power3.inOut" }, 0.35);
      if (word) {
        tl.fromTo(word, { clipPath: "inset(100% 0 0 0)", yPercent: 14 }, { clipPath: "inset(0% 0 0 0)", yPercent: 0, duration: 0.9, ease: "power4.out", clearProps: "clipPath,transform" }, 0.45)
          .fromTo(word, { "--sg-fill": "0%" }, { "--sg-fill": "100%", duration: 0.6, ease: "power2.inOut" }, 1.05)
          .to(word, { "--sg-fill": "0%", duration: 0.8, ease: "power2.inOut" }, 1.7)
          .fromTo(word, { x: 0 }, { keyframes: [{ x: -4 }, { x: 4 }, { x: -2 }, { x: 0 }], duration: 0.22, ease: "power1.inOut" }, 1.0);
      }
      tl.from(q('[data-sg="hero-copy"]'), { y: 26, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.9)
        .from(q('[data-sg="hero-cta"] a'), { scale: 0.94, opacity: 0, duration: 0.5, stagger: 0.1 }, 1.25)
        .from(q('[data-sg="hero-specs"]'), { yPercent: 100, duration: 0.7, ease: "power3.inOut" }, 1.4);
      let yielded = false;
      const early = () => { if (!yielded && window.scrollY > 60 && tl.time() < 2.2) { yielded = true; tl.timeScale(5); } };
      const offScroll = on(window, "scroll", early, { passive: true });

      // moment cuộn 1: ảnh hero trôi chậm; chữ SẬT tô axit theo cuộn khi rời hero
      const hero = one('[data-sg="hero"]');
      const par = one('[data-sg="hero-par"]');
      if (hero && par) {
        gsap.to(par, { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
        gsap.fromTo(q('[data-sg="hero-side"]'), { yPercent: 0, opacity: 1 }, { yPercent: -14, opacity: 0.2, ease: "none", immediateRender: false, scrollTrigger: { trigger: hero, start: "40% top", end: "bottom top", scrub: 0.6 } });
        if (word) gsap.fromTo(word, { "--sg-scroll": "0%" }, { "--sg-scroll": "100%", ease: "none", scrollTrigger: { trigger: hero, start: "12% top", end: "70% top", scrub: 0.6 } });
      }
      // hero: chuột trượt qua chữ SẬT tô axit theo vị trí
      let offPointer = () => {};
      if (hero && word && hasFinePointer()) {
        const px = { v: 0 };
        const q2 = gsap.quickTo(px, "v", { duration: 0.35, ease: "power3.out", onUpdate: () => word.style.setProperty("--sg-hover", `${px.v.toFixed(1)}%`) });
        const set = (pct: number) => q2(pct);
        const mv = (e: PointerEvent) => {
          const r = word.getBoundingClientRect();
          const inside = e.clientY > r.top - 40 && e.clientY < r.bottom + 40;
          const f = inside ? Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) : 0;
          set(Math.round(f * 100));
        };
        const lv = () => set(0);
        const offs = [on(hero, "pointermove", mv), on(hero, "pointerleave", lv)];
        offPointer = () => offs.forEach((f) => f());
      }

      // moment cuộn 2: nhãn stencil mở từ trái sang phải, khối nổi lên theo lô
      const st = q('[data-sg="stencil"]');
      gsap.set(st, { clipPath: "inset(0 100% 0 0)" });
      ScrollTrigger.batch(st, {
        start: "top 92%", once: true,
        onEnter: (els) => gsap.to(els, { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.inOut", stagger: 0.12, overwrite: true, onComplete: () => { gsap.set(els, { clearProps: "clipPath" }); } }),
      });
      // ngôn ngữ chuyển động chính: "đóng dấu" như đĩa tạ hạ xuống sàn (rơi từ trên, chạm, nảy nhẹ)
      const sl = q('[data-sg="slam"]');
      gsap.set(sl, { clipPath: "inset(0 0 100% 0)", y: -40, opacity: 1 });
      ScrollTrigger.batch(sl, {
        start: "top 92%", once: true,
        onEnter: (els) => gsap.to(els, { keyframes: [{ clipPath: "inset(0 0 0% 0)", y: 6, duration: 0.32, ease: "power3.in" }, { y: 0, duration: 0.22, ease: "bounce.out" }], stagger: 0.09, overwrite: true, onComplete: () => { gsap.set(els, { clearProps: "clipPath,transform" }); } }),
      });
      // ảnh/khối "quét" mở từ trái sang phải như tấm bê tông trượt ra
      q('[data-sg="wipe"]').forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power4.inOut", clearProps: "clipPath", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      return () => { offScroll(); offPointer(); tl.kill(); };
    });
    return () => mm.revert();
  }, []);
  return null;
}
