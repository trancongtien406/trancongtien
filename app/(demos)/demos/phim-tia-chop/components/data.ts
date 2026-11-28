export const NAV = [
  { label: "Trang chủ", id: "tc-home" },
  { label: "Dịch vụ", id: "tc-services" },
  { label: "Dự án", id: "tc-projects" },
  { label: "Quy trình", id: "tc-process" },
  { label: "Bảng giá", id: "tc-pricing" },
  { label: "Liên hệ", id: "tc-contact" },
];

export const MISSION = [
  { t: "Tăng tương tác", i: "user" },
  { t: "Mở rộng tiếp cận", i: "globe" },
  { t: "Nuôi dưỡng niềm tin", i: "coin" },
  { t: "Trải nghiệm đẳng cấp", i: "bars" },
  { t: "Hình dung sản phẩm", i: "spark" },
] as const;

export const SERVICES = [
  { t: "Đồ hoạ chuyển động", d: "Chuyển động chữ, logo và biểu đồ cho quảng cáo, mạng xã hội, sự kiện và màn hình ngoài trời. Mỗi chuyển động có lý do, không chỉ để đẹp." },
  { t: "Hoạt hình 2D và 3D", d: "Dựng hình 3D, minh hoạ sản phẩm và nhân vật, từ ý tưởng, storyboard đến bản xuất cuối, đúng giọng thương hiệu." },
];

export const SERVICES_MORE = [
  { t: "Phim quảng cáo", d: "Kịch bản, quay và dựng phim 15 đến 60 giây, cho truyền hình, mạng xã hội và màn hình cửa hàng.", tag: "Phim" },
  { t: "Chỉnh màu điện ảnh", d: "Đồng bộ tông màu giữa các cảnh quay, tạo cảm giác đồng nhất, giữ trọn màu da và màu sản phẩm.", tag: "Hậu kỳ" },
  { t: "Âm thanh và nhạc nền", d: "Thiết kế tiếng động, lồng tiếng và phối nhạc bản quyền để phim có nhịp và có cảm xúc.", tag: "Âm thanh" },
  { t: "Dựng sản phẩm 3D", d: "Dựng và render sản phẩm xoay 360 độ, ảnh quảng cáo CGI, cảnh bố trí cửa hàng ảo.", tag: "3D" },
  { t: "Motion cho mạng xã hội", d: "Gói clip dọc, vuông, ngang theo lịch đăng hàng tuần, giữ chung một ngôn ngữ hình ảnh.", tag: "Social" },
  { t: "Hệ thống nhận diện chuyển động", d: "Logo chuyển động, chuyển cảnh, thanh tên, bảng màu động cho toàn bộ kênh của thương hiệu.", tag: "Brand" },
];

export const PROJECTS = [
  { k: "vases" as const, tag: "Thiết kế 3D", t: "Bản sắc 3D, đặc trưng để tăng trưởng", d: "Bộ hình khối nhận diện dựng 3D cho một thương hiệu gốm sứ. Chi tiết các hạng mục đồ hoạ và lợi ích mang lại cho thương hiệu." },
  { k: "blocks" as const, tag: "Phim quảng cáo", t: "Dựng phim táo bạo để nâng tầm thương hiệu", d: "Từ trường quay đến hậu kỳ, chúng tôi kể câu chuyện thương hiệu bằng hình ảnh điện ảnh, có nhịp và có chiều sâu." },
];

export const SLIDES = [
  { k: "cubes" as const, c: "Thiết kế 3D", t: "Bản sắc dựng bằng ba chiều, đậm và nhất quán" },
  { k: "orbs" as const, c: "Đồ hoạ chuyển động", t: "Hoạt hình vui mắt với chút tinh tế hiện đại" },
  { k: "glass" as const, c: "Thiết kế đồ hoạ", t: "Thương hiệu gọn gàng, tự tin, nổi bật" },
  { k: "vases" as const, c: "Phim ngắn", t: "Một phút kể trọn câu chuyện sản phẩm" },
  { k: "blocks" as const, c: "Hậu kỳ", t: "Chỉnh màu và dựng cho chiến dịch mùa lễ" },
];

export const STATS = [
  ["240+", "clip đã giao"],
  ["86", "thương hiệu đồng hành"],
  ["12 ngày", "thời gian trung bình"],
  ["98%", "khách quay lại"],
] as const;

export const STEPS = [
  { t: "Trao đổi và brief", d: "Một buổi 45 phút để hiểu thương hiệu, khán giả, kênh phát hành và ngân sách. Kết thúc bằng bản brief một trang hai bên cùng xác nhận." },
  { t: "Kịch bản và storyboard", d: "Chúng tôi viết kịch bản, vẽ storyboard từng khung và chọn tham chiếu hình ảnh. Bạn duyệt trước khi bất kỳ giờ dựng nào bắt đầu." },
  { t: "Thiết kế và dựng", d: "Thiết kế phong cách, dựng hình 2D hoặc 3D, quay thêm nếu cần. Bạn nhận bản dựng thô sau một tuần để góp ý sớm." },
  { t: "Chỉnh sửa và hậu kỳ", d: "Hai vòng chỉnh sửa chính, chỉnh màu, thiết kế âm thanh, lồng tiếng và phụ đề tiếng Việt, tiếng Anh." },
  { t: "Bàn giao và đo lường", d: "Xuất mọi định dạng cần dùng, kèm tệp nguồn nếu thoả thuận. Sau hai tuần chúng tôi gửi báo cáo lượt xem để cùng cải thiện." },
];

