import { BRAND, LOCATION } from "../data/content";
import styles from "../brand.module.css";

export function Location() {
  return (
    <section className={styles.loc} id="vi-tri" aria-labelledby="loc-h">
      <div className={styles.locIn}>
        <div data-hm="rise">
          <p className={styles.eyebrow}>Vị trí</p>
          <h2 id="loc-h" className={styles.h2}>Ven biển Sơn Trà, gần sân bay và trung tâm.</h2>
          <p className={styles.lead}>Villa ở phía bán đảo yên tĩnh, tránh đường chính và khu đông khách. Thời gian dưới đây tính bằng xe, giờ bình thường.</p>
          <p className={styles.locNote}>Địa chỉ chi tiết và chỉ dẫn đường được gửi khi bạn giữ chỗ.</p>
        </div>
        <dl className={styles.locList} data-hm="rise">
          {LOCATION.map((l) => (<div key={l.k}><dt>{l.k}</dt><dd>{l.v}</dd></div>))}
        </dl>
      </div>
      <div className={styles.locContact} data-hm="rise">
        <p className={styles.eyebrow}>Liên hệ villa</p>
        <p><b>{BRAND.phone}</b> · {BRAND.contact}</p>
      </div>
    </section>
  );
}
