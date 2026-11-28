import styles from "./brand.module.css";
import { Site } from "./components/Site";

export default function Page() {
  return (
    <div className={styles.tc}>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Site />
    </div>
  );
}
