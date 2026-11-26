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
          <span>Thiết kế &amp; thi công nội thất</span>
          <span className={s.issueMid}>Căn hộ · Nhà phố · Văn phòng · Cửa hàng</span>
          <span>Quận Hải Châu, Đà Nẵng</span>
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
              Nội thất trọn gói, từ khảo sát đến bàn giao.
            </h1>
            <div className={s.coverSide} data-hero-line>
              <p>
                Công ty thiết kế và thi công nội thất cho căn hộ, nhà phố, văn phòng và cửa hàng tại Đà Nẵng. Một đội làm từ bản vẽ đến đồ gỗ hoàn thiện.
              </p>
              <ul className={s.heroFacts} aria-label="Thông tin nhanh">
                <li><b>Từ 250.000 ₫/m²</b><span>phí thiết kế, giá tham khảo</span></li>
                <li><b>Từ 2.000.000 ₫/m²</b><span>thi công hoàn thiện</span></li>
                <li><b>Khảo sát tại công trình</b><span>miễn phí trong nội thành</span></li>
              </ul>
              <div className={s.ctaRow}>
                <a className={s.btnLight} href={consultHref} data-cta="primary">
                  Đặt lịch khảo sát <span aria-hidden="true">↗</span>
                </a>
                <a className={s.btnGhostLight} href="#budget">
                  Ước tính chi phí
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={s.coverCap}>
          <span data-rule-host>
            <i className={s.rule} data-hero-rule />
            Đà Nẵng · nhận công trình nội thành
          </span>
          <span>Ánh sáng · Vật liệu · Tỷ lệ</span>
          <span className={s.capNote}>
            Ảnh tham khảo phong cách; ghi công tại trang Ảnh &amp; ghi công.
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
            <p className={s.label}>01 / Cách chúng tôi làm</p>
            <figure className={s.matFig} data-veil>
              <Photo name="mat-wood" w={600} sizes="(min-width: 1024px) 22vw, 60vw" alt="Vân gỗ sồi có mắt gỗ, nhìn cận cảnh" />
            </figure>
            <p className={s.figcap}>Fig. 01 — Gỗ sồi, vân và mắt gỗ</p>
          </aside>
          <div className={s.manMain}>
            <h2 id="studio-title" className={s.h2}>
              Một đội, từ bản vẽ đầu tiên đến chìa khóa trao tay.
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
              Xem quy trình 5 bước <span aria-hidden="true">↓</span>
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
          <p className={s.label}>04 / Quy trình làm việc</p>
          <h2 id="process-title" className={s.h2}>
            Năm bước, mỗi bước có đầu ra rõ ràng.
          </h2>
          <p className={s.secLead}>
            Từ lúc hẹn khảo sát đến ngày nhận bàn giao, bạn biết mình sẽ nhận gì ở mỗi bước và mất bao lâu. Thời gian là ước tính cho căn hộ 60–100 m².
          </p>
        </div>
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
                <p className={s.stepOut}><span>Bạn nhận:</span> {p.out}</p>
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
            <p className={`${s.label} ${s.labelLight}`}>11 / Đặt lịch khảo sát</p>
            <h2 id="start-title" className={`${s.h2} ${s.h2Light}`}>
              Hẹn một buổi khảo sát tại công trình.
            </h2>
            <p className={s.closeLead}>
              Gửi diện tích, loại công trình và khu vực; studio gọi lại để hẹn ngày giờ. Buổi khảo sát kéo dài khoảng 1–2 giờ, bạn nhận biên bản đo và gợi ý hướng bố trí. Hạn xử lý yêu cầu: trong giờ hành chính, thứ Hai đến thứ Bảy.
            </p>
          </div>
          <div className={s.closeCtas}>
            <a className={s.btnLight} href={consultHref}>
              Đặt lịch khảo sát <span aria-hidden="true">↗</span>
            </a>
            <a className={s.btnGhostLight} href="#budget">
              Ước tính chi phí
            </a>
            <a className={s.btnGhostLight} href="#board">
              Tạo bảng vật liệu
            </a>
            <p className={s.micro}>
              Công cụ trên trang không cần đăng nhập và không gửi dữ liệu lên máy chủ. Nút “Đặt lịch khảo sát” mở form tư vấn.
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
            <p>Khối Nếp: thiết kế và thi công nội thất tại Đà Nẵng. Quận Hải Châu. Giờ làm việc 08:00 – 17:30, thứ Hai đến thứ Bảy. Đơn giá và thời gian trên trang mang tính tham khảo.</p>
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
