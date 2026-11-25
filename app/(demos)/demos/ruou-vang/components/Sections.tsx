import Link from "next/link";
import { ClipReveal, DraggableGallery, ParallaxLayer, ScrollScrubText, SplitWords, VelocityMarquee } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { IMGS } from "../data/images";
import { PLATES, vnd } from "../data/wines";
import { Candle } from "./Candle";
import { Logo } from "./Header";
import { Photo } from "./Photo";

export function Band() {
  return (
    <section className={s.band} aria-label="Khẩu hiệu">
      <VelocityMarquee mode="css" duration={46} gap="2.6rem" pauseOnHover className={s.bandRow}>
        {["Đỏ", "Trắng", "Hồng", "Sủi"].flatMap((k, i) => [
          <span key={k} className={s.bandWord}>{k}</span>,
          <span key={`${k}-d`} className={s.bandDot} aria-hidden="true">{i % 2 ? "❖" : "◆"}</span>,
          <span key={`${k}-t`} className={s.bandSmall}>{["một ly thôi cũng đủ lễ", "rót chậm, nói khẽ", "bàn gỗ, ánh nến", "chọn theo món, không theo tên"][i]}</span>,
          <span key={`${k}-e`} className={s.bandDot} aria-hidden="true">◆</span>,
        ])}
      </VelocityMarquee>
    </section>
  );
}

