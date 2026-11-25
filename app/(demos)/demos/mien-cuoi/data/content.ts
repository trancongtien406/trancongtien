export const PRINCIPLES = [
  { n: "01", title: "Hiểu trước khi quyết định", body: "Tìm hiểu tình trạng, nhu cầu và các phương án chăm sóc trước khi lựa chọn." },
  { n: "02", title: "Thông tin rõ ràng", body: "Chi phí, quy trình và những điều cần lưu ý nên được trao đổi cụ thể." },
  { n: "03", title: "Tôn trọng từng người", body: "Mỗi người có nhu cầu, điều kiện và mức độ thoải mái khác nhau." },
];

export const SERVICE_LIST = [
  { n: "01", tag: "Preventive care", title: "Khám & chăm sóc định kỳ", body: "Tìm hiểu sức khỏe răng miệng, vệ sinh răng và những thói quen chăm sóc hằng ngày.", need: "checkup", img: "thiet-bi-phong-kham", alt: "Thiết bị và đèn chiếu trong phòng khám nha khoa sáng", pos: "50% 40%" },
  { n: "02", tag: "Restorative care", title: "Trám & phục hồi răng", body: "Tìm hiểu các phương án phục hồi khi răng có tổn thương hoặc cần được kiểm tra thêm.", need: "restoration", img: "gia-dung-cu", alt: "Giá dụng cụ nha khoa inox xếp hàng", pos: "50% 30%" },
  { n: "03", tag: "Orthodontics", title: "Chỉnh nha", body: "Trao đổi về vị trí răng, khớp cắn và các phương án chỉnh nha có thể phù hợp.", need: "orthodontics", img: "guong-nha-khoa", alt: "Gương và dụng cụ nha khoa trên nền xám", pos: "40% 50%" },
  { n: "04", tag: "Aesthetic care", title: "Tẩy trắng răng", body: "Tìm hiểu tình trạng màu răng, các lựa chọn chăm sóc và những giới hạn cần cân nhắc.", need: "whitening", img: "nu-cuoi-can-canh", alt: "Cận cảnh nụ cười tự nhiên", pos: "50% 55%" },
  { n: "05", tag: "Tooth pain", title: "Khám đau & ê buốt", body: "Thăm khám để tìm hiểu nguyên nhân gây khó chịu và trao đổi về bước chăm sóc tiếp theo.", need: "pain", img: "may-nha-khoa", alt: "Cận cảnh thiết bị nha khoa", pos: "50% 50%" },
  { n: "06", tag: "Oral surgery consultation", title: "Tư vấn nhổ răng", body: "Đánh giá tình trạng răng và cân nhắc các lựa chọn trước khi quyết định có cần nhổ hay không.", need: "extraction", img: "khay-dung-cu-xanh", alt: "Dụng cụ inox xếp trên khăn xanh nhạt", pos: "50% 50%" },
] as const;

export const PROCESS = [
  { n: "01", title: "Lắng nghe", body: "Chia sẻ nhu cầu, những khó chịu và điều bạn đang băn khoăn." },
  { n: "02", title: "Thăm khám", body: "Bác sĩ đánh giá tình trạng răng miệng và cân nhắc kiểm tra bổ sung khi cần." },
  { n: "03", title: "Trao đổi", body: "Tìm hiểu phương án, chi phí dự kiến, lợi ích và những giới hạn." },
  { n: "04", title: "Chăm sóc", body: "Thống nhất bước tiếp theo và hướng dẫn theo dõi phù hợp." },
];

export const TEAM = [
  { id: "minh-an", name: "BS. Minh An", role: "Nha khoa tổng quát", body: "Đồng hành trong các buổi khám định kỳ, đánh giá răng miệng và tư vấn chăm sóc tổng quát.", service: "checkup" },
  { id: "thanh-lam", name: "BS. Thanh Lam", role: "Tư vấn chỉnh nha", body: "Đồng hành trong các buổi tìm hiểu chỉnh nha, vị trí răng và khớp cắn.", service: "orthodontics" },
  { id: "hoai-nam", name: "BS. Hoài Nam", role: "Tư vấn phục hồi răng", body: "Đồng hành trong các buổi tư vấn phục hồi, kiểm tra răng tổn thương và cân nhắc nhổ răng.", service: "restoration" },
];

