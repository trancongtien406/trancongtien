/* eslint-disable @next/next/no-img-element */
import s from "../brand.module.css";
import { IMG, SPECS, STATIONS, TECH, VOICES } from "../data";

function NightCar({ cls, wrapProps }: { cls: string; wrapProps?: Record<string, string> }) {
  return (
    <div className={`${s.nightWrap} ${cls}`} {...wrapProps}>
      <div className={s.nightCar}><img className={s.img} src={`${IMG}car-black.webp`} width={1400} height={1000} alt="Chiếc coupe điện đen nhìn thẳng chính diện, đèn pha sáng (ảnh minh hoạ)" loading="lazy" decoding="async" /></div>
      <div className={s.reflect} aria-hidden="true"><img className={s.img} src={`${IMG}car-black.webp`} alt="" width={1400} height={1000} loading="lazy" /></div>
      <span className={`${s.glow} ${s.glowL}`} data-glow aria-hidden="true" />
      <span className={`${s.glow} ${s.glowR}`} data-glow aria-hidden="true" />
      <span className={s.beam} data-beam aria-hidden="true" />
    </div>
  );
}

export function HeroWet() {
  return (
    <section id="hero" className={s.hero} aria-labelledby="hero-h">
      <div className={s.heroImg} data-heroimg><img className={s.img} src={`${IMG}rain.webp`} width={1920} height={1080} alt="Chiếc coupe tối chạy trên đường ướt mưa dưới trời xám (ảnh minh hoạ)" decoding="async" /></div>
      <div className={s.rain} aria-hidden="true" />
      <div className={s.heroCopy}>
        <h1 id="hero-h" data-hrv>Sinh ra cho mưa.<br />Chỉnh cho đêm tối.</h1>
        <a className={s.gold} href="#cau-hinh" data-hrv>Cấu hình xe của bạn <i aria-hidden="true">→</i></a>
      </div>
      <div className={s.heroBottom} data-hrv>
        <dl className={s.miniStats}>
          <div><dt>523</dt><dd>mã lực</dd></div>
          <div><dt>650</dt><dd>Nm mô-men</dd></div>
          <div><dt>3,4</dt><dd>giây 0-100</dd></div>
          <div><dt>290</dt><dd>km/h tối đa</dd></div>
        </dl>
        <p className={s.cdot}><i aria-hidden="true" /> Đen Sapphire</p>
      </div>
    </section>
  );
}

export function Lights() {
  return (
    <section id="hieu-nang" className={`${s.pin} ${s.zero}`} aria-labelledby="zero-h" data-zero>
      <div className={s.bridge} aria-hidden="true" />
      <NightCar cls={s.zeroCar} wrapProps={{ "data-zerocar": "" }} />
      <div className={s.zeroText}>
        <p className={s.kick}><b>01</b><i />Đèn bật sáng</p>
        <h2 id="zero-h" className={s.h2s}>Một lần cuộn.<br />Mở mắt.</h2>
        <p className={s.lead}>Đèn laser thức dậy theo trình tự: mắt thiên thần trước, rồi tới chùm sáng. Cuộn xuống để bắt đầu bấm giờ.</p>
      </div>
      <div className={s.clock} role="img" aria-label="Đồng hồ 0 đến 100 km/h, chạy theo thanh cuộn"><b data-zeronum>0.00</b><span>giây · 0 - 100 km/h</span></div>
    </section>
  );
}

