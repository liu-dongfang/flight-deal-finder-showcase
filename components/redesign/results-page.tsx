"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/redesign/icons";
import {
  type PriceHistoryPoint,
  type RouteResult,
  type VerdictTone,
  getRouteResultsPack
} from "@/lib/data/redesign";
import type { SearchQuery } from "@/lib/types";
import { buildResultsHref } from "@/lib/utils/query";

type ViewMode = "best" | "cheap";

interface ResultsPageProps {
  initialQuery: SearchQuery;
}

interface FiltersState {
  budgetCap: number | null;
  includeBaggage: boolean;
  directOnly: boolean;
  flexibleOnly: boolean;
  avoidRedEye: boolean;
}

const defaultFilters: FiltersState = {
  budgetCap: null,
  includeBaggage: false,
  directOnly: false,
  flexibleOnly: false,
  avoidRedEye: false
};

function sortResults(results: RouteResult[], view: ViewMode) {
  return [...results].sort((left, right) => {
    if (view === "cheap") {
      return left.facePrice - right.facePrice;
    }

    return left.bestRank - right.bestRank;
  });
}

function applyFilters(results: RouteResult[], filters: FiltersState) {
  return results.filter((result) => {
    if (filters.budgetCap !== null && result.realPrice > filters.budgetCap) {
      return false;
    }

    if (filters.includeBaggage && result.includedBagKg <= 0) {
      return false;
    }

    if (filters.directOnly && !result.direct) {
      return false;
    }

    if (filters.flexibleOnly && !(result.refundable || result.changeFee === 0)) {
      return false;
    }

    if (filters.avoidRedEye && result.redEye) {
      return false;
    }

    return true;
  });
}

function verdictLabel(verdict: VerdictTone) {
  switch (verdict) {
    case "best":
      return "最划算";
    case "cheap":
      return "真便宜";
    case "avoid":
      return "不推荐";
    default:
      return "可以考虑";
  }
}

