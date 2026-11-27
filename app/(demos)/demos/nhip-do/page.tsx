import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { MarqueeRow } from "./components/MarqueeRow";
import { Motion } from "./components/Motion";
import { Pace } from "./components/Pace";
import { Shoe } from "./components/Shoe";
import { Shop, type Model } from "./components/Shop";
import { Trial } from "./components/Trial";

const MODELS: Model[] = [
  { id: "tempo", no: "01", name: "Nhịp 01 Tempo", use: "Chạy hằng ngày", price: 2490000, weight: "248 g", drop: "8 mm", upper: "#202020", accent: "#ff532e", note: "Đôi đa dụng: đệm vừa, đế bám tốt, hợp mọi buổi tempo." },
  { id: "but", no: "02", name: "Nhịp 02 Bứt", use: "Thi đấu, tốc độ", price: 3290000, weight: "196 g", drop: "6 mm", upper: "#ff532e", accent: "#202020", note: "Siêu nhẹ, đế cứng bật nảy. Dành cho ngày đua và buổi interval." },
  { id: "mon", no: "03", name: "Nhịp 03 Đường mòn", use: "Địa hình", price: 2790000, weight: "285 g", drop: "6 mm", upper: "#5b6b4a", accent: "#ff532e", note: "Đế gai sâu, mũi bảo vệ. Cho đường rừng và dốc ẩm." },
  { id: "hoi", no: "04", name: "Nhịp 04 Hồi", use: "Phục hồi", price: 2190000, weight: "271 g", drop: "10 mm", upper: "#d9d6c8", accent: "#202020", note: "Đệm dày nhất dòng. Dành cho ngày chạy chậm sau buổi nặng." },
];

const TECH = [
  { n: "01", t: "Đệm hồi năng", p: "Bọt hai lớp, lớp trên mềm, lớp dưới bật. Mỗi bước trả lại phần lớn lực đã đặt xuống.", v: 87, u: "%", l: "năng lượng hoàn trả (minh hoạ)" },
  { n: "02", t: "Đế dẫn nhịp", p: "Tấm dẫn cong nhẹ kéo bàn chân về phía trước, giữ cho nhịp chạy đều khi mệt.", v: 6, u: "mm", l: "độ cong tấm đế (minh hoạ)" },
  { n: "03", t: "Upper thoáng", p: "Lưới dệt một lớp, thoát nhiệt nhanh, không mài gót sau 15 km đầu tiên.", v: 196, u: "g", l: "đôi nhẹ nhất dòng (minh hoạ)" },
];

const FAQ = [
  { q: "Cỡ giày có chuẩn không?", a: "Trong bản demo này cỡ theo EU 39–45. Gợi ý nên chọn lớn hơn giày thường mang nửa cỡ để chân có chỗ nở khi chạy dài." },
  { q: "Có chạy thử và đổi trả không?", a: "Chính sách giả định: chạy thử 30 ngày trên đường thật, đổi cỡ miễn phí một lần." },
  { q: "Giày bền bao nhiêu km?", a: "Thông tin giả định: khoảng 600–800 km tuỳ cách chạy và mặt đường. Phần đệm xẹp dần chứ không đột ngột hỏng." },
  { q: "Đây có phải thương hiệu thật?", a: "Không. Nhịp Độ là thương hiệu hư cấu dùng cho bản demo giao diện. Giá, thông số và đánh giá đều là minh hoạ." },
];

const REVIEWS = [
  { q: "Chạy đến km thứ 18 vẫn thấy nhịp chân đều.", w: "Người chạy minh hoạ A" },
  { q: "Đôi Bứt nhẹ đến mức tôi quên là đang mang giày.", w: "Người chạy minh hoạ B" },
  { q: "Đế gai bám tốt trên dốc ướt, rất yên tâm.", w: "Người chạy minh hoạ C" },
];

