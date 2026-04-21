import type { SearchQuery } from "./types.ts";

export const PRODUCT_NAME = "低飞 LOWFLY";
export const HOME_HEADLINE = "替你看清真便宜，替你避开假特价";
export const HOME_TAGLINE = "发现值得买的票，不只看票面价";
export const HOME_DESCRIPTION = "把票面价、真实成本和隐藏规则一起讲清楚的特价机票发现平台。";

export const DEFAULT_QUERY: SearchQuery = {
  from: "上海",
  to: "东京",
  departDate: "2026-05-16",
  returnDate: "",
  tripType: "one_way",
  passengers: 1,
  sort: "best_value",
  scene: "weekend_escape",
  time: "any",
  stops: "any",
  baggage: "any",
  flexibility: "any",
  hideRisk: false
};

export const CALENDAR_WINDOW_START = "2026-05-13";
export const CALENDAR_WINDOW_END = "2026-05-19";
