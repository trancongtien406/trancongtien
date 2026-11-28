"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "../brand.module.css";
import { CAPS, CHAPTERS, IMG, SCENES, SCENE_ALT } from "../data";

const pad = (v: number) => String(v).padStart(2, "0");

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
        const scenes = gsap.utils.toArray<HTMLElement>("[data-scene]", el);
        const caps = gsap.utils.toArray<HTMLElement>("[data-cap]", el);
        const letters = gsap.utils.toArray<HTMLElement>("[data-letter]", el);
        const intro = gsap.utils.toArray<HTMLElement>("[data-intro]", el);
        const tc = el.querySelector<HTMLElement>("[data-tc]");
        const idx = gsap.utils.toArray<HTMLElement>("[data-idx]", el);
        const hudKey = el.querySelector<HTMLElement>("[data-hudkey]");
        const stage = el.querySelector<HTMLElement>("[data-stage]");
        const N = scenes.length; // 6
        gsap.set(scenes.slice(1), { autoAlpha: 0, scale: 1.22 });
        gsap.set(caps, { autoAlpha: 0, y: 36 });
        gsap.from(letters, { yPercent: 40, autoAlpha: 0, duration: 1.3, ease: "power3.out", stagger: 0.08 });
        gsap.from([...intro], { autoAlpha: 0, y: 14, duration: 1, delay: 0.5, stagger: 0.08, ease: "power2.out" });

        const total = N - 1; // 5 đơn vị, mỗi đơn vị một cảnh
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el, start: "top top", end: "+=560%", pin: true, scrub: 0.7, anticipatePin: 1,
            onUpdate: (st) => {
              const t = st.progress * (total + 0.9);
              const f = Math.round(Math.min(t, total) / total * 19.1 * 24);
              if (tc) tc.textContent = `TC 00:00:${pad(Math.floor(f / 24))}:${pad(f % 24)}`;
              const a = Math.min(CHAPTERS.length - 1, Math.max(0, Math.round(t)));
              idx.forEach((e, i) => { e.dataset.on = i === a ? "1" : "0"; });
              if (hudKey) hudKey.textContent = t < 0.5 ? "KHU ĐẤT" : CHAPTERS[a].name.toUpperCase();
            },
          },
        });
        tl.to(intro, { autoAlpha: 0, y: -24, duration: 0.45, stagger: 0.04 }, 0.05);
        tl.to(letters, { yPercent: -30, autoAlpha: 0, duration: 0.55, stagger: 0.03 }, 0.05);
        tl.to(scenes[0], { scale: 1.2, duration: 1 }, 0);
        for (let i = 1; i < N; i++) {
          const t = i - 0.6;
          tl.to(scenes[i - 1], { autoAlpha: 0, duration: 0.6 }, t);
          tl.to(scenes[i], { autoAlpha: 1, scale: 1.04, duration: 0.6 }, t);
          tl.to(scenes[i], { scale: 1.12, duration: 1 }, t + 0.6);
          tl.to(caps[i - 1], { autoAlpha: 1, y: 0, duration: 0.35 }, i - 0.35);
          if (i < N - 1) tl.to(caps[i - 1], { autoAlpha: 0, y: -26, duration: 0.25 }, i + 0.36);
        }
        tl.to("[data-prog]", { scaleX: 1, duration: total }, 0);
        // kết thúc: khung hero thu về thẻ bo góc
        tl.to(caps[caps.length - 1], { autoAlpha: 0, duration: 0.3 }, total + 0.35);
        if (stage) tl.to(stage, { scale: 0.93, borderRadius: 28, duration: 0.6 }, total + 0.3);
        tl.to({}, { duration: 0.1 });
      });
    }, el);
    return () => { mm.revert(); ctx.revert(); };
  }, []);

  return (
    <section ref={root} id="top" data-hero className={s.hero} aria-label="Tham quan toà nhà qua từng cảnh">
      <div className={s.first}>
      <div className={s.stage} data-stage>
        {SCENES.map((n, i) => (
          <div key={n} data-scene className={s.scene}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={s.img} src={`${IMG}${n}.webp`} alt={SCENE_ALT[i]} width={1920} height={1080} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
          </div>
        ))}
        <div className={s.vignette} aria-hidden="true" />
      </div>

      <p className={`${s.hud} ${s.hudTL}`} aria-hidden="true"><i className={s.rec} /> SÁNG / THẢO ĐIỀN</p>
      <p className={`${s.hud} ${s.hudTR}`} aria-hidden="true">THE <span data-hudkey>KHU ĐẤT</span></p>
      <p className={s.enter} data-intro aria-hidden="true">CUỘN ĐỂ VÀO</p>
      <ol className={s.index} aria-label="Các chương" >
        {CHAPTERS.map((c, i) => (<li key={c.id} data-idx data-on={i === 0 ? "1" : "0"}>0{i + 1} {c.name}</li>))}
      </ol>

      <h1 className={s.giant} aria-label="Sáng, nhà phố ánh sáng">
        {"SÁNG".split("").map((c, i) => (<i key={i} data-letter aria-hidden="true">{c}</i>))}
      </h1>
      <p className={s.tag} data-intro><em>Căn hộ riêng tư</em> ở Thảo Điền, Sài Gòn</p>
      <p className={s.heroP} data-intro>Một toà tháp kính đồng, được cắt xuyên bởi một đường đá sáng màu, nơi mỗi căn hộ có một hiên nắng riêng nhìn ra sông.</p>

      <p className={`${s.hud} ${s.hudBL}`} data-tc aria-hidden="true">TC 00:00:00:00</p>
      <div className={s.prog} aria-hidden="true"><i data-prog /></div>
      </div>

      <div className={s.capsWrap}>
      {CAPS.map((c, i) => (
        <div key={c.k} data-cap className={s.cap}>
          <p className={s.capK}>{c.k}</p>
          <h2>{c.a} <em>{c.b}</em></h2>
          {c.p && <p className={s.capP}>{c.p}</p>}
          {i === CAPS.length - 1 && (<div className={s.capBtns}><a className={s.pillL} href="#dat-lich">Đặt lịch xem riêng</a><a className={s.pillG} href="#can-ho">Khám phá căn hộ</a></div>)}
        </div>
      ))}
      </div>
    </section>
  );
}
