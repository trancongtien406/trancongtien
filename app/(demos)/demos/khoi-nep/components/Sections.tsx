import Link from "next/link";
import { Photo } from "./Photo";
import { siteConfig } from "@/lib/site";
import { FOOTER_GROUPS, PRINCIPLES, PROCESS, STORY } from "../data/content";
import s from "../brand.module.css";

const ID = "/images/demos/khoi-nep/identity";

/** Chữ có dấu chồng (circumflex + sắc) rộng hơn thân chữ trong Plex: chừa thêm khoảng bên phải để dấu không đè chữ kế bên. */
const STACKED = /[ẤẾỐẦỀỒẨỂỔẪỄỖẬỆỘ]/;

function Letters({ text, mark = "mast" }: { text: string; mark?: "mast" | "foot" }) {
  return (
    <>
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i} className={s.sp} />
        ) : (
          <span key={i} className={`${s.ch} ${STACKED.test(ch) ? (mark === "mast" ? s.stackM : s.stackF) : ""}`}>
            <span className={s.chIn} data-chin>{ch}</span>
          </span>
        ),
      )}
    </>
  );
}

export function Hero({ consultHref }: { consultHref: string }) {
  return (
    <section id="hero" className={s.hero} aria-labelledby="hero-title">
      <div className={s.wrap}>
        <div className={s.issueBar}>
          <span>Số 08 · Mùa 2026</span>
          <span className={s.issueMid}>Studio thiết kế không gian &amp; nội thất</span>
          <span>Thiết kế &amp; thi công nội thất</span>
        </div>
        <div className={s.cover}>
          <div className={s.coverImg} data-hero-img>
            <Photo
              name="hero-room"
              w={2000}
              priority
              sizes="(min-width: 1700px) 1600px, 100vw"
              position="50% 58%"
              alt="Phòng khách sáng với rèm voan cao, ghế bọc vải sọc màu be và cây xanh nhỏ"
            />
          </div>
          <p className={s.mast} aria-hidden="true" data-mast>
            <Letters text="KHỐI NẾP" />
          </p>
          <div className={s.coverFoot}>
            <h1 id="hero-title" className={s.h1} data-hero-line>
              Không gian có <span className={s.nowrap}>nếp sống.</span>
            </h1>
            <div className={s.coverSide} data-hero-line>
              <p>
                Từ căn hộ nhỏ đến những ngôi nhà nhiều thế hệ, chúng tôi hình dung không gian bằng công năng,
                vật liệu và những thói quen sống rất riêng.
              </p>
              <div className={s.ctaRow}>
                <a className={s.btnLight} href={consultHref} data-cta="primary">
                  Bắt đầu dự án <span aria-hidden="true">↗</span>
                </a>
                <a className={s.btnGhostLight} href="#budget">
                  Thử dự toán chi phí
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={s.coverCap}>
          <span data-rule-host>
            <i className={s.rule} data-hero-rule />
            01 / Không gian sống
          </span>
          <span>Ánh sáng · Vật liệu · Tỷ lệ</span>
          <span className={s.capNote}>
            Ảnh stock tham khảo định hướng thiết kế, không phải công trình do Khối Nếp thực hiện.
          </span>
        </div>
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section id="studio" className={`${s.section} ${s.manifesto}`} aria-labelledby="studio-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.manGrid}>
          <aside className={s.manAside}>
            <p className={s.label}>01 / Triết lý thiết kế</p>
            <figure className={s.matFig} data-veil>
              <Photo name="mat-wood" w={600} sizes="(min-width: 1024px) 22vw, 60vw" alt="Vân gỗ sồi có mắt gỗ, nhìn cận cảnh" />
            </figure>
            <p className={s.figcap}>Fig. 01 — Gỗ sồi, vân và mắt gỗ</p>
          </aside>
          <div className={s.manMain}>
            <h2 id="studio-title" className={s.h2}>
              Thiết kế từ cách sống, không từ một khuôn mẫu.
            </h2>
            <p className={s.story}>{STORY}</p>
            <blockquote className={s.pull}>
              <p>Mỗi mét vuông đều nên có lý do để tồn tại.</p>
            </blockquote>
            <ol className={s.principles}>
              {PRINCIPLES.map((p) => (
                <li key={p.n}>
                  <span className={s.idx}>{p.n}</span>
                  <h3 className={s.h3}>{p.t}</h3>
                  <p>{p.d}</p>
                </li>
              ))}
            </ol>
            <a className={s.textLink} href="#process">
              Tìm hiểu cách tiếp cận <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className={`${s.section} ${s.process}`} aria-labelledby="process-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.secHead}>
          <p className={s.label}>07 / Quy trình thiết kế</p>
          <h2 id="process-title" className={s.h2}>
            Mỗi quyết định đều có trình tự.
          </h2>
          <p className={s.secLead}>
            Một quy trình rõ ràng giúp kết nối mong muốn, điều kiện công trình và ngân sách thành những quyết định
            thiết kế nhất quán.
          </p>
        </div>
        <figure className={s.processFig} data-veil>
          <Photo name="dining" sizes="100vw" position="50% 62%" alt="Bàn ăn tròn bằng gỗ với bình cây nhỏ, ghế trắng và nắng chiều chiếu xiên" />
        </figure>
        <ol className={s.steps}>
          {PROCESS.map((p) => (
            <li key={p.n}>
              <span className={s.bigNum}>{p.n}</span>
              <div>
                <h3 className={s.h3}>{p.t}</h3>
                <p>{p.d}</p>
                <p className={s.time}>
                  {p.time} <span>· thời gian dự kiến</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Closing({ consultHref }: { consultHref: string }) {
  return (
    <section id="start" className={s.closing} aria-labelledby="start-title">
      <div className={s.wrap}>
        <div className={s.closeGrid}>
          <div>
            <p className={`${s.label} ${s.labelLight}`}>09 / Bắt đầu từ một ý tưởng</p>
            <h2 id="start-title" className={`${s.h2} ${s.h2Light}`}>
              Bắt đầu từ không gian của bạn.
            </h2>
            <p className={s.closeLead}>
              Một bảng vật liệu, một khoảng ngân sách hay đơn giản là một ý tưởng về cách bạn muốn sống. Mọi không gian
              đều bắt đầu từ những điều như thế.
            </p>
          </div>
          <div className={s.closeCtas}>
            <a className={s.btnLight} href={consultHref}>
              Bắt đầu dự án <span aria-hidden="true">↗</span>
            </a>
            <a className={s.btnGhostLight} href="#budget">
              Lập dự toán ngân sách
            </a>
            <a className={s.btnGhostLight} href="#board">
              Tạo bảng vật liệu
            </a>
            <p className={s.micro}>
              Công cụ miễn phí · Không cần đăng nhập · Không gửi dữ liệu lên máy chủ. Nút “Bắt đầu dự án” mở form tư
              vấn.
            </p>
          </div>
        </div>
        <i className={`${s.rule} ${s.ruleLight}`} data-rule />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.footGrid}>
          <div className={s.footBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ID}/logo-reversed.svg`} width={240} height={58} alt="Khối Nếp — Interior & Spatial Design" />
            <p>Khối Nếp là studio thiết kế không gian và nội thất, làm việc từ ý tưởng đến hoàn thiện. Đơn giá và thời gian trên trang chỉ mang tính tham khảo.</p>
          </div>
          {FOOTER_GROUPS.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className={s.footTitle}>{g.title}</h2>
              <ul>
                {g.links.map(([h, l]) => (
                  <li key={h}>
                    <a href={h}>{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Thông tin">
            <h2 className={s.footTitle}>Thông tin</h2>
            <ul>
              <li>
                <a href="/demos/khoi-nep/credits">Ảnh &amp; ghi công</a>
              </li>
              <li>
                <Link href="/solutions">Quay lại portfolio</Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className={s.footWord} aria-hidden="true">
          <Letters text="KHỐI NẾP" mark="foot" />
        </p>
        <div className={s.footBase}>
          <span translate="no">KHỐI NẾP © 2026</span>
          <span>Website do {siteConfig.fullName} thiết kế</span>
        </div>
      </div>
    </footer>
  );
}
