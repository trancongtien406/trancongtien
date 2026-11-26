import { ParallaxLayer } from "@/features/showroom/effects";
import { Photo } from "./Photo";
import { FACTS, STAY_FOR, STORY } from "../data/content";
import styles from "../brand.module.css";

export function Story() {
  return (
    <section className={styles.story} id="ve-hien" aria-labelledby="story-h">
      <div className={styles.storyMedia} data-hm="story-media">
        <ParallaxLayer distance={40} className={styles.heroLayer}>
          <Photo name="toan-canh-hang-cay" alt="Toàn cảnh khu nghỉ ven biển nhìn từ trên cao, hồ bơi dài giữa hàng dừa" sizes="100vw" pos="50% 45%" />
        </ParallaxLayer>
        <svg className={styles.horizon} viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 24 Q150 8 300 24 T600 24 T900 24 T1200 24" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className={styles.storyPlate} data-hm="story-plate">
        <p className={styles.eyebrow}>Giới thiệu</p>
        <h2 id="story-h" className={styles.h2}>Hiên Mặn: villa ven biển cho kỳ nghỉ có người đi cùng.</h2>
        {STORY.map((p) => <p key={p.slice(0, 20)} className={styles.body}>{p}</p>)}
        <ul className={styles.stayFor}>
          {STAY_FOR.map((s) => (
            <li key={s.t}><b>{s.t}</b><span>{s.d}</span></li>
          ))}
        </ul>
        <ul className={styles.facts}>
          {FACTS.map((f) => (
            <li key={f.l}><b>{f.n}</b><span>{f.l}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
