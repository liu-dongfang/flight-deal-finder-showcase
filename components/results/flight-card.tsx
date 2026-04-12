import type { FlightResult } from "@/lib/types";
import { formatDuration, formatFlightWindow, formatPrice } from "@/lib/utils/date";
import {
  getBaggageBadge,
  getFlightLabelTone,
  getFlightQuickTake,
  getFlexibilityBadge,
  getFlightRiskSummary
} from "@/lib/utils/presentation";

export function FlightCard({
  flight,
  rank,
  onOpen
}: {
  flight: FlightResult;
  rank: number;
  onOpen: () => void;
}) {
  const baggageBadge = getBaggageBadge(flight.checkedBaggage);
  const flexibilityBadge = getFlexibilityBadge(flight.changePolicyLevel);
  const priceGapLabel =
    flight.priceGapFromCheapest === 0
      ? "与最低价持平"
      : `比最低价高 ${formatPrice(flight.priceGapFromCheapest)}`;

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
            {flight.labels.map((label) => (
              <span key={label} className={`status-badge status-badge--${getFlightLabelTone(label)}`}>
                {label}
              </span>
            ))}
            <span className={`status-badge status-badge--${baggageBadge.tone}`}>{baggageBadge.label}</span>
            <span className={`status-badge status-badge--${flexibilityBadge.tone}`}>{flexibilityBadge.label}</span>
            <span className={`status-badge status-badge--${flight.stopCount === 0 ? "positive" : flight.isSelfTransfer ? "risk" : "neutral"}`}>
              {flight.stopCount === 0 ? "直飞" : flight.isSelfTransfer ? "自助中转" : "1 次中转"}
            </span>
            {flight.isRedEye ? <span className="status-badge status-badge--warning">红眼</span> : null}
          </div>

          <div className="flight-card__detail-row">
            <span className="flight-window">
              {formatFlightWindow(flight.departTimeLocal, flight.arriveTimeLocal, flight.arrivalDayOffset)} ·{" "}
              {formatDuration(flight.durationMinutes)}
            </span>
            <span className="flight-stop-summary">{flight.stopSummary}</span>
          </div>

          <p className="flight-card__quick-take">{getFlightQuickTake(flight)}</p>

          <div className="flight-card__fit-box">
            <span className="status-badge status-badge--neutral">适合谁</span>
            <p className="flight-card__summary">{flight.aiReview.short}</p>
          </div>

          <div className="flight-card__risk-box">
            <span className="status-badge status-badge--neutral">要先看清</span>
            <p className="flight-card__summary">{getFlightRiskSummary(flight)}</p>
          </div>
        </div>

        <div className="flight-card__decision">
          <div className="flight-card__price-block">
            <strong>{formatPrice(flight.totalPrice)}</strong>
            <span>含税总价</span>
            <small>{priceGapLabel}</small>
          </div>

          <div className="flight-card__gap-chip">
            {flight.priceGapFromCheapest === 0 ? "当前最低价" : `价差 ${formatPrice(flight.priceGapFromCheapest)}`}
          </div>

          <button type="button" className="secondary-button" onClick={onOpen}>
            看清代价
          </button>
        </div>
      </div>
    </article>
  );
}
