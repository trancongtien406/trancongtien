"use client";

import { useRef } from "react";
import Image from "next/image";
import { ParallaxLayer, gsap, hasFinePointer, markReady, prefersReducedMotion, useFxLayout } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { Countdown } from "./Countdown";
import { Ignite } from "./Ignite";
import { Embers } from "./Embers";
import { Fire } from "./Fire";
import { trees } from "../lib/scenery";

/** Lớp đồi/cây dựng bằng SVG; xếp từ xa tới gần, mỗi lớp một tốc độ parallax. */
function Ridge({ d, fill, className, h }: { d: string; fill: string; className?: string; h: string }) {
  return (
    <svg className={className} style={{ height: h }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <path d={d} fill={fill} />
    </svg>
  );
}

const FAR = "M0 400V250C90 220 170 190 260 205C350 220 420 150 520 140C620 130 690 190 790 185C890 180 960 120 1070 118C1180 116 1260 170 1340 160C1380 156 1410 150 1440 144V400Z";
const MID = trees(26, 5, 1440, 400, 330, 90, 190);
const NEAR = trees(15, 9, 1440, 400, 340, 170, 330);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    const bg = q("[data-hero-bg]");
    const layers = q("[data-hero-rise]");
    const fade = q("[data-hero-fade]");
    const cta = q("[data-hero-cta]");
    const fire = q("[data-hero-fire]");
    const mist = q("[data-hero-mist]");
    gsap.set(bg, { opacity: 0, scale: 1.08 });
    gsap.set(layers, { yPercent: 7, opacity: 0 });
    gsap.set(fade, { y: 16, opacity: 0 });
    gsap.set(cta, { scale: 0.96, opacity: 0 });
    gsap.set(fire, { opacity: 0, scale: 0.9, transformOrigin: "50% 100%" });
    gsap.set(mist, { opacity: 0 });
    // Mốc theo đặc tả (ms): nền 150, logo/eyebrow 300-500, tiêu đề 700, mô tả 1200, CTA 1400, sương 1800, lửa 2000.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(bg, { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }, 0.15)
      .to(layers, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, 0.35)
      .to(fade, { y: 0, opacity: 1, duration: 0.7, stagger: 0.14 }, 0.5)
      .to(cta, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.12 }, 1.4)
      .to(mist, { opacity: 1, duration: 1.4 }, 1.8)
      .to(fire, { opacity: 1, scale: 1, duration: 0.9 }, 2.0)
      .add(() => el.setAttribute("data-lit", "1"), 2.0);

    // Con trỏ: các lớp trượt ngang rất nhẹ theo độ sâu (chỉ chuột, không chạm).
    let off = () => {};
    if (hasFinePointer()) {
      const depth = q("[data-depth]");
      const setters = depth.map((d) => gsap.quickTo(d, "x", { duration: 0.9, ease: "power3.out" }));
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        depth.forEach((d, i) => setters[i](-nx * Number(d.dataset.depth)));
      };
      el.addEventListener("pointermove", move);
      off = () => el.removeEventListener("pointermove", move);
    }
    markReady(el);
    return off;
  }, []);

  return (
    <section ref={ref} id="top" className={styles.hero} aria-labelledby="hero-title" data-fx="HeroChoreography">
      <div className={styles.heroScene} aria-hidden="true">
        <ParallaxLayer className={styles.hLayer} distance={36} style={{ inset: "-36px 0" }}>
          <div className={styles.heroPhoto} data-hero-bg="">
            <Image src="/images/demos/glamping-nui/fog-peak-1200.webp" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 38%" }} />
          </div>
          <div className={styles.heroShade} />
        </ParallaxLayer>
        <ParallaxLayer className={styles.hLayer} distance={52} style={{ inset: "-52px 0" }}>
          <div className={styles.hDepth} data-depth="10" data-hero-rise="">
            <Ridge className={styles.hSvg} d={FAR} fill="#1a3a2a" h="58%" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer className={styles.hLayer} distance={20} style={{ inset: "-20px 0" }}>
          <div className={`${styles.mist} ${styles.mistA}`} data-hero-mist="" />
        </ParallaxLayer>
        <ParallaxLayer className={styles.hLayer} distance={78} style={{ inset: "-78px 0" }}>
          <div className={styles.hDepth} data-depth="22" data-hero-rise="">
            <Ridge className={styles.hSvg} d={MID} fill="#112e20" h="50%" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer className={styles.hLayer} distance={104} style={{ inset: "-104px 0" }}>
          <div className={styles.hDepth} data-depth="40" data-hero-rise="">
            <Ridge className={styles.hSvg} d={NEAR} fill="#0a2014" h="44%" />
          </div>
        </ParallaxLayer>
        <div className={`${styles.mist} ${styles.mistB}`} data-hero-mist="" />
      </div>

      <div className={styles.heroFire} data-hero-fire="" aria-hidden="true">
        <Fire className={styles.heroFireSvg} />
      </div>
      <Embers originX={0.8} originY={0.8} spread={0.018} className={styles.heroEmbers} />

      <div className={`${styles.wrap} ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-hero-fade="">Khu glamping · Chân núi Bà Nà, Hòa Vang, Đà Nẵng</p>
          <h1 id="hero-title" className={styles.h1}>
            <Ignite as="span" className={styles.h1Line} trigger="load" delay={0.7} stagger={0.1}>Đêm chạm rừng.</Ignite>
            <Ignite as="span" className={`${styles.h1Line} ${styles.h1Fire}`} trigger="load" delay={1.05} stagger={0.1}>Ngày chạm mây.</Ignite>
          </h1>
          <p className={styles.heroSub} data-hero-fade="">
            Khu glamping có 3 loại lều cho 2 đến 4 người, ngủ đêm hoặc trọn 2 ngày 1 đêm, dành cho cặp đôi, gia đình nhỏ và nhóm bạn đến 8 người. Có BBQ bên lửa trại, trekking nhẹ và ngắm sao.
          </p>
          <ul className={styles.heroFacts} data-hero-fade="">
            <li><b>Từ 890.000₫</b> một lều, một đêm</li>
            <li>Nhận lều <b>14:00</b>, trả lều <b>11:00</b></li>
            <li>Lều <b>2 đến 4</b> người, ghép đến 8</li>
          </ul>
          <div className={styles.heroCtas}>
            <span data-hero-cta="">
              <a className={`${styles.btn} ${styles.btnFire}`} href="#luu-tru">Xem lều và giá</a>
            </span>
            <span data-hero-cta="">
              <a className={`${styles.btn} ${styles.btnLine}`} href="#lap-ke-hoach">Ước tính và hỏi đặt lều</a>
            </span>
          </div>
          <p className={styles.heroMicro} data-hero-fade="">Cách trung tâm Đà Nẵng khoảng 40 phút, ngoài khu Bà Nà, Hòa Vang</p>
        </div>
        <div className={styles.heroSide} data-hero-fade="">
          <Countdown />
        </div>
      </div>
      <a className={styles.scrollHint} href="#manifesto" aria-label="Cuộn xuống">
        <span aria-hidden="true" />
      </a>
    </section>
  );
}