export default function Page() {
  const consult = buildConsultHref("nhip-do");
  return (
    <div className={styles.brand} data-nd-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Nhịp Độ, về đầu trang">NHỊP<span>ĐỘ</span></a>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#dong">Bốn dòng</a>
          <a href="#cong-nghe">Công nghệ</a>
          <a href="#nhip">Nhịp chạy</a>
          <a href="#hoi">Hỏi đáp</a>
        </nav>
        <a className={styles.btnSm} href="#chon">Chọn giày</a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top" aria-labelledby="nd-h1">
          <p className={styles.kicker} data-hero="in"><span /> Bộ sưu tập chạy bộ · Bản minh hoạ</p>
          <h1 id="nd-h1" className={styles.h1}>
            <span className={styles.h1Mask}><span data-hero="line">Nhịp</span></span>
            <span className={styles.h1Mask}><span data-hero="line">Độ<em>.</em></span></span>
          </h1>
          <div className={styles.heroShoe} data-shoe aria-hidden="true"><Shoe upper="#202020" accent="#ff532e" /></div>
          <div className={styles.heroFoot} data-hero="in">
            <p>Mỗi người chạy có một nhịp riêng. Chúng tôi làm giày theo nhịp, rồi để trang này phản ứng với nhịp cuộn của bạn.</p>
            <a className={styles.btn} href="#chon">Tìm đôi hợp nhịp</a>
          </div>
        </section>

        <section className={styles.band} aria-label="Dải khẩu hiệu phản ứng theo tốc độ cuộn">
          <MarqueeRow words={["Chạy nhanh hơn", "Chính mình hôm qua"]} dir={-1} speed={110} tone="solid" />
          <MarqueeRow words={["Mỗi bước", "Một nhịp", "Không dừng"]} dir={1} speed={80} tone="line" />
          <MarqueeRow words={["Vào nhịp", "Bứt tốc", "Về đích"]} dir={-1} speed={140} tone="accent" />
          <p className={styles.bandNote}>Cuộn nhanh để dải chữ tăng tốc. Cuộn ngược để đổi chiều. Dừng lại, chúng trở về nhịp đều.</p>
        </section>

        <section className={styles.lineup} id="dong" aria-labelledby="nd-lineup">
          <div className={styles.wrap}>
            <p className={styles.secNo}>01 / Bốn dòng</p>
            <h2 id="nd-lineup" className={styles.h2}>Chọn đúng <em>nhịp</em></h2>
            <ol className={styles.nums}>
              <li><b>01</b> Tempo</li><li><b>02</b> Bứt</li><li><b>03</b> Đường mòn</li><li><b>04</b> Hồi</li>
            </ol>
            <div id="chon"><Shop models={MODELS} /></div>
          </div>
        </section>

        <section className={styles.tech} id="cong-nghe" aria-labelledby="nd-tech">
          <div className={styles.wrap}>
            <p className={styles.secNo}>02 / Công nghệ</p>
            <h2 id="nd-tech" className={styles.h2}>Ba thứ <em>đẩy bạn đi</em></h2>
            <ul className={styles.techList}>
              {TECH.map((t) => (
                <li key={t.n} data-rv>
                  <span className={styles.techNo}>{t.n}</span>
                  <div className={styles.techBody}><h3>{t.t}</h3><p>{t.p}</p></div>
                  <p className={styles.techStat}><b><span data-count={t.v}>{t.v}</span>{t.u}</b><small>{t.l}</small></p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.pace} id="nhip" aria-labelledby="nd-pace">
          <div className={styles.wrap}>
            <p className={styles.secNo}>03 / Nhịp chạy</p>
            <h2 id="nd-pace" className={styles.h2}>Bạn chạy <em>bao nhanh?</em></h2>
            <p className={styles.lead}>Nhập thành tích dự kiến, chúng tôi tính pace và gợi ý dòng giày phù hợp. Công cụ chạy hoàn toàn trên trình duyệt.</p>
            <Pace />
          </div>
        </section>

        <section className={styles.plan} aria-labelledby="nd-plan">
          <div className={styles.wrap}>
            <p className={styles.secNo}>04 / Bốn tuần đầu</p>
            <h2 id="nd-plan" className={styles.h2}>Lịch vào <em>nhịp</em></h2>
            <ul className={styles.bars}>
              {[["Tuần 1", 30, "3 buổi chạy nhẹ, tổng 12 km"], ["Tuần 2", 48, "4 buổi, thêm một buổi tempo"], ["Tuần 3", 70, "4 buổi, long run 12 km"], ["Tuần 4", 38, "Tuần giảm tải, chạy hồi phục"]].map(([w, p, d]) => (
                <li key={String(w)}>
                  <span>{w}</span>
                  <i style={{ ["--w" as string]: `${p}%` }} data-bar />
                  <em>{d}</em>
                </li>
              ))}
            </ul>
            <p className={styles.note}>Lịch minh hoạ cho người mới, không phải tư vấn y khoa hay huấn luyện cá nhân.</p>
          </div>
        </section>

        <section className={styles.reviews} aria-labelledby="nd-rev">
          <div className={styles.wrap}>
            <h2 id="nd-rev" className={styles.srOnly}>Cảm nhận minh hoạ</h2>
            <div className={styles.revGrid}>
              {REVIEWS.map((r) => (
                <figure key={r.w} data-rv>
                  <blockquote>“{r.q}”</blockquote>
                  <figcaption>{r.w} · lời khen minh hoạ</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faq} id="hoi" aria-labelledby="nd-faq">
          <div className={styles.wrapN}>
            <p className={styles.secNo}>05 / Hỏi đáp</p>
            <h2 id="nd-faq" className={styles.h2}>Hỏi trước <em>khi chạy</em></h2>
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </section>

        <section className={styles.trial} id="thu" aria-labelledby="nd-trial">
          <div className={styles.trialGrid}>
            <div>
              <p className={styles.secNo}>06 / Chạy thử</p>
              <h2 id="nd-trial" className={styles.h2}>Mang thử <em>30 ngày</em></h2>
              <p className={styles.lead}>Biểu mẫu mô phỏng, chạy trên trình duyệt. Không dữ liệu nào được gửi đi.</p>
              <a className={styles.linkInv} href={consult}>Cần một trang bán hàng như thế này cho thương hiệu của bạn?</a>
            </div>
            <Trial models={MODELS.map((m) => m.name)} />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <MarqueeRow words={["Nhịp Độ", "Vào nhịp"]} dir={-1} speed={60} tone="line" />
        <div className={styles.footRow}>
          <p>Nhịp Độ là thương hiệu minh hoạ. Giá, thông số và đánh giá đều là giả định.</p>
          <a href="#top">Về đầu trang</a>
        </div>
      </footer>

      <div className={styles.hud} data-hud aria-hidden="true">
        <span>Tốc độ cuộn</span>
        <b><span data-hud-v>0</span> px/s</b>
        <i><u data-hud-bar /></i>
      </div>
      <Motion />
    </div>
  );
}
