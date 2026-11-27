"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { Vessel, type Kind } from "./Vessel";

export const WARES: { n: string; kind: Kind; base: string; glaze: string; dip: number; glazeName: string; d: string }[] = [
  { n: "Bình Nhụy", kind: "vase", base: "#A64B32", glaze: "#E9D5B9", dip: 34, glazeName: "men tro trắng ngà", d: "Bình bầu cắm cành khô, thân đất nung để mộc, miệng nhúng men tro." },
  { n: "Bát Cơm Nhà", kind: "bowl", base: "#8f3f2a", glaze: "#C9A47E", dip: 38, glazeName: "men nâu mật", d: "Bát vừa lòng tay, chân đế cao để cầm không nóng." },
  { n: "Chén Trà Sương", kind: "cup", base: "#d7bf9b", glaze: "#8a9a7b", dip: 44, glazeName: "men xanh rêu", d: "Thành mỏng, miệng loe nhẹ, giữ hương trà lâu." },
  { n: "Đĩa Lửa", kind: "plate", base: "#41352E", glaze: "#A64B32", dip: 22, glazeName: "men đồng gỉ", d: "Đĩa nông đựng bánh trái, lòng đĩa có vết lửa liếm tự nhiên." },
  { n: "Lọ Cao Khói", kind: "jar", base: "#6b5648", glaze: "#E9D5B9", dip: 50, glazeName: "men khói", d: "Lọ đựng gia vị hoặc cắm hoa, nắp gỗ đi kèm theo mẻ." },
  { n: "Ấm Gió Chiều", kind: "teapot", base: "#A64B32", glaze: "#41352E", dip: 30, glazeName: "men nâu sẫm", d: "Ấm dung tích vừa cho hai đến ba người, vòi rót gọn." },
  { n: "Cốc Than Hồng", kind: "mug", base: "#c46d4e", glaze: "#E9D5B9", dip: 40, glazeName: "men kem", d: "Cốc uống cà phê buổi sáng, quai ôm vừa ngón tay cái." },
  { n: "Chai Đất Đỏ", kind: "bottle", base: "#8f3f2a", glaze: "#d7bf9b", dip: 70, glazeName: "men mộc", d: "Chai đựng nước hoặc dầu ăn, bụng tròn, cổ thon." },
];
const N = WARES.length;
const STEP = 360 / N;

export function Showcase() {
  const root = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const trig = useRef<ScrollTrigger | null>(null);
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  const reduced = useRef(false);

  const apply = useCallback((rot: number) => {
    const r = ring.current;
    if (!r) return;
    gsap.set(r, { rotationY: rot });
    r.querySelectorAll<HTMLElement>("[data-item]").forEach((el, i) => {
      let a = (((i * STEP + rot) % 360) + 540) % 360 - 180;
      a = (a * Math.PI) / 180;
      el.style.setProperty("--f", String(Math.max(0, Math.cos(a)).toFixed(3)));
    });
    const k = ((Math.round(-rot / STEP) % N) + N) % N;
    if (k !== idxRef.current) { idxRef.current = k; setIdx(k); }
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      apply(0);
      if (reduced.current) return;
      el.setAttribute("data-pinned", "1");
      trig.current = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=420%",
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        snap: { snapTo: 1 / (N - 1), duration: { min: 0.25, max: 0.6 }, ease: "power2.inOut" },
        onUpdate: (self) => apply(-self.progress * (N - 1) * STEP),
      });
    }, el);
    return () => { trig.current = null; ctx.revert(); };
  }, [apply]);

  const go = (i: number) => {
    const k = ((i % N) + N) % N;
    const t = trig.current;
    if (t) {
      window.scrollTo({ top: t.start + (t.end - t.start) * (k / (N - 1)), behavior: "smooth" });
    } else {
      apply(-k * STEP);
    }
  };

  const w = WARES[idx];
  return (
    <section ref={root} className={styles.showcase} id="trung-bay" aria-labelledby="tb-h">
      <div className={styles.showBg} aria-hidden="true"><span>GỐM</span></div>
      <h2 id="tb-h" className={styles.showTitle}>Vòng trưng bày</h2>
      <div className={styles.scene} aria-hidden="true">
        <div ref={ring} className={styles.ring}>
          {WARES.map((v, i) => (
            <div key={v.n} data-item className={styles.item} style={{ ["--i" as string]: i, ["--f" as string]: Math.max(0, Math.cos((i * STEP * Math.PI) / 180)).toFixed(3) }}>
              <Vessel kind={v.kind} base={v.base} glaze={v.glaze} dip={v.dip} id={`s${i}`} />
            </div>
          ))}
        </div>
        <div className={styles.floor} />
      </div>
      <div className={styles.info}>
        <p className={styles.infoNo}>{String(idx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</p>
        <h3 aria-live="polite">{w.n}</h3>
        <p className={styles.infoGlaze}>{w.glazeName}</p>
        <p>{w.d}</p>
      </div>
      <div className={styles.ctrl}>
        <button type="button" onClick={() => go(idx - 1)} aria-label="Món trước" className={styles.ctrlBtn}>←</button>
        <button type="button" onClick={() => go(idx + 1)} aria-label="Món tiếp theo" className={styles.ctrlBtn}>→</button>
      </div>
      <p className={styles.hintScroll} aria-hidden="true">Cuộn để xoay vòng</p>
    </section>
  );
}
