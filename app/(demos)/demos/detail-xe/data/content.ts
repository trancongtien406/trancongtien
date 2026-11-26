export const NAV = [
  { href: "#goi", label: "Dịch vụ" },
  { href: "#gia", label: "Giá theo dòng xe" },
  { href: "#quy-trinh", label: "Quy trình" },
  { href: "#chon-goi", label: "Chọn gói" },
  { href: "#dat-lich", label: "Đặt lịch" },
  { href: "#cau-hoi", label: "Hỏi đáp" },
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

export const PHILO = "Mỗi xe được kiểm tra sơn, nội thất và khoang máy dưới đèn trước khi đề xuất. Làm sạch đúng cách, hiệu chỉnh có kiểm soát, bảo vệ vừa đủ. Chúng tôi nói rõ điều gì làm được và điều gì không, rồi mới quyết định chạm vào đâu.";

export const PRINCIPLES = [
  { t: "Đánh giá trước", d: "Mỗi xe được kiểm tra sơn, nội thất và khoang máy dưới đèn trước khi đề xuất quy trình." },
  { t: "Chỉ làm điều cần", d: "Sơn còn tốt thì không đánh bóng thừa. Mỗi bước đều có lý do, và bạn thấy nó trong bảng gói." },
  { t: "Nói rõ giới hạn", d: "Không phải vết xước nào cũng xử lý được. Chúng tôi nói trước điều gì làm được và điều gì không." },
];

export const COAT_FACTS = [
  { k: "Chưa phủ", d: "Nước dàn thành màng mỏng, bám lại cặn khoáng khi khô và để lại vệt." },
  { k: "Đã phủ", d: "Sức căng bề mặt thấp hơn, nước tụ thành giọt và lăn đi, bề mặt dễ lau sạch hơn." },
];

export const FACTS = [
  { k: "Rửa chi tiết từ", value: 350000, suffix: " ₫", note: "Sedan, 90 đến 120 phút" },
  { k: "Mở cửa", text: "08:00 – 18:00", note: "Thứ hai đến thứ bảy, nhận xe theo lịch hẹn" },
  { k: "Kiểm tra xe", text: "Miễn phí", note: "Báo giá và quy trình trước khi làm" },
];

export const PHASES = [
  { t: "Tiếp nhận", d: "Hẹn giờ, đón xe tại xưởng, lập phiếu tiếp nhận: số km, đồ để trong xe, vết xước và hư hỏng có sẵn. Chụp ảnh các mặt xe trước khi chạm vào." },
  { t: "Kiểm tra", d: "Xem sơn dưới đèn, đo độ dày sơn nếu cần, kiểm tra nội thất và khoang máy. Báo giá, thời gian và những gì làm được, chưa làm được." },
  { t: "Thực hiện", d: "Làm theo các bước đã thống nhất, mỗi hạng mục có kỹ thuật viên phụ trách. Phát sinh ngoài báo giá phải được bạn đồng ý trước." },
  { t: "Bàn giao", d: "Soát từng khu vực dưới đèn cùng bạn, chụp ảnh sau khi làm, giao phiếu bàn giao kèm hướng dẫn chăm sóc sau dịch vụ." },
];

export const PREP = [
  "Lấy đồ cá nhân, giấy tờ và vật có giá trị ra khỏi xe; để lại thẻ gửi xe nếu có.",
  "Cho chúng tôi biết các vết xước, móp hoặc hư hỏng bạn đã biết để ghi vào phiếu tiếp nhận.",
  "Xe điện: mang theo chìa và thẻ, báo mức pin; xe chạy dầu: không cần đổ đầy bình.",
  "Phủ ceramic và đánh bóng: nên để xe 1 đến 2 ngày, xếp lịch trước để có chỗ trong xưởng.",
];
export const AFTER = [
  "Sau phủ ceramic: tránh nước và để xe nơi thoáng theo hướng dẫn của sản phẩm đã dùng, ghi trên phiếu bàn giao.",
  "Rửa bằng nước và dung dịch rửa xe trung tính, khăn microfiber sạch; tránh máy rửa tự động có chổi cứng.",
  "Không dùng hoá chất tẩy mạnh hoặc chất đánh bóng tuỳ tiện trên sơn đã xử lý.",
  "Nội thất da: lau vết bẩn sớm, tránh để dưới nắng gắt lâu; vải: hút bụi định kỳ.",
];
export const POLICY = [
  { t: "Đặt lịch", d: "Đặt trước qua biểu mẫu tư vấn. Rửa chi tiết thường nhận trong ngày nếu còn chỗ; đánh bóng, phủ ceramic cần đặt trước và có thể xếp lịch sau vài ngày." },
  { t: "Đặt cọc và huỷ", d: "Gói đánh bóng và phủ ceramic có đặt cọc, mức báo khi xác nhận lịch. Huỷ hoặc đổi lịch trước 24 giờ không mất cọc." },
  { t: "Đón xe", d: "Giao xe tại xưởng theo giờ hẹn. Xe chưa nhận đúng hẹn sau khi hoàn thành có thể phát sinh phí lưu xe, báo trước khi tính." },
  { t: "Bảo hành thi công", d: "Mỗi gói có phiếu bảo hành thi công; thời hạn tuỳ gói và sản phẩm, ghi rõ trên phiếu. Không bảo hành hư hại do va chạm, xước mới hoặc chăm sóc sai cách." },
];

export const FAQ = [
  { q: "Đánh bóng có xoá hết vết xước không?", a: "Không. Đánh bóng cải thiện nhiều vết xước nông và vết xoáy. Vết xước sâu xuyên qua lớp sơn bóng thường không xử lý an toàn được bằng đánh bóng. Kỹ thuật viên sẽ chỉ rõ từng vết sau khi kiểm tra." },
  { q: "Phủ ceramic có chống xước không?", a: "Lớp phủ giúp bề mặt chống bám nước, dễ vệ sinh và hỗ trợ bảo vệ. Nó không phải áo giáp: không chống xước tuyệt đối và không chống đá văng." },
  { q: "Lớp phủ giữ được bao lâu?", a: "Tuỳ sản phẩm, điều kiện sử dụng và cách chăm sóc sau đó. Thời gian cụ thể được tư vấn theo sản phẩm bạn chọn, không mặc định giống nhau cho mọi xe." },
  { q: "Bao lâu thì nhận xe sau khi phủ?", a: "Quy trình thi công và bàn giao thường mất một đến hai ngày. Thời gian tránh nước và chăm sóc sau phủ theo hướng dẫn của sản phẩm." },
  { q: "Có cần đặt lịch trước không?", a: "Nên đặt lịch để kỹ thuật viên có đủ thời gian kiểm tra xe và chuẩn bị vật tư phù hợp. Rửa chi tiết có thể nhận trong ngày nếu còn chỗ." },
  { q: "Tôi có phải ở lại chờ không?", a: "Rửa chi tiết 90 đến 120 phút có thể chờ tại khu ngồi của xưởng. Nội thất, đánh bóng và phủ ceramic thường cần để xe vài giờ đến 1 đến 2 ngày." },
  { q: "Xe điện có làm được không?", a: "Được. Khoang kỹ thuật của xe điện chỉ làm sạch khô, không xịt nước áp lực; kỹ thuật viên xác nhận theo từng mẫu xe trước khi làm." },
  { q: "Xưởng có sửa móp, sơn lại không?", a: "Không. Chúng tôi chỉ chăm sóc và bảo vệ bề mặt: rửa, đánh bóng, phủ, nội thất, khoang máy. Việc sơn lại hoặc sửa thân vỏ cần gara chuyên." },
  { q: "Bảo hành thế nào?", a: "Có phiếu bảo hành thi công theo từng gói, thời hạn ghi trên phiếu. Phiếu nêu rõ trường hợp được và không được bảo hành." },
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
