"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "../brand.module.css";
import { Fabric, Glyph } from "./Art";
import { prefersReduced, setupGsap } from "./lib";

export function Loader() {
  const num = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const o = { v: 0 };
    const t = gsap.to(o, { v: 100, duration: 1.7, ease: "power1.inOut", onUpdate: () => { if (num.current) num.current.textContent = `${Math.round(o.v)}%`; } });
    return () => { t.kill(); };
  }, []);
  return (
    <div className={styles.loader} aria-hidden="true">
      <Glyph size={72} />
      <div className={styles.loadBar}><i /></div>
      <p>ĐANG DỆT <span ref={num}>100%</span></p>
    </div>
  );
}

const NAV = [["Về chúng tôi", "#xuong"], ["Triển lãm", "#dac-trung"], ["Bộ sưu tập", "#bo-suu-tap"], ["Quy trình", "#quy-trinh"], ["Mua ngay", "#cua-hang"]];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReduced()) return;
    setupGsap();
    const ctx = gsap.context(() => {
      const d = 1.9;
      gsap.from(`.${styles.hIn}`, { yPercent: 115, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: d });
      gsap.from(`.${styles.hFade}`, { opacity: 0, y: 14, duration: 0.9, stagger: 0.12, delay: d + 0.5 });
      gsap.from(`.${styles.chip}`, { scaleX: 0, duration: 0.9, ease: "power3.out", delay: d + 0.7 });
      gsap.to(`.${styles.heroInner}`, { yPercent: -12, opacity: 0.3, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className={styles.hero} aria-labelledby="hero-h">
      <header className={`${styles.nav} ${styles.hFade}`}>
        <a href="#top" className={styles.navLogo}>LỤA HÀ ĐÔNG<sup>®</sup></a>
        <nav aria-label="Điều hướng chính">
          {NAV.map(([t, h]) => <a key={h} href={h}>{t}</a>)}
        </nav>
        <details className={styles.mMenu}>
          <summary aria-label="Mở menu">Menu</summary>
          <div>{NAV.map(([t, h]) => <a key={h} href={h}>{t}</a>)}<a href="#hoi-dap">Hỏi đáp</a></div>
        </details>
        <a className={styles.navBtn} href="#lien-he">Liên hệ</a>
      </header>
      <div className={styles.heroInner}>
        <p className={`${styles.heroTag} ${styles.hFade}`}>Êm. Màu. Bền.</p>
        <h1 id="hero-h" className={styles.heroH}>
          <span className={styles.ln}><span className={styles.hIn}>CHÚNG TÔI</span></span>
          <span className={`${styles.ln} ${styles.l2}`}><span className={styles.hIn}>KHÔNG CHỈ IN</span></span>
          <span className={styles.ln}>
            <span className={styles.hIn}>LỤA. CHÚNG <span className={styles.chip} aria-hidden="true"><Fabric id="chip" variant="mai" eager /></span></span>
          </span>
          <span className={`${styles.ln} ${styles.l4}`}><span className={styles.hIn}>DỆT ĐỂ BỀN.</span></span>
        </h1>
        <p className={`${styles.since} ${styles.hFade}`}>TỪ 2015</p>
      </div>
      <a className={`${styles.cue} ${styles.hFade}`} href="#may-in" aria-label="Cuộn xuống để xem máy in"><i /></a>
    </section>
  );
}
