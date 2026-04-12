import Link from "next/link";
import { DailyBestStrip } from "@/components/home/daily-best-strip";
import { NavBar } from "@/components/home/nav-bar";
import { SceneEntryGrid } from "@/components/home/scene-entry-grid";
import { SearchForm } from "@/components/home/search-form";
import { SignalStrip } from "@/components/home/signal-strip";
import { DEFAULT_QUERY } from "@/lib/constants";
import { scenes } from "@/lib/data/scenes";
import { buildResultsHref } from "@/lib/utils/query";

export default function HomePage() {
  const homepageScenes = scenes.slice(0, 4);
  const heroExampleHref = buildResultsHref(DEFAULT_QUERY);

  return (
    <>
      {/* 常驻顶栏 — 产品 chrome 层 */}
      <NavBar />

      <main className="page page-home">
        {/* Hero Shell */}
        <section className="hero-shell">
          {/* 两栏构图：左侧品牌文案 + 右侧搜索控制台 */}
          <div className="hero-stage">
            <div className="hero-copy">
              <div className="hero-copy__primary">
                <span className="hero-kicker">发现机会 · 看清代价 · 做出决策</span>
                <h1>开始找真正值得买的机票</h1>
                <p>先看低价，再看代价，再决定现在买不买。</p>
              </div>
              <div className="hero-points">
                <span>含税总价</span>
                <span className="hero-point--teal">低价日历</span>
                <span className="hero-point--blue">AI 决策建议</span>
              </div>
              <div className="hero-hint-row">
                <span className="hero-hint-badge">改期提示</span>
                <span className="hero-hint-text">改到本月最低日，最多省 ¥1,800</span>
              </div>
            </div>

            <div className="hero-panel">
              <SearchForm
                initialQuery={DEFAULT_QUERY}
                submitLabel="开始找机会"
                title="搜索航线"
                secondaryActionLabel="先看今日机会"
                secondaryActionHref="#daily-best"
              />
            </div>
          </div>

          {/* Section anchor pills — Hero 底部快捷跳转 */}
          <div className="hero-anchors">
            <a href="#daily-best" className="hero-anchor">今日最佳机会 ↓</a>
            <a href="#scene-section" className="hero-anchor">按场景发现 ↓</a>
            <a href="#price-rules" className="hero-anchor">价格说明 ↓</a>
          </div>
        </section>

        {/* 实时信号条 */}
        <SignalStrip />

        {/* 今日最佳机会 */}
        <section id="daily-best" className="daily-best-section">
          <div className="daily-best-section__header">
            <span className="section-label">今日最佳机会</span>
            <p>三类决策，帮你快速发现当下值得出手的机会。</p>
          </div>
          <DailyBestStrip />
        </section>

        {/* 场景探索 */}
        <section id="scene-section" className="content-section">
          <div className="section-heading">
            <div>
              <span className="section-label">场景探索</span>
              <h2>按出行场景发现机会</h2>
            </div>
            <p>不知道去哪时，先从场景出发。</p>
          </div>
          <SceneEntryGrid scenes={homepageScenes} />
        </section>

        {/* 信任层 / 价格说明 */}
        <div id="price-rules" className="trust-bar">
          <span>
            价格更新于今日 11:20 · 展示含税总价 · 已计入行李与退改因素 ·{" "}
            <Link href={heroExampleHref} className="trust-bar__link">
              查看价格说明
            </Link>
          </span>
        </div>
      </main>
    </>
  );
}
