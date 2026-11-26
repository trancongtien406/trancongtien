import { ClipReveal, ScrollScrubText } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import styles from "../brand.module.css";
import { ALBUMS, EXCLUDED, PACKAGES, PROCESS, vnd } from "../data/content";
import { ADDONS, FACTS, POLICIES, SERVICES, STYLE_INFO, WARDROBE } from "../data/studio";
import { DeliveryPlanner } from "./DeliveryPlanner";
import { EventButton } from "./EventButton";
import { Faq } from "./Faq";
import { GoldenHour } from "./GoldenHour";
import { Photo } from "./Photo";
import { StyleGallery } from "./StyleGallery";

export function Hero({ consultHref }: { consultHref: string }) {
  return (
    <section className={styles.hero} aria-labelledby="tm-h1">
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <p className={styles.meta} data-tm="meta"><span>Studio ảnh cưới</span><span>Quận Sơn Trà, Đà Nẵng</span><span>Nhận lịch mùa cưới</span></p>
          <h1 id="tm-h1" className={styles.display}>
            <span className={styles.lineMask}><span data-tm="h1" className={styles.line}>Ảnh cưới Đà Nẵng:</span></span>
            <span className={styles.lineMask}><span data-tm="h1" className={styles.line}>pre-wedding, ngày cưới, album.</span></span>
          </h1>
          <p className={styles.lead} data-tm="body">Tháng Mơ chụp pre-wedding trong studio và ngoại cảnh, phóng sự trong ngày cưới, rồi làm album và ảnh in cho các cặp đôi sắp cưới tại Đà Nẵng và vùng lân cận.</p>
          <div className={styles.ctaRow} data-tm="body">
            <a className={`${styles.btn} ${styles.btnPrimary}`} href={consultHref} data-tm-consult>Đặt lịch tư vấn</a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#packages">Xem bảng giá gói chụp</a>
          </div>
          <ul className={styles.heroFacts} data-tm="body" aria-label="Thông tin nhanh">
            {FACTS.map((f) => <li key={f.k}><span>{f.k}</span><b>{f.v}</b></li>)}
          </ul>
        </div>
        <div className={styles.heroPhotos}>
          <figure className={`${styles.print} ${styles.heroMain}`} data-tm="photo">
            <div className={styles.frame} style={{ aspectRatio: "4 / 5" }}>
              <Photo id="vay" sizes="(max-width: 900px) 90vw, 560px" priority size={1200} position="50% 40%" />
              <span className={styles.cover} data-tm="cover" aria-hidden="true" />
            </div>
            <figcaption className={styles.note}><span className={styles.fig}>Fig. 01</span> Ảnh tham khảo phong cách.</figcaption>
          </figure>
          <figure className={`${styles.print} ${styles.heroInset}`} data-tm="inset">
            <div className={styles.frame} style={{ aspectRatio: "1 / 1" }}><Photo id="nhan" sizes="200px" size={600} position="30% 55%" /></div>
            <figcaption className={styles.note}>Chi tiết nhỏ.</figcaption>
          </figure>
          <span className={styles.spine} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className={styles.section} id="about" aria-labelledby="tm-about">
      <div className={`${styles.wrap} ${styles.storyGrid}`}>
        <figure className={`${styles.print} ${styles.storyPhoto} ${styles.tilt1}`} data-tm-reveal>
          <ClipReveal from="left" duration={1}>
            <div className={styles.frame} style={{ aspectRatio: "3 / 4" }}><Photo id="codau" sizes="(max-width: 900px) 70vw, 380px" position="50% 30%" /></div>
          </ClipReveal>
          <figcaption className={styles.note}>Ảnh tham khảo: bóng lưng trên phố.</figcaption>
        </figure>
        <div className={styles.storyText}>
          <p className={styles.eyebrow}>Về studio</p>
          <h2 id="tm-about" className={styles.h2}>Studio nhỏ, mỗi ngày chỉ nhận một đám cưới.</h2>
          <ScrollScrubText className={styles.scrub} dim={0.25}>Tháng Mơ chụp theo ánh sáng tự nhiên, ít dàn dựng và nói chuyện với hai bạn trước khi bấm máy. Pre-wedding chạy theo giờ đẹp của nắng ở biển và vườn, ngày cưới chạy theo trình tự thật của gia đình. Sau buổi chụp, hai bạn tự chọn ảnh, duyệt album và chỉ in khi đã ưng.</ScrollScrubText>
          <ul className={styles.aboutList}>
            <li><b>Ánh sáng tự nhiên</b><span>Đèn chỉ dùng bổ sung trong studio và buổi tối.</span></li>
            <li><b>Hai bạn chọn ảnh</b><span>Link ảnh gốc, chọn đúng số ảnh của gói.</span></li>
            <li><b>Giá nói trước</b><span>Mỗi gói ghi rõ bao gồm và không bao gồm.</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className={styles.sectionLinen} id="services" aria-labelledby="tm-sv">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>Dịch vụ</p>
          <h2 id="tm-sv" className={styles.h2}>Bốn việc studio nhận làm.</h2>
          <p className={styles.body}>Từ buổi chụp trước cưới đến cuốn album trên kệ. Mỗi dịch vụ có gói riêng, hai bạn chọn một hoặc ghép.</p>
        </header>
        <ul className={styles.svGrid}>
          {SERVICES.map((s) => (
            <li key={s.id} className={styles.svItem} data-tm-reveal>
              <span className={styles.svNum} aria-hidden="true">{s.n}</span>
              <div>
                <h3 className={styles.h3}>{s.name}</h3>
                <p className={styles.small}>{s.text}</p>
                <ul className={styles.chips}>{s.meta.map((m) => <li key={m}>{m}</li>)}</ul>
                <a className={styles.textLink} href={s.pkg ? "#packages" : "#addons"}>{s.pkg ? "Xem gói" : "Xem bảng giá"} <span aria-hidden="true">→</span></a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Packages() {
  return (
    <section className={styles.section} id="packages" aria-labelledby="tm-pk">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>Gói chụp và giá</p>
          <h2 id="tm-pk" className={styles.h2}>Ba gói, ghi rõ bao gồm gì.</h2>
          <p className={styles.body}>Giá tham khảo, đã gồm thuê trang phục và trang điểm ở hai gói pre-wedding. Địa điểm được mô tả theo loại hình; địa chỉ cụ thể chốt khi tư vấn.</p>
        </header>
        <ul className={styles.pkgList}>
          {PACKAGES.map((p) => (
            <li key={p.id} className={styles.pkgRow} data-tm-reveal>
              <span className={styles.roman} aria-hidden="true">{p.roman}</span>
              <div className={styles.pkgName}>
                <p className={styles.codeLine}>{p.kind}</p>
                <h3 className={styles.h3}>{p.name}</h3>
                <p className={styles.small}>{p.blurb}</p>
              </div>
              <dl className={styles.pkgSpec}>
                <div><dt>Thời lượng</dt><dd>{p.hours}</dd></div>
                <div><dt>Địa điểm</dt><dd>{p.places}</dd></div>
                <div><dt>Trang phục</dt><dd>{p.outfits}</dd></div>
                <div><dt>Nhiếp ảnh</dt><dd>{p.photographers}</dd></div>
                <div><dt>Ảnh chỉnh sửa</dt><dd>{p.photos} ảnh</dd></div>
                <div><dt>Album in</dt><dd>{p.album.replace("Không bao gồm album in", "Không bao gồm")}</dd></div>
                <div><dt>Giao ảnh</dt><dd>{p.delivery}</dd></div>
              </dl>
              <div className={styles.pkgIncl}>
                <div><p className={styles.codeLine}>Bao gồm</p><ul className={styles.tick}>{p.includes.map((i) => <li key={i}>{i}</li>)}</ul></div>
                <div><p className={styles.codeLine}>Không bao gồm</p><ul className={styles.cross}>{p.excludes.map((i) => <li key={i}>{i}</li>)}</ul></div>
              </div>
              <div className={styles.pkgPrice}>
                <p className={styles.price}>{vnd(p.price)}</p>
                <p className={styles.codeLine}>Giá tham khảo</p>
                <EventButton event="tm:package" detail={{ id: p.id }} className={styles.textLink}>Đưa vào moodboard <span aria-hidden="true">→</span></EventButton>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.honest}>{EXCLUDED}</p>

        <div className={styles.addons} id="addons">
          <h3 className={styles.h3}>Album, ảnh in và file</h3>
          <p className={styles.small}>Mua kèm gói hoặc sau buổi chụp. Gói Ngoại Cảnh và Phóng sự đã gồm một album như bảng trên.</p>
          <table className={styles.addonTable}>
            <caption className={styles.srOnly}>Bảng giá album, ảnh in và file</caption>
            <thead><tr><th scope="col">Hạng mục</th><th scope="col">Ghi chú</th><th scope="col">Giá tham khảo</th></tr></thead>
            <tbody>{ADDONS.map((a) => <tr key={a.name}><th scope="row">{a.name}</th><td>{a.note}</td><td>{vnd(a.price)}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Styles() {
  return (
    <section className={`${styles.section} ${styles.albumsSection}`} id="albums" aria-labelledby="tm-albums">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>Danh mục phong cách</p>
          <h2 id="tm-albums" className={styles.h2}>Biển, vườn, cổ điển, tối giản.</h2>
          <p className={styles.body}>Bốn hướng chụp studio nhận. Mỗi hướng ghi địa điểm hợp, khung giờ, trang phục gợi ý và có một sổ ảnh tham khảo để xem bố cục. Kéo ngang để xem hết.</p>
        </header>
      </div>
      <StyleGallery className={styles.styleGal} trackClassName={styles.styleTrack} buttonClassName={styles.galBtn}>
        {ALBUMS.map((a, i) => {
          const info = STYLE_INFO[a.style];
          const img = ["hoang", "vuon", "album", "ban"][i];
          return (
            <article key={a.id} className={styles.styleCard}>
              <EventButton event="tm:album" detail={{ id: a.id }} className={styles.albumCover} ariaLabel={`Mở album ${a.title}`}>
                <span className={`${styles.print} ${styles.printBtn}`}>
                  <span className={styles.frame} style={{ aspectRatio: "4 / 5" }}><Photo id={img} sizes="(max-width: 900px) 80vw, 380px" position="50% 50%" /></span>
                </span>
              </EventButton>
              <p className={styles.chapter}>{a.chapter}</p>
              <h3 className={styles.h3}>{a.title}</h3>
              <dl className={styles.styleInfo}>
                <div><dt>Địa điểm hợp</dt><dd>{info.where}</dd></div>
                <div><dt>Giờ chụp đẹp</dt><dd>{info.light}</dd></div>
                <div><dt>Trang phục</dt><dd>{info.wear}</dd></div>
                <div><dt>Mùa</dt><dd>{info.months}</dd></div>
              </dl>
              <EventButton event="tm:album" detail={{ id: a.id }} className={styles.textLink}>Xem sổ ảnh tham khảo <span aria-hidden="true">→</span></EventButton>
            </article>
          );
        })}
      </StyleGallery>
      <div className={styles.wrap}><p className={styles.honest}>Ảnh trong sổ là ảnh tham khảo để hình dung phong cách và bố cục.</p></div>
    </section>
  );
}

export function Wardrobe() {
  return (
    <section className={styles.sectionLinen} id="wardrobe" aria-labelledby="tm-wd">
      <div className={`${styles.wrap} ${styles.wdGrid}`}>
        <header>
          <p className={styles.eyebrow}>Trang phục và trang điểm</p>
          <h2 id="tm-wd" className={styles.h2}>Hai bạn chỉ cần mang giày.</h2>
          <p className={styles.body}>Pre-wedding đã gồm thuê váy, vest, phụ kiện và trang điểm cô dâu tại studio. Hai bạn thử đồ trước ngày chụp để chỉnh vừa người.</p>
          <p className={styles.honest}>{WARDROBE.note}</p>
          <figure className={`${styles.print} ${styles.tilt1} ${styles.wdPhoto}`}>
            <div className={styles.frame} style={{ aspectRatio: "4 / 5" }}><Photo id="lung" sizes="(max-width: 900px) 60vw, 280px" position="50% 40%" /></div>
            <figcaption className={styles.note}>Ảnh tham khảo: chi tiết lưng váy.</figcaption>
          </figure>
        </header>
        <table className={styles.addonTable}>
          <caption className={styles.srOnly}>Dịch vụ đi kèm theo từng loại gói</caption>
          <thead><tr><th scope="col">Hạng mục</th>{WARDROBE.cols.map((c) => <th scope="col" key={c}>{c}</th>)}</tr></thead>
          <tbody>{WARDROBE.rows.map((r) => <tr key={r.item}><th scope="row">{r.item}</th>{r.v.map((v, i) => <td key={i}>{v}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

export function Light() {
  return (
    <section className={styles.section} id="light" aria-labelledby="tm-light">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>Giờ chụp theo ánh sáng</p>
          <h2 id="tm-light" className={styles.h2}>Chọn giờ chụp trước khi chọn địa điểm.</h2>
          <p className={styles.body}>Ngoại cảnh ở Đà Nẵng đẹp hay xấu phần lớn do giờ nắng. Kéo giờ và chọn mùa để xem ánh sáng lúc đó thế nào.</p>
        </header>
        <GoldenHour />
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className={styles.sectionLinen} id="journey" aria-labelledby="tm-journey">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>Quy trình</p>
          <h2 id="tm-journey" className={styles.h2}>Từ tư vấn đến album trong tay.</h2>
          <p className={styles.body}>Bảy bước, mỗi bước ghi thời gian dự kiến.</p>
        </header>
        <ol className={styles.steps}>
          {PROCESS.map((s) => (
            <li key={s.n} className={styles.step} data-tm-reveal>
              <span className={styles.stepNum} aria-hidden="true">{s.n}</span>
              <h3 className={styles.h3}>{s.title} <span className={styles.when}>{s.when}</span></h3>
              <p className={styles.small}>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.plannerWrap}>
          <h3 className={styles.h3}>Lịch giao ảnh</h3>
          <p className={styles.small}>Nhập ngày chụp dự kiến để ước tính ngày nhận ảnh và album.</p>
          <DeliveryPlanner />
        </div>
      </div>
    </section>
  );
}

export function Policies() {
  return (
    <section className={styles.section} id="policy" aria-labelledby="tm-pol">
      <div className={styles.wrap}>
        <div className={styles.polTop}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>Chính sách</p>
          <h2 id="tm-pol" className={styles.h2}>Đặt cọc, dời lịch và trời mưa.</h2>
        </header>
        <figure className={`${styles.print} ${styles.tilt2} ${styles.polPhoto}`}>
          <div className={styles.frame} style={{ aspectRatio: "4 / 3" }}><Photo id="thiep" sizes="(max-width: 900px) 70vw, 300px" position="50% 40%" /></div>
          <figcaption className={styles.note}>Ảnh tham khảo: thiệp giấy và nhẫn.</figcaption>
        </figure>
        </div>
        <dl className={styles.polGrid}>
          {POLICIES.map((p) => <div key={p.t} data-tm-reveal><dt className={styles.h3}>{p.t}</dt><dd className={styles.small}>{p.d}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className={styles.sectionLinen} id="faq" aria-labelledby="tm-faq">
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <header>
          <p className={styles.eyebrow}>Câu hỏi thường gặp</p>
          <h2 id="tm-faq" className={styles.h2}>Trước khi đặt lịch.</h2>
          <p className={styles.body}>Những câu cặp đôi hay hỏi về giá, lịch, thời tiết và ảnh.</p>
        </header>
        <Faq />
      </div>
    </section>
  );
}

export function Closing({ consultHref }: { consultHref: string }) {
  return (
    <section className={styles.closing} id="closing" aria-labelledby="tm-closing">
      <div className={`${styles.wrap} ${styles.closingGrid}`}>
        <div>
          <p className={`${styles.eyebrow} ${styles.onDark}`}>Đặt lịch</p>
          <h2 id="tm-closing" className={`${styles.h2} ${styles.onDark}`}>Giữ ngày chụp cho hai bạn.</h2>
          <p className={`${styles.lead} ${styles.onDarkSoft}`}>Cho studio biết ngày cưới, phong cách thích và ngân sách. Studio gợi ý gói và địa điểm, rồi hẹn xem trang phục.</p>
          <div className={styles.ctaRow}>
            <a className={`${styles.btn} ${styles.btnLight}`} href={consultHref} data-tm-consult>Đặt lịch tư vấn</a>
            <a className={`${styles.btn} ${styles.btnGhostLight}`} href="#packages">Xem lại bảng giá</a>
          </div>
          <ul className={`${styles.visit} ${styles.onDarkSoft}`}>
            <li>Khu vực: Quận Sơn Trà, Đà Nẵng</li>
            <li>Giờ tư vấn: 08:30–18:30, Thứ Hai đến Thứ Bảy</li>
            <li>Điện thoại: <span translate="no">0236 000 0000</span></li>
          </ul>
        </div>
        <figure className={`${styles.print} ${styles.tilt2}`}>
          <ClipReveal from="right" duration={1.1}>
            <div className={styles.frame} style={{ aspectRatio: "4 / 5" }}><Photo id="cong" sizes="(max-width: 900px) 70vw, 360px" position="50% 50%" /></div>
          </ClipReveal>
          <figcaption className={styles.note}>Ảnh tham khảo: cổng hoa nhìn ra biển.</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Footer({ consultHref }: { consultHref: string }) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.wrap} ${styles.footGrid}`}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/thang-mo/identity/logo-primary.svg" alt="Tháng Mơ Wedding Studio" width={200} height={125} />
          <p className={styles.noteLg}>Giữ lại một ngày, nhớ cả một đời.</p>
          <p className={styles.small}>Studio ảnh cưới tại Quận Sơn Trà, Đà Nẵng: pre-wedding, phóng sự ngày cưới, album và ảnh in.</p>
        </div>
        <nav aria-label="Chân trang">
          <p className={styles.chapter}>Trong trang</p>
          <ul>
            <li><a href="#services">Dịch vụ</a></li>
            <li><a href="#packages">Gói chụp và giá</a></li>
            <li><a href="#albums">Phong cách</a></li>
            <li><a href="#policy">Chính sách</a></li>
            <li><a href="#moodboard">Moodboard</a></li>
            <li><a href="#journey">Quy trình</a></li>
            <li><a href="#faq">Câu hỏi thường gặp</a></li>
          </ul>
        </nav>
        <div>
          <p className={styles.chapter}>Thông tin</p>
          <p className={styles.small}>Giá là giá tham khảo. Ảnh trên trang là ảnh tham khảo phong cách, nguồn ghi tại trang Ảnh & ghi công.</p>
          <p className={styles.small}><a href="/demos/thang-mo/credits">Ảnh &amp; ghi công</a> · <a href={consultHref}>Trao đổi về buổi chụp</a></p>
          <p className={styles.small}>Điện thoại: <span translate="no">0236 000 0000</span></p>
          <p className={styles.small}>Email: <span translate="no">xinchao@thangmo.example</span></p>
        </div>
      </div>
      <div className={`${styles.wrap} ${styles.footLine}`}>
        <span>© 2026 <span translate="no">Tháng Mơ</span> </span>
        <span>Website do {siteConfig.fullName} thiết kế</span>
      </div>
    </footer>
  );
}
