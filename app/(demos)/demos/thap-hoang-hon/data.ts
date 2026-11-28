/** Toàn bộ nội dung minh hoạ của Tháp Hoàng Hôn (thương hiệu giả định). */

export const NAV = [
  { href: "#cong-trinh", label: "Công trình" },
  { href: "#xuong", label: "Xưởng" },
  { href: "#nang-luc", label: "Năng lực" },
  { href: "#quy-trinh", label: "Quy trình" },
  { href: "#nhat-ky", label: "Nhật ký" },
  { href: "#lien-he", label: "Liên hệ" },
] as const;

export const SCENES = [
  {
    src: "s0", pos: "50% 55%", k: "Tổng thầu · Ven sông · Từ 2004", stop: "00",
    a: "Chúng tôi xây cho giờ", b: "ánh sáng đổi màu.",
    p: "Nhà ở cao tầng, công trình công cộng và gia cố kháng chấn quanh vùng cửa sông, được tính từ lần khảo sát đầu tiên xem chúng sẽ trông và cảm ra sao lúc hoàng hôn, và mọi giờ sau đó.",
    alt: "Hoàng hôn tím cam trên nhịp cầu thép bắc qua mặt nước (ảnh minh hoạ)",
  },
  {
    src: "s1", pos: "50% 60%", k: "01 — Móng", stop: "01",
    a: "Mọi thứ bắt đầu", b: "dưới mực nước.",
    p: "212 cọc thép, đóng sâu 38 mét qua lớp bùn sông tới tầng đá gốc, trước khi cho phép dựng bất kỳ tầng sàn nào.",
    alt: "Cây cầu sáng đèn trên mặt nước lúc chạng vạng (ảnh minh hoạ)",
  },
  {
    src: "s2", pos: "50% 50%", k: "02 — Tổng thể", stop: "02",
    a: "Ba toà tháp.", b: "Một khu phố.",
    p: "Ánh Hà Riverside: 286 căn hộ, lối đi bộ ven sông và một khu vườn trồng trên cao mười bốn tầng.",
    alt: "Cụm nhà cao tầng ven biển nhìn từ trên cao (ảnh minh hoạ)",
  },
  {
    src: "s3", pos: "50% 40%", k: "03 — Vỏ bao che", stop: "03",
    a: "4.112 tấm kính.", b: "Sai số chưa tới 3 mm.",
    p: "Mỗi tấm mặt dựng được chế tạo sẵn ngoài công xưởng, đánh số, thử gió và thử nước, rồi lắp với dung sai chưa tới ba milimét.",
    alt: "Mặt dựng kính ánh vàng cam của toà nhà lúc chiều muộn (ảnh minh hoạ)",
  },
  {
    src: "s4", pos: "50% 45%", k: "04 — Nội thất", stop: "04",
    a: "Những căn phòng", b: "chờ hoàng hôn.",
    p: "Trần cao ba mét rưỡi, kính sát sàn, mỗi thanh đứng được đặt sao cho đường chân trời thành phố không bao giờ bị cắt đôi.",
    alt: "Căn hộ kính sát sàn nhìn ra thành phố lúc chiều tà (ảnh minh hoạ)",
  },
] as const;

export const STOPS = ["Móng", "Tổng thể", "Vỏ bao che", "Nội thất"] as const;

export const CASE_CARDS = [
  { src: "card-a", t: "Mặt dựng phía tây", f: "FIG. 03 / 06", pos: "50% 45%", x: -30, y: -6, w: 24 },
  { src: "s0", t: "Nhịp cầu nhìn từ sảnh", f: "FIG. 04 / 06", pos: "40% 50%", x: 22, y: 4, w: 30 },
  { src: "card-b", t: "Tháp B, tầng 21", f: "FIG. 05 / 06", pos: "50% 35%", x: -18, y: 8, w: 20 },
  { src: "s2", t: "Ba toà nhìn từ mặt nước", f: "FIG. 06 / 06", pos: "50% 50%", x: 26, y: -8, w: 34 },
  { src: "card-c", t: "Căn mẫu tầng 12", f: "FIG. 07 / 06", pos: "50% 40%", x: -26, y: 2, w: 22 },
  { src: "s4", t: "Phòng khách hướng tây", f: "FIG. 08 / 06", pos: "60% 50%", x: 16, y: -4, w: 30 },
] as const;

