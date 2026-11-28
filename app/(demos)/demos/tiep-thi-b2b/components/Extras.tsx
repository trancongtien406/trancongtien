"use client";

import { useState, type FormEvent } from "react";
import styles from "../brand.module.css";

const INDUSTRIES = [
  { k: "SaaS", t: "Phần mềm doanh nghiệp (SaaS)", d: "Chu kỳ bán dài, nhiều người quyết định. Chúng tôi dựng nội dung theo từng vai trò trong hội đồng mua hàng và nuôi lead bằng chuỗi email, webinar và case study.", b: ["Chuỗi nuôi lead theo vai trò", "Trang đích theo từng ngành dọc", "Báo cáo CAC và payback theo kênh"], n: ["2,4x", "pipeline trong 2 quý"] },
  { k: "Fintech", t: "Tài chính và thanh toán", d: "Niềm tin là tất cả. Nội dung chuyên gia, bằng chứng tuân thủ và quảng cáo nhắm đúng giám đốc tài chính giúp rút ngắn vòng thẩm định.", b: ["Nội dung tuân thủ và bảo mật", "ABM theo danh sách tài khoản", "Đo lường từ lead tới hợp đồng"], n: ["38%", "chi phí mỗi cơ hội giảm"] },
  { k: "Sản xuất", t: "Sản xuất và công nghiệp", d: "Khách hàng tìm kiếm kỹ trước khi liên hệ. Chúng tôi tối ưu tìm kiếm, catalogue số và quy trình báo giá để đội kinh doanh nhận lead nóng.", b: ["SEO kỹ thuật cho catalogue", "Trang yêu cầu báo giá nhanh", "Triển lãm số và video nhà máy"], n: ["+160%", "yêu cầu báo giá"] },
  { k: "Logistics", t: "Vận tải và chuỗi cung ứng", d: "Thị trường cạnh tranh về giá. Chúng tôi làm nổi bật độ tin cậy, dữ liệu vận hành và các câu chuyện khách hàng thật.", b: ["Case study theo tuyến và ngành", "Quảng cáo LinkedIn cho trưởng phòng mua hàng", "Dashboard minh bạch cho khách"], n: ["62", "cuộc gọi tư vấn mỗi tháng"] },
  { k: "Y tế số", t: "Công nghệ y tế", d: "Người mua là bệnh viện và chuỗi phòng khám. Chúng tôi xây nội dung giáo dục, hội thảo chuyên môn và quy trình demo rõ ràng.", b: ["Hội thảo chuyên môn", "Tài liệu trắng có kiểm duyệt", "Demo theo kịch bản"], n: ["27", "bệnh viện đăng ký demo"] },
  { k: "Giáo dục", t: "Giáo dục và đào tạo doanh nghiệp", d: "Bán cho phòng nhân sự và giám đốc đào tạo. Chúng tôi biến chương trình thành bằng chứng kết quả đo được.", b: ["Bài đánh giá năng lực miễn phí", "Chuỗi email theo mục tiêu đào tạo", "Chứng nhận và case study"], n: ["3x", "lead đủ điều kiện"] },
];

const STEPS = [
  { n: "01", t: "Kiểm toán và khám phá", d: "Một tuần đọc kỹ dữ liệu, cuộc gọi bán hàng và đối thủ để biết bộ máy của bạn đang kẹt ở đâu." },
  { n: "02", t: "Chiến lược và kế hoạch", d: "Chọn ngách, thông điệp, kênh và chỉ số. Mỗi mục tiêu gắn với một con số doanh thu." },
  { n: "03", t: "Triển khai tích hợp", d: "Nội dung, quảng cáo, email và trang đích chạy cùng nhịp do một đội phụ trách." },
  { n: "04", t: "Đo lường và tối ưu", d: "Báo cáo hằng tuần, họp chỉnh mỗi hai tuần, bài học được đưa vào kế hoạch quý kế tiếp." },
];

