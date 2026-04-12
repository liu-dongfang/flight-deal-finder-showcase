"use client";

import { useEffect, useState } from "react";

const SIGNALS = [
  {
    badge: "低价窗口",
    text: "今日 4 条航线价格跌入近 30 天低点",
    color: "teal",
  },
  {
    badge: "改期建议",
    text: "上海→东京改到 05/17，最多省 ¥50",
    color: "orange",
  },
  {
    badge: "价格说明",
    text: "含税总价 · 已计入行李与主要退改因素",
    color: "neutral",
  },
] as const;

export function SignalStrip() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % SIGNALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [reducedMotion, paused]);

  /* prefers-reduced-motion：所有条目静态展示，grid-column/row auto 堆列 */
  const isStatic = reducedMotion;

  return (
    <div
      className={`signal-strip${isStatic ? " signal-strip--static" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 左：状态标签区 */}
      <div className="signal-strip__status">
        <span className="signal-live-dot" aria-hidden="true" />
        <span className="signal-strip__status-label">实时信号</span>
      </div>

      {/* 中：旋转 insight — CSS Grid 叠层（所有 item 占 grid-column:1/grid-row:1） */}
      <div className="signal-stage" aria-live="polite" aria-atomic="true">
        {SIGNALS.map((s, i) => (
          <div
            key={i}
            className={`signal-item signal-item--${s.color}${!isStatic && i === activeIdx ? " is-active" : ""}`}
            aria-hidden={!isStatic && i !== activeIdx}
          >
            <span className="signal-item__badge">{s.badge}</span>
            <span className="signal-item__text">{s.text}</span>
          </div>
        ))}
      </div>

      {/* 右：行动入口 */}
      <a href="#daily-best" className="signal-strip__cta">
        查看今日机会 →
      </a>
    </div>
  );
}
