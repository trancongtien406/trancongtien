export const NAV = [
  { href: "#home", label: "Trang chủ" },
  { href: "#rituals", label: "Liệu trình" },
  { href: "#story", label: "Câu chuyện" },
  { href: "#sanctuary", label: "Không gian" },
  { href: "#faq", label: "Hỏi đáp" },
] as const;

export const PRINCIPLES = [
  { n: "01", title: "Lắng nghe", text: "Bắt đầu từ cảm nhận và mong muốn của mỗi người." },
  { n: "02", title: "Chăm sóc", text: "Từng chuyển động, mùi hương và chất liệu đều được lựa chọn có chủ đích." },
  { n: "03", title: "Cân bằng", text: "Dành không gian để cơ thể và tâm trí được nghỉ ngơi theo nhịp riêng." },
] as const;

export const JOURNEY = [
  { title: "Chọn nghi thức", text: "Khám phá liệu trình hoặc sử dụng Ritual Finder để tìm trải nghiệm phù hợp với mong muốn." },
  { title: "Dành một khoảng thời gian", text: "Chọn ngày, khung giờ và thời lượng phù hợp với lịch trình của bạn." },
  { title: "Lắng nghe và chuẩn bị", text: "Chia sẻ sở thích chăm sóc, mức áp lực và những điều cần lưu ý trước khi bắt đầu." },
  { title: "Thư giãn theo nhịp riêng", text: "Tận hưởng nghi thức và dành thêm một chút thời gian để nghỉ ngơi sau đó." },
] as const;

export const FAQ = [
  { q: "Tôi chưa từng đi spa, nên chọn liệu trình nào?", a: "Bạn có thể bắt đầu bằng An Nhiên hoặc Tĩnh Tâm. Ritual Finder cũng giúp bạn khám phá lựa chọn dựa trên sở thích và thời gian có sẵn." },
  { q: "Tôi có thể chọn mức áp lực massage không?", a: "Có. Hầu hết nghi thức cho phép chọn áp lực nhẹ hoặc vừa; riêng Thanh Mộc giữ ở mức nhẹ và Mộc Nhiệt ở mức vừa. Bạn cũng có thể điều chỉnh ngay trong lúc trải nghiệm." },
  { q: "Nếu tôi không thích mùi hương thì sao?", a: "Tất cả nghi thức đều có lựa chọn dầu không hương liệu. Bạn chỉ cần chọn “Không hương liệu” khi xem trước lịch hẹn." },
  { q: "Tôi đang mang thai hoặc có vấn đề sức khỏe thì sao?", a: "Các nghi thức tại Miên An không thay thế tư vấn y tế. Bạn nên trao đổi với bác sĩ và với kỹ thuật viên trước khi chọn liệu trình." },
  { q: "Mức giá hiển thị đã bao gồm toàn bộ liệu trình chưa?", a: "Giá hiển thị là giá tham khảo, tính theo từng liệu trình, chưa gồm đặt cọc, phụ phí hay khuyến mãi." },
  { q: "Tôi có thể đổi hoặc hủy lịch hẹn không?", a: "Tóm tắt lịch hẹn trên trang này chỉ lưu trên thiết bị của bạn và mất khi tải lại trang. Việc đổi hoặc hủy lịch sẽ được trao đổi khi bạn gửi yêu cầu qua nút liên hệ." },
  { q: "Miên An có địa chỉ ở đâu?", a: "Miên An ở Đà Nẵng. Địa chỉ cụ thể và thông tin liên hệ trực tiếp sẽ được gửi khi bạn trao đổi qua nút liên hệ trên trang." },
  { q: "Đặt lịch trên website này có mất phí không?", a: "Không. Bước tóm tắt lịch hẹn không cần thông tin cá nhân, không có thanh toán và chưa gửi yêu cầu nào đi." },
] as const;

export const SANCTUARY = [
  { key: "sanctuary", caption: "01 — Một không gian riêng tư", alt: "Giường massage cạnh cửa sổ rèm gỗ, nắng ấm xiên vào phòng", ratio: "3/4" },
  { key: "materials", caption: "02 — Chạm vào sự giản dị", alt: "Hoa hồng nhạt đặt trên hai viên đá cuội xếp chồng dưới nắng sớm", ratio: "4/5" },
  { key: "resting", caption: "03 — Thêm một chút thời gian cho mình", alt: "Tách trà nóng trên đĩa sứ giữa nếp khăn trải giường trắng kem", ratio: "4/5" },
] as const;
