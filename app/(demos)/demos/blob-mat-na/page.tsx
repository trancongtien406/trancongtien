import styles from "./brand.module.css";
import { BlobHero } from "./components/BlobHero";
import { Accordion, ContactForm, Newsletter, RevealRoot } from "./components/Interactive";
import { FAQ, MARQUEE, NOTES, PLANS, REVIEWS, SERVICES, STATS, STEPS, WORK } from "./components/data";

export default function Page() {
  return (
    <RevealRoot>
      <div className={styles.mn}>
        <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
        <BlobHero>
          <header className={styles.top}>
            <div className={styles.intro}>
              <p>Nơi những ý tưởng nhàm chán bị quét xuống dưới lớp bụi.</p>
              <a className={styles.pill} href="#lien-he">YÊU CẦU DỰ ÁN <span aria-hidden="true">›</span></a>
            </div>
            <nav aria-label="Chính" className={styles.nav}>
              <a href="#main"><i>/01</i> Trang chủ</a>
              <a href="#gioi-thieu"><i>/02</i> Giới thiệu</a>
              <a href="#du-an"><i>/03</i> Dự án</a>
              <a href="#dich-vu"><i>/04</i> Dịch vụ</a>
              <a href="#lien-he"><i>/05</i> Liên hệ</a>
            </nav>
          </header>
          <h1 className={styles.giant} aria-label="Mặt Nạ Blob">MẶT NẠ</h1>
          <footer className={styles.bottom}><span>(2026)</span><a href="#du-an">XEM PORTFOLIO</a></footer>
        </BlobHero>

        <main id="main">
          <div className={styles.marquee} aria-hidden="true">
            <div>{[0, 1].map((k) => <span key={k}>{MARQUEE.map((m) => <b key={m}>{m} <i>✺</i></b>)}</span>)}</div>
          </div>

          <section id="gioi-thieu" className={`${styles.sec} ${styles.about}`} aria-labelledby="mn-about">
            <h2 id="mn-about" className={styles.label}><i>/02</i> Giới thiệu</h2>
            <div>
              <p className={styles.big} data-r>Mình là nhà thiết kế độc lập ở Đà Nẵng, làm nhận diện, giao diện và chuyển động. Mỗi dự án bắt đầu bằng việc bỏ bớt những gì thừa, rồi để lại một chi tiết khiến người xem muốn chạm vào.</p>
              <div className={styles.cols2} data-r>
                <p>Mình bắt đầu bằng dàn trang tạp chí in, rồi chuyển sang giao diện số khi nhận ra màn hình cũng cần nhịp thở như trang giấy. Chín năm qua, mình làm việc với quán ăn nhỏ, đội sản phẩm, quỹ học bổng và xưởng in thủ công.</p>
                <p>Mình tin vào chữ lớn, khoảng trắng rộng và những chuyển động ngắn có lý do. Hiệu ứng blob ở trang chủ là một ví dụ: con trỏ của bạn quét lớp bụi và để lộ điều ở bên dưới.</p>
              </div>
            </div>
          </section>

          <section id="du-an" className={styles.sec} aria-labelledby="mn-work">
            <h2 id="mn-work" className={styles.label}><i>/03</i> Dự án chọn lọc</h2>
            <ul className={styles.list}>
              {WORK.map((w) => (
                <li key={w.n} data-r>
                  <span>{w.n}</span>
                  <div><b>{w.t}</b><p>{w.d}</p></div>
                  <em>{w.k}</em><span>{w.y}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="dich-vu" className={styles.sec} aria-labelledby="mn-svc">
            <h2 id="mn-svc" className={styles.label}><i>/04</i> Dịch vụ</h2>
            <div data-r><Accordion items={SERVICES} idp="mn-svc" /></div>
          </section>

          <section className={`${styles.sec} ${styles.statsSec}`} aria-label="Con số">
            <ul className={styles.stats}>
              {STATS.map(([n, l]) => <li key={l} data-r><b>{n}</b><span>{l}</span></li>)}
            </ul>
          </section>

          <section id="quy-trinh" className={styles.sec} aria-labelledby="mn-proc">
            <h2 id="mn-proc" className={styles.label}><i>/05</i> Cách làm việc</h2>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => <li key={s.t} data-r><span>0{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>)}
            </ol>
          </section>

          <section id="ghi-chu" className={styles.sec} aria-labelledby="mn-notes">
            <h2 id="mn-notes" className={styles.label}><i>/06</i> Ghi chú</h2>
            <ul className={styles.notes}>
              {NOTES.map((n) => <li key={n.t} data-r><time>{n.d}</time><b>{n.t}</b><p>{n.s}</p></li>)}
            </ul>
          </section>

          <section className={styles.sec} aria-labelledby="mn-rev">
            <h2 id="mn-rev" className={styles.label}><i>/07</i> Lời khách <small>(minh hoạ)</small></h2>
            <ul className={styles.reviews}>
              {REVIEWS.map((r) => <li key={r.n} data-r><blockquote>{r.q}</blockquote><b>{r.n}</b><span>{r.r}</span></li>)}
            </ul>
          </section>

          <section id="bang-gia" className={styles.sec} aria-labelledby="mn-price">
            <h2 id="mn-price" className={styles.label}><i>/08</i> Gói làm việc <small>(giá minh hoạ)</small></h2>
            <ul className={styles.plans}>
              {PLANS.map((p) => (
                <li key={p.n} className={"hot" in p && p.hot ? styles.hot : ""} data-r>
                  <h3>{p.n}</h3><b>{p.p}</b>
                  <ul>{p.f.map((x) => <li key={x}>{x}</li>)}</ul>
                  <a href="#lien-he">CHỌN GÓI <span aria-hidden="true">↗</span></a>
                </li>
              ))}
            </ul>
          </section>

          <section id="hoi-dap" className={styles.sec} aria-labelledby="mn-faq">
            <h2 id="mn-faq" className={styles.label}><i>/09</i> Hỏi đáp</h2>
            <div data-r><Accordion items={FAQ} idp="mn-faq" /></div>
          </section>

          <section id="lien-he" className={`${styles.sec} ${styles.contact}`} aria-labelledby="mn-contact">
            <h2 id="mn-contact" className={styles.label}><i>/10</i> Liên hệ</h2>
            <div>
              <p className={styles.mailLead} data-r>Có dự án trong đầu? Kể mình nghe.</p>
              <a className={styles.mail} href="mailto:xin-chao@matnablob.example">xin-chao@matnablob.example</a>
              <div className={styles.contactGrid} data-r>
                <ContactForm />
                <div className={styles.side}>
                  <h3>Studio</h3>
                  <p>Tầng 3, 24 Nguyễn Văn Linh<br />Hải Châu, Đà Nẵng</p>
                  <p>0236 000 0000</p>
                  <p>Thứ Hai đến thứ Sáu, 9:00 đến 17:30</p>
                  <Newsletter />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.foot}>
          <div className={styles.footGiant} aria-hidden="true">MẶT NẠ BLOB</div>
          <div className={styles.footIn}>
            <nav aria-label="Chân trang">
              <a href="#main">Trang chủ</a><a href="#gioi-thieu">Giới thiệu</a><a href="#du-an">Dự án</a><a href="#dich-vu">Dịch vụ</a><a href="#bang-gia">Gói làm việc</a><a href="#hoi-dap">Hỏi đáp</a><a href="#lien-he">Liên hệ</a>
            </nav>
            <nav aria-label="Mạng xã hội"><a href="#lien-he">Instagram</a><a href="#lien-he">Behance</a><a href="#lien-he">LinkedIn</a></nav>
            <p>© 2026 Mặt Nạ Blob. Thương hiệu, dự án và số liệu trên trang chỉ để minh hoạ.</p>
          </div>
        </footer>
      </div>
    </RevealRoot>
  );
}
