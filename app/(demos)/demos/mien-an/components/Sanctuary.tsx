"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SANCTUARY, SPACE_FACTS } from "../data/content";
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
        <button type="button" className={styles.sanBtn} onClick={() => setIdx(i)} aria-label={`Phóng to ảnh: ${s.caption}`} data-san-btn data-ripple>
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
          <p className={styles.eyebrow}>Không gian</p>
          <h2 id="san-title" className={styles.h2}>
            Hai phòng trị liệu và <em>một khu đón khách.</em>
          </h2>
          <p className={styles.lead}>Tường vữa màu kem, cửa sổ rèm gỗ, ánh sáng ấm chỉnh được. Bấm vào ảnh để xem lớn hơn.</p>
        </div>
        <div className={styles.sanGrid}>
          {fig(0, styles.sanMain)}
          <div className={styles.sanSmRow}>
            {fig(1, styles.sanSm)}
            {fig(2, styles.sanSm)}
          </div>
        </div>
        <dl className={styles.spaceFacts} data-reveal>
          {SPACE_FACTS.map((f) => (
            <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
          ))}
        </dl>
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
