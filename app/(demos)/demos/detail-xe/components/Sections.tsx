import Image from "next/image";
import { DraggableGallery, ParallaxLayer, SVGPathDraw, ShineSweep } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { AFTER, COAT_FACTS, FAQ, GALLERY, NAV, PHASES, PHILO, POLICY, PREP, PRINCIPLES } from "../data/content";
import { PRICE_ROWS, VEHICLES, formatVnd, priceFor } from "../data/builder";
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
            <p className={`${s.kicker} ${s.kickerRed}`}>Cách chúng tôi làm việc</p>
            <h2 id="philo-title" className={s.h2}>Kiểm tra trước, <span className={s.chrome}>chỉ làm điều cần</span></h2>
            <p className={s.philoText}>{PHILO}</p>
          </div>
          <div className={s.philoFrame}>
            <ParallaxLayer distance={50} className={s.philoImg}>
              <Image src={`${P}/son-den-guong-1200.webp`} alt="Chi tiết sơn đen phản chiếu trên thân xe" fill sizes="(max-width: 900px) 100vw, 34vw" className={s.cover} />
            </ParallaxLayer>
          </div>
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
            <p className={`${s.kicker} ${s.kickerRed}`}>Dịch vụ</p>
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

export function PriceTable() {
  return (
    <section id="gia" className={s.section} aria-labelledby="gia-title" style={{ paddingTop: 0 }}>
      <div className={s.wrap}>
        <p className={`${s.kicker} ${s.kickerRed}`}>Giá theo dòng xe</p>
        <h2 id="gia-title" className={s.h2}>Giá khởi điểm, <span className={s.chrome}>theo từng dòng xe</span></h2>
        <div className={s.priceWrap}>
          <table className={s.priceTbl}>
            <caption>Giá khởi điểm theo hạng mục và dòng xe (sơn còn tốt)</caption>
            <thead>
              <tr><th scope="col">Hạng mục</th>{VEHICLES.map((v) => <th scope="col" key={v.id}>{v.label}</th>)}</tr>
            </thead>
            <tbody>
              {PRICE_ROWS.map((r) => (
                <tr key={r.id}>
                  <th scope="row">{r.label}</th>
                  {VEHICLES.map((v) => <td key={v.id} data-l={v.label}>{formatVnd(priceFor(r.base, v.mult, r.fixed))}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={s.pkgNote}>Sơn xoáy mờ hoặc xước nhiều làm tăng công đánh bóng (nhân thêm khoảng 1,3 đến 1,7 lần). Giá chưa gồm VAT, mức cuối xác nhận sau khi kiểm tra xe.</p>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className={`${s.section} ${s.carbon}`} aria-labelledby="proc-title" style={{ borderBlock: "1px solid var(--dx-line)" }}>
      <div className={s.wrap}>
        <p className={`${s.kicker} ${s.kickerRed}`}>Quy trình tại xưởng</p>
        <h2 id="proc-title" className={s.h2}>Tiếp nhận, kiểm tra, <span className={s.chrome}>thực hiện, bàn giao</span></h2>
        <div className={s.proc} style={{ marginTop: 48 }}>
          <div className={s.procRail}>
            <SVGPathDraw mode="scroll" className={s.procLine} viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M1 0V100" vectorEffect="non-scaling-stroke" strokeWidth={2} />
            </SVGPathDraw>
            {PHASES.map((p, i) => (
              <div key={p.t} className={s.procStep}>
                <h3><span className={s.num}>{String(i + 1).padStart(2, "0")}</span>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
          <div className={s.handover}>
            <h3>Phiếu bàn giao gồm</h3>
            <ul>
              <li>Tình trạng xe lúc nhận, kèm ảnh các mặt xe</li>
              <li>Hạng mục đã làm, vật tư và sản phẩm đã dùng</li>
              <li>Ảnh sau khi làm các khu vực chính</li>
              <li>Hướng dẫn chăm sóc sau dịch vụ</li>
              <li>Thời hạn và điều kiện bảo hành thi công</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Care() {
  return (
    <section className={s.section} aria-labelledby="care-title">
      <div className={s.wrap}>
        <p className={`${s.kicker} ${s.kickerRed}`}>Chuẩn bị và chăm sóc</p>
        <h2 id="care-title" className={s.h2}>Trước khi đến, <span className={s.chrome}>sau khi nhận xe</span></h2>
        <div className={s.careGrid}>
          <div className={s.careCol}><h3>Trước khi mang xe tới</h3><ul>{PREP.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div className={s.careCol}><h3>Sau dịch vụ</h3><ul>{AFTER.map((x) => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </div>
    </section>
  );
}

export function Booking({ consultHref }: { consultHref: string }) {
  return (
    <section id="dat-lich" className={`${s.section} ${s.carbon}`} aria-labelledby="book-title" style={{ borderBlock: "1px solid var(--dx-line)" }}>
      <div className={s.wrap}>
        <p className={`${s.kicker} ${s.kickerRed}`}>Đặt lịch và bảo hành</p>
        <h2 id="book-title" className={s.h2}>Chính sách <span className={s.chrome}>nói trước, rõ ràng</span></h2>
        <ul className={s.policyGrid}>
          {POLICY.map((p) => <li key={p.t} className={s.policyItem}><h3>{p.t}</h3><p>{p.d}</p></li>)}
        </ul>
        <div className={s.ctaRow} style={{ marginTop: 32 }}>
          <a className={`${s.btn} ${s.btnSolid}`} href={consultHref}>Đặt lịch kiểm tra xe</a>
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
            <p className={`${s.kicker} ${s.kickerRed}`}>Phủ ceramic</p>
            <h2 id="coat-title" className={s.h2}>Nước nói <span className={s.chrome}>thay mọi lời</span></h2>
            <p className={s.lead}>Phủ ceramic là bước cuối của gói bảo vệ: sau khi rửa, tẩy nhiễm và hiệu chỉnh sơn, lớp phủ được thi công từng khu vực và để đóng rắn theo hướng dẫn sản phẩm. Kéo thanh trượt để xem cách nước bám trên bề mặt chưa phủ và đã phủ.</p>
            <div className={s.facts}>
              {COAT_FACTS.map((f) => (
                <div key={f.k} className={s.fact}><h3>{f.k}</h3><p>{f.d}</p></div>
              ))}
            </div>
            <p className={s.finePrint}>Hai ảnh chụp hai bề mặt khác nhau để giải thích nguyên lý chống bám nước, không phải ảnh trước và sau của một chiếc xe. Lớp phủ không đồng nghĩa với chống xước.</p>
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
        <p className={s.lead}>Chọn dòng xe, tình trạng sơn và nhu cầu để xem các bước thi công, thời gian và giá tham khảo của gói phù hợp.</p>
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
            <p className={`${s.kicker} ${s.kickerRed}`}>Dụng cụ và vật tư</p>
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
        <p className={s.lead}>Xưởng ở Quận Ngũ Hành Sơn, Đà Nẵng, mở 08:00 đến 18:00 từ thứ hai đến thứ bảy. Mỗi xe được kiểm tra miễn phí; bạn biết sẽ làm gì, mất bao lâu và chi phí bao nhiêu rồi mới quyết định.</p>
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
            <p style={{ marginTop: 14, maxWidth: "36ch" }}>Cửa hàng chăm sóc xe hơi ở Quận Ngũ Hành Sơn, Đà Nẵng: rửa chi tiết, đánh bóng, phủ ceramic, nội thất, khoang máy.</p>
          </div>
          <div>
            <h3>Liên hệ</h3>
            <ul>
              <li>Quận Ngũ Hành Sơn, Đà Nẵng</li>
              <li>08:00 – 18:00, thứ hai đến thứ bảy</li>
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
          <span>© Gương Phẩm. Giá chưa gồm VAT, xác nhận sau khi kiểm tra xe.</span>
          <span><a href={`${SLUG}/credits`}>Ảnh &amp; ghi công</a> · Thiết kế website: {siteConfig.fullName}</span>
        </div>
      </div>
    </footer>
  );
}
