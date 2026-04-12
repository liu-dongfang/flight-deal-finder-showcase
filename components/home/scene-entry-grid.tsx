"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/lib/data/routes";
import type { SceneRecord } from "@/lib/types";
import { buildResultsHref } from "@/lib/utils/query";

export function SceneEntryGrid({ scenes }: { scenes: SceneRecord[] }) {
  const [activeTab, setActiveTab] = useState(scenes[0]?.sceneId ?? "");
  const activeScene = scenes.find((s) => s.sceneId === activeTab) ?? scenes[0];

  return (
    <div>
      <div className="scene-tab-nav">
        {scenes.map((scene) => (
          <button
            key={scene.sceneId}
            type="button"
            className={`scene-tab-btn${scene.sceneId === activeTab ? " is-active" : ""}`}
            onClick={() => setActiveTab(scene.sceneId)}
          >
            {scene.title}
          </button>
        ))}
      </div>

      {activeScene && (
        <div className="scene-tab-pane">
          <p className="scene-tab-pane__subtitle">{activeScene.subtitle}</p>
          <div className="opp-grid">
            {activeScene.routeIds.slice(0, 3).map((routeId) => {
              const r = routes.find((rt) => rt.routeId === routeId);
              if (!r) return null;
              const fromPrice = r.typicalPriceRange.split(" - ")[0] ?? r.typicalPriceRange;
              return (
                <Link
                  key={routeId}
                  href={buildResultsHref({
                    ...activeScene.presetQuery,
                    from: r.originCity,
                    to: r.destinationCity
                  })}
                  className="opp-card"
                >
                  <div className="opp-card__route">
                    {r.originCity} → {r.destinationCity}
                  </div>
                  <div className="opp-card__price">{fromPrice}起</div>
                  <p className="opp-card__note">{r.heroLabel}</p>
                  <span className="opp-card__cta">查看机会 →</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
