import { ParallaxLayer } from "@/features/showroom/effects";
import { Photo } from "./Photo";
import { EXPERIENCES, SERVICES } from "../data/content";
import styles from "../brand.module.css";

export function Experiences() {
  return (
    <section className={styles.exp} id="trai-nghiem" aria-labelledby="exp-h">
      <div className={styles.expHead}>
        <p className={styles.eyebrowLight}>Hoạt động và dịch vụ</p>
        <h2 id="exp-h" className={styles.h2Light}>Một ngày gợi ý, và những dịch vụ đặt trước.</h2>
        <p className={styles.leadLight}>Không có lịch trình bắt buộc. Cột giờ bên dưới là một ngày hay gặp của khách ở Hiên; bảng dịch vụ ghi giá và cách đặt.</p>
      </div>
      <div className={styles.expMedia}>
        <div className={styles.expBig}><ParallaxLayer distance={24} className={styles.expLayer}><Photo name="thuyen-thung" alt="Thuyền thúng trên mặt nước lúc bình minh" sizes="(max-width: 900px) 70vw, 28vw" pos="50% 62%" /></ParallaxLayer></div>
        <div className={styles.expSmall}><ParallaxLayer distance={16} className={styles.expLayer}><Photo name="hien-dai-vong" alt="Hiên có mái gỗ, võng và bàn ăn ngoài trời" sizes="(max-width: 900px) 60vw, 24vw" pos="50% 50%" /></ParallaxLayer></div>
      </div>
      <ol className={styles.timeline}>
        {EXPERIENCES.map((e) => (
          <li key={e.time} data-hm="rise">
            <span className={styles.tlTime}>{e.time}</span>
            <div><h3>{e.t}</h3><p>{e.d}</p></div>
          </li>
        ))}
      </ol>
      <div className={styles.services} data-hm="rise">
        <h3 className={styles.servicesH}>Dịch vụ và đưa đón</h3>
        <ul>
          {SERVICES.map((s) => (
            <li key={s.t}><div><b>{s.t}</b><span>{s.d}</span></div><i>{s.p}</i></li>
          ))}
        </ul>
        <p className={styles.servicesNote}>Giá tham khảo. Đặt trước ít nhất một ngày qua điện thoại hoặc email của villa.</p>
      </div>
    </section>
  );
}
