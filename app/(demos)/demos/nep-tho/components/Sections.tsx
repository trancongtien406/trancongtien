import { siteConfig } from "@/lib/site";
import styles from "../brand.module.css";
import { CATEGORY_LABEL, CLASSES, INSTRUCTORS, LEVEL_LABEL, PLANS, vnd } from "../data/classes";
import { FAQ, STEPS } from "../data/content";
import { FilterLink } from "./FilterLink";
import { Photo } from "./Photo";

const SYMBOL = "/images/demos/nep-tho/identity/symbol-reversed.svg";

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="nt-h1">
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow} data-nt="eyebrow">Pilates &amp; yoga studio</p>
          <h1 id="nt-h1" className={styles.h1}>
            <span data-nt="h1a">Tìm lại nhịp</span> <span data-nt="h1b">chuyển động</span> <span data-nt="h1c">của riêng mình.</span>
          </h1>
          <p className={styles.lead} data-nt="desc">Một khoảng nhỏ trong ngày để lắng nghe cơ thể, chuyển động có chủ đích và dành thời gian cho chính mình.</p>
          <div className={styles.ctaRow} data-nt="cta">
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="#lich-tap">Xem lịch tập</a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#lop-tap">Khám phá lớp tập</a>
          </div>
          <p className={styles.micro} data-nt="micro">Không cần hoàn hảo để bắt đầu.</p>
        </div>
        <div className={styles.heroVisual} aria-hidden="false">
          <div className={styles.heroPill} data-nt="hero-pill">
            <Photo name="studio-reformer" alt="Phòng studio sáng với các máy reformer gỗ và khung tháp, cây xanh cạnh gương" sizes="(max-width: 820px) 70vw, 36vw" priority size={1200} position="50% 40%" />
          </div>
          <div className={styles.heroSmall} data-nt="hero-small">
            <Photo name="ban-tay-tham" alt="Cận bàn tay áp lên thảm tập xanh đen" sizes="(max-width: 820px) 34vw, 16vw" size={600} position="50% 50%" />
          </div>
          <div className={styles.heroStamp} data-nt="hero-stamp">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SYMBOL} alt="" width={64} height={64} />
          </div>
          <p className={styles.heroCap} data-nt="hero-cap"><b>33</b> buổi mỗi tuần · 3 lớp nhập môn</p>
        </div>
      </div>
      <div className={`${styles.wrap} ${styles.heroBase}`}>
        <p>Reformer · Mat Pilates · Yoga</p>
        <p>Mỗi ngày, một nhịp thở.</p>
      </div>
    </section>
  );
}

export function Ribbon() {
  return (
    <div className={styles.wrap}>
      <ul className={styles.ribbon} aria-label="Bốn nhịp của một buổi tập" data-nt-reveal>
        {["Chuyển động", "Hít thở", "Chậm lại", "Lặp lại"].map((w) => <li key={w}>{w}</li>)}
      </ul>
    </div>
  );
}

export function TimetableIntro() {
  return (
    <div className={styles.secHead}>
      <div>
        <p className={styles.eyebrow}>01 · Lịch chuyển động</p>
        <h2 className={styles.h2}>Một tuần, nhiều nhịp.</h2>
      </div>
      <p className={styles.body}>Buổi sáng nhẹ nhàng, một khoảng nghỉ giữa ngày hay lớp tập sau giờ làm. Khám phá khung giờ hợp với lịch sinh hoạt của bạn: lọc theo loại lớp, cấp độ hoặc huấn luyện viên rồi bấm vào một lớp để xem chi tiết.</p>
    </div>
  );
}

