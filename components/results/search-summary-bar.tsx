import type { RouteRecord, SearchQuery } from "@/lib/types";
import { formatDisplayDate, formatPrice } from "@/lib/utils/date";

interface SearchSummaryBarProps {
  query: SearchQuery;
  route: RouteRecord | null;
  resultCount: number;
  totalCount: number;
  lowestPrice: number;
  searchOpen: boolean;
  onToggleSearch: () => void;
}

export function SearchSummaryBar({
  query,
  route,
  resultCount,
  totalCount,
  lowestPrice,
  searchOpen,
  onToggleSearch
}: SearchSummaryBarProps) {
  return (
    <section className="summary-card">
      <div className="summary-card__main">
        <div>
          <span className="section-label">当前搜索</span>
          <h1>
            {query.from} <span>→</span> {query.to}
          </h1>
          <p>
            出发 {formatDisplayDate(query.departDate)} · {query.passengers} 名旅客
            {query.returnDate ? ` · 组合返程 ${query.returnDate}` : ""}
          </p>
          <div className="status-row">
            <span className="status-badge status-badge--neutral">
              {route?.originAirportCode ?? "--"} → {route?.destinationAirportCode ?? "--"}
            </span>
            {route ? (
              <span className="status-badge status-badge--neutral">常见含税价 {route.typicalPriceRange}</span>
            ) : null}
            {lowestPrice > 0 ? (
              <span className="status-badge status-badge--accent">当前最低 {formatPrice(lowestPrice)}</span>
            ) : null}
          </div>
        </div>

        <div className="summary-stats">
          <div className="summary-stat">
            <strong>{resultCount}</strong>
            <span>当前结果</span>
          </div>
          <div className="summary-stat">
            <strong>{totalCount}</strong>
            <span>该航线候选</span>
          </div>
          <div className="summary-stat summary-stat--wide">
            <strong>{route?.heroLabel ?? "继续比较总价与规则差异"}</strong>
            <span>这一组票最适合看的判断重点</span>
          </div>
        </div>
      </div>

      <div className="summary-card__actions">
        <span className="summary-card__hint">先用工具栏缩小范围，再切换“最便宜 / 最划算”看排序差异。</span>
        <button type="button" className="secondary-button" onClick={onToggleSearch}>
          {searchOpen ? "收起搜索" : "修改搜索"}
        </button>
      </div>
    </section>
  );
}
