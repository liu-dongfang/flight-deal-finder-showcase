import Link from "next/link";
import { DiscoveryForm } from "@/components/redesign/discovery-form";
import { Icon } from "@/components/redesign/icons";
import {
  featuredDeals,
  holidayRails,
  methodSteps,
  trackerRoutes,
  weekendRails
} from "@/lib/data/redesign";
import { buildResultsHref } from "@/lib/utils/query";

const primaryRouteHref = buildResultsHref({
  from: "上海",
  to: "东京",
  departDate: "2026-05-08",
  returnDate: "2026-05-12",
  tripType: "round_trip",
  sort: "best_value",
  scene: "weekly_report"
});

const quickLinks = [
  {
    label: "周末 · 日本含行李",
    href: buildResultsHref({
      from: "广州",
      to: "大阪",
      departDate: "2026-05-14",
      returnDate: "2026-05-19",
      tripType: "round_trip",
      sort: "best_value"
    })
  },
  {
    label: "五一 · 东南亚 ¥1500 内",
    href: buildResultsHref({
      from: "北京",
      to: "清迈",
      departDate: "2026-04-26",
      returnDate: "2026-05-03",
      tripType: "round_trip",
      sort: "cheapest"
    })
  },
  {
    label: "清明后 · 首尔新低",
    href: buildResultsHref({
      from: "杭州",
      to: "首尔",
      departDate: "2026-06-03",
      returnDate: "2026-06-08",
      tripType: "round_trip",
      sort: "cheapest"
    })
  }
];

function toneClass(tone: "amber" | "olive" | "rust") {
  return `tone-${tone}`;
}

