import { siteConfig } from "@/lib/site";
import styles from "../brand.module.css";
import { ALBUMS, EXCLUDED, PACKAGES, PROCESS, vnd } from "../data/content";
import { EventButton } from "./EventButton";
import { Faq } from "./Faq";
import { Photo } from "./Photo";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="tm-h1">
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <p className={styles.meta} data-tm="meta"><span>The Wedding Journal</span><span>Vol. 01</span><span>01 / Lời mở đầu</span></p>
          <h1 id="tm-h1" className={styles.display}>
            <span className={styles.lineMask}><span data-tm="h1" className={styles.line}>Giữ lại một ngày,</span></span>
            <span className={styles.lineMask}><span data-tm="h1" className={styles.line}>nhớ cả một đời.</span></span>
          </h1>
          <p className={styles.lead} data-tm="body">Một cuốn nhật ký bằng hình ảnh, dành cho câu chuyện của hai bạn. Từ những buổi chiều đầy gió đến những điều dịu dàng chưa kịp gọi tên.</p>
          <div className={styles.ctaRow} data-tm="body">
            <EventButton event="tm:album" detail={{ id: "coastal" }} className={`${styles.btn} ${styles.btnPrimary}`}>Mở album cảm hứng</EventButton>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#moodboard">Phác thảo ngày cưới</a>
          </div>
          <p className={styles.honest} data-tm="caption">Ảnh tham khảo cho phong cách chụp.</p>
        </div>
        <div className={styles.heroPhotos}>
          <figure className={`${styles.print} ${styles.heroMain}`} data-tm="photo">
            <div className={styles.frame} style={{ aspectRatio: "4 / 5" }}>
              <Photo id="vay" sizes="(max-width: 900px) 90vw, 560px" priority size={1200} position="50% 40%" />
              <span className={styles.cover} data-tm="cover" aria-hidden="true" />
            </div>
            <figcaption className={styles.note}><span className={styles.fig}>Fig. 01</span> Một chiều đầy gió.</figcaption>
          </figure>
          <figure className={`${styles.print} ${styles.heroInset}`} data-tm="inset">
            <div className={styles.frame} style={{ aspectRatio: "1 / 1" }}><Photo id="nhan" sizes="200px" size={600} position="30% 55%" /></div>
            <figcaption className={styles.note}>Những điều nhỏ bé.</figcaption>
          </figure>
          <span className={styles.spine} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className={styles.section} id="story" aria-labelledby="tm-story">
      <div className={`${styles.wrap} ${styles.storyGrid}`}>
        <figure className={`${styles.print} ${styles.storyPhoto} ${styles.tilt1}`} data-tm-reveal>
          <div className={styles.frame} style={{ aspectRatio: "3 / 4" }}><Photo id="codau" sizes="(max-width: 900px) 70vw, 380px" position="50% 30%" /></div>
          <figcaption className={styles.note}>Chỉ cần một bóng lưng.</figcaption>
        </figure>
        <div className={styles.storyText} data-tm-reveal>
          <p className={styles.eyebrow}>02 / Lời đề tựa</p>
          <h2 id="tm-story" className={styles.h2}>Có những khoảnh khắc rất nhỏ, nhưng theo chúng ta suốt một đời.</h2>
          <p className={styles.body}>Tháng Mơ bắt đầu từ một ý nghĩ giản dị: có những khoảnh khắc rất nhỏ, nhưng lại theo chúng ta suốt một đời. Đó có thể là bàn tay khẽ nắm, một nhành hoa bên cửa sổ, hay buổi chiều hai người cùng đứng trước biển.</p>
          <p className={styles.body}>Trong hình dung của chúng mình, mỗi bộ ảnh cưới là một cuốn nhật ký bằng hình ảnh: có ánh sáng, khoảng lặng, những chi tiết không hoàn hảo và cảm xúc chân thành. Bởi sau nhiều năm, điều đáng nhớ không chỉ là ngày hôm ấy đẹp thế nào, mà là hai bạn đã cảm thấy ra sao.</p>
          <p className={styles.signature}>Tháng Mơ</p>
          <p className={styles.honest}>Ảnh trên trang là ảnh stock dùng để gợi phong cách.</p>
        </div>
      </div>
    </section>
  );
}

const ALBUM_LAYOUT = [
  { cls: "a1", ratio: "3 / 2", img: "hoang", pos: "50% 55%" },
  { cls: "a2", ratio: "4 / 5", img: "vuon", pos: "50% 50%" },
  { cls: "a3", ratio: "4 / 5", img: "album", pos: "60% 50%" },
  { cls: "a4", ratio: "3 / 2", img: "ban", pos: "50% 55%" },
] as const;

