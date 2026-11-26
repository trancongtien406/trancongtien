import { GrainOverlay, StackingCards, TextScramble } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import { ABOUT_FOR, BOARD, BRING, FAQ, GALLERY, PLANS, PROGRAMS, RULES, TRIAL_STEPS, WARM } from "../data/content";
import { COACHES } from "../data/schedule";
import { Coach } from "./Coach";
import { FloorPlan, SessionClock } from "./Gym";
import { OutlineText } from "./OutlineText";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const CONSULT = buildConsultHref("sat-gym");
const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export function About() {
  return (
    <section className={styles.manifesto} id="gioi-thieu" aria-labelledby="gioi-thieu-title">
      <div className={`${styles.wrap} ${styles.manifestoGrid}`}>
        <div className={styles.manifestoText}>
          <p className={styles.label} data-sg="stencil"><span>01</span> Về SẬT</p>
          <h2 id="gioi-thieu-title" className={styles.h2}>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>Box CrossFit</OutlineText>
            <span className={styles.h2Solid}>ở Ngũ Hành Sơn.</span>
          </h2>
          <p className={styles.statement}>
            SẬT là phòng tập CrossFit và strength ở Quận Ngũ Hành Sơn, Đà Nẵng: một căn phòng bê tông với rack, thanh tạ, dàn xà và dây thừng. Học theo lớp 45 đến 60 phút, mỗi lớp tối đa 14 người, có huấn luyện viên đứng lớp từ khởi động đến hạ nhịp.
          </p>
          <p className={styles.small}>Không có đường tắt được hứa hẹn và cũng không có chuẩn ngoại hình để theo. Bạn chọn mức tạ kiểm soát được, huấn luyện viên lo kỹ thuật và nhịp tập.</p>
          <ul className={styles.forList}>
            {ABOUT_FOR.map((f) => (
              <li key={f.t} data-sg="slam"><b>{f.t}</b><span>{f.d}</span></li>
            ))}
          </ul>
        </div>
        <div className={styles.manifestoPhoto} data-sg="wipe">
          <div className={styles.photoBox}>
            <Photo file="thanh-xep" alt="Những thanh tạ dựng cạnh nhau bên cột thép và bức tường bê tông" sizes="(max-width: 900px) 92vw, 46vw" w={1200} pos="50% 50%" className={styles.gray} />
            <span className={styles.photoTag}>Thanh thép · cột bê tông</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Programs() {
  const tones = [styles.pcDark, styles.pcChalk, styles.pcAcid, styles.pcMid, styles.pcChalk];
  return (
    <section className={styles.programs} id="chuong-trinh" aria-labelledby="ct-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>02</span> Chương trình</p>
          <h2 id="ct-title" className={styles.h2Big}>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>Năm loại lớp</OutlineText>
            <span className={styles.h2Solid}>trong lịch tuần.</span>
          </h2>
          <p className={styles.lede}>CrossFit WOD, strength, conditioning, mobility và lớp làm quen cho người mới. Mỗi lớp ghi rõ dụng cụ, thời lượng và mức phù hợp.</p>
        </header>
        <StackingCards className={styles.stack} top="84px" offset={14} scaleStep={0.035}>
          {PROGRAMS.map((p, i) => (
            <article key={p.n} className={`${styles.pcard} ${tones[i]}`} aria-labelledby={`pc-${p.n}`}>
              <div className={styles.pcMain}>
                <div className={styles.pcTop}>
                  <OutlineText as="span" mode="hover" className={styles.pcNum} aria-hidden="true">{p.n}</OutlineText>
                  <span className={styles.pcTag}>{p.tag}</span>
                </div>
                <h3 id={`pc-${p.n}`} className={styles.pcTitle}>{p.title}</h3>
                <p className={styles.pcText}>{p.text}</p>
                <ul className={styles.pcSpecs}>{p.specs.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div className={styles.pcPhoto}>
                <Photo file={p.img} alt={p.alt} sizes="(max-width: 900px) 92vw, 40vw" w={1200} className={styles.gray} />
              </div>
            </article>
          ))}
        </StackingCards>
      </div>
    </section>
  );
}

export function Coaches() {
  return (
    <section className={styles.coachSec} id="huan-luyen-vien" aria-labelledby="hlv-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>04</span> Huấn luyện viên</p>
          <h2 id="hlv-title" className={styles.h2Big}>
            <span className={styles.h2Solid}>Bốn vai trò,</span>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>một sàn tập.</OutlineText>
          </h2>
          <p className={styles.lede}>Mỗi huấn luyện viên phụ trách một mảng. Bạn có thể lọc lịch lớp theo người đứng lớp ở phần Lịch lớp tuần.</p>
        </header>
        <ul className={styles.coachGrid}>
          {COACHES.map((c) => (
            <li key={c.id} className={styles.coachFull} data-sg="slam">
              <Coach id={c.id} size={120} />
              <h3>{c.nick}</h3>
              <p className={styles.coachRole}>{c.role}</p>
              <p>{c.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Session() {
  return (
    <section className={styles.session} id="mot-buoi-tap" aria-labelledby="buoi-title">
      <GrainOverlay opacity={0.12} blendMode="multiply" />
      <div className={styles.wrap}>
        <p className={styles.label} data-sg="stencil"><span>05</span> Một buổi tập</p>
        <h2 id="buoi-title" className={styles.beatTitle}>60 phút, năm chặng.</h2>
        <SessionClock />
        <div className={styles.boardWrap}>
          <p className={styles.boardCap}>Bảng bài trong lớp, ví dụ một buổi WOD</p>
          <ul className={styles.board} aria-label="Ví dụ bảng bài trên tường lớp">
            {BOARD.map((l, i) => (
              <TextScramble key={l} as="li" className={i === 0 ? styles.boardHead : undefined} wordStagger={0.09} duration={0.6}>{l}</TextScramble>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Rules() {
  return (
    <section className={styles.rules} id="quy-dinh" aria-labelledby="qd-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>09</span> Quy định và an toàn</p>
          <h2 id="qd-title" className={styles.h2Big}>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>Khởi động,</OutlineText>
            <span className={styles.h2Solid}>rồi mới tăng tải.</span>
          </h2>
        </header>
        <div className={styles.rulesGrid}>
          <div>
            <h3 className={styles.rulesH}>Quy định trong lớp</h3>
            <ol className={styles.ruleList}>{RULES.map((r) => <li key={r} data-sg="slam">{r}</li>)}</ol>
          </div>
          <div>
            <h3 className={styles.rulesH}>Khởi động 10 phút</h3>
            <ol className={styles.warmList}>{WARM.map((w, i) => <li key={w.t} data-sg="slam"><span>{i + 1}</span><b>{w.t}</b>{w.d}</li>)}</ol>
            <p className={styles.small}>Tập luyện có rủi ro chấn thương. Nếu bạn có bệnh tim, huyết áp, chấn thương hoặc đang mang thai, hãy hỏi bác sĩ trước khi tập cường độ cao. Huấn luyện viên không thay thế tư vấn y tế.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Space() {
  return (
    <section className={styles.space} id="khong-gian" aria-labelledby="kg-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>08</span> Thiết bị và không gian</p>
          <h2 id="kg-title" className={styles.h2Big}>
            <span className={styles.h2Solid}>Sàn thật.</span>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>Dụng cụ thật.</OutlineText>
          </h2>
          <p className={styles.lede}>Rack squat, thanh đòn và đĩa, kettlebell, hộp nhảy, dàn xà, dây thừng, máy chèo, thảm mobility. Bấm một khu trên sơ đồ để xem lớp nào tập ở đó.</p>
        </header>
        <FloorPlan />
        <ul className={styles.gallery}>
          {GALLERY.map((g, i) => (
            <li key={g.n} className={`${styles.gItem} ${styles[`g${i + 1}` as keyof typeof styles]}`} style={{ aspectRatio: g.ratio }}>
              <figure className={styles.gFig} data-cursor="Xem" data-sg="wipe">
                <Photo file={g.img} alt={g.alt} sizes="(max-width: 700px) 92vw, 33vw" w={1200} pos={"crop" in g && g.crop ? "50% 0%" : undefined} className={`${styles.gray} ${"crop" in g && g.crop ? styles.cropTop : ""}`} />
                <figcaption><b>{g.n}</b> {g.label}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className={styles.pricing} id="goi-tap" aria-labelledby="gia-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>10</span> Gói tập</p>
          <h2 id="gia-title" className={styles.h2Big}>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>Chọn cách</OutlineText>
            <span className={styles.h2Solid}>bạn muốn tập.</span>
          </h2>
          <p className={styles.lede}>Buổi tập thử, thẻ theo buổi và gói theo tháng. Giá tham khảo, một mức, không gạch giá; điều kiện chi tiết từng gói được xác nhận khi bạn trao đổi với SẬT.</p>
        </header>
        <ul className={styles.plans}>
          {PLANS.map((p, i) => (
            <li key={p.id} className={`${styles.plan} ${"hot" in p && p.hot ? styles.planHot : ""}`}>
              <p className={styles.planIdx}>{String(i + 1).padStart(2, "0")} / {p.per}</p>
              <h3 className={styles.planName}>{p.name}</h3>
              <p className={styles.planPrice}><span className={styles.planNum}>{vnd(p.price).replace(/\s?₫/, "")}</span><span className={styles.planCur}>₫</span></p>
              <p className={styles.planNote}>{p.note}</p>
              <ul className={styles.planFeats}>{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
              <a className={`${styles.btn} ${"hot" in p && p.hot ? styles.btnInk : styles.btnAcid} ${styles.btnBlock}`} href={CONSULT} data-shake>Hỏi gói này</a>
            </li>
          ))}
        </ul>
        <p className={styles.small}>Giá tham khảo, có thể thay đổi. Gói tính theo VNĐ, đã gồm sử dụng dụng cụ trong lớp.</p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className={styles.faq} id="hoi-dap" aria-labelledby="faq-title">
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>11</span> Hỏi đáp</p>
          <h2 id="faq-title" className={styles.h2Big}>
            <span className={styles.h2Solid}>Hỏi trước</span>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>khi tập thử.</OutlineText>
          </h2>
        </header>
        <div className={styles.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.qa}>
              <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className={styles.final} id="tap-thu" aria-labelledby="cta-title">
      <div className={styles.finalMedia} aria-hidden="true">
        <Photo file="suong-ta" alt="" sizes="100vw" pos="50% 60%" className={styles.gray} />
        <div className={styles.finalShade} />
        <GrainOverlay opacity={0.14} blendMode="overlay" />
      </div>
      <div className={`${styles.wrap} ${styles.finalInner}`}>
        <p className={styles.label} data-sg="stencil"><span>12</span> Đăng ký tập thử</p>
        <h2 id="cta-title" className={styles.finalTitle}>
          <OutlineText as="span" mode="scroll" start="top 92%" end="top 45%" className={styles.finalOut}>Tạ xuống sàn.</OutlineText>
          <span className={styles.finalSolid}>Tập thử một buổi.</span>
        </h2>
        <p className={styles.lede}>Buổi tập thử 180.000 ₫, vào một lớp bất kỳ trong lịch. Kể cho SẬT nghe bạn đã tập gì, muốn tập gì và có gì cần lưu ý; huấn luyện viên sẽ gợi ý lớp phù hợp và xác nhận chỗ.</p>
        <ol className={styles.trialSteps}>
          {TRIAL_STEPS.map((s) => (
            <li key={s.n} data-sg="slam"><span aria-hidden="true">{s.n}</span><b>{s.t}</b><p>{s.d}</p></li>
          ))}
        </ol>
        <p className={styles.bring}><b>Mang theo</b> {BRING.join(" · ")}</p>
        <div className={styles.finalCtas}>
          <a className={`${styles.btn} ${styles.btnAcid} ${styles.btnXl}`} href={CONSULT} data-shake data-cursor="Gửi" data-testid="trial-cta">Đăng ký tập thử</a>
          <a className={`${styles.btn} ${styles.btnGhost} ${styles.btnXl}`} href="#lich-lop">Xem lịch lớp tuần</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footGrid}>
          <div className={styles.footBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/sat-gym/identity/logo-primary-reversed.svg" alt="SẬT Gym" width={200} height={195} />
            <p>Box CrossFit và strength ở Quận Ngũ Hành Sơn, Đà Nẵng. Lớp 06:00 đến 20:00 mỗi ngày.</p>
          </div>
          <nav aria-label="Liên kết chân trang">
            <h2>Trong trang</h2>
            <ul>
              <li><a href="#chuong-trinh">Chương trình</a></li>
              <li><a href="#lich-lop">Lịch lớp tuần</a></li>
              <li><a href="#huan-luyen-vien">Huấn luyện viên</a></li>
              <li><a href="#goi-tap">Gói tập</a></li>
              <li><a href="#tap-thu">Đăng ký tập thử</a></li>
              <li><a href="#hoi-dap">Hỏi đáp</a></li>
            </ul>
          </nav>
          <div>
            <h2>Liên hệ</h2>
            <ul>
              <li><a href="mailto:xinchao@sat-gym.example">xinchao@sat-gym.example</a></li>
              <li><span translate="no">0236 000 0000</span></li>
              <li><span>Quận Ngũ Hành Sơn, Đà Nẵng</span></li>
              <li><a href={CONSULT}>Đăng ký tập thử</a></li>
            </ul>
          </div>
        </div>
        <p className={styles.footSafe}>Tập luyện có rủi ro chấn thương. Hãy khởi động, chọn mức tải kiểm soát được và hỏi bác sĩ nếu bạn có bệnh nền hoặc chấn thương. Nội dung trên trang chỉ để tham khảo, không thay thế hướng dẫn trực tiếp.</p>
        <div className={styles.footBase}>
          <span translate="no">© SẬT Gym</span>
          <a href="/demos/sat-gym/credits">Ảnh &amp; ghi công</a>
          <span>Website do {siteConfig.fullName} thiết kế</span>
        </div>
      </div>
      <p className={styles.footWord} aria-hidden="true">SẬT</p>
    </footer>
  );
}
