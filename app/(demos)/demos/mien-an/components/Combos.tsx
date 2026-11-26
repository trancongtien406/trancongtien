"use client";

import { COMBOS } from "../data/content";
import { formatVnd } from "../lib/format";
import { useMienAn } from "./Provider";
import styles from "../brand.module.css";

export function Combos() {
  const { choose } = useMienAn();
  return (
    <section id="combo" className={`${styles.section} ${styles.comboSec}`} aria-labelledby="combo-title">
      <div className={styles.container}>
        <div className={styles.comboHead} data-reveal>
          <p className={styles.eyebrow}>Gói combo</p>
          <h2 id="combo-title" className={styles.h2}>
            Làm liền hai liệu trình, <em>tiết kiệm hơn lẻ.</em>
          </h2>
          <p className={styles.lead}>Combo đặt chung một lịch, không phải chờ giữa hai liệu trình. Giá ghi bên dưới là giá tham khảo cho cả gói.</p>
        </div>
        <ul className={styles.comboGrid}>
          {COMBOS.map((c) => (
            <li key={c.id} className={styles.comboCard} data-reveal>
              <p className={styles.ritualId}>{c.id} · {c.minutes}&nbsp;phút</p>
              <h3 className={styles.h3}>{c.name}</h3>
              <p className={styles.comboTag}>{c.tagline}</p>
              <p className={styles.comboWho}>{c.who}</p>
              <p className={styles.comboPrice}>
                <b className={styles.num}>{formatVnd(c.price)}</b>
                <s className={styles.num}>{formatVnd(c.separate)}</s>
              </p>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={() => choose(c.ritualIds[0])}
                aria-label={`Chọn lịch cho combo ${c.name}`}
              >
                Chọn lịch cho combo
              </button>
            </li>
          ))}
        </ul>
        <p className={styles.comboNote}>
          Combo đặt qua một lịch: chọn giờ cho liệu trình đầu tiên của gói và ghi tên combo khi gửi yêu cầu. Combo cần cọc 30% khi giữ lịch.
        </p>
      </div>
    </section>
  );
}
