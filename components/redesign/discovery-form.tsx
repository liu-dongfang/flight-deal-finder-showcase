"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/redesign/icons";
import type { SortMode } from "@/lib/types";

type DiscoveryMode = "explore" | "specific" | "surprise";

interface QuickLink {
  label: string;
  href: string;
}

interface DiscoveryFormProps {
  quickLinks: QuickLink[];
}

interface FormPreset {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  fromHint: string;
  toHint: string;
  departHint: string;
  returnHint: string;
}

interface ModeConfig {
  label: string;
  description: string;
  submitLabel: string;
  scene: string;
  sort: SortMode;
  presets: FormPreset[];
}

const modeConfigs: Record<DiscoveryMode, ModeConfig> = {
  explore: {
    label: "探索特价",
    description: "从编辑精选的一组低位航线开始看，适合先找机会再决定去哪。",
    submitLabel: "发现特价",
    scene: "weekly_report",
    sort: "best_value",
    presets: [
      {
        from: "上海",
        to: "东京",
        departDate: "2026-05-08",
        returnDate: "2026-05-12",
        fromHint: "浦东 / 虹桥",
        toHint: "先从日本线开始看",
        departHint: "默认 5 月第一波低位",
        returnHint: "往返四晚"
      }
    ]
  },
  specific: {
    label: "具体航线",
    description: "直接看一条明确航线，更适合已经有目的地、只想判断这票值不值得买。",
    submitLabel: "查看这条航线",
    scene: "specific_route",
    sort: "best_value",
    presets: [
      {
        from: "广州",
        to: "大阪",
        departDate: "2026-05-14",
        returnDate: "2026-05-19",
        fromHint: "白云机场",
        toHint: "关西线 · 含行李更重要",
        departHint: "默认周中低位",
        returnHint: "五晚往返"
      }
    ]
  },
  surprise: {
    label: "随机惊喜",
    description: "给你一条随机样例航线。重复点一次，会换另一条可以立刻浏览的路线。",
    submitLabel: "来点惊喜",
    scene: "weekend_escape",
    sort: "cheapest",
    presets: [
      {
        from: "杭州",
        to: "首尔",
        departDate: "2026-06-03",
        returnDate: "2026-06-08",
        fromHint: "萧山机场",
        toHint: "近三月新低",
        departHint: "默认 6 月低位",
        returnHint: "五晚往返"
      },
      {
        from: "深圳",
        to: "台北",
        departDate: "2026-05-16",
        returnDate: "2026-05-19",
        fromHint: "宝安机场",
        toHint: "周末短飞样例",
        departHint: "默认周末出发",
        returnHint: "三晚往返"
      },
      {
        from: "北京",
        to: "清迈",
        departDate: "2026-04-26",
        returnDate: "2026-05-03",
        fromHint: "大兴机场",
        toHint: "五一前罕见价",
        departHint: "默认节前窗口",
        returnHint: "七晚往返"
      }
    ]
  }
};

function getPreset(mode: DiscoveryMode, index = 0) {
  const presets = modeConfigs[mode].presets;
  return presets[index % presets.length];
}

export function DiscoveryForm({ quickLinks }: DiscoveryFormProps) {
  const [mode, setMode] = useState<DiscoveryMode>("explore");
  const [surpriseIndex, setSurpriseIndex] = useState(0);
  const [formState, setFormState] = useState<FormPreset>(getPreset("explore"));

  function switchMode(nextMode: DiscoveryMode) {
    if (nextMode === "surprise") {
      const nextIndex = mode === "surprise" ? surpriseIndex + 1 : surpriseIndex;
      setSurpriseIndex(nextIndex);
      setFormState(getPreset("surprise", nextIndex));
      setMode("surprise");
      return;
    }

    setMode(nextMode);
    setFormState(getPreset(nextMode));
  }

  function updateField(field: keyof FormPreset, value: string) {
    setFormState((current) => ({
      ...current,
      [field]: value
    }));
  }

  const activeConfig = modeConfigs[mode];

  return (
    <form action="/results" className="discovery-form">
      <input type="hidden" name="tripType" value="round_trip" />
      <input type="hidden" name="scene" value={activeConfig.scene} />
      <input type="hidden" name="sort" value={activeConfig.sort} />
      <input type="hidden" name="passengers" value="1" />

      <div className="discovery-tabs" role="tablist" aria-label="搜索模式">
        {(Object.keys(modeConfigs) as DiscoveryMode[]).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={mode === tab}
            className={mode === tab ? "is-active" : ""}
            onClick={() => switchMode(tab)}
          >
            {modeConfigs[tab].label}
          </button>
        ))}
      </div>

      <div className="discovery-mode-note">
        <strong>{activeConfig.label}</strong>
        <span>{activeConfig.description}</span>
      </div>

      <div className="discovery-grid">
        <label className="field-card">
          <span>从哪出发</span>
          <input
            name="from"
            value={formState.from}
            aria-label="从哪出发"
            onChange={(event) => updateField("from", event.target.value)}
          />
          <small>{formState.fromHint}</small>
        </label>
        <label className="field-card">
          <span>想去哪里</span>
          <input
            name="to"
            value={formState.to}
            aria-label="想去哪里"
            onChange={(event) => updateField("to", event.target.value)}
          />
          <small>{formState.toHint}</small>
        </label>
        <label className="field-card">
          <span>什么时候</span>
          <input
            name="departDate"
            value={formState.departDate}
            aria-label="出发日期"
            onChange={(event) => updateField("departDate", event.target.value)}
          />
          <small>{formState.departHint}</small>
        </label>
        <label className="field-card">
          <span>返程日期</span>
          <input
            name="returnDate"
            value={formState.returnDate}
            aria-label="返程日期"
            onChange={(event) => updateField("returnDate", event.target.value)}
          />
          <small>{formState.returnHint}</small>
        </label>

        <button type="submit" className="discovery-submit">
          {activeConfig.submitLabel}
          <Icon name="arrow-right" size={16} />
        </button>
      </div>

      <div className="discovery-hot">
        <span>热门搜索</span>
        {quickLinks.map((item) => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </form>
  );
}
