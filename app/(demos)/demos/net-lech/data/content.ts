export const NAV = [
  { href: "#services", label: "Dịch vụ và giá" },
  { href: "#lookbook", label: "Lookbook" },
  { href: "#stylists", label: "Stylist" },
  { href: "#studio", label: "Giờ mở cửa" },
];

export const FACTS = [
  { k: "Cắt từ", v: "150.000 đ" },
  { k: "Mở cửa", v: "09:00–20:00 mỗi ngày" },
  { k: "Tư vấn", v: "Miễn phí trước khi làm" },
];

export const PRINCIPLES = [
  { n: "01", t: "Tư vấn trước khi làm", d: "10–15 phút nhìn tóc, hỏi lịch sử hoá chất và chốt kỹ thuật, giá cuối cùng trước khi bắt đầu." },
  { n: "02", t: "Đặt lịch để không phải chờ", d: "Mỗi khung giờ nhận một số khách nhất định. Dịch vụ hoá chất cần đặt trước vì chiếm 2–4 giờ." },
  { n: "03", t: "Giá nói trước theo độ dài tóc", d: "Bảng giá ngắn, vừa, dài và thời gian từng dịch vụ có ngay trên trang." },
];

export const PROCESS = [
  { n: "01", t: "Tư vấn", when: "10–15 phút, miễn phí", d: "Cho stylist xem ảnh tham khảo, kể lịch sử nhuộm, uốn, duỗi gần đây và thói quen chăm sóc." },
  { n: "02", t: "Kiểm tra tóc và chốt giá", when: "5 phút", d: "Stylist kiểm tra nền tóc, da đầu, độ hư tổn rồi báo kỹ thuật và giá cuối. Hai bên đồng ý mới bắt đầu." },
  { n: "03", t: "Thực hiện", when: "40 phút đến 4 giờ", d: "Làm theo dịch vụ đã chốt. Với hoá chất, stylist kiểm tra giữa chừng và báo nếu cần đổi kế hoạch." },
  { n: "04", t: "Hoàn thiện và dặn dò", when: "10 phút", d: "Sấy tạo kiểu, hướng dẫn tự tạo kiểu và chăm sóc tại nhà, hẹn lịch chỉnh sửa hoặc dặm màu nếu cần." },
];

export const POLICIES = [
  { t: "Đặt lịch", d: "Đặt trước qua form tư vấn của website hoặc điện thoại. Cắt và gội dưỡng có thể đến trực tiếp nếu còn ghế trống." },
  { t: "Đặt cọc", d: "Dịch vụ hoá chất (uốn, duỗi, nhuộm, tẩy) cọc 100.000 đ để giữ lịch, trừ vào hoá đơn khi làm." },
  { t: "Dời và huỷ", d: "Báo trước ít nhất 24 giờ thì được dời lịch hoặc nhận lại cọc. Báo muộn hơn, cọc được bảo lưu một lần." },
  { t: "Đến trễ", d: "Trễ quá 15 phút, salon có thể rút gọn dịch vụ hoặc dời sang khung giờ gần nhất còn trống." },
  { t: "Dị ứng và thử phản ứng", d: "Nếu từng dị ứng hoá chất tóc, hãy báo khi đặt lịch. Stylist có thể thử phản ứng trước theo hướng dẫn của nhà sản xuất." },
  { t: "Chỉnh sửa sau khi làm", d: "Nếu chưa ưng đường cắt hoặc màu, báo trong 7 ngày để stylist xem và chỉnh lại. Màu phai do gội và nắng không nằm trong phạm vi này." },
];