export const STATS = [
  { v: 22, suf: "", l: "năm xây quanh vùng cửa sông" },
  { v: 118, suf: "", l: "công trình bàn giao, từ trường học tới tháp 31 tầng" },
  { v: 390, suf: "K", l: "mét vuông sàn đã hoàn thiện và đang vận hành" },
  { v: 96, suf: "%", l: "chủ đầu tư quay lại hoặc giới thiệu công trình tiếp theo" },
] as const;

export const DISCIPLINES = [
  { t: "Tiền thi công", i: "Số liệu trước bản vẽ.", p: "Mô hình chi phí cập nhật theo từng mốc thiết kế, rà soát tính thi công được và kế hoạch mặt bằng công trường ngay từ khi chưa có nét vẽ cuối.", tags: ["Dự toán", "Tiến độ", "Mặt bằng"] },
  { t: "Tổng thầu", i: "Một lịch. Một số điện thoại.", p: "Một giám sát trưởng có mặt từ lúc đào móng tới ngày bàn giao, điều hành mọi nhà thầu phụ trên cùng một mô hình thông tin công trình.", tags: ["Xây mới", "Nội thất", "Nhiều giai đoạn"] },
  { t: "Thiết kế & thi công", i: "Kiến trúc sư và thợ cả cùng một bàn.", p: "Hợp đồng trọn gói cho chủ đầu tư muốn một đội chịu trách nhiệm cả thiết kế, chi phí và tiến độ, với giá trần được cam kết.", tags: ["Một hợp đồng", "Giá trần", "Tiến độ nhanh"] },
  { t: "Mặt dựng & vỏ bao che", i: "Lớp da quyết định toà nhà.", p: "Tường kính đơn nguyên, ốp rainscreen và kính hiệu năng cao, được dựng mẫu thật cỡ 1:1 và thử nước trước khi lên công trình.", tags: ["Tường kính", "Dựng mẫu", "Thử nước"] },
  { t: "Gia cố kháng chấn", i: "Khung cũ, sức bền mới.", p: "Cách chấn đáy móng, gia cường khung thép và móng mới cho công trình lâu đời, thường khi người bên trong vẫn làm việc bình thường.", tags: ["Cách chấn", "Di sản", "Đang sử dụng"] },
] as const;

export const PROJECTS = [
  { t: "Ánh Hà Riverside", y: "2025", c: "nha-o", loc: "Cửa sông, TP. minh hoạ", d: "Ba toà tháp 286 căn hộ quanh lối đi bộ ven sông, khu vườn trên cao mười bốn tầng và mặt dựng 4.112 tấm kính đơn nguyên.", m: ["286 căn", "3 toà", "LEED Platinum"], img: "s2", pos: "50% 50%" },
  { t: "Nhà chờ phà Điểm Bến", y: "2022", c: "cong-cong", loc: "Bến phà phía Nam", d: "Nhà ga hành khách mái cong, kết cấu thép kết hợp gỗ ghép, mở cửa đón gió sông suốt năm.", m: ["4.200 m²", "Thép + gỗ", "14 tháng"], img: "s5", pos: "50% 50%" },
  { t: "Trường THCS Đồi Vọng", y: "2020", c: "khang-chan", loc: "Khu đồi phía Tây", d: "Gia cố kháng chấn cho khối lớp học năm 1962, giữ nguyên mặt đứng gạch và hành lang cửa vòm.", m: ["6.800 m²", "Cách chấn", "Học sinh vẫn học"], img: "card-b", pos: "50% 40%" },
  { t: "Cầu bộ hành Nhịp Lụa", y: "2019", c: "cong-cong", loc: "Kênh Nhiêu Lộc", d: "Cầu vòm thép nhịp 86 mét dành cho người đi bộ và xe đạp, dựng bằng cẩu nổi trong 9 đêm.", m: ["86 m nhịp", "Thép vòm", "9 đêm cẩu"], img: "s1", pos: "50% 55%" },
  { t: "Thư viện Cửa Sông", y: "2017", c: "cong-cong", loc: "Phường ven sông", d: "Công trình công cộng hai tầng, mái vườn đón nắng chiều, kính lọc sáng cho phòng đọc.", m: ["3.100 m²", "Mái vườn", "Chứng chỉ xanh"], img: "s4", pos: "50% 60%" },
  { t: "Kho Bến Cảng Đông", y: "2014", c: "khang-chan", loc: "Cảng sông Đông", d: "Nâng cấp chịu động đất cho cụm kho và cầu tàu, thi công xen kẽ để cảng không dừng một ngày.", m: ["11 hạng mục", "0 ngày dừng", "Cầu tàu mới"], img: "s0", pos: "50% 70%" },
] as const;

