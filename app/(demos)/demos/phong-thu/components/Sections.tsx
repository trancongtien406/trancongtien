import Link from "next/link";
import { DraggableGallery, MagneticButton, TextScramble, VelocityMarquee } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { AREA, BOOKING, CHAIN, DELIVERY, FAQ, GEAR, PACKAGES, RATES, ROOMS, vnd } from "../data/content";
import { IMGS } from "../data/images";
import { Estimator } from "./Estimator";
import { FileSizer } from "./FileSizer";
import { Logo } from "./Header";
import { Photo } from "./Photo";
import { Timeline } from "./Timeline";
import { Tracks } from "./Tracks";
import { EqBars } from "./Viz";
import { Vinyl } from "./Vinyl";

function Head({ ch, label, title, lead }: { ch: string; label: string; title: string; lead?: string }) {
  return (
    <header className={s.head} data-pt="rv">
      <p className={`${s.mono} ${s.chTag}`}><span aria-hidden="true">{ch}</span> <TextScramble trigger="view">{label}</TextScramble></p>
      <h2 className={s.h2}>{title}</h2>
      {lead && <p className={s.lead2}>{lead}</p>}
    </header>
  );
}

export function Band() {
  const items = ["Thu giọng", "Thu band", "Podcast", "Voice-over", "Sản xuất beat", "Mix & Master", "Từ 220.000 ₫/giờ", "Mở 09:00 đến 22:00", "WAV 24-bit"];
  return (
    <div className={s.band} aria-label="Dịch vụ, giá từ và giờ làm">
      <VelocityMarquee mode="velocity" speed={60} boost={1.2} reverseOnScrollUp pauseOnHover gap="2.4rem" controls pauseLabel="Dừng dải chữ" playLabel="Chạy dải chữ" buttonClassName={s.mqBtn}>
        {items.map((t, i) => (<span key={t} className={s.bandItem}><i aria-hidden="true">{i % 2 ? "◐" : "●"}</i>{t}</span>))}
      </VelocityMarquee>
    </div>
  );
}

export function Services() {
  return (
    <section id="dich-vu" className={s.sec}>
      <div className={s.wrap}>
        <div className={s.srvTop}>
          <Head ch="01" label="DỊCH VỤ · 6 KÊNH" title="Sáu dịch vụ, mỗi dịch vụ một kênh trên bàn mixer." lead="Thu giọng, thu band, podcast, voice-over, sản xuất beat và mix & master. Kéo fader để nghe hình dạng từng kênh; giá tham khảo theo giờ nằm cạnh mỗi kênh." />
          <div className={s.srvPhoto} data-pt="rise">
            <Photo img={IMGS.launchpad} sizes="(max-width: 900px) 100vw, 34vw" quality={1200} />
          </div>
        </div>
        <Tracks />
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="quy-trinh" className={`${s.sec} ${s.secAlt}`}>
      <div className={s.wrap}>
        <div className={s.procTop}>
          <Head ch="02" label="QUY TRÌNH · 5 CHẶNG" title="Một dự án đi qua năm chặng, từ trao đổi tới giao file." lead="Chuẩn bị, thu, biên tập, mix, master. Cuộn xuống để playhead quét qua từng chặng; mỗi chặng ghi rõ việc phòng làm và việc bạn cần làm." />
          <div className={s.procPhoto} data-pt="rise">
            <Photo img={IMGS.hand} sizes="(max-width: 900px) 60vw, 26vw" quality={1200} />
          </div>
        </div>
        <Timeline />
      </div>
    </section>
  );
}

export function Delivery() {
  return (
    <section id="giao-file" className={s.sec}>
      <div className={s.wrap}>
        <Head ch="03" label="GIAO FILE · CHỈNH SỬA" title="Bạn nhận file gì, chỉnh sửa mấy lần, bao giờ có." lead="Ba định dạng giao, số vòng chỉnh sửa và thời gian đã ghi rõ trước khi đặt cọc. Kéo fader để biết dung lượng file của bài bạn." />
        <ul className={s.delivFacts} data-pt="rv">
          {DELIVERY.revisions.map((r) => (
            <li key={r.k}><span className={`${s.mono} ${s.factK}`}>{r.k}</span><b>{r.v}</b><span>{r.s}</span></li>
          ))}
        </ul>
        <FileSizer />
      </div>
    </section>
  );
}

