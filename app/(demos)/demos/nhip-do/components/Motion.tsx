"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Velocity Marquee: các dải chữ lặp vô hạn bằng gsap.ticker. Tốc độ = nhịp nền × (1 + |vận tốc cuộn| / 260),
 * chiều đảo theo hướng cuộn, nghiêng skewX theo vận tốc. Vận tốc lấy từ ScrollTrigger.getVelocity().
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>("[data-nd-root]");
    if (!root) return;
    const q = <T extends HTMLElement = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // hero
        gsap.timeline({ defaults: { ease: "power4.out" } })
          .from(q('[data-hero="line"]'), { yPercent: 105, duration: 1, stagger: 0.1 }, 0.05)
          .from(q('[data-hero="in"]'), { opacity: 0, y: 16, duration: 0.7, stagger: 0.1 }, 0.5)
          .from(q("[data-shoe]"), { xPercent: 40, opacity: 0, rotate: -6, duration: 1.2, ease: "power3.out" }, 0.2);
        gsap.to(q("[data-shoe]"), {
          xPercent: -18, rotate: 4, ease: "none",
          scrollTrigger: { trigger: q("section")[0], start: "top top", end: "bottom top", scrub: 0.6 },
        });

        // reveal / counters / bars
        q("[data-rv]").forEach((el) => gsap.from(el, { opacity: 0, y: 40, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
        q("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const o = { v: 0 };
          gsap.to(o, { v: end, duration: 1.4, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(o.v)); }, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
        q("[data-bar]").forEach((el) => gsap.from(el, { scaleX: 0, transformOrigin: "0 50%", duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } }));

        // velocity marquee
        const rows = q("[data-vm]").map((row) => {
          const track = row.querySelector<HTMLElement>("[data-track]")!;
          const copy = track.querySelector<HTMLElement>("[data-copy]")!;
          return { row, track, copy, dir: Number(row.dataset.dir) || -1, speed: Number(row.dataset.speed) || 90, pos: 0, w: copy.offsetWidth };
        });
        const measure = () => rows.forEach((r) => { r.w = r.copy.offsetWidth; });
        const setters = rows.map((r) => ({ x: gsap.quickSetter(r.track, "x", "px"), skew: gsap.quickSetter(r.row, "skewX", "deg") }));
        const hudV = root.querySelector<HTMLElement>("[data-hud-v]");
        const hudBar = root.querySelector<HTMLElement>("[data-hud-bar]");
        const st = ScrollTrigger.create({ start: 0, end: "max" });
        let vs = 0;
        let flip = 1;
        let visible = new Set<Element>();
        const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target))), { rootMargin: "100px" });
        rows.forEach((r) => io.observe(r.row));
        const tick = (_t: number, dtMs: number) => {
          const dt = Math.min(dtMs, 64) / 1000;
          const v = st.getVelocity();
          vs += (v - vs) * Math.min(1, dt * 9);
          const target = vs < -60 ? -1 : vs > 60 ? 1 : flip > 0 ? 1 : -1;
          flip += (target - flip) * Math.min(1, dt * 6);
          const boost = 1 + Math.min(Math.abs(vs), 6000) / 260;
          const skew = gsap.utils.clamp(-14, 14, -vs / 120);
          rows.forEach((r, i) => {
            if (!visible.has(r.row)) return;
            r.pos += r.dir * flip * r.speed * boost * dt;
            if (r.w > 0) r.pos = ((r.pos % r.w) - r.w) % r.w;
            setters[i].x(r.pos);
            setters[i].skew(skew);
          });
          if (hudV) hudV.textContent = String(Math.round(Math.abs(vs)));
          if (hudBar) hudBar.style.transform = `scaleX(${Math.min(1, Math.abs(vs) / 3000)})`;
        };
        gsap.ticker.add(tick);
        window.addEventListener("resize", measure);
        document.fonts?.ready.then(measure).catch(() => undefined);
        return () => {
          gsap.ticker.remove(tick);
          window.removeEventListener("resize", measure);
          io.disconnect();
          visible = new Set();
          st.kill();
        };
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);
  return null;
}
