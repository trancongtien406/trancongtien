import styles from "../brand.module.css";
import { Fabric } from "./Art";
import { Newsletter } from "./Interactive";

export function Footer() {
  return (
    <footer id="chan-trang" className={styles.footer}>
      <nav className={styles.fNav} aria-label="Chân trang">
        <a href="#xuong">Về chúng tôi</a>
        <a href="#dac-trung">Triển lãm</a>
        <a href="#bo-suu-tap">Bộ sưu tập</a>
        <a href="#quy-trinh">Quy trình</a>
        <a href="#cua-hang">Mua ngay</a>
      </nav>
      <div className={styles.fCols}>
        <Newsletter />
        <div>
          <h3>Xưởng</h3>
          <p>Làng nghề Vạn Phúc, Hà Đông, Hà Nội<br />8:00–17:30, thứ Hai đến thứ Bảy<br />0900 000 054</p>
        </div>
        <nav aria-label="Sơ đồ trang">
          <h3>Sơ đồ</h3>
          <a href="#cau-chuyen">Câu chuyện</a><a href="#dich-vu">Dịch vụ</a><a href="#chat-lieu">Chất liệu</a><a href="#bang-gia">Bảng giá</a><a href="#hoi-dap">Hỏi đáp</a><a href="#lien-he">Liên hệ</a>
        </nav>
        <div>
          <h3>Theo dõi</h3>
          <p className={styles.soc}><span>Instagram</span><span>Facebook</span><span>YouTube</span></p>
        </div>
      </div>
      <div className={styles.fTiles} aria-hidden="true">
        {(["sen", "cuc", "mai"] as const).map((v, i) => (
          <div key={v} className={styles.fTile} style={{ ["--r" as string]: `${[-6, 4, -3][i]}deg` }}>
            <Fabric id={`f${i}`} variant={v} />
          </div>
        ))}
      </div>
      <p className={styles.fWord}>LỤA HÀ ĐÔNG</p>
      <div className={styles.fBase}>
        <span>© 2026 Lụa Hà Đông.</span>
        <span>Trang minh hoạ thiết kế: thương hiệu, sản phẩm, giá và số liệu chỉ là ví dụ.</span>
      </div>
    </footer>
  );
}
