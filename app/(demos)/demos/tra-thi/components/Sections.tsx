import Image from "next/image";
import { ParallaxLayer, ScrollScrubText, SVGPathDraw } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { InkReveal, InkTitle, LeafDrift } from "./Ink";
import { NAV } from "../data/nav";

const P = "/images/demos/tra-thi";
export const CONSULT = buildConsultHref("tra-thi");

export function Manifesto() {
  return (
    <section id="tuyen-ngon" className={s.manifesto}>
      <div className={s.manifestoBg} aria-hidden="true">
        <ParallaxLayer distance={90} className={s.parallaxFill}>
          <Image src={`${P}/doi-che-suong-2000.webp`} alt="" fill sizes="100vw" className={s.cover} loading="lazy" />
        </ParallaxLayer>
        <div className={s.manifestoShade} />
      </div>
      <LeafDrift leaves={6} />
      <div className={`${s.wrap} ${s.manifestoInner}`}>
        <p className={s.kicker}>Tuyên ngôn</p>
        <ScrollScrubText as="p" className={s.scrub} dim={0.16} start="top 82%" end="bottom 62%">
          Tịch là yên lặng. Chúng tôi pha trà chậm, để nước đủ nóng, ấm đủ ấm và lá trà kịp thức dậy. Một bàn trà không cần nhiều lời. Chỉ cần hơi nước bay lên, tiếng rót khe khẽ và một người chịu ngồi lại. Ở đây, bạn không phải vội đi đâu cả.
        </ScrollScrubText>
        <SVGPathDraw mode="scroll" start="top 85%" end="bottom 70%" className={s.brushRule} viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M4 24C150 10 300 34 520 20S900 8 1196 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </SVGPathDraw>
        <p className={s.manifestoEnd}>Uống trà. Ngồi yên. Để mọi thứ diễn ra tự nhiên.</p>
      </div>
    </section>
  );
}

const RITUALS = [
  { no: "01", name: "Thức", sub: "Làm ấm ấm, đánh thức lá", img: "am-nen-lua", alt: "Ấm gốm đặt trên bếp nến nhỏ, tay đang rót nước", w: 2000, h: 3005,
    text: "Tráng ấm bằng nước nóng, đặt lá vào và ngửi hương khô đầu tiên. Lá trà cần vài giây ấm lên trước khi mở lòng.", tags: ["Tráng ấm", "Hít hương khô"] },
  { no: "02", name: "Rót", sub: "Nước đúng nhiệt, tay thật chậm", img: "tay-rot-tra", alt: "Bàn tay rót trà từ ấm nâu lên khay tre", w: 2000, h: 1333,
    text: "Mỗi loại trà có một độ nóng riêng. Rót nước thành dòng mảnh sát thành ấm, hãm đúng số giây rồi rót cạn để lá không bị ngâm quá.", tags: ["Đúng nhiệt", "Đúng giờ"] },
  { no: "03", name: "Lắng", sub: "Cầm chén bằng hai tay", img: "hoi-nuoc", alt: "Nước nóng rót vào chén, hơi bốc lên trong ánh sáng ấm", w: 2000, h: 2998,
    text: "Đợi hơi nước bay lên, ngửi hương trước rồi nhấp ngụm nhỏ. Hậu vị là phần đáng nghe nhất, hãy ngồi yên một nhịp để nó đến.", tags: ["Ngửi hương", "Nghe hậu vị"] },
];

