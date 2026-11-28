"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
const B = "/images/demos/giay-thanh-lich/";


const TILES = [
  { k: "l1", t: "Áo khoác dáng dài", p: "2.390.000₫", img: "tile-coat.webp", dots: ["#d9b88f", "#2c2420", "#a9825f"] },
  { k: "l2", t: "Áo len mềm", p: "490.000₫", img: "tile-knit.webp", dots: ["#c9b2a0", "#efe3d0"] },
  { k: "r1", t: "Blazer be cắt ngắn", p: "1.290.000₫", img: "tile-blazer.webp", dots: ["#7d97b3", "#2c2420"] },
  { k: "r2", t: "Túi da quai xách", p: "1.690.000₫", img: "tile-bag.webp", dots: ["#2c2420", "#a9825f"] },
];

/**
 * Cảnh ghim: tủ trưng bày "THANH" -> áo khoác bay phủ màn hình -> người mẫu + chữ khổng lồ THANH LỊCH
 * -> nền kem chuyển, "SANG TRỌNG / CHI TIẾT" với giày trôi lên. Một timeline cuộn.
 */
export function Stage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    const one = (s: string) => el.querySelector<HTMLElement>(s)!;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.dataset.live = "1";
      const vw = window.innerWidth, vh = window.innerHeight;
      const wide = vw >= 800;
      const stage = one("[data-stage]");
      const hero = one("[data-hero]"), eleg = one("[data-eleg]"), lux = one("[data-lux]");
      const coat = one("[data-coat]"), model = one("[data-model]");
      const bigL = q("[data-big] span"), luxL = q("[data-luxt] span");
      const tiles = q("[data-tile]"), heels = q("[data-heel]"), case_ = one("[data-case]"), word = q("[data-word] span");

      gsap.set(stage, { backgroundColor: "#b98a5d" });
      gsap.set([eleg, lux], { autoAlpha: 0 });
      gsap.set(coat, { autoAlpha: 0, x: vw * 0.5, y: -vh * 0.5, rotation: 28, scale: 0.55 });
      gsap.set(model, { autoAlpha: 0, y: vh * 0.12 });
      gsap.set(bigL, { yPercent: 110 });
      gsap.set(luxL, { yPercent: 110 });
      gsap.set(tiles, { autoAlpha: 0, x: (i: number) => (i < 2 ? -vw * 0.12 : vw * 0.12) });
      gsap.set(heels, { autoAlpha: 0, y: vh * 0.7, rotation: (i: number) => (i % 2 ? 24 : -22) });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: one("[data-track]"), start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
      });
      // hero: chữ vào + tủ lơ lửng
      tl.fromTo(word, { yPercent: 0 }, { yPercent: -6, duration: 3, ease: "none" }, 0)
        .to(case_, { y: -vh * 0.04, duration: 3, ease: "none" }, 0)
        // áo khoác bay vào
        .to(coat, { autoAlpha: 1, x: wide ? -vw * 0.08 : 0, y: 0, rotation: 8, scale: wide ? 1.05 : 0.9, duration: 2.2 }, 0.6)
        .to(coat, { x: 0, rotation: 0, scale: 2.0, duration: 1.6 }, 2.8)
        .to(hero, { autoAlpha: 0, duration: 1 }, 3.0)
        // người mẫu + chữ khổng lồ
        .to(eleg, { autoAlpha: 1, duration: 0.2 }, 3.5)
        .to(coat, { autoAlpha: 0, duration: 0.9 }, 3.9)
        .to(model, { autoAlpha: 1, y: 0, duration: 1.2 }, 3.8)
        .to(bigL, { yPercent: 0, duration: 1.1, stagger: 0.07, ease: "power3.out" }, 4.0)
        .to(tiles, { autoAlpha: 1, x: 0, duration: 1, stagger: 0.12, ease: "power3.out" }, 4.8)
        .to(model, { y: -vh * 0.01, scale: 1.04, duration: 2.2, ease: "none" }, 5)
        // sang phần chi tiết
        .to(bigL, { yPercent: -110, duration: 0.9, stagger: 0.04, ease: "power2.in" }, 7.2)
        .to(one("[data-cap]"), { autoAlpha: 0, duration: 0.6 }, 7.2)
        .to(tiles, { autoAlpha: 0, y: -vh * 0.1, duration: 0.8, stagger: 0.05 }, 7.2)
        .to(model, { autoAlpha: 0, x: wide ? -vw * 0.3 : -vw * 0.4, scale: 0.8, duration: 1 }, 7.4)
        .to(stage, { backgroundColor: "#efe5d2", duration: 1.2, ease: "none" }, 7.5)
        .to(eleg, { autoAlpha: 0, duration: 0.3 }, 8.4)
        .to(lux, { autoAlpha: 1, duration: 0.2 }, 8.0)
        .to(luxL, { yPercent: 0, duration: 1.1, stagger: 0.06, ease: "power3.out" }, 8.3)
        .to(heels, { autoAlpha: 1, y: 0, rotation: (i: number) => (i % 2 ? -8 : 10), duration: 1.6, stagger: 0.18, ease: "power3.out" }, 8.6)
        .to(heels, { y: (i: number) => -vh * (0.04 + i * 0.03), duration: 1.6, ease: "none", stagger: 0.1 }, 10.2)
        .to({}, { duration: 0.6 }, 11.8);
      return () => { delete el.dataset.live; };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="dau-trang" className={styles.stageRoot} aria-label="Giới thiệu Giày Thanh Lịch">
      <div className={styles.track} data-track>
        <div className={styles.stage} data-stage>
          <div className={styles.scene} data-hero>
            <div className={styles.heroBody}>
              <div className={styles.heroL}>
                <h1 className={styles.word} data-word><span>THANH</span></h1>
                <p className={styles.sub}>TIỆM THỜI TRANG CỦA PHÁI ĐẸP</p>
                <a className={styles.scrollHint} href="#giay" aria-label="Bắt đầu cuộn, tới bộ sưu tập giày"><svg width="20" height="38" viewBox="0 0 20 38" aria-hidden="true"><path d="M10 1v34M2 27l8 9 8-9" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg><span>BẮT ĐẦU CUỘN</span></a>
              </div>
              <div className={styles.caseW} data-case><img src={B + "showcase.webp"} alt="Giá treo áo khoác và váy tông be trong cửa hàng (ảnh minh hoạ)" width={900} height={1040} fetchPriority="high" /></div>
            </div>
          </div>

          <div className={styles.coat} data-coat aria-hidden="true"><img src={B + "coat-cut.webp"} alt="" width={598} height={1029} /></div>

          <div className={styles.scene} data-eleg>
            <p className={styles.cap} data-cap>MỘT CHÚT VƯỢT THỜI GIAN</p>
            <h2 className={styles.big} data-big aria-label="Thanh lịch"><span>THANH</span> <span>LỊCH</span></h2>
            <div className={styles.model} data-model><img src={B + "model.webp"} alt="Người mẫu mặc áo khoác be dáng dài và giày cao gót (ảnh minh hoạ)" width={601} height={2400} /></div>
            {TILES.map((t, i) => (
              <div key={t.k} className={`${styles.tile} ${styles[t.k]}`} data-tile={i}>
                <div className={styles.tThumb}><img src={B + t.img} alt="" width={420} height={300} loading="lazy" /></div>
                <p className={styles.tName}>{t.t}</p>
                <p className={styles.tPrice}>{t.p}</p>
                <p className={styles.tLbl}>Màu sắc</p>
                <p className={styles.tDots}>{t.dots.map((d) => <i key={d} style={{ background: d }} />)}</p>
                <p className={styles.tSz} aria-label="Kích cỡ"><span>S</span><span>M</span><span>L</span><span>XL</span></p>
              </div>
            ))}
          </div>

          <div className={styles.scene} data-lux>
            <h2 className={styles.luxT} data-luxt aria-label="Chi tiết sang trọng"><span>SANG TRỌNG</span><span>CHI TIẾT</span></h2>
            <p className={styles.luxP}>Đường may tay, da mềm, gót cân bằng: từng chi tiết nhỏ làm nên dáng đi thanh lịch.</p>
            <div className={`${styles.heel} ${styles.hA}`} data-heel><img src={B + "heel-cut.webp"} alt="" width={640} height={540} loading="lazy" /></div>
            <div className={`${styles.heel} ${styles.hB}`} data-heel><img src={B + "heel-cut.webp"} alt="" width={640} height={540} loading="lazy" style={{ transform: "scaleX(-1)" }} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
