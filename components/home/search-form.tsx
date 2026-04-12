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
  submitLabel = "搜索特价航班",
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
          <span className="section-label">{eyebrow ?? (compact ? "重新搜索" : "探索航班")}</span>
          <h3>{title ?? (compact ? "调整您的搜索条件" : "搜索包含全部费用的真实特价")}</h3>
          <p className="search-form__description">
            {description ??
              (compact
                ? "更新条件，我们将继续为您比对真实性价比。"
                : "我们为您呈现的不仅仅是裸票价格，还会清楚展示行李、退改签等隐藏费用，助您理性决策。")}
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
            往返
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
        <p>{footerNote ?? (compact ? "应用新条件后，您仍可以使用当前视图比价。" : "我们将依据最佳性价比规则为您展示航班列表，支持多维度对比。")}</p>
        <button type="submit" className="primary-button primary-button--large">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
