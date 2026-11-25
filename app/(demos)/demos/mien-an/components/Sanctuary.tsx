"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SANCTUARY } from "../data/content";
import { Close } from "./Icons";
import styles from "../brand.module.css";

export function Sanctuary() {
  const [idx, setIdx] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const last = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (idx !== null && !d.open) {
      last.current = document.activeElement as HTMLElement | null;
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (idx === null && d.open) d.close();
  }, [idx]);

  const go = (dir: 1 | -1) => setIdx((i) => (i === null ? i : (i + dir + SANCTUARY.length) % SANCTUARY.length));
  const cur = idx !== null ? SANCTUARY[idx] : null;

  const fig = (i: number, cls: string) => {
    const s = SANCTUARY[i];
    return (
      <figure className={`${styles.sanFig} ${cls}`} data-san>
        <button type="button" className={styles.sanBtn} onClick={() => setIdx(i)} aria-label={`Phóng to ảnh: ${s.caption}`} data-san-btn>
          <Image src={`/images/demos/mien-an/ma-${s.key}-1200.webp`} alt={s.alt} fill={false} width={1200} height={1600} sizes="(min-width: 1024px) 700px, 92vw" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </button>
        <figcaption>{s.caption}</figcaption>
      </figure>
    );
  };

  return (
    <section id="sanctuary" className={`${styles.section} ${styles.linen}`} aria-labelledby="san-title">
      <div className={styles.container}>
        <div className={styles.sanHead} data-reveal>
          <p className={styles.eyebrow}>The sanctuary</p>
          <h2 id="san-title" className={styles.h2}>
            Không gian của những <em>điều dịu nhẹ.</em>
          </h2>
          <p className={styles.lead}>Ánh sáng tự nhiên, chất liệu mộc mạc và những sắc màu lấy cảm hứng từ thiên nhiên. Một không gian được tạo nên để mọi giác quan có thể chậm lại.</p>
        </div>
        <div className={styles.sanGrid}>
          {fig(0, styles.sanMain)}
          <div className={styles.sanSmRow}>
            {fig(1, styles.sanSm)}
            {fig(2, styles.sanSm)}
          </div>
        </div>
      </div>

      <dialog
        ref={dlg}
        className={`${styles.dialog} ${styles.lightbox}`}
        aria-label="Xem ảnh không gian"
        onClose={() => {
          document.documentElement.style.overflow = "";
          setIdx(null);
          last.current?.focus?.();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onClick={(e) => {
          if (e.target === dlg.current) dlg.current?.close();
        }}
      >
        {cur && (
          <>
            <button type="button" className={styles.dialogClose} onClick={() => dlg.current?.close()} aria-label="Đóng">
              <Close />
            </button>
            <div className={styles.lbStage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/demos/mien-an/ma-${cur.key}-2000.webp`} alt={cur.alt} width={1200} height={1600} />
            </div>
            <div className={styles.lbBar}>
              <span aria-live="polite">{cur.caption}</span>
              <span className={styles.lbBtns}>
                <button type="button" className={styles.lbBtn} onClick={() => go(-1)} aria-label="Ảnh trước">←</button>
                <button type="button" className={styles.lbBtn} onClick={() => go(1)} aria-label="Ảnh sau">→</button>
              </span>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
