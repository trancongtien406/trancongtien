import { siteConfig } from "@/lib/site";
import { BRAND, NAV } from "../data/content";
import styles from "../brand.module.css";

const ID = "/images/demos/hien-man/identity";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footGrid}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ID}/logo-reversed.svg`} alt="Hiên Mặn Villa" width={200} height={120} className={styles.footLogo} />
          <p className={styles.footLine}>{BRAND.slogan}</p>
          <p className={styles.footSmall}>Khu vực: ven biển {BRAND.area}.</p>
        </div>
        <nav aria-label="Chân trang">
          <p className={styles.footH}>Khám phá</p>
          <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}<li><a href="#hoi-dap">Hỏi đáp & chính sách</a></li></ul>
        </nav>
        <div>
          <p className={styles.footH}>Liên hệ</p>
          <p className={styles.footSmall}>{BRAND.contact}</p>
          <p className={styles.footH} style={{ marginTop: 20 }}>Thông tin</p>
          <ul>
            <li><a href="/demos/hien-man/credits">Ảnh &amp; ghi công</a></li>
          </ul>
        </div>
      </div>
      <p className={styles.footBase}>© 2026 Hiên Mặn Villa · Website do {siteConfig.fullName} thiết kế.</p>
    </footer>
  );
}
