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
  low: "border-slate-300/60 bg-slate-100 text-slate-600",
  medium: "border-sky-300/60 bg-sky-50 text-sky-700",
  high: "border-amber-300/60 bg-amber-50 text-amber-700",
  critical: "border-rose-300/60 bg-rose-50 text-rose-700",
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
          <p className="text-xs uppercase tracking-[0.32em] text-slate-500">workflow</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">任务流快速总览</h3>
          <p className="text-sm text-slate-600">
            聚合任务信号，定位需要人工介入的节点，直接跳转智能编排。
          </p>
        </div>
        <Link
          href="/workflow"
          className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
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
                "rounded-2xl border border-slate-200/60 bg-white p-4 text-slate-600",
                metric.id === "risk" && metric.value > 0
                  ? "border-rose-300/60 bg-rose-50 text-rose-600"
                  : ""
              )}
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-slate-500">
                <Icon className="h-3.5 w-3.5" />
                <span>{metric.label}</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
              <p className="text-xs text-slate-500">{metric.hint}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-200/60 bg-white p-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>优先处理</span>
          <span className="text-slate-400">
            {riskTasks.length > 0 ? `Top ${Math.min(riskTasks.length, 3)} 风险任务` : "暂无风险"}
          </span>
        </div>
        {riskTasks.length === 0 ? (
          <p className="rounded-lg border border-emerald-300/40 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            当前没有风险任务，继续保持协同节奏。
          </p>
        ) : (
          <ul className="space-y-3">
            {riskTasks.slice(0, 3).map((task) => (
              <li
                key={task.id}
                className="rounded-xl border border-rose-300/60 bg-rose-50 p-3 text-xs text-rose-600"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white px-3 py-1 text-[11px] uppercase tracking-widest text-rose-600">
                    {statusLabel[task.status]}
                  </span>
                  <span className="text-sm font-semibold text-rose-700">{task.title}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-rose-500">
                  <span className="inline-flex items-center gap-1 rounded-full border border-rose-200/80 bg-white px-2 py-1">
                    <Bot className="h-3.5 w-3.5 text-rose-500" />
                    {task.aiOwner}
                  </span>
                  {task.humanOwner && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-rose-200/80 bg-white px-2 py-1">
                      <Users2 className="h-3.5 w-3.5 text-rose-500" />
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
                  <span className="inline-flex items-center gap-1 rounded-full border border-rose-200/80 bg-white px-2 py-1">
                    <CalendarClock className="h-3.5 w-3.5 text-rose-500" />
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
