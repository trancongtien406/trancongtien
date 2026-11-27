import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Art } from "./components/Art";
import { Booking } from "./components/Booking";
import { Fx } from "./components/Fx";
import { Gallery } from "./components/Gallery";

const GENRES = [
  ["01", "Chân dung", "Ánh sáng đơn, nền tối giản, đủ thời gian để người được chụp quên máy ảnh."],
  ["02", "Cưới & gia đình", "Kể lại một ngày bằng những khoảnh khắc nhỏ, ít tạo dáng, nhiều thật."],
  ["03", "Thương hiệu & sản phẩm", "Bộ ảnh nhất quán cho website, ấn phẩm và mạng xã hội của doanh nghiệp."],
  ["04", "Kiến trúc & nội thất", "Đường thẳng, ánh sáng tự nhiên và những khung hình chờ đúng giờ."],
];
const PACKS = [
  ["Mộc", "2 giờ chụp · 20 ảnh chỉnh", ["1 địa điểm", "Tư vấn trang phục", "Bộ ảnh tải về sau 7 ngày"], "Từ 2.500.000 ₫", false],
  ["Tạp chí", "Nửa ngày · 50 ảnh chỉnh", ["2 địa điểm", "Chỉnh màu theo phong cách", "Bản in 3 ảnh khổ A3"], "Từ 6.800.000 ₫", true],
  ["Series", "Cả ngày · 100 ảnh chỉnh", ["Nhiều địa điểm", "Hỗ trợ trợ lý ánh sáng", "Bản in sách ảnh nhỏ"], "Từ 12.000.000 ₫", false],
] as const;
const STEPS = [["01", "Trò chuyện", "Nghe bạn muốn kể điều gì, xem tham chiếu và chọn địa điểm."], ["02", "Phác khung", "Lên danh sách khung hình, giờ nắng và phương án dự phòng thời tiết."], ["03", "Chụp", "Làm việc chậm, ít người, đủ ánh sáng và đủ thời gian."], ["04", "Chọn & chỉnh", "Bạn chọn ảnh yêu thích, chúng tôi chỉnh màu thủ công và bàn giao."]];
const FAQ = [
  ["Ảnh trong trang này có phải ảnh thật không?", "Không. Toàn bộ ảnh ở đây là hình vẽ SVG làm placeholder nghệ thuật, và Đường Nét là thương hiệu minh hoạ."],
  ["Bao lâu nhận được ảnh?", "Theo số liệu minh hoạ: 7 đến 14 ngày tuỳ gói, ảnh được giao qua thư mục tải về."],
  ["Có được chọn phong cách chỉnh màu không?", "Có. Ba hướng: phim ấm, trung tính sạch và tương phản cao; bạn xem thử một ảnh mẫu trước."],
  ["Nếu trời mưa thì sao?", "Chúng tôi hẹn lại miễn phí một lần hoặc chuyển sang phương án trong nhà đã chuẩn bị."],
];

