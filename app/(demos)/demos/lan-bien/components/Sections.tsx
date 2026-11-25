import { MagneticButton, ScrollScrubText, SplitWords, VelocityMarquee } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import { FAQ, FOOTER_LINKS, SAFETY } from "../data/content";
import { Photo } from "./Photo";
import { WaterImage } from "./WaterImage";
import styles from "../brand.module.css";

export function Manifesto() {
  return (
    <section className={styles.manifesto} aria-label="Lời mở đầu">
      <div className={styles.wrap}>
        <p className={styles.kicker} data-lb="reveal">Trước khi xuống nước</p>
        <ScrollScrubText as="p" className={styles.manifestoText} dim={0.22}>
          Trên mặt nước, bạn nhìn thấy biển. Dưới mặt nước, bạn bắt đầu lắng nghe biển. Không cần vội xuống sâu. Hãy bắt đầu từ nơi bạn cảm thấy sẵn sàng.
        </ScrollScrubText>
      </div>
    </section>
  );
}

const CODE = ["Thở chậm", "Quan sát kỹ", "Giữ khoảng cách", "Không chạm vào san hô", "Không mang gì rời biển", "Luôn đi cùng hướng dẫn viên"];

export function Band() {
  return (
    <div className={styles.band} role="group" aria-label="Quy ước dưới nước của Tầng Xanh">
      <VelocityMarquee mode="velocity" speed={55} boost={0.7} reverseOnScrollUp pauseOnHover controls gap="3.2rem" className={styles.bandMarquee} buttonClassName={styles.bandBtn} pauseLabel="Dừng chữ chạy" playLabel="Chạy chữ">
        {CODE.map((t) => (
          <span key={t} className={styles.bandItem}>{t}<i aria-hidden="true" /></span>
        ))}
      </VelocityMarquee>
    </div>
  );
}

export function Safety() {
  return (
    <section id="an-toan" className={styles.safety} aria-labelledby="safety-title">
      <div className={styles.wrap}>
        <div className={styles.safetyHead}>
          <p className={styles.kicker} data-lb="reveal">An toàn và trách nhiệm</p>
          <h2 id="safety-title" className={styles.h2}><SplitWords as="span">Khám phá đẹp nhất khi bạn biết giới hạn của mình.</SplitWords></h2>
          <p className={styles.lede} data-lb="reveal">Đại dương luôn thay đổi. Một hành trình lặn phù hợp bắt đầu từ sức khoẻ, kiến thức, sự chuẩn bị và điều kiện thực tế. Tại Tầng Xanh, hiểu rõ hoạt động trước khi tham gia luôn đứng trước. Chúng tôi không cam kết an toàn tuyệt đối, vì không hoạt động dưới nước nào có thể làm vậy.</p>
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
            <h2 id="faq-title" className={styles.h2}><SplitWords as="span">Những điều bạn thường hỏi trước khi xuống nước.</SplitWords></h2>
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
    <section className={styles.final} aria-labelledby="final-title">
      <WaterImage className={styles.finalMedia} hover={7} scrollPeak={9} fx="water-final">
        <Photo file="bo-bien" alt="Mũi đất phủ cây nhìn từ trên cao, nước biển xanh thẫm" sizes="100vw" pos="50% 55%" />
      </WaterImage>
      <div className={styles.finalShade} aria-hidden="true" />
      <div className={`${styles.wrap} ${styles.finalInner}`}>
        <p className={styles.kicker} data-lb="reveal">Sẵn sàng khi bạn sẵn sàng</p>
        <h2 id="final-title" className={styles.finalTitle}><SplitWords as="span">Biển vẫn ở đó. Bạn chọn lúc xuống nước.</SplitWords></h2>
        <p className={styles.lede} data-lb="reveal">Hãy kể cho chúng tôi nghe kinh nghiệm và điều bạn muốn khám phá. Chúng tôi sẽ cùng bạn tìm một hành trình vừa sức, rồi xác nhận lịch theo điều kiện biển.</p>
        <div className={styles.finalCtas} data-lb="reveal">
          <MagneticButton><a className={`${styles.btn} ${styles.btnCoral} ${styles.btnLg}`} href={buildConsultHref("lan-bien")} data-cursor="Gửi">Đăng ký tư vấn</a></MagneticButton>
          <a className={`${styles.btn} ${styles.btnGhost} ${styles.btnLg}`} href="#cong-cu">Tìm cấp độ của tôi</a>
        </div>
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
            <p>Lặn biển và thể thao nước ở Cù Lao Chàm, Sơn Trà và biển miền Trung. Mỗi tầng nước, một câu chuyện.</p>
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
              <li><span>Đà Nẵng · Cù Lao Chàm · Sơn Trà</span></li>
              <li><a href={buildConsultHref("lan-bien")}>Đăng ký tư vấn</a></li>
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
