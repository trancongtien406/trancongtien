import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { buildConsultHref } from "@/features/showroom/consultation";
import { SplitWords, VelocityMarquee } from "@/features/showroom/effects";
import { CHARMS, CHARM_MIN, CHARM_PRICE, FAQ, FEE_NOTE, LENGTHS, MOODBOARD, PATTERNS, POLICIES, SERVICES, SHAPES, STEPS, STUDIO } from "../data/content";
import { Flood } from "./Flood";
import { PresetLink } from "./PresetLink";
import { Builder } from "./Builder";
import { GlitchImage } from "./Glitch";
import { HandSVG } from "./HandSVG";
import s from "../brand.module.css";

const IMG = "/images/demos/nail-pop";

export function Strip() {
  const items = ["Gel", "Chrome", "Ombre", "French", "Chấm bi", "Charm", "Đắp gel", "Nail art"];
  return (
    <div className={s.strip}>
      <VelocityMarquee mode="velocity" speed={70} boost={1.6} reverseOnScrollUp pauseOnHover controls gap="0" label="Các kiểu móng" buttonClassName={s.stripBtn} className={s.stripInner}>
        {items.map((t, i) => (
          <span key={t} className={s.stripItem}>{t}<i aria-hidden="true" className={s.stripStar} data-c={i % 3} /></span>
        ))}
      </VelocityMarquee>
    </div>
  );
}

export function Services() {
  return (
    <section className={`${s.section} ${s.services}`} id="dich-vu" aria-labelledby="np-sv">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.kicker}>Dịch vụ và giá tham khảo</p>
          <h2 id="np-sv" className={s.h2}>Sáu kiểu làm, chọn cái hợp mood.</h2>
          <p className={s.lead}>Rê chuột (hoặc chạm) vào thẻ để màu bung ra. Bấm “Thử” để đưa kiểu đó sang công cụ dựng móng bên dưới.</p>
        </header>
        <div className={s.svGrid}>
          {SERVICES.map((v, i) => (
            <Flood key={v.id} color={v.flood} on={v.on}>
              <span className={s.svNo}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={s.h3}>{v.name}</h3>
              <p className={s.svDesc}>{v.desc}</p>
              <dl className={s.svMeta}>
                <div><dt>Thời gian</dt><dd>{v.time}</dd></div>
                <div><dt>Giá tham khảo</dt><dd>{v.price}</dd></div>
              </dl>
              <PresetLink className={s.svLink} preset={v.preset as unknown as Record<string, string>}>Thử kiểu này →</PresetLink>
            </Flood>
          ))}
        </div>
        <p className={s.fine}>Giá tham khảo, chưa gồm phụ phí charm, độ dài đặc biệt hoặc thiết kế phức tạp. Tụi mình báo giá chính xác khi tư vấn.</p>
        <PriceTable />
      </div>
    </section>
  );
}

const vnd = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
const fee = (k: number) => (k ? `+${vnd.format(k * 1000)}` : "Không phụ phí");

function PriceTable() {
  const groups = [
    { t: "Dáng móng", rows: SHAPES.map((x) => [x.name, fee(x.price)]) },
    { t: "Độ dài", rows: LENGTHS.map((x) => [x.name, fee(x.price)]) },
    { t: "Hoạ tiết", rows: PATTERNS.map((x) => [x.name, fee(x.price)]) },
    { t: "Charm", rows: [[CHARMS.filter((c) => c.id !== "khong").map((c) => c.name).join(", "), `+${vnd.format(CHARM_PRICE * 1000)} mỗi charm (+${CHARM_MIN} phút)`]] },
  ];
  return (
    <div className={s.fees} aria-labelledby="np-fee">
      <h3 id="np-fee" className={s.h3}>Phụ phí theo lựa chọn</h3>
      <p className={s.fine}>{FEE_NOTE}</p>
      <div className={s.feeGrid}>
        {groups.map((g) => (
          <dl key={g.t} className={s.feeCard}>
            <dt className={s.feeH}>{g.t}</dt>
            {g.rows.map(([a, b]) => <dd key={a} className={s.feeRow}><span>{a}</span><b>{b}</b></dd>)}
          </dl>
        ))}
      </div>
    </div>
  );
}

