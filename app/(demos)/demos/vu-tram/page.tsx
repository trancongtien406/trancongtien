import styles from "./brand.module.css";
import { LiveCoords } from "./components/LiveCoords";
import { Motion } from "./components/Motion";
import { Orbital } from "./components/Orbital";
import { Request } from "./components/Request";

/* Sao: toạ độ giả ngẫu nhiên xác định (không dùng Math.random để tránh lệch SSR). */
const STARS = Array.from({ length: 140 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453, b = Math.sin(i * 78.233) * 12345.6789, c = Math.sin(i * 39.346) * 9876.5432;
  const f = (n: number) => n - Math.floor(n);
  return { x: f(a) * 100, y: f(b) * 100, r: 0.5 + f(c) * 1.4, o: 0.25 + f(a * 3.1) * 0.75 };
});

const MISSIONS = [
  ["Giám sát nông nghiệp", "Chỉ số thực vật theo từng thửa, cảnh báo sâu bệnh và khô hạn sớm hơn quan sát bằng mắt.", "ndvi"],
  ["Cảnh báo thiên tai", "Theo dõi mực nước, lũ quét và cháy rừng, đẩy cảnh báo tới địa phương theo ngưỡng cài sẵn.", "wave"],
  ["Hạ tầng và đô thị", "So sánh ảnh theo thời gian để phát hiện lấn chiếm, sạt lở, công trình mới.", "grid"],
] as const;

const PIPE = [
  ["01", "Thu nhận", "Vệ tinh chụp và lưu dữ liệu thô trên quỹ đạo."],
  ["02", "Truyền về", "Trạm mặt đất nhận dữ liệu khi vệ tinh bay ngang."],
  ["03", "Xử lý", "Hiệu chỉnh khí quyển, ghép ảnh, tính chỉ số."],
  ["04", "Bàn giao", "Bảng điều khiển, API và cảnh báo theo ngưỡng."],
] as const;

const FAQ = [
  ["Vũ Trạm có vệ tinh thật không?", "Không. Đây là trang minh hoạ cho một thương hiệu hư cấu, mọi thông số đều là ví dụ."],
  ["Dữ liệu cập nhật bao lâu một lần?", "Trong kịch bản mẫu: hằng ngày, 3 ngày hoặc hằng tuần tuỳ gói. Con số chỉ dùng để dựng giao diện."],
  ["Có cần hạ tầng riêng để nhận dữ liệu?", "Không trong ví dụ này: dữ liệu giao qua bảng điều khiển web và API."],
] as const;

function Mini({ k }: { k: "ndvi" | "wave" | "grid" }) {
  if (k === "ndvi") return (<svg viewBox="0 0 240 90" className={styles.mini} aria-hidden="true"><defs><linearGradient id="vt-n"><stop offset="0" stopColor="#5271FF" /><stop offset=".5" stopColor="#8ea5ff" /><stop offset="1" stopColor="#DCE8FF" /></linearGradient></defs>{Array.from({ length: 8 }, (_, r) => Array.from({ length: 20 }, (_, c) => <rect key={`${r}${c}`} x={c * 12} y={r * 11.2} width="10.5" height="9.7" fill="url(#vt-n)" opacity={0.15 + ((Math.sin(r * 1.3 + c * 0.7) + 1) / 2) * 0.85} />))}</svg>);
  if (k === "wave") return (<svg viewBox="0 0 240 90" className={styles.mini} aria-hidden="true">{[0, 1, 2, 3].map((i) => <path key={i} d={`M0 ${30 + i * 14} C 40 ${10 + i * 14}, 80 ${50 + i * 14}, 120 ${30 + i * 14} S 200 ${10 + i * 14}, 240 ${30 + i * 14}`} fill="none" stroke="#5271FF" strokeOpacity={1 - i * 0.2} strokeWidth="2" />)}</svg>);
  return (<svg viewBox="0 0 240 90" className={styles.mini} aria-hidden="true"><g stroke="#5271FF" strokeOpacity=".6">{Array.from({ length: 13 }, (_, i) => <line key={i} x1={i * 20} y1="0" x2={i * 20} y2="90" />)}{Array.from({ length: 6 }, (_, i) => <line key={i} x1="0" y1={i * 18} x2="240" y2={i * 18} />)}</g><rect x="60" y="18" width="60" height="36" fill="#5271FF" opacity=".5" /><rect x="140" y="36" width="40" height="36" fill="#DCE8FF" opacity=".5" /></svg>);
}

