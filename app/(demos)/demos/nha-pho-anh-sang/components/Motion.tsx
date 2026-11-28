"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "../brand.module.css";

/** Con trỏ vòng tròn + toàn bộ chuyển động theo cuộn sau hero. Trạng thái ẩn chỉ đặt trong effect. */
export function Motion() {
  const ring = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-np-root]");
    if (!root) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // --- con trỏ vòng tròn ---
      mm.add("(pointer: fine)", () => {
        const r = ring.current;
        if (!r) return;
        r.dataset.mode = "full";
        const x = gsap.quickTo(r, "x", { duration: 0.28, ease: "power3.out" });
        const y = gsap.quickTo(r, "y", { duration: 0.28, ease: "power3.out" });
        const mv = (e: PointerEvent) => {
          if (!r.dataset.on) { gsap.set(r, { x: e.clientX, y: e.clientY }); r.dataset.on = "1"; root.dataset.ring = "1"; }
          x(e.clientX); y(e.clientY);
          const t = e.target as HTMLElement | null;
          const link = t?.closest("a,button,summary,input,select,textarea,label");
          const inHero = !!t?.closest("[data-hero]") && !!document.querySelector("[data-hero]")?.getBoundingClientRect().height && (document.querySelector("[data-hero]")!.getBoundingClientRect().top <= 1);
          r.dataset.mode = link ? "link" : inHero ? "full" : "dot";
        };
        window.addEventListener("pointermove", mv, { passive: true });
        return () => { window.removeEventListener("pointermove", mv); delete r.dataset.on; delete root.dataset.ring; };
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.dataset.anim = "1";
        // đoạn dự án: từng từ sáng dần theo cuộn
        const words = gsap.utils.toArray<HTMLElement>("[data-w]", root);
        if (words.length) {
          gsap.set(words, { opacity: 0.2 });
          gsap.to(words, { opacity: 1, ease: "none", stagger: 0.5, scrollTrigger: { trigger: "[data-words]", start: "top 78%", end: "bottom 38%", scrub: 0.5 } });
        }
        // số liệu
        gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach((el) => {
          const to = Number(el.dataset.count);
          const small = el.querySelector("small");
          const o = { v: 0 };
          gsap.to(o, { v: to, duration: 1.8, ease: "power2.out", onUpdate: () => { el.firstChild!.textContent = String(Math.round(o.v)); }, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
          void small;
        });
        // dải chữ chạy theo cuộn
        const marq = root.querySelector<HTMLElement>("[data-marq]");
        if (marq) gsap.fromTo(marq, { x: 0 }, { x: () => -marq.scrollWidth / 2 + window.innerWidth * 0.4, ease: "none", scrollTrigger: { trigger: marq, start: "top bottom", end: "bottom top", scrub: 0.4, invalidateOnRefresh: true } });
        // ba cử chỉ: cuộn ngang khi ghim (chỉ desktop)
        const track = root.querySelector<HTMLElement>("[data-gtrack]");
        if (track && window.matchMedia("(min-width: 901px)").matches) {
          const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: "[data-gest]", start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true } });
          gsap.utils.toArray<HTMLElement>("[data-gimg]", root).forEach((im, i) => {
            gsap.fromTo(im, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: "[data-gest]", start: "top top", end: () => `+=${dist()}`, scrub: 0.6 } });
            void i;
          });
        }
        // dải ảnh hoàn thiện + ảnh vị trí: parallax
        const fi = root.querySelector<HTMLElement>("[data-finimg]");
        if (fi) gsap.fromTo(fi, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: fi.parentElement, start: "top bottom", end: "bottom top", scrub: 0.5 } });
        const li = root.querySelector<HTMLElement>("[data-locimg]");
        if (li) gsap.fromTo(li, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: li.parentElement, start: "top bottom", end: "bottom top", scrub: 0.5 } });
        // nền chuyển dần: than -> xám
        const fin = root.querySelector<HTMLElement>("[data-fin]");
        if (fin) gsap.fromTo(fin, { backgroundColor: "#2e2c29" }, { backgroundColor: "#4b4a49", ease: "none", scrollTrigger: { trigger: fin, start: "top 90%", end: "top 30%", scrub: true } });
        // tiến độ: đường chạy
        const jf = root.querySelector<HTMLElement>("[data-jfill]");
        if (jf) {
          const vertical = window.matchMedia("(max-width: 900px)").matches;
          gsap.fromTo(jf, vertical ? { scaleY: 0, transformOrigin: "50% 0" } : { scaleX: 0, transformOrigin: "0 50%" }, vertical ? { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-jline]", start: "top 70%", end: "bottom 60%", scrub: 0.5 } } : { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-jline]", start: "top 75%", end: "bottom 55%", scrub: 0.5 } });
        }
        // hiện dần
        gsap.utils.toArray<HTMLElement>("[data-rv]", root).forEach((el) => {
          gsap.from(el, { y: 34, autoAlpha: 0, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        });
        gsap.from("#dat-lich h2, #dat-lich .big", { y: 40, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "#dat-lich", start: "top 70%", once: true } });
        gsap.fromTo("[data-wm]", { yPercent: 30 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: "footer", start: "top bottom", end: "bottom bottom", scrub: 0.5 } });
      });
    }, root);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 700);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => { window.clearTimeout(t); window.removeEventListener("load", onLoad); mm.revert(); ctx.revert(); };
  }, []);

  return <div ref={ring} className={s.ring} aria-hidden="true"><span>CUỘN</span></div>;
}
