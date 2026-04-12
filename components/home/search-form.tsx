"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CALENDAR_WINDOW_END, CALENDAR_WINDOW_START, DEFAULT_QUERY } from "@/lib/constants";
import type { SearchQuery, TripType } from "@/lib/types";
import { getDistinctDestinationCities, getDistinctOriginCities } from "@/lib/utils/flight-engine";
import { buildResultsHref } from "@/lib/utils/query";

type DateMode = "exact" | "flexible_week" | "flexible_month";

interface SearchFormProps {
  initialQuery?: Partial<SearchQuery>;
  submitLabel?: string;
  compact?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  signals?: string[];
  footerNote?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
}

const originCities = getDistinctOriginCities();
const destinationCities = getDistinctDestinationCities();

const DATE_MODES: { value: DateMode; label: string }[] = [
  { value: "exact", label: "精准日期" },
  { value: "flexible_week", label: "灵活一周" },
  { value: "flexible_month", label: "灵活整月" }
];

export function SearchForm({
  initialQuery,
  submitLabel = "开始找机会",
  compact = false,
  eyebrow,
  title,
  description,
  signals,
  footerNote,
  secondaryActionLabel,
  secondaryActionHref
}: SearchFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<SearchQuery>({ ...DEFAULT_QUERY, ...initialQuery });
  const [dateMode, setDateMode] = useState<DateMode>("exact");
  const [budget, setBudget] = useState(3000);

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
      {!compact && (
        <div className="search-form__header">
          <div className="search-form__heading">
            <span className="section-label">{eyebrow ?? "主搜索"}</span>
            <h3>{title ?? "开始找票"}</h3>
            <p className="search-form__description">
              {description ?? "选城市和日期，我们同时给你最低价和更划算的方案。"}
            </p>
          </div>
          <div className="trip-switch">
            <button
              type="button"
              className={form.tripType === "one_way" ? "is-active" : ""}
              aria-pressed={form.tripType === "one_way"}
              onClick={() => updateTripType("one_way")}
            >
              单程
            </button>
            <button
              type="button"
              className={form.tripType === "round_trip" ? "is-active" : ""}
              aria-pressed={form.tripType === "round_trip"}
              onClick={() => updateTripType("round_trip")}
            >
              往返
            </button>
          </div>
        </div>
      )}

      {compact && (
        <div className="search-form__header">
          <div className="search-form__heading">
            <span className="section-label">{eyebrow ?? "重新搜索"}</span>
            <h3>{title ?? "调整您的搜索条件"}</h3>
            <p className="search-form__description">
              {description ?? "更新条件，我们将继续为您比对真实性价比。"}
            </p>
          </div>
          <div className="trip-switch">
            <button
              type="button"
              className={form.tripType === "one_way" ? "is-active" : ""}
              aria-pressed={form.tripType === "one_way"}
              onClick={() => updateTripType("one_way")}
            >
              单程
            </button>
            <button
              type="button"
              className={form.tripType === "round_trip" ? "is-active" : ""}
              aria-pressed={form.tripType === "round_trip"}
              onClick={() => updateTripType("round_trip")}
            >
              往返
            </button>
          </div>
        </div>
      )}

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

        {!compact && (
          <div className="field field--date-mode">
            <span className="field__label">日期模式</span>
            <div className="date-mode-switch">
              {DATE_MODES.map((mode) => (
                <button
                  key={mode.value}
                  type="button"
                  className={`date-mode-btn${dateMode === mode.value ? " is-active" : ""}`}
                  onClick={() => setDateMode(mode.value)}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <label className={`field field--depart${compact ? "" : " field--depart-full"}`}>
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
          <span className="field__label">返程日期</span>
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

      {!compact && (
        <div className="budget-row">
          <div className="budget-row__header">
            <span className="budget-row__label">预算上限</span>
            <span className="budget-row__values">¥400 — ¥{budget.toLocaleString()}</span>
          </div>
          <input
            type="range"
            className="budget-slider"
            min={400}
            max={5000}
            step={100}
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
            aria-label="预算上限"
          />
        </div>
      )}

      <div className="search-form__footer search-form__footer--plain">
        <p>{footerNote ?? (compact ? "应用新条件后，您仍可以使用当前视图比价。" : "进入结果页后，可继续按时段、行李和退改筛选。")}</p>
        <div className="search-form__actions">
          {secondaryActionLabel && secondaryActionHref ? (
            <Link href={secondaryActionHref} className="secondary-button">
              {secondaryActionLabel}
            </Link>
          ) : null}
          <button type="submit" className="primary-button primary-button--large">
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
