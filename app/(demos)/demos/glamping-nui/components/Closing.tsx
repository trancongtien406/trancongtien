import { siteConfig } from "@/lib/site";
import styles from "../brand.module.css";
import { Embers } from "./Embers";
import { Fire } from "./Fire";

export function Closing({ consultHref }: { consultHref: string }) {
  return (
    <>
      <section className={styles.closing} aria-labelledby="close-title">
        <Embers originX={0.5} originY={0.2} spread={0.02} className={styles.closeEmbers} desktop={50} mobile={20} />
        <div className={`${styles.wrap} ${styles.closeInner}`}>
          <Fire className={styles.closeFire} />
          <p className={styles.eyebrow}>Đặt lều</p>
          <h2 id="close-title" className={styles.h2Big}>Giữ một lều cho cuối tuần này.</h2>
          <p className={styles.lead}>Chọn lều, số đêm và hoạt động để có bản ước tính, rồi gửi cho chúng tôi để xác nhận ngày còn trống và đặt cọc.</p>
          <div className={styles.closeCtas}>
            <a className={`${styles.btn} ${styles.btnFire}`} href="#lap-ke-hoach">Ước tính chuyến đi</a>
            <a className={`${styles.btn} ${styles.btnLine}`} href={consultHref} data-testid="consult-closing">Hỏi đặt lều</a>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footGrid}`}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/glamping-nui/identity/logo-primary.svg" alt="Rừng Thức" width={220} height={150} translate="no" className={styles.footLogo} loading="lazy" />
          </div>
          <nav aria-label="Liên kết cuối trang">
            <ul className={styles.footLinks}>
              <li><a href="#luu-tru">Lều và giá</a></li>
              <li><a href="#hoat-dong">Hoạt động</a></li>
              <li><a href="#lua-trai">Ăn uống</a></li>
              <li><a href="#lich-trinh">Lịch trình 2N1Đ</a></li>
              <li><a href="#quy-dinh">Quy định</a></li>
              <li><a href="#lap-ke-hoach">Ước tính</a></li>
              <li><a href="#giai-dap">Hỏi đáp</a></li>
              <li><a href="/demos/glamping-nui/credits">Ảnh &amp; ghi công</a></li>
            </ul>
          </nav>
          <address className={styles.footAddr}>
            <p>Chân núi Bà Nà, Hòa Vang, Đà Nẵng</p>
            <p>xinchao@rungthuc.example</p>
            <p>0236&nbsp;000&nbsp;0000</p>
          </address>
        </div>
        <div className={`${styles.wrap} ${styles.footBase}`}>
          <p>Nhận lều 14:00 · Trả lều 11:00 · Đặt cọc 50%</p>
          <p>Website do {siteConfig.fullName} thiết kế.</p>
        </div>
      </footer>
    </>
  );
}
