export const NAV = [
  { href: "#san-pham", label: "Sản phẩm" },
  { href: "#doanh-nghiep", label: "Doanh nghiệp", caret: true },
  { href: "#bang-gia", label: "Bảng giá" },
  { href: "#bao-mat", label: "Bảo mật" },
  { href: "#hoi-dap", label: "Hỏi đáp" },
] as const;

export const NUMS = [
  { v: 3, suf: "M", l: "Người dùng trên cả nước", fmt: "3M" },
  { v: 999, suf: "", l: "Giao dịch mỗi ngày", fmt: "999" },
  { v: 70, suf: "%", l: "Người dùng tiết kiệm được trung bình", fmt: "70%" },
] as const;

export const SMART_LIST = [
  { k: "data", t: "Dữ liệu số", head: "Dữ liệu một chạm", body: "Mọi giao dịch, số dư và báo cáo hội tụ về một nguồn dữ liệu duy nhất, cập nhật theo thời gian thực." },
  { k: "bank", t: "Ngân hàng hiện đại", head: "Chúng tôi tái đầu tư vào đổi mới", body: "Bằng việc dành một phần tăng trưởng để thúc đẩy các giải pháp tài chính an toàn và hoà nhập." },
  { k: "speed", t: "Tốc độ cao", head: "Đối soát trong vài giây", body: "Lệnh chuyển được xử lý và đối soát gần như tức thời, kể cả ở giờ cao điểm cuối tháng." },
] as const;

export const PERF = {
  analytics: { ring: [889.7, 897.5], months: [["T6", 9], ["T7", 8], ["T8", 12], ["T9", 13.2], ["T10", 17.7]], a: "18,2%", b: "13,3%" },
  cashflow: { ring: [412.3, 418.9], months: [["T6", 6], ["T7", 11], ["T8", 7.5], ["T9", 15], ["T10", 10]], a: "9,6%", b: "8,1%" },
  success: { ring: [96.2, 98.4], months: [["T6", 12], ["T7", 14], ["T8", 13], ["T9", 16], ["T10", 18]], a: "98,4%", b: "96,2%" },
} as const;

export const EXPENSES = [
  { t: "Gói phần mềm Exo hằng tháng", v: "−₫2.850.000" },
  { t: "Phí tạo bản quét tuỳ chỉnh", v: "−₫620.000" },
] as const;

export const TXS = [
  { n: "Tiến Minh", v: "−₫340.000", i: "av1" },
  { n: "Hà Phương", v: "−₫270.000", i: "av2" },
  { n: "Lan Khuê", v: "−₫415.000", i: "av3" },
  { n: "Đức Anh", v: "−₫186.000", i: "av4" },
] as const;

export const STORIES = [
  { c: "TrustVN", q: "Độ ổn định và tin cậy không đâu sánh được. Chúng tôi xử lý hàng triệu giao dịch mỗi tháng mà không có một lần hệ thống gián đoạn.", n: "Đặng Quốc Việt, Giám đốc công nghệ", o: "Tài chính TrustVN" },
  { c: "Ngân hàng Finora", q: "Chuyển sang nền tảng này đã thay đổi cách chúng tôi xử lý thanh toán số. Thời gian giao dịch giảm mạnh và mức hài lòng của khách tăng vọt.", n: "Mai Thanh Sương, Trưởng khối Chuyển đổi số", o: "Ngân hàng Finora" },
  { c: "NexaBank", q: "Chúng tôi cần một nền tảng đủ vững để làm xương sống cho đội vận hành. Ví Nguồn làm được điều đó và còn đẹp hơn mong đợi.", n: "Nguyễn Thế Nam, Giám đốc vận hành", o: "NexaBank" },
  { c: "Quỹ Mekong", q: "Báo cáo dòng tiền giờ nằm trong một bảng điều khiển. Việc đóng sổ cuối tháng từ năm ngày xuống còn nửa ngày.", n: "Lê Hồng Nhung, Kế toán trưởng", o: "Quỹ Đầu tư Mekong" },
  { c: "Bến Thành Pay", q: "API rõ ràng, tài liệu đầy đủ. Đội kỹ thuật của chúng tôi tích hợp xong cổng thanh toán trong chưa đầy hai tuần.", n: "Phan Gia Huy, Trưởng nhóm kỹ thuật", o: "Bến Thành Pay" },
  { c: "SaoViet Retail", q: "Đối soát hàng nghìn đơn mỗi ngày từng là cơn ác mộng. Giờ nó chạy ngầm và chúng tôi chỉ xem ngoại lệ.", n: "Vũ Thuỳ Dương, Giám đốc tài chính", o: "SaoViet Retail" },
] as const;

