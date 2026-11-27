import styles from "./brand.module.css";
import { LiquidStage } from "./components/LiquidStage";
import { Motion } from "./components/Motion";
import { Sampler } from "./components/Sampler";

const PRODUCTS = [
  { n: "No.7 Đêm nhài", f: "Hoa · Gỗ", p: "2.350.000 ₫", c: "#C799A0", h: 1 },
  { n: "No.9 Tro trầm", f: "Khói · Da thuộc", p: "2.650.000 ₫", c: "#7a5560", h: 0.86 },
  { n: "No.3 Mưa cam", f: "Cam quýt · Xạ hương", p: "1.980.000 ₫", c: "#e0b79a", h: 0.94 },
  { n: "No.8 Hổ phách", f: "Nhựa thơm · Ấm", p: "2.450.000 ₫", c: "#b9806a", h: 0.9 },
];

const STEPS = [
  ["Lắng nghe", "Bạn kể một ký ức gắn với mùi hương: mái hiên sau mưa, ngăn tủ của bà."],
  ["Phác hương", "Nhà pha chế chọn nguyên liệu, đặt ba tầng hương lên giấy thử."],
  ["Ủ hương", "Dung dịch được ủ nhiều tuần cho các phân tử quyện lại."],
  ["Trao tay", "Chai được đóng, khắc số riêng và gói trong hộp giấy nhám."],
];

const FAQ = [
  ["Bộ thử mẫu gồm những gì?", "Ba ống 2 ml cho ba hương bạn chọn, kèm thẻ giấy thử và hướng dẫn cách thử trên da."],
  ["Nước hoa giữ mùi được bao lâu?", "Phụ thuộc cơ địa và thời tiết. Bản minh hoạ này nêu khoảng 6 đến 8 giờ như một ví dụ, không phải cam kết."],
  ["Có đổi trả không?", "Trong mô hình minh hoạ: chai chưa mở được đổi trong 14 ngày. Chính sách thật sẽ do thương hiệu thật quy định."],
  ["Có nhận khắc tên lên chai không?", "Có, tối đa 18 ký tự, thêm 120.000 ₫ (giá minh hoạ)."],
];

const REVIEWS = [
  ["Mở nắp ra là nhớ nhà ngoại. Tầng cuối ấm và kéo dài hơn mình nghĩ.", "Ví dụ khách A · Hà Nội"],
  ["Đóng gói rất kỹ, mùi đầu hơi gắt nhưng sau mười phút thì dịu hẳn.", "Ví dụ khách B · Đà Nẵng"],
  ["Thích bộ thử mẫu vì được mang đi thử cả tuần trước khi chọn chai lớn.", "Ví dụ khách C · TP. Hồ Chí Minh"],
];

function Flask({ c, h }: { c: string; h: number }) {
  return (
    <svg viewBox="0 0 200 260" className={styles.flask} role="img" aria-label="Minh hoạ chai nước hoa">
      <defs>
        <linearGradient id={`fg${c.slice(1)}`} x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".4" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".22" /></linearGradient>
      </defs>
      <g transform={`translate(100 ${250 - 200 * h}) scale(1 ${h})`}>
        <rect x="-62" y="40" width="124" height="190" rx="22" fill={c} />
        <rect x="-62" y="40" width="124" height="190" rx="22" fill={`url(#fg${c.slice(1)})`} />
        <rect x="-16" y="14" width="32" height="30" fill={c} />
        <rect x="-30" y="-30" width="60" height="48" rx="8" fill="#241B21" />
      </g>
    </svg>
  );
}

