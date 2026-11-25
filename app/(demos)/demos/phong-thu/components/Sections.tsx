import Link from "next/link";
import { ClipReveal, DraggableGallery, MagneticButton, ParallaxLayer, SVGPathDraw, ScrollScrubText, SplitWords, TextScramble, VelocityMarquee } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { CHAIN, FAQ, RATES, ROOMS, vnd } from "../data/content";
import { IMGS } from "../data/images";
import { Estimator } from "./Estimator";
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
      <SplitWords as="h2" className={s.h2}>{title}</SplitWords>
      {lead && <p className={s.lead2}>{lead}</p>}
    </header>
  );
}

export function Band() {
  const items = ["Thu giọng", "Thu band", "Podcast", "Voice-over", "Mix & Master", "24-bit WAV", "Buồng thu riêng", "Loa kiểm âm"];
  return (
    <div className={s.band} aria-label="Dịch vụ và thông số">
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
          <Head ch="01" label="MIXER · 5 KÊNH" title="Mỗi dịch vụ là một kênh trên bàn mixer của bạn." lead="Chọn kênh bạn cần. Kéo fader để nghe hình dạng của từng kênh; giá tham khảo theo giờ nằm cạnh mỗi kênh." />
          <ClipReveal variant="inset" from="right" className={s.srvPhoto} innerScale={1.15}>
            <Photo img={IMGS.launchpad} sizes="(max-width: 900px) 100vw, 34vw" quality={1200} />
          </ClipReveal>
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
          <Head ch="02" label="TIMELINE · 5 CHẶNG" title="Một bản thu đi qua năm chặng trên timeline." lead="Cuộn xuống để playhead quét qua từng chặng, từ trao đổi ban đầu tới bản master cuối." />
          <ClipReveal variant="circle" from="center" origin="50% 50%" className={s.procPhoto} innerScale={1.2}>
            <Photo img={IMGS.hand} sizes="(max-width: 900px) 60vw, 26vw" quality={1200} />
          </ClipReveal>
        </div>
        <Timeline />
      </div>
    </section>
  );
}

