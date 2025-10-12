import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import type { CampaignParticipant, CampaignPhase } from "@/types";
import Link from "next/link";
import { ArrowUpRight, GaugeCircle, ListTodo, Workflow, Users } from "lucide-react";

const statusStyles = {
  "not-started": "border-slate-500/30 bg-slate-500/10 text-slate-300",
  "in-progress": "border-sky-400/40 bg-sky-400/15 text-sky-100",
  handover: "border-amber-400/40 bg-amber-400/15 text-amber-100",
  done: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
};

const statusLabels = {
  "not-started": "待启动",
  "in-progress": "进行中",
  handover: "交接中",
  done: "已完成",
};

const ownerTypeLabel = {
  ai: "AI",
  human: "真人",
  joint: "协同",
};

const streamExecutionMap: Record<string, string | undefined> = {
  "stream-insight": "exec-strategy",
  "stream-content-plan": "exec-copy",
  "stream-production": "exec-poster",
  "stream-media": "exec-launch",
  "stream-segmentation": "exec-retain",
  "stream-loyalty": "exec-retain",
};

type CampaignBreakdownProps = {
  phases: CampaignPhase[];
  ascii?: string;
  title?: string;
  description?: string;
};

export function CampaignBreakdown({
  phases,
  ascii,
  title = "策划 → 任务分解全景",
  description = "将活动策划拆解为阶段任务，清晰标记 AI 与真人员工的分工、进度与交接节点。",
}: CampaignBreakdownProps) {
  return (
    <section className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-300">{description}</p>
      </header>
      <div
        className={cn(
          "grid gap-6",
          ascii ? "xl:grid-cols-[320px_1fr]" : "xl:grid-cols-1"
        )}
      >
        {ascii ? (
          <GlassPanel className="hidden xl:block bg-slate-950/70">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                Flow Overview
              </p>
              <pre className="whitespace-pre-wrap font-mono text-[11px] leading-5 text-slate-300">
                {ascii.trim()}
              </pre>
            </div>
          </GlassPanel>
        ) : null}
        <div className="space-y-6">
          {phases.map((phase) => (
            <GlassPanel key={phase.id} glow className="bg-white/[0.04]">
              <div className="space-y-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-500">
                      <Workflow className="h-4 w-4 text-sky-300" />
                      Campaign Phase
                    </div>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-slate-300">{phase.objective}</p>
                  </div>
                  <div className="rounded-2xl border border-sky-400/40 bg-sky-400/10 px-4 py-3 text-xs text-sky-100">
                    {phase.timeframe}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>阶段完成率</span>
                    <span>{Math.round(phase.progress * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
                      style={{ width: `${phase.progress * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <ParticipantBoard
                    items={phase.participants.filter((item) => item.type === "ai")}
                    label="AI 数字员工"
                  />
                  <ParticipantBoard
                    items={phase.participants.filter((item) => item.type === "human")}
                    label="真人协作者"
                  />
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {phase.workstreams.map((stream) => (
                    <div
                      key={stream.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow-[0_0_20px_rgba(56,189,248,0.12)]"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                              Workstream
                            </p>
                            <h4 className="text-base font-semibold text-white">
                              {stream.label}
                            </h4>
                          </div>
                          <div className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-sky-100">
                            {Math.round(stream.progress * 100)}%
                          </div>
                        </div>
                        <p className="text-xs text-slate-300">{stream.focus}</p>
                        {streamExecutionMap[stream.id] && (
                          <Link
                            href={`/execute/${streamExecutionMap[stream.id]}`}
                            className="mt-2 inline-flex items-center gap-2 self-start rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/25"
                          >
                            前往执行页面
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                      <div className="mt-4 space-y-3 text-xs text-slate-300">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <LeadBadge label="AI 负责人" value={stream.aiLead} />
                          <LeadBadge label="真人负责人" value={stream.humanLead} />
                        </div>
                        <div className="space-y-2">
                          {stream.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-sm font-medium text-white">
                                  {task.title}
                                </span>
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-widest",
                                    statusStyles[task.status]
                                  )}
                                >
                                  {statusLabels[task.status]}
                                </span>
                              </div>
                              <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-slate-300">
                                  <Users className="h-3 w-3 text-sky-300" />
                                  {ownerTypeLabel[task.ownerType]} · {task.ownerName}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-slate-500">
                                  <ListTodo className="h-3 w-3 text-slate-500" />
                                  截止{" "}
                                  {new Intl.DateTimeFormat("zh-CN", {
                                    hour12: false,
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }).format(new Date(task.dueAt))}
                                </span>
                                {task.handoffTo && (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-amber-100">
                                    交接给 {task.handoffTo}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

type ParticipantBoardProps = {
  items: CampaignParticipant[];
  label: string;
};

function ParticipantBoard({ items, label }: ParticipantBoardProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-xs text-slate-400">
        暂无 {label}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-500">
        <Users className="h-3.5 w-3.5 text-sky-300" />
        {label}
      </div>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/[0.05] p-3"
          >
            <div className="flex items-center justify-between text-sm text-white">
              <span>{item.name}</span>
              <span className="text-[11px] text-slate-400">{item.role}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>当前负载 {Math.round(item.load * 100)}%</span>
              <span>推进 {Math.round(item.progress * 100)}%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-900">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                style={{ width: `${item.progress * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type LeadBadgeProps = {
  label: string;
  value: string;
};

function LeadBadge({ label, value }: LeadBadgeProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
        <GaugeCircle className="h-3.5 w-3.5 text-sky-300" />
        {label}
      </div>
      <p className="mt-2 text-sm text-white">{value}</p>
    </div>
  );
}
