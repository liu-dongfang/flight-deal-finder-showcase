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
      <div>
        <span className="section-label">视图切换</span>
        <h2>把“最低价”和“最划算”明确分开</h2>
      </div>
      <div className="sort-switch__buttons">
        <button
          type="button"
          className={sort === "cheapest" ? "is-active" : ""}
          onClick={() => onChange("cheapest")}
        >
          最便宜
        </button>
        <button
          type="button"
          className={sort === "best_value" ? "is-active" : ""}
          onClick={() => onChange("best_value")}
        >
          最划算
        </button>
      </div>
      <p>{sort === "cheapest" ? "按含税总价升序。" : "按固定公式计算的 bestValueScore 排序。"}</p>
    </div>
  );
}
