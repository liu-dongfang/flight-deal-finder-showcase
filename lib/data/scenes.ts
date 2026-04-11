import type { SceneRecord } from "@/lib/types";

export const scenes: SceneRecord[] = [
  {
    sceneId: "weekend_escape",
    title: "周末出逃",
    subtitle: "先看低价，再看代价，周五下班就能走。",
    presetQuery: {
      from: "上海",
      to: "东京",
      departDate: "2026-05-16",
      tripType: "one_way",
      passengers: 1,
      sort: "best_value",
      scene: "weekend_escape"
    },
    routeIds: ["sha_tyo", "ctu_hkg", "ckg_mfm"],
    coverStyleToken: "sunrise"
  },
  {
    sceneId: "student_budget",
    title: "学生穷游",
    subtitle: "先把裸价和托运行李分清，再决定要不要多花一点。",
    presetQuery: {
      from: "上海",
      to: "大阪",
      departDate: "2026-05-15",
      tripType: "one_way",
      passengers: 1,
      sort: "cheapest",
      scene: "student_budget"
    },
    routeIds: ["sha_osa", "pek_sel", "ckg_mfm"],
    coverStyleToken: "mint"
  },
  {
    sceneId: "visa_free_island",
    title: "免签海岛",
    subtitle: "找轻松出境的低价窗口，优先看总成本和中转风险。",
    presetQuery: {
      from: "广州",
      to: "曼谷",
      departDate: "2026-05-15",
      tripType: "one_way",
      passengers: 1,
      sort: "best_value",
      scene: "visa_free_island"
    },
    routeIds: ["can_bkk", "hgh_kul", "szx_sin"],
    coverStyleToken: "sea"
  },
  {
    sceneId: "holiday_leak",
    title: "小长假捡漏",
    subtitle: "把日期拉近 7 天窗口，看看哪一天的总价更值得下手。",
    presetQuery: {
      from: "深圳",
      to: "新加坡",
      departDate: "2026-05-16",
      tripType: "one_way",
      passengers: 1,
      sort: "best_value",
      scene: "holiday_leak"
    },
    routeIds: ["szx_sin", "sha_tyo", "can_bkk"],
    coverStyleToken: "sunset"
  }
];
