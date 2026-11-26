import Image from "next/image";
import { Counter, MagneticButton, ShineSweep, VelocityMarquee } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { CHECKS, FAQ, INCIDENT, NAV, ROUTES, SHOP, TERMS } from "../data/content";
import { ACCESSORIES, DELIVERIES, INSURANCES } from "../data/fleet";
import { vnd } from "../lib/pricing";
import { RouteLine } from "./RouteLine";
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
    <section id="cua-hang" className={s.manifesto} aria-labelledby="vx-man">
      <div className={`${s.wrap} ${s.shopGrid}`}>
        <div>
          <p className={s.kicker}>Về cửa hàng</p>
          <h2 id="vx-man" className={s.shopH} data-vx="slash">Thuê xe máy ở Đà Nẵng, giá rõ từng dòng.</h2>
          <p className={s.shopLead} data-vx="rise">{SHOP.lead}</p>
        </div>
        <dl className={s.shopFacts}>
          {SHOP.facts.map((f) => (
            <div key={f.k} data-vx="rise"><dt>{f.k}</dt><dd>{f.v}</dd><small>{f.d}</small></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Routes() {
  return (
    <section id="cung-duong" className={s.routes} aria-labelledby="vx-routes">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <p className={s.kicker}>03 · Cung đường gợi ý</p>
          <h2 id="vx-routes" className={s.h2} data-vx="slash">Hải Vân, Sơn Trà, Hội An, Bà Nà.</h2>
          <p className={s.lead}>Bốn lộ trình hay đi nhất từ cửa hàng, kèm dòng xe hợp tay lái. Số km và thời gian chỉ là ước lượng, thay đổi theo điểm xuất phát, thời tiết và đường bạn chọn.</p>
        </div>
        <div className={s.routeTrack}>
          <RouteLine />
          <ol className={s.routeList}>
            {ROUTES.map((r, i) => (
              <li key={r.id} className={`${s.route} ${i % 2 ? s.routeR : ""}`}>
                <span className={s.routePin} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div className={s.routeImg} data-vx="cut">
                  <Image src={`${P}/${r.img}-1200.webp`} alt={r.alt} width={1200} height={Math.round((1200 * r.h) / r.w)} sizes="(max-width: 900px) 92vw, 44vw" className={s.cover} loading="lazy" />
                </div>
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
          <p className={s.kicker}>07 · Cách đặt xe</p>
          <h2 id="vx-proc" className={s.h2} data-vx="slash">Đặt xe trong bốn bước.</h2>
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
          <div className={s.garageMain}>
            <Image src={`${P}/dong-co-1200.webp`} alt="Cận cảnh khối động cơ xe máy bằng kim loại" width={1200} height={799} sizes="(max-width: 900px) 92vw, 46vw" className={s.cover} loading="lazy" />
          </div>
          <div className={s.garageSub1} data-vx="cut">
            <Image src={`${P}/dong-ho-xe-600.webp`} alt="Cận cảnh tay lái và đồng hồ vàng của một chiếc xe cũ" width={600} height={400} sizes="(max-width: 900px) 46vw, 22vw" className={s.cover} loading="lazy" />
          </div>
          <div className={s.garageSub2} data-vx="cut">
            <Image src={`${P}/mu-bao-hiem-600.webp`} alt="Mũ bảo hiểm treo trên tay lái xe máy" width={600} height={400} sizes="(max-width: 900px) 46vw, 22vw" className={s.cover} loading="lazy" />
          </div>
        </div>
        <div className={s.garageText}>
          <p className={s.kicker}>08 · Kiểm xe</p>
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

export function Handover() {
  return (
    <section id="giao-nhan" className={s.handover} aria-labelledby="vx-hand">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <p className={s.kicker}>04 · Giao nhận và phụ kiện</p>
          <h2 id="vx-hand" className={s.h2} data-vx="slash">Nhận xe ở đâu cũng được.</h2>
          <p className={s.lead}>Bốn cách nhận và trả xe, cộng phụ kiện thuê thêm. Giá tham khảo, tính trong phiếu giá ở phần ước tính.</p>
        </div>
        <ul className={s.deliverGrid}>
          {DELIVERIES.map((d, i) => (
            <li key={d.id} className={s.deliver} data-vx="rise">
              <span className={s.deliverNo}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={s.h3}>{d.name}</h3>
              <p>{d.desc}</p>
              <b className={s.deliverPrice}>{d.price === 0 ? "Miễn phí" : vnd(d.price)}</b>
            </li>
          ))}
        </ul>
        <h3 className={`${s.h3} ${s.subHead}`}>Phụ kiện thuê thêm</h3>
        <ul className={s.accList}>
          {ACCESSORIES.map((a) => (
            <li key={a.id} data-vx="rise">
              <span><b>{a.name}</b><small>{a.desc}</small></span>
              <em>{vnd(a.price)}<small>{a.unit === "day" ? " / ngày" : " / lần thuê"}</small></em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Terms() {
  return (
    <section id="dieu-kien" className={s.terms} aria-labelledby="vx-terms">
      <div className={`${s.wrap} ${s.termsGrid}`}>
        <div className={s.secHead}>
          <p className={s.kicker}>05 · Điều kiện thuê</p>
          <h2 id="vx-terms" className={s.h2} data-vx="slash">Giấy tờ, đặt cọc, quy định.</h2>
          <p className={s.lead}>Đọc trước khi đặt để biết cần mang gì. Điều khoản đầy đủ được ghi trong thỏa thuận thuê khi nhận xe.</p>
        </div>
        <dl className={s.termList}>
          {TERMS.map((t) => (
            <div key={t.k} data-vx="rise"><dt>{t.k}</dt><dd>{t.v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Cover() {
  return (
    <section id="bao-hiem" className={s.cover2} aria-labelledby="vx-cover">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <p className={s.kicker}>06 · Bảo hiểm và sự cố</p>
          <h2 id="vx-cover" className={s.h2} data-vx="slash">Ba gói, và việc cần làm khi có sự cố.</h2>
          <p className={s.lead}>Mô tả chung. Mức khách chịu và phạm vi hỗ trợ cụ thể ghi trong thỏa thuận thuê, cửa hàng đọc lại cùng bạn khi nhận xe.</p>
        </div>
        <ul className={s.planGrid}>
          {INSURANCES.map((p) => (
            <li key={p.id} className={s.plan} data-vx="rise">
              <h3 className={s.h3}>{p.name}</h3>
              <p className={s.planPrice}>{p.perDay === 0 ? "Đi kèm xe" : <>{vnd(p.perDay)}<small> / ngày</small></>}</p>
              <p>{p.desc}</p>
            </li>
          ))}
        </ul>
        <h3 className={`${s.h3} ${s.subHead}`}>Khi xe gặp sự cố</h3>
        <ol className={s.incident}>
          {INCIDENT.map((i) => (
            <li key={i.n} data-vx="rise"><span>{i.n}</span><h4>{i.t}</h4><p>{i.d}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={s.faq} aria-labelledby="vx-faq">
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <div className={s.secHead}>
          <p className={s.kicker}>09 · Hỏi đáp</p>
          <h2 id="vx-faq" className={s.h2} data-vx="slash">Hỏi trước, đỡ lo sau.</h2>
          <p className={s.lead}>Chưa thấy câu bạn cần? Gửi yêu cầu đặt xe và ghi câu hỏi vào ghi chú, cửa hàng trả lời trực tiếp.</p>
        </div>
        <div className={s.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} className={s.qa}>
              <summary><span lang={"lang" in f ? f.lang : undefined}>{f.q}</span><i aria-hidden="true" /></summary>
              <p lang={"lang" in f ? f.lang : undefined}>{f.a}</p>
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
    <section id="dat-xe" className={s.closing} aria-labelledby="vx-close">
      <SpeedLines className={s.closeSpeed} />
      <div className={`${s.wrap} ${s.closeInner}`}>
        <p className={s.kicker}>Đặt xe</p>
        <h2 id="vx-close" className={s.closeH}>Cờ đã phất. <em>Vọt đi.</em></h2>
        <p className={s.lead}>Gửi yêu cầu kèm phiếu giá của bạn: xe, số ngày, nơi nhận. Cửa hàng xác nhận xe còn trống, giờ nhận và tiền cọc, thường trong ngày làm việc. Nhận và trả xe 07:00 đến 21:00 mỗi ngày.</p>
        <div className={s.ctaRow}>
          <MagneticButton strength={0.4} max={16}>
            <ShineSweep trigger="loop" every={3.6} color="rgba(255,255,255,.75)" className={s.shineBtn}>
              <a className={`${s.btn} ${s.btnBlack} ${s.btnBig}`} href={consult}>Đặt xe ngay</a>
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
          <p className={s.footLine}>Cho thuê xe máy và mô tô ở Quận Hải Châu, Đà Nẵng.</p>
        </div>
        <nav aria-label="Chân trang">
          <p className={s.footHead}>Mục lục</p>
          <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </nav>
        <div>
          <p className={s.footHead}>Liên hệ</p>
          <ul>
            <li>Quận Hải Châu, Đà Nẵng</li>
            <li>xinchao@vot.example</li>
            <li>0236 000 0000</li>
            <li>Nhận và trả xe 07:00 đến 21:00</li>
            <li><a href={buildConsultHref("phuot-xe")}>Đặt xe</a></li>
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
