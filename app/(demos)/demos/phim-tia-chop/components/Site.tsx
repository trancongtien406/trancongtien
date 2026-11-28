"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { Art } from "./Art";
import { Plasma } from "./Plasma";
import { FAQ, FOOT, JOURNAL, MISSION, NAV, PLANS, PROJECTS, REVIEWS, SERVICES, SERVICES_MORE, SLIDES, STATS, STEPS, TEAM } from "./data";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, string> = {
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  coin: "M12 4a8 4 0 100 8 8 4 0 000-8zM4 8v8c0 2 3.6 4 8 4s8-2 8-4V8",
  bars: "M5 20V11M12 20V5M19 20v-6",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
};
function Icon({ n }: { n: string }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[n]} /></svg>;
}

function EyeMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="21" stroke="#2fc9b8" strokeWidth="3" strokeDasharray="90 12" />
      <circle cx="24" cy="24" r="13" stroke="#2fc9b8" strokeWidth="2.5" />
      <circle cx="26" cy="23" r="6.5" fill="#2fc9b8" /><circle cx="28" cy="21" r="2.2" fill="#04121a" />
    </svg>
  );
}

function Arcs() {
  return (
    <>
      <svg className={`${styles.arc} ${styles.arcTop}`} viewBox="0 0 320 70" preserveAspectRatio="none" aria-hidden="true"><path d="M2 68 C70 66 110 6 160 6 C210 6 250 66 318 68" fill="none" stroke="url(#tc-ag)" strokeWidth="4" /><defs><linearGradient id="tc-ag" x1="0" x2="1"><stop offset="0" stopColor="#3fd8ff" stopOpacity="0" /><stop offset=".5" stopColor="#8aeaff" /><stop offset="1" stopColor="#3fd8ff" stopOpacity="0" /></linearGradient></defs></svg>
      <span className={`${styles.orb} ${styles.orbTop}`} />
      <svg className={`${styles.arc} ${styles.arcBot}`} viewBox="0 0 320 70" preserveAspectRatio="none" aria-hidden="true"><path d="M2 2 C70 4 110 64 160 64 C210 64 250 4 318 2" fill="none" stroke="url(#tc-ag)" strokeWidth="4" /></svg>
      <span className={`${styles.orb} ${styles.orbBot}`} />
    </>
  );
}

function Btn({ children, id, onGo }: { children: React.ReactNode; id: string; onGo: (id: string) => void }) {
  return <a className={styles.btn} href={`#${id}`} onClick={(e) => { e.preventDefault(); onGo(id); }}>{children} <i aria-hidden="true">▸</i></a>;
}

