import Image from "next/image";
import { ClipReveal, ScrollScrubText } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { AREA, CARE, CUSTOM, FAQ, HOURS, PATHS } from "../data/data";
import { Engrave } from "./Engrave";
import { Fingerprint } from "./Fingerprint";

const CONSULT = buildConsultHref("gom-lo");

export function Paths() {
  return (
    <section className={s.paths} aria-label="Bạn muốn làm gì ở xưởng">
      <ul className={`${s.wrap} ${s.pathGrid}`}>
        {PATHS.map((p) => (
          <li key={p.k} data-gl="fade">
            <a className={s.path} href={p.href}>
              <span className={s.hand}>{p.k}</span>
              <b>{p.t}</b>
              <span className={s.pathPrice}>{p.s} <i aria-hidden="true">→</i></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Story() {
  return (
    <section id="cau-chuyen" className={s.story} aria-labelledby="story-title">
      <div className={`${s.wrap} ${s.storyGrid}`}>
        <figure className={s.storyPic}>
          <ClipReveal variant="circle" origin="50% 60%" duration={1.3} innerScale={1.2} className={s.storyClip}>
            <Image src="/images/demos/gom-lo/ban-xoay-mo-1200.webp" alt="Bàn xoay quay nhanh, tay đang vuốt lòng chiếc bát đất" width={1200} height={2131} sizes="(max-width: 900px) 80vw, 460px" />
          </ClipReveal>
          <figcaption className={s.hand}>Một buổi sáng ở bàn xoay.</figcaption>
        </figure>
        <div className={s.storyText}>
          <p className={s.hand}>Về xưởng</p>
          <Engrave as="h2" id="story-title" className={s.h2}>Gốm làm tay, mỗi món một dấu tay.</Engrave>
          <ScrollScrubText className={s.manifesto} dim={0.22}>
            Mỗi vết ngón tay, mỗi đường xoay lệch đi một chút là chữ ký của người nặn. Đất Mơ là xưởng nhỏ làm gốm bằng tay ở Đà Nẵng: chúng tôi nặn, nung và bán cốc, bát, bình tại xưởng, rồi mời bạn ngồi xuống làm cùng. Không ai ra khỏi buổi làm gốm với hai món giống nhau.
          </ScrollScrubText>
          <p className={s.storySmall}>Xưởng nhận khách lẻ, cặp đôi, nhóm bạn và nhóm công ty nhỏ. Lớp nhỏ để người hướng dẫn kịp tới từng bàn.</p>
        </div>
      </div>
    </section>
  );
}

export function Custom() {
  return (
    <section id="dat-theo-yeu-cau" className={s.custom} aria-labelledby="custom-title">
      <div className={s.wrap}>
        <p className={s.hand}>Đặt theo yêu cầu</p>
        <Engrave as="h2" id="custom-title" className={s.h2}>Quà tặng, gốm làm riêng và đơn cho doanh nghiệp.</Engrave>
        <ul className={s.customGrid}>
          {CUSTOM.map((c) => (
            <li key={c.k} className={s.customCard} data-gl="fade">
              <span className={s.hand}>{c.k}</span>
              <h3 className={s.h3}>{c.t}</h3>
              <p>{c.text}</p>
              <p className={s.customPrice}>{c.s}</p>
            </li>
          ))}
        </ul>
        <p className={s.fine}>Mô tả ý tưởng ở bước tư vấn, hoặc phác một chiếc bình ở mục bên dưới rồi gửi cho xưởng. Giá và thời gian làm được xác nhận trước khi bạn đặt cọc.</p>
      </div>
    </section>
  );
}

export function Care() {
  return (
    <section id="cham-soc" className={s.care} aria-labelledby="care-title">
      <div className={s.wrap}>
        <p className={`${s.hand} ${s.handDark}`}>Chăm sóc và sử dụng</p>
        <Engrave as="h2" id="care-title" className={`${s.h2} ${s.h2Dark}`}>Dùng gốm làm tay sao cho bền.</Engrave>
        <ul className={s.careGrid}>
          {CARE.map((c, i) => (
            <li key={c.t} className={s.careItem} data-gl="fade">
              <span className={s.careNo}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.t}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Space() {
  return (
    <section id="gio-mo-cua" className={s.space} aria-labelledby="space-title">
      <div className={s.spacePhoto}>
        <Image src="/images/demos/gom-lo/xuong-ke-lo-2000.webp" alt="Góc xưởng gốm với kệ gỗ, chum vại đất nung" fill sizes="100vw" style={{ objectFit: "cover" }} />
        <div className={s.spaceShade} aria-hidden="true" />
      </div>
      <div className={`${s.wrap} ${s.spaceBody}`}>
        <div>
          <p className={s.hand}>Xưởng và giờ mở cửa</p>
          <Engrave as="h2" id="space-title" className={s.h2}>Bốn góc, một mùi đất.</Engrave>
          <dl className={s.hoursList}>
            {HOURS.map((h) => (<div key={h.d}><dt>{h.d}</dt><dd>{h.t}</dd></div>))}
          </dl>
        </div>
        <ul className={s.corners}>
          <li><b>Góc bàn xoay</b><span>Những chiếc bàn xoay để nặn, ngồi sát nhau vừa đủ trò chuyện.</span></li>
          <li><b>Góc vẽ men</b><span>Bảng màu men xếp trên kệ, thử trước khi phủ lên món của bạn.</span></li>
          <li><b>Lò nung</b><span>Phôi xếp vào lò theo mẻ, nên ngày lấy món tuỳ lò.</span></li>
          <li><b>Kệ sản phẩm</b><span>Gốm làm tại xưởng, bạn có thể cầm lên xem trước khi mua.</span></li>
        </ul>
        <p className={s.spaceAddr}>Xưởng ở {AREA}. Địa chỉ cụ thể và hướng dẫn đường đi được gửi khi xác nhận lịch.</p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="hoi-dap" className={s.faq} aria-labelledby="faq-title">
      <div className={`${s.wrap} ${s.faqGrid}`}>
        <div>
          <p className={s.hand}>Hỏi đáp</p>
          <Engrave as="h2" id="faq-title" className={s.h2}>Câu hỏi hay gặp.</Engrave>
          <Fingerprint className={s.faqPrint} strokeWidth={0.9} />
        </div>
        <div className={s.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} className={s.faqItem}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className={s.closing} aria-labelledby="closing-title">
      <Fingerprint className={s.closePrint} strokeWidth={0.6} />
      <div className={`${s.wrap} ${s.closeGrid}`}>
       <div>
        <p className={s.hand}>Ghé Đất Mơ</p>
        <Engrave as="h2" id="closing-title" className={s.closeTitle}>Hẹn bạn ở bàn xoay.</Engrave>
        <div className={s.ctaRow}>
          <a className={s.btn} href={CONSULT} data-cursor="Hỏi">Gửi yêu cầu đặt chỗ cho xưởng</a>
          <a className={s.linkHand} href="#buoi-lam-gom">Xem lịch lớp <span aria-hidden="true">↑</span></a>
        </div>
       </div>
       <figure className={s.closePhoto}>
         <Image src="/images/demos/gom-lo/men-mau-ban-xoay-1200.webp" alt="Các hũ men nhiều màu cạnh bàn xoay vẽ men" width={1200} height={1600} sizes="(max-width: 900px) 60vw, 300px" />
       </figure>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.footGrid}`}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/gom-lo/identity/logo-reversed.svg" alt="Đất Mơ" width={170} height={45} />
          <p className={s.footLine}>Xưởng gốm thủ công và workshop làm gốm ở Đà Nẵng.</p>
        </div>
        <div>
          <h2 className={s.footH}>Liên hệ</h2>
          <p>xin-chao@datmo.example<br />0236 000 0000<br />{AREA}<br />Thứ Ba đến Chủ Nhật, 09:00 đến 20:00</p>
        </div>
        <div>
          <h2 className={s.footH}>Trên trang</h2>
          <p><a href="#ke-gom">Gốm bán tại xưởng</a><br /><a href="#buoi-lam-gom">Workshop</a><br /><a href="#nan-binh">Phác bình</a><br /><a href="#hoi-dap">Hỏi đáp</a><br /><a href="/demos/gom-lo/credits">Ảnh và ghi công</a></p>
        </div>
      </div>
      <div className={`${s.wrap} ${s.footSign}`}>
        <span>© Đất Mơ</span>
        <span>Website do {siteConfig.fullName} thiết kế</span>
      </div>
    </footer>
  );
}
