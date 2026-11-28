import styles from "../brand.module.css";
import { Poster } from "./Poster";

/** Hình minh hoạ trình chỉnh sửa (giao diện sáng) tự vẽ bằng HTML/CSS, cỡ chữ theo cqw. */
export function Editor({ shots = 3, ring = false, toast = false, label = "Giao diện trình chỉnh sửa chuyển động" }: { shots?: number; ring?: boolean; toast?: boolean; label?: string }) {
  return (
    <div className={styles.edBox} role="img" aria-label={label}><div className={styles.ed}>
      <div className={styles.edTop}>
        <b>▮▮ Thư Viện</b><span>Vòng lặp chưa đặt tên</span>
        <em><u>3:4</u><u>4:5</u><u>9:16</u><u>1:1</u><u>4:3</u><u>16:9</u></em>
        <em><u>24</u><u>25</u><u>30</u><u className={styles.on}>60</u></em>
        <strong>Xuất</strong>
      </div>
      <div className={styles.edMain}>
        <div className={styles.edLib}>
          <p className={styles.edTabs}><u className={styles.on}>Thư viện</u><u>Tệp</u><u>Dự án</u></p>
          <h4>Thư viện <small>307</small></h4>
          <i className={styles.edSearch}>Tìm mẫu…</i>
          <div className={styles.edGrid}>
            {["Băng chuyền", "Vệt", "Khung", "Lưới"].map((n, i) => (
              <figure key={n}><span><Poster v={i * 2 + 1} flat /></span><figcaption>{n}</figcaption></figure>
            ))}
          </div>
        </div>
        <div className={styles.edStage}>
          <div className={ring ? styles.edRing : styles.edCanvas}>
            {ring
              ? [0, 1, 2, 3, 4, 5, 6, 7].map((i) => <Poster key={i} v={i} flat style={{ ["--i" as string]: i }} />)
              : <div className={styles.edCollage}>{[0, 1, 2, 3, 4, 5].map((i) => <Poster key={i} v={i + 3} flat />)}</div>}
          </div>
          <div className={styles.edPlay}><i /><span>0:00.00 / 9.10</span></div>
          <div className={styles.edTime}>{Array.from({ length: shots }, (_, i) => <span key={i}><b>{["Băng chuyền", "Nở hoa", "Tường"][i % 3]}</b></span>)}</div>
          {toast && <p className={styles.edToast}>Trợ lý đã đổi “Vòng lặp chưa đặt tên”: thêm 2 cảnh <u>Hoàn tác</u></p>}
        </div>
        <div className={styles.edProps}>
          <h4>Băng chuyền <small>3D</small></h4>
          <p><span>Trục</span><u>Ngang</u></p>
          <p><span>Số hàng</span><u>3</u></p>
          <p><span>Số thẻ</span><u>5</u></p>
          <p><span>Cỡ thẻ</span><u>2565</u></p>
          <p><span>Khoảng cách</span><u>10,7%</u></p>
          <p><span>Bo góc</span><u>0px</u></p>
          <h5>Chuyển động</h5>
          <p><span>Kiểu</span><u>Liên tục</u></p>
          <p><span>Chiều</span><u>Tới</u></p>
          <p><span>Xen kẽ</span><u className={styles.sw} /></p>
        </div>
      </div>
    </div></div>
  );
}