export function Classes() {
  const [a, b, ...rest] = [CLASSES[0], CLASSES[1], CLASSES[2], CLASSES[3], CLASSES[4], CLASSES[5]];
  const card = (c: (typeof CLASSES)[number], i: number, wide: boolean) => (
    <li key={c.id} className={styles.classCard} data-wide={wide ? "1" : "0"} data-nt-reveal>
      <div className={styles.classImg}><Photo name={c.photo} alt={c.photoAlt} sizes={wide ? "(max-width: 820px) 90vw, 46vw" : "(max-width: 820px) 44vw, 22vw"} size={wide ? 1200 : 600} /></div>
      <p className={styles.classNum}>{String(i + 1).padStart(2, "0")}</p>
      <h3 className={styles.h3}>{c.name}</h3>
      <p className={styles.classMeta}><span>{c.minutes}&nbsp;phút</span><span>{LEVEL_LABEL[c.level]}</span><span>Tối đa {c.capacity}&nbsp;người</span></p>
      <p className={styles.small}>{c.desc}</p>
      <FilterLink className={styles.btnLink} detail={{ classId: c.id }}>Xem giờ tập <span className={styles.srOnly}>của {c.name}</span></FilterLink>
    </li>
  );
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="lop-tap" aria-labelledby="nt-h-classes">
      <div className={styles.secHead}>
        <div>
          <p className={styles.eyebrow}>02 · Các lớp tập</p>
          <h2 id="nt-h-classes" className={styles.h2}>Chuyển động theo cách bạn thích.</h2>
        </div>
        <p className={styles.body}>Từ những buổi làm quen với máy Reformer đến các chuyển động trên thảm, mỗi lớp mang một nhịp điệu riêng. Chọn một lớp để lọc đúng khung giờ của lớp đó trong lịch tuần.</p>
      </div>
      <ul className={styles.classGrid}>
        {card(a, 0, true)}{card(b, 1, true)}
        {rest.map((c, i) => card(c, i + 2, false))}
      </ul>
    </section>
  );
}

export function FinderIntro() {
  return (
    <div className={styles.finderIntro}>
      <p className={styles.eyebrowLight}>03 · Class Finder</p>
      <h2 className={styles.h2}>Bắt đầu từ đâu?</h2>
      <p className={styles.bodyLight}>Không cần biết hết về Pilates hay Yoga. Hãy bắt đầu từ điều bạn muốn trải nghiệm, thời gian bạn có và mức độ quen thuộc với các lớp tập. Trả lời 4 câu hỏi ngắn để nhận gợi ý.</p>
      <p className={styles.microLight}>Khoảng 30 giây · Không cần đăng ký · Không lưu thông tin sức khoẻ</p>
      <p className={styles.noteLight}>Công cụ chỉ gợi ý lớp dựa trên lựa chọn của bạn, không đánh giá thể trạng hay thay thế tư vấn y tế.</p>
    </div>
  );
}

export function Story() {
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="khong-gian" aria-labelledby="nt-h-story">
      <div className={styles.storyGrid}>
        <div className={styles.storyMain} data-nt-reveal>
          <Photo name="studio-nang-som" alt="Sàn studio có nắng sớm chiếu qua cửa sổ, thảm xanh và bóng tập" sizes="(max-width: 820px) 90vw, 42vw" size={1200} />
        </div>
        <div className={styles.storyText} data-nt-reveal>
          <p className={styles.eyebrow}>04 · Không gian Nếp Thở</p>
          <h2 id="nt-h-story" className={styles.h2}>Một khoảng nhỏ cho chính mình.</h2>
          <p className={styles.body}>Nếp Thở là một studio vừa đủ gần gũi để bạn thấy thoải mái khi bước vào, vừa đủ yên tĩnh để tập trung vào buổi tập. Ánh sáng tự nhiên, thiết bị xếp gọn và những gam màu dịu nhẹ tạo nên một không gian không cần nhiều thứ để trở nên dễ chịu.</p>
          <ul className={styles.values}>
            <li><b>Vừa đủ riêng tư</b><span>Mô hình lớp nhóm nhỏ để mỗi người có thêm khoảng trống.</span></li>
            <li><b>Chuyển động có chú ý</b><span>Ưu tiên cách thực hiện động tác và nhịp độ phù hợp.</span></li>
            <li><b>Không cần vội vàng</b><span>Tôn trọng sự khác biệt về kinh nghiệm và lựa chọn của mỗi người.</span></li>
          </ul>
                  </div>
        <div className={styles.storyDetails}>
          <div className={styles.detailPill} data-nt-reveal><Photo name="vong-yoga" alt="Đôi chân trong võng yoga trên sàn gỗ ấm" sizes="(max-width: 820px) 44vw, 14vw" size={600} /></div>
          <div className={styles.detailPill} data-nt-reveal><Photo name="guong-cay" alt="Góc phòng với chậu cây, gương đứng và tấm thảm tập" sizes="(max-width: 820px) 44vw, 14vw" size={600} /></div>
        </div>
      </div>
    </section>
  );
}

