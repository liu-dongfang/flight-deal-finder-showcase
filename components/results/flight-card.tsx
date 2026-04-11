import type { FlightResult, SortMode } from "@/lib/types";
import { formatDuration, formatFlightWindow, formatPrice } from "@/lib/utils/date";

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
  return (
    <article className="flight-card">
      <div className="flight-card__header">
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
        <div className="flight-card__price">
          <strong>{formatPrice(flight.totalPrice)}</strong>
          <span>含税总价</span>
        </div>
      </div>

      <div className="flight-card__main">
        <div className="flight-card__times">
          <strong>{formatFlightWindow(flight.departTimeLocal, flight.arriveTimeLocal, flight.arrivalDayOffset)}</strong>
          <span>{formatDuration(flight.durationMinutes)}</span>
        </div>
        <div className="flight-card__stops">{flight.stopSummary}</div>
      </div>

      <div className="chip-row">
        <span className="chip chip--soft">{flight.checkedBaggage === "0kg" ? "仅随身行李" : `托运 ${flight.checkedBaggage}`}</span>
        <span className="chip chip--soft">
          {flight.changePolicyLevel === "flexible"
            ? "较灵活"
            : flight.changePolicyLevel === "limited"
              ? "有限改签"
              : "严格限制"}
        </span>
        {flight.labels.map((label) => (
          <span key={label} className="chip">
            {label}
          </span>
        ))}
      </div>

      <div className="flight-card__review">
        <div>
          <span className="section-label">AI 风格点评</span>
          <p>{flight.aiReview.short}</p>
        </div>
        <button type="button" className="secondary-button" onClick={onOpen}>
          {sort === "best_value" && rank === 1 ? "查看最划算理由" : "查看规则详情"}
        </button>
      </div>
    </article>
  );
}
