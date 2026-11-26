export const NAV = [
  { href: "#rituals", label: "Liệu trình" },
  { href: "#combo", label: "Combo" },
  { href: "#session", label: "Một buổi tại spa" },
  { href: "#sanctuary", label: "Không gian" },
  { href: "#policy", label: "Giờ & chính sách" },
  { href: "#faq", label: "Hỏi đáp" },
] as const;

export const HERO_FACTS = [
  { k: "Giá từ", v: "320.000 ₫", s: "liệu trình 45–120 phút" },
  { k: "Mở cửa", v: "9:00 – 20:00", s: "mỗi ngày, kể cả lễ" },
  { k: "Phòng riêng", v: "2 phòng", s: "một kỹ thuật viên cho mỗi khách" },
] as const;

export const PRINCIPLES = [
  { n: "01", title: "Hai phòng riêng, không ghép khách", text: "Mỗi phòng một giường và một kỹ thuật viên ở cùng bạn suốt buổi. Mỗi khung giờ chỉ nhận tối đa hai khách." },
  { n: "02", title: "Bạn chọn áp lực và mùi dầu", text: "Báo mức áp lực nhẹ hoặc vừa, dầu có hương hay không hương liệu ngay khi đặt lịch. Đổi giữa buổi vẫn được." },
  { n: "03", title: "Lịch có chừa thời gian nghỉ", text: "Mỗi lịch đã tính 15 phút dọn phòng giữa hai khách và một tách trà gừng ấm sau liệu trình, không ai phải vội." },
] as const;

export const AUDIENCE = [
  "Người làm văn phòng muốn một buổi giãn vai, cổ, lưng sau giờ làm",
  "Khách du lịch ở Đà Nẵng cần một buổi nghỉ giữa lịch trình",
  "Cặp đôi, hai người bạn đặt hai phòng cùng giờ",
] as const;

export type Combo = {
  id: string;
  name: string;
  tagline: string;
  ritualIds: string[];
  minutes: number;
  price: number;
  separate: number;
  who: string;
};

export const COMBOS: readonly Combo[] = [
  { id: "C1", name: "Nghỉ trưa", tagline: "Nhẹ Bước + Tĩnh Tâm", ritualIds: ["R06", "R04"], minutes: 90, price: 590000, separate: 670000, who: "Dân văn phòng có 90 phút nghỉ trưa: ngâm chân rồi thả lỏng đầu, cổ, vai." },
  { id: "C2", name: "Chiều thư thả", tagline: "An Nhiên + Thanh Mộc", ritualIds: ["R01", "R03"], minutes: 120, price: 990000, separate: 1080000, who: "Một buổi chiều cho cả cơ thể và da mặt, làm liền hai liệu trình không phải chờ." },
  { id: "C3", name: "Ngày ấm áp", tagline: "Mộc Nhiệt + Thanh Mộc", ritualIds: ["R02", "R03"], minutes: 150, price: 1290000, separate: 1380000, who: "Đá ấm cho lưng và vai, sau đó chăm sóc da mặt. Hợp ngày trời mát hoặc mưa." },
  { id: "C4", name: "Đôi bạn", tagline: "An Nhiên cho hai người", ritualIds: ["R01"], minutes: 60, price: 880000, separate: 980000, who: "Hai người cùng giờ, hai phòng riêng cạnh nhau, mỗi người một kỹ thuật viên." },
] as const;

export const STEP_DESC: Record<string, string> = {
  "Đón khách": "Nhận khăn, thay đồ dùng một lần, uống nước ấm tại khu đón khách.",
  "Trao đổi": "Kỹ thuật viên hỏi vùng đau mỏi, mức áp lực và dị ứng (nếu có).",
  "Chuẩn bị": "Làm ấm dầu, xếp đá hoặc chỉnh ánh sáng và nhiệt độ phòng.",
  "Làm sạch": "Làm sạch da mặt nhẹ nhàng bằng khăn ấm.",
  "Massage": "Phần chính của liệu trình, theo áp lực bạn đã chọn.",
  "Chăm sóc": "Phần chính của liệu trình tại phòng riêng.",
  "Cơ thể": "Massage cơ thể lần lượt lưng, vai, tay, chân.",
  "Da mặt": "Làm sạch, massage mặt và đắp dưỡng ẩm.",
  "Dưỡng": "Đắp và dưỡng ẩm, để da thấm yên tĩnh.",
  "Ngâm chân": "Ngâm chân nước ấm với muối thảo mộc.",
  "Nghỉ": "Nằm yên vài phút trước khi ngồi dậy từ từ.",
  "Trà & thanh toán": "Uống trà gừng ấm, thanh toán và hẹn lần sau nếu muốn.",
};

export const PREPARE_BEFORE = [
  "Đến trước giờ hẹn 10 phút để thay đồ và uống nước ấm.",
  "Ăn nhẹ trước buổi ít nhất một giờ; tránh đi khi quá no hoặc đói lả.",
  "Không uống rượu bia ngay trước liệu trình.",
  "Báo trước nếu dị ứng dầu, hạt, tinh dầu hoặc có vết thương hở, da đang viêm.",
  "Không cần mang gì: khăn, đồ thay dùng một lần và tủ khoá có sẵn.",
] as const;

export const PREPARE_AFTER = [
  "Uống một cốc nước ấm sau buổi, ngồi nghỉ vài phút trước khi di chuyển.",
  "Sau liệu trình đá ấm, nên tắm nước ấm vừa phải thay vì nước quá nóng.",
  "Nên tránh việc nặng và đồ uống có cồn trong buổi tối hôm đó.",
] as const;

