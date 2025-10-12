import type { CampaignPlan } from "@/types";
import { GlassPanel } from "@/components/ui/glass-panel";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Sparkle, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

type CampaignBoardProps = {
  plans: CampaignPlan[];
};

const statusStyle: Record<CampaignPlan["status"], { label: string; className: string }> = {
  "in-progress": {
    label: "进行中",
    className: "border-sky-400/40 bg-sky-400/15 text-sky-100",
  },
  planning: {
    label: "筹备中",
    className: "border-amber-400/30 bg-amber-400/15 text-amber-100",
  },
  completed: {
    label: "已完成",
    className: "border-emerald-400/30 bg-emerald-400/15 text-emerald-100",
  },
};

export function CampaignBoard({ plans }: CampaignBoardProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {plans.map((plan) => (
        <GlassPanel key={plan.id} className="flex flex-col gap-4 bg-white/[0.04]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="text-xs text-slate-400">负责人 · {plan.owner}</p>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest",
                statusStyle[plan.status].className
              )}
            >
              {statusStyle[plan.status].label}
            </span>
          </div>
          <p className="text-sm text-slate-300">{plan.focus}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
              <CalendarDays className="h-3.5 w-3.5 text-sky-300" />
              {plan.timeframe}
            </span>
            {plan.tags.map((tagItem) => (
              <span
                key={tagItem}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-slate-300"
              >
                <Tag className="h-3 w-3 text-slate-500" />
                {tagItem}
              </span>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {plan.metrics.map((metric) => (
              <div
                key={`${plan.id}-${metric.label}`}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-3"
              >
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
                {metric.trend !== undefined && (
                  <p
                    className={cn(
                      "text-[11px] font-semibold",
                      metric.trend >= 0 ? "text-emerald-300" : "text-rose-300"
                    )}
                  >
                    {metric.trend >= 0 ? "+" : ""}
                    {(metric.trend * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-xs text-sky-200">
              <Sparkle className="h-3.5 w-3.5" />
              AI 正在辅助 {plan.metrics[0]?.value ?? "—"} 交付
            </div>
            <Link
              href={`/strategy/${plan.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-2 text-xs font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.3)] transition hover:bg-sky-400/25"
            >
              查看详情
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
