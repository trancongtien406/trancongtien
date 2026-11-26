import { PREPARE_AFTER, PREPARE_ASK_DOCTOR, PREPARE_BEFORE } from "../data/content";
import { Breath } from "./Breath";
import styles from "../brand.module.css";

export function Prepare() {
  return (
    <section id="prepare" className={styles.section} aria-labelledby="prep-title">
      <div className={styles.container}>
        <div className={styles.prepHead} data-reveal>
          <p className={styles.eyebrow}>Chuẩn bị &amp; lưu ý</p>
          <h2 id="prep-title" className={styles.h2}>
            Trước và sau buổi, <em>chỉ vài điều nhỏ.</em>
          </h2>
        </div>
        <div className={styles.prepGrid}>
          <div className={styles.prepLists}>
            <div data-reveal>
              <h3 className={styles.h3}>Trước giờ hẹn</h3>
              <ul className={styles.checkList}>{PREPARE_BEFORE.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div data-reveal>
              <h3 className={styles.h3}>Sau buổi</h3>
              <ul className={styles.checkList}>{PREPARE_AFTER.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <p className={styles.prepAsk} data-reveal>{PREPARE_ASK_DOCTOR}</p>
          </div>
          <div className={styles.prepBreath} data-reveal>
            <p className={styles.eyebrow}>Trong lúc chờ</p>
            <h3 className={styles.h3}>Ba phút thở chậm trước khi vào phòng</h3>
            <p className={styles.prepBreathP}>Hít vào 4 giây, giữ nhẹ 2 giây, thở ra 6 giây. Nhiều khách làm bài này ở khu đón khách để người dịu xuống trước khi nằm. Bạn cũng có thể thử ngay tại đây.</p>
            <Breath />
          </div>
        </div>
      </div>
    </section>
  );
}