export function BuilderSection() {
  return (
    <section className={`${s.section} ${s.builderSec}`} id="builder" aria-labelledby="np-bd">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.kicker}>Công cụ dựng móng</p>
          <h2 id="np-bd" className={s.h2}>Dựng bộ móng, xem trên tay.</h2>
          <p className={s.lead}>Chọn dáng, độ dài, màu và hoạ tiết. Bàn tay bên phải đổi ngay, kèm thời gian, giá tham khảo và từng bước tụi mình sẽ làm.</p>
        </header>
        <Builder />
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className={s.manifesto} id="gioi-thieu" aria-labelledby="np-ab">
      <i className={s.mDots} aria-hidden="true" />
      <div className={`${s.wrap} ${s.aboutGrid}`}>
        <div>
          <p className={`${s.kicker} ${s.kickerLight}`}>Về Chấm Chanh</p>
          <h2 id="np-ab" className={s.mText}>
            <SplitWords as="span">Móng không cần ngoan. Chọn màu to, chọn chấm bi lớn.</SplitWords>
          </h2>
        </div>
        <div className={s.aboutBody}>
          <p>Chấm Chanh là tiệm nail nhỏ ở {STUDIO.area}. Tụi mình làm sơn gel, đắp gel nối móng, nail art vẽ tay, chrome và đính charm; khách mang mẫu của mình tới hoặc chọn từ bảng mẫu của tiệm.</p>
          <ul className={s.aboutList}>
            <li><b>Báo giá trước khi làm.</b> Giá và thời gian ước tính ghi rõ theo lựa chọn của bạn.</li>
            <li><b>Làm theo dáng móng thật.</b> Mẫu được điều chỉnh theo độ dài và dáng móng của từng người.</li>
            <li><b>Hỏi dị ứng trước.</b> Sản phẩm dùng được trao đổi trước khi bắt đầu.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const MOOD_META = [
  "Sơn gel design · 60 – 90 phút · từ 220.000 ₫",
  "Nail art vẽ tay, hoạ tiết zebra · 90 – 150 phút · từ 350.000 ₫",
  "Gel design, mỗi ngón một màu · 60 – 90 phút · từ 220.000 ₫",
  "Sơn gel cơ bản, màu tươi · 45 – 60 phút · từ 150.000 ₫",
  "Gel design, hai tay cùng tông · 60 – 90 phút · từ 220.000 ₫",
];

export function Moodboard() {
  const sizes = "(max-width: 700px) 46vw, (max-width: 1100px) 30vw, 22vw";
  return (
    <section className={`${s.section} ${s.mood}`} id="mau-mong" aria-labelledby="np-mood">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={`${s.kicker} ${s.kickerLight}`}>Mẫu móng để tham khảo</p>
          <h2 id="np-mood" className={`${s.h2} ${s.onDark}`}>Mẫu móng, kiểu làm và giá đi kèm.</h2>
        </header>
        <ul className={s.moodGrid}>
          {MOODBOARD.map((m, i) => (
            <li key={m.file} className={s.moodItem} data-i={i}>
              <GlitchImage file={m.file} alt={m.alt} sizes={sizes} ratio={m.w > m.h ? "3 / 2" : "2 / 3"} />
              <p className={s.moodLabel}>{m.label}</p>
              <p className={s.moodMeta}>{MOOD_META[i]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className={`${s.section} ${s.process}`} id="quy-trinh" aria-labelledby="np-pr">
      <div className={`${s.wrap} ${s.procGrid}`}>
        <div className={s.procPhoto}>
          <div className={s.procMain}>
            <Image src={`${IMG}/chon-mau-khay-hong-1200.webp`} alt="Khách chọn màu trên bảng mẫu móng, khăn hồng" width={1200} height={800} sizes="(max-width: 900px) 92vw, 520px" className={s.procImg} />
          </div>
          <Image src={`${IMG}/bang-mau-que-nail-600.webp`} alt="Các que mẫu móng xếp cánh quạt trên nền trắng" width={600} height={400} sizes="220px" className={s.procSmall} />
        </div>
        <div className={s.procBody}>
          <p className={s.kicker}>Quy trình làm móng</p>
          <h2 id="np-pr" className={s.h2}>Bốn bước, không vội.</h2>
          <div className={s.procList}>
            <ol>
              {STEPS.map((x, i) => (
                <li key={x.t} className={s.step}>
                  <span className={s.stepNo} data-c={i % 3}>{i + 1}</span>
                  <div><h3 className={s.h3}>{x.t}</h3><p>{x.d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Policies() {
  return (
    <section className={`${s.section} ${s.policies}`} id="chinh-sach" aria-labelledby="np-po">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.kicker}>Chính sách của tiệm</p>
          <h2 id="np-po" className={s.h2}>Đặt cọc, đổi lịch, chỉnh sửa và vệ sinh.</h2>
          <p className={s.lead}>Viết rõ để bạn biết trước điều gì xảy ra khi đặt lịch, đổi giờ hoặc móng cần chỉnh lại.</p>
        </header>
        <ul className={s.polGrid}>
          {POLICIES.map((p, i) => (
            <li key={p.t} className={s.polCard} data-c={i % 3}>
              <h3 className={s.h3}>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className={`${s.section} ${s.faq}`} id="hoi-dap" aria-labelledby="np-fq">
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <header>
          <p className={s.kicker}>Hỏi đáp</p>
          <h2 id="np-fq" className={s.h2}>Điều mọi người hay hỏi.</h2>
        </header>
        <div className={s.faqList}>
          {FAQ.map((f, i) => (
            <details key={f.q} className={s.qa} name="np-faq" open={i === 0}>
              <summary>{f.q}<i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className={s.closing} aria-labelledby="np-cl">
      <i className={s.cDots} aria-hidden="true" />
      <div className={s.closeHand} aria-hidden="true">
        <HandSVG colors={["#e6ff00", "#1f3bff", "#ffffff", "#e6ff00", "#1f3bff"]} accent="#0d0d0f" shape="coffin" length="dai" pattern="cham" charm="sao" charmCount={3} label="Bàn tay móng coffin chấm bi" />
      </div>
      <div className={`${s.wrap} ${s.closeInner}`}>
        <h2 id="np-cl" className={s.closeTitle}>Cho móng một cuộc chơi mới.</h2>
        <a className={`${s.btn} ${s.btnLime} ${s.btnHuge}`} href={buildConsultHref("nail-pop")} data-cursor="Đặt lịch">Gửi yêu cầu tư vấn →</a>
        <p className={s.closeNote}>Báo trước nếu bạn dị ứng hoá chất, keo hoặc gel để tụi mình chọn sản phẩm phù hợp.</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.footGrid}`}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${IMG}/identity/logo-reversed.svg`} alt="Chấm Chanh" width={220} height={38} />
          <p className={s.footTag}>Nail studio ở Đà Nẵng. Màu to, móng vui.</p>
        </div>
        <ul className={s.footList}>
          <li>{STUDIO.area}</li>
          <li>Mở cửa {STUDIO.hours}</li>
          <li>hello@chamchanh.example</li>
          <li>0236 000 0000</li>
        </ul>
        <ul className={s.footList}>
          <li><a href="#dich-vu">Dịch vụ và giá</a></li>
          <li><a href="#builder">Dựng móng</a></li>
          <li><a href="#dat-lich">Đặt lịch</a></li>
          <li><a href="#chinh-sach">Chính sách</a></li>
          <li><a href="/demos/nail-pop/credits">Ảnh &amp; ghi công</a></li>
        </ul>
      </div>
      <p className={`${s.wrap} ${s.sign}`}>Giao diện do {siteConfig.fullName} thiết kế.</p>
    </footer>
  );
}
