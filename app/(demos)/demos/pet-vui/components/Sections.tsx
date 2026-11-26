import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { buildConsultHref } from "@/features/showroom/consultation";
import { BounceWords } from "./BounceWords";
import { BubbleHost } from "./BubbleHost";
import { CircleWipe } from "./Motion";
import { DragStickers, type StickerSpec } from "./DragStickers";
import { OpenNow } from "./OpenNow";
import { PawWalk } from "./PawWalk";
import { WagButton } from "./WagButton";
import { ABOUT_POINTS, FAQ, INFO_STRIP, INTAKE, PICKUP, POLICIES, STEPS } from "../data/content";
import { SERVICES, SURCHARGES, fmtVnd } from "../data/care";
import s from "../brand.module.css";

const img = (f: string, w = 1200) => `/images/demos/pet-vui/${f}-${w}.webp`;
const Paw = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 40" aria-hidden="true" className={className}><circle cx="20" cy="26" r="9" fill="currentColor" /><circle cx="8" cy="16" r="4.5" fill="currentColor" /><circle cx="16" cy="8" r="4.5" fill="currentColor" /><circle cx="26" cy="8" r="4.5" fill="currentColor" /><circle cx="33" cy="17" r="4.5" fill="currentColor" /></svg>
);

export function Strip() {
  return (
    <div className={s.strip} aria-label="Thông tin nhanh về tiệm">
      <ul className={`${s.wrap} ${s.stripList}`}>
        {INFO_STRIP.map((m) => <li key={m} className={s.stripItem}><Paw className={s.stripPaw} />{m}</li>)}
        <li className={s.stripOpen}><OpenNow /></li>
      </ul>
    </div>
  );
}

export function About() {
  return (
    <section id="ve-tiem" className={s.about} aria-labelledby="about-h">
      <div className={`${s.wrap} ${s.aboutGrid}`}>
        <div className={s.aboutDisc}>
          <Image src={img("meo-xam-chai")} alt="Chú mèo xám được chải lông" fill sizes="(max-width: 900px) 80vw, 520px" loading="lazy" style={{ objectFit: "cover", objectPosition: "40% 50%" }} />
        </div>
        <div>
          <p className={s.chipInk}>Về Bông Xù</p>
          <BounceWords as="h2" className={`${s.display} ${s.h2}`} text="Tiệm tắm và cắt tỉa cho *cả chó lẫn mèo*" />
          <p className={s.lead} id="about-h">Bông Xù là tiệm grooming nhỏ ở Quận Sơn Trà, làm phần chăm sóc lông và vệ sinh: chải, tắm, sấy, tỉa gọn, cắt móng, lau tai, spa. Tiệm không có dịch vụ thú y; bé có vấn đề sức khoẻ xin hỏi bác sĩ thú y trước khi đặt lịch.</p>
          <ul className={s.ticks}>
            {ABOUT_POINTS.map((p) => <li key={p.t}><b>{p.t}.</b> {p.d}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <CircleWipe id="dich-vu" className={s.packs} aria-labelledby="packs-h">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.chipWhite}>Dịch vụ</p>
          <BounceWords as="h2" className={`${s.display} ${s.h2} ${s.onBlue}`} text="Năm dịch vụ, *chọn đúng* điều bé cần" />
          <p className={`${s.lead} ${s.onBlue}`} id="packs-h">Rê chuột (hoặc chạm) vào thẻ để thổi bong bóng. Giá là giá khởi điểm cho bé nhỏ, lông ngắn; bảng giá bên dưới tính theo cân nặng và độ dài lông.</p>
        </header>
        <ul className={s.packGrid}>
          {SERVICES.map((p) => (
            <li key={p.id}>
              <BubbleHost className={`${s.pack} ${s["pack_" + p.color]}`}>
                <div className={s.packPhoto}>
                  <Image src={img(p.photo, 600)} alt={p.alt} fill sizes="(max-width: 700px) 80vw, 280px" loading="lazy" style={{ objectFit: "cover", objectPosition: p.pos }} />
                </div>
                {"addon" in p && p.addon ? <span className={s.packTag}>Thêm vào bất kỳ gói</span> : null}
                <h3 className={`${s.display} ${s.packName}`}>{p.name}</h3>
                <p className={s.packTime}>Thời gian: {p.time}</p>
                <p>{p.blurb}</p>
                <ul className={s.packList}>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <p className={s.packPrice}><span>Từ</span> <b>{fmtVnd(p.from)}</b></p>
              </BubbleHost>
            </li>
          ))}
        </ul>
      </div>
    </CircleWipe>
  );
}

export function Surcharges() {
  return (
    <section className={s.surcharge} aria-labelledby="sur-h">
      <div className={s.wrap}>
        <h2 id="sur-h" className={`${s.display} ${s.h3}`}>Phụ phí có thể phát sinh</h2>
        <ul className={s.surList}>
          {SURCHARGES.map((x) => (
            <li key={x.t}><div><b>{x.t}</b><span>{x.d}</span></div><em>{x.p}</em></li>
          ))}
        </ul>
        <p className={s.priceNote}>Tiệm báo phụ phí (nếu có) sau khi xem lông và trước khi bắt đầu, bạn đồng ý rồi mới làm.</p>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="quy-trinh" className={s.process} aria-labelledby="proc-h">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.chipInk}>Một buổi ở Bông Xù</p>
          <BounceWords as="h2" className={`${s.display} ${s.h2}`} text="Tiếp nhận, tắm, sấy, *hoàn thiện*" />
          <p className={s.lead} id="proc-h">Năm chặng với thời gian dự kiến, chặng nào cũng có thể dừng lại nếu bé chưa sẵn sàng.</p>
        </header>
        <PawWalk>
          {STEPS.map((st) => (
            <li key={st.n} data-step="" className={s.walkItem}>
              <span className={s.walkPaw} aria-hidden="true"><Paw /></span>
              <article className={`${s.stepCard} ${s["sc_" + st.color]}`}>
                <div className={s.stepText}>
                  <span className={s.stepBig} aria-hidden="true">{st.n}</span>
                  <h3 className={`${s.display} ${s.h3}`}>{st.t}</h3>
                  <p className={s.stepMins}>Khoảng {st.mins}</p>
                  <p>{st.d}</p>
                </div>
                <div className={s.stepPhoto}>
                  <Image src={img(st.photo, 600)} alt={st.alt} fill sizes="(max-width: 700px) 90vw, 300px" loading="lazy" style={{ objectFit: "cover", objectPosition: st.pos }} />
                </div>
              </article>
            </li>
          ))}
        </PawWalk>
      </div>
    </section>
  );
}