export const FILTERS = [
  { k: "all", l: "Tất cả" },
  { k: "nha-o", l: "Nhà ở" },
  { k: "cong-cong", l: "Công cộng" },
  { k: "khang-chan", l: "Kháng chấn" },
] as const;

export const STEPS = [
  { n: "01", t: "Khảo sát và thử nền", d: "Đo địa chất, thuỷ văn và nắng gió. Chúng tôi đứng trên mảnh đất đúng giờ hoàng hôn trước khi vẽ nét đầu tiên.", w: "3–5 tuần" },
  { n: "02", t: "Dự toán theo mốc", d: "Mô hình chi phí cập nhật ở mỗi mốc thiết kế. Bạn thấy con số đổi ra sao khi một vật liệu đổi.", w: "Song song thiết kế" },
  { n: "03", t: "Chốt giá và tiến độ", d: "Giá trần cam kết bằng văn bản, lịch thi công chia theo tuần, mỗi tuần có một người chịu trách nhiệm.", w: "2 tuần" },
  { n: "04", t: "Móng và kết cấu", d: "Cọc, bê tông, thép. Phần việc chúng tôi tự làm, vì đây là phần không thể sửa sau.", w: "Theo quy mô" },
  { n: "05", t: "Vỏ bao che và nội thất", d: "Mặt dựng chế tạo sẵn, dựng mẫu thật, thử nước. Kế đó là hoàn thiện, có mốc nghiệm thu từng tầng.", w: "Theo quy mô" },
  { n: "06", t: "Nghiệm thu giờ vàng", d: "Thử nắng thật vào đúng giờ vàng, rồi mới bàn giao hồ sơ hoàn công và chìa khoá.", w: "1 tuần" },
] as const;

export const SUN_FACTS = [
  { v: "4.112", l: "tấm mặt dựng, đánh số một–một" },
  { v: "< 3 mm", l: "sai số khi lắp mỗi tấm" },
  { v: "72 giờ", l: "thử nước liên tục cho mẫu 1:1" },
] as const;

export const TEAM = [
  { n: "Lê Minh Quân", r: "Tổng giám đốc", y: "27 năm nghề", i: "MQ" },
  { n: "Phạm Thu Hà", r: "Giám đốc kỹ thuật", y: "21 năm nghề", i: "TH" },
  { n: "Đặng Văn Khôi", r: "Trưởng ban mặt dựng", y: "18 năm nghề", i: "VK" },
  { n: "Trần Ngọc Anh", r: "Trưởng ban kháng chấn", y: "16 năm nghề", i: "NA" },
  { n: "Võ Bích Liên", r: "Giám sát trưởng", y: "19 năm nghề", i: "BL" },
  { n: "Hoàng Gia Bảo", r: "Quản lý dự toán", y: "12 năm nghề", i: "GB" },
] as const;

export const VOICES = [
  { q: "Họ là nhà thầu duy nhất đưa chúng tôi một tờ lịch ghi cả giờ nắng chiếu vào từng mặt đứng, rồi bàn giao đúng ngày ấy.", a: "Nguyễn Hoài An", r: "Giám đốc đầu tư, Quỹ Nhà Bến Sông" },
  { q: "Trường vẫn học suốt hai năm gia cố. Không một buổi bị huỷ, và giờ mỗi lần động đất nhẹ cô giáo không còn giật mình.", a: "Bùi Thị Mai Phương", r: "Hiệu trưởng THCS Đồi Vọng" },
  { q: "Chi phí cuối cùng lệch dưới hai phần trăm so với giá trần. Tôi chưa gặp công trình nào làm được điều đó.", a: "Trần Quốc Việt", r: "Chủ đầu tư, Ánh Hà Riverside" },
] as const;

