/** Nội dung phòng khám nha khoa Miền Cười. Thông tin chung, không chẩn đoán, không cam kết kết quả. */

export const SERVICE_LIST = [
  { n: "01", tag: "Phòng ngừa", title: "Khám và lấy cao răng", body: "Khám tổng quát răng nướu, lấy cao răng và đánh bóng, hướng dẫn cách chải răng và dùng chỉ nha khoa.", meta: ["Khoảng 30 phút", "Giá tham khảo từ 300.000₫"], need: "scaling", svc: "hygiene", img: "thiet-bi-phong-kham", alt: "Thiết bị và đèn chiếu trong phòng khám nha khoa sáng", pos: "50% 40%" },
  { n: "02", tag: "Phục hồi", title: "Trám răng", body: "Làm sạch phần răng tổn thương rồi trám lại để khôi phục hình dạng và chức năng ăn nhai. Số răng và vật liệu do bác sĩ cân nhắc sau khi khám.", meta: ["30 đến 60 phút mỗi răng", "Giá tham khảo từ 350.000₫"], need: "restoration", svc: "restoration", img: "gia-dung-cu", alt: "Giá dụng cụ nha khoa inox xếp hàng", pos: "50% 30%" },
  { n: "03", tag: "Tiểu phẫu", title: "Nhổ răng", body: "Bác sĩ khám, xem phim khi cần và trao đổi có nên nhổ hay không. Trường hợp răng khôn hoặc răng mọc lệch được đánh giá riêng.", meta: ["Tư vấn khoảng 45 phút", "Giá tư vấn tham khảo từ 200.000₫"], need: "extraction", svc: "extraction", img: "khay-dung-cu-xanh", alt: "Dụng cụ inox xếp trên khăn xanh nhạt", pos: "50% 50%" },
  { n: "04", tag: "Chỉnh nha", title: "Niềng răng", body: "Trao đổi về vị trí răng, khớp cắn và các phương án niềng (mắc cài, khay trong suốt). Thời gian và chi phí tuỳ từng trường hợp.", meta: ["Tư vấn khoảng 45 phút", "Giá tư vấn tham khảo từ 250.000₫"], need: "orthodontics", svc: "orthodontics", img: "guong-nha-khoa", alt: "Gương và dụng cụ nha khoa trên nền xám", pos: "40% 50%" },
  { n: "05", tag: "Thẩm mỹ", title: "Tẩy trắng răng", body: "Kiểm tra tình trạng men răng và độ nhạy cảm trước khi tư vấn phương pháp tẩy trắng tại phòng khám. Mức thay đổi màu răng khác nhau ở mỗi người.", meta: ["Khoảng 60 phút mỗi buổi", "Giá tham khảo 2.000.000₫ đến 3.500.000₫"], need: "whitening", svc: "whitening", img: "nu-cuoi-can-canh", alt: "Cận cảnh nụ cười tự nhiên", pos: "50% 55%" },
  { n: "06", tag: "Phục hồi răng mất", title: "Implant (trồng răng)", body: "Giới thiệu chung về trồng răng implant: cần kiểm tra xương hàm, nướu và bệnh nền trước khi có kế hoạch. Chỉ tư vấn, chưa có chỉ định khi chưa khám.", meta: ["Tư vấn khoảng 45 phút", "Giá tư vấn tham khảo từ 250.000₫"], need: "implant", svc: "implant", img: "may-nha-khoa", alt: "Cận cảnh thiết bị nha khoa", pos: "50% 50%" },
] as const;

/** Sơ đồ hàm răng: vùng quan tâm và các dịch vụ thường được hỏi. */
export const REGIONS = [
  { id: "gum", label: "Nướu và cao răng", short: "Nướu", desc: "Vùng viền nướu quanh cổ răng, nơi cao răng và mảng bám hay tích tụ.", services: [["hygiene", "Khám và lấy cao răng"], ["checkup", "Khám tổng quát"]], ask: "Nướu có hay chảy máu khi chải răng không, hơi thở có thay đổi không, lần lấy cao răng gần nhất là khi nào." },
  { id: "front", label: "Răng cửa và răng nanh", short: "Răng cửa", desc: "Nhóm răng phía trước, thấy rõ khi cười: liên quan màu răng, khe thưa, răng chen chúc.", services: [["whitening", "Tư vấn tẩy trắng"], ["orthodontics", "Tư vấn niềng răng"], ["restoration", "Tư vấn trám răng"]], ask: "Điều bạn muốn thay đổi, thời gian bạn có thể sắp xếp, tiền sử ê buốt và các phục hình đang có." },
  { id: "premolar", label: "Răng hàm nhỏ", short: "Hàm nhỏ", desc: "Nhóm răng nằm giữa răng nanh và răng hàm lớn, thường gặp ở các chỗ sâu răng giữa kẽ.", services: [["restoration", "Tư vấn trám răng"], ["pain", "Khám đau, ê buốt"], ["checkup", "Khám tổng quát"]], ask: "Vị trí răng khó chịu, ê khi ăn nóng lạnh hay khi nhai, đã từng trám ở răng này chưa." },
  { id: "molar", label: "Răng hàm lớn", short: "Hàm lớn", desc: "Nhóm răng nhai chính ở phía sau, mặt nhai có nhiều rãnh nên dễ giắt thức ăn.", services: [["restoration", "Tư vấn trám răng"], ["implant", "Tư vấn implant"], ["extraction", "Tư vấn nhổ răng"], ["pain", "Khám đau, ê buốt"]], ask: "Răng đau khi nhai hay đã mất, thời điểm mất răng, bệnh nền và thuốc đang dùng." },
  { id: "wisdom", label: "Răng khôn", short: "Răng khôn", desc: "Răng hàm trong cùng, thường mọc muộn và có thể mọc lệch hoặc mọc kẹt.", services: [["extraction", "Tư vấn nhổ răng"], ["pain", "Khám đau, ê buốt"]], ask: "Có sưng hoặc đau vùng góc hàm không, thuốc đang dùng, dị ứng, tiền sử các lần nhổ răng trước." },
] as const;