export function Built() {
  const spokes = Array.from({ length: 10 }, (_, i) => i * 36);
  const wheel = (cx: number, id: string) => (
    <g transform={`translate(${cx} 304)`}>
      <g data-wheel={id}>
        <circle r="60" fill="#05070d" stroke="#1f2f66" strokeWidth="2" />
        <circle r="42" fill="#0b1226" stroke="#4a6fe0" strokeWidth="2" />
        {spokes.map((a) => (<line key={a} x1="0" y1="0" x2="0" y2="-40" stroke="#6a8ff7" strokeWidth="4.5" strokeLinecap="round" transform={`rotate(${a})`} opacity=".9" />))}
        <circle r="10" fill="#e5b772" />
        <path d="M-32 -36 A48 48 0 0 1 32 -36" fill="none" stroke="#e5b772" strokeWidth="6" strokeLinecap="round" opacity=".9" />
      </g>
    </g>
  );
  return (
    <section id="cau-tao" className={`${s.pin} ${s.build}`} aria-labelledby="build-h" data-build>
      <p className={`${s.kick} ${s.bNum}`}><b>03</b><i />Cấu tạo</p>
      <h2 id="build-h" className={s.buildH}>Được tạo từ</h2>
      <div className={s.bStage}>
        <svg className={s.bSvg} viewBox="0 0 900 420" role="img" aria-label="Thân xe coupe nhìn ngang, hai bánh tách rời khỏi thân khi cuộn">
          <defs>
            <linearGradient id="vt-b1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a5aa8" /><stop offset=".35" stopColor="#101c40" /><stop offset=".7" stopColor="#070c1c" /><stop offset="1" stopColor="#03050b" /></linearGradient>
            <linearGradient id="vt-b2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#7aa2ff" stopOpacity="0" /><stop offset=".5" stopColor="#e3eeff" /><stop offset="1" stopColor="#7aa2ff" stopOpacity="0" /></linearGradient>
            <linearGradient id="vt-b3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1c3fb8" /><stop offset="1" stopColor="#57a0ff" /></linearGradient>
            <linearGradient id="vt-b4" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2f5bd8" stopOpacity="0" /><stop offset=".6" stopColor="#4d86ff" stopOpacity=".75" /><stop offset="1" stopColor="#2f5bd8" stopOpacity="0" /></linearGradient>
          </defs>
          <ellipse cx="450" cy="376" rx="410" ry="16" fill="#000" opacity=".55" />
          <g data-batt opacity="0"><rect x="150" y="292" width="600" height="28" rx="10" fill="url(#vt-b3)" opacity=".85" /><path d="M170 306h560" stroke="#cfe0ff" strokeOpacity=".5" strokeDasharray="8 10" /></g>
          <g data-body>
            <path d="M60 296 L58 266 C60 250 76 242 104 236 L196 224 C228 198 268 172 318 158 C372 142 452 134 520 136 C590 140 650 158 700 186 L772 198 C812 204 840 216 846 240 L848 296 Z" fill="url(#vt-b1)" stroke="#7c9dff" strokeWidth="1.5" />
            <path d="M328 192 L366 164 C410 152 480 148 540 152 C590 158 636 176 668 194 Z" fill="#071027" stroke="#4b70e0" strokeWidth="1" />
            <path d="M372 170 C420 160 480 158 530 161" fill="none" stroke="#9db8ff" strokeOpacity=".5" strokeWidth="2" />
            <path d="M318 158 C372 142 452 134 520 136 C590 140 650 158 700 186" fill="none" stroke="url(#vt-b2)" strokeWidth="3" />
            <path d="M60 278 C300 270 600 270 848 278" fill="none" stroke="#5a84ff" strokeOpacity=".75" strokeWidth="2" />
            <path d="M420 266 L700 262 L760 296 L400 296Z" fill="url(#vt-b4)" />
            <path d="M474 166 L474 280 M370 208 L660 212" fill="none" stroke="#1b2c63" strokeWidth="2" />
            <path d="M64 256 L134 242 L131 253 L68 266Z" fill="#e1efff" />
            <path d="M826 222 L848 230 L846 244 L824 238Z" fill="#ff5a4a" opacity=".8" />
            <circle cx="250" cy="304" r="68" fill="#000104" /><circle cx="690" cy="304" r="68" fill="#000104" />
            <path d="M182 304 A68 68 0 0 1 318 304 M622 304 A68 68 0 0 1 758 304" fill="none" stroke="#3b63e8" strokeOpacity=".8" strokeWidth="2" />
          </g>
          {wheel(250, "l")}{wheel(690, "r")}
        </svg>
        <div className={`${s.note} ${s.nLeft}`} data-note><b>Pin 92 kWh</b>Cell hình trụ xếp thành sàn xe, mô-tơ ba cấp, vòng tua tối đa 18.000 vòng/phút.</div>
        <div className={`${s.note} ${s.nRight}`} data-note><b>Thân CFRP</b>Mui, nắp ca-pô và cánh gió trước bằng sợi carbon, nhẹ hơn thép 38 kg.</div>
        <div className={`${s.note} ${s.nWheel}`} data-note><b>Mâm rèn 19 / 20 inch</b>Mâm lệch cỡ trước sau, kẹp phanh sáu piston màu vàng.</div>
      </div>
      <p className={s.count}><b data-bcount>1</b> / 3 chi tiết</p>
    </section>
  );
}

export function Numbers() {
  return (
    <section id="so-lieu" className={`${s.pin} ${s.numbers}`} aria-labelledby="num-h" data-numbers>
      <p className={s.ghost523} data-ghost aria-hidden="true">523</p>
      <div className={s.numHead}>
        <p className={s.kick}><b>04</b><i />Những con số</p>
        <h2 id="num-h" className={s.h2s}>Mỗi con số<br />tự đếm.</h2>
      </div>
      <NightCar cls={s.numCar} wrapProps={{ "data-numcar": "" }} />
      <ul className={s.numGrid}>
        <li className={s.nTR}><b data-num="523">523</b><span>mã lực</span></li>
        <li className={s.nTL}><b data-num="650">650</b><span>Nm mô-men</span></li>
        <li className={s.nBL}><b data-num="3.4" data-dec="1">3.4</b><span>giây 0 - 100 km/h</span></li>
        <li className={s.nBR}><b data-num="290">290</b><span>km/h tốc độ tối đa</span></li>
      </ul>
    </section>
  );
}

