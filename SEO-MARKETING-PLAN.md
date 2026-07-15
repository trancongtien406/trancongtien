# Kế hoạch SEO & Marketing thương hiệu Trần Công Tiến

## 1. Mục tiêu

### Mục tiêu chính

- Đưa `https://trancongtien.com` lên vị trí đầu cho truy vấn thương hiệu **“Trần Công Tiến”** và **“Tran Cong Tien”**.
- Giúp Google và Bing hiểu rõ Trần Công Tiến là một Full-stack Developer & AI Agent Builder tại Đà Nẵng.
- Đưa ảnh chân dung xuất hiện trong Google Images và kết quả tìm kiếm thương hiệu.
- Tăng lượt truy cập tự nhiên và chuyển đổi thành yêu cầu tư vấn.

### Lưu ý

Không thể cam kết tuyệt đối vị trí Top 1 vì thứ hạng do công cụ tìm kiếm quyết định. Kế hoạch tập trung tối đa hóa khả năng đạt Top 1 bằng SEO kỹ thuật, Entity, nội dung thật và tín hiệu uy tín ngoài website.

## 2. KPI theo dõi

Theo dõi hàng tuần trong Google Search Console và Bing Webmaster Tools:

- Vị trí trung bình của `Trần Công Tiến` và `Tran Cong Tien`.
- Impression, click và CTR của truy vấn thương hiệu.
- Số trang hợp lệ đã được index.
- Impression và click từ Google Images.
- Số domain uy tín nhắc tới tên hoặc liên kết về website.
- Lượt gửi form, đặt lịch và liên hệ đến từ Organic Search.
- Các truy vấn kết hợp: tên + nghề nghiệp, tên + Đà Nẵng, tên + AI Agent.

## 3. Giai đoạn 1 — SEO kỹ thuật và index (Tuần 1)

### Bing Webmaster Tools

- [x] Tạo file xác minh `public/BingSiteAuth.xml`.
- [x] Thêm meta `msvalidate.01` vào metadata toàn site.
- [ ] Deploy phiên bản mới lên production.
- [ ] Mở `https://trancongtien.com/BingSiteAuth.xml` và kiểm tra trả về HTTP 200.
- [ ] Mở source trang chủ và kiểm tra có meta `msvalidate.01`.
- [ ] Bấm **Verify** trong Bing Webmaster Tools.
- [ ] Gửi sitemap `https://trancongtien.com/sitemap.xml`.
- [ ] Dùng URL Inspection gửi trang chủ, `/ve-toi`, bài giới thiệu và các case study quan trọng.

### Google Search Console

- [ ] Xác minh Domain Property bằng DNS.
- [ ] Gửi `https://trancongtien.com/sitemap.xml`.
- [ ] Yêu cầu index các URL ưu tiên:
  - `https://trancongtien.com`
  - `https://trancongtien.com/ve-toi`
  - `https://trancongtien.com/blog/tran-cong-tien-la-ai`
  - `https://trancongtien.com/du-an`
  - 2–3 case study tốt nhất
- [ ] Kiểm tra Page Indexing, HTTPS, Core Web Vitals và Crawl Stats.
- [ ] Kiểm tra sitemap ảnh và báo cáo hiệu suất Search Appearance.

### Công việc trong code

- [x] Đổi H1 trang chủ thành `Trần Công Tiến — Full-stack Developer & AI Agent Builder`.
- [x] Đưa câu “Biến ý tưởng của bạn thành sản phẩm thực tế” xuống tagline.
- [x] Thống nhất Person `@id`, URL và liên kết schema trên toàn site.
- [x] Cho schema trang chủ dùng `mainEntity` trỏ tới Person.
- [x] Cho `BlogPosting.author` trỏ tới cùng Person `@id`.
- [x] Bổ sung `dateModified`, `publisher`, `inLanguage` và Breadcrumb cho bài viết.
- [x] Bổ sung author Entity, ngày cập nhật và Breadcrumb cho case study dự án.
- [x] Escape ký tự `<` trong JSON-LD trước khi render.
- [x] Sửa kích thước Open Graph: không khai báo ảnh chân dung 1024×1280 thành 1200×630.
- [x] Bỏ `lastModified` giả cho trang tĩnh; bài viết và dự án vẫn dùng ngày cập nhật thật.
- [ ] Kiểm tra schema bằng Rich Results Test và Schema Markup Validator.

## 4. Giai đoạn 2 — Xây dựng Entity cá nhân (Tuần 1–3)

### Danh tính chuẩn dùng ở mọi nền tảng

- **Tên:** Trần Công Tiến
- **Tên không dấu:** Tran Cong Tien
- **Chức danh:** Full-stack Developer & AI Agent Builder
- **Địa điểm:** Đà Nẵng, Việt Nam
- **Website:** `https://trancongtien.com`
- **Ảnh đại diện:** dùng cùng một ảnh chân dung rõ mặt

### Đồng bộ hồ sơ

- [ ] LinkedIn: cập nhật tên, headline, About, location và website.
- [ ] GitHub: cập nhật bio, location, website và Profile README.
- [ ] Facebook: công khai phần giới thiệu nghề nghiệp và website phù hợp.
- [ ] YouTube: cập nhật tên kênh, mô tả và website.
- [ ] Kiểm tra tất cả hồ sơ đều liên kết ngược về `trancongtien.com`.
- [ ] Kiểm tra website liên kết đúng về các hồ sơ qua `sameAs`.
- [ ] Không tạo hàng loạt profile rác chỉ để lấy backlink.

### Trang giới thiệu

