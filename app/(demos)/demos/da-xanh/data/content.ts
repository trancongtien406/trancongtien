/** Toàn bộ nội dung chữ của trang NÉA Skin Studio. Chuỗi ở dạng NFC. */

export const IMG = "/images/demos/da-xanh";
export const BRAND = "NÉA Skin Studio";

export const NAV = [
  { href: "#lieu-trinh", label: "Liệu trình" },
  { href: "#quy-trinh", label: "Tại studio" },
  { href: "#luu-y", label: "Trước và sau" },
  { href: "#routine", label: "Routine tại nhà" },
  { href: "#dat-lich", label: "Giờ và đặt lịch" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const AREA = "Quận Thanh Khê, Đà Nẵng";

/** 3 sự thật ở hero. */
export const FACTS = [
  { k: "Liệu trình từ", v: "350.000 ₫", d: "45 đến 90 phút một buổi" },
  { k: "Giờ mở cửa", v: "9:00 – 20:00", d: "Thứ Bảy đến 18:00, nghỉ Chủ nhật" },
  { k: "Hẹn trước", v: "Phòng riêng", d: "mỗi khách một phòng, không ghép" },
] as const;

export const STUDIO_POINTS = [
  { b: "Lắng nghe trước", s: "Mỗi buổi bắt đầu từ điều bạn đang cảm thấy ở da, không phải từ một gói có sẵn." },
  { b: "Vừa đủ thì dừng", s: "Ít bước hơn nhưng đúng chỗ. Chúng mình sẵn lòng bớt đi một sản phẩm." },
  { b: "Nói rõ từng bước", s: "Dùng gì, bao lâu, cảm giác thế nào, bạn đều biết trước và có thể dừng bất cứ lúc nào." },
] as const;

export const STUDIO_FACTS = ["Hai phòng chăm sóc riêng, ánh sáng ngày", "Khăn, dụng cụ dùng riêng từng khách", "Đón khách theo hẹn, không ghép lịch", "Có khu chờ và nước ấm"];

export const MANIFESTO =
  "Làn da không cần thêm áp lực. Đôi khi điều cần thiết chỉ là một quy trình vừa đủ, những bước nhẹ nhàng và một khoảng thời gian dành cho chính mình.";

export type Feel = "dry" | "oily" | "sun" | "tired" | "unsure";
export const FEELS: { id: Feel; label: string }[] = [
  { id: "dry", label: "Da khô, căng" },
  { id: "oily", label: "Da dầu, bí" },
  { id: "sun", label: "Da sau nắng" },
  { id: "tired", label: "Mệt, nặng vai gáy" },
  { id: "unsure", label: "Chưa biết chọn gì" },
];

export type Treatment = {
  id: string;
  group: string;
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
  feels: Feel[];
};

/** Giá tham khảo (VND). Chỉ là chăm sóc da cơ bản, không thủ thuật xâm lấn. */
export const TREATMENTS: Treatment[] = [
  {
    id: "lam-sach-diu", group: "Làm sạch", name: "Làm sạch dịu và cấp ẩm", minutes: 60, price: 380000, feels: ["dry", "unsure"],
    tint: "#cdbfff", img: "hu-kem-la", alt: "Hai hũ kem trắng và hồng nhạt giữa những chiếc lá nhỏ trên nền đá trắng", pos: "50% 50%",
    summary: "Buổi chăm sóc nền tảng: làm sạch nhẹ, lau tinh chất cấp ẩm, mặt nạ dịu và dưỡng kết thúc.",
    steps: ["Trò chuyện về thói quen và cảm giác da", "Làm sạch hai lớp nhẹ nhàng", "Lau tinh chất cấp ẩm", "Mặt nạ dịu 12 phút", "Dưỡng ẩm và chống nắng"],
    suits: "Bạn muốn bắt đầu lại với những bước cơ bản, hoặc đã lâu chưa dành thời gian cho da.",
    note: "Phù hợp để làm quen với studio.",
  },
  {
    id: "lam-sach-sau", group: "Làm sạch", name: "Làm sạch bề mặt chuyên sâu", minutes: 75, price: 480000, feels: ["oily"],
    tint: "#b8e6f2", img: "mat-nuoc", alt: "Mặt nước phẳng với những gợn sóng tròn trong ánh sáng hồng và xanh nhạt", pos: "50% 45%",
    summary: "Làm sạch kỹ hơn lớp bụi và dầu thừa trên bề mặt bằng hơi ấm, enzyme dịu và massage nhẹ.",
    steps: ["Làm sạch hai lớp", "Xông hơi ấm vừa phải", "Enzyme dịu làm mềm bề mặt", "Massage vùng chữ T", "Mặt nạ làm dịu và dưỡng ẩm"],
    suits: "Da thiên dầu hoặc hỗn hợp, thích cảm giác sạch thoáng nhưng không muốn can thiệp mạnh.",
    note: "Không lấy nhân mụn, không dùng kim hay thiết bị xâm lấn.",
  },
  {
    id: "cap-am", group: "Cấp ẩm", name: "Cấp ẩm nhiều lớp", minutes: 90, price: 560000, feels: ["dry"],
    tint: "#aee3f0", img: "kem-xanh", alt: "Hai vệt kem trắng mịn và hai giọt tinh chất vàng nhạt trên nền xanh trời", pos: "50% 50%",
    summary: "Xếp lớp ẩm từng bước: toner, tinh chất, mặt nạ ẩm và khoá ẩm, kèm massage thư giãn.",
    steps: ["Làm sạch dịu", "Toner cấp nước", "Tinh chất cấp ẩm nhiều lớp", "Mặt nạ ẩm 15 phút", "Massage và khoá ẩm"],
    suits: "Da thiếu nước, dễ bong khô hoặc hay căng sau khi rửa mặt.",
    note: "Chúng mình giải thích từng nhóm thành phần trước khi dùng.",
  },
  {
    id: "diu-da", group: "Phục hồi", name: "Dịu da sau nắng", minutes: 60, price: 420000, feels: ["sun", "dry"],
    tint: "#d8c8ff", img: "oai-huong", alt: "Cành oải hương hồng tím trong ánh sáng mềm, nền mờ", pos: "50% 40%",
    summary: "Làm mát và nâng niu làn da sau những ngày ở ngoài trời nhiều: tinh chất dịu, mặt nạ lạnh và dưỡng ẩm.",
    steps: ["Làm sạch rất nhẹ", "Lau tinh chất làm dịu", "Mặt nạ mát 15 phút", "Massage mặt nhẹ", "Dưỡng ẩm và nhắc việc chống nắng"],
    suits: "Da căng, khô hoặc hơi nóng sau khi đi biển, đi nắng.",
    note: "Nếu da đang rát đỏ nhiều hoặc có vết bỏng nắng, hãy gặp bác sĩ da liễu trước.",
  },
  {
    id: "vung-mat-co", group: "Vùng mắt và cổ", name: "Chăm sóc vùng mắt và cổ", minutes: 45, price: 390000, feels: ["tired"],
    tint: "#c9f0f7", img: "pipet-xanh", alt: "Ống pipet thuỷ tinh phía trên lọ thuỷ tinh nâu, nền xanh nhạt", pos: "50% 40%",
    summary: "Vùng da mỏng quanh mắt và cổ được làm sạch nhẹ, đắp mặt nạ mắt, thoa tinh chất cấp ẩm và massage nhịp chậm.",
    steps: ["Tẩy trang vùng mắt bằng bông mềm", "Đắp mặt nạ mắt mát 10 phút", "Tinh chất cấp ẩm cho mắt và cổ", "Massage nhẹ quanh mắt, cằm và cổ", "Dưỡng ẩm và nhắc chống nắng"],
    suits: "Bạn làm việc nhiều với màn hình, hay thiếu ngủ và thấy vùng mắt khô, căng.",
    note: "Chỉ chăm sóc bề mặt, không dùng thiết bị hay kim. Không hứa xoá nếp nhăn hay quầng thâm.",
  },
  {
    id: "massage-mat", group: "Thư giãn", name: "Massage mặt, cổ và vai", minutes: 45, price: 350000, feels: ["tired"],
    tint: "#e0d3ff", img: "tay-thoa-kem", alt: "Hai bàn tay thoa kem dưỡng lên cánh tay trên mặt bàn trắng", pos: "50% 55%",
    summary: "Massage mặt và cổ vai bằng tay, nhịp chậm, tập trung vào cảm giác thả lỏng.",
    steps: ["Làm sạch nhẹ", "Thoa lớp dầu hoặc kem massage", "Massage mặt, cổ, vai", "Lau sạch", "Dưỡng ẩm kết thúc"],
    suits: "Bạn cần một khoảng nghỉ cho cơ mặt và vai gáy sau nhiều giờ làm việc.",
    note: "Đây là buổi thư giãn, không dùng để điều trị.",
  },
  {
    id: "tu-van", group: "Tư vấn", name: "Buổi tư vấn thói quen da", minutes: 45, price: 250000, feels: ["unsure"],
    tint: "#c4ecf5", img: "khan-trang", alt: "Chồng khăn bông trắng gấp gọn trên bàn trắng", pos: "50% 50%",
    summary: "Ngồi lại cùng nhau rà soát routine hiện tại, bỏ bớt bước thừa và ghi lại quy trình vừa sức cho bạn. Không chăm sóc trực tiếp lên da.",
    steps: ["Xem lại các sản phẩm đang dùng", "Rà soát thứ tự và cách dùng", "Gợi ý bớt hoặc thêm bước", "Ghi lại quy trình sáng, tối", "Hẹn nhắc nhìn lại sau một thời gian"],
    suits: "Bạn đang dùng khá nhiều sản phẩm và muốn sắp xếp lại cho gọn.",
    note: "Không kê đơn, không chẩn đoán bệnh da.",
  },
];

export const FLOW = [
  { n: "01", t: "Đón và trò chuyện", d: "Bạn thay đồ thoải mái, uống nước ấm. Chúng mình hỏi về thói quen, cảm giác da, sản phẩm đang dùng và những điều bạn không muốn làm. Không có câu trả lời đúng hay sai.", m: "10 phút" },
  { n: "02", t: "Soi da dưới ánh sáng ngày", d: "Quan sát bằng mắt thường và đèn soi phóng đại ở độ ẩm, bề mặt, vùng khô hay bóng dầu để chọn bước phù hợp. Đây không phải là chẩn đoán.", m: "5 đến 10 phút" },
  { n: "03", t: "Làm sạch", d: "Tẩy trang, rửa mặt hai lớp bằng nước ấm vừa phải. Với da hay căng, chúng mình dùng sản phẩm dịu và nói rõ trước khi chạm vào từng vùng.", m: "10 đến 15 phút" },
  { n: "04", t: "Liệu trình", d: "Thực hiện đúng liệu trình đã chọn: tinh chất, mặt nạ, massage. Bạn có thể đổi bước, tăng giảm lực tay hoặc dừng bất cứ lúc nào.", m: "20 đến 55 phút" },
  { n: "05", t: "Dặn dò và ghi lại", d: "Bạn nhận bản ghi ngắn các bước nên giữ ở nhà, điều nên tránh trong 48 giờ và khi nào nên nhìn lại, kể cả khi nào nên gặp bác sĩ da liễu.", m: "5 phút" },
] as const;

export const BEFORE_AFTER = {
  before: {
    t: "Trước liệu trình",
    list: [
      "Đến với da sạch hoặc mặt mộc nếu được; studio có tẩy trang.",
      "Báo nếu bạn đang mang thai, cho con bú, hay dị ứng với sản phẩm hoặc hương liệu.",
      "Báo nếu đang dùng thuốc bôi da theo toa; chúng mình sẽ khuyên hỏi bác sĩ trước.",
      "Tránh tẩy tế bào chết hoá học và đi nắng gắt trong 48 giờ trước buổi hẹn.",
      "Da đang rát đỏ, có vết thương hoặc nổi mụn viêm đau: hãy dời lịch và gặp bác sĩ da liễu.",
    ],
  },
  after: {
    t: "Sau liệu trình",
    list: [
      "Dùng kem chống nắng vào sáng hôm sau, kể cả khi trời râm.",
      "Tránh tẩy tế bào chết, sản phẩm mới hoặc xông hơi nóng trong 48 giờ.",
      "Uống đủ nước, rửa mặt bằng nước mát đến ấm, không chà xát.",
      "Da hơi hồng nhẹ vài chục phút là bình thường; đỏ rát kéo dài thì liên hệ studio hoặc gặp bác sĩ da liễu.",
      "Giữ bản ghi quy trình mà chúng mình đưa, bớt hoặc thêm từng bước một.",
    ],
  },
} as const;

export const HOURS = [
  { d: "Thứ Hai", t: "9:00 – 20:00" }, { d: "Thứ Ba", t: "9:00 – 20:00" }, { d: "Thứ Tư", t: "9:00 – 20:00" },
  { d: "Thứ Năm", t: "9:00 – 20:00" }, { d: "Thứ Sáu", t: "9:00 – 20:00" }, { d: "Thứ Bảy", t: "9:00 – 18:00" }, { d: "Chủ nhật", t: "Nghỉ" },
] as const;

export const POLICIES = [
  { t: "Đặt lịch", d: "Hẹn trước ít nhất một ngày để studio dành phòng và thời gian cho bạn. Không ghép lịch, mỗi buổi chỉ có một khách trong phòng." },
  { t: "Giữ chỗ", d: "Buổi dưới 500.000 ₫ không cần cọc. Buổi từ 500.000 ₫ giữ chỗ bằng cọc 30%, trừ vào tổng khi bạn đến." },
  { t: "Dời và huỷ", d: "Dời hoặc huỷ trước giờ hẹn 12 giờ thì không mất phí. Dưới 12 giờ, tiền cọc không hoàn lại." },
  { t: "Đến trễ", d: "Trễ đến 15 phút, buổi được rút ngắn ở bước cuối cho kịp lịch sau. Trễ quá 30 phút, studio xin dời sang buổi khác." },
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

export const FAQ = [
  {
    q: "NÉA có phải là phòng khám da liễu không?",
    a: "Không. NÉA là studio chăm sóc da cơ bản và thư giãn. Chúng mình không chẩn đoán, không kê đơn và không điều trị bệnh da. Khi bạn có dấu hiệu cần y tế, chúng mình sẽ khuyên bạn gặp bác sĩ da liễu.",
  },
  {
    q: "Lần đầu đến nên chọn liệu trình nào?",
    a: "Nhiều người chọn Làm sạch dịu và cấp ẩm (60 phút) để làm quen, hoặc Buổi tư vấn thói quen da (45 phút) nếu muốn sắp xếp lại routine ở nhà. Chọn theo cảm giác da của bạn ở mục Liệu trình, hoặc hỏi studio khi đặt lịch.",
  },
  {
    q: "Giá trên trang đã gồm mọi thứ chưa?",
    a: "Giá là giá tham khảo cho mỗi buổi, đã gồm sản phẩm dùng trong buổi và khăn, dụng cụ riêng. Sản phẩm mang về (nếu bạn muốn) tính riêng và luôn do bạn quyết định.",
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
    q: "Có cần đến với mặt mộc không?",
    a: "Không bắt buộc. Studio có tẩy trang và bước làm sạch đầu buổi. Nếu bạn vừa trang điểm xong, chỉ cần báo để chúng mình dành thêm vài phút tẩy trang.",
  },
  {
    q: "Bao lâu nên đến một lần?",
    a: "Không có con số chung. Nhiều người chọn một buổi để làm quen, sau đó đến khi cần nghỉ ngơi hoặc muốn rà lại routine. Chúng mình không bán gói bắt buộc.",
  },
  {
    q: "Tôi có nhận được kết quả cụ thể không?",
    a: "Chăm sóc cơ bản giúp da được làm sạch, cấp ẩm và thư giãn trong buổi, còn thay đổi của da phụ thuộc thói quen hằng ngày. Chúng mình không cam kết kết quả và không dùng ảnh trước sau.",
  },
  {
    q: "Đặt lịch và hỏi thêm như thế nào?",
    a: "Bạn để lại nhu cầu ở form tư vấn, chúng mình sẽ trao đổi để chọn buổi phù hợp. Công cụ Skin Routine Builder trên trang chỉ tạo bản tóm tắt ngay trong trình duyệt của bạn.",
  },
] as const;

export const FOOTER = {
  area: "Quận Thanh Khê, Đà Nẵng",
  mail: "xinchao@neaskin.example",
  phone: "0236 000 0000",
};
