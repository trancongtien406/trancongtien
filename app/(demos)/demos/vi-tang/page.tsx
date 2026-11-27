import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Dish } from "./components/Dish";
import { Motion } from "./components/Motion";
import { Reserve } from "./components/Reserve";
import { Words } from "./components/Words";

const COURSES = [
  { n: "I", name: "Rễ", dish: "Củ dền nướng than", note: "Sốt mắm gừng, kem sữa dê, tro hành tím. Mở đầu bằng vị đất, ngọt chậm và khói nhẹ.", pair: "Trà ô long ủ lạnh" },
  { n: "II", name: "Biển", dish: "Sò điệp áp chảo", note: "Nước dùng hến, dầu thì là, một lát chanh muối. Món sáng nhất của đêm, ăn khi còn ấm.", pair: "Vang trắng khô" },
  { n: "III", name: "Đồng", dish: "Nếp cẩm lên men", note: "Lòng đỏ trứng muối, nấm sò, hạt mè rang. Hạt gạo xếp xoắn như đồng ruộng nhìn từ trên cao.", pair: "Rượu gạo ủ hoa cúc" },
  { n: "IV", name: "Rừng", dish: "Vịt ngâm dầu", note: "Lá chanh, củ cải đường, sốt vang đỏ rút nhỏ lửa. Béo, thơm lá, chua dịu ở cuối.", pair: "Vang đỏ nhẹ" },
  { n: "V", name: "Lửa", dish: "Bò nướng củi mít", note: "Tuỷ xương, hành tím nướng, muối khói. Món nặng nhất, dành chỗ cho nhiều im lặng.", pair: "Vang đỏ đậm" },
  { n: "VI", name: "Mật", dish: "Mousse mật ong", note: "Lê hấp, tinh dầu hoa bưởi, bánh giòn bơ. Kết thúc bằng vị ngọt thật ngắn.", pair: "Trà hoa bưởi nóng" },
];

const EVENING = [
  { t: "18:00", h: "Đón khách", p: "Khăn nóng, một ly nước gừng chanh, đi qua hành lang đèn nến vào phòng ăn." },
  { t: "18:30", h: "Ba tầng đầu", p: "Rễ, Biển, Đồng: các món nhẹ lên trước, bếp trưởng kể ngắn về nguyên liệu." },
  { t: "19:45", h: "Hai tầng nặng", p: "Rừng và Lửa. Bàn được nghỉ ba phút giữa hai món để vị kịp lắng." },
  { t: "20:45", h: "Tầng cuối", p: "Mật cùng trà nóng, kèm một hộp nhỏ bánh quy mang về." },
];

const STATS = [
  { v: 6, s: "", l: "Tầng vị trong một đêm" },
  { v: 24, s: "", l: "Chỗ ngồi minh hoạ" },
  { v: 180, s: " phút", l: "Thời lượng một lượt" },
  { v: 3, s: "", l: "Gói thực đơn" },
];

const MENUS = [
  { n: "Sáu tầng", p: "1.480.000đ", d: "Đủ sáu món tasting, một ly đón khách.", f: ["6 món theo mùa", "Trà hoặc nước ép lên men", "Bánh quy mang về"] },
  { n: "Sáu tầng + Rượu", p: "2.290.000đ", d: "Mỗi món đi cùng một ly rượu hoặc trà ủ.", f: ["6 món theo mùa", "6 ly rượu/trà gợi ý", "Ưu tiên bàn gần bếp"], hot: true },
  { n: "Thực vật", p: "1.280.000đ", d: "Sáu tầng không đạm động vật, nấu riêng.", f: ["6 món thực vật", "Báo trước 24 giờ", "Cùng nhịp phục vụ"] },
];

const QUOTES = [
  { q: "Mỗi món lên bàn giống một trang sách mới lật, và trang trước vẫn còn đọng lại.", w: "Khách minh hoạ A" },
  { q: "Tầng Lửa nặng, nhưng đến tầng Mật thì mọi thứ tự nhiên dịu xuống.", w: "Khách minh hoạ B" },
  { q: "Yên tĩnh, ánh sáng thấp, và không ai vội. Đó là thứ xa xỉ nhất.", w: "Khách minh hoạ C" },
];

