"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, hasFinePointer, on, registerGsap, useIsoLayoutEffect } from "@/features/showroom/effects";

/**
 * Chuyển động chung của trang NÉA.
 * 1) Hero choreography ~2.6 giây: vòng sáng nở, vòm ảnh mở từ dưới lên, chữ, mô tả, nút, các thẻ kính bay vào từ chiều sâu
 *    (blur 12px về nét), gợi ý cuộn. Cuộn sớm thì timeline tua nhanh.
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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(q('[data-dx="halo"]'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.6, ease: "expo.out" }, 0)
        .fromTo(q('[data-dx="arch"]'), { clipPath: "inset(100% 0% 0% 0% round 999px 999px 28px 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 999px 999px 28px 28px)", duration: 1.4, ease: "power4.inOut" }, 0.25)
        .fromTo(q('[data-dx="arch-img"]'), { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "power3.out" }, 0.25)
        .from(q('[data-dx="logo"]'), { opacity: 0, y: -10, filter: "blur(8px)", duration: 0.8 }, 0.2)
        .from(q('[data-dx="eyebrow"]'), { opacity: 0, y: 14, filter: "blur(8px)", duration: 0.8 }, 0.45)
        .from(q('[data-dx="lead"]'), { opacity: 0, y: 18, filter: "blur(10px)", duration: 0.9 }, 1.25)
        .from(q('[data-dx="cta"]'), { opacity: 0, y: 16, filter: "blur(8px)", duration: 0.8, stagger: 0.12 }, 1.5)
        .from(q('[data-dx="facts"] li'), { opacity: 0, y: 12, filter: "blur(6px)", duration: 0.7, stagger: 0.1 }, 1.85)
        .from(q('[data-dx="card"]'), { opacity: 0, scale: 0.78, y: 46, filter: "blur(12px)", duration: 1.1, stagger: 0.2, ease: "back.out(1.2)" }, 1.0)
        .from(q('[data-dx="hint"]'), { opacity: 0, duration: 0.8 }, 2.4);
      let yielded = false;
      const early = () => { if (!yielded && window.scrollY > 60 && tl.time() < 2.2) { yielded = true; tl.timeScale(5); } };
      const off = on(window, "scroll", early, { passive: true });
      const done = () => { q('[data-dx]').forEach((el) => { if (el.style.filter === "blur(0px)") el.style.filter = ""; }); };
      tl.eventCallback("onComplete", done);

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
