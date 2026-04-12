"use client";

import { useEffect } from "react";
import type { FlightResult } from "@/lib/types";
import { formatDuration, formatPrice } from "@/lib/utils/date";
import {
  getDecisionBadgeTone,
  getFlightBenefits,
  getFlightDecisionHeadline,
  getFlightQuickTake,
  getFlightSuitableAudience,
  getFlightTradeoffs,
  getFlightUnsuitableAudience
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
  const benefits = getFlightBenefits(flight);
  const tradeoffs = getFlightTradeoffs(flight);
  const visibleBenefits =
    benefits.length > 0 ? benefits : ["这张票的主要优势仍在总价本身，其他权益比较中性。"];
  const visibleTradeoffs =
    tradeoffs.length > 0 ? tradeoffs : ["主要代价相对少，重点比较价格和起飞时段。"];

  return (
    <div className="drawer-overlay" role="presentation" onClick={onClose}>
      <aside className="drawer" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="drawer__header">
          <div>
            <span className="section-label">看清代价</span>
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
            <span className={`status-badge status-badge--${getDecisionBadgeTone(flight)}`}>{decisionHeadline}</span>
            <h3>{getFlightQuickTake(flight)}</h3>
            <p>{flight.aiReview.detail}</p>
          </div>

          <div className="drawer-hero__price">
            <strong>{formatPrice(flight.totalPrice)}</strong>
            <span>含税总价</span>
            <small>{flight.priceGapFromCheapest === 0 ? "当前最低价" : `比最低价高 ${formatPrice(flight.priceGapFromCheapest)}`}</small>
          </div>
        </section>

        <div className="drawer__body">
          <section className="drawer-card">
            <h3>你得到什么</h3>
            <ul className="detail-list detail-list--stacked">
              {visibleBenefits.map((item) => (
                <li key={item}>
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>
          </section>

          <section className="drawer-card">
            <h3>你付出的代价</h3>
            <ul className="detail-list detail-list--stacked">
              {visibleTradeoffs.map((item) => (
                <li key={item}>
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>
          </section>

          <section className="drawer-card">
            <h3>适合谁 / 不适合谁</h3>
            <ul className="detail-list">
              <li>
                <span>适合谁</span>
                <strong>{getFlightSuitableAudience(flight)}</strong>
              </li>
              <li>
                <span>不适合谁</span>
                <strong>{getFlightUnsuitableAudience(flight)}</strong>
              </li>
            </ul>
          </section>

          <section className="drawer-card">
            <h3>规则明细</h3>
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
              <li>
                <span>票价构成</span>
                <strong>
                  裸票 {formatPrice(flight.baseFare)} + 税费 {formatPrice(flight.taxFee)}
                </strong>
              </li>
              <li>
                <span>行李规则</span>
                <strong>
                  随身 {flight.carryOnBaggage} · 托运 {flight.checkedBaggage}
                </strong>
              </li>
              <li>
                <span>退改说明</span>
                <strong>{flight.refundPolicySummary}</strong>
              </li>
              {flight.stopCount > 0 ? (
                <li>
                  <span>中转提醒</span>
                  <strong>
                    {flight.isSelfTransfer ? "自助中转" : "非自助中转"} ·{" "}
                    {flight.isCrossTerminal ? "涉及跨航站楼" : "无需跨航站楼"} · 衔接 {flight.transferMinutes} 分钟
                  </strong>
                </li>
              ) : null}
            </ul>
          </section>
        </div>
      </aside>
    </div>
  );
}
