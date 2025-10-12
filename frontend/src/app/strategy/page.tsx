import Link from "next/link";
import { ArrowDown, ListPlus, Plus } from "lucide-react";
import { campaignPlans } from "@/data/mock/orchestration";
import {
  strategyKpis,
  strategyKnowledgeTree,
  strategyRecentActivity,
} from "@/data/mock/strategy";
import { CampaignBoard } from "@/components/strategy/campaign-board";
import { StrategyKpiBoard } from "@/components/strategy/strategy-kpi-board";
import { StrategyKnowledgeBase } from "@/components/strategy/strategy-knowledge-base";
import { StrategyCollabSummary } from "@/components/strategy/strategy-collab-summary";

export default function StrategyPage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-white">营销策划空间</h1>
          <p className="text-sm text-slate-300">
            管理重点营销战役的整体进度，复用策略资产，并从这里发起或续写营销策划。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/strategy/new"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-sm font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.3)] transition hover:bg-sky-400/25"
          >
            <Plus className="h-4 w-4" />
            新建营销策划
          </Link>
          <Link
            href="/strategy/new?resume=import-brief"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100"
          >
            <ArrowDown className="h-4 w-4" />
            导入现有 Brief
          </Link>
          <Link
            href="/strategy/new?resume=template"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100"
          >
            <ListPlus className="h-4 w-4" />
            从模板启动
          </Link>
        </div>
      </section>

      <StrategyKpiBoard metrics={strategyKpis} />

      <CampaignBoard plans={campaignPlans} />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <StrategyKnowledgeBase tree={strategyKnowledgeTree} />
        <StrategyCollabSummary activities={strategyRecentActivity} />
      </div>
    </div>
  );
}
