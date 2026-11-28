"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
const B = "/images/demos/tiep-thi-b2b/";
import { Pixels } from "./Pixels";
import { Extras, Foot, ContactForm } from "./Extras";

const NAV = [
  { t: "Dịch vụ", h: "#dich-vu", mega: true },
  { t: "Chuyên môn", h: "#chuyen-mon" },
  { t: "Dự án", h: "#ket-qua" },
  { t: "Tài nguyên", h: "#tai-nguyen" },
  { t: "Về chúng tôi", h: "#doi-ngu" },
  { t: "Tuyển dụng", h: "#cong-ty" },
];
const MEGA = [
  { t: "Nội dung & Sáng tạo", d: "Thuê cả một xưởng nội dung B2B", h: "#dich-vu" },
  { t: "Quảng cáo & Hiệu suất", d: "Thuê bộ máy quảng cáo hiệu suất", h: "#dich-vu" },
  { t: "Dữ liệu & Đo lường", d: "Chúng tôi làm lộ phần doanh thu vô hình", h: "#dich-vu" },
  { t: "Đội ngũ Demand", d: "Đội ngũ chuyên gia riêng của bạn", h: "#doi-ngu" },
  { t: "Đào tạo Demand Gen", d: "Trở thành chuyên gia Demand Gen", h: "#demand-gen" },
];

const RESULTS = [
  { logo: "kmd", cls: "logoA", stats: [["200%", "Doanh số inbound tăng"], ["53%", "Lead nhiều hơn"]], q: "" },
  { logo: "saomai", cls: "logoB", stats: [["60+", "Lead đạt chuẩn mỗi tháng"], ["66%", "Tỷ lệ mở email"]], q: "" },
  { logo: "TÂM ĐIỂM", cls: "logoC", stats: [["12%", "Tỷ lệ chuyển đổi trang"], ["400%", "Lượt tải tài liệu"]], q: "" },
  { logo: "nhịp số", cls: "logoA", stats: [["38%", "Chi phí lead giảm"], ["2,4x", "Pipeline tăng trưởng"]], q: "" },
];


const SERVICES = [
  { t: "Nội dung & Sáng tạo", d: "Chúng tôi làm cho khách hàng tiềm năng của bạn phải dừng cuộn và đọc.", h: "#demand-gen" },
  { t: "Quảng cáo trả phí & Hiệu suất", d: "Tối ưu LinkedIn, Google và Meta theo pipeline, không theo lượt nhấp.", h: "#demand-gen" },
  { t: "Dữ liệu & Đo lường", d: "Gắn nguồn khách đến từng đồng doanh thu để quyết định có số liệu.", h: "#demand-gen" },
  { t: "Đội ngũ Demand", d: "Một nhóm chuyên gia riêng, làm việc như người của công ty bạn.", h: "#doi-ngu" },
  { t: "Demand Gen", d: "Trở nên nổi tiếng trong ngách và tạo nhu cầu trước khi khách đi tìm.", h: "#demand-gen" },
  { t: "Đào tạo Demand Gen", d: "Huấn luyện đội của bạn vận hành bộ máy tạo nhu cầu.", h: "#demand-gen" },
];

