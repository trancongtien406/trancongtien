"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, hasFinePointer, on, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/features/showroom/effects";

/**
 * Chuyển động chung của trang.
 * 1) Hero choreography ~4 giây (ảnh mặt nước hiện, ánh sáng, nhãn, tiêu đề do SplitWords, mô tả, nút, số 00 m, bong bóng, gợi ý cuộn).
 *    Người dùng cuộn sớm thì timeline nhường: các mốc còn lại chạy nhanh về trạng thái cuối.
 * 2) Moment cuộn: ảnh hero trôi chậm + phóng nhẹ; khối `data-lb="reveal"` nổi lên từ vùng nước mờ (làm nét dần) theo lô.
 * 3) Bong bóng nổ khi bấm vào vùng trống (chỉ chuột).
 * Reduced-motion: không chạy gì, nội dung hiện đủ. Trạng thái ẩn ban đầu chỉ được đặt sau khi JS chạy.
 */
export function Motion() {
  useIsoLayoutEffect(() => {
    registerGsap();
    const root = document.querySelector<HTMLElement>('[data-site="lan-bien"]');
    if (!root) return;
    root.setAttribute("data-lb-js", "1");
    const mm = gsap.matchMedia();
    const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const media = root.querySelector<HTMLElement>('[data-lb="hero-media"]');
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (media) tl.fromTo(media, { opacity: 0, scale: 1.14 }, { opacity: 1, scale: 1, duration: 2.4, ease: "power2.out" }, 0);
      tl.from(q('[data-lb="logo"]'), { clipPath: "inset(0 100% 0 0)", duration: 0.8 }, 0.6)
        .from(q('[data-lb="eyebrow"]'), { y: 16, opacity: 0, duration: 0.7 }, 0.9)
        .from(q('[data-lb="hero-lead"]'), { y: 18, opacity: 0, duration: 0.8 }, 1.8)
        .from(q('[data-lb="hero-cta"]'), { y: 18, opacity: 0, duration: 0.7, stagger: 0.14 }, 2.2)
        .from(q('[data-lb="hero-depth"]'), { opacity: 0, y: 24, duration: 0.9 }, 2.8)
        .from(q('[data-lb="hero-hint"]'), { opacity: 0, duration: 0.8 }, 3.8);
      const bub = root.querySelector<HTMLElement>("[class*='bubbles']");
      if (bub) tl.from(bub, { opacity: 0, duration: 1.4 }, 3.2);
      // nhường quyền cho cuộn: người dùng cuộn sớm thì tua nhanh hết mốc còn lại
      let yielded = false;
      const early = () => { if (!yielded && window.scrollY > 60 && tl.time() < 3.6) { yielded = true; tl.timeScale(5); } };
      const off = on(window, "scroll", early, { passive: true });

      // moment cuộn 1: ảnh hero trôi chậm và phóng nhẹ
      const hero = root.querySelector<HTMLElement>('[data-lb="hero"]');
      const heroImg = root.querySelector<HTMLElement>('[data-lb="hero-parallax"]');
      if (hero && heroImg) {
        gsap.to(heroImg, { yPercent: 9, scale: 1.1, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
        gsap.to(q('[data-lb="hero-copy"]'), { yPercent: -10, opacity: 0.15, ease: "none", scrollTrigger: { trigger: hero, start: "35% top", end: "bottom top", scrub: 0.6 } });
      }
      // moment cuộn 2: khối nội dung nổi lên theo lô
      ScrollTrigger.batch(q('[data-lb="reveal"]'), {
        start: "top 90%", once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 26, opacity: 0, filter: "blur(9px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "sine.out", stagger: 0.12, overwrite: true, clearProps: "filter" }),
      });
      gsap.set(q('[data-lb="reveal"]'), { opacity: 0 });
      // đường kẻ vẽ ra
      q('[data-lb="rule"]').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.out", transformOrigin: "0 50%", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
      return () => { off(); };
    });

    // bong bóng nổ khi bấm vào vùng trống
    let offClick = () => {};
    if (hasFinePointer() && !prefersReducedMotion()) {
      const layer = document.createElement("div");
      layer.setAttribute("aria-hidden", "true");
      layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden";
      root.appendChild(layer);
      offClick = on(document, "pointerdown", (e) => {
        if (e.pointerType === "touch" || e.button !== 0) return;
        const t = e.target as Element | null;
        if (t?.closest("a,button,input,textarea,select,label,summary,[role='button']")) return;
        for (let i = 0; i < 7; i++) {
          const b = document.createElement("span");
          const s = 5 + Math.random() * 11;
          b.style.cssText = `position:absolute;left:${e.clientX}px;top:${e.clientY}px;width:${s}px;height:${s}px;margin:${-s / 2}px 0 0 ${-s / 2}px;border-radius:50%;border:1.5px solid rgba(234,251,246,.85);background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.45),transparent 60%)`;
          layer.appendChild(b);
          gsap.to(b, {
            x: (Math.random() - 0.5) * 70, y: -(70 + Math.random() * 130), scale: 0.6 + Math.random() * 0.8, opacity: 0,
            duration: 1 + Math.random() * 0.9, ease: "power1.out", onComplete: () => b.remove(),
          });
        }
      });
      return () => { mm.revert(); offClick(); layer.remove(); root.removeAttribute("data-lb-js"); };
    }
    return () => { mm.revert(); root.removeAttribute("data-lb-js"); };
  }, []);

  // làm mới ScrollTrigger sau khi ảnh/phông tải xong để mốc ghim không lệch
  useEffect(() => {
    const r = () => ScrollTrigger.refresh();
    const t = window.setTimeout(r, 900);
    window.addEventListener("load", r);
    document.fonts?.ready.then(r).catch(() => {});
    return () => { clearTimeout(t); window.removeEventListener("load", r); };
  }, []);
  return null;
}
