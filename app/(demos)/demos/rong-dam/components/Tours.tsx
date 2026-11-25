"use client";

import { COPY } from "../data/copy";
import { TOURS } from "../data/tours";
import { pick, vnd } from "../lib/format";
import styles from "../brand.module.css";
import { Photo } from "./Photo";
import { useTrip } from "./TripProvider";
import { goToExplorer } from "./nav";

export function Tours() {
  const { lang, selectTour } = useTrip();
  const t = COPY[lang].tours;
  return (
    <section id="tours" className={styles.section} aria-labelledby="rd-tours">
      <div className={styles.wrap}>
        <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
        <h2 id="rd-tours" className={styles.h2}>{t.title}</h2>
        <p className={styles.lead} style={{ marginTop: 14 }}>{t.lead}</p>
        <ul className={styles.tourGrid}>
          {TOURS.map((tour) => (
            <li key={tour.id} className={styles.ticket} data-testid="tour-card" data-tour={tour.id} data-rd="ticket">
              <div className={styles.ticketPhoto}>
                <Photo name={tour.photo} size={1200} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 30vw" position={tour.photoPos}
                  alt={lang === "vi" ? `Ảnh tour ${tour.name.vi}` : `Photo of ${tour.name.en}`} />
                <span className={styles.sticker}>{t.badge}</span>
                <span className={styles.ticketId}>{tour.id}</span>
              </div>
              <div className={styles.ticketBody}>
                <div>
                  <h3 className={styles.h3}>{pick(tour.name, lang)}</h3>
                  <p className={styles.small} style={{ marginTop: 4 }}>{pick(tour.subtitle, lang)}</p>
                </div>
                <dl className={styles.ticketMeta}>
                  <div>
                    <dt>{t.depart}</dt>
                    <dd>{tour.departure}</dd>
                  </div>
                  <div>
                    <dt>{t.length}</dt>
                    <dd>{pick(tour.durationLabel, lang)}</dd>
                  </div>
                  <div className={styles.wide}>
                    <dt>{t.pickup}</dt>
                    <dd>{pick(tour.pickup, lang)}</dd>
                  </div>
                </dl>
                <div className={styles.prices}>
                  <div className={styles.priceRow}>
                    <span>{t.from}</span>
                    <span className={styles.price}>
                      {vnd(tour.pricing.adultBase)} <span className={styles.small}>{t.perAdult}</span>
                    </span>
                  </div>
                  <div className={styles.priceRow}>
                    <span>{t.admission}</span>
                    <span style={{ fontWeight: 600 }}>{vnd(tour.pricing.adultAdmission)}</span>
                  </div>
                </div>
                <button type="button" className={`${styles.btn} ${styles.btnYellow}`} onClick={() => { selectTour(tour.id); goToExplorer(); }}>
                  {t.view} <span aria-hidden="true">→</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.note}>{t.priceNote}</p>
      </div>
    </section>
  );
}
