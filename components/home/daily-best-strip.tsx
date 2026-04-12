import Link from "next/link";
import { DEFAULT_QUERY } from "@/lib/constants";
import { formatMonthDay, formatPrice } from "@/lib/utils/date";
import { getResultsExperience } from "@/lib/utils/flight-engine";
import { buildResultsHref } from "@/lib/utils/query";

export function DailyBestStrip() {
  const experience = getResultsExperience(DEFAULT_QUERY);
  const allFlights = experience.flightsBeforeFilters;

  const cheapestFlight =
    [...allFlights].sort((a, b) => {
      return (
        a.totalPrice - b.totalPrice ||
        a.stopCount - b.stopCount ||
        Number(a.isRedEye) - Number(b.isRedEye)
      );
    })[0] ?? null;

  const bestValueFlight =
    [...allFlights].sort((a, b) => {
      return b.bestValueScore - a.bestValueScore || a.totalPrice - b.totalPrice;
    })[0] ?? null;

  const calendarItems = experience.calendarItems;
  const currentDay = calendarItems.find((d) => d.date === DEFAULT_QUERY.departDate);
  const cheapestDay = [...calendarItems].sort((a, b) => a.lowestTotalPrice - b.lowestTotalPrice)[0];
  const hasBetterDate =
    currentDay && cheapestDay ? cheapestDay.date !== DEFAULT_QUERY.departDate : false;
  const savings =
    hasBetterDate && currentDay && cheapestDay
      ? currentDay.lowestTotalPrice - cheapestDay.lowestTotalPrice
      : 0;

  return (
    <div className="daily-best-strip">
      {cheapestFlight && (
        <article className="daily-best-card daily-best-card--cheapest">
          <span className="daily-best-card__tag">今日最低价</span>
          <div className="daily-best-card__route">
            {DEFAULT_QUERY.from} → {DEFAULT_QUERY.to}
          </div>
          <div className="daily-best-card__price">{formatPrice(cheapestFlight.totalPrice)}</div>
          <p className="daily-best-card__note">
            {cheapestFlight.checkedBaggage === "0kg"
              ? "不含托运行李，加购后总价会更高"
              : `含 ${cheapestFlight.checkedBaggage} 托运，价格透明`}
          </p>
          <Link
            href={buildResultsHref({ ...DEFAULT_QUERY, sort: "cheapest" })}
            className="daily-best-card__cta"
          >
            查看详情
          </Link>
        </article>
      )}

      {bestValueFlight && (
        <article className="daily-best-card daily-best-card--value">
          <span className="daily-best-card__tag">今日更划算</span>
          <div className="daily-best-card__route">
            {DEFAULT_QUERY.from} → {DEFAULT_QUERY.to}
          </div>
          <div className="daily-best-card__price">{formatPrice(bestValueFlight.totalPrice)}</div>
          <p className="daily-best-card__note">
            {bestValueFlight.checkedBaggage !== "0kg"
              ? `含 ${bestValueFlight.checkedBaggage} 托运、退改更灵活，适合大多数人`
              : "综合规则最优，适合大多数人优先比较"}
          </p>
          <Link
            href={buildResultsHref({ ...DEFAULT_QUERY, sort: "best_value" })}
            className="daily-best-card__cta"
          >
            查看详情
          </Link>
        </article>
      )}

      <article className="daily-best-card daily-best-card--alt">
        <span className="daily-best-card__tag">
          {hasBetterDate ? "今日建议改期" : "当前日期已低价"}
        </span>
        <div className="daily-best-card__route">
          {DEFAULT_QUERY.from} → {DEFAULT_QUERY.to}
        </div>
        {hasBetterDate && cheapestDay ? (
          <>
            <div className="daily-best-card__price">{formatPrice(cheapestDay.lowestTotalPrice)}</div>
            <p className="daily-best-card__note">
              改到 {formatMonthDay(cheapestDay.date)} 最多省 {formatPrice(savings)}
            </p>
          </>
        ) : (
          <>
            <div className="daily-best-card__price">近 7 天最低</div>
            <p className="daily-best-card__note">已选日期处于低价区间，无需等待改期</p>
          </>
        )}
        <Link href={buildResultsHref(DEFAULT_QUERY)} className="daily-best-card__cta">
          查看日历
        </Link>
      </article>
    </div>
  );
}
