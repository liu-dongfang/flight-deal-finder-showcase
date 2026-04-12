import type { FeaturedDealRecord } from "@/lib/types";

export const featuredDeals: FeaturedDealRecord[] = [
  {
    dealId: "deal_sha_tyo",
    routeId: "sha_tyo",
    title: "上海飞东京",
    subtitle: "最低价很香，但更划算方案更适合大多数人",
    fromPrice: 699,
    travelWindow: "2026-05-16 至 2026-05-19",
    highlightTags: ["周末出逃", "短途出境"],
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
    subtitle: "票面够低，但托运一加上去，未必还是最省的选项",
    fromPrice: 599,
    travelWindow: "2026-05-15 至 2026-05-18",
    highlightTags: ["学生穷游", "预算敏感"],
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
    subtitle: "预算友好，但托运和红眼差异要看清",
    fromPrice: 499,
    travelWindow: "2026-05-16 至 2026-05-19",
    highlightTags: ["周末出逃", "短途出境"],
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
    subtitle: "便宜窗口已出现，出发时段和行李更影响值不值",
    fromPrice: 799,
    travelWindow: "2026-05-15 至 2026-05-19",
    highlightTags: ["免签海岛", "小长假捡漏"],
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
    subtitle: "低价窗口短，规则更友好的票更适合周末走",
    fromPrice: 449,
    travelWindow: "2026-05-16 至 2026-05-18",
    highlightTags: ["周末出逃", "短线捡漏"],
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
    subtitle: "票面便宜，但不看托运很容易从捡漏变补票",
    fromPrice: 399,
    travelWindow: "2026-05-15 至 2026-05-19",
    highlightTags: ["学生穷游", "周末出逃"],
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
