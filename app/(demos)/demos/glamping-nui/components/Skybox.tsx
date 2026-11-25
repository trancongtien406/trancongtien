"use client";

import { useRef, type ReactNode } from "react";
import { ScrollProgress, gsap, markReady, prefersReducedMotion, useFx } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { makeStars } from "./stars";

const STARS = makeStars(110, 14);
/** Nền trang chuyển từ sáng sớm sang khuya theo tiến độ cuộn (màu nền + sao). */
const STOPS = ["#2c4a39", "#244735", "#173728", "#0f2a1d", "#08170f"];

export function Skybox({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useFx(ref, (el) => {
    const bg = el.querySelector<HTMLElement>("[data-sky-bg]")!;
    const stars = el.querySelector<HTMLElement>("[data-sky-stars]")!;
    if (prefersReducedMotion()) {
      bg.style.backgroundColor = STOPS[3];
      stars.style.opacity = "0.7";
      markReady(el, "static");
      return;
    }
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: true } });
    gsap.set(bg, { backgroundColor: STOPS[0] });
    for (let i = 1; i < STOPS.length; i++) tl.to(bg, { backgroundColor: STOPS[i], ease: "none", duration: 1 });
    tl.fromTo(stars, { opacity: 0.04 }, { opacity: 1, ease: "none", duration: 3.2 }, 0.4);
    markReady(el);
  }, []);
  return (
    <div ref={ref} className={styles.sky} data-fx="Skybox">
      <div className={styles.skyBg} data-sky-bg="" aria-hidden="true" />
      <svg className={styles.skyStars} data-sky-stars="" aria-hidden="true" focusable="false">
        {STARS.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#f5f0e5" opacity={s.o} className={s.tw ? styles.twinkle : undefined} style={s.tw ? { animationDelay: `${s.d}s` } : undefined} />
        ))}
      </svg>
      <ScrollProgress variant="bar" fixed className={styles.scrollBar} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
