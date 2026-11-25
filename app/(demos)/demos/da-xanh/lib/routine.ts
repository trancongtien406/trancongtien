/**
 * Luật gợi ý của công cụ Skin Routine Builder. Luật xác định, chạy trong trình duyệt, không API.
 * Chỉ gợi ý thói quen chăm sóc da cơ bản và nhóm hoạt chất chung: không chẩn đoán, không kê đơn,
 * không nêu tên sản phẩm hay thương hiệu, không cam kết kết quả.
 */

export type Skin = "dry" | "oily" | "combo" | "sensitive";
export type Concern = "dull" | "dehydrated" | "oil" | "redness" | "uneven" | "texture";
export type Minutes = 5 | 10 | 15;
export type Budget = "low" | "mid" | "high";
export type Flag = "irritated" | "treating" | "pregnant";

export const SKINS: { value: Skin; label: string; hint: string }[] = [
  { value: "dry", label: "Da khô", hint: "Hay căng, dễ bong sau khi rửa mặt" },
  { value: "oily", label: "Da dầu", hint: "Bóng nhờn nhanh, đặc biệt vùng chữ T" },
  { value: "combo", label: "Da hỗn hợp", hint: "Vùng chữ T dầu, hai má khô hoặc bình thường" },
  { value: "sensitive", label: "Da nhạy cảm", hint: "Dễ đỏ, châm chích khi đổi sản phẩm" },
];

export const CONCERNS: { value: Concern; label: string }[] = [
  { value: "dull", label: "Da xỉn, thiếu sức sống" },
  { value: "dehydrated", label: "Thiếu nước, căng sau khi rửa mặt" },
  { value: "oil", label: "Dầu nhờn, bóng ở vùng chữ T" },
  { value: "redness", label: "Dễ đỏ, nóng khi gặp nắng hoặc gió" },
  { value: "uneven", label: "Màu da chưa đều" },
  { value: "texture", label: "Bề mặt sần, lỗ chân lông dễ thấy" },
];

export const TIMES: { value: Minutes; label: string; hint: string }[] = [
  { value: 5, label: "Khoảng 5 phút", hint: "Gọn, ít bước" },
  { value: 10, label: "Khoảng 10 phút", hint: "Vừa phải" },
  { value: 15, label: "15 phút trở lên", hint: "Có thời gian cho từng lớp" },
];

export const BUDGETS: { value: Budget; label: string; hint: string }[] = [
  { value: "low", label: "Tiết kiệm", hint: "Dưới 500.000 đ mỗi tháng" },
  { value: "mid", label: "Vừa phải", hint: "500.000 đến 1.200.000 đ mỗi tháng" },
  { value: "high", label: "Thoải mái", hint: "Trên 1.200.000 đ mỗi tháng" },
];

export const FLAGS: { value: Flag; label: string }[] = [
  { value: "irritated", label: "Da đang đỏ rát, bong hoặc ngứa" },
  { value: "treating", label: "Đang điều trị da hoặc dùng thuốc bôi theo toa" },
  { value: "pregnant", label: "Đang mang thai hoặc cho con bú" },
];

export type RoutineInput = {
  skin: Skin | "";
  concerns: Concern[];
  minutes: Minutes | 0;
  budget: Budget | "";
  flags: Flag[];
};
export type RoutineErrors = Partial<Record<"skin" | "concerns" | "minutes" | "budget", string>>;

export const MAX_CONCERNS = 3;

export const ERROR_TEXT = {
  skin: "Bạn hãy chọn loại da gần nhất với cảm nhận của mình.",
  concerns: "Hãy chọn ít nhất một mối quan tâm, tối đa ba.",
  minutes: "Bạn muốn dành khoảng bao nhiêu phút mỗi lần chăm sóc?",
  budget: "Hãy chọn mức ngân sách mỗi tháng bạn thấy thoải mái.",
} as const;

export function validate(i: RoutineInput): RoutineErrors {
  const e: RoutineErrors = {};
  if (!i.skin) e.skin = ERROR_TEXT.skin;
  if (i.concerns.length < 1) e.concerns = ERROR_TEXT.concerns;
  if (!i.minutes) e.minutes = ERROR_TEXT.minutes;
  if (!i.budget) e.budget = ERROR_TEXT.budget;
  return e;
}

export function toggleConcern(list: Concern[], c: Concern): Concern[] {
  if (list.includes(c)) return list.filter((x) => x !== c);
  return list.length >= MAX_CONCERNS ? list : [...list, c];
}
export function toggleFlag(list: Flag[], f: Flag): Flag[] {
  return list.includes(f) ? list.filter((x) => x !== f) : [...list, f];
}

