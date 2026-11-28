"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "../brand.module.css";
import { BurgerStatic } from "./Art";
import { Glitch } from "./Glitch";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const burger = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const b = burger.current;
    if (!el || !b || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(b, { y: 70, opacity: 0, rotate: -3, duration: 1.1, ease: "power3.out", delay: 0.2 });
      gsap.to(b, { y: "-=10", duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.3 });
      gsap.from(`.${styles.heroIn}`, { y: 26, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power2.out", delay: 0.5 });
    }, el);
    const qx = gsap.quickTo(b, "rotationY", { duration: 0.8 });
    const move = (e: PointerEvent) => qx(((e.clientX / window.innerWidth) - 0.5) * 10);
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="top" className={styles.hero} aria-labelledby="hero-h">
      <div className={styles.heroTable} aria-hidden="true" />
      <div className={styles.heroCopy}>
        <p className={`${styles.kicker} ${styles.heroIn}`}>Bánh Mì Tầng</p>
        <Glitch as="h1" text="XẾP TẦNG NHƯ MỘT NGÔI SAO." className={styles.heroH} trigger="load" delay={0.4} />
        <p className={`${styles.heroP} ${styles.heroIn}`}>Bánh mì kẹp ép nóng, khoai chiên sốt cay và trà sữa kem, mỗi lớp một vị. Mở cửa 10:00–22:00 tại Quận 3.</p>
        <div className={`${styles.heroBtns} ${styles.heroIn}`}>
          <a className={styles.btnOr} href="#thuc-don">Đặt ngay</a>
          <a className={styles.btnGhost} href="#thuc-don">Xem thực đơn</a>
        </div>
        <p className={`${styles.heroNote} ${styles.heroIn}`}>Giao tận nơi trong 25 phút (minh hoạ)</p>
      </div>
      <div className={styles.heroArt} aria-hidden="true">
        <div className={styles.paper} />
        <div ref={burger} className={styles.heroBurger}>
          <BurgerStatic uid="hero" />
          <span className={styles.heroShadow} />
        </div>
      </div>
    </section>
  );
}
