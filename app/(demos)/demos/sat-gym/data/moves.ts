/** Kho động tác cho bộ chọn bài tập. Dữ liệu tĩnh, mọi tính toán chạy phía trình duyệt. */

export type Equip = "tay" | "ta-tay" | "kettlebell" | "thanh-ta" | "day-nhay" | "xa";
export type Pattern = "squat" | "hinge" | "push" | "pull" | "core" | "cardio" | "carry" | "mobility";
export type Level = 1 | 2 | 3;

export type Move = {
  id: string;
  name: string;
  equip: Equip;
  level: Level;
  pattern: Pattern;
  /** số lần (hoặc giây nếu unit = "giây") theo trình độ 1, 2, 3 */
  reps: [number, number, number];
  unit: "lần" | "giây" | "lần mỗi bên" | "bước";
  /** nhóm cơ chính, viết ngắn */
  muscles: string;
  /** một câu hướng dẫn kỹ thuật */
  cue: string;
  /** không thu nhỏ số lần khi chọn mục tiêu sức mạnh (giữ, nhịp, bài tính giây) */
  fixed?: boolean;
};

export const EQUIP: { id: Equip; label: string; hint: string }[] = [
  { id: "tay", label: "Chỉ cơ thể", hint: "Không cần dụng cụ" },
  { id: "ta-tay", label: "Tạ tay", hint: "Dumbbell" },
  { id: "kettlebell", label: "Kettlebell", hint: "Tạ chuông" },
  { id: "thanh-ta", label: "Thanh tạ", hint: "Barbell, cần rack" },
  { id: "day-nhay", label: "Dây nhảy", hint: "Dây nhảy tốc độ" },
  { id: "xa", label: "Xà", hint: "Xà đơn hoặc xà thấp" },
];

