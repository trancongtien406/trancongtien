import type { Metadata } from "next";
import styles from "./brand.module.css";
import { Configurator } from "./components/Configurator";
import { Motion } from "./components/Motion";
import { Sequence } from "./components/Sequence";
import { CAR_BODY, CAR_GLASS, WHEELS } from "./components/car";

export const metadata: Metadata = {
  title: "Tốc Ảnh · Showroom xe thể thao, chuỗi khung hình điện ảnh (demo minh hoạ)",
  description: "Demo minh hoạ landing showroom xe thể thao với chuỗi khung hình canvas điều khiển theo cuộn.",
  alternates: { canonical: "/demos/toc-anh" },
};

const models = [
  { n: "R", name: "Vệt R", tag: "Cầu sau, nhẹ nhất", hp: 520, t: "3,4", w: "1.390", color: "#c0c0c0" },
  { n: "S", name: "Vệt S", tag: "Hai cầu, bám đường", hp: 640, t: "2,9", w: "1.480", color: "#ff4d00" },
  { n: "GT", name: "Vệt GT", tag: "Đường trường, êm ái", hp: 580, t: "3,2", w: "1.560", color: "#3a3a3d" },
];
const stats = [
  { v: 640, dec: 0, l: "mã lực (số liệu mẫu)", u: "HP" },
  { v: 2.9, dec: 1, l: "giây tăng tốc 0-100 km/h", u: "s" },
  { v: 312, dec: 0, l: "tốc độ tối đa giả định", u: "km/h" },
  { v: 1480, dec: 0, l: "kg khối lượng khô", u: "kg" },
];
const steps = [
  { t: "Chọn cấu hình", d: "Mẫu xe, màu sơn, vành, nội thất trên cấu hình trực tuyến." },
  { t: "Lái thử", d: "Một giờ trên cung đường riêng cùng chuyên viên, có xe thay thế." },
  { t: "Đặt cọc", d: "Cọc giữ phiên bản, ký hợp đồng điện tử và theo dõi tiến độ." },
  { t: "Chế tác", d: "Cập nhật mỗi tuần: khung, động cơ, hoàn thiện, kiểm định." },
  { t: "Bàn giao", d: "Buổi lễ nhận xe, hướng dẫn chế độ lái và bảo dưỡng định kỳ." },
];
const faqs = [
  { q: "Tôi có thể lái thử trước khi đặt cọc?", a: "Có. Mỗi lịch lái thử kéo dài khoảng một giờ. Đây là quy trình minh hoạ cho trang demo." },
  { q: "Thông số trên trang có chính xác không?", a: "Không. Công suất, thời gian tăng tốc, giá và mọi con số chỉ để trình bày bố cục, không phải xe thật." },
  { q: "Chuỗi khung hình ở trên được làm thế nào?", a: "Là 120 khung hình vẽ trực tiếp bằng canvas 2D, mỗi vị trí cuộn tương ứng một khung. Không dùng ảnh hay video." },
  { q: "Có hỗ trợ trả góp không?", a: "Trang demo chỉ minh hoạ khối thông tin tài chính. Với doanh nghiệp thật, mục này cần số liệu và điều khoản cụ thể." },
];

function CarMini({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="-4 -52 108 60" role="img" aria-label={label} className={styles.mini}>
      <path d={CAR_BODY} fill={color} stroke="#c0c0c0" strokeWidth=".4" />
      <path d={CAR_GLASS} fill="#0b0f14" />
      <path d="M31 -13.6H69" stroke="#ff4d00" strokeWidth=".9" />
      {WHEELS.map((x) => (<g key={x}><circle cx={x} cy="-11" r="12.6" fill="#030303" /><circle cx={x} cy="-11" r="11" fill="#050505" /><circle cx={x} cy="-11" r="7.6" fill="#26262a" stroke="#c0c0c0" strokeWidth=".7" /></g>))}
    </svg>
  );
}

