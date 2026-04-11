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
  return (
    <section className="calendar-strip">
      <div className="calendar-strip__header">
        <div>
          <span className="section-label">低价日历</span>
          <h2>横向 7 列日期价格条</h2>
        </div>
        <p>只服务出发日期，点击后刷新当前结果，但不丢失现有筛选和排序。</p>
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
