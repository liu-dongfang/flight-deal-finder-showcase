"use client";

import Link from "next/link";
import { startTransition, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchForm } from "@/components/home/search-form";
import { CalendarStrip } from "@/components/results/calendar-strip";
import { FilterBar } from "@/components/results/filter-bar";
import { FlightCard } from "@/components/results/flight-card";
import { FlightDetailsDrawer } from "@/components/results/flight-details-drawer";
import { RecommendationCards } from "@/components/results/recommendation-cards";
import { SearchSummaryBar } from "@/components/results/search-summary-bar";
import { StickyDecisionBar } from "@/components/results/sticky-decision-bar";
import { ThreePathConclusions } from "@/components/results/three-path-conclusions";
import { PRODUCT_NAME } from "@/lib/constants";
import { featuredDeals } from "@/lib/data/featuredDeals";
import type { FlightResult, SearchQuery, SortMode } from "@/lib/types";
import { getResultsExperience } from "@/lib/utils/flight-engine";
import { buildResultsHref, mergeSearchQuery, parseSearchQuery } from "@/lib/utils/query";

function isSameQuery(left: SearchQuery, right: SearchQuery): boolean {
  return (
    left.from === right.from &&
    left.to === right.to &&
    left.departDate === right.departDate &&
    left.returnDate === right.returnDate &&
    left.tripType === right.tripType &&
    left.passengers === right.passengers &&
    left.sort === right.sort &&
    left.scene === right.scene &&
    left.time === right.time &&
    left.stops === right.stops &&
    left.baggage === right.baggage &&
    left.flexibility === right.flexibility &&
    left.hideRisk === right.hideRisk
  );
}

