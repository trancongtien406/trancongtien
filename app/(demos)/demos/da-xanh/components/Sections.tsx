import { ClipReveal, CursorSpotlight, MagneticButton, SVGPathDraw, ScrollScrubText, SplitWords, VelocityMarquee } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import { ACTIVES, FAQ, FLOW, FOOTER, MANIFESTO, MARQUEE, NAV } from "../data/content";
import { Halo } from "./Halo";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const ID = "/images/demos/da-xanh/identity";

export function Manifesto() {
  return (
    <section id="triet-ly" className={styles.manifesto} aria-labelledby="triet-ly-title">
      <div className={`${styles.wrap} ${styles.manifestoGrid}`}>
        <div data-bf="">
          <CursorSpotlight className={`${styles.glass} ${styles.manifestoCard}`} radius={320} color="rgba(255,255,255,0.65)">
            <p className={styles.kicker} id="triet-ly-title">Triết lý của NÉA</p>
            <ScrollScrubText as="p" className={styles.manifestoText} dim={0.22} start="top 80%" end="bottom 55%">{MANIFESTO}</ScrollScrubText>
            <ul className={styles.principles}>
              <li><b>Lắng nghe trước</b><span>Mỗi buổi bắt đầu từ điều bạn đang cảm thấy, không phải từ một gói có sẵn.</span></li>
              <li><b>Vừa đủ thì dừng</b><span>Ít bước hơn nhưng đúng chỗ. Chúng mình sẵn lòng bớt đi một sản phẩm.</span></li>
              <li><b>Nói rõ từng bước</b><span>Dùng gì, bao lâu, cảm giác thế nào, bạn đều biết trước.</span></li>
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

export function Band() {
  return (
    <div className={styles.band} aria-label="Những nhóm chăm sóc chính của NÉA">
      <VelocityMarquee mode="velocity" speed={46} boost={1.4} reverseOnScrollUp pauseOnHover controls gap="2.6rem" className={styles.bandMarquee} buttonClassName={styles.bandBtn} pauseLabel="Dừng dải chữ" playLabel="Chạy dải chữ" label="Dải chữ chạy ngang">
        {MARQUEE.map((m) => (
          <span key={m} className={styles.bandItem}>{m}<i aria-hidden="true" /></span>
        ))}
      </VelocityMarquee>
    </div>
  );
}

export function Flow() {
  return (
    <section id="quy-trinh" className={styles.section} aria-labelledby="flow-title">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.kicker} data-bf="">Một buổi tại studio</p>
          <h2 id="flow-title" className={styles.h2}><SplitWords as="span">Bốn bước, đi chậm và nói rõ.</SplitWords></h2>
          <p className={styles.lede} data-bf="" data-bf-delay="0.1">Bạn luôn biết bước kế tiếp là gì, và có thể dừng hoặc đổi ý bất cứ lúc nào.</p>
        </header>
        <ol className={styles.flow}>
          <SVGPathDraw className={styles.flowSvg} viewBox="0 0 80 1000" preserveAspectRatio="none" mode="scroll" start="top 70%" end="bottom 60%" aria-hidden="true" focusable="false">
            <path d="M40 0C58 40 58 90 40 125C22 170 22 330 40 375C58 420 58 580 40 625C22 670 22 830 40 875C58 920 58 970 40 1000" stroke="url(#dx-flow)" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <defs>
              <linearGradient id="dx-flow" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse"><stop stopColor="#8f78ff" /><stop offset="1" stopColor="#3fb6d1" /></linearGradient>
            </defs>
          </SVGPathDraw>
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

export function Actives() {
  return (
    <section id="hoat-chat" className={styles.section} aria-labelledby="actives-title">
      <div className={`${styles.wrap} ${styles.activesGrid}`}>
        <div className={styles.activesIntro}>
          <p className={styles.kicker} data-bf="">Nhóm hoạt chất thường gặp</p>
          <h2 id="actives-title" className={styles.h2}><SplitWords as="span">Hiểu nhãn trước khi thêm bước.</SplitWords></h2>
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
          <h2 id="faq-title" className={styles.h2}><SplitWords as="span">Những điều thường được hỏi.</SplitWords></h2>
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
              <h2 id="final-title" className={styles.h2}>Bắt đầu từ một cuộc trò chuyện.</h2>
              <p className={styles.lede}>Cho chúng mình biết làn da bạn đang thế nào và bạn muốn dành bao nhiêu thời gian. Chúng mình sẽ trao đổi để chọn một buổi phù hợp, hoặc nói thẳng nếu bạn nên gặp bác sĩ trước.</p>
              <div className={styles.finalCtas}>
                <MagneticButton><a className={`${styles.btn} ${styles.btnInk}`} href={href}>Trao đổi cùng NÉA</a></MagneticButton>
                <a className={`${styles.btn} ${styles.btnGlass}`} href="#routine">Quay lại Routine Builder</a>
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
            <p>Chăm da dịu dàng, hiểu làn da hơn.</p>
          </div>
          <nav aria-label="Liên kết chân trang" className={styles.footerNav}>
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <address className={styles.footerContact}>
            <span>{FOOTER.area}</span>
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
