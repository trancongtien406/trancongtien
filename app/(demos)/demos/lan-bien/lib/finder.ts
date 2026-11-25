/**
 * Luật gợi ý của công cụ "Bạn đang ở tầng nào?". Luật xác định, chạy trong trình duyệt, không API.
 * Chỉ gợi ý nội dung để tìm hiểu tiếp: không cấp quyền tham gia, không thay thế đánh giá sức khoẻ
 * hay quyết định của hướng dẫn viên. Tên cấp độ dùng tên chung (OWD, AOWD là cấp độ phổ biến).
 */

export type Experience = "none" | "snorkel" | "guided" | "basic" | "regular";
export type Cert = "none" | "owd" | "aowd" | "other" | "unknown";
export type Goal = "first" | "reef" | "learn" | "advanced" | "freedive" | "water";

export const EXPERIENCES: { value: Experience; label: string }[] = [
  { value: "none", label: "Chưa từng lặn" },
  { value: "snorkel", label: "Đã thử snorkeling" },
  { value: "guided", label: "Đã trải nghiệm lặn có bình khí cùng hướng dẫn viên" },
  { value: "basic", label: "Đã học chương trình lặn cơ bản" },
  { value: "regular", label: "Đã lặn thường xuyên" },
];

export const CERTS: { value: Cert; label: string; hint?: string }[] = [
  { value: "none", label: "Chưa có chứng chỉ" },
  { value: "owd", label: "OWD hoặc cấp độ tương đương", hint: "Cấp độ nhập môn phổ biến" },
  { value: "aowd", label: "AOWD hoặc cấp độ tương đương", hint: "Cấp độ nâng cao phổ biến" },
  { value: "other", label: "Cấp độ khác" },
  { value: "unknown", label: "Không chắc về cấp độ hiện tại" },
];

export const GOALS: { value: Goal; label: string }[] = [
  { value: "first", label: "Thử cảm giác lặn lần đầu" },
  { value: "reef", label: "Quan sát san hô và sinh vật biển" },
  { value: "learn", label: "Học nền tảng lặn có bình khí" },
  { value: "advanced", label: "Phát triển kỹ năng lặn nâng cao" },
  { value: "freedive", label: "Tìm hiểu freediving" },
  { value: "water", label: "Tham gia thể thao nước nhẹ nhàng" },
];

export type FinderInput = { experience: Experience | ""; certs: Cert[]; goal: Goal | "" };
export type FinderErrors = Partial<Record<"experience" | "certs" | "goal", string>>;

export type Recommendation = {
  id: string;
  title: string;
  /** nhãn nhỏ phía trên tiêu đề */
  kind: string;
  blurb: string;
  why: string;
  prep: string[];
  /** khoá học trên trang để cuộn tới, nếu có */
  courseId?: string;
  /** thông tin cần trao đổi trước khi gợi ý cụ thể hơn */
  needsReview: boolean;
};

export const ERROR_TEXT = {
  experience: "Bạn hãy chọn kinh nghiệm hiện tại.",
  goal: "Hãy cho chúng tôi biết điều bạn muốn khám phá.",
  certs: "Bạn hãy chọn ít nhất một mục về chứng chỉ. Nếu chưa rõ, hãy chọn mục không chắc để nhận gợi ý trao đổi.",
} as const;

export function validate(i: FinderInput): FinderErrors {
  const e: FinderErrors = {};
  if (!i.experience) e.experience = ERROR_TEXT.experience;
  if (i.certs.length === 0) e.certs = ERROR_TEXT.certs;
  if (!i.goal) e.goal = ERROR_TEXT.goal;
  return e;
}

/** Chọn "chưa có" hoặc "không chắc" thì bỏ các lựa chọn khác; chọn cấp độ thì bỏ hai mục trên. */
export function toggleCert(prev: Cert[], v: Cert): Cert[] {
  if (prev.includes(v)) return prev.filter((c) => c !== v);
  if (v === "none" || v === "unknown") return [v];
  return [...prev.filter((c) => c !== "none" && c !== "unknown"), v];
}

const BASE_PREP = [
  "Khai báo sức khoẻ trung thực và trao đổi với bác sĩ nếu bạn có bệnh nền.",
  "Xác nhận điều kiện thời tiết và biển với hướng dẫn viên trước ngày đi.",
];