export function Studio() {
  return (
    <section id="phong-thu" className={`${s.sec} ${s.secAlt}`}>
      <div className={s.wrap}>
        <Head ch="04" label="PHÒNG · THIẾT BỊ" title="Phòng thu, phòng live và phòng điều khiển tách riêng." lead={`Studio ở ${AREA}. Thiết bị nêu theo loại để bạn hình dung chuỗi thu từ micro tới loa; khi đặt lịch, phòng sẽ xác nhận chi tiết cho đúng nhu cầu.`} />
        <div className={s.studioMain}>
          <div className={s.studioBig} data-pt="rise">
            <div className={s.parBox}><Photo img={IMGS.control} sizes="(max-width: 900px) 100vw, 62vw" quality={1200} /></div>
          </div>
          <div className={s.chain}>
            <h3 className={s.h4}>Chuỗi tín hiệu</h3>
            <svg className={s.chainWave} viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
              <path className={s.chainPath} d="M0 20 C 25 2, 35 2, 50 20 S 75 38, 100 20 S 125 2, 150 20 S 175 38, 200 20 S 225 2, 250 20 S 275 38, 300 20 S 325 2, 350 20 S 375 38, 400 20" vectorEffect="non-scaling-stroke" fill="none" strokeWidth="2" stroke="#ff8a1f" />
            </svg>
            <ol className={s.chainList}>
              {CHAIN.map((c, i) => (
                <li key={c.k} className={s.chainItem} style={{ ["--i" as string]: i }}>
                  <span className={`${s.mono} ${s.chainK}`}>{String(i + 1).padStart(2, "0")} · {c.k}</span>
                  <b>{c.name}</b>
                  <span>{c.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <ul className={s.gear} data-pt="rv" aria-label="Thiết bị theo loại">
          {GEAR.map((g) => (
            <li key={g.k} className={s.gearCard}>
              <span className={`${s.mono} ${s.chainK}`}>{g.k}</span>
              <h3 className={s.h4}>{g.name}</h3>
              <ul>{g.items.map((x) => (<li key={x}>{x}</li>))}</ul>
            </li>
          ))}
        </ul>
        <DraggableGallery className={s.gallery} label="Các không gian trong phòng thu" gap="1rem" hideScrollbar buttonClassName={s.galBtn} prevLabel="Ảnh trước" nextLabel="Ảnh sau">
          {ROOMS.map((r) => (
            <figure key={r.img} className={s.room} data-cursor="Kéo">
              <Photo img={IMGS[r.img]} sizes="320px" quality={600} className={s.roomImg} />
              <figcaption><b>{r.name}</b><span>{r.text}</span></figcaption>
            </figure>
          ))}
        </DraggableGallery>
      </div>
    </section>
  );
}

export function Master() {
  return (
    <section id="master" className={`${s.sec} ${s.secVinyl}`}>
      <div className={`${s.wrap} ${s.vinylGrid}`}>
        <Vinyl />
        <div className={s.vinylCopy}>
          <p className={`${s.mono} ${s.chTag}`}><span aria-hidden="true">05</span> <TextScramble trigger="view">MIX &amp; MASTER · SIDE A</TextScramble></p>
          <p className={s.scrub}>Một bản master tốt nghe đúng trên loa phòng khách, tai nghe và cả điện thoại. Mỗi bản được kiểm qua bốn hệ nghe trước khi giao file cuối.</p>
          <ul className={s.vinylList}>
            <li><span className={s.mono}>01</span> Loa kiểm âm phòng điều khiển</li>
            <li><span className={s.mono}>02</span> Tai nghe kiểm âm</li>
            <li><span className={s.mono}>03</span> Loa nhỏ và loa điện thoại</li>
            <li><span className={s.mono}>04</span> Xe hơi hoặc loa bluetooth</li>
          </ul>
          <div className={s.vinylPhoto} data-pt="rise">
            <Photo img={IMGS.vinyl} sizes="(max-width: 900px) 100vw, 40vw" quality={1200} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Rates() {
  return (
    <section id="bang-gia" className={s.sec}>
      <div className={s.wrap}>
        <Head ch="06" label="BẢNG GIÁ · GIỜ VÀ GÓI" title="Giá theo giờ cho từng dịch vụ, và bốn gói trọn bài." lead="Giá tham khảo, chưa gồm thuế. Buổi tối thiểu 2 giờ, từ 6 giờ liên tục giảm 10%. Báo giá cuối được xác nhận trước khi đặt cọc." />
        <div className={s.rateWrap} data-pt="rv">
          <table className={s.rates}>
            <caption className={s.srOnly}>Giá tham khảo theo giờ cho từng loại buổi thu</caption>
            <thead><tr><th scope="col">Hạng mục</th><th scope="col">Có engineer</th><th scope="col">Tự thu</th><th scope="col" className={s.rateNote}>Ghi chú</th></tr></thead>
            <tbody>
              {RATES.map((r) => (
                <tr key={r.id}>
                  <th scope="row">{r.name}</th>
                  <td data-l="Có engineer">{vnd(r.eng)}<small>/giờ</small></td>
                  <td data-l="Tự thu">{r.self ? <>{vnd(r.self)}<small>/giờ</small></> : <span className={s.na}>Không áp dụng</span>}</td>
                  <td className={s.rateNote} data-l="Ghi chú">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className={`${s.h3} ${s.pkgTitle}`}>Gói trọn bài</h3>
        <ul className={s.pkgs} data-pt="rv" aria-label="Các gói dịch vụ">
          {PACKAGES.map((p) => (
            <li key={p.name} className={s.pkg}>
              <span className={`${s.mono} ${s.chainK}`}>{p.for}</span>
              <h4 className={s.h4}>{p.name}</h4>
              <p className={s.pkgPrice}>{vnd(p.price)}</p>
              <ul>{p.inc.map((x) => (<li key={x}>{x}</li>))}</ul>
            </li>
          ))}
        </ul>
        <div className={s.ratePhoto} data-pt="rise"><Photo img={IMGS.faders} sizes="(max-width: 900px) 100vw, 1100px" quality={1200} /></div>
      </div>
    </section>
  );
}

export function EstimatorSection() {
  return (
    <section id="uoc-tinh" className={`${s.sec} ${s.secEst}`}>
      <div className={s.wrap}>
        <div className={s.estTop}>
          <Head ch="07" label="ƯỚC TÍNH BUỔI THU" title="Ước tính buổi thu của bạn." lead="Chọn loại buổi thu, kéo fader số giờ, số track và số người. Nhận số giờ nên dự trù, chi phí tham khảo và checklist chuẩn bị file, nhạc cụ." />
          <div className={s.estPhoto} data-pt="rise">
            <Photo img={IMGS.headphones} sizes="(max-width: 900px) 60vw, 24vw" quality={1200} />
          </div>
        </div>
        <Estimator />
      </div>
    </section>
  );
}

export function Booking() {
  return (
    <section id="dat-lich" className={s.sec}>
      <div className={s.wrap}>
        <Head ch="08" label="ĐẶT LỊCH · CHÍNH SÁCH" title="Giờ làm việc, đặt cọc và dời lịch." lead="Phòng nhận lịch qua biểu mẫu liên hệ và xác nhận lại trong ngày làm việc. Lịch chỉ được giữ sau khi nhận cọc." />
        <div className={s.bookGrid}>
          <div className={s.hoursBox} data-pt="rv">
            <h3 className={s.h4}>Giờ làm việc</h3>
            <dl className={s.hours}>
              {BOOKING.hours.map((h) => (<div key={h.d}><dt>{h.d}</dt><dd className={s.mono}>{h.t}</dd></div>))}
            </dl>
            <p className={s.fieldHint}>Buổi thu cuối ngày nhận lịch đến trước 20:00. Giờ vào phòng tính từ lúc bắt đầu setup.</p>
          </div>
          <ul className={s.policy} data-pt="rv" aria-label="Chính sách đặt cọc và dời lịch">
            {BOOKING.policy.map((p) => (
              <li key={p.k}><span className={`${s.mono} ${s.factK}`}>{p.k}</span><b>{p.v}</b><span>{p.s}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={`${s.sec} ${s.secAlt}`}>
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <Head ch="09" label="Q&A" title="Câu hỏi trước khi vào phòng thu." />
        <div className={s.faqList} data-pt="rv">
          {FAQ.map((f) => (
            <details key={f.q} className={s.faq}>
              <summary>{f.q}<span aria-hidden="true" className={s.faqIcon} /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="lien-he" className={s.contact}>
      <div className={s.contactPhoto} aria-hidden="false"><Photo img={IMGS.micPop} sizes="(max-width: 900px) 100vw, 50vw" quality={1200} /></div>
      <div className={s.contactIn}>
        <p className={`${s.mono} ${s.chTag}`}><span aria-hidden="true">10</span> <TextScramble trigger="view">ĐẶT LỊCH · LÊN SÓNG</TextScramble></p>
        <h2 className={s.h2Big}>Đặt lịch thu âm.</h2>
        <p className={s.lead2}>Kể cho chúng tôi nghe ý tưởng của bạn: loại buổi thu, số người, ngày mong muốn. Phòng sẽ phản hồi để chốt số giờ, báo giá và lịch cọc.</p>
        <div className={s.heroCta}>
          <MagneticButton><a className={`${s.btn} ${s.btnHot}`} href={buildConsultHref("phong-thu")}>Gửi yêu cầu đặt lịch</a></MagneticButton>
          <a className={`${s.btn} ${s.btnGhost}`} href="#uoc-tinh">Ước tính trước</a>
        </div>
        <EqBars bars={40} mirror className={s.contactEq} seed={7} />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.footGrid}`}>
        <div>
          <Logo />
          <p className={s.footTag}>Phòng thu âm tại {AREA}. Thu giọng, thu band, podcast, voice-over, sản xuất beat, mix và master.</p>
        </div>
        <div>
          <p className={`${s.mono} ${s.footH}`}>Liên hệ</p>
          <p className={s.footP}>hello@tanso-studio.example<br />0236 000 0000<br />{AREA}<br />Hằng ngày 09:00 đến 22:00</p>
        </div>
        <nav aria-label="Chân trang">
          <p className={`${s.mono} ${s.footH}`}>Trang</p>
          <ul className={s.footList}>
            <li><a href="#dich-vu">Dịch vụ</a></li><li><a href="#bang-gia">Bảng giá</a></li><li><a href="#dat-lich">Đặt lịch</a></li><li><a href="#hoi-dap">Hỏi đáp</a></li>
            <li><Link href="/demos/phong-thu/credits">Ảnh &amp; ghi công</Link></li>
          </ul>
        </nav>
      </div>
      <p className={s.footSign}>© Tần Số Studio · Thiết kế web bởi {siteConfig.fullName}</p>
    </footer>
  );
}
