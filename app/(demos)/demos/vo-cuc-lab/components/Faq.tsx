import styles from "../brand.module.css";

const FAQ: [string, string][] = [
  ["Bao lâu để có bản chạy thử?", "Thông thường 2 đến 3 tuần kể từ khi chốt bài toán. Bản chạy thử dùng dữ liệu thật ở quy mô nhỏ để bạn kiểm chứng giá trị trước khi quyết định đầu tư lớn hơn."],
  ["Chúng tôi chưa có dữ liệu thì sao?", "Vẫn bắt đầu được. Ở bước khám phá chúng tôi cùng bạn đánh giá dữ liệu hiện có, đề xuất cách thu thập tối thiểu và dùng dữ liệu tổng hợp để dựng mẫu thử đầu tiên."],
  ["Dữ liệu của chúng tôi có được dùng để huấn luyện mô hình chung không?", "Không. Dữ liệu của bạn thuộc về bạn. Chúng tôi có thể triển khai tại hạ tầng riêng hoặc dùng mô hình có cam kết không lưu trữ và không huấn luyện từ dữ liệu khách hàng."],
  ["Bên bạn dùng mô hình AI nào?", "Chúng tôi chọn theo bài toán: mô hình thương mại qua API, mô hình mã nguồn mở chạy riêng hoặc kết hợp. Bộ đánh giá Atom So Sánh giúp chọn dựa trên số liệu, không dựa trên cảm tính."],
  ["Chi phí vận hành AI sau khi ra mắt có tăng vọt không?", "Chúng tôi thiết kế bộ nhớ đệm, định tuyến mô hình và giới hạn chi tiêu từ đầu, kèm bảng điều khiển chi phí theo từng tính năng để bạn luôn biết tiền đi đâu."],
  ["Chúng tôi có sở hữu mã nguồn không?", "Có. Mã nguồn, tài liệu và quyền sở hữu trí tuệ được bàn giao đầy đủ khi thanh toán. Chúng tôi cũng tổ chức buổi đào tạo để đội ngũ của bạn tự vận hành."],
  ["Bạn có làm việc với đội ngũ nội bộ sẵn có không?", "Có. Nhiều dự án chúng tôi làm chung với kỹ sư của khách hàng: chúng tôi dẫn dắt phần AI và thiết kế, còn phần tích hợp được chia việc rõ ràng."],
  ["Ngoài Việt Nam, bạn phục vụ khách hàng ở đâu?", "Đội ngũ làm việc với khách hàng ở Đông Nam Á, Úc và Bắc Mỹ. Chúng tôi sắp xếp giờ họp chồng giờ và tài liệu song ngữ Việt - Anh khi cần."],
];

export function Faq() {
  return (
    <section id="vc-faq" className={styles.sec} aria-labelledby="vc-h-faq">
      <div className={styles.secHead} data-vc-in>
        <p className={styles.eyebrow}>Câu hỏi thường gặp</p>
        <h2 id="vc-h-faq" className={styles.h2big}>Những điều khách hàng hay hỏi trước khi bắt đầu</h2>
      </div>
      <div className={styles.faq} data-vc-in>
        {FAQ.map(([q, a], i) => (
          <details key={q} open={i === 0}><summary>{q}<i aria-hidden="true">+</i></summary><p>{a}</p></details>
        ))}
      </div>
    </section>
  );
}
