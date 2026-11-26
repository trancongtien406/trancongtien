import { buildConsultHref } from "@/features/showroom/consultation";
import { ScrollScrubText } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import { PRICES, fmtRange } from "../data/pricing";
import { COST_FACTORS, POLICIES, SERVICE_LIST, TEAM } from "../data/content";
import styles from "../brand.module.css";
import { Avatar } from "./Avatar";
import { CareNavigator } from "./CareNavigator";
import { Checklist } from "./Checklist";
import { EventLink } from "./EventLink";
import { Faq } from "./Faq";
import { Photo } from "./Photo";
import { Process } from "./Process";
import { Scheduler } from "./Scheduler";
import { TeethMap } from "./TeethMap";

const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className={styles.eyebrow}>{children}</p>;

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="h1">
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <span className={styles.rule} data-mc="rule" />
          <p className={styles.eyebrow} data-mc="eyebrow">Phòng khám nha khoa · Quận Hải Châu, Đà Nẵng</p>
          <h1 id="h1" className={styles.h1}>
            <span className={styles.h1Line} data-mc="h1a">Khám răng rõ ràng,</span>
            <span className={`${styles.h1Line} ${styles.h1Accent}`} data-mc="h1b">chi phí nói trước.</span>
          </h1>
          <p className={styles.lead} data-mc="desc">Phòng khám nha khoa cho người lớn và gia đình: khám và lấy cao răng, trám, nhổ răng, niềng, tẩy trắng và tư vấn implant. Bác sĩ giải thích tình trạng và các phương án, báo chi phí dự kiến trước khi bạn quyết định.</p>
          <div className={styles.ctaRow} data-mc="cta">
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="#appointment">Đặt lịch khám <span aria-hidden="true">→</span></a>
            <a className={styles.btnText} href="#services">Xem dịch vụ</a>
          </div>
          <dl className={styles.facts} data-mc="facts">
            <div><dt>Từ 150.000₫</dt><dd>Khám tổng quát, giá tham khảo</dd></div>
            <div><dt>Thứ 2 – Thứ 7</dt><dd>8:00 – 11:30 và 13:30 – 17:00</dd></div>
            <div><dt>Báo giá trước</dt><dd>Chi phí dự kiến được báo trước khi điều trị</dd></div>
          </dl>
          <p className={styles.urgent} role="note" data-mc="caption"><b>Đau dữ dội, sưng lan mặt hoặc cổ, khó thở, chảy máu không cầm?</b> Hãy đến cơ sở cấp cứu hoặc gọi 115, đừng chờ lịch hẹn.</p>
        </div>
        <figure className={styles.heroFig}>
          <div className={styles.heroImg}>
            <Photo name="ghe-nha-khoa-hero" alt="Ghế nha khoa nhìn từ phía sau trong phòng khám sáng có cửa sổ lớn" sizes="(max-width: 900px) 100vw, 46vw" priority size={1200} position="50% 55%" />
            <span className={styles.cover} data-mc="cover" />
          </div>
          <figcaption className={styles.caption}>Phòng khám nha khoa Miền Cười</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className={styles.section} id="services" aria-labelledby="sv-h">
      <div className={styles.wrap}>
        <div className={styles.headSplit}>
          <div>
            <Eyebrow>01 / Dịch vụ</Eyebrow>
            <h2 id="sv-h" className={styles.h2}>Sáu nhóm dịch vụ nha khoa.</h2>
          </div>
          <p className={styles.body}>Chọn vùng răng bạn quan tâm trên sơ đồ để biết nên hỏi về dịch vụ nào, hoặc xem từng dịch vụ bên dưới: mô tả chung, thời lượng và giá tham khảo.</p>
        </div>
        <TeethMap />
        <ul className={styles.svGrid}>
          {SERVICE_LIST.map((s) => (
            <li key={s.n} className={styles.svCard} data-mc-reveal>
              <div className={styles.svImg}><Photo name={s.img} alt={s.alt} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 400px" position={s.pos} size={600} /></div>
              <p className={styles.svTag}>{s.n} / {s.tag}</p>
              <h3 className={styles.h3}>{s.title}</h3>
              <p className={styles.bodySm}>{s.body}</p>
              <ul className={styles.svMeta}>{s.meta.map((m) => <li key={m}>{m}</li>)}</ul>
              <EventLink className={styles.linkArrow} href="#appointment" event="mc:scheduler" detail={{ serviceId: s.svc, source: "service" }}>Xem lịch khám <span aria-hidden="true">→</span></EventLink>
            </li>
          ))}
        </ul>
        <p className={styles.helper}>Nội dung chỉ mang tính thông tin chung, không có giá giảm, tỷ lệ thành công hay cam kết điều trị. Phương án cụ thể do bác sĩ quyết định sau khi khám.</p>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className={`${styles.section} ${styles.frostBg}`} id="process" aria-labelledby="pc-h">
      <div className={styles.wrap}>
        <div className={styles.headSplit}>
          <div><Eyebrow>02 / Quy trình khám</Eyebrow><h2 id="pc-h" className={styles.h2}>Một buổi khám đi qua sáu bước.</h2></div>
          <p className={styles.body}>Biết trước từng bước, mất bao lâu và ai làm gì giúp bạn bớt lo lắng. Quy trình có thể thay đổi theo tình trạng răng miệng của từng người.</p>
        </div>
        <Process />
      </div>
    </section>
  );
}

