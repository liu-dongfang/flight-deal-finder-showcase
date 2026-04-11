import type { RouteRecord, SearchQuery } from "@/lib/types";
import { formatDisplayDate } from "@/lib/utils/date";

interface SearchSummaryBarProps {
  query: SearchQuery;
  route: RouteRecord | null;
  resultCount: number;
  totalCount: number;
  searchOpen: boolean;
  onToggleSearch: () => void;
}

export function SearchSummaryBar({
  query,
  route,
  resultCount,
  totalCount,
  searchOpen,
  onToggleSearch
}: SearchSummaryBarProps) {
  return (
    <section className="summary-card">
      <div className="summary-card__content">
        <div>
          <span className="section-label">搜索摘要</span>
          <h1>
            {query.from} <span>→</span> {query.to}
          </h1>
          <p>
            出发 {formatDisplayDate(query.departDate)} · {query.passengers} 人 · 主链路固定为单程
            {query.returnDate ? ` · 返程参考 ${query.returnDate}` : ""}
          </p>
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
          <div className="summary-stat">
            <strong>{route?.originAirportCode ?? "--"}</strong>
            <span>出发机场</span>
          </div>
        </div>
      </div>

      <div className="summary-card__actions">
        <span className="summary-card__hint">固定单程链路，可直接切换筛选、排序和日期</span>
        <button type="button" className="secondary-button" onClick={onToggleSearch}>
          {searchOpen ? "收起搜索面板" : "修改搜索条件"}
        </button>
      </div>
    </section>
  );
}