- [ ] Hoàn thiện `/ve-toi` với tiểu sử thật, kinh nghiệm, kỹ năng và hành trình.
- [x] Thêm ảnh chân dung có caption chứa tên và bối cảnh tự nhiên.
- [ ] Thêm liên kết đến dự án, bài viết, GitHub, LinkedIn và CV.
- [ ] Phân biệt mục đích `/ve-toi` và bài `Trần Công Tiến là ai?` để tránh hai trang cạnh tranh cùng ý định tìm kiếm.

## 5. Giai đoạn 3 — SEO hình ảnh (Tuần 2–4)

- [ ] Chuẩn bị ảnh vuông rõ mặt cho hồ sơ và Entity.
- [ ] Chuẩn bị ảnh dọc chân dung chất lượng cao.
- [ ] Chuẩn bị ảnh ngang 1200×630 riêng cho Open Graph.
- [ ] Chuyển ảnh hiển thị sang WebP/AVIF phù hợp, giữ dung lượng khoảng 150–300 KB nếu chất lượng cho phép.
- [ ] Dùng tên file mô tả rõ:
  - `tran-cong-tien.webp`
  - `tran-cong-tien-full-stack-developer-da-nang.webp`
  - `tran-cong-tien-ai-agent-builder.webp`
- [ ] Viết alt tự nhiên, không lặp từ khóa quá mức.
- [ ] Đặt caption và văn bản liên quan quanh ảnh.
- [ ] Giữ URL ảnh ổn định.
- [ ] Dùng cùng bộ ảnh trên website và các hồ sơ chính thức.
- [ ] Kiểm tra ảnh có trong image sitemap và không bị chặn crawl.

## 6. Giai đoạn 4 — Nội dung chuyên môn (Tháng 1–3)

### Lịch nội dung mỗi tháng

- 2 case study dự án thật.
- 2 bài chuyên môn sâu.
- 1 bài quan điểm hoặc câu chuyện cá nhân.
- 1 tài nguyên hữu ích có thể tải hoặc chia sẻ.

### Cấu trúc case study

- [ ] Bài toán của khách hàng.
- [ ] Vai trò cụ thể của Trần Công Tiến.
- [ ] Phạm vi và quy trình triển khai.
- [ ] Công nghệ sử dụng và lý do lựa chọn.
- [ ] Ảnh giao diện hoặc sản phẩm thật.
- [ ] Kết quả định lượng nếu có.
- [ ] Nhận xét khách hàng nếu được phép.
- [ ] Liên kết tới dịch vụ liên quan và trang liên hệ.

### Cụm nội dung ưu tiên

1. Trần Công Tiến / Tran Cong Tien.
2. Full-stack Developer tại Đà Nẵng.
3. Phát triển MVP cho startup.
4. Thiết kế và phát triển web app.
5. AI Agent cho doanh nghiệp.
6. Dashboard, CRM, booking và automation.

Mỗi bài cần trả lời một nhu cầu tìm kiếm cụ thể; không xuất bản nhiều bài mỏng hoặc nội dung AI chung chung.

## 7. Giai đoạn 5 — Digital PR và backlink (Tháng 2–3)

- [ ] Xin liên kết hoặc credit từ website khách hàng đã triển khai thật.
- [ ] Xuất hiện trong trang đội ngũ/cộng tác viên của đối tác phù hợp.
- [ ] Viết guest post chuyên môn trên cộng đồng uy tín.
- [ ] Tham gia podcast, workshop, meetup hoặc bài phỏng vấn.
- [ ] Công khai GitHub project hoặc tài nguyên hữu ích có người dùng thật.
- [ ] Dùng anchor text tự nhiên: `Trần Công Tiến`, tên dự án hoặc URL.
- [ ] Không mua backlink số lượng lớn và không dùng mạng lưới website rác.

## 8. Checklist hàng tuần

- [ ] Kiểm tra URL mới có được index không.
- [ ] Kiểm tra truy vấn thương hiệu trong Search Console và Bing.
- [ ] Kiểm tra lỗi crawl, redirect, 404 và schema.
- [ ] Cập nhật hoặc xuất bản ít nhất một nội dung có giá trị.
- [ ] Chia sẻ nội dung trên hồ sơ chính thức.
- [ ] Tìm một cơ hội đề cập thương hiệu hoặc backlink thật.
- [ ] Ghi lại impression, click, CTR, position và conversion.

## 9. Mốc đánh giá

### Sau 2 tuần

- Google và Bing đã nhận sitemap.
- Các URL chính bắt đầu được index.
- Hồ sơ mạng xã hội đã đồng nhất tên, ảnh, bio và website.

### Sau 30 ngày

- Trang chủ xuất hiện cho truy vấn thương hiệu.
- Search Console ghi nhận impression của tên có dấu và không dấu.
- Có ít nhất 2 case study/bài chuyên môn mới và 3–5 đề cập uy tín.

### Sau 60 ngày

- Vị trí truy vấn thương hiệu tăng ổn định.
- Ảnh bắt đầu có impression trong Image Search.
- Có nội dung xếp hạng cho tên + nghề nghiệp hoặc tên + địa điểm.

### Sau 90 ngày

- Đánh giá khả năng chiếm Top 1 truy vấn thương hiệu.
- Xác định các URL đang cạnh tranh lẫn nhau và hợp nhất nếu cần.
- Mở rộng sang các từ khóa dịch vụ có khả năng tạo khách hàng.
- Nếu Knowledge Panel xuất hiện, tiến hành claim và xác minh chính chủ.

## 10. Thông tin xác minh Bing hiện tại

- Verification token: `1F727722FDD48782B6C231BAB19AA707`
- XML URL sau deploy: `https://trancongtien.com/BingSiteAuth.xml`
- Sitemap: `https://trancongtien.com/sitemap.xml`

Không xóa file XML hoặc meta verification sau khi xác minh để Bing có thể kiểm tra lại quyền sở hữu sau này.
