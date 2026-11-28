export const NAV = [
  { href: "#tinh-nang", label: "Sản phẩm" },
  { href: "#giai-phap", label: "Giải pháp" },
  { href: "#hoi-dap", label: "Tìm hiểu" },
];

export const FEATURES = [
  { n: "01", t: "Thẻ việc gọn gàng", d: "Mỗi việc là một thẻ: mô tả, tệp đính kèm, checklist, bình luận và lịch sử chỉnh sửa nằm cùng một chỗ, không còn lạc giữa các cuộc trò chuyện.", img: "feat-1.webp", span: 2 },
  { n: "02", t: "Hạn chót không bị trôi", d: "Nhắc việc theo giờ làm của từng người, tự báo sớm khi việc phụ thuộc bị chậm.", img: "feat-2.webp", span: 1 },
  { n: "03", t: "Người phụ trách rõ ràng", d: "Giao cho một người, thêm người theo dõi, xem ngay ai đang quá tải trong tuần.", img: "feat-3.webp", span: 1 },
  { n: "04", t: "Bảng, danh sách, lịch", d: "Một dữ liệu, ba cách nhìn. Chuyển qua lại không mất bộ lọc, không nhập lại.", span: 1 },
  { n: "05", t: "Tự động hoá việc lặp", d: "Khi thẻ sang cột “Chờ duyệt”, tự gắn người duyệt và gửi thông báo. Viết quy tắc bằng câu chữ thường ngày.", span: 1 },
  { n: "06", t: "Báo cáo cuối tuần", d: "Tiến độ, việc trễ hạn và khối lượng từng người được tổng hợp thành một trang gửi thẳng vào hộp thư.", span: 2 },
];

export const STEPS = [
  { n: "001", t: "Gom việc về một chỗ", d: "Nhập từ bảng tính, ghi chú, email. Gọn Việc nhận diện tiêu đề, hạn và người phụ trách để dựng sẵn bảng đầu tiên cho bạn." },
  { n: "002", t: "Chia cột theo cách nhóm làm", d: "Cần làm, Đang làm, Chờ duyệt, Xong, hoặc cột riêng của bạn. Mỗi cột có giới hạn việc dang dở để không ôm đồm." },
  { n: "003", t: "Giao người, đặt hạn", d: "Mỗi thẻ có một người chịu trách nhiệm và một hạn. Người khác chỉ theo dõi, không ai phải đoán việc này của ai." },
  { n: "004", t: "Xem tiến độ, ăn mừng cột mốc", d: "Bảng điều khiển cho thấy điểm nghẽn sớm. Khi cột mốc xong, cả nhóm cùng nhận một lời chúc nhỏ." },
];

export const TEAMS = [
  { id: "mk", tab: "Marketing", h: "Chiến dịch nhiều tay, một nhịp", p: "Lịch nội dung, duyệt bài, đặt giờ đăng. Mỗi bài viết là một thẻ đi qua các cột: ý tưởng, viết, thiết kế, duyệt, lên lịch.", pts: ["Lịch đăng theo tuần và theo kênh", "Người duyệt nhận nhắc trước 24 giờ", "Thư viện mẫu thẻ cho từng loại nội dung"], stat: "−41%", sl: "thời gian chờ duyệt" },
  { id: "kt", tab: "Kỹ thuật", h: "Từ yêu cầu tới bản phát hành", p: "Chia việc theo chặng ngắn, gắn phụ thuộc giữa các thẻ, nhìn thấy ngay chỗ nào đang chặn cả nhóm.", pts: ["Phụ thuộc giữa thẻ, báo đỏ khi chặn", "Giới hạn việc dang dở theo từng cột", "Xuất ghi chú phát hành từ thẻ đã xong"], stat: "2,3×", sl: "việc hoàn thành mỗi chặng" },
  { id: "vh", tab: "Vận hành", h: "Việc lặp lại, không sót", p: "Quy trình nhập hàng, chăm khách, đối soát cuối tháng chạy bằng mẫu thẻ lặp theo lịch. Ai quên việc, hệ thống nhắc.", pts: ["Thẻ lặp theo ngày, tuần, tháng", "Checklist có người ký xác nhận", "Nhật ký thay đổi để đối chiếu"], stat: "0", sl: "việc quên trong quý qua" },
  { id: "ag", tab: "Agency", h: "Nhiều khách, nhiều dự án, một màn hình", p: "Mỗi khách một không gian riêng, chia sẻ bảng cho khách xem, bình luận mà không thấy việc nội bộ.", pts: ["Quyền xem riêng cho khách hàng", "Theo dõi giờ công trên từng thẻ", "Báo cáo tiến độ gửi khách mỗi tuần"], stat: "12 giây", sl: "để giao một việc mới" },
];

export const INTEGRATIONS = ["Lịch nhóm", "Hộp thư", "Chat nhóm", "Kho tệp", "Biểu mẫu", "Họp video", "Kho mã nguồn", "Bảng tính", "Ghi chú", "Thanh toán", "Chữ ký số", "Webhook"];

