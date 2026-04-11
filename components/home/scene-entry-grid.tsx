import Link from "next/link";
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
            <div className="scene-card__top">
              <span className="scene-card__badge">发现入口</span>
              <span className="scene-card__count">覆盖 {scene.routeIds.length} 条航线</span>
            </div>

            <div className="scene-card__body">
              <h3>{scene.title}</h3>
              <p>{scene.subtitle}</p>
            </div>
          </div>

          <div className="scene-card__footer">
            <div className="scene-card__routes">
              {scene.routeIds.map((routeId) => (
                <span key={routeId}>{routeId.replaceAll("_", " · ")}</span>
              ))}
            </div>
            <div className="scene-card__bottom">
              <span className="scene-card__hint">这组入口更适合先看机会，再判断代价</span>
              <span className="scene-card__action">进入这组低价 →</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
