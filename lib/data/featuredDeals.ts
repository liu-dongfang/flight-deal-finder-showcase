import type { FeaturedDealRecord } from "@/lib/types";

export const featuredDeals: FeaturedDealRecord[] = [
  {
    dealId: "deal_sha_tyo",
    routeId: "sha_tyo",
    title: "上海飞东京",
    subtitle: "低价和规则差异最明显的一组票",
    fromPrice: 699,
    travelWindow: "2026-05-16 至 2026-05-19",
    highlightTags: ["周末出逃", "看懂行李"],
    targetQuery: {
      from: "上海",
      to: "东京",
      departDate: "2026-05-16",
      tripType: "one_way",
      passengers: 1,
      sort: "best_value"
    }
  },
  {
    dealId: "deal_sha_osa",
    routeId: "sha_osa",
    title: "上海飞大阪",
    subtitle: "预算党常见低价，适合对比最便宜和最划算",
    fromPrice: 599,
    travelWindow: "2026-05-15 至 2026-05-18",
    highlightTags: ["学生穷游", "轻装出行"],
    targetQuery: {
      from: "上海",
      to: "大阪",
      departDate: "2026-05-15",
      tripType: "one_way",
      passengers: 1,
      sort: "cheapest"
    }
  },
  {
    dealId: "deal_pek_sel",
    routeId: "pek_sel",
    title: "北京飞首尔",
    subtitle: "价格下探明显，但红眼和托运差异要看清",
    fromPrice: 499,
    travelWindow: "2026-05-16 至 2026-05-19",
    highlightTags: ["短途出境", "规则透明"],
    targetQuery: {
      from: "北京",
      to: "首尔",
      departDate: "2026-05-16",
      tripType: "one_way",
      passengers: 1,
      sort: "best_value"
    }
  },
  {
    dealId: "deal_can_bkk",
    routeId: "can_bkk",
    title: "广州飞曼谷",
    subtitle: "免签热度高，低价看着香，行李和时段更关键",
    fromPrice: 799,
    travelWindow: "2026-05-15 至 2026-05-19",
    highlightTags: ["免签海岛", "决策辅助"],
    targetQuery: {
      from: "广州",
      to: "曼谷",
      departDate: "2026-05-15",
      tripType: "one_way",
      passengers: 1,
      sort: "best_value"
    }
  },
  {
    dealId: "deal_ctu_hkg",
    routeId: "ctu_hkg",
    title: "成都飞香港",
    subtitle: "适合周末短线，规则友好的票更值得买",
    fromPrice: 449,
    travelWindow: "2026-05-16 至 2026-05-18",
    highlightTags: ["周末出逃", "规则友好"],
    targetQuery: {
      from: "成都",
      to: "香港",
      departDate: "2026-05-16",
      tripType: "one_way",
      passengers: 1,
      sort: "best_value"
    }
  },
  {
    dealId: "deal_ckg_mfm",
    routeId: "ckg_mfm",
    title: "重庆飞澳门",
    subtitle: "极致预算票很多，但不看托运容易踩坑",
    fromPrice: 399,
    travelWindow: "2026-05-15 至 2026-05-19",
    highlightTags: ["学生穷游", "总价透明"],
    targetQuery: {
      from: "重庆",
      to: "澳门",
      departDate: "2026-05-15",
      tripType: "one_way",
      passengers: 1,
      sort: "cheapest"
    }
  }
];
