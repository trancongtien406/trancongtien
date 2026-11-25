export const BRAND = "Khối Nếp";
export const SLOGAN = "Không gian có nếp sống.";

export const NAV = [
  { href: "#spaces", label: "Không gian" },
  { href: "#services", label: "Dịch vụ" },
  { href: "#materials", label: "Vật liệu" },
  { href: "#process", label: "Quy trình" },
];

export const STORY =
  "Khối Nếp bắt đầu từ một câu hỏi giản dị: điều gì khiến một không gian trở thành nhà? Không chỉ là đồ nội thất đẹp, vật liệu tốt hay những đường nét chính xác, mà còn là cách mọi thứ hòa vào nhịp sống của mỗi người. Chúng tôi nhìn thiết kế như một quá trình lắng nghe, sắp xếp và loại bỏ những điều không cần thiết. Từ ánh sáng buổi sáng, bề mặt gỗ quen thuộc đến khoảng trống giữa những món đồ, mỗi chi tiết đều có chủ đích. Khối Nếp hướng đến những không gian vừa vặn với đời sống, đủ tinh tế để yêu thích và đủ thực tế để sống cùng năm tháng.";

export const PRINCIPLES = [
  { n: "01", t: "Công năng trước hình thức", d: "Mỗi bố cục bắt đầu bằng việc hiểu cách một không gian được sử dụng." },
  { n: "02", t: "Vật liệu có lý do", d: "Mỗi bề mặt được cân nhắc từ cảm giác chạm, độ bền và khả năng bảo trì." },
  { n: "03", t: "Đẹp trong đời sống", d: "Thiết kế cần phù hợp với nhịp sống hằng ngày, không chỉ đẹp trong khung hình." },
];

export interface Concept {
  id: string;
  name: string;
  type: string;
  area: string;
  style: string;
  photo: string;
  ratio: string;
  alt: string;
  desc: string;
  materials: string[];
  preset: string;
}

export const CONCEPTS: Concept[] = [
  {
    id: "KN-01", name: "Nếp Nhà", type: "Căn hộ", area: "78 m²", style: "Warm Minimalism",
    photo: "bedroom", ratio: "3 / 2", alt: "Phòng ngủ tối giản với giường lanh trắng và bàn đầu giường gỗ ép",
    desc: "Một căn hộ hướng đến sự ấm áp và gọn gàng. Tông gỗ sáng, bề mặt trung tính và đồ nội thất có tỷ lệ vừa phải giúp không gian nhỏ trở nên thoáng hơn.",
    materials: ["Gỗ sồi sáng", "Travertine", "Linen tự nhiên"], preset: "nep-am",
  },
  {
    id: "KN-02", name: "Khoảng Thở", type: "Nhà phố", area: "145 m²", style: "Contemporary",
    photo: "stairs", ratio: "3 / 4", alt: "Cầu thang gỗ lơ lửng cạnh bức tường trắng",
    desc: "Concept nhà phố chú trọng kết nối theo chiều đứng. Ánh sáng tự nhiên, khoảng thông tầng và vật liệu có sắc độ nhẹ tạo cảm giác mở giữa các khu vực sinh hoạt.",
    materials: ["Gỗ sồi sáng", "Microcement", "Vải olive"], preset: "moc-xanh",
  },
  {
    id: "KN-03", name: "Tĩnh", type: "Biệt thự", area: "220 m²", style: "Natural Modern",
    photo: "bedroom-detail", ratio: "3 / 4", alt: "Giường vải lanh trắng cạnh bình gốm đặt trên mặt gỗ thô",
    desc: "Một không gian sống chậm với gỗ tự nhiên, đá và vải linen. Màu sắc tiết chế để ánh sáng và chất liệu trở thành những chi tiết nổi bật.",
    materials: ["Gỗ óc chó", "Microcement", "Linen tự nhiên"], preset: "tinh-tram",
  },
  {
    id: "KN-04", name: "Mạch", type: "Văn phòng", area: "95 m²", style: "Industrial Warm",
    photo: "loft", ratio: "16 / 10", alt: "Không gian mở với cột và trần bê tông, cửa kính nhìn ra mặt nước",
    desc: "Concept văn phòng nhỏ đề cao sự tập trung, tính linh hoạt và kết nối. Những bề mặt mộc được cân bằng bởi ánh sáng ấm và hệ lưu trữ gọn gàng.",
    materials: ["Gỗ óc chó", "Microcement", "Linen tự nhiên"], preset: "tinh-tram",
  },
];

