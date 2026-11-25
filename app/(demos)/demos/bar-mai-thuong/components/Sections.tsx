import Link from "next/link";
import { ClipReveal, ScrollScrubText, SplitWords, TiltCard, VelocityMarquee } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { DRINKS, SIGNATURES, vnd } from "../data/menu";
import { IMGS } from "../data/images";
import { Photo } from "./Photo";
import { Logo } from "./Header";

export function Band() {
  return (
    <section className={s.band} id="nhip" aria-label="Khẩu hiệu">
      <VelocityMarquee mode="velocity" speed={55} boost={1.4} gap="2.5rem" className={s.mq1} pauseOnHover={false} label="Uống chậm, đèn lên, thành phố dưới chân">
        {["Uống chậm", "Đèn lên", "Thành phố dưới chân", "Một ly vừa gu"].map((t, i) => (
          <span key={i} className={s.mqItem}>
            <span className={s.mqText}>{t}</span>
            <i className={s.mqStar} aria-hidden="true">✦</i>
          </span>
        ))}
      </VelocityMarquee>
      <VelocityMarquee mode="velocity" speed={40} direction={-1} boost={1.1} reverseOnScrollUp gap="2.5rem" className={s.mq2} pauseOnHover={false} label="Cocktail, mocktail, món nhắm, rooftop">
        {["Cocktail", "Không cồn", "Món nhắm", "Rooftop", "Neon"].map((t, i) => (
          <span key={i} className={s.mqItem}>
            <span className={s.mqTextSolid}>{t}</span>
            <i className={s.mqStarC} aria-hidden="true">●</i>
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className={s.manifesto} aria-label="Tinh thần Tầng Mây">
      <div className={s.wrap}>
        <div className={s.manGrid}>
          <div className={s.manText}>
            <p className={s.kicker}>Trên cả thường ngày</p>
            <SplitWords as="h2" className={s.h2} trigger="view">Thành phố dưới chân. Cảm hứng trên cao.</SplitWords>
            <ScrollScrubText className={s.scrub} dim={0.22}>
              Có những buổi tối chẳng cần kế hoạch cầu kỳ. Chỉ cần một góc ngồi dễ chịu, một ly hợp vị và vài giai điệu đúng tâm trạng. Tầng Mây là lời mời tạm rời bộn bề, nhìn Đà Nẵng từ một góc khác và dành thời gian cho chính mình.
            </ScrollScrubText>
            <ul className={s.triad}>
              <li><b>Tầm nhìn</b><span>Ngắm nhịp thành phố từ mái nhà.</span></li>
              <li><b>Hương vị</b><span>Từng lớp vị trong mỗi ly.</span></li>
              <li><b>Âm thanh</b><span>Nhạc đổi theo tinh thần buổi tối.</span></li>
            </ul>
          </div>
          <div className={s.manPhoto}>
            <ClipReveal variant="inset" from="bottom" className={s.manClip}>
              <Photo img={IMGS.city} sizes="(max-width: 900px) 92vw, 44vw" className={s.cover} />
            </ClipReveal>
            <span className={s.chipNeon} aria-hidden="true">Thành phố lên đèn</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Moment cuộn 1: ly rót theo cuộn. Mặc định (no-JS/reduced) ly đã đầy; Motion.tsx đặt lại từ rỗng khi cuộn. */
export function Pour() {
  const steps = [
    { t: "Rót đá", d: "Viên to, trong, tan chậm để ly giữ vị lâu hơn." },
    { t: "Lên vị", d: "Rượu nền, chua, ngọt, đắng vào ly theo đúng thứ tự." },
    { t: "Lên đèn", d: "Thêm lát cam, hơi khói hoặc bọt mịn, rồi mang ra mái nhà." },
  ];
  return (
    <section className={s.pour} data-tm="pour" aria-label="Cách một ly ra đời">
      <div className={s.pourSticky}>
        <div className={s.wrap}>
          <div className={s.pourGrid}>
            <div className={s.pourCopy}>
              <p className={s.kicker}>Cách một ly ra đời</p>
              <SplitWords as="h2" className={s.h2} trigger="view">Mỗi ly rót theo nhịp thành phố</SplitWords>
              <ol className={s.steps}>
                {steps.map((x, i) => (
                  <li key={x.t} data-tm="step" data-i={i} className={s.step}>
                    <span className={s.stepNo}>0{i + 1}</span>
                    <div><b>{x.t}</b><p>{x.d}</p></div>
                  </li>
                ))}
              </ol>
              <p className={s.readout} aria-hidden="true">Mực ly <b data-tm="level">100</b>%</p>
            </div>
            <div className={s.glassWrap} aria-hidden="true">
              <svg className={s.glass} viewBox="0 0 240 340" focusable="false">
                <defs>
                  <clipPath id="tm-bowl"><path d="M26 46H214C214 118 168 156 120 166C72 156 26 118 26 46Z" /></clipPath>
                  <linearGradient id="tm-liq" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ff3cac" />
                    <stop offset=".55" stopColor="#9b5cff" />
                    <stop offset="1" stopColor="#00e5ff" />
                  </linearGradient>
                </defs>
                <g clipPath="url(#tm-bowl)">
                  <g data-tm="liquid">
                    <rect x="0" y="58" width="240" height="200" fill="url(#tm-liq)" opacity=".92" />
                    <path className={s.wave} d="M0 58C30 52 50 64 80 58S140 52 170 58 220 64 240 58V70H0Z" fill="#fff" opacity=".22" />
                    <circle className={`${s.bub} ${s.bub1}`} cx="80" cy="130" r="3" />
                    <circle className={`${s.bub} ${s.bub2}`} cx="120" cy="140" r="2.4" />
                    <circle className={`${s.bub} ${s.bub3}`} cx="150" cy="120" r="3.4" />
                    <circle className={`${s.bub} ${s.bub4}`} cx="105" cy="100" r="2" />
                  </g>
                </g>
                <rect data-tm="stream" x="117" y="-40" width="6" height="104" rx="3" fill="url(#tm-liq)" />
                <path className={s.glassLine} d="M26 46H214C214 118 168 156 120 166C72 156 26 118 26 46Z" fill="none" strokeWidth="3" strokeLinejoin="round" />
                <path className={s.glassLine} d="M120 166V286M72 300Q120 280 168 300" fill="none" strokeWidth="3" strokeLinecap="round" />
                <g data-tm="garnish" className={s.garnish}>
                  <circle cx="206" cy="46" r="20" fill="none" stroke="#ffb84d" strokeWidth="3" />
                  <path d="M206 28V64M188 46H224M193 33L219 59M219 33L193 59" stroke="#ffb84d" strokeWidth="1.5" opacity=".8" />
                </g>
              </svg>
              <div className={s.glassGlow} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Signature() {
  return (
    <section className={s.sig} aria-label="Ba ly nên thử trước">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Ba ly nên thử trước</p>
          <SplitWords as="h2" className={s.h2} trigger="view">Ly của đêm</SplitWords>
        </header>
        <ul className={s.sigGrid}>
          {SIGNATURES.map((g, i) => {
            const d = DRINKS.find((x) => x.id === g.id)!;
            const img = g.img === "smoke-red" ? IMGS.smokeRed : g.img === "pink-coupes" ? IMGS.coupes : IMGS.pourBlue;
            return (
              <li key={g.id} data-tm="rv" className={`${s.sigItem} ${s[`sigItem${i}` as keyof typeof s]}`}>
                <TiltCard className={`${s.sigCard} ${s[`tone_${d.tone}` as keyof typeof s]}`} max={7} glareColor="rgba(255,255,255,0.14)" scale={1.015}>
                  <div className={s.sigPhoto}>
                    <Photo img={img} sizes="(max-width: 900px) 90vw, 30vw" className={s.cover} />
                    <span className={s.sigTag}>{g.tag}</span>
                  </div>
                  <div className={s.sigBody}>
                    <h3 className={s.h3}>{d.name}</h3>
                    <p>{d.desc}</p>
                    <div className={s.sigFoot}>
                      <span className={s.price}>{vnd(d.price)}</span>
                      <span className={s.priceNote}>Giá tham khảo</span>
                    </div>
                  </div>
                </TiltCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Ingredients() {
  const items = [
    { img: IMGS.ice, w: "Đá", t: "Viên to, trong, tan chậm.", cls: s.ing1 },
    { img: IMGS.citrus, w: "Trái cây", t: "Cam, chanh, bưởi vắt khi gọi.", cls: s.ing2 },
    { img: IMGS.smokeCoupe, w: "Khói", t: "Một lớp thơm gỗ phủ lên mặt ly.", cls: s.ing3 },
  ];
  return (
    <section className={s.ingr} aria-label="Nguyên liệu quầy bar">
      <div className={s.wrap}>
        <ul className={s.ingGrid}>
          {items.map((x) => (
            <li key={x.w} data-tm="rv" className={`${s.ingItem} ${x.cls}`}>
              <ClipReveal variant="inset" from="bottom" className={s.ingClip}>
                <Photo img={x.img} sizes="(max-width: 900px) 92vw, 33vw" className={s.cover} />
              </ClipReveal>
              <div className={s.ingCap}><b>{x.w}</b><span>{x.t}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Rhythm() {
  const rows = [
    ["Đầu tuần", "Hạ tốc", "Lofi, chill, cocktail nhẹ"],
    ["Giữa tuần", "Tín hiệu retro", "Synth, funk, disco"],
    ["Cuối tuần", "Đêm neon", "House, dance, đèn lên cao nhất"],
    ["Chủ nhật", "Mây chậm", "Lounge, mellow, ly có khói"],
  ];
  return (
    <section className={s.rhythm} id="nhip-tuan" aria-label="Nhịp tuần">
      <div className={s.wrap}>
        <div className={s.rhythmGrid}>
          <header>
            <p className={s.kicker}>Đêm có nhịp riêng</p>
            <SplitWords as="h2" className={s.h2} trigger="view">Âm nhạc cũng có hương vị</SplitWords>
            <p className={s.mutedP}>Có đêm cần giai điệu chậm, có đêm chỉ muốn nhún theo bass. Chủ đề dưới đây mang tính định hướng; chương trình cụ thể được cập nhật theo từng tuần.</p>
          </header>
          <ul className={s.rhythmList}>
            {rows.map((r, i) => (
              <li key={r[0]} data-tm="rv" className={s.rhythmRow}>
                <span className={s.rhythmNo}>0{i + 1}</span>
                <span className={s.rhythmDay}>{r[0]}</span>
                <b className={s.rhythmTheme}>{r[1]}</b>
                <span className={s.rhythmMood}>{r[2]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  ["Tầng Mây có nhận đặt bàn trước không?", "Có. Bạn chọn ngày, giờ, số khách và khu vực ở phần đặt bàn, rồi gửi bản tóm tắt qua form tư vấn để bên mình trao đổi về khả năng sắp xếp."],
  ["Tôi có thể ghé mà không đặt bàn không?", "Bạn có thể ghé trực tiếp. Chỗ ngồi phụ thuộc vào tình trạng thực tế lúc bạn đến, nên đặt trước sẽ chắc chỗ hơn vào cuối tuần."],
  ["Có đồ uống không cồn không?", "Có. Thực đơn có nhóm không cồn và bạn có thể chọn “Không cồn” trong phần chọn ly để nhận gợi ý riêng."],
  ["Tôi chưa quen uống cocktail, nên chọn gì?", "Hãy thử phần chọn ly theo vị. Chỉ cần chọn vị bạn thích và mức mạnh nhẹ, ba gợi ý kèm lý do sẽ hiện ra."],
  ["Giá trên website là giá cuối cùng à?", "Giá ghi là giá tham khảo. Bạn nên xác nhận thực đơn và giá tại thời điểm sử dụng dịch vụ."],
  ["Nhóm đông người thì sao?", "Hãy ghi số khách khi gửi yêu cầu. Từ 9 khách trở lên, bên mình sẽ trao đổi riêng về cách sắp xếp chỗ."],
  ["Độ tuổi khách được phục vụ?", "Dành cho khách từ 18 tuổi."],
] as const;

export function Faq() {
  return (
    <section className={s.faq} id="hoi-dap" aria-label="Câu hỏi thường gặp">
      <div className={s.wrap}>
        <div className={s.faqGrid}>
          <header>
            <p className={s.kicker}>Hỏi nhanh</p>
            <SplitWords as="h2" className={s.h2} trigger="view">Trước khi lên mái</SplitWords>
          </header>
          <div className={s.faqList}>
            {FAQ.map(([q, a]) => (
              <details key={q} data-tm="rv" className={s.faqItem}>
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
      <div className={s.footBg} aria-hidden="true"><Photo img={IMGS.fog} sizes="100vw" className={s.cover} /></div>
      <div className={s.wrap}>
        <p className={s.footBig} aria-hidden="true" translate="no">Tầng Mây</p>
        <div className={s.footGrid}>
          <div>
            <Logo />
            <p className={s.footLine}>Chạm tầng mây, chạm vị đêm.</p>
            <p className={s.footSmall}>Rooftop · Cocktail · Đà Nẵng</p>
          </div>
          <nav aria-label="Chân trang" className={s.footNav}>
            <a href="#thuc-don">Thực đơn</a>
            <a href="#chon-ly">Chọn ly</a>
            <a href="#khong-gian">Không gian</a>
            <a href="#nhip-tuan">Nhịp tuần</a>
            <a href="#dat-ban">Đặt bàn</a>
            <a href="#hoi-dap">Hỏi đáp</a>
          </nav>
          <div className={s.footSmall}>
            <p>hello@tangmay.example</p>
            <p>Dành cho khách từ 18 tuổi.</p>
          </div>
        </div>
        <div className={s.footBase}>
          <span>© 2026 Tầng Mây</span>
          <Link href="/demos/bar-mai-thuong/credits">Ảnh &amp; ghi công</Link>
          <span>Thiết kế website: {siteConfig.fullName}</span>
        </div>
      </div>
    </footer>
  );
}
