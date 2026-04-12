"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { PRODUCT_NAME } from "@/lib/constants";
import { DEFAULT_QUERY } from "@/lib/constants";
import { buildResultsHref } from "@/lib/utils/query";
import { PriceRulesModal } from "./price-rules-modal";

const startHref = buildResultsHref(DEFAULT_QUERY);

export function NavBar() {
  const [activeSection, setActiveSection] = useState("");
  const [rulesOpen, setRulesOpen] = useState(false);
  /* portal 只能在挂载后使用（避免 SSR document 报错） */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const ids = ["daily-best", "scene-section"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-64px 0px -40% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="nav-bar">
        {/* 左：Logo */}
        <Link href="/" className="nav-bar__brand">
          <span className="nav-bar__logo-dot" aria-hidden="true" />
          <span className="nav-bar__brand-text">
            <strong>{PRODUCT_NAME}</strong>
            <small>特价机票</small>
          </span>
        </Link>

        {/* 中：页面导航 */}
        <nav className="nav-bar__nav" aria-label="页面导航">
          <a
            href="#daily-best"
            className={`nav-bar__link${activeSection === "daily-best" ? " is-active" : ""}`}
          >
            今日机会
          </a>
          <a
            href="#scene-section"
            className={`nav-bar__link${activeSection === "scene-section" ? " is-active" : ""}`}
          >
            场景探索
          </a>
        </nav>

        {/* 右：辅助行动 */}
        <div className="nav-bar__actions">
          <button
            type="button"
            className="nav-bar__rule-btn"
            onClick={() => setRulesOpen(true)}
          >
            价格说明
          </button>
          <Link href={startHref} className="nav-bar__cta">
            开始找机会
          </Link>
        </div>
      </header>

      {/* 用 createPortal 渲染 modal 到 body，规避 backdrop-filter 产生的 containing block */}
      {mounted && createPortal(
        <PriceRulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />,
        document.body
      )}
    </>
  );
}