export const PREPARE_ASK_DOCTOR =
  "Đang mang thai, đang sốt, mới phẫu thuật, có bệnh tim mạch, huyết áp hoặc bệnh da liễu: hãy hỏi bác sĩ trước khi đặt. Liệu trình tại Miên An là chăm sóc thư giãn, không thay thế điều trị y tế.";

export const SANCTUARY = [
  { key: "sanctuary", caption: "01 — Phòng trị liệu có cửa sổ rèm gỗ", alt: "Giường massage cạnh cửa sổ rèm gỗ, nắng ấm xiên vào phòng", ratio: "3/4" },
  { key: "materials", caption: "02 — Đá cuội và hoa tươi ở khu đón khách", alt: "Hoa hồng nhạt đặt trên hai viên đá cuội xếp chồng dưới nắng sớm", ratio: "4/5" },
  { key: "resting", caption: "03 — Trà gừng sau liệu trình", alt: "Tách trà nóng trên đĩa sứ giữa nếp khăn trải giường trắng kem", ratio: "4/5" },
] as const;

export const SPACE_FACTS = [
  { k: "Phòng trị liệu", v: "2 phòng (Phòng An, Phòng Miên), mỗi phòng một giường, ánh sáng chỉnh được." },
  { k: "Khu đón khách", v: "Ghế ngồi, trà gừng, tủ khoá và nhà vệ sinh riêng." },
  { k: "Vệ sinh", v: "Khăn giặt sau mỗi khách; phòng được dọn và thông gió trong 15 phút giữa hai lịch." },
  { k: "Âm thanh và mùi", v: "Nhạc không lời âm lượng nhỏ; mùi dầu chọn theo từng khách." },
] as const;

export const HOURS = [
  { d: "Thứ Hai – Chủ nhật", h: "9:00 – 20:00" },
  { d: "Ngày lễ, Tết dương lịch", h: "9:00 – 20:00 (nên đặt trước)" },
  { d: "Lịch bắt đầu muộn nhất", h: "Sao cho buổi kết thúc trước 20:00" },
] as const;

export const POLICIES = [
  { t: "Đặt lịch", d: "Đặt trước ít nhất 1 giờ và tối đa 14 ngày. Chọn liệu trình, ngày, giờ ngay trên trang này rồi gửi yêu cầu qua nút liên hệ." },
  { t: "Đổi và huỷ", d: "Báo trước ít nhất 4 giờ thì đổi giờ hoặc huỷ miễn phí. Báo muộn hơn hoặc không đến: lần đặt sau cần cọc 30%." },
  { t: "Đặt cọc", d: "Liệu trình từ 1.000.000 ₫ và các combo cần cọc 30% khi giữ lịch. Liệu trình lẻ dưới mức này không cần cọc." },
  { t: "Đến trễ", d: "Trễ quá 15 phút, liệu trình được rút ngắn để kịp lịch của khách sau; giá giữ nguyên." },
  { t: "Thanh toán", d: "Tiền mặt, chuyển khoản hoặc thẻ sau buổi. Tip không bắt buộc." },
  { t: "Độ tuổi", d: "Chưa nhận khách dưới 16 tuổi. Khách 16–17 tuổi cần người lớn đi cùng." },
] as const;

export const CONTACT = {
  area: "Quận Hải Châu, Đà Nẵng",
  phone: "0236 000 0000",
  email: "datlich@mienan.example",
  note: "Địa chỉ chi tiết được gửi khi lịch hẹn được xác nhận.",
} as const;

export const FAQ = [
  { q: "Tôi chưa từng đi spa, nên chọn liệu trình nào?", a: "Bạn có thể bắt đầu bằng An Nhiên (60 phút, toàn thân) hoặc Tĩnh Tâm (45 phút, đầu, cổ, vai). Công cụ “Tìm liệu trình của bạn” bên trên gợi ý theo nhu cầu và thời gian bạn có." },
  { q: "Tôi có thể chọn mức áp lực massage không?", a: "Có. Hầu hết liệu trình cho chọn áp lực nhẹ hoặc vừa; riêng Thanh Mộc giữ ở mức nhẹ và Mộc Nhiệt ở mức vừa. Bạn nói với kỹ thuật viên để tăng hoặc giảm ngay trong lúc làm." },
  { q: "Nếu tôi không thích mùi hương thì sao?", a: "Liệu trình nào cũng có dầu không hương liệu. Bạn chọn “Không hương liệu” khi đặt lịch hoặc ở phần chọn tinh dầu." },
  { q: "Tôi đang mang thai hoặc có bệnh nền thì sao?", a: "Liệu trình tại Miên An là chăm sóc thư giãn, không thay thế điều trị y tế. Bạn nên hỏi bác sĩ trước và báo kỹ thuật viên khi đến." },
  { q: "Giá đã gồm những gì?", a: "Giá đã gồm dầu hoặc sản phẩm dùng trong liệu trình, khăn, đồ thay dùng một lần và trà gừng sau buổi. Chưa gồm tip. Giá tham khảo, có thể thay đổi theo thời điểm." },
  { q: "Tôi có thể đổi hoặc huỷ lịch không?", a: "Có. Báo trước ít nhất 4 giờ thì đổi hoặc huỷ miễn phí; chi tiết ở phần Giờ & chính sách phía trên." },
  { q: "Miên An ở đâu, có chỗ gửi xe không?", a: "Miên An ở Quận Hải Châu, Đà Nẵng. Địa chỉ chi tiết và chỉ dẫn gửi xe được gửi khi lịch hẹn được xác nhận." },
  { q: "Bản tóm tắt lịch hẹn trên trang này có phải đã đặt lịch không?", a: "Chưa. Bản tóm tắt chỉ nằm trên thiết bị của bạn, không có thanh toán và chưa gửi gì đến spa. Để giữ lịch, dùng nút liên hệ ở cuối bản tóm tắt." },
] as const;
