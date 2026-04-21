export type DealTone = "amber" | "olive" | "rust";
export type VerdictTone = "best" | "cheap" | "consider" | "avoid";
export type RuleTone = "good" | "warn" | "bad";

export interface FeaturedDeal {
  id: string;
  fromCity: string;
  fromAirport: string;
  toCity: string;
  toAirport: string;
  route: string;
  price: number;
  basePrice: number;
  drop: number;
  airline: string;
  airlineCode: string;
  dates: string;
  duration: string;
  tag: string;
  tagTone: DealTone;
  risk: string;
  fit: string;
  pitch: string;
  percentile: number;
  redEye?: boolean;
  oneStop?: boolean;
  baggageIncludedKg?: number;
}

export interface TrackerRoute {
  route: string;
  current: number;
  target: number;
  weeklyTrend: number;
  note: string;
}

export interface RailItem {
  fromCity: string;
  toCity: string;
  price: number;
  drop: number;
  tag?: string;
}

export interface MethodStep {
  title: string;
  body: string;
}

export interface PriceHistoryPoint {
  label: string;
  price: number;
}

export interface BreakdownItem {
  label: string;
  amount: number;
  note: string;
  optional?: boolean;
}

export interface RuleItem {
  title: string;
  tone: RuleTone;
  summary: string;
  detail: string;
}

export interface RouteResult {
  id: string;
  fromCity: string;
  fromAirport: string;
  toCity: string;
  toAirport: string;
  airline: string;
  code: string;
  depTime: string;
  arrTime: string;
  duration: string;
  stopsLabel: string;
  facePrice: number;
  realPrice: number;
  percentile: number;
  onTime: number;
  verdict: VerdictTone;
  shortReview: string;
  detailReview: string;
  tags: string[];
  includedBagKg: number;
  includesMeal: boolean;
  refundable: boolean;
  changeFee: number;
  redEye: boolean;
  direct: boolean;
  fitFor: string;
  notFitFor: string;
  breakdown: BreakdownItem[];
  rules: RuleItem[];
  history: PriceHistoryPoint[];
  bestRank: number;
}

export interface RouteResultsPack {
  featuredDeal: FeaturedDeal;
  results: RouteResult[];
}

