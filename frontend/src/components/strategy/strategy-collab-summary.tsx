import Link from "next/link";
import { strategyRecentActivity } from "@/data/mock/strategy";
import { ArrowUpRight, Clock3, Sparkles, Users } from "lucide-react";

type StrategyCollabSummaryProps = {
  activities: typeof strategyRecentActivity;
};

export function StrategyCollabSummary({ activities }: StrategyCollabSummaryProps) {
  return (
    <aside className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">最近协同摘要</h2>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
          <Clock3 className="h-3.5 w-3.5" />
          近 72 小时
        </span>
      </header>
      <div className="mt-4 space-y-4 overflow-y-auto pr-1">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow-[0_0_22px_rgba(56,189,248,0.12)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400">{activity.campaignName}</p>
                <h3 className="mt-1 text-sm font-semibold text-white">
                  {activity.stage}
                </h3>
              </div>
              <Link
                href={activity.link}
                className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/15 px-3 py-1 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/25"
              >
                继续编辑
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-slate-300">{activity.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-sky-100">
              {activity.aiHighlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1"
                >
                  <Sparkles className="h-3 w-3" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span className="inline-flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-slate-300" />
                {activity.owner}
              </span>
              <span>{new Date(activity.updatedAt).toLocaleString("zh-CN", { hour12: false, month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
            </div>
            <p className="mt-2 text-xs text-sky-200">下一步：{activity.nextAction}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
