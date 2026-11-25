import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { buildConsultHref } from "@/features/showroom/consultation";
import { ClipReveal, ScrollScrubText, StackingCards, VelocityMarquee } from "@/features/showroom/effects";
import { BounceWords } from "./BounceWords";
import { BubbleHost } from "./BubbleHost";
import { CircleWipe } from "./Motion";
import { DragStickers, type StickerSpec } from "./DragStickers";
import { WagButton } from "./WagButton";
import { FAQ, MARQUEE, STEPS } from "../data/content";
import { PACKS, fmtVnd } from "../data/care";
import s from "../brand.module.css";

const img = (f: string, w = 1200) => `/images/demos/pet-vui/${f}-${w}.webp`;

export function Strip() {
  return (
    <div className={s.strip} aria-label="Các dịch vụ chăm sóc">
      <VelocityMarquee mode="velocity" speed={70} boost={0.6} pauseOnHover gap="2.2rem" label="Dịch vụ của Bông Xù" className={s.stripInner}>
        {MARQUEE.map((m, i) => (
          <span key={i} className={s.stripItem}>{m}<svg viewBox="0 0 40 40" aria-hidden="true" className={s.stripPaw}><circle cx="20" cy="26" r="9" fill="currentColor" /><circle cx="8" cy="16" r="4.5" fill="currentColor" /><circle cx="16" cy="8" r="4.5" fill="currentColor" /><circle cx="26" cy="8" r="4.5" fill="currentColor" /><circle cx="33" cy="17" r="4.5" fill="currentColor" /></svg></span>
        ))}
      </VelocityMarquee>
    </div>
  );
}

export function About() {
  return (
    <section className={s.about} aria-labelledby="about-h">
      <div className={`${s.wrap} ${s.aboutGrid}`}>
        <ClipReveal variant="circle" from="center" innerScale={1.25} className={s.aboutDisc}>
          <Image src={img("meo-xam-chai")} alt="Chú mèo xám được chải lông" fill sizes="(max-width: 900px) 80vw, 520px" loading="lazy" style={{ objectFit: "cover", objectPosition: "40% 50%" }} />
        </ClipReveal>
        <div>
          <p className={s.chipInk}>Một tiệm cho cả hai</p>
          <BounceWords as="h2" className={`${s.display} ${s.h2}`} text="Chó mèo đều được *chiều* ở đây" />
          <p className={s.lead} id="about-h">Bông Xù là chỗ để bé sạch thơm và vui vẻ: nước ấm vừa phải, sữa tắm dịu nhẹ, chải gỡ rối chậm rãi, nghỉ giữa chừng khi bé mệt. Chúng mình chỉ làm phần chăm sóc lông và vệ sinh, còn chuyện sức khoẻ xin nhường bác sĩ thú y.</p>
          <ul className={s.ticks}>
            <li><b>Chậm mà chắc.</b> Bé căng thẳng thì dừng, không ép.</li>
            <li><b>Rõ ràng.</b> Biết trước các bước, thời gian và giá tham khảo.</li>
            <li><b>Chó và mèo tách khu.</b> Mèo có góc yên tĩnh riêng.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Packs() {
  return (
    <CircleWipe id="goi" className={s.packs} aria-labelledby="packs-h">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.chipWhite}>Các gói chăm sóc</p>
          <BounceWords as="h2" className={`${s.display} ${s.h2} ${s.onBlue}`} text="Bốn kiểu chiều chuộng, *một mục đích:* bé thoải mái" />
          <p className={`${s.lead} ${s.onBlue}`} id="packs-h">Rê chuột (hoặc chạm) vào thẻ để thổi bong bóng. Giá là giá tham khảo theo cân nặng và độ dài lông, báo chính xác sau khi xem bé.</p>
        </header>
        <ul className={s.packGrid}>
          {PACKS.map((p) => (
            <li key={p.id}>
              <BubbleHost className={`${s.pack} ${s["pack_" + p.color]}`}>
                <div className={s.packPhoto}>
                  <Image src={img(p.photo, 600)} alt={p.alt} fill sizes="(max-width: 700px) 80vw, 280px" loading="lazy" style={{ objectFit: "cover", objectPosition: p.pos }} />
                </div>
                {"addon" in p && p.addon ? <span className={s.packTag}>Thêm vào bất kỳ gói</span> : null}
                <h3 className={`${s.display} ${s.packName}`}>{p.name}</h3>
                <p>{p.blurb}</p>
                <ul className={s.packList}>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <p className={s.packPrice}><span>{"addon" in p && p.addon ? "Thêm từ" : "Từ"}</span> <b>{fmtVnd(p.from)}</b></p>
              </BubbleHost>
            </li>
          ))}
        </ul>
      </div>
    </CircleWipe>
  );
}

export function Process() {
  return (
    <section id="quy-trinh" className={s.process} aria-labelledby="proc-h">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.chipInk}>Một buổi ở Bông Xù</p>
          <BounceWords as="h2" className={`${s.display} ${s.h2}`} text="Từ lúc vào cửa đến lúc *vẫy đuôi* ra về" />
          <p className={s.lead} id="proc-h">Năm chặng, chặng nào cũng có thể dừng lại nếu bé chưa sẵn sàng.</p>
        </header>
        <StackingCards top="6.5rem" offset={14} scaleStep={0.035} className={s.stack} cardClassName={s.stackCard}>
          {STEPS.map((st) => (
            <article key={st.n} className={`${s.stepCard} ${s["sc_" + st.color]}`}>
              <div className={s.stepText}>
                <span className={s.stepBig} aria-hidden="true">{st.n}</span>
                <h3 className={`${s.display} ${s.h3}`}>{st.t}</h3>
                <p>{st.d}</p>
              </div>
              <div className={s.stepPhoto}>
                <Image src={img(st.photo, 600)} alt={st.alt} fill sizes="(max-width: 700px) 90vw, 360px" loading="lazy" style={{ objectFit: "cover", objectPosition: st.pos }} />
              </div>
            </article>
          ))}
        </StackingCards>
      </div>
    </section>
  );
}

