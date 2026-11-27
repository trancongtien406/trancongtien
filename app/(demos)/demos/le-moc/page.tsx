import type { Metadata } from "next";
import styles from "./brand.module.css";
import { Motion } from "./components/Motion";
import { Shop } from "./components/Shop";
import { BLOB_A, BLOB_B, PEAR, toPath } from "./components/shapes";

export const metadata: Metadata = {
  title: "Lê Mộc · Nông sản hữu cơ theo mùa (demo minh hoạ)",
  description: "Demo minh hoạ landing nông sản hữu cơ với blob SVG biến hình thành quả lê theo cuộn.",
  alternates: { canonical: "/demos/le-moc" },
};

const months = [
  ["Th 1", "Cam sành, rau mầm"], ["Th 2", "Cải xanh, su hào"], ["Th 3", "Bơ sáp, rau thơm"], ["Th 4", "Xoài, mật ong"],
  ["Th 5", "Vải, nhãn"], ["Th 6", "Mận, đào"], ["Th 7", "Sầu riêng, chôm chôm"], ["Th 8", "Lê tai nung"],
  ["Th 9", "Lê, hồng giòn"], ["Th 10", "Gạo lứt mới"], ["Th 11", "Quýt, rau củ đông"], ["Th 12", "Giỏ quà cuối năm"],
];
const steps = [
  { t: "Gieo đúng mùa", d: "Chọn giống hợp đất, xen canh để hạn chế sâu bệnh, không dùng thuốc trừ sâu hoá học." },
  { t: "Hái đúng độ chín", d: "Thu hoạch buổi sáng, phân loại bằng tay, không ép chín bằng hoá chất." },
  { t: "Đóng gói gọn", d: "Ưu tiên giấy tái chế, lưới tre, hũ thuỷ tinh có thể trả lại." },
  { t: "Giao trong ngày", d: "Đơn nội thành giao trong ngày, đơn xa giữ lạnh bằng đá gel tái sử dụng." },
];
const quotes = [
  { q: "Quả lê giòn, có vị như hồi nhỏ ăn ở vườn bà. Mình mở giỏ ra là thơm cả bếp.", a: "Lời nhắn mẫu, khách giả định" },
  { q: "Điều mình thích là họ ghi rõ mùa nào có gì, không hứa lúc nào cũng đủ mọi thứ.", a: "Lời nhắn mẫu, khách giả định" },
];
const faqs = [
  { q: "Sản phẩm có chứng nhận hữu cơ không?", a: "Đây là thương hiệu minh hoạ nên không có chứng nhận nào. Với cửa hàng thật, phần này nên ghi rõ tổ chức chứng nhận và mã số." },
  { q: "Giỏ Mộc theo tuần gồm những gì?", a: "Bốn món theo mùa do người trồng chọn: một loại quả, một loại rau, một đặc sản khô và một món bất ngờ." },
  { q: "Tôi có thể đổi hoặc tạm ngưng giỏ không?", a: "Có, báo trước 48 giờ. Trang này chỉ minh hoạ luồng đặt hàng, chưa có đơn nào được tạo." },
  { q: "Giá và số liệu trên trang là thật?", a: "Không. Giá, sản phẩm và lời nhắn đều là dữ liệu mẫu để trình bày thiết kế." },
];

const heroBlob = toPath(BLOB_A, 300, 300);
const heroBlob2 = toPath(BLOB_B, 300, 300);
const pearStatic = toPath(PEAR, 640, 500);