export function Albums() {
  return (
    <section className={`${styles.section} ${styles.albumsSection}`} id="albums" aria-labelledby="tm-albums">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>03 / Những chương cảm hứng</p>
          <h2 id="tm-albums" className={styles.h2}>Mỗi câu chuyện, một sắc thái.</h2>
          <p className={styles.body}>Biển, khu vườn, những gam màu cổ điển hay một khoảng không thật giản dị. Hãy tìm sắc thái gần nhất với câu chuyện của hai bạn.</p>
        </header>
        <ul className={styles.albumGrid}>
          {ALBUMS.map((a, i) => {
            const L = ALBUM_LAYOUT[i];
            return (
              <li key={a.id} className={`${styles.albumItem} ${styles[L.cls]}`} data-tm-album>
                <EventButton event="tm:album" detail={{ id: a.id }} className={styles.albumCover} ariaLabel={`Mở album ${a.title}`}>
                  <span className={`${styles.print} ${styles.printBtn}`}>
                    <span className={styles.frame} style={{ aspectRatio: L.ratio }}><Photo id={L.img} sizes="(max-width: 900px) 90vw, 700px" position={L.pos} /></span>
                  </span>
                </EventButton>
                <div className={styles.albumMeta}>
                  <p className={styles.chapter}>{a.chapter}</p>
                  <h3 className={styles.h3}>{a.title}</h3>
                  <p className={styles.small}>{a.description}</p>
                  <p className={styles.codeLine}>Album cảm hứng · 04 trang</p>
                  <EventButton event="tm:album" detail={{ id: a.id }} className={styles.textLink}>Mở album <span aria-hidden="true">→</span></EventButton>
                </div>
              </li>
            );
          })}
        </ul>
        <p className={styles.honest}>Mỗi album là tuyển tập ảnh tham khảo cho một phong cách chụp.</p>
      </div>
    </section>
  );
}

