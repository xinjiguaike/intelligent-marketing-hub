"use client";

import Link from "next/link";
import type { WorkflowTask } from "@/types";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  Bot,
  CalendarClock,
  ChevronRight,
  Users2,
} from "lucide-react";

type WorkflowSnapshotProps = {
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
  risk: AlertTriangle,
};

export function WorkflowSnapshot({ tasks }: WorkflowSnapshotProps) {
  const now = Date.now();
  const executing = tasks.filter((task) => task.status === "executing").length;
  const handover = tasks.filter((task) => task.status === "handover").length;

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

  const metrics: Array<{
    id: "total" | "executing" | "handover" | "risk";
    label: string;
    value: number;
    hint: string;
  }> = [
    {
      id: "total",
      label: "总任务量",
      value: tasks.length,
      hint: "跨 AI 与真人协同的所有任务",
    },
    {
      id: "executing",
      label: "AI 执行中",
      value: executing,
      hint: "数字员工正在处理的任务",
    },
    {
      id: "handover",
      label: "待人工接管",
      value: handover,
      hint: "需要人工确认或审批",
    },
    {
      id: "risk",
      label: "风险任务",
      value: riskTasks.length,
      hint: "12 小时内到期或状态异常",
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
    <GlassPanel className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">workflow</p>
          <h3 className="mt-1 text-lg font-semibold text-white">任务流快速总览</h3>
          <p className="text-sm text-slate-400">
            聚合任务信号，定位需要人工介入的节点，直接跳转智能编排。
          </p>
        </div>
        <Link
          href="/workflow"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-sky-200/40 hover:text-white"
        >
          打开编排台
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => {
          const Icon = metricIcons[metric.id];
          return (
            <div
              key={metric.id}
              className={cn(
                "rounded-2xl border border-white/10 bg-white/5 p-4",
                metric.id === "risk" && metric.value > 0
                  ? "border-rose-400/40 bg-rose-400/10 text-rose-100"
                  : "text-slate-200"
              )}
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-slate-500">
                <Icon className="h-3.5 w-3.5" />
                <span>{metric.label}</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
              <p className="text-xs text-slate-400">{metric.hint}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>优先处理</span>
          <span className="text-slate-500">
            {riskTasks.length > 0 ? `Top ${Math.min(riskTasks.length, 3)} 风险任务` : "暂无风险"}
          </span>
        </div>
        {riskTasks.length === 0 ? (
          <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-100">
            当前没有风险任务，继续保持协同节奏。
          </p>
        ) : (
          <ul className="space-y-3">
            {riskTasks.slice(0, 3).map((task) => (
              <li
                key={task.id}
                className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-xs text-rose-50/90"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-widest text-white">
                    {statusLabel[task.status]}
                  </span>
                  <span className="text-sm font-semibold text-white">{task.title}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-rose-50/80">
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
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2 py-1">
                    <CalendarClock className="h-3.5 w-3.5" />
                    截止 {dateFormatter.format(new Date(task.dueAt))}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </GlassPanel>
  );
}
