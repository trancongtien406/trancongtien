import styles from "./brand.module.css";
import { Motion } from "./components/Motion";
import { Shop } from "./components/Shop";
import { Showcase } from "./components/Showcase";

const STORY = [
  ["Nhào đất", "Đất được ủ, đạp, nhào đến khi không còn bọt khí. Bước này quyết định món gốm có nứt hay không."],
  ["Vuốt trên bàn xoay", "Hai bàn tay kéo thành bình, thành bát. Không hai món nào cùng một đường cong."],
  ["Nung củi", "Lò nung qua một đêm, nhiệt lên khoảng 1.200 độ (ví dụ minh hoạ). Lửa để lại vệt riêng trên men."],
] as const;

const REVIEWS = [
  ["Chén cầm rất vừa tay, men có vệt lửa nên mỗi cái một vẻ.", "Ví dụ khách A · Huế"],
  ["Hơi lâu vì chờ mẻ nung, nhưng nhận hàng thấy đáng chờ.", "Ví dụ khách B · Đà Nẵng"],
  ["Mua bộ bát về tặng, người nhận thích vì có dấu ký của thợ ở đáy.", "Ví dụ khách C · Hà Nội"],
] as const;

const FAQ = [
  ["Gốm có dùng được trong lò vi sóng, máy rửa bát không?", "Trong mô hình minh hoạ: dùng được lò vi sóng với món men trơn, nên rửa tay để men bền màu."],
  ["Vì sao phải đặt theo mẻ nung?", "Lò củi chỉ nung khi đủ đồ. Bạn đặt trước thì được xếp chỗ trong mẻ gần nhất."],
  ["Màu thật có giống ảnh không?", "Mỗi mẻ có thể lệch tông nhẹ do lửa và tro. Đó là nét riêng của gốm nung củi."],
  ["Có nhận khắc chữ ở đáy không?", "Có, tối đa 12 ký tự cho mỗi món (tính năng minh hoạ)."],
] as const;

export default function Page() {
  return (
    <div className={styles.brand} data-lt-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Lửa Thổ, về đầu trang">Lửa Thổ</a>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#cau-chuyen">Câu chuyện</a>
          <a href="#trung-bay">Trưng bày</a>
          <a href="#cua-hang">Cửa hàng</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
      </header>
      <main id="main">
        <section className={styles.hero} id="top">
          <svg className={styles.wheel} viewBox="0 0 600 600" aria-hidden="true">
            <g data-wheel><circle cx="300" cy="300" r="290" fill="#A64B32" /><circle cx="300" cy="300" r="240" fill="none" stroke="#E9D5B9" strokeOpacity=".35" strokeWidth="2" strokeDasharray="2 14" strokeLinecap="round" /></g>
            <g data-wheel-r><circle cx="300" cy="300" r="180" fill="none" stroke="#E9D5B9" strokeOpacity=".5" strokeWidth="2" strokeDasharray="40 18" /><circle cx="300" cy="300" r="120" fill="none" stroke="#41352E" strokeOpacity=".35" strokeWidth="2" strokeDasharray="6 10" /></g>
            <path d="M240 150h120c0 44-12 64-28 82 60 36 96 90 96 150 0 74-56 112-128 112s-128-38-128-112c0-60 36-114 96-150-16-18-28-38-28-82z" fill="#E9D5B9" transform="translate(0 -20) scale(1 1)" opacity=".92" />
          </svg>
          <div className={styles.heroText}>
            <p className={styles.kicker} data-hero-in>Gốm thủ công nung củi · bản minh hoạ</p>
            <h1 className={styles.h1} data-hero-in>Đất, nước,<br /><em>lửa</em> và<br />hai bàn tay.</h1>
            <p className={styles.lead} data-hero-in>Mỗi món gốm ở Lửa Thổ đi qua một đêm lửa. Vết men chảy, màu khói và dấu ngón tay là thứ không máy nào lặp lại được.</p>
            <div className={styles.cta} data-hero-in>
              <a className={styles.btn} href="#trung-bay">Xoay xem bộ sưu tập</a>
              <a className={styles.btnLine} href="#cua-hang">Đặt theo mẻ nung</a>
            </div>
          </div>
        </section>

        <section className={styles.story} id="cau-chuyen" aria-labelledby="cc">
          <div className={styles.storyHead} data-rv>
            <p className={styles.eyebrow}>Câu chuyện</p>
            <h2 id="cc" className={styles.h2}>Chậm một chút để món đồ ở lại lâu hơn.</h2>
          </div>
          <ol className={styles.storySteps}>
            {STORY.map(([t, d], i) => (
              <li key={t} data-rv><span className={styles.sNo}>{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </section>

        <Showcase />

        <section className={styles.shop} id="cua-hang" aria-labelledby="ch">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Cửa hàng</p>
            <h2 id="ch" className={styles.h2}>Chọn món cho mẻ nung kế tiếp</h2>
          </div>
          <Shop />
        </section>

        <section className={styles.kiln} aria-labelledby="lo">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Một đêm trong lò</p>
            <h2 id="lo" className={styles.h2}>Đường nhiệt của một mẻ nung (ví dụ)</h2>
          </div>
          <svg viewBox="0 0 1000 340" className={styles.curve} role="img" aria-label="Đồ thị minh hoạ nhiệt độ tăng dần theo giờ, đạt đỉnh khoảng 1.200 độ rồi hạ">
            <g stroke="#E9D5B9" strokeOpacity=".2"><path d="M60 40H980M60 130H980M60 220H980M60 300H980" /></g>
            <path data-draw d="M60 300 C 200 290, 260 250, 380 190 S 560 60, 660 50 S 760 110, 800 170 S 900 270, 980 290" fill="none" stroke="#E9D5B9" strokeWidth="5" strokeLinecap="round" />
            <g fill="#E9D5B9" fontSize="15" fontFamily="var(--lt-nunito), sans-serif"><text x="60" y="328">18:00 nhóm lửa</text><text x="380" y="168">00:00 khoảng 700°</text><text x="610" y="34">04:00 đỉnh ~1.200°</text><text x="820" y="208">tắt lửa, để nguội</text></g>
          </svg>
          <p className={styles.fnote}>Biểu đồ chỉ minh hoạ hình dạng đường nhiệt, không phải thông số kỹ thuật.</p>
        </section>

        <section className={styles.reviews} aria-labelledby="dg">
          <div className={styles.head} data-rv>
            <p className={styles.eyebrow}>Lời nhắn mẫu</p>
            <h2 id="dg" className={styles.h2}>Khách ví dụ nói gì</h2>
          </div>
          <div className={styles.quotes}>
            {REVIEWS.map(([q, a]) => (<figure key={a} data-rv><blockquote>“{q}”</blockquote><figcaption>{a}</figcaption></figure>))}
          </div>
        </section>

        <section className={styles.faq} id="hoi-dap" aria-labelledby="hd">
          <h2 id="hd" className={styles.h2} data-rv>Hỏi đáp</h2>
          <div>{FAQ.map(([q, a]) => (<details key={q} data-rv><summary>{q}</summary><p>{a}</p></details>))}</div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footBig}>Lửa Thổ</p>
        <p>Trang minh hoạ xưởng gốm hư cấu, không bán hàng thật.</p>
        <p><a href="/demos">Quay lại danh sách demo</a></p>
      </footer>
      <Motion />
    </div>
  );
}
