import type { CSSProperties } from "react";
import type { Metadata } from "next";
import styles from "./brand.module.css";
import { Consult } from "./components/Consult";
import { Motion } from "./components/Motion";

export const metadata: Metadata = {
  title: "Khối Tĩnh · Studio kiến trúc & nội thất, cảnh 3D theo cuộn (demo minh hoạ)",
  description: "Demo minh hoạ landing kiến trúc với cảnh 3D CSS perspective nhiều lớp.",
  alternates: { canonical: "/demos/khoi-tinh" },
};

const P = (z: number, x = 0, y = 0) => ({ "--z": `${z}px`, "--s": ((1200 + Math.abs(z)) / 1200).toFixed(3), "--x": `${x}vw`, "--y": `${y}svh` }) as CSSProperties;

const captions = [
  { k: "01", t: "Ánh sáng", d: "Mỗi khung cửa là một quyết định về ánh sáng: nó vào từ đâu, rơi lên bề mặt nào và rời đi lúc mấy giờ." },
  { k: "02", t: "Vật liệu", d: "Đá, gỗ, bê tông, đồng thau. Chúng tôi chọn ít vật liệu và để chúng già đi một cách đẹp." },
  { k: "03", t: "Tỷ lệ", d: "Khi các lớp không gian chồng lên nhau đúng nhịp, người đi qua cảm thấy bình yên mà không biết vì sao." },
];
const projects = [
  { c: "A", t: "Nhà ống Hải Châu", d: "Giếng trời, mặt đứng gạch thô", m: "Nhà phố · 4 tầng · dự án mẫu" },
  { c: "B", t: "Biệt thự Sơn Trà", d: "Các mái bằng chồng nhịp", m: "Biệt thự · 2 tầng · dự án mẫu" },
  { c: "C", t: "Căn hộ Ngũ Hành Sơn", d: "Nội thất đá và gỗ sồi", m: "Căn hộ · 96 m² · dự án mẫu" },
];
const materials = [
  { n: "Đá travertine", s: "linear-gradient(100deg,#d9cbb6,#cdbda6 40%,#dccfbb 70%,#c9b9a1)" },
  { n: "Gỗ sồi xông", s: "repeating-linear-gradient(90deg,#8a6a48 0 6px,#7a5c3c 6px 9px,#94734f 9px 16px)" },
  { n: "Bê tông mài", s: "radial-gradient(circle at 30% 20%,#b9b5ad,#9a968e 70%)" },
  { n: "Đồng thau", s: "linear-gradient(120deg,#c9a45a,#8f6d2a 55%,#d8b970)" },
];
const services = [
  ["Thiết kế kiến trúc", "Từ ý tưởng đến hồ sơ xin phép, bản vẽ thi công và giám sát tác giả."],
  ["Thiết kế nội thất", "Bố cục, vật liệu, đồ rời đo may theo từng không gian."],
  ["Thi công trọn gói", "Một đầu mối chịu trách nhiệm về tiến độ, chi phí và chất lượng."],
  ["Cải tạo & bảo tồn", "Giữ lại cái đáng giữ, thay đổi cái cần thay đổi."],
];
const steps = ["Lắng nghe", "Khảo sát", "Ý tưởng", "Hồ sơ", "Thi công", "Bàn giao"];
const stats = [
  { v: 12, l: "dự án mẫu trong trang này" },
  { v: 6, l: "bước làm việc rõ ràng" },
  { v: 3, l: "vòng chỉnh sửa phương án" },
  { v: 24, l: "tháng bảo hành (giả định)" },
];
const faqs = [
  { q: "Chi phí thiết kế được tính thế nào?", a: "Thường theo diện tích sàn và độ phức tạp. Ô ước tính ở cuối trang chỉ là công thức minh hoạ." },
  { q: "Tôi cần chuẩn bị gì trước buổi gặp đầu tiên?", a: "Sổ đỏ hoặc bản vẽ hiện trạng (nếu có), vài hình ảnh bạn thích và ngân sách dự kiến." },
  { q: "Studio có nhận thi công không?", a: "Có hai hình thức: chỉ thiết kế, hoặc thiết kế và thi công trọn gói. Nội dung trên trang này là minh hoạ." },
  { q: "Khối Tĩnh có phải studio thật?", a: "Không. Thương hiệu, dự án, số liệu và chính sách đều là giả định phục vụ trang demo." },
];

