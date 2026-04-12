import Link from "next/link";
import { routes } from "@/lib/data/routes";
import type { SceneRecord } from "@/lib/types";
import { buildResultsHref } from "@/lib/utils/query";

export function SceneEntryGrid({ scenes }: { scenes: SceneRecord[] }) {
  return (
    <div className="scene-grid">
      {scenes.map((scene) => (
        <Link
          key={scene.sceneId}
          href={buildResultsHref(scene.presetQuery)}
          className={`scene-card scene-card--${scene.coverStyleToken}`}
        >
          <div className="scene-card__content">
            <div className="scene-card__header">
              <h3>{scene.title}</h3>
              <p>{scene.subtitle}</p>
            </div>

            <div className="scene-card__routes-list">
              {scene.routeIds.map((routeId) => {
                const r = routes.find((rt) => rt.routeId === routeId);
                if (!r) return null;
                return (
                  <div key={routeId} className="route-pill">
                    <span className="route-pill__name">{r.originCity} 飞 {r.destinationCity}</span>
                    <span className="route-pill__code">{r.originAirportCode}-{r.destinationAirportCode}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="scene-card__footer">
            <span className="scene-card__action">开始探索</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
