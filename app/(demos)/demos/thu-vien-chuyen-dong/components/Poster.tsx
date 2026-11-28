import type { CSSProperties } from "react";

/** 8 mẫu poster vẽ bằng HTML/CSS (cỡ chữ theo cqw nên co giãn theo chiều rộng poster). */
const K = ["mod", "signal", "upward", "paper", "nor", "red", "sky", "rr"] as const;
const ALT = [
  "Poster Tối giản cho hôm nay: chữ đen đậm, khối đỏ, người mẫu áo khoác xám",
  "Poster Tín hiệu: nền đen với vệt sáng đỏ chéo",
  "Poster Vươn lên: cầu thang đỏ sẫm nhìn từ trên xuống",
  "Poster Giấy cất cánh: máy bay giấy đỏ trên nền xám xanh",
  "Poster NØR: chân dung đen trắng trên nền be",
  "Poster nền đỏ: người mẫu ngồi xổm",
  "Poster hai người đứng trên bậc thềm dưới trời xanh",
  "Poster chữ R đỏ khổng lồ cùng người mặc áo khoác đỏ mờ",
];
const IMG = "/images/demos/thu-vien-chuyen-dong/poster-";

export function Poster({ v, style, label, flat = false }: { v: number; style?: CSSProperties; label?: string; flat?: boolean }) {
  const i = ((v % 8) + 8) % 8;
  const k = K[i];
  return (
    <div className={`tm-p tm-p-${k}${flat ? " tm-flat" : ""}`} style={style} role="img" aria-label={label ?? ALT[i]}>
      {k === "mod" && (<>
        <b className="tm-t">Tối giản<br />cho hôm<br />nay</b>
        <i className="tm-blk" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tm-ph" src={`${IMG}16.webp`} alt="" width={360} height={480} decoding="async" draggable={false} />
        <small className="tm-meta">ÍT ỒN<br />NHIỀU Ý NGHĨA</small>
      </>)}
      {k === "signal" && (<><i className="tm-streak" /><i className="tm-rays" /><small className="tm-meta tm-tr">HỘI TRƯỜNG 4<br />13.03.2026 · 22 GIỜ</small><b className="tm-serif">Tín hiệu</b></>)}
      {k === "upward" && (<><i className="tm-n1" /><i className="tm-n2" /><i className="tm-n3" /><i className="tm-n4" /><i className="tm-n5" /><b className="tm-slab">Vươn lên</b></>)}
      {k === "paper" && (<>
        <svg className="tm-plane" viewBox="0 0 100 40" aria-hidden="true"><path d="M2 20 98 2 52 38 44 24Z" fill="#d11f2e" /><path d="M44 24 98 2 52 38Z" fill="#a3121e" /><path d="M2 20 44 24 40 30Z" fill="#e8505b" /></svg>
        <b className="tm-t">Giấy<br />Cất<br />Cánh</b>
      </>)}
      {k === "nor" && (<>
        <b className="tm-nor">NØR</b>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tm-ph" src={`${IMG}02.webp`} alt="" width={360} height={480} decoding="async" draggable={false} />
        <small className="tm-meta">ÍT HƠN<br />NHIỀU HƠN<br />CON NGƯỜI</small>
      </>)}
      {k === "red" && (<>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tm-ph" src={`${IMG}05.webp`} alt="" width={360} height={480} decoding="async" draggable={false} />
        <small className="tm-meta tm-tr">MÙA MỚI</small>
      </>)}
      {k === "sky" && (<>
        <svg className="tm-fig" viewBox="0 0 100 133" aria-hidden="true" preserveAspectRatio="xMidYMax slice">
          <path d="M0 110 38 98 100 108 100 133 0 133Z" fill="#e9e6df" /><path d="M0 110 38 98 100 108 100 112 38 103 0 114Z" fill="#b9b5ac" />
          <g fill="#0c0d10"><circle cx="43" cy="55" r="3.4" /><path d="M39 60h8l3 22-1 20H37l-1-20Z" /><circle cx="56" cy="55" r="3.4" /><path d="M52 60h8l3 22-1 20H50l-1-20Z" /></g>
        </svg>
      </>)}
      {k === "rr" && (<>
        <b className="tm-bigR">R</b>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="tm-ph" src={`${IMG}01.webp`} alt="" width={360} height={480} decoding="async" draggable={false} />
        <small className="tm-meta tm-vert">XÂY DỰNG · MÙA THU 2027</small>
      </>)}
    </div>
  );
}

/** Logo: hai quyển poster xếp quạt (tự vẽ). */
export function Mark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 40 25" aria-hidden="true">
      <g fill="currentColor"><path d="M1 6 9 4v18L1 21Z" opacity=".5" /><path d="M10 3 19 1v22l-9-2Z" /><path d="M21 1l9 2v18l-9 2Z" /><path d="M31 4l8 2v15l-8 1Z" opacity=".5" /></g>
    </svg>
  );
}
