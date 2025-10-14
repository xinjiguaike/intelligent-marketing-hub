import { DashboardKpi } from "@/types";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";

type KpiCardsProps = {
  items: DashboardKpi[];
};

export function KpiCards({ items }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {items.map((item) => {
        const isUp = item.trend === "up";
        const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;

        return (
          <GlassPanel
            key={item.id}
            glow
            className="flex flex-col gap-4 border-sky-400/30 bg-gradient-to-br from-white via-sky-50 to-sky-100/70"
          >
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-sky-500" />
                {item.label}
              </span>
              <span className="text-xs text-slate-500">{item.caption}</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-slate-900">{item.value}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-semibold ${
                  isUp
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-600"
                    : "border-rose-300/30 bg-rose-300/10 text-rose-600"
                }`}
              >
                <TrendIcon className="h-3.5 w-3.5" />
                {item.delta > 0 ? "+" : ""}
                {item.delta}%
              </span>
            </div>
          </GlassPanel>
        );
      })}
    </div>
  );
}
