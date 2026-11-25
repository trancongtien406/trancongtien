import Image from "next/image";
import styles from "../brand.module.css";

export function Story() {
  return (
    <section id="story" className={styles.section} aria-labelledby="story-title" data-story>
      <div className={`${styles.container} ${styles.storyGrid}`}>
        <div className={styles.storyArt}>
          <div className={styles.storyArch} data-story-img>
            <Image src="/images/demos/mien-an/ma-story-1200.webp" alt="Nến trắng trong hũ thuỷ tinh, bó lúa khô và khăn be cuộn trong ánh sáng ấm" width={1200} height={800} sizes="(min-width: 1024px) 480px, 90vw" style={{ objectPosition: "68% 50%" }} />
          </div>
        </div>
        <div className={styles.storyText}>
          <p className={styles.eyebrow} data-story-text>The story of Miên An</p>
          <h2 id="story-title" className={styles.h2} data-story-text>
            Chăm sóc cũng là một cách <em>lắng nghe.</em>
          </h2>
          <p data-story-text>
            Miên An bắt đầu từ một mong muốn giản dị: tạo nên khoảng lặng giữa những ngày sống vội. Chúng tôi tin rằng chăm sóc bản thân không nhất thiết phải cầu kỳ, mà có thể bắt đầu từ một hơi thở sâu, một mùi hương quen thuộc hay cảm giác được nghỉ ngơi.
          </p>
          <p data-story-text>
            Lấy cảm hứng từ thiên nhiên và những nghi thức chăm sóc chậm rãi, Miên An hình dung một không gian nơi từng chất liệu, ánh sáng và chuyển động đều hướng về sự cân bằng. Mỗi liệu trình là một lời mời lắng nghe cơ thể, buông bỏ những vội vàng và dành thời gian cho chính mình.
          </p>
          <blockquote className={styles.quote} data-story-text style={{ margin: "6px 0" }}>
            Bởi sự an yên đôi khi bắt đầu từ việc cho phép mình nghỉ ngơi.
          </blockquote>
          <div className={styles.storyFoot} data-story-detail>
            <div className={styles.storyDetail}>
              <Image src="/images/demos/mien-an/ma-detail-600.webp" alt="Nến be, nến hộp đen và cánh hoa khô trên khay gỗ" width={600} height={900} sizes="220px" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.storyFootText}>
              <a href="#sanctuary" className={styles.link}>
                Khám phá không gian <span className={styles.arrow} aria-hidden="true">→</span>
              </a>
              <p className={styles.storyNote}>Câu chuyện thuộc thương hiệu hư cấu, không phản ánh lịch sử hay thành tích có thật.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
