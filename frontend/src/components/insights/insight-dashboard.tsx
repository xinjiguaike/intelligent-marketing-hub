"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  ListChecks,
  MessageSquare,
  Minus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { InsightTimeline } from "@/components/dashboard/insight-timeline";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import {
  aiReasoning,
  audienceSignals,
  channelInsights,
  collaborationActivities,
  collaborationThreads,
  insightActions,
  insightCollaborationMessages,
  insightHighlights,
  insightReports,
  realtimeMetrics,
} from "@/data/mock/insights";
import type { InsightAction } from "@/types";

const trendIconMap = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  stable: Minus,
} as const;

const trendBadgeStyles: Record<"up" | "down" | "stable", string> = {
  up: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  down: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  stable: "border-sky-400/30 bg-sky-400/10 text-sky-100",
};

const impactBadgeStyles = {
  positive: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  negative: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  neutral: "border-sky-400/30 bg-sky-400/10 text-sky-200",
} as const;

const impactTextStyles = {
  positive: "text-emerald-200",
  negative: "text-rose-200",
  neutral: "text-sky-200",
} as const;

const impactLabelMap = {
  positive: "正向",
  negative: "预警",
  neutral: "中性",
} as const;

const statusOrder: InsightAction["status"][] = ["pending", "in-progress", "done"];

const statusConfig: Record<
  InsightAction["status"],
  { label: string; badge: string }
> = {
  pending: {
    label: "待启动",
    badge: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  },
  "in-progress": {
    label: "进行中",
    badge: "border-sky-400/40 bg-sky-400/10 text-sky-100",
  },
  done: {
    label: "已完成",
    badge: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  },
};

const impactPriorityStyles = {
  high: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  medium: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
} as const;

const impactPriorityLabels = {
  high: "高影响",
  medium: "中影响",
  low: "低影响",
} as const;

const threadStatusStyles: Record<string, string> = {
  同步中: "border-sky-400/30 bg-sky-400/10 text-sky-100",
  待决策: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  已归档: "border-slate-400/30 bg-slate-400/10 text-slate-100",
};

const activityTypeStyles: Record<string, string> = {
  ai: "text-sky-300",
  team: "text-emerald-300",
  experiment: "text-amber-300",
};

export function InsightDashboard() {
  return (
    <div className="space-y-6">
      <HighlightsOverview />
      <div className="grid gap-6 xl:grid-cols-[3fr_2fr]">
        <RealtimePulse />
        <AudienceSignalsPanel />
      </div>
      <div className="grid gap-6 xl:grid-cols-[3fr_2fr]">
        <ReasoningPanel />
        <ChannelPerformance />
      </div>
      <div className="grid gap-6 xl:grid-cols-[3fr_2fr]">
        <ActionCenter />
        <CollaborationSnapshot />
      </div>
      <ReportList />
    </div>
  );
}

function HighlightsOverview() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {insightHighlights.map((item) => {
        const TrendIcon = trendIconMap[item.trend];
        const trendClass = trendBadgeStyles[item.trend];
        const changeLabel = `${item.change > 0 ? "+" : ""}${Math.round(
          item.change * 100
        )}%`;

        return (
          <GlassPanel key={item.id} className="h-full" glow>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="inline-flex items-center gap-2 text-slate-300">
                <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                {item.owner}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-widest",
                  impactBadgeStyles[item.impact]
                )}
              >
                {impactLabelMap[item.impact]}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-3xl font-semibold text-white">{item.metric}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-widest",
                  trendClass
                )}
              >
                <TrendIcon className="h-3.5 w-3.5" />
                {changeLabel}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {item.description}
            </p>
            <Link
              href="/insights/collaboration"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-sky-100 transition hover:text-cyan-200"
            >
              查看协作推进
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </GlassPanel>
        );
      })}
    </section>
  );
}

