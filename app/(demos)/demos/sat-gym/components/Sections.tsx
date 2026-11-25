import { ClipReveal, Counter, GrainOverlay, ParallaxLayer, ScrollScrubText, StackingCards, VelocityMarquee } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import { FAQ, GALLERY, PLANS, PROGRAMS } from "../data/content";
import { OutlineText } from "./OutlineText";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const CONSULT = buildConsultHref("sat-gym");
const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export function Band() {
  const word = (t: string, i: number) => (
    <span key={i} className={i % 2 ? styles.bandSolid : styles.bandOutline}>{t}<b aria-hidden="true">/</b></span>
  );
  const words = ["Rèn thân", "Lì tâm", "Từng rep", "Giữ kỹ thuật", "Tạ xuống sàn"];
  return (
    <div className={styles.band} role="region" aria-label="Khẩu hiệu chạy ngang">
      <VelocityMarquee mode="velocity" speed={60} boost={1.2} reverseOnScrollUp gap="1.6rem" controls trackClassName={styles.bandTrack} buttonClassName={styles.marqueeBtn} pauseLabel="Dừng chạy chữ" playLabel="Chạy chữ">
        {words.map(word)}
      </VelocityMarquee>
    </div>
  );
}

export function Manifesto() {
  return (
    <section className={styles.manifesto} aria-labelledby="gioi-thieu-title">
      <div className={`${styles.wrap} ${styles.manifestoGrid}`}>
        <div className={styles.manifestoText}>
          <p className={styles.label} data-sg="stencil"><span>01</span> Không gian của chuyển động</p>
          <h2 id="gioi-thieu-title" className={styles.h2}>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>Bê tông ở ngoài.</OutlineText>
            <span className={styles.h2Solid}>Kỷ luật ở bên trong.</span>
          </h2>
          <ScrollScrubText as="p" className={styles.statement} dim={0.18}>
            SẬT là một căn phòng bê tông với vài thanh thép, một dãy dây thừng và tiếng tạ chạm sàn. Không cần biết hết mọi thứ trước khi bước vào. Chọn mức phù hợp, học kỹ thuật, rồi làm từng rep cho tử tế.
          </ScrollScrubText>
          <p className={styles.small}>Không có đường tắt được hứa hẹn và cũng không có chuẩn ngoại hình để theo. Chỉ có chuyển động, hướng dẫn rõ ràng và sự bền bỉ.</p>
          <div className={styles.stencilRow}>
            <span data-sg="stencil">Di chuyển</span><span data-sg="stencil">Nâng</span><span data-sg="stencil">Lặp lại</span>
          </div>
        </div>
        <ClipReveal className={styles.manifestoPhoto} from="bottom" innerScale={1.12}>
          <div className={styles.photoBox}>
            <Photo file="thanh-xep" alt="Những thanh tạ dựng cạnh nhau bên cột thép và bức tường bê tông" sizes="(max-width: 900px) 92vw, 46vw" w={1200} pos="50% 50%" className={styles.gray} />
            <span className={styles.photoTag}>Thanh thép · cột bê tông</span>
          </div>
        </ClipReveal>
      </div>
    </section>
  );
}

