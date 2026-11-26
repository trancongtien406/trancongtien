"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, hasFinePointer, on, registerGsap, useIsoLayoutEffect } from "@/features/showroom/effects";

/**
 * Chuyển động chung của trang NÉA.
 * 1) Hero choreography ~2.6 giây: vòng sáng nở, vòm ảnh mở từ dưới lên, chữ/mô tả/nút/sự thật lộ ra theo tấm kính lướt (clip-path), các thẻ kính trượt vào từ phải, gợi ý cuộn. Cuộn sớm thì timeline tua nhanh.
 * 2) Depth parallax nhiều lớp: con trỏ (chỉ chuột) dịch từng lớp `data-depth` theo hệ số; cuộn dịch ngược theo hệ số.
 * 3) Ảnh `data-dx="pimg"` trôi nhẹ theo cuộn; đường kẻ `data-dx="rule"` vẽ ra.
 * Reduced-motion: không chạy gì, nội dung hiện đủ. Trạng thái ẩn đầu chỉ đặt sau khi JS chạy.
 */
export function Motion() {
  useIsoLayoutEffect(() => {
    registerGsap();
    const root = document.querySelector<HTMLElement>('[data-site="da-xanh"]');
    if (!root) return;
    const mm = gsap.matchMedia();
    const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // ngôn ngữ chuyển động: LƯỚT KÍNH. Mỗi khối được một tấm kính mờ lướt từ trái sang phải để lộ nội dung (clip-path), không blur, không fade-up.
      const OPEN = "inset(-14px -40px -14px -40px)", SHUT = "inset(-14px 100% -14px -40px)";
      const wipe = (sel: string, at: number, dur = 1.1, stagger = 0) => tl.fromTo(q(sel), { clipPath: SHUT, x: -22 }, { clipPath: OPEN, x: 0, duration: dur, stagger, ease: "power3.inOut", clearProps: "clipPath,transform" }, at);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(q('[data-dx="halo"]'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.6, ease: "expo.out" }, 0)
        .fromTo(q('[data-dx="arch"]'), { clipPath: "inset(100% 0% 0% 0% round 999px 999px 28px 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 999px 999px 28px 28px)", duration: 1.4, ease: "power4.inOut" }, 0.25)
        .fromTo(q('[data-dx="arch-img"]'), { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "power3.out" }, 0.25)
        .from(q('[data-dx="logo"]'), { opacity: 0, duration: 0.8 }, 0.2);
      wipe('[data-dx="eyebrow"]', 0.45, 0.9);
      wipe('[data-dx="line"]', 0.6, 1.2, 0.28);
      wipe('[data-dx="lead"]', 1.3, 1.1);
      wipe('[data-dx="cta"]', 1.55, 0.9, 0.14);
      wipe('[data-dx="facts"] > div', 1.8, 0.9, 0.12);
      tl.from(q('[data-dx="card"]'), { opacity: 0, scale: 0.82, x: 60, duration: 1.1, stagger: 0.2, ease: "back.out(1.2)" }, 1.0)
        .from(q('[data-dx="hint"]'), { opacity: 0, duration: 0.8 }, 2.4);
      let yielded = false;
      const early = () => { if (!yielded && window.scrollY > 60 && tl.time() < 2.2) { yielded = true; tl.timeScale(5); } };
      const off = on(window, "scroll", early, { passive: true });

      // depth: cuộn (mọi cỡ, nhẹ hơn trên di động)
      const hero = root.querySelector<HTMLElement>('[data-dx="hero"]');
      const wide = window.matchMedia("(min-width: 768px)").matches;
      const layers = q("[data-depth]");
      if (hero) {
        layers.forEach((el) => {
          const d = parseFloat(el.dataset.depth || "0");
          gsap.to(el, { yPercent: -d * (wide ? 12 : 5), ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 } });
        });
        gsap.to(q('[data-dx="copy"]'), { yPercent: wide ? -6 : -3, opacity: 0.35, ease: "none", scrollTrigger: { trigger: hero, start: "55% top", end: "bottom top", scrub: 0.5 } });
      }

      // depth: con trỏ (chỉ chuột)
      let offPtr = () => {};
      if (hero && hasFinePointer() && wide) {
        const setters = layers.map((el) => {
          const d = parseFloat(el.dataset.depth || "0");
          return { d, x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }), y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }) };
        });
        const move = (e: PointerEvent) => {
          const r = hero.getBoundingClientRect();
          if (r.bottom < 0 || r.top > innerHeight) return;
          const nx = (e.clientX / innerWidth - 0.5) * 2, ny = (e.clientY / innerHeight - 0.5) * 2;
          setters.forEach((s) => { s.x(-nx * s.d * 16); s.y(-ny * s.d * 12); });
        };
        offPtr = on(window, "pointermove", move, { passive: true });
      }

      // ảnh trôi chậm trong khung
      q('[data-dx="pimg"]').forEach((el) => {
        gsap.fromTo(el, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });
      // đường kẻ vẽ ra
      q('[data-dx="rule"]').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.out", transformOrigin: "0 50%", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
      return () => { off(); offPtr(); };
    });
    return () => { mm.revert(); };
  }, []);

  useEffect(() => {
    const r = () => ScrollTrigger.refresh();
    const t = window.setTimeout(r, 900);
    window.addEventListener("load", r);
    document.fonts?.ready.then(r).catch(() => {});
    return () => { clearTimeout(t); window.removeEventListener("load", r); };
  }, []);
  return null;
}
