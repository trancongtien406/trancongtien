import { ClipReveal, SplitWords, TiltCard } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { TENTS } from "../data/content";
import { vnd } from "../lib/format";
import { Photo } from "./Photo";
import { PickButton } from "./Pick";

export function Stay() {
  return (
    <section id="luu-tru" className={`${styles.section} ${styles.stay}`} aria-labelledby="stay-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.eyebrow}>Chỗ nghỉ</p>
          <h2 id="stay-title" className={styles.h2}>
            <SplitWords as="span">Chọn một chiếc lều cho riêng mình.</SplitWords>
          </h2>
          <p className={styles.lead}>Mỗi chiếc lều là một cách khác nhau để tận hưởng núi rừng. Chọn không gian hợp với số người và nhịp nghỉ bạn muốn.</p>
        </header>
        <ul className={styles.tents}>
          {TENTS.map((t, i) => (
            <li key={t.id} className={styles.tentItem} style={{ "--i": i } as React.CSSProperties}>
              <TiltCard className={styles.tentTilt} max={6} glare glareColor="rgba(255,176,94,0.22)" scale={1.015}>
                <article className={styles.tent}>
                  <ClipReveal variant="inset" from="bottom" className={styles.tentPhotoWrap} innerScale={1.18}>
                    <div className={styles.tentPhoto}>
                      <Photo name={t.photo} alt={t.alt} sizes="(max-width: 760px) 90vw, 30vw" position={t.position} />
                    </div>
                  </ClipReveal>
                  <div className={styles.tentBody}>
                    <p className={styles.tentMood}>{String(i + 1).padStart(2, "0")} · {t.mood}</p>
                    <h3 className={styles.h3}>{t.name}</h3>
                    <p className={styles.tentPrice}>
                      <span>Từ&nbsp;{vnd(t.price)}</span> / đêm <em>Giá tham khảo</em>
                    </p>
                    <p>{t.text}</p>
                    <p className={styles.tentCap}>Sức chứa tham khảo: {t.cap}&nbsp;người</p>
                    <ul className={styles.perks}>{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                    <PickButton detail={{ tent: t.id }}>Chọn lều và tính chuyến đi</PickButton>
                  </div>
                </article>
              </TiltCard>
            </li>
          ))}
        </ul>
        <p className={styles.fine}>Chưa bao gồm các tiện ích chưa được xác nhận. Cấu hình và giá từng lều sẽ được gửi khi bạn trao đổi chuyến đi.</p>
      </div>
    </section>
  );
}