function RealtimePulse() {
  const heroHighlight = insightHighlights[0];

  return (
    <GlassPanel className="h-full" glow>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            realtime
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">内容表现脉冲</h3>
          <p className="mt-1 text-sm text-slate-400">监测实时曝光、互动与转化波动</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 transition hover:border-sky-400/40 hover:text-sky-100">
            <Search className="h-3.5 w-3.5" />
            智能问询
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 transition hover:border-sky-400/40 hover:text-sky-100">
            <Download className="h-3.5 w-3.5" />
            导出快照
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {realtimeMetrics.map((metric) => {
          const trendUp = metric.trend === "up";
          const TrendIcon = trendUp ? ArrowUpRight : ArrowDownRight;

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                {metric.label}
              </p>
              <div className="mt-2 flex items-end gap-3">
                <span className="text-2xl font-semibold text-white">{metric.value}</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-widest",
                    trendUp
                      ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200"
                      : "border-rose-400/40 bg-rose-400/10 text-rose-200"
                  )}
                >
                  <TrendIcon className="h-3.5 w-3.5" />
                  {metric.delta > 0 ? "+" : ""}
                  {Math.round(metric.delta * 100)}%
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                {trendUp ? "增长趋势稳定，可继续放大优势渠道。" : "出现下行波动，建议快速排查影响因素。"}
              </p>
            </motion.div>
          );
        })}
      </div>
      {heroHighlight && (
        <div className="mt-6 rounded-2xl border border-sky-400/40 bg-sky-500/10 p-4 text-sm text-sky-50/90">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-sky-200">
            <Sparkles className="h-3.5 w-3.5" />
            AI 提示
          </div>
          <p className="mt-2 text-sm leading-relaxed">{heroHighlight.description}</p>
        </div>
      )}
    </GlassPanel>
  );
}