export type Step = {
  id: string;
  name: string;
  how: string;
  group: string;
  minutes: number;
  /** "need" là bước nền, "extra" là bước có thể thêm khi muốn */
  tier: "need" | "extra";
  caution?: string;
};

export type Routine = {
  mode: "basic" | "standard" | "full";
  notices: string[];
  am: Step[];
  pm: Step[];
  weekly: Step[];
  learn: string[];
  careful: string[];
  amMinutes: number;
  pmMinutes: number;
  budgetNote: string;
  doctor: boolean;
};

const SKIN_LABEL: Record<Skin, string> = { dry: "da khô", oily: "da dầu", combo: "da hỗn hợp", sensitive: "da nhạy cảm" };

function cleanser(skin: Skin, pm: boolean): Step {
  const how: Record<Skin, string> = {
    dry: "Dùng sữa rửa mặt dạng kem hoặc gel không bọt nhiều. Buổi sáng có thể chỉ rửa với nước mát.",
    oily: "Dùng gel làm sạch bọt nhẹ, massage khoảng 30 giây rồi rửa sạch. Tránh chà mạnh.",
    combo: "Dùng gel hoặc sữa rửa mặt dịu, tập trung vùng chữ T rồi rửa sạch.",
    sensitive: "Dùng sữa rửa mặt không mùi, ít bọt, nước ấm vừa phải. Thấm khô bằng khăn mềm.",
  };
  return {
    id: pm ? "pm-cleanse" : "am-cleanse", name: pm ? "Làm sạch cuối ngày" : "Làm sạch buổi sáng",
    how: skin === "sensitive" && !pm ? "Buổi sáng có thể chỉ cần rửa với nước mát, tránh chà xát." : how[skin],
    group: "Chất làm sạch dịu (hoạt động bề mặt nhẹ)", minutes: 2, tier: "need",
  };
}

function toner(): Step {
  return {
    id: "toner", name: "Lớp nước cấp ẩm", how: "Vỗ nhẹ lên da còn hơi ẩm bằng tay sạch. Không cần dùng bông chà.",
    group: "Chất giữ nước (glycerin, hyaluronic acid)", minutes: 1, tier: "extra",
  };
}

function moisturizer(skin: Skin, pm: boolean): Step {
  const how: Record<Skin, string> = {
    dry: "Dùng kem dưỡng kết cấu dày hơn, thoa mỏng đều và ép nhẹ lên da.",
    oily: "Dùng gel dưỡng hoặc lotion nhẹ, thoa lượng nhỏ. Da dầu vẫn cần ẩm.",
    combo: "Dùng lotion nhẹ toàn mặt, có thể thêm một lớp mỏng cho hai má nếu cảm thấy khô.",
    sensitive: "Dùng kem dưỡng không mùi, ít thành phần, thoa đều và tránh vùng quanh mắt nếu thấy cộm.",
  };
  return {
    id: pm ? "pm-moist" : "am-moist", name: pm ? "Dưỡng ẩm ban đêm" : "Dưỡng ẩm", how: how[skin],
    group: "Chất giữ ẩm và hàng rào da (ceramide, glycerin, chất làm mềm)", minutes: 1, tier: "need",
  };
}

function spf(): Step {
  return {
    id: "spf", name: "Chống nắng", how: "Chọn kem chống nắng phổ rộng có kết cấu bạn chịu thoa đều. Thoa đủ lượng cho mặt và cổ, thoa lại khi ở ngoài trời lâu.",
    group: "Chống nắng phổ rộng", minutes: 1, tier: "need",
  };
}

function removeMakeup(): Step {
  return {
    id: "remove", name: "Tẩy trang hoặc gỡ chống nắng", how: "Dùng dầu, sáp hoặc nước tẩy trang dịu, massage nhẹ rồi rửa lại bằng sữa rửa mặt ở bước sau.",
    group: "Chất làm sạch dầu hoặc micellar dịu", minutes: 2, tier: "extra",
  };
}

type Pick = { name: string; how: string; group: string; caution?: string; learn: string };