export function ResultsExperience({ initialQuery }: { initialQuery: SearchQuery }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const experience = useMemo(() => getResultsExperience(query), [query]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const selectedFlight = useMemo<FlightResult | null>(() => {
    if (!selectedFlightId) {
      return null;
    }
    return experience.flights.find((flight) => flight.flightId === selectedFlightId) ?? null;
  }, [experience.flights, selectedFlightId]);

  useEffect(() => {
    const nextQuery = parseSearchQuery(searchParams);
    setQuery((current) => (isSameQuery(current, nextQuery) ? current : nextQuery));
  }, [searchParams]);

  function commitQuery(patch: Partial<SearchQuery>) {
    const nextQuery = mergeSearchQuery(experience.query, patch);
    startTransition(() => {
      router.replace(buildResultsHref(nextQuery), { scroll: false });
    });
  }

  function updateSort(sort: SortMode) {
    commitQuery({ sort });
  }

  const comparisonFlights =
    experience.flights.length > 0 ? experience.flights : experience.flightsBeforeFilters;
  const lowestPrice =
    comparisonFlights.length > 0
      ? Math.min(...comparisonFlights.map((flight) => flight.totalPrice))
      : 0;

  /* 为粘性决策条推导最优数据 */
  const bestValueFlight = useMemo(() => {
    if (comparisonFlights.length === 0) return null;
    return [...comparisonFlights].sort(
      (a, b) => b.bestValueScore - a.bestValueScore || a.totalPrice - b.totalPrice
    )[0] ?? null;
  }, [comparisonFlights]);

  const bestCalendarItem = useMemo(() => {
    if (experience.calendarItems.length === 0) return null;
    return [...experience.calendarItems].sort(
      (a, b) => a.lowestTotalPrice - b.lowestTotalPrice
    )[0] ?? null;
  }, [experience.calendarItems]);

  return (
    <main className="page page-results">
      <header className="results-topbar">
        <Link href="/" className="brand-mark brand-mark--dark">
          <span className="brand-mark__dot" />
          <span>
            <strong>{PRODUCT_NAME}</strong>
            <small>特价机票发现平台</small>
          </span>
        </Link>
        <div className="results-topbar__meta">先看结论，再看完整列表</div>
      </header>

      <div className="results-layout">
        {/* 1. 路线摘要条 */}
        <SearchSummaryBar
          query={experience.query}
          route={experience.route}
          resultCount={experience.flights.length}
          totalCount={experience.flightsBeforeFilters.length}
          lowestPrice={lowestPrice}
          searchOpen={searchOpen}
          onToggleSearch={() => setSearchOpen((current) => !current)}
          sort={experience.query.sort}
          onChangeSort={updateSort}
          priceUpdatedAt="11:20"
        />

        {/* 内联搜索面板 */}
        {searchOpen ? (
          <div className="inline-search-panel">
            <SearchForm
              initialQuery={experience.query}
              submitLabel="应用新搜索"
              compact
              description="实时更新符合新条件的航班列表及真实成本。"
              footerNote="搜索条件更新后，我们将继续为您提供最客观的性价比排序。"
            />
          </div>
        ) : null}

        {experience.route ? (
          <>
            {/* 2. 三路结论卡 */}
            {comparisonFlights.length > 0 && (
              <ThreePathConclusions
                flights={comparisonFlights}
                calendarItems={experience.calendarItems}
                query={experience.query}
              />
            )}

            {/* 3. 日期决策模块 */}
            <CalendarStrip
              items={experience.calendarItems}
              selectedDate={experience.selectedCalendarDate}
              onSelect={(date) => commitQuery({ departDate: date })}
            />

            <section className="results-panel">
              <FilterBar query={experience.query} onChange={commitQuery} />

              {experience.flights.length > 0 ? (
                <>
                  {/* 4. 推荐方案卡区 */}
                  <RecommendationCards
                    flights={experience.flights}
                    onOpen={(flightId) => setSelectedFlightId(flightId)}
                  />

                  {/* 5. 完整列表 */}
                  <div className="results-list-header">
                    <span className="section-label">完整列表</span>
                    <span className="results-list-count">
                      共 {experience.flights.length} 条结果
                    </span>
                  </div>
                  <div className="flight-list">
                    {experience.flights.map((flight, index) => (
                      <FlightCard
                        key={flight.flightId}
                        flight={flight}
                        rank={index + 1}
                        onOpen={() => setSelectedFlightId(flight.flightId)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <section className="empty-state">
                  <span className="section-label">暂无符合条件的航班</span>
                  <h2>未找到完全满足当前筛选的特价方案</h2>
                  <p>建议您放宽筛选条件，或查看临近日期的高性价比航班。</p>
                  <div className="chip-row">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        commitQuery({
                          baggage: "any",
                          flexibility: "any",
                          hideRisk: false,
                          stops: "any",
                          time: "any"
                        })
                      }
                    >
                      重置所有条件
                    </button>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        commitQuery({
                          departDate:
                            experience.calendarItems[4]?.date ?? experience.selectedCalendarDate
                        })
                      }
                    >
                      查看临近低价日
                    </button>
                  </div>
                </section>
              )}
            </section>
          </>
        ) : (
          <section className="empty-state empty-state--wide">
            <span className="section-label">无可用航线数据</span>
            <h2>当前城市组合暂无可售航班</h2>
            <p>我们正在拓展更多航线覆盖。您可返回首页探索其他热门低价发现。</p>
            <div className="deal-grid">
              {featuredDeals.map((deal) => (
                <Link key={deal.dealId} href={buildResultsHref(deal.targetQuery)} className="deal-card">
                  <div className="deal-card__header">
                    <div>
                      <span className="deal-card__kicker">回到主链路</span>
                      <h3>{deal.title}</h3>
                    </div>
                  </div>
                  <p>{deal.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <FlightDetailsDrawer flight={selectedFlight} onClose={() => setSelectedFlightId(null)} />

      <StickyDecisionBar
        lowestPrice={lowestPrice}
        bestValueFlight={bestValueFlight}
        bestCalendarItem={bestCalendarItem}
      />
    </main>
  );
}
