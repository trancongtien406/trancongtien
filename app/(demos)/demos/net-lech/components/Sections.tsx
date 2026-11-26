import { siteConfig } from "@/lib/site";
import styles from "../brand.module.css";
import { SplitWords, VelocityMarquee } from "@/features/showroom/effects";
import { FACTS, HOURS, POLICIES, PRINCIPLES, PROCESS, PRODUCTS } from "../data/content";
import { STYLISTS } from "../data/builder";
import { PriceTable } from "./PriceTable";
import { SlotBar } from "./SlotBar";
import { Photo } from "./Photo";
import { FaqList } from "./Faq";
import { EventLink } from "./EventLink";
import { Lookbook } from "./Lookbook";
import { Builder } from "./Builder";

const B = "/images/demos/net-lech";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="nl-h1" data-nl-hero>
      <div className={styles.wrap}>
        <div className={styles.heroTop} data-nl="issue">
          <span>Nét Lệch / Hair Salon</span>
          <span>Cắt · Uốn · Duỗi · Nhuộm · Phục hồi</span>
          <span>Quận Hải Châu, Đà Nẵng</span>
        </div>
        <div className={styles.heroStage}>
          <div className={styles.heroText}>
            <h1 id="nl-h1" className={styles.h1}>
              <span className={styles.ln} data-nl="h1a">Salon tóc</span>
              <span className={`${styles.ln} ${styles.lnB}`} data-nl="h1b">Đà Nẵng.</span>
            </h1>
            <div className={styles.heroInfo}>
              <p className={styles.eyebrow} data-nl="eyebrow">Salon tóc nam nữ · Quận Hải Châu</p>
              <p className={styles.lead} data-nl="desc">Cắt, uốn, duỗi, nhuộm, tẩy và phục hồi tóc cho khách nam và nữ từ 16 tuổi. Tư vấn trước khi làm, giá nói trước theo độ dài tóc.</p>
              <div className={styles.heroCtas} data-nl="cta">
                <a className={styles.btn} href="#builder">Đặt lịch giữ chỗ</a>
                <a className={`${styles.btn} ${styles.btnGhost}`} href="#services">Xem bảng giá</a>
              </div>
              <ul className={styles.heroFacts} data-nl="slogan" aria-label="Thông tin nhanh">
                {FACTS.map((f) => <li key={f.k}><span>{f.k}</span><b>{f.v}</b></li>)}
              </ul>
            </div>
          </div>
          <figure className={styles.heroPhoto} data-nl="photo">
            <div className={styles.heroPhotoInner}>
              <Photo name="may-tong-do" alt="Tông đơ và lược cắt sát gáy, ảnh đen trắng cận cảnh" sizes="(max-width: 860px) 100vw, 46vw" priority size={1200} position="50% 40%" />
            </div>
            <span className={styles.cover} data-nl="cover" aria-hidden="true" />
          </figure>
        </div>
      </div>
    </section>
  );
}

export function Strip() {
  const words = ["Cắt", "Uốn", "Duỗi", "Nhuộm", "Tẩy", "Phục hồi", "Gội dưỡng"];
  return (
    <div className={styles.strip}>
      <VelocityMarquee className={styles.stripMq} speed={70} boost={2.2} gap="clamp(24px,4vw,56px)" pauseOnHover controls pauseLabel="Dừng dải chữ" playLabel="Chạy dải chữ" label="Các dịch vụ của salon" buttonClassName={styles.stripBtn}>
        {words.map((w) => <span key={w} className={styles.stripWord}>{w}<i aria-hidden="true" /></span>)}
      </VelocityMarquee>
    </div>
  );
}

