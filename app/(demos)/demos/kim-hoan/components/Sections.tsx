import type { ReactNode } from "react";
import { Counter, GrainOverlay, ParallaxLayer, ScrollScrubText, ShineSweep, SplitWords, SVGPathDraw, VelocityMarquee } from "@/features/showroom/effects";
import { CARE, CONTACT, FAQ, IMGS, KARATS, MANIFESTO, MARQUEE, NAV, PRODUCTS, STEPS, ID, type Img } from "../data/content";
import { Glare } from "./Glare";
import { Mark } from "./Logo";
import { Photo } from "./Photo";
import { PresetButton } from "./PresetButton";
import { Ring3D } from "./Ring3D";
import { Sparkle } from "./Sparkle";
import { siteConfig } from "@/lib/site";
import styles from "../brand.module.css";

/** Đường kẻ vàng vẽ dần (nét + thoi nhỏ ở giữa). */
export function GoldRule({ className }: { className?: string }) {
  return (
    <SVGPathDraw viewBox="0 0 240 14" className={`${styles.goldRule} ${className ?? ""}`} duration={1.2} stagger={0.2} aria-hidden="true" focusable="false">
      <path d="M0 7 H104" strokeWidth="1" />
      <path d="M136 7 H240" strokeWidth="1" />
      <path d="M120 1 L127 7 L120 13 L113 7Z" strokeWidth="1" />
    </SVGPathDraw>
  );
}

function Head({ label, title, children, id, center }: { label: string; title: string; children?: ReactNode; id: string; center?: boolean }) {
  return (
    <header className={`${styles.head} ${center ? styles.headCenter : ""}`}>
      <p className={styles.label}>{label}</p>
      <h2 id={id} className={styles.h2}><SplitWords as="span" stagger={0.07} duration={1}>{title}</SplitWords></h2>
      <GoldRule />
      {children ? <div className={styles.headText} data-kn="rise">{children}</div> : null}
    </header>
  );
}

/** Ảnh sản phẩm: clip lộ từ đáy + zoom nhẹ rồi trôi chậm theo cuộn (Motion điều khiển qua data-kn). */
function Reveal({ img, sizes, ratio, className, glare = true, w = 1200 }: { img: Img; sizes: string; ratio: string; className?: string; glare?: boolean; w?: 600 | 1200 | 2000 }) {
  const inner = (
    <div className={`${styles.pr} ${className ?? ""}`} data-kn="pr" style={{ aspectRatio: ratio }}>
      <div className={styles.prClip} data-kn="pr-clip">
        <div className={styles.prImg} data-kn="pr-img">
          <Photo img={img} sizes={sizes} w={w} />
        </div>
      </div>
    </div>
  );
  return glare ? <Glare className={styles.glareFrame}>{inner}</Glare> : inner;
}

