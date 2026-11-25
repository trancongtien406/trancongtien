# Yêu cầu sửa file chung (không tự sửa)
1. `features/showroom/registry.ts`: thêm mục
   `{ id: "LP-14", slug: "glamping-nui", brand: "Rừng Thức", industry: "Glamping", solutionSlug: "hospitality", tagline: "Glamping & camping núi gần Đà Nẵng", batch: 3, look: "Rừng đêm, lửa trại: cuộn ngang một ngày-đêm, sáng chuyển tối, tàn lửa bay" }`
   (nếu `batch` chỉ cho 1|2|3 thì dùng 3 hoặc mở rộng kiểu). Khi chưa có, `buildConsultHref("glamping-nui")` trả `/lien-he` không kèm industry/solution/utm.
2. Thanh nổi DemoNotice cố định đáy màn hình che 60px cuối viewport; trang này đã tránh (thanh mốc hành trình đặt cách đáy 84px).
