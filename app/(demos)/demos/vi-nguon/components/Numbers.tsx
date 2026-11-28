"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "../brand.module.css";
import { NUMS } from "../data";

export function Numbers() {
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current; if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      setAnim(true);
      const st = ScrollTrigger.create({ trigger: el, start: "top top", end: "+=240%", pin: true, scrub: true, anticipatePin: 1, onUpdate: (self) => setIdx(Math.min(NUMS.length - 1, Math.floor(self.progress * NUMS.length * 0.999))) });
      return () => { st.kill(); setAnim(false); };
    });
    return () => mm.revert();
  }, []);

  const go = (i: number) => {
    setIdx(i);
    const el = root.current; if (!el || !anim) return;
    const spacer = el.parentElement as HTMLElement; // pin-spacer
    const top = spacer.getBoundingClientRect().top + window.scrollY; const len = window.innerHeight * 2.4;
    window.scrollTo({ top: top + (len * (i + 0.5)) / NUMS.length, behavior: "smooth" });
  };

  return (
    <section ref={root} id="con-so" className={s.numbers} data-anim={anim ? "1" : undefined} aria-labelledby="nm-h">
      <p className={s.pillTag}><span id="nm-h">Con số nói lên điều đó</span></p>
      <i className={s.dotLine} aria-hidden="true" />
      <svg className={s.arc} viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true"><path d="M0 300C200 40 800 40 1000 300" fill="none" stroke="#9aa4c8" strokeOpacity=".5" strokeDasharray="2 6" /></svg>
      <ul className={s.numList} aria-live="polite">
        {NUMS.map((n, i) => (
          <li key={n.l} className={i === idx ? s.numOn : ""} data-idx={i - idx}>
            <strong>{n.fmt}</strong><p>{n.l}</p>
          </li>
        ))}
      </ul>
      <div className={s.dots} role="tablist" aria-label="Chọn con số">
        {NUMS.map((n, i) => (<button key={n.l} type="button" role="tab" aria-selected={i === idx} aria-label={`${n.fmt}, ${n.l}`} className={i === idx ? s.dotOn : ""} onClick={() => go(i)} />))}
      </div>
    </section>
  );
}
