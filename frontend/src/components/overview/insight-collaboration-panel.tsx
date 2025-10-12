"use client";

import Link from "next/link";
import { ChevronRight, MessageSquare, Sparkles, Users } from "lucide-react";
import type {
  CollaborationThread,
  InsightAction,
  InsightHighlight,
  CollaborationMessage,
} from "@/types";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

type InsightCollaborationPanelProps = {
  highlights: InsightHighlight[];
  threads: CollaborationThread[];
  actions: InsightAction[];
  latestMessage?: CollaborationMessage;
};

const impactBadgeStyles = {
  positive: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  negative: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  neutral: "border-sky-400/30 bg-sky-400/10 text-sky-200",
} as const;

const impactLabelMap = {
  positive: "正向",
  negative: "预警",
  neutral: "中性",
} as const;

const statusStyles: Record<CollaborationThread["status"], string> = {
  同步中: "border-sky-400/30 bg-sky-400/10 text-sky-100",
  待决策: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  已归档: "border-slate-400/30 bg-slate-400/10 text-slate-200",
};

export function InsightCollaborationPanel({
  highlights,
  threads,
  actions,
  latestMessage,
}: InsightCollaborationPanelProps) {
  const pendingActions = actions.filter((action) => action.status !== "done");
  const featuredHighlights = highlights.slice(0, 3);
  const featuredThreads = threads.slice(0, 3);
  const nextAction = pendingActions[0];

  return (
    <GlassPanel className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            insight & collaboration
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">洞察协同快照</h2>
          <p className="text-sm text-slate-400">
            由洞察 AI 聚合的重点信号、待推进动作与活跃线程，一键跳转协作空间。
          </p>
        </div>
        <Link
          href="/insights/collaboration"
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/20"
        >
          进入协作洞察
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {featuredHighlights.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                {item.owner}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-widest",
                  impactBadgeStyles[item.impact]
                )}
              >
                {impactLabelMap[item.impact]}
              </span>
            </div>
            <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-xs text-slate-400">{item.description}</p>
            <p className="mt-3 text-sm font-semibold text-white">{item.metric}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-sky-300" />
              协作线程
            </span>
            <Link
              href="/insights/collaboration"
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-200 hover:text-cyan-200"
            >
              查看全部
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {featuredThreads.map((thread) => (
              <div
                key={thread.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{thread.participants.join(" · ")}</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest",
                      statusStyles[thread.status]
                    )}
                  >
                    {thread.status}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-white">{thread.topic}</h4>
                <p className="mt-2 text-xs text-slate-400">{thread.summary}</p>
                <p className="mt-3 text-xs text-slate-500">下一步：{thread.nextStep}</p>
              </div>
            ))}
            {!featuredThreads.length && (
              <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
                当前没有活跃协作线程。
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-sky-300" />
              待推进动作
            </span>
            <Link
              href="/insights/collaboration"
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-200 hover:text-cyan-200"
            >
              打开行动中心
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {nextAction ? (
            <div className="rounded-xl border border-sky-400/30 bg-sky-400/10 p-4 text-sm text-sky-50/90">
              <p className="text-xs uppercase tracking-[0.28em] text-sky-200">
                优先处理
              </p>
              <h4 className="mt-2 text-base font-semibold text-white">{nextAction.title}</h4>
              <p className="mt-2 text-xs text-sky-100/80">{nextAction.aiSupport}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-200">
                <span>{nextAction.owner}</span>
                <span>
                  截止{" "}
                  {new Date(nextAction.dueAt).toLocaleString("zh-CN", {
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ) : (
            <p className="rounded-xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-400">
              暂无待推进动作。
            </p>
          )}

          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-sky-200">
              <MessageSquare className="h-3.5 w-3.5" />
              最新协作播报
            </div>
            {latestMessage ? (
              <>
                <p className="mt-3 text-sm text-slate-100">{latestMessage.content}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {latestMessage.sender === "ai" ? "洞察 AI" : "团队成员"} ·{" "}
                  {new Date(latestMessage.createdAt).toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </>
            ) : (
              <p className="mt-3 text-xs text-slate-400">暂无协作消息。</p>
            )}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
