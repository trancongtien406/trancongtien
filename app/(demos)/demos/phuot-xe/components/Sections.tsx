import Image from "next/image";
import {
  ClipReveal, Counter, MagneticButton, ParallaxLayer, SVGPathDraw, ScrollScrubText, ShineSweep, VelocityMarquee,
} from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { CHECKS, FAQ, NAV, ROUTES } from "../data/content";
import { SpeedLines } from "./SpeedLines";
import { StartLights } from "./StartLights";

const P = "/images/demos/phuot-xe";

/** Dải chữ tăng tốc theo vận tốc cuộn, kẹp giữa hai dải caro. */
export function SpeedBand({ reverse = false, outline = false, words }: { reverse?: boolean; outline?: boolean; words: readonly string[] }) {
  return (
    <div className={`${s.band} ${outline ? s.bandOutline : ""}`} aria-label={words.join(", ")}>
      <span className={s.bandChecker} aria-hidden="true" />
      <VelocityMarquee mode="velocity" speed={reverse ? 90 : 110} boost={2.2} direction={reverse ? -1 : 1} reverseOnScrollUp gap="clamp(28px, 4vw, 64px)" pauseOnHover={false} controls buttonClassName={s.bandBtn} pauseLabel="Dừng dải chữ" playLabel="Chạy dải chữ">
        {words.map((w) => <span key={w} className={s.bandItem}>{w}<i aria-hidden="true" /></span>)}
      </VelocityMarquee>
      <span className={s.bandChecker} aria-hidden="true" />
    </div>
  );
}

export function Manifesto() {
  return (
    <section className={s.manifesto} aria-labelledby="vx-man">
      <div className={s.wrap}>
        <p className={s.kicker}>Vì sao là Vọt</p>
        <h2 id="vx-man" className={s.srOnly}>Tuyên ngôn</h2>
        <ScrollScrubText as="p" className={s.manText} dim={0.16}>
          Một chiếc xe tốt không cần khoe. Nó chỉ cần nổ máy ngay lần đầu, phanh đúng lúc và đưa bạn về đúng nơi. Phần còn lại là cung đường, và bạn.
        </ScrollScrubText>
      </div>
    </section>
  );
}

