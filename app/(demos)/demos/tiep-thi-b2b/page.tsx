import styles from "./brand.module.css";
import { Site } from "./components/Site";

export default function Page() {
  return (
    <div className={styles.root}>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung chính</a>
      <Site />
    </div>
  );
}
