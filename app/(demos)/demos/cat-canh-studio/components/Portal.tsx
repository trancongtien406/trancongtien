"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "../brand.module.css";
import { Toggle } from "./Toggle";

const STATEMENT = "Tạo trải nghiệm cuộn ấn tượng và tương tác dễ như kéo thả.".split(" ");

/**
 * Hero + cổng chuyển cảnh. Cuộn (hoặc bật công tắc) -> bệ kính cầu vồng trồi lên từ đáy, phóng to xuyên qua thành vệt sáng cam,
 * rồi các từ bay tản mát tụ lại thành câu. Không JS / giảm chuyển động: mọi khối xếp dọc, đọc được.
 */
export function Portal() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    el.dataset.anim = "on";
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const words = q("[data-w]");
      const rnd = gsap.utils.random;
      const vh = window.innerHeight;
      gsap.set(q("[data-ring]"), { y: vh * 0.62, scale: 0.9, rotateX: 74, autoAlpha: 0 });
      gsap.set(q("[data-bar]"), { autoAlpha: 0, scaleY: 0.05 });
      gsap.set(q("[data-state]"), { autoAlpha: 0 });
      gsap.set(q("[data-icon]"), { autoAlpha: 0, scale: 0.4 });
      gsap.set(words, { x: () => rnd(-320, 320), y: () => rnd(-160, 160), rotate: () => rnd(-25, 25), autoAlpha: 0, filter: "blur(8px)", scale: () => rnd(0.7, 1.4) });
      gsap.set(q("[data-glow]"), { autoAlpha: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7 } });
      tl.to(q("[data-glow]"), { autoAlpha: 0.7, duration: 1.4 }, 0.1)
        .to(q("[data-ring]"), { autoAlpha: 1, y: vh * 0.34, scale: 1.45, rotateX: 54, duration: 1.6 }, 0.2)
        .to(q("[data-hero]"), { autoAlpha: 0, y: -140, duration: 1.4 }, 1.2)
        .to(q("[data-ring]"), { y: vh * 0.02, scale: 7, rotateX: 18, autoAlpha: 0, duration: 1.8, ease: "power3.in" }, 2.2)
        .to(q("[data-bar]"), { autoAlpha: 1, scaleY: 1, duration: 0.8 }, 2.8)
        .to(q("[data-bar]"), { autoAlpha: 0, scaleY: 3, duration: 0.8 }, 3.7)
        .to(q("[data-glow]"), { autoAlpha: 1, duration: 1 }, 3.6)
        .to(q("[data-state]"), { autoAlpha: 1, duration: 0.1 }, 4)
        .to(words, { x: 0, y: 0, rotate: 0, autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 1.4, stagger: 0.08 }, 4)
        .to(q("[data-icon]"), { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.3 }, 5.4)
        .to(q("[data-state]"), { autoAlpha: 0, y: -60, duration: 0.9 }, 7.6);
    }, el);
    return () => { ctx.revert(); delete el.dataset.anim; };
  }, []);

  const onToggle = (on: boolean) => {
    if (!on || !root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = root.current.getBoundingClientRect();
    const total = root.current.offsetHeight - window.innerHeight;
    const y = window.scrollY + r.top + total * 0.38;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className={s.portal} ref={root} id="top" aria-label="Giới thiệu">
      <div className={s.pStage}>
        <div className={s.glow} data-glow="" aria-hidden="true" />
        <div className={s.pHero} data-hero="">
          <h1 className={s.h1}>
            <span>Cho website của bạn<br />Bay B<Toggle label="Bật công tắc để website chuyển động" onChange={onToggle} />ng.</span>
          </h1>
          <p className={s.sub}>Ứng dụng không cần code để dựng chuyển động cuộn, cảnh 3D và website tương tác cho mọi trình dựng web.</p>
          <p className={s.hint} aria-hidden="true"><svg viewBox="0 0 54 34" fill="none"><path d="M52 4 C32 2 18 10 4 30 M4 30 l1 -9 M4 30 l8 -4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>Bấm công tắc</p>
        </div>
        <div className={s.ring} data-ring="" aria-hidden="true"><i /></div>
        <div className={s.bar} data-bar="" aria-hidden="true" />
        <div className={s.pState} data-state="">
          <p className={s.statement}>
            <span className={`${s.icon} ${s.iconPink}`} data-icon="" aria-hidden="true">▤</span>
            {STATEMENT.map((w, i) => <Fragment key={i}><span data-w="" className={s.w}>{w}</span>{i < STATEMENT.length - 1 ? " " : ""}</Fragment>)}
            <span className={`${s.icon} ${s.iconOrange}`} data-icon="" aria-hidden="true">▦</span>
          </p>
          <p className={s.note2} aria-hidden="true">Làm bằng<br />Bộ Hào Quang</p>
        </div>
      </div>
    </section>
  );
}
