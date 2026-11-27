"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Breathing Interface: quầng sáng ở hero phồng lên khi hít vào và xẹp khi thở ra (timeline yoyo, sine.inOut),
 * nhãn đổi theo pha. Cùng nhịp đó "lan" sang thẻ chương trình, chấm mốc giờ và nền xung quanh.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-kl-root]");
    if (!root) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(q("[data-hero]"), { opacity: 0, y: 22, duration: 1.2, stagger: 0.15, ease: "power2.out" });

        // hero orb: 4.8s hít vào, 0.5s giữ, 6s thở ra (yoyo + repeatDelay)
        const orb = q("[data-orb]")[0];
        const label = q("[data-orb-label]")[0];
        if (orb) {
          const layers = Array.from(orb.querySelectorAll<HTMLElement>("i"));
          let inhale = true;
          gsap.set(layers, { scale: 0.7 });
          const tl = gsap.timeline({
            repeat: -1, yoyo: true, repeatDelay: 0.5,
            onRepeat: () => {
              inhale = !inhale;
              if (label) label.textContent = inhale ? "Hít vào" : "Thở ra";
            },
          });
          tl.to(layers, { scale: 1.12, duration: 4.8, ease: "sine.inOut", stagger: { each: 0.35, from: "end" } }, 0);
          tl.to(label, { scale: 1.08, duration: 4.8, ease: "sine.inOut" }, 0);
        }

        // nền
        q("[data-amb]").forEach((el, i) => {
          gsap.to(el, { scale: 1.25, x: i ? -40 : 40, duration: 9 + i * 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
        });

        // thẻ, chấm: thở rất nhẹ, lệch pha
        q("[data-breathe]").forEach((el, i) => {
          gsap.to(el, { scale: 1.025, duration: 4.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.5 });
        });

        q("[data-rv]").forEach((el) => {
          gsap.from(el, { opacity: 0, y: 30, duration: 1.1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });
        q("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const o = { v: 0 };
          gsap.to(o, { v: end, duration: 1.6, ease: "sine.out", onUpdate: () => { el.textContent = String(Math.round(o.v)); }, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return null;
}
