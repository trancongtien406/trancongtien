import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { ContactForm } from "./components/Contact";
import { DotField } from "./components/DotField";
import { Fx } from "./components/Fx";

const Letters = ({ text }: { text: string }) => (
  <span className={styles.hrow} aria-hidden="true">
    {[...text].map((c, i) => (<span key={i} className={styles.ltr} data-l>{c}</span>))}
  </span>
);

const Mag = ({ children }: { children: React.ReactNode }) => (
  <span className={styles.magnet} data-magnet><span className={styles.magInner}>{children}</span></span>
);

const SERVICES = [
  ["01", "Chiến lược", "Định vị, tông giọng và câu chuyện thương hiệu viết ra giấy trước khi vẽ bất cứ thứ gì."],
  ["02", "Nhận diện", "Logo, hệ chữ, màu, chuyển động: một bộ ngôn ngữ nhìn là nhận ra, dùng được từ biển hiệu đến màn hình."],
  ["03", "Website", "Landing và site thương hiệu có chuyển động có chủ đích, nhẹ, truy cập được, đo được."],
  ["04", "Nội dung", "Series ảnh, video ngắn, motion; kịch bản và lịch đăng gói gọn theo từng quý."],
];
const WORK = [
  ["Cà phê Muối Biển", "Nhận diện · 2025"], ["Phòng tập Cực Hạn", "Website · 2025"], ["Nhạc hội Sóng Đêm", "Chiến dịch · 2026"], ["Gốm Lửa Xưa", "Bao bì · 2026"],
];
const STEPS = [
  ["01", "Lắng nghe", "Một buổi workshop 3 giờ để lôi ra điều thương hiệu thật sự muốn nói."],
  ["02", "Phá khung", "Ba hướng ý tưởng gai góc, bạn chọn một và chúng tôi đẩy nó đi xa."],
  ["03", "Dựng", "Thiết kế và code song song để chuyển động không bị cắt xén ở khâu bàn giao."],
  ["04", "Ra mắt", "Kiểm thử, bàn giao tài liệu và theo dõi hai tuần đầu sau khi chạy thật."],
];
const FAQ = [
  ["Dự án thường kéo dài bao lâu?", "Với số liệu minh hoạ của trang demo này: nhận diện khoảng 6 đến 8 tuần, website khoảng 8 đến 12 tuần tuỳ độ phức tạp."],
  ["Điểm Phá có làm trọn gói không?", "Có. Từ chiến lược đến nhận diện, website và nội dung, hoặc chỉ một hạng mục riêng nếu bạn đã có sẵn phần còn lại."],
  ["Hiệu ứng nhiều có làm trang chậm không?", "Chúng tôi chỉ chuyển động transform và opacity, tắt hết khi người dùng chọn giảm chuyển động, và đo tốc độ trước khi bàn giao."],
  ["Đây có phải agency thật không?", "Không. Điểm Phá là thương hiệu minh hoạ cho trang trình diễn; mọi tên dự án, số liệu và lời nhận xét ở đây đều là mẫu."],
];

