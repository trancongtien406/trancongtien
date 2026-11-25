import { siteConfig } from "@/lib/site";
import styles from "../brand.module.css";
import { PRINCIPLES, PROCESS } from "../data/content";
import { SERVICES, STYLISTS, vnd } from "../data/builder";
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
          <span>Nét Lệch / Hair Studio</span>
          <span>01 — The Difference Issue</span>
          <span>Issue 010</span>
        </div>
        <div className={styles.heroStage}>
          <div className={styles.heroText}>
            <h1 id="nl-h1" className={styles.h1}>
              <span className={styles.ln} data-nl="h1a">Không cần</span>
              <span className={`${styles.ln} ${styles.lnB}`} data-nl="h1b">giống ai.</span>
            </h1>
            <div className={styles.heroInfo}>
              <p className={styles.eyebrow} data-nl="eyebrow">Cut. Color. Character.</p>
              <p className={styles.slogan} data-nl="slogan">Vẻ đẹp của sự khác biệt.</p>
              <p className={styles.lead} data-nl="desc">Khám phá những đường cắt, màu sắc và kết cấu tóc mang dấu ấn riêng. Một diện mạo mới bắt đầu từ lựa chọn của bạn.</p>
              <div className={styles.heroCtas} data-nl="cta">
                <a className={styles.btn} href="#lookbook">Khám phá lookbook</a>
                <a className={`${styles.btn} ${styles.btnGhost}`} href="#builder">Tạo dịch vụ của bạn</a>
              </div>
            </div>
          </div>
          <figure className={styles.heroPhoto} data-nl="photo">
            <div className={styles.heroPhotoInner}>
              <Photo name="may-tong-do" alt="Tông đơ và lược cắt sát gáy, ảnh đen trắng cận cảnh" sizes="(max-width: 860px) 100vw, 46vw" priority size={1200} position="50% 40%" />
            </div>
            <span className={styles.cover} data-nl="cover" aria-hidden="true" />
          </figure>
          <p className={styles.heroCaption} data-nl="caption" aria-hidden="true">Cắt sát / ảnh stock</p>
        </div>
        <p className={styles.heroScroll} data-nl="caption">Cuộn để khám phá ↓</p>
      </div>
    </section>
  );
}

export function Strip() {
  return (
    <div className={styles.strip} aria-hidden="true">
      <div className={`${styles.wrap} ${styles.stripRow}`}>
        <span>Cắt</span><i /><span>Màu</span><i /><span>Cá tính</span>
      </div>
    </div>
  );
}

export function Manifesto() {
  return (
    <section className={`${styles.section}`} id="manifesto" aria-labelledby="nl-mani-h">
      <div className={`${styles.wrap} ${styles.mani}`}>
        <figure className={styles.maniPhoto} data-nl-reveal>
          <Photo name="bong-dang" alt="Bóng dáng người ngửa đầu trước nguồn sáng màu cam" sizes="(max-width: 860px) 80vw, 30vw" size={1200} position="50% 30%" />
        </figure>
        <div className={styles.maniBody}>
          <div data-nl-reveal>
            <span className={styles.rule} data-nl-rule />
            <p className={styles.eyebrow}>03 / The Manifesto</p>
          </div>
          <h2 id="nl-mani-h" className={styles.h2} data-nl-reveal>Khác biệt không cần giải thích.</h2>
          <p className={styles.story} data-nl-reveal>Một mái tóc không chỉ là hình dáng. Đó còn là cách bạn chọn xuất hiện trước thế giới.</p>
          <p className={styles.story} data-nl-reveal>
            Nét Lệch bắt đầu từ một suy nghĩ đơn giản: vẻ đẹp không có một khuôn mẫu duy nhất. Có người thích đường cắt sắc nét, có người yêu những lớp tóc mềm, có người tìm thấy mình trong một màu tóc khác thường. Mỗi lựa chọn đều có lý do riêng. Nét Lệch được hình dung như một không gian để khám phá những lựa chọn ấy, nơi kỹ thuật tạo kiểu gặp cảm hứng thời trang và cá tính đời thường. Không chạy theo một hình mẫu cố định, chúng tôi hướng tới những kiểu tóc hợp với chất tóc, nhịp sống và mong muốn của từng người.
          </p>
          <p className={styles.pullWrap} data-nl-reveal><span className={styles.pull}>Giữ lại cá tính. Thay đổi đường nét.</span></p>
          <ul className={styles.principles}>
            {PRINCIPLES.map((p) => (
              <li key={p.n} data-nl-reveal><span className={styles.num}>{p.n}</span><h3 className={styles.h3}>{p.t}</h3><p className={styles.small}>{p.d}</p></li>
            ))}
          </ul>
          <p className={styles.note} data-nl-reveal>Cắt, nhuộm và tạo kiểu theo cá tính riêng của bạn. <a className={styles.textLink} href="#lookbook">Tìm kiểu tóc của bạn →</a></p>
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
              <p className={styles.eyebrow} style={{ color: "var(--nl-lime)" }}>04 / The Lookbook</p>
            </div>
          </div>
          <h2 id="nl-lb-h" className={styles.h2}>Mỗi mái tóc,<br />một tuyên ngôn.</h2>
          <p className={styles.lead} style={{ color: "var(--nl-mute-inv)" }}>Từ những đường cắt tối giản tới màu sắc táo bạo. Lọc bộ sưu tập theo phong cách và thói quen chăm sóc tóc của bạn.</p>
        </div>
        <Lookbook />
      </div>
    </section>
  );
}

