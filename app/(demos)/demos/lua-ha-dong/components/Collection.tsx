"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { Fabric } from "./Art";
import { isDesktop, prefersReduced, setupGsap } from "./lib";

export const PRODUCTS = [
  { name: "Bộ áo dài lụa in số", price: "1.250.000đ", v: "aodai" },
  { name: "Khăn choàng lụa hoa sen", price: "690.000đ", v: "mai" },
  { name: "Đầm lụa hoa cúc vàng", price: "1.480.000đ", v: "cuc" },
  { name: "Set lụa trúc mai", price: "1.350.000đ", v: "truc" },
  { name: "Áo lụa nhuộm lam", price: "980.000đ", v: "lam" },
] as const;

export function Collection() {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const s = sec.current;
    const st = stage.current;
    const tr = track.current;
    if (!s || !st || !tr) return;
    if (prefersReduced() || !isDesktop()) {
      s.dataset.rm = "1";
      return;
    }
    setupGsap();
    const dist = () => Math.max(0, tr.scrollWidth - st.clientWidth + 80);
    const setH = () => { s.style.height = `${st.clientHeight + dist()}px`; };
    setH();
    ScrollTrigger.addEventListener("refreshInit", setH);
    const ctx = gsap.context(() => {
      gsap.to(tr, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true } });
      gsap.utils.toArray<HTMLElement>(`.${styles.cardArt}`, s).forEach((a, i) => {
        gsap.fromTo(a, { yPercent: i % 2 ? 4 : -4 }, { yPercent: i % 2 ? -4 : 4, ease: "none", scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: true } });
      });
    }, s);
    return () => {
      ScrollTrigger.removeEventListener("refreshInit", setH);
      ctx.revert();
      s.style.height = "";
    };
  }, []);

  return (
    <section ref={sec} id="bo-suu-tap" data-drop className={styles.colSec} aria-labelledby="col-h">
      <div ref={stage} className={styles.colStage}>
        <div className={styles.colHead}>
          <h2 id="col-h" className={styles.colH}>BỘ SƯU TẬP</h2>
          <a href="#lien-he" className={styles.colAll}>Xem tất cả</a>
        </div>
        <ul ref={track} className={styles.colTrack}>
          {PRODUCTS.map((p, i) => (
            <li key={p.name} className={styles.card}>
              <div className={styles.cardFrame}>
                <div className={styles.cardArt}>
                  <Fabric id={`c${i}`} variant={p.v} alt={p.v === "aodai" ? "Cô gái mặc áo dài lụa hồng, ảnh minh hoạ" : `Mẫu ${p.name}`} />
                </div>
                <a className={styles.cardBtn} href="#lien-he">Mua ngay</a>
              </div>
              <h3>{p.name}</h3>
              <p>{p.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
