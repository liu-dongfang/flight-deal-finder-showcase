import type { RouteRecord, SearchQuery, SortMode } from "@/lib/types";
import { formatDisplayDate, formatPrice } from "@/lib/utils/date";
import { SortSwitch } from "./sort-switch";

interface SearchSummaryBarProps {
  query: SearchQuery;
  route: RouteRecord | null;
  resultCount: number;
  totalCount: number;
  lowestPrice: number;
  searchOpen: boolean;
  onToggleSearch: () => void;
  sort: SortMode;
  onChangeSort: (sort: SortMode) => void;
  priceUpdatedAt: string;
}

export function SearchSummaryBar({
  query,
  route,
  resultCount,
  totalCount,
  lowestPrice,
  searchOpen,
  onToggleSearch,
  sort,
  onChangeSort,
  priceUpdatedAt
}: SearchSummaryBarProps) {
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
        <div className="summary-fact">
          <span>当前展示</span>
          <strong>{resultCount} / {totalCount} 条</strong>
        </div>
      </div>

      <div className="summary-card__controls">
        <SortSwitch sort={sort} onChange={onChangeSort} />
      </div>
    </section>
  );
}
