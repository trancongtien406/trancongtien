/* eslint-disable @next/next/no-img-element */
import s from "../brand.module.css";
import { AMENITIES, FAQ, GESTURES, IMG, JOURNEY, MATERIALS, TEAM } from "../data";

const PARA = "Nhà Phố Ánh Sáng là toà tháp căn hộ mới ở Thảo Điền, Sài Gòn: 48 căn hộ riêng tư trên 22 tầng, vươn lên trên những tán cọ của đại lộ. Một đường đá sáng màu cắt xuyên lớp kính và giữ các hiên nắng, để mỗi căn hộ có một phòng ngoài trời của riêng mình, sâu và kín đáo, nhìn ra thành phố.";

export function Project() {
  const words = PARA.split(" ");
  return (
    <section id="du-an" className={`${s.sec} ${s.dark} ${s.project} ${s.proj}`} aria-labelledby="du-an-h">
      <p className={s.label} id="du-an-h"><b>[01]</b> — Dự án</p>
      <p className={`${s.big} big`} data-words>
        {words.map((w, i) => (<span key={i} data-w>{w}{" "}</span>))}
      </p>
      <ul className={s.stats} aria-label="Số liệu dự án">
        <li><p className={s.label}>Căn hộ</p><b data-count="48">48</b></li>
        <li><p className={s.label}>Tầng</p><b data-count="22">22</b></li>
        <li><p className={s.label}>Bàn giao</p><b data-count="2028">2028</b></li>
        <li><p className={s.label}>Chiều cao</p><b data-count="96">96<small>m</small></b></li>
      </ul>
    </section>
  );
}