function serumFor(c: Concern, skin: Skin, safeMode: boolean, pm: boolean): Pick | null {
  const sensitive = skin === "sensitive" || safeMode;
  switch (c) {
    case "dehydrated":
      return { name: "Tinh chất cấp ẩm", how: "Vài giọt, vỗ đều lên da trước khi dưỡng ẩm.", group: "Chất giữ nước (hyaluronic acid, glycerin, panthenol)", learn: "Chất giữ nước và hàng rào da" };
    case "redness":
      return { name: "Tinh chất làm dịu", how: "Thoa lớp mỏng sau lớp nước. Nếu thấy châm chích, dừng và rửa sạch.", group: "Chất làm dịu (panthenol, chiết xuất rau má, allantoin)", learn: "Nhóm làm dịu" };
    case "oil":
      return sensitive
        ? { name: "Tinh chất làm dịu", how: "Thoa lớp mỏng sau lớp nước.", group: "Chất làm dịu (panthenol, chiết xuất rau má)", learn: "Nhóm làm dịu" }
        : { name: "Tinh chất cân bằng bề mặt", how: "Bắt đầu từ nồng độ thấp, dùng cách ngày trong tuần đầu rồi mới tăng.", group: "Niacinamide ở nồng độ thấp", caution: "Dừng nếu thấy đỏ hoặc nóng rát.", learn: "Niacinamide nồng độ thấp" };
    case "dull":
    case "uneven":
      return pm
        ? { name: "Tinh chất làm đều màu", how: "Dùng cách ngày, từng chất một để dễ nhận biết da phản ứng ra sao.", group: "Niacinamide hoặc các dạng vitamin C dịu", caution: "Không thêm nhiều hoạt chất mới cùng một tuần.", learn: "Chống oxy hoá thử từng bước" }
        : { name: "Tinh chất chống oxy hoá", how: "Dùng buổi sáng dưới kem chống nắng, bắt đầu từ nồng độ thấp.", group: "Chống oxy hoá (vitamin C các dạng, vitamin E)", caution: "Nếu thấy châm chích, giảm tần suất hoặc dừng.", learn: "Chống oxy hoá thử từng bước" };
    case "texture":
      return { name: "Lớp nước làm mềm bề mặt", how: "Dùng thưa và nhẹ, ưu tiên cấp ẩm trước khi nghĩ tới các bước làm mới bề mặt.", group: "Chất giữ nước và chất làm mềm", learn: "Chất giữ nước và hàng rào da" };
  }
}

