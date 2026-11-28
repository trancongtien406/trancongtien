import styles from "../brand.module.css";
import { INDUSTRIES, PLANS, POSTS, PRODUCT_CARDS, PROBLEMS, PROJECTS, STATS, STEPS, TEAM, VOICES } from "./data";
import { Count, CreativeList, Faq, FinTabs, MatchDemo, Mosaic, Newsletter, ProductRow, ContactForm } from "./Interactive";

const B = "/images/demos/san-pham-so/";
void PRODUCT_CARDS;

const Diamond = () => (<svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true"><path d="M6 0l1.6 4.4L12 6 7.6 7.6 6 12 4.4 7.6 0 6l4.4-1.6z" fill="#e8553a" /></svg>);
const Eyebrow = ({ children }: { children: React.ReactNode }) => (<p className={styles.eyebrow}><Diamond />{children}</p>);

export function Hero() {
  return (
    <section className={styles.hero} id="dau-trang" aria-labelledby="h-hero">
      <div className={styles.heroBg} aria-hidden="true"><i data-glow className={styles.glow} /><i className={styles.gl1} /><i className={styles.gl2} /><i className={styles.gl3} /></div>
      <div className={styles.heroIn}>
        <p className={styles.heroEy}>STUDIO THIẾT KẾ SẢN PHẨM SỐ</p>
        <p className={styles.heroP}>Chúng tôi thiết kế, mở rộng và (tiến)hoá sản phẩm số của bạn bằng UX/UI, hệ thống thiết kế và quy trình có AI hỗ trợ.</p>
        <h1 id="h-hero" className={styles.heroH}>Thiết kế giúp doanh nghiệp bạn lớn lên</h1>
        <a href="#du-an" className={styles.pillLight}><span aria-hidden="true">↗</span> Xem dự án</a>
      </div>
      <Mosaic />
    </section>
  );
}

export function Projects() {
  return (
    <section className={styles.dark} id="du-an" aria-labelledby="h-da">
      <div className={styles.wrap}>
        <div className={styles.shRow}>
          <div><Eyebrow>DỰ ÁN CHỌN LỌC</Eyebrow><h2 id="h-da" className={styles.h2}>Những sản phẩm chúng tôi đã cùng khách hàng đưa ra thị trường</h2></div>
          <p className={styles.lead}>Mỗi dự án bắt đầu từ một vấn đề thật của người dùng. Dưới đây là mười trong số hơn một trăm bốn mươi sản phẩm.</p>
        </div>
        <ul className={styles.grid}>
          {PROJECTS.map((p) => (
            <li key={p.t} data-s={p.span} data-k={p.k} data-rv="1">
              {p.img && <span className={styles.gImg} style={{ backgroundImage: `url(${B}${p.img}.webp)` }} />}
              {p.k === "poster" && <span className={styles.gPoster}><b>Mộc</b><small>Tâm</small></span>}
              {p.k === "violet" && <span className={styles.gViolet}><i /><i /><i /></span>}
              {p.k === "green" && <span className={styles.gGreen}>Thảo<br />Nguyên</span>}
              {p.k === "yellow" && <span className={styles.gYellow}><i /><i /><i /></span>}
              {p.k === "dark" && <span className={styles.gDark}>Tái<br />sinh</span>}
              <span className={styles.gCap}><b>{p.t}</b><small>{p.c}</small></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FinCase() {
  return (
    <section className={styles.fin} id="case-fintech" aria-labelledby="h-fin">
      <div className={styles.finHero}>
        <div className={styles.finHeroIn}>
          <p className={styles.finEy}>CASE STUDY · FINTECH · WEBSITE</p>
          <h2 id="h-fin" className={styles.finH}>Đối tác giúp doanh nghiệp bạn <b>tăng</b> trưởng.</h2>
          <p className={styles.finP}>Hoàn Thuế Nhanh là ngân hàng số đồng hành cùng các văn phòng thuế nhỏ, với phần mềm giúp rút ngắn thời gian hoàn thuế cho khách hàng của họ. Chúng tôi thiết kế lại toàn bộ website và các luồng sản phẩm.</p>
          <a href="#lien-he" className={styles.finBtn}>Bắt đầu thôi</a>
        </div>
        <div className={styles.finPh} style={{ backgroundImage: `url(${B}partner.webp)` }} role="img" aria-label="Ảnh minh hoạ một nhóm làm việc cùng nhau" />
      </div>
      <div className={styles.finBody}>
        <div className={styles.wrap}>
          <div className={styles.finTop}>
            <h3 className={styles.finH3}>Xem sự đa dạng <b>sản phẩm</b> chúng tôi cung cấp</h3>
            <p className={styles.finLead}>Nền tảng mạnh mẽ, đối tác chiến lược và công cụ phần mềm gói gọn trong một. Hoàn Thuế Nhanh gom nhiều sản phẩm để đẩy dịch vụ thuế của bạn đi xa hơn.</p>
          </div>
          <FinTabs />
          <ul className={styles.finStats}>
            <li><b>−62%</b><span>thời gian hoàn tất hồ sơ</span></li>
            <li><b>2,4×</b><span>lượt đăng ký từ website mới</span></li>
            <li><b>9 tuần</b><span>từ khám phá tới ra mắt</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function MatchCase() {
  return (
    <section className={styles.match} id="case-ghep-von" aria-labelledby="h-gv">
      <div className={styles.wrap}>
        <div className={styles.matchGrid}>
          <div>
            <p className={styles.matchEy}>CASE STUDY · ỨNG DỤNG DI ĐỘNG</p>
            <h2 id="h-gv" className={styles.matchH}>Ghép Vốn: nơi người sáng lập gặp nhà đầu tư thiên thần</h2>
            <p className={styles.matchP}>Ứng dụng ghép đôi giữa startup và nhà đầu tư dựa trên lĩnh vực, giai đoạn và thị trường. Chúng tôi thiết kế toàn bộ luồng, từ quay video giới thiệu ý tưởng tới khoảnh khắc “ghép đôi thành công”.</p>
            <ul className={styles.matchList}>
              <li><b>1</b><span>Hồ sơ nhà đầu tư rút gọn còn một thẻ, đủ để quyết định trong ba giây.</span></li>
              <li><b>2</b><span>Danh sách kiểm tra khi quay video giới thiệu, giúp người sáng lập không bỏ sót ý.</span></li>
              <li><b>3</b><span>Màn ghép đôi nhấn vào hành động tiếp theo: nhắn tin ngay hoặc để sau.</span></li>
            </ul>
            <p className={styles.matchHint}>Thử ngay: bấm ♥ để ghép đôi, bấm ✕ để xem hồ sơ khác.</p>
          </div>
          <MatchDemo />
        </div>
      </div>
    </section>
  );
}

export function Problems() {
  const P = PROBLEMS;
  return (
    <section className={styles.prob} id="van-de" aria-labelledby="h-pb">
      <div className={styles.wrap}>
        <div className={styles.probHead}>
          <p className={styles.eyebrowC}><Diamond />BẠN CÓ THẤY QUEN?</p>
          <h2 id="h-pb" className={styles.h2Light}>Đây là những vấn đề UX/UI <br />chúng tôi <em>giải quyết mỗi ngày</em></h2>
        </div>
        <div className={styles.bento}>
          <article className={styles.bA} data-rv="1"><h3>{P.a.t}</h3><p>{P.a.d}</p><span className={styles.bImg} style={{ backgroundImage: `url(${B}tablet.webp)` }} role="img" aria-label="Màn hình bảng điều khiển trên máy tính bảng" /></article>
          <article className={styles.bB} data-rv="1">
            <span className={styles.bPh} style={{ backgroundImage: `url(${B}person.webp)` }} aria-hidden="true" />
            <div className={styles.bBlog} aria-hidden="true"><small>Tiến Hoá · Blog</small><span><i /><i /></span><b>Nâng tầm doanh nghiệp bằng thiết kế</b></div>
            <div className={styles.bTxt}><h3>{P.b.t}</h3><p>{P.b.d}</p></div>
          </article>
          <article className={styles.bC} data-rv="1">
            <svg viewBox="0 0 260 110" aria-hidden="true"><path d="M52 22h24" stroke="#f5b8a6" strokeWidth="1.6" fill="none" /><path d="M118 30l36 18h26M118 30l36-14h30" stroke="#f5b8a6" strokeWidth="1.6" fill="none" /><rect x="6" y="8" width="52" height="28" rx="14" fill="none" stroke="#f5b8a6" strokeWidth="1.6" /><text x="32" y="26" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">BẮT ĐẦU</text><path d="M96 14l22 14-22 14-22-14z" fill="#e8553a" /><text x="96" y="32" textAnchor="middle" fontSize="9.5" fill="#fff" fontWeight="600">Tìm</text><text x="196" y="52" fontSize="11" fill="#fff">Chọn ngày…</text><text x="196" y="20" fontSize="11" fill="#fff">Chọn khoá…</text></svg>
            <h3>{P.c.t}</h3><p>{P.c.d}</p>
          </article>
          <article className={styles.bD} data-rv="1"><h3>{P.d.t}</h3><p>{P.d.d}</p></article>
          <article className={styles.bE} data-rv="1"><span className={styles.bApp} aria-hidden="true"><i><b>Giá tốt</b>299k</i><i><b>Mới</b>Gói Plus</i></span><h3>{P.e.t}</h3><p>{P.e.d}</p></article>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className={styles.svc} id="dich-vu" aria-labelledby="h-dv">
      <div className={styles.wrap}>
        <p className={styles.eyebrowW}><svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M1 1l4 4M7 1l4 4M1 11l4-4M7 11l4-4" stroke="#e8553a" strokeWidth="2.4" /></svg>DỊCH VỤ</p>
        <h2 id="h-dv" className={styles.svcH}>Mọi thứ sản phẩm số của bạn cần để lớn lên, từ thiết kế UX/UI tới thể hiện thương hiệu.</h2>
        <div className={styles.svcRule} />
        <div className={styles.svcSub}>
          <div><h3>Thiết kế sản phẩm &amp; trải nghiệm</h3><p>Thiết kế UX/UI chiến lược cho những sản phẩm số cần vận hành tốt, từ bản MVP giai đoạn đầu tới nền tảng SaaS đang mở rộng.</p></div>
          <a href="#lien-he" className={styles.pillLight}><span aria-hidden="true">↗</span> Khám phá thiết kế sản phẩm</a>
        </div>
        <ProductRow />
        <ul className={styles.svcMore}>
          <li><b>Nghiên cứu người dùng</b><span>Phỏng vấn, kiểm thử, bản đồ hành trình.</span></li>
          <li><b>Thiết kế giao diện</b><span>Web, ứng dụng di động, bảng điều khiển.</span></li>
          <li><b>Hệ thống thiết kế</b><span>Thư viện thành phần, quy tắc, tài liệu.</span></li>
          <li><b>Website sản phẩm</b><span>Định vị, nội dung, chuyển đổi.</span></li>
        </ul>
      </div>
    </section>
  );
}

export function Creative() {
  return (
    <section className={styles.cre} id="sang-tao" aria-labelledby="h-st">
      <div className={styles.wrap}>
        <span className={styles.star} aria-hidden="true">✦</span>
        <div className={styles.creTop}>
          <div><h2 id="h-st" className={styles.creH}>Dịch vụ thiết kế sáng tạo</h2><p className={styles.creP}>Chuyển động, nhận diện, thuyết trình và tài sản số: mọi thứ thương hiệu cần để trông mạnh như chính sản phẩm.</p></div>
        </div>
        <CreativeList />
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className={styles.cream} id="quy-trinh" aria-labelledby="h-qt">
      <div className={styles.wrap}>
        <Eyebrow>QUY TRÌNH</Eyebrow>
        <h2 id="h-qt" className={styles.h2Light}>Bốn chặng từ vấn đề tới sản phẩm chạy thật</h2>
        <ol className={styles.steps}>
          {STEPS.map((s) => (<li key={s.n} data-rv="1"><b>{s.n}</b><h3>{s.t}</h3><p>{s.d}</p><small>Bàn giao: {s.o}</small></li>))}
        </ol>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className={styles.stats} aria-label="Con số nổi bật">
      <div className={styles.wrap}>
        <ul>
          {STATS.map((s) => (<li key={s.l}><Count v={s.v} s={s.s} dec={s.dec} /><span>{s.l}</span></li>))}
        </ul>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section className={styles.light} id="nganh" aria-labelledby="h-ng">
      <div className={styles.wrap}>
        <Eyebrow>NGÀNH CHÚNG TÔI HIỂU</Eyebrow>
        <h2 id="h-ng" className={styles.h2Light}>Mỗi ngành có một cách người dùng ra quyết định</h2>
        <ul className={styles.inds}>
          {INDUSTRIES.map((x, i) => (<li key={x.t} data-rv="1"><span>{String(i + 1).padStart(2, "0")}</span><h3>{x.t}</h3><p>{x.d}</p></li>))}
        </ul>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section className={styles.dark} id="doi-ngu" aria-labelledby="h-dn">
      <div className={styles.wrap}>
        <div className={styles.shRow}>
          <div><Eyebrow>ĐỘI NGŨ</Eyebrow><h2 id="h-dn" className={styles.h2}>Nhóm nhỏ, làm sâu và ngồi cùng bạn tới cùng</h2></div>
          <p className={styles.lead}>Hai mươi hai người, một nửa là nhà thiết kế. Bạn làm việc trực tiếp với người đang vẽ, không qua trung gian.</p>
        </div>
        <ul className={styles.team}>
          {TEAM.map((m) => (<li key={m.n} data-rv="1"><span style={{ backgroundImage: `url(${B}${m.img}.webp)` }} role="img" aria-label={`Ảnh minh hoạ ${m.n}`} /><h3>{m.n}</h3><b>{m.r}</b><p>{m.b}</p></li>))}
        </ul>
        <p className={styles.note}>Người và ảnh trong trang đều minh hoạ.</p>
      </div>
    </section>
  );
}

export function Voices() {
  return (
    <section className={styles.cream} id="danh-gia" aria-labelledby="h-dg">
      <div className={styles.wrap}>
        <Eyebrow>KHÁCH HÀNG NÓI GÌ</Eyebrow>
        <h2 id="h-dg" className={styles.h2Light}>Họ nhớ chúng tôi vì những câu hỏi, không chỉ vì màn hình đẹp</h2>
        <ul className={styles.voices}>
          {VOICES.map((v) => (<li key={v.n} data-rv="1"><blockquote>“{v.q}”</blockquote><p><b>{v.n}</b><span>{v.r}</span></p></li>))}
        </ul>
        <p className={styles.noteL}>Lời chứng thực minh hoạ, nhân vật và công ty là giả định.</p>
      </div>
    </section>
  );
}

export function Plans() {
  return (
    <section className={styles.dark} id="hop-tac" aria-labelledby="h-ht">
      <div className={styles.wrap}>
        <Eyebrow>CÁCH HỢP TÁC</Eyebrow>
        <h2 id="h-ht" className={styles.h2}>Ba cách làm việc cùng Tiến Hoá</h2>
        <ul className={styles.plans}>
          {PLANS.map((p) => (
            <li key={p.n} data-hot={p.hot ? "1" : "0"} data-rv="1">
              {p.hot && <em>Được chọn nhiều nhất</em>}
              <h3>{p.n}</h3><p className={styles.planPrice}><b>{p.p}</b><span>{p.t}</span></p><p className={styles.planD}>{p.d}</p>
              <ul>{p.f.map((f) => <li key={f}>{f}</li>)}</ul>
              <a href="#lien-he" className={p.hot ? styles.pillLight : styles.pillGhost}><span aria-hidden="true">↗</span> Trao đổi gói này</a>
            </li>
          ))}
        </ul>
        <p className={styles.note}>Mức giá tham khảo cho bản demo.</p>
      </div>
    </section>
  );
}

export function Blog() {
  return (
    <section className={styles.light} id="blog" aria-labelledby="h-bl">
      <div className={styles.wrap}>
        <Eyebrow>BLOG</Eyebrow>
        <h2 id="h-bl" className={styles.h2Light}>Những điều chúng tôi học được khi làm sản phẩm</h2>
        <ul className={styles.posts}>
          {POSTS.map((p, i) => (<li key={p.t} data-rv="1"><i data-t={i} aria-hidden="true" /><span>{p.c} · {p.d} · {p.m}</span><h3><a href="#blog">{p.t}</a></h3></li>))}
        </ul>
        <Newsletter />
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className={styles.darkSoft} id="hoi-dap" aria-labelledby="h-hd">
      <div className={styles.wrap}>
        <div className={styles.faqGrid}>
          <div><Eyebrow>HỎI ĐÁP</Eyebrow><h2 id="h-hd" className={styles.h2}>Câu hỏi các đội sản phẩm hay hỏi trước khi bắt đầu</h2></div>
          <Faq />
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className={styles.contact} id="lien-he" aria-labelledby="h-lh">
      <div className={styles.wrap}>
        <div className={styles.contactGrid}>
          <div>
            <p className={styles.eyebrowC}><Diamond />BẮT ĐẦU DỰ ÁN CÙNG CHÚNG TÔI</p>
            <h2 id="h-lh" className={styles.contactH}>Sẵn sàng (tiến)hoá sản phẩm của bạn?</h2>
            <p className={styles.contactP}>Đưa cho chúng tôi vấn đề và tầm nhìn, ta cùng tìm lời giải.</p>
            <ul className={styles.contactList}><li>xinchao@tienhoa.example</li><li>Tầng 5, Quận 1, TP. Hồ Chí Minh</li><li>Thứ Hai – Thứ Sáu · 09:00–18:00</li></ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <footer className={styles.close}>
      <div className={styles.closeIn}>
        <p className={styles.closeLogo}><svg viewBox="0 0 28 28" width="30" height="30" aria-hidden="true"><circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M8 18l4-8 3 5 2-3 3 6z" fill="#e8553a" /></svg>TIẾN HOÁ</p>
        <p className={styles.closeH}>Cùng (tiến)hoá <br />sản phẩm của bạn</p>
        <a href="#lien-he" className={styles.pillLight}><span aria-hidden="true">↗</span> Liên hệ ngay</a>
      </div>
      <div className={styles.footCols}>
        <div><b>TIẾN HOÁ</b><p>Studio thiết kế sản phẩm số cho doanh nghiệp Việt.</p></div>
        <ul><li><b>Dịch vụ</b></li><li><a href="#dich-vu">Thiết kế sản phẩm</a></li><li><a href="#sang-tao">Thiết kế sáng tạo</a></li><li><a href="#du-an">Dự án</a></li></ul>
        <ul><li><b>Công ty</b></li><li><a href="#quy-trinh">Quy trình</a></li><li><a href="#doi-ngu">Đội ngũ</a></li><li><a href="#blog">Blog</a></li></ul>
        <ul><li><b>Liên hệ</b></li><li><a href="mailto:xinchao@tienhoa.example">xinchao@tienhoa.example</a></li><li><a href="#lien-he">Đặt cuộc gọi</a></li><li><a href="#hoi-dap">Hỏi đáp</a></li></ul>
      </div>
      <p className={styles.footNote}>© 2026 Tiến Hoá Studio. Trang minh hoạ: thương hiệu, số liệu, người và dự án đều là giả định. Ảnh: Pexels.</p>
    </footer>
  );
}