export function Site() {
  const root = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [turn, setTurn] = useState(false);
  const [open, setOpen] = useState(0);
  const [sent, setSent] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [news, setNews] = useState<"" | "ok" | "err">("");
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState("tc-home");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);
    if (!r && root.current) {
      gsap.set(root.current.querySelectorAll("[data-tc-fade],[data-tc-arc]"), { autoAlpha: 0 });
      gsap.set(root.current.querySelector("[data-tc-h1]"), { clipPath: "inset(-10% 100% -10% 0)" });
    }
    // Màn nhắc xoay điện thoại: chỉ khi điện thoại dọc, tự tắt sau vài giây
    if (window.matchMedia("(max-width: 600px) and (orientation: portrait)").matches && !r) {
      setTurn(true);
      const t = window.setTimeout(() => setTurn(false), 3200);
      return () => window.clearTimeout(t);
    }
  }, []);

  const revealText = useCallback(() => {
    const el = root.current?.querySelector<HTMLElement>("[data-tc-h1]");
    if (!el) return;
    gsap.fromTo(el, { clipPath: "inset(-10% 100% -10% 0)" }, { clipPath: "inset(-10% -2% -10% 0)", duration: 1.3, ease: "power2.inOut" });
    gsap.fromTo(root.current!.querySelectorAll("[data-tc-fade]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
    gsap.fromTo(root.current!.querySelectorAll("[data-tc-arc]"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power3.out", stagger: 0.08 });
  }, []);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) setActive(e.target.id); }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-tc-pulse]", { scale: 1.1, opacity: 1, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.utils.toArray<HTMLElement>("[data-tc-in]").forEach((el) => {
        gsap.from(el, { autoAlpha: 0, y: 28, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } });
      });
      // chữ "Keep your / Eyes On" mở rộng khi cuộn
      gsap.fromTo("[data-tc-eyes] span", { letterSpacing: "0.1em", opacity: 0.2 }, { letterSpacing: "0.5em", opacity: 0.55, ease: "none", scrollTrigger: { trigger: "[data-tc-eyes]", start: "top 90%", end: "bottom 40%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const er: Record<string, string> = {};
    if (!String(f.get("ho") || "").trim()) er.ho = "Vui lòng nhập họ.";
    if (!String(f.get("ten") || "").trim()) er.ten = "Vui lòng nhập tên.";
    if (!/^\S+@\S+\.\S+$/.test(String(f.get("email") || ""))) er.email = "Email chưa đúng định dạng.";
    if (!/^(0|\+84)\d{8,10}$/.test(String(f.get("sdt") || "").replace(/[\s.]/g, ""))) er.sdt = "Số điện thoại chưa đúng (vd 0901 234 567).";
    if (String(f.get("loi") || "").trim().length < 10) er.loi = "Hãy mô tả dự án trong ít nhất 10 ký tự.";
    setErrs(er);
    if (!Object.keys(er).length) { setSent(true); e.currentTarget.reset(); }
  };

  const subscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = String(new FormData(e.currentTarget).get("nl") || "");
    if (/^\S+@\S+\.\S+$/.test(v)) { setNews("ok"); e.currentTarget.reset(); } else setNews("err");
  };

  return (
    <div ref={root} className={styles.app}>
      {turn && (
        <div className={styles.turn} role="dialog" aria-label="Vui lòng xoay điện thoại">
          <div className={styles.turnPhone} aria-hidden="true"><span /></div>
          <p>VUI LÒNG XOAY ĐIỆN THOẠI</p>
          <button type="button" onClick={() => setTurn(false)}>Vẫn xem bản dọc</button>
        </div>
      )}

      <header className={styles.nav}>
        <a href="#tc-home" className={styles.logo} onClick={(e) => { e.preventDefault(); go("tc-home"); }}><EyeMark size={26} /> Tia Chớp</a>
        <button type="button" className={styles.burger} aria-expanded={menu} aria-controls="tc-menu" aria-label="Mở menu" onClick={() => setMenu((m) => !m)}><span /><span /></button>
        <nav aria-label="Chính" id="tc-menu" data-open={menu ? "1" : "0"}>
          <ul>
            {NAV.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined} onClick={(e) => { e.preventDefault(); go(n.id); }}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main">
        {/* 1. Hero */}
        <section id="tc-home" className={styles.hero} aria-labelledby="tc-h1">
          <div className={styles.heroGlow} aria-hidden="true" />
          <Plasma skip={reduced} onDone={revealText} />
          <div className={styles.heroStage}>
            <div className={styles.arcs}>
              <div data-tc-arc style={{ position: "absolute", inset: 0 }}><Arcs /></div>
              <h1 id="tc-h1" data-tc-h1 className={styles.h1}>Hoàn hảo trong từng <span>chi tiết</span></h1>
            </div>
            <span className={styles.pill} data-tc-fade><i /> đang nhận dự án</span>
          </div>
        </section>

        {/* 2. Sứ mệnh */}
        <section id="tc-mission" className={styles.sec} aria-labelledby="tc-h-mission">
          <div className={styles.cols}>
            <h2 id="tc-h-mission" className={styles.h2} data-tc-in>Sứ mệnh <span>của chúng tôi</span></h2>
            <div>
              <ul className={styles.mini}>
                {MISSION.map((m) => (
                  <li key={m.t} className={styles.glass} data-tc-in><span className={styles.ico}><Icon n={m.i} /></span><b>{m.t}</b></li>
                ))}
                <li className={styles.miniTxt} data-tc-in>Chúng tôi giúp thương hiệu nổi bật bằng thiết kế 3D và đồ hoạ chuyển động, biến ý tưởng thành trải nghiệm để người xem nhớ lâu. Mỗi dự án bắt đầu bằng một câu hỏi: người xem sẽ nhớ điều gì sau ba giây đầu tiên?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Dịch vụ */}
        <section id="tc-services" className={styles.sec} aria-labelledby="tc-h-services">
          <div className={styles.cols}>
            <div className={styles.head} data-tc-in>
              <span className={styles.eyeBg} data-tc-pulse aria-hidden="true"><EyeMark size={90} /></span>
              <h2 id="tc-h-services" className={styles.h2}>Dịch vụ</h2>
              <p className={styles.lead}>Thông tin chi tiết về đồ hoạ chuyển động và hoạt hình, gồm ví dụ, quy trình và lợi ích cho thương hiệu của bạn.</p>
              <Btn id="tc-services-all" onGo={go}>Xem thêm</Btn>
            </div>
            <div className={styles.cardStack}>
              {SERVICES.map((s) => (
                <article key={s.t} className={`${styles.glass} ${styles.svc}`} data-tc-in><h3>{s.t}</h3><p>{s.d}</p></article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Dự án tiêu biểu */}
        <section id="tc-projects" className={styles.sec} aria-labelledby="tc-h-projects">
          <div className={styles.headRow} data-tc-in>
            <h2 id="tc-h-projects" className={styles.h2}>Dự án &amp; câu chuyện tiêu biểu</h2>
            <Btn id="tc-portfolio" onGo={go}>Xem thêm</Btn>
          </div>
          <div className={styles.projList}>
            {PROJECTS.map((p, i) => (
              <article key={p.t} className={`${styles.glass} ${styles.proj} ${i % 2 ? styles.projRev : ""}`} data-tc-in>
                <div className={styles.projArt}><Art kind={p.k} /></div>
                <div className={styles.projTxt}><small>{p.tag}</small><h3>{p.t}</h3><p>{p.d}</p><Btn id="tc-portfolio" onGo={go}>Xem dự án</Btn></div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. Portfolio */}
        <section id="tc-portfolio" className={styles.sec} aria-labelledby="tc-h-port">
          <div className={styles.headRow} data-tc-in>
            <h2 id="tc-h-port" className={styles.h2}>Portfolio</h2>
            <div className={styles.arrows}>
              <button type="button" aria-label="Dự án trước" onClick={() => setSlide((s) => (s + SLIDES.length - 1) % SLIDES.length)}>←</button>
              <button type="button" aria-label="Dự án sau" onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}>→</button>
            </div>
          </div>
          <ul className={styles.slides} data-tc-in>
            {[0, 1, 2].map((o) => {
              const s = SLIDES[(slide + o) % SLIDES.length];
              return (
                <li key={s.t} className={styles.slide}>
                  <div className={styles.slideArt}><Art kind={s.k} /></div>
                  <div className={styles.slideCap}><small>{s.c}</small><b>{s.t}</b></div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 6. Số liệu */}
        <section className={styles.sec} aria-label="Con số nổi bật">
          <ul className={styles.stats}>
            {STATS.map(([n, l]) => <li key={l} className={styles.glass} data-tc-in><b>{n}</b><span>{l}</span></li>)}
          </ul>
        </section>

        {/* 7. Dịch vụ đầy đủ */}
        <section id="tc-services-all" className={styles.sec} aria-labelledby="tc-h-svcall">
          <div className={styles.cols}>
            <div className={styles.head} data-tc-in>
              <h2 id="tc-h-svcall" className={styles.h2}>Mọi thứ <span>cho một clip hoàn chỉnh</span></h2>
              <p className={styles.lead}>Từ ý tưởng đến tệp xuất cuối, một nhóm duy nhất lo trọn: bạn không phải ghép nhiều đơn vị rời rạc.</p>
            </div>
            <ul className={styles.svcGrid}>
              {SERVICES_MORE.map((s) => (
                <li key={s.t} className={styles.glass} data-tc-in><small>{s.tag}</small><h3>{s.t}</h3><p>{s.d}</p></li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8. Quy trình */}
        <section id="tc-process" className={styles.sec} aria-labelledby="tc-h-process">
          <div className={styles.cols}>
            <div className={styles.head} data-tc-in>
              <h2 id="tc-h-process" className={styles.h2}>Quy trình <span>năm bước</span></h2>
              <p className={styles.lead}>Rõ việc, rõ thời gian, rõ chi phí. Bạn luôn biết dự án đang ở đâu.</p>
            </div>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => (
                <li key={s.t} className={styles.glass} data-tc-in><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{s.t}</h3><p>{s.d}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        {/* 9. Đội ngũ */}
        <section id="tc-team" className={styles.sec} aria-labelledby="tc-h-team">
          <div className={styles.headRow} data-tc-in><h2 id="tc-h-team" className={styles.h2}>Đội ngũ</h2></div>
          <ul className={styles.team}>
            {TEAM.map((m, i) => (
              <li key={m.n} className={styles.glass} data-tc-in>
                <span className={styles.avatar} data-i={i} aria-hidden="true">{m.n.split(" ").slice(-1)[0][0]}</span>
                <h3>{m.n}</h3><em>{m.r}</em><p>{m.b}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 10. Đánh giá */}
        <section className={styles.sec} aria-labelledby="tc-h-rev">
          <div className={styles.headRow} data-tc-in><h2 id="tc-h-rev" className={styles.h2}>Khách hàng nói gì</h2><small className={styles.note}>Lời đánh giá minh hoạ</small></div>
          <ul className={styles.reviews}>
            {REVIEWS.map((r) => (
              <li key={r.n} className={styles.glass} data-tc-in><blockquote>{r.q}</blockquote><b>{r.n}</b><span>{r.r}</span></li>
            ))}
          </ul>
        </section>

        {/* 11. Bảng giá */}
        <section id="tc-pricing" className={styles.sec} aria-labelledby="tc-h-price">
          <div className={styles.headRow} data-tc-in><h2 id="tc-h-price" className={styles.h2}>Bảng giá</h2><small className={styles.note}>Giá minh hoạ, báo giá thật sau buổi brief</small></div>
          <ul className={styles.plans}>
            {PLANS.map((p) => (
              <li key={p.n} className={`${styles.glass} ${"hot" in p && p.hot ? styles.hot : ""}`} data-tc-in>
                <h3>{p.n}</h3>
                <div className={styles.price}><b>{p.p}</b><span>{p.u}</span></div>
                <ul>{p.f.map((x) => <li key={x}>{x}</li>)}</ul>
                <Btn id="tc-contact" onGo={go}>Chọn gói</Btn>
              </li>
            ))}
          </ul>
        </section>

        {/* 11b. Nhật ký */}
        <section id="tc-journal" className={styles.sec} aria-labelledby="tc-h-jr">
          <div className={styles.headRow} data-tc-in><h2 id="tc-h-jr" className={styles.h2}>Nhật ký hậu trường</h2></div>
          <ul className={styles.journal}>
            {JOURNAL.map((j) => (
              <li key={j.t} className={styles.glass} data-tc-in>
                <div className={styles.jArt}><Art kind={j.k} /></div>
                <div className={styles.jTxt}><time>{j.d}</time><h3>{j.t}</h3><p>{j.s}</p></div>
              </li>
            ))}
          </ul>
        </section>

        {/* 12. Keep your eyes on */}
        <section className={styles.eyes} aria-label="Hãy để mắt tới chúng tôi">
          <div data-tc-eyes className={styles.eyesRow}>
            <span>Hãy để mắt</span>
            <i data-tc-pulse aria-hidden="true"><EyeMark size={96} /></i>
            <span>tới chúng tôi...</span>
          </div>
        </section>

        {/* 13. FAQ */}
        <section id="tc-faq" className={styles.sec} aria-labelledby="tc-h-faq">
          <div className={styles.cols}>
            <div className={styles.head} data-tc-in>
              <h2 id="tc-h-faq" className={styles.h2}>Câu hỏi thường gặp</h2>
              <p className={styles.lead}>Giải đáp những câu hỏi chúng tôi nhận nhiều nhất về đồ hoạ chuyển động và dịch vụ hậu kỳ.</p>
              <a className={styles.link} href="#tc-contact" onClick={(e) => { e.preventDefault(); go("tc-contact"); }}>Hỗ trợ</a>
            </div>
            <div className={`${styles.glass} ${styles.faq}`} data-tc-in>
              {FAQ.map((f, i) => (
                <div key={f.q} className={styles.faqItem} data-open={open === i ? "1" : "0"}>
                  <h3><button type="button" aria-expanded={open === i} aria-controls={`tc-a${i}`} id={`tc-q${i}`} onClick={() => setOpen(open === i ? -1 : i)}><span>{i + 1}) {f.q}</span><i aria-hidden="true">{open === i ? "−" : "+"}</i></button></h3>
                  <div id={`tc-a${i}`} role="region" aria-labelledby={`tc-q${i}`} hidden={open !== i}><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 14. Liên hệ */}
        <section id="tc-contact" className={styles.sec} aria-labelledby="tc-h-contact">
          <div className={styles.headRow} data-tc-in><h2 id="tc-h-contact" className={styles.h2}>Liên hệ</h2></div>
          <div className={styles.contactGrid}>
            <form className={`${styles.glass} ${styles.form}`} noValidate onSubmit={submit} data-tc-in>
              {sent ? (
                <div className={styles.ok} role="status"><b>Đã gửi.</b> Cảm ơn bạn, Tia Chớp sẽ phản hồi trong vòng một ngày làm việc. <button type="button" onClick={() => setSent(false)}>Gửi thêm</button></div>
              ) : (
                <>
                  {([["ho", "Họ", "text", "family-name"], ["ten", "Tên", "text", "given-name"]] as const).map(([n, l, t, ac]) => (
                    <label key={n} className={styles.f}><span>{l}</span><input name={n} type={t} autoComplete={ac} aria-invalid={!!errs[n]} />{errs[n] && <em role="alert">{errs[n]}</em>}</label>
                  ))}
                  <label className={`${styles.f} ${styles.wide}`}><span>Địa chỉ email</span><input name="email" type="email" autoComplete="email" aria-invalid={!!errs.email} />{errs.email && <em role="alert">{errs.email}</em>}</label>
                  <label className={styles.f}><span>Số điện thoại</span><input name="sdt" type="tel" autoComplete="tel" aria-invalid={!!errs.sdt} />{errs.sdt && <em role="alert">{errs.sdt}</em>}</label>
                  <label className={styles.f}><span>Lời nhắn</span><input name="loi" type="text" aria-invalid={!!errs.loi} />{errs.loi && <em role="alert">{errs.loi}</em>}</label>
                  <div className={`${styles.wide} ${styles.send}`}><button type="submit" className={styles.btn}>Gửi biểu mẫu <i aria-hidden="true">▸</i></button></div>
                </>
              )}
            </form>
            <aside className={styles.info} data-tc-in>
              <h3>Trực tiếp</h3>
              <p>Xưởng Tia Chớp, 24 Nguyễn Văn Linh, Hải Châu, Đà Nẵng</p>
              <p>0236 000 0000<br />xin-chao@tiachop.example</p>
              <p>Thứ Hai đến thứ Sáu, 9:00 đến 18:00</p>
              <form className={styles.news} noValidate onSubmit={subscribe}>
                <label htmlFor="tc-nl">Nhận bản tin hậu trường mỗi tháng</label>
                <div><input id="tc-nl" name="nl" type="email" placeholder="email@ban.vn" autoComplete="email" /><button type="submit">Đăng ký</button></div>
                <p role="status">{news === "ok" ? "Đã đăng ký, cảm ơn bạn." : news === "err" ? "Email chưa đúng định dạng." : ""}</p>
              </form>
            </aside>
          </div>
        </section>
      </main>

      <footer className={styles.foot}>
        <div className={styles.footIn}>
          <div className={styles.footBrand}><EyeMark size={64} /><div><b>Hoàn hảo trong từng chi tiết</b><p>Thông tin chi tiết về dịch vụ đồ hoạ chuyển động, hoạt hình và hậu kỳ của Tia Chớp Film.</p></div></div>
          <div><h3>Trang</h3><ul>{FOOT.links.map(([l, id]) => <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{l}</a></li>)}</ul></div>
          <div><h3>Mạng xã hội</h3><ul><li><a href="#tc-contact" onClick={(e) => { e.preventDefault(); go("tc-contact"); }}>Telegram</a></li><li><a href="#tc-contact" onClick={(e) => { e.preventDefault(); go("tc-contact"); }}>Instagram</a></li><li><a href="#tc-contact" onClick={(e) => { e.preventDefault(); go("tc-contact"); }}>LinkedIn</a></li></ul></div>
        </div>
        <p className={styles.legal}>© 2026 Tia Chớp Film. Thương hiệu, ảnh và số liệu trên trang chỉ để minh hoạ.</p>
      </footer>
    </div>
  );
}
