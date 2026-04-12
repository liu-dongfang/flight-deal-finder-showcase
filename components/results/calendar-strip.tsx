import type { CalendarPriceItem } from "@/lib/types";
import { formatMonthDay, formatPrice, getWeekdayLabel } from "@/lib/utils/date";

export function CalendarStrip({
  items,
  selectedDate,
  onSelect
}: {
  items: CalendarPriceItem[];
  selectedDate: string;
  onSelect: (date: string) => void;
}) {
  const cheapestDay = [...items].sort((left, right) => left.lowestTotalPrice - right.lowestTotalPrice)[0];
  const selectedItem = items.find((item) => item.date === selectedDate);
  const canSave = selectedItem && cheapestDay
    ? selectedItem.lowestTotalPrice > cheapestDay.lowestTotalPrice
    : false;
  const savings =
    canSave && selectedItem && cheapestDay
      ? selectedItem.lowestTotalPrice - cheapestDay.lowestTotalPrice
      : 0;
  const headline = canSave && cheapestDay
    ? `当前已选 ${formatMonthDay(selectedDate)}，7 天内最低在 ${formatMonthDay(cheapestDay.date)}，可再省 ${formatPrice(savings)}`
    : `当前已选 ${formatMonthDay(selectedDate)}，已经是近 7 天最低，接下来优先比较规则差异`;

  return (
    <section className="calendar-strip">
      <div className="calendar-strip__header">
        <div>
          <span className="section-label">低价日历</span>
          <h2>改一天能省多少？</h2>
        </div>
        <p>{headline}</p>
      </div>

      <div className="calendar-strip__grid">
        {items.map((item) => {
          const isActive = selectedDate === item.date;
          const isCheapest = cheapestDay ? item.lowestTotalPrice === cheapestDay.lowestTotalPrice : false;
          const tileLabel = isActive && isCheapest
            ? "当前最低"
            : isActive
              ? "当前已选"
              : isCheapest
                ? "7天最低"
                : getWeekdayLabel(item.date);

          return (
            <button
              key={item.date}
              type="button"
              className={`calendar-tile calendar-tile--${item.priceLevel} ${isActive ? "is-active" : ""} ${isCheapest ? "is-cheapest" : ""}`}
              aria-pressed={isActive}
              onClick={() => onSelect(item.date)}
            >
              <span>{formatMonthDay(item.date)}</span>
              <strong>{formatPrice(item.lowestTotalPrice)}</strong>
              <small>{tileLabel}</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}
