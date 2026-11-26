import { DIET_NOTE, DINING } from "../data/content";
import styles from "../brand.module.css";

export function Dining() {
  return (
    <section className={styles.dine} id="an-uong" aria-labelledby="dine-h">
      <div className={styles.dineHead} data-hm="rise">
        <p className={styles.eyebrow}>Ăn uống</p>
        <h2 id="dine-h" className={styles.h2}>Bữa sáng tại hiên, tối ăn hải sản.</h2>
        <p className={styles.lead}>Giá phòng chưa gồm bữa sáng. Villa phục vụ bữa sáng và BBQ, còn lại lễ tân gợi ý quán gần đó.</p>
      </div>
      <ul className={styles.dineList}>
        {DINING.map((d) => (
          <li key={d.t} data-hm="rise">
            <div><h3 className={styles.h3}>{d.t}</h3><p className={styles.dineWhen}>{d.time}</p></div>
            <p>{d.d}</p>
            <p className={styles.dinePrice}>{d.price}</p>
          </li>
        ))}
      </ul>
      <p className={styles.dineNote} data-hm="rise">{DIET_NOTE}</p>
    </section>
  );
}