export const SERVICES = [
  { n: "01", name: "Thiết kế nội thất", scope: "design" as const, desc: "Khảo sát nhu cầu, bố trí mặt bằng, concept, phối cảnh 3D, hồ sơ kỹ thuật.", who: "Dành cho người cần xác định rõ không gian sẽ được tổ chức như thế nào trước khi bắt đầu thi công.", price: "250.000 ₫/m²", cta: "Dự toán phí thiết kế" },
  { n: "02", name: "Thi công hoàn thiện", scope: "build" as const, desc: "Hạng mục nội thất cố định, đồ gỗ, hoàn thiện bề mặt theo thiết kế đã thống nhất.", who: "Dành cho người đã có định hướng thiết kế và muốn hình dung các hạng mục vật liệu, đồ nội thất cần thực hiện.", price: "Từ 2.000.000 ₫/m²", cta: "Dự toán hoàn thiện" },
  { n: "03", name: "Thiết kế & thi công", scope: "full" as const, desc: "Kết hợp thiết kế và hoàn thiện, đồng bộ vật liệu và công năng.", who: "Một cách tiếp cận xuyên suốt từ ý tưởng ban đầu đến dự kiến hoàn thiện, giúp cân đối thiết kế và ngân sách ngay từ đầu.", price: "Tính theo phạm vi", cta: "Dự toán trọn gói" },
];

export const PROCESS = [
  { n: "01", t: "Lắng nghe", d: "Tìm hiểu thói quen sống, nhu cầu sử dụng và phạm vi ngân sách.", time: "1–3 ngày" },
  { n: "02", t: "Định hình", d: "Phát triển mặt bằng, ngôn ngữ thiết kế và bảng vật liệu chủ đạo.", time: "5–7 ngày" },
  { n: "03", t: "Chi tiết hóa", d: "Xây dựng phối cảnh, lựa chọn nội thất và hồ sơ kỹ thuật.", time: "10–15 ngày" },
  { n: "04", t: "Hoàn thiện", d: "Hình dung kế hoạch thi công, kiểm tra vật liệu và bàn giao.", time: "20–45 ngày" },
];

export const FAQ = [
  { q: "Chi phí dự toán trên website có phải báo giá thực tế không?", a: "Không. Đơn giá, hệ số và khoảng dao động (−10% đến +20%) chỉ để bạn hình dung ngân sách. Đây không phải báo giá chính thức; chi phí thực tế phụ thuộc khảo sát và phạm vi công việc." },
  { q: "Tôi có thể chỉ chọn dịch vụ thiết kế không?", a: "Có. Ở phạm vi “Chỉ thiết kế”, công cụ chỉ tính phí thiết kế theo diện tích và hệ số công trình, đồng thời khoá nhóm mức hoàn thiện vì không ảnh hưởng đến kết quả." },
  { q: "Diện tích dùng để dự toán được tính như thế nào?", a: "Là diện tích sàn cần thiết kế hoặc hoàn thiện, nhập từ 20 đến 1.000 m², tối đa một chữ số thập phân. Công cụ không tự điều chỉnh số bạn nhập; nếu ngoài khoảng cho phép, lỗi sẽ hiện ngay cạnh ô nhập." },
  { q: "Dự toán đã bao gồm những gì?", a: "Chỉ gồm hai khoản: phí thiết kế và chi phí hoàn thiện. Chưa bao gồm VAT, thiết bị rời, vận chuyển hay các hạng mục ngoài phạm vi đã chọn." },
  { q: "Màu vật liệu trên màn hình có giống ngoài thực tế không?", a: "Chỉ tương đối. Màu hiển thị phụ thuộc vào màn hình, ánh sáng và quá trình in ấn mẫu. Bảng vật liệu ở đây dùng để tham khảo cảm hứng, không thay thế việc xem mẫu thật." },
  { q: "Bảng vật liệu của tôi được lưu ở đâu?", a: "Chỉ trong trình duyệt của bạn (localStorage), tối đa 20 bảng. Không có dữ liệu nào được gửi lên máy chủ, và bạn có thể xoá bất cứ lúc nào." },
  { q: "Các không gian trên website là gì?", a: "Đây là bốn concept không gian để bạn tham khảo phong cách, diện tích và vật liệu. Hình ảnh là ảnh stock có ghi công ở trang Credits." },
  { q: "Làm sao để trao đổi với Khối Nếp?", a: "Bạn có thể bấm “Bắt đầu dự án” để mở form tư vấn, nơi gửi nhu cầu và thông tin liên hệ. Công cụ trên trang này không gửi dữ liệu đi." },
];

export const FOOTER_GROUPS = [
  { title: "Khám phá", links: [["#spaces", "Không gian"], ["#services", "Dịch vụ"], ["#process", "Quy trình"]] },
  { title: "Công cụ", links: [["#budget", "Dự toán ngân sách"], ["#board", "Bảng vật liệu"], ["#materials", "Thư viện vật liệu"]] },
];
