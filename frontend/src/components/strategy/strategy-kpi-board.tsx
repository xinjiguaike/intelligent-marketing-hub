import { StrategyKpi } from "@/data/mock/strategy";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

type StrategyKpiBoardProps = {
  metrics: StrategyKpi[];
};

export function StrategyKpiBoard({ metrics }: StrategyKpiBoardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const isUp = metric.delta >= 0;
        const Icon = isUp ? TrendingUp : TrendingDown;
        return (
          <div
            key={metric.id}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">{metric.label}</p>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-widest",
                  isUp
                    ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-100"
                    : "border-rose-400/40 bg-rose-400/15 text-rose-100"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {isUp ? "上升" : "下降"}
              </span>
            </div>
            <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
            <p className="mt-2 text-xs text-slate-400">{metric.caption}</p>
          </div>
        );
      })}
    </div>
  );
}