export function Manifesto() {
  return (
    <section className={`${styles.section}`} id="manifesto" aria-label="Về salon">
      <div className={`${styles.wrap} ${styles.mani}`}>
        <figure className={styles.maniPhoto} data-nl-reveal>
          <Photo name="bong-dang" alt="Bóng dáng người ngửa đầu trước nguồn sáng màu cam" sizes="(max-width: 860px) 80vw, 30vw" size={1200} position="50% 30%" />
        </figure>
        <div className={styles.maniBody}>
          <div data-nl-reveal>
            <span className={styles.rule} data-nl-rule />
            <p className={styles.eyebrow}>Về salon</p>
          </div>
          <SplitWords as="h2" className={styles.h2} duration={0.8}>Một salon, ba lời hứa nhỏ.</SplitWords>
          <p className={styles.story} data-nl-reveal>Nét Lệch là salon tóc ở Quận Hải Châu, nhận khách nam và nữ. Salon làm cắt, uốn, duỗi, nhuộm, tẩy và phục hồi, mỗi ghế một khách để stylist có thời gian nhìn tóc trước khi làm.</p>
          <p className={styles.story} data-nl-reveal>Tên Nét Lệch đến từ đường cắt hơi lệch có chủ ý: không theo khuôn, hợp với chất tóc và nhịp sống của từng người.</p>
          <ul className={styles.principles}>
            {PRINCIPLES.map((p) => (
              <li key={p.n} data-nl-reveal><span className={styles.num}>{p.n}</span><h3 className={styles.h3}>{p.t}</h3><p className={styles.small}>{p.d}</p></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function LookbookSection() {
  return (
    <section className={`${styles.section} ${styles.dark}`} id="lookbook" aria-labelledby="nl-lb-h" data-nl-lookbook>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <div className={styles.lbHead}>
            <div>
              <span className={styles.rule} data-nl-rule style={{ width: "min(100%, 560px)", background: "var(--nl-lime)" }} />
              <p className={styles.eyebrow} style={{ color: "var(--nl-lime)" }}>Lookbook kiểu tóc</p>
            </div>
          </div>
          <h2 id="nl-lb-h" className={styles.h2}>Chọn kiểu theo<br />độ dài và phong cách.</h2>
          <p className={styles.lead} style={{ color: "var(--nl-mute-inv)" }}>Tám kiểu mô tả để mang đến buổi tư vấn: lọc theo độ dài, kỹ thuật, phong cách và mức chăm sóc, rồi đưa kiểu bạn thích vào phần đặt lịch.</p>
        </div>
        <Lookbook />
      </div>
    </section>
  );
}

export function Craft() {
  return (
    <section className={styles.section} id="services" aria-labelledby="nl-craft-h" data-nl-craft>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <div data-nl-reveal>
            <span className={styles.rule} data-nl-rule />
            <p className={styles.eyebrow}>Dịch vụ và bảng giá</p>
          </div>
          <h2 id="nl-craft-h" className={styles.h2} data-nl-reveal>Bảy dịch vụ, giá theo độ dài tóc.</h2>
          <p className={styles.lead} data-nl-reveal>Chọn độ dài tóc để xem giá và thời gian từng dịch vụ. Có thể thêm dịch vụ vào phần đặt lịch ngay trong bảng.</p>
        </div>
        <PriceTable />
      </div>
    </section>
  );
}

export function BuilderSection({ consultHref }: { consultHref: string }) {
  return (
    <section className={`${styles.section} ${styles.concrete}`} id="builder" aria-labelledby="nl-bld-h" data-nl-builder>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <div data-nl-reveal><span className={styles.rule} data-nl-rule /><p className={styles.eyebrow}>Đặt lịch và ước tính</p></div>
          <h2 id="nl-bld-h" tabIndex={-1} className={styles.h2} data-nl-reveal>Chọn dịch vụ, xem giá và thời gian.</h2>
          <p className={styles.lead} data-nl-reveal>Chọn dịch vụ, độ dài tóc và stylist để xem giá và thời gian dự kiến, rồi tạo bản tóm tắt lịch hẹn để gửi khi đặt lịch.</p>
        </div>
        <Builder consultHref={consultHref} />
      </div>
    </section>
  );
}

function PersonArt({ kind }: { kind: number }) {
  const bars =
    kind === 0 ? <path d="M520 -20h70L380 340h-70z" /> :
    kind === 1 ? <><path d="M300 -20h54L170 340h-54z" /><path d="M440 -20h54L310 340h-54z" opacity=".75" /><path d="M580 -20h54L450 340h-54z" opacity=".5" /></> :
    <><path d="M200 -20h60L420 340h-60z" /><path d="M540 -20h60L440 340h-60z" /><path d="M170 250h300v26H170z" opacity=".6" /></>;
  return <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><g fill="#151515">{bars}</g></svg>;
}

export function People() {
  return (
    <section className={`${styles.section} ${styles.dark}`} id="stylists" aria-labelledby="nl-people-h" data-nl-people>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <div data-nl-reveal><span className={styles.rule} data-nl-rule style={{ background: "var(--nl-lime)" }} /><p className={styles.eyebrow} style={{ color: "var(--nl-lime)" }}>Stylist</p></div>
          <h2 id="nl-people-h" className={styles.h2} data-nl-reveal>Ba vai trò tại ghế.</h2>
          <p className={styles.lead} style={{ color: "var(--nl-mute-inv)" }} data-nl-reveal>Chọn stylist theo việc cần làm. Cấp cao hơn phụ thu theo bảng giá.</p>
        </div>
        <ul className={styles.people}>
          {STYLISTS.map((s, i) => (
            <li key={s.id} className={styles.person} data-nl-reveal>
              <div className={styles.personArt}><PersonArt kind={i} /></div>
              <div className={styles.personBody}>
                <p className={styles.personIdx}>{String(i + 1).padStart(2, "0")} / {s.alias}</p>
                <h3 className={styles.h3}>{s.level}</h3>
                <p className={styles.lvl}>{s.role}</p>
                <p>{s.blurb}</p>
                <EventLink className={`${styles.btn} ${styles.btnLime}`} href="#builder" event="nl:stylist" detail={{ id: s.id }}>Chọn vai trò này</EventLink>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.note} style={{ marginTop: 24, maxWidth: "70ch" }}>Mô tả theo vai trò công việc tại ghế.</p>
      </div>
    </section>
  );
}

export function Products() {
  return (
    <section className={styles.section} id="products" aria-labelledby="nl-prod-h">
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <div data-nl-reveal><span className={styles.rule} data-nl-rule /><p className={styles.eyebrow}>Sản phẩm sử dụng</p></div>
          <h2 id="nl-prod-h" className={styles.h2} data-nl-reveal>Dùng gì trên tóc bạn.</h2>
          <p className={styles.lead} data-nl-reveal>Salon dùng sản phẩm chuyên dụng cho salon, chọn theo chất tóc. Dưới đây là các nhóm chính; tên cụ thể được stylist nói rõ khi tư vấn nếu bạn hỏi.</p>
        </div>
        <ul className={styles.prod}>
          {PRODUCTS.map((p) => (
            <li key={p.t} data-nl-reveal><p className={styles.eyebrow}>{p.u}</p><h3 className={styles.h3}>{p.t}</h3><p className={styles.small}>{p.n}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Space() {
  return (
    <section className={styles.space} id="studio" aria-labelledby="nl-space-h">
      <div className={styles.spaceImg}>
        <Photo name="salon-ghe" alt="Dãy ghế da và gương trong một salon tóc, ánh sáng ấm" sizes="100vw" size={2000} position="50% 50%" />
        <div className={styles.spacePanel}>
          <p className={styles.eyebrow} style={{ color: "var(--nl-lime)" }}>Salon và giờ mở cửa</p>
          <h2 id="nl-space-h" className={styles.h2} style={{ fontSize: "clamp(2.2rem,4.6vw,4.4rem)" }}>Mở 09:00 đến 20:00.</h2>
          <p style={{ maxWidth: "42ch" }}>Salon ở Quận Hải Châu, Đà Nẵng, có khu gội riêng, ghế cắt dưới ánh sáng tự nhiên từ cửa kính và khu ngồi chờ. Địa chỉ cụ thể gửi khi xác nhận lịch.</p>
          <p className={styles.eyebrow}>Điện thoại: <span translate="no">0236 000 0000</span></p>
        </div>
      </div>
      <div className={`${styles.wrap} ${styles.hoursWrap}`}>
        <div>
          <h3 className={styles.h3}>Giờ mở cửa</h3>
          <dl className={styles.hours}>
            {HOURS.rows.map((r) => <div key={r.d}><dt>{r.d}</dt><dd>{r.h}</dd></div>)}
          </dl>
        </div>
        <div>
          <h3 className={styles.h3}>Dịch vụ của bạn dài bao lâu?</h3>
          <SlotBar />
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className={styles.section} aria-labelledby="nl-proc-h" data-nl-process>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <div data-nl-reveal><span className={styles.rule} data-nl-rule /><p className={styles.eyebrow}>Quy trình tại salon</p></div>
          <h2 id="nl-proc-h" className={styles.h2} data-nl-reveal>Từ tư vấn đến hoàn thiện.</h2>
          <p className={styles.lead} data-nl-reveal>Bốn bước, ghi thời gian từng bước. Hai bên đồng ý kỹ thuật và giá trước khi bắt đầu.</p>
        </div>
        <ol className={styles.proc}>
          {PROCESS.map((p) => (
            <li key={p.n} data-nl-reveal><span className={styles.procNum} aria-hidden="true">{p.n}</span><h3 className={styles.h3}>{p.t}</h3><p className={styles.eyebrow}>{p.when}</p><p className={styles.small}>{p.d}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Policies() {
  return (
    <section className={`${styles.section} ${styles.dark}`} id="policy" aria-labelledby="nl-pol-h">
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <div data-nl-reveal><span className={styles.rule} data-nl-rule style={{ background: "var(--nl-lime)" }} /><p className={styles.eyebrow} style={{ color: "var(--nl-lime)" }}>Chính sách đặt lịch</p></div>
          <h2 id="nl-pol-h" className={styles.h2} data-nl-reveal>Đặt lịch, cọc và dời lịch.</h2>
        </div>
        <dl className={styles.pol}>
          {POLICIES.map((p) => <div key={p.t} data-nl-reveal><dt className={styles.h3}>{p.t}</dt><dd>{p.d}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className={`${styles.section} ${styles.concrete}`} id="faq" aria-labelledby="nl-faq-h">
      <div className={`${styles.wrap} ${styles.faq}`}>
        <div className={styles.faqSide}>
          <span className={styles.rule} data-nl-rule /><p className={styles.eyebrow}>Câu hỏi thường gặp</p>
          <h2 id="nl-faq-h" className={styles.h2}>Trước khi đặt lịch.</h2>
          <p className={styles.lead}>Giá, đặt lịch, hoá chất và chăm sóc tóc.</p>
        </div>
        <FaqList />
      </div>
    </section>
  );
}

export function Final({ consultHref }: { consultHref: string }) {
  return (
    <section className={`${styles.final} ${styles.lime}`} aria-labelledby="nl-final-h" data-nl-final>
      <span className={styles.wipe} data-nl="wipe" aria-hidden="true" />
      <div className={`${styles.wrap} ${styles.finalGrid}`}>
        <div>
          <p className={styles.eyebrow} data-nl="f-eyebrow">Đặt lịch</p>
          <h2 id="nl-final-h" className={styles.finalH} data-nl="f-h">Giữ một ghế cho kiểu tóc tiếp theo của bạn.</h2>
          <div className={styles.finalCtas} data-nl="f-cta">
            <a className={styles.btn} href={consultHref}>Gửi yêu cầu đặt lịch ↗</a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#builder">Ước tính giá và thời gian</a>
            <a className={styles.textLink} href="#lookbook">Xem lookbook</a>
          </div>
          <p className={styles.note} style={{ marginTop: 18, color: "var(--nl-ink)" }}>Salon xác nhận lịch qua điện thoại sau khi nhận yêu cầu. Trang này không giữ chỗ tự động.</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.finalMark} src={`${B}/identity/symbol.svg`} alt="" width={320} height={320} />
      </div>
    </section>
  );
}

export function Footer({ consultHref }: { consultHref: string }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footTop}>
          <div className={styles.footBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${B}/identity/logo-reversed.svg`} alt="Nét Lệch Hair Studio" width={190} height={56} />
            <p style={{ fontFamily: "var(--nl-display)", fontSize: "1.6rem", textTransform: "uppercase", lineHeight: 1.15 }}>Vẻ đẹp của sự khác biệt.</p>
            <p className={styles.note}>Hair Salon · Quận Hải Châu, Đà Nẵng</p>
          </div>
          <nav aria-label="Chân trang">
            <h2>Khám phá</h2>
            <ul>
              <li><a href="#services">Dịch vụ và giá</a></li><li><a href="#lookbook">Lookbook</a></li><li><a href="#builder">Đặt lịch và ước tính</a></li>
              <li><a href="#stylists">Stylist</a></li><li><a href="#studio">Giờ mở cửa</a></li><li><a href="#policy">Chính sách</a></li><li><a href="#faq">Câu hỏi thường gặp</a></li>
            </ul>
          </nav>
          <div>
            <h2>Liên hệ</h2>
            <ul>
              <li><a href="/demos/net-lech/credits">Ảnh &amp; ghi công</a></li>
              <li><a href={consultHref}>Gửi yêu cầu tư vấn</a></li>
            </ul>
            <p className={styles.note} style={{ marginTop: 10 }}>Hải Châu, Đà Nẵng · 09:00–20:00<br /><span translate="no">0236 000 0000</span> · <span translate="no">lichhen@netlech.example</span></p>
          </div>
        </div>
        <p className={styles.footWord} aria-hidden="true">Nét Lệch</p>
        <div className={styles.footLegal}>
          <p>Giá hiển thị là giá tham khảo, chốt sau khi stylist kiểm tra tóc. Trang này không thu thập thông tin cá nhân và không tự tạo lịch hẹn.</p>
          <p>Website do {siteConfig.fullName} thiết kế. <a href="#top">Về đầu trang ↑</a></p>
        </div>
      </div>
    </footer>
  );
}
