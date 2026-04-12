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

  /* prefers-reduced-motion: 三条并列静态展示 */
  if (reducedMotion) {
    return (
      <div className="signal-strip signal-strip--static">
        {SIGNALS.map((s, i) => (
          <div key={i} className={`signal-item signal-item--${s.color}`}>
            <span className="signal-item__badge">{s.badge}</span>
            <span className="signal-item__text">{s.text}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="signal-strip"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="signal-live-dot" aria-hidden="true" />

      {/* 旋转区域：CSS Grid 叠层，只有 is-active 项可见 */}
      <div className="signal-stage" aria-live="polite" aria-atomic="true">
        {SIGNALS.map((s, i) => (
          <div
            key={i}
            className={`signal-item signal-item--${s.color}${i === activeIdx ? " is-active" : ""}`}
            aria-hidden={i !== activeIdx}
          >
            <span className="signal-item__badge">{s.badge}</span>
            <span className="signal-item__text">{s.text}</span>
          </div>
        ))}
      </div>

      {/* 进度指示点 */}
      <div className="signal-dots" aria-hidden="true">
        {SIGNALS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`signal-dot${i === activeIdx ? " is-active" : ""}`}
            onClick={() => setActiveIdx(i)}
            tabIndex={-1}
          />
        ))}
      </div>
    </div>
  );
}
