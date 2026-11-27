import type { Metadata } from "next";
import styles from "./brand.module.css";
import { Booking } from "./components/Booking";
import { Motion } from "./components/Motion";

export const metadata: Metadata = {
  title: "Não Thức · Bản đồ tâm trí: phòng khám thần kinh (demo minh hoạ)",
  description: "Demo minh hoạ landing phòng khám khoa học thần kinh với bản đồ não cuộn theo vùng.",
  alternates: { canonical: "/demos/nao-thuc" },
};

const regions = [
  { name: "Vùng vận động", en: "Motor cortex", text: "Nơi lệnh chuyển động khởi phát. Chúng tôi đo nhịp sóng khi bạn gõ phím, nắm tay hay đứng dậy để thấy tín hiệu đi nhanh hay chậm.", at: [320, 115] },
  { name: "Vùng ngôn ngữ", en: "Broca & Wernicke", text: "Từ ý nghĩ đến lời nói. Bài kiểm tra tìm từ, nhắc lại và đọc hiểu cho biết mạng ngôn ngữ đang làm việc ổn định đến đâu.", at: [190, 215] },
  { name: "Hồi hải mã", en: "Hippocampus", text: "Trung tâm ghi nhớ. Thang đo nhớ ngắn hạn, nhớ có định hướng và học lại giúp theo dõi thay đổi theo thời gian, không chỉ một lần đo.", at: [300, 305] },
  { name: "Hạch hạnh nhân", en: "Amygdala", text: "Cảm xúc và phản ứng căng thẳng. Kết hợp nhịp tim, nhịp thở và EEG để hiểu bạn phản ứng thế nào trước kích thích.", at: [400, 330] },
  { name: "Vỏ thị giác", en: "Visual cortex", text: "Nằm phía sau đầu, xử lý hình ảnh. Bài nhìn nhanh và theo vết giúp phát hiện sớm các điểm mệt mỏi của mạng thị giác.", at: [490, 230] },
] as const;

const paths = [
  "M320 115 C 270 130, 220 160, 190 215",
  "M190 215 C 215 250, 250 290, 300 305",
  "M300 305 C 335 300, 370 310, 400 330",
  "M400 330 C 450 320, 485 285, 490 230",
];

const services = [
  { n: "01", t: "Đo EEG / qEEG", d: "Ghi sóng não 19 kênh trong 30 phút, báo cáo bản đồ nhịp alpha, beta, theta bằng ngôn ngữ dễ hiểu." },
  { n: "02", t: "Trị liệu nhận thức", d: "Chương trình rèn trí nhớ làm việc, tập trung và điều hành, chia theo cấp độ, có bài tập về nhà." },
  { n: "03", t: "Neurofeedback", d: "Học cách tự điều chỉnh sóng não qua phản hồi hình ảnh trực tiếp, 12 buổi cho một liệu trình mẫu." },
  { n: "04", t: "Giấc ngủ & căng thẳng", d: "Nhật ký giấc ngủ 14 ngày, đánh giá nhịp sinh học, kế hoạch thói quen cá nhân hoá." },
];

const stats = [
  { v: 19, l: "kênh điện cực EEG" },
  { v: 12, l: "buổi neurofeedback mẫu" },
  { v: 45, l: "phút một buổi đánh giá" },
  { v: 7, l: "ngày nhận báo cáo" },
];

const process = [
  { t: "Trò chuyện", d: "Nghe câu chuyện, triệu chứng, nhịp sống và mục tiêu của bạn." },
  { t: "Đo & đánh giá", d: "EEG, thang nhận thức, bảng hỏi giấc ngủ và căng thẳng." },
  { t: "Vẽ bản đồ", d: "Báo cáo trực quan: vùng mạnh, vùng cần hỗ trợ, ưu tiên can thiệp." },
  { t: "Đồng hành", d: "Lộ trình buổi tập, đo lại định kỳ, điều chỉnh khi cần." },
];

const quotes = [
  { q: "Lần đầu tôi nhìn thấy mình tập trung kém ở đâu trên một bản đồ, thay vì chỉ nghe một lời khuyên chung chung.", a: "Lời nhắn mẫu, nhân vật giả định A." },
  { q: "Buổi nào cũng có biểu đồ so sánh với buổi trước, nên mình biết rõ mình tiến bộ hay đang đứng yên.", a: "Lời nhắn mẫu, nhân vật giả định B." },
  { q: "Bác sĩ giải thích không dùng thuật ngữ, và luôn nói rõ cái gì chưa chắc chắn.", a: "Lời nhắn mẫu, nhân vật giả định C." },
];

