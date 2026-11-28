"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { addToCart } from "./Nav";
const B = "/images/demos/giay-thanh-lich/";

const SHOES = [
  { id: "sandal", n: "Sandal quai mảnh gót nhọn", pr: 1290000, p: "1.290.000₫", img: "sandal-cut.webp", dots: ["#e8c9a6", "#2c2420", "#f0e3d0"] },
  { id: "heel", n: "Cao gót mũi nhọn da lì", pr: 1590000, p: "1.590.000₫", img: "heel-cut.webp", dots: ["#e9c6a4", "#2c2420"] },
  { id: "boot", n: "Bốt cổ ngắn da mềm", pr: 1890000, p: "1.890.000₫", img: "boot-cut.webp", dots: ["#a9825f", "#2c2420", "#d8b894"] },
  { id: "flat", n: "Búp bê mũi tròn êm chân", pr: 890000, p: "890.000₫", img: "flat-cut.webp", dots: ["#f0e3d0", "#cfa07c"] },
];
const SIZES = ["35", "36", "37", "38", "39", "40"];

/** Giày (người mẫu ngồi + thẻ sản phẩm), dải hoa văn "Đến giờ mua sắm", khối câu chuyện toàn ảnh. */
export function After() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
      const cards = q("[data-card]");
      gsap.fromTo(q("[data-sh-title]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el.querySelector("[data-shoes]"), start: "top 70%", once: true } });
      gsap.fromTo(q("[data-sit]"), { autoAlpha: 0, x: -80 }, { autoAlpha: 1, x: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el.querySelector("[data-shoes]"), start: "top 65%", once: true } });
      gsap.fromTo(cards, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.14, ease: "power3.out", scrollTrigger: { trigger: el.querySelector("[data-grid]"), start: "top 80%", once: true } });
      const band = el.querySelector<HTMLElement>("[data-band]");
      if (band) {
        gsap.fromTo(band, { clipPath: "inset(40% 0 40% 0)" }, { clipPath: "inset(0% 0 0% 0)", ease: "none", scrollTrigger: { trigger: band, start: "top 85%", end: "top 35%", scrub: 0.6 } });
        gsap.fromTo(q("[data-band-bg]"), { backgroundPositionX: "0px" }, { backgroundPositionX: "-240px", ease: "none", scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true } });
      }
      gsap.fromTo(q("[data-story-t]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: el.querySelector("[data-story]"), start: "top 60%", once: true } });
      const cleanups: (() => void)[] = [];
      if (window.matchMedia("(hover: hover)").matches) {
        cards.forEach((c) => {
          const mv = (e: MouseEvent) => { const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; gsap.to(c, { rotationY: x * 12, rotationX: -y * 10, duration: 0.4, ease: "power2.out", transformPerspective: 700 }); };
          const lv = () => gsap.to(c, { rotationX: 0, rotationY: 0, duration: 0.5 });
          c.addEventListener("mousemove", mv); c.addEventListener("mouseleave", lv);
          cleanups.push(() => { c.removeEventListener("mousemove", mv); c.removeEventListener("mouseleave", lv); });
        });
      }
      return () => cleanups.forEach((f) => f());
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root}>
      <section className={styles.shoes} id="giay" data-shoes>
        <div className={styles.shHead} data-sh-title>
          <h2 className={styles.shTitle}>Giày</h2>
          <p className={styles.shSub}>Vẻ đẹp của việc là chính mình.</p>
        </div>
        <div className={styles.shBody}>
          <div className={styles.sit} data-sit><img src={B + "sit.webp"} alt="Người mẫu mặc áo khoác be ngồi trên ghế bành, chân mang cao gót (ảnh minh hoạ)" width={1000} height={1300} loading="lazy" /></div>
          <ul className={styles.grid} data-grid>
            {SHOES.map((s) => (
              <li key={s.n} className={styles.card} data-card>
                <div className={styles.cArt}><img src={B + s.img} alt={s.n} width={640} height={520} loading="lazy" /></div>
                <h3>{s.n}</h3>
                <p className={styles.cMeta}>Màu sắc</p>
                <span className={styles.cDots}>{s.dots.map((d) => <i key={d} style={{ background: d }} />)}</span>
                <p className={styles.cMeta}>Kích cỡ</p>
                <p className={styles.cSizes}>{SIZES.map((z) => <span key={z}>{z}</span>)}</p>
                <div className={styles.cBuy}><b>{s.p}</b><button type="button" onClick={() => addToCart(s.id, s.n, s.pr)} aria-label={`Thêm ${s.n} vào giỏ`}>Thêm vào giỏ</button></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.bandWrap} id="khuyen-mai" aria-label="Ưu đãi">
        <div className={styles.band} data-band>
          <div className={styles.bandBg} data-band-bg />
          <a className={styles.pill} href="#bo-suu-tap"><svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true"><path d="M2 5h12l1 12H1zM5 7V4a3 3 0 016 0v3" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg> Đến giờ mua sắm rồi!</a>
        </div>
      </section>

      <section className={styles.story} id="cau-chuyen" data-story>
        <div className={styles.storyImg}><img src={B + "floor.webp"} alt="Người mẫu ngồi trên sàn studio, chân mang giày cao gót quai mảnh (ảnh minh hoạ)" width={1500} height={1500} loading="lazy" /></div>
        <div className={styles.storyTxt}>
          <p className={styles.storyLogo} data-story-t>THANH<br /><small>TIỆM THỜI TRANG CỦA PHÁI ĐẸP</small></p>
          <p className={styles.storyP} data-story-t>Một đôi cao gót nude nhẹ nhàng hạ xuống từ đầu khung hình, thong thả và duyên dáng. Ban đầu chỉ có đôi giày, rồi người phụ nữ hiện ra, rất tự nhiên, chân cô chạm xuống đúng nhịp, như thể đôi giày đã luôn thuộc về cô.</p>
          <p className={styles.storyP} data-story-t>Đó cũng là cách chúng tôi làm giày: để dáng đi thanh lịch đến một cách tự nhiên, chứ không gồng lên.</p>
        </div>
        <p className={styles.rights}>MỌI QUYỀN ĐƯỢC BẢO LƯU</p>
      </section>
    </div>
  );
}