export function Studio() {
  return (
    <section id="phong-thu" className={s.sec}>
      <div className={s.wrap}>
        <Head ch="03" label="PHÒNG · THIẾT BỊ" title="Không gian được xử lý âm học, chuỗi tín hiệu để người thu yên tâm." lead="Phòng điều khiển, buồng thu giọng và phòng live tách riêng. Thiết bị nêu theo loại để bạn hình dung chuỗi thu từ micro tới loa." />
        <div className={s.studioMain}>
          <div className={s.studioBig}>
            <ClipReveal variant="inset" from="bottom" innerScale={1.1}>
              <div className={s.parBox}><ParallaxLayer distance={50} className={s.parLayer}><Photo img={IMGS.control} sizes="(max-width: 900px) 100vw, 62vw" quality={1200} /></ParallaxLayer></div>
            </ClipReveal>
          </div>
          <div className={s.chain}>
            <h3 className={s.h4}>Chuỗi tín hiệu</h3>
            <SVGPathDraw className={s.chainWave} viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true" duration={2.2}>
              <path d="M0 20 C 25 2, 35 2, 50 20 S 75 38, 100 20 S 125 2, 150 20 S 175 38, 200 20 S 225 2, 250 20 S 275 38, 300 20 S 325 2, 350 20 S 375 38, 400 20" vectorEffect="non-scaling-stroke" strokeWidth="2" stroke="#ff8a1f" />
            </SVGPathDraw>
            <ol className={s.chainList}>
              {CHAIN.map((c, i) => (
                <li key={c.k} className={s.chainItem}>
                  <span className={`${s.mono} ${s.chainK}`}>{String(i + 1).padStart(2, "0")} · {c.k}</span>
                  <b>{c.name}</b>
                  <span>{c.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
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
          <p className={`${s.mono} ${s.chTag}`}><span aria-hidden="true">04</span> <TextScramble trigger="view">MASTER · SIDE A</TextScramble></p>
          <ScrollScrubText as="p" className={s.scrub} dim={0.18}>Một bản master tốt nghe đúng trên loa phòng khách, tai nghe và cả điện thoại. Chúng tôi kiểm từng bản qua nhiều hệ nghe trước khi giao file cuối.</ScrollScrubText>
          <ul className={s.vinylList}>
            <li><span className={s.mono}>01</span> Loa kiểm âm phòng điều khiển</li>
            <li><span className={s.mono}>02</span> Tai nghe kiểm âm</li>
            <li><span className={s.mono}>03</span> Loa nhỏ và loa điện thoại</li>
            <li><span className={s.mono}>04</span> Xe hơi hoặc loa bluetooth</li>
          </ul>
          <ClipReveal variant="inset" from="left" className={s.vinylPhoto} innerScale={1.12}>
            <Photo img={IMGS.vinyl} sizes="(max-width: 900px) 100vw, 40vw" quality={1200} />
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}

export function Rates() {
  return (
    <section id="bang-gia" className={s.sec}>
      <div className={s.wrap}>
        <Head ch="05" label="BẢNG GIÁ · THEO GIỜ" title="Bảng giá tham khảo theo giờ." lead="Giá tham khảo, chưa gồm thuế. Buổi tối thiểu 2 giờ, từ 6 giờ liên tục giảm 10%. Báo giá chính thức theo yêu cầu thực tế." />
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
        <div className={s.ratePhoto}><ClipReveal variant="inset" from="left" innerScale={1.1}><Photo img={IMGS.faders} sizes="(max-width: 900px) 100vw, 1100px" quality={1200} /></ClipReveal></div>
      </div>
    </section>
  );
}

export function EstimatorSection() {
  return (
    <section id="uoc-tinh" className={`${s.sec} ${s.secEst}`}>
      <div className={s.wrap}>
        <div className={s.estTop}>
          <Head ch="06" label="SESSION ESTIMATOR" title="Ước tính buổi thu của bạn." lead="Chọn loại buổi thu, kéo fader số giờ, số track và số người. Nhận số giờ nên dự trù, chi phí tham khảo và checklist chuẩn bị file, nhạc cụ." />
          <ClipReveal variant="circle" from="center" origin="50% 40%" className={s.estPhoto} innerScale={1.2}>
            <Photo img={IMGS.headphones} sizes="(max-width: 900px) 60vw, 24vw" quality={1200} />
          </ClipReveal>
        </div>
        <Estimator />
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={s.sec}>
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <Head ch="07" label="Q&A" title="Câu hỏi trước khi vào phòng thu." />
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
        <p className={`${s.mono} ${s.chTag}`}><span aria-hidden="true">08</span> <TextScramble trigger="view">SIGNAL · SẴN SÀNG LÊN SÓNG</TextScramble></p>
        <SplitWords as="h2" className={s.h2Big}>Sẵn sàng lên sóng?</SplitWords>
        <p className={s.lead2}>Kể cho chúng tôi nghe ý tưởng của bạn. Chúng tôi sẽ phản hồi để chốt loại buổi thu, số giờ và lịch phù hợp.</p>
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
          <p className={s.footTag}>Phòng thu âm tại Đà Nẵng. Chạm đúng tần số, tạo chất riêng.</p>
        </div>
        <div>
          <p className={`${s.mono} ${s.footH}`}>Liên hệ</p>
          <p className={s.footP}>hello@tanso-studio.example<br />0236 000 0000<br />Đà Nẵng</p>
        </div>
        <nav aria-label="Chân trang">
          <p className={`${s.mono} ${s.footH}`}>Trang</p>
          <ul className={s.footList}>
            <li><a href="#dich-vu">Kênh thu</a></li><li><a href="#bang-gia">Bảng giá</a></li><li><a href="#uoc-tinh">Ước tính buổi thu</a></li>
            <li><Link href="/demos/phong-thu/credits">Ảnh &amp; ghi công</Link></li>
          </ul>
        </nav>
      </div>
      <p className={s.footSign}>© Tần Số Studio · Thiết kế web bởi {siteConfig.fullName}</p>
    </footer>
  );
}
