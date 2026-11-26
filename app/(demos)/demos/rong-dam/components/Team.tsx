import { COMPANY, OPS } from "../data/ops";
import type { Lang } from "../data/tours";
import styles from "../brand.module.css";

const ICON: Record<string, React.ReactNode> = {
  ops: (<><circle cx="32" cy="26" r="11" /><path d="M13 28v-3a19 19 0 0 1 38 0v3" /><rect x="9" y="27" width="7" height="12" rx="3" /><rect x="48" y="27" width="7" height="12" rx="3" /><path d="M51 39c0 6-6 9-14 9" /><path d="M14 58c2-9 9-14 18-14s16 5 18 14" /></>),
  guide: (<><circle cx="26" cy="22" r="10" /><path d="M10 58c1-11 7-17 16-17s15 6 16 17" /><path d="M44 54V14" /><path d="M44 14h14l-4 6 4 6H44" fill="currentColor" fillOpacity=".25" /></>),
  driver: (<><circle cx="32" cy="32" r="22" /><circle cx="32" cy="32" r="5" /><path d="M10 32h17M37 32h17M32 37v17" /></>),
  care: (<><path d="M8 14h48v28H30l-12 11V42H8z" /><path d="M20 24h24M20 32h14" /></>),
};

export function Team({ lang }: { lang: Lang }) {
  const t = OPS[lang].team;
  return (
    <section id="team" className={`${styles.section} ${styles.teamSec}`} aria-labelledby="rd-team">
      <div className={styles.wrap}>
        <span className={`${styles.label} ${styles.eyebrow}`}>{t.eyebrow}</span>
        <h2 id="rd-team" className={styles.h2}>{t.title}</h2>
        <p className={styles.lead} style={{ marginTop: 14 }}>{t.lead}</p>
        <ul className={styles.roleGrid}>
          {t.roles.map((r) => (
            <li key={r.id} className={styles.role} data-rd="role">
              <svg className={styles.roleIcon} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICON[r.id]}</svg>
              <h3 className={styles.h3}>{r.title}</h3>
              <p>{r.duty}</p>
              <p className={`${styles.label} ${styles.roleMeet}`}>{r.meet}</p>
            </li>
          ))}
        </ul>
        <div className={styles.carBox}>
          <svg viewBox="0 0 220 90" className={styles.carArt} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 62V34c0-6 4-10 10-10h120c10 0 16 6 22 14l30 6c6 2 8 6 8 12v6" />
            <path d="M10 62h200" />
            <path d="M30 24v18M60 24v18M90 24v18M120 24v18" />
            <path d="M150 28l14 14h34" />
            <circle cx="52" cy="66" r="12" fill="var(--rd-paper)" />
            <circle cx="52" cy="66" r="4" />
            <circle cx="162" cy="66" r="12" fill="var(--rd-paper)" />
            <circle cx="162" cy="66" r="4" />
          </svg>
          <div>
            <h3 className={styles.h3}>{t.carTitle}</h3>
            <ul className={styles.tick} style={{ marginTop: 12 }}>{t.carItems.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className={styles.small} style={{ marginTop: 12 }}>{t.carNote}</p>
            <p className={styles.small}>{COMPANY.name} · {COMPANY.phone} · {COMPANY.hours[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