const GALLERY = [
  { f: "yorkie-khan-xanh", alt: "Chú Yorkshire ướt được quấn trong chiếc khăn xanh nhạt", cap: "Quấn khăn là xong", size: "lg" },
  { f: "khan-luoc-sua-tam", alt: "Khăn hoạ tiết lá, lược cao su xanh và chai sữa tắm trắng trên sàn gỗ cạnh chân chú chó", cap: "Khăn, lược, sẵn sàng", size: "md" },
  { f: "meo-song-gam", alt: "Chú mèo lông dài nằm trên sofa được chải nhẹ", cap: "Mèo cũng mê chải lông", size: "lg" },
] as const;

export function Gallery() {
  return (
    <section className={s.gallery} aria-labelledby="gal-h">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.chipInk}>Chuyện tắm táp</p>
          <BounceWords as="h2" className={`${s.display} ${s.h2}`} text="Những góc nhỏ *sạch bong*" />
          <span id="gal-h" className={s.srOnly}>Ảnh chó mèo khi chăm sóc</span>
        </header>
        <ul className={s.discs}>
          {GALLERY.map((g, i) => (
            <li key={g.f} className={`${s.discItem} ${s["d_" + g.size]}`} data-i={i}>
              <ClipReveal variant="circle" from="center" innerScale={1.2} className={s.disc}>
                <Image src={img(g.f, 600)} alt={g.alt} fill sizes="(max-width: 700px) 70vw, 320px" loading="lazy" style={{ objectFit: "cover", objectPosition: "50% 40%" }} />
              </ClipReveal>
              <span className={s.discCap}>{g.cap}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className={s.manifesto} aria-label="Điều Bông Xù tin">
      <div className={s.wrapNarrow}>
        <ScrollScrubText as="p" className={`${s.display} ${s.mani}`} dim={0.22}>
          Một chú chó vẫy đuôi, một chú mèo kêu rừ rừ. Chúng mình tin chăm sóc lông là chuyện của sự dịu dàng: chậm lại, nghe bé, và chỉ làm điều bé chịu được.
        </ScrollScrubText>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={s.faq} aria-labelledby="faq-h">
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <header>
          <p className={s.chipInk}>Hỏi đáp</p>
          <BounceWords as="h2" className={`${s.display} ${s.h2}`} text="Điều mọi người *hay hỏi*" />
          <span id="faq-h" className={s.srOnly}>Câu hỏi thường gặp</span>
        </header>
        <div className={s.faqList}>
          {FAQ.map((f, i) => (
            <details key={i} className={s.faqItem} name="faq">
              <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const BOARD: StickerSpec[] = [
  { kind: "bong", x: 6, y: 14, size: 130, rot: -10 },
  { kind: "paw", x: 82, y: 10, size: 100, rot: 14 },
  { kind: "comb", x: 10, y: 68, size: 110, rot: 12, hideSm: true },
  { kind: "bubble", x: 88, y: 62, size: 84, rot: 0 },
  { kind: "star", x: 74, y: 78, size: 80, rot: -14, hideSm: true },
];

export function Closing() {
  return (
    <section className={s.closing} aria-labelledby="close-h">
      <DragStickers items={BOARD} className={s.closingStickers} />
      <div className={s.wrapNarrow}>
        <BounceWords as="h2" className={`${s.display} ${s.h1} ${s.center}`} text="Sẵn sàng biến boss thành *cục bông?*" />
        <p className={`${s.lead} ${s.center}`} id="close-h">Gửi yêu cầu tư vấn với tóm tắt từ công cụ, chúng mình sẽ báo giá cụ thể và gợi ý khung giờ phù hợp cho bé.</p>
        <div className={`${s.heroCtas} ${s.centerRow}`}>
          <WagButton href={buildConsultHref("pet-vui")} tone="red" magnetic>Gửi yêu cầu tư vấn</WagButton>
          <WagButton href="#chon-goi" tone="white">Quay lại chọn gói</WagButton>
        </div>
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
          <img src="/images/demos/pet-vui/identity/logo-primary-reversed.svg" alt="Bông Xù" width={150} height={165} className={s.footLogo} />
          <p>Pet spa &amp; grooming chó mèo tại Đà Nẵng.</p>
        </div>
        <div>
          <h2 className={s.footH}>Liên hệ</h2>
          <p><a href="mailto:chao@bongxu.example">chao@bongxu.example</a></p>
          <p>0236&nbsp;000&nbsp;0000</p>
          <p>Đà Nẵng</p>
        </div>
        <div>
          <h2 className={s.footH}>Trong trang</h2>
          <p><a href="#goi">Gói chăm sóc</a></p>
          <p><a href="#chon-goi">Chọn gói cho bé</a></p>
          <p><a href="#hoi-dap">Hỏi đáp</a></p>
          <p><a href="/demos/pet-vui/credits">Ảnh &amp; ghi công</a></p>
        </div>
      </div>
      <p className={s.footNote}>Bông Xù chỉ chăm sóc lông và vệ sinh cho thú cưng, không cung cấp dịch vụ thú y. Thiết kế web: {siteConfig.fullName}.</p>
    </footer>
  );
}
