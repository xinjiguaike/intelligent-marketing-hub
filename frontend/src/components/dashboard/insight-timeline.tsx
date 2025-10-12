import { Insight } from "@/types";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { CalendarDays, Sparkles } from "lucide-react";

type InsightTimelineProps = {
  insights: Insight[];
};

const impactStyles: Record<
  Insight["impact"],
  { label: string; color: string; glow: string }
> = {
  positive: {
    label: "正向",
    color: "text-emerald-300",
    glow: "bg-emerald-400/40",
  },
  negative: {
    label: "预警",
    color: "text-rose-300",
    glow: "bg-rose-400/40",
  },
  neutral: {
    label: "中性",
    color: "text-sky-200",
    glow: "bg-sky-400/40",
  },
};

export function InsightTimeline({ insights }: InsightTimelineProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Sparkles className="h-4 w-4 text-sky-300" />
          <span>AI 关键洞察时间线</span>
        </div>
        <button className="text-xs text-sky-300 underline-offset-2 hover:text-cyan-200 hover:underline">
          展开思维链
        </button>
      </div>
      <div className="relative pl-6">
        <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-sky-400/20 via-sky-400/60 to-transparent" />
        <div className="space-y-6">
          {insights.map((item, index) => {
            const impact = impactStyles[item.impact];
            return (
              <Fragment key={item.id}>
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-sm text-slate-300">
                  <div className="absolute -left-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-slate-900">
                    <div
                      className={cn(
                        "h-2.5 w-2.5 rounded-full shadow-[0_0_12px]",
                        impact.glow
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-sky-300" />
                      {new Date(item.time).toLocaleString("zh-CN", {
                        hour12: false,
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className={cn("font-semibold", impact.color)}>
                      {impact.label}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-slate-300">{item.summary}</p>
                  <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-slate-900/60 p-4">
                    {item.chainOfThought.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                        <span className="mt-0.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] font-semibold tracking-wide text-sky-200">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {index < insights.length - 1 && (
                  <div className="ml-2 h-4 w-px bg-gradient-to-b from-sky-400/60 to-sky-400/10" />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
