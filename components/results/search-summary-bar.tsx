import type { CalendarPriceItem, FlightResult, RouteRecord, SearchQuery, SortMode } from "@/lib/types";
import { formatDisplayDate, formatMonthDay, formatPrice } from "@/lib/utils/date";
import {
  getDecisionBadgeTone,
  getFlightDecisionHeadline,
  getFlightDecisionTags,
  getFlightQuickTake
} from "@/lib/utils/presentation";
import { SortSwitch } from "./sort-switch";

interface SearchSummaryBarProps {
  query: SearchQuery;
  route: RouteRecord | null;
  resultCount: number;
  totalCount: number;
  lowestPrice: number;
  searchOpen: boolean;
  onToggleSearch: () => void;
  comparisonFlights: FlightResult[];
  calendarItems: CalendarPriceItem[];
  sort: SortMode;
  onChangeSort: (sort: SortMode) => void;
  priceUpdatedAt: string;
}

function getCheapestFlight(flights: FlightResult[]): FlightResult | null {
  return (
    [...flights].sort((left, right) => {
      return (
        left.totalPrice - right.totalPrice ||
        left.stopCount - right.stopCount ||
        Number(left.isRedEye) - Number(right.isRedEye) ||
        left.flightId.localeCompare(right.flightId)
      );
    })[0] ?? null
  );
}

function getBestValueFlight(flights: FlightResult[]): FlightResult | null {
  return (
    [...flights].sort((left, right) => {
      return (
        right.bestValueScore - left.bestValueScore ||
        left.totalPrice - right.totalPrice ||
        left.stopCount - right.stopCount ||
        Number(left.isRedEye) - Number(right.isRedEye) ||
        left.flightId.localeCompare(right.flightId)
      );
    })[0] ?? null
  );
}

function SummaryDecisionCard({
  label,
  flight,
  mode
}: {
  label: string;
  flight: FlightResult;
  mode: "cheapest" | "best_value";
}) {
  return (
    <article className={`decision-summary-card decision-summary-card--${mode}`}>
      <div className="decision-summary-card__header">
        <div>
          <span className="decision-summary-card__eyebrow">{label}</span>
          <h2>
            {flight.airlineName} {flight.flightNumber}
          </h2>
        </div>
        <div className="decision-summary-card__price">
          <strong>{formatPrice(flight.totalPrice)}</strong>
          <small>{flight.stopCount === 0 ? "直飞" : flight.stopSummary}</small>
        </div>
      </div>

      <div className="chip-row">
        {getFlightDecisionTags(flight, mode).map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>

      <p className="decision-summary-card__judgement">{getFlightQuickTake(flight)}</p>

      <div className="decision-summary-card__footer">
        <span className={`status-badge status-badge--${getDecisionBadgeTone(flight)}`}>
          {getFlightDecisionHeadline(flight)}
        </span>
      </div>
    </article>
  );
}

export function SearchSummaryBar({
  query,
  route,
  resultCount,
  totalCount,
  lowestPrice,
  searchOpen,
  onToggleSearch,
  comparisonFlights,
  calendarItems,
  sort,
  onChangeSort,
  priceUpdatedAt
}: SearchSummaryBarProps) {
  const cheapestFlight = getCheapestFlight(comparisonFlights);
  const bestValueFlight = getBestValueFlight(comparisonFlights);
  const selectedDay = calendarItems.find((item) => item.date === query.departDate);
  const cheapestDay = [...calendarItems].sort((left, right) => left.lowestTotalPrice - right.lowestTotalPrice)[0];
  const canSave = selectedDay && cheapestDay
    ? selectedDay.lowestTotalPrice > cheapestDay.lowestTotalPrice
    : false;
  const savings = canSave && selectedDay && cheapestDay
    ? selectedDay.lowestTotalPrice - cheapestDay.lowestTotalPrice
    : 0;
  const advice = canSave && cheapestDay
    ? `如果你能改期，${formatMonthDay(cheapestDay.date)} 可再省 ${formatPrice(savings)}；如果锁定 ${formatMonthDay(query.departDate)}，优先比较更划算方案。`
    : `你选的 ${formatMonthDay(query.departDate)} 已经是近 7 天最低价，接下来重点看航班规则与行李差异。`;

  return (
    <section className="summary-card">
      <div className="summary-card__top">
        <div>
          <span className="section-label">路线摘要</span>
          <h1>
            {query.from} <span>→</span> {query.to}
          </h1>
        </div>

        <div className="summary-card__actions">
          <button type="button" className="secondary-button" onClick={onToggleSearch}>
            {searchOpen ? "收起搜索" : "修改搜索"}
          </button>
          <p className="summary-card__hint">价格为最近一次抓取结果，可能随库存变化波动。</p>
        </div>
      </div>

      <div className="summary-fact-grid">
        <div className="summary-fact">
          <span>航线</span>
          <strong>
            {query.from} → {query.to}
          </strong>
        </div>
        <div className="summary-fact">
          <span>出发日期</span>
          <strong>{formatDisplayDate(query.departDate)}</strong>
        </div>
        <div className="summary-fact">
          <span>旅客数</span>
          <strong>{query.passengers} 名旅客</strong>
        </div>
        <div className="summary-fact">
          <span>当前最低价</span>
          <strong>{lowestPrice > 0 ? formatPrice(lowestPrice) : "--"}</strong>
        </div>
        <div className="summary-fact">
          <span>常见含税价区间</span>
          <strong>{route?.typicalPriceRange ?? "--"}</strong>
        </div>
        <div className="summary-fact">
          <span>价格更新时间</span>
          <strong>{priceUpdatedAt}</strong>
        </div>
      </div>

      {cheapestFlight && bestValueFlight ? (
        <div className="decision-summary">
          <div className="decision-summary__header">
            <p>最便宜只看总价；更划算会同时考虑行李、退改和时段代价。</p>
            <div className="decision-summary__controls">
              <div className="decision-summary__result-meta">
                当前展示 {resultCount} 条，共 {totalCount} 条
              </div>
              <SortSwitch sort={sort} onChange={onChangeSort} />
            </div>
          </div>

          <div className="decision-summary__grid">
            <SummaryDecisionCard label="最便宜" flight={cheapestFlight} mode="cheapest" />
            <SummaryDecisionCard label="更划算" flight={bestValueFlight} mode="best_value" />
          </div>
        </div>
      ) : null}

      <div className="summary-advice">
        <span className="section-label">动作建议</span>
        <p>{advice}</p>
      </div>
    </section>
  );
}