const FAQ = [
  { q: "Có phục vụ khách ăn chay hoặc dị ứng không?", a: "Có gói Thực vật và bếp có thể điều chỉnh dị ứng thường gặp nếu báo trước ít nhất 24 giờ trong ghi chú đặt bàn." },
  { q: "Trẻ em có vào được không?", a: "Nhà hàng minh hoạ này dành cho khách từ 12 tuổi để giữ không khí yên tĩnh của lượt ăn dài ba giờ." },
  { q: "Trang phục như thế nào?", a: "Lịch sự, gọn gàng. Không yêu cầu vest hay váy dạ hội." },
  { q: "Có thể đổi hoặc huỷ giờ không?", a: "Trong bản demo này đây là chính sách giả định: đổi miễn phí trước 24 giờ, sau đó tính 50% gói thực đơn." },
];

export default function Page() {
  const consult = buildConsultHref("vi-tang");
  return (
    <div className={styles.brand} data-vt-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Vị Tầng, về đầu trang">
          <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true"><rect x="3" y="4" width="22" height="3" fill="currentColor" /><rect x="6" y="12.5" width="16" height="3" fill="currentColor" /><rect x="9" y="21" width="10" height="3" fill="currentColor" /></svg>
          <span>Vị Tầng</span>
        </a>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#tang">Sáu tầng</a>
          <a href="#dem">Một đêm</a>
          <a href="#goi">Thực đơn</a>
          <a href="#hoi">Hỏi đáp</a>
        </nav>
        <a className={styles.btnSm} href="#dat-ban">Đặt bàn</a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top" aria-labelledby="vt-h1">
          <div className={styles.heroGrid}>
            <p className={styles.eyebrow} data-hero="in">Tasting menu · 6 tầng · Demo minh hoạ</p>
            <h1 id="vt-h1" className={styles.h1}>
              <span className={styles.h1Line}><span data-hero="line">Sáu tầng</span></span>
              <span className={styles.h1Line}><em data-hero="line">một bữa ăn.</em></span>
            </h1>
            <div className={styles.heroPlate} data-hero="plate" aria-hidden="true">
              <Dish i={5} label="" />
            </div>
            <p className={styles.heroLead} data-hero="in">Mỗi món là một lớp. Xếp lên nhau, vị này đè lên vị kia, cho đến khi cả bàn ăn thành một ngôi nhà nhiều tầng.</p>
            <div className={styles.heroCta} data-hero="in">
              <a className={styles.btn} href="#dat-ban">Giữ một bàn</a>
              <a className={styles.link} href="#tang">Xem sáu tầng</a>
            </div>
          </div>
          <p className={styles.scrollHint} aria-hidden="true">Cuộn để xếp tầng</p>
        </section>

        <section className={styles.intro} aria-labelledby="vt-intro">
          <p className={styles.eyebrow}>Triết lý</p>
          <h2 id="vt-intro" className={styles.manifesto}>
            <Words className={styles.w} text="Chúng tôi không phục vụ từng món riêng lẻ. Chúng tôi xếp chúng lên nhau như người ta xếp những lớp ký ức, để tầng sau luôn nhớ tầng trước." />
          </h2>
          <p className={styles.note} data-rv>Vị Tầng là thương hiệu hư cấu, dựng để minh hoạ một landing page nhà hàng cao cấp. Mọi tên món, giá và thông tin là giả định.</p>
        </section>

        <section className={styles.stack} id="tang" aria-label="Sáu tầng vị" data-stack>
          <div className={styles.stackHead}>
            <p className={styles.eyebrow}>Thực đơn mùa này</p>
            <h2 className={styles.h2}>Sáu tầng, <em>xếp chồng</em></h2>
          </div>
          {COURSES.map((c, i) => (
            <article key={c.n} className={styles.layer} data-layer data-tone={i % 3} aria-labelledby={`vt-c${i}`}>
              <div className={styles.layerIn} data-layer-in>
                <div className={styles.layerNum} aria-hidden="true">{c.n}</div>
                <div className={styles.layerArt} data-art><Dish i={i} label={`Minh hoạ món ${c.dish}`} /></div>
                <div className={styles.layerText}>
                  <p className={styles.eyebrow}>Tầng {c.n} · {c.name}</p>
                  <h3 id={`vt-c${i}`} className={styles.dish}>{c.dish}</h3>
                  <p className={styles.dishNote}>{c.note}</p>
                  <p className={styles.pair}><span>Đi cùng</span> {c.pair}</p>
                </div>
                <div className={styles.shade} data-shade aria-hidden="true" />
              </div>
            </article>
          ))}
        </section>

        <section className={styles.night} id="dem" aria-labelledby="vt-night">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Một đêm ở Vị Tầng</p>
            <h2 id="vt-night" className={styles.h2}>Ba giờ, <em>không vội</em></h2>
            <ol className={styles.timeline}>
              {EVENING.map((e) => (
                <li key={e.t} data-rv>
                  <time className={styles.time}>{e.t}</time>
                  <div><h3>{e.h}</h3><p>{e.p}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.stats} aria-label="Con số minh hoạ">
          <ul className={styles.statsRow}>
            {STATS.map((s) => (
              <li key={s.l}>
                <b><span data-count={s.v}>{s.v}</span>{s.s}</b>
                <span>{s.l}</span>
              </li>
            ))}
          </ul>
          <p className={styles.noteC}>Số liệu minh hoạ, không phải dữ liệu của nhà hàng thật.</p>
        </section>

        <section className={styles.menus} id="goi" aria-labelledby="vt-menus">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Chọn cách ngồi</p>
            <h2 id="vt-menus" className={styles.h2}>Ba <em>gói thực đơn</em></h2>
            <div className={styles.menuGrid}>
              {MENUS.map((m) => (
                <article key={m.n} className={styles.menuCard} data-hot={m.hot ? "1" : "0"} data-rv>
                  <h3>{m.n}</h3>
                  <p className={styles.price}>{m.p}<small>/ khách · giá giả định</small></p>
                  <p>{m.d}</p>
                  <ul>{m.f.map((x) => <li key={x}>{x}</li>)}</ul>
                  <a className={m.hot ? styles.btn : styles.btnGhost} href="#dat-ban">Chọn gói này</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.quotes} aria-labelledby="vt-q">
          <div className={styles.wrap}>
            <h2 id="vt-q" className={styles.srOnly}>Cảm nhận minh hoạ</h2>
            <div className={styles.quoteGrid}>
              {QUOTES.map((q) => (
                <figure key={q.w} data-rv>
                  <blockquote>“{q.q}”</blockquote>
                  <figcaption>{q.w} · lời khen minh hoạ</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faq} id="hoi" aria-labelledby="vt-faq">
          <div className={styles.wrapNarrow}>
            <p className={styles.eyebrow}>Hỏi đáp</p>
            <h2 id="vt-faq" className={styles.h2}>Trước khi <em>ngồi xuống</em></h2>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.book} id="dat-ban" aria-labelledby="vt-book">
          <div className={styles.bookGrid}>
            <div>
              <p className={styles.eyebrow}>Đặt bàn</p>
              <h2 id="vt-book" className={styles.h2}>Giữ một <em>tầng</em> cho bạn</h2>
              <p className={styles.bookP}>Biểu mẫu dưới đây chạy hoàn toàn trên trình duyệt để minh hoạ luồng đặt bàn. Không có dữ liệu nào được gửi đi.</p>
              <a className={styles.link} href={consult}>Muốn một landing như thế này cho nhà hàng của bạn?</a>
            </div>
            <Reserve />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.bigWord} aria-hidden="true">Vị Tầng</p>
        <div className={styles.footRow}>
          <p>Vị Tầng là thương hiệu minh hoạ. Địa chỉ, giờ mở cửa và giá trong trang này đều là giả định.</p>
          <p>Mở 18:00 – 22:30 · Thứ Ba đến Chủ Nhật (giả định)</p>
          <a href="#top">Về đầu trang</a>
        </div>
      </footer>
      <Motion />
    </div>
  );
}
