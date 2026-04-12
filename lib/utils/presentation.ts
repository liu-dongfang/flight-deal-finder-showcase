import type { ChangePolicyLevel, FlightResult } from "../types.ts";
import { formatPrice } from "./date.ts";

export type StatusTone = "accent" | "positive" | "neutral" | "warning" | "risk";

export function getFlightLabelTone(label: string): StatusTone {
  if (label === "最便宜") {
    return "accent";
  }
  if (label === "更划算") {
    return "positive";
  }

  return "neutral";
}

export function getBaggageBadge(checkedBaggage: string): {
  label: string;
  tone: StatusTone;
} {
  if (checkedBaggage === "0kg") {
    return {
      label: "仅随身",
      tone: "warning"
    };
  }

  return {
    label: `托运 ${checkedBaggage}`,
    tone: "positive"
  };
}

export function getFlexibilityBadge(level: ChangePolicyLevel): {
  label: string;
  tone: StatusTone;
} {
  if (level === "flexible") {
    return {
      label: "退改较灵活",
      tone: "positive"
    };
  }

  if (level === "limited") {
    return {
      label: "退改受限",
      tone: "neutral"
    };
  }

  return {
    label: "退改严格",
    tone: "warning"
  };
}

export function getFlightDecisionHeadline(flight: FlightResult): string {
  if (flight.labels.includes("更划算")) {
    return "更划算";
  }

  if (flight.labels.includes("最便宜")) {
    return "最便宜";
  }

  if (
    flight.isSelfTransfer ||
    flight.isCrossTerminal ||
    (flight.stopCount > 0 && flight.transferMinutes < 90)
  ) {
    return "谨慎选择";
  }

  return "继续比较";
}

export function getDecisionBadgeTone(flight: FlightResult): StatusTone {
  const headline = getFlightDecisionHeadline(flight);

  if (headline === "最便宜") {
    return "warning";
  }
  if (headline === "谨慎选择") {
    return "risk";
  }
  if (headline === "更划算") {
    return "positive";
  }

  return "neutral";
}

export function getFlightQuickTake(flight: FlightResult): string {
  if (flight.aiReviewSeed === "value_best") {
    return `含 ${flight.checkedBaggage} 托运、${flight.stopCount === 0 ? "直飞" : "中转更可控"}、退改更友好，适合大多数人优先比较。`;
  }

  if (flight.aiReviewSeed === "cheap_real") {
    return `比更划算方案再便宜一些，且含 ${flight.checkedBaggage} 托运，适合轻装但不想选红眼的人。`;
  }

  if (flight.aiReviewSeed === "cheap_trap") {
    const costBits = [
      flight.checkedBaggage === "0kg" ? "不含托运" : "",
      flight.isRedEye ? "且是红眼" : "",
      flight.changePolicyLevel === "strict" ? "退改限制严格" : ""
    ].filter(Boolean);

    return `这是当前最低价，但${costBits.join("、")}，只适合极致预算用户。`;
  }

  if (
    flight.isSelfTransfer ||
    flight.isCrossTerminal ||
    (flight.stopCount > 0 && flight.transferMinutes < 90)
  ) {
    return "中转带来一定价格空间，但自助中转和衔接时间会提高不确定性。";
  }

  if (flight.stopCount > 0) {
    return "票面压力不高，但中转会增加整体耗时和行程不确定性。";
  }

  return "价格和规则都还能接受，可以放进最后一轮比较。";
}

export function getFlightBenefits(flight: FlightResult): string[] {
  const benefits: string[] = [];

  if (flight.checkedBaggage !== "0kg") {
    benefits.push(`含 ${flight.checkedBaggage} 托运，无需额外补行李`);
  } else {
    benefits.push(`随身行李 ${flight.carryOnBaggage}，适合轻装短途`);
  }

  if (flight.stopCount === 0) {
    benefits.push("直飞，不用处理中转和衔接");
  } else if (!flight.isSelfTransfer) {
    benefits.push(`中转 ${flight.transferMinutes} 分钟，流程相对可控`);
  }

  if (flight.changePolicyLevel === "flexible") {
    benefits.push("退改空间更大，行程变动更从容");
  } else if (flight.changePolicyLevel === "limited") {
    benefits.push("仍保留一定改期空间，不至于完全锁死");
  }

  if (!flight.isRedEye) {
    benefits.push("起飞和到达时段更友好，不用熬夜");
  }

  return benefits.slice(0, 3);
}