export function Guides() {
  const tone = ["var(--nt-apricot)", "var(--nt-olive)", "var(--nt-sand)"];
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="huan-luyen-vien" aria-labelledby="nt-h-guides">
      <div className={styles.secHead}>
        <div>
          <p className={styles.eyebrow}>05 · Người đồng hành</p>
          <h2 id="nt-h-guides" className={styles.h2}>Mỗi người, một cách dẫn nhịp.</h2>
        </div>
        <p className={styles.body}>Ba huấn luyện viên cùng dẫn các lớp trong lịch tuần của Nếp Thở. Bấm vào tên để lọc lịch theo người dẫn lớp.</p>
      </div>
      <ul className={styles.guides}>
        {INSTRUCTORS.map((g, i) => (
          <li key={g.id} className={styles.guide} data-nt-reveal>
            <span className={styles.monogram} style={{ background: tone[i] }} aria-hidden="true">{g.name[0]}</span>
            <h3 className={styles.h3}>{g.name}</h3>
            <p className={styles.guideRole}>{g.role}</p>
            <p className={styles.small}>{g.bio}</p>
            <FilterLink className={styles.btnLink} detail={{ instructor: g.id }}>Xem lớp của {g.name}</FilterLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Membership({ consultHref }: { consultHref: string }) {
  return (
    <section className={styles.sage} id="goi-tap" aria-labelledby="nt-h-plans">
      <div className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.secHead}>
          <div>
            <p className={styles.eyebrow}>06 · Gói tập</p>
            <h2 id="nt-h-plans" className={styles.h2}>Chọn nhịp tập của bạn.</h2>
          </div>
          <p className={styles.body}>Một buổi để làm quen, vài buổi để khám phá hoặc một lịch tập đều đặn hơn. Các gói dưới đây là <b>giá tham khảo</b> cho mô hình studio nhóm nhỏ.</p>
        </div>
        <ul className={styles.plans}>
          {PLANS.map((p) => (
            <li key={p.id} className={styles.plan} data-featured={p.featured ? "1" : "0"} data-nt-reveal>
              <p className={styles.planNote}>{p.note}</p>
              <h3 className={styles.h3}>{p.name}</h3>
              <p className={styles.price}>{vnd(p.price)}</p>
              <p className={styles.planSessions}>{p.sessions}{p.per ? <> · {vnd(p.per)}/buổi</> : null}</p>
              <ul className={styles.planLines}>{p.lines.map((l) => <li key={l}>{l}</li>)}</ul>
              <a className={`${styles.btn} ${p.featured ? styles.btnPrimary : styles.btnGhost}`} href={consultHref}>Hỏi về gói {p.name}</a>
            </li>
          ))}
        </ul>
        <div className={styles.retail} data-nt-reveal>
          <h3 className={styles.h4}>Giá lẻ theo loại lớp (giá tham khảo)</h3>
          <ul>
            {CLASSES.map((c) => <li key={c.id}><span>{c.name}</span><b>{vnd(c.price)}</b></li>)}
          </ul>
        </div>
        <p className={styles.helper}>Giá tham khảo bằng VNĐ, chưa phải báo giá cuối cùng. Hiệu lực tính từ ngày kích hoạt, mỗi lớp tiêu hao một buổi, không tự động gia hạn. Không có cam kết về kết quả cơ thể.</p>
      </div>
    </section>
  );
}

export function FirstVisit() {
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="lan-dau" aria-labelledby="nt-h-first">
      <div className={styles.secHead}>
        <div>
          <p className={styles.eyebrow}>07 · Buổi tập đầu tiên</p>
          <h2 id="nt-h-first" className={styles.h2}>Lần đầu cũng thật đơn giản.</h2>
        </div>
        <p className={styles.body}>Bạn không cần chuẩn bị quá nhiều để bắt đầu tìm hiểu một lớp tập. Đây là những bước thường gặp khi đến một studio Pilates hoặc Yoga.</p>
      </div>
      <ol className={styles.steps}>
        {STEPS.map((s, i) => (
          <li key={s.t} data-nt-reveal><span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span><h3 className={styles.h4}>{s.t}</h3><p className={styles.small}>{s.d}</p></li>
        ))}
      </ol>
      <p className={styles.helper}>Nếu đang có chấn thương, đau bất thường hoặc tình trạng sức khoẻ cần lưu ý, hãy hỏi ý kiến bác sĩ hoặc nhân viên y tế phù hợp trước khi tham gia tập luyện.</p>
      <FilterLink className={`${styles.btn} ${styles.btnGhost}`} detail={{ level: "beginner" }}>Tìm hiểu lớp nhập môn</FilterLink>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="faq" aria-labelledby="nt-h-faq">
      <div className={styles.faqGrid}>
        <div>
          <p className={styles.eyebrow}>08 · Câu hỏi thường gặp</p>
          <h2 id="nt-h-faq" className={styles.h2}>Những điều bạn muốn biết.</h2>
          <p className={styles.body}>Một vài thông tin giúp bạn hiểu hơn về mô hình lớp tập và cách trải nghiệm website Nếp Thở.</p>
        </div>
        <div className={styles.faqList}>
          {FAQ.map((q, i) => (
            <details key={q.q} className={styles.faq} name="nt-faq" open={i === 0}>
              <summary><span>{String(i + 1).padStart(2, "0")}</span>{q.q}</summary>
              <p>{q.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing({ consultHref }: { consultHref: string }) {
  return (
    <section className={styles.wrap} aria-labelledby="nt-h-close">
      <div className={styles.closing} data-nt="closing">
        <div className={styles.closingText}>
          <p className={styles.eyebrow}>Your own pace</p>
          <h2 id="nt-h-close" className={styles.h2}>Hẹn mình một nhịp thở.</h2>
          <p className={styles.body}>Không cần đợi đến khi có thật nhiều thời gian. Một khoảng nhỏ dành cho chính mình cũng là một cách bắt đầu.</p>
          <div className={styles.ctaRow}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="#lich-tap">Khám phá lịch tập</a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#tim-lop">Tìm lớp phù hợp</a>
          </div>
          <p className={styles.helper}>Có câu hỏi về lớp tập hoặc gói tập? <a href={consultHref} data-nt="consult-closing">Trao đổi với Nếp Thở</a>.</p>
        </div>
        <div className={styles.closingPill} data-nt-reveal><Photo name="tham-cuon-ke" alt="Thảm cuộn và chăn gấp trên kệ gỗ cạnh tường sáng" sizes="(max-width: 820px) 80vw, 30vw" size={1200} /></div>
      </div>
    </section>
  );
}

export function Footer({ consultHref }: { consultHref: string }) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.wrap} ${styles.footGrid}`}>
        <div className={styles.footBrand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/nep-tho/identity/logo-primary.svg" alt="Nếp Thở" width={120} height={120} />
          <p>Studio pilates &amp; yoga. Chuyển động nhẹ nhàng. Sống theo nhịp mình.</p>
        </div>
        <nav aria-label="Khám phá"><h2>Khám phá</h2><ul><li><a href="#lop-tap">Lớp tập</a></li><li><a href="#lich-tap">Lịch tập</a></li><li><a href="#khong-gian">Không gian</a></li></ul></nav>
        <nav aria-label="Dành cho bạn"><h2>Dành cho bạn</h2><ul><li><a href="#tim-lop">Tìm lớp phù hợp</a></li><li><a href="#goi-tap">Gói tập</a></li><li><a href="#faq">Câu hỏi thường gặp</a></li></ul></nav>
        <nav aria-label="Thông tin"><h2>Thông tin</h2><ul><li><a href="/demos/nep-tho/credits">Ảnh &amp; ghi công</a></li><li><a href={consultHref}>Liên hệ tư vấn</a></li></ul></nav>
      </div>
      <div className={`${styles.wrap} ${styles.footLine}`}>
        <p>© 2026 <span translate="no">Nếp Thở</span> · Website không đặt lịch, thanh toán hay tư vấn y tế.</p>
        <p>Website do {siteConfig.fullName} thiết kế.</p>
      </div>
    </footer>
  );
}

export { CATEGORY_LABEL };