export const FAQ = [
  { q: "Lần đầu đến nha khoa cần chuẩn bị gì?", a: "Bạn có thể ghi lại những vấn đề răng miệng đang gặp, danh sách thuốc đang sử dụng và thông tin dị ứng nếu có. Mang theo hồ sơ nha khoa trước đây sẽ giúp bác sĩ có thêm thông tin để đánh giá. Đừng ngần ngại chia sẻ những điều khiến bạn lo lắng trước khi thăm khám." },
  { q: "Tôi chưa biết mình cần dịch vụ nào thì sao?", a: "Bạn có thể bắt đầu bằng một buổi khám tổng quát tại cơ sở nha khoa thực tế để được đánh giá tình trạng răng miệng. Công cụ Care Navigator trên website giúp bạn tìm hiểu các nhóm dịch vụ và chuẩn bị câu hỏi. Kết quả chỉ mang tính định hướng, không thay thế chẩn đoán của bác sĩ." },
  { q: "Đi khám răng có đau không?", a: "Mức độ khó chịu có thể khác nhau tuỳ tình trạng răng miệng, thủ thuật và độ nhạy cảm của mỗi người. Bạn nên chia sẻ những lo lắng hoặc trải nghiệm trước đây để bác sĩ cân nhắc phương án kiểm soát đau phù hợp. Hãy báo cho bác sĩ nếu cảm thấy khó chịu trong lúc thăm khám." },
  { q: "Có thể biết chính xác chi phí trước khi khám không?", a: "Chi phí thực tế phụ thuộc vào tình trạng răng miệng, phương án điều trị và các kiểm tra bổ sung nếu cần. Bạn nên trao đổi với cơ sở nha khoa về chi phí dự kiến và những khoản có thể phát sinh trước khi quyết định. Bảng giá trên website chỉ mang tính tham khảo." },
  { q: "Bao lâu nên khám răng một lần?", a: "Tần suất thăm khám phụ thuộc vào tình trạng sức khoẻ răng miệng, độ tuổi, thói quen chăm sóc và các yếu tố nguy cơ của mỗi người. Sau khi đánh giá, bác sĩ có thể đề xuất khoảng thời gian kiểm tra phù hợp. Nếu xuất hiện triệu chứng bất thường, bạn không nên chờ đến lịch khám định kỳ." },
  { q: "Tôi có cần nhịn ăn trước khi đến nha khoa không?", a: "Không có yêu cầu nhịn ăn chung cho mọi buổi khám nha khoa. Một số thủ thuật hoặc phương pháp gây mê, an thần có thể cần hướng dẫn chuẩn bị riêng. Bạn nên xác nhận với cơ sở điều trị trước buổi hẹn và không tự ý ngừng thuốc đang dùng." },
  { q: "Lịch hẹn trên website có được gửi đến bác sĩ không?", a: "Chưa. Công cụ chỉ tạo bản tóm tắt lịch hẹn ngay trên trình duyệt, không tạo yêu cầu đặt lịch và không gửi thông tin đến bất kỳ cơ sở y tế nào. Lịch hẹn chỉ có hiệu lực khi được cơ sở xác nhận." },
  { q: "Nếu tôi đang có dấu hiệu nghiêm trọng thì sao?", a: "Nếu bạn khó thở, khó nuốt, chảy máu nhiều không cầm được, sưng lan vùng mắt hoặc cổ, hay gặp chấn thương nghiêm trọng vùng mặt, hãy đến cơ sở cấp cứu ngay hoặc gọi 115 tại Việt Nam. Nếu đau răng dữ dội, sưng má, sốt kèm vấn đề răng miệng hoặc răng vĩnh viễn bị bật khỏi ổ, hãy tìm hỗ trợ nha khoa khẩn cấp. Không dùng Care Navigator hoặc lịch hẹn trên website để trì hoãn việc tìm kiếm chăm sóc thực tế." },
];
