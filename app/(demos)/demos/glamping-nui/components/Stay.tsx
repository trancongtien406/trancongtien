import { TiltCard } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { SEASON_NOTE, TENTS } from "../data/content";
import { vnd } from "../lib/format";
import { Ignite, Unfold } from "./Ignite";
import { Photo } from "./Photo";
import { PickButton } from "./Pick";

export function Stay() {
  return (
    <section id="luu-tru" className={`${styles.section} ${styles.stay}`} aria-labelledby="stay-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.eyebrow}>Chỗ nghỉ</p>
          <h2 id="stay-title" className={styles.h2}>
            <Ignite as="span">Ba loại lều, giá theo đêm.</Ignite>
          </h2>
          <p className={styles.lead}>Chọn lều theo số người. Giá là một lều cho một đêm, chưa gồm ăn uống và hoạt động; cuối tuần và dịp lễ giá cao hơn.</p>
        </header>
        <ul className={styles.tents}>
          {TENTS.map((t, i) => (
            <li key={t.id} className={styles.tentItem} style={{ "--i": i } as React.CSSProperties}>
              <TiltCard className={styles.tentTilt} max={6} glare glareColor="rgba(255,176,94,0.22)" scale={1.015}>
                <article className={styles.tent}>
                  <Unfold variant="flap" className={styles.tentPhotoWrap}>
                    <div className={styles.tentPhoto}>
                      <Photo name={t.photo} alt={t.alt} sizes="(max-width: 760px) 90vw, 30vw" position={t.position} />
                    </div>
                  </Unfold>
                  <div className={styles.tentBody}>
                    <p className={styles.tentMood}>{String(i + 1).padStart(2, "0")} · {t.mood}</p>
                    <h3 className={styles.h3}>{t.name}</h3>
                    <p className={styles.tentPrice}>
                      <span>{vnd(t.price)}</span> / đêm ngày thường <em>Giá tham khảo</em>
                    </p>
                    <p>{t.text}</p>
                    <p className={styles.tentCap}>Sức chứa: {t.cap}&nbsp;người · {t.bed} · {t.size}</p>
                    <ul className={styles.perks}>{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                    <ul className={styles.amen}>{t.amen.map((a) => <li key={a}>{a}</li>)}</ul>
                    <PickButton detail={{ tent: t.id }}>Chọn lều và tính chuyến đi</PickButton>
                  </div>
                </article>
              </TiltCard>
            </li>
          ))}
        </ul>
        <div className={styles.priceTable} role="table" aria-label="Giá lều theo loại ngày">
          <div role="row" className={styles.ptHead}><span role="columnheader">Loại lều</span><span role="columnheader">Ngày thường</span><span role="columnheader">Cuối tuần</span><span role="columnheader">Lễ, Tết</span></div>
          {TENTS.map((t) => (
            <div role="row" key={t.id} className={styles.ptRow}><span role="cell"><b>{t.name}</b> · {t.cap} người</span><span role="cell" data-l="Ngày thường">{vnd(t.price)}</span><span role="cell" data-l="Cuối tuần">{vnd(t.weekend)}</span><span role="cell" data-l="Lễ, Tết">{vnd(t.peak)}</span></div>
          ))}
        </div>
        <p className={styles.fine}>{SEASON_NOTE} Giá tham khảo; giá xác nhận gửi khi bạn trao đổi chuyến đi.</p>
      </div>
    </section>
  );
}