const DEMAND = [
  {
    t: "Demand Gen", s: "Trở nên nổi tiếng trong ngách và tạo ra nhu cầu",
    b: "Người mua B2B quyết định khác người tiêu dùng. Bạn không thể “ép” một nhu cầu. Nhưng khi nhu cầu xuất hiện, bạn muốn là cái tên đầu tiên khách nghĩ tới.",
    p: ["Vì vậy thương hiệu của bạn cần chiếm vị trí đầu tiên trong ngách. Khi một nhu cầu nảy sinh, khách hàng lý tưởng nghĩ ngay đến bạn. Chúng tôi gọi đó là “nổi tiếng trong ngách”.", "Làm thế nào để nổi tiếng trong ngách? Bằng cách hiện diện thường xuyên trước đúng nhóm khách, với nội dung đủ hay để họ không thể bỏ qua, và với phân phối đủ rộng để họ thấy bạn ở mọi nơi."],
    r: ["Pipeline tăng trưởng đều", "Chu kỳ bán hàng ngắn hơn", "Khách tiềm năng ICP chất lượng hơn", "Nhận diện thương hiệu cộng dồn"],
  },
  {
    t: "Demand Capture", s: "Biến nhu cầu đang có thành pipeline",
    b: "Người mua B2B sẽ tự nghiên cứu giải pháp khi họ sẵn sàng mua. Khi khoảnh khắc đó đến, bạn muốn nắm bắt đúng nhu cầu đang hoạt động.",
    p: ["Vì vậy bạn cần hiểu khách hàng tìm kiếm thế nào, họ đọc thông tin nào và điều gì thuyết phục họ.", "Chúng tôi giúp bạn thiết lập các hoạt động bắt nhu cầu hiệu quả nhất: từ tìm kiếm, quảng cáo ngay thời điểm mua, đến trang đích và quy trình chuyển lead sang đội bán hàng."],
    r: ["Nhiều pipeline inbound hơn", "Chi phí mỗi cơ hội thấp hơn", "Tỷ lệ chuyển đổi cao hơn", "Lead đúng ICP, chốt nhanh hơn"],
  },
  {
    t: "Demand Training", s: "Biến đội của bạn thành chuyên gia Demand Gen",
    b: "Muốn tự vận hành bộ máy tạo nhu cầu? Chúng tôi đào tạo đội nội bộ của bạn theo đúng cách chúng tôi làm việc.",
    p: ["Chương trình kéo dài 8 tuần, gồm workshop trực tiếp, tài liệu mẫu, bộ đo lường và những buổi chữa bài với chuyên gia đang chạy chiến dịch thật.", "Cuối chương trình, đội của bạn có một kế hoạch demand 12 tháng và đủ kỹ năng để tự triển khai."],
    r: ["Đội nội bộ tự chủ hơn", "Kế hoạch demand 12 tháng", "Bộ đo lường dùng ngay", "Giảm phụ thuộc vào agency"],
  },
];

const TAGS = ["LinkedIn", "Video", "AI", "Email", "Thiết kế", "Motion"];

const TESTI = [
  { q: "Doanh số SQL của chúng tôi tăng 200% chỉ sau sáu tháng làm việc cùng Phong Vị.", n: "Nguyễn Thu Hà", r: "Trưởng phòng Marketing, KMD" },
  { q: "Đây là agency đầu tiên mà tôi thấy họ thật sự nhìn vào kết quả kinh doanh, không chỉ lượt hiển thị.", n: "Trần Quốc Bảo", r: "Giám đốc kinh doanh, Sao Mai" },
  { q: "Đội ngũ làm việc như người của chính công ty tôi: nhanh, thẳng và có số liệu.", n: "Lê Minh Châu", r: "Co-founder, Tâm Điểm" },
];

const TRAD = ["Marketing và bán hàng làm việc tách rời", "Chạy theo MQL và lượt hiển thị", "Báo cáo hằng tháng, ít hành động", "Chiến dịch rời rạc, mỗi kênh một đội", "Chọn kênh theo thói quen"];
const MOD = ["Marketing và bán hàng chung một mục tiêu doanh thu", "Ưu tiên pipeline và khách hàng ICP", "Số liệu thời gian thực, chỉnh mỗi tuần", "Một bộ máy tích hợp, một nhóm phụ trách", "Chọn kênh theo dữ liệu về khách hàng"];

function Mark() {
  return <svg width="20" height="18" viewBox="0 0 20 18" aria-hidden="true"><path d="M1 3 L8 0 L8 9 L12 6 L19 9 L10 18 L6 12 L1 10Z" fill="currentColor" /></svg>;
}