export function Programs() {
  const tones = [styles.pcDark, styles.pcChalk, styles.pcAcid, styles.pcMid];
  return (
    <section className={styles.programs} id="chuong-trinh" aria-labelledby="ct-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>02</span> Chương trình</p>
          <h2 id="ct-title" className={styles.h2Big}>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>Bốn cách</OutlineText>
            <span className={styles.h2Solid}>để bắt đầu.</span>
          </h2>
        </header>
        <StackingCards className={styles.stack} top="84px" offset={14} scaleStep={0.035}>
          {PROGRAMS.map((p, i) => (
            <article key={p.n} className={`${styles.pcard} ${tones[i]}`} aria-labelledby={`pc-${p.n}`}>
              <div className={styles.pcMain}>
                <div className={styles.pcTop}>
                  <OutlineText as="span" mode="hover" className={styles.pcNum} aria-hidden="true">{p.n}</OutlineText>
                  <span className={styles.pcTag}>{p.tag}</span>
                </div>
                <h3 id={`pc-${p.n}`} className={styles.pcTitle}>{p.title}</h3>
                <p className={styles.pcText}>{p.text}</p>
                <ul className={styles.pcSpecs}>{p.specs.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div className={styles.pcPhoto}>
                <Photo file={p.img} alt={p.alt} sizes="(max-width: 900px) 92vw, 40vw" w={1200} className={styles.gray} />
              </div>
            </article>
          ))}
        </StackingCards>
      </div>
    </section>
  );
}

export function Space() {
  return (
    <section className={styles.space} aria-labelledby="kg-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>05</span> Không gian tập</p>
          <h2 id="kg-title" className={styles.h2Big}>
            <span className={styles.h2Solid}>Sàn thật.</span>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>Dụng cụ thật.</OutlineText>
          </h2>
          <p className={styles.lede}>Từ thanh đòn, đĩa tạ đến dây thừng và xà: mọi thứ được đặt để bạn tập trung vào bài của mình.</p>
        </header>
        <ul className={styles.gallery}>
          {GALLERY.map((g, i) => (
            <li key={g.n} className={`${styles.gItem} ${styles[`g${i + 1}` as keyof typeof styles]}`} style={{ aspectRatio: g.ratio }}>
              <ClipReveal className={styles.gClip} from={i % 2 ? "right" : "left"} duration={1}>
                <figure className={styles.gFig} data-cursor="Xem">
                  <ParallaxLayer distance={22} minWidth={900} className={styles.gPar}>
                    <Photo file={g.img} alt={g.alt} sizes="(max-width: 700px) 92vw, 33vw" w={1200} pos={"crop" in g && g.crop ? "50% 0%" : undefined} className={`${styles.gray} ${"crop" in g && g.crop ? styles.cropTop : ""}`} />
                  </ParallaxLayer>
                  <figcaption><b>{g.n}</b> {g.label}</figcaption>
                </figure>
              </ClipReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Beat() {
  return (
    <section className={styles.beat} aria-labelledby="beat-title">
      <GrainOverlay opacity={0.12} blendMode="multiply" />
      <div className={styles.wrap}>
        <p className={styles.label} data-sg="stencil"><span>07</span> Nhịp tập</p>
        <h2 id="beat-title" className={styles.beatTitle}>Một rep. Một nhịp. Một lần tập trung.</h2>
        <dl className={styles.beatGrid}>
          <div><dd><OutlineText as="span" mode="view" className={styles.beatNum}><Counter value={20} duration={1.3} suffix="s" /></OutlineText></dd><dt>Làm trong mỗi hiệp tabata</dt></div>
          <div><dd><OutlineText as="span" mode="view" className={styles.beatNum}><Counter value={10} duration={1.1} suffix="s" /></OutlineText></dd><dt>Nghỉ giữa hai hiệp</dt></div>
          <div><dd><OutlineText as="span" mode="view" className={styles.beatNum}><Counter value={8} duration={1} /></OutlineText></dd><dt>Hiệp trong một block 4 phút</dt></div>
          <div><dd><OutlineText as="span" mode="view" className={styles.beatNum}><Counter value={60} duration={1.4} suffix="s" /></OutlineText></dd><dt>Một phút EMOM: làm xong thì nghỉ đến hết phút</dt></div>
        </dl>
        <p className={styles.beatNote}>Đây là thông số của cấu trúc bài tập để bạn hình dung nhịp, không phải thành tích của ai.</p>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className={styles.pricing} id="goi-tap" aria-labelledby="gia-title">
      <div className={styles.wrap}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>09</span> Gói tập</p>
          <h2 id="gia-title" className={styles.h2Big}>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>Chọn cách</OutlineText>
            <span className={styles.h2Solid}>bạn muốn tập.</span>
          </h2>
          <p className={styles.lede}>Giá tham khảo, trình bày một mức, không gạch giá. Điều kiện chi tiết từng gói được xác nhận khi bạn trao đổi với SẬT.</p>
        </header>
        <ul className={styles.plans}>
          {PLANS.map((p, i) => (
            <li key={p.id} className={`${styles.plan} ${"hot" in p && p.hot ? styles.planHot : ""}`}>
              <p className={styles.planIdx}>{String(i + 1).padStart(2, "0")} / {p.per}</p>
              <h3 className={styles.planName}>{p.name}</h3>
              <p className={styles.planPrice}><span className={styles.planNum}>{vnd(p.price).replace(/\s?₫/, "")}</span><span className={styles.planCur}>₫</span></p>
              <p className={styles.planNote}>{p.note}</p>
              <ul className={styles.planFeats}>{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
              <a className={`${styles.btn} ${"hot" in p && p.hot ? styles.btnInk : styles.btnAcid} ${styles.btnBlock}`} href={CONSULT} data-shake>Hỏi gói này</a>
            </li>
          ))}
        </ul>
        <p className={styles.small}>Giá tham khảo, có thể thay đổi. Gói tính theo VNĐ, đã gồm sử dụng dụng cụ trong lớp.</p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className={styles.faq} id="hoi-dap" aria-labelledby="faq-title">
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <header className={styles.secHead}>
          <p className={styles.label} data-sg="stencil"><span>10</span> Hỏi đáp</p>
          <h2 id="faq-title" className={styles.h2Big}>
            <span className={styles.h2Solid}>Hỏi trước</span>
            <OutlineText as="span" mode="scroll" className={styles.h2Out}>khi tập.</OutlineText>
          </h2>
        </header>
        <div className={styles.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.qa}>
              <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className={styles.final} aria-labelledby="cta-title">
      <div className={styles.finalMedia} aria-hidden="true">
        <Photo file="suong-ta" alt="" sizes="100vw" pos="50% 60%" className={styles.gray} />
        <div className={styles.finalShade} />
        <GrainOverlay opacity={0.14} blendMode="overlay" />
      </div>
      <div className={`${styles.wrap} ${styles.finalInner}`}>
        <p className={styles.label} data-sg="stencil"><span>11</span> Vào sàn</p>
        <h2 id="cta-title" className={styles.finalTitle}>
          <OutlineText as="span" mode="scroll" start="top 92%" end="top 45%" className={styles.finalOut}>Tạ xuống sàn.</OutlineText>
          <span className={styles.finalSolid}>Bắt đầu từ đây.</span>
        </h2>
        <p className={styles.lede}>Kể cho SẬT nghe bạn đã tập gì, muốn tập gì và có gì cần lưu ý. Huấn luyện viên sẽ gợi ý lớp phù hợp và trao đổi về lịch.</p>
        <div className={styles.finalCtas}>
          <a className={`${styles.btn} ${styles.btnAcid} ${styles.btnXl}`} href={CONSULT} data-shake data-cursor="Gửi">Nhận tư vấn buổi tập đầu</a>
          <a className={`${styles.btn} ${styles.btnGhost} ${styles.btnXl}`} href="#chon-bai">Chọn bài tập trước</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.footGrid}>
          <div className={styles.footBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/sat-gym/identity/logo-primary-reversed.svg" alt="SẬT Gym" width={200} height={195} />
            <p>Phòng tập sức mạnh và thể lực bằng bê tông, thép và dây thừng ở Đà Nẵng.</p>
          </div>
          <nav aria-label="Liên kết chân trang">
            <h2>Trong trang</h2>
            <ul>
              <li><a href="#chuong-trinh">Chương trình</a></li>
              <li><a href="#chon-bai">Chọn bài tập</a></li>
              <li><a href="#lich-lop">Lịch lớp tuần</a></li>
              <li><a href="#goi-tap">Gói tập</a></li>
              <li><a href="#hoi-dap">Hỏi đáp</a></li>
            </ul>
          </nav>
          <div>
            <h2>Liên hệ</h2>
            <ul>
              <li><a href="mailto:xinchao@sat-gym.example">xinchao@sat-gym.example</a></li>
              <li><span translate="no">0236 000 0000</span></li>
              <li><span>Đà Nẵng</span></li>
              <li><a href={CONSULT}>Nhận tư vấn</a></li>
            </ul>
          </div>
        </div>
        <p className={styles.footSafe}>Tập luyện có rủi ro chấn thương. Hãy khởi động, chọn mức tải kiểm soát được và hỏi bác sĩ nếu bạn có bệnh nền hoặc chấn thương. Nội dung trên trang chỉ để tham khảo, không thay thế hướng dẫn trực tiếp.</p>
        <div className={styles.footBase}>
          <span translate="no">© SẬT Gym</span>
          <a href="/demos/sat-gym/credits">Ảnh &amp; ghi công</a>
          <span>Website do {siteConfig.fullName} thiết kế</span>
        </div>
      </div>
      <p className={styles.footWord} aria-hidden="true">SẬT</p>
    </footer>
  );
}
