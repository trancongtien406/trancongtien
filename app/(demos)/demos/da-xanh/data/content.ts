/** Toàn bộ nội dung chữ của trang NÉA Skin Studio. Chuỗi ở dạng NFC. */

export const IMG = "/images/demos/da-xanh";
export const BRAND = "NÉA Skin Studio";

export const NAV = [
  { href: "#lieu-trinh", label: "Liệu trình" },
  { href: "#quy-trinh", label: "Tại studio" },
  { href: "#hoat-chat", label: "Hoạt chất" },
  { href: "#routine", label: "Routine Builder" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const MANIFESTO =
  "Làn da không cần thêm áp lực. Đôi khi điều cần thiết chỉ là một quy trình vừa đủ, những bước nhẹ nhàng và một khoảng thời gian dành cho chính mình.";

export type Treatment = {
  id: string;
  name: string;
  minutes: number;
  price: number;
  tint: string;
  img: string;
  alt: string;
  pos: string;
  summary: string;
  steps: string[];
  suits: string;
  note: string;
};

/** Giá tham khảo (VND). Chỉ là chăm sóc da cơ bản, không thủ thuật xâm lấn. */
export const TREATMENTS: Treatment[] = [
  {
    id: "lam-sach-diu", name: "Làm sạch dịu & cấp ẩm", minutes: 60, price: 380000,
    tint: "#cdbfff", img: "hu-kem-la", alt: "Hai hũ kem trắng và hồng nhạt giữa những chiếc lá nhỏ trên nền đá trắng", pos: "50% 50%",
    summary: "Buổi chăm sóc nền tảng: làm sạch nhẹ, lau tinh chất cấp ẩm, mặt nạ dịu và dưỡng kết thúc.",
    steps: ["Trò chuyện về thói quen và cảm giác da", "Làm sạch hai lớp nhẹ nhàng", "Lau tinh chất cấp ẩm", "Mặt nạ dịu 12 phút", "Dưỡng ẩm và chống nắng"],
    suits: "Bạn muốn bắt đầu lại với những bước cơ bản, hoặc đã lâu chưa dành thời gian cho da.",
    note: "Phù hợp để làm quen với studio.",
  },
  {
    id: "lam-sach-sau", name: "Làm sạch bề mặt chuyên sâu", minutes: 75, price: 480000,
    tint: "#b8e6f2", img: "mat-nuoc", alt: "Mặt nước phẳng với những gợn sóng tròn trong ánh sáng hồng và xanh nhạt", pos: "50% 45%",
    summary: "Làm sạch kỹ hơn lớp bụi và dầu thừa trên bề mặt bằng hơi ấm, enzyme dịu và massage nhẹ.",
    steps: ["Làm sạch hai lớp", "Xông hơi ấm vừa phải", "Enzyme dịu làm mềm bề mặt", "Massage vùng chữ T", "Mặt nạ làm dịu và dưỡng ẩm"],
    suits: "Da thiên dầu hoặc hỗn hợp, thích cảm giác sạch thoáng nhưng không muốn can thiệp mạnh.",
    note: "Không lấy nhân mụn, không dùng kim hay thiết bị xâm lấn.",
  },
  {
    id: "diu-da", name: "Dịu da sau nắng", minutes: 60, price: 420000,
    tint: "#d8c8ff", img: "oai-huong", alt: "Cành oải hương hồng tím trong ánh sáng mềm, nền mờ", pos: "50% 40%",
    summary: "Làm mát và nâng niu làn da sau những ngày ở ngoài trời nhiều: tinh chất dịu, mặt nạ lạnh và dưỡng ẩm.",
    steps: ["Làm sạch rất nhẹ", "Lau tinh chất làm dịu", "Mặt nạ mát 15 phút", "Massage mặt nhẹ", "Dưỡng ẩm và nhắc việc chống nắng"],
    suits: "Da căng, khô hoặc hơi nóng sau khi đi biển, đi nắng.",
    note: "Nếu da đang rát đỏ nhiều hoặc có vết bỏng nắng, hãy gặp bác sĩ da liễu trước.",
  },
  {
    id: "cap-am", name: "Cấp ẩm nhiều lớp", minutes: 90, price: 560000,
    tint: "#aee3f0", img: "kem-xanh", alt: "Hai vệt kem trắng mịn và hai giọt tinh chất vàng nhạt trên nền xanh trời", pos: "50% 50%",
    summary: "Xếp lớp ẩm từng bước: toner, tinh chất, mặt nạ ẩm và khoá ẩm, kèm massage thư giãn.",
    steps: ["Làm sạch dịu", "Toner cấp nước", "Tinh chất cấp ẩm nhiều lớp", "Mặt nạ ẩm 15 phút", "Massage và khoá ẩm"],
    suits: "Da thiếu nước, dễ bong khô hoặc hay căng sau khi rửa mặt.",
    note: "Chúng mình giải thích từng nhóm thành phần trước khi dùng.",
  },
  {
    id: "massage-mat", name: "Massage mặt thư giãn", minutes: 45, price: 350000,
    tint: "#e0d3ff", img: "tay-thoa-kem", alt: "Hai bàn tay thoa kem dưỡng lên cánh tay trên mặt bàn trắng", pos: "50% 55%",
    summary: "Massage mặt và cổ vai bằng tay, nhịp chậm, tập trung vào cảm giác thả lỏng.",
    steps: ["Làm sạch nhẹ", "Thoa lớp dầu hoặc kem massage", "Massage mặt, cổ, vai", "Lau sạch", "Dưỡng ẩm kết thúc"],
    suits: "Bạn cần một khoảng nghỉ cho cơ mặt và vai gáy sau nhiều giờ làm việc.",
    note: "Đây là buổi thư giãn, không dùng để điều trị.",
  },
  {
    id: "tu-van", name: "Buổi tư vấn thói quen da", minutes: 45, price: 250000,
    tint: "#c4ecf5", img: "khan-trang", alt: "Chồng khăn bông trắng gấp gọn trên bàn trắng", pos: "50% 50%",
    summary: "Ngồi lại cùng nhau rà soát routine hiện tại, bỏ bớt bước thừa và ghi lại quy trình vừa sức cho bạn.",
    steps: ["Xem lại các sản phẩm đang dùng", "Rà soát thứ tự và cách dùng", "Gợi ý bớt hoặc thêm bước", "Ghi lại quy trình sáng, tối", "Hẹn nhắc nhìn lại sau một thời gian"],
    suits: "Bạn đang dùng khá nhiều sản phẩm và muốn sắp xếp lại cho gọn.",
    note: "Không kê đơn, không chẩn đoán bệnh da.",
  },
];

export const FLOW = [
  { n: "01", t: "Trò chuyện", d: "Chúng mình hỏi về thói quen, cảm giác da và những gì bạn đang dùng. Không có câu trả lời đúng hay sai.", m: "10 phút" },
  { n: "02", t: "Nhìn da dưới ánh sáng tự nhiên", d: "Quan sát bằng mắt thường và trao đổi cùng bạn để chọn bước chăm sóc phù hợp. Đây không phải là chẩn đoán.", m: "5 phút" },
  { n: "03", t: "Chăm sóc từng bước", d: "Mỗi bước được nói trước: dùng gì, bao lâu, cảm giác thế nào. Bạn có thể dừng hoặc đổi bước bất cứ lúc nào.", m: "30 đến 70 phút" },
  { n: "04", t: "Ghi lại quy trình", d: "Bạn nhận bản ghi ngắn các bước nên giữ ở nhà và khi nào nên nhìn lại, kể cả khi nào nên gặp bác sĩ da liễu.", m: "5 phút" },
] as const;

export const ACTIVES = [
  { k: "ha", t: "Cấp ẩm kéo nước", d: "Các chất giữ nước như glycerin, hyaluronic acid. Hợp với đa số loại da, dùng trên da hơi ẩm.", tag: "Nhẹ nhàng" },
  { k: "calm", t: "Làm dịu", d: "Panthenol, chiết xuất rau má, allantoin: nhóm thường chọn cho da dễ căng, hơi nóng sau nắng.", tag: "Nhẹ nhàng" },
  { k: "bar", t: "Củng cố hàng rào da", d: "Ceramide, cholesterol, acid béo: giúp lớp dưỡng ẩm giữ nước tốt hơn, nhất là da khô.", tag: "Nhẹ nhàng" },
  { k: "vitc", t: "Chống oxy hoá", d: "Vitamin C các dạng, vitamin E, niacinamide. Nên thử từ nồng độ thấp, từng chất một.", tag: "Thử từng bước" },
  { k: "acid", t: "Tẩy tế bào chết hoá học", d: "AHA, BHA, PHA. Dùng thưa và ít, tránh khi da đang rát đỏ hoặc bong. Da nhạy cảm nên hỏi trước.", tag: "Cần thận trọng" },
  { k: "retinoid", t: "Nhóm retinoid", d: "Nhóm hoạt chất mạnh, có thể gây khô và kích ứng. Nên hỏi bác sĩ da liễu trước khi dùng, nhất là khi mang thai.", tag: "Hỏi bác sĩ da liễu" },
  { k: "spf", t: "Chống nắng", d: "Bước quan trọng nhất ban ngày với mọi loại da. Chọn kết cấu bạn chịu thoa đều mỗi ngày.", tag: "Mỗi sáng" },
] as const;

export const MARQUEE = ["Cấp ẩm", "Làm dịu", "Hàng rào da", "Chống oxy hoá", "Chống nắng", "Làm sạch dịu", "Từng bước một", "Vừa đủ"];

export const FAQ = [
  {
    q: "NÉA có phải là phòng khám da liễu không?",
    a: "Không. NÉA là studio chăm sóc da cơ bản và thư giãn. Chúng mình không chẩn đoán, không kê đơn và không điều trị bệnh da. Khi bạn có dấu hiệu cần y tế, chúng mình sẽ khuyên bạn gặp bác sĩ da liễu.",
  },
  {
    q: "Da nhạy cảm hoặc đang kích ứng có làm được không?",
    a: "Bạn cứ nói rõ khi đặt hẹn. Với da đang đỏ rát, bong nhiều hoặc đang dùng thuốc bôi, chúng mình khuyên hỏi bác sĩ da liễu trước. Với da nhạy cảm ổn định, chúng mình chọn bước rất nhẹ và có thể thử một vùng nhỏ trước.",
  },
  {
    q: "Mang thai hoặc cho con bú thì sao?",
    a: "Hãy cho chúng mình biết trước buổi hẹn. Chúng mình giữ quy trình ở mức nhẹ nhất và không gợi ý nhóm hoạt chất mạnh. Với bất kỳ sản phẩm mới nào, bạn nên hỏi bác sĩ của mình.",
  },
  {
    q: "Bao lâu nên đến một lần?",
    a: "Không có con số chung. Nhiều người chọn một buổi để làm quen, sau đó đến khi cần nghỉ ngơi hoặc muốn rà lại routine. Chúng mình không bán gói bắt buộc.",
  },
  {
    q: "Studio dùng sản phẩm gì?",
    a: "Chúng mình chọn theo nhóm thành phần và cảm giác khi dùng, và nói rõ từng bước trước khi thực hiện. Bạn có thể từ chối bất kỳ sản phẩm nào.",
  },
  {
    q: "Đặt lịch và hỏi thêm như thế nào?",
    a: "Bạn để lại nhu cầu ở form tư vấn, chúng mình sẽ trao đổi để chọn buổi phù hợp. Công cụ Skin Routine Builder trên trang chỉ tạo bản tóm tắt ngay trong trình duyệt của bạn.",
  },
] as const;

export const FOOTER = {
  area: "Đà Nẵng",
  mail: "xinchao@neaskin.example",
  phone: "0236 000 0000",
};
