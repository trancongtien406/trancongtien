import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "../brand.module.css";

export function Closing() {
  return (
    <section className={styles.closing} id="ket" aria-labelledby="close-h">
      <svg className={styles.closeMark} viewBox="0 0 72 88" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
          <path data-hm="draw" d="M8 33 L36 14 L64 33" />
          <path data-hm="draw" d="M16 33 V60 M56 33 V60" />
          <circle data-hm="draw" cx="36" cy="44" r="8" />
          <path data-hm="draw" d="M8 67 Q22 59 36 67 T64 67" />
          <path data-hm="draw" d="M8 76 Q22 68 36 76 T64 76" />
        </g>
      </svg>
      <div className={styles.closeInner}>
        <p className={styles.eyebrowLight}>Để biển giữ hộ những bộn bề</p>
        <h2 id="close-h" className={styles.closeTitle}>Ở lại cùng <em>nhịp biển.</em></h2>
        <div className={styles.closeActions}>
          <a className={styles.btnLight} href="#lich-gia">Chọn ngày trên lịch</a>
          <a className={styles.btnGhost} href={buildConsultHref("hien-man")}>Nhận tư vấn làm website như thế này</a>
        </div>
        <p className={styles.closeNote}>Nút thứ hai đưa bạn tới form tư vấn của website chính, nơi duy nhất nhận thông tin của bạn.</p>
      </div>
    </section>
  );
}