export function Prepare() {
  return (
    <section className={styles.section} id="prepare" aria-labelledby="pp-h">
      <div className={styles.wrap}>
        <div className={styles.twoCol}>
          <div className={styles.intro}>
            <Eyebrow>03 / Chuẩn bị</Eyebrow>
            <h2 id="pp-h" className={styles.h2}>Mang gì khi đến khám lần đầu.</h2>
            <p className={styles.body}>Không cần nhịn ăn hay chuẩn bị phức tạp. Đánh dấu những mục bạn đã sẵn sàng; danh sách chỉ nằm trên trình duyệt của bạn.</p>
          </div>
          <Checklist />
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className={`${styles.section} ${styles.frostBg}`} id="pricing" aria-labelledby="pr-h">
      <div className={styles.wrap}>
        <div className={styles.twoCol}>
          <div className={styles.intro}>
            <Eyebrow>04 / Chi phí tham khảo</Eyebrow>
            <h2 id="pr-h" className={styles.h2}>Rõ ràng hơn về chi phí.</h2>
            <p className={styles.body}>Chi phí điều trị cần được trao đổi dựa trên tình trạng cụ thể và phương án được thống nhất. Bảng dưới đây là mức giá tham khảo cho lượt khám và một số dịch vụ.</p>
            <p className={styles.costLab}>Chi phí thực tế phụ thuộc vào</p>
            <ul className={styles.costList}>{COST_FACTORS.map((c) => <li key={c}>{c}</li>)}</ul>
            <div className={styles.priceImg}><Photo name="nu-cuoi-hong" alt="Cận cảnh nụ cười với son hồng, không thấy mắt" sizes="(max-width: 900px) 60vw, 28vw" position="50% 60%" /></div>
          </div>
          <div>
            <table className={styles.table}>
              <caption>Bảng giá tham khảo</caption>
              <thead><tr><th scope="col">Dịch vụ</th><th scope="col">Đơn vị</th><th scope="col">Giá tham khảo</th></tr></thead>
              <tbody>
                {PRICES.map((r) => (
                  <tr key={r.service}><th scope="row">{r.service}</th><td data-l="Đơn vị">{r.unit}</td><td data-l="Giá tham khảo" className={styles.priceCell}>{fmtRange(r)}</td></tr>
                ))}
              </tbody>
            </table>
            <p className={styles.fakeBlock}>Mức giá chỉ mang tính tham khảo, không phải báo giá điều trị. Chi phí dự kiến được bác sĩ báo sau khi thăm khám và trước khi điều trị.</p>
            <a className={styles.linkArrow} href="#appointment">Chọn lịch thăm khám <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NavigatorSection() {
  return (
    <section className={`${styles.section} ${styles.mintBg}`} id="care-navigator" aria-labelledby="nav-h">
      <div className={styles.wrap}>
        <span className={styles.divider} data-mc="divider" />
        <div className={styles.twoCol}>
          <div className={styles.intro} data-mc="intro">
            <Eyebrow>05 / Kiểm tra nhanh</Eyebrow>
            <h2 id="nav-h" className={styles.h2}>Khi nào nên khám sớm?</h2>
            <p className={styles.body}>Chọn nhu cầu của bạn và đánh dấu các dấu hiệu đang gặp. Công cụ cho biết nên đặt lịch thường, nên liên hệ phòng khám sớm hay cần đến cơ sở cấp cứu.</p>
            <p className={styles.disclaimer}>Công cụ này chỉ mang tính định hướng, không đánh giá bệnh lý, không đưa ra chẩn đoán và không thay thế tư vấn của bác sĩ.</p>
          </div>
          <CareNavigator />
        </div>
      </div>
    </section>
  );
}

export function AppointmentSection({ consultHref }: { consultHref: string }) {
  return (
    <section className={`${styles.section} ${styles.blueBg}`} id="appointment" aria-labelledby="ap-h">
      <div className={styles.wrap}>
        <span className={styles.divider} data-mc="divider" />
        <div className={styles.headSplit}>
          <div><Eyebrow>06 / Đặt lịch khám</Eyebrow><h2 id="ap-h" className={styles.h2}>Chọn dịch vụ, bác sĩ và giờ khám.</h2></div>
          <p className={styles.body}>Lựa chọn dịch vụ, bác sĩ và khung giờ để có bản tóm tắt lịch hẹn. Không có trường họ tên, số điện thoại hay bệnh sử. Lịch làm việc: Thứ 2 đến Thứ 7, nghỉ Chủ nhật.</p>
        </div>
        <Scheduler consultHref={consultHref} />
      </div>
    </section>
  );
}

const ABOUT = "Miền Cười là phòng khám nha khoa nhỏ ở Quận Hải Châu, Đà Nẵng. Chúng tôi tin việc chăm sóc răng miệng nên bắt đầu bằng sự thấu hiểu thay vì cảm giác lo lắng: bác sĩ lắng nghe trước, giải thích bằng lời dễ hiểu, nói rõ phương án và chi phí, rồi để bạn quyết định.";

export function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="ab-h">
      <div className={styles.wrap}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <Eyebrow>07 / Về phòng khám</Eyebrow>
            <h2 id="ab-h" className={styles.h2}>Chăm sóc bắt đầu từ sự thấu hiểu.</h2>
            <ScrollScrubText as="p" className={`${styles.body} ${styles.scrub}`}>{ABOUT}</ScrollScrubText>
            <ul className={styles.aboutPrinciples}>
              <li><b>Hiểu trước khi quyết định.</b> Tình trạng và các phương án được giải thích trước khi chọn.</li>
              <li><b>Thông tin rõ ràng.</b> Chi phí, quy trình và điều cần lưu ý được nói cụ thể.</li>
              <li><b>Tôn trọng từng người.</b> Mỗi người có nhu cầu và mức độ thoải mái khác nhau.</li>
            </ul>
          </div>
          <figure className={styles.aboutFig}>
            <div className={styles.aboutImg}><Photo name="phong-kham-trong" alt="Phòng khám nha khoa trống, sạch và sáng" sizes="(max-width: 900px) 92vw, 38vw" position="50% 100%" /></div>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section className={`${styles.section} ${styles.frostBg}`} id="team" aria-labelledby="tm-h">
      <div className={styles.wrap}>
        <div className={styles.headSplit}>
          <div><Eyebrow>08 / Đội ngũ</Eyebrow><h2 id="tm-h" className={styles.h2}>Ba vai trò bác sĩ.</h2></div>
          <p className={styles.body}>Mỗi bác sĩ phụ trách một nhóm dịch vụ và làm việc theo ca cố định. Bác sĩ cụ thể được xác nhận khi bạn đặt lịch.</p>
        </div>
        <ul className={styles.teamGrid}>
          {TEAM.map((t) => (
            <li key={t.id} className={styles.teamCard} data-mc-reveal>
              <div className={styles.avatar}><Avatar id={t.id} /></div>
              <h3 className={styles.h3}>{t.name}</h3>
              <p className={styles.role}>{t.role}</p>
              <p className={styles.bodySm}>{t.body}</p>
              <EventLink className={styles.linkArrow} href="#appointment" event="mc:scheduler" detail={{ serviceId: t.service, doctorId: t.id, source: "team" }}>Xem lịch khám <span aria-hidden="true">→</span></EventLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Environment() {
  return (
    <section className={styles.section} id="space" aria-labelledby="sp-h">
      <div className={styles.wrap}>
        <div className={styles.headSplit}>
          <div><Eyebrow>09 / Không gian</Eyebrow><h2 id="sp-h" className={styles.h2}>Phòng khám sáng, gọn, riêng tư.</h2></div>
          <p className={styles.body}>Phòng khám có các phòng thăm khám tách riêng, ánh sáng dịu và khu vực trao đổi với bác sĩ trước khi điều trị.</p>
        </div>
        <div className={styles.gallery}>
          <figure className={styles.gBig}><div className={styles.gImg}><Photo name="phong-tham-kham" alt="Phòng thăm khám với hai ghế nha khoa xanh dương và thiết bị" sizes="(max-width: 900px) 92vw, 62vw" size={1200} position="50% 55%" /></div><figcaption className={styles.caption}>Phòng thăm khám</figcaption></figure>
          <figure className={styles.gA}><div className={styles.gImg}><Photo name="ghe-xanh-trang" alt="Ghế nha khoa xanh trắng trong phòng khám sáng" sizes="(max-width: 900px) 46vw, 30vw" size={600} position="50% 60%" /></div><figcaption className={styles.caption}>Ghế khám</figcaption></figure>
          <figure className={styles.gB}><div className={styles.gImg}><Photo name="phong-kham-trang" alt="Phòng khám nha khoa tông trắng xám với ghế và đèn" sizes="(max-width: 900px) 46vw, 30vw" size={600} position="50% 55%" /></div><figcaption className={styles.caption}>Chi tiết phòng khám</figcaption></figure>
        </div>
      </div>
    </section>
  );
}

export function PolicySection() {
  return (
    <section className={`${styles.section} ${styles.frostBg}`} id="policy" aria-labelledby="po-h">
      <div className={styles.wrap}>
        <div className={styles.headSplit}>
          <div><Eyebrow>10 / Chính sách</Eyebrow><h2 id="po-h" className={styles.h2}>Những điều nên biết trước khi đến.</h2></div>
        </div>
        <dl className={styles.policyGrid}>
          {POLICIES.map((p) => (<div key={p.h} data-mc-reveal><dt>{p.h}</dt><dd>{p.p}</dd></div>))}
        </dl>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className={styles.section} id="faq" aria-labelledby="fq-h">
      <div className={styles.wrap}>
        <div className={styles.twoCol}>
          <div className={styles.intro}>
            <Eyebrow>11 / Hỏi &amp; đáp</Eyebrow>
            <h2 id="fq-h" className={styles.h2}>Những điều bạn có thể đang băn khoăn.</h2>
            <p className={styles.body}>Một số thông tin giúp bạn chuẩn bị tốt hơn trước khi trao đổi với bác sĩ nha khoa.</p>
          </div>
          <Faq />
        </div>
      </div>
    </section>
  );
}

export function Closing({ consultHref }: { consultHref: string }) {
  return (
    <section className={styles.closing} aria-labelledby="cl-h">
      <div className={`${styles.wrap} ${styles.closingGrid}`}>
        <div>
          <p className={`${styles.eyebrow} ${styles.onInk}`}>Miền Cười · Quận Hải Châu, Đà Nẵng</p>
          <h2 id="cl-h" className={styles.h2Big}>Một bước nhỏ.<br />Để hiểu răng mình hơn.</h2>
          <p className={`${styles.body} ${styles.onInk}`}>Đặt lịch khám tổng quát, hoặc chọn vùng răng bạn quan tâm để chuẩn bị câu hỏi cho bác sĩ.</p>
          <p className={`${styles.body} ${styles.onInk} ${styles.closeUrgent}`}><b>Khẩn cấp:</b> khó thở, khó nuốt, chảy máu không cầm, sưng lan mặt hoặc cổ, chấn thương nặng vùng mặt. Đến cơ sở cấp cứu hoặc gọi 115.</p>
        </div>
        <div className={styles.closingCta}>
          <a className={`${styles.btn} ${styles.btnLight2}`} href="#appointment">Đặt lịch khám</a>
          <a className={`${styles.btn} ${styles.btnGhost}`} href="#services">Xem dịch vụ</a>
          <a className={styles.consultLink} href={consultHref}>Chuyển sang form liên hệ <span aria-hidden="true">→</span></a>
        </div>
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
          <img src="/images/demos/mien-cuoi/identity/logo-reversed.svg" alt="Miền Cười, phòng khám nha khoa" width={224} height={128} />
          <p>Hiểu răng mình. An tâm chăm sóc.</p>
        </div>
        <nav aria-label="Chân trang" className={styles.footNav}>
          <ul>
            <li><a href="#services">Dịch vụ</a></li>
            <li><a href="#process">Quy trình khám</a></li>
            <li><a href="#pricing">Chi phí</a></li>
            <li><a href="#appointment">Đặt lịch khám</a></li>
            <li><a href="#policy">Chính sách</a></li>
            <li><a href="#faq">Hỏi &amp; đáp</a></li>
            <li><a href={consultHref}>Liên hệ</a></li>
          </ul>
        </nav>
        <div className={styles.footNote}>
          <p>Quận Hải Châu, Đà Nẵng · Thứ 2 – Thứ 7, 8:00 – 11:30 và 13:30 – 17:00 · Đặt lịch: 0236 000 0000 · lienhe@mien-cuoi.example</p>
          <p>Nội dung trên trang chỉ mang tính thông tin, không thay thế tư vấn, chẩn đoán hay điều trị y tế. Mức giá chỉ để tham khảo. Cấp cứu: gọi 115.</p>
          <p><a href="/demos/mien-cuoi/credits">Ảnh &amp; ghi công</a> · Website do {siteConfig.fullName} thiết kế</p>
          <p>© 2026 <span translate="no">Miền Cười</span></p>
        </div>
      </div>
    </footer>
  );
}

export { buildConsultHref };
