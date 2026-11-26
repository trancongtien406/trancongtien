"use client";

import { MagneticButton } from "@/features/showroom/effects";
import { COPY } from "../data/copy";
import { OPS } from "../data/ops";
import { getTour } from "../data/tours";
import { pick, vnd } from "../lib/format";
import { calculateTripPrice } from "../lib/pricing";
import styles from "../brand.module.css";
import { useTrip } from "./TripProvider";
import { goToExplorer } from "./nav";

export function Booking({ consultHref }: { consultHref: string }) {
  const { lang, state } = useTrip();
  const t = OPS[lang].book;
  const ex = COPY[lang].explorer;
  const tour = getTour(state.tourId);
  const price = calculateTripPrice(tour, { adults: state.adults, children: state.children, singleRooms: state.singleRooms, includeAdmission: state.includeAdmission });
  return (
    <section id="dat-tour" className={`${styles.section} ${styles.bookSec}`} aria-labelledby="rd-book">
      <div className={styles.wrap}>
        <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
        <h2 id="rd-book" className={styles.h2}>{t.title}</h2>
        <p className={styles.lead} style={{ marginTop: 14 }}>{t.lead}</p>
        <div className={styles.bookGrid}>
          <ol className={styles.steps}>
            {t.steps.map((s, i) => (
              <li key={s.title} className={styles.step} data-rd="step">
                <span className={styles.stepNo} aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className={styles.h3} style={{ fontSize: "1.2rem" }}>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <aside className={styles.summary} aria-label={t.sumTitle} data-testid="booking-summary">
            <h3 className={styles.h3}>{t.sumTitle}</h3>
            <dl className={styles.sumList}>
              <div><dt>{t.sumTour}</dt><dd data-testid="sum-tour">{tour.id} · {pick(tour.name, lang)}</dd></div>
              <div><dt>{ex.depart}</dt><dd>{tour.departure} · {pick(tour.durationLabel, lang)}</dd></div>
              <div><dt>{t.sumGuests}</dt><dd data-testid="sum-guests">{state.adults} {ex.adults.toLowerCase()}{state.children ? `, ${state.children} ${ex.children.toLowerCase()}` : ""}</dd></div>
              <div><dt>{t.sumTotal}</dt><dd className={styles.sumTotal} data-testid="sum-total">{price.ok ? vnd(price.value.displayedTotal) : "-"}</dd></div>
            </dl>
            <p className={styles.small}>{t.sumNote}</p>
            <div className={styles.ctaRow} style={{ marginTop: 6 }}>
              <MagneticButton>
                <a className={`${styles.btn} ${styles.btnRed}`} href={consultHref} data-cta="consult">{t.cta} <span aria-hidden="true">↗</span></a>
              </MagneticButton>
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={goToExplorer}>{t.cta2}</button>
            </div>
            <p className={styles.small}>{t.ctaNote}</p>
            <div className={styles.depositBox}>
              <h4 className={styles.label}>{t.depositTitle}</h4>
              <ul>{t.deposit.map((d) => <li key={d}>{d}</li>)}</ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
