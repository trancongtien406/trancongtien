import styles from "./brand.module.css";
import { Calculator } from "./components/Calculator";
import { Contact } from "./components/Contact";
import { EnergyFlow } from "./components/EnergyFlow";
import { Motion } from "./components/Motion";

const SERVICES = [
  ["01", "Điện mặt trời mái xưởng", "Khảo sát mái, thiết kế hệ hoà lưới và lắp đặt trọn gói cho xưởng, kho lạnh, nhà máy nhỏ."],
  ["02", "Pin lưu trữ & điều phối", "Dồn điện dư của buổi trưa sang ca tối, cắt đỉnh tải để giảm áp lực giờ cao điểm."],
  ["03", "Giám sát & vận hành", "Bảng theo dõi sản lượng theo giờ, cảnh báo bất thường, bảo trì định kỳ có lịch rõ ràng."],
] as const;

const STEPS = [
  ["Khảo sát", "Đo mái, đọc hoá đơn 12 tháng, xem sơ đồ điện hiện có."],
  ["Thiết kế", "Mô phỏng sản lượng theo mùa, chốt cấu hình và dự toán."],
  ["Lắp đặt", "Thi công theo ca, hạn chế dừng sản xuất, nghiệm thu từng hạng mục."],
  ["Vận hành", "Theo dõi từ xa, báo cáo tháng, bảo trì định kỳ."],
] as const;

const FAQ = [
  ["Cần diện tích mái bao nhiêu?", "Khoảng 5 đến 6 m² cho mỗi kWp trong ví dụ minh hoạ. Số thật phụ thuộc loại tấm và hướng mái."],
  ["Mất điện lưới thì hệ thống có chạy không?", "Hệ hoà lưới thông thường sẽ ngắt vì an toàn. Cấu hình có pin và bộ chuyển đổi phù hợp mới cấp điện dự phòng."],
  ["Bao lâu thì hoàn vốn?", "Con số trong bộ tính trên trang chỉ là công thức giả định. Dự toán thật cần khảo sát hiện trường."],
  ["Có cần xin phép không?", "Tuỳ quy mô và quy định hiện hành. Đơn vị tư vấn thật sẽ hướng dẫn hồ sơ; trang này chỉ minh hoạ."],
] as const;

