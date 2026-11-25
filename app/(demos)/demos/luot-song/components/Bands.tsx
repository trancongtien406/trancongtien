import { VelocityMarquee } from "@/features/showroom/effects";
import { MARQUEE_A, MARQUEE_B } from "../data/content";
import { Star } from "./Art";
import styles from "../brand.module.css";

function Items({ list }: { list: string[] }) {
  return (
    <>
      {list.map((t) => (
        <span key={t} className={styles.bandItem}>{t}<Star className={styles.bandStar} /></span>
      ))}
    </>
  );
}

/** Hai băng chữ retro cắt chéo nhau; chạy theo vận tốc cuộn, dừng khi rê chuột/focus, có nút Dừng. */
export function Bands() {
  return (
    <section className={styles.bands} aria-label="Khẩu hiệu">
      <div className={`${styles.ribbon} ${styles.ribbonA}`}>
        <VelocityMarquee speed={60} boost={1.1} direction={1} gap="2rem" controls buttonClassName={styles.bandBtn} label="Băng chữ: chạm sóng, bắt nắng" pauseLabel="Dừng chạy chữ" playLabel="Chạy chữ">
          <Items list={MARQUEE_A} />
        </VelocityMarquee>
      </div>
      <div className={`${styles.ribbon} ${styles.ribbonB}`} aria-hidden="true">
        <VelocityMarquee speed={48} boost={1.4} direction={-1} gap="2rem" label="Băng chữ phụ">
          <Items list={MARQUEE_B} />
        </VelocityMarquee>
      </div>
    </section>
  );
}
