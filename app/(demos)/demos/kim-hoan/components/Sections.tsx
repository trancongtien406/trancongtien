import type { ReactNode } from "react";
import { Counter, GrainOverlay, ShineSweep, SVGPathDraw } from "@/features/showroom/effects";
import { ABOUT, ABOUT_POINTS, CARE, CONTACT, CUSTOM, FAQ, IMGS, KARATS, NAV, POLICIES, PRODUCTS, SERVICES, STEPS, ID, type Img } from "../data/content";
import { DEFAULT_GOLD_24K_PER_GRAM, LABOR_BASE, PURITY_24K, STONE_SIZES, formatVnd, quote } from "../data/pricing";
import { Engrave } from "./Engrave";
import { Glare } from "./Glare";
import { Mark } from "./Logo";
import { OpenSign } from "./OpenSign";
import { Photo } from "./Photo";
import { PresetButton } from "./PresetButton";
import { Ring3D } from "./Ring3D";
import { Scale } from "./Scale";
import { SizeGauge } from "./SizeGauge";
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

/** Tiêu đề: dải ánh kim quét từ trái sang phải (Motion điều khiển qua data-kn="wipe"). */
function Wipe({ children }: { children: ReactNode }) {
  return <span className={styles.wipeIn} data-kn="wipe">{children}</span>;
}

function Head({ label, title, children, id, center }: { label: string; title: string; children?: ReactNode; id: string; center?: boolean }) {
  return (
    <header className={`${styles.head} ${center ? styles.headCenter : ""}`}>
      <p className={styles.label}>{label}</p>
      <h2 id={id} className={styles.h2}><Wipe>{title}</Wipe></h2>
      <GoldRule />
      {children ? <div className={styles.headText} data-kn="rise">{children}</div> : null}
    </header>
  );
}

/** Ảnh sản phẩm: "mở tủ kính", hai cánh kính tách ra từ giữa rồi ảnh lùi về vị trí (Motion điều khiển qua data-kn). */
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

const fromTri = (n: number) => `từ ${(Math.floor(n / 100_000) / 10).toLocaleString("vi-VN", { minimumFractionDigits: 1 })} triệu`;
function fromPrice(preset: { type: "ring" | "pendant" | "earring" | "bracelet"; material: string; stone: string; size: number; stoneMm?: number }) {
  const q = quote({ type: preset.type, material: preset.material as never, stone: "none", stoneMm: 4, size: preset.size, finish: "gloss", goldPerGram: DEFAULT_GOLD_24K_PER_GRAM });
  return q.ok ? fromTri(q.min) : "";
}
export const CHEAPEST = fromPrice({ type: "ring", material: "g10", stone: "none", size: 8 });

