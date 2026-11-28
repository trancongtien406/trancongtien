"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "../brand.module.css";
import { Fabric, Glyph } from "./Art";
import { prefersReduced, setupGsap } from "./lib";

export function Printer() {
  const sec = useRef<HTMLElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const fab = useRef<HTMLDivElement>(null);
  const car = useRef<HTMLDivElement>(null);
  const zoom = useRef<HTMLDivElement>(null);
  const fade = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sec.current;
    if (!s) return;
    if (prefersReduced()) {
      s.dataset.rm = "1";
      return;
    }
    setupGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true } });
      tl.fromTo(rig.current, { y: () => window.innerHeight * 0.62 }, { y: () => window.innerHeight * 0.02, ease: "power1.inOut", duration: 0.8 }, 0);
      tl.fromTo(fab.current, { yPercent: -101 }, { yPercent: 0, ease: "none", duration: 1.1 }, 0.55);
      tl.fromTo(car.current, { xPercent: 260 }, { xPercent: -260, ease: "sine.inOut", duration: 1.1, yoyo: false }, 0.55);
      tl.to(car.current, { xPercent: 40, ease: "sine.inOut", duration: 0.5 }, 1.65);
      tl.to(rig.current, { y: () => -window.innerHeight * 0.9, ease: "power2.in", duration: 0.7 }, 1.7);
      tl.to(zoom.current, { scale: 2.1, ease: "power1.in", duration: 0.9 }, 1.7);
      tl.to(fade.current, { opacity: 1, ease: "none", duration: 0.35 }, 2.25);
      tl.to({}, { duration: 0.1 }, 2.6);
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="may-in" className={styles.printSec} aria-label="Máy in lụa kỹ thuật số đang nhả vải">
      <div className={styles.printStage}>
        <div ref={zoom} className={styles.zoom}>
          <div ref={rig} className={styles.rig}>
            <div className={styles.pBlack}><i /></div>
            <div className={styles.pStrip}><i /><i /></div>
            <div ref={car} className={styles.pCar} aria-hidden="true">
              <span className={styles.pInk}><i style={{ background: "#2a2c2e" }} /><i style={{ background: "#3b3f42" }} /><i style={{ background: "#d36b2c" }} /><i style={{ background: "#6a3b36" }} /><i style={{ background: "#2f7fc4" }} /><i style={{ background: "#1a1c1d" }} /></span>
              <Glyph size={46} color="#d9d9d4" />
              <span className={styles.pNoz}><i /><i /><i /><i /><i /><i /><i /></span>
            </div>
            <div className={styles.pPaper} />
            <div className={styles.pOut}>
              <div ref={fab} className={styles.pFab}>
                <Fabric id="print" variant="print" className={styles.pFabSvg} eager />
              </div>
            </div>
          </div>
        </div>
        <div ref={fade} className={styles.pFade} />
        <p className={styles.printCap}>Mực nhả từng lớp, hoa văn hiện dần theo mét vải.</p>
      </div>
    </section>
  );
}
