import styles from "./brand.module.css";
import { Stage } from "./components/Stage";
import { After } from "./components/After";
import { Nav } from "./components/Nav";
import { Extra, Footer } from "./components/Extra";

export default function Page() {
  return (
    <div className={styles.root}>
      <a className={styles.skip} href="#giay">Bỏ qua, tới bộ sưu tập giày</a>
      <Nav />
      <main>
        <Stage />
        <After />
        <Extra />
      </main>
      <Footer />
    </div>
  );
}