const faqs = [
  { q: "Đo EEG có đau hoặc nguy hiểm không?", a: "EEG chỉ ghi lại tín hiệu điện tự nhiên bằng điện cực đặt trên da đầu, không phát điện vào cơ thể. Bạn chỉ cần ngồi thư giãn." },
  { q: "Tôi cần chuẩn bị gì trước buổi đầu?", a: "Gội đầu sạch, không dùng sáp hoặc dầu, mang theo danh sách thuốc đang dùng và ghi nhanh các triệu chứng bạn lo ngại." },
  { q: "Neurofeedback có thay thế điều trị y khoa không?", a: "Không. Đây là phương pháp hỗ trợ. Với các tình trạng cần chẩn đoán, chúng tôi sẽ giới thiệu bạn đến bác sĩ chuyên khoa phù hợp." },
  { q: "Trang này có phải phòng khám thật không?", a: "Không. Não Thức là thương hiệu và nội dung minh hoạ cho trang demo. Mọi số liệu, dịch vụ và lời nhắn chỉ để trình bày thiết kế." },
];

/** Mạng nơ-ron nền hero: toạ độ giả ngẫu nhiên cố định để SSR/CSR khớp nhau. */
const net = Array.from({ length: 34 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12543.123;
  return { x: Math.round((a - Math.floor(a)) * 760 + 20), y: Math.round((b - Math.floor(b)) * 560 + 20) };
});
const links = net.flatMap((p, i) =>
  net.slice(i + 1).filter((q) => Math.hypot(p.x - q.x, p.y - q.y) < 150).map((q) => `M${p.x} ${p.y}L${q.x} ${q.y}`),
);

