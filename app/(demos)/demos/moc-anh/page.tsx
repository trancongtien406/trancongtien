import styles from "./brand.module.css";
import { Booking } from "./components/Booking";
import { Curtain } from "./components/Curtain";
import { FilmCanvas } from "./components/FilmCanvas";
import { Motion } from "./components/Motion";

const FILMS = [
  ["01", "Ánh sáng cuối ngày", "Phim ngắn", "2026", "12 phút", "linear-gradient(135deg,#d9b56d,#2a1c10)"],
  ["02", "Gió qua mái ngói", "Phim quảng cáo", "2026", "60 giây", "linear-gradient(135deg,#6b4a26,#0a0a0a)"],
  ["03", "Mười hai bậc thềm", "Phim doanh nghiệp", "2025", "4 phút", "linear-gradient(135deg,#e8e8e8,#3a3a3a)"],
  ["04", "Đèn không tắt", "Video âm nhạc", "2025", "3 phút 40", "linear-gradient(135deg,#8a6a30,#120c07)"],
  ["05", "Tiếng chuông chiều", "Phim ngắn", "2024", "9 phút", "linear-gradient(135deg,#c79a4a,#000)"],
] as const;

const PHASES = [
  ["I", "Tiền kỳ", "Kịch bản, phân cảnh, chọn bối cảnh, tuyển diễn viên và lên lịch quay chi tiết từng ngày."],
  ["II", "Quay", "Đoàn quay gọn, máy điện ảnh, ánh sáng thực tế. Mỗi cảnh có ghi chú màu và nhịp từ đầu."],
  ["III", "Hậu kỳ", "Dựng, chỉnh màu, thiết kế âm thanh, nhạc nền, xuất bản theo từng nền tảng chiếu."],
] as const;

const MANIFESTO = "Chúng tôi tin một khung hình tốt không cần nói nhiều. Nó chỉ cần ánh sáng đúng lúc, nhịp thở đúng chỗ, và một người đủ kiên nhẫn để chờ khoảnh khắc ấy.".split(" ");

const CREDITS = [
  ["Giám đốc sáng tạo", "Nhân vật minh hoạ A"],
  ["Đạo diễn hình ảnh", "Nhân vật minh hoạ B"],
  ["Dựng phim", "Nhân vật minh hoạ C"],
  ["Âm thanh", "Nhân vật minh hoạ D"],
] as const;