export function recommend(i: RoutineInput): Routine {
  const skin = i.skin as Skin;
  const minutes = i.minutes as Minutes;
  const budget = i.budget as Budget;
  const flagged = i.flags.length > 0;
  const safeMode = flagged || skin === "sensitive";
  const notices: string[] = [];
  const learn = new Set<string>();
  const careful: string[] = [];

  if (flagged) {
    const parts: string[] = [];
    if (i.flags.includes("irritated")) parts.push("da đang đỏ rát, bong hoặc ngứa");
    if (i.flags.includes("treating")) parts.push("đang điều trị da hoặc dùng thuốc bôi theo toa");
    if (i.flags.includes("pregnant")) parts.push("đang mang thai hoặc cho con bú");
    notices.push(`Bạn cho biết ${parts.join(", ")}. Quy trình dưới đây chỉ giữ các bước nền (làm sạch dịu, dưỡng ẩm, chống nắng). Hãy hỏi bác sĩ da liễu trước khi thêm bất kỳ hoạt chất hay sản phẩm mới nào.`);
  }
  if (skin === "sensitive" && !flagged) {
    notices.push("Với da nhạy cảm, hãy đổi từng sản phẩm một và thử một vùng nhỏ trước. Nếu da đỏ rát kéo dài, hãy gặp bác sĩ da liễu.");
  }

  const am: Step[] = [cleanser(skin, false)];
  const pm: Step[] = [];

  // Tối: tẩy trang nếu có thời gian, rồi làm sạch
  if (minutes >= 10) pm.push(removeMakeup());
  pm.push(cleanser(skin, true));

  if (!safeMode) {
    if (minutes >= 15) { am.push(toner()); pm.push(toner()); }
    const picks = i.concerns.map((c) => ({ c, am: serumFor(c, skin, safeMode, false), pm: serumFor(c, skin, safeMode, true) }));
    const amPick = minutes >= 10 ? picks.find((p) => p.am && (p.c === "dull" || p.c === "uneven" || p.c === "redness" || p.c === "dehydrated")) ?? picks[0] : undefined;
    const pmPick = minutes >= 10 ? picks.find((p) => p.pm && p.c !== amPick?.c) ?? picks[0] : undefined;
    if (amPick?.am) {
      am.push({ id: "am-serum", name: amPick.am.name, how: amPick.am.how, group: amPick.am.group, minutes: 1, tier: "extra", caution: amPick.am.caution });
      learn.add(amPick.am.learn);
    }
    if (pmPick?.pm) {
      pm.push({ id: "pm-serum", name: pmPick.pm.name, how: pmPick.pm.how, group: pmPick.pm.group, minutes: 1, tier: "extra", caution: pmPick.pm.caution });
      learn.add(pmPick.pm.learn);
    }
  } else {
    learn.add("Chất giữ nước và hàng rào da");
    if (skin === "sensitive" || i.concerns.includes("redness")) learn.add("Nhóm làm dịu");
  }

  am.push(moisturizer(skin, false), spf());
  pm.push(moisturizer(skin, true));
  learn.add("Chống nắng phổ rộng");

  // Bước thêm theo tuần: chỉ khi an toàn và có thời gian
  const weekly: Step[] = [];
  if (minutes >= 10) {
    weekly.push({
      id: "mask", name: "Mặt nạ cấp ẩm hoặc làm dịu", how: "Một đến hai lần mỗi tuần, đắp theo thời gian ghi trên bao bì rồi rửa sạch hoặc vỗ đều.",
      group: "Chất giữ nước và làm dịu", minutes: 12, tier: "extra",
    });
  }
  if (!safeMode && minutes >= 10 && (i.concerns.includes("texture") || i.concerns.includes("dull") || i.concerns.includes("oil")) && skin !== "dry") {
    weekly.push({
      id: "exfol", name: "Làm mới bề mặt rất nhẹ", how: "Chỉ một lần mỗi tuần để bắt đầu, vào buổi tối, rồi dưỡng ẩm kỹ. Dừng nếu da châm chích hoặc bong.",
      group: "Tẩy tế bào chết hoá học nồng độ thấp (AHA, BHA hoặc PHA)", minutes: 3, tier: "extra",
      caution: "Không dùng cùng đêm với các hoạt chất mạnh khác. Nên hỏi bác sĩ da liễu nếu bạn chưa chắc.",
    });
    learn.add("Tẩy tế bào chết hoá học nồng độ thấp");
  }

  // Ngân sách: đánh dấu bước nên ưu tiên
  if (budget === "low") {
    for (const s of [...am, ...pm]) if (s.tier === "extra") s.caution = s.caution ?? "Có thể bỏ nếu bạn muốn giữ chi phí gọn.";
  }
  const budgetNote =
    budget === "low"
      ? "Với ngân sách gọn, hãy dồn phần lớn cho kem chống nắng, sữa rửa mặt dịu và kem dưỡng ẩm. Các bước còn lại thêm dần khi cần."
      : budget === "mid"
        ? "Bạn có thể giữ ba bước nền chắc tay và thêm một tinh chất phù hợp với mối quan tâm chính, đổi từng thứ một."
        : "Có ngân sách rộng không có nghĩa là cần nhiều bước hơn. Hãy thêm từng sản phẩm và theo dõi cảm giác da trong ít nhất vài tuần.";

  careful.push("Nhóm retinoid và các acid nồng độ cao: nên hỏi bác sĩ da liễu trước khi dùng.");
  if (skin === "sensitive" || flagged) careful.push("Mùi hương mạnh và tinh dầu: có thể gây kích ứng ở da nhạy cảm.");
  careful.push("Không thêm nhiều sản phẩm mới cùng một lúc.");

  const mode: Routine["mode"] = safeMode ? "basic" : minutes === 15 ? "full" : "standard";
  const sum = (a: Step[]) => a.reduce((t, s) => t + s.minutes, 0);
  const doctor = flagged || skin === "sensitive" || i.concerns.includes("redness");
  return {
    mode, notices, am, pm, weekly,
    learn: Array.from(learn).slice(0, 4), careful,
    amMinutes: sum(am), pmMinutes: sum(pm), budgetNote, doctor,
  };
}

export function summarize(i: RoutineInput, r: Routine): string {
  const concerns = CONCERNS.filter((c) => i.concerns.includes(c.value)).map((c) => c.label.toLowerCase()).join("; ");
  const lines = [
    "Tóm tắt routine tham khảo từ NÉA Skin Studio",
    `Loại da tự mô tả: ${SKIN_LABEL[i.skin as Skin]}. Mối quan tâm: ${concerns}.`,
    `Thời gian mỗi lần: khoảng ${i.minutes} phút. Ngân sách: ${BUDGETS.find((b) => b.value === i.budget)?.hint ?? ""}.`,
    "",
    "BUỔI SÁNG",
    ...r.am.map((s, n) => `${n + 1}. ${s.name} (${s.group})`),
    "",
    "BUỔI TỐI",
    ...r.pm.map((s, n) => `${n + 1}. ${s.name} (${s.group})`),
  ];
  if (r.weekly.length) lines.push("", "MỖI TUẦN", ...r.weekly.map((s) => `- ${s.name}`));
  lines.push("", "Đây là gợi ý chung, không phải chẩn đoán hay đơn thuốc. Da nhạy cảm, đang điều trị hoặc có bệnh da nên hỏi bác sĩ da liễu.");
  return lines.join("\n");
}
