import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import type { WorkflowTask } from "@/types";
import {
  Activity,
  AlertTriangle,
  Bot,
  CircleCheck,
  Clock3,
  Users2,
} from "lucide-react";

type TaskPulseProps = {
  tasks: WorkflowTask[];
};

const statusLabel: Record<WorkflowTask["status"], string> = {
  planned: "待规划",
  executing: "AI 执行中",
  handover: "待人工接管",
  completed: "已完成",
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

const metricIcons = {
  total: Activity,
  executing: Bot,
  handover: Users2,
  alerts: AlertTriangle,
};

export function TaskPulse({ tasks }: TaskPulseProps) {
  const total = tasks.length;
  const executing = tasks.filter((task) => task.status === "executing").length;
  const handover = tasks.filter((task) => task.status === "handover").length;
  const now = Date.now();

  const riskTasks = tasks
    .filter((task) => {
      const due = new Date(task.dueAt).getTime();
      const hoursUntilDue = (due - now) / (1000 * 60 * 60);
      const isLate = due < now;
      const isDueSoon = hoursUntilDue <= 12;
      const isCritical = task.priority === "critical";
      const waitingHandover = task.status === "handover";
      return isLate || isDueSoon || isCritical || waitingHandover;
    })
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());

  const alerts = riskTasks.length;

  const metrics: Array<{
    id: "total" | "executing" | "handover" | "alerts";
    label: string;
    value: number;
    subLabel: string;
  }> = [
    {
      id: "total",
      label: "总任务量",
      value: total,
      subLabel: "跨 AI 与真人协作的全部任务",
    },
    {
      id: "executing",
      label: "AI 执行中",
      value: executing,
      subLabel: "实时运行的数字员工任务",
    },
    {
      id: "handover",
      label: "待人工接管",
      value: handover,
      subLabel: "等待人工审批或确认",
    },
    {
      id: "alerts",
      label: "风险预警",
      value: alerts,
      subLabel: "12 小时内到期或紧急任务",
    },
  ];

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
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            Workflow Pulse
          </p>
          <h2 className="text-lg font-semibold text-white">任务脉搏条</h2>
          <p className="text-sm text-slate-300">
            汇总任务状态与风控信号，突出当前需要关注的节点。
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metricIcons[metric.id];
            return (
              <div
                key={metric.id}
                className={cn(
                  "flex flex-col gap-1 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-slate-200 shadow-[0_0_18px_rgba(56,189,248,0.15)]",
                  metric.id === "alerts" && alerts > 0
                    ? "border-rose-400/40 bg-rose-400/10 text-rose-100"
                    : ""
                )}
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-500">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{metric.label}</span>
                </div>
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <p className="text-xs text-slate-400">{metric.subLabel}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Risk Watch
            </p>
            <h3 className="mt-1 text-base font-semibold text-white">风险预警</h3>
            <p className="text-xs text-slate-400">
              {alerts > 0 ? "优先处理以下任务，防止流转阻塞。" : "暂无风险任务，保持当前节奏。"}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-200">
            <Clock3 className="h-3.5 w-3.5" />
            实时监听
          </div>
        </div>

        {alerts === 0 ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            <CircleCheck className="h-4 w-4" />
            当前没有风险任务，AI 继续守护任务进度。
          </div>
        ) : (
          <ul className="mt-4 space-y-3 text-sm text-white">
            {riskTasks.slice(0, 3).map((task) => {
              const latestRecord = task.timeline[task.timeline.length - 1];
              return (
                <li
                  key={task.id}
                  className="rounded-2xl border border-rose-400/40 bg-rose-400/10 p-4 shadow-[0_0_22px_rgba(248,113,113,0.2)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="rounded-full border border-rose-200/30 bg-rose-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-rose-100">
                        {statusLabel[task.status]}
                      </span>
                      <span className="font-semibold text-white">{task.title}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] text-rose-100">
                      <Clock3 className="h-3.5 w-3.5" />
                      截止 {dateFormatter.format(new Date(task.dueAt))}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-rose-50/80">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2 py-1">
                      <Bot className="h-3.5 w-3.5" />
                      {task.aiOwner}
                    </span>
                    {task.humanOwner && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2 py-1">
                        <Users2 className="h-3.5 w-3.5" />
                        {task.humanOwner}
                      </span>
                    )}
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-1",
                        priorityClass[task.priority]
                      )}
                    >
                      优先级 {priorityLabel[task.priority]}
                    </span>
                    {latestRecord && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2 py-1">
                        <Activity className="h-3.5 w-3.5" />
                        {latestRecord.label}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </GlassPanel>
  );
}
