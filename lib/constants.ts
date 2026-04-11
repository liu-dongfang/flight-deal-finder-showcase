import type { SearchQuery } from "./types.ts";

export const PRODUCT_NAME = "捡漏机票";
export const HOME_HEADLINE = "帮你发现真正值得买的特价机票";
export const HOME_TAGLINE = "看见低价，也看懂代价";
export const HOME_DESCRIPTION = "总价透明、规则清晰、帮你判断值不值得买";

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
