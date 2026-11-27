import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Exploded } from "./components/Exploded";
import { Fx } from "./components/Fx";
import { Shop } from "./components/Shop";
import { Watch } from "./components/Watch";

const STEPS = [
  ["I", "Phác thảo", "Mỗi mẫu bắt đầu bằng bản vẽ tay tỷ lệ 1:1 trước khi lên máy tính."],
  ["II", "Gia công", "Cầu máy, bánh răng được tiện và hoàn thiện perlage bằng tay."],
  ["III", "Lắp máy", "Thợ chế tác lắp hơn hai trăm chi tiết dưới kính lúp trong phòng sạch."],
  ["IV", "Thử nhịp", "Đồng hồ chạy thử nhiều tư thế trong nhiều ngày để hiệu chỉnh sai số."],
  ["V", "Bàn giao", "Đóng hộp, ghi số sê-ri và hướng dẫn cách lên cót, bảo quản."],
];
const FAQ = [
  ["Đồng hồ cơ cần lên cót như thế nào?", "Nếu đeo hằng ngày, chuyển động tay sẽ tự lên cót. Nếu để yên, vặn núm khoảng 30 vòng để đồng hồ chạy lại (thông tin minh hoạ)."],
  ["Bảo hành bao lâu?", "Theo chính sách mẫu của trang demo: 5 năm cho bộ máy, kèm bảo dưỡng định kỳ ba năm một lần."],
  ["Có thể xem trực tiếp trước khi mua không?", "Có. Phần thanh toán bên trên chỉ mô phỏng; trong thực tế bạn sẽ hẹn xem mẫu tại showroom."],
  ["Luân Quang có phải hãng đồng hồ thật?", "Không. Đây là thương hiệu minh hoạ; mọi giá, thông số, số liệu và đánh giá đều là mẫu."],
];

export default function Page() {
  const consult = buildConsultHref("luan-quang");
  return (
    <div className={styles.brand} data-lq-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Luân Quang, về đầu trang">LUÂN QUANG</a>
        <nav className={styles.nav} aria-label="Chính"><a href="#tach-lop">Cấu tạo</a><a href="#bo-suu-tap">Bộ sưu tập</a><a href="#thong-so">Thông số</a></nav>
      </header>
      <main id="main">
        <section className={styles.hero} id="top">
          <div>
            <p className={styles.eyebrow}>Đồng hồ cơ khí · bản minh hoạ</p>
            <h1 className={styles.heroT}>Mỗi nhịp,<span>một lời hẹn.</span></h1>
            <p className={styles.heroP}>Hơn hai trăm chi tiết nhỏ cùng chuyển động trong một chiếc vỏ tròn. Không pin, không màn hình: chỉ lò xo, bánh răng và thời gian.</p>
            <div className={styles.heroBtns}><a className={styles.btn} href="#tach-lop">Xem bên trong</a><a className={`${styles.btn} ${styles.btnGhost}`} href="#bo-suu-tap">Bộ sưu tập</a></div>
          </div>
          <div className={styles.heroW} data-tilt><Watch label="Đồng hồ Luân Quang Nguyên, mặt ngà, vỏ vàng đồng" /></div>
        </section>

        <section className={`${styles.sec} ${styles.paper}`} aria-labelledby="mt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Triết lý</p>
            <h2 id="mt" className={styles.h2} data-rv>Thời gian <em>có hình dáng</em></h2>
            <div className={styles.orn} aria-hidden="true">✦</div>
            <div className={styles.manif}>
              <p className={styles.big} data-rv>“Một chiếc đồng hồ tốt không đếm giờ. Nó cho bạn thấy giờ đang trôi.”</p>
              <div data-rv>
                <p>Luân Quang (thương hiệu minh hoạ) chọn con đường chậm: bộ máy cơ tự lên cót, mặt số tối giản và vỏ đánh bóng thủ công. Chúng tôi tin rằng thứ bạn đeo hằng ngày nên đẹp cả khi nhìn từ bên trong.</p>
                <p>Vì vậy phần tiếp theo của trang này sẽ tháo chiếc đồng hồ ra, từng lớp một.</p>
              </div>
            </div>
          </div>
        </section>

        <Exploded />

        <section className={`${styles.sec} ${styles.paper}`} id="bo-suu-tap" aria-labelledby="bt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Bộ sưu tập</p>
            <h2 id="bt" className={styles.h2} data-rv>Ba mặt số, <em>một bộ máy</em></h2>
            <Shop />
            <p className={styles.mute} style={{ marginTop: 18, fontSize: 14 }}>Giá và giỏ hàng chỉ để minh hoạ; trang này không bán sản phẩm thật.</p>
          </div>
        </section>

        <section className={styles.sec} id="thong-so" aria-labelledby="st">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Thông số minh hoạ</p>
            <h2 id="st" className={styles.h2} data-rv>Chính xác <em>đến từng nhịp</em></h2>
            <div className={styles.specGrid}>
              <dl className={styles.spec} data-rv>
                {[["Bộ máy", "Cơ tự lên cót"], ["Tần số", "28.800 dao động/giờ"], ["Trữ cót", "Khoảng 42 giờ"], ["Đường kính vỏ", "40 mm"], ["Độ dày", "10,8 mm"], ["Chống nước", "50 m"]].map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
              </dl>
              <dl className={styles.stats} data-rv>
                {[["232", "chi tiết trong bộ máy mẫu"], ["28", "viên ruby định vị"], ["42", "giờ trữ cót"], ["5", "năm bảo hành mẫu"]].map(([v, l]) => (<div key={l}><dt data-count={v}>{v}</dt><dd>{l}</dd></div>))}
              </dl>
            </div>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.paper}`} aria-labelledby="qt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Chế tác</p>
            <h2 id="qt" className={styles.h2} data-rv>Năm bước, <em>không đường tắt</em></h2>
            <ol className={styles.steps}>{STEPS.map(([n, t, d]) => (<li key={n} data-rv><b>{n}</b><h3>{t}</h3><p>{d}</p></li>))}</ol>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="ft">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Lời khách &amp; giải đáp</p>
            <h2 id="ft" className={styles.h2} data-rv>Trước khi <em>bạn đeo</em></h2>
            <div className={styles.qa}>
              <div>
                {[["“Tôi mở nắp lưng chỉ để nhìn bánh cân bằng chạy.”", "Khách hàng A (hư cấu)"], ["“Chiếc đồng hồ đầu tiên khiến tôi muốn đeo mỗi ngày.”", "Khách hàng B (hư cấu)"]].map(([q, a]) => (<figure key={a} className={styles.q} data-rv><blockquote><p>{q}</p></blockquote><figcaption><cite>{a}</cite></figcaption></figure>))}
              </div>
              <div className={styles.faq} data-rv>{FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}</div>
            </div>
            <a className={styles.consult} href={consult}>Muốn website bán hàng như thế này? Nhận tư vấn →</a>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <p className={styles.big} aria-hidden="true">LUÂN QUANG</p>
          <div className={styles.fr}><span>© 2026 Luân Quang · Thương hiệu minh hoạ, đồng hồ vẽ bằng SVG.</span><a href="#top">Lên đầu trang ↑</a></div>
        </div>
      </footer>
      <Fx />
    </div>
  );
}
