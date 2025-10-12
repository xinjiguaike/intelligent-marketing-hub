import {
  AiDirective,
  AiControlLog,
  controlAgents,
  controlDirectives,
  controlLogs,
} from "@/data/mock/ai-control";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  CircleDot,
  CircleGauge,
  History,
} from "lucide-react";

const statusStyle: Record<string, string> = {
  running: "text-emerald-300",
  idle: "text-sky-300",
  handover: "text-amber-300",
  blocked: "text-rose-300",
  cooldown: "text-slate-400",
};

const directiveStatusStyle: Record<
  AiDirective["status"],
  { badge: string; label: string }
> = {
  pending: {
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    label: "待执行",
  },
  executing: {
    badge: "border-sky-400/30 bg-sky-400/10 text-sky-100",
    label: "执行中",
  },
  completed: {
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    label: "已完成",
  },
};

const logLevelStyle: Record<
  AiControlLog["level"],
  { dot: string; label: string }
> = {
  info: {
    dot: "text-sky-300",
    label: "信息",
  },
  warning: {
    dot: "text-amber-300",
    label: "预警",
  },
  error: {
    dot: "text-rose-300",
    label: "错误",
  },
};

export default function AiControlPage() {
  return (
    <div className="space-y-8 pb-16">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">AI 智能体中控</h1>
        <p className="text-sm text-slate-300">
          统一观测数字员工运行态势、任务指令与协同日志，保障策略、创意、运营闭环顺畅。
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {controlAgents.map((agent) => (
          <article
            key={agent.id}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                  {agent.role.toUpperCase()}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">
                  {agent.name}
                </h2>
              </div>
              <CircleGauge
                className={cn("h-6 w-6", statusStyle[agent.status])}
              />
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>运行状态</span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest",
                    agent.status === "running"
                      ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                      : agent.status === "idle"
                      ? "border border-sky-400/30 bg-sky-400/10 text-sky-100"
                      : "border border-amber-400/30 bg-amber-400/10 text-amber-200",
                  )}
                >
                  {translateStatus(agent.status)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>信心指数</span>
                <span className="text-sky-200">{(agent.confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>排队任务</span>
                <span>{agent.tasksInQueue} 个</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-slate-400">
                <p className="text-slate-300">最新输出</p>
                <p className="mt-1 text-slate-200">{agent.lastOutput}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <DirectivesPanel />
        <LogsPanel />
      </section>
    </div>
  );
}

function TranslateIcon({ status }: { status: AiDirective["status"] }) {
  if (status === "completed") {
    return <CheckCircle2 className="h-4 w-4" />;
  }
  if (status === "executing") {
    return <CircleDashed className="h-4 w-4" />;
  }
  return <CircleDot className="h-4 w-4" />;
}

function DirectivesPanel() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">指令队列</h2>
          <p className="text-sm text-slate-400">
            管理人工发起或 AI 生成的任务指令，随时调整优先级。
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25">
          新建指令
        </button>
      </div>
      <div className="mt-5 space-y-4">
        {controlDirectives.map((directive) => (
          <article
            key={directive.id}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <TranslateIcon status={directive.status} />
                <span className="font-semibold text-white">{directive.title}</span>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] uppercase tracking-widest",
                  directiveStatusStyle[directive.status].badge,
                )}
              >
                {directiveStatusStyle[directive.status].label}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{directive.description}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>目标智能体：{directive.targetAgent}</span>
              <span>优先级：{translatePriority(directive.priority)}</span>
              <span>创建时间：{formatDate(directive.createdAt)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LogsPanel() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">协同日志</h2>
          <p className="text-sm text-slate-400">
            捕捉 AI 与人工的关键事件，便于回溯与审计。
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100">
          <History className="h-3.5 w-3.5" />
          查看全部
        </button>
      </div>
      <div className="mt-5 space-y-3">
        {controlLogs.map((log) => (
          <div
            key={log.id}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  {log.agentId}
                </span>
                <span>{formatDateTime(log.timestamp)}</span>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-[11px] uppercase tracking-widest",
                  logLevelStyle[log.level].dot,
                )}
              >
                <CircleDot className="h-3 w-3" />
                {logLevelStyle[log.level].label}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-200">{log.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function translateStatus(status: string) {
  switch (status) {
    case "running":
      return "运行中";
    case "idle":
      return "空闲";
    case "handover":
      return "待接管";
    case "blocked":
      return "阻塞";
    case "cooldown":
      return "冷却中";
    default:
      return status;
  }
}

function translatePriority(priority: AiDirective["priority"]) {
  switch (priority) {
    case "high":
      return "高";
    case "medium":
      return "中";
    case "low":
      return "低";
    default:
      return priority;
  }
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
