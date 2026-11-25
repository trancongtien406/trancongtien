import s from "../brand.module.css";

const NAV = [
  ["#tu-ben-toi-ban", "Từ bến tới bàn"],
  ["#mon-noi-bat", "Món nổi bật"],
  ["#ghep-thuc-don", "Ghép thực đơn"],
  ["#khong-gian", "Không gian"],
  ["#hoi-dap", "Hỏi đáp"],
] as const;

export function Header() {
  return (
    <header className={`${s.header} ${s.noPrint}`}>
      <div className={`${s.wrap} ${s.headerRow}`}>
        <a className={s.logoLink} href="/demos/ben-vi" aria-label="Bến Vị, về đầu trang">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/ben-vi/identity/logo-reversed.svg" alt="Bến Vị" width={273} height={46} />
        </a>
        <nav className={s.nav} aria-label="Điều hướng chính">
          {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <a className={`${s.btn} ${s.btnGold} ${s.headerCta}`} href="#dat-ban">Đặt bàn</a>
      </div>
    </header>
  );
}