export default function Page() {
  return (
    <div className={styles.brand} data-vt-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Vũ Trạm, về đầu trang">
          <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><circle cx="16" cy="16" r="5" fill="#5271FF" /><ellipse cx="16" cy="16" rx="14" ry="6" fill="none" stroke="#DCE8FF" strokeWidth="1.6" transform="rotate(-25 16 16)" /></svg>
          VŨ TRẠM
        </a>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#dai-quan-sat">Đài quan sát</a><a href="#nhiem-vu">Nhiệm vụ</a><a href="#quy-trinh">Quy trình</a><a href="#yeu-cau">Yêu cầu</a>
        </nav>
      </header>
      <main id="main">
        <section className={styles.hero} id="top" data-hero>
          <svg className={styles.stars} data-stars viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {STARS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.12} fill="#DCE8FF" opacity={s.o} />)}
          </svg>
          <svg className={styles.bigRing} viewBox="0 0 800 800" aria-hidden="true">
            <g data-ring><circle cx="400" cy="400" r="380" fill="none" stroke="#5271FF" strokeOpacity=".5" strokeDasharray="2 10" /><circle cx="400" cy="400" r="300" fill="none" stroke="#DCE8FF" strokeOpacity=".18" /><circle cx="400" cy="20" r="9" fill="#5271FF" /></g>
          </svg>
          <div className={styles.heroText}>
            <p className={styles.mono + " " + styles.tag} data-hero-in>{"// CÔNG NGHỆ HÀNG KHÔNG VŨ TRỤ · TRANG MINH HOẠ"}</p>
            <h1 className={styles.h1} data-hero-in>Nhìn xuống từ <span>quỹ đạo</span>, hành động trên mặt đất.</h1>
            <p className={styles.lead} data-hero-in>Dữ liệu quan sát Trái Đất cho nông nghiệp, cảnh báo thiên tai và hạ tầng, đưa về bảng điều khiển mỗi ngày.</p>
            <div className={styles.cta} data-hero-in>
              <a className={styles.btn} href="#dai-quan-sat">Vào đài quan sát</a>
              <a className={styles.btnGhost} href="#yeu-cau">Yêu cầu nhiệm vụ</a>
            </div>
          </div>
          <dl className={styles.hud} data-hero-in aria-label="Bảng thông số minh hoạ">
            <div><dt>Vệ tinh hoạt động (ví dụ)</dt><dd>04</dd></div>
            <div><dt>Vị trí VT-01</dt><dd><LiveCoords className={styles.mono} /></dd></div>
            <div><dt>Liên lạc</dt><dd className={styles.live}>● Ổn định</dd></div>
          </dl>
        </section>

        <Orbital />

        <section className={styles.missions} id="nhiem-vu" aria-labelledby="nv">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Nhiệm vụ</p>
            <h2 id="nv" className={styles.h2}>Ba loại bài toán chúng tôi nhận</h2>
          </div>
          <ul className={styles.mGrid}>
            {MISSIONS.map(([t, d, k], i) => (
              <li key={t} data-rv className={styles.mCard}>
                <span className={styles.mono}>M-0{i + 1}</span>
                <Mini k={k} />
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.pipe} id="quy-trinh" aria-labelledby="qt">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Quy trình dữ liệu</p>
            <h2 id="qt" className={styles.h2}>Từ quỹ đạo đến bảng điều khiển</h2>
          </div>
          <div className={styles.pipeWrap}>
            <i className={styles.pipeLine} aria-hidden="true"><b data-pipe /></i>
            <ol>
              {PIPE.map(([n, t, d]) => (<li key={n} data-rv><span className={styles.mono}>{n}</span><h3>{t}</h3><p>{d}</p></li>))}
            </ol>
          </div>
        </section>

        <section className={styles.stats} aria-label="Số liệu minh hoạ">
          <dl>
            <div><dt>ảnh xử lý mỗi ngày (ví dụ)</dt><dd><span data-count="18400">18.400</span></dd></div>
            <div><dt>km² quan sát (ví dụ)</dt><dd><span data-count="250000">250.000</span></dd></div>
            <div><dt>phút từ chụp đến giao (ví dụ)</dt><dd><span data-count="45">45</span></dd></div>
            <div><dt>trạm mặt đất trong kịch bản</dt><dd><span data-count="3">3</span></dd></div>
          </dl>
          <p className={styles.fnote}>Toàn bộ con số là minh hoạ bố cục, không phải năng lực thật.</p>
        </section>

        <section className={styles.faq} aria-labelledby="hd">
          <h2 id="hd" className={styles.h2} data-rv>Hỏi đáp</h2>
          <div>{FAQ.map(([q, a]) => (<details key={q} data-rv><summary>{q}</summary><p>{a}</p></details>))}</div>
        </section>

        <section className={styles.contact} id="yeu-cau" aria-labelledby="yc">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Yêu cầu</p>
            <h2 id="yc" className={styles.h2}>Gửi yêu cầu nhiệm vụ</h2>
          </div>
          <div data-rv><Request /></div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footBig}>VŨ TRẠM</p>
        <p>Trang minh hoạ thương hiệu hư cấu. Không có vệ tinh, dữ liệu hay dịch vụ thật.</p>
        <p><a href="/demos">Quay lại danh sách demo</a></p>
      </footer>
      <Motion />
    </div>
  );
}