export default function Page() {
  const consult = buildConsultHref("diem-pha");
  return (
    <div className={styles.brand} data-dp-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Điểm Phá, về đầu trang">Điểm Phá®</a>
        <nav className={styles.nav} aria-label="Chính">
          <a href="#hieu-ung">Từ tính</a><a href="#dich-vu">Dịch vụ</a><a href="#du-an">Dự án</a><a href="#lien-he">Liên hệ</a>
        </nav>
      </header>
      <main id="main">
        <section className={`${styles.hero}`} id="top">
          <div className={styles.wrap}>
            <h1 className={styles.heroTitle} aria-label="Điểm Phá"><Letters text="ĐIỂM" /><Letters text="PHÁ" /></h1>
            <div className={styles.heroMeta}>
              <p>Creative agency (minh hoạ) cho những thương hiệu <span className={styles.limeText}>không muốn nằm yên</span> trong khung. Di chuột quanh trang: mọi thứ đều phản ứng lại bạn.</p>
              <Mag><a className={styles.btn} href="#lien-he" data-cursor="Đi">Kể ý tưởng của bạn</a></Mag>
            </div>
          </div>
        </section>

        <div className={styles.marq} aria-hidden="true">
          <div className={styles.marqTrack}>
            {[0, 1].map((k) => (<span key={k} style={{ display: "inline-flex", gap: 48 }}>{["Chiến lược", "Nhận diện", "Website", "Chuyển động", "Nội dung"].map((t) => (<span key={t}>{t} <i>✦</i></span>))}</span>))}
          </div>
        </div>

        <section className={`${styles.sec} ${styles.invert}`} aria-labelledby="gt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Giới thiệu</p>
            <h2 id="gt" className={styles.h2} data-rv>Chúng tôi ghét sự an toàn nhàm chán</h2>
            <p className={styles.manifesto} data-rv>Thương hiệu tốt không xin được chú ý. Nó <em>kéo</em> ánh nhìn về phía mình.</p>
            <div className={styles.two} data-rv>
              <p>Điểm Phá là studio nhỏ gồm nhà chiến lược, designer và developer ngồi chung một bàn. Ý tưởng không bị thất lạc giữa các phòng ban, nên thứ bạn duyệt trên giấy chính là thứ chạy trên màn hình.</p>
              <p>Mỗi dự án bắt đầu bằng một câu hỏi khó chịu: nếu bỏ logo đi, khách còn nhận ra bạn không? Chúng tôi làm việc cho tới khi câu trả lời là có.</p>
            </div>
          </div>
        </section>

        <section className={styles.sec} id="hieu-ung" aria-labelledby="ht">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Trải nghiệm từ tính</p>
            <h2 id="ht" className={styles.h2} data-rv>Chạm vào, nó chạm lại</h2>
            <div className={styles.play} data-rv>
              <DotField />
              <div className={styles.playTitle} aria-hidden="true">Kéo · Đẩy · Hút</div>
              <p className={styles.playHint}>Trường chấm canvas phản ứng theo vận tốc con trỏ. Trên màn hình cảm ứng, chấm đứng yên.</p>
            </div>
            <div className={styles.magRow}>
              <Mag><a className={`${styles.magBadge} ${styles.l}`} href="#dich-vu" data-cursor="Xem">Dịch vụ</a></Mag>
              <Mag><a className={styles.magBadge} href="#du-an" data-cursor="Xem">Dự án</a></Mag>
              <Mag><a className={`${styles.magBadge} ${styles.o}`} href="#lien-he" data-cursor="Nói">Liên hệ</a></Mag>
            </div>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.invert}`} id="dich-vu" aria-labelledby="dt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Dịch vụ</p>
            <h2 id="dt" className={styles.h2} data-rv>Bốn việc, làm tới nơi</h2>
            <ul className={styles.list} data-rv>
              {SERVICES.map(([n, t, d]) => (
                <li key={n} className={styles.row} data-cursor="">
                  <span className={styles.rowN}>{n}</span><h3 className={styles.rowT}>{t}</h3><p className={styles.rowD}>{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.sec} id="du-an" aria-labelledby="dat">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Dự án mẫu</p>
            <h2 id="dat" className={styles.h2} data-rv>Rê chuột để xem</h2>
            <ul className={styles.work} data-rv>
              {WORK.map(([t, m], i) => (
                <li key={t}><a href="#lien-he" data-pv={i} data-cursor="Xem"><span className={styles.wm} style={{ textAlign: "left" }}>0{i + 1}</span><span className={styles.wt}>{t}</span><span className={styles.wm}>{m}</span></a></li>
              ))}
            </ul>
            <p style={{ marginTop: 20, color: "#a9a9a3", fontSize: 14 }}>Tên dự án và khách hàng là hư cấu, chỉ dùng để minh hoạ.</p>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.invert}`} aria-labelledby="st">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Số liệu minh hoạ</p>
            <h2 id="st" className={styles.h2} data-rv>Con số mẫu</h2>
            <dl className={styles.nums} data-rv>
              {[["48", "dự án mẫu trong portfolio giả lập"], ["7", "năm hoạt động (hư cấu)"], ["12", "thành viên trong studio mẫu"], ["96%", "khách quay lại, số minh hoạ"]].map(([v, l]) => (
                <div key={l} className={styles.num}><dt className={styles.numV}>{v}</dt><dd className={styles.numL}>{l}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="qt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Quy trình</p>
            <h2 id="qt" className={styles.h2} data-rv>Bốn nhịp</h2>
            <ol className={styles.steps}>
              {STEPS.map(([n, t, d]) => (<li key={n} className={styles.step} data-rv><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div></li>))}
            </ol>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.invert}`} aria-labelledby="nt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Nhận xét mẫu</p>
            <h2 id="nt" className={styles.h2} data-rv>Lời khách (giả định)</h2>
            <div className={styles.quotes}>
              {[["“Họ làm chúng tôi bớt sợ những ý tưởng lạ.”", "Khách hàng A, ngành F&B (hư cấu)"], ["“Bàn giao xong site vẫn mượt như bản duyệt.”", "Khách hàng B, ngành thể thao (hư cấu)"], ["“Một buổi workshop đáng giá hơn ba cuộc họp.”", "Khách hàng C, ngành sự kiện (hư cấu)"]].map(([q, a]) => (
                <figure key={a} className={styles.quote} data-rv><blockquote style={{ margin: 0 }}><p>{q}</p></blockquote><figcaption><cite>{a}</cite></figcaption></figure>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="ft">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Hỏi nhanh</p>
            <h2 id="ft" className={styles.h2} data-rv>Câu hỏi thường gặp</h2>
            <div className={styles.faq} data-rv>
              {FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
            </div>
          </div>
        </section>

        <section className={`${styles.sec} ${styles.invert}`} id="lien-he" aria-labelledby="lt">
          <div className={`${styles.wrap} ${styles.contact}`}>
            <div>
              <p className={styles.eyebrow} data-rv>Liên hệ</p>
              <h2 id="lt" className={styles.h2} data-rv>Phá khung cùng nhau?</h2>
              <p style={{ marginTop: 28, maxWidth: "40ch" }} data-rv>Điền vài dòng, studio mẫu sẽ hồi âm trong một ngày làm việc. Biểu mẫu này chỉ mô phỏng trên trình duyệt.</p>
              <p style={{ marginTop: 20 }} data-rv><a href={consult} style={{ fontWeight: 700 }}>Muốn làm website kiểu này? Nhận tư vấn thật</a></p>
            </div>
            <div data-rv><ContactForm /></div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <p className={styles.bigWord} aria-hidden="true">Điểm Phá</p>
          <div className={styles.fgrid}>
            <span>© 2026 Điểm Phá · Thương hiệu minh hoạ, không phải doanh nghiệp thật.</span>
            <a href="#top">Lên đầu trang ↑</a>
          </div>
        </div>
      </footer>
      <Fx />
    </div>
  );
}
