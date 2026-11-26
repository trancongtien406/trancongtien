import { siteConfig } from "@/lib/site";
import styles from "../brand.module.css";
import { CATEGORY_LABEL, CLASSES, INSTRUCTORS, LEVEL_LABEL, PLANS, vnd } from "../data/classes";
import { StackingCards, SVGPathDraw } from "@/features/showroom/effects";
import { FAQ, RULES, SPACE_GEAR, STEPS, STUDIO_INFO, TRIAL } from "../data/content";
import { BreathClock } from "./BreathClock";
import { FilterLink } from "./FilterLink";
import { Photo } from "./Photo";

const SYMBOL = "/images/demos/nep-tho/identity/symbol-reversed.svg";

export function Hero({ consultHref }: { consultHref: string }) {
  return (
    <section className={styles.hero} id="top" aria-labelledby="nt-h1">
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow} data-nt="eyebrow">Studio Pilates &amp; Yoga · Quận Sơn Trà, Đà Nẵng</p>
          <h1 id="nt-h1" className={styles.h1}>
            <span data-nt="h1a">Pilates và yoga</span> <span data-nt="h1b">lớp nhỏ,</span> <span data-nt="h1c">tập theo nhịp của bạn.</span>
          </h1>
          <p className={styles.lead} data-nt="desc">Lớp Reformer tối đa 6 người, Mat Pilates và Yoga tối đa 10 người, cho người đi làm muốn tập đều trước giờ làm, giữa ngày hoặc buổi tối. Có lớp nhập môn và buổi tập thử.</p>
          <div className={styles.ctaRow} data-nt="cta">
            <a className={`${styles.btn} ${styles.btnPrimary}`} href={consultHref} data-nt="consult-hero">Đăng ký tập thử</a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#lich-tap">Xem lịch tuần</a>
          </div>
          <ul className={styles.facts} data-nt="facts" aria-label="Thông tin nhanh">
            <li><b>Từ 180.000 ₫</b><span>mỗi buổi, giá tham khảo</span></li>
            <li><b>06:30 – 20:15</b><span>mở lớp hằng ngày</span></li>
            <li><b>Tập thử 250.000 ₫</b><span>chọn lớp còn chỗ</span></li>
          </ul>
        </div>
        <div className={styles.heroVisual}>
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
        </div>
      </div>
    </section>
  );
}

export function TimetableIntro() {
  return (
    <div className={styles.secHead}>
      <div>
        <p className={styles.eyebrow}>Thời khoá biểu tuần</p>
        <h2 className={styles.h2}>Một tuần, nhiều nhịp.</h2>
      </div>
      <p className={styles.body}>Buổi sáng nhẹ nhàng, một khoảng nghỉ giữa ngày hay lớp tập sau giờ làm. Kéo thanh giờ để chỉ xem các buổi sau một mốc nhất định, hoặc lọc theo loại lớp, cấp độ, huấn luyện viên; bấm vào một buổi để xem giờ kết thúc, sơ đồ chỗ và giá.</p>
    </div>
  );
}

export function Classes() {
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="lop-tap" aria-labelledby="nt-h-classes">
      <div className={styles.secHead}>
        <div>
          <p className={styles.eyebrow}>Các loại lớp</p>
          <h2 id="nt-h-classes" className={styles.h2}>Sáu lớp, từ làm quen đến chuỗi tập liên tục.</h2>
        </div>
        <p className={styles.body}>Mỗi thẻ ghi rõ cấp độ, thời lượng, sĩ số và giá lẻ tham khảo. Bấm “Xem giờ tập” để lọc lịch tuần theo đúng lớp đó.</p>
      </div>
      <StackingCards className={styles.stack} top="6.5rem" offset={14} scaleStep={0.03}>
        {CLASSES.map((c, i) => (
          <article key={c.id} className={styles.stackCard} data-nt-class data-cat={c.category}>
            <div className={styles.classImg}><Photo name={c.photo} alt={c.photoAlt} sizes="(max-width: 820px) 90vw, 40vw" size={1200} /></div>
            <div className={styles.stackText}>
              <p className={styles.classNum}>{String(i + 1).padStart(2, "0")} · {CATEGORY_LABEL[c.category]}</p>
              <h3 className={styles.h3}>{c.name}</h3>
              <p className={styles.classMeta}><span>{c.minutes}&nbsp;phút</span><span>{LEVEL_LABEL[c.level]}</span><span>Tối đa {c.capacity}&nbsp;người</span><span>{vnd(c.price)}/buổi</span></p>
              <p className={styles.small}>{c.desc}</p>
              <FilterLink className={styles.btnLink} detail={{ classId: c.id }}>Xem giờ tập <span className={styles.srOnly}>của {c.name}</span></FilterLink>
            </div>
          </article>
        ))}
      </StackingCards>
    </section>
  );
}