export function Craft() {
  return (
    <section className={styles.section} id="services" aria-labelledby="nl-craft-h" data-nl-craft>
      <div className={`${styles.wrap} ${styles.craft}`}>
        <div className={styles.craftSide}>
          <div data-nl-reveal>
            <span className={styles.rule} data-nl-rule />
            <p className={styles.eyebrow}>05 / The Craft</p>
          </div>
          <h2 id="nl-craft-h" className={styles.h2} data-nl-reveal>Kỹ thuật tạo nên đường nét.</h2>
          <p className={styles.lead} data-nl-reveal>Bốn nhóm dịch vụ, nhiều cách kết hợp. Bắt đầu từ một đường cắt hoặc khám phá một diện mạo hoàn toàn mới.</p>
          <figure className={styles.craftImg} data-nl-reveal>
            <Photo name="dung-cu-nhuom" alt="Cọ nhuộm, bát pha màu và lọn tóc trên mặt bàn trắng" sizes="(max-width: 860px) 70vw, 28vw" size={1200} position="35% 50%" />
          </figure>
        </div>
        <div>
          <ol className={styles.svcList}>
            {SERVICES.map((s, i) => (
              <li key={s.id} className={styles.svcRow} data-nl-reveal>
                <span className={styles.svcNum} aria-hidden="true"><span>{String(i + 1).padStart(2, "0")}</span></span>
                <div className={styles.svcMain}>
                  <p className={styles.eyebrow}>{s.tag}</p>
                  <h3 className={styles.svcName}>{s.name}</h3>
                  <p className={styles.svcDesc}>{s.desc}</p>
                </div>
                <p className={styles.svcPrice}><small>Từ · giá tham khảo</small><b>{vnd(s.basePrice)}</b><small>{s.baseMinutes}&nbsp;phút (tóc ngắn)</small></p>
                <div className={styles.svcAct}>
                  <EventLink className={`${styles.btn} ${styles.btnGhost}`} href="#builder" event="nl:add" detail={{ id: s.id }}>Thêm vào dịch vụ</EventLink>
                </div>
              </li>
            ))}
          </ol>
          <p className={styles.note} style={{ marginTop: 20, maxWidth: "70ch" }}>Giá tham khảo và thời gian dự kiến tính theo tóc ngắn và stylist cơ bản. Chi phí tẩy tóc, chỉnh màu và xử lý nền tóc không nằm trong bảng này và được tư vấn riêng.</p>
        </div>
      </div>
    </section>
  );
}

