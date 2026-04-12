import Link from "next/link";
import type { FeaturedDealRecord } from "@/lib/types";
import { formatPrice } from "@/lib/utils/date";
import { buildResultsHref } from "@/lib/utils/query";

export function FeaturedDealsGrid({ deals }: { deals: FeaturedDealRecord[] }) {
  return (
    <div className="deal-grid">
      {deals.map((deal) => (
        <Link key={deal.dealId} href={buildResultsHref(deal.targetQuery)} className="deal-card">
          <div className="deal-card__topline">
            <div className="deal-card__copy">
              <h3>{deal.title}</h3>
              <div className="deal-card__meta">{deal.travelWindow}</div>
            </div>
            <div className="deal-card__price">
              <span>最低价</span>
              <strong>{formatPrice(deal.fromPrice)}</strong>
            </div>
          </div>
          <div className="chip-row">
            {deal.highlightTags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
          <p className="deal-card__insight">{deal.subtitle}</p>
          <div className="deal-card__cta">去看这组票</div>
        </Link>
      ))}
    </div>
  );
}
