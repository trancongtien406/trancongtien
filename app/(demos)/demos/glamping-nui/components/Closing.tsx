import { siteConfig } from "@/lib/site";
import { MagneticButton } from "@/features/showroom/effects";
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
          <p className={styles.eyebrow}>Chuyến đi tiếp theo của bạn</p>
          <h2 id="close-title" className={styles.h2Big}>Có một khu rừng đang chờ bạn.</h2>
          <p className={styles.lead}>Một đêm xa phố thị. Một buổi sáng không vội. Một hành trình đủ chậm để những điều bình thường trở nên đặc biệt.</p>
          <div className={styles.closeCtas}>
            <MagneticButton max={8} strength={0.25}>
              <a className={`${styles.btn} ${styles.btnFire}`} href="#lap-ke-hoach">Lên kế hoạch chuyến đi</a>
            </MagneticButton>
            <a className={`${styles.btn} ${styles.btnLine}`} href={consultHref} data-testid="consult-closing">Trao đổi với Rừng Thức</a>
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
              <li><a href="#hanh-trinh">Hành trình</a></li>
              <li><a href="#luu-tru">Lều</a></li>
              <li><a href="#hoat-dong">Hoạt động</a></li>
              <li><a href="#lap-ke-hoach">Lên kế hoạch</a></li>
              <li><a href="#giai-dap">Giải đáp</a></li>
              <li><a href="/demos/glamping-nui/credits">Ảnh &amp; ghi công</a></li>
            </ul>
          </nav>
          <address className={styles.footAddr}>
            <p>Vùng núi Bà Nà · Hải Vân · Sơn Trà, Đà Nẵng</p>
            <p>xinchao@rungthuc.example</p>
            <p>0236&nbsp;000&nbsp;0000</p>
          </address>
        </div>
        <div className={`${styles.wrap} ${styles.footBase}`}>
          <p>Đêm chạm rừng, ngày chạm mây.</p>
          <p>Website do {siteConfig.fullName} thiết kế.</p>
        </div>
      </footer>
    </>
  );
}