export const featuredDeals: FeaturedDeal[] = [
  {
    id: "d1",
    fromCity: "上海",
    fromAirport: "PVG",
    toCity: "东京",
    toAirport: "NRT",
    route: "上海 → 东京",
    price: 980,
    basePrice: 1680,
    drop: 42,
    airline: "春秋航空",
    airlineCode: "9C",
    dates: "5月8日 - 5月12日",
    duration: "周中出发 · 4晚",
    tag: "编辑推荐",
    tagTone: "rust",
    risk: "廉航 · 不含行李",
    fit: "短假期说走就走的年轻人",
    pitch:
      "往返不到千元，比过去 90 天中位价低 42%。但行李和餐食都要另付，建议只带随身。",
    percentile: 6,
    baggageIncludedKg: 0
  },
  {
    id: "d2",
    fromCity: "北京",
    fromAirport: "PKX",
    toCity: "清迈",
    toAirport: "CNX",
    route: "北京 → 清迈",
    price: 1480,
    basePrice: 2650,
    drop: 44,
    airline: "泰国亚航",
    airlineCode: "FD",
    dates: "4月26日 - 5月3日",
    duration: "五一前出发 · 7晚",
    tag: "五一罕见价",
    tagTone: "rust",
    risk: "曼谷中转 5h20m",
    fit: "能接受长中转、想去清迈的人",
    pitch:
      "五一能出到 1480 往返东南亚非常少见。代价是曼谷要熬一个凌晨，适合行程弹性更高的人。",
    percentile: 11,
    oneStop: true
  },
  {
    id: "d3",
    fromCity: "广州",
    fromAirport: "CAN",
    toCity: "大阪",
    toAirport: "KIX",
    route: "广州 → 大阪",
    price: 1290,
    basePrice: 2080,
    drop: 38,
    airline: "中国南方航空",
    airlineCode: "CZ",
    dates: "5月14日 - 5月19日",
    duration: "含 20kg 行李",
    tag: "全服务航司",
    tagTone: "olive",
    risk: "红眼 01:45 起飞",
    fit: "想省钱又不想吃廉航苦的上班族",
    pitch:
      "全服务航司含餐食和 20kg 托运，只是起飞太早。适合愿意早点睡、落地直接进城的人。",
    percentile: 14,
    redEye: true,
    baggageIncludedKg: 20
  },
  {
    id: "d4",
    fromCity: "成都",
    fromAirport: "TFU",
    toCity: "新加坡",
    toAirport: "SIN",
    route: "成都 → 新加坡",
    price: 1760,
    basePrice: 2890,
    drop: 39,
    airline: "酷航",
    airlineCode: "TR",
    dates: "5月22日 - 5月28日",
    duration: "廉航 · 不含行李",
    tag: "周中便宜 30%",
    tagTone: "amber",
    risk: "改期每次 ¥420",
    fit: "行程确定不变的人",
    pitch:
      "比周末出发便宜约 500，适合能请年假的打工人。改签费高，别买来占位。",
    percentile: 18,
    baggageIncludedKg: 0
  },
  {
    id: "d5",
    fromCity: "杭州",
    fromAirport: "HGH",
    toCity: "首尔",
    toAirport: "ICN",
    route: "杭州 → 首尔",
    price: 860,
    basePrice: 1520,
    drop: 43,
    airline: "济州航空",
    airlineCode: "7C",
    dates: "6月3日 - 6月8日",
    duration: "周三出发 · 5晚",
    tag: "近三月新低",
    tagTone: "rust",
    risk: "廉航 · 座位偏窄",
    fit: "预算紧的学生党",
    pitch:
      "韩国线近三月最低价区间，适合签证已经办好、只想快进快出的旅行者。",
    percentile: 4,
    baggageIncludedKg: 0
  },
  {
    id: "d6",
    fromCity: "深圳",
    fromAirport: "SZX",
    toCity: "普吉",
    toAirport: "HKT",
    route: "深圳 → 普吉",
    price: 1380,
    basePrice: 2250,
    drop: 39,
    airline: "深圳航空",
    airlineCode: "ZH",
    dates: "5月17日 - 5月22日",
    duration: "含 20kg + 餐食",
    tag: "性价比之选",
    tagTone: "olive",
    risk: "回程落地 03:40",
    fit: "回来能请半天假休息的人",
    pitch:
      "直飞普吉的全服务航班里最便宜的一档，只是凌晨落地。周一上午别排会议。",
    percentile: 12,
    redEye: true,
    baggageIncludedKg: 20
  }
];

export const trackerRoutes: TrackerRoute[] = [
  {
    route: "上海 ⇄ 东京",
    current: 980,
    target: 900,
    weeklyTrend: -12,
    note: "今天已经刷新 90 天新低"
  },
  {
    route: "杭州 ⇄ 首尔",
    current: 860,
    target: 800,
    weeklyTrend: -8,
    note: "六月线还在慢慢往下掉"
  },
  {
    route: "北京 ⇄ 清迈",
    current: 1480,
    target: 1200,
    weeklyTrend: 4,
    note: "五一前 9 天，回涨风险偏高"
  }
];

export const weekendRails: RailItem[] = [
  { fromCity: "杭州", toCity: "首尔", price: 860, drop: 43, tag: "新低" },
  { fromCity: "上海", toCity: "东京", price: 980, drop: 42, tag: "编辑推荐" },
  { fromCity: "广州", toCity: "曼谷", price: 1180, drop: 36 },
  { fromCity: "上海", toCity: "香港", price: 580, drop: 28 },
  { fromCity: "深圳", toCity: "台北", price: 1020, drop: 33 }
];

export const holidayRails: RailItem[] = [
  { fromCity: "北京", toCity: "清迈", price: 1480, drop: 44, tag: "五一罕见价" },
  { fromCity: "昆明", toCity: "河内", price: 1260, drop: 41 },
  { fromCity: "成都", toCity: "岘港", price: 1520, drop: 37 },
  { fromCity: "广州", toCity: "槟城", price: 1680, drop: 32 },
  { fromCity: "上海", toCity: "巴厘岛", price: 2380, drop: 35 }
];

