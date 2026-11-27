import type { ReactNode } from "react";

/** "Ảnh" nghệ thuật vẽ bằng SVG, đóng vai ảnh chụp placeholder. Cắt bằng slice nên không méo khi đổi khung. */
export const PHOTOS = [
  { t: "Giờ vàng, Sơn Trà", y: "2025", p: "Đà Nẵng", a: "4 / 5", d: "Ánh nắng cuối ngày ép dải đồi thành những lớp mỏng. Khung hình được chờ gần một giờ cho tới khi mặt trời chạm vạch ngang." },
  { t: "Bóng phố", y: "2024", p: "Hội An", a: "3 / 4", d: "Bức tường vàng nhạt, ba vệt bóng chéo đi qua. Không có người, chỉ có nhịp của ánh sáng." },
  { t: "Mặt nước thở", y: "2025", p: "Hồ Phú Ninh", a: "1 / 1", d: "Những vòng sóng tròn trên mặt hồ lặng, chụp lúc gió vừa dừng." },
  { t: "Bậc thang", y: "2023", p: "Huế", a: "4 / 5", d: "Hình học của một cầu thang cũ, nhìn từ trên xuống, đồng tâm như một hơi thở sâu." },
  { t: "Nghiêng", y: "2026", p: "Studio Đường Nét", a: "3 / 4", d: "Chân dung nhìn nghiêng, ánh sáng đơn từ bên trái, nền trung tính. Ảnh minh hoạ, không có người thật." },
  { t: "Sương sớm", y: "2024", p: "Bà Nà", a: "4 / 3", d: "Những vòng sương chồng lên nhau trên nền rừng xanh xám; ảnh nhoè có chủ đích." },
  { t: "Gạch hoa", y: "2025", p: "Nhà cổ Phố Hội", a: "1 / 1", d: "Hoạ tiết gạch men còn sót lại, chụp thẳng góc, cắt sát mép." },
  { t: "Đêm mưa", y: "2026", p: "Hải Châu", a: "3 / 4", d: "Đèn đường nhoè qua kính ướt, những vệt mưa dọc kéo ánh sáng thành sợi." },
  { t: "Cồn cát", y: "2023", p: "Mũi Né", a: "4 / 3", d: "Hai đường cong của cồn cát gặp nhau ở một điểm, ánh sáng xiên làm nổi gợn." },
];

const W = 400, H = 500;
function Frame({ id, children }: { id: number; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" role="presentation" focusable="false" style={{ display: "block" }}>
      {children}
      <filter id={`dng${id}`}><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed={id + 3} /><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 0" /></filter>
      <rect width={W} height={H} filter={`url(#dng${id})`} opacity=".22" />
    </svg>
  );
}

