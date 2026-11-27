import type { Metadata } from "next";
import styles from "./brand.module.css";
import { Figure } from "./components/Figure";
import { Fitting } from "./components/Fitting";
import { Motion } from "./components/Motion";

export const metadata: Metadata = {
  title: "Phi Dáng · Nhà mốt Thu Đông, sàn diễn cuộn ngang (demo minh hoạ)",
  description: "Demo minh hoạ landing thời trang cao cấp với sàn diễn cuộn ngang được ghim.",
  alternates: { canonical: "/demos/phi-dang" },
};

const looks = [
  { n: "01", name: "Áo khoác dáng dài", mat: "Len dệt 2 lớp, lót lụa", price: "38.500.000", tone: "cream" },
  { n: "02", name: "Đầm xẻ vạt", mat: "Satin cát, đường cắt chéo", price: "24.900.000", tone: "ink" },
  { n: "03", name: "Suit oversize", mat: "Wool crepe, vai độn nhẹ", price: "42.000.000", tone: "red" },
  { n: "04", name: "Áo choàng", mat: "Cashmere pha, lót đỏ", price: "56.000.000", tone: "cream" },
  { n: "05", name: "Jumpsuit đỏ", mat: "Gabardine, đai nổi", price: "29.800.000", tone: "ink" },
  { n: "06", name: "Chân váy xếp ly", mat: "Organza gấp tay", price: "17.600.000", tone: "red" },
] as const;

const press = [
  { v: 6, l: "thiết kế trong bộ sưu tập mẫu" },
  { v: 14, l: "ngày cho một thiết kế đo may" },
  { v: 3, l: "lần thử đồ trước khi hoàn thiện" },
  { v: 1, l: "thợ cả theo từng chiếc áo" },
];
const process = [
  { t: "Phác", d: "Gặp gỡ, chọn dáng, phác trên cơ thể bạn thay vì trên giấy." },
  { t: "Cắt", d: "Rập riêng theo số đo, cắt tay trên vải đã xả co." },
  { t: "Thử", d: "Ba lần thử: dựng khung, chỉnh đường may, hoàn thiện." },
  { t: "Trao", d: "Giao kèm hướng dẫn bảo quản và túi vải bọc riêng." },
];
const faqs = [
  { q: "Bao lâu thì nhận được thiết kế đo may?", a: "Mẫu thông thường khoảng 14 ngày làm việc sau buổi lấy số đo. Đây là thông tin minh hoạ cho trang demo." },
  { q: "Tôi có thể thử trước khi quyết định?", a: "Có. Đặt lịch thử đồ ở cuối trang để chọn thiết kế và cỡ mong muốn (biểu mẫu mô phỏng)." },
  { q: "Chính sách chỉnh sửa thế nào?", a: "Chỉnh sửa đường may trong 30 ngày đầu. Chính sách trên trang chỉ là ví dụ về cách trình bày." },
  { q: "Phi Dáng có phải thương hiệu thật?", a: "Không. Tên, bộ sưu tập, giá và nội dung đều là minh hoạ." },
];

function Chars({ text }: { text: string }) {
  return (
    <span aria-label={text} className={styles.chars}>
      {Array.from(text.normalize("NFC")).map((c, i) => (
        <span key={i} className={styles.chMask} aria-hidden="true"><span data-ch className={styles.ch}>{c}</span></span>
      ))}
    </span>
  );
}

const manifesto = "Chúng tôi không may quần áo để người ta nhìn thấy quần áo. Chúng tôi may để người ta nhìn thấy dáng đi.".split(" ");

