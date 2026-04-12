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

const DATE_MODES: { value: DateMode; label: string; desc: string }[] = [
  { value: "exact", label: "精准日期", desc: "指定日期" },
  { value: "flexible_week", label: "灵活一周", desc: "±3 天" },
  { value: "flexible_month", label: "灵活整月", desc: "最低价日" }
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

  return (
    <form className={`search-form ${compact ? "search-form--compact" : ""}`} onSubmit={handleSubmit}>

      {/* ── 区域 1：顶部 — 标题 + 模式切换 ── */}
      <div className="search-form__header">
        <div className="search-form__heading">
          <h2>{title ?? (compact ? "调整搜索" : "搜索航线")}</h2>
          {!compact && (
            <p className="search-form__tagline">
              {description ?? "同时给你最低价和更划算方案，帮你看清真实出行成本。"}
            </p>
          )}
        </div>
        {/* Segmented: 单程 / 往返 */}
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

      {signals && signals.length > 0 && (
        <div className="search-form__signal-row">
          {signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      )}

      {/* ── 区域 2：中部 — 字段区 ── */}
      <div className="search-form__fields">
        <div className="search-grid">

          {/* 航线分组 */}
          {!compact && <span className="field-group-header">航线</span>}

          <label className="field field--from">
            <span className="field__label">出发地</span>
            <select value={form.from} onChange={(e) => updateField("from", e.target.value)}>
              {originCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>

          <label className="field field--to">
            <span className="field__label">目的地</span>
            <select value={form.to} onChange={(e) => updateField("to", e.target.value)}>
              {destinationCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>

          {/* 日期分组 */}
          {!compact && <span className="field-group-header">日期</span>}

          {!compact && (
            <div className="field field--date-mode">
              <div className="date-mode-switch">
                {DATE_MODES.map((mode) => (
                  <button
                    key={mode.value}
                    type="button"
                    className={`date-mode-btn${dateMode === mode.value ? " is-active" : ""}`}
                    onClick={() => setDateMode(mode.value)}
                  >
                    <span className="date-mode-btn__label">{mode.label}</span>
                    <span className="date-mode-btn__desc">{mode.desc}</span>
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
              onChange={(e) => updateField("departDate", e.target.value)}
            />
          </label>

          <label className="field field--return">
            <span className="field__label">返程日期</span>
            <input
              type="date"
              min={CALENDAR_WINDOW_START}
              max={CALENDAR_WINDOW_END}
              value={form.returnDate}
              onChange={(e) => updateField("returnDate", e.target.value)}
            />
          </label>

          <label className="field field--passengers">
            <span className="field__label">
              人数
              <small>最多 4 人</small>
            </span>
            <select
              value={String(form.passengers)}
              onChange={(e) => updateField("passengers", Number(e.target.value))}
            >
              <option value="1">1 人</option>
              <option value="2">2 人</option>
              <option value="3">3 人</option>
              <option value="4">4 人</option>
            </select>
          </label>
        </div>
      </div>

      {/* ── 区域 3：底部 — 预算 + 动作 ── */}
      {!compact && (
        <div className="search-form__budget-section">
          <div className="budget-row">
            <div className="budget-row__header">
              <span className="budget-row__label">预算上限</span>
              <span className="budget-row__values">¥{budget.toLocaleString()}</span>
            </div>
            <div className="budget-row__track">
              <input
                type="range"
                className="budget-slider"
                min={400}
                max={5000}
                step={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                aria-label="预算上限"
              />
              <div className="budget-row__range-labels">
                <span>¥400</span>
                <span>¥5,000</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="search-form__footer search-form__footer--plain">
        <p>{footerNote ?? (compact ? "应用后继续比较结果。" : "进入结果页后，可按时段、行李和退改继续筛选。")}</p>
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