export function Art({ i }: { i: number }) {
  const k = i % PHOTOS.length;
  switch (k) {
    case 0: return (<Frame id={k}><defs><linearGradient id="dn0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f6d49b" /><stop offset=".6" stopColor="#e0885a" /><stop offset="1" stopColor="#6a3b3b" /></linearGradient></defs><rect width={W} height={H} fill="url(#dn0)" /><circle cx="250" cy="250" r="64" fill="#fff3d6" opacity=".95" /><path d="M0 330 Q90 280 180 320 T400 300 V500H0Z" fill="#4a2b36" /><path d="M0 390 Q120 340 240 385 T400 370 V500H0Z" fill="#241721" /></Frame>);
    case 1: return (<Frame id={k}><rect width={W} height={H} fill="#d9c08f" />{[0, 1, 2].map((n) => (<polygon key={n} points={`${-60 + n * 150},0 ${40 + n * 150},0 ${360 + n * 150},${H} ${260 + n * 150},${H}`} fill="#171717" opacity={0.55 - n * 0.14} />))}<rect x="0" y="420" width={W} height="80" fill="#a68a64" opacity=".5" /></Frame>);
    case 2: return (<Frame id={k}><rect width={W} height={H} fill="#334a52" />{[0, 1, 2, 3, 4, 5].map((n) => (<ellipse key={n} cx="200" cy="270" rx={30 + n * 34} ry={10 + n * 11} fill="none" stroke="#d6efe9" strokeWidth="1.5" opacity={0.9 - n * 0.13} />))}<rect y="0" width={W} height="150" fill="#1d2b30" opacity=".5" /></Frame>);
    case 3: return (<Frame id={k}><rect width={W} height={H} fill="#cfc6b4" />{[0, 1, 2, 3, 4, 5, 6].map((n) => (<rect key={n} x={30 + n * 24} y={50 + n * 30} width={340 - n * 48} height={400 - n * 60} fill="none" stroke="#171717" strokeWidth="3" opacity={1 - n * 0.1} />))}<rect x="174" y="230" width="52" height="40" fill="#a68a64" /></Frame>);
    case 4: return (<Frame id={k}><defs><linearGradient id="dn4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8a7a68" /><stop offset="1" stopColor="#2a2622" /></linearGradient></defs><rect width={W} height={H} fill="url(#dn4)" /><path d="M250 90 C170 90 150 180 175 240 C150 255 140 300 150 330 C120 420 150 500 150 500 H400 V300 C330 280 330 120 250 90Z" fill="#171717" opacity=".85" /><path d="M250 90 C200 100 190 170 205 215" stroke="#ede9e0" strokeWidth="2" fill="none" opacity=".7" /></Frame>);
    case 5: return (<Frame id={k}><rect width={W} height={H} fill="#3b4a42" />{[[100, 140, 120], [260, 200, 160], [180, 330, 140], [320, 380, 90], [70, 420, 80]].map(([x, y, r], n) => (<circle key={n} cx={x} cy={y} r={r} fill={n % 2 ? "#b9c8b8" : "#7f9784"} opacity=".28" />))}<rect y="360" width={W} height="140" fill="#1e2823" opacity=".65" /></Frame>);
    case 6: return (<Frame id={k}><rect width={W} height={H} fill="#e8dfcb" />{Array.from({ length: 30 }).map((_, n) => { const x = (n % 5) * 80, y = Math.floor(n / 5) * 84 - 10; return (<g key={n} transform={`translate(${x} ${y})`}><rect x="4" y="4" width="72" height="76" fill="none" stroke="#a68a64" strokeWidth="1.5" /><path d="M40 4 L76 42 L40 80 L4 42Z" fill={n % 2 ? "#171717" : "#a68a64"} opacity=".8" /><circle cx="40" cy="42" r="8" fill="#ede9e0" /></g>); })}</Frame>);
    case 7: return (<Frame id={k}><rect width={W} height={H} fill="#0f1319" />{[[90, 160, 46, "#f6c97a"], [250, 120, 70, "#ff8f6b"], [320, 280, 40, "#7ec8ff"], [140, 330, 60, "#ffd9a0"], [60, 430, 34, "#ff6b9d"]].map(([x, y, r, c], n) => (<circle key={n} cx={x as number} cy={y as number} r={r as number} fill={c as string} opacity=".55" />))}{Array.from({ length: 26 }).map((_, n) => (<line key={n} x1={n * 16 + 4} y1={(n * 37) % 200} x2={n * 16 - 6} y2={((n * 37) % 200) + 220} stroke="#cfe3f5" strokeWidth="1" opacity=".22" />))}</Frame>);
    default: return (<Frame id={k}><defs><linearGradient id="dn8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0c98e" /><stop offset="1" stopColor="#b5733f" /></linearGradient></defs><rect width={W} height={H} fill="url(#dn8)" /><path d="M-10 380 C100 150 220 250 410 120 V500 H-10Z" fill="#8c4f2b" /><path d="M-10 380 C100 150 220 250 410 120" stroke="#fbe3b6" strokeWidth="3" fill="none" /><path d="M-10 450 C140 330 260 420 410 330 V500 H-10Z" fill="#5e3119" /></Frame>);
  }
}
