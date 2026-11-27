import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Booking } from "./components/Booking";
import { Motion } from "./components/Motion";
import { Practice } from "./components/Practice";

const PROGRAMS = [
  { t: "Mười phút buổi sáng", d: "Ba hơi thở dài, một lượt quét cơ thể, một ý định cho ngày mới. Dành cho người bận.", m: "10 phút · hằng ngày", r: "58% 42% 46% 54% / 52% 48% 52% 48%" },
  { t: "Dịu lại trước khi ngủ", d: "Thở 4-7-8 và thả lỏng từng nhóm cơ, giúp nhịp tim chậm dần trước giờ đi ngủ.", m: "20 phút · buổi tối", r: "44% 56% 52% 48% / 58% 42% 58% 42%" },
  { t: "Khi lòng chộn rộn", d: "Một bài ngắn cho lúc lo lắng dâng lên: gọi tên cảm giác, thở chậm, đặt chân xuống đất.", m: "5 phút · bất cứ lúc nào", r: "52% 48% 60% 40% / 44% 56% 44% 56%" },
  { t: "Nhóm sáu người", d: "Ngồi cùng nhau, thở cùng nhau, không cần nói gì nhiều. Có người hướng dẫn nhẹ nhàng.", m: "45 phút · cuối tuần", r: "48% 52% 42% 58% / 56% 44% 56% 44%" },
];

const DAY = [
  { t: "06:30", h: "Thức dậy chậm", p: "Đặt một bàn chân xuống đất rồi mới cầm điện thoại. Ba hơi thở dài." },
  { t: "12:30", h: "Một khoảng giữa ngày", p: "Năm phút rời màn hình, thở êm dịu, uống một cốc nước." },
  { t: "21:30", h: "Thả ngày xuống", p: "Thở 4-7-8, nhìn lại một điều nhẹ nhõm, tắt đèn." },
];

const NUMS = [
  { v: 4, s: " giây", l: "một hơi hít vào" },
  { v: 8, s: " giây", l: "một hơi thở ra dài" },
  { v: 12, s: " phút", l: "một buổi trung bình" },
  { v: 3, s: " lần", l: "mỗi ngày là đủ" },
];

const QUOTES = [
  { q: "Tôi không thấy mình thay đổi ngay, chỉ thấy buổi tối chậm lại một chút. Vậy là đủ.", w: "Người dùng minh hoạ A" },
  { q: "Quầng sáng phồng lên rồi xẹp xuống, tôi thở theo nó mà không cần đếm.", w: "Người dùng minh hoạ B" },
  { q: "Buổi nhóm cuối tuần yên đến mức nghe được tiếng quạt trần. Lạ mà dễ chịu.", w: "Người dùng minh hoạ C" },
];

const FAQ = [
  { q: "Tôi chưa từng thiền, có theo được không?", a: "Được. Bài đầu tiên chỉ có thở theo quầng sáng, không cần ngồi kiết già hay làm trống đầu óc." },
  { q: "Có cần chuẩn bị gì không?", a: "Chỉ cần một chỗ ngồi thoải mái và vài phút. Tai nghe là tuỳ chọn." },
  { q: "Đây có phải liệu pháp chữa bệnh không?", a: "Không. Khoảng Lặng là thương hiệu minh hoạ về thiền thư giãn, không thay thế chẩn đoán hay điều trị của chuyên gia y tế." },
  { q: "Dữ liệu của tôi đi đâu?", a: "Trong bản demo này không có dữ liệu nào rời khỏi trình duyệt. Biểu mẫu và bài tập đều là mô phỏng." },
];

