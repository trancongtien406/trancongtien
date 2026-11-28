"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { Editor } from "./Editor";
import { Poster } from "./Poster";

gsap.registerPlugin(ScrollTrigger);

const ITEMS: [string, string][] = [
  ["Thay phương tiện", "Thả ảnh hoặc video của bạn vào. Chuyển động giữ nguyên như cũ."],
  ["Thêm chữ", "Tiêu đề hoặc logo bằng hơn 1.900 phông chữ, có hiệu ứng vào và ra."],
  ["Đổi nền", "Một màu đặc, chuyển sắc hoặc ảnh của riêng bạn phía sau các poster."],
  ["Xếp các cảnh", "Nối nhiều mẫu thành một đoạn phim, ghép bằng mười kiểu chuyển cảnh."],
];
const SW = ["#0f0f10", "#ebe6d9", "#6b3fc4", "#c51529"];
const SW_N = ["Đen", "Kem", "Tím", "Đỏ"];

export function Walker() {
  const root = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [s, setS] = useState(0);
  const [sw, setSw] = useState(3);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mq = window.matchMedia("(min-width: 900px)");
    const on = () => setPinned(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const st = ScrollTrigger.create({
      trigger: root.current, start: "top top", end: () => "+=" + window.innerHeight * 0.6 * 5, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: (self) => setS(Math.min(4, Math.floor(self.progress * 5))),
    });
    stRef.current = st;
    return () => { st.kill(); stRef.current = null; };
  }, [pinned]);

  const pick = (i: number) => {
    const st = stRef.current;
    if (st) window.scrollTo({ top: st.start + ((i + 0.5) / 5) * (st.end - st.start), behavior: "smooth" });
    else setS(i);
  };
  const cardState = s === 1 ? "type" : s === 2 ? "bg" : "edit";

  return (
    <section ref={root} id="tm-features" className={`${styles.walk} ${pinned ? styles.walkPinned : ""}`} aria-labelledby="tm-h-walk">
      <h2 id="tm-h-walk" className={styles.srOnly}>Bốn bước dựng một đoạn chuyển động</h2>
      <div className={styles.wCard} data-state={cardState}>
        <div className={`${styles.wLayer} ${cardState === "edit" ? styles.wOn : ""}`}><Editor shots={s >= 3 ? 3 : 1} ring={s >= 3} toast={s === 4} /></div>
        <div className={`${styles.wLayer} ${styles.wPrev} ${cardState !== "edit" ? styles.wOn : ""}`} style={{ ["--bg" as string]: cardState === "bg" ? SW[sw] : "#0a0a0b" }}>
          <div className={styles.wTrack}>
            <div className={styles.wSide}><Poster v={1} flat /></div>
            <div className={styles.wMain} data-t={cardState === "type" ? 1 : 0}><Poster v={cardState === "bg" ? 6 : 4} flat /><b>Mùa mới</b></div>
            <div className={styles.wSide}><Poster v={3} flat /></div>
          </div>
        </div>
      </div>
      <div className={`${styles.wList} ${s === 4 ? styles.wHide : ""}`}>
        <i className={styles.wRuler} aria-hidden="true" />
        <ol>
          {ITEMS.map(([t, d], i) => (
            <li key={t} className={s === i ? styles.wActive : ""}>
              <button type="button" onClick={() => pick(i)} aria-current={s === i ? "step" : undefined}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                <b>{t}</b>
                <span>{d}</span>
              </button>
              {i === 2 && (
                <div className={styles.swatches} role="group" aria-label="Màu nền">
                  {SW.map((c, k) => <button key={c} type="button" aria-label={SW_N[k]} aria-pressed={sw === k} onClick={() => { setSw(k); if (s !== 2) pick(2); }} style={{ background: c }} />)}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
      <h3 className={`${styles.wStart} ${s === 4 ? styles.wShow : ""}`}><span>→ Bắt đầu từ</span><span>thứ đã</span><span>hoàn chỉnh</span></h3>
    </section>
  );
}