function chartPoints(history: PriceHistoryPoint[], width = 360, height = 110) {
  const values = history.map((point) => point.price);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const padX = 12;
  const padY = 14;
  const innerWidth = width - padX * 2;
  const innerHeight = height - padY * 2;

  return history
    .map((point, index) => {
      const x = padX + (innerWidth / Math.max(history.length - 1, 1)) * index;
      const y = padY + (1 - (point.price - min) / Math.max(max - min, 1)) * innerHeight;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function HistoryChart({ history }: { history: PriceHistoryPoint[] }) {
  const path = chartPoints(history);
  const width = 360;
  const height = 110;
  const lastX = 12 + ((width - 24) / Math.max(history.length - 1, 1)) * (history.length - 1);
  const lastPoint = history[history.length - 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="history-chart" aria-hidden="true">
      <path className="history-chart__area" d={`${path} L ${width - 12} ${height - 14} L 12 ${height - 14} Z`} />
      <path className="history-chart__line" d={path} />
      {history.map((point, index) => {
        const x = 12 + ((width - 24) / Math.max(history.length - 1, 1)) * index;
        const values = history.map((entry) => entry.price);
        const max = Math.max(...values);
        const min = Math.min(...values);
        const y = 14 + (1 - (point.price - min) / Math.max(max - min, 1)) * (height - 28);
        return <circle key={point.label} cx={x} cy={y} r={index === history.length - 1 ? 4 : 2.5} />;
      })}
      <text x={lastX - 2} y={18} textAnchor="end">
        ¥{lastPoint.price}
      </text>
    </svg>
  );
}

function SummaryBanner({
  bestValue,
  cheapest,
  view
}: {
  bestValue: RouteResult;
  cheapest: RouteResult;
  view: ViewMode;
}) {
  if (view === "cheap") {
    return (
      <>
        <p className="section-kicker">按票面价排序</p>
        <h1>
          最便宜 ¥{cheapest.facePrice} 起，
          <span>但真实到手要 ¥{cheapest.realPrice}</span>
        </h1>
        <p>
          这类票通常是最低票面价，但也最容易把行李、中转和时间代价藏起来。适合极少数只认最低价的人。
        </p>
      </>
    );
  }

  return (
    <>
      <p className="section-kicker">按总体验排序</p>
      <h1>
        综合最划算 {bestValue.airline} {bestValue.code}，
        <span>贵 ¥{bestValue.facePrice - cheapest.facePrice} 但更省心</span>
      </h1>
      <p>
        它不是最低票面价，但把行李、退改、餐食和出发时段算进去之后，通常是普通用户更不容易后悔的选择。
      </p>
    </>
  );
}

export function ResultsPage({ initialQuery }: ResultsPageProps) {
  const [view, setView] = useState<ViewMode>(initialQuery.sort === "cheapest" ? "cheap" : "best");
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);

  const pack = getRouteResultsPack(initialQuery.from, initialQuery.to);
  const filteredResults = applyFilters(sortResults(pack.results, view), filters);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedResult = filteredResults.find((result) => result.id === selectedId) ?? null;
  const bestValue = sortResults(pack.results, "best")[0];
  const cheapest = sortResults(pack.results, "cheap")[0];
  const sortedByReal = [...pack.results].sort((left, right) => left.realPrice - right.realPrice);
  const displayedMedian = sortedByReal[Math.floor(sortedByReal.length / 2)];

  function toggleFilter(key: keyof FiltersState, value?: number | null) {
    setFilters((current) => {
      if (key === "budgetCap") {
        return { ...current, budgetCap: current.budgetCap === value ? null : value ?? null };
      }

      return { ...current, [key]: !current[key] };
    });
  }

  return (
    <main className="results-page">
      <header className="results-topbar">
        <Link href="/" className="brand-logo">
          <span className="brand-logo__mark">低飞</span>
          <span className="brand-logo__text">
            <strong>LOWFLY</strong>
            <small>回到首页</small>
          </span>
        </Link>

        <div className="results-summary-card">
          <div>
            <span>从</span>
            <strong>{pack.featuredDeal.fromCity}</strong>
            <small>{pack.featuredDeal.fromAirport}</small>
          </div>
          <Icon name="arrow-right" size={16} />
          <div>
            <span>到</span>
            <strong>{pack.featuredDeal.toCity}</strong>
            <small>{pack.featuredDeal.toAirport}</small>
          </div>
          <div>
            <span>日期</span>
            <strong>{pack.featuredDeal.dates}</strong>
          </div>
        </div>

        <Link href={buildResultsHref(initialQuery)} className="editorial-link">
          固定当前查询
        </Link>
      </header>

      <section className="results-hero">
        <SummaryBanner bestValue={bestValue} cheapest={cheapest} view={view} />

        <div className="view-switch">
          <button
            type="button"
            className={view === "cheap" ? "is-active" : ""}
            onClick={() => setView("cheap")}
          >
            <strong>最便宜</strong>
            <span>只看票面价，忽略隐藏费用</span>
          </button>
          <button
            type="button"
            className={view === "best" ? "is-active" : ""}
            onClick={() => setView("best")}
          >
            <strong>最划算</strong>
            <span>综合行李、退改、餐食和时段</span>
          </button>
        </div>
      </section>

      <section className="results-layout">
        <aside className="filters-panel">
          <div className="filters-panel__head">
            <div>
              <Icon name="filter" size={15} />
              <strong>筛选</strong>
            </div>
            <button type="button" onClick={() => setFilters(defaultFilters)}>
              清空
            </button>
          </div>

          <div className="filter-group">
            <span>预算上限</span>
            <div className="filter-pills">
              {[1500, 2000].map((cap) => (
                <button
                  key={cap}
                  type="button"
                  className={filters.budgetCap === cap ? "is-selected" : ""}
                  onClick={() => toggleFilter("budgetCap", cap)}
                >
                  ¥{cap} 内
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span>条件</span>
            <div className="filter-checks">
              <button
                type="button"
                className={filters.includeBaggage ? "is-selected" : ""}
                onClick={() => toggleFilter("includeBaggage")}
              >
                含托运行李
              </button>
              <button
                type="button"
                className={filters.directOnly ? "is-selected" : ""}
                onClick={() => toggleFilter("directOnly")}
              >
                仅看直飞
              </button>
              <button
                type="button"
                className={filters.flexibleOnly ? "is-selected" : ""}
                onClick={() => toggleFilter("flexibleOnly")}
              >
                退改友好
              </button>
              <button
                type="button"
                className={filters.avoidRedEye ? "is-selected" : ""}
                onClick={() => toggleFilter("avoidRedEye")}
              >
                不要红眼
              </button>
            </div>
          </div>

          <div className="filter-note">
            <p>当前这页是演示级 mock data，重点是“看清值不值得买”，不是机票实时比价。</p>
          </div>
        </aside>

        <div className="results-list-panel">
          <div className="results-strip">
            <div>
              <strong>{filteredResults.length}</strong> 条结果
              <span>
                中位真实成本约 ¥{displayedMedian.realPrice}，最低票面价和真实到手价之间平均差了
                {" "}
                ¥{displayedMedian.realPrice - displayedMedian.facePrice}
              </span>
            </div>
          </div>

          {filteredResults.length === 0 ? (
            <div className="empty-results">
              <h2>当前筛选下没有合适结果</h2>
              <p>可以先放宽预算、行李或红眼限制，再看看是不是值得买。</p>
            </div>
          ) : (
            <div className="results-list">
              {filteredResults.map((result) => (
                <article
                  key={result.id}
                  className={`result-card result-card--${result.verdict}`}
                  onClick={() => setSelectedId(result.id)}
                >
                  <div className="result-card__main">
                    <div className="result-card__airline">
                      <div className="airline-badge">{result.code.slice(0, 2)}</div>
                      <div>
                        <strong>
                          {result.airline} {result.code}
                        </strong>
                        <small>
                          {result.fromCity} {result.fromAirport} → {result.toCity} {result.toAirport}
                        </small>
                      </div>
                    </div>

                    <div className="result-card__timeline">
                      <div>
                        <strong>{result.depTime}</strong>
                        <span>{result.fromCity}</span>
                      </div>
                      <div className="timeline-center">
                        <span>{result.duration}</span>
                        <div />
                        <small>{result.stopsLabel}</small>
                      </div>
                      <div>
                        <strong>{result.arrTime}</strong>
                        <span>{result.toCity}</span>
                      </div>
                    </div>

                    <div className="result-card__review">
                      <span className={`verdict-badge verdict-badge--${result.verdict}`}>
                        {verdictLabel(result.verdict)}
                      </span>
                      <p>{result.shortReview}</p>
                      <div className="chip-row">
                        {result.tags.map((tag) => (
                          <span key={tag} className="chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="result-card__side">
                    <div className="price-stack">
                      <span>票面价</span>
                      <strong>¥{result.facePrice}</strong>
                      <small>真实到手 ¥{result.realPrice}</small>
                    </div>

                    <div className="side-stats">
                      <span>
                        <Icon name="bag" size={14} />
                        {result.includedBagKg > 0 ? `含 ${result.includedBagKg}kg` : "不含托运"}
                      </span>
                      <span>
                        <Icon name="clock" size={14} />
                        准点率 {result.onTime}%
                      </span>
                      <span>
                        <Icon name="shield" size={14} />
                        {result.refundable || result.changeFee === 0 ? "退改友好" : `改签 ¥${result.changeFee}`}
                      </span>
                    </div>

                    <button type="button" className="secondary-button">
                      查看详情
                      <Icon name="arrow-right" size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedResult ? (
        <div className="detail-overlay" role="dialog" aria-modal="true">
          <aside className="detail-drawer">
            <header className="detail-drawer__head">
              <div>
                <small>
                  {selectedResult.airline} · {selectedResult.code}
                </small>
                <h2>
                  {selectedResult.fromCity} → {selectedResult.toCity}
                </h2>
              </div>
              <button type="button" onClick={() => setSelectedId(null)} aria-label="关闭详情">
                <Icon name="close" size={18} />
              </button>
            </header>

            <div className="detail-drawer__body">
              <section className={`verdict-card verdict-card--${selectedResult.verdict}`}>
                <div>
                  <span className="section-kicker">AI 综合判断</span>
                  <h3>{verdictLabel(selectedResult.verdict)}</h3>
                </div>
                <p>{selectedResult.detailReview}</p>
              </section>

              <section className="detail-section">
                <div className="detail-section__head">
                  <span>航程时刻</span>
                </div>
                <div className="timeline-panel">
                  <div>
                    <strong>{selectedResult.depTime}</strong>
                    <span>
                      {selectedResult.fromCity} · {selectedResult.fromAirport}
                    </span>
                  </div>
                  <div className="timeline-center">
                    <span>{selectedResult.duration}</span>
                    <div />
                    <small>{selectedResult.stopsLabel}</small>
                  </div>
                  <div>
                    <strong>{selectedResult.arrTime}</strong>
                    <span>
                      {selectedResult.toCity} · {selectedResult.toAirport}
                    </span>
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <div className="detail-section__head">
                  <span>票面价 vs 真实出行成本</span>
                </div>
                <div className="cost-grid">
                  <article>
                    <small>票面价</small>
                    <strong>¥{selectedResult.facePrice}</strong>
                  </article>
                  <article className="is-highlight">
                    <small>真实到手价</small>
                    <strong>¥{selectedResult.realPrice}</strong>
                  </article>
                </div>
                <div className="breakdown-list">
                  {selectedResult.breakdown.map((item) => (
                    <div key={item.label} className="breakdown-row">
                      <div>
                        <strong>{item.label}</strong>
                        <span>{item.note}</span>
                      </div>
                      <em>{item.amount === 0 ? "已含 / 免费" : `+¥${item.amount}`}</em>
                    </div>
                  ))}
                </div>
              </section>

              <section className="detail-section">
                <div className="detail-section__head">
                  <span>规则透明化</span>
                </div>
                <div className="rules-list">
                  {selectedResult.rules.map((rule) => (
                    <details key={rule.title} open={rule.tone !== "bad"}>
                      <summary>
                        <div>
                          <strong>{rule.title}</strong>
                          <p>{rule.summary}</p>
                        </div>
                        <span className={`rule-tone rule-tone--${rule.tone}`}>{rule.tone === "good" ? "友好" : rule.tone === "warn" ? "留心" : "严格"}</span>
                      </summary>
                      <div className="rule-detail">{rule.detail}</div>
                    </details>
                  ))}
                </div>
              </section>

              <section className="detail-section">
                <div className="detail-section__head">
                  <span>适合谁 / 不适合谁</span>
                </div>
                <div className="fit-grid">
                  <article>
                    <small>更适合</small>
                    <p>{selectedResult.fitFor}</p>
                  </article>
                  <article className="is-warn">
                    <small>不太适合</small>
                    <p>{selectedResult.notFitFor}</p>
                  </article>
                </div>
              </section>

              <section className="detail-section">
                <div className="detail-section__head">
                  <span>近 90 天价格走势</span>
                </div>
                <HistoryChart history={selectedResult.history} />
              </section>
            </div>

            <footer className="detail-drawer__foot">
              <div>
                <small>票面价</small>
                <strong>¥{selectedResult.facePrice}</strong>
              </div>
              <div className="is-highlight">
                <small>真实到手价</small>
                <strong>¥{selectedResult.realPrice}</strong>
              </div>
              <button type="button" className="primary-button">
                追踪降价
              </button>
            </footer>
          </aside>
          <button type="button" className="detail-overlay__backdrop" onClick={() => setSelectedId(null)} aria-label="关闭" />
        </div>
      ) : null}
    </main>
  );
}