export const PRODUCTS = [
  { t: "Ví cá nhân", d: "Chuyển, nhận và tiết kiệm với phí gần như bằng không, kèm hạn mức thông minh theo thói quen chi tiêu.", tag: "Cá nhân" },
  { t: "Ví doanh nghiệp", d: "Nhiều tầng phê duyệt, phân quyền theo phòng ban và đối soát tự động với phần mềm kế toán.", tag: "Doanh nghiệp" },
  { t: "Thẻ chi tiêu", d: "Phát hành thẻ ảo tức thì cho từng nhân viên, đặt hạn mức theo dự án và khoá lại bằng một chạm.", tag: "Chi tiêu" },
  { t: "Cổng thanh toán", d: "API và SDK nhận thanh toán QR, thẻ nội địa, thẻ quốc tế và ví liên kết trong một lần tích hợp.", tag: "Nhà phát triển" },
  { t: "Chuyển tiền quốc tế", d: "Tỉ giá minh bạch hiển thị trước khi xác nhận, tiền tới nơi trong ngày làm việc tại hơn 40 quốc gia.", tag: "Quốc tế" },
  { t: "Quản lý quỹ", d: "Theo dõi danh mục, so sánh hiệu suất và cảnh báo lệch mục tiêu cho đội đầu tư tổ chức.", tag: "Đầu tư" },
] as const;

export const SECURITY = [
  { t: "Mã hoá đầu cuối", d: "Dữ liệu được mã hoá AES-256 khi lưu trữ và TLS 1.3 khi truyền, khoá do khách hàng sở hữu." },
  { t: "Xác thực nhiều lớp", d: "Sinh trắc học, mã dùng một lần và xác nhận thiết bị cho mọi giao dịch có giá trị lớn." },
  { t: "Giám sát gian lận 24/7", d: "Mô hình học máy chấm điểm rủi ro từng giao dịch trong dưới 80 mili giây." },
  { t: "Tuân thủ quy định", d: "Quy trình KYC/AML theo quy định của Ngân hàng Nhà nước, nhật ký kiểm toán không thể sửa." },
] as const;

export const STEPS = [
  { n: "01", t: "Đăng ký và xác minh", d: "Tạo tài khoản trong năm phút, xác minh danh tính điện tử và liên kết tài khoản ngân hàng." },
  { n: "02", t: "Kết nối hệ thống", d: "Nối với phần mềm kế toán, ERP hoặc dùng API. Đội kỹ thuật của chúng tôi hỗ trợ trực tiếp." },
  { n: "03", t: "Đặt quy tắc", d: "Thiết lập hạn mức, tầng phê duyệt và cảnh báo phù hợp cách tổ chức bạn vận hành." },
  { n: "04", t: "Theo dõi và tối ưu", d: "Xem dòng tiền, phí và hiệu suất trên bảng điều khiển, nhận gợi ý để tiết kiệm mỗi tháng." },
] as const;