export function Rituals() {
  return (
    <section id="nghi-thuc" className={s.rituals}>
      <div className={s.wrap}>
        <p className={s.kicker}>Ba nghi thức</p>
        <InkTitle as="h2" className={s.h2}>Ba cách trở về với hiện tại.</InkTitle>
      </div>
      <div className={`${s.wrap} ${s.ritualList}`}>
        <SVGPathDraw mode="scroll" start="top 65%" end="bottom 55%" className={s.ritualPath} viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 0C50 90 12 120 12 220S88 330 88 450 14 560 14 680 86 800 86 900 50 960 50 1000" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </SVGPathDraw>
        {RITUALS.map((r, i) => (
          <article key={r.no} className={`${s.ritual} ${i % 2 ? s.ritualFlip : ""}`}>
            <InkReveal className={`${s.ritualImg} ${r.h > r.w ? s.ritualTall : s.ritualWide}`} delay={0.05}>
              <Image src={`${P}/${r.img}-1200.webp`} alt={r.alt} width={r.w} height={r.h} sizes="(max-width: 900px) 92vw, 44vw" className={s.cover} loading="lazy" data-cursor="Ngắm" />
            </InkReveal>
            <div className={s.ritualText}>
              <span className={s.ritualNo} aria-hidden="true">{r.no}</span>
              <InkTitle as="h3" className={s.h3}>{r.name}</InkTitle>
              <p className={s.ritualSub}>{r.sub}</p>
              <p>{r.text}</p>
              <ul className={s.tagRow}>{r.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </article>
        ))}
        <p className={s.ritualCta}><a className={`${s.btn} ${s.btnLine}`} href="#ghep-tra">Xem cách pha từng loại</a></p>
      </div>
    </section>
  );
}

export function Space() {
  return (
    <section id="khong-gian" className={s.space}>
      <div className={s.wrap}>
        <p className={s.kicker}>Không gian</p>
        <InkTitle as="h2" className={s.h2}>Một căn phòng nhỏ, ánh sáng thấp.</InkTitle>
        <p className={s.lead} style={{ marginTop: 20 }}>
          Mặt bàn gỗ, đèn dịu, vài món gốm được chọn kỹ. Mỗi bàn có một bộ trà và nước đun tại bàn, để bạn tự rót khi muốn.
        </p>
      </div>
      <div className={`${s.wrap} ${s.spaceGrid}`}>
        <figure className={s.spaceA}>
          <InkReveal className={s.spaceImg}><Image src={`${P}/ban-tra-den-1200.webp`} alt="Bàn trà gỗ có ấm, chén và đèn dầu nhỏ" width={2000} height={1600} sizes="(max-width: 900px) 92vw, 52vw" className={s.cover} loading="lazy" data-cursor="Ngắm" /></InkReveal>
          <figcaption><b>Bàn trà gỗ.</b> Mỗi bàn một bộ trà, đủ chỗ để ấm, chén và tay bạn.</figcaption>
        </figure>
        <figure className={s.spaceB}>
          <InkReveal className={s.spaceImg} delay={0.1}><Image src={`${P}/am-den-1200.webp`} alt="Ấm gốm đen nhìn từ trên xuống" width={2000} height={3000} sizes="(max-width: 900px) 60vw, 26vw" className={s.cover} loading="lazy" data-cursor="Ngắm" /></InkReveal>
          <figcaption><b>Ấm gốm giữ nhiệt.</b> Mỗi nước pha đều đủ nóng.</figcaption>
        </figure>
        <figure className={s.spaceC}>
          <InkReveal className={s.spaceImg} delay={0.2}><Image src={`${P}/bot-matcha-1200.webp`} alt="Bột trà xanh trong bát gốm xanh trên nền đen" width={2000} height={3000} sizes="(max-width: 900px) 60vw, 26vw" className={s.cover} loading="lazy" data-cursor="Ngắm" /></InkReveal>
          <figcaption><b>Bột trà đánh tại bàn.</b> Rây và đánh ngay khi bạn gọi.</figcaption>
        </figure>
      </div>
    </section>
  );
}

const FAQ = [
  ["Tôi chưa biết gì về trà, nên bắt đầu từ đâu?", "Hãy dùng công cụ Ghép trà ở trên: chọn tâm trạng, thời điểm và món ăn kèm, bạn sẽ có một gợi ý cùng cách pha. Với người mới, các loại ít chát như Bạch trà hay Genmaicha là điểm bắt đầu dễ chịu."],
  ["Giá trong danh mục là giá gì?", "Là giá tham khảo cho một ấm thưởng trà tại bàn. Giá thực tế có thể thay đổi theo mùa vụ và nguồn cung; chúng tôi sẽ báo rõ khi bạn liên hệ."],
  ["Bản tóm tắt buổi trà dùng để làm gì?", "Để bạn gom sẵn số người, khung giờ và bộ trà, rồi sao chép gửi kèm khi liên hệ. Đây chưa phải đặt chỗ; chỗ chỉ được giữ sau khi chúng tôi xác nhận lại với bạn."],
  ["Có cần dụng cụ riêng để pha trà ở nhà không?", "Không nhất thiết. Một ấm nhỏ, một chiếc chén, nước sạch và đồng hồ là đủ. Đồng hồ pha trà trên trang này tính theo mốc thời gian thật nên chạy đúng cả khi bạn chuyển tab."],
  ["Trà có tốt cho sức khoẻ không?", "Chúng tôi không đưa ra khẳng định về công dụng sức khoẻ. Trà ở đây là để thưởng thức hương vị. Nếu bạn có chỉ định riêng về ăn uống, hãy hỏi bác sĩ của bạn."],
  ["Có thể mang trà về không?", "Có. Trà khô đóng gói theo gam, bạn có thể hỏi khi ngồi tại bàn hoặc ghi chú trong lúc liên hệ."],
];

export function Faq() {
  return (
    <section id="hoi-dap" className={s.faq}>
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <div>
          <p className={s.kicker}>Hỏi đáp</p>
          <InkTitle as="h2" className={s.h2}>Vài điều bạn có thể muốn biết.</InkTitle>
        </div>
        <div className={s.faqList}>
          {FAQ.map(([q, a]) => (
            <details key={q} className={s.faqItem}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className={s.closing}>
      <InkReveal className={s.closingBg} duration={2.2}>
        <Image src={`${P}/doi-che-xa-2000.webp`} alt="" fill sizes="100vw" className={s.cover} loading="lazy" />
      </InkReveal>
      <div className={s.closingShade} aria-hidden="true" />
      <div className={`${s.wrap} ${s.closingInner}`}>
        <span className={s.seal} aria-hidden="true">Tịch</span>
        <InkTitle as="h2" className={s.h1small}>Ngồi xuống một chút.</InkTitle>
        <p className={s.lead}>Gửi bản tóm tắt buổi trà của bạn, chúng tôi sẽ cùng chọn trà và sắp bàn.</p>
        <a className={`${s.btn} ${s.btnPrimary}`} href={CONSULT} data-cursor="Gửi">Trao đổi về buổi trà</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <SVGPathDraw mode="view" duration={1.8} className={s.footBrush} viewBox="0 0 1200 30" preserveAspectRatio="none" aria-hidden="true">
        <path d="M6 18C180 6 340 26 600 14S980 6 1194 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </SVGPathDraw>
      <div className={`${s.wrap} ${s.footerGrid}`}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/tra-thi/identity/logo-reversed.svg" alt="Tịch Trà" width={168} height={38} />
          <p className={s.footNote}>Nhà trà tĩnh lặng ở Đà Nẵng. Một chén trà, vạn khoảng lặng.</p>
        </div>
        <nav aria-label="Chân trang">
          <ul>{NAV.slice(0, 4).map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
          <ul>{NAV.slice(4).map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </nav>
        <div className={s.footContact}>
          <p>Đà Nẵng</p>
          <p><a href="mailto:xin-chao@tichtra.example">xin-chao@tichtra.example</a></p>
          <p className={s.footMute}>Địa chỉ và giờ mở cửa được gửi khi bạn liên hệ.</p>
        </div>
      </div>
      <div className={`${s.wrap} ${s.footBottom}`}>
        <span>© Tịch Trà</span>
        <a href="/demos/tra-thi/credits">Ảnh &amp; ghi công</a>
        <span>Thiết kế bởi {siteConfig.fullName}</span>
      </div>
    </footer>
  );
}