export const PROCESS = [
  { n: "01", title: "Đặt lịch", time: "2 phút", who: "Bạn", you: "Chọn dịch vụ, ngày, khung giờ phù hợp và ghi chú điều bạn lo lắng.", clinic: "Xác nhận lịch và nhắc bạn mang theo những gì cần thiết." },
  { n: "02", title: "Đón tiếp", time: "5 đến 10 phút", who: "Lễ tân, phụ tá", you: "Điền phiếu thông tin: thuốc đang dùng, dị ứng, bệnh nền, các lần điều trị trước.", clinic: "Ghi nhận thông tin và dẫn bạn vào phòng khám." },
  { n: "03", title: "Khám và chụp phim khi cần", time: "15 đến 30 phút", who: "Bác sĩ", you: "Mô tả điều khó chịu, trả lời câu hỏi của bác sĩ.", clinic: "Khám răng, nướu, khớp cắn. Chỉ chụp phim khi bác sĩ thấy cần và có giải thích." },
  { n: "04", title: "Trao đổi phương án và chi phí", time: "10 đến 15 phút", who: "Bác sĩ", you: "Hỏi về lợi ích, giới hạn, thời gian, các phương án khác nhau.", clinic: "Giải thích tình trạng, các phương án và chi phí dự kiến bằng lời dễ hiểu, trước khi làm." },
  { n: "05", title: "Điều trị khi bạn đồng ý", time: "Tuỳ dịch vụ", who: "Bác sĩ, phụ tá", you: "Đồng ý với phương án, báo ngay nếu thấy khó chịu trong lúc làm.", clinic: "Thực hiện đúng phương án đã thống nhất, dừng và điều chỉnh khi bạn báo khó chịu." },
  { n: "06", title: "Dặn dò và hẹn tái khám", time: "5 phút", who: "Bác sĩ, lễ tân", you: "Nghe hướng dẫn chăm sóc sau điều trị, hỏi lại điều chưa rõ.", clinic: "Hướng dẫn chăm sóc, dấu hiệu cần liên hệ sớm và hẹn lịch tái khám nếu cần." },
] as const;

export const PREPARE = [
  "Danh sách thuốc đang dùng và liều lượng",
  "Thông tin dị ứng thuốc hoặc thực phẩm (nếu có)",
  "Phim chụp hoặc hồ sơ nha khoa cũ (nếu có)",
  "Đánh răng như thường lệ trước khi đến, không cần nhịn ăn",
  "Câu hỏi bạn muốn hỏi bác sĩ, ghi sẵn trong điện thoại",
  "Người đi cùng nếu bạn lo lắng hoặc cần hỗ trợ, trẻ em cần người giám hộ",
] as const;

export const COST_FACTORS = [
  "Tình trạng răng và nướu sau khi bác sĩ khám",
  "Phương án bạn chọn trong các phương án được đề xuất",
  "Số răng, số lần hẹn và các kiểm tra bổ sung (như chụp phim)",
  "Vật liệu và kỹ thuật sử dụng cho từng trường hợp",
] as const;

export const TEAM = [
  { id: "minh-an", name: "Bác sĩ nha khoa tổng quát", role: "Khám, lấy cao răng, trám", body: "Phụ trách khám tổng quát, khám đau và ê buốt, lấy cao răng và trám răng. Làm việc Thứ 2 đến Thứ 7.", service: "checkup" },
  { id: "thanh-lam", name: "Bác sĩ chỉnh nha", role: "Tư vấn niềng răng, tẩy trắng", body: "Trao đổi về vị trí răng, khớp cắn, các phương án niềng và tẩy trắng. Làm việc Thứ 2, 4, 6.", service: "orthodontics" },
  { id: "hoai-nam", name: "Bác sĩ phục hồi và phẫu thuật", role: "Trám, nhổ răng, implant", body: "Tư vấn và thực hiện trám răng, nhổ răng, cân nhắc phương án trồng răng implant. Làm việc Thứ 3, 5, 7.", service: "restoration" },
];