export default function Page() {
  return (
    <div className={styles.brand} data-lm-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Motion />
      <header className={styles.header}>
        <a href="#top" className={styles.logo} aria-label="Lê Mộc, về đầu trang">Lê <i>Mộc</i></a>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#hinh-dang">Câu chuyện</a><a href="#mua-vu">Mùa vụ</a><a href="#san-pham">Sản phẩm</a><a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <a className={styles.btnSm} href="#dat-hang">Giỏ hàng</a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top">
          <svg className={styles.heroBlob} viewBox="0 0 600 600" aria-hidden="true" data-float>
            <path d={heroBlob} fill="#DCE8B5" data-blob="300,300" />
          </svg>
          <svg className={styles.heroBlob2} viewBox="0 0 600 600" aria-hidden="true" data-float>
            <path d={heroBlob2} fill="#344E32" data-blob="300,300" />
          </svg>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Nông sản hữu cơ theo mùa · thương hiệu minh hoạ</p>
            <h1 className={styles.h1}>
              <span className={styles.mask}><span data-hero-word>Lê</span></span>
              <span className={styles.mask}><span data-hero-word><i>Mộc</i></span></span>
            </h1>
            <p className={styles.lead}>Từ một khu vườn nhỏ đến bàn ăn nhà bạn. Chúng tôi chỉ bán những gì đang vào mùa và nói rõ khi chưa có.</p>
            <div className={styles.actions}>
              <a className={styles.btn} href="#san-pham">Xem sản phẩm</a>
              <a className={styles.btnOutline} href="#hinh-dang">Câu chuyện quả lê</a>
            </div>
          </div>
          <p className={styles.badge} aria-hidden="true">hữu cơ · theo mùa · làm chậm ·</p>
        </section>

        <section className={styles.statement} aria-labelledby="st">
          <p className={styles.eyebrow} data-rise>01 · Tôn trọng mùa</p>
          <h2 id="st" className={styles.h2} data-rise>Ngon không phải do <i>cầu kỳ</i>. Ngon là khi quả được hái đúng ngày nó chín.</h2>
        </section>

        <section className={styles.pear} id="hinh-dang" data-pear aria-label="Câu chuyện quả lê, hiệu ứng blob biến hình theo cuộn">
          <svg className={styles.pearSvg} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <clipPath id="lm-clip"><path data-clip d={pearStatic} /></clipPath>
              <linearGradient id="lm-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a6b46" /><stop offset="1" stopColor="#263a25" /></linearGradient>
              <radialGradient id="lm-sun" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#DCE8B5" stopOpacity=".9" /><stop offset="1" stopColor="#DCE8B5" stopOpacity="0" /></radialGradient>
            </defs>
            <rect width="1000" height="1000" fill="#FAF7ED" />
            <circle cx="640" cy="500" r="330" fill="none" stroke="#DCE8B5" strokeWidth="2" strokeDasharray="4 10" />
            <g clipPath="url(#lm-clip)">
              <g data-scene>
                <rect width="1000" height="1000" fill="url(#lm-g)" />
                <circle cx="520" cy="300" r="380" fill="url(#lm-sun)" />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <path key={i} d={`M-50 ${520 + i * 80} Q 250 ${430 + i * 80} 500 ${520 + i * 80} T 1050 ${520 + i * 80}`} fill="none" stroke="#DCE8B5" strokeOpacity={0.12 + i * 0.05} strokeWidth={2 + i * 2} />
                ))}
                {[[210, 380], [360, 330], [520, 400], [690, 340], [830, 420], [300, 560], [610, 580], [780, 600]].map(([x, y], i) => (
                  <g key={i} transform={`translate(${x} ${y}) rotate(${(i % 3) * 8 - 8})`}>
                    <path d="M0 0c-6-14 6-14 0-28" stroke="#DCE8B5" strokeWidth="3" fill="none" />
                    <path d="M0 0c20 0 30 24 38 38 12 22-2 44-38 44s-50-22-38-44C-30 24-20 0 0 0z" fill="#DCE8B5" fillOpacity={0.35 + (i % 3) * 0.2} />
                  </g>
                ))}
                {[[120, 250, -30], [880, 260, 30], [170, 770, 20], [860, 740, -20]].map(([x, y, r], i) => (
                  <path key={i} transform={`translate(${x} ${y}) rotate(${r})`} d="M0 0c60-80 170-80 230 0-60 80-170 80-230 0z" fill="#DCE8B5" fillOpacity=".14" />
                ))}
              </g>
            </g>
          </svg>
          <div className={styles.chapters}>
            <article className={styles.chapter} data-chapter>
              <p className={styles.eyebrow}>02 · Hình dáng</p>
              <h2 className={styles.h2s}>Một quả lê bắt đầu từ <i>một giọt nước.</i></h2>
              <p>Khối xanh mềm kia là thứ chúng tôi nhìn thấy trước: hình dáng của một mùa. Cuộn tiếp để nó lớn dần.</p>
            </article>
            <article className={styles.chapter} data-chapter>
              <p className={styles.eyebrow}>03 · Lớn lên</p>
              <h2 className={styles.h2s}>Lớn dần theo mùa, <i>không ép chín.</i></h2>
              <p>Cây ra hoa, đậu trái, đổi màu. Mỗi giai đoạn có nhịp riêng và chúng tôi không đi nhanh hơn nhịp đó.</p>
            </article>
            <article className={`${styles.chapter} ${styles.chapterLast}`} data-chapter>
              <p className={styles.eyebrow}>04 · Cả vườn</p>
              <h2 className={styles.h2s}>Cả vườn, <i>trong một giỏ.</i></h2>
              <a className={styles.btnLight} href="#san-pham">Chọn giỏ của bạn</a>
            </article>
          </div>
        </section>

        <section className={styles.season} id="mua-vu" aria-labelledby="ms">
          <p className={styles.eyebrow} data-rise>05 · Lịch mùa vụ</p>
          <h2 id="ms" className={styles.h2} data-rise>Tháng nào, có gì.</h2>
          <ol className={styles.months} data-stagger>
            {months.map(([m, t]) => (<li key={m}><b>{m}</b><span>{t}</span></li>))}
          </ol>
          <p className={styles.fine}>Lịch mẫu để minh hoạ, không phản ánh mùa vụ của một nông trại cụ thể.</p>
        </section>

        <section className={styles.shop} aria-labelledby="sp">
          <p className={styles.eyebrow} data-rise>06 · Sản phẩm</p>
          <h2 id="sp" className={styles.h2} data-rise>Sáu món đang vào mùa.</h2>
          <Shop />
        </section>

        <section className={styles.process} aria-labelledby="qt">
          <h2 id="qt" className={styles.h2s} data-rise>Bốn bước, không đường tắt</h2>
          <ol className={styles.stepGrid} data-stagger>
            {steps.map((s, i) => (
              <li key={s.t}><span className={styles.stepBlob} aria-hidden="true"><svg viewBox="0 0 600 600"><path d={toPath(i % 2 ? BLOB_B : BLOB_A, 300, 300)} /></svg><b>{i + 1}</b></span><h3>{s.t}</h3><p>{s.d}</p></li>
            ))}
          </ol>
        </section>

        <section className={styles.voices} aria-labelledby="vo">
          <h2 id="vo" className={styles.srOnly}>Lời nhắn mẫu</h2>
          <div className={styles.quoteRow} data-stagger>
            {quotes.map((q, i) => (<figure key={i}><blockquote>“{q.q}”</blockquote><figcaption>{q.a}</figcaption></figure>))}
          </div>
        </section>

        <section className={styles.faq} id="hoi-dap" aria-labelledby="fq">
          <h2 id="fq" className={styles.h2s} data-rise>Hỏi đáp</h2>
          <div className={styles.faqList} data-rise>
            {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footWord} aria-hidden="true">Lê <i>Mộc</i></p>
        <p>Trang demo minh hoạ thiết kế. Thương hiệu, sản phẩm, giá và lời nhắn đều là giả định.</p>
      </footer>
    </div>
  );
}
