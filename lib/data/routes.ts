import type { RouteRecord } from "@/lib/types";

export const routes: RouteRecord[] = [
  {
    routeId: "sha_tyo",
    originCity: "上海",
    originAirportCode: "PVG",
    originAirportName: "浦东国际机场",
    destinationCity: "东京",
    destinationAirportCode: "NRT",
    destinationAirportName: "成田国际机场",
    tripType: "one_way",
    sceneTags: ["weekend", "holiday"],
    typicalPriceRange: "¥699 - ¥1,139",
    heroLabel: "签证和规则门槛清晰，适合做低价发现主航线"
  },
  {
    routeId: "sha_osa",
    originCity: "上海",
    originAirportCode: "PVG",
    originAirportName: "浦东国际机场",
    destinationCity: "大阪",
    destinationAirportCode: "KIX",
    destinationAirportName: "关西国际机场",
    tripType: "one_way",
    sceneTags: ["weekend", "budget"],
    typicalPriceRange: "¥599 - ¥1,019",
    heroLabel: "周末短途和学生预算都容易理解"
  },
  {
    routeId: "pek_sel",
    originCity: "北京",
    originAirportCode: "PEK",
    originAirportName: "首都国际机场",
    destinationCity: "首尔",
    destinationAirportCode: "ICN",
    destinationAirportName: "仁川国际机场",
    tripType: "one_way",
    sceneTags: ["budget", "weekend"],
    typicalPriceRange: "¥499 - ¥919",
    heroLabel: "价格敏感度高，低价与体验差异明显"
  },
  {
    routeId: "can_bkk",
    originCity: "广州",
    originAirportCode: "CAN",
    originAirportName: "白云国际机场",
    destinationCity: "曼谷",
    destinationAirportCode: "BKK",
    destinationAirportName: "素万那普机场",
    tripType: "one_way",
    sceneTags: ["visa_free", "holiday"],
    typicalPriceRange: "¥799 - ¥1,259",
    heroLabel: "免签热点，高性价比诉求强"
  },
  {
    routeId: "szx_sin",
    originCity: "深圳",
    originAirportCode: "SZX",
    originAirportName: "宝安国际机场",
    destinationCity: "新加坡",
    destinationAirportCode: "SIN",
    destinationAirportName: "樟宜机场",
    tripType: "one_way",
    sceneTags: ["holiday", "comfort"],
    typicalPriceRange: "¥999 - ¥1,399",
    heroLabel: "适合展示直飞与中转的综合取舍"
  },
  {
    routeId: "ctu_hkg",
    originCity: "成都",
    originAirportCode: "TFU",
    originAirportName: "天府国际机场",
    destinationCity: "香港",
    destinationAirportCode: "HKG",
    destinationAirportName: "香港国际机场",
    tripType: "one_way",
    sceneTags: ["weekend", "budget"],
    typicalPriceRange: "¥449 - ¥889",
    heroLabel: "短途高频场景，适合周末出逃"
  },
  {
    routeId: "hgh_kul",
    originCity: "杭州",
    originAirportCode: "HGH",
    originAirportName: "萧山国际机场",
    destinationCity: "吉隆坡",
    destinationAirportCode: "KUL",
    destinationAirportName: "吉隆坡国际机场",
    tripType: "one_way",
    sceneTags: ["visa_free", "holiday"],
    typicalPriceRange: "¥899 - ¥1,319",
    heroLabel: "适合展示价格日历的机会感"
  },
  {
    routeId: "ckg_mfm",
    originCity: "重庆",
    originAirportCode: "CKG",
    originAirportName: "江北国际机场",
    destinationCity: "澳门",
    destinationAirportCode: "MFM",
    destinationAirportName: "澳门国际机场",
    tripType: "one_way",
    sceneTags: ["budget", "weekend"],
    typicalPriceRange: "¥399 - ¥789",
    heroLabel: "极致预算用户最容易理解的低价场景"
  }
];
