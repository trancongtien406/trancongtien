export const NAV = [
  { href: "#quy-trinh", label: "Quy trình" },
  { href: "#goi", label: "Gói chăm sóc" },
  { href: "#lop-phu", label: "Lớp phủ" },
  { href: "#chon-goi", label: "Chọn gói" },
  { href: "#cau-hoi", label: "Câu hỏi" },
];

export type Pkg = {
  no: string; name: string; time: string; hours: number; steps: number; from: number; tag: string;
  list: string[];
};

export const PACKAGES: Pkg[] = [
  { no: "01", name: "Rửa chi tiết", time: "90 đến 120 phút", hours: 2, steps: 5, from: 350000, tag: "Nền tảng của mọi gói",
    list: ["Kiểm tra tình trạng xe", "Vệ sinh bánh và hốc bánh", "Rửa tiếp xúc an toàn sau khi phun bọt", "Làm sạch khe kẽ, lau khô", "Kiểm tra hoàn thiện"] },
  { no: "02", name: "Đánh bóng sơn", time: "6 đến 10 giờ", hours: 8, steps: 5, from: 2500000, tag: "Hiệu chỉnh xoáy mờ",
    list: ["Đo và đánh giá bề mặt sơn", "Làm sạch và tẩy nhiễm", "Thử một vùng nhỏ để chọn pad và dung dịch", "Hiệu chỉnh theo mức độ cho phép", "Kiểm tra dưới đèn chuyên dụng"] },
  { no: "03", name: "Phủ ceramic", time: "1 đến 2 ngày", hours: 12, steps: 6, from: 4500000, tag: "Bảo vệ bề mặt",
    list: ["Kiểm tra và tư vấn sản phẩm", "Rửa, tẩy nhiễm bề mặt", "Hiệu chỉnh sơn nếu cần", "Lau chuẩn bị bề mặt", "Thi công lớp phủ và kiểm tra", "Đóng rắn theo hướng dẫn sản phẩm"] },
  { no: "04", name: "Nội thất", time: "3 đến 5 giờ", hours: 4, steps: 5, from: 900000, tag: "Da, vải, nhựa",
    list: ["Kiểm tra chất liệu", "Hút bụi toàn bộ", "Làm sạch khe và bề mặt", "Vệ sinh da hoặc vải phù hợp", "Hoàn thiện, khử mùi phù hợp"] },
  { no: "05", name: "Khoang máy", time: "2 đến 3 giờ", hours: 2.5, steps: 5, from: 700000, tag: "Làm sạch có che chắn",
    list: ["Kiểm tra tình trạng khoang máy", "Che chắn bộ phận nhạy cảm", "Làm sạch bằng phương pháp phù hợp", "Lau khô, hoàn thiện chi tiết", "Kiểm tra sau vệ sinh"] },
];

export const STAGES = [
  { t: "Bụi đường và vết bẩn bám", d: "Xe đến xưởng với lớp bụi, nhựa đường và cặn nước. Kỹ thuật viên ghi lại tình trạng trước khi chạm vào xe.", min: 0, step: 1 },
  { t: "Rửa tiếp xúc", d: "Phun bọt cho cặn bẩn mềm ra, rửa từ trên xuống bằng khăn sạch để không kéo cát lên sơn.", min: 45, step: 3 },
  { t: "Hiệu chỉnh bề mặt", d: "Thử một vùng nhỏ, chọn pad và dung dịch phù hợp, xử lý xoáy mờ ở mức an toàn cho lớp sơn.", min: 240, step: 6 },
  { t: "Bảo vệ và bàn giao", d: "Lau chuẩn bị, thi công lớp bảo vệ, soát từng khu vực dưới đèn trước khi giao xe.", min: 480, step: 8 },
];

