import { ClipReveal, CursorSpotlight } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import { ACTIVES, AREA, BEFORE_AFTER, FAQ, FLOW, FOOTER, MANIFESTO, NAV, POLICIES, STUDIO_FACTS, STUDIO_POINTS } from "../data/content";
import { FlowThread } from "./FlowThread";
import { Halo } from "./Halo";
import { HoursToday } from "./Today";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const ID = "/images/demos/da-xanh/identity";

export function Manifesto() {
  return (
    <section id="ve-studio" className={styles.manifesto} aria-labelledby="triet-ly-title">
      <div className={`${styles.wrap} ${styles.manifestoGrid}`}>
        <div data-bf="">
          <CursorSpotlight className={`${styles.glass} ${styles.manifestoCard}`} radius={320} color="rgba(255,255,255,0.65)">
            <p className={styles.kicker} id="triet-ly-title">Về studio</p>
            <p className={styles.manifestoText}>{MANIFESTO}</p>
            <ul className={styles.principles}>
              {STUDIO_POINTS.map((p) => <li key={p.b}><b>{p.b}</b><span>{p.s}</span></li>)}
            </ul>
            <ul className={styles.studioFacts}>
              {STUDIO_FACTS.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </CursorSpotlight>
        </div>
        <div className={styles.manifestoMedia}>
          <Halo className={styles.manifestoHalo} tone="soft">
            <ClipReveal variant="circle" origin="50% 55%" duration={1.5} innerScale={1.25} className={styles.dropFrame}>
              <div className={styles.fill}>
                <Photo file="giot-nuoc" alt="Một giọt nước nảy lên từ mặt nước tím nhạt, tạo những vòng gợn đồng tâm" sizes="(max-width: 900px) 70vw, 440px" pos="50% 40%" w={1200} />
              </div>
            </ClipReveal>
          </Halo>
        </div>
      </div>
    </section>
  );
}

export function Flow() {
  return (
    <section id="quy-trinh" className={styles.section} aria-labelledby="flow-title">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.kicker} data-bf="">Một buổi tại studio</p>
          <h2 id="flow-title" className={styles.h2} data-bf="">Soi da, làm sạch, liệu trình, dặn dò.</h2>
          <p className={styles.lede} data-bf="" data-bf-delay="0.1">Năm bước với thời gian dự kiến. Bạn luôn biết bước kế tiếp là gì, và có thể dừng hoặc đổi ý bất cứ lúc nào.</p>
        </header>
        <ol className={styles.flow}>
          <FlowThread />
          {FLOW.map((s, i) => (
            <li key={s.n} className={styles.flowItem} data-side={i % 2 === 0 ? "l" : "r"}>
              <span className={styles.flowNode} aria-hidden="true">{s.n}</span>
              <div className={styles.flowCardWrap} data-bf="" data-bf-delay="0.05">
                <CursorSpotlight className={`${styles.glass} ${styles.flowCard}`} radius={240} color="rgba(255,255,255,0.65)">
                  <span className={styles.chip}>{s.m}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </CursorSpotlight>
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.doctorNote} data-bf="">
          <span className={styles.doctorIcon} aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></span>
          <p><b>Khi nào nên gặp bác sĩ da liễu.</b> Da đỏ rát kéo dài, ngứa nhiều, nổi mụn viêm đau, thay đổi nốt ruồi hoặc đang điều trị da. NÉA không chẩn đoán, và sẽ nói thẳng khi một vấn đề nằm ngoài chăm sóc cơ bản.</p>
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter() {
  return (
    <section id="luu-y" className={styles.section} aria-labelledby="ba-title">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.kicker} data-bf="">Lưu ý</p>
          <h2 id="ba-title" className={styles.h2} data-bf="">Trước và sau mỗi liệu trình.</h2>
          <p className={styles.lede} data-bf="" data-bf-delay="0.1">Vài việc nhỏ để buổi chăm sóc dễ chịu hơn và da được giữ ổn định sau đó.</p>
        </header>
        <div className={styles.baGrid}>
          {([BEFORE_AFTER.before, BEFORE_AFTER.after] as const).map((c, n) => (
            <div key={c.t} data-bf="" data-bf-delay={n ? "0.1" : undefined}>
              <CursorSpotlight className={`${styles.glass} ${styles.baCard}`} radius={280} color="rgba(255,255,255,0.65)">
                <h3><span aria-hidden="true">{n === 0 ? "Trước" : "Sau"}</span>{c.t}</h3>
                <ul>{c.list.map((x) => <li key={x}>{x}</li>)}</ul>
              </CursorSpotlight>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Booking() {
  const href = buildConsultHref("da-xanh");
  return (
    <section id="dat-lich" className={styles.section} aria-labelledby="book-title">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.kicker} data-bf="">Giờ mở cửa và đặt lịch</p>
          <h2 id="book-title" className={styles.h2} data-bf="">Hẹn trước, một khách một phòng.</h2>
          <p className={styles.lede} data-bf="" data-bf-delay="0.1">Studio ở {AREA}. Bạn để lại nhu cầu và khung giờ mong muốn, studio xác nhận lại với bạn trước buổi hẹn.</p>
        </header>
        <div className={styles.bookGrid}>
          <div data-bf="">
            <CursorSpotlight className={`${styles.glass} ${styles.hoursCard}`} radius={260} color="rgba(255,255,255,0.65)">
              <h3>Giờ mở cửa</h3>
              <HoursToday />
              <p className={styles.hoursNote}>Buổi cuối bắt đầu trước giờ đóng cửa ít nhất 90 phút.</p>
              <a className={`${styles.btn} ${styles.btnInk}`} href={href}>Đặt lịch chăm da</a>
            </CursorSpotlight>
          </div>
          <ul className={styles.policyList}>
            {POLICIES.map((p, i) => (
              <li key={p.t} data-bf="" data-bf-delay={String(i * 0.06)}>
                <div className={`${styles.glass} ${styles.policy}`}><h3>{p.t}</h3><p>{p.d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Actives() {
  return (
    <section id="hoat-chat" className={styles.section} aria-labelledby="actives-title">
      <div className={`${styles.wrap} ${styles.activesGrid}`}>
        <div className={styles.activesIntro}>
          <p className={styles.kicker} data-bf="">Nhóm hoạt chất thường gặp</p>
          <h2 id="actives-title" className={styles.h2} data-bf="">Hiểu nhãn trước khi thêm bước.</h2>
          <p className={styles.lede} data-bf="" data-bf-delay="0.1">Đây là cách chúng mình giải thích theo nhóm chung, không theo thương hiệu. Mức độ phù hợp còn tuỳ từng làn da, nên khi chưa chắc hãy hỏi bác sĩ da liễu.</p>
          <div className={styles.leafMedia}>
            <ClipReveal variant="inset" from="bottom" duration={1.3} innerScale={1.2} className={styles.leafFrame}>
              <div className={styles.fill}>
                <div className={styles.pimg} data-dx="pimg">
                  <Photo file="la-suong" alt="Chiếc lá xanh mảnh phủ những giọt sương trong, nền xanh sẫm mờ" sizes="(max-width: 900px) 80vw, 420px" pos="50% 40%" w={1200} />
                </div>
              </div>
            </ClipReveal>
          </div>
        </div>
        <ul className={styles.activesList}>
          {ACTIVES.map((a, i) => (
            <li key={a.k} data-bf="" data-bf-delay={String((i % 2) * 0.08)}>
              <CursorSpotlight className={`${styles.glass} ${styles.activeCard}`} radius={220} color="rgba(255,255,255,0.65)">
                <span className={styles.tag} data-kind={a.tag === "Hỏi bác sĩ da liễu" ? "doctor" : a.tag === "Cần thận trọng" ? "care" : "ok"}>{a.tag}</span>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </CursorSpotlight>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={styles.section} aria-labelledby="faq-title">
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <header className={styles.faqHead}>
          <p className={styles.kicker} data-bf="">Hỏi đáp</p>
          <h2 id="faq-title" className={styles.h2} data-bf="">Những điều thường được hỏi.</h2>
        </header>
        <div className={styles.faqList}>
          {FAQ.map((f, i) => (
            <details key={f.q} className={`${styles.glass} ${styles.faqItem}`} data-bf="" data-bf-delay={String(Math.min(i, 3) * 0.05)}>
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
  const href = buildConsultHref("da-xanh");
  return (
    <section className={styles.final} aria-labelledby="final-title">
      <div className={styles.wrap}>
        <div data-bf="">
          <CursorSpotlight className={`${styles.glass} ${styles.finalCard}`} radius={380} color="rgba(255,255,255,0.7)">
            <Halo className={styles.finalHalo} tone="soft">
              <svg viewBox="0 0 24 34" width="38" height="54" aria-hidden="true">
                <defs><linearGradient id="dx-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b9a7ff" /><stop offset="1" stopColor="#7fd6e6" /></linearGradient></defs>
                <path d="M12 1C9 9 2 15 2 22c0 6 4.5 10 10 10s10-4 10-10C22 15 15 9 12 1z" fill="url(#dx-fin)" stroke="#fff" strokeWidth="1.2" />
              </svg>
            </Halo>
            <div className={styles.finalCopy}>
              <h2 id="final-title" className={styles.h2}>Đặt một buổi chăm da vừa đủ.</h2>
              <p className={styles.lede}>Cho chúng mình biết làn da bạn đang thế nào, liệu trình bạn quan tâm và khung giờ mong muốn. Studio sẽ xác nhận lịch, hoặc nói thẳng nếu bạn nên gặp bác sĩ trước.</p>
              <div className={styles.finalCtas}>
                <a className={`${styles.btn} ${styles.btnInk}`} href={href}>Đặt lịch cùng NÉA</a>
                <a className={`${styles.btn} ${styles.btnGlass}`} href="#routine">Thử Skin Routine Builder</a>
              </div>
            </div>
          </CursorSpotlight>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={`${styles.glass} ${styles.footerCard}`}>
          <div className={styles.footerBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ID}/logo-horizontal.svg`} alt="NÉA Skin Studio" width={150} height={51} loading="lazy" />
            <p>Studio chăm sóc da cơ bản tại Quận Thanh Khê, Đà Nẵng.</p>
          </div>
          <nav aria-label="Liên kết chân trang" className={styles.footerNav}>
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <address className={styles.footerContact}>
            <span>{FOOTER.area}</span>
            <span>9:00 – 20:00, nghỉ Chủ nhật</span>
            <a href={`mailto:${FOOTER.mail}`}>{FOOTER.mail}</a>
            <span>{FOOTER.phone}</span>
          </address>
        </div>
        <p className={styles.footerFine}>
          <span>© NÉA Skin Studio. Thông tin trên trang mang tính tham khảo chung, không thay thế tư vấn của bác sĩ.</span>
          <span><a href="/demos/da-xanh/credits">Ảnh &amp; ghi công</a> · Website do {siteConfig.fullName} thiết kế</span>
        </p>
      </div>
    </footer>
  );
}
