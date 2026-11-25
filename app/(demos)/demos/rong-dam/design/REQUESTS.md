# REQUESTS (file chung cần chủ xem)

1. Không cần sửa file chung để demo chạy. Bản EN dùng wrapper `<div lang="en">` và `HtmlLang` (client) để đặt `<html lang="en">` khi chạy, vì root layout cố định `lang="vi"`. Nếu muốn `lang="en"` có ngay trong HTML server-render (SEO/đọc màn hình trước hydrate), cần root layout nhận ngôn ngữ theo segment (ví dụ route group riêng có root layout thứ hai). Đề xuất, không bắt buộc cho demo noindex.
2. `metadataBase` chưa có trong `app/layout.tsx`: hreflang/canonical xuất ra URL tuyệt đối dựa trên origin hiện tại (localhost khi dev). Khi publish nên đặt `metadataBase` = `https://trancongtien.com`.
3. `features/showroom/registry.ts`: Rong Dặm dùng `solutionSlug: "hospitality"`, `industry: "Tour"`; nếu có trang `/solutions` riêng cho tour thì đổi lại.