export function Routes() {
  return (
    <section id="cung-duong" className={s.routes} aria-labelledby="vx-routes">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <p className={s.kicker}>03 · Cung đường</p>
          <h2 id="vx-routes" className={s.h2} data-vx="slash">Bốn cung đường để mở máy.</h2>
          <p className={s.lead}>Mỗi cung gợi ý kèm dòng xe hợp tay lái. Số km là ước lượng, thay đổi theo điểm xuất phát và đường bạn chọn.</p>
        </div>
        <div className={s.routeTrack}>
          <SVGPathDraw mode="scroll" start="top 70%" end="bottom 40%" className={s.routePath} viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 0C45 50 55 100 50 150S45 250 50 300 55 400 50 450 45 550 50 600 55 700 50 750 45 850 50 900 52 960 50 1000" stroke="currentColor" strokeWidth="6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </SVGPathDraw>
          <SVGPathDraw mode="scroll" start="top 70%" end="bottom 40%" className={s.routePathM} viewBox="0 0 20 1000" preserveAspectRatio="none" aria-hidden="true">
            <path d="M10 0V1000" stroke="currentColor" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </SVGPathDraw>
          <ol className={s.routeList}>
            {ROUTES.map((r, i) => (
              <li key={r.id} className={`${s.route} ${i % 2 ? s.routeR : ""}`}>
                <span className={s.routePin} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <ClipReveal variant="polygon" from={i % 2 ? "right" : "left"} className={s.routeImg}>
                  <Image src={`${P}/${r.img}-1200.webp`} alt={r.alt} width={1200} height={Math.round((1200 * r.h) / r.w)} sizes="(max-width: 900px) 92vw, 44vw" className={s.cover} loading="lazy" />
                </ClipReveal>
                <div className={s.routeBody} data-vx="rise">
                  <p className={s.routeKm}><Counter value={r.km} duration={1.5} className={s.routeNum} /><span>&nbsp;km</span><small>{r.kmNote}</small></p>
                  <h3 className={s.h3}>{r.name}</h3>
                  <p>{r.text}</p>
                  <ul className={s.routeMeta}>
                    <li><span>Thời gian</span><b>{r.time}</b></li>
                    <li><span>Xe gợi ý</span><b>{r.bikes}</b></li>
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="quy-trinh" className={s.process} aria-labelledby="vx-proc">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <p className={s.kicker}>04 · Quy trình</p>
          <h2 id="vx-proc" className={s.h2} data-vx="slash">Bốn đèn, rồi lên đường.</h2>
        </div>
        <StartLights />
      </div>
    </section>
  );
}

export function Garage() {
  return (
    <section className={s.garage} aria-labelledby="vx-garage">
      <div className={`${s.wrap} ${s.garageGrid}`}>
        <div className={s.garageMedia}>
          <ClipReveal variant="inset" from="bottom" className={s.garageMain}>
            <ParallaxLayer distance={34} className={s.garagePar}>
              <Image src={`${P}/dong-co-1200.webp`} alt="Cận cảnh khối động cơ xe máy bằng kim loại" width={1200} height={799} sizes="(max-width: 900px) 92vw, 46vw" className={s.cover} loading="lazy" />
            </ParallaxLayer>
          </ClipReveal>
          <ClipReveal variant="inset" from="right" className={s.garageSub1}>
            <Image src={`${P}/dong-ho-xe-600.webp`} alt="Cận cảnh tay lái và đồng hồ vàng của một chiếc xe cũ" width={600} height={400} sizes="(max-width: 900px) 46vw, 22vw" className={s.cover} loading="lazy" />
          </ClipReveal>
          <ClipReveal variant="inset" from="left" className={s.garageSub2}>
            <Image src={`${P}/mu-bao-hiem-600.webp`} alt="Mũ bảo hiểm treo trên tay lái xe máy" width={600} height={400} sizes="(max-width: 900px) 46vw, 22vw" className={s.cover} loading="lazy" />
          </ClipReveal>
        </div>
        <div className={s.garageText}>
          <p className={s.kicker}>05 · Trước khi giao</p>
          <h2 id="vx-garage" className={s.h2} data-vx="slash">Tám điểm kiểm trước mỗi chuyến.</h2>
          <p className={s.lead}>Mỗi xe được kiểm theo danh sách này trước khi giao, và bạn cùng kiểm lại một lượt khi nhận.</p>
          <ol className={s.checks}>
            {CHECKS.map((c, i) => (
              <li key={c} data-vx="rise"><span>{String(i + 1).padStart(2, "0")}</span>{c}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={s.faq} aria-labelledby="vx-faq">
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <div className={s.secHead}>
          <p className={s.kicker}>06 · Hỏi đáp</p>
          <h2 id="vx-faq" className={s.h2} data-vx="slash">Hỏi trước, đỡ lo sau.</h2>
          <p className={s.lead}>Chưa thấy câu bạn cần? Gửi yêu cầu tư vấn, chúng tôi trả lời trực tiếp.</p>
        </div>
        <div className={s.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} className={s.qa}>
              <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  const consult = buildConsultHref("phuot-xe");
  return (
    <section className={s.closing} aria-labelledby="vx-close">
      <SpeedLines className={s.closeSpeed} />
      <div className={`${s.wrap} ${s.closeInner}`}>
        <p className={s.kicker}>Sẵn sàng</p>
        <h2 id="vx-close" className={s.closeH}>Cờ đã phất. <em>Vọt đi.</em></h2>
        <p className={s.lead}>Gửi yêu cầu tư vấn kèm phiếu giá của bạn. Chúng tôi xác nhận xe, giờ nhận và tiền cọc.</p>
        <div className={s.ctaRow}>
          <MagneticButton strength={0.4} max={16}>
            <ShineSweep trigger="loop" every={3.6} color="rgba(255,255,255,.75)" className={s.shineBtn}>
              <a className={`${s.btn} ${s.btnBlack} ${s.btnBig}`} href={consult}>Tư vấn thuê xe</a>
            </ShineSweep>
          </MagneticButton>
          <a className={`${s.btn} ${s.btnOutlineDark}`} href="#tinh-gia">Quay lại phiếu giá</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <span className={s.footChecker} aria-hidden="true" />
      <div className={`${s.wrap} ${s.footGrid}`}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/phuot-xe/identity/logo-reversed.svg" alt="Vọt Motor Rental" width={150} height={44} />
          <p className={s.footLine}>Thuê xe máy và mô tô phượt ở Đà Nẵng.</p>
        </div>
        <nav aria-label="Chân trang">
          <p className={s.footHead}>Mục lục</p>
          <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </nav>
        <div>
          <p className={s.footHead}>Liên hệ</p>
          <ul>
            <li>Đà Nẵng</li>
            <li>xinchao@vot.example</li>
            <li>0236 000 0000</li>
            <li><a href={buildConsultHref("phuot-xe")}>Gửi yêu cầu tư vấn</a></li>
          </ul>
        </div>
      </div>
      <div className={`${s.wrap} ${s.footBase}`}>
        <span>© Vọt Motor Rental · Giá tham khảo, xác nhận khi tư vấn.</span>
        <span>Website do {siteConfig.fullName} thiết kế · <a href="/demos/phuot-xe/credits">Ảnh &amp; ghi công</a></span>
      </div>
    </footer>
  );
}
