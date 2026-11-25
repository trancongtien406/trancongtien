import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import { PRICES, fmtRange } from "../data/pricing";
import { PRINCIPLES, PROCESS, SERVICE_LIST, TEAM } from "../data/content";
import styles from "../brand.module.css";
import { Avatar } from "./Avatar";
import { CareNavigator } from "./CareNavigator";
import { EventLink } from "./EventLink";
import { Faq } from "./Faq";
import { Photo } from "./Photo";
import { Scheduler } from "./Scheduler";

const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className={styles.eyebrow}>{children}</p>;

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="h1">
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <span className={styles.rule} data-mc="rule" />
          <p className={styles.eyebrow} data-mc="eyebrow">01 / Chăm sóc răng miệng</p>
          <h1 id="h1" className={styles.h1}>
            <span className={styles.h1Line} data-mc="h1a">Hiểu răng mình.</span>
            <span className={`${styles.h1Line} ${styles.h1Accent}`} data-mc="h1b">An tâm chăm sóc.</span>
          </h1>
          <p className={styles.lead} data-mc="desc">Mỗi nụ cười có một câu chuyện riêng. Bắt đầu bằng việc hiểu nhu cầu chăm sóc của bạn, tìm hiểu các phương án phù hợp và chuẩn bị cho một cuộc thăm khám rõ ràng hơn.</p>
          <div className={styles.ctaRow} data-mc="cta">
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="#care-navigator">Tìm hướng chăm sóc <span aria-hidden="true">→</span></a>
            <a className={styles.btnText} href="#services">Khám phá dịch vụ</a>
          </div>
          <p className={styles.micro}>Lắng nghe · Giải thích · Tôn trọng lựa chọn</p>
        </div>
        <figure className={styles.heroFig}>
          <div className={styles.heroImg}>
            <Photo name="ghe-nha-khoa-hero" alt="Ghế nha khoa nhìn từ phía sau trong phòng khám sáng có cửa sổ lớn" sizes="(max-width: 900px) 100vw, 46vw" priority size={1200} position="50% 55%" />
            <span className={styles.cover} data-mc="cover" />
          </div>
          <figcaption className={styles.caption} data-mc="caption">FIG. 01 · Không gian nha khoa</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Principles() {
  return (
    <section className={styles.principles} aria-label="Ba nguyên tắc chăm sóc">
      <ul className={`${styles.wrap} ${styles.principleGrid}`}>
        {PRINCIPLES.map((p) => (
          <li key={p.n} data-mc-reveal>
            <span className={styles.num}>{p.n}</span>
            <h2 className={styles.h4}>{p.title}</h2>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
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
            <Eyebrow>02 / Care Navigator</Eyebrow>
            <h2 id="nav-h" className={styles.h2}>Bạn muốn chăm sóc điều gì?</h2>
            <p className={styles.body}>Không phải ai cũng biết mình nên bắt đầu từ dịch vụ nào. Hãy chọn nhu cầu hiện tại để tìm hiểu hướng thăm khám và những điều có thể chuẩn bị.</p>
            <p className={styles.disclaimer}>Công cụ này chỉ mang tính định hướng, không đánh giá bệnh lý, không đưa ra chẩn đoán và không thay thế tư vấn của bác sĩ.</p>
          </div>
          <CareNavigator />
        </div>
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
            <Eyebrow>03 / Dịch vụ</Eyebrow>
            <h2 id="sv-h" className={styles.h2}>Chăm sóc theo nhu cầu của bạn.</h2>
          </div>
          <p className={styles.body}>Tìm hiểu những nhóm dịch vụ nha khoa thường gặp, từ chăm sóc định kỳ đến các phương án cần được thăm khám và trao đổi chuyên sâu.</p>
        </div>
        <ul className={styles.svGrid}>
          {SERVICE_LIST.map((s) => (
            <li key={s.n} className={styles.svCard} data-mc-reveal>
              <div className={styles.svImg}><Photo name={s.img} alt={s.alt} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 400px" position={s.pos} size={600} /></div>
              <p className={styles.svTag}>{s.n} / {s.tag}</p>
              <h3 className={styles.h3}>{s.title}</h3>
              <p className={styles.bodySm}>{s.body}</p>
              <EventLink className={styles.linkArrow} href="#care-navigator" event="mc:navigator" detail={{ need: s.need }}>Tìm hiểu hướng chăm sóc <span aria-hidden="true">↗</span></EventLink>
            </li>
          ))}
        </ul>
        <p className={styles.helper}>Nội dung chỉ mang tính thông tin, không có giá giảm, tỷ lệ thành công hay cam kết điều trị.</p>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className={`${styles.section} ${styles.frostBg}`} id="about" aria-labelledby="ab-h">
      <div className={styles.wrap}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <Eyebrow>04 / Về Miền Cười</Eyebrow>
            <h2 id="ab-h" className={styles.h2}>Chăm sóc bắt đầu từ sự thấu hiểu.</h2>
            <p className={styles.body}>Miền Cười được hình dung từ một mong muốn giản dị: việc chăm sóc răng miệng nên bắt đầu bằng sự thấu hiểu, thay vì cảm giác lo lắng. Mỗi người có một câu chuyện, một nhu cầu và những băn khoăn riêng khi đến nha khoa. Chúng tôi tin rằng thông tin rõ ràng, sự lắng nghe và quyền được lựa chọn là nền tảng của một trải nghiệm chăm sóc tốt. Từ việc khám định kỳ đến tìm hiểu những phương án chăm sóc chuyên sâu, mọi quyết định đều cần được trao đổi cẩn thận. Miền Cười hướng đến một không gian nhẹ nhàng, nơi bạn có thể hiểu hơn về sức khoẻ răng miệng của mình.</p>
            <p className={styles.helper}>Miền Cười hướng đến cách chăm sóc răng miệng rõ ràng, nhẹ nhàng và không áp lực.</p>
          </div>
          <figure className={styles.aboutFig}>
            <div className={styles.aboutImg}><Photo name="phong-kham-trong" alt="Phòng khám nha khoa trống, sạch và sáng" sizes="(max-width: 900px) 92vw, 38vw" position="50% 100%" /></div>
          </figure>
        </div>
        <ol className={styles.process}>
          {PROCESS.map((p) => (
            <li key={p.n} data-mc-reveal><span className={styles.num}>{p.n}</span><h3 className={styles.h4}>{p.title}</h3><p>{p.body}</p></li>
          ))}
        </ol>
        <p className={styles.helper}>Quy trình có thể thay đổi theo tình trạng răng miệng của từng người.</p>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section className={styles.section} id="team" aria-labelledby="tm-h">
      <div className={styles.wrap}>
        <div className={styles.headSplit}>
          <div><Eyebrow>05 / Đội ngũ</Eyebrow><h2 id="tm-h" className={styles.h2}>Những vai trò trong hành trình chăm sóc.</h2></div>
          <p className={styles.body}>Các vai trò dưới đây giúp bạn biết nên bắt đầu từ đâu khi chọn lịch thăm khám.</p>
        </div>
        <ul className={styles.teamGrid}>
          {TEAM.map((t) => (
            <li key={t.id} className={styles.teamCard} data-mc-reveal>
              <div className={styles.avatar}><Avatar id={t.id} /></div>
              <h3 className={styles.h3}>{t.name}</h3>
              <p className={styles.role}>{t.role}</p>
              <p className={styles.bodySm}>{t.body}</p>
              <EventLink className={styles.linkArrow} href="#appointment" event="mc:scheduler" detail={{ serviceId: t.service, doctorId: t.id, source: "team" }}>Xem lịch hẹn <span aria-hidden="true">→</span></EventLink>
            </li>
          ))}
        </ul>
        <p className={styles.helper}>Tên, hình ảnh, vai trò và lịch làm việc của các nhân vật không đại diện cho bác sĩ hoặc cơ sở y tế thực tế.</p>
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
            <Eyebrow>06 / Chi phí</Eyebrow>
            <h2 id="pr-h" className={styles.h2}>Rõ ràng hơn về chi phí.</h2>
            <p className={styles.body}>Chi phí chăm sóc răng miệng cần được trao đổi dựa trên tình trạng cụ thể và phương án được thống nhất. Bảng dưới đây là mức giá tham khảo.</p>
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
            <p className={styles.fakeBlock}>Tất cả mức giá chỉ mang tính tham khảo, không phải báo giá điều trị. Chi phí thực tế cần được xác định sau khi thăm khám tại cơ sở nha khoa.</p>
            <a className={styles.linkArrow} href="#appointment">Xem cách chọn lịch thăm khám <span aria-hidden="true">→</span></a>
          </div>
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
          <div><Eyebrow>07 / Appointment Scheduler</Eyebrow><h2 id="ap-h" className={styles.h2}>Chuẩn bị cho một cuộc thăm khám.</h2></div>
          <p className={styles.body}>Lựa chọn nhu cầu chăm sóc, bác sĩ và khung giờ để chuẩn bị tóm tắt lịch hẹn. Không có trường họ tên, số điện thoại hay bệnh sử.</p>
        </div>
        <Scheduler consultHref={consultHref} />
      </div>
    </section>
  );
}

export function Environment() {
  return (
    <section className={styles.section} id="space" aria-labelledby="sp-h">
      <div className={styles.wrap}>
        <div className={styles.headSplit}>
          <div><Eyebrow>08 / Không gian</Eyebrow><h2 id="sp-h" className={styles.h2}>Một không gian để cảm thấy thoải mái hơn.</h2></div>
          <p className={styles.body}>Ánh sáng dịu, bố cục gọn gàng và không gian trao đổi riêng tư là những yếu tố được dùng để hình dung trải nghiệm chăm sóc tại Miền Cười.</p>
        </div>
        <div className={styles.gallery}>
          <figure className={styles.gBig}><div className={styles.gImg}><Photo name="phong-tham-kham" alt="Phòng thăm khám với hai ghế nha khoa xanh dương và thiết bị" sizes="(max-width: 900px) 92vw, 62vw" size={1200} position="50% 55%" /></div><figcaption className={styles.caption}>FIG. 02 · Không gian thăm khám</figcaption></figure>
          <figure className={styles.gA}><div className={styles.gImg}><Photo name="ghe-xanh-trang" alt="Ghế nha khoa xanh trắng trong phòng khám sáng" sizes="(max-width: 900px) 46vw, 30vw" size={600} position="50% 60%" /></div><figcaption className={styles.caption}>FIG. 03 · Khu vực thăm khám</figcaption></figure>
          <figure className={styles.gB}><div className={styles.gImg}><Photo name="phong-kham-trang" alt="Phòng khám nha khoa tông trắng xám với ghế và đèn" sizes="(max-width: 900px) 46vw, 30vw" size={600} position="50% 55%" /></div><figcaption className={styles.caption}>FIG. 04 · Chi tiết phòng khám</figcaption></figure>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className={`${styles.section} ${styles.frostBg}`} id="faq" aria-labelledby="fq-h">
      <div className={styles.wrap}>
        <div className={styles.twoCol}>
          <div className={styles.intro}>
            <Eyebrow>09 / Hỏi &amp; đáp</Eyebrow>
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
          <p className={`${styles.eyebrow} ${styles.onInk}`}>Miền Cười / Care begins with understanding</p>
          <h2 id="cl-h" className={styles.h2Big}>Một bước nhỏ.<br />Để hiểu mình hơn.</h2>
          <p className={`${styles.body} ${styles.onInk}`}>Tìm hiểu nhu cầu chăm sóc răng miệng và chuẩn bị những câu hỏi cho lần thăm khám tiếp theo.</p>
        </div>
        <div className={styles.closingCta}>
          <a className={`${styles.btn} ${styles.btnLight2}`} href="#care-navigator">Bắt đầu định hướng chăm sóc</a>
          <a className={`${styles.btn} ${styles.btnGhost}`} href="#appointment">Xem trước lịch hẹn</a>
          <a className={styles.consultLink} href={consultHref}>Nhận tư vấn website như thế này <span aria-hidden="true">→</span></a>
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
          <img src="/images/demos/mien-cuoi/identity/logo-reversed.svg" alt="Miền Cười, chăm sóc răng miệng" width={224} height={128} />
          <p>Hiểu răng mình. An tâm chăm sóc.</p>
        </div>
        <nav aria-label="Chân trang" className={styles.footNav}>
          <ul>
            <li><a href="#services">Dịch vụ</a></li>
            <li><a href="#care-navigator">Care Navigator</a></li>
            <li><a href="#pricing">Chi phí</a></li>
            <li><a href="#appointment">Lịch hẹn</a></li>
            <li><a href="#faq">Hỏi &amp; đáp</a></li>
            <li><a href={consultHref}>Nhận tư vấn website</a></li>
          </ul>
        </nav>
        <div className={styles.footNote}>
          <p>Nội dung trên trang chỉ mang tính thông tin và định hướng, không thay thế tư vấn, chẩn đoán hay điều trị y tế. Mức giá và lịch hẹn chỉ để tham khảo.</p>
          <p><a href="/demos/mien-cuoi/credits">Ảnh &amp; ghi công</a> · Website do {siteConfig.fullName} thiết kế</p>
          <p>© 2026 <span translate="no">Miền Cười</span></p>
        </div>
      </div>
    </footer>
  );
}

export { buildConsultHref };
