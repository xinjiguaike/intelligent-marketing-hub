import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { campaignPlans } from "@/data/mock/orchestration";
import { CampaignBreakdown } from "@/components/strategy/campaign-breakdown";

type StrategyDetailPageProps = {
  params: { id: string };
};

export default function StrategyDetailPage({ params }: StrategyDetailPageProps) {
  const plan = campaignPlans.find((item) => item.id === params.id);
  if (!plan) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-slate-400">
            {plan.status === "in-progress"
              ? "进行中"
              : plan.status === "planning"
              ? "筹备中"
              : "已完成"}
          </div>
          <h1 className="text-2xl font-semibold text-white">{plan.name}</h1>
          <p className="text-sm text-slate-300">{plan.focus}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>负责人 · {plan.owner}</span>
            <span>时间区间 · {plan.timeframe}</span>
          </div>
        </div>
        <Link
          href="/strategy"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100"
        >
          <ArrowLeft className="h-4 w-4" />
          返回营销策划空间
        </Link>
      </div>
      <CampaignBreakdown
        phases={plan.phases}
        title="任务分解全景"
        description="追踪该策划的阶段拆解、AI/真人协同路径与关键交接节点。"
      />
    </div>
  );
}