export const PHILO = "Độ bóng không đến từ một lớp phủ duy nhất. Làm sạch đúng cách. Hiệu chỉnh có kiểm soát. Bảo vệ vừa đủ. Chúng tôi không che giấu khuyết điểm, chúng tôi đánh giá bề mặt trước rồi mới quyết định chạm vào đâu.";

export const PRINCIPLES = [
  { t: "Đánh giá trước", d: "Mỗi xe được kiểm tra sơn, nội thất và khoang máy dưới đèn trước khi đề xuất quy trình." },
  { t: "Chỉ làm điều cần", d: "Sơn còn tốt thì không đánh bóng thừa. Mỗi bước đều có lý do, và bạn thấy nó trong bảng gói." },
  { t: "Nói rõ giới hạn", d: "Không phải vết xước nào cũng xử lý được. Chúng tôi nói trước điều gì làm được và điều gì không." },
];

export const COAT_FACTS = [
  { k: "Chưa phủ", d: "Nước dàn thành màng mỏng, bám lại cặn khoáng khi khô và để lại vệt." },
  { k: "Đã phủ", d: "Sức căng bề mặt thấp hơn, nước tụ thành giọt và lăn đi, bề mặt dễ lau sạch hơn." },
];

export const FAQ = [
  { q: "Đánh bóng có xoá hết vết xước không?", a: "Không. Đánh bóng cải thiện nhiều vết xước nông và vết xoáy. Vết xước sâu xuyên qua lớp sơn bóng thường không xử lý an toàn được bằng đánh bóng. Kỹ thuật viên sẽ chỉ rõ từng vết sau khi kiểm tra." },
  { q: "Phủ ceramic có chống xước không?", a: "Lớp phủ giúp bề mặt chống bám nước, dễ vệ sinh và hỗ trợ bảo vệ. Nó không phải áo giáp: không chống xước tuyệt đối và không chống đá văng." },
  { q: "Lớp phủ giữ được bao lâu?", a: "Tuỳ sản phẩm, điều kiện sử dụng và cách chăm sóc sau đó. Thời gian cụ thể được tư vấn theo sản phẩm bạn chọn, không mặc định giống nhau cho mọi xe." },
  { q: "Bao lâu thì nhận xe sau khi phủ?", a: "Quy trình thi công và bàn giao thường mất một đến hai ngày. Thời gian tránh nước và chăm sóc sau phủ theo hướng dẫn của sản phẩm." },
  { q: "Có cần đặt lịch trước không?", a: "Nên đặt lịch để kỹ thuật viên có đủ thời gian kiểm tra xe và chuẩn bị vật tư phù hợp." },
  { q: "Xe cũ có làm detailing được không?", a: "Được. Kỹ thuật viên kiểm tra sơn, nội thất và tình trạng chung trước khi đề xuất. Không phải khuyết điểm nào cũng phục hồi hoàn toàn." },
];

export const GALLERY = [
  { img: "bot-xa-phong", alt: "Bọt xà phòng trượt trên thân xe đen", w: 2000, h: 1333, cap: "Phun bọt" },
  { img: "mam-xe-bot", alt: "Mâm xe đen phủ bọt xà phòng", w: 2000, h: 1331, cap: "Bánh và mâm" },
  { img: "may-danh-bong", alt: "Kỹ thuật viên dùng máy đánh bóng trên thân xe đen", w: 2000, h: 1333, cap: "Máy đánh bóng" },
  { img: "khan-microfiber", alt: "Bàn tay lau thân xe đen bằng khăn microfiber", w: 2000, h: 3000, cap: "Khăn microfiber" },
  { img: "hut-bui-ghe", alt: "Làm sạch sâu ghế vải trong xe", w: 2000, h: 1325, cap: "Ghế vải" },
  { img: "noi-that-da-sang", alt: "Hàng ghế sau bọc da sáng màu", w: 2000, h: 1332, cap: "Nội thất da" },
  { img: "khoang-may", alt: "Khoang máy xe với nắp máy bạc", w: 2000, h: 1255, cap: "Khoang máy" },
];
