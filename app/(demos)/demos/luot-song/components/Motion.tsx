"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, registerGsap, useIsoLayoutEffect } from "@/features/showroom/effects";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * Chuyển động chung.
 * 1) Biến CSS theo cuộn trên gốc trang: --rs-sy (px), --rs-hp (tiến độ hero 0..1), --rs-amp (biên độ sóng, tăng khi cuộn nhanh và khi rời hero).
 *    Sóng, mặt trời, tem quay đọc các biến này bằng CSS (chỉ transform), không có JS per-element mỗi khung.
 * 2) Hero choreography ~3.2s: mặt trời nhô lên, mặt vòm ảnh mở ra, từng từ tiêu đề được sóng đẩy vào bờ (trượt ngang + nghiêng), nhãn, mô tả, nút, tem.
 * 3) Reveal theo lô cho khối `data-rs="reveal"`.
 * Reduced-motion: không chạy gì, mọi nội dung hiện đủ; biến CSS đặt ở giá trị tĩnh.
 */
export function Motion() {
  useIsoLayoutEffect(() => {
    registerGsap();
    const root = document.querySelector<HTMLElement>('[data-site="luot-song"]');
    if (!root) return;
    root.setAttribute("data-rs-js", "1");
    root.style.setProperty("--rs-amp", "1");
    const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    if (prefersReducedMotion()) {
      root.setAttribute("data-rs-static", "1");
      return () => { root.removeAttribute("data-rs-js"); root.removeAttribute("data-rs-static"); };
    }
    const hero = root.querySelector<HTMLElement>('[data-rs="hero"]');

    // --- biến cuộn ---
    let lastY = window.scrollY, lastT = performance.now(), vel = 0, amp = 1, raf = 0, idle = 0;
    const frame = (t: number) => {
      raf = 0;
      const y = window.scrollY;
      const dt = Math.max(1, t - lastT) / 1000;
      const raw = (y - lastY) / dt;
      lastY = y; lastT = t;
      vel += (raw - vel) * 0.18;
      const hh = hero ? hero.offsetHeight : 900;
      const hp = clamp(y / (hh * 0.9), 0, 1);
      const target = 1 + hp * 0.55 + clamp(Math.abs(vel) / 1400, 0, 1) * 0.9;
      amp += (target - amp) * 0.12;
      root.style.setProperty("--rs-sy", y.toFixed(1));
      root.style.setProperty("--rs-hp", hp.toFixed(4));
      root.style.setProperty("--rs-amp", amp.toFixed(3));
      if (Math.abs(vel) > 4 || Math.abs(target - amp) > 0.004) { idle = 0; raf = requestAnimationFrame(frame); }
      else if (idle++ < 2) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
    kick();

    // --- hero choreography + reveal (chỉ khi no-preference) ---
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const sun = q('[data-rs="sun-rise"]');
      if (sun.length) tl.fromTo(sun, { yPercent: 38, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.6, ease: "power2.out" }, 0.1);
      const arch = q('[data-rs="arch"]');
      if (arch.length) tl.fromTo(arch, { clipPath: "inset(40% 0% 0% 0% round 999px 999px 40px 40px)", opacity: 0 }, { clipPath: "inset(0% 0% 0% 0% round 999px 999px 40px 40px)", opacity: 1, duration: 1.3, ease: "power3.inOut", clearProps: "clipPath" }, 0.35);
      const words = q('[data-rs="hero-word"]');
      if (words.length) tl.fromTo(words, { xPercent: -60, skewX: -18, opacity: 0 }, { xPercent: 0, skewX: 0, opacity: 1, duration: 1.1, stagger: 0.13, ease: "power4.out", clearProps: "transform" }, 0.7);
      tl.from(q('[data-rs="eyebrow"]'), { y: 16, opacity: 0, duration: 0.7 }, 0.5)
        .from(q('[data-rs="hero-lead"]'), { y: 18, opacity: 0, duration: 0.8 }, 1.6)
        .from(q('[data-rs="hero-cta"]'), { y: 18, opacity: 0, duration: 0.7, stagger: 0.12 }, 1.95)
        .from(q('[data-rs="hero-sticker"]'), { scale: 0.4, rotate: -40, opacity: 0, duration: 1.0, ease: "back.out(1.4)" }, 2.1)
        .from(q('[data-rs="hero-hint"]'), { opacity: 0, duration: 0.8 }, 2.8);
      let yielded = false;
      const early = () => { if (!yielded && window.scrollY > 60 && tl.time() < 2.6) { yielded = true; tl.timeScale(5); } };
      window.addEventListener("scroll", early, { passive: true });

      ScrollTrigger.batch(q('[data-rs="reveal"]'), {
        start: "top 90%", once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.09, overwrite: true }),
      });
      gsap.set(q('[data-rs="reveal"]'), { opacity: 0 });
      q('[data-rs="rule"]').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.out", transformOrigin: "0 50%", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
      return () => window.removeEventListener("scroll", early);
    });

    return () => {
      mm.revert();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
      root.removeAttribute("data-rs-js");
    };
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