/** Dải thông tin ngắn ngay dưới hero. */
export function Info() {
  const items = [
    ["Tuổi vàng", "10K · 14K · 18K · 24K"],
    ["Mở cửa", "9:00 – 20:00 mỗi ngày"],
    ["Dịch vụ", "Khắc chữ, nới size, đánh bóng"],
    ["Thu đổi", "Món mua tại tiệm"],
  ];
  return (
    <div className={styles.info}>
      <dl className={`${styles.wrap} ${styles.infoGrid}`}>
        {items.map(([t, d]) => (
          <div key={t}>
            <dt>{t}</dt>
            <dd>{d}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function About() {
  return (
    <section className={styles.manifesto} id="gioi-thieu" aria-labelledby="mf-title">
      <div className={styles.mfBg} aria-hidden="true">
        <div className={styles.mfStill}>
          <Photo img={IMGS.band} sizes="100vw" />
        </div>
      </div>
      <div className={styles.mfShade} aria-hidden="true" />
      <div className={styles.wrap}>
        <p className={styles.label} id="mf-title">Về tiệm Kim Nguyệt</p>
        <p className={styles.mfText} data-kn="lit">{ABOUT}</p>
        <ul className={styles.aboutPts}>
          {ABOUT_POINTS.map((a) => (
            <li key={a.t} data-kn="rise">
              <h3 className={styles.h3s}>{a.t}</h3>
              <p className={styles.bodyS}>{a.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Collections() {
  const [feature, ...rest] = PRODUCTS;
  return (
    <section className={styles.sec} id="danh-muc" aria-labelledby="col-title">
      <div className={styles.wrap}>
        <Head label="Danh mục" title="Năm nhóm trang sức, làm sẵn hoặc đặt theo ý." id="col-title">
          <p>Giá “từ” tính cho kiểu trơn, không đá, ở đơn giá tham khảo. Thêm đá, đổi chất liệu hoặc chạm hoa văn thì khoảng giá đổi theo, xem ở phần ước tính bên dưới.</p>
        </Head>

        <article className={styles.feature}>
          <div className={styles.featureImg}>
            <Reveal img={feature.img!} sizes="(max-width: 900px) 100vw, 62vw" ratio="3 / 2" w={2000} />
          </div>
          <div className={styles.featureText} data-kn="rise">
            <p className={styles.kind}>{feature.kind}</p>
            <h3 className={styles.h3}>{feature.name}</h3>
            <p className={styles.fromTag}>{CHEAPEST} · nhẫn trơn vàng 10K</p>
            <p className={styles.body}>{feature.blurb}</p>
            <ul className={styles.specs}>{feature.specs.map((s) => <li key={s}>{s}</li>)}</ul>
            <PresetButton preset={feature.preset} className={styles.btnLine} cursor="Chọn">Ước tính mẫu này</PresetButton>
          </div>
        </article>

        <div className={styles.trio}>
          {rest.map((p, i) => (
            <article key={p.id} className={styles.card} data-i={i}>
              <Reveal img={p.img!} sizes="(max-width: 900px) 90vw, 30vw" ratio="4 / 5" />
              <div className={styles.cardText} data-kn="rise">
                <p className={styles.kind}>{p.kind}</p>
                <h3 className={styles.h3s}>{p.name}</h3>
                <p className={styles.fromTag}>{fromPrice(p.preset)}</p>
                <p className={styles.bodyS}>{p.blurb}</p>
                <ul className={styles.specs}>{p.specs.map((s) => <li key={s}>{s}</li>)}</ul>
                <PresetButton preset={p.preset} className={styles.linkGold} cursor="Chọn">Ước tính mẫu này<span aria-hidden="true"> →</span></PresetButton>
              </div>
            </article>
          ))}
        </div>

        <article className={styles.customBand} data-kn="rise">
          <SVGPathDraw viewBox="0 0 200 120" className={styles.sketch} duration={1.8} stagger={0.25} strokeWidth="1" aria-hidden="true" focusable="false">
            <ellipse cx="100" cy="74" rx="38" ry="34" />
            <ellipse cx="100" cy="74" rx="30" ry="26" />
            <path d="M82 42L100 14L118 42M82 42H118M91 28H109" />
            <path d="M10 108H190M10 104V112M60 104V112M110 104V112M160 104V112M190 104V112" />
          </SVGPathDraw>
          <div>
            <p className={styles.kind}>Đặt làm riêng</p>
            <h3 className={styles.h3s}>{CUSTOM.name}</h3>
            <p className={styles.bodyS}>{CUSTOM.blurb}</p>
          </div>
          <ul className={styles.specs}>{CUSTOM.points.map((s) => <li key={s}>{s}</li>)}</ul>
          <a className={styles.linkGold} href="#che-tac" data-cursor="">Xem quy trình đặt làm<span aria-hidden="true"> →</span></a>
        </article>
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
          <p className={styles.label}>Nhìn kỹ một chiếc nhẫn</p>
          <h2 id="ring-title" className={styles.h2}><Wipe>Xem từ mọi phía trước khi chọn.</Wipe></h2>
          <GoldRule />
          <p className={styles.body} data-kn="rise">Chiếc nhẫn xoay chậm để bạn nhìn kỹ thành nhẫn, chấu giữ đá và mặt trong. Khi bạn đến tiệm, đây là những chỗ thợ cho bạn xem trực tiếp dưới kính lúp.</p>
          <ul className={styles.ringList} data-kn="rise">
            <li><b>Thành nhẫn</b><span>Dày hay mảnh theo dáng bạn chọn, bo tròn mặt trong để đeo êm.</span></li>
            <li><b>Chấu giữ đá</b><span>Gắn bằng tay, kiểm tra độ chắc và độ đều trước khi đánh bóng.</span></li>
            <li><b>Mặt trong</b><span>Có thể khắc tên hoặc một ngày đặc biệt, chỉ mình bạn đọc được.</span></li>
          </ul>
          <PresetButton preset={{ type: "ring", material: "g14", stone: "syn", size: 12, stoneMm: 4 }} className={styles.linkGold} cursor="Chọn">Ước tính nhẫn 14K<span aria-hidden="true"> →</span></PresetButton>
        </div>
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
          <p className={styles.label}>Tuổi vàng</p>
          <h2 id="karat-title" className={styles.h2}><Wipe>10K, 14K, 18K, 24K: khác nhau ở đâu.</Wipe></h2>
          <GoldRule />
          <p className={styles.body} data-kn="rise">
            Tuổi vàng K cho biết trong 24 phần của hợp kim có bao nhiêu phần là vàng nguyên chất. Theo quy ước phổ biến: 10K ≈ 41,7%, 14K ≈ 58,5%, 18K = 75%, 24K ≈ 99,9%. Phần còn lại là các kim loại khác để vàng cứng hơn và đổi được sắc màu.
          </p>
          <ul className={styles.karats}>
            {KARATS.map((k) => (
              <li key={k.k} data-kn="rise" style={{ ["--p" as string]: k.pct / 100 }}>
                <span className={styles.karatK}>{k.k}</span>
                <span className={styles.karatPct}><Counter value={k.pct} decimals={k.pct % 1 ? 1 : 0} suffix="%" duration={1.6} /></span>
                <span className={styles.karatUse}>{k.use}</span>
                <span className={styles.karatBar} aria-hidden="true"><i data-kn="bar" /></span>
              </li>
            ))}
          </ul>
          <p className={styles.note} data-kn="rise">
            Vàng trắng là hợp kim vàng với kim loại trắng, thường phủ rhodium để sáng và cần xi lại theo thời gian. Bạc 925 chứa 92,5% bạc, nhẹ và giá gọn hơn nhiều.
          </p>
        </div>
      </div>
    </section>
  );
}

const money = (n: number) => formatVnd(n);

/** Cách tính giá: công thức, bảng đơn giá theo tuổi vàng (tham khảo), cân tiểu ly. */
export function Pricing() {
  const rows = [
    ["Vàng 10K", 0.417],
    ["Vàng 14K", 0.585],
    ["Vàng 18K", 0.75],
    ["Vàng 24K", PURITY_24K],
  ] as const;
  return (
    <section className={styles.sec} id="cach-tinh" aria-labelledby="price-title">
      <div className={styles.wrap}>
        <Head label="Cách tính giá" title="Giá viết ra từng khoản, không gộp một con số." id="price-title">
          <p>Tiền vàng theo trọng lượng và tuổi vàng, cộng công chế tác, cộng đá nếu có. Đơn giá dưới đây là mức tham khảo của tiệm, không phải giá vàng thời gian thực; bạn tự nhập đơn giá khác để so sánh.</p>
        </Head>
        <ol className={styles.formulaRow} data-kn="rise">
          <li><b>Trọng lượng</b><span>gam, cân thật khi nhận</span></li>
          <li aria-hidden="true">×</li>
          <li><b>Hàm lượng vàng</b><span>theo tuổi K</span></li>
          <li aria-hidden="true">×</li>
          <li><b>Đơn giá</b><span>đồng mỗi gam</span></li>
          <li aria-hidden="true">+</li>
          <li><b>Công</b><span>theo nhóm, độ khó</span></li>
          <li aria-hidden="true">+</li>
          <li><b>Đá</b><span>theo loại, cỡ</span></li>
        </ol>
        <div className={styles.priceTables}>
          <table className={styles.ptable} data-kn="rise">
            <caption>Đơn giá vàng tham khảo (24K = {money(DEFAULT_GOLD_24K_PER_GRAM)}/g)</caption>
            <thead><tr><th scope="col">Chất liệu</th><th scope="col">Hàm lượng</th><th scope="col">Đơn giá/g</th></tr></thead>
            <tbody>
              {rows.map(([n, p]) => (
                <tr key={n}><th scope="row">{n}</th><td>{String(Math.round(p * 1000) / 10).replace(".", ",")}%</td><td>{money(p * DEFAULT_GOLD_24K_PER_GRAM)}</td></tr>
              ))}
            </tbody>
          </table>
          <table className={styles.ptable} data-kn="rise">
            <caption>Công chế tác tham khảo, kiểu bóng gương</caption>
            <thead><tr><th scope="col">Nhóm</th><th scope="col">Công từ</th></tr></thead>
            <tbody>
              <tr><th scope="row">Nhẫn</th><td>{money(LABOR_BASE.ring)}</td></tr>
              <tr><th scope="row">Mặt dây & dây chuyền</th><td>{money(LABOR_BASE.pendant)}</td></tr>
              <tr><th scope="row">Bông tai (một đôi)</th><td>{money(LABOR_BASE.earring)}</td></tr>
              <tr><th scope="row">Lắc tay</th><td>{money(LABOR_BASE.bracelet)}</td></tr>
            </tbody>
          </table>
          <table className={styles.ptable} data-kn="rise">
            <caption>Đá tổng hợp, mỗi viên</caption>
            <thead><tr><th scope="col">Đường kính</th><th scope="col">Giá</th></tr></thead>
            <tbody>
              {STONE_SIZES.map((s) => (
                <tr key={s.mm}><th scope="row">{String(s.mm).replace(".", ",")} mm</th><td>{money(s.price)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <Scale />
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className={styles.sec} id="dich-vu" aria-labelledby="svc-title">
      <div className={styles.wrap}>
        <Head label="Dịch vụ" title="Làm mới, khắc tên, sửa vừa tay." id="svc-title">
          <p>Ngoài bán món làm sẵn và nhận đặt làm, tiệm còn khắc chữ, sửa chữa và thu đổi cho món bạn đang có.</p>
        </Head>
        <ul className={styles.svcGrid}>
          {SERVICES.map((s) => (
            <li key={s.id} className={styles.svc} data-kn="rise">
              <h3 className={styles.h3s}>{s.t}</h3>
              <p className={styles.bodyS}>{s.d}</p>
              <p className={styles.svcNote}>{s.note}</p>
            </li>
          ))}
        </ul>
        <div className={styles.bench}>
          <div className={styles.benchItem} data-kn="rise">
            <p className={styles.kind}>Xem thử khắc chữ</p>
            <Engrave />
          </div>
          <div className={styles.benchItem} data-kn="rise">
            <p className={styles.kind}>Thước nới và thu cỡ</p>
            <SizeGauge />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Craft() {
  return (
    <section className={styles.sec} id="che-tac" aria-labelledby="craft-title">
      <div className={styles.wrap}>
        <Head label="Quy trình đặt làm" title="Năm bước từ câu chuyện đến món trang sức." id="craft-title">
          <p>Bước nào cũng có phiếu ghi lại và có người soi lại. Thời gian thường 7 – 14 ngày tuỳ mẫu.</p>
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

export function Care() {
  return (
    <section className={styles.sec} id="bao-hanh" aria-labelledby="care-title">
      <div className={`${styles.wrap} ${styles.careGrid}`}>
        <div className={styles.careCopy}>
          <p className={styles.label}>Bảo quản & bảo hành</p>
          <h2 id="care-title" className={styles.h2}><Wipe>Giữ vẻ đẹp theo năm tháng.</Wipe></h2>
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
      <div className={`${styles.wrap} ${styles.policyWrap}`}>
        <ul className={styles.policies}>
          {POLICIES.map((p) => (
            <li key={p.t} data-kn="rise">
              <h3 className={styles.h3s}>{p.t}</h3>
              <p className={styles.bodyS}>{p.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Visit() {
  return (
    <section className={styles.sec} id="gio-mo-cua" aria-labelledby="visit-title">
      <div className={`${styles.wrap} ${styles.visitGrid}`}>
        <div className={styles.visitCopy}>
          <Head label="Giờ mở cửa" title="Ghé tiệm ở Quận Hải Châu." id="visit-title">
            <p>Bạn có thể ghé xem mẫu, thử nhẫn và đo cỡ tay không cần hẹn. Muốn thợ vẽ phác hoặc xem món đặt làm, hãy nhắn trước để tiệm sắp xếp.</p>
          </Head>
          <dl className={styles.visitList} data-kn="rise">
            <div><dt>Khu vực</dt><dd>{CONTACT.place}</dd></div>
            <div><dt>Đo cỡ tay</dt><dd>Miễn phí tại tiệm</dd></div>
            <div><dt>Thanh toán</dt><dd>Tiền mặt hoặc chuyển khoản</dd></div>
          </dl>
        </div>
        <OpenSign />
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
        <div className={styles.mfStill}>
          <Photo img={IMGS.close} sizes="100vw" />
        </div>
      </div>
      <div className={styles.contactShade} aria-hidden="true" />
      <GrainOverlay opacity={0.06} size={160} blendMode="screen" zIndex={1} />
      <Sparkle className={styles.contactSpark} seed={5} desktop={30} mobile={10} />
      <div className={`${styles.wrap} ${styles.contactIn}`}>
        <p className={styles.label}>Đặt làm & tư vấn</p>
        <h2 id="contact-title" className={styles.h2Big}><Wipe>Một món trang sức bắt đầu từ một cuộc trò chuyện.</Wipe></h2>
        <p className={styles.body} data-kn="rise">Gửi cho tiệm ý tưởng, hình tham khảo hoặc cấu hình bạn vừa ước tính. Tiệm sẽ trao đổi dáng, chất liệu và khoảng giá trước khi bắt đầu.</p>
        <div className={styles.ctaRow} data-kn="rise">
          <ShineSweep trigger="loop" every={4.5} duration={1.1} color="rgba(255,244,200,0.7)" className={styles.btnWrap}>
            <a className={styles.btnGold} href={consultHref} data-cursor="">Đặt làm trang sức</a>
          </ShineSweep>
          <a className={styles.btnLine} href="#cau-hinh" data-cursor="">Quay lại phần ước tính giá</a>
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
          <img src={`${ID}/logo-horizontal.svg`} alt="Kim Nguyệt, tiệm kim hoàn Đà Nẵng" width={375} height={96} className={styles.footLogo} />
          <nav aria-label="Liên kết chân trang" className={styles.footNav}>
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            <a href="/demos/kim-hoan/credits">Ảnh &amp; ghi công</a>
          </nav>
        </div>
        <p className={styles.footNote}>Khoảng giá trên trang là giá tham khảo, được xác nhận sau khi thống nhất thiết kế, trọng lượng thật và vật liệu. Đơn giá vàng trên trang không phải giá thời gian thực.</p>
        <p className={styles.footSign}><Mark uid="ft" className={styles.footMark} /><span>Website do {siteConfig.fullName} thiết kế</span></p>
      </div>
    </footer>
  );
}