export const methodSteps: MethodStep[] = [
  {
    title: "先看价位，不只看“便宜”",
    body: "每张票都标近 90 天价格百分位，先判断这是不是市场里真的低位，而不是看上去便宜。"
  },
  {
    title: "再把真实成本摊开",
    body: "行李、选座、餐食、改签和时间代价都拆出来。票面价和到手价分开展示，不让航司替你藏。"
  },
  {
    title: "最后才给建议",
    body: "AI 推荐语只回答一件事：这张票适合谁，不适合谁，现在该不该买。"
  }
];

const tokyoResults: RouteResult[] = [
  {
    id: "r1",
    fromCity: "上海",
    fromAirport: "PVG T2",
    toCity: "东京",
    toAirport: "NRT T3",
    airline: "春秋航空",
    code: "9C8851",
    depTime: "06:20",
    arrTime: "10:05",
    duration: "2h45m",
    stopsLabel: "直飞",
    facePrice: 980,
    realPrice: 1270,
    percentile: 6,
    onTime: 82,
    verdict: "cheap",
    shortReview: "全网最低价；只带随身包、能接受廉航规则就拿。",
    detailReview:
      "如果只带随身包，真实成本仍然漂亮；一旦要托运行李或担心改期，这张票的优势会明显缩水。",
    tags: ["廉航", "不含行李", "近 90 天最低 6%"],
    includedBagKg: 0,
    includesMeal: false,
    refundable: false,
    changeFee: 520,
    redEye: false,
    direct: true,
    fitFor: "日期已定、只带背包、预算敏感的人",
    notFitFor: "需要托运行李、可能改期、带家人的出行",
    breakdown: [
      { label: "票面价格", amount: 980, note: "搜索直接展示的含税价" },
      { label: "随身行李", amount: 0, note: "7kg 以内免费" },
      { label: "托运 20kg", amount: 180, note: "官网提前购买", optional: true },
      { label: "机上餐食", amount: 50, note: "建议登机前先吃好", optional: true },
      { label: "选座", amount: 60, note: "靠窗或过道通常要另买", optional: true }
    ],
    rules: [
      {
        title: "退票",
        tone: "bad",
        summary: "退不了，只退机建燃油。",
        detail: "无论提前多久退，核心票款都不退。"
      },
      {
        title: "改签",
        tone: "warn",
        summary: "改一次约 ¥520，另补差价。",
        detail: "适合日期已经敲定的人，不适合占位。"
      },
      {
        title: "行李",
        tone: "warn",
        summary: "随身 7kg，多出来就按托运算。",
        detail: "机场临时补行李通常更贵，最好提前买。"
      },
      {
        title: "准点",
        tone: "good",
        summary: "近 90 天准点率 82%，不算差。",
        detail: "在廉航里属于可接受水平。"
      }
    ],
    history: [
      { label: "90天前", price: 1680 },
      { label: "75天前", price: 1520 },
      { label: "60天前", price: 1420 },
      { label: "45天前", price: 1380 },
      { label: "30天前", price: 1150 },
      { label: "15天前", price: 1080 },
      { label: "今天", price: 980 }
    ],
    bestRank: 2
  },
  {
    id: "r2",
    fromCity: "上海",
    fromAirport: "PVG T1",
    toCity: "东京",
    toAirport: "NRT T2",
    airline: "中国东方航空",
    code: "MU271",
    depTime: "08:50",
    arrTime: "12:40",
    duration: "2h50m",
    stopsLabel: "直飞",
    facePrice: 1580,
    realPrice: 1580,
    percentile: 22,
    onTime: 91,
    verdict: "best",
    shortReview: "贵 ¥600 但一切都包，还能免费改一次。",
    detailReview:
      "如果你在乎总体验和容错率，这是唯一一张几乎没有隐藏代价的选择。",
    tags: ["综合最划算", "含 23kg 托运", "可免费改一次"],
    includedBagKg: 23,
    includesMeal: true,
    refundable: true,
    changeFee: 0,
    redEye: false,
    direct: true,
    fitFor: "在乎省心、省时间、可能会临时改计划的人",
    notFitFor: "只想抄最低票面价的人",
    breakdown: [
      { label: "票面价格", amount: 1580, note: "价格即真实到手价" },
      { label: "23kg 托运", amount: 0, note: "已包含" },
      { label: "热餐", amount: 0, note: "已包含" },
      { label: "第一次改签", amount: 0, note: "起飞前 7 天内可免费改一次" }
    ],
    rules: [
      {
        title: "退改",
        tone: "good",
        summary: "有容错，不会一动就大出血。",
        detail: "第一次改签免费，整体规则对普通用户友好。"
      },
      {
        title: "行李",
        tone: "good",
        summary: "23kg 托运直接带走，不用计算额外成本。",
        detail: "买伴手礼或带摄影器材更轻松。"
      },
      {
        title: "准点",
        tone: "good",
        summary: "近 90 天准点率 91%。",
        detail: "东京线里属于表现很稳的一档。"
      }
    ],
    history: [
      { label: "90天前", price: 1960 },
      { label: "75天前", price: 1840 },
      { label: "60天前", price: 1760 },
      { label: "45天前", price: 1720 },
      { label: "30天前", price: 1680 },
      { label: "15天前", price: 1610 },
      { label: "今天", price: 1580 }
    ],
    bestRank: 1
  },
  {
    id: "r3",
    fromCity: "上海",
    fromAirport: "PVG T2",
    toCity: "东京",
    toAirport: "NRT T3",
    airline: "吉祥航空",
    code: "HO1335",
    depTime: "13:25",
    arrTime: "17:20",
    duration: "2h55m",
    stopsLabel: "直飞",
    facePrice: 1180,
    realPrice: 1340,
    percentile: 14,
    onTime: 88,
    verdict: "consider",
    shortReview: "日期已敲定的人可以拿，价格和体验比较平。",
    detailReview:
      "比东航便宜 400，但规则明显更硬。适合行程基本不会变化的用户。",
    tags: ["含 20kg 行李", "不可退票", "改签 ¥400/次"],
    includedBagKg: 20,
    includesMeal: true,
    refundable: false,
    changeFee: 400,
    redEye: false,
    direct: true,
    fitFor: "想省一点，但不想吃廉航苦的人",
    notFitFor: "需要更多退改弹性的人",
    breakdown: [
      { label: "票面价格", amount: 1180, note: "基础含税价" },
      { label: "20kg 托运", amount: 0, note: "已包含" },
      { label: "简餐", amount: 0, note: "已包含" },
      { label: "改签风险缓冲", amount: 160, note: "一次改签的潜在代价", optional: true }
    ],
    rules: [
      {
        title: "退票",
        tone: "bad",
        summary: "不能退。",
        detail: "行程不稳的话别选它。"
      },
      {
        title: "改签",
        tone: "warn",
        summary: "改一次 ¥400，再补差价。",
        detail: "价格不错，但弹性一般。"
      }
    ],
    history: [
      { label: "90天前", price: 1580 },
      { label: "75天前", price: 1460 },
      { label: "60天前", price: 1390 },
      { label: "45天前", price: 1340 },
      { label: "30天前", price: 1290 },
      { label: "15天前", price: 1260 },
      { label: "今天", price: 1180 }
    ],
    bestRank: 3
  },
  {
    id: "r4",
    fromCity: "上海",
    fromAirport: "PVG T2",
    toCity: "东京",
    toAirport: "NRT T2",
    airline: "亚洲航空 × 日本航空",
    code: "D7 806 + JL 097",
    depTime: "23:55",
    arrTime: "次日 14:30",
    duration: "14h35m",
    stopsLabel: "吉隆坡中转 6h10m",
    facePrice: 820,
    realPrice: 1210,
    percentile: 3,
    onTime: 74,
    verdict: "avoid",
    shortReview: "最便宜，但你省下的钱要用时间和风险来补。",
    detailReview:
      "红眼、分离机票、长中转同时叠在一起，适合极少数只认最低价的人。",
    tags: ["分离机票", "红眼", "中转 6h10m"],
    includedBagKg: 0,
    includesMeal: false,
    refundable: false,
    changeFee: 600,
    redEye: true,
    direct: false,
    fitFor: "极端预算优先、愿意自己扛风险的人",
    notFitFor: "绝大多数普通出行者",
    breakdown: [
      { label: "票面价格", amount: 820, note: "看起来是全场最低" },
      { label: "托运 20kg", amount: 240, note: "两段都得自己算", optional: true },
      { label: "餐食", amount: 60, note: "长中转基本逃不掉", optional: true },
      { label: "误点风险缓冲", amount: 90, note: "分离机票建议自己留预算", optional: true }
    ],
    rules: [
      {
        title: "分离机票",
        tone: "bad",
        summary: "前段误点，后段不等你。",
        detail: "任何一段出问题都要自己承担后果。"
      },
      {
        title: "中转",
        tone: "warn",
        summary: "吉隆坡中转 6 小时，还要重新托运。",
        detail: "更适合对行程磨损不敏感的人。"
      }
    ],
    history: [
      { label: "90天前", price: 1450 },
      { label: "75天前", price: 1310 },
      { label: "60天前", price: 1180 },
      { label: "45天前", price: 1090 },
      { label: "30天前", price: 980 },
      { label: "15天前", price: 880 },
      { label: "今天", price: 820 }
    ],
    bestRank: 6
  },
  {
    id: "r5",
    fromCity: "上海",
    fromAirport: "PVG T2",
    toCity: "东京",
    toAirport: "HND T3",
    airline: "全日空",
    code: "NH920",
    depTime: "10:15",
    arrTime: "14:10",
    duration: "2h55m",
    stopsLabel: "直飞",
    facePrice: 2180,
    realPrice: 2180,
    percentile: 48,
    onTime: 95,
    verdict: "consider",
    shortReview: "落羽田，市区省下来的时间值不值，要看你的时薪。",
    detailReview:
      "它不是价格型选择，但如果你落地后要直奔市区办事，羽田会省掉很多折腾。",
    tags: ["羽田落地", "全服务", "准点率高"],
    includedBagKg: 23,
    includesMeal: true,
    refundable: true,
    changeFee: 0,
    redEye: false,
    direct: true,
    fitFor: "时间比票价更贵的人",
    notFitFor: "只在意预算的人",
    breakdown: [
      { label: "票面价格", amount: 2180, note: "全服务价" },
      { label: "23kg 托运", amount: 0, note: "已包含" },
      { label: "餐食", amount: 0, note: "已包含" }
    ],
    rules: [
      {
        title: "机场",
        tone: "good",
        summary: "羽田落地，进市区更快。",
        detail: "比成田平均省 60 到 90 分钟。"
      }
    ],
    history: [
      { label: "90天前", price: 2280 },
      { label: "75天前", price: 2250 },
      { label: "60天前", price: 2220 },
      { label: "45天前", price: 2200 },
      { label: "30天前", price: 2190 },
      { label: "15天前", price: 2180 },
      { label: "今天", price: 2180 }
    ],
    bestRank: 5
  },
  {
    id: "r6",
    fromCity: "上海",
    fromAirport: "PVG T2",
    toCity: "东京",
    toAirport: "NRT T3",
    airline: "中国国际航空",
    code: "CA929",
    depTime: "16:40",
    arrTime: "20:35",
    duration: "2h55m",
    stopsLabel: "直飞",
    facePrice: 1820,
    realPrice: 1820,
    percentile: 38,
    onTime: 89,
    verdict: "consider",
    shortReview: "常规选择，时间舒服，但没有明显捡漏感。",
    detailReview:
      "适合要发票、要稳定、不想多想的人。谈不上便宜，但很省心。",
    tags: ["全服务", "白天出发", "报销友好"],
    includedBagKg: 23,
    includesMeal: true,
    refundable: true,
    changeFee: 300,
    redEye: false,
    direct: true,
    fitFor: "重视稳定和报销需求的商务出行",
    notFitFor: "冲最低价的人",
    breakdown: [
      { label: "票面价格", amount: 1820, note: "即真实到手价" },
      { label: "23kg 托运", amount: 0, note: "已包含" },
      { label: "餐食", amount: 0, note: "已包含" }
    ],
    rules: [
      {
        title: "退改",
        tone: "good",
        summary: "规则中规中矩，容错比廉航高很多。",
        detail: "适合不想研究细则的人。"
      }
    ],
    history: [
      { label: "90天前", price: 1990 },
      { label: "75天前", price: 1930 },
      { label: "60天前", price: 1900 },
      { label: "45天前", price: 1860 },
      { label: "30天前", price: 1840 },
      { label: "15天前", price: 1820 },
      { label: "今天", price: 1820 }
    ],
    bestRank: 4
  }
];