const PREP: Record<string, string[]> = {
  snorkeling: [
    "Đồ bơi, khăn và kem chống nắng thân thiện với rạn san hô.",
    "Thử bơi thoải mái ở nước sâu ngang ngực trước ngày đi.",
    "Nghe hướng dẫn về áo phao, kính, ống thở và tín hiệu tay.",
  ],
  discover: [
    "Trao đổi về tình trạng sức khoẻ, đặc biệt là tai, xoang và hô hấp.",
    "Chuẩn bị đồ bơi, khăn; không dùng rượu bia trước buổi lặn.",
    "Làm quen thiết bị và nghe phổ biến quy trình trên bờ trước khi xuống nước.",
  ],
  owd: [
    "Dành thời gian cho phần lý thuyết và các buổi thực hành theo lịch khoá.",
    "Chuẩn bị thông tin sức khoẻ và giấy tờ theo danh sách của khoá học.",
    "Hỏi về thiết bị cá nhân và thiết bị cho thuê.",
  ],
  aowd: [
    "Mang theo chứng chỉ nền tảng và nhật ký lặn nếu có.",
    "Cho chúng tôi biết lần lặn gần nhất của bạn là khi nào.",
    "Nêu mục tiêu học để cùng chọn nội dung thực hành phù hợp.",
  ],
  freediving: [
    "Trao đổi sức khoẻ, đặc biệt về tim mạch, tai và hô hấp.",
    "Có người hướng dẫn chuyên môn và quy trình giám sát cho mọi buổi tập.",
    "Không tự luyện nín thở trong nước, kể cả ở bể bơi.",
  ],
  confirm: [
    "Tìm lại thẻ chứng chỉ hoặc email xác nhận khoá học nếu còn.",
    "Nhớ lại lần lặn gần nhất và nơi bạn đã lặn.",
    "Mang nhật ký lặn nếu có để trao đổi.",
  ],
  advisory: [
    "Mang theo chứng chỉ và nhật ký lặn nếu có.",
    "Cho chúng tôi biết thời điểm lặn gần nhất và loại thiết bị bạn quen dùng.",
    "Nêu rõ điều bạn muốn học hoặc muốn xem.",
  ],
  reef: [
    "Mang theo chứng chỉ và cho chúng tôi biết lần lặn gần nhất.",
    "Chuẩn bị đồ bơi, khăn; hỏi về thiết bị cho thuê nếu cần.",
    "Thống nhất kế hoạch lặn và giới hạn với hướng dẫn viên trước khi xuống nước.",
  ],
};

function make(
  id: string, title: string, kind: string, blurb: string, why: string,
  opts: { courseId?: string; needsReview?: boolean; prepKey?: string } = {},
): Recommendation {
  return {
    id, title, kind, blurb, why,
    prep: [...(PREP[opts.prepKey ?? id] ?? []), ...BASE_PREP],
    courseId: opts.courseId,
    needsReview: !!opts.needsReview,
  };
}

const has = (c: Cert[], v: Cert) => c.includes(v);

