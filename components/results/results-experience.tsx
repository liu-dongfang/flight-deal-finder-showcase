"use client";

import Link from "next/link";
import { startTransition, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchForm } from "@/components/home/search-form";
import { CalendarStrip } from "@/components/results/calendar-strip";
import { FilterBar } from "@/components/results/filter-bar";
import { FlightCard } from "@/components/results/flight-card";
import { FlightDetailsDrawer } from "@/components/results/flight-details-drawer";
import { SearchSummaryBar } from "@/components/results/search-summary-bar";
import { SortSwitch } from "@/components/results/sort-switch";
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
        <div className="results-topbar__meta">默认主链路：上海 → 东京 / 2026-05-16 / 单程 / 1 人</div>
      </header>

      <div className="results-layout">
        <SearchSummaryBar
          query={experience.query}
          route={experience.route}
          resultCount={experience.flights.length}
          totalCount={experience.flightsBeforeFilters.length}
          searchOpen={searchOpen}
          onToggleSearch={() => setSearchOpen((current) => !current)}
        />

        {searchOpen ? (
          <div className="inline-search-panel">
            <SearchForm initialQuery={experience.query} submitLabel="应用新搜索" compact />
          </div>
        ) : null}

        {experience.route ? (
          <>
            <CalendarStrip
              items={experience.calendarItems}
              selectedDate={experience.selectedCalendarDate}
              onSelect={(date) => commitQuery({ departDate: date })}
            />

            <section className="results-panel">
              <FilterBar query={experience.query} onChange={commitQuery} />
              <SortSwitch sort={experience.query.sort} onChange={updateSort} />

              {experience.flights.length > 0 ? (
                <div className="flight-list">
                  {experience.flights.map((flight, index) => (
                    <FlightCard
                      key={flight.flightId}
                      flight={flight}
                      rank={index + 1}
                      sort={experience.query.sort}
                      onOpen={() => setSelectedFlightId(flight.flightId)}
                    />
                  ))}
                </div>
              ) : (
                <section className="empty-state">
                  <span className="section-label">无结果状态</span>
                  <h2>当前筛选下没有合适特价</h2>
                  <p>可以放宽条件、切换低价日历日期，或者回首页查看固定热门推荐。</p>
                  <div className="chip-row">
                    <button type="button" className="secondary-button" onClick={() => commitQuery({ baggage: "any", flexibility: "any", hideRisk: false, stops: "any", time: "any" })}>
                      清空筛选
                    </button>
                    <button type="button" className="secondary-button" onClick={() => commitQuery({ departDate: experience.calendarItems[4]?.date ?? experience.selectedCalendarDate })}>
                      试试更低价的一天
                    </button>
                  </div>
                </section>
              )}
            </section>
          </>
        ) : (
          <section className="empty-state empty-state--wide">
            <span className="section-label">无结果状态</span>
            <h2>当前城市组合没有预置演示数据</h2>
            <p>v1 只固定了 8 条航线。你可以直接回到首页，或者从下面 6 张热门推荐卡片里继续演示。</p>
            <div className="deal-grid">
              {featuredDeals.map((deal) => (
                <Link key={deal.dealId} href={buildResultsHref(deal.targetQuery)} className="deal-card">
                  <div className="deal-card__header">
                    <div>
                      <span className="deal-card__kicker">快速回到主链路</span>
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
    </main>
  );
}