function routeKey(fromCity: string, toCity: string) {
  return `${fromCity}-${toCity}`;
}

function buildHistory(basePrice: number, facePrice: number): PriceHistoryPoint[] {
  return [
    { label: "90天前", price: basePrice },
    { label: "75天前", price: Math.round(basePrice * 0.93) },
    { label: "60天前", price: Math.round(basePrice * 0.88) },
    { label: "45天前", price: Math.round(basePrice * 0.84) },
    { label: "30天前", price: Math.round(basePrice * 0.79) },
    { label: "15天前", price: Math.round((basePrice + facePrice) / 2) },
    { label: "今天", price: facePrice }
  ];
}

function buildBreakdown(facePrice: number, bagFee: number, mealFee: number, seatFee: number) {
  return [
    { label: "票面价格", amount: facePrice, note: "搜索展示的含税价" },
    { label: "随身行李", amount: 0, note: "基础随身额度" },
    { label: "托运行李", amount: bagFee, note: bagFee ? "提前买更便宜" : "已包含", optional: bagFee > 0 },
    { label: "餐食", amount: mealFee, note: mealFee ? "机上另买或登机前解决" : "已包含", optional: mealFee > 0 },
    { label: "选座", amount: seatFee, note: seatFee ? "靠窗/过道通常要另买" : "系统可免费分配", optional: seatFee > 0 }
  ];
}

