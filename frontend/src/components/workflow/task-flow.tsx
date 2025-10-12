import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import type { WorkflowTask } from "@/types";
import {
  AlertTriangle,
  Bot,
  CalendarClock,
  Sparkles,
  Users2,
} from "lucide-react";

type TaskFlowProps = {
  tasks: WorkflowTask[];
};

const statusConfig: Record<
  WorkflowTask["status"],
  { label: string; className: string; indicator: string }
> = {
  planned: {
    label: "待规划",
    className: "border-slate-500/40 bg-slate-500/15 text-slate-200",
    indicator: "bg-slate-400",
  },
  executing: {
    label: "AI 执行中",
    className: "border-sky-400/40 bg-sky-400/15 text-sky-100",
    indicator: "bg-sky-300",
  },
  handover: {
    label: "待人工接管",
    className: "border-amber-400/40 bg-amber-400/15 text-amber-100",
    indicator: "bg-amber-300",
  },
  completed: {
    label: "已完成",
    className: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
    indicator: "bg-emerald-300",
  },
};

const priorityLabel: Record<WorkflowTask["priority"], string> = {
  low: "低",
  medium: "中",
  high: "高",
  critical: "紧急",
};

const priorityClass: Record<WorkflowTask["priority"], string> = {
  low: "border-slate-500/40 bg-slate-500/15 text-slate-200",
  medium: "border-sky-400/40 bg-sky-400/15 text-sky-100",
  high: "border-amber-400/40 bg-amber-400/15 text-amber-100",
  critical: "border-rose-400/40 bg-rose-400/15 text-rose-100",
};

export function TaskFlow({ tasks }: TaskFlowProps) {
  const timeline = tasks
    .flatMap((task) =>
      task.timeline.map((record, index) => ({
        id: `${task.id}-${index}`,
        task,
        record,
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.record.at).getTime() - new Date(a.record.at).getTime()
    );

  const counts = {
    planned: tasks.filter((task) => task.status === "planned").length,
    executing: tasks.filter((task) => task.status === "executing").length,
    handover: tasks.filter((task) => task.status === "handover").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
    hour12: false,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <GlassPanel glow className="bg-white/[0.04] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            Flow Tracker
          </p>
          <h2 className="text-lg font-semibold text-white">流转追踪区</h2>
          <p className="text-sm text-slate-300">
            对齐“计划 → 执行 → 接管 → 归档”链路，捕捉人机协作的最新事件。
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {(
            ["planned", "executing", "handover", "completed"] as Array<
              WorkflowTask["status"]
            >
          ).map((status) => (
            <div
              key={status}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] uppercase tracking-widest text-slate-200"
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.45)]",
                  statusConfig[status].indicator
                )}
              />
              {statusConfig[status].label} · {counts[status]}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {timeline.slice(0, 12).map(({ id, task, record }) => {
          const status = statusConfig[task.status];
          const priorityClassName = priorityClass[task.priority];
          const isAttention =
            task.status === "handover" || task.priority === "critical";

          return (
            <div
              key={id}
              className={cn(
                "rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-sky-400/30 hover:bg-slate-900/60",
                isAttention && "border-amber-400/30 hover:border-amber-400/50"
              )}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest",
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {task.title}
                    </span>
                    {isAttention && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/15 px-2 py-1 text-[11px] text-amber-100">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        关注
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{record.label}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CalendarClock className="h-3.5 w-3.5 text-sky-200" />
                  {dateFormatter.format(new Date(record.at))}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1">
                  <Bot className="h-3.5 w-3.5 text-sky-200" />
                  {task.aiOwner}
                </span>
                {task.humanOwner && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1">
                    <Users2 className="h-3.5 w-3.5 text-slate-200" />
                    {task.humanOwner}
                  </span>
                )}
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-1",
                    priorityClassName
                  )}
                >
                  优先级 {priorityLabel[task.priority]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-xs text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.2)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">AI 调度建议</p>
          <p className="text-xs text-sky-100/80">
            根据实时流转瓶颈，AI 可以重新分配负责人或调整优先级。
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400/60 bg-sky-400/20 px-4 py-2 text-[12px] font-semibold text-sky-50 transition hover:bg-sky-400/30"
        >
          <Sparkles className="h-4 w-4" />
          请求 AI 重排优先级
        </button>
      </div>
    </GlassPanel>
  );
}