export function FinderIntro() {
  return (
    <div className={styles.finderIntro}>
      <p className={styles.eyebrowLight}>Tìm lớp phù hợp</p>
      <h2 className={styles.h2}>Chưa biết nên bắt đầu từ lớp nào?</h2>
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
          <p className={styles.eyebrow}>Không gian &amp; thiết bị</p>
          <h2 id="nt-h-story" className={styles.h2}>Hai phòng tập nhỏ, đủ chỗ để thở.</h2>
          <p className={styles.body}>Nếp Thở có một phòng Reformer và một phòng thảm. Sĩ số giữ nhỏ để huấn luyện viên nhìn được từng người; ánh sáng tự nhiên, thiết bị xếp gọn và gam màu dịu giúp bạn tập trung vào buổi tập.</p>
          <ul className={styles.values}>
            {SPACE_GEAR.map((g) => <li key={g.b}><b>{g.b}</b><span>{g.s}</span></li>)}
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

export function Breath() {
  return (
    <section className={styles.breath} id="nhip-tho" aria-labelledby="nt-h-breath">
      <div className={`${styles.wrap} ${styles.breathGrid}`}>
        <div>
          <p className={styles.eyebrowLight}>Nhịp của một bài Reformer</p>
          <h2 id="nt-h-breath" className={styles.h2}>Hít để đẩy ra, thở để kéo về.</h2>
          <p className={styles.bodyLight}>Trên máy Reformer, chuyển động đi theo hơi thở: hít vào khi đẩy bàn trượt ra, thở ra khi kéo về thật chậm. Chọn một nhịp độ và xem xe trượt chạy 8 lượt để quen với nhịp của lớp trước khi đến studio.</p>
          <p className={styles.noteLight}>Huấn luyện viên sẽ chỉnh lò xo và nhịp độ theo từng người. Nếu thấy chóng mặt, hãy dừng lại và thở bình thường.</p>
        </div>
        <BreathClock />
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
          <p className={styles.eyebrow}>Đội ngũ huấn luyện</p>
          <h2 id="nt-h-guides" className={styles.h2}>Ba vai trò dẫn lớp.</h2>
        </div>
        <p className={styles.body}>Mỗi lớp trong lịch tuần do một huấn luyện viên phụ trách theo chuyên môn. Bấm nút để lọc lịch theo vai trò dẫn lớp.</p>
      </div>
      <ul className={styles.guides}>
        {INSTRUCTORS.map((g, i) => (
          <li key={g.id} className={styles.guide} data-nt-reveal>
            <span className={styles.monogram} style={{ background: tone[i] }} aria-hidden="true"><svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">{i === 0 ? <><rect x="4" y="15" width="32" height="10" rx="5" /><path d="M10 20h20" /></> : i === 1 ? <path d="M6 28c6-14 22-14 28 0M20 9v9" /> : <><circle cx="20" cy="20" r="13" /><path d="M7 20h26" /></>}</svg></span>
            <h3 className={styles.h3}>HLV {g.name}</h3>
            <p className={styles.guideRole}>{g.role}</p>
            <p className={styles.small}>{g.bio}</p>
            <FilterLink className={styles.btnLink} detail={{ instructor: g.id }}>Xem lớp của HLV {g.name}</FilterLink>
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
            <p className={styles.eyebrow}>Gói tập &amp; giá</p>
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

export function FirstVisit({ consultHref }: { consultHref: string }) {
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="tap-thu" aria-labelledby="nt-h-first">
      <div className={styles.secHead}>
        <div>
          <p className={styles.eyebrow}>Buổi tập thử</p>
          <h2 id="nt-h-first" className={styles.h2}>Tập thử một buổi, {TRIAL.price}.</h2>
        </div>
        <p className={styles.body}>Giá tham khảo cho gói Nhịp đầu. Bạn chọn lớp, studio xác nhận chỗ, bạn đến tập và quyết định có tiếp tục hay không.</p>
      </div>
      <div className={styles.trialGrid}>
        <ul className={styles.trialList} data-nt-reveal>
          {TRIAL.lines.map((l) => <li key={l}>{l}</li>)}
        </ul>
        <div className={styles.trialCta} data-nt-reveal>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href={consultHref} data-nt="consult-trial">Đăng ký tập thử</a>
          <FilterLink className={`${styles.btn} ${styles.btnGhost}`} detail={{ level: "beginner" }}>Xem lớp nhập môn</FilterLink>
        </div>
      </div>
      <div className={styles.stepsWrap}>
        <SVGPathDraw className={styles.stepsWave} viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true" duration={2.2}>
          <path d="M0 30 C 80 0, 160 0, 250 30 S 420 60, 500 30 S 670 0, 750 30 S 920 60, 1000 30" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </SVGPathDraw>
        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <li key={s.t} data-nt-reveal><span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span><h3 className={styles.h4}>{s.t}</h3><p className={styles.small}>{s.d}</p></li>
          ))}
        </ol>
      </div>
      <p className={styles.helper}>Nếu đang có chấn thương, đau bất thường hoặc tình trạng sức khoẻ cần lưu ý, hãy hỏi ý kiến bác sĩ hoặc nhân viên y tế phù hợp trước khi tham gia tập luyện.</p>
    </section>
  );
}

export function Rules() {
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="quy-dinh" aria-labelledby="nt-h-rules">
      <div className={styles.rulesGrid}>
        <div>
          <p className={styles.eyebrow}>Quy định &amp; thông tin</p>
          <h2 id="nt-h-rules" className={styles.h2}>Những điều nên biết trước khi đến.</h2>
          <dl className={styles.info}>
            {STUDIO_INFO.map((x) => <div key={x.k}><dt>{x.k}</dt><dd>{x.v}</dd></div>)}
          </dl>
        </div>
        <ul className={styles.rules}>
          {RULES.map((r, i) => (
            <li key={r.t} data-nt-reveal><span>{String(i + 1).padStart(2, "0")}</span><div><h3 className={styles.h4}>{r.t}</h3><p className={styles.small}>{r.d}</p></div></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="faq" aria-labelledby="nt-h-faq">
      <div className={styles.faqGrid}>
        <div>
          <p className={styles.eyebrow}>Câu hỏi thường gặp</p>
          <h2 id="nt-h-faq" className={styles.h2}>Những điều bạn muốn biết.</h2>
          <p className={styles.body}>Về lớp tập, buổi tập thử, gói tập và cách đổi huỷ buổi.</p>
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
          <p className={styles.eyebrow}>Đặt chỗ buổi đầu</p>
          <h2 id="nt-h-close" className={styles.h2}>Hẹn một buổi đầu tiên.</h2>
          <p className={styles.body}>Chọn một lớp Nhập môn trong lịch tuần, gửi đăng ký tập thử và studio sẽ xác nhận lớp, giờ, chỗ trước ngày tập.</p>
          <div className={styles.ctaRow}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href={consultHref} data-nt="consult-close-cta">Đăng ký tập thử</a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#lich-tap">Xem lịch tuần</a>
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
          <p>Studio pilates &amp; yoga, quận Sơn Trà, Đà Nẵng. Mở 06:30 – 20:15 mỗi ngày.</p>
        </div>
        <nav aria-label="Khám phá"><h2>Khám phá</h2><ul><li><a href="#lop-tap">Lớp tập</a></li><li><a href="#lich-tap">Lịch tập</a></li><li><a href="#khong-gian">Không gian</a></li><li><a href="#quy-dinh">Quy định</a></li></ul></nav>
        <nav aria-label="Dành cho bạn"><h2>Dành cho bạn</h2><ul><li><a href="#tap-thu">Tập thử</a></li><li><a href="#tim-lop">Tìm lớp phù hợp</a></li><li><a href="#goi-tap">Gói tập</a></li><li><a href="#faq">Câu hỏi thường gặp</a></li></ul></nav>
        <nav aria-label="Thông tin"><h2>Thông tin</h2><ul><li><a href="/demos/nep-tho/credits">Ảnh &amp; ghi công</a></li><li><a href={consultHref}>Liên hệ tư vấn</a></li></ul></nav>
      </div>
      <div className={`${styles.wrap} ${styles.footLine}`}>
        <p>© 2026 <span translate="no">Nếp Thở</span> · Đặt chỗ, thanh toán và đổi huỷ xác nhận trực tiếp với studio; thông tin trên trang không thay thế tư vấn y tế.</p>
        <p>Website do {siteConfig.fullName} thiết kế.</p>
      </div>
    </footer>
  );
}

export { CATEGORY_LABEL };
