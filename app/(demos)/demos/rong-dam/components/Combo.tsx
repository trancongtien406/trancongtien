import { PinnedHorizontalScroll } from "@/features/showroom/effects";
import { OPS } from "../data/ops";
import { PLACES, TOURS, type Lang } from "../data/tours";
import { pick, vnd } from "../lib/format";
import styles from "../brand.module.css";

/** Combo 3 ngày 2 đêm: kéo cuộn dọc thành chuyển động ngang qua từng ngày (PinnedHorizontalScroll). */
export function Combo({ lang }: { lang: Lang }) {
  const t = OPS[lang].combo;
  const tour = TOURS.find((x) => x.id === "RD-06")!;
  return (
    <div id="combo" className={styles.comboSec}>
      <div className={`${styles.wrap} ${styles.comboHead}`}>
        <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
        <h2 className={styles.h2}>{t.title}</h2>
        <p className={styles.lead} style={{ marginTop: 14 }}>{t.lead}</p>
      </div>
      <PinnedHorizontalScroll className={styles.comboPin} trackClassName={styles.comboTrack} label={t.region} scrollFactor={0.9}>
        <article className={`${styles.dayCard} ${styles.dayIntro}`}>
          <span className={styles.dayNo} aria-hidden="true">RD-06</span>
          <h3 className={styles.h3}>{pick(tour.name, lang)}</h3>
          <p className={styles.dayPrice}>{vnd(tour.pricing.adultBase)} <span className={styles.small}>{lang === "vi" ? "/ người lớn" : "/ adult"}</span></p>
          <p>{t.intro}</p>
          <h4 className={styles.label}>{t.incl}</h4>
          <ul className={styles.tick}>{tour.included.map((x) => <li key={x.vi}>{pick(x, lang)}</li>)}</ul>
          <p className={styles.small}>{t.hint}</p>
        </article>
        {tour.days.map((d, i) => (
          <article key={d.id} className={styles.dayCard} data-testid="combo-day">
            <span className={styles.dayNo} aria-hidden="true">0{i + 1}</span>
            <h3 className={styles.h3}>{t.day} {i + 1}: {pick(d.title, lang)}</h3>
            <ol className={styles.dayStops}>
              {d.stops.map((s) => (
                <li key={s.id}>
                  <b>{s.time}</b>
                  <span>{pick(s.label, lang)}</span>
                  <em>{PLACES[s.place].name[lang]}</em>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </PinnedHorizontalScroll>
    </div>
  );
}