export default function Page() {
  return (
    <div className={styles.brand} data-pd-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Motion />
      <header className={styles.header}>
        <a href="#top" className={styles.logo} aria-label="Phi Dáng, về đầu trang">PHI DÁNG</a>
        <p className={styles.season} aria-hidden="true">Thu Đông · bộ sưu tập minh hoạ</p>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#san-dien">Sàn diễn</a><a href="#bang-gia">Bảng giá</a><a href="#quy-trinh">Đo may</a><a href="#thu-do">Thử đồ</a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.hero} id="top" data-hero>
          <span className={styles.redSun} data-hero-red aria-hidden="true" />
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine} data-hero-a><Chars text="PHI" /></span>
            <span className={`${styles.heroLine} ${styles.heroLine2}`} data-hero-b><Chars text="DÁNG" /></span>
          </h1>
          <div className={styles.heroMeta}>
            <p>Nhà mốt minh hoạ<br />Thu Đông 2026</p>
            <p>Đo may theo dáng, từng chiếc một.</p>
            <a className={styles.btn} href="#san-dien">Vào sàn diễn</a>
          </div>
          <p className={styles.scroll} aria-hidden="true">Cuộn ↓</p>
        </section>

        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.tickerTrack}>
            {[0, 1].map((k) => <span key={k}>THU ĐÔNG ✦ ĐO MAY ✦ DÁNG ĐI ✦ LỤA ✦ LEN ✦ HANDMADE ✦ THU ĐÔNG ✦ ĐO MAY ✦ DÁNG ĐI ✦ LỤA ✦ LEN ✦ HANDMADE ✦ </span>)}
          </div>
        </div>

        <section className={styles.manifesto} data-manifesto aria-labelledby="mf">
          <h2 id="mf" className={styles.eyebrow}>Tuyên ngôn</h2>
          <p className={styles.mfText}>{manifesto.map((w, i) => (<span key={i} data-w>{w} </span>))}</p>
        </section>

        <section className={styles.runway} id="san-dien" data-runway aria-label="Sàn diễn sáu thiết kế, cuộn ngang">
          <div className={styles.runwayHead}>
            <p><span data-look>01</span> / 06</p>
            <div className={styles.barWrap}><i data-bar /></div>
            <p className={styles.eyebrowLight}>Sàn diễn · cuộn để đi dọc</p>
          </div>
          <div className={styles.viewport} tabIndex={0} role="region" aria-label="Danh sách sáu thiết kế">
            <ol className={styles.track} data-track>
              {looks.map((l, i) => (
                <li key={l.n} className={`${styles.panel} ${styles[l.tone]}`} data-panel>
                  <p className={styles.big} data-big aria-hidden="true">LOOK {l.n}</p>
                  <div className={styles.fig} data-fig><Figure variant={i} label={`Hình minh hoạ ${l.name}`} /></div>
                  <div className={styles.info}>
                    <p className={styles.num}>{l.n}</p>
                    <h3>{l.name}</h3>
                    <p>{l.mat}</p>
                    <p className={styles.price}>{l.price} ₫ <small>giá minh hoạ</small></p>
                  </div>
                </li>
              ))}
              <li className={`${styles.panel} ${styles.end}`} data-panel>
                <p className={styles.endText}>Hết<br />sàn diễn.</p>
                <a className={styles.btn} href="#thu-do">Đặt lịch thử đồ</a>
              </li>
            </ol>
          </div>
        </section>

        <section className={styles.index} id="bang-gia" aria-labelledby="bg">
          <h2 id="bg" className={styles.h2} data-rise>Bảng giá</h2>
          <ul className={styles.table} data-rows>
            {looks.map((l) => (
              <li key={l.n}><span>{l.n}</span><b>{l.name}</b><em>{l.mat}</em><span className={styles.tp}>{l.price} ₫</span></li>
            ))}
          </ul>
          <p className={styles.fine}>Giá và chất liệu chỉ để minh hoạ bố cục bảng giá.</p>
        </section>

        <section className={styles.numbers} aria-label="Con số minh hoạ">
          <ul>{press.map((p) => (<li key={p.l}><b><span data-count={p.v}>{p.v}</span></b><span>{p.l}</span></li>))}</ul>
        </section>

        <section className={styles.process} id="quy-trinh" aria-labelledby="qt">
          <h2 id="qt" className={styles.h2} data-rise>Đo may</h2>
          <ol className={styles.steps} data-rows>
            {process.map((s, i) => (<li key={s.t}><span>0{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>))}
          </ol>
        </section>

        <section className={styles.quote} aria-label="Trích dẫn mẫu">
          <blockquote data-rise>“Một chiếc áo đúng không phải chiếc áo đẹp nhất. Đó là chiếc áo bạn quên mất mình đang mặc.”</blockquote>
          <p>Trích dẫn mẫu, nhân vật giả định</p>
        </section>

        <section className={styles.faq} aria-labelledby="fq">
          <h2 id="fq" className={styles.h2} data-rise>Hỏi đáp</h2>
          <div className={styles.faqList} data-rise>
            {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
          </div>
        </section>

        <section className={styles.fit} id="thu-do" aria-labelledby="td">
          <div>
            <h2 id="td" className={styles.h2Light}>Thử<br />đồ.</h2>
            <p className={styles.lead}>Chọn một thiết kế, một cỡ và một ngày. Chúng tôi giữ chỗ cho bạn tại atelier (mô phỏng).</p>
          </div>
          <Fitting />
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footWord} aria-hidden="true">PHI DÁNG</p>
        <p>Trang demo minh hoạ. Thương hiệu, bộ sưu tập, giá và trích dẫn đều là giả định, không đại diện cho nhà mốt nào.</p>
      </footer>
    </div>
  );
}
