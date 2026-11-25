import Image from "next/image";
import { ClipReveal, ParallaxLayer, ScrollScrubText, VelocityMarquee, MagneticButton } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import s from "../brand.module.css";
import { FAQ } from "../data/data";
import { Engrave } from "./Engrave";
import { Fingerprint } from "./Fingerprint";

const CONSULT = buildConsultHref("gom-lo");

export function Marquee() {
  const words = ["Nặn", "Xoay", "Phủ men", "Nung", "Chờ nguội"];
  return (
    <div className={s.marquee} aria-label="Nặn, xoay, phủ men, nung, chờ nguội">
      <VelocityMarquee mode="velocity" speed={60} boost={1.2} reverseOnScrollUp gap="2.2rem" controls pauseLabel="Dừng chạy chữ" playLabel="Chạy chữ" buttonClassName={s.marqBtn}>
        {words.map((w) => (
          <span key={w} className={s.marqItem}>{w}<Fingerprint className={s.marqPrint} strokeWidth={3} /></span>
        ))}
      </VelocityMarquee>
    </div>
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
          <p className={s.hand}>Câu chuyện</p>
          <Engrave as="h2" id="story-title" className={s.h2}>Gốm không cần hoàn hảo.</Engrave>
          <ScrollScrubText className={s.manifesto} dim={0.22}>
            Mỗi vết ngón tay, mỗi đường xoay lệch đi một chút là chữ ký của người nặn. Ở Đất Mơ, bạn chạm vào đất trước khi nhìn thấy một món đồ. Chúng tôi làm gốm ở Đà Nẵng bằng đất, bàn xoay và lò nung, rồi mời bạn ngồi xuống làm cùng. Không ai ra khỏi buổi làm gốm với hai món giống nhau.
          </ScrollScrubText>
          <p className={s.storySmall}>Làm gốm là cách chậm lại, cảm nhận và kết nối với chính mình. Đó là điều chúng tôi muốn giữ trong từng buổi.</p>
        </div>
      </div>
    </section>
  );
}

export function Space() {
  return (
    <section id="xuong" className={s.space} aria-labelledby="space-title">
      <div className={s.spacePhoto}>
        <ParallaxLayer distance={60} className={s.spaceLayer}>
          <Image src="/images/demos/gom-lo/xuong-ke-lo-2000.webp" alt="Góc xưởng gốm với kệ gỗ, chum vại đất nung" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </ParallaxLayer>
        <div className={s.spaceShade} aria-hidden="true" />
      </div>
      <div className={`${s.wrap} ${s.spaceBody}`}>
        <div>
          <p className={s.hand}>Xưởng</p>
          <Engrave as="h2" id="space-title" className={s.h2}>Bốn góc, một mùi đất.</Engrave>
        </div>
        <ul className={s.corners}>
          <li><b>Góc bàn xoay</b><span>Những chiếc bàn xoay để nặn, ngồi sát nhau vừa đủ trò chuyện.</span></li>
          <li><b>Góc vẽ men</b><span>Bảng màu men xếp trên kệ, thử trước khi phủ lên món của bạn.</span></li>
          <li><b>Lò nung</b><span>Phôi xếp vào lò theo mẻ, nên ngày lấy món tuỳ lò.</span></li>
          <li><b>Kệ sản phẩm</b><span>Gốm làm tại xưởng, bạn có thể cầm lên xem trước khi mua.</span></li>
        </ul>
        <p className={s.spaceAddr}>Xưởng ở Đà Nẵng. Địa chỉ cụ thể và hướng dẫn đường đi được gửi khi xác nhận lịch.</p>
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
          <Engrave as="h2" id="faq-title" className={s.h2}>Những điều hay được hỏi.</Engrave>
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
        <Engrave as="h2" id="closing-title" className={s.closeTitle}>Cùng đất kể một câu chuyện.</Engrave>
        <div className={s.ctaRow}>
          <MagneticButton strength={0.3} max={12}><a className={s.btn} href={CONSULT} data-cursor="Hỏi">Hỏi xưởng về một buổi hẹn</a></MagneticButton>
          <a className={s.linkHand} href="#buoi-lam-gom">Chọn buổi làm gốm <span aria-hidden="true">↑</span></a>
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
          <p>xin-chao@datmo.example<br />0236 000 0000<br />Đà Nẵng</p>
        </div>
        <div>
          <h2 className={s.footH}>Trên trang</h2>
          <p><a href="#ke-gom">Kệ gốm</a><br /><a href="#buoi-lam-gom">Buổi làm gốm</a><br /><a href="#nan-binh">Nặn bình</a><br /><a href="/demos/gom-lo/credits">Ảnh và ghi công</a></p>
        </div>
      </div>
      <div className={`${s.wrap} ${s.footSign}`}>
        <span>© Đất Mơ</span>
        <span>Website do {siteConfig.fullName} thiết kế</span>
      </div>
    </footer>
  );
}
