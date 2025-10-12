import { journeyStages } from "@/data/mock/orchestration";
import { GlassPanel } from "@/components/ui/glass-panel";
import Link from "next/link";
import { ArrowRight, Compass, Cpu, FolderOutput, User } from "lucide-react";

export function JourneyMap() {
  return (
    <section className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-lg font-semibold text-white">从需求到创意工具路径</h2>
        <p className="text-sm text-slate-300">
          清晰标记业务需求如何在平台内流转，逐步衔接策略拆解、创意共创与发布投放。
        </p>
      </header>
      <GlassPanel glow className="bg-white/[0.04]">
        <div className="relative pl-8">
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-sky-400/40 via-slate-600/40 to-transparent" />
          <div className="space-y-6">
            {journeyStages.map((stage, index) => (
              <div key={stage.id} className="relative pl-10">
                <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/15 text-sm font-semibold text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                  {index + 1}
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow-[0_0_22px_rgba(56,189,248,0.15)]">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-slate-500">
                        <Compass className="h-3.5 w-3.5 text-sky-300" />
                        Journey Stage
                      </div>
                      <h3 className="mt-1 text-base font-semibold text-white">
                        {stage.stage}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 md:max-w-[360px]">
                      {stage.intent}
                    </p>
                  </div>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-sky-400/30 bg-sky-400/10 p-3 text-xs text-sky-100">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em]">
                        <Cpu className="h-3 w-3" />
                        AI 工具
                      </div>
                      <p className="mt-2 text-sm font-semibold">{stage.aiTool}</p>
                      <p className="mt-1 text-sky-200/80">{stage.deliverable}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3 text-xs text-slate-300">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-slate-500">
                        <User className="h-3 w-3 text-slate-300" />
                        真人操作
                      </div>
                      <p className="mt-2 text-sm text-white">{stage.humanAction}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-slate-200">
                      <FolderOutput className="h-3.5 w-3.5 text-sky-300" />
                      入口：{stage.entryPoint}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-slate-200">
                      <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
                      下一步：{stage.next}
                    </span>
                    {stage.executionId && (
                      <Link
                        href={`/execute/${stage.executionId}`}
                        className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/15 px-3 py-1 text-sky-100 transition hover:bg-sky-400/25"
                      >
                        进入执行
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