function AudienceSignalsPanel() {
  const [activeSegmentId, setActiveSegmentId] = useState(
    audienceSignals[0]?.id ?? ""
  );

  const activeSignal = useMemo(() => {
    return (
      audienceSignals.find((signal) => signal.id === activeSegmentId) ??
      audienceSignals[0]
    );
  }, [activeSegmentId]);

  if (!activeSignal) {
    return null;
  }

  const liftLabel = `${activeSignal.lift > 0 ? "+" : ""}${Math.round(
    activeSignal.lift * 100
  )}%`;

  return (
    <GlassPanel className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            audience
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">受众信号雷达</h3>
          <p className="mt-1 text-sm text-slate-400">
            AI 聚合高潜人群画像与行为动向
          </p>
        </div>
        <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-100">
          {activeSignal.timeWindow}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {audienceSignals.map((signal) => {
          const isActive = signal.id === activeSignal.id;
          return (
            <button
              key={signal.id}
              type="button"
              onClick={() => setActiveSegmentId(signal.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                isActive
                  ? "border-sky-400/40 bg-sky-400/20 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.28)]"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-300/30 hover:text-sky-100"
              )}
            >
              {signal.segment}
            </button>
          );
        })}
      </div>
      <div className="mt-5 space-y-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-2 text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-sky-200" />
            提升幅度
          </span>
          <span
            className={cn(
              "text-lg font-semibold",
              activeSignal.lift >= 0 ? "text-emerald-200" : "text-rose-200"
            )}
          >
            {liftLabel}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">
          {activeSignal.signal}
        </p>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>窗口：{activeSignal.timeWindow}</span>
          <span>可信度 {Math.round(activeSignal.confidence * 100)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900">
          <div
            className="h-full rounded-full bg-sky-400/80"
            style={{ width: `${Math.min(activeSignal.confidence * 100, 100)}%` }}
          />
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        AI 推荐：围绕该人群补充线下体验故事，联动社群进行定向触达。
      </p>
    </GlassPanel>
  );
}

function ReasoningPanel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <GlassPanel className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            AI chain
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">智能推演焦点</h3>
          <p className="mt-1 text-sm text-slate-400">
            自动捕捉关键异常与优化路径，辅助快速协同响应
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 transition hover:border-sky-400/40 hover:text-sky-100">
            <Search className="h-3.5 w-3.5" />
            定制追问
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 transition hover:border-sky-400/40 hover:text-sky-100">
            <Download className="h-3.5 w-3.5" />
            导出推演
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {aiReasoning.map((node) => (
          <div
            key={node.id}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                {new Date(node.time).toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-2 font-semibold",
                  impactTextStyles[node.impact]
                )}
              >
                <Sparkles className="h-3 w-3" />
                {impactLabelMap[node.impact]}
              </span>
            </div>
            <h4 className="mt-2 text-sm font-semibold text-white">{node.title}</h4>
            <p className="mt-2 text-xs text-slate-400">{node.summary}</p>
            <ul className="mt-3 space-y-2 text-xs text-slate-300">
              {node.chainOfThought.slice(0, 2).map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 text-[10px] font-semibold text-sky-200">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/20"
      >
        <ChevronRight
          className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-90")}
        />
        {expanded ? "收起 AI 思维链" : "展开完整思维链"}
      </button>
      {expanded && (
        <div className="mt-4 -mx-5 -mb-5">
          <InsightTimeline insights={aiReasoning} />
        </div>
      )}
    </GlassPanel>
  );
}

function ChannelPerformance() {
  return (
    <GlassPanel className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            channels
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">渠道表现对比</h3>
          <p className="mt-1 text-sm text-slate-400">
            聚焦曝光-互动-转化链路的核心波动
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          实时同步
        </span>
      </div>
      <div className="mt-4 space-y-4">
        {channelInsights.map((channel) => {
          const TrendIcon = trendIconMap[channel.trend];
          const trendClass = trendBadgeStyles[channel.trend];
          const engagementValue = Number.parseFloat(
            channel.engagement.replace("%", "")
          );
          const width = Number.isFinite(engagementValue)
            ? Math.min(Math.max(engagementValue * 10, 6), 100)
            : 0;
          const barColor =
            channel.trend === "down"
              ? "bg-rose-400/70"
              : channel.trend === "up"
              ? "bg-emerald-400/70"
              : "bg-sky-400/70";

          return (
            <div
              key={channel.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">{channel.channel}</h4>
                  <p className="mt-1 text-xs text-slate-400">{channel.narrative}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-widest",
                    trendClass
                  )}
                >
                  <TrendIcon className="h-3.5 w-3.5" />
                  {channel.trend === "up"
                    ? "上升"
                    : channel.trend === "down"
                    ? "下行"
                    : "稳态"}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-slate-300">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                    曝光
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white">{channel.reach}</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                    互动
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {channel.engagement}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                    转化
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {channel.conversion}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>互动强度</span>
                  <span>{channel.engagement}</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-900">
                  <div className={cn("h-full rounded-full", barColor)} style={{ width: `${width}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Link
        href="/insights/collaboration"
        className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-sky-100 transition hover:text-cyan-200"
      >
        查看协作洞察
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </GlassPanel>
  );
}

function ActionCenter() {
  const [statuses, setStatuses] = useState<Record<string, InsightAction["status"]>>(
    () =>
      Object.fromEntries(
        insightActions.map((action) => [action.id, action.status])
      ) as Record<string, InsightAction["status"]>
  );

  const cycleStatus = (id: string) => {
    setStatuses((prev) => {
      const current = prev[id] ?? "pending";
      const index = statusOrder.indexOf(current);
      const next = statusOrder[(index + 1) % statusOrder.length];
      return { ...prev, [id]: next };
    });
  };

  return (
    <GlassPanel className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">actions</p>
          <h3 className="mt-1 text-lg font-semibold text-white">协作行动中心</h3>
          <p className="mt-1 text-sm text-slate-400">
            将 AI 洞察转化为明确行动，实时同步推进状态
          </p>
        </div>
        <ListChecks className="h-6 w-6 text-sky-200" />
      </div>
      <div className="mt-5 space-y-4">
        {insightActions.map((action) => {
          const status = statuses[action.id] ?? action.status;
          const config = statusConfig[status];
          const impactStyle = impactPriorityStyles[action.impact];

          return (
            <div
              key={action.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-sky-400/30 hover:bg-slate-950/80"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">{action.title}</h4>
                  <p className="mt-2 text-xs text-slate-400">{action.aiSupport}</p>
                </div>
                <button
                  type="button"
                  onClick={() => cycleStatus(action.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest transition",
                    config.badge
                  )}
                >
                  {config.label}
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-3.5 w-3.5 text-slate-500" />
                  截止 {formatDate(action.dueAt)}
                </span>
                <span>{action.owner}</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5",
                    impactStyle
                  )}
                >
                  <Sparkles className="h-3 w-3" />
                  {impactPriorityLabels[action.impact]}
                </span>
                <span className="text-slate-500">点击状态循环：待启动 → 进行中 → 已完成</span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

function CollaborationSnapshot() {
  const latestMessage =
    insightCollaborationMessages[insightCollaborationMessages.length - 1];

  return (
    <GlassPanel className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            co-insight
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">协作洞察速递</h3>
          <p className="mt-1 text-sm text-slate-400">
            汇总跨团队跟进情况，随时衔接到行动页
          </p>
        </div>
        <Users className="h-6 w-6 text-sky-200" />
      </div>
      <div className="mt-5 space-y-4">
        <div className="space-y-3">
          {collaborationThreads.map((thread) => (
            <div
              key={thread.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">{thread.topic}</h4>
                  <p className="mt-1 text-xs text-slate-400">{thread.summary}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest",
                    threadStatusStyles[thread.status] ?? "border-white/10 bg-white/5 text-slate-300"
                  )}
                >
                  {thread.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
                <span>{thread.participants.join(" · ")}</span>
                <span>
                  {new Date(thread.updatedAt).toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400">下一步：{thread.nextStep}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-sky-200">
            <MessageSquare className="h-3.5 w-3.5" />
            最新协作播报
          </div>
          {latestMessage ? (
            <>
              <p className="mt-3 text-sm text-slate-100">{latestMessage.content}</p>
              <div className="mt-2 text-xs text-slate-500">
                {latestMessage.sender === "ai" ? "洞察 AI" : "团队成员"} ·{" "}
                {new Date(latestMessage.createdAt).toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-slate-400">暂无协作消息。</p>
          )}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
          <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">
            协作事件推进
          </p>
          <ul className="mt-3 space-y-3">
            {collaborationActivities.map((activity) => (
              <li key={activity.id} className="flex items-start gap-3">
                <CheckCircle2
                  className={cn(
                    "mt-0.5 h-4 w-4",
                    activityTypeStyles[activity.type] ?? "text-sky-200"
                  )}
                />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{activity.title}</p>
                  <p className="text-xs text-slate-400">{activity.detail}</p>
                  <span className="text-xs text-slate-500">
                    {activity.owner} ·{" "}
                    {new Date(activity.timestamp).toLocaleTimeString("zh-CN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link
        href="/insights/collaboration"
        className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-sky-100 transition hover:text-cyan-200"
      >
        进入协作洞察工作区
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </GlassPanel>
  );
}

function ReportList() {
  return (
    <GlassPanel className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">复盘报告档案</h3>
          <p className="text-sm text-slate-400">AI 与团队联合产出，沉淀行动知识库</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100">
          <Download className="h-3.5 w-3.5" />
          导出全部
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {insightReports.map((report) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                {new Date(report.createdAt).toLocaleDateString("zh-CN", {
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
              <span>{report.owner}</span>
            </div>
            <h4 className="mt-3 text-sm font-semibold text-white">{report.title}</h4>
            <p className="mt-2 text-sm text-slate-300">{report.summary}</p>
            <Link
              href="/insights/collaboration"
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-sky-100 transition hover:text-cyan-200"
            >
              查看详情
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