export const POLICIES = [
  { h: "Đặt lịch và đến sớm", p: "Nên đến sớm 10 phút ở lần đầu để điền phiếu thông tin. Nếu đến trễ quá 15 phút, lịch có thể được dời sang khung giờ gần nhất còn trống." },
  { h: "Đổi hoặc huỷ lịch", p: "Báo trước ít nhất 4 giờ để phòng khám sắp xếp lại ghế và bác sĩ. Các lịch điều trị dài (niềng, implant) cần báo trước 24 giờ." },
  { h: "Chi phí và thanh toán", p: "Bảng giá trên trang là giá tham khảo. Chi phí dự kiến được bác sĩ báo sau khi khám và trước khi điều trị. Thanh toán tiền mặt hoặc chuyển khoản." },
  { h: "Trẻ em và người cao tuổi", p: "Trẻ em cần có người giám hộ đi cùng. Người cao tuổi hoặc có bệnh nền nên mang theo danh sách thuốc đang dùng." },
  { h: "Thông tin cá nhân", p: "Thông tin sức khoẻ chỉ dùng cho việc khám và điều trị của bạn. Trang web này không thu thập họ tên, số điện thoại hay bệnh sử trong các công cụ." },
] as const;

export const FAQ = [
  { q: "Lần đầu đến nha khoa cần chuẩn bị gì?", a: "Bạn có thể ghi lại những vấn đề răng miệng đang gặp, danh sách thuốc đang sử dụng và thông tin dị ứng nếu có. Mang theo hồ sơ nha khoa trước đây sẽ giúp bác sĩ có thêm thông tin để đánh giá. Đừng ngần ngại chia sẻ những điều khiến bạn lo lắng trước khi thăm khám." },
  { q: "Tôi chưa biết mình cần dịch vụ nào thì sao?", a: "Bạn có thể bắt đầu bằng một buổi khám tổng quát để bác sĩ đánh giá tình trạng răng miệng. Sơ đồ hàm răng và phần kiểm tra nhanh trên trang giúp bạn chuẩn bị câu hỏi; kết quả chỉ mang tính định hướng, không thay thế chẩn đoán của bác sĩ." },
  { q: "Đi khám răng có đau không?", a: "Mức độ khó chịu có thể khác nhau tuỳ tình trạng răng miệng, thủ thuật và độ nhạy cảm của mỗi người. Bạn nên chia sẻ những lo lắng hoặc trải nghiệm trước đây để bác sĩ cân nhắc phương án kiểm soát đau phù hợp. Hãy báo cho bác sĩ nếu cảm thấy khó chịu trong lúc thăm khám." },
  { q: "Có thể biết chính xác chi phí trước khi khám không?", a: "Chi phí thực tế phụ thuộc vào tình trạng răng miệng, phương án điều trị và các kiểm tra bổ sung nếu cần. Bạn sẽ được trao đổi chi phí dự kiến sau khi khám và trước khi điều trị. Bảng giá trên trang chỉ mang tính tham khảo." },
  { q: "Bao lâu nên khám răng một lần?", a: "Tần suất thăm khám phụ thuộc vào tình trạng sức khoẻ răng miệng, độ tuổi, thói quen chăm sóc và các yếu tố nguy cơ của mỗi người. Sau khi đánh giá, bác sĩ có thể đề xuất khoảng thời gian kiểm tra phù hợp. Nếu xuất hiện triệu chứng bất thường, bạn không nên chờ đến lịch khám định kỳ." },
  { q: "Tôi có cần nhịn ăn trước khi đến nha khoa không?", a: "Không có yêu cầu nhịn ăn chung cho mọi buổi khám nha khoa. Một số thủ thuật hoặc phương pháp gây mê, an thần có thể cần hướng dẫn chuẩn bị riêng. Bạn nên xác nhận với phòng khám trước buổi hẹn và không tự ý ngừng thuốc đang dùng." },
  { q: "Phần đặt lịch trên trang có gửi đến phòng khám không?", a: "Chưa. Công cụ chỉ tạo bản tóm tắt lịch hẹn ngay trên trình duyệt của bạn, không gửi thông tin đi đâu. Để liên hệ phòng khám, hãy dùng nút chuyển sang form liên hệ bên dưới bản tóm tắt." },
  { q: "Nếu tôi đang có dấu hiệu nghiêm trọng thì sao?", a: "Nếu bạn khó thở, khó nuốt, chảy máu nhiều không cầm được, sưng lan vùng mắt hoặc cổ, hay gặp chấn thương nghiêm trọng vùng mặt, hãy đến cơ sở cấp cứu ngay hoặc gọi 115 tại Việt Nam. Nếu đau răng dữ dội, sưng má, sốt kèm vấn đề răng miệng hoặc răng vĩnh viễn bị bật khỏi ổ, hãy tìm hỗ trợ nha khoa khẩn cấp. Không dùng các công cụ trên trang để trì hoãn việc tìm kiếm chăm sóc thực tế." },
];
