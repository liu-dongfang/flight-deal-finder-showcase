import Link from "next/link";
import { FeaturedDealsGrid } from "@/components/home/featured-deals-grid";
import { SceneEntryGrid } from "@/components/home/scene-entry-grid";
import { SearchForm } from "@/components/home/search-form";
import { DEFAULT_QUERY, HOME_DESCRIPTION, HOME_HEADLINE, HOME_TAGLINE, PRODUCT_NAME } from "@/lib/constants";
import { featuredDeals } from "@/lib/data/featuredDeals";
import { scenes } from "@/lib/data/scenes";
import { formatPrice } from "@/lib/utils/date";
import { getResultsExperience } from "@/lib/utils/flight-engine";
import { buildResultsHref } from "@/lib/utils/query";

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
  const heroExampleHref = buildResultsHref(DEFAULT_QUERY);
  const homepageScenes = scenes.slice(0, 4);
  const weeklyDeals = featuredDeals;

  return (
    <main className="page page-home">
      <section className="hero-shell">
        <header className="topbar">
          <Link href="/" className="brand-mark">
            <span className="brand-mark__dot" />
            <span>
              <strong>{PRODUCT_NAME}</strong>
              <small>{HOME_TAGLINE}</small>
            </span>
          </Link>
          <div className="topbar__note">本周低价已更新</div>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker">低价机会，每周更新</span>
            <h1>{HOME_HEADLINE}</h1>
            <p>{HOME_DESCRIPTION}</p>

            <div className="hero-points">
              <span>看清含税总价</span>
              <span>看懂行李与退改</span>
              <span>快速判断值不值得买</span>
            </div>

            <div className="hero-example-card">
              <div className="hero-example-card__header">
                <div>
                  <span className="section-label">今日先看</span>
                  <h2>
                    {DEFAULT_QUERY.from} → {DEFAULT_QUERY.to}
                  </h2>
                </div>
              </div>

              <div className="hero-example-card__grid">
                <article className="hero-example-stat">
                  <span>最低价</span>
                  <strong>{formatPrice(cheapestFlight.totalPrice)}</strong>
                </article>
                <article className="hero-example-stat hero-example-stat--highlight">
                  <span>更划算价</span>
                  <strong>{formatPrice(bestValueFlight.totalPrice)}</strong>
                </article>
              </div>

              <p className="hero-example-card__note">最低价不含托运且是红眼，更划算方案含托运、退改更从容。</p>

              <Link href={heroExampleHref} className="secondary-button hero-example-card__cta">
                先看这组票
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            <SearchForm
              initialQuery={DEFAULT_QUERY}
              submitLabel="开始找低价"
              eyebrow="主搜索"
              title="开始找票"
              description="选城市和日期，我们同时给你最低价和更划算的方案。"
              footerNote="进入结果页后，可继续按时段、行李和退改筛选。"
              secondaryActionLabel="先看本周机会"
              secondaryActionHref="#weekly-opportunities"
            />
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-label">场景发现</span>
            <h2>按场景找更值的特价票</h2>
          </div>
          <p>不知道去哪时，先从出行情境开始。</p>
        </div>
        <SceneEntryGrid scenes={homepageScenes} />
      </section>

      <section id="weekly-opportunities" className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-label">本周机会</span>
            <h2>本周值得看的低价机会</h2>
          </div>
          <p>这些航线目前价格有吸引力，但是否值得买，还要结合行李、时段和退改一起看。</p>
        </div>
        <FeaturedDealsGrid deals={weeklyDeals} />
      </section>
    </main>
  );
}
