import type { Metadata } from "next";
import Link from "next/link";
import credits from "../../../../../public/images/demos/bar-mai-thuong/credits.json";
import s from "../brand.module.css";
import { fontVars } from "../fonts";

export const metadata: Metadata = {
  title: "Ảnh & ghi công · Tầng Mây",
  description: "Danh sách ảnh stock và phông chữ dùng trên trang Tầng Mây.",
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
          <li>Unbounded (SIL Open Font License 1.1), dùng cho tiêu đề.</li>
          <li>Chakra Petch (SIL Open Font License 1.1), dùng cho nội dung.</li>
        </ul>
        <p><Link href="/demos/bar-mai-thuong">Về trang Tầng Mây</Link></p>
      </main>
    </div>
  );
}