export function Site() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const q = (s: string, scope: ParentNode = el) => Array.from(scope.querySelectorAll<HTMLElement>(s));
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // hero: dòng chữ vào + cây đung đưa
      gsap.fromTo(q("[data-hl]"), { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.1, clearProps: "transform,opacity" });
      gsap.fromTo(q("[data-hfade]"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, delay: 0.5, ease: "power2.out", clearProps: "transform,opacity" });
      gsap.fromTo(q("[data-plant]"), { opacity: 0, y: 30, rotation: -3 }, { opacity: 1, y: 0, rotation: 0, duration: 1.2, ease: "power3.out", delay: 0.2 });
      gsap.to(q("[data-plant]"), { rotation: 1.6, transformOrigin: "50% 100%", duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.4 });
      // tiêu đề các phần
      q("[data-rv]").forEach((h) => {
        gsap.fromTo(h, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: h, start: "top 86%", once: true } });
      });
      // đếm số
      q("[data-count]").forEach((n) => {
        const raw = n.dataset.count || "";
        const m = raw.match(/^([\d.,]+)(.*)$/);
        if (!m) return;
        const target = parseFloat(m[1].replace(",", "."));
        const dec = m[1].includes(",") ? 1 : 0;
        const o = { v: 0 };
        ScrollTrigger.create({ trigger: n, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: target, duration: 1.4, ease: "power2.out", onUpdate: () => { n.textContent = (dec ? o.v.toFixed(1).replace(".", ",") : String(Math.round(o.v))) + m[2]; }, onComplete: () => { n.textContent = raw; } }) });
      });
      // ảnh dịch vụ: parallax nhẹ; điện thoại nghiêng 3D theo cuộn
      q("[data-par]").forEach((p) => gsap.fromTo(p, { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: 0.6 } }));
      q("[data-phone]").forEach((p) => gsap.fromTo(p, { rotateY: -18, rotateX: 6, y: 20 }, { rotateY: 14, rotateX: -4, y: -20, ease: "none", scrollTrigger: { trigger: p.closest("section"), start: "top bottom", end: "bottom top", scrub: 0.8 } }));
      // so sánh: hàng trượt vào
      q("[data-cmp]").forEach((row, i) => gsap.fromTo(row, { opacity: 0, x: i % 2 ? 40 : -40 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: row, start: "top 90%", once: true } }));
      // đội ngũ: chữ tách ra, thẻ nổi lên, nhãn bật
      const mmx = gsap.matchMedia();
      mmx.add("(min-width: 800px)", () => {
        el.dataset.pin = "1";
        const team = el.querySelector<HTMLElement>("[data-team]")!;
        const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: team, start: "top top", end: "bottom bottom", scrub: 0.6 } });
        gsap.set(q("[data-tc]"), { y: window.innerHeight * 0.7, rotation: (i: number) => (i - 1) * -9, opacity: 0 });
        gsap.set(q("[data-tag]"), { scale: 0, opacity: 0 });
        gsap.set(q("[data-tw='l']"), { x: window.innerWidth * 0.12 }); gsap.set(q("[data-tw='r']"), { x: -window.innerWidth * 0.12 });
        tl.to(q("[data-tc]"), { y: 0, opacity: 1, rotation: (i: number) => (i - 1) * 5, stagger: 0.12, duration: 1.4, ease: "power3.out" }, 0.2)
          .to(q("[data-tw='l']"), { x: 0, duration: 1.6, ease: "power3.out" }, 0.2).to(q("[data-tw='r']"), { x: 0, duration: 1.6, ease: "power3.out" }, 0.2)
          .to(q("[data-tc]"), { rotation: 0, duration: 1, stagger: 0.05 }, 1.9)
          .to(q("[data-tag]"), { scale: 1, opacity: 1, stagger: 0.15, duration: 0.5, ease: "steps(3)" }, 2.0)
          .to({}, { duration: 1 }, 3.6);
        const talk = el.querySelector<HTMLElement>("[data-talk]")!;
        const t2 = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: talk, start: "top top", end: "bottom bottom", scrub: 0.6 } });
        gsap.set(q("[data-tk]"), { scale: 0.2, opacity: 0, y: 40 });
        gsap.set(q("[data-ta='l']"), { x: window.innerWidth * 0.1 }); gsap.set(q("[data-ta='r']"), { x: -window.innerWidth * 0.1 });
        t2.to(q("[data-tk]"), { scale: 1, opacity: 1, y: 0, duration: 1.6, ease: "power3.out" }, 0.1)
          .to(q("[data-ta='l']"), { x: 0, duration: 1.6, ease: "power3.out" }, 0.1).to(q("[data-ta='r']"), { x: 0, duration: 1.6, ease: "power3.out" }, 0.1)
          .to({}, { duration: 1 }, 1.7);
        return () => { delete el.dataset.pin; };
      });
      return () => mmx.revert();
    });
    return () => mm.revert();
  }, []);

  const scrollRail = (dir: number) => rail.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <div ref={root} className={styles.page}>
      <Pixels />
      <header className={styles.navWrap} onMouseLeave={() => setMega(false)}>
        <nav className={styles.nav} aria-label="Chính">
          <a className={styles.logo} href="#main"><Mark /> Phong Vị</a>
          <ul className={menu ? styles.open : undefined}>
            {NAV.map((n) => (
              <li key={n.t}>
                {n.mega ? (
                  <button type="button" className={styles.navBtn} aria-expanded={mega} aria-controls="mega" onMouseEnter={() => setMega(true)} onClick={() => setMega((v) => !v)}>{n.t} <span aria-hidden="true">⌄</span></button>
                ) : (
                  <a href={n.h} onClick={() => setMenu(false)}>{n.t}</a>
                )}
              </li>
            ))}
          </ul>
          <button type="button" className={styles.burger} aria-label="Mở menu" aria-expanded={menu} onClick={() => setMenu((v) => !v)}><i /><i /></button>
          <a className={styles.navCta} href="#lien-he">Nói chuyện <i aria-hidden="true">↗</i></a>
        </nav>
        {mega && (
          <div id="mega" className={styles.mega}>
            {MEGA.map((m) => (
              <a key={m.t} href={m.h} onClick={() => setMega(false)}><b>{m.t}</b><span>{m.d}</span><i aria-hidden="true">↗</i></a>
            ))}
          </div>
        )}
      </header>

      <main id="main">
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow} data-hfade><b /> Agency tiếp thị B2B</p>
            <h1 className={styles.h1}>
              <span className={styles.ln}><span data-hl>Chúng tôi dựng <em>bộ máy</em></span></span>
              <span className={styles.ln}><span data-hl>marketing <em>hiệu suất cao</em></span></span>
              <span className={styles.ln}><span data-hl>cho thương hiệu B2B</span></span>
            </h1>
            <div className={styles.heroFoot}>
              <p data-hfade>Chúng tôi xây dựng, tối ưu và mở rộng bộ máy marketing tạo pipeline, kéo doanh thu và đo được từng đồng bỏ ra.</p>
              <a href="#ket-qua" className={styles.link} data-hfade>Khám phá thêm <i aria-hidden="true">↓</i></a>
            </div>
            <div className={styles.plant} data-plant><img src={B + "plant.webp"} alt="Cây trầu bà lá xanh trên nền trắng, ảnh minh hoạ" width={900} height={1166} fetchPriority="high" /></div>
            <aside className={styles.heroCard} data-hfade>
              <div>
                <p><strong>Demand Gen</strong></p>
                <p className={styles.mut}>Chiến lược giúp khách hàng tiềm năng tăng 200% mỗi quý.</p>
                <b className={styles.mini}>kmd</b>
              </div>
              <div className={styles.heroThumb}><img src={B + "hero-card.webp"} alt="Chuyên viên marketing mỉm cười trong văn phòng" width={320} height={360} loading="lazy" /></div>
              <span className={styles.go} aria-hidden="true">↗</span>
            </aside>
            <i className={`${styles.px} ${styles.px1}`} aria-hidden="true" /><i className={`${styles.px} ${styles.px2}`} aria-hidden="true" /><i className={`${styles.px} ${styles.px3}`} aria-hidden="true" />
          </div>
        </section>

        {/* KẾT QUẢ */}
        <section className={styles.sec} id="ket-qua">
          <div className={styles.wrap}>
            <p className={styles.eyebrowS}><b /> Kết quả</p>
            <div className={styles.split}>
              <h2 className={styles.h2} data-rv>Hơn 100 doanh nghiệp B2B tin tưởng chúng tôi để cải thiện <em>marketing</em></h2>
              <div>
                <p className={styles.p} data-rv>Hơn 100 thương hiệu B2B trên toàn cầu đã giao cho chúng tôi hoạt động marketing để tăng pipeline và chất lượng khách hàng tiềm năng.</p>
                <div className={styles.rowBtns}>
                  <a className={styles.link} href="#ket-qua">Xem tất cả kết quả <i aria-hidden="true">↗</i></a>
                  <span className={styles.arrows}>
                    <button type="button" onClick={() => scrollRail(-1)} aria-label="Trước">←</button>
                    <button type="button" onClick={() => scrollRail(1)} aria-label="Sau" className={styles.dark}>→</button>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.rail} ref={rail} tabIndex={0} role="region" aria-label="Kết quả khách hàng">
              {RESULTS.map((r) => (
                <article key={r.logo} className={styles.res}>
                  <p className={`${styles.rLogo} ${styles[r.cls]}`}>{r.logo}</p>
                  <div className={styles.stats}>
                    {r.stats.map(([n, l]) => (<div key={l}><b data-count={n}>{n}</b><span>{l}</span></div>))}
                  </div>
                  <span className={styles.go} aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DỊCH VỤ */}
        <section className={styles.sec} id="dich-vu">
          <div className={styles.wrap}>
            <div className={styles.svcWrap}>
              <div className={styles.svcLeft}>
                <p className={styles.eyebrowS}><b /> Dịch vụ</p>
                <div className={styles.svcPhoto} data-par><img src={B + "service.webp"} alt="Chuyên viên tư vấn trong bộ vest sẫm đứng trước bức tường gỗ" width={720} height={960} loading="lazy" /><span className={styles.wall}>pv</span><i className={`${styles.px} ${styles.px4}`} aria-hidden="true" /></div>
              </div>
              <div>
                <h2 className={styles.h2} data-rv>Nâng cấp marketing, cải thiện <em>ROI marketing</em></h2>
                <p className={`${styles.p} ${styles.svcP}`} data-rv>Marketing tốt dẫn đến pipeline tốt. Cùng Phong Vị, bạn nâng cả bộ máy marketing: từ chiến lược, quảng cáo cho đến đo lường doanh thu, tất cả đi cùng một hướng.</p>
                <ul className={styles.svcGrid}>
                  {SERVICES.map((s) => (
                    <li key={s.t}>
                      <a href={s.h} className={styles.svcCard}>
                        <h3>{s.t}</h3>
                        <p>{s.d}</p>
                        <span className={styles.go} aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DEMAND */}
        <section className={styles.sec} id="demand-gen">
          <div className={styles.wrap}>
            <div className={styles.dmWrap}>
              <div className={styles.dmPhoneCol}>
                <div className={styles.phone3d} data-phone>
                  <img src={B + "phone.webp"} alt="Điện thoại hiển thị video chia sẻ chuyên môn của một chuyên gia B2B" width={336} height={496} loading="lazy" />
                </div>
                <i className={`${styles.px} ${styles.px5}`} aria-hidden="true" />
              </div>
              <div className={styles.dmCards}>
                {DEMAND.map((d) => (
                  <article key={d.t} className={styles.dmCard}>
                    <h3>{d.t}</h3>
                    <p className={styles.ser}>{d.s}</p>
                    <p className={styles.dmB}><strong>{d.b}</strong></p>
                    {d.p.map((x) => <p key={x} className={styles.dmP}>{x}</p>)}
                    <p className={styles.dmR}><strong>Kết quả:</strong></p>
                    <ul className={styles.checks}>{d.r.map((c) => <li key={c}>{c}</li>)}</ul>
                    <a className={styles.btnG} href="#lien-he">Tìm hiểu thêm <i aria-hidden="true">↗</i></a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ĐỘI NGŨ */}
        <section className={styles.sec} id="doi-ngu">
          <div className={styles.wrap}>
            <p className={styles.eyebrowS}><b /> Đội ngũ demand</p>
            <div className={styles.split}>
              <h2 className={styles.h2} data-rv>Đội ngũ riêng gồm các chuyên gia marketing B2B <em>đẳng cấp</em></h2>
              <p className={styles.p} data-rv>Chúng tôi lập đội chuyên gia theo đúng bài toán của bạn, làm việc cùng đội nội bộ như một phần của công ty. Nhiều thành viên đã có hơn mười năm kinh nghiệm bán hàng B2B.</p>
            </div>
          </div>
        </section>
        <section className={styles.teamTrack} data-team>
          <div className={styles.teamStick}>
            <div className={styles.teamRow}>
              <span className={styles.big} data-tw="l"><em>Đội ngũ</em></span>
              <div className={styles.cards}>
                <div className={styles.pcard} data-tc><img src={B + "team-1.webp"} alt="Chuyên gia nội dung" width={540} height={720} loading="lazy" /></div>
                <div className={`${styles.pcard} ${styles.pMid}`} data-tc><img src={B + "team-2.webp"} alt="Chuyên gia chiến lược" width={540} height={720} loading="lazy" /></div>
                <div className={styles.pcard} data-tc><img src={B + "team-3.webp"} alt="Chuyên gia hiệu suất" width={540} height={720} loading="lazy" /></div>
              </div>
              <span className={styles.big} data-tw="r">chuyên gia</span>
            </div>
            {TAGS.map((t, i) => <span key={t} className={`${styles.tag} ${styles[`tg${i}`]}`} data-tag>{t}</span>)}
          </div>
        </section>

        {/* TƯ DUY HIỆU SUẤT */}
        <section className={styles.sec}>
          <div className={styles.wrap}>
            <p className={styles.eyebrowS}><b /> Khách hàng nói gì</p>
            <div className={styles.split}>
              <h2 className={styles.h2} data-rv>Làm việc với tư duy <em>hiệu suất</em></h2>
              <p className={styles.p} data-rv>Chúng tôi không chỉ tìm ra điểm nghẽn. Chúng tôi cùng bạn gỡ từng điểm một và đo lại bằng doanh thu.</p>
            </div>
            <div className={styles.quotes}>
              {TESTI.map((t, i) => (
                <figure key={t.n} className={styles.quote}>
                  <blockquote>&ldquo;{t.q}&rdquo;</blockquote>
                  <figcaption><span className={styles.av}><img src={`${B}av-${i + 1}.webp`} alt="" width={160} height={160} loading="lazy" /></span><span><b>{t.n}</b><small>{t.r}</small></span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* SO SÁNH */}
        <section className={styles.sec}>
          <div className={styles.wrap}>
            <div className={styles.cmpBox}>
              <p className={styles.eyebrowS}><b /> So sánh</p>
              <h2 className={`${styles.h2} ${styles.center}`} data-rv>Marketing B2B <em>truyền thống</em> so với marketing B2B hiện đại</h2>
              <p className={`${styles.p} ${styles.center}`} data-rv>Chú ý và niềm tin đang thay đổi. Hãy chọn đối tác chạy trước thị trường một bước.</p>
              <div className={styles.cmp}>
                <div><h3>Marketing B2B truyền thống</h3><ul>{TRAD.map((t) => <li key={t} data-cmp><i aria-hidden="true">✕</i>{t}</li>)}</ul></div>
                <div><h3>Marketing B2B hiện đại</h3><ul>{MOD.map((t) => <li key={t} data-cmp><i className={styles.ok} aria-hidden="true">✓</i>{t}</li>)}</ul></div>
              </div>
            </div>
          </div>
        </section>

        <Extras />

        {/* NÓI CHUYỆN */}
        <section className={styles.talkTrack} data-talk id="lien-he">
          <div className={styles.talkStick}>
            <div className={styles.talkRow}>
              <span data-ta="l">Nói chuyện với</span>
              <div className={styles.talkCard} data-tk><img src={B + "talk.webp"} alt="Chuyên gia tư vấn marketing B2B" width={540} height={720} loading="lazy" /><a className={styles.talkGo} href="mailto:xinchao@phongvi.example" aria-label="Gửi email cho chuyên gia">↗</a></div>
              <em data-ta="r">chuyên gia</em>
            </div>
            <p className={styles.talkSub}>Đặt lịch 30 phút, nhận bản đánh giá bộ máy marketing hiện tại của bạn.</p>
          </div>
        </section>
        <ContactForm />
      </main>

      <Foot Mark={Mark} />
    </div>
  );
}
