"use client";

import { useEffect } from "react";

interface PriceRulesModalProps {
  open: boolean;
  onClose: () => void;
}

const RULES = [
  {
    title: "含税总价是什么意思",
    body: "本平台展示的所有价格均为含税总价，包含基础票价、燃油附加费及相关税费。您在预订时看到的价格，即为实际应支付金额，不存在结账时额外加税的情况。",
  },
  {
    title: "行李费是否已计入",
    body: "每张航班卡片的「行李」标签会明确标注含随身行李（通常为 7–20 kg）及是否含托运行李。若该航班不含托运行李，相关费用将在详情页单独说明，价格不会静默包含未声明的行李费。",
  },
  {
    title: "退改限制如何体现",
    body: "每张航班卡片展示退改风险等级（低 / 中 / 高）。高风险通常意味着退改费用极高或完全不可退改。详情抽屉中可查看该航班的退改摘要。本平台不对退改政策的完整性作出保证，建议在预订前自行向航空公司或 OTA 确认最终条款。",
  },
  {
    title: "价格更新时间与价格波动",
    body: "价格数据每日更新，展示的是最近一次抓取时刻的可售价格（约 11:20）。由于机票价格受舱位余量、时间窗口等因素影响，实际价格可能与本平台展示结果存在差异。最终价格以航空公司或 OTA 官方渠道为准。",
  },
] as const;

export function PriceRulesModal({ open, onClose }: PriceRulesModalProps) {
  /* Escape 键关闭 */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* 打开时锁定 body 滚动 */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="rules-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="价格说明"
    >
      <div
        className="rules-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="rules-modal__header">
          <div>
            <span className="rules-modal__eyebrow">了解规则</span>
            <h2 className="rules-modal__title">价格说明</h2>
          </div>
          <button
            type="button"
            className="rules-modal__close"
            onClick={onClose}
            aria-label="关闭价格说明"
          >
            ✕
          </button>
        </div>

        {/* 内容 */}
        <div className="rules-modal__body">
          {RULES.map((rule, i) => (
            <section key={i} className="rules-block">
              <h3 className="rules-block__title">{rule.title}</h3>
              <p className="rules-block__body">{rule.body}</p>
            </section>
          ))}
        </div>

        {/* 底部备注 */}
        <div className="rules-modal__footer">
          <p className="rules-modal__footer-disclaimer">本页用于说明展示口径，不代表 OTA 最终支付页。</p>
          <p>如有疑问，请在预订前向航空公司确认最终条款。本平台仅作决策参考。</p>
        </div>
      </div>
    </div>
  );
}
