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
              <span className="scene-card__badge">{scene.title}</span>
              <span className="scene-card__action">按这个场景找票</span>
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
            <span className="scene-card__hint">固定演示参数</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
