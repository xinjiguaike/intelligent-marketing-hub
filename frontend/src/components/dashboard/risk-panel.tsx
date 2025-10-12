import { RiskAlert } from "@/types";
import { AlertTriangle, Clock3, UserRound } from "lucide-react";

type RiskPanelProps = {
  risks: RiskAlert[];
};

const severityMap: Record<
  RiskAlert["severity"],
  { label: string; badge: string; shadow: string }
> = {
  high: {
    label: "高风险",
    badge:
      "bg-rose-400/15 text-rose-200 border border-rose-400/30 shadow-[0_0_20px_rgba(248,113,113,0.25)]",
    shadow: "shadow-[0_0_22px_rgba(248,113,113,0.35)]",
  },
  medium: {
    label: "关注",
    badge:
      "bg-amber-400/15 text-amber-200 border border-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.25)]",
    shadow: "shadow-[0_0_22px_rgba(251,191,36,0.25)]",
  },
  low: {
    label: "提醒",
    badge: "bg-sky-400/15 text-sky-200 border border-sky-400/30",
    shadow: "shadow-[0_0_22px_rgba(125,211,252,0.25)]",
  },
};

export function RiskPanel({ risks }: RiskPanelProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <AlertTriangle className="h-4 w-4 text-rose-300" />
          <span>实时风险提示</span>
        </div>
        <button className="text-xs text-sky-300 underline-offset-2 hover:text-cyan-200 hover:underline">
          查看全部
        </button>
      </div>
      <ul className="space-y-4">
        {risks.map((risk) => {
          const severity = severityMap[risk.severity];
          return (
            <li
              key={risk.id}
              className={`rounded-2xl border border-white/10 bg-slate-950/60 p-4 ${severity.shadow}`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">{risk.title}</h4>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest ${severity.badge}`}
                >
                  {severity.label}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-300">{risk.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-widest text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-3.5 w-3.5 text-sky-300" />
                  {risk.owner}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-3.5 w-3.5 text-sky-300" />
                  截止 {new Date(risk.eta).toLocaleString("zh-CN", {
                    hour12: false,
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
