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
  eyebrow?: string;
  title?: string;
  description?: string;
  signals?: string[];
  footerNote?: string;
}

const originCities = getDistinctOriginCities();
const destinationCities = getDistinctDestinationCities();

export function SearchForm({
  initialQuery,
  submitLabel = "开始找票",
  compact = false,
  eyebrow,
  title,
  description,
  signals,
  footerNote
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
        <div className="search-form__heading">
          <span className="section-label">{eyebrow ?? (compact ? "修改搜索" : "搜索一条航线")}</span>
          <h3>{title ?? (compact ? "换一组条件继续判断" : "先搜一条航线，再判断它值不值得买")}</h3>
          <p className="search-form__description">
            {description ??
              (compact
                ? "修改后会带着当前的筛选和判断方式继续对比。"
                : "这里不是只给你最低裸价，还会把托运、退改签和中转代价一起摆出来。")}
          </p>
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

      {signals && signals.length > 0 ? (
        <div className="search-form__signal-row">
          {signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
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

      <div className="search-form__footer search-form__footer--plain">
        <p>{footerNote ?? (compact ? "保留当前的最便宜 / 最划算视图，再看新的航线结果。" : "默认主链路已预置，打开结果页后可直接比较“最便宜”和“最划算”。")}</p>
        <button type="submit" className="primary-button primary-button--large">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