export default function Page() {
  return (
    <div className={styles.brand} data-ta-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Motion />
      <header className={styles.header}>
        <a href="#top" className={styles.logo} aria-label="Tốc Ảnh, về đầu trang">TỐC<span>/</span>ẢNH</a>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#chuoi-khung-hinh">Khung hình</a><a href="#mau-xe">Mẫu xe</a><a href="#quy-trinh">Quy trình</a><a href="#lai-thu">Lái thử</a>
        </nav>
        <a className={styles.btnSm} href="#lai-thu">Lái thử</a>
      </header>

      <main id="main">
        <section className={styles.hero} id="top" data-hero>
          <div className={styles.slashes} aria-hidden="true">{[0, 1, 2, 3].map((i) => <i key={i} data-slash style={{ top: `${18 + i * 17}%`, width: `${30 + (i % 2) * 24}%` }} />)}</div>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow} data-hero-in>Showroom xe thể thao · thương hiệu minh hoạ</p>
            <h1 className={styles.h1} data-hero-word><span data-hero-in>TỐC</span><span data-hero-in className={styles.outline}>ẢNH</span></h1>
            <p className={styles.lead} data-hero-in>Mỗi vòng quay bánh xe là một khung hình. Cuộn xuống và tự mình tăng tốc từ vạch xuất phát đến tốc độ đỉnh.</p>
            <div className={styles.actions} data-hero-in>
              <a className={styles.btn} href="#chuoi-khung-hinh">Bắt đầu tăng tốc</a>
              <a className={styles.btnGhost} href="#lai-thu">Đặt lái thử</a>
            </div>
          </div>
          <dl className={styles.heroStat} data-hero-in><dt>0 → 100 km/h</dt><dd>2,9<small>s</small></dd><dd className={styles.fine}>Số liệu minh hoạ</dd></dl>
        </section>

        <div className={styles.ticker} aria-hidden="true"><div className={styles.tickerTrack}>{[0, 1].map((k) => <span key={k}>CANVAS · 120 KHUNG · SCROLL SCRUB · TỐC ĐỘ · ĐIỆN ẢNH · CANVAS · 120 KHUNG · SCROLL SCRUB · TỐC ĐỘ · ĐIỆN ẢNH · </span>)}</div></div>

        <Sequence />

        <section className={styles.models} id="mau-xe" aria-labelledby="mx">
          <p className={styles.eyebrow} data-rise>02 · Mẫu xe</p>
          <h2 id="mx" className={styles.h2} data-rise>Ba tính cách, một nền tảng.</h2>
          <ul className={styles.modelGrid} data-rows>
            {models.map((m) => (
              <li key={m.n} className={styles.model}>
                <span className={styles.modelTag}>{m.n}</span>
                <CarMini color={m.color} label={`Hình minh hoạ ${m.name}`} />
                <h3>{m.name}</h3>
                <p>{m.tag}</p>
                <dl><div><dt>Công suất</dt><dd>{m.hp} HP</dd></div><div><dt>0-100</dt><dd>{m.t} s</dd></div><div><dt>Khối lượng</dt><dd>{m.w} kg</dd></div></dl>
              </li>
            ))}
          </ul>
          <p className={styles.fine}>Thông số minh hoạ, không phải xe thật.</p>
        </section>

        <section className={styles.stats} aria-label="Số liệu minh hoạ">
          <ul>{stats.map((s) => (<li key={s.l}><b><span data-count={s.v} data-dec={s.dec}>{s.v.toLocaleString("vi-VN", { minimumFractionDigits: s.dec })}</span><small>{s.u}</small></b><span>{s.l}</span></li>))}</ul>
        </section>

        <section className={styles.process} id="quy-trinh" aria-labelledby="qt">
          <p className={styles.eyebrow} data-rise>03 · Quy trình</p>
          <h2 id="qt" className={styles.h2} data-rise>Từ vạch xuất phát đến chìa khoá.</h2>
          <ol className={styles.stepList} data-rows>
            {steps.map((s, i) => (<li key={s.t}><span>{String(i + 1).padStart(2, "0")}</span><h3>{s.t}</h3><p>{s.d}</p></li>))}
          </ol>
        </section>

        <section className={styles.faq} aria-labelledby="fq">
          <h2 id="fq" className={styles.h2s} data-rise>Câu hỏi thường gặp</h2>
          <div className={styles.faqList} data-rise>{faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}</div>
        </section>

        <section className={styles.drive} id="lai-thu" aria-labelledby="lt">
          <p className={styles.eyebrow}>04 · Cấu hình &amp; lái thử</p>
          <h2 id="lt" className={styles.h2}>Chọn màu. Đặt giờ.</h2>
          <Configurator />
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footWord} aria-hidden="true">TỐC<span>/</span>ẢNH</p>
        <p>Trang demo minh hoạ. Thương hiệu, mẫu xe, thông số và số liệu đều là giả định, không đại diện cho hãng xe nào.</p>
      </footer>
    </div>
  );
}