export default function Page() {
  return (
    <div className={styles.brand} data-kt-root>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Motion />
      <header className={styles.header}>
        <a href="#top" className={styles.logo} aria-label="Khối Tĩnh, về đầu trang">Khối <i>Tĩnh</i></a>
        <nav aria-label="Điều hướng chính" className={styles.nav}>
          <a href="#xuyen-khong-gian">Không gian</a><a href="#du-an">Dự án</a><a href="#quy-trinh">Quy trình</a><a href="#tu-van">Tư vấn</a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.hero} id="top" data-hero>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-hero-in>Studio kiến trúc &amp; nội thất · minh hoạ</p>
            <h1 className={styles.h1} data-hero-in>Khối<br /><i>Tĩnh</i></h1>
            <p className={styles.lead} data-hero-in>Chúng tôi thiết kế những căn nhà để sống chậm: ít vật liệu, nhiều ánh sáng, tỷ lệ đúng.</p>
            <div className={styles.actions} data-hero-in><a className={styles.btn} href="#xuyen-khong-gian">Đi xuyên không gian</a><a className={styles.btnLine} href="#tu-van">Nhận tư vấn</a></div>
          </div>
          <div className={styles.heroStage} aria-hidden="true">
            <div className={styles.heroRig} data-hero-rig>
              <div className={styles.hArch} />
              <div className={styles.hBlock} />
              <div className={styles.hSmall} />
              <div className={styles.hSun} />
              <div className={styles.hLine} />
            </div>
          </div>
        </section>

        <section className={styles.statement} aria-labelledby="st">
          <p className={styles.eyebrow} data-rise>01 · Triết lý</p>
          <h2 id="st" className={styles.h2} data-rise>Một không gian tốt không cố gây ấn tượng. Nó <i>làm bạn yên</i>.</h2>
        </section>

        <section className={styles.depth} id="xuyen-khong-gian" data-depth aria-label="Cảnh 3D nhiều lớp: camera đi xuyên qua các khung cửa khi cuộn">
          <div className={styles.stage} aria-hidden="true">
            <div className={styles.rig} data-rig>
              <div className={styles.world} data-world>
                <div className={styles.floor} />
                <div className={styles.ceil} />
                <div className={styles.plane} data-plane data-z="-2600" style={P(-2600)}>
                  <div className={styles.wall}>
                    <div className={styles.arches}>{[0, 1, 2, 3, 4].map((i) => <i key={i} />)}</div>
                  </div>
                </div>
                <div className={styles.plane} data-plane data-z="-2000" style={P(-2000)}>
                  <i className={`${styles.col} ${styles.colL}`} /><i className={`${styles.col} ${styles.colR}`} />
                </div>
                <div className={styles.plane} data-plane data-z="-1750" data-word style={P(-1750, -14, -14)}><p className={styles.word}>Ánh sáng</p></div>
                <div className={styles.plane} data-plane data-z="-1400" style={P(-1400)}><div className={styles.hole} /></div>
                <div className={styles.plane} data-plane data-z="-1100" data-word style={P(-1100, 12, 8)}><p className={styles.word}>Vật liệu</p></div>
                <div className={styles.plane} data-plane data-z="-850" style={P(-850)}><div className={`${styles.hole} ${styles.holeArch}`} /></div>
                <div className={styles.plane} data-plane data-z="-600" data-word style={P(-600, -8, 16)}><p className={styles.word}>Tỷ lệ</p></div>
                <div className={styles.plane} data-plane data-z="-300" style={P(-300)}><div className={styles.beam} /></div>
                <div className={styles.plane} data-plane data-z="0" style={P(0)}><i className={`${styles.pillar} ${styles.pL}`} /><i className={`${styles.pillar} ${styles.pR}`} /></div>
              </div>
            </div>
            <div className={styles.haze} />
          </div>
          <div className={styles.caps}>
            {captions.map((c) => (
              <article key={c.k} className={styles.cap} data-cap>
                <p className={styles.eyebrow}>{c.k} · Đi xuyên không gian</p>
                <h2 className={styles.h2s}>{c.t}</h2>
                <p>{c.d}</p>
              </article>
            ))}
            <div className={styles.prog} aria-hidden="true"><i data-prog /></div>
          </div>
        </section>

        <section className={styles.projects} id="du-an" aria-labelledby="da">
          <p className={styles.eyebrow} data-rise>02 · Dự án mẫu</p>
          <h2 id="da" className={styles.h2} data-rise>Ba cách đặt một khối vào ánh sáng.</h2>
          <ul className={styles.plates} data-rows>
            {projects.map((p) => (
              <li key={p.c}>
                <div className={`${styles.plate} ${styles[`plate${p.c}`]}`} data-plate role="img" aria-label={`Hình khối minh hoạ cho ${p.t}`}>
                  {[1, 2, 3, 4].map((n) => <i key={n} data-layer className={styles[`p${p.c}${n}`]} />)}
                </div>
                <h3>{p.t}</h3><p>{p.d}</p><p className={styles.meta}>{p.m}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.materials} aria-labelledby="vl">
          <h2 id="vl" className={styles.h2s} data-rise>Bảng vật liệu</h2>
          <ul className={styles.swatches} data-rows>
            {materials.map((m) => (<li key={m.n}><span style={{ background: m.s }} /><b>{m.n}</b></li>))}
          </ul>
        </section>

        <section className={styles.services} aria-labelledby="dv">
          <h2 id="dv" className={styles.h2s} data-rise>Chúng tôi làm gì</h2>
          <ul className={styles.svList} data-rows>
            {services.map(([t, d], i) => (<li key={t}><span>0{i + 1}</span><h3>{t}</h3><p>{d}</p></li>))}
          </ul>
        </section>

        <section className={styles.process} id="quy-trinh" aria-labelledby="qt">
          <p className={styles.eyebrow} data-rise>03 · Quy trình</p>
          <h2 id="qt" className={styles.h2} data-rise>Sáu bước, mỗi bước một quyết định.</h2>
          <ol className={styles.steps} data-rows>
            {steps.map((s, i) => (<li key={s}><span>{i + 1}</span><b>{s}</b></li>))}
          </ol>
        </section>

        <section className={styles.stats} aria-label="Số liệu minh hoạ">
          <ul>{stats.map((s) => (<li key={s.l}><b><span data-count={s.v}>{s.v}</span></b><span>{s.l}</span></li>))}</ul>
          <p className={styles.fine}>Số liệu chỉ để minh hoạ bố cục.</p>
        </section>

        <section className={styles.faq} aria-labelledby="fq">
          <h2 id="fq" className={styles.h2s} data-rise>Câu hỏi thường gặp</h2>
          <div className={styles.faqList} data-rise>{faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}</div>
        </section>

        <section className={styles.contact} id="tu-van" aria-labelledby="tv">
          <p className={styles.eyebrow}>04 · Tư vấn</p>
          <h2 id="tv" className={styles.h2}>Kể cho chúng tôi nghe về khu đất của bạn.</h2>
          <Consult />
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footWord} aria-hidden="true">Khối <i>Tĩnh</i></p>
        <p>Trang demo minh hoạ. Thương hiệu, dự án, số liệu và chính sách đều là giả định, không đại diện cho studio nào.</p>
      </footer>
    </div>
  );
}