export default function Page() {
  return (
    <div className={styles.brand} data-ha-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#hanh-trinh">Hành trình</a>
          <a href="#bo-suu-tap">Bộ sưu tập</a>
        </nav>
        <a className={styles.logo} href="#top" aria-label="Hương Ẩn, về đầu trang">Hương Ẩn</a>
        <nav aria-label="Điều hướng phụ" className={styles.nav + " " + styles.navR}>
          <a href="#thu-mau">Thử mẫu</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
      </header>
      <main id="main">
        <section className={styles.hero} id="top" data-hero>
          <div className={styles.blobs} aria-hidden="true">
            <i data-hero-blob className={styles.blobA} />
            <i data-hero-blob className={styles.blobB} />
            <i data-hero-blob className={styles.blobC} />
          </div>
          <p className={styles.kicker} data-hero-fade>Nước hoa nghệ thuật · bản minh hoạ</p>
          <h1 className={styles.h1}>
            <span className={styles.lineMask}><span data-hero-line className={styles.line}>Mùi hương</span></span>
            <span className={styles.lineMask}><span data-hero-line className={styles.line + " " + styles.lineIt}>ẩn trong ký ức</span></span>
          </h1>
          <p className={styles.lead} data-hero-fade>Mỗi chai Hương Ẩn là một ký ức được pha thành ba tầng hương: mở ra, quyện lại, rồi lặng lẽ ở lại.</p>
          <div className={styles.heroCta} data-hero-fade>
            <a className={styles.btn} href="#thu-mau">Đặt bộ thử mẫu</a>
            <a className={styles.btnGhost} href="#hanh-trinh">Xem hành trình hương</a>
          </div>
          <span className={styles.scrollHint} aria-hidden="true">Cuộn để mở</span>
        </section>

        <section className={styles.intro} aria-labelledby="gt">
          <div className={styles.introGrid}>
            <div data-rv>
              <p className={styles.eyebrow}>Giới thiệu</p>
              <h2 id="gt" className={styles.h2}>Không phải thứ mùi để khoe, mà là thứ để nhớ lại.</h2>
            </div>
            <div className={styles.introText} data-rv>
              <p>Hương Ẩn là một xưởng pha chế nhỏ trong câu chuyện minh hoạ này. Chúng tôi bắt đầu từ ký ức, không bắt đầu từ xu hướng: người mua kể, nhà pha chế đặt hương lên giấy.</p>
              <p>Mỗi bộ sưu tập chỉ ra mắt sáu hương, mỗi mẻ vài chục chai, khắc số riêng. Ít, nên mỗi chai còn kịp được chăm.</p>
            </div>
          </div>
        </section>

        <LiquidStage />

        <section className={styles.collection} id="bo-suu-tap" aria-labelledby="bst">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Bộ sưu tập</p>
            <h2 id="bst" className={styles.h2}>Bốn chai cho bốn kiểu nhớ</h2>
          </div>
          <ul className={styles.products}>
            {PRODUCTS.map((p) => (
              <li key={p.n} className={styles.product} data-rv>
                <div className={styles.arch}><Flask c={p.c} h={p.h} /></div>
                <h3>{p.n}</h3>
                <p>{p.f}</p>
                <span className={styles.price}>{p.p} <small>50 ml · giá minh hoạ</small></span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.ritual} aria-labelledby="qt">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Quy trình</p>
            <h2 id="qt" className={styles.h2}>Từ một câu chuyện đến một chai</h2>
          </div>
          <ol className={styles.steps}>
            {STEPS.map(([t, d], i) => (
              <li key={t} data-rv>
                <span className={styles.stepNo}>{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.figures} aria-label="Con số minh hoạ">
          <dl>
            {[["6", "hương mỗi mùa"], ["48", "chai mỗi mẻ"], ["3", "tầng hương"], ["14", "ngày đổi chai"]].map(([n, l]) => (
              <div key={l} data-rv><dt>{l}</dt><dd>{n}</dd></div>
            ))}
          </dl>
          <p className={styles.fnote}>Các con số chỉ nhằm minh hoạ bố cục, không phải số liệu thật.</p>
        </section>

        <section className={styles.reviews} aria-labelledby="dg">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Lời nhắn mẫu</p>
            <h2 id="dg" className={styles.h2}>Những dòng cảm nhận (ví dụ)</h2>
          </div>
          <div className={styles.quotes}>
            {REVIEWS.map(([q, a]) => (
              <figure key={a} data-rv>
                <blockquote>“{q}”</blockquote>
                <figcaption>{a}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.faq} id="hoi-dap" aria-labelledby="hd">
          <h2 id="hd" className={styles.h2} data-rv>Hỏi đáp</h2>
          <div>
            {FAQ.map(([q, a]) => (
              <details key={q} data-rv>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.contact} id="thu-mau" aria-labelledby="tm">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Thử mẫu</p>
            <h2 id="tm" className={styles.h2}>Ghép bộ thử mẫu của riêng bạn</h2>
          </div>
          <div data-rv><Sampler /></div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footLogo}>Hương Ẩn</p>
        <p>Trang minh hoạ thương hiệu hư cấu. Không bán hàng thật, không thu thập dữ liệu.</p>
        <p><a href="/demos">Quay lại danh sách demo</a></p>
      </footer>
      <Motion />
    </div>
  );
}
