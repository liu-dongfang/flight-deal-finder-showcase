import type { SearchQuery } from "@/lib/types";

interface FilterBarProps {
  query: SearchQuery;
  onChange: (patch: Partial<SearchQuery>) => void;
}

const timeOptions = [
  { label: "不限", value: "any" },
  { label: "清晨", value: "early" },
  { label: "白天", value: "day" },
  { label: "晚间", value: "evening" },
  { label: "红眼", value: "red_eye" }
] as const;

const stopOptions = [
  { label: "不限", value: "any" },
  { label: "仅直飞", value: "direct" },
  { label: "可中转", value: "one_stop" }
] as const;

const baggageOptions = [
  { label: "不限", value: "any" },
  { label: "含托运", value: "checked" },
  { label: "仅随身", value: "carry_only" }
] as const;

const flexibilityOptions = [
  { label: "不限", value: "any" },
  { label: "更好改签", value: "flexible" },
  { label: "严格退改", value: "strict" }
] as const;

function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: T;
  options: ReadonlyArray<{ label: string; value: T }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="filter-group">
      <span>{label}</span>
      <div className="filter-pills">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value === option.value ? "is-active" : ""}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FilterBar({ query, onChange }: FilterBarProps) {
  const activeFilterCount = [
    query.time !== "any",
    query.stops !== "any",
    query.baggage !== "any",
    query.flexibility !== "any",
    query.hideRisk
  ].filter(Boolean).length;

  return (
    <div className="filter-bar">
      <div className="filter-bar__header">
        <div className="filter-bar__title">
          <span className="section-label">筛选工具</span>
          <p>
            {activeFilterCount > 0
              ? `已启用 ${activeFilterCount} 项筛选。先避开不想承受的代价，再比较价格差值。`
              : "先收掉不想承受的代价，再比较哪一张更划算。"}
          </p>
        </div>
        <button
          type="button"
          className={`risk-toggle ${query.hideRisk ? "is-active" : ""}`}
          aria-pressed={query.hideRisk}
          onClick={() => onChange({ hideRisk: !query.hideRisk })}
        >
          {query.hideRisk ? "已避开高代价航班" : "避开高代价航班"}
        </button>
      </div>

      <div className="filter-bar__groups">
        <FilterGroup
          label="出发时段"
          value={query.time}
          options={timeOptions}
          onChange={(value) => onChange({ time: value })}
        />
        <FilterGroup
          label="中转方式"
          value={query.stops}
          options={stopOptions}
          onChange={(value) => onChange({ stops: value })}
        />
        <FilterGroup
          label="行李权益"
          value={query.baggage}
          options={baggageOptions}
          onChange={(value) => onChange({ baggage: value })}
        />
        <FilterGroup
          label="退改签"
          value={query.flexibility}
          options={flexibilityOptions}
          onChange={(value) => onChange({ flexibility: value })}
        />
      </div>
    </div>
  );
}
