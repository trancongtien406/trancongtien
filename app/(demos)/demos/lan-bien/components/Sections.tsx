import { SplitWords } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import { ABOUT, BOOKING_STEPS, FAQ, FOOTER_LINKS, HEALTH, SAFETY } from "../data/content";
import { Photo } from "./Photo";
import { WaterImage } from "./WaterImage";
import styles from "../brand.module.css";

export function About() {
  return (
    <section id="gioi-thieu" className={styles.about} aria-labelledby="about-title">
      <div className={styles.wrap}>
        <div className={styles.aboutGrid}>
          <div>
            <p className={styles.kicker} data-lb="reveal">Về Tầng Xanh</p>
            <h2 id="about-title" className={styles.h2}><SplitWords as="span">Trung tâm lặn ở Sơn Trà, dạy từ buổi đầu tiên.</SplitWords></h2>
            <p className={styles.lede} data-lb="reveal">{ABOUT.lead}</p>
          </div>
          <ul className={styles.aboutList}>
            {ABOUT.items.map((it, i) => (
              <li key={it.t} data-lb="reveal"><span>{String(i + 1).padStart(2, "0")}</span><h3>{it.t}</h3><p>{it.d}</p></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Safety() {
  return (
    <section id="an-toan" className={styles.safety} aria-labelledby="safety-title">
      <div className={styles.wrap}>
        <div className={styles.safetyHead}>
          <p className={styles.kicker} data-lb="reveal">An toàn và sức khoẻ</p>
          <h2 id="safety-title" className={styles.h2}><SplitWords as="span">Điều kiện sức khoẻ và quy định an toàn.</SplitWords></h2>
          <p className={styles.lede} data-lb="reveal">Một buổi lặn phù hợp bắt đầu từ sức khoẻ, kiến thức, sự chuẩn bị và điều kiện biển. Mọi khách phải khai báo sức khoẻ và nghe phổ biến an toàn trước khi xuống nước. Chúng tôi không cam kết an toàn tuyệt đối, vì không hoạt động dưới nước nào có thể làm vậy.</p>
        </div>
        <ul className={styles.safetyGrid}>
          {SAFETY.map((s) => (
            <li key={s.n} className={styles.safetyItem} data-lb="reveal">
              <span className={styles.safetyN}>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
        <div className={styles.health} data-lb="reveal">
          <h3>Hãy hỏi bác sĩ trước khi đăng ký nếu bạn có</h3>
          <ul>{HEALTH.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
        <p className={styles.fine} data-lb="reveal">Người mang thai, người có bệnh tim, phổi, tai, xoang, hen suyễn, động kinh hoặc đang dùng thuốc cần hỏi bác sĩ trước khi đăng ký. Trẻ em và người lớn tuổi tham gia theo điều kiện riêng của từng chương trình.</p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.wrap}>
        <div className={styles.faqGrid}>
          <header>
            <p className={styles.kicker} data-lb="reveal">Hỏi đáp</p>
            <h2 id="faq-title" className={styles.h2}><SplitWords as="span">Câu hỏi thường gặp trước khi đặt chỗ.</SplitWords></h2>
          </header>
          <div className={styles.faqList}>
            {FAQ.map((f, i) => (
              <details key={f.q} name="faq" className={styles.faqItem} data-lb="reveal" open={i === 0 ? true : undefined}>
                <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="dat-cho" className={styles.final} aria-labelledby="final-title">
      <WaterImage className={styles.finalMedia} hover={7} scrollPeak={9} fx="water-final">
        <Photo file="bo-bien" alt="Mũi đất phủ cây nhìn từ trên cao, nước biển xanh thẫm" sizes="100vw" pos="50% 55%" />
      </WaterImage>
      <div className={styles.finalShade} aria-hidden="true" />
      <div className={`${styles.wrap} ${styles.finalInner}`}>
        <p className={styles.kicker} data-lb="reveal">Đặt chỗ</p>
        <h2 id="final-title" className={styles.finalTitle}><SplitWords as="span">Chọn ngày, chúng tôi xếp nhóm và báo lại.</SplitWords></h2>
        <p className={styles.lede} data-lb="reveal">Gửi chương trình, ngày mong muốn và số người. Điều phối viên trả lời trong ngày làm việc, 07:00 đến 19:00 mỗi ngày, kèm giờ tập trung và phiếu khai báo sức khoẻ.</p>
        <ol className={styles.bookSteps} data-lb="reveal">
          {BOOKING_STEPS.map((b) => <li key={b.n}><b>{b.n}</b><span><strong>{b.t}</strong>{b.d}</span></li>)}
        </ol>
        <div className={styles.finalCtas} data-lb="reveal">
          <a className={`${styles.btn} ${styles.btnCoral} ${styles.btnLg}`} href={buildConsultHref("lan-bien")} data-cursor="Gửi">Đặt chỗ lặn</a>
          <a className={`${styles.btn} ${styles.btnGhost} ${styles.btnLg}`} href="#cong-cu">Chưa biết chọn khoá nào?</a>
        </div>
        <p className={styles.fine} data-lb="reveal">Giữ chỗ bằng đặt cọc theo chương trình. Nếu huấn luyện viên dời lịch vì biển, bạn được đổi sang ngày khác không mất phí. Giá và điều khoản được xác nhận bằng văn bản khi đặt.</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footGrid}>
          <div className={styles.footBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/lan-bien/identity/logo-primary-reversed.svg" alt="Tầng Xanh" width={196} height={160} />
            <p>Trung tâm lặn biển và thể thao nước ở Quận Sơn Trà, Đà Nẵng: lặn thử, khoá Open Water và nâng cao, tour san hô Sơn Trà và Cù Lao Chàm.</p>
          </div>
          <nav aria-label="Liên kết chân trang">
            <h2>Trong trang</h2>
            <ul>{FOOTER_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </nav>
          <div>
            <h2>Liên hệ</h2>
            <ul>
              <li><a href="mailto:xinchao@tangxanh.example">xinchao@tangxanh.example</a></li>
              <li><span translate="no">0236 000 0000</span></li>
              <li><span>Quận Sơn Trà, Đà Nẵng</span></li><li><span>07:00 đến 19:00 mỗi ngày</span></li>
              <li><a href={buildConsultHref("lan-bien")}>Đặt chỗ lặn</a></li>
            </ul>
          </div>
        </div>
        <p className={styles.footSafe}>Mọi hoạt động lặn đều có rủi ro và cần sức khoẻ phù hợp, hướng dẫn viên và điều kiện biển cho phép. Nội dung trên trang chỉ nhằm giới thiệu, không thay thế đào tạo hay đánh giá trực tiếp.</p>
        <div className={styles.footBase}>
          <span>© Tầng Xanh</span>
          <a href="/demos/lan-bien/credits">Ảnh &amp; ghi công</a>
          <span>Website do {siteConfig.fullName} thiết kế</span>
        </div>
      </div>
    </footer>
  );
}