export function Story() {
  return (
    <section className={s.story} id="cau-chuyen" aria-labelledby="rv-story-h">
      <div className={s.storyBg} aria-hidden="true">
        <ParallaxLayer distance={56} className={s.storyPar}>
          <Photo img={IMGS.barrels} sizes="100vw" className={s.cover} />
        </ParallaxLayer>
        <span className={s.storyShade} />
      </div>
      <div className={s.wrap}>
        <p className={s.kicker}>Câu chuyện</p>
        <h2 id="rv-story-h" className={s.srOnly}>Câu chuyện của Mộc Vang</h2>
        <ScrollScrubText as="p" className={s.manifesto} dim={0.18}>
          Mộc Vang bắt đầu từ một chiếc bàn gỗ và một ý nghĩ rất nhỏ: uống vang không cần biết nhiều, chỉ cần có người ngồi cùng và một ly đến đúng lúc. Chúng tôi giữ danh sách ngắn, rót theo phong cách nho quen thuộc, rồi để ánh nến làm phần còn lại.
        </ScrollScrubText>
        <ul className={s.vows}>
          <li data-rv="rv"><b>01</b><span>Danh sách ngắn, đổi theo mùa món.</span></li>
          <li data-rv="rv"><b>02</b><span>Gọi theo phong cách, không cần thuộc tên nhà vang.</span></li>
          <li data-rv="rv"><b>03</b><span>Rót vừa phải, nói khẽ, không ai hối bạn.</span></li>
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  ["Rót", "Ly được rót đến khoảng một phần ba, đủ để vang còn chỗ thở."],
  ["Xoay", "Xoay nhẹ cổ tay. Hương bay lên khi vang chạm thành ly."],
  ["Ngửi", "Hít một hơi ngắn trước khi nhấp. Mùi hương đoán được nửa vị."],
  ["Nhấp", "Một ngụm nhỏ, giữ vài giây. Thấy gì thì đó là câu trả lời."],
] as const;

/** Moment cuộn 1: đường rượu rót vẽ dần theo cuộn, ly dâng đầy. Điều khiển bởi Motion.tsx; chưa có JS thì hiện ly đầy 70%. */
export function Pour() {
  return (
    <section className={s.pour} id="rot" aria-label="Bốn nhịp thưởng thức một ly vang" data-rv="pour">
      <div className={s.wrap}>
        <div className={s.pourGrid}>
          <div className={s.pourStage} aria-hidden="true">
            <svg viewBox="-40 -190 480 830" className={s.pourSvg} focusable="false">
              <defs>
                <clipPath id="rv-bowl"><path d="M130 330C122 400 130 470 175 500c13 8 21 10 25 11 4-1 12-3 25-11 45-30 53-100 45-170z" /></clipPath>
                <linearGradient id="rv-wine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8d1b34" />
                  <stop offset="1" stopColor="#3b0714" />
                </linearGradient>
                <linearGradient id="rv-glassg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#f6e8cf" stopOpacity="0.5" />
                  <stop offset="0.5" stopColor="#f6e8cf" stopOpacity="0.08" />
                  <stop offset="1" stopColor="#f6e8cf" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <g transform="translate(246 38) rotate(35)" className={s.bottleG}>
                <path d="M-12 0V-70C-12 -95 -36 -100 -36 -135V-230Q-36 -240 -26 -240H26Q36 -240 36 -230V-135C36 -100 12 -95 12 -70z" fill="#1d0a0f" stroke="#c08a4a" strokeWidth="1.5" />
                <rect x="-15" y="-12" width="30" height="12" rx="3" fill="#c08a4a" />
              </g>
              <g clipPath="url(#rv-bowl)">
                <rect data-rv="fill" x="100" y="381" width="200" height="200" fill="url(#rv-wine)" />
                <rect data-rv="sheen" x="100" y="381" width="200" height="2" fill="#f0c88a" opacity="0.55" />
              </g>
              <path d="M130 330C122 400 130 470 175 500c13 8 21 10 25 11 4-1 12-3 25-11 45-30 53-100 45-170z" fill="url(#rv-glassg)" stroke="#e8d3ac" strokeWidth="2" />
              <path d="M200 511v74M145 592c20 8 90 8 110 0" fill="none" stroke="#e8d3ac" strokeWidth="2.4" strokeLinecap="round" />
              <ellipse cx="200" cy="591" rx="56" ry="9" fill="none" stroke="#e8d3ac" strokeWidth="2" />
              <path data-rv="stream" className={s.stream} d="M244 42C244 110 206 150 204 260L204 470" pathLength={1} fill="none" stroke="#a31f3d" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 1" />
              <path data-rv="streamglow" className={s.streamGlow} d="M244 42C244 110 206 150 204 260L204 470" pathLength={1} fill="none" stroke="#f0c88a" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
            </svg>
            <p className={s.pourLevel}>
              <span data-rv="level">70</span><i>%</i>
              <small>ly đầy</small>
            </p>
          </div>
          <div className={s.pourCopy}>
            <p className={s.kicker}>Một ly vang, bốn nhịp</p>
            <SplitWords as="h2" className={s.h2} trigger="view">Rót, xoay, ngửi, nhấp.</SplitWords>
                        <ol className={s.steps}>
              {STEPS.map(([t, d], i) => (
                <li key={t} className={s.step} data-rv="step" data-on={i === 0 ? "" : undefined}>
                  <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                  <div><h3 className={s.h3}>{t}</h3><p>{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Plates() {
  return (
    <section className={s.plates} id="mon-nham" aria-labelledby="rv-plates-h">
      <div className={`${s.wrap} ${s.platesGrid}`}>
        <ClipReveal className={s.platesPhoto} variant="inset" from="left" innerScale={1.12}>
          <Photo img={IMGS.charcuterie} sizes="(max-width: 900px) 92vw, 52vw" quality={1000} className={s.cover} />
        </ClipReveal>
        <div className={s.platesCopy}>
          <p className={s.kicker}>Món nhắm</p>
          <h2 id="rv-plates-h" className={s.h2}>Vài đĩa nhỏ cho bàn vang</h2>
          <p className={s.mutedP}>Đĩa chia sẻ, ra từng đợt để bạn nhấp vang chậm. Giá tham khảo, có thể đổi theo mùa nguyên liệu.</p>
          <ul className={s.plateList}>
            {PLATES.map((p) => (
              <li key={p.name} data-rv="rv">
                <div className={s.plateTop}><h3 className={s.h3}>{p.name}</h3><span className={s.dots} aria-hidden="true" /><span className={s.price}>{vnd(p.price)}</span></div>
                <p>{p.desc} <em>{p.with}.</em></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const GALLERY = [IMGS.cellar, IMGS.glassCandle, IMGS.candleSmoke, IMGS.candleBottle, IMGS.pourTable] as const;

export function Cellar() {
  return (
    <section className={s.cellar} id="can-ham" aria-label="Không gian quán">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Căn phòng</p>
          <SplitWords as="h2" className={s.h2} trigger="view">Hầm nhỏ, bàn gỗ, vài ngọn nến.</SplitWords>
                    <p className={s.mutedP}>Kéo ngang để xem; đèn trong phòng đủ dịu để nhìn rõ màu vang và đủ tối để nói chuyện.</p>
        </header>
      </div>
      <DraggableGallery className={s.gal} trackClassName={s.galTrack} gap="1.25rem" hideScrollbar buttonClassName={s.galBtn} label="Ảnh không gian quán, kéo ngang hoặc dùng phím mũi tên" prevLabel="Ảnh trước" nextLabel="Ảnh sau">
        {GALLERY.map((g, i) => (
          <figure key={g.name} className={s.galItem} data-i={i}>
            <Photo img={g} sizes="(max-width: 700px) 72vw, 28vw" quality={1000} className={s.cover} />
          </figure>
        ))}
      </DraggableGallery>
    </section>
  );
}

const FAQ: [string, string][] = [
  ["Mình không rành về vang, có hợp không?", "Rất hợp. Bạn chỉ cần nói món và dịp, hoặc dùng công cụ Chọn vang ở trên để ra ba gợi ý theo phong cách. Nhân viên sẽ giải thích ngắn gọn, không dùng thuật ngữ."],
  ["Có đồ uống không cồn không?", "Có. Danh sách không cồn gồm nước ép, trà lạnh và soda tự pha; bạn có thể gọi cùng bàn vang."],
  ["Nhóm đông có đặt được không?", "Bàn nhận đến 12 khách qua tóm tắt đặt bàn. Nhóm đông hơn, hãy ghi rõ số người và dịp trong form tư vấn."],
  ["Có bán theo ly không?", "Phần lớn vang đỏ, trắng, hồng và sủi có giá theo ly. Một số chai ủ lâu chỉ bán nguyên chai."],
  ["Đặt bàn có mất phí không?", "Tóm tắt trên trang chỉ giúp bạn chuẩn bị thông tin; yêu cầu thật được gửi qua form tư vấn của website."],
];

export function Faq() {
  return (
    <section className={s.faq} id="hoi-dap" aria-labelledby="rv-faq-h">
      <div className={s.wrap}>
        <div className={s.faqGrid}>
          <header>
            <p className={s.kicker}>Hỏi nhanh</p>
            <h2 id="rv-faq-h" className={s.h2}>Trước khi ghé</h2>
          </header>
          <div className={s.faqList}>
            {FAQ.map(([q, a]) => (
              <details key={q} className={s.faqItem}>
                <summary>{q}<i aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.footTop}>
          <Candle className={s.footCandle} delay={1.1} small />
          <p className={s.footBig} aria-hidden="true" translate="no">Mộc Vang</p>
        </div>
        <div className={s.footGrid}>
          <div>
            <Logo />
            <p className={s.footLine}>Chậm lại một ly vang.</p>
            <p className={s.footSmall}>Wine bar · Đà Nẵng</p>
          </div>
          <nav aria-label="Chân trang" className={s.footNav}>
            <a href="#thuc-don">Thực đơn</a>
            <a href="#chon-vang">Chọn vang</a>
            <a href="#mon-nham">Món nhắm</a>
            <a href="#can-ham">Căn phòng</a>
            <a href="#dat-ban">Đặt bàn</a>
            <a href="#hoi-dap">Hỏi đáp</a>
          </nav>
          <div className={s.footSmall}>
            <p>chao@mocvang.example</p>
            <p>Dành cho khách từ 18 tuổi. Hãy thưởng thức có trách nhiệm và không lái xe sau khi uống.</p>
          </div>
        </div>
        <div className={s.footBase}>
          <span>© 2026 Mộc Vang</span>
          <Link href="/demos/ruou-vang/credits">Ảnh &amp; ghi công</Link>
          <span>Thiết kế website: {siteConfig.fullName}</span>
        </div>
      </div>
    </footer>
  );
}
