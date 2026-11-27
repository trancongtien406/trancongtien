"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BLOB_A, BLOB_B, FULL, PEAR, lerpPts, toPath } from "./shapes";

export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-lm-root]");
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element>(s: string) => gsap.utils.toArray<T>(s, root);

      /* ---- Blob nền thở nhẹ (nội suy hai blob) ---- */
      q<SVGPathElement>("[data-blob]").forEach((p, i) => {
        const o = { t: 0 };
        const [cx, cy] = (p.dataset.blob ?? "300,300").split(",").map(Number);
        gsap.to(o, { t: 1, duration: 4 + i * 0.7, yoyo: true, repeat: -1, ease: "sine.inOut", onUpdate: () => p.setAttribute("d", toPath(lerpPts(BLOB_A, BLOB_B, o.t), cx, cy)) });
      });
      q<HTMLElement>("[data-float]").forEach((el) => {
        gsap.to(el, { y: -90, rotate: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } });
      });

      /* ---- Hero ---- */
      gsap.fromTo(q("[data-hero-word]"), { yPercent: 115, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.2, ease: "power4.out", stagger: 0.12 });

      /* ---- Blob thành quả lê, rồi tràn màn hình ---- */
      const sec = root.querySelector<HTMLElement>("[data-pear]");
      const clip = root.querySelector<SVGPathElement>("[data-clip]");
      const scene = root.querySelector<SVGGElement>("[data-scene]");
      if (sec && clip) {
        sec.setAttribute("data-live", "1");
        const chapters = q<HTMLElement>("[data-chapter]");
        const wide = () => window.innerWidth / window.innerHeight > 1.05;
        const draw = (t: number) => {
          // t: 0..1 blob -> lê; 1..2 lê -> tràn màn hình
          const a = t <= 1 ? lerpPts(BLOB_A, PEAR, gsap.parseEase("power2.inOut")(t)) : lerpPts(PEAR, FULL, gsap.parseEase("power1.in")(t - 1));
          const cx = wide() ? 690 : 500;
          const cy = 500;
          const k = t <= 1 ? 0.82 + 0.18 * t : 1;
          clip.setAttribute("d", toPath(a.map(([x, y]) => [x * k, y * k] as [number, number]), cx, cy));
        };
        const o = { t: 0 };
        draw(0);
        gsap.set(chapters, { autoAlpha: 0, y: 30 });
        gsap.set(chapters[0], { autoAlpha: 1, y: 0 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${window.innerHeight * 3.4}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, onRefresh: () => draw(o.t) },
        });
        tl.to(o, { t: 2, duration: 3, onUpdate: () => draw(o.t) }, 0);
        if (scene) tl.fromTo(scene, { scale: 1.25, transformOrigin: "50% 50%" }, { scale: 1, duration: 3 }, 0);
        tl.to(chapters[0], { autoAlpha: 0, y: -30, duration: 0.3 }, 0.85);
        tl.to(chapters[1], { autoAlpha: 1, y: 0, duration: 0.3 }, 1.0);
        tl.to(chapters[1], { autoAlpha: 0, y: -30, duration: 0.3 }, 1.75);
        tl.to(chapters[2], { autoAlpha: 1, y: 0, duration: 0.3 }, 2.7);
        tl.to({}, { duration: 0.4 }, 3);
        const onResize = () => draw(o.t);
        window.addEventListener("resize", onResize);
        return () => { window.removeEventListener("resize", onResize); sec.removeAttribute("data-live"); };
      }
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-rise]", root).forEach((el) => {
        gsap.fromTo(el, { y: 44, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]", root).forEach((wrap) => {
        gsap.fromTo(Array.from(wrap.children), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: wrap, start: "top 85%", once: true } });
      });
    });

    return () => mm.revert();
  }, []);
  return null;
}
