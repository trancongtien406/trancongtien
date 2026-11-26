"use client";

import { useEffect, useState } from "react";
import { CONTACT, HOURS, POLICIES } from "../data/content";
import { CLOSE_MINUTES, OPEN_MINUTES } from "../data/rituals";
import { getVnNow } from "../lib/vietnam-time";
import styles from "../brand.module.css";

function OpenNow() {
  const [m, setM] = useState<number | null>(null);
  // Giờ Việt Nam chỉ có ở client (tránh lệch hydrate).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setM(getVnNow().minutes); }, []);
  if (m === null) return <p className={styles.openNow} aria-hidden="true">&nbsp;</p>;
  const open = m >= OPEN_MINUTES && m < CLOSE_MINUTES;
  const hhmm = (x: number) => `${Math.floor(x / 60)}:${String(x % 60).padStart(2, "0")}`;
  return (
    <p className={`${styles.openNow} ${open ? styles.isOpen : ""}`} role="status" data-testid="open-now">
      <i aria-hidden="true" />
      {open ? `Đang mở cửa, đóng cửa lúc ${hhmm(CLOSE_MINUTES)}` : m < OPEN_MINUTES ? `Chưa mở cửa, mở lúc ${hhmm(OPEN_MINUTES)}` : `Đã đóng cửa, mở lại lúc ${hhmm(OPEN_MINUTES)} sáng mai`}
    </p>
  );
}

export function Policy() {
  return (
    <section id="policy" className={`${styles.section} ${styles.linen}`} aria-labelledby="policy-title">
      <div className={`${styles.container} ${styles.policyGrid}`}>
        <div className={styles.policyLeft} data-reveal>
          <p className={styles.eyebrow}>Giờ mở cửa &amp; chính sách</p>
          <h2 id="policy-title" className={styles.h2}>
            Giờ giấc và <em>quy định đặt lịch.</em>
          </h2>
          <OpenNow />
          <dl className={styles.hours}>
            {HOURS.map((h) => (
              <div key={h.d}><dt>{h.d}</dt><dd className={styles.num}>{h.h}</dd></div>
            ))}
          </dl>
          <div className={styles.locCard}>
            <p className={styles.eyebrow}>Địa điểm</p>
            <p><b>{CONTACT.area}</b></p>
            <p>{CONTACT.note}</p>
          </div>
        </div>
        <dl className={styles.policyList}>
          {POLICIES.map((p) => (
            <div key={p.t} data-reveal>
              <dt>{p.t}</dt>
              <dd>{p.d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
