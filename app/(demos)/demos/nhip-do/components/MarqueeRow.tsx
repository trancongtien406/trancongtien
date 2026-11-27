import styles from "../brand.module.css";

/** Một dải chữ chạy vô hạn. Hai bản sao giống nhau, bản thứ hai ẩn khỏi trình đọc màn hình. */
export function MarqueeRow({ words, dir = -1, speed = 90, tone = "solid" }: { words: string[]; dir?: 1 | -1; speed?: number; tone?: "solid" | "line" | "accent" }) {
  const copy = (hidden: boolean) => (
    <p className={styles.vmCopy} data-copy aria-hidden={hidden || undefined}>
      {[0, 1, 2].flatMap((r) => words.map((w, i) => (
        <span key={`${r}-${i}`}>{w}<i aria-hidden="true">/</i></span>
      )))}
    </p>
  );
  return (
    <div className={styles.vm} data-vm data-dir={dir} data-speed={speed} data-tone={tone}>
      <div className={styles.vmTrack} data-track>
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}
