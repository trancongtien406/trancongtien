"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { BEANS } from "../data/beans";
import { formatVnd } from "../data/menu";
import { Photo } from "./Photo";

const Meter = ({ label, v }: { label: string; v: number }) => (
  <div className={styles.meter}><span>{label}</span><span className={styles.bar} role="img" aria-label={`${v} trên 5`}>{[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= v ? styles.on : ""} />)}</span></div>
);

export function Beans() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="hat-ca-phe" className={`${styles.section} ${styles.beansSection}`} aria-labelledby="rn-beans-h">
      <div className={styles.wrap}>
        <div className={styles.sectionHead} data-rn-reveal>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>03 / HẠT RANG MANG VỀ</span>
            <h2 id="rn-beans-h" className={`${styles.display} ${styles.h2}`}>Mỗi hạt, một cá tính.</h2>
          </div>
          <div>
            <p className={styles.lead}>Ba loại hạt rang tại quán, bán theo túi 250g và xay theo cách pha của bạn. Từ đậm đà quen thuộc đến thanh sáng và nhiều tầng hương.</p>
            <p className={styles.helper}>Giá tham khảo cho túi hạt 250g, mua tại quán.</p>
          </div>
        </div>
        <ul className={styles.beanGrid}>
          {BEANS.map((b) => (
            <li key={b.id} className={styles.bean} data-rn-reveal>
              <div className={`${styles.beanCode} ${styles[`tone-${b.tone}`]}`}>{b.code}</div>
              <div className={styles.beanPhoto}><Photo name={b.image} alt={b.alt} sizes="(max-width: 1100px) 90vw, 33vw" size={1200} /></div>
              <div className={styles.beanBody}>
                <h3 className={styles.beanName}>{b.name}</h3>
                <p className={styles.beanNotes}>{b.notes}</p>
                <p>{b.desc}</p>
                <Meter label="Độ đậm" v={b.body} />
                <Meter label="Độ chua" v={b.acidity} />
                <dl className={styles.spec}>
                  <div><dt>{b.id} · Loại hạt</dt><dd>{b.type}</dd></div>
                  <div><dt>Vùng</dt><dd>{b.region}</dd></div>
                  <div><dt>Mức rang</dt><dd>{b.roast}</dd></div>
                  <div><dt>Cách pha</dt><dd>{b.brew}</dd></div>
                </dl>
                <p className={styles.beanPrice}>{formatVnd(b.priceVnd)} <span style={{ fontSize: 13, fontWeight: 500 }}>/ {b.weight}, giá tham khảo</span></p>
                <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} aria-expanded={open === b.id} aria-controls={`rn-how-${b.id}`} onClick={() => setOpen(open === b.id ? null : b.id)}>Xem cách pha</button>
                {open === b.id && <p id={`rn-how-${b.id}`} className={styles.howto}>{b.howTo}</p>}
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.beanNote}>Hồ sơ hạt và hương vị mô tả theo cảm nhận khi nếm. Mua hạt trực tiếp tại quán, hoặc <a href="#ban-buon">đăng ký bán buôn</a>. Chưa biết chọn loại nào? <a href="#tim-gu">Tìm loại hạt hợp gu</a>.</p>
      </div>
    </section>
  );
}
