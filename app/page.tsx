import Link from "next/link";
import { FeaturedDealsGrid } from "@/components/home/featured-deals-grid";
import { SceneEntryGrid } from "@/components/home/scene-entry-grid";
import { SearchForm } from "@/components/home/search-form";
import { DEFAULT_QUERY, HOME_HEADLINE, HOME_TAGLINE, PRODUCT_NAME } from "@/lib/constants";
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
              <small>特价发现平台</small>
            </span>
          </Link>
          <div className="topbar__note">已校验演示航线</div>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker">{HOME_TAGLINE}</span>
            <h1>{HOME_HEADLINE}</h1>
            <p>
              这里不是普通搜机票。你会先看到近期值得点开的低价机会，再快速看清它到底便宜在哪，
              代价又落在托运、退改签还是中转体验上。
            </p>

            <div className="hero-points">
              <span>先看机会，再决定值不值得买</span>
              <span>总价透明，不只看裸票价</span>
              <span>规则和风险会直接讲清</span>
            </div>

            <div className="hero-insight-card">
              <div className="hero-insight-card__header">
                <div>
                  <span className="section-label">记忆点</span>
                  <h2>最便宜，不一定最划算</h2>
                </div>
                <p>{DEFAULT_QUERY.from} → {DEFAULT_QUERY.to} 的固定演示航线，正好能看见这件事。</p>
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
              submitLabel="开始看结果"
              eyebrow="搜索一条航线"
              title="搜一条线，立刻进入“最便宜 / 最划算”对比"
              description="默认演示航线已经预置好。你也可以直接换城市和日期，继续用同样的判断方式看票。"
              signals={["支持直接搜", "结果页继续筛选", "详情抽屉解释代价"]}
              footerNote="进入结果页后，低价日历、风险筛选和规则解释都会保留在主链路里。"
            />
          </div>
        </div>

        <div className="hero-opportunity-rail">
          <div className="hero-opportunity-rail__copy">
            <span className="section-label">先逛也可以</span>
            <h3>这些低价机会，适合直接点进去看</h3>
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
            <span className="section-label">发现入口</span>
            <h2>先按出行情境进入，再看哪组低价真的值得点开</h2>
          </div>
          <p>这些入口不是“说明模块”，而是已经帮你收束好需求后的起点。每张卡片都代表一类真实的低价判断任务。</p>
        </div>
        <SceneEntryGrid scenes={scenes} />
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-label">值得先看</span>
            <h2>近期更容易出现“低价但需要判断”的航线</h2>
          </div>
          <p>不是把热门目的地堆出来，而是把更适合比较总价、规则和隐藏成本的机会先摆到台面上。</p>
        </div>
        <FeaturedDealsGrid deals={featuredDeals} />
      </section>

      <section className="content-section content-section--compact">
        <div className="disclaimer-card">
          <div>
            <span className="section-label">产品判断</span>
            <h3>看见低价，也要看懂低价为什么成立</h3>
          </div>
          <p>捡漏机票的角色不是替你下单，而是把价格、代价和适合人群摆清楚，让你在几秒内知道这张票值不值得继续看。</p>
          <div className="status-row">
            <span className="status-badge status-badge--neutral">发现机会</span>
            <span className="status-badge status-badge--positive">规则透明</span>
            <span className="status-badge status-badge--accent">判断值不值买</span>
          </div>
        </div>
      </section>
    </main>
  );
}
