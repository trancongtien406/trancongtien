"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { BurgerStatic, PhotoTile, Roundel } from "./Art";
import { Glitch } from "./Glitch";

export function ComboScroll() {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const items = useRef<HTMLDivElement>(null);
  const t1 = useRef<HTMLDivElement>(null);
  const t2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sec.current;
    const s = stage.current;
    if (!section || !s) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(s, { "--bg": "#f4ecd9", "--fg": "#14110d" });
        gsap.set(box.current, { "--tilt": "50deg", "--lid": "-80deg", "--rz": "-6deg" });
        return;
      }
      const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.7 } });
      tl.fromTo(box.current, { "--tilt": "62deg", "--rz": "-18deg", scale: 1.12, yPercent: 6 }, { "--tilt": "48deg", "--rz": "-6deg", scale: 1, yPercent: 0, duration: 0.9, ease: "power2.out" }, 0);
      tl.fromTo(items.current, { y: 0 }, { y: -26, duration: 0.9, ease: "none" }, 0);
      tl.to(box.current, { "--lid": "-180deg", duration: 0.8, ease: "power2.inOut" }, 1.0);
      tl.to(items.current, { opacity: 0, scale: 0.92, duration: 0.4 }, 1.0);
      tl.to(s, { "--bg": "#14110d", "--fg": "#f4ecd9", duration: 0.7, ease: "none" }, 1.0);
      tl.to(t1.current, { opacity: 0, y: -20, duration: 0.35 }, 1.0);
      tl.fromTo(t2.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, onStart: () => t2.current?.querySelector("h2")?.dispatchEvent(new Event("glitch")) }, 1.7);
      tl.to(box.current, { "--tilt": "8deg", "--rz": "0deg", scale: 1.18, yPercent: 6, duration: 0.9, ease: "power2.inOut" }, 1.8);
      tl.to({}, { duration: 0.6 }, 2.7);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="combo" className={styles.comboSec} aria-labelledby="combo-h">
      <div ref={stage} className={styles.comboStage}>
        <div ref={t1} className={styles.comboT1}>
          <Glitch as="h2" text="COMBO CUỐI TUẦN." className={styles.comboBig} trigger="load" delay={0.2} />
          <p id="combo-h" className={styles.comboP}>Một ổ Tầng Đôi, khoai chiên, trà sữa kem và hai hũ sốt, xếp gọn trong hộp giấy kraft mang đi hoặc giao tận nơi.</p>
          <p className={styles.comboPrice}>129.000đ <small>/ phần cho hai người</small></p>
        </div>
        <div ref={t2} className={styles.comboT2}>
          <span className={styles.kicker}>Giờ vàng 14:00–17:00</span>
          <Glitch as="h2" text="TRÀ SỮA CHỐT ĐƠN." className={styles.comboBig} trigger="manual" />
          <p className={styles.comboP}>Oreo, dâu và socola đặc, xay dày đến mức cắm ống hút không đổ. Hộp đóng kín, giữ lạnh 40 phút.</p>
        </div>
        <div className={styles.scene} aria-hidden="true">
          <div ref={box} className={styles.box}>
            <div className={styles.lid}>
              <div className={styles.lidIn}>
                <Roundel size={46} />
                <b>BÁNH MÌ TẦNG</b>
                <i>LÀM NÓNG · LÀM ĐẬM · LÀM LIỀN</i>
              </div>
              <div className={styles.lidOut}>
                <Roundel size={96} className={styles.lidLogo} />
                <b>BÁNH MÌ <em>★</em> TẦNG</b>
                <i />
              </div>
            </div>
            <div className={styles.tray}>
              <span className={styles.divider} />
              <div ref={items} className={styles.trayItems}>
                <div className={styles.anchor} style={{ left: "27%", top: "80%" }}>
                  <BurgerStatic className={styles.itBurger} eager />
                </div>
                <div className={styles.anchor} style={{ left: "56%", top: "88%" }}><span className={styles.sauce} style={{ background: "#e8a23a" }} /></div>
                <div className={styles.anchor} style={{ left: "64%", top: "92%" }}><span className={styles.sauce} style={{ background: "#7a1d2a" }} /></div>
                <div className={styles.anchor} style={{ left: "64%", top: "50%" }}><PhotoTile src="tile-khoai.webp" className={styles.itPhoto} eager /></div>
                <div className={styles.anchor} style={{ left: "84%", top: "86%" }}><PhotoTile src="tile-shake.webp" className={styles.itPhoto} eager /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