export default function Page() {
  const consult = buildConsultHref("khoang-lang");
  return (
    <div className={styles.brand} data-kl-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <div className={styles.ambient} aria-hidden="true"><i data-amb /><i data-amb /></div>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Khoảng Lặng, về đầu trang"><span aria-hidden="true" />Khoảng Lặng</a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          <a href="#tho">Thở cùng</a>
          <a href="#chuong-trinh">Chương trình</a>
          <a href="#ngay">Một ngày</a>
          <a href="#hoi">Hỏi đáp</a>
        </nav>
        <a className={styles.btnSm} href="#giu">Giữ chỗ</a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top" aria-labelledby="kl-h1">
          <p className={styles.eyebrow} data-hero>Thiền &amp; chăm sóc tinh thần · Bản minh hoạ</p>
          <h1 id="kl-h1" className={styles.h1} data-hero>Hít vào. Thở ra. <em>Ở lại.</em></h1>
          <div className={styles.heroOrb} data-orb aria-hidden="true">
            <i /><i /><i />
            <span data-orb-label>Hít vào</span>
          </div>
          <div className={styles.heroCta} data-hero>
            <a className={styles.btn} href="#tho">Thở cùng chúng tôi</a>
            <a className={styles.link} href="#chuong-trinh">Xem chương trình</a>
          </div>
        </section>

        <section className={styles.intro} aria-labelledby="kl-intro">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Lời nói đầu</p>
            <h2 id="kl-intro" className={styles.statement}>Mỗi ngày, chỉ cần vài phút để cơ thể <em>nhớ lại nhịp của chính mình.</em></h2>
            <ul className={styles.facts}>
              <li data-rv><span aria-hidden="true" /><h3>Không cần giỏi</h3><p>Không có bài nào đúng hay sai, chỉ có hơi thở của bạn hôm nay.</p></li>
              <li data-rv><span aria-hidden="true" /><h3>Ngắn mà đều</h3><p>Năm phút mỗi ngày nhẹ nhàng hơn một giờ mỗi tháng.</p></li>
              <li data-rv><span aria-hidden="true" /><h3>Đi theo nhịp</h3><p>Quầng sáng phồng và xẹp để bạn thở theo, không phải đếm.</p></li>
            </ul>
          </div>
        </section>

        <section className={styles.breath} id="tho" aria-labelledby="kl-breath">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Thở cùng chúng tôi</p>
            <h2 id="kl-breath" className={styles.h2}>Một phút, <em>theo quầng sáng</em></h2>
            <p className={styles.lead}>Chọn một kiểu thở và thời lượng. Quầng sáng sẽ phồng lên khi hít vào, giữ yên khi giữ hơi, và xẹp xuống khi thở ra.</p>
            <Practice />
          </div>
        </section>

        <section className={styles.programs} id="chuong-trinh" aria-labelledby="kl-prog">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Chương trình</p>
            <h2 id="kl-prog" className={styles.h2}>Bốn cách <em>dừng lại</em></h2>
            <ul className={styles.progGrid}>
              {PROGRAMS.map((p, i) => (
                <li key={p.t} className={styles.prog} data-breathe style={{ borderRadius: p.r, ["--d" as string]: `${i * 0.6}s` }}>
                  <p className={styles.progM}>{p.m}</p>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.day} id="ngay" aria-labelledby="kl-day">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Một ngày</p>
            <h2 id="kl-day" className={styles.h2}>Ba lần dừng, <em>nhẹ thôi</em></h2>
            <ol className={styles.dayList}>
              {DAY.map((d) => (
                <li key={d.t} data-rv>
                  <time>{d.t}</time>
                  <span className={styles.dot} aria-hidden="true" data-breathe />
                  <div><h3>{d.h}</h3><p>{d.p}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.nums} aria-label="Con số minh hoạ">
          <ul>
            {NUMS.map((n) => (
              <li key={n.l}><b><span data-count={n.v}>{n.v}</span>{n.s}</b><span>{n.l}</span></li>
            ))}
          </ul>
          <p>Con số mang tính minh hoạ cho bài tập, không phải dữ liệu nghiên cứu.</p>
        </section>

        <section className={styles.quotes} aria-labelledby="kl-q">
          <div className={styles.wrap}>
            <h2 id="kl-q" className={styles.srOnly}>Cảm nhận minh hoạ</h2>
            <div className={styles.qGrid}>
              {QUOTES.map((q) => (
                <figure key={q.w} data-rv><blockquote>{q.q}</blockquote><figcaption>{q.w} · lời cảm nhận minh hoạ</figcaption></figure>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faq} id="hoi" aria-labelledby="kl-faq">
          <div className={styles.wrapN}>
            <p className={styles.eyebrow}>Hỏi đáp</p>
            <h2 id="kl-faq" className={styles.h2}>Điều bạn <em>có thể hỏi</em></h2>
            {FAQ.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
          </div>
        </section>

        <section className={styles.book} id="giu" aria-labelledby="kl-book">
          <div className={styles.bookGrid}>
            <div>
              <p className={styles.eyebrow}>Giữ chỗ</p>
              <h2 id="kl-book" className={styles.h2}>Cho mình <em>một khoảng lặng</em></h2>
              <p className={styles.lead}>Biểu mẫu dưới đây chỉ mô phỏng luồng đặt lịch, chạy hoàn toàn trên trình duyệt.</p>
              <a className={styles.link} href={consult}>Muốn một trang như thế này cho không gian của bạn?</a>
            </div>
            <Booking />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footOrb} aria-hidden="true" data-breathe />
        <p>Khoảng Lặng là thương hiệu minh hoạ. Mọi lịch, giá và nội dung chỉ dùng để trình bày giao diện.</p>
        <a href="#top">Về đầu trang</a>
      </footer>
      <Motion />
    </div>
  );
}