/** Trả về gợi ý theo thứ tự ưu tiên của luật. Gọi sau khi validate không còn lỗi. */
export function recommend(i: FinderInput): Recommendation {
  const exp = i.experience as Experience;
  const goal = i.goal as Goal;
  const certs = i.certs;
  const certified = has(certs, "owd") || has(certs, "aowd");

  // 1. Freediving là bộ môn riêng, không phụ thuộc chứng chỉ lặn có bình khí.
  if (goal === "freedive") {
    return make("freediving", "Freediving nhập môn", "Gợi ý để tìm hiểu",
      "Làm quen lặn tự do qua kiến thức, kỹ thuật và thực hành có giám sát.",
      "Bạn muốn tìm hiểu freediving. Đây là bộ môn có đào tạo riêng, nên chúng tôi ưu tiên chương trình này dù bạn đã có hay chưa có chứng chỉ lặn có bình khí.",
      { courseId: "freediving" });
  }

  // 2. Không chắc về cấp độ: không tự đề xuất nội dung nâng cao.
  if (has(certs, "unknown")) {
    return make("confirm", "Trao đổi để xác nhận cấp độ", "Cần trao đổi thêm",
      "Chúng tôi sẽ cùng bạn xem lại chứng chỉ và kinh nghiệm trước khi gợi ý khoá học.",
      "Bạn chưa chắc về cấp độ hiện tại, nên chúng tôi không đưa ra gợi ý nâng cao khi chưa xác nhận.",
      { needsReview: true });
  }

  // 3. Thông tin mâu thuẫn: không tự kết luận.
  const noCert = has(certs, "none");
  const conflict =
    (certified && (exp === "none" || exp === "snorkel")) ||
    (noCert && exp === "regular") ||
    (has(certs, "aowd") && exp === "guided");
  if (conflict) {
    return make("confirm", "Trao đổi để xác nhận cấp độ", "Cần trao đổi thêm",
      "Thông tin kinh nghiệm và chứng chỉ của bạn chưa khớp nhau, nên cần trao đổi trực tiếp.",
      "Chúng tôi không tự kết luận cấp độ khi hai phần thông tin chưa thống nhất. Một cuộc trao đổi ngắn sẽ giúp chọn đúng hơn.",
      { needsReview: true });
  }

  // 4. Mục tiêu nâng cao.
  if (goal === "advanced") {
    if (has(certs, "aowd")) {
      return make("advisory", "Tư vấn chương trình phù hợp", "Gợi ý để tìm hiểu",
        "Bạn đã có nền tảng nâng cao; chúng tôi sẽ cùng chọn nội dung tiếp theo.",
        "Với cấp độ này, việc chọn nội dung cần xem kinh nghiệm gần đây, thiết bị và điều kiện biển nên cần được đánh giá trước.",
        { courseId: "aowd", needsReview: true });
    }
    if (has(certs, "owd")) {
      return make("aowd", "Tư vấn lộ trình AOWD", "Gợi ý để tìm hiểu",
        "Mở rộng kỹ năng sau khi đã có nền tảng nhập môn.",
        "Bạn đã có OWD hoặc tương đương và muốn phát triển thêm. Chúng tôi sẽ rà lại kinh nghiệm trước khi gợi ý nội dung.",
        { courseId: "aowd", needsReview: true });
    }
    if (noCert) {
      return make("owd", "Open Water Diver (OWD)", "Gợi ý để tìm hiểu",
        "Xây nền tảng trước khi nghĩ đến nội dung nâng cao.",
        "Nội dung nâng cao cần có nền tảng. Bạn có thể bắt đầu từ khoá nhập môn, một cấp độ phổ biến trong đào tạo lặn.",
        { courseId: "owd" });
    }
    return make("confirm", "Trao đổi để xác nhận cấp độ", "Cần trao đổi thêm",
      "Cấp độ khác cần được xem lại trước khi gợi ý nội dung nâng cao.",
      "Chúng tôi chưa biết cấp độ của bạn tương đương mức nào, nên cần trao đổi trước.",
      { needsReview: true });
  }

  // 5. Thể thao nước nhẹ nhàng.
  if (goal === "water") {
    return make("snorkeling", "Snorkeling", "Gợi ý để tìm hiểu",
      "Hoạt động gần mặt nước, nhẹ nhàng và có hướng dẫn.",
      "Bạn muốn tham gia hoạt động nước nhẹ nhàng. Snorkeling là cách làm quen phù hợp mà chưa cần bình khí.",
      { courseId: "snorkeling" });
  }

  // 5b. Cấp độ khác: cần biết tương đương mức nào trước khi chọn.
  if (has(certs, "other") && !certified) {
    return make("confirm", "Trao đổi để xác nhận cấp độ", "Cần trao đổi thêm",
      "Cấp độ bạn đang có cần được xem lại để chọn nội dung phù hợp.",
      "Chúng tôi chưa biết cấp độ khác của bạn tương đương mức nào, nên cần trao đổi trước khi gợi ý.",
      { needsReview: true });
  }

  // 6. Đã có chứng chỉ, muốn làm quen lại hoặc ngắm rạn.
  if (certified && (goal === "reef" || goal === "first")) {
    return make("reef", "Buổi lặn ngắm rạn có hướng dẫn", "Cần trao đổi thêm",
      "Một buổi lặn quan sát rạn, chọn theo kinh nghiệm và điều kiện biển của bạn.",
      "Bạn đã có chứng chỉ, nên chúng tôi chọn buổi lặn theo lần lặn gần nhất và giới hạn thoải mái của bạn.",
      { courseId: "owd", needsReview: true });
  }
  if (certified && goal === "learn") {
    return make("advisory", "Tư vấn chương trình phù hợp", "Gợi ý để tìm hiểu",
      "Bạn đã có nền tảng, nên chúng tôi sẽ cùng xem nội dung tiếp theo.",
      "Học nền tảng thường dành cho người chưa có chứng chỉ. Với bạn, cần xem lại kinh nghiệm để chọn bước kế tiếp.",
      { courseId: "aowd", needsReview: true });
  }

  // 7. Chưa có chứng chỉ (hoặc cấp độ khác).
  if (goal === "first") {
    return make("discover", "Discover Scuba", "Gợi ý để tìm hiểu",
      "Buổi làm quen lặn có bình khí cùng hướng dẫn viên.",
      "Bạn đang ở giai đoạn tìm hiểu ban đầu. Một buổi làm quen có người hướng dẫn giúp bạn thấy thiết bị và môi trường dưới nước trước khi quyết định học sâu hơn.",
      { courseId: "discover" });
  }
  if (goal === "reef") {
    if (exp === "guided" || exp === "basic" || exp === "regular") {
      return make("discover", "Discover Scuba", "Gợi ý để tìm hiểu",
        "Quan sát rạn san hô cùng hướng dẫn viên khi bạn chưa có chứng chỉ.",
        "Bạn muốn ngắm rạn và đã có chút trải nghiệm lặn. Buổi làm quen có hướng dẫn là bước phù hợp để bắt đầu.",
        { courseId: "discover" });
    }
    return make("snorkeling", "Snorkeling", "Gợi ý để tìm hiểu",
      "Ngắm rạn từ mặt nước, chưa cần bình khí.",
      "Bạn muốn quan sát san hô và sinh vật biển. Snorkeling cho phép làm điều đó từ mặt nước, rồi bạn có thể tính tiếp bước lặn có bình khí.",
      { courseId: "snorkeling" });
  }
  // goal === "learn"
  return make("owd", "Open Water Diver (OWD)", "Gợi ý để tìm hiểu",
    "Khoá nền tảng cho người muốn lặn có bình khí một cách bài bản.",
    "Bạn muốn học nền tảng lặn có bình khí và chưa có chứng chỉ. OWD là một cấp độ phổ biến để bắt đầu.",
    { courseId: "owd" });
}
