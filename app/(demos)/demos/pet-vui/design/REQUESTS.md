# REQUESTS (file chung cần điều phối viên xử lý)

1. Đăng ký `pet-vui` vào `features/showroom/registry.ts` từ `meta.ts` (`id: "LP-19"`, `solutionSlug: "spa"`). Cho tới khi đăng ký, `buildConsultHref("pet-vui")` trả về `/lien-he` trơn (không có `industry`/`solution`/`utm_*`), nên nút "Gửi yêu cầu tư vấn" chưa mang tham số.
2. Không có yêu cầu sửa `globals.css`/`package.json`.