function buildRules({
  includedBagKg,
  includesMeal,
  changeFee,
  refundable,
  redEye,
  direct
}: Pick<
  RouteResult,
  "changeFee" | "direct" | "includesMeal" | "includedBagKg" | "redEye" | "refundable"
>): RuleItem[] {
  return [
    {
      title: "行李",
      tone: includedBagKg > 0 ? "good" : "warn",
      summary: includedBagKg > 0 ? `已含 ${includedBagKg}kg 托运。` : "只含基础随身额度。",
      detail: includedBagKg > 0 ? "带回礼物或器材时更省心。" : "一旦要托运，真实成本会明显上升。"
    },
    {
      title: "餐食",
      tone: includesMeal ? "good" : "warn",
      summary: includesMeal ? "餐食已含。" : "机上餐食需要自付。",
      detail: includesMeal ? "长航程或跨饭点更舒服。" : "短途问题不大，长途会更折腾。"
    },
    {
      title: "退改",
      tone: refundable || changeFee === 0 ? "good" : changeFee <= 300 ? "warn" : "bad",
      summary:
        refundable || changeFee === 0
          ? "退改规则相对友好。"
          : changeFee <= 300
            ? `改签约 ¥${changeFee}。`
            : `改签成本高，约 ¥${changeFee}。`,
      detail:
        refundable || changeFee === 0
          ? "行程有变时容错更高。"
          : "如果日期还没完全敲定，别把它当占位票。"
    },
    {
      title: "时段",
      tone: redEye ? "warn" : "good",
      summary: redEye ? "涉及红眼或凌晨落地。" : "起飞时段相对友好。",
      detail: redEye ? "便宜往往是因为你在睡眠上付了钱。" : "更适合普通休闲或商务出行。"
    },
    {
      title: "航程",
      tone: direct ? "good" : "warn",
      summary: direct ? "直飞，不用额外折腾。" : "中转会拉高实际磨损。",
      detail: direct ? "时间和不确定性都更可控。" : "如果还是分离机票，风险会再上一层。"
    }
  ];
}

