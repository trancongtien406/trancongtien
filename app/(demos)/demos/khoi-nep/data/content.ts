export const BRAND = "Khối Nếp";
export const SLOGAN = "Không gian có nếp sống.";

export const NAV = [
  { href: "#services", label: "Dịch vụ" },
  { href: "#spaces", label: "Loại công trình" },
  { href: "#process", label: "Quy trình" },
  { href: "#packages", label: "Báo giá & bảo hành" },
  { href: "#materials", label: "Vật liệu" },
];

export const STORY =
  "Khối Nếp là công ty thiết kế và thi công nội thất tại Đà Nẵng, nhận căn hộ, nhà phố, văn phòng và cửa hàng. Một đội đảm nhiệm từ khảo sát hiện trạng, bố trí mặt bằng, phối cảnh 3D đến thi công đồ gỗ cố định và bàn giao, để thiết kế và thi công khớp nhau từ bản vẽ đầu tiên. Khách có thể chỉ thuê thiết kế, chỉ thuê thi công theo bản vẽ có sẵn, hoặc làm trọn gói. Báo giá được lập sau khi khảo sát, theo khối lượng thực tế và bảng vật liệu đã thống nhất.";

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
  /** hạng mục thường làm */
  scope: string[];
  time: string;
  budget: string;
}

/** Hồ sơ theo LOẠI công trình (không phải công trình đã bàn giao của khách cụ thể). */
export const CONCEPTS: Concept[] = [
  {
    id: "CT-01", name: "Căn hộ", type: "Căn hộ chung cư", area: "55–100 m²", style: "Tối giản ấm",
    photo: "bedroom", ratio: "3 / 2", alt: "Phòng ngủ tối giản với giường lanh trắng và bàn đầu giường gỗ ép",
    desc: "Căn hộ 1–3 phòng ngủ: tận dụng từng mét vuông bằng tủ âm tường, giường kết hợp lưu trữ và bếp liền phòng khách. Tông gỗ sáng, bề mặt trung tính để không gian nhỏ thoáng hơn.",
    materials: ["Gỗ sồi sáng", "Travertine", "Linen tự nhiên"], preset: "nep-am",
    scope: ["Bố trí lại mặt bằng", "Tủ bếp, tủ quần áo âm tường", "Trần thạch cao, đèn, rèm"], time: "Thiết kế 3–4 tuần, thi công 6–9 tuần", budget: "Thi công từ 2.000.000 ₫/m²",
  },
  {
    id: "CT-02", name: "Nhà phố", type: "Nhà phố, nhà ống", area: "100–200 m² sàn", style: "Đương đại",
    photo: "stairs", ratio: "3 / 4", alt: "Cầu thang gỗ lơ lửng cạnh bức tường trắng",
    desc: "Nhà phố nhiều tầng: ưu tiên lấy sáng và thông gió theo chiều đứng, cầu thang là trục chính, phân khu sinh hoạt chung và riêng theo tầng.",
    materials: ["Gỗ sồi sáng", "Microcement", "Vải olive"], preset: "moc-xanh",
    scope: ["Giếng trời, cầu thang, lan can", "Nội thất từng tầng", "Hệ cửa, vách, sàn gỗ"], time: "Thiết kế 4–6 tuần, thi công 10–16 tuần", budget: "Thi công từ 2.000.000 ₫/m²",
  },
  {
    id: "CT-03", name: "Văn phòng", type: "Văn phòng nhỏ và vừa", area: "60–200 m²", style: "Công nghiệp ấm",
    photo: "loft", ratio: "16 / 10", alt: "Không gian mở với cột và trần bê tông, cửa kính nhìn ra mặt nước",
    desc: "Văn phòng 10–40 chỗ: khu làm việc mở, phòng họp kín, góc tiếp khách và kho. Chú trọng âm học, ánh sáng làm việc và hệ lưu trữ gọn gàng; thi công không làm gián đoạn tòa nhà.",
    materials: ["Gỗ óc chó", "Microcement", "Linen tự nhiên"], preset: "tinh-tram",
    scope: ["Vách kính, vách thạch cao cách âm", "Bàn làm việc, tủ hồ sơ", "Điện nhẹ, chiếu sáng"], time: "Thiết kế 3–5 tuần, thi công 5–10 tuần", budget: "Thi công từ 2.000.000 ₫/m²",
  },
  {
    id: "CT-04", name: "Cửa hàng", type: "Cửa hàng, quán, showroom nhỏ", area: "40–150 m²", style: "Theo thương hiệu",
    photo: "bedroom-detail", ratio: "3 / 4", alt: "Giường vải lanh trắng cạnh bình gốm đặt trên mặt gỗ thô",
    desc: "Mặt bằng kinh doanh: lối vào thu hút, đường đi khách rõ ràng, kệ trưng bày hoặc quầy theo hoạt động bán hàng. Tiến độ ngắn để sớm mở cửa; vật liệu chọn theo độ bền và dễ vệ sinh.",
    materials: ["Gỗ sồi sáng", "Microcement", "Vải olive"], preset: "nep-am",
    scope: ["Quầy, kệ, bảng hiệu", "Sàn, trần, chiếu sáng", "Cửa kính, mặt tiền"], time: "Thiết kế 2–4 tuần, thi công 4–8 tuần", budget: "Thi công từ 2.000.000 ₫/m²",
  },
];