const PLANS = [
  { n: "Khởi động", m: 28, d: "Cho đội marketing 1 đến 3 người cần nền móng rõ ràng.", f: ["Kiểm toán và chiến lược 90 ngày", "1 kênh quảng cáo hiệu suất", "4 nội dung chuyên sâu mỗi tháng", "Báo cáo hằng tháng"] },
  { n: "Tăng tốc", m: 62, d: "Cho doanh nghiệp đã có lead và muốn nhân đôi pipeline.", f: ["Đội demand 3 chuyên gia", "3 kênh quảng cáo + email", "8 nội dung và 2 video mỗi tháng", "Dashboard doanh thu thời gian thực", "Họp chỉnh mỗi hai tuần"], hot: true },
  { n: "Đồng hành", m: 120, d: "Cho tập đoàn cần một phòng marketing mở rộng toàn diện.", f: ["Đội 6 chuyên gia riêng", "ABM theo danh sách tài khoản", "Sản xuất video và sự kiện", "Đào tạo đội nội bộ", "Quản lý dự án chuyên trách"] },
];

const POSTS = [
  { c: "Demand Gen", t: "Nổi tiếng trong ngách: vì sao khách B2B chọn thương hiệu họ đã biết", m: "8 phút đọc", d: "Khung hai bước để đo mức độ nhận diện trước khi khách bắt đầu tìm kiếm." },
  { c: "Đo lường", t: "Gắn doanh thu về từng nội dung: cách làm không cần công cụ đắt tiền", m: "6 phút đọc", d: "Mẫu bảng theo dõi nguồn khách, từ biểu mẫu đến hợp đồng đã ký." },
  { c: "Nội dung", t: "Viết case study khiến phòng mua hàng gật đầu ngay lần đọc đầu", m: "7 phút đọc", d: "Cấu trúc năm phần và những con số mà giám đốc tài chính thật sự quan tâm." },
  { c: "Đo lường", t: "MQL đã chết? Chuyển sang chỉ số cơ hội đủ điều kiện", m: "5 phút đọc", d: "Vì sao đội bán hàng không còn tin vào số lead mà marketing báo cáo." },
  { c: "Demand Gen", t: "Quảng cáo LinkedIn cho ngách hẹp: ngân sách nhỏ vẫn ra kết quả", m: "9 phút đọc", d: "Cách chia nhóm đối tượng, thông điệp và kiểm thử trong 30 ngày." },
  { c: "Nội dung", t: "Biến một buổi phỏng vấn chuyên gia thành 12 nội dung", m: "6 phút đọc", d: "Quy trình tái sử dụng nội dung cho đội nhỏ." },
];

const FAQ = [
  { q: "Phong Vị làm việc với doanh nghiệp quy mô nào?", a: "Chúng tôi làm việc với doanh nghiệp B2B có doanh thu từ vài chục tỷ đồng, từ công ty phần mềm đến nhà sản xuất. Điều quan trọng không phải quy mô mà là bạn có sản phẩm rõ ràng và đội bán hàng sẵn sàng đón lead." },
  { q: "Bao lâu thì thấy kết quả?", a: "Thông thường 4 đến 6 tuần để thấy các chỉ số dẫn dắt như tỷ lệ phản hồi và chất lượng lead. Pipeline đáng kể thường xuất hiện sau 3 đến 4 tháng, vì chu kỳ mua B2B dài." },
  { q: "Chúng tôi đã có đội nội bộ, vẫn nên thuê agency?", a: "Có. Nhiều khách hàng dùng Đội ngũ Demand như phần mở rộng của đội nội bộ: chúng tôi bổ sung kỹ năng còn thiếu như quảng cáo hiệu suất, video và đo lường, rồi đào tạo lại để đội của bạn tự chủ dần." },
  { q: "Ngân sách quảng cáo có nằm trong phí dịch vụ không?", a: "Không. Ngân sách quảng cáo trả thẳng cho nền tảng từ tài khoản của bạn để bạn luôn kiểm soát. Phí dịch vụ của chúng tôi chỉ gồm con người và công cụ vận hành." },
  { q: "Báo cáo được gửi như thế nào?", a: "Bạn có dashboard doanh thu cập nhật theo thời gian thực, bản tóm tắt hằng tuần qua email và buổi họp chỉnh mỗi hai tuần với đội phụ trách." },
  { q: "Hợp đồng tối thiểu bao lâu?", a: "Gói Khởi động có thể bắt đầu theo quý. Gói Tăng tốc và Đồng hành cam kết tối thiểu 6 tháng để đủ thời gian đo lường chu kỳ bán hàng." },
  { q: "Có làm việc với thị trường ngoài Việt Nam không?", a: "Có. Chúng tôi đã triển khai chiến dịch cho khách hàng nhắm tới Singapore, Úc và châu Âu, với nội dung song ngữ và quảng cáo theo múi giờ địa phương." },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className={styles.eyebrowS}><b /> {children}</p>;
}

