"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "../brand.module.css";

const IMG = "/images/demos/thuong-hieu-chuyen-dong";
function Pic({ f, alt, w, h }: { f: string; alt: string; w: number; h: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`${IMG}/${f}.webp`} alt={alt} width={w} height={h} loading="eager" decoding="async" draggable={false} />;
}

type Card = { k: string; wide: boolean; title: string; meta: string };
const CARDS: Card[] = [
  { k: "film", wide: false, title: "Phim ra mắt thời trang nam", meta: "Motion · Nhà may cao cấp" },
  { k: "law", wide: true, title: "Văn phòng luật Minh Chứng", meta: "Website · Dịch vụ pháp lý" },
  { k: "scent", wide: false, title: "Hổ Phách, nước hoa", meta: "3D · Ảnh render sản phẩm" },
  { k: "app", wide: false, title: "Định Vị Pro", meta: "Ứng dụng · Bản đồ cá nhân" },
  { k: "steel", wide: true, title: "Thép Việt Tiến", meta: "Website · Cơ khí chế tạo" },
  { k: "lip", wide: false, title: "Sắc đỏ mới", meta: "Motion · Quảng cáo 15 giây" },
  { k: "clinic", wide: true, title: "Nha khoa Nụ Cười", meta: "Website · Phòng khám" },
  { k: "can", wide: false, title: "Cam Pop", meta: "3D · Bao bì đồ uống" },
];

function Face({ k }: { k: string }) {
  switch (k) {
    case "film": return <div className={`${s.mock} ${s.mPhoto}`}><Pic f="chan-dung" alt="Chân dung đen trắng một người đàn ông mặc vest" w={640} h={800} /><span>Từng đường kim mũi chỉ.</span></div>;
    case "law": return (<div className={`${s.mock} ${s.mLaw}`}><nav aria-hidden="true"><i>MC</i><span>TRANG CHỦ</span><span>LĨNH VỰC</span><span>ĐỘI NGŨ</span><span>LIÊN HỆ</span></nav><small>Cố vấn tin cậy</small><h4>KẾT QUẢ<br />XUẤT SẮC.</h4><p>Hơn hai thập kỷ bảo vệ quyền lợi khách hàng bằng sự tận tâm trong từng vụ việc.</p><b>ĐẶT LỊCH TƯ VẤN</b><u aria-hidden="true">⚖</u></div>);
    case "scent": return <div className={`${s.mock} ${s.mPhoto}`}><Pic f="nuoc-hoa" alt="Xịt nước hoa, ảnh đen trắng" w={600} h={760} /></div>;
    case "app": return (<div className={`${s.mock} ${s.mApp}`}><small>Giới thiệu</small><span className={s.appIcon} aria-hidden="true" /><h4>Định Vị <em>Pro</em></h4><p>Biết mọi nơi bạn đã đi. Không bao giờ quên.</p></div>);
    case "steel": return (<div className={`${s.mock} ${s.mSteel}`}><nav aria-hidden="true"><span>TRANG CHỦ</span><span>NĂNG LỰC</span><span>DỰ ÁN</span><b>BÁO GIÁ</b></nav><small>CƠ KHÍ CHẾ TẠO</small><h4>RÈN SỨC MẠNH<br /><em>DỰNG TƯƠNG LAI</em></h4><p>Giải pháp kết cấu thép cho nhà xưởng, công trình dân dụng và công nghiệp.</p><b>NHẬN BÁO GIÁ</b></div>);
    case "lip": return <div className={`${s.mock} ${s.mPhoto}`}><Pic f="son-do" alt="Thỏi son đỏ và vệt son trên nền trắng" w={600} h={700} /><span>Sắc đỏ mới</span></div>;
    case "clinic": return (<div className={`${s.mock} ${s.mClinic}`}><div className={s.clinicTxt}><small>NHA KHOA NỤ CƯỜI</small><h4>Nụ cười của bạn,<br /><em>đam mê của chúng tôi.</em></h4><b>Đặt lịch khám</b></div><div className={s.clinicPic}><Pic f="nu-cuoi" alt="Nụ cười rạng rỡ" w={640} h={420} /></div></div>);
    default: return <div className={`${s.mock} ${s.mPhoto}`}><Pic f="nuoc-cam" alt="Ly nước cam tươi và cam cắt đôi trên thớt gỗ" w={600} h={760} /><span>Vị cam tươi</span></div>;
  }
}

/** Dự án chọn lọc: dải thẻ ngang. Desktop: ghim và cuộn ngang theo cuộn dọc, thẻ nghiêng theo khoảng cách tới giữa. Mobile / không JS: cuộn ngang tự nhiên. */
export function Work() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = root.current, rl = rail.current;
    if (!el || !rl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        el.dataset.pin = "on";
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]", rl);
        const dist = () => Math.max(0, rl.scrollWidth - window.innerWidth + 80);
        const upd = () => {
          let bi = 0, bd = 1e9;
          cards.forEach((c, i) => {
            const r = c.getBoundingClientRect();
            const n = (r.left + r.width / 2 - window.innerWidth / 2) / window.innerWidth;
            gsap.set(c, { rotateY: n * -16, z: -Math.abs(n) * 120, scale: 1 - Math.abs(n) * 0.06 });
            const d = Math.abs(n); if (d < bd) { bd = d; bi = i; }
          });
          cards.forEach((c, i) => { c.dataset.active = i === bi ? "1" : "0"; });
        };
        gsap.set(cards, { transformPerspective: 1100 });
        gsap.fromTo(rl, { x: 0 }, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => "+=" + dist() * 1.15, pin: true, scrub: 0.6, invalidateOnRefresh: true, onUpdate: upd, onRefresh: upd } });
        upd();
        return () => { delete el.dataset.pin; };
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className={s.work} id="du-an" data-shape="none" data-chap="du-an" ref={root} aria-labelledby="dh-work">
      <div className={s.workHead}>
        <h2 id="dh-work" className={s.h2}>Dự án chọn lọc</h2>
        <a className={s.under} href="#lien-he">Tất cả 16 dự án</a>
      </div>
      <ul className={s.rail} ref={rail}>
        {CARDS.map((c, i) => (
          <li key={c.k} className={s.railItem} data-card="" data-wide={c.wide}>
            <div className={s.railCard}><Face k={c.k} /></div>
            <p className={s.railCap}><b>{c.title}</b><span>{c.meta}</span></p>
            <span className={s.railNo} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          </li>
        ))}
      </ul>
      <p className={s.workNote}>Các dự án trên là minh hoạ do thiết kế, không đại diện khách hàng thật.</p>
    </section>
  );
}
