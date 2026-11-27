import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Appointment } from "./components/Appointment";
import { Gem } from "./components/Gem";
import { Lab } from "./components/Lab";
import { Motion } from "./components/Motion";
import { Piece } from "./components/Piece";

const PIECES = [
  { id: "p1", kind: "ring", name: "Nhẫn Lục Giác", st: "Sapphire 1,2 ct · vàng 18K", price: "46.800.000đ" },
  { id: "p2", kind: "pendant", name: "Mặt dây Giọt Sáng", st: "Aquamarine 2,0 ct · vàng 18K", price: "28.500.000đ" },
  { id: "p3", kind: "earring", name: "Bông tai Đôi Tia", st: "Kim cương tấm 0,4 ct · vàng 14K", price: "34.200.000đ" },
  { id: "p4", kind: "bangle", name: "Vòng tay Vầng Trăng", st: "Morganite 0,3 ct × 4 · vàng 18K", price: "39.900.000đ" },
] as const;

const FOUR_C = [
  { l: "Cut", vi: "Giác cắt", p: "Quyết định cách ánh sáng đi vào và trở ra. Mỗi mặt cắt được tính góc riêng cho từng viên." },
  { l: "Color", vi: "Màu sắc", p: "Chúng tôi chọn đá theo ánh sáng ban ngày, không theo đèn showroom." },
  { l: "Clarity", vi: "Độ tinh khiết", p: "Tạp chất nhỏ là dấu vân tay của đá. Quan trọng là chúng nằm ở đâu." },
  { l: "Carat", vi: "Trọng lượng", p: "Lớn không phải lúc nào cũng đẹp. Tỉ lệ viên đá với ngón tay mới là điều cần cân." },
];

const STEPS = [
  { n: "I", t: "Gặp và chọn đá", p: "Một buổi hẹn riêng, xem đá dưới ba loại ánh sáng." },
  { n: "II", t: "Phác thảo", p: "Bản vẽ tay và mô hình sáp để thử trên ngón tay." },
  { n: "III", t: "Chế tác", p: "Đúc, gắn đá, đánh bóng thủ công trong khoảng ba tuần." },
  { n: "IV", t: "Trao tay", p: "Giấy ghi chép viên đá và hướng dẫn bảo dưỡng đi kèm." },
];

const STATS = [
  { v: 8, s: "", l: "Mặt cắt chính của mỗi viên" },
  { v: 21, s: " ngày", l: "Thời gian chế tác trung bình" },
  { v: 18, s: "K", l: "Vàng sử dụng" },
  { v: 1, s: " năm", l: "Bảo dưỡng miễn phí" },
];

const QUOTES = [
  { q: "Xoay cổ tay một chút, viên đá đổi màu như đổi giờ trong ngày.", w: "Khách minh hoạ A" },
  { q: "Tôi chọn đá vì ánh sáng của nó, không phải vì nhãn.", w: "Khách minh hoạ B" },
  { q: "Cả buổi hẹn yên tĩnh, không ai thúc ép tôi mua.", w: "Khách minh hoạ C" },
];

const FAQ = [
  { q: "Đá có giấy kiểm định không?", a: "Trong bản demo này: mỗi viên đá chính đi kèm giấy ghi chép độc lập. Đây là chính sách giả định." },
  { q: "Có thể chế tác từ đá của tôi không?", a: "Có, sau khi thợ kiểm tra đá. Thông tin minh hoạ cho bản demo." },
  { q: "Bảo dưỡng như thế nào?", a: "Làm sạch và kiểm tra chấu mỗi sáu tháng, miễn phí trong năm đầu theo chính sách giả định." },
  { q: "Tinh Thể có thật không?", a: "Không. Đây là thương hiệu hư cấu để minh hoạ một landing page trang sức. Giá và thông tin đều là giả định." },
];