export default function Page() {
  const consult = buildConsultHref("duong-net");
  return (
    <div className={styles.brand} data-dn-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Đường Nét, về đầu trang">Đường Nét</a>
        <nav className={styles.nav} aria-label="Chính"><a href="#portfolio">Portfolio</a><a href="#goi-chup">Gói chụp</a><a href="#dat-lich">Đặt lịch</a></nav>
      </header>
      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.wrap}>
            <h1 className={styles.heroT}>Đường<em>Nét</em></h1>
            <div className={styles.heroRow}>
              <p>Studio nhiếp ảnh (minh hoạ) chân dung, kiến trúc và thương hiệu. Mỗi bức ảnh là một đường nét: ánh sáng vẽ nên hình.</p>
              <p className={styles.label}>Portfolio 2023 – 2026 ↓</p>
            </div>
          </div>
          <div className={styles.stripWrap} aria-hidden="true">
            <div className={styles.strip} data-strip="1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2].map((n, i) => (<div className={styles.f} key={i}><Art i={n} /></div>))}
            </div>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="gt">
          <div className={styles.wrap}>
            <p className={`${styles.label} ${styles.brassT}`} data-rv>Giới thiệu</p>
            <h2 id="gt" className={styles.h2} data-rv>Nhìn chậm lại, <em>chụp ít hơn</em></h2>
            <div className={styles.about}>
              <p className={styles.big} data-rv>“Ảnh đẹp không cần nhiều. Cần đúng lúc.”</p>
              <div data-rv>
                <p>Đường Nét là studio hai người, theo đuổi lối chụp chậm: đến sớm, chờ ánh sáng, bấm ít. Chúng tôi thích bóng đổ dài, bề mặt thô và những khoảng trống để ảnh thở.</p>
                <p>Mỗi bộ ảnh được sắp như một trang tạp chí: có nhịp, có khoảng trắng, có ảnh dẫn và ảnh phụ. Bạn nhận một câu chuyện, không phải một thư mục tệp.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sec} id="portfolio" aria-labelledby="pt" style={{ paddingTop: 0 }}>
          <div className={styles.wrap}>
            <div className={styles.rule} data-line />
            <p className={`${styles.label} ${styles.brassT}`} style={{ marginTop: 40 }} data-rv>Portfolio · nhấp vào ảnh</p>
            <h2 id="pt" className={styles.h2} data-rv>Chín khung hình</h2>
            <Gallery />
            <p style={{ marginTop: 28, color: "var(--dn-mute)", fontSize: 14 }}>Ảnh là hình vẽ SVG minh hoạ. Dùng ← → để chuyển ảnh và Esc để đóng.</p>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.dark}`} aria-labelledby="tt">
          <div className={styles.wrap}>
            <p className={styles.label} data-rv>Thể loại</p>
            <h2 id="tt" className={styles.h2} data-rv>Bốn cách <em>nhìn</em></h2>
            <ul className={styles.genres} data-rv>{GENRES.map(([n, t, d]) => (<li key={n}><span className={styles.n}>{n}</span><h3>{t}</h3><p>{d}</p></li>))}</ul>
          </div>
        </section>

        <section className={styles.sec} id="goi-chup" aria-labelledby="kt">
          <div className={styles.wrap}>
            <p className={`${styles.label} ${styles.brassT}`} data-rv>Gói chụp</p>
            <h2 id="kt" className={styles.h2} data-rv>Chọn nhịp <em>phù hợp</em></h2>
            <div className={styles.pk}>
              {PACKS.map(([t, s, items, p, hot]) => (
                <article key={t} className={`${styles.pkc} ${hot ? styles.hot : ""}`} data-rv>
                  <h3>{t}</h3><p className={styles.brassT}>{s}</p><p className={styles.pr}>{p}</p>
                  <ul>{items.map((x) => (<li key={x}>{x}</li>))}</ul>
                </article>
              ))}
            </div>
            <p style={{ marginTop: 20, fontSize: 14, color: "var(--dn-mute)" }}>Giá mang tính minh hoạ, không phải bảng giá thật.</p>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.dark}`} aria-labelledby="qt">
          <div className={styles.wrap}>
            <p className={styles.label} data-rv>Quy trình</p>
            <h2 id="qt" className={styles.h2} data-rv>Từ cuộc trò chuyện <em>đến khung hình</em></h2>
            <ol className={styles.steps}>{STEPS.map(([n, t, d]) => (<li key={n} data-rv><b>{n}</b><h3>{t}</h3><p>{d}</p></li>))}</ol>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="st">
          <div className={styles.wrap}>
            <p className={`${styles.label} ${styles.brassT}`} data-rv>Con số minh hoạ</p>
            <h2 id="st" className={styles.h2} data-rv>Làm chậm, <em>làm kỹ</em></h2>
            <dl className={styles.stats} data-rv>
              {[["120", "buổi chụp mẫu mỗi năm"], ["9", "ảnh dẫn mỗi bộ"], ["14", "ngày bàn giao tối đa"], ["1", "lần hẹn lại miễn phí"]].map(([v, l]) => (<div key={l}><dt>{v}</dt><dd>{l}</dd></div>))}
            </dl>
            <div className={styles.qs}>
              <div>
                <figure className={styles.q} data-rv><blockquote><p>“Họ chờ gần một tiếng chỉ để có đúng vệt nắng ấy.”</p></blockquote><figcaption><cite>Khách hàng A (hư cấu)</cite></figcaption></figure>
                <figure className={styles.q} data-rv><blockquote><p>“Bộ ảnh đọc như một cuốn tạp chí nhỏ.”</p></blockquote><figcaption><cite>Khách hàng B (hư cấu)</cite></figcaption></figure>
              </div>
              <div className={styles.faq} data-rv>{FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}</div>
            </div>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.dark}`} id="dat-lich" aria-labelledby="bt">
          <div className={`${styles.wrap} ${styles.bookGrid}`}>
            <div>
              <p className={styles.label} data-rv>Đặt lịch</p>
              <h2 id="bt" className={styles.h2} data-rv>Giữ một <em>buổi sáng</em></h2>
              <p style={{ marginTop: 24, maxWidth: "38ch", color: "#cfcabd" }} data-rv>Chọn thể loại, ngày và khung giờ. Biểu mẫu chỉ mô phỏng trên trình duyệt, không gửi dữ liệu đi đâu.</p>
              <a className={styles.consult} href={consult}>Muốn có website portfolio như thế này? Nhận tư vấn →</a>
            </div>
            <div data-rv><Booking /></div>
          </div>
        </section>
      </main>
      <footer className={`${styles.footer} ${styles.dark}`}>
        <div className={styles.wrap}>
          <p className={styles.big} aria-hidden="true">Đường Nét</p>
          <div className={styles.fr}><span>© 2026 Đường Nét · Thương hiệu minh hoạ, ảnh vẽ bằng SVG.</span><a href="#top">Lên đầu trang ↑</a></div>
        </div>
      </footer>
      <Fx />
    </div>
  );
}
