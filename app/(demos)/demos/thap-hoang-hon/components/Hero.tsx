"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "../brand.module.css";
import { SCENES, STOPS } from "../data";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.dataset.anim = "1";
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", el);
        const alt = el.querySelector<HTMLElement>("[data-alt]");
        const clock = el.querySelector<HTMLElement>("[data-clock]");
        const stops = gsap.utils.toArray<HTMLElement>("[data-stop]", el);
        const N = panels.length;
        panels.forEach((p, i) => {
          const img = p.querySelector("img");
          const cap = p.querySelector("[data-cap]");
          if (i > 0) gsap.set(p, { autoAlpha: 0 });
          if (i > 0 && img) gsap.set(img, { scale: 1.14 });
          if (i > 0 && cap) gsap.set(cap.children, { autoAlpha: 0, y: 34 });
        });
        gsap.from(panels[0].querySelector("[data-cap]")!.children, { autoAlpha: 0, y: 40, duration: 1.3, stagger: 0.14, ease: "power3.out" });
        const setStop = (idx: number) => stops.forEach((n, i) => n.classList.toggle(s.stopOn, i === idx - 1));
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el, start: "top top", end: `+=${(N - 1) * 110}%`, pin: true, scrub: 0.8, anticipatePin: 1,
            onUpdate: (st) => {
              const p = st.progress;
              if (alt) alt.textContent = `${(24 - p * 25).toFixed(1)}°`;
              if (clock) { const m = Math.round(17 * 60 + 12 + p * 100); clock.textContent = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; }
              setStop(Math.min(4, Math.round(p * (N - 1) + 0.0001)));
            },
          },
        });
        tl.to(panels[0].querySelector("img"), { scale: 1.12, x: "-1.5%", duration: 1 }, 0);
        tl.to(panels[0].querySelector("[data-cap]")!.children, { autoAlpha: 0, y: -34, duration: 0.35, stagger: 0.04 }, 0.15);
        for (let i = 1; i < N; i++) {
          const t = i - 0.5;
          const img = panels[i].querySelector("img");
          const cap = panels[i].querySelector("[data-cap]")!;
          tl.to(panels[i - 1], { autoAlpha: 0, duration: 0.5 }, t);
          tl.to(panels[i], { autoAlpha: 1, duration: 0.5 }, t);
          tl.to(img, { scale: 1.02, x: i % 2 ? "1.5%" : "-1.5%", duration: 1.1 }, t);
          tl.to(cap.children, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.05 }, t + 0.25);
          if (i < N - 1) tl.to(cap.children, { autoAlpha: 0, y: -26, duration: 0.25 }, i + 0.28);
        }
        tl.to("[data-prog]", { scaleX: 1, duration: N - 1 }, 0);
        tl.to("[data-dusk]", { opacity: 0.5, duration: N - 1 }, 0);
        return () => { delete el.dataset.anim; };
      });
    }, el);
    return () => { mm.revert(); ctx.revert(); };
  }, []);

  return (
    <section ref={root} id="top" className={s.hero} aria-label="Năm cảnh từ móng tới nội thất, cuộn để đổi cảnh">
      <div className={s.stage}>
        {SCENES.map((sc, n) => (
          <div key={sc.src} data-panel className={s.panel}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={s.panelImg} style={{ objectPosition: sc.pos }} src={`/images/demos/thap-hoang-hon/${sc.src}.webp`} width={1600} height={900} alt={sc.alt} loading={n < 2 ? "eager" : "lazy"} decoding="async" />
            <div className={s.shade} />
            <div data-cap className={`${s.cap} ${n === 0 ? s.capFirst : ""}`}>
              <p className={s.capK}><i aria-hidden="true" />{sc.k}</p>
              {n === 0 ? <h1>{sc.a} <em>{sc.b}</em></h1> : <h2>{sc.a} <em>{sc.b}</em></h2>}
              <p className={s.capP}>{sc.p}</p>
            </div>
          </div>
        ))}
        <div className={s.dusk} data-dusk aria-hidden="true" />
      </div>
      <div className={s.hud} aria-hidden="true">
        <dl><div><dt>Độ cao mặt trời</dt><dd data-alt>24.0°</dd></div><div><dt>Giờ địa phương</dt><dd data-clock>17:12</dd></div></dl>
        <ol>{STOPS.map((t, i) => (<li key={t} data-stop><b>0{i + 1}</b> {t}</li>))}</ol>
      </div>
      <div className={s.prog} aria-hidden="true"><i data-prog /></div>
    </section>
  );
}
