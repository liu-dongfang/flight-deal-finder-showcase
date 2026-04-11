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
  { label: "直飞", value: "direct" },
  { label: "1 次中转", value: "one_stop" }
] as const;

const baggageOptions = [
  { label: "不限", value: "any" },
  { label: "含托运", value: "checked" },
  { label: "仅随身", value: "carry_only" }
] as const;

const flexibilityOptions = [
  { label: "不限", value: "any" },
  { label: "较灵活", value: "flexible" },
  { label: "严格限制", value: "strict" }
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
  return (
    <div className="filter-bar">
      <div className="filter-bar__header">
        <div>
          <span className="section-label">顶部筛选</span>
          <p>优先排除规则不友好的低价票，再比较最低价与最划算的差异。</p>
        </div>
        <button
          type="button"
          className={`risk-toggle ${query.hideRisk ? "is-active" : ""}`}
          onClick={() => onChange({ hideRisk: !query.hideRisk })}
        >
          {query.hideRisk ? "已隐藏高风险航班" : "隐藏高风险航班"}
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
