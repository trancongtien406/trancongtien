import styles from "../brand.module.css";
import { ACCESS, ITINERARY, RULES, WEATHER } from "../data/content";
import { Ignite } from "./Ignite";

/** Lịch trình mẫu 2 ngày 1 đêm: hai cột, mỗi mốc một dòng. */
export function Itinerary() {
  return (
    <section id="lich-trinh" className={`${styles.section} ${styles.itin}`} aria-labelledby="itin-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.eyebrow}>Lịch trình mẫu 2 ngày 1 đêm</p>
          <h2 id="itin-title" className={styles.h2}><Ignite as="span">Một cuối tuần ở Rừng Thức.</Ignite></h2>
          <p className={styles.lead}>Đây là lịch gợi ý cho nhóm chọn BBQ và trekking nhẹ. Giờ có thể đổi theo thời tiết và nhóm của bạn.</p>
        </header>
        <div className={styles.itinGrid}>
          {ITINERARY.map((d) => (
            <article key={d.day} className={styles.itinDay}>
              <p className={styles.itinTag}>{d.day}</p>
              <h3 className={styles.h3}>{d.title}</h3>
              <ol className={styles.itinList}>
                {d.slots.map(([t, x]) => (
                  <li key={t}><time>{t}</time><span>{x}</span></li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Quy định check-in/out, đặt cọc, huỷ; cách đến; mùa và thời tiết. */
export function Practical() {
  return (
    <section id="quy-dinh" className={`${styles.section} ${styles.practical}`} aria-labelledby="rules-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.eyebrow}>Quy định, cách đến và mùa</p>
          <h2 id="rules-title" className={styles.h2}><Ignite as="span">Những điều cần biết trước khi đặt.</Ignite></h2>
        </header>
        <div className={styles.pracGrid}>
          <div>
            <h3 className={styles.h3}>Nhận lều, đặt cọc, huỷ</h3>
            <dl className={styles.dl}>{RULES.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </div>
          <div>
            <h3 className={styles.h3}>Cách đến</h3>
            <dl className={styles.dl}>{ACCESS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <h3 className={styles.h3} style={{ marginTop: 36 }}>Mùa và thời tiết</h3>
            <dl className={styles.dl}>{WEATHER.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </div>
        </div>
      </div>
    </section>
  );
}
