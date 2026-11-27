import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Booking } from "./components/Booking";
import { Bubbles } from "./components/Bubbles";
import { Fx } from "./components/Fx";
import { Scene } from "./components/Scene";

const CHAPTERS = [
  ["0 – 8 m · Mặt nước", "Ánh sáng còn vỡ vụn", "Tia nắng gãy thành những dải sáng đung đưa. Ở tầng này ánh sáng khúc xạ mạnh nhất, đàn cá nhỏ tụ về theo từng đợt sóng."],
  ["8 – 18 m · Rạn san hô", "Thành phố của màu sắc", "Cành san hô, cá hề, cá bướm. Độ trong của nước ổn định hơn, nhịp thở của bạn cũng chậm lại."],
  ["18 – 26 m · Vách đá", "Bóng tối bắt đầu gọi", "Vách đá dựng đứng, ánh sáng xanh thẫm. Hướng dẫn viên giữ nhóm sát nhau và kiểm tra áp suất liên tục."],
  ["26 – 30 m · Vực sâu", "Chỉ còn ánh sinh học", "Nước tĩnh, tối, và vài đốm sáng nhỏ. Một cánh cá đuối lướt qua trong im lặng."],
];

const TOURS = [
  ["Lặn thử Discover", "Cho người chưa từng lặn", ["Học cơ bản 45 phút tại hồ cạn", "Lặn 1 lần, tối đa 8 m", "Có hướng dẫn viên kèm 1:2"], "1.200.000 ₫"],
  ["Khoá Open Water", "Từ người mới đến lặn tự chủ", ["3 ngày: lý thuyết, hồ cạn, biển mở", "4 lần lặn, tối đa 18 m", "Chứng chỉ mẫu (minh hoạ)"], "7.800.000 ₫"],
  ["Lặn đêm rạn san hô", "Cho thợ lặn đã có kinh nghiệm", ["Đèn pin chuyên dụng cho thuê", "Quan sát sinh vật hoạt động ban đêm", "Nhóm tối đa 6 người"], "1.900.000 ₫"],
];

const SPECIES = [
  ["Rùa biển", "Lướt chậm, thường gặp gần rạn lúc sáng sớm."],
  ["Cá hề", "Sống giữa các xúc tu hải quỳ, màu cam nổi bật."],
  ["Cá đuối manta", "Sải cánh rộng, xuất hiện ở vách đá tầng sâu."],
  ["Sứa đèn", "Phát sáng nhẹ trong tối, chỉ thấy khi lặn đêm."],
];

const TIMELINE = [
  ["06:30", "Đón khách & kiểm tra thiết bị", "Thử đồ lặn, bình khí, và khai báo sức khoẻ ngắn."],
  ["07:30", "Briefing an toàn", "Ký hiệu tay, quy tắc cặp bạn lặn, kế hoạch độ sâu và thời gian."],
  ["08:30", "Lặn lần một", "Xuống từ từ, dừng cân bằng áp suất, ngắm rạn san hô."],
  ["11:00", "Nghỉ bề mặt", "Nước ấm, trái cây, trao đổi những gì vừa thấy."],
  ["12:00", "Lặn lần hai", "Điểm lặn thứ hai, thường sâu hơn một chút nếu điều kiện cho phép."],
];

const FAQ = [
  ["Tôi không biết bơi có lặn được không?", "Với bản minh hoạ này: cần biết bơi cơ bản và thoải mái trong nước. Khoá lặn thử có hướng dẫn viên kèm sát."],
  ["Có độ tuổi tối thiểu không?", "Theo thông tin mẫu: từ 10 tuổi với chương trình Junior, có người lớn đi cùng."],
  ["Điều kiện thời tiết ảnh hưởng thế nào?", "Nếu biển động, chuyến sẽ được dời lịch miễn phí hoặc chuyển sang hồ cạn."],
  ["Thủy Vực có phải trung tâm lặn thật không?", "Không. Đây là thương hiệu minh hoạ dùng cho trang trình diễn; giá, số liệu và đánh giá đều là mẫu."],
];