export function getFlightTradeoffs(flight: FlightResult): string[] {
  const tradeoffs: string[] = [];

  if (flight.priceGapFromCheapest > 0) {
    tradeoffs.push(`比当前最低价高 ${formatPrice(flight.priceGapFromCheapest)}`);
  }
  if (flight.checkedBaggage === "0kg") {
    tradeoffs.push("不含免费托运行李，补行李会抬高总成本");
  }
  if (flight.isRedEye) {
    tradeoffs.push("红眼时段更累，到达后的时间成本更高");
  }
  if (flight.changePolicyLevel === "strict") {
    tradeoffs.push("退改严格，临时变更损失更直接");
  } else if (flight.changePolicyLevel === "limited") {
    tradeoffs.push("退改仍有损失，不适合高不确定性行程");
  }
  if (flight.stopCount > 0) {
    tradeoffs.push("需要中转，整体耗时和衔接成本都会更高");
  }
  if (flight.isSelfTransfer) {
    tradeoffs.push("需要自助中转，转运行李和登机更靠自己处理");
  }
  if (flight.isCrossTerminal) {
    tradeoffs.push("中转涉及跨航站楼，缓冲时间需要更充足");
  }
  if (flight.stopCount > 0 && flight.transferMinutes < 90) {
    tradeoffs.push(`衔接只有 ${flight.transferMinutes} 分钟，误机风险更高`);
  }

  return tradeoffs
    .filter((item, index, array) => array.indexOf(item) === index)
    .slice(0, 4);
}

export function getFlightSuitableAudience(flight: FlightResult): string {
  if (flight.aiReviewSeed === "value_best") {
    return "适合带行李、重视稳妥、不想为最低价牺牲太多规则的人。";
  }

  if (flight.aiReviewSeed === "cheap_real") {
    return "适合周末短途、对退改要求不高、但希望规则别太差的用户。";
  }

  if (flight.aiReviewSeed === "cheap_trap") {
    return "适合轻装、能接受凌晨到达、且基本不考虑改签的人。";
  }

  if (flight.isSelfTransfer || flight.isCrossTerminal) {
    return "适合能接受中转、预算有限、且对转机流程有经验的用户。";
  }

  return "适合想先控制总价，同时还能接受部分规则妥协的人。";
}

export function getFlightUnsuitableAudience(flight: FlightResult): string {
  if (flight.aiReviewSeed === "value_best") {
    return "不适合只盯最低票面、愿意为更低价格接受红眼或零托运的人。";
  }

  if (flight.aiReviewSeed === "cheap_real") {
    return "不适合临时变动很多、或需要更宽松退改空间的人。";
  }

  if (flight.aiReviewSeed === "cheap_trap") {
    return "不适合带托运行李、怕熬夜、或需要后续改签空间的人。";
  }

  if (flight.isSelfTransfer || flight.isCrossTerminal) {
    return "不适合首次出境、带大件行李、或不想承担转机不确定性的人。";
  }

  return "不适合对行程稳定性和规则友好度要求很高的人。";
}

export function getFlightDecisionTags(flight: FlightResult, mode: "cheapest" | "best_value"): string[] {
  if (mode === "cheapest") {
    const tags = [
      flight.isRedEye ? "红眼" : "",
      flight.checkedBaggage === "0kg" ? "不含托运" : "",
      flight.changePolicyLevel === "strict" ? "退改严格" : "",
      flight.stopCount > 0 ? "中转" : "直飞"
    ].filter(Boolean);

    return tags.slice(0, 3);
  }

  const tags = [
    flight.checkedBaggage !== "0kg" ? `${flight.checkedBaggage} 托运` : "轻装优先",
    flight.changePolicyLevel === "flexible"
      ? "退改较灵活"
      : flight.changePolicyLevel === "limited"
        ? "退改受限"
        : "退改严格",
    flight.stopCount === 0 ? "直飞" : flight.isSelfTransfer ? "自助中转" : "中转"
  ];

  return tags.slice(0, 3);
}

export function getFlightRiskSummary(flight: FlightResult): string {
  const signals = getFlightTradeoffs(flight).filter((signal) => !signal.startsWith("比当前最低价高"));

  if (signals.length > 0) {
    return signals.slice(0, 3).join(" · ");
  }

  if (flight.priceGapFromCheapest > 0) {
    return `主要代价是比最低价高 ${formatPrice(flight.priceGapFromCheapest)}。`;
  }

  return "主要代价相对少，重点比较价格与起飞时段。";
}
