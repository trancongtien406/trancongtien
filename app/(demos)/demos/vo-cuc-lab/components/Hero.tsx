"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { field } from "../field";

gsap.registerPlugin(ScrollTrigger);

const STATS: [number, string, string][] = [[50, "+", "Dự án đã bàn giao"], [100, "%", "Khách hàng hài lòng"], [24, "/7", "Hỗ trợ liên tục"]];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 900;
    field.shape = 0; field.x = 0.5; field.y = small ? 0.47 : 0.5; field.s = small ? 0.62 : 0.9; field.o = reduced ? 0.55 : 1;
    if (reduced) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.from("[data-vc-line]", { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.16, ease: "power4.out", delay: 0.15 });
      gsap.from("[data-vc-fade]", { opacity: 0, y: 20, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.6 });
      gsap.from("[data-vc-beam]", { opacity: 0, duration: 2, ease: "power2.out" });
      gsap.from(field, { o: 0, duration: 1.6, ease: "power2.out", delay: 0.2 });
      root.current?.querySelectorAll<HTMLElement>("[data-vc-num]").forEach((el) => {
        const to = +el.dataset.vcNum!; const o = { v: to === 100 ? 85 : to === 50 ? 42 : to };
        gsap.to(o, { v: to, duration: 1.8, delay: 0.8, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(o.v)).padStart(to === 100 ? 3 : 2, "0"); } });
      });
      gsap.to("[data-vc-ghost]", { yPercent: -60, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    mm.add("(min-width: 900px)", () => {
      const tw = gsap.to(field, { x: 0.23, s: 0.8, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 20%", scrub: 0.5, invalidateOnRefresh: true } });
      return () => { tw.scrollTrigger?.kill(); tw.kill(); };
    });
    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return (
    <section ref={root} className={styles.hero} aria-labelledby="vc-h1" id="vc-top">
      <div className={styles.beam} data-vc-beam aria-hidden="true" />
      <p className={styles.ghost} data-vc-ghost aria-hidden="true">VÔ CỰC LAB</p>
      <h1 id="vc-h1" className={styles.h1}>
        <span className={styles.ln}><span data-vc-line>Kiến tạo <em>giải pháp</em></span></span>
        <span className={`${styles.ln} ${styles.ln2}`}><span data-vc-line><em>số</em> có ý nghĩa</span></span>
      </h1>
      <div className={styles.heroBottom}>
        <div data-vc-fade>
          <p className={styles.heroP}>Chúng tôi giúp doanh nghiệp dùng AI để biến những bài toán phức tạp thành kết quả đo được ngoài đời thực.</p>
          <a className={styles.btnP} href="#vc-contact">Bắt đầu dự án</a>
        </div>
        <dl className={styles.stats} data-vc-fade>
          {STATS.map(([n, s, l]) => (
            <div key={l}><dt><b data-vc-num={n}>{String(n).padStart(n === 100 ? 3 : 2, "0")}</b>{s}</dt><dd>{l}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
