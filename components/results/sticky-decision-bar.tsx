"use client";

import { useEffect, useState } from "react";
import { formatMonthDay, formatPrice } from "@/lib/utils/date";
import type { CalendarPriceItem, FlightResult } from "@/lib/types";

interface StickyDecisionBarProps {
  lowestPrice: number;
  bestValueFlight: FlightResult | null;
  bestCalendarItem: CalendarPriceItem | null;
}

export function StickyDecisionBar({
  lowestPrice,
  bestValueFlight,
  bestCalendarItem,
}: StickyDecisionBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!lowestPrice) return null;

  const savings =
    bestCalendarItem && lowestPrice > bestCalendarItem.lowestTotalPrice
      ? lowestPrice - bestCalendarItem.lowestTotalPrice
      : 0;

  /* 只有 bestValueFlight 与最低价不同时才展示"更划算"段 */
  const showBestValue =
    bestValueFlight != null && bestValueFlight.totalPrice !== lowestPrice;

  return (
    <div
      className={`decision-bar${visible ? " decision-bar--visible" : ""}`}
      aria-live="polite"
      aria-label="当前决策摘要"
    >
      <div className="decision-bar__inner">
        {/* 最低价 */}
        <div className="decision-bar__group">
          <span className="decision-bar__label">最低价</span>
          <span className="decision-bar__value decision-bar__value--price">
            {formatPrice(lowestPrice)}
          </span>
        </div>

        {/* 更划算 */}
        {showBestValue && (
          <>
            <div className="decision-bar__sep" aria-hidden="true" />
            <div className="decision-bar__group">
              <span className="decision-bar__label">更划算</span>
              <span className="decision-bar__value">
                {bestValueFlight!.flightNumber}&nbsp;{formatPrice(bestValueFlight!.totalPrice)}
              </span>
            </div>
          </>
        )}

        {/* 改期节省 */}
        {savings > 0 && bestCalendarItem && (
          <>
            <div className="decision-bar__sep" aria-hidden="true" />
            <div className="decision-bar__group decision-bar__group--orange">
              <span className="decision-bar__label">改期省</span>
              <span className="decision-bar__value">
                {formatMonthDay(bestCalendarItem.date)}&nbsp;{formatPrice(savings)}
              </span>
            </div>
          </>
        )}

        <button
          type="button"
          className="decision-bar__top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ 顶部比较
        </button>
      </div>
    </div>
  );
}
