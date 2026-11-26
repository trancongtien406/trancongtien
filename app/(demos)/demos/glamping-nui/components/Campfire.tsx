import styles from "../brand.module.css";
import { MEALS } from "../data/content";
import { Embers } from "./Embers";
import { Ignite, Unfold } from "./Ignite";
import { Photo } from "./Photo";
import { PickButton } from "./Pick";

export function Campfire() {
  return (
    <section id="lua-trai" className={`${styles.section} ${styles.campfire}`} aria-labelledby="fire-title">
      <div className={`${styles.wrap} ${styles.fireGrid}`}>
        <div className={styles.fireCopy}>
          <p className={styles.eyebrow}>Ăn uống và BBQ bên lửa trại</p>
          <h2 id="fire-title" className={styles.h2}>
            <Ignite as="span">Bữa tối nướng bên lửa, bữa sáng trong sương.</Ignite>
          </h2>
          <p className={styles.lead}>
            Bếp chung phục vụ bữa sáng, cà phê và BBQ buổi tối. Bạn có thể tự nướng trên than hoặc nhờ nhân viên nhóm bếp. Gọi BBQ trước 18:00 để kịp chuẩn bị.
          </p>
          <ul className={styles.mealList}>
            {MEALS.map((m) => (
              <li key={m.name}><span><b>{m.name}</b><small>{m.note}</small></span><span className={styles.mealPrice}>{m.price}</span></li>
            ))}
          </ul>
          <PickButton detail={{ activity: "bbq" }} className={`${styles.btn} ${styles.btnFire}`}>Thêm BBQ vào chuyến đi</PickButton>
          <p className={styles.fine}>Hoạt động lửa trại phụ thuộc vào thời tiết và quy định phòng cháy tại khu vực. Lửa luôn có người trông coi.</p>
        </div>
        <div className={styles.firePhotoWrap}>
          <Unfold variant="bloom" className={styles.fireClip}>
            <div className={styles.firePhoto}>
              <Photo name="campfire" alt="Ngọn lửa trại cháy giữa đêm tối" sizes="(max-width: 900px) 90vw, 46vw" position="50% 55%" size={1200} />
              <div className={styles.fireFlick} aria-hidden="true" />
              <Embers originX={0.5} originY={0.8} spread={0.12} className={styles.fireEmbers} desktop={60} mobile={24} lift={1.15} />
            </div>
          </Unfold>
          <figure className={styles.fireInset}>
            <Photo name="campfire-glow" alt="Đống lửa trại sáng cam trong đêm" sizes="(max-width: 900px) 40vw, 18vw" position="50% 70%" size={600} />
          </figure>
        </div>
      </div>
    </section>
  );
}