export function Engineering() {
  return (
    <section id="ky-thuat" className={`${s.sec} ${s.eng}`} aria-labelledby="eng-h">
      <div className={s.engTop}>
        <div>
          <p className={s.kick}><b>05</b><i />Kỹ thuật</p>
          <h2 id="eng-h" className={s.h2s}>Sức mạnh dựng bằng điện, <span style={{ color: "var(--vt-gold)" }}>tinh chỉnh bằng mưa.</span></h2>
        </div>
        <p className={s.lead} style={{ maxWidth: "52ch" }}>Chúng tôi thử xe 2.400 giờ trên đường ướt trước khi đặt tên cho nó. Mỗi chi tiết dưới đây tồn tại vì một lý do: giữ cho 523 mã lực dính mặt đường khi trời đổ nước.</p>
      </div>
      <ul className={s.techGrid}>
        {TECH.map((t) => (<li key={t.n} className={s.tech} data-rv><span>{t.n}</span><div><h3>{t.t}</h3><p>{t.d}</p></div></li>))}
      </ul>
      <dl className={s.specs} aria-label="Thông số kỹ thuật">
        {SPECS.map(([k, v]) => (<div key={k} data-rv><dt>{k}</dt><dd>{v}</dd></div>))}
      </dl>
    </section>
  );
}

export function Cabin() {
  return (
    <section id="noi-that" className={`${s.pin} ${s.cabin}`} aria-labelledby="in-h" data-cabin>
      <div className={s.cabinBg} data-cabinbg><img className={s.img} src={`${IMG}cockpit.webp`} width={1920} height={1080} alt="Buồng lái nhìn từ ghế người lái, bảng đồng hồ và màn hình trung tâm sáng đèn xanh (ảnh minh hoạ)" loading="lazy" decoding="async" /></div>
      <p className={`${s.kick} ${s.cabinK}`}><b>06</b><i />Khoang lái</p>
      <h2 id="in-h" className={s.insideH} data-insideh>Bên trong</h2>
      <p className={`${s.hotpt} ${s.h1}`} data-hot><span><b>Vô-lăng Alcantara</b>Vạch đỏ 12 giờ, lẫy chuyển chế độ M1 và M2</span></p>
      <p className={`${s.hotpt} ${s.h2}`} data-hot><span><b>Ghế bucket carbon</b>Da Merino, logo phát sáng</span></p>
      <p className={`${s.hotpt} ${s.h3}`} data-hot><span><b>Màn hình cong</b>Một tấm kính liền từ đồng hồ tới trung tâm</span></p>
    </section>
  );
}

export function Charge() {
  return (
    <section id="sac" className={`${s.sec} ${s.charge}`} aria-labelledby="sac-h" data-charge>
      <div className={s.chGrid}>
        <div>
          <p className={s.kick}><b>07</b><i />Sạc và hành trình</p>
          <h2 id="sac-h" className={s.h2s}>Sạc nhanh <span style={{ color: "var(--vt-gold)" }}>như một cơn mưa rào.</span></h2>
          <p className={s.lead}>Chúng tôi đang lắp trạm sạc 350 kW dọc quốc lộ 1, cách nhau tối đa 120 km. Bạn dừng lại uống một ly cà phê, xe đã sẵn sàng đi tiếp.</p>
        </div>
        <ul className={s.chNums}>
          <li data-rv><b>350</b><span><em>kW công suất sạc DC</em>Tận dụng tối đa trạm sạc nhanh, giữ ổn định tới 60%.</span></li>
          <li data-rv><b>18</b><span><em>phút từ 10% tới 80%</em>Làm nóng pin trước khi sạc nếu trời lạnh hoặc mưa lớn.</span></li>
          <li data-rv><b>640</b><span><em>km quãng đường WLTP</em>Đủ cho chuyến Hà Nội - Đà Nẵng chỉ với một lần dừng sạc.</span></li>
        </ul>
      </div>
      <ol className={s.route} data-route aria-label="Các trạm sạc dọc tuyến Bắc Nam">
        {STATIONS.map((c) => (<li key={c}>{c}</li>))}
      </ol>
    </section>
  );
}

export function Voices() {
  const g = [["coupe.webp", "Coupe đen trong bãi đỗ, giọt mưa trên nắp ca-pô (ảnh minh hoạ)", "Ban ngày"], ["rain.webp", "Coupe chạy trên đường ướt (ảnh minh hoạ)", "Trong mưa"], ["rear.webp", "Đuôi xe trên mặt đường ướt ban đêm (ảnh minh hoạ)", "Ban đêm"]];
  return (
    <section id="phan-hoi" className={`${s.sec} ${s.voices}`} aria-labelledby="vo-h">
      <p className={s.kick}><b>08</b><i />Phản hồi và hình ảnh</p>
      <h2 id="vo-h" className={s.h2s} style={{ marginTop: 16, maxWidth: "14em" }}>Họ nói gì sau khi <span style={{ color: "var(--vt-gold)" }}>lái thử.</span></h2>
      <div className={s.vGrid}>
        {VOICES.map((v) => (<figure key={v.n} className={s.vCard} data-rv><blockquote>“{v.q}”</blockquote><figcaption>{v.n}</figcaption></figure>))}
      </div>
      <div className={s.gal}>
        {g.map(([f, a, c]) => (<figure key={f} data-rv><img className={s.img} src={`${IMG}${f}`} alt={a} width={1920} height={1080} loading="lazy" decoding="async" /><figcaption>{c}</figcaption></figure>))}
      </div>
    </section>
  );
}
