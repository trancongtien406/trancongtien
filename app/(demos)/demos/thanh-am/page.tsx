import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Fx } from "./components/Fx";
import { Lab } from "./components/Lab";
import { Products } from "./components/Products";
import { Wave } from "./components/Wave";

const L = ({ t }: { t: string }) => (<>{[...t].map((c, i) => (<span key={i} className={styles.hl} data-hero-l aria-hidden="true">{c}</span>))}</>);

const TECH = [
  ["40", "mm driver", "Màng loa cân bằng giữa dải trầm và dải cao, tinh chỉnh cho nghe lâu không mệt tai."],
  ["35", "dB chống ồn", "Chống ồn chủ động hai micro mỗi bên tai, có chế độ xuyên âm khi cần nghe xung quanh (số liệu minh hoạ)."],
  ["40", "giờ pin", "Sạc nhanh 10 phút cho khoảng 5 giờ nghe (số liệu minh hoạ)."],
  ["2", "thiết bị cùng lúc", "Kết nối đa điểm, chuyển giữa điện thoại và máy tính không cần ghép lại."],
];
const STEPS = [
  ["Thu mẫu", "Kỹ sư ghi lại đáp tuyến của từng driver trong phòng cách âm."],
  ["Tinh chỉnh", "Cân bằng bằng tai nghe thử với nhóm người nghe đa dạng lứa tuổi."],
  ["Thử bền", "Gập mở hàng chục nghìn lần, thử mồ hôi và nhiệt độ khắc nghiệt."],
  ["Đóng gói", "Mỗi thiết bị được đo lại dạng sóng trước khi vào hộp."],
];
const FAQ = [
  ["Phòng nghe thử có phát âm thanh thật không?", "Có. Âm mẫu được tạo bằng Web Audio ngay trong trình duyệt, âm lượng thấp và chỉ phát khi bạn bấm nút."],
  ["Tai nghe dùng được với iPhone và Android không?", "Với thông tin mẫu: có, kết nối Bluetooth 5.3 và hỗ trợ các codec phổ biến."],
  ["Đổi trả trong bao lâu?", "Chính sách minh hoạ: đổi trả trong 30 ngày nếu còn nguyên hộp và phụ kiện."],
  ["Thanh Âm có phải hãng thật không?", "Không. Đây là thương hiệu minh hoạ cho trang trình diễn; sản phẩm, giá và đánh giá đều là mẫu."],
];

