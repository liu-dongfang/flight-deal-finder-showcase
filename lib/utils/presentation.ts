import type { ChangePolicyLevel, FlightResult } from "../types.ts";

export type StatusTone = "accent" | "positive" | "neutral" | "warning" | "risk";

export function getFlightLabelTone(label: string): StatusTone {
  if (label === "最低价") {
    return "accent";
  }
  if (label === "性价比优选" || label === "规则友好") {
    return "positive";
  }
  if (label === "托运缺失" || label === "红眼慎选") {
    return "warning";
  }
  if (label === "中转风险") {
    return "risk";
  }

  return "neutral";
}

export function getBaggageBadge(checkedBaggage: string): {
  label: string;
  tone: StatusTone;
} {
  if (checkedBaggage === "0kg") {
    return {
      label: "仅随身行李",
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
      label: "退改有限制",
      tone: "neutral"
    };
  }

  return {
    label: "退改限制严格",
    tone: "warning"
  };
}

export function getFlightDecisionHeadline(flight: FlightResult): string {
  if (flight.labels.includes("性价比优选")) {
    return "值得优先比较";
  }

  if (
    flight.labels.includes("最低价") &&
    (flight.labels.includes("托运缺失") ||
      flight.labels.includes("红眼慎选") ||
      flight.labels.includes("中转风险"))
  ) {
    return "价格低，但代价明显";
  }

  if (flight.labels.includes("规则友好")) {
    return "规则更稳，可以继续看";
  }

  return "适合放进对比列表";
}

export function getFlightRiskSummary(flight: FlightResult): string {
  const signals: string[] = [];

  if (flight.checkedBaggage === "0kg") {
    signals.push("不含托运");
  }
  if (flight.isRedEye) {
    signals.push("红眼时段");
  }
  if (flight.isSelfTransfer) {
    signals.push("需要自助中转");
  }
  if (flight.isCrossTerminal) {
    signals.push("存在跨航站楼");
  }
  if (flight.stopCount > 0 && flight.transferMinutes < 90) {
    signals.push(`衔接仅 ${flight.transferMinutes} 分钟`);
  }
  if (flight.changePolicyLevel === "strict") {
    signals.push("退改限制严格");
  }

  return signals.length > 0
    ? signals.slice(0, 3).join(" · ")
    : "主要规则相对清晰，额外成本压力较低。";
}

export function getFareHint(flight: FlightResult): string {
  if (flight.checkedBaggage === "0kg") {
    return `这张票的低价更多来自轻装出行，${flight.checkedBaggageFeeHint}。`;
  }

  return `总价已包含 ${flight.checkedBaggage} 托运，更接近真实出行成本。`;
}

export function getFlexibilityHint(flight: FlightResult): string {
  if (flight.changePolicyLevel === "flexible") {
    return "变更成本相对可控，适合还在比较日期和时段的用户。";
  }

  if (flight.changePolicyLevel === "limited") {
    return "可以改动，但退改损失已经开始变明显。";
  }

  return "价格虽低，但行程一旦变化，损失会更直接。";
}

export function getTransferHint(flight: FlightResult): string {
  if (flight.stopCount === 0) {
    return "直飞，无额外中转成本，时间判断最直接。";
  }

  const pieces = [`中转 ${flight.transferMinutes} 分钟`];

  if (flight.isSelfTransfer) {
    pieces.push("需要自行处理转运行李");
  }
  if (flight.isCrossTerminal) {
    pieces.push("需要跨航站楼移动");
  }

  return `${pieces.join("，")}。`;
}
