import { Photo } from "./Photo";
import { SCENES } from "../data/content";
import styles from "../brand.module.css";

export function Scenes() {
  return (
    <section className={styles.scenes} id="mot-ngay" aria-labelledby="day-h">
      {SCENES.map((s, i) => (
        <article key={s.time} className={styles.scene} data-hm="scene">
          <div className={styles.sceneMedia}><Photo name={s.image} alt={s.alt} sizes="100vw" pos={s.pos} motion="scene-img" /></div>
          <div className={styles.sceneShade} aria-hidden="true" />
          <p className={styles.sceneEyebrow + " " + styles.eyebrowLight}>{i === 0 ? "02 / Một ngày ở Hiên" : "Một ngày ở Hiên"}</p>
          {i === 0 ? <h2 id="day-h" className={styles.srOnly}>Một ngày ở Hiên</h2> : null}
          <div className={styles.sceneInner}>
            <p className={styles.time} aria-label={`Lúc ${s.time}`}>{s.time}</p>
            <h3 className={styles.sceneTitle}>{s.title}</h3>
            <p className={styles.sceneText}>{s.text}</p>
          </div>
          <p className={styles.sceneIdx} aria-hidden="true">{i + 1} / {SCENES.length}</p>
        </article>
      ))}
    </section>
  );
}