export default function Page() {
  const consult = buildConsultHref("thanh-am");
  return (
    <div className={styles.brand} data-ta-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Thanh Âm, về đầu trang"><i />Thanh Âm</a>
        <nav className={styles.nav} aria-label="Chính"><a href="#nghe-thu">Nghe thử</a><a href="#san-pham">Sản phẩm</a><a href="#so-sanh">So sánh</a></nav>
      </header>
      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.glowWrap} aria-hidden="true"><div className={styles.glow} data-glow /></div>
          <Wave height={420} layers={5} className={styles.heroWave} />
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Thiết bị âm thanh · bản minh hoạ</p>
            <h1 className={styles.heroT} aria-label="Thanh Âm"><span><L t="THANH" /></span><span className={styles.ln2}><L t="ÂM" /></span></h1>
            <div className={styles.heroRow}>
              <p className={styles.lead}>Di chuột qua những đường sóng: âm thanh ở đây không chỉ để nghe, mà còn để thấy và chạm vào.</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}><a className={styles.btn} href="#nghe-thu">Vào phòng nghe thử</a><a className={`${styles.btn} ${styles.btnGhost}`} href="#san-pham">Xem sản phẩm</a></div>
            </div>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="gt">
          <div className={styles.wrap}>
            <div className={styles.introTop}>
              <div><p className={styles.eyebrow} data-rv>Về Thanh Âm</p><h2 id="gt" className={styles.h2} data-rv>Nghe thấy <em>cả hơi thở</em></h2></div>
              <p className={styles.lead} data-rv>Chúng tôi (thương hiệu minh hoạ) làm thiết bị âm thanh cho người thích nghe kỹ: trung thực, cân bằng, và đẹp cả khi nằm trong hộp.</p>
            </div>
            <dl className={styles.stats} data-rv>
              {[["20", "Hz – 40.000 Hz đáp tuyến mẫu"], ["3", "dòng sản phẩm minh hoạ"], ["30", "ngày dùng thử đổi trả mẫu"]].map(([v, l]) => (<div key={l}><dt data-count={v}>{v}</dt><dd>{l}</dd></div>))}
            </dl>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.alt}`} id="nghe-thu" aria-labelledby="lt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Phòng nghe thử</p>
            <h2 id="lt" className={styles.h2} data-rv>Chỉnh sóng, <em>nghe thử</em></h2>
            <Lab />
          </div>
        </section>

        <section className={styles.sec} id="san-pham" aria-labelledby="pt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Sản phẩm</p>
            <h2 id="pt" className={styles.h2} data-rv>Ba cách <em>nghe</em></h2>
            <Products />
            <p className={styles.muteP} style={{ marginTop: 16 }}>Giá và giỏ hàng chỉ để minh hoạ; trang này không bán sản phẩm thật.</p>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.alt}`} aria-labelledby="tt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Công nghệ</p>
            <h2 id="tt" className={styles.h2} data-rv>Bên trong <em>thân máy</em></h2>
            <ul className={styles.tech}>{TECH.map(([n, u, d]) => (<li key={u} data-rv><b>{n}</b><h3>{u}</h3><p>{d}</p></li>))}</ul>
          </div>
        </section>

        <section className={styles.sec} id="so-sanh" aria-labelledby="st">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>So sánh</p>
            <h2 id="st" className={styles.h2} data-rv>Chọn <em>đúng tai</em></h2>
            <div className={styles.cmpWrap} data-rv role="region" aria-label="Bảng so sánh sản phẩm" tabIndex={0}>
              <table className={styles.cmp}>
                <thead><tr><th scope="col">Tiêu chí</th><th scope="col">Âm Dạ</th><th scope="col">Vi Âm</th><th scope="col">Cộng Hưởng</th></tr></thead>
                <tbody>
                  {[["Dạng", "Chụp tai", "Nhét tai", "Loa để bàn"], ["Chống ồn", "Chủ động 35 dB", "Chủ động nhẹ", "Không"], ["Pin", "~40 giờ", "8 + 24 giờ", "~18 giờ"], ["Trọng lượng", "265 g", "5 g mỗi bên", "1,1 kg"], ["Giá mẫu", "6.490.000 ₫", "3.290.000 ₫", "4.890.000 ₫"]].map(([k, a, b, c]) => (<tr key={k}><th scope="row">{k}</th><td>{a}</td><td>{b}</td><td>{c}</td></tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.alt}`} aria-labelledby="qt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Tinh chỉnh</p>
            <h2 id="qt" className={styles.h2} data-rv>Từ phòng thu <em>đến tai bạn</em></h2>
            <ol className={styles.steps}>{STEPS.map(([t, d]) => (<li key={t} data-rv><h3>{t}</h3><p>{d}</p></li>))}</ol>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="ft">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Lời khách &amp; giải đáp</p>
            <h2 id="ft" className={styles.h2} data-rv>Trước khi <em>nghe</em></h2>
            <div className={styles.qa}>
              <div>
                {[["“Tôi nghe lại album cũ và nghe ra những lớp âm chưa từng thấy.”", "Khách hàng A (hư cấu)"], ["“Chống ồn tốt đến mức tôi quên cả chuyến bay.”", "Khách hàng B (hư cấu)"]].map(([q, a]) => (<figure key={a} className={styles.q} data-rv><blockquote><p>{q}</p></blockquote><figcaption><cite>{a}</cite></figcaption></figure>))}
              </div>
              <div className={styles.faq} data-rv>{FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}</div>
            </div>
            <a className={styles.consult} href={consult}>Muốn website bán thiết bị như thế này? Nhận tư vấn →</a>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <Wave height={120} layers={3} className={styles.footWave} />
        <div className={styles.wrap}>
          <p className={styles.big} aria-hidden="true">Thanh Âm</p>
          <div className={styles.fr}><span>© 2026 Thanh Âm · Thương hiệu minh hoạ, không phải doanh nghiệp thật.</span><a href="#top">Lên đầu trang ↑</a></div>
        </div>
      </footer>
      <Fx />
    </div>
  );
}
