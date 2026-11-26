import Image from "next/image";
import { buildConsultHref } from "@/features/showroom/consultation";
import { SlotText } from "@/features/showroom/effects";
import { CENTER, HERO_FACTS, HERO_TOPICS } from "../data/center";
import { IMG, SLUG } from "../data/content";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.chip}><span className={styles.chipDot} aria-hidden="true" />Trung tâm ngoại ngữ · {CENTER.area}</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            <span className={styles.heroName}>Trung tâm ngoại ngữ <span translate="no">Mở Lời</span></span>
            <span className={styles.heroTopic}>
              Dạy{" "}
              <SlotText words={HERO_TOPICS} interval={2600} duration={0.6} className={styles.heroSlot} />
            </span>
          </h1>
          <p className={styles.heroLead}>
            Lớp nhỏ cho học sinh từ 6 tuổi và người đi làm: tiếng Anh giao tiếp và IELTS, tiếng Nhật theo khung JLPT N5 – N3, tiếng Hàn sơ cấp hướng TOPIK I. Khai giảng mỗi tháng, học thử một buổi miễn phí.
          </p>
          <div className={styles.heroActions}>
            <a className={`${styles.btn} ${styles.btnYellow} ${styles.btnLg}`} href="#dang-ky">Đăng ký học thử miễn phí</a>
            <a className={`${styles.btn} ${styles.btnGhostW} ${styles.btnLg}`} href={buildConsultHref(SLUG)}>Nhận tư vấn lộ trình</a>
          </div>
          <dl className={styles.heroFacts}>
            {HERO_FACTS.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
                <dd className={styles.heroFactSub}>{f.sub}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.heroArt}>
          <div className={styles.heroPhotoWrap}>
            <div className={styles.heroPhoto}>
              <Image src={`${IMG}/ban-do-viet-1200.webp`} alt="Bàn tay ghi chép vào sổ đặt trên bản đồ thế giới với chữ cái nhiều màu" fill priority sizes="(max-width: 900px) 92vw, 40vw" style={{ objectFit: "cover", objectPosition: "45% 50%" }} />
            </div>
          </div>
          <span className={`${styles.sticker} ${styles.st1}`} aria-hidden="true">A</span>
          <span className={`${styles.sticker} ${styles.st2} ${styles.ja}`} aria-hidden="true">あ</span>
          <span className={`${styles.sticker} ${styles.st3} ${styles.ko}`} aria-hidden="true">가</span>
          <span className={`${styles.sticker} ${styles.st4}`} aria-hidden="true">?</span>
          <div className={styles.heroBubble}>
            <b>Giờ học</b> <span>{CENTER.hours}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
