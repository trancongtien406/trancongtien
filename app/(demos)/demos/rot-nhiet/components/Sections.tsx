import styles from "../brand.module.css";
import { FAQ } from "../data/faq";
import { Photo } from "./Photo";

const LOGO = "/images/demos/rot-nhiet/identity/logo-reversed.svg";

export function Process() {
  const steps = [
    { n: "01", t: "Chọn hạt", d: "Tìm loại hạt phù hợp với cá tính hương vị muốn tạo ra.", img: "khay-hat-rang", alt: "Tay cầm khay inox đầy hạt cà phê vừa rang", pos: "50% 50%" },
    { n: "02", t: "Lên nhiệt", d: "Điều chỉnh mức rang để làm nổi bật đặc điểm của từng loại hạt.", heat: true },
    { n: "03", t: "Xay đúng", d: "Chọn độ xay phù hợp với dụng cụ và phương pháp pha.", img: "may-xay-bot", alt: "Bột cà phê xay trong tay cầm pha", pos: "50% 55%" },
    { n: "04", t: "Rót ra", d: "Kiểm soát cách chiết xuất để có một ly cà phê cân bằng theo gu.", img: "pour-over-tu-tren", alt: "Nhìn từ trên xuống phễu lọc đang được rót nước", pos: "50% 50%" },
  ];
  return (
    <section id="rang-pha" className={`${styles.section} ${styles.processSection}`} aria-labelledby="rn-proc-h">
      <div className={styles.wrap}>
        <div className={styles.sectionHead} data-rn-reveal>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>04 / FROM BEAN TO CUP</span>
            <h2 id="rn-proc-h" className={`${styles.display} ${styles.h2}`}>Từ hạt đến ly.</h2>
          </div>
          <p className={styles.lead}>Một ly cà phê bắt đầu trước cả lúc nước chạm vào bột. Từ chọn hạt, định hình mức rang đến cách xay và chiết xuất, từng bước đều góp phần tạo nên hương vị.</p>
        </div>
        <ol className={styles.steps4} data-rn-reveal>
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
        <div className={styles.closing}>
          <p>Không có một công thức cho tất cả. Chỉ có cách pha phù hợp với bạn.</p>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href="#hat-ca-phe">Khám phá hạt cà phê</a>
        </div>
        <p className={styles.helper}>Đây là mô tả quy trình rang chung của cà phê. Con số 230°C chỉ là mức tham khảo.</p>
      </div>
    </section>
  );
}

export function Manifesto() {
  const text = "Không có cách thưởng thức duy nhất. Chỉ có những lựa chọn phù hợp với bạn.";
  return (
    <section id="cau-chuyen" className={`${styles.section} ${styles.manifesto} ${styles.darkZone}`} aria-labelledby="rn-man-h">
      <div className={styles.wrap}>
        <div className={styles.manifestoGrid}>
          <div className={styles.manifestoText}>
            <span className={`${styles.label} ${styles.eyebrow}`}>05 / THE MANIFESTO</span>
            <h2 id="rn-man-h" className={styles.srOnly}>Cà phê không theo khuôn.</h2>
            <p className={`${styles.display} ${styles.manifestoStatement}`} aria-hidden="true">
              {text.split(" ").map((w, i) => <span key={i} className={styles.word} data-rn-word>{w}</span>)}
            </p>
            <p className={styles.srOnly}>{text}</p>
            <p className={styles.manifestoSub}>Uống theo gu. Sống theo nhịp của bạn.</p>
            <p className={styles.story}>Rót Nhiệt bắt đầu từ một câu hỏi đơn giản: tại sao một ly cà phê ngon lại phải phức tạp đến thế? Chúng tôi thích tiếng hạt cà phê reo trong máy rang, mùi thơm khi vừa xay và khoảnh khắc dòng cà phê đầu tiên chạm đáy ly. Với Rót Nhiệt, mỗi hạt đều có cá tính riêng, giống như mỗi người đều có một gu riêng. Có người thích đậm, có người thích chua thanh, có người chỉ cần một ly sữa đá đúng lúc. Không có cách thưởng thức duy nhất. Chỉ có những lựa chọn phù hợp với bạn. Chúng tôi muốn mang sự tò mò, niềm vui và nhiệt thành vào mỗi lần rót.</p>
            <p style={{ marginTop: 28 }}><a className={`${styles.btn} ${styles.btnPaper}`} href="#tim-gu">Tìm gu của bạn</a></p>
            <p className={`${styles.foot} ${styles.label}`}>Rót Nhiệt · cà phê rang theo gu của bạn.</p>
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
            <span className={`${styles.label} ${styles.eyebrow}`}>06 / GOOD TO KNOW</span>
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
            <h2 id="rn-final-h" className={`${styles.display} ${styles.finalTitle}`}>Hẹn nhau ở một ly cà phê.</h2>
            <p className={styles.finalBox}>Đậm hay nhẹ, quen thuộc hay mới lạ, cứ chọn theo cách của bạn.</p>
            <div className={styles.ctaRow}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#menu">Khám phá menu ↗</a>
              <a className={`${styles.btn} ${styles.btnPaper}`} href="#tim-gu">Tìm gu của bạn</a>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href={consultHref}>Làm web như thế này</a>
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
            <p style={{ marginTop: 8, maxWidth: "34em" }}>Cà phê rang, pha và uống theo gu riêng của bạn. Menu, hồ sơ hạt và giá tham khảo có ngay trên trang.</p>
          </div>
          <nav className={styles.fCol} aria-label="Khám phá"><h3>Khám phá</h3><ul><li><a href="#menu">Menu</a></li><li><a href="#tim-gu">Tìm gu cà phê</a></li><li><a href="#hat-ca-phe">Hạt cà phê</a></li></ul></nav>
          <nav className={styles.fCol} aria-label="Dự án"><h3>Về dự án</h3><ul><li><a href="#cau-chuyen">Câu chuyện</a></li><li><a href="#faq">Hỏi đáp</a></li><li><a href={creditsHref}>Ảnh &amp; ghi công</a></li><li><a href="#top">Lên đầu trang ↑</a></li></ul></nav>
        </div>
        <p className={`${styles.display} ${styles.fBig}`} aria-hidden="true">Rót Nhiệt.</p>
        <div className={styles.fSmall}>
          <span>Giá ghi trên trang là giá tham khảo.</span>
          <span className={styles.sign}>Website do Trần Công Tiến thiết kế</span>
        </div>
      </div>
    </footer>
  );
}
