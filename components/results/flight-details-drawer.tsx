"use client";

import { useEffect } from "react";
import type { FlightResult } from "@/lib/types";
import { formatDuration, formatPrice } from "@/lib/utils/date";

export function FlightDetailsDrawer({
  flight,
  onClose
}: {
  flight: FlightResult | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!flight) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [flight, onClose]);

  if (!flight) {
    return null;
  }

  return (
    <div className="drawer-overlay" role="presentation" onClick={onClose}>
      <aside className="drawer" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="drawer__header">
          <div>
            <span className="section-label">规则详情</span>
            <h2>
              {flight.route.originCity} → {flight.route.destinationCity}
            </h2>
            <p>
              {flight.airlineName} {flight.flightNumber} · {formatPrice(flight.totalPrice)}
            </p>
          </div>
          <button type="button" className="drawer__close" onClick={onClose}>
            关闭
          </button>
        </div>

        <section className="drawer-section drawer-section--risk">
          <h3>风险提醒</h3>
          <div className="chip-row">
            {flight.labels.length > 0 ? (
              flight.labels.map((label) => (
                <span key={label} className="chip">
                  {label}
                </span>
              ))
            ) : (
              <span className="chip chip--soft">当前未命中高风险标签</span>
            )}
          </div>
        </section>

        <div className="drawer__body">
          <section className="drawer-section drawer-section--overview">
            <h3>航班概览</h3>
            <ul className="detail-list">
              <li>
                <span>起降时间</span>
                <strong>
                  {flight.departTimeLocal} - {flight.arriveTimeLocal}
                </strong>
              </li>
              <li>
                <span>飞行时长</span>
                <strong>{formatDuration(flight.durationMinutes)}</strong>
              </li>
              <li>
                <span>中转情况</span>
                <strong>{flight.stopSummary}</strong>
              </li>
            </ul>
          </section>

          <section className="drawer-section drawer-section--ai">
            <h3>AI 综合建议</h3>
            <p>{flight.aiReview.detail}</p>
          </section>

          <section className="drawer-section drawer-section--fare">
            <h3>票价构成</h3>
            <ul className="detail-list">
              <li>
                <span>裸票价</span>
                <strong>{formatPrice(flight.baseFare)}</strong>
              </li>
              <li>
                <span>税费</span>
                <strong>{formatPrice(flight.taxFee)}</strong>
              </li>
              <li>
                <span>行李附加费用提示</span>
                <strong>{flight.checkedBaggageFeeHint}</strong>
              </li>
            </ul>
          </section>

          <section className="drawer-section drawer-section--baggage">
            <h3>行李规则</h3>
            <ul className="detail-list">
              <li>
                <span>随身行李</span>
                <strong>{flight.carryOnBaggage}</strong>
              </li>
              <li>
                <span>托运行李</span>
                <strong>{flight.checkedBaggage}</strong>
              </li>
            </ul>
          </section>

          <section className="drawer-section drawer-section--flex">
            <h3>退改签说明</h3>
            <ul className="detail-list">
              <li>
                <span>灵活度等级</span>
                <strong>
                  {flight.changePolicyLevel === "flexible"
                    ? "较灵活"
                    : flight.changePolicyLevel === "limited"
                      ? "有限改签"
                      : "严格限制"}
                </strong>
              </li>
              <li>
                <span>规则说明</span>
                <strong>{flight.refundPolicySummary}</strong>
              </li>
            </ul>
          </section>

          <section className="drawer-section drawer-section--transfer">
            <h3>中转说明</h3>
            <ul className="detail-list">
              <li>
                <span>是否自助中转</span>
                <strong>{flight.isSelfTransfer ? "是" : "否"}</strong>
              </li>
              <li>
                <span>是否跨航站楼</span>
                <strong>{flight.isCrossTerminal ? "是" : "否"}</strong>
              </li>
              <li>
                <span>衔接时长</span>
                <strong>{flight.stopCount === 0 ? "无需中转" : `${flight.transferMinutes} 分钟`}</strong>
              </li>
            </ul>
          </section>
        </div>
      </aside>
    </div>
  );
}