export const MODELS = [
  { t: "Tổng thầu trọn gói", p: "Giá cố định", d: "Dành cho dự án đã có thiết kế hoàn chỉnh và cần một đầu mối chịu trách nhiệm.", f: ["Giá cố định theo hồ sơ", "Giám sát trưởng toàn thời gian", "Báo cáo tiến độ hàng tuần", "Bảo hành kết cấu 10 năm"], hot: false },
  { t: "Thiết kế & thi công", p: "Giá trần cam kết", d: "Kiến trúc sư và đội thi công làm chung từ khảo sát tới bàn giao, chia sẻ lợi ích khi tiết kiệm.", f: ["Một hợp đồng, một đội", "Giá trần bảo đảm (GMP)", "Tiến độ rút ngắn 15–20%", "Thử nắng thật trước nghiệm thu", "Bảo hành kết cấu 10 năm"], hot: true },
  { t: "Gia cố kháng chấn", p: "Theo khối lượng", d: "Gia cố công trình đang sử dụng hoặc có giá trị di sản mà không phải dừng hoạt động.", f: ["Khảo sát và mô phỏng chấn", "Thi công theo từng khu vực", "Phương án giữ nguyên mặt đứng", "Hồ sơ thẩm tra độc lập"], hot: false },
] as const;

export const POSTS = [
  { d: "12.11.2026", tag: "Công trường", t: "Vì sao chúng tôi đóng cọc vào ban đêm", e: "Tiếng ồn, nước triều và một lịch cẩu nổi quyết định nhịp của cả dự án ven sông." },
  { d: "28.10.2026", tag: "Mặt dựng", t: "Dựng mẫu 1:1: khoản tiền đáng bỏ nhất", e: "Ba ngày xả nước lên một tấm kính thật cho ta biết nhiều hơn ba tháng bản vẽ." },
  { d: "03.10.2026", tag: "Kháng chấn", t: "Giữ mặt đứng 1962 khi thay cả bộ khung", e: "Cách chấn đáy móng cho trường học đang giờ ra chơi: những quyết định nhỏ nhưng khó." },
  { d: "15.09.2026", tag: "Đội ngũ", t: "Một giám sát trưởng, từ cọc đầu tới chìa khoá", e: "Chúng tôi từ chối luân chuyển người giữa dự án và đây là lý do." },
] as const;

export const FAQS = [
  { q: "Bạn nhận loại công trình nào?", a: "Nhà ở cao tầng, công trình công cộng (trường học, thư viện, nhà ga, cầu bộ hành) và gia cố kháng chấn. Chúng tôi không nhận nhà dân dụng lẻ, để đủ người giỏi cho mỗi dự án." },
  { q: "Quy mô tối thiểu của một dự án?", a: "Thường từ 3.000 m² sàn, hoặc giá trị hợp đồng từ khoảng 60 tỷ đồng. Với công trình gia cố có giá trị di sản, chúng tôi xem xét theo từng trường hợp." },
  { q: "Giá trần (GMP) hoạt động ra sao?", a: "Chúng tôi cam kết tổng chi phí tối đa sau khi thiết kế đạt mốc 60%. Phần tiết kiệm được chia cho chủ đầu tư và đội thi công theo tỉ lệ ghi trong hợp đồng." },
  { q: "Vì sao nghiệm thu vào giờ vàng?", a: "Mặt dựng và nội thất lộ lỗi nhất khi nắng xiên. Một vết nối lệch ba milimét vô hình lúc trưa nhưng hiện rõ lúc hoàng hôn, nên chúng tôi kiểm đúng giờ đó." },
  { q: "Công trình đang sử dụng có phải dừng hoạt động?", a: "Thường là không. Chúng tôi chia thi công theo khu vực, làm việc ồn vào khung giờ thoả thuận và có phương án che chắn, sơ tán riêng cho từng giai đoạn." },
  { q: "Thời gian bảo hành bao lâu?", a: "Kết cấu 10 năm, vỏ bao che 5 năm, hoàn thiện 2 năm. Người giám sát trưởng của dự án vẫn là đầu mối trong suốt thời gian bảo hành." },
  { q: "Bạn làm việc ở những khu vực nào?", a: "Chủ yếu vùng ven sông và cửa sông các tỉnh phía Nam, đôi khi miền Trung. Với dự án xa hơn, chúng tôi lập văn phòng hiện trường riêng." },
  { q: "Bắt đầu như thế nào?", a: "Gửi cho chúng tôi vị trí mảnh đất và mục tiêu của bạn qua biểu mẫu bên dưới. Một giám đốc dự án sẽ phản hồi trong hai ngày làm việc và đề xuất buổi khảo sát đầu tiên." },
] as const;

export const FOOT = {
  office: ["Tháp Hoàng Hôn Xây Dựng", "12 Đường Ven Sông, Quận 2", "TP. Hồ Chí Minh (minh hoạ)"],
} as const;