export function Essay() {
  return (
    <section className={styles.sectionLinen} id="essay" aria-labelledby="tm-essay">
      <div className={styles.wrap}>
        <header className={`${styles.sectionHead} ${styles.center}`}>
          <p className={styles.eyebrow}>04 / Những điều nhỏ bé</p>
          <h2 id="tm-essay" className={styles.h2}>Đôi khi, điều đẹp nhất nằm ngoài khung hình lớn.</h2>
          <p className={styles.body}>Không phải mọi ký ức đều cần một khung hình thật rộng. Có những chi tiết nhỏ chỉ hai bạn hiểu, nhưng đủ để kể lại cả một ngày.</p>
        </header>
        <div className={styles.essayGrid}>
          {[
            { id: "lung", cap: "01. Một chi tiết.", cls: "e1", pos: "50% 40%" },
            { id: "hoa", cap: "02. Một nhành hoa.", cls: "e2", pos: "50% 50%" },
            { id: "thiep", cap: "03. Một lời hẹn.", cls: "e3", pos: "50% 40%" },
          ].map((e) => (
            <figure key={e.id} className={`${styles.print} ${styles[e.cls]}`} data-tm-essay>
              <div className={styles.frame} style={{ aspectRatio: "3 / 4" }}><Photo id={e.id} sizes="(max-width: 900px) 80vw, 380px" position={e.pos} /></div>
              <figcaption className={styles.note}>{e.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Packages() {
  return (
    <section className={styles.section} id="packages" aria-labelledby="tm-pk">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>05 / Những cách lưu giữ</p>
          <h2 id="tm-pk" className={styles.h2}>Một câu chuyện, nhiều cách để nhớ.</h2>
          <p className={styles.body}>Một buổi chụp giản dị hay một hành trình dài hơn. Ba cấu hình dưới đây giúp hai bạn hình dung về bộ ảnh của mình. Giá chỉ mang tính tham khảo.</p>
        </header>
        <ul className={styles.pkgList}>
          {PACKAGES.map((p) => (
            <li key={p.id} className={styles.pkgRow} data-tm-reveal>
              <span className={styles.roman} aria-hidden="true">{p.roman}</span>
              <div className={styles.pkgName}>
                <p className={styles.codeLine}>{p.id}</p>
                <h3 className={styles.h3}>{p.name}</h3>
                <p className={styles.small}>{p.blurb}</p>
              </div>
              <dl className={styles.pkgSpec}>
                <div><dt>Thời lượng</dt><dd>{p.hours}</dd></div>
                <div><dt>Bối cảnh</dt><dd>{p.places}</dd></div>
                <div><dt>Trang phục tự chuẩn bị</dt><dd>{p.outfits}</dd></div>
                <div><dt>Nhiếp ảnh gia dự kiến</dt><dd>{p.photographers}</dd></div>
                <div><dt>Ảnh chỉnh sửa</dt><dd>{p.photos} ảnh</dd></div>
                <div><dt>Album in</dt><dd>{p.album.replace("Không bao gồm album in", "Không bao gồm")}</dd></div>
                <div><dt>Giao ảnh (dự kiến)</dt><dd>{p.delivery}</dd></div>
              </dl>
              <div className={styles.pkgPrice}>
                <p className={styles.price}>{vnd(p.price)}</p>
                <p className={styles.codeLine}>Giá tham khảo</p>
                <EventButton event="tm:package" detail={{ id: p.id }} className={styles.textLink}>Đưa vào moodboard <span aria-hidden="true">→</span></EventButton>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.honest}>{EXCLUDED} Bảng giá chỉ mang tính tham khảo, không phải báo giá chính thức.</p>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className={styles.sectionLinen} id="journey" aria-labelledby="tm-journey">
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>07 / Từ lời chào đầu tiên</p>
          <h2 id="tm-journey" className={styles.h2}>Từ lời chào đến cuốn album.</h2>
          <p className={styles.body}>Mỗi bộ ảnh được hình dung như một hành trình nhỏ: hẹn lịch, chụp, chọn ảnh, rồi giao album.</p>
        </header>
        <ol className={styles.steps}>
          {PROCESS.map((s) => (
            <li key={s.n} className={styles.step} data-tm-reveal>
              <span className={styles.stepNum} aria-hidden="true">{s.n}</span>
              <h3 className={styles.h3}>{s.title}</h3>
              <p className={styles.small}>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className={styles.honest}>Các bước và thời gian có thể điều chỉnh theo từng cặp đôi.</p>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className={styles.section} id="faq" aria-labelledby="tm-faq">
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <header>
          <p className={styles.eyebrow}>08 / Những điều muốn hỏi</p>
          <h2 id="tm-faq" className={styles.h2}>Trước khi bắt đầu.</h2>
          <p className={styles.body}>Vài điều hai bạn có thể muốn biết khi chuẩn bị cho buổi chụp ảnh cưới.</p>
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
          <p className={`${styles.eyebrow} ${styles.onDark}`}>09 / Trang cuối</p>
          <h2 id="tm-closing" className={`${styles.h2} ${styles.onDark}`}>Câu chuyện đẹp nhất là câu chuyện của hai bạn.</h2>
          <p className={`${styles.lead} ${styles.onDarkSoft}`}>Không cần biết chính xác mọi thứ ngay từ đầu. Đôi khi, một màu sắc yêu thích hay một buổi chiều trong tưởng tượng cũng đủ để bắt đầu.</p>
          <div className={styles.ctaRow}>
            <a className={`${styles.btn} ${styles.btnLight}`} href={consultHref} data-tm-consult>Trao đổi về buổi chụp</a>
            <EventButton event="tm:album" detail={{ id: "classic" }} className={`${styles.btn} ${styles.btnGhostLight}`}>Xem lại album cảm hứng</EventButton>
          </div>
          <p className={`${styles.honest} ${styles.onDarkSoft}`}>Nút tư vấn dẫn tới form liên hệ của website. Công cụ trên trang không gửi dữ liệu đi.</p>
        </div>
        <figure className={`${styles.print} ${styles.tilt2}`}>
          <div className={styles.frame} style={{ aspectRatio: "4 / 5" }}><Photo id="cong" sizes="(max-width: 900px) 70vw, 360px" position="50% 50%" /></div>
          <figcaption className={styles.note}>Một cổng hoa nhìn ra biển.</figcaption>
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
          <p className={styles.small}>Studio ảnh cưới phong cách analog photobook: album cảm hứng, gói chụp tham khảo và moodboard cho ngày cưới.</p>
        </div>
        <nav aria-label="Chân trang">
          <p className={styles.chapter}>Trong trang</p>
          <ul>
            <li><a href="#albums">Album cảm hứng</a></li>
            <li><a href="#packages">Gói chụp</a></li>
            <li><a href="#moodboard">Moodboard</a></li>
            <li><a href="#journey">Quy trình</a></li>
            <li><a href="#faq">Câu hỏi thường gặp</a></li>
          </ul>
        </nav>
        <div>
          <p className={styles.chapter}>Thông tin</p>
          <p className={styles.small}>Ảnh trên trang là ảnh stock được ghi công tại trang Ảnh & ghi công; gói chụp và giá chỉ mang tính tham khảo.</p>
          <p className={styles.small}><a href="/demos/thang-mo/credits">Ảnh &amp; ghi công</a> · <a href={consultHref}>Trao đổi về buổi chụp</a></p>
          <p className={styles.small}>Liên hệ: <span translate="no">xinchao@thangmo.example</span></p>
        </div>
      </div>
      <div className={`${styles.wrap} ${styles.footLine}`}>
        <span>© 2026 <span translate="no">Tháng Mơ</span> </span>
        <span>Website do {siteConfig.fullName} thiết kế</span>
      </div>
    </footer>
  );
}
