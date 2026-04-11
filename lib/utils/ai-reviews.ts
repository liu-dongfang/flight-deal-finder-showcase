import type { AiReview, FlightResult } from "../types.ts";
import { formatPrice } from "./date.ts";

function getAudience(flight: FlightResult): string {
  if (flight.aiReviewSeed === "cheap_trap") {
    return "极致预算且轻装出行的用户";
  }

  if (flight.aiReviewSeed === "value_best") {
    return "首次出境或更看重稳定性的用户";
  }

  if (flight.stopCount > 0) {
    return "能接受中转换取一定价格优势的用户";
  }

  return "周末短途和轻装出行用户";
}

function getMildLimit(flight: FlightResult): string {
  if (flight.changePolicyLevel === "limited") {
    return "退改成本略高";
  }

  if (flight.stopCount > 0) {
    return "需要预留中转时间";
  }

  return "需要留意税费之外的行前规则";
}

function getRiskSlots(flight: FlightResult): [string, string] {
  const risks: string[] = [];

  if (flight.isRedEye) {
    risks.push("红眼时段");
  }
  if (flight.checkedBaggage === "0kg") {
    risks.push("不含托运");
  }
  if (flight.isSelfTransfer) {
    risks.push("自助中转");
  }
  if (flight.isCrossTerminal) {
    risks.push("跨航站楼");
  }
  if (flight.stopCount > 0 && flight.transferMinutes < 90) {
    risks.push("衔接时间偏短");
  }
  if (flight.changePolicyLevel === "strict") {
    risks.push("退改限制严格");
  }

  return [risks[0] ?? "规则限制偏多", risks[1] ?? "额外成本不够友好"];
}

export function generateAiReview(flight: FlightResult): AiReview {
  const audience = getAudience(flight);
  const priceGap = formatPrice(flight.priceGapFromCheapest);
  const [riskOne, riskTwo] = getRiskSlots(flight);
  const checkedInfo = flight.checkedBaggage === "0kg" ? "仅含随身行李" : `含 ${flight.checkedBaggage} 托运`;
  const corePair =
    flight.stopCount === 0
      ? `${checkedInfo}、直飞`
      : `${checkedInfo}、中转规则更清晰`;

  switch (flight.aiReviewSeed) {
    case "cheap_real":
      return {
        short: `价格低于同页多数选项，且${checkedInfo}，适合${audience}。${getMildLimit(flight)}。`,
        detail: `这是低价里更稳的一档。它便宜在含税总价压得足够低，同时保留了${checkedInfo}；需要注意${getMildLimit(flight)}。`
      };
    case "cheap_trap":
      return {
        short: `总价最低，但${riskOne}、${riskTwo}，只适合${audience}。`,
        detail: `这是预算优先但代价明显的一档。便宜点在总价压到当前最低；代价是${riskOne}、${riskTwo}。如需更稳定的出行体验，不建议优先选。`
      };
    case "value_best":
      return {
        short: `虽然比最低价贵${priceGap}，但${checkedInfo}、退改更友好，是当前最划算选择。`,
        detail: `这是当前最值得优先比较的一档。多花${priceGap}换来${corePair}和更友好的退改规则，整体更适合${audience}。若重视稳定性，可优先考虑。`
      };
    case "balanced_pick":
    default:
      return {
        short: `价格和规则比较均衡，${flight.stopSummary === "直飞" ? "时段更稳妥" : "中转条件可接受"}，适合${audience}。`,
        detail: `这是一张取舍比较平衡的票。它不是最低价，但在价格和规则之间更平衡；需要留意${getMildLimit(flight)}。`
      };
  }
}