export const SERVICES = [
  { n: "01", name: "Gói thiết kế", scope: "design" as const, desc: "Khảo sát nhu cầu, bố trí mặt bằng, concept, phối cảnh 3D, hồ sơ kỹ thuật.", who: "Dành cho người cần xác định rõ không gian sẽ được tổ chức như thế nào trước khi bắt đầu thi công.", price: "250.000 ₫/m²", cta: "Dự toán phí thiết kế" },
  { n: "02", name: "Gói thi công", scope: "build" as const, desc: "Hạng mục nội thất cố định, đồ gỗ, hoàn thiện bề mặt theo thiết kế đã thống nhất.", who: "Dành cho người đã có định hướng thiết kế và muốn hình dung các hạng mục vật liệu, đồ nội thất cần thực hiện.", price: "Từ 2.000.000 ₫/m²", cta: "Dự toán hoàn thiện" },
  { n: "03", name: "Gói trọn gói", scope: "full" as const, desc: "Kết hợp thiết kế và hoàn thiện, đồng bộ vật liệu và công năng.", who: "Một cách tiếp cận xuyên suốt từ ý tưởng ban đầu đến dự kiến hoàn thiện, giúp cân đối thiết kế và ngân sách ngay từ đầu.", price: "Tính theo phạm vi", cta: "Dự toán trọn gói" },
];

export const PROCESS = [
  { n: "01", t: "Khảo sát hiện trạng", d: "Đến công trình đo đạc, chụp ảnh, ghi nhu cầu sử dụng và khoảng ngân sách; kiểm tra điện nước, kết cấu và quy định của tòa nhà.", time: "1–2 ngày", out: "Bản đo hiện trạng, biên bản nhu cầu" },
  { n: "02", t: "Concept & mặt bằng", d: "Đề xuất 1–2 phương án bố trí mặt bằng và hướng phong cách; thống nhất công năng từng phòng.", time: "5–7 ngày", out: "Mặt bằng bố trí, moodboard, bảng vật liệu sơ bộ" },
  { n: "03", t: "Phối cảnh 3D & hồ sơ", d: "Dựng phối cảnh các không gian chính, chốt vật liệu, lập hồ sơ kỹ thuật và dự toán chi tiết.", time: "10–15 ngày", out: "Phối cảnh 3D, bản vẽ thi công, bảng dự toán" },
  { n: "04", t: "Thi công", d: "Sản xuất đồ gỗ tại xưởng, thi công tại công trình; báo tiến độ theo tuần, nghiệm thu từng hạng mục.", time: "30–60 ngày", out: "Nhật ký thi công, biên bản nghiệm thu từng đợt" },
  { n: "05", t: "Bàn giao & bảo hành", d: "Vệ sinh, kiểm tra tổng thể, hướng dẫn sử dụng và bảo quản; lưu hồ sơ để bảo hành.", time: "3–5 ngày", out: "Biên bản bàn giao, hồ sơ hoàn công, phiếu bảo hành" },
];

export const QUOTE_STEPS = [
  { t: "Khảo sát và đo đạc", d: "Báo giá chỉ lập sau khi đo đạc thực tế, không báo theo ảnh hay lời mô tả." },
  { t: "Bóc khối lượng theo bản vẽ", d: "Từng hạng mục (đồ gỗ, sàn, trần, điện nước) có đơn vị, khối lượng, vật liệu và đơn giá ghi rõ." },
  { t: "Thanh toán theo đợt", d: "Thường chia 3 đợt: ký hợp đồng, nghiệm thu phần thô và đồ gỗ, bàn giao. Tỉ lệ ghi trong hợp đồng." },
  { t: "Phát sinh phải có phụ lục", d: "Mọi thay đổi so với bản vẽ được báo giá bằng văn bản và chỉ làm sau khi bạn đồng ý." },
];

