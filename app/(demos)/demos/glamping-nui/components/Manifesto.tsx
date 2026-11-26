import styles from "../brand.module.css";
import { Ignite } from "./Ignite";

const FACTS = [
  ["3 loại lều", "Mộc 2 người, Rừng 3 người, Mây 4 người. Mỗi lều có giường, chăn đệm dày, đèn và ổ sạc."],
  ["Ăn uống tại khu", "Bữa sáng, BBQ tối và cà phê pha tại bếp chung. Gọi BBQ trước 18:00."],
  ["Ngủ đêm hoặc 2N1Đ", "Nhận lều 14:00, trả lều 11:00. Nhóm đến 8 người ghép 2 đến 3 lều cạnh nhau."],
];

export function Manifesto() {
  return (
    <section id="manifesto" className={`${styles.section} ${styles.manifesto}`} aria-labelledby="manifesto-title">
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Về Rừng Thức</p>
        <h2 id="manifesto-title" className={styles.h2Big}>
          <Ignite as="span">Một khu cắm trại có lều dựng sẵn, cách thành phố một buổi chiều.</Ignite>
        </h2>
        <div className={styles.manifestoBody}>
          <p className={styles.scrub}>
            <span translate="no">Rừng Thức</span> là khu glamping trên đồi thông ở chân núi Bà Nà, Hòa Vang. Bạn đến với một chiếc ba lô, chúng tôi lo lều, giường, bếp và củi. Buổi tối nướng BBQ bên lửa trại, sáng dậy cà phê trong sương.
          </p>
          <ul className={styles.factList}>
            {FACTS.map(([k, v]) => (
              <li key={k}><b>{k}</b><span>{v}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
