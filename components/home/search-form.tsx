"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CALENDAR_WINDOW_END, CALENDAR_WINDOW_START, DEFAULT_QUERY } from "@/lib/constants";
import type { SearchQuery, TripType } from "@/lib/types";
import { getDistinctDestinationCities, getDistinctOriginCities } from "@/lib/utils/flight-engine";
import { buildResultsHref } from "@/lib/utils/query";

interface SearchFormProps {
  initialQuery?: Partial<SearchQuery>;
  submitLabel?: string;
  compact?: boolean;
}

const originCities = getDistinctOriginCities();
const destinationCities = getDistinctDestinationCities();

export function SearchForm({
  initialQuery,
  submitLabel = "开始找票",
  compact = false
}: SearchFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<SearchQuery>({ ...DEFAULT_QUERY, ...initialQuery });

  useEffect(() => {
    setForm({ ...DEFAULT_QUERY, ...initialQuery });
  }, [initialQuery]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      router.push(buildResultsHref(form));
    });
  }

  function updateField<Key extends keyof SearchQuery>(key: Key, value: SearchQuery[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateTripType(tripType: TripType) {
    setForm((current) => ({ ...current, tripType }));
  }

  return (
    <form className={`search-form ${compact ? "search-form--compact" : ""}`} onSubmit={handleSubmit}>
      <div className="search-form__header">
        <div>
          <span className="section-label">搜索区</span>
          <h3>{compact ? "修改搜索条件" : "从一个城市对开始，先把低价机会找出来"}</h3>
        </div>
        <div className="trip-switch">
          <button
            type="button"
            className={form.tripType === "one_way" ? "is-active" : ""}
            onClick={() => updateTripType("one_way")}
          >
            单程
          </button>
          <button
            type="button"
            className={form.tripType === "round_trip" ? "is-active" : ""}
            onClick={() => updateTripType("round_trip")}
          >
            往返参考
          </button>
        </div>
      </div>

      {!compact ? (
        <div className="search-form__signal-row">
          <span>固定 8 条演示航线</span>
          <span>单程主链路优先</span>
          <span>7 天低价观察窗</span>
        </div>
      ) : null}

      <div className="search-grid">
        <label className="field field--from">
          <span className="field__label">出发地</span>
          <select value={form.from} onChange={(event) => updateField("from", event.target.value)}>
            {originCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label className="field field--to">
          <span className="field__label">目的地</span>
          <select value={form.to} onChange={(event) => updateField("to", event.target.value)}>
            {destinationCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label className="field field--depart">
          <span className="field__label">出发日期</span>
          <input
            type="date"
            min={CALENDAR_WINDOW_START}
            max={CALENDAR_WINDOW_END}
            value={form.departDate}
            onChange={(event) => updateField("departDate", event.target.value)}
          />
        </label>

        <label className="field field--return">
          <span className="field__label">
            返程日期
            <small>轻量展示</small>
          </span>
          <input
            type="date"
            min={CALENDAR_WINDOW_START}
            max={CALENDAR_WINDOW_END}
            value={form.returnDate}
            onChange={(event) => updateField("returnDate", event.target.value)}
          />
        </label>

        <label className="field field--passengers">
          <span className="field__label">
            人数
            <small>最多 4 人</small>
          </span>
          <select
            value={String(form.passengers)}
            onChange={(event) => updateField("passengers", Number(event.target.value))}
          >
            <option value="1">1 人</option>
            <option value="2">2 人</option>
            <option value="3">3 人</option>
            <option value="4">4 人</option>
          </select>
        </label>
      </div>

      <div className="search-form__footer">
        <p>返程日期在 v1 中只做轻量展示保留，不参与价格联动、排序、筛选和低价日历。</p>
        <button type="submit" className="primary-button">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
