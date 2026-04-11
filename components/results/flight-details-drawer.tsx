"use client";

import { useEffect } from "react";
import type { FlightResult } from "@/lib/types";
import { formatDuration, formatPrice } from "@/lib/utils/date";
import {
  getBaggageBadge,
  getFareHint,
  getFlightDecisionHeadline,
  getFlightLabelTone,
  getFlightRiskSummary,
  getFlexibilityBadge,
  getFlexibilityHint,
  getTransferHint
} from "@/lib/utils/presentation";

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

  const decisionHeadline = getFlightDecisionHeadline(flight);
  const riskSummary = getFlightRiskSummary(flight);
  const baggageBadge = getBaggageBadge(flight.checkedBaggage);
  const flexibilityBadge = getFlexibilityBadge(flight.changePolicyLevel);

  return (
    <div className="drawer-overlay" role="presentation" onClick={onClose}>
      <aside className="drawer" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="drawer__header">
          <div>
            <span className="section-label">规则解释器</span>
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

        <section className="drawer-hero">
          <div className="drawer-hero__decision">
            <span className="status-badge status-badge--accent">首屏结论</span>
            <h3>{decisionHeadline}</h3>
            <p>{flight.aiReview.short}</p>
          </div>

          <div className="drawer-hero__price">
            <strong>{formatPrice(flight.totalPrice)}</strong>
            <span>含税总价</span>
            <small>{flight.stopSummary}</small>
          </div>
        </section>

        <section className="drawer-risk-strip">
          <div>
            <h3>主要代价</h3>
            <p>{riskSummary}</p>
          </div>
          <div className="status-row">
            <span className={`status-badge status-badge--${baggageBadge.tone}`}>{baggageBadge.label}</span>
            <span className={`status-badge status-badge--${flexibilityBadge.tone}`}>{flexibilityBadge.label}</span>
            {flight.labels.length > 0 ? (
              flight.labels.map((label) => (
                <span key={label} className={`status-badge status-badge--${getFlightLabelTone(label)}`}>
                  {label}
                </span>
              ))
            ) : (
              <span className="status-badge status-badge--positive">规则友好</span>
            )}
          </div>
        </section>

        <div className="drawer__body">
          <section className="drawer-card drawer-card--overview">
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
            <p className="drawer-card__hint">
              {flight.stopCount === 0
                ? "直飞，比较成本和适合人群最直接。"
                : "这张票的时间成本主要来自中转安排，需要连同行李和衔接一起判断。"}
            </p>
          </section>

          <section className="drawer-card drawer-card--fare">
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
            <p className="drawer-card__hint">{getFareHint(flight)}</p>
          </section>

          <section className="drawer-card drawer-card--baggage">
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
            <p className="drawer-card__hint">
              {flight.checkedBaggage === "0kg"
                ? "如果不是轻装出行，这部分会直接抬高你的真实总成本。"
                : "托运行李已经算进当前权益，不需要再额外脑补隐藏费用。"}
            </p>
          </section>

          <section className="drawer-card drawer-card--flex">
            <h3>退改签说明</h3>
            <ul className="detail-list">
              <li>
                <span>灵活度等级</span>
                <strong>{flexibilityBadge.label}</strong>
              </li>
              <li>
                <span>规则说明</span>
                <strong>{flight.refundPolicySummary}</strong>
              </li>
            </ul>
            <p className="drawer-card__hint">{getFlexibilityHint(flight)}</p>
          </section>

          <section className="drawer-card drawer-card--transfer">
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
            <p className="drawer-card__hint">{getTransferHint(flight)}</p>
          </section>

          <section className="drawer-card drawer-card--ai">
            <h3>AI 综合建议</h3>
            <p>{flight.aiReview.detail}</p>
          </section>
        </div>
      </aside>
    </div>
  );
}
