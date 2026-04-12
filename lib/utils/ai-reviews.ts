import type { AiReview, FlightResult } from "../types.ts";
import {
  getFlightQuickTake,
  getFlightSuitableAudience,
  getFlightUnsuitableAudience
} from "./presentation.ts";

export function generateAiReview(flight: FlightResult): AiReview {
  return {
    short: getFlightSuitableAudience(flight),
    detail: `${getFlightQuickTake(flight)} ${getFlightSuitableAudience(flight)} ${getFlightUnsuitableAudience(flight)}`
  };
}
