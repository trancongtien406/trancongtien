"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import styles from "../brand.module.css";
import { Art, PHOTOS } from "./Art";

gsap.registerPlugin(Flip);

/** Hiệu ứng chủ đạo: GSAP Flip đưa thumbnail thành khung ảnh toàn màn hình kiểu tạp chí, chính phần tử ảnh được biến hình (không nhân bản). */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const imgs = useRef<(HTMLDivElement | null)[]>([]);
  const snap = useRef<Flip.FlipState | null>(null);
  const veil = useRef<HTMLDivElement>(null);
  const info = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const last = useRef<number | null>(null);

  const go = useCallback((next: number | null, from: number | null) => {
    const els = [from, next].filter((n): n is number => n !== null).map((n) => imgs.current[n]).filter(Boolean) as HTMLElement[];
    snap.current = Flip.getState(els);
    if (from !== null) last.current = from;
    setOpen(next);
  }, []);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = snap.current;
    snap.current = null;
    if (st) Flip.from(st, { duration: reduce ? 0 : 0.95, ease: "expo.inOut", scale: false, zIndex: 80, overwrite: true });
    if (veil.current && (st || open !== null)) gsap.to(veil.current, { autoAlpha: open !== null ? 1 : 0, duration: reduce ? 0 : 0.7, ease: "power2.out", overwrite: true });
    if (open !== null) {
      if (info.current && !reduce) gsap.fromTo(info.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.45, ease: "power3.out" });
    }
  }, [open]);

  useEffect(() => {
    if (open === null) {
      document.body.style.overflow = "";
      if (last.current !== null) { const i = last.current; requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-hit="${i}"]`)?.focus({ preventScroll: true })); }
      return;
    }
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const n = PHOTOS.length;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") go(null, open);
      else if (e.key === "ArrowRight") go((open + 1) % n, open);
      else if (e.key === "ArrowLeft") go((open - 1 + n) % n, open);
    };
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [open, go]);

  const n = PHOTOS.length;
  const cur = open !== null ? PHOTOS[open] : null;
  return (
    <>
      <ul className={styles.grid}>
        {PHOTOS.map((p, i) => (
          <li key={p.t} className={styles.cell}>
            <div className={styles.slot} style={{ aspectRatio: p.a }}>
              <div ref={(el) => { imgs.current[i] = el; }} className={`${styles.img} ${open === i ? styles.imgOpen : ""}`} data-flip-id={`ph${i}`}>
                <Art i={i} />
                {open !== i && (
                  <button type="button" className={styles.hit} data-hit={i} aria-label={`Mở ảnh: ${p.t}`} onClick={() => go(i, open)}>
                    <span className={styles.hitTag}>{String(i + 1).padStart(2, "0")} · Xem</span>
                  </button>
                )}
              </div>
            </div>
            <p className={styles.cap}><span>{p.t}</span><span>{p.y}</span></p>
          </li>
        ))}
      </ul>
      <div ref={veil} className={styles.veil} aria-hidden="true" style={{ opacity: 0, visibility: "hidden" }} />
      {cur && open !== null && (
        <aside ref={info} className={styles.info} role="dialog" aria-modal="true" aria-label={`Ảnh ${open + 1} trên ${n}: ${cur.t}`}>
          <p className={styles.idx}>{String(open + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</p>
          <h3 className={styles.infoT}>{cur.t}</h3>
          <dl className={styles.exif}>
            <div><dt>Năm</dt><dd>{cur.y}</dd></div>
            <div><dt>Địa điểm</dt><dd>{cur.p}</dd></div>
            <div><dt>Chất liệu</dt><dd>Ảnh vẽ SVG (minh hoạ)</dd></div>
          </dl>
          <p className={styles.infoD}>{cur.d}</p>
          <div className={styles.ctrls}>
            <button type="button" onClick={() => go((open - 1 + n) % n, open)}>← Trước</button>
            <button type="button" onClick={() => go((open + 1) % n, open)}>Sau →</button>
            <button type="button" ref={closeBtn} onClick={() => go(null, open)}>Đóng</button>
          </div>
        </aside>
      )}
    </>
  );
}