export const MOVES: Move[] = [
  // Chỉ cơ thể
  { id: "air-squat", name: "Squat không tạ", equip: "tay", level: 1, pattern: "squat", reps: [12, 15, 20], unit: "lần", muscles: "Đùi, mông", cue: "Hai bàn chân rộng bằng vai, ngồi xuống như ngồi ghế, gót chân bám sàn, ngực mở." },
  { id: "squat-jump", name: "Squat bật", equip: "tay", level: 2, pattern: "squat", reps: [8, 10, 12], unit: "lần", muscles: "Đùi, mông, bắp chân", cue: "Hạ squat có kiểm soát, bật lên rồi tiếp đất nhẹ bằng cả bàn chân, đầu gối không đổ vào trong." },
  { id: "lunge", name: "Lunge lùi đổi chân", equip: "tay", level: 1, pattern: "squat", reps: [8, 10, 12], unit: "lần mỗi bên", muscles: "Đùi, mông", cue: "Bước một chân ra sau, hạ thấp đầu gối sau về phía sàn, thân người thẳng." },
  { id: "push-up-knee", name: "Hít đất tựa gối hoặc tựa cao", equip: "tay", level: 1, pattern: "push", reps: [6, 8, 10], unit: "lần", muscles: "Ngực, vai, tay sau", cue: "Thân thành một đường thẳng, khuỷu tay chếch khoảng 45 độ, hạ ngực gần sàn." },
  { id: "push-up", name: "Hít đất", equip: "tay", level: 2, pattern: "push", reps: [8, 10, 15], unit: "lần", muscles: "Ngực, vai, tay sau", cue: "Siết bụng và mông, hạ cả thân người cùng lúc, đẩy sàn ra xa." },
  { id: "plank", name: "Plank", equip: "tay", level: 1, pattern: "core", reps: [20, 30, 45], unit: "giây", muscles: "Bụng, vai", cue: "Khuỷu tay dưới vai, bụng siết, không võng lưng, thở đều.", fixed: true },
  { id: "dead-bug", name: "Dead bug", equip: "tay", level: 1, pattern: "core", reps: [6, 8, 10], unit: "lần mỗi bên", muscles: "Bụng sâu", cue: "Lưng dưới ép nhẹ xuống sàn, duỗi tay chân đối bên thật chậm." },
  { id: "hollow", name: "Hollow hold", equip: "tay", level: 3, pattern: "core", reps: [15, 20, 30], unit: "giây", muscles: "Bụng", cue: "Lưng dưới dính sàn, tay và chân duỗi, hạ thấp đến mức giữ được lưng phẳng.", fixed: true },
  { id: "bridge", name: "Cầu hông", equip: "tay", level: 1, pattern: "hinge", reps: [12, 15, 20], unit: "lần", muscles: "Mông, đùi sau", cue: "Gót chân đạp sàn, đẩy hông lên đến khi thân thẳng, siết mông một nhịp." },
  { id: "superman", name: "Superman nằm sấp", equip: "tay", level: 1, pattern: "pull", reps: [8, 10, 12], unit: "lần", muscles: "Lưng, mông", cue: "Nằm sấp, nâng nhẹ tay và ngực, kéo bả vai về sau, không ngửa cổ." },
  { id: "step-burpee", name: "Burpee bước", equip: "tay", level: 1, pattern: "cardio", reps: [5, 6, 8], unit: "lần", muscles: "Toàn thân", cue: "Đặt tay xuống sàn, bước hai chân ra sau, bước về, đứng dậy rồi giơ tay qua đầu." },
  { id: "burpee", name: "Burpee", equip: "tay", level: 2, pattern: "cardio", reps: [6, 8, 12], unit: "lần", muscles: "Toàn thân", cue: "Hạ người xuống sàn, bật chân về, đứng dậy và bật nhẹ. Giữ nhịp đều, đừng lao." },
  { id: "mountain", name: "Mountain climber", equip: "tay", level: 1, pattern: "cardio", reps: [20, 30, 40], unit: "lần", muscles: "Bụng, vai, tim phổi", cue: "Hai tay dưới vai, đưa đầu gối lần lượt về ngực, hông giữ thấp." },
  { id: "jack", name: "Nhảy sao", equip: "tay", level: 1, pattern: "cardio", reps: [20, 30, 40], unit: "lần", muscles: "Toàn thân, tim phổi", cue: "Nhảy mở chân và giơ tay qua đầu, tiếp đất nhẹ, giữ nhịp thở." },
  { id: "high-knees", name: "Chạy nâng gối tại chỗ", equip: "tay", level: 1, pattern: "cardio", reps: [20, 30, 40], unit: "lần", muscles: "Đùi, tim phổi", cue: "Nâng gối ngang hông, tay đánh nhịp, tiếp đất bằng nửa bàn chân trước." },
  { id: "bear", name: "Bò gấu", equip: "tay", level: 2, pattern: "carry", reps: [8, 10, 12], unit: "bước", muscles: "Vai, bụng", cue: "Hai gối lơ lửng sát sàn, tay chân đối bên cùng tiến, lưng phẳng." },
  { id: "wgs", name: "World's greatest stretch", equip: "tay", level: 1, pattern: "mobility", reps: [4, 5, 6], unit: "lần mỗi bên", muscles: "Hông, cột sống ngực", cue: "Bước dài vào lunge, tay trong chạm sàn, xoay ngực mở ra, thở ra khi xoay." },
  { id: "cat-cow", name: "Mèo - bò", equip: "tay", level: 1, pattern: "mobility", reps: [8, 10, 12], unit: "lần", muscles: "Cột sống, hông", cue: "Quỳ chống bốn điểm, cong lưng lên rồi võng nhẹ xuống, cử động theo hơi thở." },
  { id: "deep-squat", name: "Giữ squat sâu", equip: "tay", level: 1, pattern: "mobility", reps: [20, 30, 40], unit: "giây", muscles: "Hông, mắt cá", cue: "Ngồi sâu trong tầm bạn thoải mái, khuỷu tay đẩy nhẹ đầu gối ra ngoài, ngực cao.", fixed: true },
  // Tạ tay
  { id: "goblet", name: "Goblet squat tạ tay", equip: "ta-tay", level: 1, pattern: "squat", reps: [8, 10, 12], unit: "lần", muscles: "Đùi, mông, bụng", cue: "Ôm tạ trước ngực, khuỷu tay chạm vào trong đầu gối khi ngồi xuống." },
  { id: "db-press", name: "Đẩy vai tạ tay", equip: "ta-tay", level: 1, pattern: "push", reps: [8, 10, 12], unit: "lần", muscles: "Vai, tay sau", cue: "Siết bụng và mông, đẩy tạ lên thẳng qua đầu, không ưỡn lưng." },
  { id: "db-row", name: "Kéo tạ tay một bên", equip: "ta-tay", level: 1, pattern: "pull", reps: [8, 10, 12], unit: "lần mỗi bên", muscles: "Lưng, tay trước", cue: "Một tay chống ghế hoặc đùi, kéo khuỷu tay về hông, bả vai hạ xuống." },
  { id: "db-rdl", name: "Romanian deadlift tạ tay", equip: "ta-tay", level: 1, pattern: "hinge", reps: [8, 10, 12], unit: "lần", muscles: "Đùi sau, mông", cue: "Đẩy hông ra sau, tạ trượt sát đùi, lưng phẳng, đầu gối chỉ chùng nhẹ." },
  { id: "db-thruster", name: "Thruster tạ tay", equip: "ta-tay", level: 2, pattern: "cardio", reps: [6, 8, 10], unit: "lần", muscles: "Toàn thân", cue: "Squat với tạ ở vai, đứng lên và đẩy tạ qua đầu thành một nhịp liền." },
  { id: "db-carry", name: "Mang tạ đi bộ", equip: "ta-tay", level: 1, pattern: "carry", reps: [20, 30, 40], unit: "bước", muscles: "Cổ tay, bụng, vai", cue: "Cầm tạ hai bên, vai hạ, ngực cao, bước đều và chắc." },
  // Kettlebell
  { id: "kb-goblet", name: "Goblet squat kettlebell", equip: "kettlebell", level: 1, pattern: "squat", reps: [8, 10, 12], unit: "lần", muscles: "Đùi, mông, bụng", cue: "Ôm kettlebell trước ngực, ngồi xuống giữa hai chân, ngực cao." },
  { id: "kb-deadlift", name: "Deadlift kettlebell", equip: "kettlebell", level: 1, pattern: "hinge", reps: [8, 10, 12], unit: "lần", muscles: "Đùi sau, mông", cue: "Đặt kettlebell giữa hai chân, đẩy hông ra sau, lưng phẳng, đứng lên bằng chân." },
  { id: "kb-swing", name: "Kettlebell swing", equip: "kettlebell", level: 2, pattern: "hinge", reps: [10, 15, 20], unit: "lần", muscles: "Mông, đùi sau", cue: "Hông bật ra trước đẩy tạ lên ngang ngực, tay chỉ dẫn hướng. Chưa quen thì nhờ HLV xem kỹ thuật." },
  { id: "kb-press", name: "Đẩy vai kettlebell một tay", equip: "kettlebell", level: 2, pattern: "push", reps: [6, 8, 10], unit: "lần mỗi bên", muscles: "Vai, bụng", cue: "Kettlebell ở tư thế rack, siết bụng, đẩy thẳng lên, cổ tay trung tính." },
  { id: "kb-row", name: "Kéo kettlebell một bên", equip: "kettlebell", level: 1, pattern: "pull", reps: [8, 10, 12], unit: "lần mỗi bên", muscles: "Lưng, tay trước", cue: "Thân người nghiêng về trước, lưng phẳng, kéo khuỷu tay về sau." },
  { id: "kb-carry", name: "Mang kettlebell đi bộ", equip: "kettlebell", level: 1, pattern: "carry", reps: [20, 30, 40], unit: "bước", muscles: "Bụng, cổ tay, vai", cue: "Giữ kettlebell bên người, không nghiêng thân, bước đều." },
  // Thanh tạ
  { id: "bb-rdl", name: "Romanian deadlift thanh nhẹ", equip: "thanh-ta", level: 1, pattern: "hinge", reps: [8, 10, 10], unit: "lần", muscles: "Đùi sau, mông", cue: "Thanh nhẹ hoặc thanh trống, đẩy hông ra sau, thanh trượt sát chân, lưng phẳng." },
  { id: "bb-press-light", name: "Đẩy vai thanh nhẹ", equip: "thanh-ta", level: 1, pattern: "push", reps: [6, 8, 8], unit: "lần", muscles: "Vai, tay sau", cue: "Thanh trống hoặc tạ nhẹ, siết bụng và mông, đẩy qua đầu rồi khoá khuỷu." },
  { id: "bb-squat", name: "Back squat", equip: "thanh-ta", level: 2, pattern: "squat", reps: [5, 6, 8], unit: "lần", muscles: "Đùi, mông, lưng dưới", cue: "Thanh trên cơ lưng trên, ngồi thẳng xuống, gối theo hướng mũi chân. Cần rack và người đứng bảo vệ." },
  { id: "bb-deadlift", name: "Deadlift thanh tạ", equip: "thanh-ta", level: 2, pattern: "hinge", reps: [5, 5, 6], unit: "lần", muscles: "Chuỗi cơ sau", cue: "Thanh sát ống chân, ngực cao, đẩy sàn ra xa rồi mới duỗi hông." },
  { id: "bb-press", name: "Đẩy vai thanh tạ", equip: "thanh-ta", level: 2, pattern: "push", reps: [5, 6, 8], unit: "lần", muscles: "Vai, tay sau", cue: "Siết mông, đẩy thanh theo đường thẳng qua đầu, đầu né ra rồi vào lại." },
  { id: "bb-row", name: "Kéo thanh tạ cúi người", equip: "thanh-ta", level: 2, pattern: "pull", reps: [6, 8, 10], unit: "lần", muscles: "Lưng, tay trước", cue: "Lưng phẳng, thân nghiêng khoảng 45 độ, kéo thanh về bụng dưới." },
  { id: "bb-front-squat", name: "Front squat", equip: "thanh-ta", level: 3, pattern: "squat", reps: [4, 5, 6], unit: "lần", muscles: "Đùi, bụng", cue: "Thanh trên vai trước, khuỷu tay cao, ngồi thẳng. Cần có HLV xác nhận kỹ thuật." },
  // Dây nhảy
  { id: "rope", name: "Nhảy dây", equip: "day-nhay", level: 1, pattern: "cardio", reps: [30, 40, 50], unit: "giây", muscles: "Bắp chân, tim phổi", cue: "Nhảy thấp, cổ tay quay dây, tiếp đất nhẹ bằng nửa bàn chân trước.", fixed: true },
  { id: "rope-double", name: "Nhảy dây đôi", equip: "day-nhay", level: 3, pattern: "cardio", reps: [20, 25, 30], unit: "giây", muscles: "Bắp chân, vai, tim phổi", cue: "Bật cao hơn một chút, quay dây nhanh bằng cổ tay. Vấp thì dừng, đừng cố.", fixed: true },
  // Xà
  { id: "hang", name: "Treo xà", equip: "xa", level: 1, pattern: "pull", reps: [15, 20, 30], unit: "giây", muscles: "Cẳng tay, vai, lưng", cue: "Nắm chắc, vai hơi hạ, thở đều. Thả xuống khi tay mỏi.", fixed: true },
  { id: "inv-row", name: "Kéo xà thấp (ngược người)", equip: "xa", level: 1, pattern: "pull", reps: [6, 8, 10], unit: "lần", muscles: "Lưng, tay trước", cue: "Thân thành một đường thẳng, kéo ngực về thanh, bả vai ép về nhau." },
  { id: "pull-up", name: "Kéo xà", equip: "xa", level: 2, pattern: "pull", reps: [3, 5, 8], unit: "lần", muscles: "Lưng, tay trước", cue: "Bắt đầu từ vai hạ, kéo ngực về xà, hạ xuống có kiểm soát. Dùng dây hỗ trợ nếu cần." },
  { id: "knee-raise", name: "Treo xà gập gối", equip: "xa", level: 2, pattern: "core", reps: [5, 8, 10], unit: "lần", muscles: "Bụng, cơ gập hông", cue: "Treo thẳng, cuộn hông lên đưa gối về ngực, hạ xuống chậm, không đung đưa." },
];

export const LEVELS: { id: Level; label: string; hint: string }[] = [
  { id: 1, label: "Mới bắt đầu", hint: "Dưới 3 tháng tập đều" },
  { id: 2, label: "Đã tập đều", hint: "Quen các bài cơ bản" },
  { id: 3, label: "Có kinh nghiệm", hint: "Tự kiểm soát tải và kỹ thuật" },
];