function buildGeneratedResults(deal: FeaturedDeal): RouteResult[] {
  const face = deal.price;
  const bagBase = deal.baggageIncludedKg ? 0 : 180;
  const mealBase = deal.tagTone === "olive" ? 0 : 50;
  const bestFace = face + (deal.tagTone === "olive" ? 160 : 420);
  const balancedFace = face + 230;
  const comfortFace = face + 560;

  return [
    {
      id: `${deal.id}-cheap`,
      fromCity: deal.fromCity,
      fromAirport: `${deal.fromAirport} T1`,
      toCity: deal.toCity,
      toAirport: `${deal.toAirport} T2`,
      airline: deal.airline,
      code: `${deal.airlineCode}${deal.id.slice(-1)}821`,
      depTime: deal.redEye ? "23:50" : "06:35",
      arrTime: deal.redEye ? "次日 05:45" : "10:20",
      duration: deal.oneStop ? "8h35m" : "3h15m",
      stopsLabel: deal.oneStop ? "1 次中转" : "直飞",
      facePrice: face,
      realPrice: face + bagBase + mealBase + 60,
      percentile: deal.percentile,
      onTime: deal.redEye ? 78 : 84,
      verdict: deal.oneStop || deal.redEye ? "cheap" : "cheap",
      shortReview: "票面价最抓眼，但要把附加费用和时间代价一起算。",
      detailReview:
        "如果你只认最低票面价，它很诱人；但多数人真正买单时，代价会比看上去高一截。",
      tags: [deal.risk, "票面最低价"],
      includedBagKg: deal.baggageIncludedKg ?? 0,
      includesMeal: deal.tagTone === "olive",
      refundable: false,
      changeFee: deal.tagTone === "amber" ? 420 : 520,
      redEye: Boolean(deal.redEye),
      direct: !deal.oneStop,
      fitFor: `只想把预算压到最低，且能接受 ${deal.risk} 的人`,
      notFitFor: "想省心、想要更稳定体验的人",
      breakdown: buildBreakdown(face, bagBase, mealBase, 60),
      rules: buildRules({
        includedBagKg: deal.baggageIncludedKg ?? 0,
        includesMeal: deal.tagTone === "olive",
        changeFee: deal.tagTone === "amber" ? 420 : 520,
        refundable: false,
        redEye: Boolean(deal.redEye),
        direct: !deal.oneStop
      }),
      history: buildHistory(deal.basePrice, face),
      bestRank: 3
    },
    {
      id: `${deal.id}-best`,
      fromCity: deal.fromCity,
      fromAirport: `${deal.fromAirport} T2`,
      toCity: deal.toCity,
      toAirport: `${deal.toAirport} T1`,
      airline: deal.tagTone === "olive" ? deal.airline : "中国东方航空",
      code: `${deal.tagTone === "olive" ? deal.airlineCode : "MU"}271`,
      depTime: "09:10",
      arrTime: "13:05",
      duration: deal.oneStop ? "5h25m" : "3h05m",
      stopsLabel: deal.oneStop ? "短中转 1 次" : "直飞",
      facePrice: bestFace,
      realPrice: bestFace,
      percentile: Math.max(18, deal.percentile + 10),
      onTime: 91,
      verdict: "best",
      shortReview: "贵一点，但该有的都包进去了，最省心。",
      detailReview:
        "它未必是列表里最便宜的，但通常是最不容易买完后再后悔的那一张。",
      tags: ["综合最划算", "真实到手价稳定", "退改更友好"],
      includedBagKg: deal.baggageIncludedKg ?? 20,
      includesMeal: true,
      refundable: true,
      changeFee: 0,
      redEye: false,
      direct: true,
      fitFor: "在乎总体验、可能会带行李、计划仍有变数的人",
      notFitFor: "只想冲最低票面价的人",
      breakdown: buildBreakdown(bestFace, 0, 0, 0),
      rules: buildRules({
        includedBagKg: deal.baggageIncludedKg ?? 20,
        includesMeal: true,
        changeFee: 0,
        refundable: true,
        redEye: false,
        direct: true
      }),
      history: buildHistory(Math.round(bestFace * 1.22), bestFace),
      bestRank: 1
    },
    {
      id: `${deal.id}-balanced`,
      fromCity: deal.fromCity,
      fromAirport: `${deal.fromAirport} T1`,
      toCity: deal.toCity,
      toAirport: `${deal.toAirport} T1`,
      airline: "吉祥航空",
      code: "HO1335",
      depTime: "13:25",
      arrTime: "17:20",
      duration: deal.oneStop ? "6h05m" : "3h20m",
      stopsLabel: deal.oneStop ? "1 次中转" : "直飞",
      facePrice: balancedFace,
      realPrice: balancedFace + (deal.tagTone === "olive" ? 0 : 120),
      percentile: Math.max(14, deal.percentile + 6),
      onTime: 87,
      verdict: "consider",
      shortReview: "中间档，没明显惊喜，但也不太会踩坑。",
      detailReview:
        "适合那些不想吃最便宜的苦、也不想为省心多掏太多钱的人。",
      tags: ["平衡选择", "规则中等", "适合已定日期"],
      includedBagKg: 20,
      includesMeal: true,
      refundable: false,
      changeFee: 300,
      redEye: false,
      direct: !deal.oneStop,
      fitFor: "想少花一点，又不想完全押廉航的人",
      notFitFor: "要最高容错率的人",
      breakdown: buildBreakdown(balancedFace, 0, 0, 0),
      rules: buildRules({
        includedBagKg: 20,
        includesMeal: true,
        changeFee: 300,
        refundable: false,
        redEye: false,
        direct: !deal.oneStop
      }),
      history: buildHistory(Math.round(balancedFace * 1.18), balancedFace),
      bestRank: 2
    },
    {
      id: `${deal.id}-comfort`,
      fromCity: deal.fromCity,
      fromAirport: `${deal.fromAirport} T2`,
      toCity: deal.toCity,
      toAirport: `${deal.toAirport} T3`,
      airline: "中国国际航空",
      code: "CA929",
      depTime: "16:40",
      arrTime: "20:35",
      duration: deal.oneStop ? "5h40m" : "3h30m",
      stopsLabel: deal.oneStop ? "短中转 1 次" : "直飞",
      facePrice: comfortFace,
      realPrice: comfortFace,
      percentile: Math.max(35, deal.percentile + 22),
      onTime: 92,
      verdict: "consider",
      shortReview: "时间舒服、规则稳，但不再是捡漏逻辑。",
      detailReview:
        "如果这趟更像工作或带家人出行，它能换来稳定；如果只是想捡便宜，就没必要。",
      tags: ["全服务", "白天出发", "适合商务"],
      includedBagKg: 23,
      includesMeal: true,
      refundable: true,
      changeFee: 0,
      redEye: false,
      direct: true,
      fitFor: "带家人、要报销、时间比票价更贵的人",
      notFitFor: "单纯想追最低价的人",
      breakdown: buildBreakdown(comfortFace, 0, 0, 0),
      rules: buildRules({
        includedBagKg: 23,
        includesMeal: true,
        changeFee: 0,
        refundable: true,
        redEye: false,
        direct: true
      }),
      history: buildHistory(Math.round(comfortFace * 1.08), comfortFace),
      bestRank: 4
    }
  ];
}

const customRoutePacks: Record<string, RouteResultsPack> = {
  [routeKey("上海", "东京")]: {
    featuredDeal: featuredDeals[0],
    results: tokyoResults
  }
};

export function getFeaturedDeal(fromCity: string, toCity: string) {
  return featuredDeals.find((deal) => deal.fromCity === fromCity && deal.toCity === toCity) ?? featuredDeals[0];
}

export function getRouteResultsPack(fromCity: string, toCity: string): RouteResultsPack {
  const key = routeKey(fromCity, toCity);
  const custom = customRoutePacks[key];

  if (custom) {
    return custom;
  }

  const deal = getFeaturedDeal(fromCity, toCity);

  return {
    featuredDeal: deal,
    results: buildGeneratedResults(deal)
  };
}