export function Intake() {
  return (
    <section id="tiep-nhan" className={s.intake} aria-labelledby="intake-h">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.chipInk}>Tiếp nhận, đưa đón và quy định</p>
          <BounceWords as="h2" className={`${s.display} ${s.h2}`} text="Điều cần biết *trước khi* đến" />
          <p className={s.lead} id="intake-h">Để bé an toàn và để các bé trong tiệm không lây bệnh cho nhau, tiệm có vài quy định rõ ràng.</p>
        </header>
        <ul className={s.intakeGrid}>
          {INTAKE.map((x) => (
            <li key={x.t} className={s.intakeCard}>
              <span className={s.packTag}>{x.tag}</span>
              <h3 className={`${s.display} ${s.h3}`}>{x.t}</h3>
              <p>{x.d}</p>
            </li>
          ))}
        </ul>
        <div className={s.intakeSplit}>
          <div className={s.pickup}>
            <div className={s.pickupPhoto}>
              <Image src={img("meo-song-gam", 600)} alt="Chú mèo lông dài nằm trên sofa được chải nhẹ" fill sizes="(max-width: 700px) 60vw, 240px" loading="lazy" style={{ objectFit: "cover", objectPosition: "50% 40%" }} />
            </div>
            <div>
              <h3 className={`${s.display} ${s.h3}`}>{PICKUP.t}</h3>
              <p>{PICKUP.d}</p>
              <ul className={s.packList}>{PICKUP.list.map((l) => <li key={l}>{l}</li>)}</ul>
            </div>
          </div>
          <div className={s.policies}>
            <h3 className={`${s.display} ${s.h3}`}>Chính sách đặt và huỷ</h3>
            <dl>
              {POLICIES.map((p) => <div key={p.t}><dt>{p.t}</dt><dd>{p.d}</dd></div>)}
            </dl>
          </div>
        </div>
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
        <BounceWords as="h2" className={`${s.display} ${s.h1} ${s.center}`} text="Hẹn lịch để boss thành *cục bông?*" />
        <p className={`${s.lead} ${s.center}`} id="close-h">Gửi yêu cầu cùng khung giờ mong muốn và bản ước tính, tiệm sẽ báo giá cụ thể và xác nhận lịch cho bé.</p>
        <div className={`${s.heroCtas} ${s.centerRow}`}>
          <WagButton href={buildConsultHref("pet-vui")} tone="red" magnetic>Gửi yêu cầu đặt lịch</WagButton>
          <WagButton href="#bang-gia" tone="white">Xem lại bảng giá</WagButton>
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
          <p>Tiệm tắm và cắt tỉa lông chó mèo tại Quận Sơn Trà, Đà Nẵng.</p>
        </div>
        <div>
          <h2 className={s.footH}>Liên hệ</h2>
          <p><a href="mailto:chao@bongxu.example">chao@bongxu.example</a></p>
          <p>0236&nbsp;000&nbsp;0000</p>
          <p>Quận Sơn Trà, Đà Nẵng</p>
          <p>Mở 8:00 – 19:00, nghỉ Thứ Hai</p>
        </div>
        <div>
          <h2 className={s.footH}>Trong trang</h2>
          <p><a href="#dich-vu">Dịch vụ</a></p>
          <p><a href="#bang-gia">Bảng giá</a></p>
          <p><a href="#dat-lich">Lịch hẹn</a></p>
          <p><a href="#hoi-dap">Hỏi đáp</a></p>
          <p><a href="/demos/pet-vui/credits">Ảnh &amp; ghi công</a></p>
        </div>
      </div>
      <p className={s.footNote}>Bông Xù chỉ chăm sóc lông và vệ sinh cho thú cưng, không cung cấp dịch vụ thú y. Thiết kế web: {siteConfig.fullName}.</p>
    </footer>
  );
}
