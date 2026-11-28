import styles from "./brand.module.css";
import { Stage } from "./components/Stage";
import { After } from "./components/After";
import { RevealInit, SiteNav } from "./components/Interactive";

export default function Page() {
  return (
    <div className={styles.root}>
      <a className={styles.skip} href="#tinh-nang">Bỏ qua, tới nội dung chi tiết</a>
      <SiteNav />
      <main>
        <Stage />
        <After />
      </main>
      <RevealInit />
    </div>
  );
}
