import type { FlightResult, SortMode } from "@/lib/types";
import { formatDuration, formatFlightWindow, formatPrice } from "@/lib/utils/date";
import {
  getBaggageBadge,
  getFlightDecisionHeadline,
  getFlightLabelTone,
  getFlexibilityBadge,
  getFlightRiskSummary
} from "@/lib/utils/presentation";

export function FlightCard({
  flight,
  rank,
  sort,
  onOpen
}: {
  flight: FlightResult;
  rank: number;
  sort: SortMode;
  onOpen: () => void;
}) {
  const baggageBadge = getBaggageBadge(flight.checkedBaggage);
  const flexibilityBadge = getFlexibilityBadge(flight.changePolicyLevel);

  return (
    <article className="flight-card">
      <div className="flight-card__grid">
        <div className="flight-card__route">
          <div className="flight-card__meta-row">
            <div className="flight-card__rank">{rank.toString().padStart(2, "0")}</div>
            <div>
              <div className="flight-card__airline">
                <strong>{flight.airlineName}</strong>
                <span>{flight.flightNumber}</span>
              </div>
              <p>
                {flight.route.originCity} → {flight.route.destinationCity} · {flight.departAirportCode} →{" "}
                {flight.arriveAirportCode}
              </p>
            </div>
          </div>

          <div className="flight-card__timeline">
            <div className="flight-card__point">
              <strong>{flight.departTimeLocal}</strong>
              <span>{flight.departAirportCode}</span>
            </div>
            <div className="flight-card__line">
              <span>{formatDuration(flight.durationMinutes)}</span>
              <small>{flight.stopSummary}</small>
            </div>
            <div className="flight-card__point flight-card__point--arrive">
              <strong>{flight.arriveTimeLocal}</strong>
              <span>{flight.arriveAirportCode}</span>
            </div>
          </div>
        </div>

        <div className="flight-card__facts">
          <div className="status-row">
            <span className={`status-badge status-badge--${baggageBadge.tone}`}>{baggageBadge.label}</span>
            <span className={`status-badge status-badge--${flexibilityBadge.tone}`}>{flexibilityBadge.label}</span>
            {flight.labels.map((label) => (
              <span key={label} className={`status-badge status-badge--${getFlightLabelTone(label)}`}>
                {label}
              </span>
            ))}
          </div>

          <div className="flight-card__detail-row">
            <span className="flight-window">{formatFlightWindow(flight.departTimeLocal, flight.arriveTimeLocal, flight.arrivalDayOffset)}</span>
            <span className={`flight-decision ${rank === 1 ? 'flight-decision--highlight' : ''}`}>{getFlightDecisionHeadline(flight)}</span>
          </div>

          <div className="flight-card__risk-box">
            <p className="flight-card__summary">{getFlightRiskSummary(flight)}</p>
          </div>
        </div>

        <div className="flight-card__decision">
          <div className="flight-card__price-block">
            <strong>{formatPrice(flight.totalPrice)}</strong>
            <span>含税总价</span>
            <small>
              {flight.priceGapFromCheapest === 0
                ? "当前最低价"
                : `比最低价高 ${formatPrice(flight.priceGapFromCheapest)}`}
            </small>
          </div>

          <button type="button" className="secondary-button" onClick={onOpen}>
            {sort === "best_value" && rank === 1 ? "查看为何更划算" : "查看规则详情"}
          </button>
        </div>
      </div>

      <div className="flight-card__review">
        <span className="status-badge status-badge--neutral">AI 判断</span>
        <p>{flight.aiReview.short}</p>
      </div>
    </article>
  );
}