export function BuilderSection({ consultHref }: { consultHref: string }) {
  return (
    <section className={`${styles.section} ${styles.concrete}`} id="builder" aria-labelledby="nl-bld-h" data-nl-builder>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <div data-nl-reveal><span className={styles.rule} data-nl-rule /><p className={styles.eyebrow}>06 / Build your look</p></div>
          <h2 id="nl-bld-h" tabIndex={-1} className={styles.h2} data-nl-reveal>Tạo nên diện mạo của bạn.</h2>
          <p className={styles.lead} data-nl-reveal>Chọn dịch vụ bạn quan tâm, độ dài tóc và stylist để xem thời gian cùng chi phí dự kiến, rồi tạo bản tóm tắt lịch hẹn.</p>
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
          <div data-nl-reveal><span className={styles.rule} data-nl-rule style={{ background: "var(--nl-lime)" }} /><p className={styles.eyebrow} style={{ color: "var(--nl-lime)" }}>07 / The People</p></div>
          <h2 id="nl-people-h" className={styles.h2} data-nl-reveal>Những người tạo nên đường cắt.</h2>
          <p className={styles.lead} style={{ color: "var(--nl-mute-inv)" }} data-nl-reveal>Ba định hướng tạo kiểu, từ những đường cắt thực dụng tới cách tiếp cận giàu thử nghiệm.</p>
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
                <EventLink className={`${styles.btn} ${styles.btnLime}`} href="#builder" event="nl:stylist" detail={{ id: s.id }}>Chọn định hướng này</EventLink>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.note} style={{ marginTop: 24, maxWidth: "70ch" }}>Ba hướng stylist được mô tả theo phong cách làm việc. Người xuất hiện trong ảnh là ảnh tham khảo phong cách, không phải hồ sơ nhân sự.</p>
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
          <p className={styles.eyebrow} style={{ color: "var(--nl-lime)" }}>08 / The Space</p>
          <h2 id="nl-space-h" className={styles.h2} style={{ fontSize: "clamp(2.2rem,4.6vw,4.4rem)" }}>Không gian cho sự thay đổi.</h2>
          <p style={{ maxWidth: "42ch" }}>Nét Lệch được hình dung như một studio có ánh sáng rõ, vật liệu thô và những đường nét tối giản. Nơi để trò chuyện về mái tóc, thử ý tưởng mới và tìm ra phong cách hợp với mình.</p>
          <p className={styles.eyebrow}>Concrete / Mirror / Light</p>
        </div>
      </div>
      <div className={`${styles.wrap} ${styles.footLegal}`} style={{ borderTop: 0, marginTop: 0, paddingBlock: "16px" }}>
        <p>Ảnh tham khảo không gian studio. Địa chỉ và giờ làm việc sẽ được thông báo khi tư vấn.</p>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className={styles.section} aria-labelledby="nl-proc-h" data-nl-process>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <div data-nl-reveal><span className={styles.rule} data-nl-rule /><p className={styles.eyebrow}>09 / The Process</p></div>
          <h2 id="nl-proc-h" className={styles.h2} data-nl-reveal>Từ ý tưởng tới diện mạo mới.</h2>
          <p className={styles.lead} data-nl-reveal>Một quy trình được hình dung để những lựa chọn về mái tóc trở nên rõ ràng hơn.</p>
        </div>
        <ol className={styles.proc}>
          {PROCESS.map((p) => (
            <li key={p.n} data-nl-reveal><span className={styles.procNum} aria-hidden="true">{p.n}</span><h3 className={styles.h3}>{p.t}</h3><p className={styles.small}>{p.d}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className={`${styles.section} ${styles.concrete}`} id="faq" aria-labelledby="nl-faq-h">
      <div className={`${styles.wrap} ${styles.faq}`}>
        <div className={styles.faqSide}>
          <span className={styles.rule} data-nl-rule /><p className={styles.eyebrow}>10 / Good to know</p>
          <h2 id="nl-faq-h" className={styles.h2}>Trước khi thay đổi.</h2>
          <p className={styles.lead}>Vài điều nên cân nhắc trước khi chọn kiểu tóc hoặc dịch vụ mới.</p>
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
          <p className={styles.eyebrow} data-nl="f-eyebrow">11 / The Next Look</p>
          <h2 id="nl-final-h" className={styles.finalH} data-nl="f-h">Không cần trở thành người khác. Hãy thử một cách khác để là chính mình.</h2>
          <div className={styles.finalCtas} data-nl="f-cta">
            <a className={styles.btn} href={consultHref}>Nhận tư vấn website tiệm tóc ↗</a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#builder">Thử Service Builder</a>
            <a className={styles.textLink} href="#lookbook">Xem lookbook</a>
          </div>
          <p className={styles.note} style={{ marginTop: 18, color: "var(--nl-ink)" }}>Gửi yêu cầu tư vấn để được xác nhận lịch</p>
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
            <p className={styles.note}>Hair Studio · Đà Nẵng</p>
          </div>
          <nav aria-label="Chân trang">
            <h2>Khám phá</h2>
            <ul>
              <li><a href="#lookbook">Lookbook</a></li><li><a href="#services">Dịch vụ</a></li><li><a href="#builder">Service Builder</a></li>
              <li><a href="#stylists">Stylist</a></li><li><a href="#studio">Studio</a></li><li><a href="#faq">Câu hỏi thường gặp</a></li>
            </ul>
          </nav>
          <div>
            <h2>Dự án</h2>
            <ul>
              <li><a href="/demos/net-lech/credits">Ảnh &amp; ghi công</a></li>
              <li><a href={consultHref}>Gửi yêu cầu tư vấn</a></li>
            </ul>
            <p className={styles.note} style={{ marginTop: 10 }}>LP-10 · Hair Studio Website</p>
          </div>
        </div>
        <p className={styles.footWord} aria-hidden="true">Nét Lệch</p>
        <div className={styles.footLegal}>
          <p>Giá hiển thị là giá tham khảo và có thể thay đổi sau khi tư vấn. Trang này không thu thập thông tin cá nhân và không tạo lịch hẹn.</p>
          <p>Website do {siteConfig.fullName} thiết kế. <a href="#top">Về đầu trang ↑</a></p>
        </div>
      </div>
    </footer>
  );
}