export const PLANS = [
  { n: "Khởi đầu", m: 0, y: 0, d: "Cho nhóm nhỏ mới bắt đầu giao việc.", f: ["Tới 5 người", "3 bảng việc", "Nhắc hạn qua email", "Lưu 30 ngày lịch sử"], hot: false },
  { n: "Nhóm", m: 99000, y: 79000, d: "Cho nhóm đang tăng tốc, cần tự động hoá.", f: ["Không giới hạn bảng", "Tự động hoá 20 quy tắc", "Báo cáo cuối tuần", "Phụ thuộc giữa các thẻ", "Hỗ trợ trong 4 giờ làm việc"], hot: true },
  { n: "Doanh nghiệp", m: 249000, y: 199000, d: "Cho tổ chức nhiều phòng ban, cần quyền hạn chặt.", f: ["Phân quyền theo phòng ban", "Nhật ký kiểm toán", "Đăng nhập một lần (SSO)", "Quản lý khách hàng ngoài", "Quản lý tài khoản riêng"], hot: false },
];

export const FAQ = [
  { q: "Chuyển việc từ bảng tính sang Gọn Việc mất bao lâu?", a: "Thường dưới 10 phút. Bạn dán hoặc tải tệp CSV lên, chọn cột nào là tiêu đề, hạn, người phụ trách, hệ thống dựng bảng đầu tiên ngay. Phần còn lại chỉ là điều chỉnh cột." },
  { q: "Nhóm tôi chỉ có 4 người, có cần trả phí không?", a: "Không. Gói Khởi đầu miễn phí cho tới 5 người và 3 bảng việc, đủ cho phần lớn nhóm nhỏ. Bạn chỉ nâng cấp khi cần tự động hoá hay báo cáo." },
  { q: "Dữ liệu của chúng tôi được lưu ở đâu?", a: "Dữ liệu lưu tại trung tâm dữ liệu trong khu vực Đông Nam Á, mã hoá khi truyền và khi lưu. Bạn có thể xuất toàn bộ dữ liệu bất cứ lúc nào." },
  { q: "Gọn Việc có ứng dụng trên điện thoại không?", a: "Có. Ứng dụng iOS và Android hiển thị bảng, nhận nhắc hạn và cho phép kéo thẻ giữa các cột bằng một tay." },
  { q: "Có thể cho khách hàng xem bảng việc không?", a: "Có. Bạn tạo đường dẫn chỉ xem hoặc cho khách bình luận, các thẻ đánh dấu nội bộ sẽ không hiện với họ." },
  { q: "Huỷ gói có bị giữ dữ liệu không?", a: "Không. Khi huỷ, tài khoản quay về gói Khởi đầu, dữ liệu vẫn nguyên. Nếu muốn xoá hẳn, chúng tôi xoá trong 7 ngày kể từ yêu cầu." },
  { q: "Có hỗ trợ tiếng Việt và hoá đơn VAT không?", a: "Giao diện và tài liệu đều bằng tiếng Việt. Gói trả phí được xuất hoá đơn điện tử theo thông tin công ty bạn cung cấp." },
];

export const VOICES = [
  { n: "Trần Bảo Ngọc", r: "Trưởng nhóm nội dung, một agency 30 người", q: "Trước đây mỗi sáng thứ Hai tôi mất cả tiếng để hỏi “bài này tới đâu rồi”. Giờ nhìn bảng là biết, họp ngắn đi một nửa." },
  { n: "Lê Quang Huy", r: "Quản lý sản phẩm, công ty phần mềm", q: "Điều tôi thích là thẻ nào cũng có đúng một người chịu trách nhiệm. Hết cảnh cả nhóm cùng nghĩ người kia sẽ làm." },
  { n: "Phạm Thu Hà", r: "Chủ chuỗi cửa hàng nhỏ", q: "Tôi không rành công nghệ. Nhân viên tự kéo thẻ, tôi chỉ xem báo cáo cuối tuần là đủ yên tâm." },
];

export const POSTS = [
  { t: "Giới hạn việc dang dở: vì sao làm ít lại xong nhiều", c: "Quy trình", m: "6 phút đọc" },
  { t: "Họp đứng 10 phút bằng bảng việc: kịch bản cho nhóm 8 người", c: "Cách làm", m: "5 phút đọc" },
  { t: "Đặt hạn chót thế nào để không ai phải thức đêm", c: "Năng suất", m: "7 phút đọc" },
];

export const COLS = ["Cần làm", "Đang làm", "Chờ duyệt", "Xong"] as const;
export const SEED_CARDS = [
  { id: 1, t: "Thiết kế trang chủ", who: "KH", due: "28/12", tone: 0, col: 0 },
  { id: 2, t: "Viết nội dung bản tin", who: "TN", due: "29/12", tone: 1, col: 0 },
  { id: 3, t: "Khảo sát khách hàng", who: "MQ", due: "30/12", tone: 2, col: 1 },
  { id: 4, t: "Báo giá đối tác", who: "HA", due: "02/01", tone: 1, col: 1 },
  { id: 5, t: "Duyệt bản dựng ứng dụng", who: "BN", due: "03/01", tone: 0, col: 2 },
  { id: 6, t: "Chốt hợp đồng quý I", who: "KH", due: "27/12", tone: 2, col: 3 },
];
