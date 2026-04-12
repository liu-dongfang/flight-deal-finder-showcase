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

  const TripSwitch = (
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
  );

  return (
    <form className={`search-form ${compact ? "search-form--compact" : ""}`} onSubmit={handleSubmit}>
      {/* Console header: title + trip switch */}
      <div className="search-form__header">
        <div className="search-form__heading">
          <h2>{title ?? (compact ? "调整搜索" : "选城市和日期")}</h2>
          {!compact && (
            <p className="search-form__tagline">
              {description ?? "同时给你最低价和更划算的方案，帮你看清每张票的真实成本。"}
            </p>
          )}
          {compact && description && (
            <p className="search-form__description">{description}</p>
          )}
        </div>
        {TripSwitch}
      </div>

      {signals && signals.length > 0 ? (
        <div className="search-form__signal-row">
          {signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      ) : null}

      {/* Fields section */}
      <div className="search-form__fields">
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
              出行人数
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
      </div>

      {/* Budget slider — only on homepage */}
      {!compact && (
        <div className="search-form__budget-section">
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
        </div>
      )}

      {/* Actions */}
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
