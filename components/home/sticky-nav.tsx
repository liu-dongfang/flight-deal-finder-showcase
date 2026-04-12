"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PRODUCT_NAME } from "@/lib/constants";

export function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 440);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = ["daily-best", "scene-section"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`sticky-nav${visible ? " sticky-nav--visible" : ""}`}
      aria-label="页面导航"
      aria-hidden={!visible}
    >
      <Link href="/" className="sticky-nav__brand">
        <span className="sticky-nav__dot" aria-hidden="true" />
        <strong>{PRODUCT_NAME}</strong>
      </Link>

      <ul className="sticky-nav__links">
        <li>
          <a
            href="#daily-best"
            className={`sticky-nav__link${active === "daily-best" ? " is-active" : ""}`}
          >
            今日机会
          </a>
        </li>
        <li>
          <a
            href="#scene-section"
            className={`sticky-nav__link${active === "scene-section" ? " is-active" : ""}`}
          >
            场景探索
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="sticky-nav__top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        tabIndex={visible ? 0 : -1}
      >
        ↑ 返回顶部
      </button>
    </nav>
  );
}