export const TEAM = [
  { n: "Lê Minh Quân", r: "Đạo diễn sáng tạo", b: "12 năm làm phim quảng cáo, từng dẫn dắt các chiến dịch lễ tết cho chuỗi bán lẻ." },
  { n: "Phạm Thu Hà", r: "Trưởng nhóm đồ hoạ chuyển động", b: "Chuyên chuyển động chữ và hệ thống nhận diện động." },
  { n: "Đỗ Anh Khoa", r: "Nghệ sĩ 3D", b: "Dựng sản phẩm, ánh sáng và vật liệu; thích những khối màu cyan và magenta." },
  { n: "Nguyễn Bảo Châu", r: "Dựng phim và chỉnh màu", b: "Giữ nhịp của phim, giữ trọn tông màu qua từng cảnh quay." },
];

export const REVIEWS = [
  { q: "Clip giới thiệu sản phẩm đạt gấp ba lượt xem thường lệ. Nhịp dựng rất gọn, đúng tinh thần thương hiệu của chúng tôi.", n: "Chị Trang", r: "Quản lý thương hiệu, chuỗi cà phê" },
  { q: "Đội ngũ gửi storyboard rõ ràng nên chúng tôi duyệt rất nhanh. Bản giao cuối đẹp hơn mong đợi.", n: "Anh Hiếu", r: "Chủ xưởng gốm" },
  { q: "Bộ logo chuyển động dùng chung cho mọi kênh, nhìn nhất quán hẳn. Rất đáng tiền.", n: "Chị Vy", r: "Giám đốc tiếp thị, ứng dụng giao hàng" },
];

export const PLANS = [
  { n: "Cơ bản", p: "6 triệu", u: "/ clip", f: ["Clip chuyển động chữ 15 giây", "1 định dạng xuất", "1 vòng chỉnh sửa", "Giao trong 5 ngày"] },
  { n: "Chuyên nghiệp", p: "18 triệu", u: "/ clip", hot: true, f: ["Clip 2D hoặc phim ngắn 30 giây", "Kịch bản và storyboard", "2 vòng chỉnh sửa", "Chỉnh màu và âm thanh", "Giao đủ định dạng dọc, vuông, ngang"] },
  { n: "Điện ảnh 3D", p: "45 triệu", u: "/ dự án", f: ["Phim 3D đến 60 giây", "Quay thực tế kết hợp CGI", "3 vòng chỉnh sửa", "Nhạc bản quyền và lồng tiếng", "Tệp nguồn bàn giao"] },
];

export const FAQ = [
  { q: "Một dự án đồ hoạ chuyển động mất bao lâu?", a: "Clip quảng cáo 15 đến 30 giây thường mất 2 đến 3 tuần: 3 ngày kịch bản và storyboard, 1 tuần dựng, phần còn lại cho chỉnh sửa và xuất bản. Dự án 3D phức tạp cần thêm thời gian." },
  { q: "Anh chị cần gửi gì để bắt đầu?", a: "Logo, bảng màu, thông điệp chính và vài tham chiếu bạn thích. Chưa có thì chúng tôi cùng dựng một bản brief ngắn trong buổi trao đổi đầu tiên." },
  { q: "Có được chỉnh sửa sau khi nhận bản dựng đầu không?", a: "Có. Mỗi gói gồm số vòng chỉnh sửa chính như ghi trong bảng giá. Các vòng thêm được báo giá rõ trước khi làm." },
  { q: "Anh chị xuất tệp theo định dạng nào?", a: "MP4 H.264 cho mạng xã hội, ProRes cho truyền hình và quảng cáo ngoài trời, kèm bản dọc, vuông, ngang theo yêu cầu." },
  { q: "Chi phí một clip bao nhiêu?", a: "Từ vài triệu cho clip chuyển động chữ đơn giản đến vài chục triệu cho phim 3D. Số liệu chỉ để minh hoạ, báo giá thật sau buổi brief." },
  { q: "Tôi có nhận được tệp nguồn không?", a: "Gói Điện ảnh 3D bàn giao tệp nguồn. Với các gói còn lại, tệp nguồn có thể mua thêm, giá thoả thuận theo dự án." },
  { q: "Có làm cho khách ở tỉnh khác không?", a: "Có. Toàn bộ buổi trao đổi và duyệt bản dựng diễn ra trực tuyến, quay phim thì chúng tôi di chuyển theo lịch đã thống nhất." },
];

export const FOOT = {
  links: [["Trang chủ", "tc-home"], ["Dịch vụ", "tc-services"], ["Dự án", "tc-projects"], ["Quy trình", "tc-process"], ["Bảng giá", "tc-pricing"], ["Liên hệ", "tc-contact"]],
};

export const JOURNAL = [
  { k: "cubes" as const, d: "12.03.2026", t: "Vì sao clip 15 giây khó hơn clip 60 giây", s: "Mười lăm giây không cho phép lãng phí một khung hình nào. Đây là cách chúng tôi cắt gọt kịch bản." },
  { k: "orbs" as const, d: "28.02.2026", t: "Chỉnh màu điện ảnh cho sản phẩm ăn uống", s: "Giữ màu thật của món ăn, nhưng vẫn có không khí điện ảnh: ba quy tắc về tông da, tông nóng và tông lạnh." },
  { k: "glass" as const, d: "09.01.2026", t: "Hậu trường chiến dịch Tết: 11 ngày, 4 clip", s: "Lịch làm việc từng ngày, những phương án bị bỏ và lý do bản cuối trông như bạn thấy." },
];
