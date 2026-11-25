import Link from "next/link";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import styles from "../brand.module.css";

export function Footer() {
  return (
    <footer className={`${styles.footer} ${styles.onDark}`}>
      <div className={styles.container}>
        <div className={styles.footGrid}>
          <div className={styles.footBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/mien-an/identity/logo-reversed.svg" alt="Miên An Wellness" width={320} height={200} />
            <p>Chậm lại, để trở về với mình.</p>
            <p>Một không gian wellness dành cho những khoảng nghỉ nhẹ nhàng và có chủ đích.</p>
          </div>
          <div className={styles.footLinks}>
            <nav className={styles.footCol} aria-label="Khám phá">
              <h4>Khám phá</h4>
              <a href="#rituals">Liệu trình</a>
              <a href="#ritual-finder">Ritual Finder</a>
              <a href="#sanctuary">Không gian</a>
            </nav>
            <nav className={styles.footCol} aria-label="Trải nghiệm">
              <h4>Trải nghiệm</h4>
              <a href="#appointment">Xem trước lịch hẹn</a>
              <a href="#faq">Câu hỏi thường gặp</a>
            </nav>
            <nav className={styles.footCol} aria-label="Dự án">
              <h4>Dự án</h4>
              <Link href="/">Về portfolio</Link>
              <a href="/demos/mien-an/credits">Ảnh &amp; ghi công</a>
            </nav>
          </div>
        </div>
        <div className={styles.footPitch}>
          <p>Bạn muốn một website tương tự cho spa của mình?</p>
          <a href={buildConsultHref("mien-an")} className={`${styles.btn} ${styles.btnLight}`}>
            Trao đổi về dự án <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className={styles.footLegal}>
          <p>
            <span translate="no">Miên An Wellness</span>{" "}— Spa &amp; wellness. Giá chỉ mang tính tham khảo; các nghi thức không thay thế tư vấn y tế.
          </p>
          <p className={styles.footSign}>
            Website do {siteConfig.fullName} thiết kế · <a href="/demos/mien-an/credits">Ảnh &amp; ghi công</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
