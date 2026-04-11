import Link from "next/link";
import type { FeaturedDealRecord } from "@/lib/types";
import { formatPrice } from "@/lib/utils/date";
import { buildResultsHref } from "@/lib/utils/query";

export function FeaturedDealsGrid({ deals }: { deals: FeaturedDealRecord[] }) {
  return (
    <div className="deal-grid">
      {deals.map((deal) => (
        <Link key={deal.dealId} href={buildResultsHref(deal.targetQuery)} className="deal-card">
          <div className="deal-card__header">
            <div className="deal-card__copy">
              <span className="deal-card__kicker">机会卡</span>
              <h3>{deal.title}</h3>
              <p className="deal-card__insight">{deal.subtitle}</p>
            </div>
            <div className="deal-card__price">
              <span>低至</span>
              <strong>{formatPrice(deal.fromPrice)}</strong>
            </div>
          </div>
          <div className="deal-card__footer">
            <div className="deal-card__meta">
              <span>{deal.travelWindow}</span>
            </div>
            <div className="chip-row">
              {deal.highlightTags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            <div className="deal-card__cta">去结果页看这组票 →</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
