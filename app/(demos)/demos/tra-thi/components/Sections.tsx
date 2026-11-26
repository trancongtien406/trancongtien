import Image from "next/image";
import { ScrollScrubText, SVGPathDraw } from "@/features/showroom/effects";
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
        <Image src={`${P}/doi-che-suong-2000.webp`} alt="" fill sizes="100vw" className={s.cover} loading="lazy" />
        <div className={s.manifestoShade} />
      </div>
      <LeafDrift leaves={6} />
      <div className={`${s.wrap} ${s.manifestoInner}`}>
        <p className={s.kicker}>Về nhà trà</p>
        <ScrollScrubText as="p" className={s.scrub} dim={0.16} start="top 82%" end="bottom 62%">
          Tịch Trà là một nhà trà nhỏ ở Quận Hải Châu. Mỗi bàn có một bộ ấm chén và bếp nước đun tại chỗ, nhân viên pha nước đầu rồi để bạn tự rót những nước sau. Chúng tôi bán trà theo ấm hoặc theo chén, có bánh trà ăn kèm, nhận đặt phòng trà cho nhóm và đóng gói trà khô mang về. Ở đây không có nhạc to, không có đồ uống pha sẵn đá.
        </ScrollScrubText>
        <SVGPathDraw mode="scroll" start="top 85%" end="bottom 70%" className={s.brushRule} viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M4 24C150 10 300 34 520 20S900 8 1196 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </SVGPathDraw>
        <p className={s.manifestoEnd}>Một chén trà, vạn khoảng lặng.</p>
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
        <p className={s.kicker}>Cách pha và nghi thức</p>
        <InkTitle as="h2" className={s.h2}>Ba bước pha một ấm trà tại bàn.</InkTitle>
        <p className={s.lead} style={{ marginTop: 20 }}>Nhân viên làm bước đầu cho bạn xem, sau đó bạn tự rót. Nước đủ nóng, đúng giờ, rót cạn từng nước.</p>
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
        <p className={s.ritualCta}><a className={`${s.btn} ${s.btnLine}`} href="#ghep-tra">Xem nhiệt độ và đồng hồ từng loại</a></p>
      </div>
    </section>
  );
}

const FAQ = [
  ["Tôi chưa biết gì về trà, nên gọi gì?", "Hãy nhờ nhân viên gợi ý theo khẩu vị, hoặc dùng mục Chọn trà ở trên để xem trước. Người mới thường bắt đầu với Bạch trà, Genmaicha hoặc Hồng trà vì ít chát."],
  ["Một ấm trà đủ cho mấy người?", "Một ấm khoảng 150 ml, đủ 2 đến 3 người và pha được từ 3 đến 6 nước tuỳ loại. Nhóm đông hơn nên chọn bộ trà theo số người ở mục Phòng trà và bàn nhóm."],
  ["Có cần đặt trước không?", "Bàn thấp trước hiên nhận khách tại chỗ. Phòng trà Tĩnh và Lặng cần đặt trước ít nhất 1 ngày và đặt cọc 30%. Nhóm từ 5 người nên báo trước dù ngồi bàn thường."],
  ["Giá trong menu là giá gì?", "Là giá tham khảo cho một ấm hoặc một chén thưởng trà tại bàn, chưa gồm bánh trà và phụ phí phòng. Giá có thể thay đổi theo mùa vụ và nguồn cung; nhân viên báo rõ khi bạn gọi."],
  ["Có thể mang trà về không?", "Có. Trà khô đóng gói theo gam, có kèm hướng dẫn nhiệt độ và số giây pha. Bạn cũng có thể mua ấm chén gốm và que đánh matcha."],
  ["Trà có tốt cho sức khoẻ không?", "Chúng tôi không đưa ra khẳng định về công dụng sức khoẻ. Trà ở đây là để thưởng thức hương vị. Nếu bạn có chỉ định riêng về ăn uống, hãy hỏi bác sĩ của bạn."],
  ["Có chỗ cho trẻ em không?", "Có, khi đi cùng người lớn. Quán yên tĩnh và bàn gỗ thấp nên chúng tôi đề nghị phụ huynh trông bé, nhất là gần bếp nước nóng."],
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
        <p className={s.lead}>Gửi bản tóm tắt số người và khung giờ, chúng tôi sẽ xác nhận bàn hoặc phòng trà cho bạn.</p>
        <a className={`${s.btn} ${s.btnPrimary}`} href={CONSULT} data-cursor="Gửi">Hỏi đặt bàn, phòng trà</a>
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
          <p className={s.footNote}>Nhà trà ở Quận Hải Châu, Đà Nẵng. Trà pha tại bàn, phòng trà nhóm, trà mang về.</p>
        </div>
        <nav aria-label="Chân trang">
          <ul>{NAV.slice(0, 4).map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
          <ul>{NAV.slice(4).map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </nav>
        <div className={s.footContact}>
          <p>Quận Hải Châu, Đà Nẵng</p>
          <p><a href="mailto:xin-chao@tichtra.example">xin-chao@tichtra.example</a></p>
          <p>0236&nbsp;000&nbsp;0000</p>
          <p className={s.footMute}>Mở cửa 8:30 đến 21:30 (cuối tuần 8:00 đến 22:00).</p>
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
