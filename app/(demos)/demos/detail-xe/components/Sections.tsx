import Image from "next/image";
import { ClipReveal, DraggableGallery, ParallaxLayer, ScrollScrubText, SVGPathDraw, Counter, ShineSweep } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { COAT_FACTS, FAQ, GALLERY, NAV, PHILO, PRINCIPLES } from "../data/content";
import { PackageCards } from "./PackageCards";
import { CoatSlider } from "./CoatSlider";
import { Builder } from "./Builder";

const P = "/images/demos/detail-xe";
const SLUG = "/demos/detail-xe";

const Arrow = () => (
  <svg className={s.arrow} viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" /></svg>
);

export function Header({ consultHref }: { consultHref: string }) {
  return (
    <header className={s.header}>
      <div className={`${s.wrap} ${s.headerRow}`}>
        <a className={s.logoLink} href="#top" aria-label="Gương Phẩm, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${P}/identity/logo-reversed.svg`} alt="Gương Phẩm" width={296} height={47} />
        </a>
        <nav className={s.nav} aria-label="Điều hướng chính">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <a className={`${s.btn} ${s.btnSm} ${s.headerCta}`} href={consultHref}>Đặt lịch</a>
      </div>
    </header>
  );
}

export function Philosophy() {
  return (
    <section id="triet-ly" className={s.section} aria-labelledby="philo-title">
      <div className={s.wrap}>
        <div className={s.philo}>
          <div>
            <p className={`${s.kicker} ${s.kickerRed}`}>Triết lý</p>
            <h2 id="philo-title" className={s.h2}>Chăm sóc <span className={s.chrome}>chính xác</span>, không đại trà</h2>
            <ScrollScrubText as="p" className={s.philoText} dim={0.22}>{PHILO}</ScrollScrubText>
          </div>
          <ClipReveal className={s.philoFrame} variant="inset" from="bottom" duration={1.2}>
            <ParallaxLayer distance={50} className={s.philoImg}>
              <Image src={`${P}/son-den-guong-1200.webp`} alt="Chi tiết sơn đen phản chiếu trên thân xe" fill sizes="(max-width: 900px) 100vw, 34vw" className={s.cover} />
            </ParallaxLayer>
          </ClipReveal>
        </div>
        <ul className={s.principles}>
          {PRINCIPLES.map((p, i) => (
            <li key={p.t} className={s.principle} data-dx="rise">
              <b>{String(i + 1).padStart(2, "0")}</b>
              <h3 className={s.h3}>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Packages() {
  return (
    <section id="goi" className={s.section} aria-labelledby="goi-title">
      <div className={s.wrap}>
        <div className={s.pkgHead}>
          <div>
            <p className={`${s.kicker} ${s.kickerRed}`}>Gói chăm sóc</p>
            <h2 id="goi-title" className={s.h2}>Năm hạng mục, <span className={s.chrome}>rõ từng bước</span></h2>
          </div>
          <p className={s.lead} style={{ marginTop: 0 }}>Giá dưới đây là mức khởi điểm cho xe sedan. Giá cuối cùng được xác nhận sau khi kiểm tra xe, vì kích thước và tình trạng mỗi xe khác nhau.</p>
        </div>
        <PackageCards />
        <p className={s.pkgNote}>Giá tham khảo, đã gồm vật tư thông thường. Không áp dụng một mức giá cho mọi kích thước và tình trạng xe.</p>
      </div>
    </section>
  );
}

const STEPS = [
  ["Kiểm tra", "Xem sơn dưới đèn, ghi lại vết xước, xoáy mờ và khu vực cần lưu ý, rồi nói rõ điều gì làm được."],
  ["Làm sạch", "Bánh và hốc bánh trước, phun bọt, rửa tiếp xúc từ trên xuống, tẩy nhiễm bề mặt."],
  ["Hiệu chỉnh", "Thử một vùng nhỏ để chọn pad và dung dịch, rồi xử lý theo mức độ cho phép của lớp sơn."],
  ["Bảo vệ", "Lau chuẩn bị, thi công lớp bảo vệ phù hợp và để đóng rắn đúng hướng dẫn sản phẩm."],
  ["Hoàn thiện", "Soát từng khu vực dưới đèn, lau khô, chụp lại tình trạng và hướng dẫn chăm sóc sau đó."],
];

export function Process() {
  return (
    <section className={`${s.section} ${s.carbon}`} aria-labelledby="proc-title" style={{ borderBlock: "1px solid var(--dx-line)" }}>
      <div className={s.wrap}>
        <p className={`${s.kicker} ${s.kickerRed}`}>Năm bước</p>
        <h2 id="proc-title" className={s.h2}>Mọi gói đi qua <span className={s.chrome}>cùng một nhịp</span></h2>
        <div className={s.proc} style={{ marginTop: 48 }}>
          <div className={s.procRail}>
            <SVGPathDraw mode="scroll" className={s.procLine} viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M1 0V100" vectorEffect="non-scaling-stroke" strokeWidth={2} />
            </SVGPathDraw>
            {STEPS.map(([t, d], i) => (
              <div key={t} className={s.procStep}>
                <h3><span className={s.num}>{String(i + 1).padStart(2, "0")}</span>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className={s.counters} role="group" aria-label="Số liệu quy trình">
            <div className={s.counter}><b><Counter value={5} /></b><span>Hạng mục dịch vụ</span></div>
            <div className={s.counter}><b><Counter value={24} duration={1.8} /></b><span>Bước tối đa mỗi xe</span></div>
            <div className={s.counter}><b><Counter value={2} decimals={1} /></b><span>Giờ rửa chi tiết</span></div>
            <div className={s.counter}><b><Counter value={12} /></b><span>Giờ phủ ceramic</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Coating() {
  return (
    <section id="lop-phu" className={s.section} aria-labelledby="coat-title">
      <div className={s.wrap}>
        <div className={s.coat}>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <CoatSlider />
            <span className={s.shotStreak} data-dx-streak="" aria-hidden="true" style={{ zIndex: 2, pointerEvents: "none" }} />
          </div>
          <div>
            <p className={`${s.kicker} ${s.kickerRed}`}>Lớp phủ</p>
            <h2 id="coat-title" className={s.h2}>Nước nói <span className={s.chrome}>thay mọi lời</span></h2>
            <p className={s.lead}>Kéo thanh trượt để so sánh cách nước bám trên bề mặt chưa phủ và bề mặt đã phủ. Đây là điều lớp phủ ceramic làm được: thay đổi cách nước và bụi bám lên sơn.</p>
            <div className={s.facts}>
              {COAT_FACTS.map((f) => (
                <div key={f.k} className={s.fact}><h3>{f.k}</h3><p>{f.d}</p></div>
              ))}
            </div>
            <p className={s.finePrint}>Hai ảnh là ảnh stock của hai bề mặt khác nhau, dùng để giải thích nguyên lý chống bám nước. Chúng không phải ảnh trước và sau của một chiếc xe cụ thể, và lớp phủ không đồng nghĩa với chống xước.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BuilderSection({ consultHref }: { consultHref: string }) {
  return (
    <section id="chon-goi" className={`${s.section} ${s.carbon}`} aria-labelledby="bld-title" style={{ borderBlock: "1px solid var(--dx-line)" }}>
      <div className={s.wrap}>
        <p className={`${s.kicker} ${s.kickerRed}`}>Chọn gói</p>
        <h2 id="bld-title" className={s.h2}>Gói phù hợp với <span className={s.chrome}>chiếc xe của bạn</span></h2>
        <p className={s.lead}>Chọn dòng xe, tình trạng sơn và nhu cầu. Bạn sẽ thấy các bước thi công, thời gian và giá tham khảo ngay bên cạnh.</p>
        <Builder consultHref={consultHref} />
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className={s.section} aria-labelledby="gal-title">
      <div className={s.wrap}>
        <div className={s.galHead}>
          <div>
            <p className={`${s.kicker} ${s.kickerRed}`}>Chi tiết</p>
            <h2 id="gal-title" className={s.h2}>Những thứ <span className={s.chrome}>chạm vào xe bạn</span></h2>
          </div>
        </div>
        <DraggableGallery gap="18px" buttonClassName={s.galBtn} hideScrollbar label="Ảnh chi tiết công việc, kéo ngang hoặc dùng phím mũi tên">
          {GALLERY.map((g) => (
            <figure key={g.img} className={s.shot}>
              <div>
                <Image src={`${P}/${g.img}-1200.webp`} alt={g.alt} width={g.w} height={g.h} sizes="(max-width: 600px) 78vw, 460px" loading="lazy" draggable={false} />
                <span className={s.shotStreak} data-dx-streak="" aria-hidden="true" />
              </div>
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </DraggableGallery>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="cau-hoi" className={s.section} aria-labelledby="faq-title">
      <div className={s.wrap}>
        <p className={`${s.kicker} ${s.kickerRed}`}>Câu hỏi thường gặp</p>
        <h2 id="faq-title" className={s.h2}>Nói trước, <span className={s.chrome}>để khỏi hiểu lầm</span></h2>
        <div className={s.faq}>
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing({ consultHref }: { consultHref: string }) {
  return (
    <section className={`${s.section} ${s.closing} ${s.carbon}`} aria-labelledby="end-title">
      <div className={s.wrap}>
        <p className={`${s.kicker} ${s.kickerRed}`}>Đặt lịch</p>
        <h2 id="end-title" className={s.h2}>Mang xe đến, <span className={s.chrome}>chúng tôi kiểm tra trước</span></h2>
        <p className={s.lead}>Mỗi xe được xem dưới đèn trước khi đề xuất quy trình. Bạn biết rõ sẽ làm gì, mất bao lâu và chi phí bao nhiêu rồi mới quyết định.</p>
        <div className={s.ctaRow}>
          <ShineSweep trigger="loop" every={5} color="rgba(255,255,255,0.75)" className={s.shineBtn}>
            <a className={`${s.btn} ${s.btnSolid}`} href={consultHref}>Đặt lịch kiểm tra xe <Arrow /></a>
          </ShineSweep>
          <a className={s.btn} href="#chon-goi">Chọn gói trước</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.footGrid}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${P}/identity/logo-reversed.svg`} alt="Gương Phẩm" width={296} height={47} style={{ height: 44, width: "auto" }} />
            <p style={{ marginTop: 14, maxWidth: "36ch" }}>Chăm sóc xe hơi chuẩn chi tiết ở Đà Nẵng. Đánh thức vẻ đẹp nguyên bản.</p>
          </div>
          <div>
            <h3>Liên hệ</h3>
            <ul>
              <li>Đà Nẵng</li>
              <li><a href="tel:+842360000000">0236 000 0000</a></li>
              <li><a href="mailto:xin-chao@guongpham.example">xin-chao@guongpham.example</a></li>
            </ul>
          </div>
          <div>
            <h3>Điều hướng</h3>
            <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
          </div>
        </div>
        <div className={s.footBase}>
          <span>© Gương Phẩm. Giá tham khảo, xác nhận sau khi kiểm tra xe.</span>
          <span><a href={`${SLUG}/credits`}>Ảnh &amp; ghi công</a> · Thiết kế website: {siteConfig.fullName}</span>
        </div>
      </div>
    </footer>
  );
}
