import styles from "./brand.module.css";
import { Device } from "./components/Device";
import { Distort } from "./components/Distort";
import { Export } from "./components/Export";
import { Changelog, Compare, Faq, How, Quotes, Who } from "./components/Extra";
import { Final } from "./components/Final";
import { Mcp } from "./components/Mcp";
import { Mark } from "./components/Poster";
import { Motion } from "./components/Motion";
import { Nav } from "./components/Nav";
import { Presets } from "./components/Presets";
import { Pricing } from "./components/Pricing";
import { Ruler } from "./components/Ruler";
import { Shortcut } from "./components/Shortcut";
import { Stage } from "./components/Stage";
import { Walker } from "./components/Walker";

export default function Page() {
  return (
    <div className={styles.tm}>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <div className={styles.loader} aria-hidden="true"><Mark size={46} /></div>
      <Nav />
      <Ruler />
      <main id="main">
        <Stage />
        <Shortcut />
        <Walker />
        <Distort />
        <Mcp />
        <Device />
        <Export />
        <Pricing />
        <Presets />
        <How />
        <Who />
        <Compare />
        <Quotes />
        <Faq />
        <Changelog />
        <Final />
      </main>
      <Motion />
    </div>
  );
}
