import { ParallaxLayer } from "@/features/showroom/effects";
import { Photo } from "./Photo";
import { AMENITIES, IN_ROOM } from "../data/content";
import styles from "../brand.module.css";

export function Amenities() {
  return (
    <section className={styles.amen} id="khong-gian" aria-labelledby="amen-h">
      <div className={styles.amenStick}>
      <div className={styles.amenMedia}>
        <ParallaxLayer distance={30} className={styles.expLayer}>
          <Photo name="cua-so-ban-mai" alt="Nắng ban mai xuyên qua khung cửa sổ, tán cọ phía xa" sizes="(max-width: 900px) 100vw, 42vw" pos="50% 40%" />
        </ParallaxLayer>
      </div>
      </div>
      <div className={styles.amenBody}>
        <p className={styles.eyebrow}>Tiện ích</p>
        <h2 id="amen-h" className={styles.h2}>Hồ bơi, hiên gỗ, bếp mở và những thứ cần có.</h2>
        <p className={styles.lead}>Những gì dùng chung trong villa, giờ mở cửa và cách dùng. Tiện nghi trong phòng ghi ở cuối danh sách.</p>
        <ol className={styles.amenList}>
          {AMENITIES.map((a, i) => (
            <li key={a.t} data-hm="rise">
              <span className={styles.amenNo}>0{i + 1}</span>
              <div><h3>{a.t}</h3><p>{a.d}</p></div>
            </li>
          ))}
        </ol>
        <div className={styles.inRoom}>
          <p className={styles.eyebrow}>Trong mỗi phòng có</p>
          <p>{IN_ROOM.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}
