"use client";

import type { FlightResult } from "@/lib/types";
import { formatDuration, formatPrice } from "@/lib/utils/date";
import { getFlightQuickTake } from "@/lib/utils/presentation";

function getRecommendations(flights: FlightResult[]): { label: string; flight: FlightResult }[] {
  if (flights.length === 0) return [];

  const bestValue =
    [...flights].sort((a, b) => {
      return b.bestValueScore - a.bestValueScore || a.totalPrice - b.totalPrice;
    })[0] ?? null;

  const cheapest =
    [...flights].sort((a, b) => {
      return (
        a.totalPrice - b.totalPrice ||
        a.stopCount - b.stopCount ||
        Number(a.isRedEye) - Number(b.isRedEye)
      );
    })[0] ?? null;

  const lightTravel = flights.find(
    (f) =>
      f.checkedBaggage === "0kg" &&
      f.flightId !== cheapest?.flightId &&
      f.flightId !== bestValue?.flightId
  );
  const withTransfer = flights.find(
    (f) =>
      f.stopCount > 0 &&
      f.flightId !== cheapest?.flightId &&
      f.flightId !== bestValue?.flightId
  );
  const thirdPick = lightTravel ?? withTransfer;

  const recs: { label: string; flight: FlightResult }[] = [];
  if (bestValue) recs.push({ label: "大多数人首选", flight: bestValue });
  if (cheapest && cheapest.flightId !== bestValue?.flightId) {
    recs.push({ label: "预算优先", flight: cheapest });
  }
  if (thirdPick) {
    recs.push({ label: lightTravel ? "轻装可选" : "中转可选", flight: thirdPick });
  }

  return recs.slice(0, 3);
}

export function RecommendationCards({
  flights,
  onOpen
}: {
  flights: FlightResult[];
  onOpen: (flightId: string) => void;
}) {
  const recs = getRecommendations(flights);
  if (recs.length === 0) return null;

  return (
    <section className="rec-section">
      <div className="rec-section__header">
        <span className="section-label">明确推荐</span>
        <p>不是排序，而是明确推荐。以下方案各有侧重，适合不同出行目标。</p>
      </div>
      <div className="rec-grid">
        {recs.map(({ label, flight }) => (
          <article key={flight.flightId} className="rec-card">
            <div className="rec-card__label">{label}</div>
            <div className="rec-card__airline">
              <strong>{flight.airlineName}</strong>
              <span>{flight.flightNumber}</span>
            </div>
            <div className="rec-card__price">{formatPrice(flight.totalPrice)}</div>
            <div className="rec-card__info">
              <span>{flight.departTimeLocal} → {flight.arriveTimeLocal}</span>
              <span>{formatDuration(flight.durationMinutes)}</span>
              <span>{flight.stopCount === 0 ? "直飞" : flight.stopSummary}</span>
            </div>
            <p className="rec-card__take">{getFlightQuickTake(flight)}</p>
            <button
              type="button"
              className="rec-card__cta secondary-button"
              onClick={() => onOpen(flight.flightId)}
            >
              看清代价
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
