import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import type { PersonalBoard as PersonalBoardType } from "@/types";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Sparkle,
  UserCircle2,
} from "lucide-react";

const statusConfig = {
  pending: {
    label: "待启动",
    className: "border-slate-300/60 bg-slate-100 text-slate-600",
  },
  active: {
    label: "进行中",
    className: "border-sky-300/60 bg-sky-50 text-sky-700",
  },
  review: {
    label: "待校验",
    className: "border-amber-300/60 bg-amber-50 text-amber-700",
  },
  done: {
    label: "已完成",
    className: "border-emerald-300/60 bg-emerald-50 text-emerald-700",
  },
};

const priorityTag = {
  low: "border-slate-300/50 bg-slate-100 text-slate-600",
  medium: "border-sky-300/50 bg-sky-50 text-sky-700",
  high: "border-amber-300/50 bg-amber-50 text-amber-700",
  critical: "border-rose-300/60 bg-rose-50 text-rose-700",
};

type PersonalBoardProps = {
  board: PersonalBoardType;
};

export function PersonalBoard({ board }: PersonalBoardProps) {
  return (
    <section className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">个人工作看板</h2>
        <p className="text-sm text-slate-600">
          汇总专属任务、AI 协同状态与紧急事项，帮助真人员工掌控节奏。
        </p>
      </header>

      <GlassPanel glow className="bg-gradient-to-br from-white via-sky-50 to-sky-100/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/60 bg-sky-100 text-sky-700 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <UserCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                Owner
              </p>
              <p className="text-base font-semibold text-slate-900">
                {board.owner} · {board.role}
              </p>
              <p className="text-xs text-slate-500">协同 AI：{board.aiPartner}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {board.focus.map((metric) => (
              <div
                key={metric.id}
                className="rounded-2xl border border-slate-200/70 bg-white p-3 text-xs text-slate-600 shadow-sm"
              >
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{metric.value}</p>
                <p
                  className={cn(
                    "mt-1 text-[11px] font-semibold",
                    metric.trend >= 0 ? "text-emerald-600" : "text-rose-600"
                  )}
                >
                  {metric.trend >= 0 ? "+" : ""}
                  {(metric.trend * 100).toFixed(1)}% 本周变化
                </p>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassPanel className="bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                Active Tasks
              </p>
              <h3 className="mt-1 text-base font-semibold text-slate-900">紧急事项</h3>
              <p className="text-xs text-slate-500">
                自动聚合高优先级 / 即将到期的任务。
              </p>
            </div>
            <div className="rounded-full border border-rose-300/60 bg-rose-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-rose-700">
              {board.urgent.length} 个
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {board.urgent.map((task) => (
              <div
                key={task.id}
                className="rounded-2xl border border-rose-300/60 bg-rose-50 p-4 text-xs text-rose-600 shadow-[0_18px_35px_-24px_rgba(190,18,60,0.45)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-rose-700">
                  <span>{task.title}</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-widest",
                      priorityTag[task.priority]
                    )}
                  >
                    {task.priority === "critical"
                      ? "紧急"
                      : task.priority === "high"
                      ? "高"
                      : task.priority === "medium"
                      ? "中"
                      : "低"}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-rose-500">
                  <span className="inline-flex items-center gap-1 rounded-full border border-rose-200/80 bg-white px-2 py-1">
                    <Clock className="h-3 w-3 text-rose-500" />
                    截止 {formatDate(task.dueAt)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-rose-200/80 bg-white px-2 py-1">
                    <Sparkle className="h-3 w-3 text-rose-500" />
                    协同 AI：{task.aiPartner ?? "—"}
                  </span>
                </div>
                <p className="mt-3 text-slate-600">{task.nextStep}</p>
                {task.alerts && task.alerts.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {task.alerts.map((alert) => (
                      <li
                        key={alert}
                        className="inline-flex items-center gap-2 rounded-xl border border-amber-300/50 bg-amber-50 px-3 py-1 text-[11px] text-amber-700"
                      >
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                        {alert}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <div className="h-1.5 flex-1 rounded-full bg-rose-100">
                    <div
                      className="h-full rounded-full bg-rose-500"
                      style={{ width: `${Math.round(task.progress * 100)}%` }}
                    />
                  </div>
                  {task.executionId && (
                    <Link
                      href={`/execute/${task.executionId}`}
                      className="ml-3 inline-flex items-center gap-1 rounded-full border border-rose-200/80 bg-white px-3 py-1 text-[11px] font-semibold text-rose-700 transition hover:border-rose-400/60 hover:text-rose-600"
                    >
                      进入执行
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="bg-gradient-to-b from-white to-slate-50">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">日程提示</p>
          <h3 className="mt-1 text-base font-semibold text-slate-900">今日推进节奏</h3>
          <div className="mt-4 space-y-3 text-xs text-slate-600">
            {board.urgent.map((task) => (
              <div
                key={`${task.id}-schedule`}
                className="rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm"
              >
                <div className="flex items-center justify-between text-sm text-slate-900">
                  <span>{task.title}</span>
                  <span>{formatTime(task.dueAt)}</span>
                </div>
                <p className="mt-2 text-slate-500">下一步：{task.nextStep}</p>
                {task.executionId && (
                  <Link
                    href={`/execute/${task.executionId}`}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50 px-3 py-1 text-[11px] text-sky-700 transition hover:bg-sky-100"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    跳转执行页面
                  </Link>
                )}
              </div>
            ))}
            <p className="rounded-2xl border border-slate-200/60 bg-slate-50 p-3 text-[11px] text-slate-600">
              系统已为你预留 90 分钟深度工作时间，AI 将在临近交付前 30 分钟推送提醒。
            </p>
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {board.lanes.map((lane) => (
          <GlassPanel
            key={lane.id}
            className="flex flex-col gap-4 border-slate-200/70 bg-white/90"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">{lane.title}</h3>
                <span className="text-xs text-slate-500">{lane.tasks.length} 项</span>
              </div>
              <p className="text-xs text-slate-500">{lane.caption}</p>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {lane.tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-2xl border border-slate-200/70 bg-white p-3 text-xs text-slate-600 shadow-sm"
                >
                  <div className="flex items-center justify-between text-sm text-slate-900">
                    <span>{task.title}</span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-widest",
                        statusConfig[task.status].className
                      )}
                    >
                      {statusConfig[task.status].label}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-1",
                        priorityTag[task.priority]
                      )}
                    >
                      {task.priority === "critical"
                        ? "紧急"
                        : task.priority === "high"
                        ? "高"
                        : task.priority === "medium"
                        ? "中"
                      : "低"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 px-2 py-1 text-slate-500">
                      截止 {formatTime(task.dueAt)}
                    </span>
                    {task.aiPartner && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-sky-200/60 bg-sky-50 px-2 py-1 text-sky-700">
                        AI：{task.aiPartner}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-slate-500">{task.nextStep}</p>
                  {task.alerts && task.alerts.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {task.alerts.map((alert) => (
                        <li
                          key={alert}
                          className="inline-flex items-center gap-2 rounded-xl border border-amber-300/50 bg-amber-50 px-3 py-1 text-[11px] text-amber-700"
                        >
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                          {alert}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-500"
                        style={{ width: `${Math.round(task.progress * 100)}%` }}
                      />
                    </div>
                    {task.executionId && (
                      <Link
                        href={`/execute/${task.executionId}`}
                        className="ml-3 inline-flex items-center gap-1 rounded-full border border-sky-200/60 bg-sky-50 px-3 py-1 text-[11px] text-sky-700 transition hover:bg-sky-100"
                      >
                        查看执行
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {lane.tasks.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300/60 py-8 text-center text-xs text-slate-500">
                  暂无任务
                </div>
              )}
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour12: false,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
