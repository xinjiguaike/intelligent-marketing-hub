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
    className: "border-slate-500/40 bg-slate-500/15 text-slate-200",
  },
  active: {
    label: "进行中",
    className: "border-sky-400/40 bg-sky-400/15 text-sky-100",
  },
  review: {
    label: "待校验",
    className: "border-amber-400/40 bg-amber-400/15 text-amber-100",
  },
  done: {
    label: "已完成",
    className: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
  },
};

const priorityTag = {
  low: "border-slate-500/30 bg-slate-500/10 text-slate-300",
  medium: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  high: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  critical: "border-rose-400/40 bg-rose-400/15 text-rose-100",
};

type PersonalBoardProps = {
  board: PersonalBoardType;
};

export function PersonalBoard({ board }: PersonalBoardProps) {
  return (
    <section className="space-y-5">
      <header className="space-y-2">
        <h2 className="text-lg font-semibold text-white">个人工作看板</h2>
        <p className="text-sm text-slate-300">
          汇总专属任务、AI 协同状态与紧急事项，帮助真人员工掌控节奏。
        </p>
      </header>

      <GlassPanel glow className="bg-white/[0.04]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-400/15 text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
              <UserCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                Owner
              </p>
              <p className="text-base font-semibold text-white">
                {board.owner} · {board.role}
              </p>
              <p className="text-xs text-slate-400">协同 AI：{board.aiPartner}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {board.focus.map((metric) => (
              <div
                key={metric.id}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-3 text-xs text-slate-300"
              >
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
                <p
                  className={cn(
                    "mt-1 text-[11px] font-semibold",
                    metric.trend >= 0 ? "text-emerald-300" : "text-rose-300"
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
        <GlassPanel className="bg-slate-950/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                Active Tasks
              </p>
              <h3 className="mt-1 text-base font-semibold text-white">紧急事项</h3>
              <p className="text-xs text-slate-400">
                自动聚合高优先级 / 即将到期的任务。
              </p>
            </div>
            <div className="rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-rose-100">
              {board.urgent.length} 个
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {board.urgent.map((task) => (
              <div
                key={task.id}
                className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-xs text-rose-100 shadow-[0_0_25px_rgba(248,113,113,0.18)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-white">
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
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-rose-50/80">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2 py-1">
                    <Clock className="h-3 w-3" />
                    截止 {formatDate(task.dueAt)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2 py-1">
                    <Sparkle className="h-3 w-3" />
                    协同 AI：{task.aiPartner ?? "—"}
                  </span>
                </div>
                <p className="mt-3 text-slate-100/90">{task.nextStep}</p>
                {task.alerts && task.alerts.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {task.alerts.map((alert) => (
                      <li
                        key={alert}
                        className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] text-amber-100"
                      >
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {alert}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <div className="h-1.5 flex-1 rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: `${Math.round(task.progress * 100)}%` }}
                    />
                  </div>
                  {task.executionId && (
                    <Link
                      href={`/execute/${task.executionId}`}
                      className="ml-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white transition hover:border-white/40 hover:text-sky-100"
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

        <GlassPanel className="bg-slate-950/40">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">日程提示</p>
          <h3 className="mt-1 text-base font-semibold text-white">今日推进节奏</h3>
          <div className="mt-4 space-y-3 text-xs text-slate-300">
            {board.urgent.map((task) => (
              <div
                key={`${task.id}-schedule`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"
              >
                <div className="flex items-center justify-between text-sm text-white">
                  <span>{task.title}</span>
                  <span>{formatTime(task.dueAt)}</span>
                </div>
                <p className="mt-2 text-slate-400">下一步：{task.nextStep}</p>
                {task.executionId && (
                  <Link
                    href={`/execute/${task.executionId}`}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-sky-100 transition hover:border-sky-400/40 hover:text-sky-200"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    跳转执行页面
                  </Link>
                )}
              </div>
            ))}
            <p className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-[11px] text-slate-400">
              系统已为你预留 90 分钟深度工作时间，AI 将在临近交付前 30 分钟推送提醒。
            </p>
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {board.lanes.map((lane) => (
          <GlassPanel key={lane.id} className="flex flex-col gap-4 bg-slate-950/50">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{lane.title}</h3>
                <span className="text-xs text-slate-400">{lane.tasks.length} 项</span>
              </div>
              <p className="text-xs text-slate-400">{lane.caption}</p>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {lane.tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-slate-300"
                >
                  <div className="flex items-center justify-between text-sm text-white">
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
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1">
                      截止 {formatTime(task.dueAt)}
                    </span>
                    {task.aiPartner && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-sky-200">
                        AI：{task.aiPartner}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-slate-300">{task.nextStep}</p>
                  {task.alerts && task.alerts.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {task.alerts.map((alert) => (
                        <li
                          key={alert}
                          className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] text-amber-100"
                        >
                          <AlertTriangle className="h-3.5 w-3.5" />
                          {alert}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-900">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
                        style={{ width: `${Math.round(task.progress * 100)}%` }}
                      />
                    </div>
                    {task.executionId && (
                      <Link
                        href={`/execute/${task.executionId}`}
                        className="ml-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100"
                      >
                        查看执行
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {lane.tasks.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 py-8 text-center text-xs text-slate-500">
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
