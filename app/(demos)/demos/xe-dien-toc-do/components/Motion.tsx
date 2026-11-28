"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Toàn bộ chuyển động theo cuộn. Trạng thái ẩn chỉ đặt trong effect; không JS thì nội dung vẫn hiện đủ. */
export function Motion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-vt-root]");
    if (!root) return;
    const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.dataset.vtAnim = "1";

        // hero: ảnh parallax + chữ hiện
        gsap.from("[data-hrv]", { y: 28, autoAlpha: 0, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: "#hero", start: "top 70%", once: true } });
        gsap.fromTo("[data-heroimg]", { yPercent: -5, scale: 1.08 }, { yPercent: 5, scale: 1, ease: "none", scrollTrigger: { trigger: "#hero", start: "top bottom", end: "bottom top", scrub: 0.5 } });

        // 01 đèn bật + đồng hồ 0.00 -> 3.40
        const zero = q<HTMLElement>("[data-zero]");
        if (zero) {
          const z = { v: 0 };
          const num = q<HTMLElement>("[data-zeronum]");
          const car = zero.querySelector<HTMLElement>("[data-zerocar]");
          const body = zero.querySelector<HTMLElement>("[data-zerocar] > div");
          gsap.set(zero.querySelectorAll("[data-glow]"), { opacity: 0, scale: 0.4 });
          const t = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: zero, start: "top top", end: "+=160%", scrub: 0.6, pin: true, anticipatePin: 1 } });
          if (car) t.fromTo(car, { scale: 0.72, yPercent: 10 }, { scale: 1.12, yPercent: -2, duration: 3 }, 0);
          if (body) t.fromTo(body, { filter: "brightness(.12)" }, { filter: "brightness(1.05)", duration: 1.5 }, 0.2);
          t.to(zero.querySelectorAll("[data-glow]"), { opacity: 1, scale: 1.1, duration: 0.9, stagger: 0.1 }, 0.5);
          t.to(zero.querySelectorAll("[data-beam]"), { opacity: 0.95, scaleX: 1.6, scaleY: 1.4, duration: 1.4 }, 1.3);
          t.to(z, { v: 3.4, duration: 3, onUpdate: () => { if (num) num.textContent = z.v.toFixed(2); } }, 0);
          t.fromTo(".h2s", { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
        }

        // 03 cấu tạo
        const build = q<HTMLElement>("[data-build]");
        if (build) {
          const notes = gsap.utils.toArray<HTMLElement>("[data-note]", build);
          const cnt = build.querySelector<HTMLElement>("[data-bcount]");
          const bt = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: build, start: "top top", end: "+=240%", scrub: 0.6, pin: true, anticipatePin: 1 } });
          bt.fromTo("[data-body]", { y: 0 }, { y: -34, duration: 1.4 }, 0.5);
          bt.fromTo("[data-wheel='l']", { y: 0, x: 0, rotation: 0 }, { y: 96, x: -22, duration: 1.4 }, 0.5);
          bt.fromTo("[data-wheel='r']", { y: 0, x: 0 }, { y: 96, x: 22, duration: 1.4 }, 0.5);
          bt.fromTo("[data-batt]", { opacity: 0, y: 0 }, { opacity: 1, y: 40, duration: 1.2 }, 0.8);
          notes.forEach((n, k) => {
            bt.to(n, { opacity: 1, duration: 0.5, onStart: () => { if (cnt) cnt.textContent = String(k + 1); }, onReverseComplete: () => { if (cnt) cnt.textContent = String(Math.max(1, k)); } }, 0.4 + k * 0.7);
          });
          bt.to({}, { duration: 0.6 });
        }

        // 04 con số
        const nums = q<HTMLElement>("[data-numbers]");
        if (nums) {
          const ghost = nums.querySelector<HTMLElement>("[data-ghost]");
          const nt = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: nums, start: "top top", end: "+=130%", scrub: 0.6, pin: true, anticipatePin: 1 } });
          gsap.utils.toArray<HTMLElement>("[data-num]", nums).forEach((n) => {
            const to = Number(n.dataset.num), dec = Number(n.dataset.dec || 0); const o = { v: 0 };
            nt.to(o, { v: to, duration: 1, onUpdate: () => { n.textContent = o.v.toFixed(dec); } }, 0);
          });
          const g = { v: 0 };
          nt.to(g, { v: 523, duration: 1, onUpdate: () => { if (ghost) ghost.textContent = String(Math.round(g.v)); } }, 0);
          nt.fromTo("[data-numcar]", { scale: 0.85, yPercent: 8 }, { scale: 1.05, yPercent: -4, duration: 1 }, 0);
          nt.fromTo(nums.querySelectorAll("[data-glow]"), { opacity: 0.1, scale: 0.8 }, { opacity: 1, scale: 1.1, duration: 0.5 }, 0);
        }

        // khoang lái
        const cabin = q<HTMLElement>("[data-cabin]");
        if (cabin) {
          gsap.set(cabin.querySelectorAll("[data-hot]"), { autoAlpha: 0, y: 20 });
          gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: cabin, start: "top top", end: "+=150%", scrub: 0.6, pin: true, anticipatePin: 1 } })
            .fromTo("[data-cabinbg]", { scale: 1.55, yPercent: 6 }, { scale: 1, yPercent: 0, duration: 1.4 }, 0)
            .fromTo("[data-insideh]", { yPercent: 0, scale: 1.04 }, { yPercent: -70, scale: 1, duration: 1.4 }, 0)
            .to(cabin.querySelectorAll("[data-hot]"), { autoAlpha: 1, y: 0, stagger: 0.3, duration: 0.4 }, 0.7);
        }

        // đường trạm sạc
        const route = q<HTMLElement>("[data-route]");
        if (route) ScrollTrigger.create({ trigger: route, start: "top 85%", once: true, onEnter: () => route.style.setProperty("--fill", "100%") });

        // ảnh kết
        gsap.fromTo("[data-finbg]", { yPercent: -6, scale: 1.1 }, { yPercent: 6, scale: 1, ease: "none", scrollTrigger: { trigger: "#dat-cho", start: "top bottom", end: "bottom top", scrub: 0.5 } });

        gsap.utils.toArray<HTMLElement>("[data-rv]", root).forEach((el) => {
          gsap.from(el, { y: 30, autoAlpha: 0, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        });
      });
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 700);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => { window.clearTimeout(t); window.removeEventListener("load", onLoad); mm.revert(); ctx.revert(); };
  }, []);
  return null;
}
