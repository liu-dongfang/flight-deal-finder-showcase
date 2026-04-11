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
      <div className="sort-switch__copy">
        <span className="section-label">核心判断</span>
        <h2>先决定你现在要找最低价，还是找更划算</h2>
        <p>最低价优先看总价，最划算会同时考虑直飞、中转、行李和退改签。</p>
      </div>

      <div className="sort-switch__buttons">
        <button
          type="button"
          className={`sort-option ${sort === "cheapest" ? "is-active" : ""}`}
          onClick={() => onChange("cheapest")}
        >
          <strong>最便宜</strong>
          <span>先把总价压到最低，再看代价能不能接受。</span>
        </button>
        <button
          type="button"
          className={`sort-option ${sort === "best_value" ? "is-active" : ""}`}
          onClick={() => onChange("best_value")}
        >
          <strong>最划算</strong>
          <span>更适合要兼顾托运、退改签和稳定性的判断。</span>
        </button>
      </div>
    </div>
  );
}
