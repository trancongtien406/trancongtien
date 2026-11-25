import { MagneticButton, ShineSweep, ClipReveal } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { FAQ, FOOTER, ID, NAV, SLUG } from "../data/content";
import { Divider, Sticker } from "./Art";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function Faq() {
  return (
    <section id="hoi-dap" className={styles.faq} aria-labelledby="hd-title">
      <Divider fill="var(--rs-sand)" className={styles.dividerTop} />
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <div>
          <p className={styles.kickerLight} data-rs="reveal">Hỏi nhanh trước khi ra biển</p>
          <h2 id="hd-title" className={`${styles.h2} ${styles.h2Light}`} data-rs="reveal">Bạn hỏi, <span className={styles.scriptSun}>biển trả lời</span></h2>
          <ClipReveal variant="circle" origin="50% 100%" className={styles.faqPhoto} innerScale={1.1}>
            <div className={styles.faqPhotoFrame}><Photo file="bong-chieu" alt="Bóng người ôm ván trên mặt biển vàng sẫm lúc xế chiều" sizes="(max-width: 900px) 80vw, 30vw" w={1200} pos="50% 40%" /></div>
          </ClipReveal>
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
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.ctaBg} aria-hidden="true"><Photo file="bot-song-vang" alt="" sizes="100vw" pos="50% 55%" /></div>
      <div className={styles.ctaShade} aria-hidden="true" />
      <div className={`${styles.wrap} ${styles.ctaInner}`}>
        <div>
          <p className={styles.kickerLight} data-rs="reveal">Hẹn nhau ngoài biển</p>
          <h2 id="cta-title" className={`${styles.ctaTitle}`} data-rs="reveal">Sóng không chờ mãi đâu.</h2>
          <p className={`${styles.lede} ${styles.ledeLight}`} data-rs="reveal">Đặt buổi học đầu tiên và biết cảm giác đứng trên ván. Huấn luyện viên sẽ trao đổi lịch, biển và những điều cần chuẩn bị cùng bạn.</p>
          <div className={styles.ctaRow} data-rs="reveal">
            <MagneticButton>
              <ShineSweep trigger="hover" color="rgba(255,233,194,.55)" className={styles.shine}>
                <a className={`${styles.btn} ${styles.btnOrange} ${styles.btnLg}`} href={buildConsultHref(SLUG)}>Hẹn buổi học đầu tiên</a>
              </ShineSweep>
            </MagneticButton>
            <a className={`${styles.btn} ${styles.btnGhostLight}`} href="#lap-ke-hoach">Lên kế hoạch trước</a>
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
          <p className={styles.footLine}>Chạm sóng, bắt nắng.</p>
        </div>
        <nav aria-label="Liên kết cuối trang">
          <p className={styles.footH}>Trang</p>
          <ul>
            {NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
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
        <p>Điều kiện thực tế do huấn luyện viên quyết định mỗi buổi. Giá trên trang là giá tham khảo.</p>
        <p>Made with salt, sun &amp; soul · Trang do Trần Công Tiến thiết kế.</p>
      </div>
    </footer>
  );
}
