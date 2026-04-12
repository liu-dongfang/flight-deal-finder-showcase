"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PRODUCT_NAME } from "@/lib/constants";
import { DEFAULT_QUERY } from "@/lib/constants";
import { buildResultsHref } from "@/lib/utils/query";

const rulesHref = buildResultsHref(DEFAULT_QUERY);

export function NavBar() {
  const [activeSection, setActiveSection] = useState("");

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
    <header className="nav-bar">
      <Link href="/" className="nav-bar__brand">
        <span className="nav-bar__logo-dot" aria-hidden="true" />
        <span className="nav-bar__brand-text">
          <strong>{PRODUCT_NAME}</strong>
          <small>特价机票</small>
        </span>
      </Link>

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

      <div className="nav-bar__actions">
        <Link href={rulesHref} className="nav-bar__rule-btn">
          查看低价规则
        </Link>
      </div>
    </header>
  );
}
