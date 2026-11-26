import Link from "next/link";
import { ScrollScrubText, TiltCard, VelocityMarquee } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { DRINKS, SIGNATURES, vnd } from "../data/menu";
import { IMGS } from "../data/images";
import { Photo } from "./Photo";
import { Logo } from "./Header";

export function Band() {
  return (
    <section className={s.band} id="nhip" aria-label="Khẩu hiệu">
      <VelocityMarquee mode="velocity" speed={55} boost={1.4} gap="2.5rem" className={s.mq1} pauseOnHover={false} label="Mở cửa 17:00 đến 00:00, happy hour 17:00 đến 19:00">
        {["Mở 17:00–00:00", "Happy hour 17:00–19:00", "Sân thượng 90 chỗ", "Từ 18 tuổi"].map((t, i) => (
          <span key={i} className={s.mqItem}>
            <span className={s.mqText}>{t}</span>
            <i className={s.mqStar} aria-hidden="true">✦</i>
          </span>
        ))}
      </VelocityMarquee>
      <VelocityMarquee mode="velocity" speed={40} direction={-1} boost={1.1} reverseOnScrollUp gap="2.5rem" className={s.mq2} pauseOnHover={false} label="Cocktail, mocktail, món nhắm, đặt bàn nhóm">
        {["Cocktail", "Không cồn", "Món nhắm", "Bàn nhóm", "Sự kiện riêng"].map((t, i) => (
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
    <section className={s.manifesto} aria-label="Giới thiệu Tầng Mây">
      <div className={s.wrap}>
        <div className={s.manGrid}>
          <div className={s.manText}>
            <p className={s.kicker}>Về Tầng Mây</p>
            <h2 className={s.h2} data-tm="lit">Quán bar trên tầng thượng, cách bờ biển Sơn Trà vài phút đi bộ</h2>
            <ScrollScrubText className={s.scrub} dim={0.22}>
              Tầng Mây có bốn khu ngồi, khoảng 90 chỗ, một quầy bar tám ghế và bảng thực đơn gần hai mươi ly, từ cocktail signature, cổ điển đến mocktail. Quán mở từ 17:00 để kịp hoàng hôn, nhạc đổi theo giờ, và nhận cả bàn nhóm lẫn tiệc riêng.
            </ScrollScrubText>
            <ul className={s.triad}>
              <li><b>Khu ngồi</b><span>Sân thượng, Hiên kính, Quầy bar, Góc neon.</span></li>
              <li><b>Thực đơn</b><span>14 cocktail, 5 mocktail, 6 món nhắm.</span></li>
              <li><b>Âm nhạc</b><span>Lounge đầu giờ, house và dance về khuya.</span></li>
            </ul>
          </div>
          <div className={s.manPhoto}>
            <div className={s.manClip}>
              <Photo img={IMGS.city} sizes="(max-width: 900px) 92vw, 44vw" className={s.cover} />
            </div>
            <span className={s.chipNeon} aria-hidden="true">Sơn Trà về đêm</span>
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
    <section className={s.pour} data-tm="pour" aria-label="Cách một ly cocktail được rót">
      <div className={s.pourSticky}>
        <div className={s.wrap}>
          <div className={s.pourGrid}>
            <div className={s.pourCopy}>
              <p className={s.kicker}>Ly signature</p>
              <h2 className={s.h2} data-tm="lit">Ly cocktail được rót thế nào</h2>
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
          <p className={s.kicker}>Ly của quầy</p>
          <h2 className={s.h2} data-tm="lit">Ba ly signature nên thử trước</h2>
        </header>
        <ul className={s.sigGrid}>
          {SIGNATURES.map((g, i) => {
            const d = DRINKS.find((x) => x.id === g.id)!;
            const img = g.img === "smoke-red" ? IMGS.smokeRed : g.img === "pink-coupes" ? IMGS.coupes : IMGS.pourBlue;
            return (
              <li key={g.id} data-tm="lit" className={`${s.sigItem} ${s[`sigItem${i}` as keyof typeof s]}`}>
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
    <section className={s.ingr} aria-label="Nguyên liệu tại quầy bar">
      <div className={s.wrap}>
        <ul className={s.ingGrid}>
          {items.map((x) => (
            <li key={x.w} data-tm="lit" className={`${s.ingItem} ${x.cls}`}>
              <div className={s.ingClip}>
                <Photo img={x.img} sizes="(max-width: 900px) 92vw, 33vw" className={s.cover} />
              </div>
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
    ["Thứ Hai – Thứ Tư", "Hạ tốc", "Lofi, chill, bossa. Phù hợp hẹn hò, trò chuyện."],
    ["Thứ Năm", "Tín hiệu retro", "Synth, funk, disco. Bắt đầu đông khách sau 20:00."],
    ["Thứ Sáu – Thứ Bảy", "Đêm neon", "House, dance, âm lượng cao nhất. Mở đến 01:00."],
    ["Chủ nhật", "Mây chậm", "Lounge, mellow. Cuối tuần nhẹ nhàng, có ly khói."],
  ];
  return (
    <section className={s.rhythm} id="nhip-tuan" aria-label="Nhạc theo ngày trong tuần">
      <div className={s.wrap}>
        <div className={s.rhythmGrid}>
          <header>
            <p className={s.kicker}>Nhạc theo tuần</p>
            <h2 className={s.h2} data-tm="lit">Mỗi ngày một thể loại nhạc</h2>
            <p className={s.mutedP}>Nhạc do quầy chọn theo thể loại chung cho từng ngày, không bán vé và không thu phí vào cửa. Lịch chủ đề đặc biệt được cập nhật trên trang này trước một tuần.</p>
          </header>
          <ul className={s.rhythmList}>
            {rows.map((r, i) => (
              <li key={r[0]} data-tm="lit" className={s.rhythmRow}>
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
  ["Tầng Mây mở cửa lúc mấy giờ, có happy hour không?", "Quán mở từ 17:00 đến 00:00, thứ Sáu và thứ Bảy đến 01:00. Happy hour chạy 17:00–19:00 từ thứ Hai đến thứ Sáu: cocktail cổ điển đồng giá 110.000₫, mocktail giảm 20%."],
  ["Có cần đặt bàn trước không?", "Ngày thường có thể ghé trực tiếp. Tối thứ Sáu, thứ Bảy và dịp lễ nên đặt trước, đặc biệt nếu muốn ngồi Sân thượng hoặc Góc neon. Bàn được giữ 15 phút."],
  ["Nhóm đông hoặc tổ chức sinh nhật thì làm sao?", "Từ 9 khách trở lên, bên mình ghép bàn và báo mức chi tối thiểu. Tiệc 15 khách trở lên cần đặt cọc 30%, hoàn lại nếu báo huỷ trước 48 giờ. Xem phần Nhóm & sự kiện."],
  ["Tôi không uống rượu thì gọi gì?", "Có năm mocktail từ 80.000₫ và sáu món nhắm. Có thể chọn nhóm Không cồn trong thực đơn hoặc dùng phần gợi ý theo vị."],
  ["Trời mưa thì sao?", "Sân thượng đóng khi mưa, khách được chuyển vào Hiên kính có mái. Nếu đã đặt bàn Sân thượng, bên mình báo trước khi bạn đến."],
  ["Trẻ em hoặc người dưới 18 tuổi có vào được không?", "Không. Quán dành cho khách từ 18 tuổi, và có thể yêu cầu xuất trình giấy tờ có ngày sinh."],
  ["Có chỗ gửi xe và giá đã gồm VAT chưa?", "Có bãi gửi xe máy và ô tô của toà nhà. Giá trong thực đơn là giá tham khảo đã gồm VAT, chưa gồm phí phục vụ cho nhóm trên 12 khách."],
  ["Dress code thế nào?", "Smart casual: gọn gàng, không áo ba lỗ, không cởi trần, không dép lê đi trong nhà."],
] as const;

export function Faq() {
  return (
    <section className={s.faq} id="hoi-dap" aria-label="Câu hỏi thường gặp">
      <div className={s.wrap}>
        <div className={s.faqGrid}>
          <header>
            <p className={s.kicker}>Câu hỏi thường gặp</p>
            <h2 className={s.h2} data-tm="lit">Hỏi nhanh trước khi lên tầng thượng</h2>
          </header>
          <div className={s.faqList}>
            {FAQ.map(([q, a]) => (
              <details key={q} data-tm="lit" className={s.faqItem}>
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
            <p className={s.footSmall}>Rooftop bar &amp; cocktail · Quận Sơn Trà, Đà Nẵng</p>
          </div>
          <nav aria-label="Chân trang" className={s.footNav}>
            <a href="#thuc-don">Thực đơn</a>
            <a href="#happy-hour">Happy hour</a>
            <a href="#khong-gian">Không gian</a>
            <a href="#su-kien">Nhóm &amp; sự kiện</a>
            <a href="#quy-dinh">Quy định</a>
            <a href="#dat-ban">Đặt bàn</a>
            <a href="#hoi-dap">Hỏi đáp</a>
            <a href="#lien-he">Liên hệ</a>
          </nav>
          <div className={s.footSmall}>
            <p>hello@tangmay.example</p>
            <p>0236 000 0000</p>
            <p>Mở 17:00 – 00:00. Dành cho khách từ 18 tuổi.</p>
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
