import { ExecutionFlowStep } from "@/types";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ArrowRight, Bot, UsersRound } from "lucide-react";

type ExecutionStepsProps = {
  steps: ExecutionFlowStep[];
};

const ownerLabel = {
  ai: {
    label: "AI",
    className: "border-sky-400/30 bg-sky-400/10 text-sky-100",
    icon: Bot,
  },
  human: {
    label: "真人",
    className: "border-white/10 bg-white/5 text-slate-200",
    icon: UsersRound,
  },
  joint: {
    label: "协同",
    className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
    icon: ArrowRight,
  },
} as const;

export function ExecutionSteps({ steps }: ExecutionStepsProps) {
  return (
    <GlassPanel className="bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">执行节点</h2>
          <p className="text-xs text-slate-400">
            明确每一步的负责人、输出物与预估耗时，便于追踪协作节奏。
          </p>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        {steps.map((step, index) => {
          const owner = ownerLabel[step.owner];
          const OwnerIcon = owner.icon;
          return (
            <div
              key={step.id}
              className="relative rounded-2xl border border-white/10 bg-slate-950/60 p-4"
            >
              <div className="absolute -left-4 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-sky-400/20 text-sm font-semibold text-sky-100 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                {index + 1}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pl-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-white">{step.title}</span>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest ${owner.className}`}
                    >
                      <OwnerIcon className="h-3.5 w-3.5" />
                      {owner.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{step.description}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  预计耗时 {step.duration}
                </div>
              </div>
              {step.output && (
                <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
                  产出物：{step.output}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