export default function Page() {
  return (
    <div className={styles.brand} data-mx-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Mạch Xanh, về đầu trang">
          <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path d="M4 22 C 10 22, 10 10, 16 10 S 22 22, 28 22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><circle cx="16" cy="10" r="3" fill="var(--mx-lime)" /></svg>
          Mạch Xanh
        </a>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#dong-nang-luong">Dòng năng lượng</a>
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#tinh-toan">Ước tính</a>
          <a href="#hoi-dap">Hỏi đáp</a>
        </nav>
        <a className={styles.btnSm} href="#dat-lich">Đặt lịch</a>
      </header>
      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroText}>
            <p className={styles.tag} data-hero-in>Năng lượng tái tạo cho SME · trang minh hoạ</p>
            <h1 className={styles.h1} data-hero-in>Điện sạch,<br /><span className={styles.lime}>chạy thẳng</span><br />vào xưởng.</h1>
            <p className={styles.lead} data-hero-in>Mặt trời, gió và pin lưu trữ được nối thành một mạch: sản xuất ở đâu, dùng ở đó, dư thì chia cho lưới.</p>
            <div className={styles.cta} data-hero-in>
              <a className={styles.btn} href="#dong-nang-luong">Xem dòng điện chạy</a>
              <a className={styles.btnGhost} href="#tinh-toan">Ước tính tiết kiệm</a>
            </div>
          </div>
          <aside className={styles.heroCard} aria-label="Bảng số liệu minh hoạ" data-hero-in>
            <p className={styles.cardTitle}>Sản lượng hôm nay <span>minh hoạ</span></p>
            <p className={styles.big}><span data-count="1248">1.248</span><small> kWh</small></p>
            <svg viewBox="0 0 300 90" className={styles.spark} aria-hidden="true"><path d="M0 80 C 40 80, 50 70, 80 52 S 130 6, 160 8 S 230 40, 260 66 S 290 80, 300 80" fill="none" stroke="var(--mx-lime)" strokeWidth="2.5" /><path d="M0 80 C 40 80, 50 70, 80 52 S 130 6, 160 8 S 230 40, 260 66 S 290 80, 300 80 V90 H0Z" fill="var(--mx-lime)" opacity=".12" /></svg>
            <ul className={styles.cardList}><li><span>Tự dùng</span><b>71%</b></li><li><span>Nạp pin</span><b>19%</b></li><li><span>Lên lưới</span><b>10%</b></li></ul>
          </aside>
        </section>

        <div className={styles.ticker} aria-hidden="true"><div><span>Điện mặt trời</span><span>Điện gió</span><span>Pin lưu trữ</span><span>Giám sát từ xa</span><span>Cắt đỉnh tải</span><span>Điện mặt trời</span><span>Điện gió</span><span>Pin lưu trữ</span><span>Giám sát từ xa</span><span>Cắt đỉnh tải</span></div></div>

        <section className={styles.flowSec} id="dong-nang-luong" aria-labelledby="dnl">
          <div className={styles.secHead} data-rv>
            <p className={styles.tag}>Dòng năng lượng</p>
            <h2 id="dnl" className={styles.h2}>Một mạch liền, chạy theo nhịp cuộn của bạn</h2>
            <p className={styles.sub}>Hạt điện chạy dọc đường dẫn và nhanh lên khi bạn cuộn trang. Đổi tình huống để xem hướng dòng đổi theo.</p>
          </div>
          <EnergyFlow />
        </section>

        <section className={styles.services} id="dich-vu" aria-labelledby="dv">
          <div className={styles.secHead} data-rv>
            <p className={styles.tag}>Dịch vụ</p>
            <h2 id="dv" className={styles.h2}>Ba lớp công việc, một đầu mối</h2>
          </div>
          <ul className={styles.svcList}>
            {SERVICES.map(([n, t, d]) => (
              <li key={n} data-rv><span className={styles.svcNo}>{n}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ul>
        </section>

        <section className={styles.calcSec} id="tinh-toan" aria-labelledby="tt">
          <div className={styles.secHead} data-rv>
            <p className={styles.tag}>Ước tính nhanh</p>
            <h2 id="tt" className={styles.h2}>Kéo thanh trượt, xem con số đổi</h2>
          </div>
          <div data-rv><Calculator /></div>
        </section>

        <section className={styles.process} aria-labelledby="qt" data-draw-scope>
          <div className={styles.secHead} data-rv>
            <p className={styles.tag}>Quy trình</p>
            <h2 id="qt" className={styles.h2}>Từ khảo sát đến vận hành</h2>
          </div>
          <div className={styles.timeline}>
            <svg className={styles.tlLine} viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden="true"><path data-draw d="M2 0 V100" fill="none" stroke="var(--mx-lime)" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg>
            <ol>
              {STEPS.map(([t, d], i) => (
                <li key={t} data-rv><span className={styles.tlDot}>{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.stats} aria-label="Số liệu minh hoạ">
          <dl>
            <div><dt>kWp lắp thử nghiệm (ví dụ)</dt><dd><span data-count="320">320</span>+</dd></div>
            <div><dt>điện tự cấp (ví dụ)</dt><dd><span data-count="38">38</span>%</dd></div>
            <div><dt>cơ sở trong kịch bản mẫu</dt><dd><span data-count="12">12</span></dd></div>
            <div><dt>giám sát từ xa</dt><dd><span data-count="24">24</span>/7</dd></div>
          </dl>
          <p className={styles.fnote}>Toàn bộ số liệu trong khối này là minh hoạ bố cục.</p>
        </section>

        <section className={styles.faq} id="hoi-dap" aria-labelledby="hd">
          <h2 id="hd" className={styles.h2} data-rv>Hỏi đáp</h2>
          <div>
            {FAQ.map(([q, a]) => (<details key={q} data-rv><summary>{q}</summary><p>{a}</p></details>))}
          </div>
        </section>

        <section className={styles.contact} id="dat-lich" aria-labelledby="dl">
          <div className={styles.secHead} data-rv>
            <p className={styles.tag}>Khảo sát</p>
            <h2 id="dl" className={styles.h2}>Đặt lịch khảo sát mái</h2>
          </div>
          <div data-rv><Contact /></div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footBig}>Mạch Xanh</p>
        <p>Trang minh hoạ thương hiệu hư cấu, không cung cấp dịch vụ thật.</p>
        <p><a href="/demos">Quay lại danh sách demo</a></p>
      </footer>
      <Motion />
    </div>
  );
}