const MQ = ["CĂN HỘ", "KÍNH ĐỒNG", "ĐÁ TRAVERTINE", "GỖ ÓC CHÓ", "HIÊN NẮNG", "ÁNH SÁNG"];
const Star = () => (<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2 24 16 38 20 24 24 20 38 16 24 2 20 16 16Z" fill="#d9a85b" /></svg>);

export function Marquee() {
  const row = (key: string) => (
    <div key={key} style={{ display: "flex", gap: ".5em" }}>
      {MQ.map((t, i) => (<span key={t}><span className={i % 2 ? s.out : ""}>{t}</span><Star /></span>))}
    </div>
  );
  return (
    <div className={s.marq} aria-hidden="true">
      <div className={s.marqIn} data-marq>{row("a")}{row("b")}</div>
    </div>
  );
}

export function Gestures() {
  return (
    <section id="kien-truc" className={s.gest} aria-labelledby="kt-h" data-gest>
      <div className={s.gTrack} data-gtrack>
        <div className={s.gHead}>
          <p className={s.label}><b>[02]</b> — Kiến trúc</p>
          <h2 id="kt-h" style={{ marginTop: 22 }}>Ba cử chỉ,<em>một toà nhà.</em></h2>
          <p>Toàn bộ thiết kế xoay quanh ba quyết định: một đường đá, một hiên sâu và một ngưỡng cửa gần như biến mất.</p>
        </div>
        {GESTURES.map((g) => (
          <article key={g.n} className={s.gCard}>
            <div className={s.gPic}><img className={s.img} data-gimg src={`${IMG}${g.img}.webp`} alt={g.alt} width={1200} height={1500} loading="lazy" decoding="async" /></div>
            <div className={s.gTxt}>
              <p className={s.gNum} aria-hidden="true">{g.n}</p>
              <h3>{g.t}</h3>
              <p>{g.p}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Finishes() {
  const sw = ["linear-gradient(135deg,#d9cdb2,#bfae8d)", "linear-gradient(135deg,#9a7344,#5a3f1f)", "linear-gradient(135deg,#4a2f1e,#241309)", "linear-gradient(135deg,#e6dfd0,#cfc6b2)"];
  return (
    <section id="hoan-thien" className={`${s.fin}`} aria-labelledby="fin-h" data-fin>
      <div style={{ height: "clamp(70px,12vh,150px)" }} />
      <div className={s.finBand}>
        <img className={s.img} data-finimg src={`${IMG}woodrm.webp`} alt="Phòng khách ốp gỗ tối, ánh sáng ấm từ đèn bàn và cửa sổ nhìn ra thành phố" width={1600} height={1000} loading="lazy" decoding="async" />
        <div className={s.finText}>
          <h2 id="fin-h" className={s.disp}>Gỗ tối, đá sáng, <em>ánh sáng gián tiếp.</em></h2>
          <p>Sàn travertine mài mờ, cửa kính khung đồng, sưởi sàn và nhà thông minh trọn gói. Vật liệu hoàn thiện có thể tuỳ chỉnh cho tới khi giai đoạn hoàn thiện bắt đầu.</p>
        </div>
      </div>
      <ul className={s.mats} aria-label="Bảng vật liệu">
        {MATERIALS.map((m, i) => (
          <li key={m.n} className={s.mat} data-rv>
            <div className={s.matSw} style={{ background: sw[i] }} role="img" aria-label={`Mẫu màu ${m.n}`} />
            <h3>{m.n}</h3>
            <p>{m.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Amenities() {
  return (
    <section id="tien-ich" className={`${s.sec} ${s.amen}`} aria-labelledby="ti-h">
      <p className={s.label}><b>[04]</b> — Tiện ích</p>
      <h2 id="ti-h" className={s.disp}>Mọi thứ dưới mái nhà, <em>để bạn ở lại lâu hơn.</em></h2>
      <ul className={s.aGrid}>
        {AMENITIES.map((a, i) => (
          <li key={a.t} className={s.aItem} data-rv>
            <span>0{i + 1}</span>
            <div><h3>{a.t}</h3><p>{a.d}</p></div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Journey() {
  return (
    <section id="tien-do" className={`${s.sec} ${s.jour}`} aria-labelledby="td-h">
      <p className={s.label}><b>[05]</b> — Tiến độ</p>
      <h2 id="td-h" className={s.disp}>Từ cọc móng đến <em>chìa khoá đồng.</em></h2>
      <ol className={s.jLine} data-jline>
        <i className={s.jFill} data-jfill aria-hidden="true" />
        {JOURNEY.map((j) => (
          <li key={j.y} className={s.jStep} data-rv>
            <b>{j.y}</b><h3>{j.t}</h3><p>{j.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Team() {
  return (
    <section id="doi-ngu" className={`${s.sec} ${s.team}`} aria-labelledby="dn-h">
      <p className={s.label}><b>[06]</b> — Đội ngũ</p>
      <h2 id="dn-h" className={s.disp}>Ba người, <em>một cách nhìn về ánh sáng.</em></h2>
      <div className={s.tGrid}>
        {TEAM.map((t) => (
          <article key={t.n} className={s.tCard} data-rv>
            <div className={s.mono2} aria-hidden="true">{t.n.split(" ").slice(-1)[0][0]}</div>
            <h3>{t.n}</h3>
            <p className={s.r}>{t.r}</p>
            <p className={s.d}>{t.d}</p>
          </article>
        ))}
      </div>
      <figure className={s.quote} data-rv>
        <blockquote>“Tôi bước vào căn mẫu lúc năm giờ chiều và ngồi yên mười phút. Thành phố vẫn ồn ào nhưng trong nhà chỉ có ánh sáng.”</blockquote>
        <figcaption>Lời cảm nhận minh hoạ của một khách tham quan, không phải đánh giá thật</figcaption>
      </figure>
    </section>
  );
}

export function Location() {
  return (
    <section id="vi-tri" className={`${s.sec} ${s.loc}`} aria-labelledby="vt-h">
      <p className={s.label}><b>[07]</b> — Vị trí</p>
      <div className={s.locGrid}>
        <div>
          <h2 id="vt-h" className={s.disp}>Trên thành phố, <em>trong lòng nó.</em></h2>
          <p className={s.coord}>10.8031° N / 106.7367° E</p>
          <p className={s.addr}>12 Quốc Hương, Thảo Điền, TP. Thủ Đức (địa chỉ minh hoạ), giữa những quán cà phê của khu dân cư và các tuyến đường nhiều cây xanh ven sông Sài Gòn.</p>
          <ul className={s.dist}>
            <li><span>Chợ Thảo Điền</span><span>4 phút đi bộ</span></li>
            <li><span>Ga Metro Thảo Điền</span><span>7 phút đi bộ</span></li>
            <li><span>Trung tâm quận 1</span><span>18 phút đi xe</span></li>
            <li><span>Sân bay Tân Sơn Nhất</span><span>30 phút đi xe</span></li>
          </ul>
          <a className={s.mapLink} href="https://www.openstreetmap.org/?mlat=10.8031&mlon=106.7367#map=15/10.8031/106.7367" target="_blank" rel="noreferrer">Mở bản đồ ↗</a>
        </div>
        <div className={s.locPic}><img className={s.img} data-locimg src={`${IMG}street.webp`} alt="Đại lộ giữa các toà nhà cao tầng lúc hoàng hôn" width={1200} height={1500} loading="lazy" decoding="async" /></div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={`${s.sec} ${s.faq}`} aria-labelledby="hd-h">
      <div className={s.faqGrid}>
        <div>
          <p className={s.label}><b>[08]</b> — Câu hỏi thường gặp</p>
          <h2 id="hd-h" className={s.disp}>Điều khách <em>hay hỏi.</em></h2>
        </div>
        <div className={s.faqL}>
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}<i aria-hidden="true">+</i></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