export const PRODUCTS = [
  { t: "Dầu gội và xả tại ghế gội", u: "Mọi dịch vụ", n: "Loại dịu nhẹ cho da đầu bình thường; có loại riêng cho tóc nhuộm và da đầu dầu hoặc khô." },
  { t: "Thuốc nhuộm chuyên dụng cho salon", u: "Nhuộm, phủ bạc", n: "Pha tại chỗ theo nền tóc. Có bảng màu để chọn, màu cuối còn phụ thuộc nền tóc." },
  { t: "Bột tẩy và oxy theo nồng độ", u: "Tẩy tóc", n: "Chọn nồng độ theo độ dày và độ hư tổn của tóc, theo dõi thời gian ủ." },
  { t: "Thuốc uốn và duỗi", u: "Uốn, duỗi", n: "Chọn theo chất tóc; tóc đã qua nhiều hoá chất cần kiểm tra trước." },
  { t: "Kem ủ và serum phục hồi", u: "Phục hồi tóc", n: "Chia theo mức khô xơ nhẹ, vừa, nặng. Cải thiện độ mềm, không hứa phục hồi tuyệt đối." },
  { t: "Sáp, gôm, xịt tạo kiểu", u: "Tạo kiểu, bán lẻ", n: "Dùng thử tại ghế, có bán lại cho khách muốn tự tạo kiểu tại nhà." },
];

export const HOURS = {
  open: 9 * 60, close: 20 * 60, lastStart: 18 * 60 + 30,
  rows: [
    { d: "Thứ Hai đến Thứ Sáu", h: "09:00–20:00" },
    { d: "Thứ Bảy, Chủ Nhật", h: "09:00–20:00" },
    { d: "Ngày lễ lớn", h: "Báo lịch trước, thường mở 09:00–17:00" },
  ],
};

export const FAQ = [
  { q: "Cắt tóc nam và nữ giá có khác nhau không?", a: "Không. Giá cắt tính theo độ dài tóc: ngắn từ 150.000 đ, vừa từ 200.000 đ, dài từ 250.000 đ, đã gồm gội, sấy và tạo kiểu." },
  { q: "Có phải đặt lịch trước không?", a: "Cắt và gội dưỡng có thể đến trực tiếp nếu còn ghế. Uốn, duỗi, nhuộm, tẩy và phục hồi nên đặt trước vì mỗi dịch vụ chiếm từ 1 đến 4 giờ." },
  { q: "Nhuộm tóc có cần tẩy trước không?", a: "Màu tối hoặc gần màu tóc hiện tại thường không cần. Màu sáng, màu nổi trên tóc đen cần tẩy trước. Stylist kiểm tra nền tóc rồi báo cụ thể ở bước tư vấn." },
  { q: "Có uốn hoặc duỗi và nhuộm trong cùng một ngày được không?", a: "Tuỳ tình trạng tóc và hoá chất đã dùng. Thường nên cách nhau 1–2 tuần để tóc đỡ hư tổn, nên công cụ đặt lịch trên trang không tạo bản tóm tắt khi chọn cùng lúc." },
  { q: "Tóc dài hơn ngang lưng tính giá thế nào?", a: "Bảng giá có ba mức: ngắn, vừa, dài (qua vai). Tóc rất dài hoặc rất dày được báo thêm ở bước tư vấn, không tính ngầm." },
  { q: "Phục hồi tóc có đưa tóc hư về như ban đầu không?", a: "Không. Ủ phục hồi giúp tóc mềm, bóng và dễ chải hơn. Phần tóc đã hư tổn nặng thường cần cắt bỏ dần theo thời gian." },
  { q: "Giá trên trang đã là giá cuối chưa?", a: "Là giá tham khảo cho stylist cơ bản. Giá cuối được báo sau khi stylist kiểm tra nền tóc; chọn stylist cấp cao hơn phụ thu 15% hoặc 30%." },
  { q: "Tôi cần chuẩn bị gì trước khi đổi màu tóc?", a: "Mang ảnh tham khảo, nhớ lần nhuộm, tẩy, uốn gần nhất và cho stylist biết nếu từng kích ứng. Nên gội đầu bình thường như mọi ngày, không cần để tóc bẩn." },
  { q: "Tôi có thể đặt lịch ngay trên trang này không?", a: "Công cụ trên trang giúp bạn chọn dịch vụ, ước tính giá và thời gian, rồi tạo bản tóm tắt. Để giữ lịch, bấm nút gửi yêu cầu tư vấn; trang không thanh toán và không gửi thông tin đi." },
  { q: "Salon có nhận khách dưới 16 tuổi không?", a: "Nhận cắt và gội dưỡng. Dịch vụ hoá chất cần phụ huynh đi cùng và đồng ý." },
];
