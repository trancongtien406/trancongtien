import { CREW } from "../data/content";
import { Divider } from "./Art";
import styles from "../brand.module.css";

function Icon({ k }: { k: string }) {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className={styles.crewIcon}>
      <circle cx="40" cy="40" r="36" fill="var(--rs-sand)" stroke="var(--rs-brown)" strokeWidth="4" />
      {k === "flag" && (<g><path d="M30 18V62" stroke="var(--rs-brown)" strokeWidth="5" strokeLinecap="round" /><path d="M32 20 H58 L50 30 L58 40 H32Z" fill="var(--rs-orange)" stroke="var(--rs-brown)" strokeWidth="3.5" strokeLinejoin="round" /></g>)}
      {k === "board" && (<g transform="rotate(-35 40 40)"><path d="M40 12 C 52 24, 52 56, 40 68 C 28 56, 28 24, 40 12Z" fill="var(--rs-teal)" stroke="var(--rs-brown)" strokeWidth="3.5" strokeLinejoin="round" /><path d="M40 18V62" stroke="var(--rs-sun)" strokeWidth="3.5" strokeLinecap="round" /></g>)}
      {k === "star" && (<g><path d="M40 14 L46 32 L65 33 L50 44 L55 62 L40 52 L25 62 L30 44 L15 33 L34 32Z" fill="var(--rs-orange)" stroke="var(--rs-brown)" strokeWidth="3.5" strokeLinejoin="round" /></g>)}
      {k === "eye" && (<g><path d="M14 40 Q40 16 66 40 Q40 64 14 40Z" fill="var(--rs-cream)" stroke="var(--rs-brown)" strokeWidth="3.5" strokeLinejoin="round" /><circle cx="40" cy="40" r="10" fill="var(--rs-teal)" stroke="var(--rs-brown)" strokeWidth="3.5" /><circle cx="40" cy="40" r="3.5" fill="var(--rs-brown)" /></g>)}
    </svg>
  );
}

export function Crew() {
  return (
    <section id="huan-luyen-vien" className={styles.crew} aria-labelledby="hlv-title">
      <Divider fill="var(--rs-sand)" className={styles.dividerTop} />
      <div className={styles.wrap}>
        <p className={styles.kickerDark} data-rs="reveal">Đội ngũ theo vai trò</p>
        <h2 id="hlv-title" className={styles.h2} data-rs="reveal">Ai sẽ <span className={styles.scriptDeep}>đứng cạnh bạn?</span></h2>
        <p className={styles.lede} data-rs="reveal">Bốn vai trò cùng làm việc trong mỗi buổi học. Bạn luôn biết ai chịu trách nhiệm điều gì.</p>
        <ul className={styles.crewGrid}>
          {CREW.map((c) => (
            <li key={c.role} className={styles.crewCard} data-rs="reveal">
              <Icon k={c.icon} />
              <h3>{c.role}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