export default function Page() {
  return (
    <div className={styles.brand} data-nao-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Motion />
      <header className={styles.header}>
        <a href="#top" className={styles.logo} aria-label="Não Thức, về đầu trang"><span className={styles.logoMark} aria-hidden="true" />Não Thức</a>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#ban-do">Bản đồ não</a>
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <a className={styles.btnSm} href="#dat-lich">Đặt lịch</a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top" data-hero>
          <svg className={styles.heroNet} data-hero-net viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d={links.join("")} className={styles.netLine} />
            {net.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={i % 5 === 0 ? 4 : 2.4} data-twinkle className={i % 5 === 0 ? styles.netHot : styles.netDot} />)}
          </svg>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Phòng khám thần kinh · thương hiệu minh hoạ</p>
            <h1 className={styles.h1}>
              <span className={styles.mask}><span data-hero-line>Hiểu bộ não</span></span>
              <span className={styles.mask}><span data-hero-line>bằng <em>bản đồ</em>,</span></span>
              <span className={styles.mask}><span data-hero-line>không bằng đoán.</span></span>
            </h1>
            <p className={styles.lead}>Chúng tôi đo sóng não, theo dõi trí nhớ và tập trung, rồi vẽ thành một tấm bản đồ bạn đọc được. Cuộn xuống để xem từng vùng được kích hoạt.</p>
            <div className={styles.actions}>
              <a className={styles.btn} href="#dat-lich">Đặt lịch đánh giá</a>
              <a className={styles.btnGhost} href="#ban-do">Xem bản đồ não</a>
            </div>
          </div>
          <p className={styles.scrollCue} aria-hidden="true">Cuộn<span /></p>
        </section>

        <div className={styles.strip} aria-hidden="true">
          <div className={styles.stripTrack}>
            {[0, 1].map((k) => (
              <span key={k}>EEG · qEEG · NEUROFEEDBACK · TRÍ NHỚ · TẬP TRUNG · GIẤC NGỦ · NHẬN THỨC · EEG · qEEG · NEUROFEEDBACK · TRÍ NHỚ · TẬP TRUNG · GIẤC NGỦ · NHẬN THỨC ·&nbsp;</span>
            ))}
          </div>
        </div>

        <section className={styles.intro} aria-labelledby="intro-h">
          <p className={styles.eyebrow} data-rise>01 · Cách chúng tôi nhìn</p>
          <h2 id="intro-h" className={styles.h2} data-rise>Một bộ não không phải một cái hộp đen. Nó là một mạng lưới, và mạng lưới thì đọc được.</h2>
          <div className={styles.introGrid} data-stagger>
            <p>Mỗi người có một kiểu kết nối riêng. Thay vì áp một phác đồ chung, chúng tôi bắt đầu bằng việc ghi lại: nhịp sóng, tốc độ phản ứng, cách bạn nhớ và quên.</p>
            <p>Kết quả được trình bày như một bản đồ: vùng nào hoạt động tốt, vùng nào cần hỗ trợ, và các đường nối giữa chúng. Bạn nhìn thấy cùng thứ chúng tôi nhìn thấy.</p>
            <p>Mọi nhận định đều nêu rõ độ chắc chắn. Khi vượt quá phạm vi, chúng tôi nói thẳng và giới thiệu bạn đi tiếp.</p>
          </div>
        </section>

        <section className={styles.brain} id="ban-do" data-brain aria-labelledby="brain-h">
          <div className={styles.brainText}>
            <p className={styles.eyebrow}>02 · Bản đồ não</p>
            <h2 id="brain-h" className={styles.h2s}>Năm vùng, một đường dẫn truyền</h2>
            <div className={styles.steps}>
              {regions.map((r, i) => (
                <article key={r.name} className={styles.step} data-step>
                  <p className={styles.stepNum}>0{i + 1} <span>{r.en}</span></p>
                  <h3>{r.name}</h3>
                  <p>{r.text}</p>
                </article>
              ))}
            </div>
            <div className={styles.meter} aria-hidden="true">
              <span data-index>01</span><span className={styles.meterOf}>/ 05</span>
              <div className={styles.meterBar}><i data-progress /></div>
            </div>
          </div>
          <div className={styles.brainViz}>
            <svg viewBox="0 0 600 480" role="img" aria-label="Sơ đồ não nhìn nghiêng với năm vùng được nối bằng đường dẫn truyền">
              <defs>
                <radialGradient id="nao-glow"><stop offset="0" stopColor="#D5FF3F" stopOpacity=".9" /><stop offset="1" stopColor="#D5FF3F" stopOpacity="0" /></radialGradient>
              </defs>
              <path className={styles.outline} d="M120 250 C 80 200, 110 120, 190 110 C 230 60, 330 50, 380 90 C 450 70, 520 110, 520 170 C 570 200, 560 280, 510 300 C 500 350, 440 380, 390 360 C 360 400, 290 400, 270 360 C 220 380, 150 340, 160 300 C 120 300, 105 270, 120 250 Z" />
              <g className={styles.folds}>
                <path d="M190 110 C 215 150, 195 175, 225 195" />
                <path d="M300 62 C 310 110, 285 140, 310 175 C 330 205, 320 235, 340 255" />
                <path d="M395 85 C 405 130, 385 150, 410 190 C 425 215, 440 225, 450 250" />
                <path d="M160 300 C 200 290, 230 310, 270 360" />
                <path d="M470 120 C 455 160, 480 175, 470 215" />
                <path d="M250 235 C 280 240, 300 220, 330 240" />
              </g>
              {paths.map((d, i) => <path key={i} d={d} pathLength={1} data-path className={styles.pathway} />)}
              {regions.map((r, i) => (
                <g key={r.name} data-node className={styles.node}>
                  <circle cx={r.at[0]} cy={r.at[1]} r="34" fill="url(#nao-glow)" />
                  <circle cx={r.at[0]} cy={r.at[1]} r="9" className={styles.nodeCore} />
                  <text x={r.at[0]} y={r.at[1] - 18} textAnchor="middle" className={styles.nodeLabel}>{i + 1}</text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        <section className={styles.services} id="dich-vu" aria-labelledby="sv-h">
          <p className={styles.eyebrow} data-rise>03 · Dịch vụ</p>
          <h2 id="sv-h" className={styles.h2} data-rise>Bốn cách để bắt đầu</h2>
          <ul className={styles.cards} data-stagger>
            {services.map((s) => (
              <li key={s.n} className={styles.card}>
                <span className={styles.cardNum}>{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.stats} aria-labelledby="st-h">
          <h2 id="st-h" className={styles.srOnly}>Con số minh hoạ</h2>
          <ul className={styles.statGrid}>
            {stats.map((s) => (
              <li key={s.l}><b><span data-count={s.v}>{s.v}</span></b><span>{s.l}</span></li>
            ))}
          </ul>
          <p className={styles.fine}>Con số dùng để minh hoạ bố cục, không phải dữ liệu của một đơn vị thật.</p>
        </section>

        <section className={styles.process} id="quy-trinh" aria-labelledby="pr-h">
          <p className={styles.eyebrow} data-rise>04 · Quy trình</p>
          <h2 id="pr-h" className={styles.h2} data-rise>Từ cuộc trò chuyện đến lộ trình riêng</h2>
          <div className={styles.timeline}>
            <i className={styles.tlLine} data-line aria-hidden="true" />
            <ol data-stagger>
              {process.map((p, i) => (
                <li key={p.t}><span className={styles.dot} aria-hidden="true">{i + 1}</span><h3>{p.t}</h3><p>{p.d}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.voices} aria-labelledby="vo-h">
          <h2 id="vo-h" className={styles.h2s} data-rise>Lời nhắn mẫu</h2>
          <div className={styles.quotes} data-stagger>
            {quotes.map((q) => (
              <figure key={q.a} className={styles.quote}>
                <blockquote>{q.q}</blockquote>
                <figcaption>{q.a}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.faq} id="hoi-dap" aria-labelledby="fq-h">
          <h2 id="fq-h" className={styles.h2s} data-rise>Câu hỏi thường gặp</h2>
          <div className={styles.faqList} data-rise>
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </section>

        <section className={styles.book} id="dat-lich" aria-labelledby="bk-h">
          <div>
            <p className={styles.eyebrow}>05 · Đặt lịch</p>
            <h2 id="bk-h" className={styles.h2}>Bắt đầu bằng một buổi đánh giá.</h2>
            <p className={styles.lead}>Điền thông tin, chúng tôi sẽ xếp một khung giờ phù hợp. Đây là biểu mẫu mô phỏng cho trang demo.</p>
          </div>
          <Booking />
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footBrand}>Não Thức</p>
        <p>Trang demo minh hoạ thiết kế. Thương hiệu, địa chỉ, dịch vụ và số liệu đều là giả định, không đại diện cho đơn vị y tế nào.</p>
        <p className={styles.fine}>© Demo · Không dùng cho chẩn đoán hay tư vấn y khoa.</p>
      </footer>
    </div>
  );
}
