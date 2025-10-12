import Link from "next/link";
import { Plus } from "lucide-react";
import { campaignPlans } from "@/data/mock/orchestration";
import {
  promptHistory,
  streamingDraft,
  strategyTree,
} from "@/data/mock/strategy";
import { CampaignBoard } from "@/components/strategy/campaign-board";
import { StrategyTree } from "@/components/strategy/strategy-tree";
import { StreamingPanel } from "@/components/strategy/streaming-panel";
import { PromptSidebar } from "@/components/strategy/prompt-sidebar";

export default function StrategyPage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-white">营销策划空间</h1>
          <p className="text-sm text-slate-300">
            汇总重点营销战役的策划进度，统一管理策略资源，并随时发起新的营销策划。
          </p>
        </div>
        <Link
          href="/strategy/new"
          className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-sm font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.3)] transition hover:bg-sky-400/25"
        >
          <Plus className="h-4 w-4" />
          新建营销策划
        </Link>
      </section>

      <CampaignBoard plans={campaignPlans} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1.2fr_0.7fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
          <h2 className="text-sm font-semibold text-white">策略资产总览</h2>
          <p className="mt-1 text-xs text-slate-400">
            参考历史战役沉淀的策略树结构，快速复用洞察、执行节奏与协同节点。
          </p>
          <div className="mt-4 max-h-[520px] overflow-y-auto pr-2">
            <StrategyTree node={strategyTree} />
          </div>
        </div>
        <StreamingPanel segments={streamingDraft} />
        <PromptSidebar history={promptHistory} />
      </div>
    </div>
  );
}
