import { Photo } from "./Photo";
import { FACTS, STORY } from "../data/content";
import styles from "../brand.module.css";

export function Story() {
  return (
    <section className={styles.story} id="ve-hien" aria-labelledby="story-h">
      <div className={styles.storyMedia} data-hm="story-media">
        <Photo name="toan-canh-hang-cay" alt="Toàn cảnh khu nghỉ ven biển nhìn từ trên cao, hồ bơi dài giữa hàng dừa" sizes="100vw" pos="50% 45%" />
        <svg className={styles.horizon} viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path data-hm="draw" d="M0 24 Q150 8 300 24 T600 24 T900 24 T1200 24" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className={styles.storyPlate} data-hm="story-plate">
        <p className={styles.eyebrow}>01 / Về Hiên</p>
        <h2 id="story-h" className={styles.h2}>Một nơi vừa đủ để chậm lại.</h2>
        <p className={styles.lead}>Một mái hiên rộng, một khoảng trời riêng và gió biển ghé qua mỗi ngày.</p>
        <p className={styles.body}>{STORY}</p>
        <blockquote className={styles.pull}>Không cần đi thật xa để tìm lại một nhịp sống khác.</blockquote>
        <ul className={styles.facts}>
          {FACTS.map((f) => (
            <li key={f.l}><b>{f.n}</b><span>{f.l}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
