"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";
import { IMG, INTERIORS, PAINTS, WHEELS, fmt } from "../data";
import { useBuild } from "../Store";

export function Finale() {
  const { openDrawer } = useBuild();
  return (
    <section id="dat-cho" className={s.fin} aria-labelledby="fin-h">
      <div className={s.finBg} data-finbg><img className={s.img} src={`${IMG}rear.webp`} width={1920} height={1080} alt="Đuôi chiếc coupe trên mặt đường ướt ban đêm, đèn hậu đỏ phản chiếu (ảnh minh hoạ)" loading="lazy" decoding="async" /></div>
      <div className={s.rain} aria-hidden="true" style={{ zIndex: 3 }} />
      <div className={s.finCopy}>
        <h2 id="fin-h">Chỉ <b>50</b> suất<br />Mưa Rào.</h2>
        <div className={s.finBtns}>
          <button type="button" className={s.gold} onClick={openDrawer}>Giữ suất của bạn <i aria-hidden="true">→</i></button>
          <a className={s.ghost} href="#cau-hinh">Quay lại cấu hình</a>
        </div>
      </div>
      <p className={s.ghostWord} aria-hidden="true">V4 Mưa Rào</p>
    </section>
  );
}

export function Footer() {
  const [ok, setOk] = useState(false);
  return (
    <footer className={s.foot}>
      <div className={s.footGrid}>
        <div><h4>Vĩ Tốc EV</h4><p>Coupe điện hiệu năng cao, dựng cho đường ướt và những đêm dài. Trang này là bản demo thiết kế, không phải doanh nghiệp thật.</p></div>
        <div><h4>Chiếc xe</h4><a href="#hieu-nang">Hiệu năng</a><a href="#ky-thuat">Kỹ thuật</a><a href="#noi-that">Khoang lái</a></div>
        <div><h4>Sở hữu</h4><a href="#cau-hinh">Cấu hình</a><a href="#so-huu">Trả góp</a><a href="#lai-thu">Lái thử</a></div>
        <div>
          <h4>Nhận tin</h4><p>Một email khi mở thêm suất.</p>
          {ok ? <p role="status" style={{ marginTop: 10, color: "var(--vt-gold)" }}>Đã ghi nhận (minh hoạ).</p> : (
            <form className={s.news} onSubmit={(e) => { e.preventDefault(); const v = String(new FormData(e.currentTarget).get("e") || ""); if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) setOk(true); }}>
              <label className={s.srOnly} htmlFor="vt-mail">Email</label>
              <input id="vt-mail" name="e" type="email" placeholder="Email của bạn" autoComplete="email" />
              <button type="submit">Đăng ký</button>
            </form>
          )}
        </div>
      </div>
      <div className={s.disc}>
        <p>Giá, thông số và các con số đều giả định, chỉ để minh hoạ giao diện. Ảnh xe lấy từ Pexels (xem tệp CREDITS trong thư mục ảnh), được phủ màu bằng CSS. Trang demo không liên kết hay được bảo trợ bởi bất kỳ hãng xe nào.</p>
        <p>© 2026 Vĩ Tốc EV (demo)</p>
      </div>
      <p className={s.wmark} aria-hidden="true">V4 Mưa Rào</p>
    </footer>
  );
}

export function Drawer() {
  const b = useBuild();
  const [hold, setHold] = useState(true);
  const [done, setDone] = useState(false);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!b.drawer) return;
    close.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") b.closeDrawer(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [b.drawer, b]);
  useEffect(() => { if (!b.drawer) setDone(false); }, [b.drawer]);
  const P = PAINTS[b.paint];
  return (
    <>
      <div className={s.scrim} data-open={b.drawer ? "1" : "0"} onClick={b.closeDrawer} aria-hidden="true" />
      <aside className={s.drawer} data-open={b.drawer ? "1" : "0"} role="dialog" aria-modal="true" aria-labelledby="dr-h" aria-hidden={!b.drawer} inert={!b.drawer}>
        <button ref={close} type="button" className={s.x} onClick={b.closeDrawer} aria-label="Đóng">×</button>
        <small>Suất 01 / 50</small>
        <h2 id="dr-h">Giữ suất xe của bạn</h2>
        <div className={s.dPic}><img className={s.img} src={`${IMG}car-grey.webp`} alt="" width={1400} height={1000} loading="lazy" /><i style={{ background: P.tint || "transparent" }} /></div>
        <dl className={s.dRows}>
          <div><dt>Màu thân</dt><dd>{P.name}</dd></div>
          <div><dt>Mâm</dt><dd>{WHEELS[b.wheel].name}</dd></div>
          <div><dt>Nội thất</dt><dd>{INTERIORS[b.interior].name}</dd></div>
          <div><dt>Mã bản dựng</dt><dd>{b.code}</dd></div>
          <div className={s.tot}><dt>Tổng</dt><dd>{fmt(b.total)}</dd></div>
        </dl>
        {done ? <p className={s.dOk} role="status">Đã giữ suất 01/50 (minh hoạ). Chúng tôi sẽ liên hệ để chốt lịch ký hợp đồng.</p> : (<>
          <label className={s.hold}><input type="checkbox" checked={hold} onChange={(e) => setHold(e.target.checked)} /> Giữ suất bằng khoản cọc hoàn lại 50 triệu đồng</label>
          <button type="button" className={s.gold} onClick={() => setDone(true)} disabled={!hold} style={hold ? undefined : { opacity: 0.5 }}>Xác nhận đặt chỗ <i aria-hidden="true">→</i></button>
        </>)}
      </aside>
    </>
  );
}
