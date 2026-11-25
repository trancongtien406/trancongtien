import { buildConsultHref } from "@/features/showroom/consultation";
import { ClipReveal, MagneticButton, ShineSweep, SplitWords } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import { FAQ, LANGS, MASCOTS, NAV, PRICES, SLUG } from "../data/content";
import { Mascot } from "./Mascot";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });

export function Teachers() {
  return (
    <section id="doi-ngu" className={`${styles.panel} ${styles.panelWhite}`} aria-labelledby="tch-title">
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Người dẫn lớp</p>
        <h2 id="tch-title" className={styles.h2}>Mỗi ngôn ngữ có một người bạn đồng hành.</h2>
      </div>
      <ul className={styles.mascots}>
        {MASCOTS.map((m, i) => (
          <li key={m.id} className={styles.mascotCard} data-tone={i}>
            <Mascot id={m.id} size={132} className={styles.mascotArt} />
            <p className={styles.levelTag}>{LANGS.find((l) => l.id === m.lang)!.name}</p>
            <h3 className={styles.h3}>{m.name}</h3>
            <p className={styles.dim}>{m.role}</p>
            <p className={styles.mascotLine}>“{m.line}”</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Pricing() {
  const head = PRICES[0].rows;
  return (
    <section id="hoc-phi" className={`${styles.panel} ${styles.panelMist}`} aria-labelledby="price-title">
      <div className={styles.priceGrid}>
        <div>
          <p className={styles.kicker}>Học phí tham khảo</p>
          <h2 id="price-title" className={styles.h2}><SplitWords as="span">Rõ ràng theo ngôn ngữ và cấp độ.</SplitWords></h2>
          <p className={styles.lede}>Giá tham khảo cho một khoá 24 buổi, học nhóm nhỏ. Học phí chính thức và các ưu đãi được tư vấn viên xác nhận khi bạn đăng ký.</p>
        </div>
        <div className={styles.priceRight}><div className={styles.tableWrap}>
          <table className={styles.price}>
            <caption className={styles.srOnly}>Học phí tham khảo cho một khoá 24 buổi, tính theo VND</caption>
            <thead>
              <tr><th scope="col">Ngôn ngữ</th>{head.map((r) => <th key={r.label} scope="col">{r.label}<small>{r.levels}</small></th>)}</tr>
            </thead>
            <tbody>
              {PRICES.map((p) => (
                <tr key={p.lang}>
                  <th scope="row">{LANGS.find((l) => l.id === p.lang)!.name}</th>
                  {p.rows.map((r) => <td key={r.label} data-label={r.label}>{money.format(r.price)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.note}>Giá tham khảo, đã gồm giáo trình điện tử và thẻ từ vựng. Bài kiểm tra cấp độ miễn phí.</p>
        </div>
        <ClipReveal variant="inset" from="left" className={styles.priceImgWrap}>
          <div className={styles.priceImg}><Photo file="van-phong-pastel" alt="Vở và bút màu pastel xếp gọn trên nền sáng" sizes="(max-width: 900px) 90vw, 50vw" w={2000} pos="50% 35%" /></div>
        </ClipReveal>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={`${styles.panel} ${styles.panelWhite}`} aria-labelledby="faq-title">
      <div className={styles.faqGrid}>
        <div>
          <p className={styles.kicker}>Hỏi nhanh</p>
          <h2 id="faq-title" className={styles.h2}>Những điều bạn hay hỏi trước khi đăng ký.</h2>
        </div>
        <div className={styles.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.faq}>
              <summary>{f.q}<span aria-hidden="true" className={styles.plus} /></summary>
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
    <section className={`${styles.panel} ${styles.panelYellow} ${styles.final}`} aria-labelledby="final-title">
      <div className={styles.finalGrid}>
        <div>
          <h2 id="final-title" className={styles.hFinal}><SplitWords as="span">Một câu chào đầu tiên, bắt đầu từ hôm nay.</SplitWords></h2>
          <p className={styles.lede}>Chọn lớp trong lịch hoặc để lại nhu cầu, tư vấn viên sẽ sắp lớp đúng cấp và đúng giờ rảnh của bạn.</p>
          <div className={styles.heroActions}>
            <MagneticButton>
              <ShineSweep trigger="loop" every={4} className={styles.shine}>
                <a className={`${styles.btn} ${styles.btnNavy} ${styles.btnLg}`} href={buildConsultHref(SLUG)}>Đăng ký tư vấn</a>
              </ShineSweep>
            </MagneticButton>
            <a className={`${styles.btn} ${styles.btnGhostN} ${styles.btnLg}`} href="#cong-cu">Làm bài kiểm tra trước</a>
          </div>
        </div>
        <ClipReveal variant="inset" from="right" className={styles.finalImgWrap}>
          <div className={styles.finalImg}><Photo file="hoc-ca-phe" alt="Sách mở có ghi chú, bút và laptop trên bàn học cạnh miếng bánh" sizes="(max-width: 900px) 90vw, 38vw" /></div>
        </ClipReveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footGrid}>
        <div className={styles.footBrand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/ngoai-ngu-sao/identity/logo-reversed.svg" alt="Mở Lời" width={170} height={46} />
          <p>Trung tâm tiếng Anh, tiếng Nhật và tiếng Hàn ở Đà Nẵng. Học bằng cách nói trước.</p>
        </div>
        <nav aria-label="Liên kết chân trang">
          <h2>Trong trang</h2>
          <ul>{NAV.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
        </nav>
        <div>
          <h2>Liên hệ</h2>
          <ul>
            <li><a href="mailto:xinchao@moloi.example">xinchao@moloi.example</a></li>
            <li><span translate="no">0236 000 0000</span></li>
            <li><span>Đà Nẵng</span></li>
            <li><a href={buildConsultHref(SLUG)}>Đăng ký tư vấn</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footBase}>
        <span translate="no">© Mở Lời</span>
        <a href="/demos/ngoai-ngu-sao/credits">Ảnh &amp; ghi công</a>
        <span>Website do {siteConfig.fullName} thiết kế</span>
      </div>
    </footer>
  );
}
