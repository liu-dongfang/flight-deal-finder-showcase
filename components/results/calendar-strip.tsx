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

  return (
    <section className="calendar-strip">
      <div className="calendar-strip__header">
        <div>
          <span className="section-label">低价日历</span>
          <h2>换一天再看，通常比继续纠结一张票更有效</h2>
        </div>
        <p>
          当前已选 {formatMonthDay(selectedDate)}
          {cheapestDay ? ` · 7 天内最低在 ${formatMonthDay(cheapestDay.date)}` : ""}
        </p>
      </div>

      <div className="calendar-strip__grid">
        {items.map((item) => (
          <button
            key={item.date}
            type="button"
            className={`calendar-tile calendar-tile--${item.priceLevel} ${selectedDate === item.date ? "is-active" : ""}`}
            onClick={() => onSelect(item.date)}
          >
            <span>{formatMonthDay(item.date)}</span>
            <strong>{formatPrice(item.lowestTotalPrice)}</strong>
            <small>{getWeekdayLabel(item.date)}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
