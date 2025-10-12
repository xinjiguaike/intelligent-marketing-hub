import { ExecutionFlow } from "@/types";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Bot, CheckCircle2, Compass, MapPin } from "lucide-react";

type ExecutionHeroProps = {
  flow: ExecutionFlow;
};

export function ExecutionHero({ flow }: ExecutionHeroProps) {
  return (
    <GlassPanel glow className="bg-white/[0.04] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-500">
            <Compass className="h-3.5 w-3.5 text-sky-300" />
            {flow.stage}
          </div>
          <h1 className="text-2xl font-semibold text-white">{flow.title}</h1>
          <p className="max-w-2xl text-sm text-slate-300">{flow.summary}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-sky-200">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1">
              <Bot className="h-3.5 w-3.5" />
              主导 AI：{flow.aiAgent}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-slate-200">
              <MapPin className="h-3.5 w-3.5 text-amber-300" />
              入口路径：{flow.entryPath}
            </span>
          </div>
        </div>
        <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-200">
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
            执行前准备
          </p>
          <ul className="mt-2 space-y-2">
            {flow.prerequisites.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-[2px] h-4 w-4 text-sky-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {flow.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              {metric.label}
            </p>
            <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
            {metric.caption && (
              <p className="mt-1 text-xs text-slate-400">{metric.caption}</p>
            )}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