export function Extras() {
  const [ind, setInd] = useState(0);
  const [yearly, setYearly] = useState(false);
  const [cat, setCat] = useState("Tất cả");
  const [faq, setFaq] = useState<number | null>(0);
  const cur = INDUSTRIES[ind];
  const cats = ["Tất cả", "Demand Gen", "Đo lường", "Nội dung"];
  const posts = POSTS.filter((p) => cat === "Tất cả" || p.c === cat);

  return (
    <>
      {/* CHUYÊN MÔN */}
      <section className={styles.sec} id="chuyen-mon">
        <div className={styles.wrap}>
          <Eyebrow>Chuyên môn</Eyebrow>
          <div className={styles.split}>
            <h2 className={styles.h2} data-rv>Hiểu ngách của bạn, <em>nói đúng tiếng</em> của khách hàng</h2>
            <p className={styles.p} data-rv>Mỗi ngành B2B có một cách mua riêng. Chúng tôi đã chạy chiến dịch trong sáu lĩnh vực và mang bài học của từng ngành sang bài toán của bạn.</p>
          </div>
          <div className={styles.indBox}>
            <div className={styles.indTabs} role="tablist" aria-label="Ngành">
              {INDUSTRIES.map((x, i) => (
                <button key={x.k} role="tab" type="button" id={`ind-t-${i}`} aria-selected={ind === i} aria-controls="ind-panel" onClick={() => setInd(i)} onMouseEnter={() => setInd(i)}>
                  <span>{x.k}</span><i aria-hidden="true">{ind === i ? "−" : "+"}</i>
                </button>
              ))}
            </div>
            <div className={styles.indPanel} role="tabpanel" id="ind-panel" aria-labelledby={`ind-t-${ind}`}>
              <h3>{cur.t}</h3>
              <p className={styles.p}>{cur.d}</p>
              <ul className={styles.checks}>{cur.b.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className={styles.indStat}><b>{cur.n[0]}</b><span>{cur.n[1]}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* QUY TRÌNH */}
      <section className={styles.sec} id="quy-trinh">
        <div className={styles.wrap}>
          <Eyebrow>Quy trình</Eyebrow>
          <div className={styles.split}>
            <h2 className={styles.h2} data-rv>Bốn bước biến marketing thành <em>cỗ máy doanh thu</em></h2>
            <p className={styles.p} data-rv>Không có công thức thần kỳ. Chỉ có một quy trình lặp lại, rõ ràng, đo được và được điều chỉnh mỗi tuần.</p>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((s) => (
              <li key={s.n} className={styles.step}><b>{s.n}</b><h3>{s.t}</h3><p>{s.d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className={styles.sec} id="case-study">
        <div className={styles.wrap}>
          <div className={styles.caseBox}>
            <div>
              <Eyebrow>Dự án nổi bật</Eyebrow>
              <h2 className={styles.h2} data-rv>Từ 0 đến 38 cuộc hẹn mỗi tháng trong <em>sáu tháng</em></h2>
              <p className={styles.p}>Một công ty phần mềm quản lý kho vận có đội bán hàng giỏi nhưng gần như không có nguồn lead inbound. Chúng tôi dựng lại toàn bộ bộ máy marketing từ định vị đến đo lường.</p>
              <dl className={styles.caseDl}>
                <div><dt>Thách thức</dt><dd>Phụ thuộc giới thiệu, chi phí bán hàng cao, không biết kênh nào ra tiền.</dd></div>
                <div><dt>Giải pháp</dt><dd>Định vị lại theo ngách kho lạnh, loạt nội dung chuyên gia, quảng cáo LinkedIn theo danh sách và dashboard doanh thu.</dd></div>
                <div><dt>Kết quả</dt><dd>Pipeline gấp 3,1 lần, chi phí mỗi cuộc hẹn giảm 41%, chu kỳ bán rút từ 118 xuống 84 ngày.</dd></div>
              </dl>
            </div>
            <ul className={styles.caseStats}>
              <li><b>38</b><span>cuộc hẹn mỗi tháng</span></li>
              <li><b>3,1x</b><span>pipeline</span></li>
              <li><b>-41%</b><span>chi phí mỗi cuộc hẹn</span></li>
              <li><b>84</b><span>ngày chu kỳ bán</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* GÓI HỢP TÁC */}
      <section className={styles.sec} id="goi-hop-tac">
        <div className={styles.wrap}>
          <Eyebrow>Hình thức hợp tác</Eyebrow>
          <div className={styles.split}>
            <h2 className={styles.h2} data-rv>Chọn mức đồng hành <em>phù hợp</em> với giai đoạn của bạn</h2>
            <div className={styles.switchRow}>
              <span>Hằng tháng</span>
              <button type="button" role="switch" aria-checked={yearly} aria-label="Thanh toán theo năm, giảm 10%" className={styles.switch} onClick={() => setYearly((v) => !v)}><i /></button>
              <span>Theo năm <small>(giảm 10%)</small></span>
            </div>
          </div>
          <div className={styles.plans}>
            {PLANS.map((p) => (
              <article key={p.n} className={`${styles.plan} ${p.hot ? styles.planHot : ""}`}>
                {p.hot && <span className={styles.badge}>Phổ biến nhất</span>}
                <h3>{p.n}</h3>
                <p className={styles.p}>{p.d}</p>
                <p className={styles.price}><b>{Math.round(p.m * (yearly ? 0.9 : 1))}</b> triệu đồng <small>/ tháng</small></p>
                <ul className={styles.checks}>{p.f.map((x) => <li key={x}>{x}</li>)}</ul>
                <a className={styles.btnG} href="#lien-he">Nhận tư vấn <i aria-hidden="true">↗</i></a>
              </article>
            ))}
          </div>
          <p className={styles.fine}>Mức phí minh hoạ, chưa gồm ngân sách quảng cáo trả cho nền tảng.</p>
        </div>
      </section>

      {/* TÀI NGUYÊN */}
      <section className={styles.sec} id="tai-nguyen">
        <div className={styles.wrap}>
          <Eyebrow>Tài nguyên</Eyebrow>
          <div className={styles.split}>
            <h2 className={styles.h2} data-rv>Kiến thức marketing B2B, viết bởi <em>người đang làm</em></h2>
            <div className={styles.chips} role="group" aria-label="Lọc bài viết">
              {cats.map((c) => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
            </div>
          </div>
          <ul className={styles.posts}>
            {posts.map((p) => (
              <li key={p.t}>
                <a href="#tai-nguyen" className={styles.post} onClick={(e) => e.preventDefault()}>
                  <span className={styles.postC}>{p.c}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                  <small>{p.m}</small>
                  <span className={styles.go} aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HỎI ĐÁP */}
      <section className={styles.sec} id="hoi-dap">
        <div className={styles.wrap}>
          <div className={styles.faqWrap}>
            <div>
              <Eyebrow>Hỏi đáp</Eyebrow>
              <h2 className={styles.h2} data-rv>Câu hỏi <em>thường gặp</em></h2>
              <p className={styles.p}>Chưa thấy câu trả lời? Nhắn cho chúng tôi, một chuyên gia sẽ phản hồi trong một ngày làm việc.</p>
            </div>
            <div className={styles.faqList}>
              {FAQ.map((f, i) => (
                <div key={f.q} className={styles.faqItem}>
                  <h3>
                    <button type="button" id={`faq-b-${i}`} aria-expanded={faq === i} aria-controls={`faq-p-${i}`} onClick={() => setFaq(faq === i ? null : i)}>
                      <span>{f.q}</span><i aria-hidden="true">{faq === i ? "−" : "+"}</i>
                    </button>
                  </h3>
                  <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} hidden={faq !== i}><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", company: "", size: "", msg: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (v.name.trim().length < 2) x.name = "Vui lòng nhập họ tên.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) x.email = "Email công việc chưa hợp lệ.";
    if (v.company.trim().length < 2) x.company = "Vui lòng nhập tên công ty.";
    if (!v.size) x.size = "Hãy chọn quy mô.";
    if (v.msg.trim().length < 10) x.msg = "Hãy mô tả ngắn mục tiêu (tối thiểu 10 ký tự).";
    setErr(x);
    if (!Object.keys(x).length) setDone(true);
  };
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((o) => ({ ...o, [k]: e.target.value }));

  return (
    <section className={styles.formSec} id="lien-he">
      <div className={styles.wrap}>
        <div className={styles.formGrid}>
          <div>
            <p className={styles.eyebrowD}><b /> Liên hệ</p>
            <h2 className={styles.h2D}>Bắt đầu bằng một cuộc <em>trò chuyện</em> 30 phút</h2>
            <p className={styles.pD}>Chúng tôi xem nhanh bộ máy marketing hiện tại và chỉ ra ba cơ hội lớn nhất, miễn phí và không ràng buộc.</p>
            <ul className={styles.contactList}>
              <li><b>Email</b> xinchao@phongvi.example</li>
              <li><b>Điện thoại</b> 028 7300 0000</li>
              <li><b>Giờ làm việc</b> Thứ Hai đến Thứ Sáu, 09:00 đến 18:00</li>
            </ul>
          </div>
          {done ? (
            <div className={styles.thanks} role="status">
              <h3>Cảm ơn {v.name.split(" ").slice(-1)[0]}!</h3>
              <p>Chúng tôi đã nhận thông tin của {v.company} và sẽ gửi lịch hẹn qua {v.email} trong một ngày làm việc. (Biểu mẫu minh hoạ, dữ liệu không được gửi đi đâu.)</p>
              <button type="button" className={styles.btnG} onClick={() => { setDone(false); setV({ name: "", email: "", company: "", size: "", msg: "" }); }}>Gửi yêu cầu khác</button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit} noValidate>
              <label>Họ và tên<input value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!err.name} aria-describedby={err.name ? "e-name" : undefined} />{err.name && <em id="e-name" role="alert">{err.name}</em>}</label>
              <label>Email công việc<input type="email" value={v.email} onChange={set("email")} autoComplete="email" aria-invalid={!!err.email} aria-describedby={err.email ? "e-email" : undefined} />{err.email && <em id="e-email" role="alert">{err.email}</em>}</label>
              <label>Công ty<input value={v.company} onChange={set("company")} autoComplete="organization" aria-invalid={!!err.company} aria-describedby={err.company ? "e-co" : undefined} />{err.company && <em id="e-co" role="alert">{err.company}</em>}</label>
              <label>Quy mô doanh nghiệp
                <select value={v.size} onChange={set("size")} aria-invalid={!!err.size} aria-describedby={err.size ? "e-size" : undefined}>
                  <option value="">Chọn quy mô</option><option>Dưới 50 nhân sự</option><option>50 đến 200 nhân sự</option><option>200 đến 1.000 nhân sự</option><option>Trên 1.000 nhân sự</option>
                </select>{err.size && <em id="e-size" role="alert">{err.size}</em>}
              </label>
              <label className={styles.wide}>Mục tiêu marketing của bạn<textarea rows={4} value={v.msg} onChange={set("msg")} aria-invalid={!!err.msg} aria-describedby={err.msg ? "e-msg" : undefined} />{err.msg && <em id="e-msg" role="alert">{err.msg}</em>}</label>
              <button type="submit" className={`${styles.btnG} ${styles.wide}`}>Đặt lịch trò chuyện <i aria-hidden="true">↗</i></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Foot({ Mark }: { Mark: () => React.ReactElement }) {
  const [mail, setMail] = useState("");
  const [state, setState] = useState<"idle" | "bad" | "ok">("idle");
  const sub = (e: FormEvent) => {
    e.preventDefault();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail) ? "ok" : "bad");
  };
  return (
    <footer className={styles.foot} id="cong-ty">
      <div className={styles.footTop}>
        <form className={styles.news} onSubmit={sub} noValidate>
          <label htmlFor="pv-news">Bản tin marketing B2B mỗi hai tuần</label>
          <div>
            <input id="pv-news" type="email" placeholder="email@congty.vn" value={mail} onChange={(e) => { setMail(e.target.value); setState("idle"); }} aria-invalid={state === "bad"} />
            <button type="submit">Đăng ký</button>
          </div>
          <p role="status">{state === "ok" ? "Đã đăng ký, cảm ơn bạn. (Minh hoạ)" : state === "bad" ? "Email chưa hợp lệ." : "Không spam. Huỷ đăng ký bất cứ lúc nào."}</p>
        </form>
      </div>
      <div className={styles.footGrid}>
        <div><h4>Liên hệ</h4><p>xinchao@phongvi.example<br />028 7300 0000</p></div>
        <div><h4>Văn phòng TP. Hồ Chí Minh</h4><p>Tầng 8, 12 Nguyễn Huệ<br />Quận 1</p></div>
        <div><h4>Văn phòng Đà Nẵng</h4><p>Tầng 5, 88 Bạch Đằng<br />Hải Châu</p></div>
        <div><h4>Dịch vụ</h4><ul><li><a href="#dich-vu">Nội dung & Sáng tạo</a></li><li><a href="#dich-vu">Quảng cáo hiệu suất</a></li><li><a href="#dich-vu">Dữ liệu & Đo lường</a></li><li><a href="#doi-ngu">Đội ngũ Demand</a></li><li><a href="#demand-gen">Demand Gen</a></li></ul></div>
        <div><h4>Chuyên môn</h4><ul><li><a href="#chuyen-mon">SaaS</a></li><li><a href="#chuyen-mon">Fintech</a></li><li><a href="#chuyen-mon">Sản xuất</a></li><li><a href="#chuyen-mon">Logistics</a></li></ul></div>
        <div><h4>Tài nguyên</h4><ul><li><a href="#ket-qua">Dự án</a></li><li><a href="#tai-nguyen">Blog</a></li><li><a href="#tai-nguyen">Bản tin</a></li><li><a href="#hoi-dap">Hỏi đáp</a></li></ul></div>
        <div><h4>Công ty</h4><ul><li><a href="#doi-ngu">Về chúng tôi</a></li><li><a href="#hoi-dap">Tuyển dụng</a></li><li><a href="#lien-he">Liên hệ</a></li></ul></div>
      </div>
      <p className={styles.footLogo}><Mark /> Phong Vị</p>
      <div className={styles.footBar}>
        <span>© 2026 Phong Vị B2B</span>
        <span>Chính sách bảo mật</span>
        <span>Điều khoản</span>
        <span className={styles.sp} />
        <a href="#main" aria-label="Instagram (minh hoạ)">Instagram</a>
        <a href="#main" aria-label="LinkedIn (minh hoạ)">LinkedIn</a>
      </div>
      <p className={styles.footNote}>Trang minh hoạ. Tên thương hiệu, khách hàng, số liệu, mức phí và lời chứng thực là giả định.</p>
    </footer>
  );
}
