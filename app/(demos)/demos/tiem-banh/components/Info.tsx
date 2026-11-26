import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { Treat } from "./Treat";

const SEASONS = [
  { when: "Quanh năm", t: "Bánh sinh nhật", d: "Kem Dâu Mây, Socola Hạt Dẻ, Trà Xanh Mật Ong và Nhung Đỏ, size 14cm đến 2 tầng.", lead: "Đặt trước 2 ngày", kind: "cake" as const, colors: ["#F6D49B", "#FFE3EC", "#FF5E86"] as [string, string, string], bg: "var(--mk-butter)" },
  { when: "Tháng 4 – 7", t: "Mùa xoài", d: "Xoài Chanh Dây đổi sang xoài chín theo mùa, panna cotta sốt xoài và tart xoài.", lead: "Đặt trước 2 ngày", kind: "tart" as const, colors: ["#FFE08A", "#FFCB5C", "#FFF3EC"] as [string, string, string], bg: "var(--mk-pink-soft)" },
  { when: "Tháng 11 – 2", t: "Mùa dâu", d: "Bánh kem dâu tươi, tart dâu kem sữa và su kem nhân dâu khi dâu về đẹp.", lead: "Đặt trước 2 ngày", kind: "cupcake" as const, colors: ["#F6D49B", "#FF8FAE", "#FF5E86"] as [string, string, string], bg: "var(--mk-lilac)" },
  { when: "14/2, 8/3, 20/10", t: "Hộp quà macaron", d: "Hộp macaron 6 hoặc 12 chiếc, xếp hộp quà có thiệp và dây ruy băng.", lead: "Đặt trước 3 ngày", kind: "macaron" as const, colors: ["#FF8FAE", "#8FE0BE", "#FFE27D"] as [string, string, string], bg: "var(--mk-mint)" },
  { when: "Rằm Trung thu", t: "Bánh nướng mini", d: "Bánh nướng, bánh dẻo nhân đậu xanh, khoai môn và trứng muối, đóng hộp 4 chiếc.", lead: "Đặt trước 5 ngày", kind: "tart" as const, colors: ["#D79A5B", "#F6C97F", "#FFF3EC"] as [string, string, string], bg: "var(--mk-peach-2)" },
  { when: "Noel, cuối năm", t: "Bánh log & cookie hộp thiếc", d: "Bánh log socola, cookie bơ trang trí hình thông và hộp thiếc làm quà.", lead: "Đặt trước 5 ngày", kind: "cookie" as const, colors: ["#7A4630", "#D79A5B", "#FFF3EC"] as [string, string, string], bg: "var(--mk-butter)" },
];

export function Seasons() {
  return (
    <section className={`${s.sec} ${s.secChoco}`} id="mua-dip" aria-labelledby="h-season">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Bánh theo mùa &amp; dịp</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-season">Mùa nào bánh nấy, dịp lễ đặt sớm hơn</h2>
          <p className={s.leadLight}>Nguyên liệu theo mùa đổi vị bánh trong tủ. Dịp lễ lớn tiệm nhận số lượng có hạn nên cần báo trước lâu hơn ngày thường.</p>
        </div>
        <ul className={s.seasonGrid}>
          {SEASONS.map((x) => (
            <li key={x.t} className={s.season} data-mk="pop" style={{ background: x.bg }}>
              <Treat kind={x.kind} colors={x.colors} className={s.seasonArt} />
              <span className={s.seasonWhen}>{x.when}</span>
              <h3 className={`${s.display} ${s.h3}`}>{x.t}</h3>
              <p>{x.d}</p>
              <b className={s.seasonLead}>{x.lead}</b>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const CARE = [
  { t: "Nhận tại tiệm", d: "Nhận bánh đặt từ 8:00 đến 20:30. Báo giờ đến để tiệm lấy bánh ra khỏi tủ lạnh đúng lúc." },
  { t: "Giao nội thành", d: "Giao tận nơi trong nội thành Đà Nẵng bằng xe máy có thùng giữ lạnh. Phí tính theo khoảng cách, báo khi xác nhận đơn." },
  { t: "Bảo quản bánh kem", d: "Để ngăn mát 2 đến 6 độ C, dùng ngon nhất trong ngày nhận, tối đa 48 giờ. Lấy ra khỏi tủ 15 phút trước khi cắt." },
  { t: "Dị ứng & thành phần", d: "Bếp dùng bột mì, trứng, sữa, bơ. Macaron và một số bánh có hạnh nhân, hạt dẻ. Ghi rõ dị ứng khi đặt, tiệm không đảm bảo bánh không có vết hạt." },
];

export function Care() {
  return (
    <section className={`${s.sec} ${s.secButter}`} id="giao-nhan" aria-labelledby="h-care">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Giao nhận &amp; bảo quản</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-care">Nhận bánh, giao bánh và giữ bánh cho đúng</h2>
        </div>
        <ul className={s.careGrid}>
          {CARE.map((c) => (
            <li key={c.t} className={s.care} data-mk="pop"><h3 className={`${s.display} ${s.h3}`}>{c.t}</h3><p>{c.d}</p></li>
          ))}
        </ul>
        <div className={s.hoursBox}>
          <div><b>Giờ bán</b><span>7:00 – 21:00 hằng ngày, kể cả lễ</span></div>
          <div><b>Đặt bánh</b><span>Gửi yêu cầu qua form, tiệm phản hồi trong ngày</span></div>
          <div><b>Đặt cọc</b><span>50% với bánh 2 tầng, bánh vẽ riêng và đơn dịp lễ</span></div>
          <a className={`${s.btn} ${s.btnChoco}`} href={buildConsultHref("tiem-banh")}>Gửi yêu cầu đặt bánh</a>
        </div>
      </div>
    </section>
  );
}
