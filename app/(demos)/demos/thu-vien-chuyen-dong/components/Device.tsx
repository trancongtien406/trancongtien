import styles from "../brand.module.css";
import { Poster } from "./Poster";

export function Device() {
  return (
    <section id="tm-device" className={styles.device} aria-labelledby="tm-h-dev">
      <h2 id="tm-h-dev" className={styles.h2xl}>Trên mọi thiết bị<br /><span>của bạn.</span></h2>
      <div className={styles.phoneCol}>
        <div className={styles.phoneBox}><div className={styles.phone} role="img" aria-label="Minh hoạ ứng dụng Thư Viện Chuyển Động trên điện thoại">
          <i className={styles.island} />
          <div className={styles.phTop}><u>Đăng nhập</u><span>Vòng lặp chưa đặt tên</span><b>Xuất</b></div>
          <div className={styles.phCanvas}><div><Poster v={0} flat /></div></div>
          <div className={styles.phCtl}><i /><span>0:00.00<br />0:20.00</span></div>
          <div className={styles.phTime}><b>Lưới</b></div>
          <div className={styles.phTabs}><span>Thư viện</span><span>Tệp</span><span>Dự án</span><span>Chỉnh</span></div>
        </div></div>
      </div>
      <ul className={styles.devList}>
        <li><b>Trình duyệt máy tính</b><span>Bản đầy đủ với thư viện, thuộc tính và dòng thời gian.</span></li>
        <li><b>Máy tính bảng</b><span>Bố cục hai cột, kéo thả bằng cảm ứng và bút.</span></li>
        <li><b>Điện thoại</b><span>Giao diện riêng cho một tay: duyệt mẫu, thả tệp, xuất ngay.</span></li>
      </ul>
    </section>
  );
}