export default function Page() {
  const consult = buildConsultHref("thuy-vuc");
  return (
    <div className={styles.brand} data-tv-root>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <defs>
          <filter id="tv-water-title" x="-4%" y="-12%" width="108%" height="124%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.007 0.016" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="tv-water-scene" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.013" numOctaves="2" seed="9" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <Bubbles />
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Thủy Vực, về đầu trang">
          <svg viewBox="0 0 26 26" aria-hidden="true"><path d="M2 14c3-5 6-5 9 0s6 5 9 0 4-4 4-4M2 20c3-5 6-5 9 0s6 5 9 0 4-4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Thủy Vực
        </a>
        <nav className={styles.nav} aria-label="Chính"><a href="#lan-xuong">Lặn xuống</a><a href="#chuyen-lan">Chuyến lặn</a><a href="#dat-cho">Đặt chỗ</a></nav>
      </header>
      <div className={styles.gauge} aria-hidden="true"><b><span data-gauge-num>0</span> m</b><span className={styles.gTrack}><i className={styles.gFill} data-gauge-fill /></span></div>

      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.heroRays} aria-hidden="true">
            {[8, 26, 44, 62, 80].map((l, i) => (<i key={l} style={{ left: `${l}%`, animationDelay: `${-i * 2}s`, opacity: 0.5 + (i % 2) * 0.3 }} />))}
          </div>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Trung tâm lặn biển · bản minh hoạ</p>
            <h1 className={styles.heroTitle} data-water-title aria-label="Thủy Vực"><span aria-hidden="true">Thủy</span><span aria-hidden="true">Vực</span></h1>
            <div className={styles.heroRow}>
              <p className={styles.lead}>Hít một hơi thật sâu. Dưới mặt nước, ánh sáng cong đi, tiếng ồn tắt hẳn, và thế giới bắt đầu ở độ sâu 0 mét.</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <a className={styles.btn} href="#dat-cho">Đặt chuyến lặn</a>
                <a className={`${styles.btn} ${styles.btnGhost}`} href="#lan-xuong">Lặn xuống ↓</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="gt">
          <div className={styles.wrap}>
            <div className={styles.aboutTop}>
              <div><p className={styles.eyebrow} data-rv>Về Thủy Vực</p><h2 id="gt" className={styles.h2} data-rv>Lặn chậm, <b>thở sâu</b>, nhìn kỹ</h2></div>
              <p className={styles.lead} data-rv>Chúng tôi là nhóm hướng dẫn viên nhỏ (hư cấu) tin rằng lặn biển là cách học yêu đại dương nhanh nhất, nếu bạn thấy an toàn từ phút đầu tiên.</p>
            </div>
            <ul className={styles.three}>
              {[["01", "An toàn trước tiên", "Kiểm tra thiết bị hai lần, tỷ lệ hướng dẫn viên trên khách thấp, kế hoạch lặn rõ ràng."], ["02", "Nhóm nhỏ", "Tối đa 6 khách mỗi nhóm để mỗi người đều có chỗ nhìn và có người hỗ trợ."], ["03", "Tôn trọng rạn", "Không chạm, không lấy, kem chống nắng thân thiện rạn san hô cho mọi khách."]].map(([n, t, d]) => (
                <li key={n} className={styles.glass} data-rv><span className={styles.n}>{n}</span><h3>{t}</h3><p>{d}</p></li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.descent} id="lan-xuong" aria-label="Cuộn để lặn từ mặt nước xuống 30 mét">
          <div className={styles.dStage} data-stage>
            <div className={styles.dBg} data-bg><div className={styles.dWorld} data-world><Scene /></div></div>
            <div className={styles.dHud} aria-hidden="true"><b data-depth>0</b><span>m<small data-zone>Mặt nước</small></span></div>
            <div className={styles.dChapters}>
              {CHAPTERS.map(([e, t, d]) => (
                <article key={e} className={styles.ch} data-ch><span className={styles.eyebrow}>{e}</span><h3>{t}</h3><p>{d}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sec} id="chuyen-lan" aria-labelledby="ct">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Chuyến lặn</p>
            <h2 id="ct" className={styles.h2} data-rv>Ba cách <b>xuống nước</b></h2>
            <div className={styles.tourGrid}>
              {TOURS.map(([t, s, items, p], i) => (
                <article key={t as string} className={`${styles.glass} ${styles.tour}`} data-rv>
                  <svg viewBox="0 0 300 150" aria-hidden="true" focusable="false">
                    <defs><linearGradient id={`tvt${i}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#008f95" stopOpacity=".7" /><stop offset="1" stopColor="#031c2c" /></linearGradient></defs>
                    <rect width="300" height="150" fill={`url(#tvt${i})`} />
                    {[0, 1, 2].map((k) => (<path key={k} d={`M0 ${40 + k * 28 + i * 6} q37 -16 75 0 t75 0 t75 0 t75 0`} fill="none" stroke="#b8f5ec" strokeOpacity={0.5 - k * 0.12} strokeWidth="1.5" />))}
                    <circle cx={90 + i * 60} cy={105 - i * 10} r={10 + i * 4} fill="none" stroke="#b8f5ec" strokeOpacity=".5" />
                  </svg>
                  <h3>{t}</h3><p>{s}</p>
                  <ul>{(items as string[]).map((x) => (<li key={x}>{x}</li>))}</ul>
                  <p className={styles.pr}>{p}</p>
                </article>
              ))}
            </div>
            <p style={{ marginTop: 18, fontSize: 14, color: "var(--tv-dim)" }}>Giá minh hoạ, không phải bảng giá thật.</p>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="st">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Gặp ai dưới đó</p>
            <h2 id="st" className={styles.h2} data-rv>Cư dân <b>rạn san hô</b></h2>
            <ul className={styles.sp}>
              {SPECIES.map(([n, d], i) => (
                <li key={n} data-rv>
                  <svg viewBox="0 0 200 110" aria-hidden="true" focusable="false">
                    {i === 0 && (<g fill="#b8f5ec"><ellipse cx="100" cy="55" rx="46" ry="30" opacity=".9" /><circle cx="156" cy="52" r="14" /><path d="M70 78 q-12 18 -28 18 M126 78 q12 18 28 18 M64 40 q-14 -16 -28 -14 M132 40 q16 -14 30 -12" stroke="#b8f5ec" strokeWidth="9" strokeLinecap="round" fill="none" /></g>)}
                    {i === 1 && (<g><path d="M40 55 C70 20 130 20 156 55 C130 90 70 90 40 55Z M156 55 L186 34 L186 76Z" fill="#ff9d86" /><path d="M88 28 v54 M118 30 v50" stroke="#fff" strokeWidth="8" /><circle cx="64" cy="50" r="4" fill="#031c2c" /></g>)}
                    {i === 2 && (<g fill="#b8f5ec"><path d="M100 20 C130 30 170 44 196 60 C160 62 130 64 100 92 C70 64 40 62 4 60 C30 44 70 30 100 20Z" opacity=".9" /><path d="M100 92 L100 108" stroke="#b8f5ec" strokeWidth="3" /></g>)}
                    {i === 3 && (<g stroke="#b8f5ec" fill="none" strokeWidth="3" strokeLinecap="round"><path d="M60 52 a40 36 0 0 1 80 0 z" fill="#b8f5ec" fillOpacity=".5" />{[70, 85, 100, 115, 130].map((x) => (<path key={x} d={`M${x} 56 q-8 20 0 40`} />))}</g>)}
                  </svg>
                  <h3>{n}</h3><p>{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="qt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Một ngày lặn</p>
            <h2 id="qt" className={styles.h2} data-rv>Từ bến tàu <b>đến rạn</b></h2>
            <ol className={styles.tl}>{TIMELINE.map(([t, h, d]) => (<li key={t} data-rv><time>{t} · {h}</time><p>{d}</p></li>))}</ol>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="nt">
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-rv>Số liệu minh hoạ</p>
            <h2 id="nt" className={styles.h2} data-rv>Con số <b>dưới nước</b></h2>
            <dl className={styles.stats} data-rv>
              {[["4200", "lượt lặn mẫu mỗi năm"], ["6", "khách tối đa mỗi nhóm"], ["18", "điểm lặn trong bản đồ mẫu"], ["30", "mét độ sâu tối đa"]].map(([v, l]) => (<div key={l}><dt data-count={v}>{v}</dt><dd>{l}</dd></div>))}
            </dl>
            <div className={styles.qa}>
              <div>
                {[["“Lần đầu xuống nước mà tôi không thấy sợ nữa.”", "Khách hàng A (hư cấu)"], ["“Vách đá lúc 20 mét đẹp đến lặng người.”", "Khách hàng B (hư cấu)"]].map(([q, a]) => (<figure key={a} className={`${styles.glass} ${styles.q}`} data-rv><blockquote><p>{q}</p></blockquote><figcaption><cite>{a}</cite></figcaption></figure>))}
              </div>
              <div className={styles.faq} data-rv>{FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}</div>
            </div>
          </div>
        </section>

        <section className={styles.sec} id="dat-cho" aria-labelledby="bt">
          <div className={`${styles.wrap} ${styles.bk}`}>
            <div>
              <p className={styles.eyebrow} data-rv>Đặt chỗ</p>
              <h2 id="bt" className={styles.h2} data-rv>Hẹn nhau <b>dưới mặt nước</b></h2>
              <p className={styles.lead} style={{ marginTop: 22 }} data-rv>Chọn chuyến, số khách và ngày; trang tính tạm giá ngay trong trình duyệt. Không có dữ liệu nào được gửi đi.</p>
              <a className={styles.consult} href={consult}>Muốn website lặn biển như thế này? Nhận tư vấn →</a>
            </div>
            <div className={styles.glass} data-rv><Booking /></div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <p className={styles.big} aria-hidden="true">Thủy Vực</p>
          <div className={styles.fr}><span>© 2026 Thủy Vực · Thương hiệu minh hoạ, không phải doanh nghiệp thật.</span><a href="#top">Nổi lên mặt nước ↑</a></div>
        </div>
      </footer>
      <Fx />
    </div>
  );
}
