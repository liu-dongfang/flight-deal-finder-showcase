import Link from "next/link";
import { FeaturedDealsGrid } from "@/components/home/featured-deals-grid";
import { SceneEntryGrid } from "@/components/home/scene-entry-grid";
import { SearchForm } from "@/components/home/search-form";
import { DEFAULT_QUERY, HOME_DESCRIPTION, HOME_HEADLINE, HOME_TAGLINE, PRODUCT_NAME } from "@/lib/constants";
import { featuredDeals } from "@/lib/data/featuredDeals";
import { scenes } from "@/lib/data/scenes";

export default function HomePage() {
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
          <div className="topbar__note">演示型产品，不含真实下单与支付</div>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker">{HOME_TAGLINE}</span>
            <h1>{HOME_HEADLINE}</h1>
            <p>{HOME_DESCRIPTION}</p>

            <div className="hero-stats">
              <div className="stat-card">
                <strong>8</strong>
                <span>精选航线</span>
              </div>
              <div className="stat-card">
                <strong>32</strong>
                <span>固定 mock 航班</span>
              </div>
              <div className="stat-card">
                <strong>7 天</strong>
                <span>低价观察窗</span>
              </div>
            </div>

            <div className="hero-points">
              <span>发现优先</span>
              <span>总价透明</span>
              <span>规则解释先行</span>
            </div>
          </div>

          <div className="hero-panel">
            <SearchForm initialQuery={DEFAULT_QUERY} submitLabel="开始找票" />
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-label">四个固定场景</span>
            <h2>先从一个出行目标开始，不必先想清楚搜索词</h2>
          </div>
          <p>场景入口会直接带入 spec 里固定的单程演示参数，保证演示可控且稳定复现。</p>
        </div>
        <SceneEntryGrid scenes={scenes} />
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="section-label">热门特价推荐</span>
            <h2>首页不是空搜索框，而是一组可以直接点开的低价机会</h2>
          </div>
          <p>每张卡片都直连结果页，方便快速比较“最低价”和“最划算”的差异。</p>
        </div>
        <FeaturedDealsGrid deals={featuredDeals} />
      </section>

      <section className="content-section content-section--compact">
        <div className="disclaimer-card">
          <div>
            <span className="section-label">产品定位</span>
            <h3>它解决的是“找得到、看得懂、敢不敢买”</h3>
          </div>
          <p>
            这个 demo 不模拟真实购票流程，而是把低价票背后的行李、退改签、中转和风险条件解释清楚，
            让用户更快判断一张票值不值得买。
          </p>
        </div>
      </section>
    </main>
  );
}
