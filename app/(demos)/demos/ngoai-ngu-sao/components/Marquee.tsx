import { VelocityMarquee } from "@/features/showroom/effects";
import { MARQUEE_WORDS } from "../data/content";
import styles from "../brand.module.css";

const LANG_OF = ["vi", "en", "ja", "ko", "vi", "en", "ja", "ko"] as const;

export function Marquee() {
  return (
    <section className={styles.band} aria-label="Lời chào và lời cảm ơn bằng bốn ngôn ngữ">
      <VelocityMarquee mode="velocity" speed={70} boost={0.6} reverseOnScrollUp pauseOnHover controls gap="2.2rem" className={styles.bandRun} buttonClassName={styles.bandBtn} label="Lời chào và lời cảm ơn" pauseLabel="Dừng dải chữ" playLabel="Chạy dải chữ">
        {MARQUEE_WORDS.map((w, i) => (
          <span key={w} className={`${styles.bandWord} ${LANG_OF[i] === "ja" ? styles.ja : LANG_OF[i] === "ko" ? styles.ko : ""}`} lang={LANG_OF[i]} data-alt={i % 2}>
            {w}<i aria-hidden="true">✦</i>
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}
