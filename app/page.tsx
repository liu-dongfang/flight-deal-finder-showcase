import Link from "next/link";
import { FeaturedDealsGrid } from "@/components/home/featured-deals-grid";
import { SceneEntryGrid } from "@/components/home/scene-entry-grid";
import { SearchForm } from "@/components/home/search-form";
import { DEFAULT_QUERY, HOME_HEADLINE, PRODUCT_NAME } from "@/lib/constants";
import { featuredDeals } from "@/lib/data/featuredDeals";
import { scenes } from "@/lib/data/scenes";
import { formatPrice } from "@/lib/utils/date";
import { getResultsExperience } from "@/lib/utils/flight-engine";
import { buildResultsHref } from "@/lib/utils/query";
import { getBaggageBadge, getFlexibilityBadge } from "@/lib/utils/presentation";

export default function HomePage() {
  const heroExperience = getResultsExperience(DEFAULT_QUERY);
  const cheapestFlight = [...heroExperience.flightsBeforeFilters].sort(
    (left, right) => left.totalPrice - right.totalPrice
  )[0];
  const bestValueFlight = [...heroExperience.flightsBeforeFilters].sort((left, right) => {
    return (
      right.bestValueScore - left.bestValueScore ||
      left.totalPrice - right.totalPrice ||
      left.flightId.localeCompare(right.flightId)
    );
  })[0];
  const discoveryDeals = featuredDeals.slice(0, 3);
  const priceGap = bestValueFlight.totalPrice - cheapestFlight.totalPrice;
  const cheapestBaggageBadge = getBaggageBadge(cheapestFlight.checkedBaggage);
  const cheapestFlexibilityBadge = getFlexibilityBadge(cheapestFlight.changePolicyLevel);
  const bestValueBaggageBadge = getBaggageBadge(bestValueFlight.checkedBaggage);
  const bestValueFlexibilityBadge = getFlexibilityBadge(bestValueFlight.changePolicyLevel);

  return (
    <main className="page page-home">
      <section className="hero-shell">
        <header className="topbar">
          <Link href="/" className="brand-mark">
            <span className="brand-mark__dot" />
            <span>
              <strong>{PRODUCT_NAME}</strong>
              <small>深度机票比价与风险洞察</small>
            </span>
          </Link>
          <div className="topbar__note">近期值得关注的航线</div>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker">不仅找底价，更要看清底牌</span>
            <h1>{HOME_HEADLINE}</h1>
            <p>
              面对复杂的航司规则和隐藏陷阱，我们需要更聪明的决策工具。
              为您实时剥除隐藏附加费，还原出每一次出行的真实成本。买票不再碰运气。
            </p>

            <div className="hero-points">
              <span>✈️ 还原含税总成本</span>
              <span>🛡️ 深度扫描退改签限制</span>
              <span>⚖️ 多维度价值评分</span>
            </div>

            <div className="hero-insight-card">
              <div className="hero-insight-card__header">
                <div>
                  <span className="section-label">今日关注</span>
                  <h2>{DEFAULT_QUERY.from} 飞往 {DEFAULT_QUERY.to} 特价</h2>
                </div>
                <p>通过 {DEFAULT_QUERY.from} 飞往 {DEFAULT_QUERY.to} 的这条典型航线，为您对比最低裸价与最高性价比。</p>
              </div>

              <div className="hero-insight-grid">
                <article className="hero-compare-card">
                  <div className="hero-compare-card__top">
                    <span className="status-badge status-badge--accent">最便宜</span>
                    <strong>{formatPrice(cheapestFlight.totalPrice)}</strong>
                  </div>
                  <p>{cheapestFlight.aiReview.short}</p>
                  <div className="status-row">
                    <span className={`status-badge status-badge--${cheapestBaggageBadge.tone}`}>
                      {cheapestBaggageBadge.label}
                    </span>
                    <span className={`status-badge status-badge--${cheapestFlexibilityBadge.tone}`}>
                      {cheapestFlexibilityBadge.label}
                    </span>
                  </div>
                </article>

                <article className="hero-compare-card hero-compare-card--highlight">
                  <div className="hero-compare-card__top">
                    <span className="status-badge status-badge--positive">更值得买</span>
                    <strong>{formatPrice(bestValueFlight.totalPrice)}</strong>
                  </div>
                  <p>
                    多花 {formatPrice(priceGap)}，换来 {bestValueFlight.checkedBaggage} 托运和更友好的退改签。
                  </p>
                  <div className="status-row">
                    <span className={`status-badge status-badge--${bestValueBaggageBadge.tone}`}>
                      {bestValueBaggageBadge.label}
                    </span>
                    <span className={`status-badge status-badge--${bestValueFlexibilityBadge.tone}`}>
                      {bestValueFlexibilityBadge.label}
                    </span>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <SearchForm
              initialQuery={DEFAULT_QUERY}
              submitLabel="开启智能比价"
              eyebrow="下一站去哪"
              title="规划您的完美旅程"
              description="已经为你准备好一条典型样例。输入新目的地，剩下的计算交给我们。"
              signals={["行李额预警", "退改签评级", "转机风险提示"]}
            />
          </div>
        </div>

        <div className="hero-opportunity-rail">
          <div className="hero-opportunity-rail__copy">
            <span className="section-label">近期热门</span>
            <h3>全球精选特价榜单</h3>
          </div>

          <div className="hero-opportunity-rail__list">
            {discoveryDeals.map((deal) => (
              <Link key={deal.dealId} href={buildResultsHref(deal.targetQuery)} className="hero-opportunity-card">
                <div>
                  <span>{deal.title}</span>
                  <p>{deal.subtitle}</p>
                </div>
                <strong>{formatPrice(deal.fromPrice)}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-label">出游灵感</span>
            <h2>根据出行偏好发现超值组合</h2>
          </div>
          <p>无论您是倾向周末短途，还是正在物色长假的便宜直飞，这里都有经过智能精选的高优组合。</p>
        </div>
        <SceneEntryGrid scenes={scenes} />
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-label">特价推荐</span>
            <h2>本周极具性价比的航线发现</h2>
          </div>
          <p>基于当前票价与历史均价对比，这些航线正处于适合入手的价格区间。</p>
        </div>
        <FeaturedDealsGrid deals={featuredDeals} />
      </section>

      <section className="content-section content-section--compact">
        <div className="disclaimer-card">
          <div>
            <span className="section-label">我们的服务标准</span>
            <h3>致力于透明、可信的决策辅助</h3>
          </div>
          <p>我们将复杂的票价政策转化为清晰的对比指标，助您快速判断该航班是否适合您的出行需求。</p>
          <div className="status-row">
            <span className="status-badge status-badge--positive">数据真实</span>
            <span className="status-badge status-badge--positive">费用全透明</span>
            <span className="status-badge status-badge--positive">智能分析预警</span>
          </div>
        </div>
      </section>
    </main>
  );
}
