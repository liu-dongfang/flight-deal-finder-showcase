import type { SortMode } from "@/lib/types";

export function SortSwitch({
  sort,
  onChange
}: {
  sort: SortMode;
  onChange: (sort: SortMode) => void;
}) {
  return (
    <div className="sort-switch">
      <div className="sort-switch__buttons">
        <button
          type="button"
          className={`sort-option ${sort === "cheapest" ? "is-active" : ""}`}
          aria-pressed={sort === "cheapest"}
          onClick={() => onChange("cheapest")}
        >
          <strong>最便宜</strong>
          <span>先看总价</span>
        </button>
        <button
          type="button"
          className={`sort-option ${sort === "best_value" ? "is-active" : ""}`}
          aria-pressed={sort === "best_value"}
          onClick={() => onChange("best_value")}
        >
          <strong>更划算</strong>
          <span>兼顾规则</span>
        </button>
      </div>
    </div>
  );
}
