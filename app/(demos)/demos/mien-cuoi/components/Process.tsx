"use client";

import { StickyChapters } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { PROCESS } from "../data/content";

/** Quy trình khám: timeline nhẹ, cột trái là các bước, cột phải là thẻ chi tiết đổi theo bước đang đọc. */
export function Process() {
  const chapters = PROCESS.map((p) => ({
    id: `buoc-${p.n}`,
    content: (
      <div className={styles.stepRow}>
        <span className={styles.stepDot} aria-hidden="true" />
        <p className={styles.stepNum}>Bước {p.n} · {p.time}</p>
        <h3 className={styles.h3}>{p.title}</h3>
        <p className={styles.bodySm}>{p.clinic}</p>
      </div>
    ),
    visual: (
      <div className={styles.stepCard}>
        <span className={styles.stepBig}>{p.n}</span>
        <p className={styles.stepWho}>{p.who} · {p.time}</p>
        <h4 className={styles.h4}>{p.title}</h4>
        <p className={styles.stepLab}>Bạn</p>
        <p className={styles.bodySm}>{p.you}</p>
        <p className={`${styles.stepLab} ${styles.stepClinic}`}>Phòng khám</p>
        <p className={`${styles.bodySm} ${styles.stepClinic}`}>{p.clinic}</p>
      </div>
    ),
  }));
  return (
    <div className={styles.procWrap}>
      <StickyChapters chapters={chapters} breakpoint={900} columns="minmax(0,6fr) minmax(0,5fr)" stickyTop="72px" visualRight className={styles.procRoot} chapterClassName={styles.procChap} visualClassName={styles.procVis} />
    </div>
  );
}
