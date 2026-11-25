import type { Metadata } from "next";
import Link from "next/link";
import credits from "../../../../../public/images/demos/ruou-vang/credits.json";
import s from "../brand.module.css";
import { fontVars } from "../fonts";

export const metadata: Metadata = {
  title: "Ảnh & ghi công · Mộc Vang",
  description: "Danh sách ảnh stock và phông chữ dùng trên trang Mộc Vang.",
};

export default function CreditsPage() {
  return (
    <div className={`${fontVars} ${s.brand} ${s.creditsPage}`}>
      <main className={s.wrap} id="main">
        <p className={s.kicker}>Ảnh &amp; ghi công</p>
        <h1 className={s.h2}>Ghi công ảnh và phông chữ</h1>
        <p className={s.mutedP}>
          Thương hiệu, nội dung và hình ảnh trên trang này do Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.
        </p>
        <ul className={s.creditList}>
          {credits.map((c) => (
            <li key={c.file}>
              <b>{c.title}</b> · {c.author} · {c.license} ·{" "}
              <a href={c.sourceUrl} rel="noopener noreferrer" target="_blank">Nguồn</a>
              <br /><small>{c.alt}</small>
            </li>
          ))}
        </ul>
        <h2 className={s.h3}>Phông chữ</h2>
        <ul className={s.creditList}>
          <li>Noto Serif Display (SIL Open Font License 1.1), dùng cho tiêu đề.</li>
          <li>Nunito Sans (SIL Open Font License 1.1), dùng cho nội dung.</li>
        </ul>
        <p><Link href="/demos/ruou-vang">Về trang Mộc Vang</Link></p>
      </main>
    </div>
  );
}