export const WARRANTY = [
  { t: "Bảo hành thi công", d: "Theo từng hạng mục, thời hạn ghi trong hợp đồng; lỗi do thi công được sửa không tính phí." },
  { t: "Bảo hành vật liệu", d: "Theo chính sách của nhà sản xuất từng vật liệu; Khối Nếp hỗ trợ liên hệ và đổi bảo hành." },
  { t: "Không thuộc bảo hành", d: "Hao mòn sử dụng, tự ý sửa chữa, ẩm mốc do kết cấu tòa nhà hoặc tác động ngoài thỏa thuận." },
];

export const FAQ = [
  { q: "Khảo sát có mất phí không và gồm những gì?", a: "Khảo sát tại công trình trong nội thành Đà Nẵng không thu phí khi bạn dự định dùng dịch vụ của Khối Nếp. Đội ngũ đo đạc, chụp ảnh hiện trạng và ghi nhu cầu; bạn nhận lại biên bản khảo sát. Khu vực xa trung tâm có thể phát sinh phí đi lại, báo trước khi hẹn." },
  { q: "Chi phí dự toán trên website có phải báo giá thực tế không?", a: "Không. Đơn giá, hệ số và khoảng dao động (−10% đến +20%) chỉ để bạn hình dung ngân sách. Báo giá chính thức chỉ lập sau khảo sát, theo khối lượng và vật liệu đã thống nhất." },
  { q: "Tôi có thể chỉ thuê thiết kế, rồi thi công nơi khác không?", a: "Có. Gói thiết kế bàn giao bản vẽ, phối cảnh 3D và bảng vật liệu để bạn dùng với đơn vị thi công bất kỳ. Nếu thi công cùng Khối Nếp, phí thiết kế được tính vào gói trọn gói theo thỏa thuận." },
  { q: "Từ lúc ký hợp đồng đến lúc dọn vào mất bao lâu?", a: "Căn hộ thường 9–13 tuần cả thiết kế và thi công; nhà phố 14–22 tuần. Thời gian cụ thể ghi trong hợp đồng, phụ thuộc diện tích, tình trạng công trình và thời điểm bạn duyệt bản vẽ." },
  { q: "Nếu tôi muốn đổi thiết kế giữa chừng thì sao?", a: "Được đổi trong giai đoạn concept và 3D (có tối đa 2 lần chỉnh sửa lớn mỗi giai đoạn). Sau khi chốt bản vẽ thi công, thay đổi sẽ được báo giá phụ lục và có thể kéo dài tiến độ." },
  { q: "Thanh toán chia như thế nào?", a: "Thường chia theo đợt gắn với tiến độ: đợt 1 khi ký hợp đồng, đợt 2 khi nghiệm thu phần đồ gỗ và hoàn thiện chính, đợt cuối khi bàn giao. Tỉ lệ và mốc cụ thể ghi trong hợp đồng." },
  { q: "Bảo hành như thế nào?", a: "Bảo hành thi công theo từng hạng mục với thời hạn ghi trong hợp đồng; vật liệu theo chính sách của nhà sản xuất. Phiếu bảo hành và hồ sơ hoàn công được giao khi bàn giao." },
  { q: "Màu vật liệu trên màn hình có giống ngoài thực tế không?", a: "Chỉ tương đối. Màu hiển thị phụ thuộc vào màn hình và ánh sáng. Bảng vật liệu trên trang dùng để tham khảo cảm hứng; mẫu thật được đưa tới bạn xem trước khi chốt." },
  { q: "Bảng vật liệu và dự toán của tôi được lưu ở đâu?", a: "Chỉ trong trình duyệt của bạn (localStorage), tối đa 20 bảng. Không có dữ liệu nào được gửi lên máy chủ, và bạn có thể xoá bất cứ lúc nào." },
  { q: "Làm sao để đặt lịch khảo sát?", a: "Bấm “Đặt lịch khảo sát” để mở form tư vấn, nơi gửi nhu cầu và cách liên hệ. Studio gọi lại để hẹn ngày giờ; các công cụ trên trang này không gửi dữ liệu đi." },
];

export const FOOTER_GROUPS = [
  { title: "Khám phá", links: [["#services", "Dịch vụ"], ["#spaces", "Loại công trình"], ["#process", "Quy trình"], ["#packages", "Báo giá & bảo hành"]] },
  { title: "Công cụ", links: [["#budget", "Dự toán ngân sách"], ["#floorplan", "Mặt bằng → phối cảnh"], ["#board", "Bảng vật liệu"], ["#materials", "Thư viện vật liệu"]] },
];