export function HomePage() {
  return (
    <main className="editorial-site">
      <header className="editorial-topbar">
        <div className="brand-block">
          <Link href="/" className="brand-logo">
            <span className="brand-logo__mark">低飞</span>
            <span className="brand-logo__text">
              <strong>LOWFLY</strong>
              <small>编辑精选的特价机票发现平台</small>
            </span>
          </Link>
        </div>
        <nav className="editorial-nav">
          <a href="#editor-picks">今日特价</a>
          <a href="#tracker">航线追踪</a>
          <a href="#method">方法论</a>
        </nav>
        <div className="editorial-topbar__side">
          <span className="editorial-pill">追踪中 3 条航线</span>
          <Link href={primaryRouteHref} className="editorial-link">
            看样例结果
          </Link>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-meta">
              <span>第 47 期 · 2026.04.21</span>
              <span className="hero-meta__line" />
              <span>本周收录 142 张值得买的票</span>
            </div>
            <h1 className="hero-title">
              替你看清<span>真便宜</span>，
              <br />
              替你避开<span>假特价</span>。
            </h1>
            <p className="hero-description">
              我们不卖票。每天从 37 家航司和 6 家票代里挑出真正划算的航班，把行李费、改签费、
              红眼成本和不合理中转算进总成本，再告诉你这票到底值不值得买。
            </p>
          </div>

          <div className="hero-stats">
            <article>
              <strong>142 张</strong>
              <span>本周值得买</span>
              <small>过滤掉 68% 的假特价</small>
            </article>
            <article>
              <strong>¥580 起</strong>
              <span>最低往返样本</span>
              <small>上海 ⇄ 香港 · 5 月</small>
            </article>
            <article>
              <strong>37 家</strong>
              <span>覆盖航司</span>
              <small>含 12 家廉航</small>
            </article>
          </div>
        </div>

        <DiscoveryForm quickLinks={quickLinks} />
      </section>

      <section id="editor-picks" className="content-section">
        <div className="section-head">
          <div>
            <p className="section-kicker">编辑精选 · 本周六张值得下手的票</p>
            <h2>真便宜，不只是看起来便宜</h2>
            <p>
              每一张都经过价格百分位、真实总成本和规则风险三重检查。你看到的不只是低价，还有代价。
            </p>
          </div>
          <div className="section-chip-row">
            <span className="chip chip-dark">全部</span>
            <span className="chip">周末短飞</span>
            <span className="chip">五一假期</span>
            <span className="chip">含行李</span>
          </div>
        </div>

        <div className="deal-grid">
          {featuredDeals.map((deal) => (
            <article key={deal.id} className="deal-card">
              <div className="deal-card__top">
                <div>
                  <small>
                    {deal.airline} · {deal.dates}
                  </small>
                  <h3>{deal.route}</h3>
                </div>
                <span className={`deal-card__tag ${toneClass(deal.tagTone)}`}>{deal.tag}</span>
              </div>

              <div className="deal-card__price">
                <div>
                  <strong>¥{deal.price}</strong>
                  <span>¥{deal.basePrice}</span>
                </div>
                <em>比中位价低 {deal.drop}%</em>
              </div>

              <blockquote>{deal.pitch}</blockquote>

              <div className="deal-card__meta">
                <div>
                  <span>风险</span>
                  <p>{deal.risk}</p>
                </div>
                <div>
                  <span>适合谁</span>
                  <p>{deal.fit}</p>
                </div>
              </div>

              <div className="deal-card__footer">
                <div className="meter">
                  <div>
                    <div style={{ width: `${Math.max(8, deal.percentile)}%` }} />
                  </div>
                  <span>近 90 天最低 {deal.percentile}%</span>
                </div>
                <Link
                  href={buildResultsHref({
                    from: deal.fromCity,
                    to: deal.toCity,
                    departDate: "2026-05-08",
                    returnDate: "2026-05-12",
                    tripType: "round_trip",
                    sort: deal.tagTone === "olive" ? "best_value" : "cheapest"
                  })}
                >
                  查看详情
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="tracker" className="tracker-section">
        <div className="tracker-copy">
          <p className="section-kicker">航线追踪 · 降价自动告诉你</p>
          <h2>
            盯住一条航线，
            <br />
            比每天刷 6 个 App 有用。
          </h2>
          <p>
            告诉我们你想去哪、愿意花多少。降到目标价自动提醒，不推酒店，不推保险，不卖会员。
          </p>
          <Link href={primaryRouteHref} className="primary-button">
            去看结果页样例
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>

        <div className="tracker-panel">
          <div className="tracker-panel__head">
            <span>你正在追踪的 3 条航线</span>
            <small>09:42 更新</small>
          </div>
          <div className="tracker-list">
            {trackerRoutes.map((route) => (
              <article key={route.route} className="tracker-item">
                <div>
                  <h3>{route.route}</h3>
                  <p>{route.note}</p>
                </div>
                <div>
                  <span>当前 ¥{route.current}</span>
                  <small>目标 ¥{route.target}</small>
                </div>
                <strong className={route.weeklyTrend < 0 ? "trend-down" : "trend-up"}>
                  {route.weeklyTrend < 0 ? "↓" : "↑"} {Math.abs(route.weeklyTrend)}%
                </strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section compact-section">
        <div className="section-head">
          <div>
            <p className="section-kicker">周末说走就走</p>
            <h2>3 天能回来的亚洲目的地</h2>
          </div>
          <Link href={primaryRouteHref} className="section-action">
            查看全部 32 条
          </Link>
        </div>
        <div className="rail-grid">
          {weekendRails.map((item) => (
            <Link
              key={`${item.fromCity}-${item.toCity}`}
              href={buildResultsHref({
                from: item.fromCity,
                to: item.toCity,
                departDate: "2026-05-08",
                returnDate: "2026-05-12",
                tripType: "round_trip",
                sort: "best_value"
              })}
              className="rail-card"
            >
              <small>从 {item.fromCity}</small>
              <strong>{item.toCity}</strong>
              <div>
                <span>¥{item.price}</span>
                <em>↓ {item.drop}%</em>
              </div>
              {item.tag ? <b>{item.tag}</b> : null}
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section compact-section">
        <div className="section-head">
          <div>
            <p className="section-kicker">五一假期 · 最后 9 天</p>
            <h2>还没崩盘的东南亚往返</h2>
          </div>
          <span className="section-warning">编辑判断：五一前涨价概率 87%</span>
        </div>
        <div className="rail-grid">
          {holidayRails.map((item) => (
            <Link
              key={`${item.fromCity}-${item.toCity}`}
              href={buildResultsHref({
                from: item.fromCity,
                to: item.toCity,
                departDate: "2026-04-26",
                returnDate: "2026-05-03",
                tripType: "round_trip",
                sort: "cheapest"
              })}
              className="rail-card"
            >
              <small>从 {item.fromCity}</small>
              <strong>{item.toCity}</strong>
              <div>
                <span>¥{item.price}</span>
                <em>↓ {item.drop}%</em>
              </div>
              {item.tag ? <b>{item.tag}</b> : null}
            </Link>
          ))}
        </div>
      </section>

      <section id="method" className="content-section method-section">
        <div className="section-head">
          <div>
            <p className="section-kicker">方法论</p>
            <h2>我们怎么判断一张票是真便宜</h2>
          </div>
        </div>
        <div className="method-grid">
          {methodSteps.map((step, index) => (
            <article key={step.title} className="method-card">
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