export default function Page() {
  const consult = buildConsultHref("tinh-the");
  return (
    <div className={styles.brand} data-tt-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Tinh Thể, về đầu trang">
          <svg viewBox="-12 -12 24 24" width="22" height="22" aria-hidden="true"><polygon points="-11,-3 -5,-10 5,-10 11,-3 0,11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M-11 -3 H11 M-5 -10 L-2 -3 L0 11 L2 -3 L5 -10" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
          Tinh Thể
        </a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          <a href="#lang-kinh">Lăng kính</a>
          <a href="#bo-suu-tap">Bộ sưu tập</a>
          <a href="#che-tac">Chế tác</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <a className={styles.btnSm} href="#dat-lich">Đặt lịch xem</a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top" aria-labelledby="tt-h1">
          <div className={styles.heroText}>
            <p className={styles.eyebrow} data-hero>Trang sức đá quý · Bản minh hoạ</p>
            <h1 id="tt-h1" className={styles.h1} data-hero>Ánh sáng,<br /><em>có hình dạng.</em></h1>
            <p className={styles.lead} data-hero>Mỗi viên đá là một chiếc lăng kính nhỏ. Hãy nghiêng nó đi, và nhìn ánh sáng chọn đường mình đi.</p>
            <div className={styles.heroCta} data-hero>
              <a className={styles.btn} href="#lang-kinh">Thử lăng kính</a>
              <a className={styles.link} href="#bo-suu-tap">Xem bộ sưu tập</a>
            </div>
          </div>
          <div className={styles.heroGem}>
            <Gem hue={205} sat={55} label="Viên đá nhiều mặt cắt minh hoạ, nghiêng theo con trỏ" float />
          </div>
          <p className={styles.hintLine} aria-hidden="true">Di chuyển con trỏ trong khung này</p>
        </section>

        <section className={styles.intro} aria-labelledby="tt-intro">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Xưởng chế tác</p>
            <h2 id="tt-intro" className={styles.statement}>Chúng tôi không làm trang sức để <em>che đá</em>. Chúng tôi làm để đá có chỗ <em>toả sáng.</em></h2>
          </div>
        </section>

        <section className={styles.labSec} id="lang-kinh" aria-labelledby="tt-lab">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Lăng kính</p>
            <h2 id="tt-lab" className={styles.h2}>Nghiêng để <em>thấy</em></h2>
            <p className={styles.leadW}>Hai mươi lăm mặt cắt, mỗi mặt nhận ánh sáng theo góc riêng của nó. Chọn đá, chọn trọng lượng, rồi dùng con trỏ làm nguồn sáng.</p>
            <Lab />
          </div>
        </section>

        <section className={styles.fourC} aria-labelledby="tt-4c">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Bốn chữ C</p>
            <h2 id="tt-4c" className={styles.h2}>Cách chúng tôi <em>đọc một viên đá</em></h2>
            <ul className={styles.cGrid}>
              {FOUR_C.map((c) => (
                <li key={c.l} data-rv><span className={styles.cL}>{c.l}</span><h3>{c.vi}</h3><p>{c.p}</p></li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.coll} id="bo-suu-tap" aria-labelledby="tt-coll">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Bộ sưu tập</p>
            <h2 id="tt-coll" className={styles.h2}>Bốn món <em>đầu tiên</em></h2>
            <ul className={styles.cards}>
              {PIECES.map((p) => (
                <li key={p.id}>
                  <div className={styles.card} data-tilt>
                    <div className={styles.cardArt}><Piece kind={p.kind} id={p.id} /></div>
                    <i className={styles.cardGlare} aria-hidden="true" />
                    <div className={styles.cardBody}>
                      <h3>{p.name}</h3>
                      <p>{p.st}</p>
                      <p className={styles.cardPrice}>{p.price}<small> · giá giả định</small></p>
                      <a href="#dat-lich" className={styles.cardLink}>Đặt lịch xem<span className={styles.srOnly}> {p.name}</span></a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.steps} id="che-tac" aria-labelledby="tt-steps">
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Chế tác theo yêu cầu</p>
            <h2 id="tt-steps" className={styles.h2}>Bốn bước, <em>một chiếc nhẫn</em></h2>
            <ol className={styles.stepList}>
              {STEPS.map((s) => (<li key={s.n} data-rv><span>{s.n}</span><h3>{s.t}</h3><p>{s.p}</p></li>))}
            </ol>
          </div>
        </section>

        <section className={styles.stats} aria-label="Con số minh hoạ">
          <ul>
            {STATS.map((s) => (<li key={s.l}><b><span data-count={s.v}>{s.v}</span>{s.s}</b><span>{s.l}</span></li>))}
          </ul>
          <p>Số liệu minh hoạ, không phải dữ liệu của thương hiệu thật.</p>
        </section>

        <section className={styles.quotes} aria-labelledby="tt-q">
          <div className={styles.wrap}>
            <h2 id="tt-q" className={styles.srOnly}>Cảm nhận minh hoạ</h2>
            <div className={styles.qGrid}>
              {QUOTES.map((q) => (<figure key={q.w} data-rv><blockquote>“{q.q}”</blockquote><figcaption>{q.w} · lời khen minh hoạ</figcaption></figure>))}
            </div>
          </div>
        </section>

        <section className={styles.faq} id="hoi-dap" aria-labelledby="tt-faq">
          <div className={styles.wrapN}>
            <p className={styles.eyebrow}>Hỏi đáp</p>
            <h2 id="tt-faq" className={styles.h2}>Điều thường <em>được hỏi</em></h2>
            {FAQ.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
          </div>
        </section>

        <section className={styles.book} id="dat-lich" aria-labelledby="tt-book">
          <div className={styles.bookGrid}>
            <div>
              <p className={styles.eyebrow}>Đặt lịch xem</p>
              <h2 id="tt-book" className={styles.h2}>Một phòng <em>riêng</em>, một chiều</h2>
              <p className={styles.leadD}>Biểu mẫu mô phỏng, chạy hoàn toàn trên trình duyệt. Không có lịch hẹn nào được tạo.</p>
              <a className={styles.linkD} href={consult}>Cần một trang trang sức như thế này cho thương hiệu của bạn?</a>
            </div>
            <Appointment />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.bigWord} aria-hidden="true">Tinh Thể</p>
        <div className={styles.footRow}>
          <p>Tinh Thể là thương hiệu minh hoạ. Giá, chất liệu và chính sách đều là giả định.</p>
          <a href="#top">Về đầu trang</a>
        </div>
      </footer>
      <Motion />
    </div>
  );
}
