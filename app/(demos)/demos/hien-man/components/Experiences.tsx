import { Photo } from "./Photo";
import { EXPERIENCES } from "../data/content";
import styles from "../brand.module.css";

export function Experiences() {
  return (
    <section className={styles.exp} id="trai-nghiem" aria-labelledby="exp-h">
      <div className={styles.expHead}>
        <p className={styles.eyebrowLight}>05 / Quanh Hiên</p>
        <h2 id="exp-h" className={styles.h2Light}>Việc nhỏ cho một ngày dài.</h2>
        <p className={styles.leadLight}>Không có lịch trình bắt buộc. Đây chỉ là những gợi ý ven bán đảo Sơn Trà, chọn một, hoặc không chọn gì.</p>
      </div>
      <div className={styles.expMedia}>
        <div className={styles.expBig} data-hm="exp-media"><Photo name="thuyen-thung" alt="Thuyền thúng trên mặt nước lúc bình minh" sizes="(max-width: 900px) 70vw, 28vw" pos="50% 62%" /></div>
        <div className={styles.expSmall} data-hm="exp-media"><Photo name="hien-dai-vong" alt="Hiên có mái gỗ, võng và bàn ăn ngoài trời" sizes="(max-width: 900px) 60vw, 24vw" pos="50% 50%" /></div>
      </div>
      <ol className={styles.timeline}>
        {EXPERIENCES.map((e) => (
          <li key={e.time} data-hm="rise">
            <span className={styles.tlTime}>{e.time}</span>
            <div><h3>{e.t}</h3><p>{e.d}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