export const PLANS = [
  { t: "Khởi đầu", m: 0, y: 0, d: "Cho cá nhân và nhóm nhỏ mới làm quen.", f: ["Ví cá nhân không giới hạn", "5 thẻ ảo", "Báo cáo cơ bản", "Hỗ trợ qua email"], hot: false },
  { t: "Tăng trưởng", m: 490000, y: 392000, d: "Cho doanh nghiệp vừa đang mở rộng.", f: ["Ví doanh nghiệp, phân quyền", "Thẻ ảo không giới hạn", "Đối soát tự động", "API và webhook", "Hỗ trợ ưu tiên 24/7"], hot: true },
  { t: "Tổ chức", m: -1, y: -1, d: "Cho ngân hàng, quỹ và tập đoàn.", f: ["Hạ tầng riêng và SLA 99,99%", "Tích hợp lõi ngân hàng", "Kiểm toán và tuân thủ tuỳ chỉnh", "Cố vấn kỹ thuật chuyên trách"], hot: false },
] as const;

export const PARTNERS = ["TrustVN", "Finora", "NexaBank", "Mekong Fund", "Bến Thành Pay", "SaoViet", "Hà Giang Credit", "OnePoint"] as const;

export const POSTS = [
  { d: "14.11.2026", tag: "Sản phẩm", t: "Thẻ ảo theo dự án: kiểm soát chi tiêu mà không làm chậm đội ngũ", e: "Vì sao giới hạn theo dự án hiệu quả hơn giới hạn theo người." },
  { d: "30.10.2026", tag: "Dữ liệu", t: "Đóng sổ cuối tháng trong nửa ngày: bài học từ ba khách hàng", e: "Những thay đổi nhỏ trong đối soát tạo ra khác biệt lớn." },
  { d: "09.10.2026", tag: "Bảo mật", t: "Giám sát gian lận dưới 80 mili giây hoạt động thế nào", e: "Sau hậu trường của mô hình chấm điểm rủi ro theo thời gian thực." },
] as const;

export const FAQS = [
  { q: "Dữ liệu tài chính của tôi có an toàn trên nền tảng không?", a: "Có. Dữ liệu được mã hoá AES-256 khi lưu trữ và TLS 1.3 khi truyền. Chúng tôi áp dụng xác thực nhiều lớp, giám sát gian lận 24/7 và kiểm toán độc lập mỗi năm." },
  { q: "Sau khi đăng ký, bao lâu thì bắt đầu dùng được?", a: "Tài khoản cá nhân dùng được ngay sau khi xác minh điện tử, thường dưới năm phút. Với doanh nghiệp, hồ sơ pháp lý được duyệt trong một đến hai ngày làm việc." },
  { q: "Điểm khác biệt của nền tảng so với các giải pháp khác?", a: "Dòng tiền, thẻ chi tiêu, đối soát và phân tích đầu tư nằm trong cùng một hệ thống, nên bạn không phải ghép nối nhiều công cụ rời rạc và trả nhiều lớp phí." },
  { q: "Bạn có giải pháp tuỳ chỉnh cho tổ chức tài chính lớn không?", a: "Có. Gói Tổ chức gồm hạ tầng riêng, tích hợp lõi ngân hàng, SLA 99,99% và đội kỹ thuật chuyên trách. Hãy liên hệ để nhận tư vấn theo quy mô của bạn." },
  { q: "Phí giao dịch được tính thế nào?", a: "Chuyển nội bộ giữa các ví miễn phí. Giao dịch ra ngân hàng và thanh toán thẻ tính theo bảng giá công khai, không có phí ẩn hay phí duy trì." },
  { q: "Tôi có thể huỷ hoặc xuất dữ liệu bất cứ lúc nào không?", a: "Được. Bạn có thể xuất toàn bộ dữ liệu giao dịch ở định dạng CSV hoặc API và đóng tài khoản mà không mất phí." },
  { q: "Ví Nguồn có được cấp phép hoạt động không?", a: "Đây là trang minh hoạ cho một doanh nghiệp giả định nên không có giấy phép thật. Nội dung chỉ nhằm trình bày thiết kế." },
] as const;
