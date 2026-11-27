import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Catalog, type Book } from "./components/Catalog";
import { Cover } from "./components/Cover";
import { Motion } from "./components/Motion";
import { PreOrder } from "./components/PreOrder";
import { Mask, Scrub } from "./components/Type";

const BOOKS: Book[] = [
  { title: "Mực và Giấy", kind: "Thư pháp", author: "Tác giả minh hoạ A", year: "2026", pages: 240, price: 520000 },
  { title: "Phố không tên", kind: "Ký hoạ", author: "Tác giả minh hoạ B", year: "2026", pages: 192, price: 460000 },
  { title: "Bảng màu của mưa", kind: "Màu nước", author: "Tác giả minh hoạ C", year: "2025", pages: 216, price: 580000 },
  { title: "Hình học của lá", kind: "Thực vật", author: "Tác giả minh hoạ D", year: "2025", pages: 168, price: 420000 },
  { title: "Nét khắc trên gỗ", kind: "Mộc bản", author: "Tác giả minh hoạ E", year: "2026", pages: 280, price: 720000 },
  { title: "Nhà trong gió", kind: "Kiến trúc", author: "Tác giả minh hoạ F", year: "2025", pages: 256, price: 640000 },
];

const STEPS = [
  { n: "01", t: "Đọc bản thảo", p: "Hai biên tập viên đọc độc lập, ghi chú bằng bút chì rồi mới trao đổi với tác giả." },
  { n: "02", t: "Dàn trang", p: "Mỗi trang đôi được vẽ tay ở khổ thu nhỏ trước khi vào phần mềm. Chữ đi trước, hình theo sau." },
  { n: "03", t: "Thử màu", p: "In thử ba lần trên giấy thật. Màu đỏ son được pha riêng, không dùng bảng màu có sẵn." },
  { n: "04", t: "In và đóng", p: "In offset, gấp tay, khâu chỉ gáy. Mỗi lô chỉ vài trăm cuốn, đánh số bằng tem mực." },
  { n: "05", t: "Giao sách", p: "Bọc giấy kraft, kèm một tờ colophon ghi lại những người đã làm ra cuốn sách." },
];

const STATS = [
  { v: 6, s: "", l: "Đầu sách trong danh mục" },
  { v: 300, s: "", l: "Bản mỗi lần in" },
  { v: 3, s: "", l: "Lần thử màu mỗi cuốn" },
  { v: 120, s: " g", l: "Định lượng giấy ruột" },
];

const FAQ = [
  { q: "Sách in bằng giấy gì?", a: "Trong bản demo này: ruột giấy mỹ thuật không tráng 120 g, bìa cứng bọc vải. Đây là thông số minh hoạ." },
  { q: "Bao lâu thì nhận được sách đặt trước?", a: "Giả định khoảng bốn tuần kể từ khi đóng đợt đặt trước, tuỳ lịch in." },
  { q: "Tác giả mới có thể gửi bản thảo không?", a: "Có. Quy trình minh hoạ: gửi mười trang mẫu và một đoạn giới thiệu, chúng tôi phản hồi trong sáu tuần." },
  { q: "Chữ Khắc có thật không?", a: "Không. Đây là nhà xuất bản hư cấu dùng cho bản demo giao diện. Tên sách, tác giả và giá đều là minh hoạ." },
];

const QUOTES = [
  { q: "Một cuốn sách mà bạn muốn đọc bằng ngón tay trước khi đọc bằng mắt.", w: "Độc giả minh hoạ A" },
  { q: "Trang nào cũng có khoảng trắng để thở.", w: "Độc giả minh hoạ B" },
];

