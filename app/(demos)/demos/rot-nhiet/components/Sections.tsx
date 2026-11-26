import styles from "../brand.module.css";
import { FAQ } from "../data/faq";
import { Grinder } from "./Grinder";
import { Photo } from "./Photo";

const LOGO = "/images/demos/rot-nhiet/identity/logo-reversed.svg";

export function Process() {
  const steps = [
    { n: "01", t: "Chọn hạt", d: "Chọn Robusta đậm, blend cân bằng hay Arabica rang sáng, tuỳ gu và cách pha.", img: "khay-hat-rang", alt: "Tay cầm khay inox đầy hạt cà phê vừa rang", pos: "50% 50%" },
    { n: "02", t: "Lên nhiệt", d: "Máy rang nhỏ của quán rang theo mẻ; mỗi mức rang làm nổi một đặc điểm của hạt.", heat: true },
    { n: "03", t: "Xay đúng", d: "Khi mua hạt, nhân viên xay theo cách pha của bạn: phin, espresso, V60 hay French press.", img: "may-xay-bot", alt: "Bột cà phê xay trong tay cầm pha", pos: "50% 55%" },
    { n: "04", t: "Rót ra", d: "Pha tại quầy hoặc mang hạt về pha; kiểm soát lượng nước và thời gian để ly cân bằng.", img: "pour-over-tu-tren", alt: "Nhìn từ trên xuống phễu lọc đang được rót nước", pos: "50% 50%" },
  ];
  return (
    <section id="rang-pha" className={`${styles.section} ${styles.processSection}`} aria-labelledby="rn-proc-h">
      <div className={styles.wrap}>
        <div className={styles.sectionHead} data-rn-reveal>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>05 / TỪ HẠT ĐẾN LY</span>
            <h2 id="rn-proc-h" className={`${styles.display} ${styles.h2}`}>Từ hạt đến ly.</h2>
          </div>
          <p className={styles.lead}>Bốn bước tại quán: chọn hạt, rang theo mẻ nhỏ, xay theo cách pha, rót ra ly. Hạt Robusta và Arabica đến từ vùng Tây Nguyên, rang tại quán ở Sơn Trà.</p>
        </div>
        <div className={styles.procGrid}>
          <Grinder targetId="rang-pha" />
          <ol className={styles.stepsV} data-rn-reveal>
            {steps.map((s) => (
              <li key={s.n} className={styles.step}>
                <div className={`${styles.stepMedia} ${s.heat ? styles.stepHeat : ""}`}>
                  {s.heat ? <span aria-hidden="true">230°C</span> : <Photo name={s.img!} alt={s.alt!} sizes="(max-width: 640px) 40vw, (max-width: 1100px) 45vw, 22vw" position={s.pos} size={600} />}
                </div>
                <div className={styles.stepBody}>
                  <div className={styles.stepNum}>{s.n}</div>
                  <h3 className={styles.stepTitle}>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.closing}>
          <p>Chưa có máy xay ở nhà? Cứ báo cách pha khi mua, quán xay giúp.</p>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href="#hat-ca-phe">Xem ba loại hạt</a>
        </div>
        <p className={styles.helper}>Con số 230°C chỉ là mức nhiệt tham khảo cho cà phê rang nói chung.</p>
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section id="cau-chuyen" className={`${styles.section} ${styles.manifesto} ${styles.darkZone}`} aria-labelledby="rn-man-h">
      <div className={styles.wrap}>
        <div className={styles.manifestoGrid}>
          <div className={styles.manifestoText}>
            <span className={`${styles.label} ${styles.eyebrow}`}>08 / VỀ QUÁN</span>
            <h2 id="rn-man-h" className={`${styles.display} ${styles.manifestoStatement}`}>Một quán nhỏ, một máy rang, ba loại hạt.</h2>
            <p className={styles.manifestoSub}>Uống tại quán, mua hạt về nhà, hoặc lấy sỉ cho quán của bạn.</p>
            <p className={styles.story}>Rót Nhiệt là quán cà phê rang xay ở Quận Sơn Trà, Đà Nẵng. Quầy bar pha cà phê phin, espresso, pour-over và cold brew; máy rang đặt sau kính để khách nhìn hạt đổi màu. Quán chỉ giữ ba loại hạt, từ rang đậm đến rang sáng, để mỗi loại được rang đều tay và bán khi còn thơm. Hạt Robusta và Arabica đến từ vùng Tây Nguyên. Bạn gọi ly, hoặc chọn một túi 250g, nhân viên xay đúng theo cách bạn pha.</p>
            <p style={{ marginTop: 28 }}><a className={`${styles.btn} ${styles.btnPaper}`} href="#quan">Xem quán và giờ mở cửa</a></p>
            <p className={`${styles.foot} ${styles.label}`}>Rót Nhiệt Coffee Roasters · Quận Sơn Trà, Đà Nẵng</p>
          </div>
          <div className={styles.manifestoPhoto} data-rn-reveal>
            <div className={styles.photoBox}><Photo name="ly-giay-tay" alt="Hai tay ôm ly giấy cà phê nóng" sizes="(max-width: 900px) 80vw, 30vw" position="50% 60%" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className={`${styles.section}`} aria-labelledby="rn-faq-h">
      <div className={styles.wrap}>
        <div className={styles.faqGrid}>
          <div className={styles.faqHead} data-rn-reveal>
            <span className={`${styles.label} ${styles.eyebrow}`}>10 / HỎI ĐÁP</span>
            <h2 id="rn-faq-h" className={`${styles.display} ${styles.h2}`}>Hỏi nhanh. Đáp gọn.</h2>
          </div>
          <div className={styles.faqList}>
            {FAQ.map((f, i) => (
              <details key={f.q} name="rn-faq" className={styles.faqItem}>
                <summary><span className={styles.faqNum}>0{i + 1}</span><span>{f.q}</span><span className={styles.faqPlus} aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Final({ consultHref }: { consultHref: string }) {
  return (
    <section className={`${styles.final} ${styles.redZone}`} aria-labelledby="rn-final-h">
      <div className={styles.wrap}>
        <div className={styles.finalGrid}>
          <div className={styles.finalText}>
            <h2 id="rn-final-h" className={`${styles.display} ${styles.finalTitle}`}>Ghé quán, hoặc mang hạt về.</h2>
            <p className={styles.finalBox}>Quận Sơn Trà, Đà Nẵng · mở 06:30–21:30 (cuối tuần 07:00–22:00). Cần giá sỉ hoặc hộp quà, gửi yêu cầu để quán báo giá.</p>
            <div className={styles.ctaRow}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#menu">Xem menu ↗</a>
              <a className={`${styles.btn} ${styles.btnPaper}`} href="#quan">Giờ mở cửa</a>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href={consultHref}>Gửi yêu cầu bán buôn</a>
            </div>
          </div>
          <div className={styles.finalPhoto}><Photo name="pour-over-tay" alt="Bàn tay rót nước từ ấm cổ ngỗng vào phễu pour-over" sizes="(max-width: 900px) 60vw, 24vw" position="72% 40%" /></div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ creditsHref }: { creditsHref: string }) {
  return (
    <footer className={`${styles.footer} ${styles.darkZone}`}>
      <div className={styles.wrap}>
        <div className={styles.footerGrid}>
          <div className={styles.fBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Rót Nhiệt Coffee Roasters" width={640} height={144} />
            <p style={{ marginTop: 16, fontWeight: 700 }}>Rang thật. Vị thật. Nhiệt thật.</p>
            <p style={{ marginTop: 8, maxWidth: "34em" }}>Quán cà phê rang xay ở Quận Sơn Trà, Đà Nẵng. Điện thoại 0236 000 0000 · hello@rotnhiet.example</p>
            <p style={{ marginTop: 4 }}>Mở 06:30–21:30 (thứ bảy, Chủ nhật 07:00–22:00).</p>
          </div>
          <nav className={styles.fCol} aria-label="Khám phá"><h3>Tại quán</h3><ul><li><a href="#menu">Menu</a></li><li><a href="#tim-gu">Tìm gu cà phê</a></li><li><a href="#hat-ca-phe">Hạt cà phê</a></li><li><a href="#quan">Quán và giờ mở cửa</a></li></ul></nav>
          <nav className={styles.fCol} aria-label="Thông tin"><h3>Thông tin</h3><ul><li><a href="#ban-buon">Bán buôn và quà tặng</a></li><li><a href="#faq">Hỏi đáp</a></li><li><a href={creditsHref}>Ảnh &amp; ghi công</a></li><li><a href="#top">Lên đầu trang ↑</a></li></ul></nav>
        </div>
        <p className={`${styles.display} ${styles.fBig}`} aria-hidden="true">Rót Nhiệt.</p>
        <div className={styles.fSmall}>
          <span>Giá ghi trên trang là giá tham khảo tại quán.</span>
          <span className={styles.sign}>Website do Trần Công Tiến thiết kế</span>
        </div>
      </div>
    </footer>
  );
}
