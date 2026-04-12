import type { ReactNode } from "react";
import type { CalendarPriceItem, FlightResult, SearchQuery } from "@/lib/types";
import { formatMonthDay, formatPrice } from "@/lib/utils/date";
import { getFlightDecisionTags, getFlightQuickTake } from "@/lib/utils/presentation";

function getCheapestFlight(flights: FlightResult[]): FlightResult | null {
  return (
    [...flights].sort((a, b) => {
      return (
        a.totalPrice - b.totalPrice ||
        a.stopCount - b.stopCount ||
        Number(a.isRedEye) - Number(b.isRedEye) ||
        a.flightId.localeCompare(b.flightId)
      );
    })[0] ?? null
  );
}

function getBestValueFlight(flights: FlightResult[]): FlightResult | null {
  return (
    [...flights].sort((a, b) => {
      return (
        b.bestValueScore - a.bestValueScore ||
        a.totalPrice - b.totalPrice ||
        a.flightId.localeCompare(b.flightId)
      );
    })[0] ?? null
  );
}

function PathCard({
  type,
  title,
  flight,
  verdict,
  altContent
}: {
  type: "cheapest" | "value" | "wait";
  title: string;
  flight?: FlightResult | null;
  verdict: string;
  altContent?: ReactNode;
}) {
  return (
    <article className={`path-card path-card--${type}`}>
      <div className="path-card__title">{title}</div>
      {flight ? (
        <>
          <div className="path-card__airline">
            {flight.airlineName} · {flight.flightNumber}
          </div>
          <div className="path-card__price">{formatPrice(flight.totalPrice)}</div>
          <div className="path-card__tags">
            {getFlightDecisionTags(flight, type === "cheapest" ? "cheapest" : "best_value").map(
              (tag) => (
                <span key={tag} className="path-card__tag">
                  {tag}
                </span>
              )
            )}
          </div>
        </>
      ) : (
        altContent
      )}
      <p className="path-card__verdict">{verdict}</p>
    </article>
  );
}

export function ThreePathConclusions({
  flights,
  calendarItems,
  query
}: {
  flights: FlightResult[];
  calendarItems: CalendarPriceItem[];
  query: SearchQuery;
}) {
  const cheapest = getCheapestFlight(flights);
  const bestValue = getBestValueFlight(flights);

  const currentDay = calendarItems.find((d) => d.date === query.departDate);
  const cheapestDay = [...calendarItems].sort((a, b) => a.lowestTotalPrice - b.lowestTotalPrice)[0];
  const hasBetterDate =
    currentDay && cheapestDay ? cheapestDay.date !== currentDay.date : false;
  const savings =
    hasBetterDate && currentDay && cheapestDay
      ? currentDay.lowestTotalPrice - cheapestDay.lowestTotalPrice
      : 0;

  if (!cheapest || !bestValue) {
    return null;
  }

  const waitVerdict =
    hasBetterDate && cheapestDay
      ? `改到 ${formatMonthDay(cheapestDay.date)} 最多省 ${formatPrice(savings)}，灵活出行时优先看这天。`
      : `当前 ${formatMonthDay(query.departDate)} 已是近 7 天最低价，无需等待，直接比较规则差异。`;

  return (
    <section className="three-path-section">
      <div className="three-path-section__header">
        <span className="section-label">三路结论</span>
        <p>最便宜只看总价；更划算同时考虑行李退改时段；建议改期基于日历低价。</p>
      </div>
      <div className="three-path-grid">
        <PathCard
          type="cheapest"
          title="最便宜"
          flight={cheapest}
          verdict={getFlightQuickTake(cheapest)}
        />
        <PathCard
          type="value"
          title="更划算"
          flight={bestValue}
          verdict={getFlightQuickTake(bestValue)}
        />
        <PathCard
          type="wait"
          title={hasBetterDate ? "建议改期" : "当前已是低价"}
          flight={null}
          verdict={waitVerdict}
          altContent={
            hasBetterDate && cheapestDay ? (
              <div className="path-card__wait-info">
                <div className="path-card__wait-date">{formatMonthDay(cheapestDay.date)}</div>
                <div className="path-card__wait-price">{formatPrice(cheapestDay.lowestTotalPrice)}</div>
              </div>
            ) : (
              <div className="path-card__wait-info">
                <div className="path-card__wait-date">{formatMonthDay(query.departDate)}</div>
                <div className="path-card__wait-label">近 7 天最低</div>
              </div>
            )
          }
        />
      </div>
    </section>
  );
}
