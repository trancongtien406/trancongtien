"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";

const ZONES = ["Mặt nước", "Rạn san hô", "Vách đá", "Vực sâu"];

/**
 * Hiệu ứng chủ đạo: bộ lọc SVG feTurbulence + feDisplacementMap bẻ cong hình như khúc xạ nước.
 * - Tiêu đề hero: sóng nhẹ, mạnh lên theo vận tốc cuộn.
 * - Cảnh lặn (pin): cuộn xuống 30 m, độ khúc xạ giảm dần theo độ sâu, nền đổi màu, cảnh trượt lên.
 */
export function Fx() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-tv-root]");
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = <T extends Element>(s: string) => root.querySelector<T>(s);
    const ctx = gsap.context(() => {
      const gaugeFill = q<HTMLElement>("[data-gauge-fill]");
      const gaugeNum = q<HTMLElement>("[data-gauge-num]");
      if (reduce) { if (gaugeNum) gaugeNum.textContent = "—"; return; }

      /* reveal */
      const items = gsap.utils.toArray<HTMLElement>("[data-rv]", root);
      gsap.set(items, { y: 40, opacity: 0 });
      ScrollTrigger.batch(items, { start: "top 90%", once: true, onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1 }) });

      /* số đếm */
      gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach((el) => {
        const to = Number(el.dataset.count), o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true }, onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("vi-VN"); } });
      });

      /* đồng hồ độ sâu toàn trang */
      ScrollTrigger.create({ trigger: root, start: "top top", end: "bottom bottom", onUpdate: (s) => { if (gaugeFill) gaugeFill.style.transform = `scaleY(${s.progress})`; if (gaugeNum) gaugeNum.textContent = String(Math.round(s.progress * 32)); } });

      /* khúc xạ */
      const title = q<HTMLElement>("[data-water-title]");
      const fT = document.getElementById("tv-water-title");
      const fS = document.getElementById("tv-water-scene");
      const tTurb = fT?.querySelector("feTurbulence"), tMap = fT?.querySelector("feDisplacementMap");
      const sTurb = fS?.querySelector("feTurbulence"), sMap = fS?.querySelector("feDisplacementMap");
      const bg = q<HTMLElement>("[data-bg]");
      const state = { sceneScale: 0, heroOn: true, sceneOn: false, vel: 0 };
      if (title && tTurb && tMap) { root.classList.add(styles.waterOn); }
      ScrollTrigger.create({ trigger: title, start: "top bottom", end: "bottom top", onToggle: (s) => (state.heroOn = s.isActive) });
      ScrollTrigger.create({ onUpdate: (s) => (state.vel = s.getVelocity()) });
      const tick = (time: number) => {
        const v = Math.min(Math.abs(state.vel) / 120, 26);
        state.vel *= 0.9;
        if (state.heroOn && tTurb && tMap) {
          tTurb.setAttribute("baseFrequency", `${0.007 + Math.sin(time * 0.7) * 0.0025} ${0.016 + Math.cos(time * 0.55) * 0.005}`);
          tMap.setAttribute("scale", String(9 + v));
        }
        if (state.sceneOn && sTurb && sMap) {
          sTurb.setAttribute("baseFrequency", `${0.006 + Math.sin(time * 0.5) * 0.002} ${0.013 + Math.cos(time * 0.4) * 0.004}`);
          sMap.setAttribute("scale", String(state.sceneScale + v * 0.6));
        }
      };
      gsap.ticker.add(tick);

      /* cảnh lặn */
      const stage = q<HTMLElement>("[data-stage]");
      const world = q<HTMLElement>("[data-world]");
      const chs = gsap.utils.toArray<HTMLElement>("[data-ch]", root);
      const depthEl = q<HTMLElement>("[data-depth]"), zoneEl = q<HTMLElement>("[data-zone]"), rays = q<SVGGElement>('[data-l="rays"]');
      const mm = gsap.matchMedia();
      mm.add("(min-width: 0px)", () => {
        if (!stage || !world || !bg) return;
        const sec = stage.parentElement as HTMLElement;
        sec.setAttribute("data-pinned", "");
        bg.style.filter = "url(#tv-water-scene)";
        const dp = { d: 0, s: 34 };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sec, start: "top top", end: "+=380%", pin: stage, scrub: 0.7, anticipatePin: 1,
            onToggle: (s) => (state.sceneOn = s.isActive),
            onRefresh: (s) => (state.sceneOn = s.isActive),
          },
          onUpdate: () => {
            const d = Math.round(dp.d);
            if (depthEl) depthEl.textContent = String(d);
            if (zoneEl) zoneEl.textContent = ZONES[Math.min(3, Math.floor(dp.d / 7.6))];
            state.sceneScale = dp.s;
          },
        });
        tl.fromTo(world, { yPercent: 0 }, { yPercent: -68.5, duration: 1 }, 0);
        tl.to(dp, { d: 30, duration: 1 }, 0);
        tl.to(dp, { s: 6, duration: 0.5 }, 0).to(dp, { s: 14, duration: 0.5 }, 0.5);
        tl.fromTo(bg, { "--c1": "#1fb0b4", "--c2": "#0f8a96" }, { "--c1": "#0a5a69", "--c2": "#043447", duration: 0.5 }, 0);
        tl.to(bg, { "--c1": "#043447", "--c2": "#01080e", duration: 0.5 }, 0.5);
        if (rays) tl.to(rays, { opacity: 0, duration: 0.45 }, 0);
        chs.forEach((c, i) => {
          const t = i * 0.25;
          if (i > 0) tl.fromTo(c, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.06 }, t - 0.02);
          else gsap.set(c, { autoAlpha: 1, y: 0 });
          if (i < chs.length - 1) tl.to(c, { autoAlpha: 0, y: -40, duration: 0.06 }, t + 0.21);
        });
        return () => { sec.removeAttribute("data-pinned"); bg.style.filter = ""; state.sceneOn = false; };
      });

      return () => { gsap.ticker.remove(tick); root.classList.remove(styles.waterOn); mm.revert(); };
    }, root);
    return () => ctx.revert();
  }, []);
  return null;
}