export default function Page() {
  return (
    <div className={styles.brand} data-ma-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Mộc Ảnh, về đầu trang">MỘC ẢNH</a>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#man-mo">Màn mở</a><a href="#phim">Phim</a><a href="#quy-trinh">Quy trình</a><a href="#dat-lich">Liên hệ</a>
        </nav>
        <span className={styles.tc} aria-hidden="true" data-tc>00:00:00:00</span>
      </header>
      <main id="main">
        <section className={styles.hero} id="top" data-hero>
          <div className={styles.heroCanvas} data-hero-canvas><FilmCanvas variant="dusk" className={styles.fill} /></div>
          <i className={styles.bar} data-bar aria-hidden="true" />
          <i className={styles.bar + " " + styles.barB} data-bar aria-hidden="true" />
          <div className={styles.heroText}>
            <p className={styles.kicker} data-hero-in>Hãng phim quảng cáo & phim ngắn · bản minh hoạ</p>
            <h1 className={styles.h1}>
              <span className={styles.mask}><span data-hero-line className={styles.ln}>Dựng ánh sáng</span></span>
              <span className={styles.mask}><span data-hero-line className={styles.ln + " " + styles.gold}>thành câu chuyện</span></span>
            </h1>
            <div className={styles.heroFoot} data-hero-in>
              <a className={styles.btn} href="#man-mo">Mở màn</a>
              <span className={styles.meta}>Cuộn để kéo màn ↓</span>
            </div>
          </div>
        </section>

        <section className={styles.manifesto} aria-label="Tuyên ngôn">
          <p data-scrub className={styles.manText}>{MANIFESTO.map((w, i) => <span key={i}>{w} </span>)}</p>
        </section>

        <Curtain />

        <section className={styles.films} id="phim" aria-labelledby="ph">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Phim đã làm (tên minh hoạ)</p>
            <h2 id="ph" className={styles.h2}>Năm khung hình, năm lần chờ ánh sáng</h2>
          </div>
          <ul className={styles.list}>
            {FILMS.map(([n, t, k, y, d, g]) => (
              <li key={n} data-rv>
                <a href="#dat-lich" className={styles.row} style={{ ["--poster" as string]: g }}>
                  <span className={styles.rowNo}>{n}</span>
                  <span className={styles.rowTitle}>{t}</span>
                  <span className={styles.rowMeta}>{k} · {y} · {d}</span>
                  <i className={styles.poster} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.phases} id="quy-trinh" aria-labelledby="qt">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Quy trình</p>
            <h2 id="qt" className={styles.h2}>Ba đoạn của một cuộn phim</h2>
          </div>
          <ol className={styles.strip}>
            {PHASES.map(([r, t, d]) => (
              <li key={t} data-rv className={styles.frame}>
                <span className={styles.frameNo}>{r}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.nums} aria-label="Con số minh hoạ">
          <dl>
            <div><dt>phút phim tạo ra (ví dụ)</dt><dd><span data-count="120">120</span>+</dd></div>
            <div><dt>đoàn quay trong kịch bản mẫu</dt><dd><span data-count="14">14</span></dd></div>
            <div><dt>ngày quay trung bình (ví dụ)</dt><dd><span data-count="3">3</span></dd></div>
            <div><dt>bản chỉnh màu mỗi phim</dt><dd><span data-count="2">2</span></dd></div>
          </dl>
          <p className={styles.fnote}>Con số trong khối này là minh hoạ, không phải thành tích thật.</p>
        </section>

        <section className={styles.quote} aria-label="Lời nhận xét mẫu">
          <figure data-rv>
            <blockquote>“Họ chờ đúng mười một phút cho một vệt nắng. Cảnh đó nằm trong poster.”</blockquote>
            <figcaption>Lời nhận xét mẫu · khách hàng minh hoạ</figcaption>
          </figure>
        </section>

        <section className={styles.faq} aria-labelledby="hd">
          <h2 id="hd" className={styles.h2} data-rv>Hỏi nhanh</h2>
          <div>
            {[
              ["Một dự án mất bao lâu?", "Ví dụ minh hoạ: phim quảng cáo 60 giây khoảng 5 đến 7 tuần từ kịch bản đến bản giao."],
              ["Có nhận quay theo ngân sách nhỏ không?", "Có gói đoàn gọn cho phim ngắn và nội dung doanh nghiệp. Bản minh hoạ không niêm yết giá."],
              ["Bản quyền thuộc về ai?", "Quy định trong hợp đồng. Trang này chỉ minh hoạ nên không có điều khoản thật."],
            ].map(([q, a]) => (<details key={q} data-rv><summary>{q}</summary><p>{a}</p></details>))}
          </div>
        </section>

        <section className={styles.contact} id="dat-lich" aria-labelledby="dl">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Liên hệ</p>
            <h2 id="dl" className={styles.h2}>Đặt lịch trao đổi dự án</h2>
          </div>
          <div data-rv><Booking /></div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p className={styles.endCard}>Hết phim</p>
        <dl className={styles.credits}>
          {CREDITS.map(([r, n]) => (<div key={r}><dt>{r}</dt><dd>{n}</dd></div>))}
        </dl>
        <p>Trang minh hoạ hãng phim hư cấu. Mọi tên, số liệu và nhân vật đều không có thật.</p>
        <p><a href="/demos">Quay lại danh sách demo</a></p>
      </footer>
      <Motion />
    </div>
  );
}
