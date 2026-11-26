import { ShineSweep } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { BOOK_STEPS, FAQ, FOOTER, FOOT_NAV, ID, SLUG } from "../data/content";
import { Divider, Sticker } from "./Art";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function Faq() {
  return (
    <section id="hoi-dap" className={styles.faq} aria-labelledby="hd-title">
      <Divider fill="var(--rs-deep)" className={styles.dividerTop} />
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <div>
          <p className={styles.kickerLight} data-rs="reveal">Hỏi đáp</p>
          <h2 id="hd-title" className={`${styles.h2} ${styles.h2Light}`} data-rs="reveal">Câu hỏi hay gặp <span className={styles.scriptSun}>trước buổi đầu</span></h2>
          <div className={styles.faqPhoto}>
            <div className={styles.faqPhotoFrame}><Photo file="bong-chieu" alt="Bóng người ôm ván trên mặt biển vàng sẫm lúc xế chiều" sizes="(max-width: 900px) 80vw, 30vw" w={1200} pos="50% 40%" /></div>
          </div>
        </div>
        <div className={styles.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="dat-lich" className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.ctaBg} aria-hidden="true"><Photo file="bot-song-vang" alt="" sizes="100vw" pos="50% 55%" /></div>
      <div className={styles.ctaShade} aria-hidden="true" />
      <div className={`${styles.wrap} ${styles.ctaInner}`}>
        <div>
          <p className={styles.kickerLight} data-rs="reveal">Đặt lịch học</p>
          <h2 id="cta-title" className={styles.ctaTitle} data-rs="reveal">Đặt buổi trải nghiệm đầu tiên.</h2>
          <p className={`${styles.lede} ${styles.ledeLight}`} data-rs="reveal">Gửi khoá và khung giờ bạn muốn. Trường xác nhận giờ thật theo biển, giữ chỗ bằng cọc một phần, phần còn lại thanh toán trước buổi học.</p>
          <ol className={styles.bookSteps} data-rs="reveal">
            {BOOK_STEPS.map((b, i) => (
              <li key={b.t}><span aria-hidden="true">{i + 1}</span><div><b>{b.t}</b><small>{b.d}</small></div></li>
            ))}
          </ol>
          <div className={styles.ctaRow} data-rs="reveal">
            <ShineSweep trigger="hover" color="rgba(255,233,194,.55)" className={styles.shine}>
              <a className={`${styles.btn} ${styles.btnOrange} ${styles.btnLg}`} href={buildConsultHref(SLUG)}>Đặt lịch học</a>
            </ShineSweep>
            <a className={`${styles.btn} ${styles.btnGhostLight}`} href="#chon-khoa">Chọn khoá trước</a>
          </div>
        </div>
        <div className={styles.ctaSticker}><Sticker uid="cta" size={190} /></div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footStripes} aria-hidden="true"><i /><i /><i /><i /></div>
      <div className={styles.footPhoto}><Photo file="hai-bong-ven-bo" alt="Hai bóng người cầm ván đứng ven bờ dưới trời đỏ cam" sizes="100vw" pos="50% 46%" w={1200} /></div>
      <div className={`${styles.wrap} ${styles.footGrid}`}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ID}/logo-reversed.svg`} alt="Ráng Sóng Surf Club" width={220} height={202} loading="lazy" className={styles.footLogo} />
          <p className={styles.footLine}>Trường dạy lướt sóng ở Sơn Trà, Đà Nẵng.</p>
        </div>
        <nav aria-label="Liên kết cuối trang">
          <p className={styles.footH}>Trang</p>
          <ul>
            {FOOT_NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
            <li><a href="/demos/luot-song/credits">Ảnh &amp; ghi công</a></li>
          </ul>
        </nav>
        <div>
          <p className={styles.footH}>Liên hệ</p>
          <ul>
            <li>{FOOTER.area}</li>
            <li><span translate="no">{FOOTER.email}</span></li>
            <li><span translate="no">{FOOTER.phone}</span></li>
          </ul>
        </div>
      </div>
      <div className={`${styles.wrap} ${styles.footBase}`}>
        <p>Giá là giá tham khảo. Điều kiện biển thực tế do huấn luyện viên quyết định mỗi buổi.</p>
        <p>Made with salt, sun &amp; soul · Trang do Trần Công Tiến thiết kế.</p>
      </div>
    </footer>
  );
}
