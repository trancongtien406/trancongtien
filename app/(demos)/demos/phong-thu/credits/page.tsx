import type { Metadata } from "next";
import Link from "next/link";
import credits from "../../../../../public/images/demos/phong-thu/credits.json";
import s from "../brand.module.css";
import { fontVars } from "../fonts";

export const metadata: Metadata = {
  title: "Ảnh & ghi công · Tần Số Studio",
  description: "Danh sách ảnh stock và phông chữ dùng trên trang Tần Số Studio.",
};

export default function CreditsPage() {
  return (
    <div className={`${fontVars} ${s.brand} ${s.creditsPage}`}>
      <main className={s.wrap} id="main">
        <p className={`${s.mono} ${s.chTag}`}>Ảnh &amp; ghi công</p>
        <h1 className={s.h2}>Ghi công ảnh và phông chữ</h1>
        <p className={s.lead2}>
          Thương hiệu, nội dung và hình ảnh trên trang này do Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.
        </p>
        <ul className={s.creditList}>
          {credits.map((c) => (
            <li key={c.file}>
              <b>{c.title}</b> · {c.author} · {c.license} · <a href={c.sourceUrl} rel="noopener noreferrer" target="_blank">Nguồn</a>
              <br /><small>{c.alt}</small>
            </li>
          ))}
        </ul>
        <h2 className={s.h4}>Phông chữ</h2>
        <ul className={s.creditList}>
          <li>Archivo (SIL Open Font License 1.1), dùng cho tiêu đề.</li>
          <li>Epilogue (SIL Open Font License 1.1), dùng cho nội dung.</li>
          <li>JetBrains Mono (SIL Open Font License 1.1), dùng cho nhãn kỹ thuật.</li>
        </ul>
        <p><Link href="/demos/phong-thu">Về trang Tần Số Studio</Link></p>
      </main>
    </div>
  );
}