export default function Page() {
  const consult = buildConsultHref("chu-khac");
  return (
    <div className={styles.brand} data-ck-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Chữ Khắc, về đầu trang">Chữ Khắc<i aria-hidden="true">®</i></a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          <a href="#tuyen-ngon">Tuyên ngôn</a>
          <a href="#danh-muc">Danh mục</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <a className={styles.btnSm} href="#dat-truoc">Đặt trước</a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top" aria-labelledby="ck-h1">
          <p className={styles.mono} data-rv0>Nhà xuất bản sách nghệ thuật · Bản minh hoạ · Số 01 / 2026</p>
          <h1 id="ck-h1" className={styles.h1}>
            <span className={styles.hl} data-hl data-d="-1"><Mask text="Mỗi chữ" className={styles.w} /></span>
            <span className={styles.hl} data-hl data-d="1"><Mask text="là một" className={styles.w} /> <em><Mask text="nhát" className={styles.w} /></em></span>
            <span className={styles.hl} data-hl data-d="-1"><em><Mask text="khắc" className={styles.w} /></em><Mask text="." className={styles.w} /></span>
          </h1>
          <div className={styles.heroFoot} data-rv0>
            <p>Chúng tôi làm sách cho người thích nhìn lâu: thư pháp, ký hoạ, khắc gỗ, kiến trúc. Mỗi cuốn in vài trăm bản, đánh số bằng tay.</p>
            <a className={styles.btn} href="#danh-muc">Xem danh mục</a>
          </div>
          <p className={styles.scrollHint} aria-hidden="true">Cuộn ↓</p>
        </section>

        <section className={styles.manifesto} id="tuyen-ngon" aria-labelledby="ck-man" data-manifesto>
          <div className={styles.manSticky}>
            <h2 id="ck-man" className={styles.srOnly}>Tuyên ngôn</h2>
            <p className={styles.mono}>Tuyên ngôn / 01</p>
            <p className={styles.manText} aria-hidden="true">
              <Scrub hi={["khắc", "chậm", "nhìn", "giấy"]} text="Chúng tôi tin rằng một cuốn sách đẹp được khắc, không phải được in. Mỗi trang là một nhát dao: đọc chậm, nhìn lâu, để mực ăn vào giấy và chữ ở lại với người cầm." />
            </p>
            <p className={styles.srOnly}>Chúng tôi tin rằng một cuốn sách đẹp được khắc, không phải được in. Mỗi trang là một nhát dao: đọc chậm, nhìn lâu, để mực ăn vào giấy và chữ ở lại với người cầm.</p>
          </div>
        </section>

        <section className={styles.rows} aria-label="Chữ chuyển động theo cuộn" data-rows>
          <p className={styles.row} data-kr data-from="12" data-to="-30">Đọc chậm <em>·</em> Đọc chậm <em>·</em> Đọc chậm</p>
          <p className={`${styles.row} ${styles.rowOutline}`} data-kr data-from="-40" data-to="5">Nhìn lâu <em>·</em> Nhìn lâu <em>·</em> Nhìn lâu</p>
          <p className={styles.row} data-kr data-from="8" data-to="-34">Giữ lại <em>·</em> Giữ lại <em>·</em> Giữ lại</p>
        </section>

        <section className={styles.featured} aria-labelledby="ck-feat">
          <div className={styles.wrap}>
            <p className={styles.mono}>Sách tháng này / Nổi bật</p>
            <div className={styles.featGrid}>
              <div className={styles.featCover} data-rv><Cover i={0} title="Mực và Giấy" tone="red" /></div>
              <div>
                <h2 id="ck-feat" className={styles.h2} data-lines>
                  <span className={styles.ln}><span data-line>Mực và Giấy,</span></span>
                  <span className={styles.ln}><em data-line>hai mươi bốn</em></span>
                  <span className={styles.ln}><span data-line>bài tập khắc chữ.</span></span>
                </h2>
                <p className={styles.featP} data-rv>Hai trăm bốn mươi trang về cách một nét bút trở thành một nét khắc: từ cầm bút, tạo nhịp, đến chuyển sang dao và gỗ. Sách minh hoạ, tác giả hư cấu.</p>
                <dl className={styles.meta} data-rv>
                  <div><dt>Khổ</dt><dd>21 × 28 cm</dd></div>
                  <div><dt>Số trang</dt><dd>240</dd></div>
                  <div><dt>Giá dự kiến</dt><dd>520.000đ</dd></div>
                </dl>
                <a className={styles.btn} href="#dat-truoc">Đặt trước cuốn này</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.catalogSec} id="danh-muc" aria-labelledby="ck-cat">
          <div className={styles.wrap}>
            <p className={styles.mono}>Danh mục / 06 đầu sách</p>
            <h2 id="ck-cat" className={styles.h2} data-lines>
              <span className={styles.ln}><span data-line>Sáu cuốn,</span></span>
              <span className={styles.ln}><em data-line>mỗi cuốn một nghề.</em></span>
            </h2>
            <Catalog books={BOOKS} />
          </div>
        </section>

        <section className={styles.process} id="quy-trinh" aria-labelledby="ck-proc">
          <div className={styles.wrap}>
            <p className={styles.mono}>Quy trình / Từ bản thảo đến cuốn sách</p>
            <h2 id="ck-proc" className={styles.h2} data-lines>
              <span className={styles.ln}><span data-line>Năm bước,</span></span>
              <span className={styles.ln}><em data-line>không bước nào vội.</em></span>
            </h2>
            <ol className={styles.steps}>
              {STEPS.map((s) => (
                <li key={s.n} data-rv><span className={styles.stN}>{s.n}</span><h3>{s.t}</h3><p>{s.p}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.stats} aria-label="Con số minh hoạ">
          <ul>
            {STATS.map((s) => (<li key={s.l}><b><span data-count={s.v}>{s.v}</span>{s.s}</b><span>{s.l}</span></li>))}
          </ul>
          <p className={styles.mono}>Số liệu minh hoạ, không phải dữ liệu của nhà xuất bản thật.</p>
        </section>

        <section className={styles.quotes} aria-labelledby="ck-q">
          <div className={styles.wrap}>
            <h2 id="ck-q" className={styles.srOnly}>Cảm nhận minh hoạ</h2>
            {QUOTES.map((q) => (
              <figure key={q.w} data-rv><blockquote>“{q.q}”</blockquote><figcaption className={styles.mono}>{q.w} · lời khen minh hoạ</figcaption></figure>
            ))}
          </div>
        </section>

        <section className={styles.faq} id="hoi-dap" aria-labelledby="ck-faq">
          <div className={styles.wrapN}>
            <p className={styles.mono}>Hỏi đáp</p>
            <h2 id="ck-faq" className={styles.h2}>Hỏi trước <em>khi đặt</em></h2>
            {FAQ.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
          </div>
        </section>

        <section className={styles.order} id="dat-truoc" aria-labelledby="ck-order">
          <div className={styles.orderGrid}>
            <div>
              <p className={styles.mono}>Đặt trước / Đợt in tháng này</p>
              <h2 id="ck-order" className={styles.h2}>Giữ một <em>cuốn</em> cho bạn</h2>
              <p className={styles.orderP}>Biểu mẫu mô phỏng, chạy hoàn toàn trên trình duyệt. Không có đơn hàng nào được gửi đi.</p>
              <a className={styles.linkInv} href={consult}>Cần một trang xuất bản như thế này cho nhà sách của bạn?</a>
            </div>
            <PreOrder books={BOOKS} />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.bigWord} aria-hidden="true">Chữ Khắc</p>
        <div className={styles.colophon}>
          <p className={styles.mono}>Colophon</p>
          <p>Chữ Khắc là nhà xuất bản minh hoạ. Chữ: Literata và Space Mono. Mực: đen và đỏ son. Mọi tên sách, giá và thông tin đều là giả định.</p>
          <a href="#top" className={styles.mono}>Về đầu trang ↑</a>
        </div>
      </footer>
      <Motion />
    </div>
  );
}
