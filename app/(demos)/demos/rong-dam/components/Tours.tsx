"use client";

import { useState } from "react";
import { COPY } from "../data/copy";
import { OPS } from "../data/ops";
import { TOURS, type Tour } from "../data/tours";
import { pick, vnd } from "../lib/format";
import { calculateTripPrice } from "../lib/pricing";
import styles from "../brand.module.css";
import { Photo } from "./Photo";
import { useTrip } from "./TripProvider";
import { goToExplorer } from "./nav";

/** Vé tour lật hai mặt: mặt trước là giá + giờ, mặt sau là bao gồm / chưa bao gồm / chính sách huỷ. */
function TicketCard({ tour }: { tour: Tour }) {
  const { lang, selectTour } = useTrip();
  const t = COPY[lang].tours;
  const c = COPY[lang].tourCard;
  const [back, setBack] = useState(false);
  const bodyId = `rd-back-${tour.id}`;
  return (
    <li className={styles.ticketWrap} data-testid="tour-card" data-tour={tour.id} data-rd="ticket" data-flipped={back ? "1" : "0"}>
      <div className={styles.flipInner}>
        <div className={`${styles.ticket} ${styles.faceFront}`} inert={back} aria-label={c.front}>
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
            <div className={styles.ticketActions}>
              <button type="button" className={`${styles.btn} ${styles.btnYellow}`} onClick={() => { selectTour(tour.id); goToExplorer(); }}>
                {t.view} <span aria-hidden="true">→</span>
              </button>
              <button type="button" className={styles.flipBtn} aria-expanded={back} aria-controls={bodyId} onClick={() => setBack(true)} data-testid="flip-open">
                {c.flip} <span aria-hidden="true">↻</span>
              </button>
            </div>
          </div>
        </div>

        <div id={bodyId} className={`${styles.ticket} ${styles.faceBack}`} inert={!back} aria-label={c.back}>
          <div className={styles.backHead}>
            <span className={styles.ticketId} style={{ position: "static" }}>{tour.id}</span>
            <h3 className={styles.h3}>{pick(tour.name, lang)}</h3>
          </div>
          <div className={styles.backCols}>
            <div>
              <h4 className={styles.label}>{c.incl}</h4>
              <ul className={styles.tick}>{tour.included.map((x) => <li key={x.vi}>{pick(x, lang)}</li>)}</ul>
            </div>
            <div>
              <h4 className={styles.label}>{c.excl}</h4>
              <ul className={styles.cross}>{tour.excluded.map((x) => <li key={x.vi}>{pick(x, lang)}</li>)}</ul>
            </div>
          </div>
          <p className={styles.backPolicy}>
            <b>{c.cancelLabel}:</b> {tour.cancel === "A" ? c.policyA : c.policyB}
          </p>
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setBack(false)} data-testid="flip-close">
            <span aria-hidden="true">↺</span> {c.flipBack}
          </button>
        </div>
      </div>
    </li>
  );
}

const GROUPS = [1, 2, 4, 6, 10];

function PriceTable() {
  const { lang } = useTrip();
  const t = OPS[lang].price;
  const [adm, setAdm] = useState(false);
  return (
    <div className={styles.priceTable} data-testid="price-table">
      <div className={styles.ptHead}>
        <div>
          <h3 className={styles.h3}>{t.title}</h3>
          <p className={styles.small} style={{ marginTop: 6, maxWidth: "58ch" }}>{t.lead}</p>
        </div>
        <label className={styles.check}>
          <input type="checkbox" checked={adm} onChange={(e) => setAdm(e.target.checked)} data-testid="pt-adm" />
          <span>{t.withAdm}</span>
        </label>
      </div>
      <div className={styles.ptScroll} tabIndex={0} role="region" aria-label={t.caption}>
        <table>
          <caption className={styles.sr}>{t.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{t.tour}</th>
              {GROUPS.map((g) => <th scope="col" key={g}>{g} {t.adultsWord}</th>)}
            </tr>
          </thead>
          <tbody>
            {TOURS.map((tour) => (
              <tr key={tour.id}>
                <th scope="row"><b>{tour.id}</b> {pick(tour.name, lang)}</th>
                {GROUPS.map((g) => {
                  const r = calculateTripPrice(tour, { adults: g, children: 0, singleRooms: 0, includeAdmission: adm });
                  return <td key={g} data-testid={`pt-${tour.id}-${g}`}>{r.ok ? vnd(r.value.displayedTotal) : "-"}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.small}>{adm ? "" : t.svcOnly + ". "}{t.foot}</p>
    </div>
  );
}

export function Tours() {
  const { lang } = useTrip();
  const t = COPY[lang].tours;
  return (
    <section id="tours" className={styles.section} aria-labelledby="rd-tours">
      <div className={styles.wrap}>
        <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
        <h2 id="rd-tours" className={styles.h2}>{t.title}</h2>
        <p className={styles.lead} style={{ marginTop: 14 }}>{t.lead}</p>
        <ul className={styles.tourGrid}>
          {TOURS.map((tour) => <TicketCard key={tour.id} tour={tour} />)}
        </ul>
        <p className={styles.note}>{t.priceNote}</p>
        <PriceTable />
      </div>
    </section>
  );
}
