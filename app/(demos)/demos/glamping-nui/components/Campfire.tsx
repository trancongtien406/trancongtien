import { ClipReveal, SplitWords } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { Embers } from "./Embers";
import { Photo } from "./Photo";
import { PickButton } from "./Pick";

export function Campfire() {
  return (
    <section id="lua-trai" className={`${styles.section} ${styles.campfire}`} aria-labelledby="fire-title">
      <div className={`${styles.wrap} ${styles.fireGrid}`}>
        <div className={styles.fireCopy}>
          <p className={styles.eyebrow}>Trái tim của đêm</p>
          <h2 id="fire-title" className={styles.h2}>
            <SplitWords as="span">Có một ngọn lửa, và rất nhiều câu chuyện.</SplitWords>
          </h2>
          <p className={styles.lead}>
            Khi màn đêm buông xuống, mọi người ngồi lại quanh ánh lửa. Không cần chương trình cầu kỳ. Một chút đồ ăn, một bản nhạc nhẹ và những câu chuyện chân thành đã đủ để buổi tối đáng nhớ.
          </p>
          <PickButton detail={{ activity: "bbq" }} className={`${styles.btn} ${styles.btnFire}`}>Khám phá trải nghiệm BBQ</PickButton>
          <p className={styles.fine}>Hoạt động lửa trại phụ thuộc vào địa điểm được phép tổ chức, thời tiết và quy định phòng cháy tại khu vực. Lửa luôn có người trông coi.</p>
        </div>
        <div className={styles.firePhotoWrap}>
          <ClipReveal variant="circle" from="center" className={styles.fireClip} innerScale={1.2}>
            <div className={styles.firePhoto}>
              <Photo name="campfire" alt="Ngọn lửa trại cháy giữa đêm tối" sizes="(max-width: 900px) 90vw, 46vw" position="50% 55%" size={1200} />
              <div className={styles.fireFlick} aria-hidden="true" />
              <Embers originX={0.5} originY={0.8} spread={0.12} className={styles.fireEmbers} desktop={60} mobile={24} lift={1.15} />
            </div>
          </ClipReveal>
          <figure className={styles.fireInset}>
            <Photo name="campfire-glow" alt="Đống lửa trại sáng cam trong đêm" sizes="(max-width: 900px) 40vw, 18vw" position="50% 70%" size={600} />
          </figure>
        </div>
      </div>
    </section>
  );
}
