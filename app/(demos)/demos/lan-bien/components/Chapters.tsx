"use client";

import { Counter, SplitWords, StickyChapters } from "@/features/showroom/effects";
import { CHAPTERS, type Chapter } from "../data/content";
import { Photo } from "./Photo";
import { WaterImage } from "./WaterImage";
import styles from "../brand.module.css";

function Text({ c, i }: { c: Chapter; i: number }) {
  const prev = i === 0 ? 0 : CHAPTERS[i - 1].depth;
  return (
    <article className={styles.chText} data-depth={c.depth} data-depth-name={`Chương ${c.n} · ${c.label}`} aria-labelledby={`ch-${c.id}`}>
      <p className={styles.chMeta}>
        <span>Chương {c.n} / 05</span>
        <span className={styles.chBadge} aria-label={`Độ sâu ${c.depth} mét`}>
          <Counter value={c.depth} from={prev} duration={1.2} className={styles.chNum} />
          <small>m</small>
        </span>
      </p>
      <h3 id={`ch-${c.id}`} className={styles.chTitle}>
        <SplitWords as="span" duration={0.9} stagger={0.06}>{c.title}</SplitWords>
      </h3>
      <p className={styles.chLead}>{c.lead}</p>
      <dl className={styles.chFacts}>
        <div><dt>Hệ sinh thái</dt><dd>{c.eco}</dd></div>
        <div><dt>Trải nghiệm</dt><dd>{c.exp}</dd></div>
      </dl>
      <a className={styles.link} href={c.href}>{c.cta}<span aria-hidden="true">→</span></a>
    </article>
  );
}

function Visual({ c }: { c: Chapter }) {
  return (
    <div className={styles.chVisual}>
      <figure className={styles.chFrame} data-cursor="Lặn">
        <WaterImage className={styles.chWater} hover={9} scrollPeak={14} fx="water-chapter">
          <Photo file={c.img} alt={c.alt} sizes="(max-width: 900px) 92vw, 46vw" pos={c.pos} w={1200} />
        </WaterImage>
        <i className={`${styles.corner} ${styles.cTL}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.cTR}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.cBL}`} aria-hidden="true" />
        <i className={`${styles.corner} ${styles.cBR}`} aria-hidden="true" />
        <figcaption className={styles.chCaption} aria-hidden="true"><b>{String(c.depth).padStart(2, "0")}</b> m · {c.label}</figcaption>
      </figure>
    </div>
  );
}

export function Chapters() {
  return (
    <section id="chuong" className={styles.chapters} aria-label="Năm tầng sinh thái từ mặt biển xuống vùng nước sâu" data-depth-end="">
      <StickyChapters
        chapters={CHAPTERS.map((c, i) => ({ id: c.id, content: <Text c={c} i={i} />, visual: <Visual c={c} /> }))}
        columns="minmax(0,1fr) minmax(0,1fr)"
        stickyTop="0px"
        breakpoint={900}
        visualRight
        className={styles.chGrid}
      />
      <p className={styles.chNote}>Các mốc độ sâu trong trang chỉ để kể câu chuyện từng tầng sinh thái. Chúng không phải khuyến nghị độ sâu cho người mới, và điều kiện thực tế phụ thuộc địa điểm, thời tiết, địa hình và môi trường biển.</p>
    </section>
  );
}