export function Marquee() {
  return (
    <div className={styles.marquee}>
      <VelocityMarquee speed={46} boost={1.6} gap="0" controls className={styles.mq} trackClassName={styles.mqTrack} buttonClassName={styles.mqBtn} label="Chất liệu và dịch vụ" pauseLabel="Dừng dải chữ" playLabel="Chạy dải chữ">
        {MARQUEE.map((m) => (
          <span key={m} className={styles.mqItem}>
            {m}
            <i aria-hidden="true" />
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
}

export function Manifesto() {
  return (
    <section className={styles.manifesto} id="gioi-thieu" aria-labelledby="mf-title">
      <div className={styles.mfBg} aria-hidden="true">
        <ParallaxLayer distance={70} className={styles.mfPar}>
          <Photo img={IMGS.band} sizes="100vw" />
        </ParallaxLayer>
      </div>
      <div className={styles.mfShade} aria-hidden="true" />
      <div className={styles.wrap}>
        <p className={styles.label} id="mf-title">Kim Nguyệt</p>
        <ScrollScrubText as="p" className={styles.mfText} dim={0.22} start="top 80%" end="bottom 55%">{MANIFESTO}</ScrollScrubText>
      </div>
    </section>
  );
}

export function Collections() {
  const [feature, ...rest] = PRODUCTS;
  return (
    <section className={styles.sec} id="bo-suu-tap" aria-labelledby="col-title">
      <div className={styles.wrap}>
        <Head label="Bộ sưu tập Trăng" title="Mỗi dáng theo một pha của trăng." id="col-title">
          <p>Trăng Non ở đầu trang, bốn dáng còn lại ở đây. Mỗi mẫu đều đổi được chất liệu, đá và kích cỡ trong công cụ bên dưới.</p>
        </Head>

        <article className={styles.feature}>
          <div className={styles.featureImg}>
            <Reveal img={feature.img} sizes="(max-width: 900px) 100vw, 62vw" ratio="3 / 2" w={2000} />
          </div>
          <div className={styles.featureText} data-kn="rise">
            <p className={styles.kind}>{feature.kind}</p>
            <h3 className={styles.h3}>{feature.name}</h3>
            <p className={styles.body}>{feature.blurb}</p>
            <ul className={styles.specs}>{feature.specs.map((s) => <li key={s}>{s}</li>)}</ul>
            <PresetButton preset={feature.preset} className={styles.btnLine} cursor="Chọn">Cấu hình mẫu này</PresetButton>
          </div>
        </article>

        <div className={styles.trio}>
          {rest.map((p, i) => (
            <article key={p.id} className={styles.card} data-i={i}>
              <Reveal img={p.img} sizes="(max-width: 900px) 90vw, 30vw" ratio="4 / 5" />
              <div className={styles.cardText} data-kn="rise">
                <p className={styles.kind}>{p.kind}</p>
                <h3 className={styles.h3s}>{p.name}</h3>
                <p className={styles.bodyS}>{p.blurb}</p>
                <ul className={styles.specs}>{p.specs.map((s) => <li key={s}>{s}</li>)}</ul>
                <PresetButton preset={p.preset} className={styles.linkGold} cursor="Chọn">Cấu hình mẫu này<span aria-hidden="true"> →</span></PresetButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RingSection() {
  return (
    <section className={`${styles.sec} ${styles.ringSec}`} aria-labelledby="ring-title">
      <div className={`${styles.wrap} ${styles.ringGrid}`}>
        <Glare className={styles.ringStage} strength="strong">
          <Ring3D />
          <Sparkle className={styles.ringSpark} seed={21} desktop={22} mobile={8} />
        </Glare>
        <div className={styles.ringCopy}>
          <p className={styles.label}>Nhìn từ mọi phía</p>
          <h2 id="ring-title" className={styles.h2}><SplitWords as="span" stagger={0.07} duration={1}>Một vòng tròn, không điểm đầu, không điểm cuối.</SplitWords></h2>
          <GoldRule />
          <p className={styles.body} data-kn="rise">Chiếc nhẫn xoay chậm để bạn nhìn kỹ thành nhẫn, chấu giữ đá và mặt trong. Khi chế tác thật, đây là những chỗ chúng tôi soi kỹ nhất.</p>
          <ul className={styles.ringList} data-kn="rise">
            <li><b>Thành nhẫn</b><span>Dày hay mảnh theo dáng bạn chọn, bo tròn mặt trong để đeo êm.</span></li>
            <li><b>Chấu giữ đá</b><span>Gắn bằng tay, kiểm tra độ chắc và độ đều trước khi đánh bóng.</span></li>
            <li><b>Mặt trong</b><span>Có thể khắc tên hoặc một ngày đặc biệt, chỉ mình bạn đọc được.</span></li>
          </ul>
          <PresetButton preset={{ type: "ring", material: "g14", stone: "syn", size: 12, stoneMm: 4 }} className={styles.linkGold} cursor="Chọn">Cấu hình nhẫn của bạn<span aria-hidden="true"> →</span></PresetButton>
        </div>
      </div>
    </section>
  );
}

export function Craft() {
  return (
    <section className={styles.sec} id="che-tac" aria-labelledby="craft-title">
      <div className={styles.wrap}>
        <Head label="Chế tác" title="Làm chậm, từng bước một." id="craft-title">
          <p>Bốn bước từ lúc bạn kể câu chuyện đến lúc nhận món trang sức. Bước nào cũng có người soi lại.</p>
        </Head>
        <ol className={styles.steps}>
          <span className={styles.lineTrack} aria-hidden="true"><span className={styles.lineFill} data-kn="goldline" /></span>
          {STEPS.map((s) => (
            <li key={s.n} className={styles.step} data-kn="step">
              <span className={styles.node} data-kn="node" aria-hidden="true" />
              <div className={styles.stepBody} data-kn="rise">
                <span className={styles.stepNum}>{s.n}</span>
                <h3 className={styles.h3s}>{s.title}</h3>
                <p className={styles.bodyS}>{s.text}</p>
              </div>
              {"img" in s ? (
                <div className={styles.stepPhoto}>
                  <Reveal img={s.img} sizes="(max-width: 900px) 80vw, 40vw" ratio={s.img.w > s.img.h ? "3 / 2" : "4 / 5"} />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Karat() {
  return (
    <section className={styles.sec} id="tuoi-vang" aria-labelledby="karat-title">
      <div className={`${styles.wrap} ${styles.karatGrid}`}>
        <div className={styles.karatImg}>
          <Reveal img={IMGS.gem} sizes="(max-width: 900px) 90vw, 40vw" ratio="4 / 5" />
        </div>
        <div className={styles.karatCopy}>
          <p className={styles.label}>Chất liệu</p>
          <h2 id="karat-title" className={styles.h2}><SplitWords as="span" stagger={0.07} duration={1}>Hiểu về tuổi vàng trước khi chọn.</SplitWords></h2>
          <GoldRule />
          <p className={styles.body} data-kn="rise">
            Tuổi vàng K cho biết trong 24 phần của hợp kim có bao nhiêu phần là vàng nguyên chất. Theo quy ước phổ biến: 10K ≈ 41,7%, 14K ≈ 58,5%, 18K = 75%. Phần còn lại là các kim loại khác để vàng cứng hơn và đổi được sắc màu.
          </p>
          <ul className={styles.karats}>
            {KARATS.map((k) => (
              <li key={k.k} data-kn="rise">
                <span className={styles.karatK}>{k.k}</span>
                <span className={styles.karatPct}><Counter value={k.pct} decimals={k.pct % 1 ? 1 : 0} suffix="%" duration={1.6} /></span>
                <span className={styles.karatUse}>{k.use}</span>
              </li>
            ))}
          </ul>
          <p className={styles.note} data-kn="rise">
            Vàng trắng là hợp kim vàng với kim loại trắng, thường phủ rhodium để sáng và cần xi lại theo thời gian. Bạc 925 chứa 92,5% bạc, nhẹ và giá gọn hơn nhiều. Công cụ bên dưới tính theo hàm lượng của từng loại.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Care() {
  return (
    <section className={styles.sec} id="cham-soc" aria-labelledby="care-title">
      <div className={`${styles.wrap} ${styles.careGrid}`}>
        <div className={styles.careCopy}>
          <p className={styles.label}>Chăm sóc</p>
          <h2 id="care-title" className={styles.h2}><SplitWords as="span" stagger={0.07} duration={1}>Giữ vẻ đẹp theo năm tháng.</SplitWords></h2>
          <GoldRule />
          <ul className={styles.careList}>
            {CARE.map((c) => (
              <li key={c.t} data-kn="rise">
                <h3 className={styles.h3s}>{c.t}</h3>
                <p className={styles.bodyS}>{c.d}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.carePics}>
          <div className={styles.careA}><Reveal img={IMGS.hand} sizes="(max-width: 900px) 70vw, 24vw" ratio="2 / 3" /></div>
          <div className={styles.careB}><Reveal img={IMGS.box} sizes="(max-width: 900px) 70vw, 24vw" ratio="2 / 3" /></div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className={styles.sec} id="hoi-dap" aria-labelledby="faq-title">
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <Head label="Hỏi đáp" title="Những điều thường được hỏi." id="faq-title" />
        <div className={styles.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary>
                <span>{f.q}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ consultHref }: { consultHref: string }) {
  return (
    <section className={styles.contact} id="lien-he" aria-labelledby="contact-title">
      <div className={styles.contactBg} aria-hidden="true">
        <ParallaxLayer distance={50} className={styles.mfPar}>
          <Photo img={IMGS.close} sizes="100vw" />
        </ParallaxLayer>
      </div>
      <div className={styles.contactShade} aria-hidden="true" />
      <GrainOverlay opacity={0.06} size={160} blendMode="screen" zIndex={1} />
      <Sparkle className={styles.contactSpark} seed={5} desktop={30} mobile={10} />
      <div className={`${styles.wrap} ${styles.contactIn}`}>
        <p className={styles.label}>Liên hệ</p>
        <h2 id="contact-title" className={styles.h2Big}><SplitWords as="span" stagger={0.07} duration={1.05}>Một món trang sức bắt đầu từ một cuộc trò chuyện.</SplitWords></h2>
        <p className={styles.body} data-kn="rise">Gửi cho chúng tôi ý tưởng, hình tham khảo hoặc cấu hình bạn vừa tạo. Chúng tôi sẽ trao đổi dáng, chất liệu và khoảng giá trước khi bắt đầu.</p>
        <div className={styles.ctaRow} data-kn="rise">
          <ShineSweep trigger="loop" every={4.5} duration={1.1} color="rgba(255,244,200,0.7)" className={styles.btnWrap}>
            <a className={styles.btnGold} href={consultHref} data-cursor="">Nhận tư vấn thiết kế</a>
          </ShineSweep>
          <a className={styles.btnLine} href="#cau-hinh" data-cursor="">Quay lại công cụ thiết kế</a>
        </div>
        <dl className={styles.contactList} data-kn="rise">
          <div><dt>Khu vực</dt><dd>{CONTACT.place}</dd></div>
          <div><dt>Điện thoại</dt><dd>{CONTACT.phone}</dd></div>
          <div><dt>Thư điện tử</dt><dd>{CONTACT.email}</dd></div>
          <div><dt>Mạng xã hội</dt><dd>{CONTACT.social}</dd></div>
        </dl>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footTop}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ID}/logo-horizontal.svg`} alt="Kim Nguyệt, trang sức vàng Đà Nẵng" width={375} height={96} className={styles.footLogo} />
          <nav aria-label="Liên kết chân trang" className={styles.footNav}>
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            <a href="/demos/kim-hoan/credits">Ảnh &amp; ghi công</a>
          </nav>
        </div>
        <p className={styles.footNote}>Khoảng giá trên trang là giá tham khảo, được xác nhận sau khi thống nhất thiết kế, trọng lượng thật và vật liệu.</p>
        <p className={styles.footSign}><Mark uid="ft" className={styles.footMark} /><span>Website do {siteConfig.fullName} thiết kế</span></p>
      </div>
    </footer>
  );
}

