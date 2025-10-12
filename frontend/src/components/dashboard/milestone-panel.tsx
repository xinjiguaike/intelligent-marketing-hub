import { Milestone } from "@/types";
import { CalendarCheck, Clock, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

type MilestonePanelProps = {
  items: Milestone[];
};

const milestoneStyles: Record<
  Milestone["status"],
  { label: string; badge: string; accent: string }
> = {
  "on-track": {
    label: "按计划",
    badge: "bg-emerald-400/15 border border-emerald-400/40 text-emerald-200",
    accent: "bg-emerald-400/70",
  },
  "at-risk": {
    label: "需关注",
    badge: "bg-rose-400/15 border border-rose-400/40 text-rose-200",
    accent: "bg-rose-400/70",
  },
  "due-soon": {
    label: "临近",
    badge: "bg-amber-400/15 border border-amber-400/40 text-amber-200",
    accent: "bg-amber-400/70",
  },
};

export function MilestonePanel({ items }: MilestonePanelProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-300">
        <CalendarCheck className="h-4 w-4 text-sky-300" />
        <span>下一里程碑</span>
      </div>
      <div className="space-y-4">
        {items.map((item) => {
          const style = milestoneStyles[item.status];
          return (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-5"
            >
              <div
                className={cn(
                  "absolute inset-y-4 left-3 w-px",
                  "bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
                )}
              />
              <div className="flex items-center justify-between pl-4">
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="mt-1 text-xs text-slate-400">{item.description}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest",
                    style.badge
                  )}
                >
                  <Flag className="h-3 w-3" />
                  {style.label}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 pl-4 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5 text-sky-300" />
                {new Date(item.dueAt).toLocaleString("zh-CN", {
                  hour12: false,
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div
                className={cn(
                  "absolute right-6 top-6 h-3 w-3 rounded-full blur-md opacity-70",
                  style.accent
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
