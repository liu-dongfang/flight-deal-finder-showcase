import type { SearchQuery } from "./types.ts";

export const PRODUCT_NAME = "捡漏机票";
export const HOME_HEADLINE = "帮你找到真正值得买的特价机票";
export const HOME_TAGLINE = "先看低价，再看代价";
export const HOME_DESCRIPTION = "先看低价，再看代价；再决定现在买不买。";

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
