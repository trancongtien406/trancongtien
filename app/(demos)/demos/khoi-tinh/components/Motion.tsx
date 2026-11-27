"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MAXD = 2150;

export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-kt-root]");
    if (!root) return;
    const q = <T extends Element>(s: string, scope: ParentNode = root) => gsap.utils.toArray<T>(s, scope);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* ---- Cảnh 3D: dolly camera xuyên các lớp ---- */
      const sec = root.querySelector<HTMLElement>("[data-depth]");
      const world = root.querySelector<HTMLElement>("[data-world]");
      if (sec && world) {
        sec.setAttribute("data-live", "1");
        const planes = q<HTMLElement>("[data-plane]", world);
        const caps = q<HTMLElement>("[data-cap]", sec);
        const bar = sec.querySelector<HTMLElement>("[data-prog]");
        const st = { d: 0 };
        const apply = () => {
          gsap.set(world, { z: st.d });
          planes.forEach((p) => {
            const z = Number(p.dataset.z) + st.d;
            const pass = gsap.utils.clamp(0, 1, 1 - (z - 450) / 450);
            const o = p.hasAttribute("data-word") ? Math.min(pass, gsap.utils.clamp(0, 1, (z + 1500) / 400)) : pass;
            p.style.opacity = String(o);
            p.style.visibility = o <= 0.01 ? "hidden" : "visible";
          });
          const pr = st.d / MAXD;
          const act = pr < 0.34 ? 0 : pr < 0.68 ? 1 : 2;
          caps.forEach((c, i) => c.toggleAttribute("data-on", i === act));
          if (bar) bar.style.transform = `scaleX(${pr.toFixed(3)})`;
        };
        apply();
        gsap.to(st, { d: MAXD, ease: "none", onUpdate: apply, scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${window.innerHeight * 4.5}`, pin: true, scrub: 1, invalidateOnRefresh: true } });

        const rig = sec.querySelector<HTMLElement>("[data-rig]");
        if (rig && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
          const ry = gsap.quickTo(rig, "rotationY", { duration: 0.9, ease: "power3" });
          const rx = gsap.quickTo(rig, "rotationX", { duration: 0.9, ease: "power3" });
          const mv = (e: PointerEvent) => { ry((e.clientX / window.innerWidth - 0.5) * 7); rx(-(e.clientY / window.innerHeight - 0.5) * 4); };
          window.addEventListener("pointermove", mv);
          return () => { window.removeEventListener("pointermove", mv); sec.removeAttribute("data-live"); };
        }
        return () => sec.removeAttribute("data-live");
      }
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* ---- Hero: ba lớp nghiêng theo con trỏ + chữ hiện ---- */
      gsap.fromTo(q("[data-hero-in]"), { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.4, ease: "power3.out", stagger: 0.14 });
      const hr = root.querySelector<HTMLElement>("[data-hero-rig]");
      if (hr && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
        const ry = gsap.quickTo(hr, "rotationY", { duration: 1, ease: "power3" });
        const rx = gsap.quickTo(hr, "rotationX", { duration: 1, ease: "power3" });
        const mv = (e: PointerEvent) => { ry((e.clientX / window.innerWidth - 0.5) * 12); rx(-(e.clientY / window.innerHeight - 0.5) * 8); };
        window.addEventListener("pointermove", mv);
        gsap.to("[data-hero-rig]", { z: 160, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });
        return () => window.removeEventListener("pointermove", mv);
      }
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      q<HTMLElement>("[data-rise]").forEach((el) => gsap.fromTo(el, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
      q<HTMLElement>("[data-rows]").forEach((w) => gsap.fromTo(Array.from(w.children), { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: w, start: "top 86%", once: true } }));
      q<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count); const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", once: true }, onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("vi-VN"); } });
      });
      q<HTMLElement>("[data-plate]").forEach((p) => {
        const layers = q<HTMLElement>("[data-layer]", p);
        gsap.fromTo(layers, { yPercent: (i) => 12 + i * 8 }, { yPercent: (i) => -6 - i * 6, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });

    return () => mm.revert();
  }, []);
  return null;
}
