"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Chuyển động: chỉ khi người dùng không bật reduced-motion. Mặc định mọi thứ hiện đủ (SSR);
 * chỉ khi JS chạy mới đặt trạng thái ẩn ban đầu ngay trước khi vẽ (layout effect) rồi phát lại.
 * Chỉ animate transform/opacity/stroke-dashoffset. Không đụng scroll (không scroll-jacking), không parallax chữ.
 */
export function Motion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-site='hien-man']");
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));

    const ctx = gsap.context(() => {
      // ---------- Hero: ảnh lùi xa dần, hai dòng chữ trượt lên khỏi mặt nạ, thanh đặt phòng nổi lên cuối.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-hm='hero-media']", { scale: 1.14 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
        .fromTo("[data-hm='hero-line']", { yPercent: 112 }, { yPercent: 0, duration: 1.1, stagger: 0.14 }, 0.35)
        .fromTo("[data-hm='hero-fade']", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.9)
        .fromTo("#dat-nhanh", { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.9, onComplete: () => { gsap.set("#dat-nhanh", { clearProps: "opacity,visibility,transform" }); } }, 1.5);

      // ---------- Cuộn 1: các cảnh ban mai / mặt nước / hoàng hôn, ảnh lùi nhẹ khi cảnh vào khung.
      q("[data-hm='scene']").forEach((scene) => {
        const img = scene.querySelector("[data-hm-photo='scene-img']");
        const inner = scene.querySelector("[class*='sceneInner']");
        if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: scene, start: "top bottom", end: "top top", scrub: true } });
        if (inner) gsap.fromTo(inner, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: "power2.out", scrollTrigger: { trigger: scene, start: "top 55%", end: "top 10%", scrub: true } });
      });

      // ---------- Cuộn 2: tấm "Về Hiên" trượt lên từ dưới ảnh toàn cảnh; đường chân trời tự vẽ.
      const plate = q("[data-hm='story-plate']")[0];
      if (plate) gsap.fromTo(plate, { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: plate, start: "top 85%", once: true } });
      const sm = q("[data-hm='story-media']")[0];
      if (sm) gsap.fromTo(sm.querySelector("img"), { scale: 1.08 }, { scale: 1, ease: "none", scrollTrigger: { trigger: sm, start: "top bottom", end: "bottom top", scrub: true } });

      q("path[data-hm='draw'], circle[data-hm='draw']").forEach((p) => {
        const el = p as unknown as SVGGeometryElement;
        const len = el.getTotalLength?.() ?? 400;
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(el, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", onComplete: () => { gsap.set(el, { clearProps: "strokeDasharray,strokeDashoffset" }); }, scrollTrigger: { trigger: el.closest("section"), start: "top 70%", once: true } });
      });

      // ---------- Các dòng nội dung hiện dần khi vào khung.
      ScrollTrigger.batch(q("[data-hm='rise']"), {
        start: "top 90%",
        once: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power2.out", overwrite: true }),
      });
      gsap.set(q("[data-hm='rise']"), { autoAlpha: 0, y: 26 });

      q("[data-hm='amen-media'] img, [data-hm='exp-media'] img").forEach((img) =>
        gsap.fromTo(img, { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } }),
      );
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); ctx.revert(); };
  }, []);

  return null;
}
