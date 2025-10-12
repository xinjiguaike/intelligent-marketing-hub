"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Filter,
  MessageSquare,
  MessageSquarePlus,
  NotebookPen,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import {
  aiReasoning,
  collaborationActivities,
  collaborationThreads,
  insightActions,
  insightCollaborationMessages,
  insightHighlights,
} from "@/data/mock/insights";
import type { InsightAction } from "@/types";

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

const playbookSuggestions = [
  {
    id: "playbook-clarify",
    title: "达人口碑澄清战术板",
    summary:
      "围绕舒适度争议准备 Q&A、体验官背书与评论置顶策略，确保 12 小时内稳定舆论氛围。",
    owner: "品牌 · Echo",
    aiSupport: "AI 自动聚类负向评论并给出逐条回应建议",
  },
  {
    id: "playbook-live",
    title: "直播高峰转化回放",
    summary:
      "复盘直播成交峰与流量峰错位原因，结合 AI 话术建议制定补齐脚本，锁定 18:30-19:00 黄金时段。",
    owner: "运营 · 林舟",
    aiSupport: "自动生成高频提问清单与补充 CTA 话术",
  },
  {
    id: "playbook-ugc",
    title: "体验官挑战赛加速包",
    summary:
      "联动体验官产出多场景内容，打通社群任务激励与素材归档，追踪参与率与 GMV 贡献。",
    owner: "增长 · Aiden",
    aiSupport: "生成任务模板并实时更新素材状态表格",
  },
] as const;

export function CollaborationWorkspace() {
  return (
    <div className="space-y-6 pb-12">
      <CollaborationHero />
      <div className="grid gap-6 xl:grid-cols-[7fr_5fr]">
        <CollaborationStream />
        <ThreadsPanel />
      </div>
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <ActionBoard />
        <PlaybookPanel />
      </div>
    </div>
  );
}

function CollaborationHero() {
  const activeThreads = useMemo(
    () => collaborationThreads.filter((thread) => thread.status !== "已归档"),
    []
  );
  const pendingActions = useMemo(
    () => insightActions.filter((action) => action.status !== "done"),
    []
  );

  let lastAiUpdate: string | null = null;
  for (let i = insightCollaborationMessages.length - 1; i >= 0; i -= 1) {
    const message = insightCollaborationMessages[i];
    if (message.sender === "ai") {
      lastAiUpdate = new Date(message.createdAt).toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      break;
    }
  }

  const alertHighlight = insightHighlights.find((item) => item.impact === "negative");
  const growthHighlight = insightHighlights.find((item) => item.impact === "positive");

  return (
    <GlassPanel glow>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.36em] text-slate-400">
            collaboration
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-white">协作洞察工作区</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            聚合 AI 推理与团队上下文，围绕重点议题快速共识、分工与追踪，保障洞察价值沉淀为可执行成效。
          </p>
        </div>
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100"
        >
          返回洞察看板
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InsightSummaryCard
          label="活跃议题"
          value={`${activeThreads.length} 个`}
          caption="正在推进的跨团队协作线程"
        />
        <InsightSummaryCard
          label="待完行动"
          value={`${pendingActions.length} 项`}
          caption="需要确认 owner 的关键动作"
          tone="warning"
        />
        <InsightSummaryCard
          label="最新 AI 提示"
          value={lastAiUpdate ?? "稍后更新"}
          caption="上次自动推送时间"
          tone="info"
        />
        <InsightSummaryCard
          label={alertHighlight?.title ?? "重点关注"}
          value={alertHighlight?.metric ?? "—"}
          caption={alertHighlight?.description ?? "暂无预警"}
          tone="alert"
        />
      </div>
      {growthHighlight && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
          <Sparkles className="h-4 w-4" />
          <span>
            {growthHighlight.title} · {growthHighlight.description}
          </span>
        </div>
      )}
    </GlassPanel>
  );
}

function InsightSummaryCard({
  label,
  value,
  caption,
  tone = "default",
}: {
  label: string;
  value: string;
  caption: string;
  tone?: "default" | "warning" | "info" | "alert";
}) {
  const toneStyles = {
    default: "border-white/10 bg-slate-950/60 text-slate-300",
    warning: "border-amber-400/30 bg-amber-400/10 text-amber-100",
    info: "border-sky-400/30 bg-sky-400/10 text-sky-100",
    alert: "border-rose-400/30 bg-rose-400/10 text-rose-100",
  } as const;

  return (
    <div className={cn("rounded-2xl border p-4", toneStyles[tone])}>
      <p className="text-xs uppercase tracking-[0.32em] text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{caption}</p>
    </div>
  );
}

function CollaborationStream() {
  const [activeTab, setActiveTab] = useState<"ai" | "team">("ai");
  const [messages, setMessages] = useState(() => [...insightCollaborationMessages]);
  const [draft, setDraft] = useState("");

  const quickPrompts = [
    {
      id: "prompt-gap",
      label: "请列出直播素材缺口",
      sender: "human" as const,
      content: "请列出直播素材缺口，并建议优先补齐的 3 个环节。",
    },
    {
      id: "prompt-data",
      label: "AI 自动整理线下反馈",
      sender: "ai" as const,
      content: "已完成线下问卷清洗，梳理出 5 个高频体验反馈待确认。",
    },
    {
      id: "prompt-plan",
      label: "生成复盘会议议程",
      sender: "ai" as const,
      content: "已生成复盘会议议程，包含数据洞察、行动状态与风险讨论。",
    },
  ];

  const appendMessage = (payload: { sender: "ai" | "human"; content: string }) => {
    const timestamp = new Date().toISOString();
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sender: payload.sender,
        content: payload.content,
        createdAt: timestamp,
      },
    ]);
  };

  const handleSendDraft = () => {
    if (!draft.trim()) {
      return;
    }
    appendMessage({ sender: "human", content: draft.trim() });
    setDraft("");
  };

  const tabButtonClass = (tab: "ai" | "team") =>
    cn(
      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
      activeTab === tab
        ? "border-sky-400/40 bg-sky-400/20 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.28)]"
        : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-300/30 hover:text-sky-100"
    );

  return (
    <GlassPanel className="flex h-full flex-col" glow>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.36em] text-slate-400">
            shared context
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">协作中枢流</h2>
          <p className="mt-1 text-sm text-slate-400">
            在同一空间汇总 AI 推演与团队对话，快速锁定下一步。
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            className={tabButtonClass("ai")}
            onClick={() => setActiveTab("ai")}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI 洞察
          </button>
          <button
            type="button"
            className={tabButtonClass("team")}
            onClick={() => setActiveTab("team")}
          >
            <Users className="h-3.5 w-3.5" />
            团队共识
          </button>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        {activeTab === "ai" ? (
          <AIPerspective />
        ) : (
          <TeamPerspective setActiveTab={setActiveTab} />
        )}
        <ConversationSection
          messages={messages}
          quickPrompts={quickPrompts}
          draft={draft}
          onDraftChange={setDraft}
          onSendDraft={handleSendDraft}
          onUsePrompt={(prompt) =>
            appendMessage({ sender: prompt.sender, content: prompt.content })
          }
        />
      </div>
    </GlassPanel>
  );
}

function AIPerspective() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-sky-200">
        <Sparkles className="h-3.5 w-3.5" />
        洞察 AI 推演
      </div>
      <div className="mt-3 space-y-3">
        {aiReasoning.map((node) => (
          <div
            key={node.id}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300"
          >
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>
                {new Date(node.time).toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span>{node.impact === "negative" ? "预警" : "机会"}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-white">{node.title}</p>
            <ul className="mt-2 space-y-1 text-slate-300">
              {node.chainOfThought.map((step, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-sky-200">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPerspective({ setActiveTab }: { setActiveTab: (tab: "ai" | "team") => void }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-emerald-200">
        <Users className="h-3.5 w-3.5" />
        团队进展笔记
      </div>
      <div className="mt-3 space-y-3">
        {collaborationThreads.slice(0, 2).map((thread) => (
          <div
            key={thread.id}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">{thread.topic}</p>
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-[11px] font-semibold text-sky-100">
                {thread.status}
              </span>
            </div>
            <p className="mt-1 text-slate-300">{thread.summary}</p>
            <p className="mt-1 text-[11px] text-slate-500">
              参与人：{thread.participants.join(" · ")}
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setActiveTab("ai")}
        className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-sky-100 transition hover:text-cyan-200"
      >
        查看 AI 建议
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

type PromptOption = {
  id: string;
  label: string;
  sender: "ai" | "human";
  content: string;
};

type ConversationSectionProps = {
  messages: typeof insightCollaborationMessages;
  quickPrompts: readonly PromptOption[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSendDraft: () => void;
  onUsePrompt: (prompt: PromptOption) => void;
};

function ConversationSection({
  messages,
  quickPrompts,
  draft,
  onDraftChange,
  onSendDraft,
  onUsePrompt,
}: ConversationSectionProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-slate-400">
          <MessageSquarePlus className="h-3.5 w-3.5" />
          协作对话
        </div>
        <span className="text-[11px] text-slate-500">
          共 {messages.length} 条记录 · 实时同步
        </span>
      </div>
      <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-xl border px-3 py-2 text-sm",
              msg.sender === "ai"
                ? "border-sky-400/30 bg-sky-400/10 text-sky-50/90"
                : "border-white/10 bg-slate-950/60 text-slate-200"
            )}
          >
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>{msg.sender === "ai" ? "洞察 AI" : "团队成员"}</span>
              <span>
                {new Date(msg.createdAt).toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="mt-1 leading-relaxed">{msg.content}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            onClick={() => onUsePrompt(prompt)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition",
              prompt.sender === "ai"
                ? "border-sky-400/40 bg-sky-400/20 text-sky-100"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-300/30 hover:text-sky-100"
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {prompt.label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <textarea
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder="输入要同步给团队或 AI 的问题..."
          className="min-h-[96px] w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-sky-400/40"
        />
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>提示：输入 @AI 可请求即时总结</span>
          <button
            type="button"
            onClick={onSendDraft}
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/20"
          >
            发送
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ThreadsPanel() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredThreads = useMemo(() => {
    if (statusFilter === "all") {
      return collaborationThreads;
    }
    return collaborationThreads.filter((thread) => thread.status === statusFilter);
  }, [statusFilter]);

  const filterOptions = ["all", "同步中", "待决策", "已归档"] as const;

  return (
    <GlassPanel className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            collaboration threads
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">跨团队议题面板</h2>
          <p className="mt-1 text-sm text-slate-400">
            统一查看关键议题的进展、参与人和下一步。
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Filter className="h-3.5 w-3.5" />
          <div className="flex gap-1">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStatusFilter(option)}
                className={cn(
                  "rounded-full px-3 py-1 font-semibold transition",
                  statusFilter === option
                    ? "bg-sky-400/20 text-sky-100"
                    : "bg-white/5 text-slate-400 hover:bg-sky-400/10 hover:text-sky-100"
                )}
              >
                {option === "all" ? "全部" : option}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {filteredThreads.map((thread) => (
          <div
            key={thread.id}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white">{thread.topic}</h3>
                <p className="mt-1 text-xs text-slate-400">{thread.summary}</p>
              </div>
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold text-sky-100">
                {thread.status}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span>{thread.participants.join(" · ")}</span>
              <span>
                更新时间{" "}
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
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-slate-400">
          <MessageSquare className="h-3.5 w-3.5" />
          协作节点动态
        </div>
        <ul className="mt-3 space-y-2">
          {collaborationActivities.map((activity) => (
            <li key={activity.id} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-200" />
              <div>
                <p className="text-sm font-medium text-white">{activity.title}</p>
                <p className="text-xs text-slate-400">{activity.detail}</p>
                <span className="text-[11px] text-slate-500">
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
    </GlassPanel>
  );
}

function ActionBoard() {
  const [statuses, setStatuses] = useState<Record<string, InsightAction["status"]>>(
    () =>
      Object.fromEntries(
        insightActions.map((action) => [action.id, action.status])
      ) as Record<string, InsightAction["status"]>
  );
  const [filter, setFilter] = useState<InsightAction["status"] | "all">("pending");

  const visibleActions = useMemo(() => {
    if (filter === "all") {
      return insightActions;
    }
    return insightActions.filter((action) => {
      const current = statuses[action.id] ?? action.status;
      return current === filter;
    });
  }, [filter, statuses]);

  const cycleStatus = (id: string) => {
    setStatuses((prev) => {
      const current = prev[id] ?? "pending";
      const index = statusOrder.indexOf(current);
      const next = statusOrder[(index + 1) % statusOrder.length];
      return { ...prev, [id]: next };
    });
  };

  const filters: Array<{ key: InsightAction["status"] | "all"; label: string }> = [
    { key: "pending", label: "待启动" },
    { key: "in-progress", label: "进行中" },
    { key: "done", label: "已完成" },
    { key: "all", label: "全部" },
  ];

  return (
    <GlassPanel className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            action tracker
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">行动协同面板</h2>
          <p className="mt-1 text-sm text-slate-400">
            点击状态快速记录推进，AI 同步更新洞察看板。
          </p>
        </div>
        <NotebookPen className="h-5 w-5 text-sky-200" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={cn(
              "rounded-full px-3 py-1 font-semibold transition",
              filter === item.key
                ? "bg-sky-400/20 text-sky-100"
                : "bg-white/5 text-slate-400 hover:bg-sky-400/10 hover:text-sky-100"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {visibleActions.map((action) => {
          const status = statuses[action.id] ?? action.status;
          const config = statusConfig[status];

          return (
            <div
              key={action.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition hover:border-sky-400/30 hover:bg-slate-950/80"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{action.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{action.aiSupport}</p>
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
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                <span>
                  截止{" "}
                  {new Date(action.dueAt).toLocaleString("zh-CN", {
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span>{action.owner}</span>
              </div>
            </div>
          );
        })}
        {!visibleActions.length && (
          <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-slate-400">
            该状态下暂无行动项。
          </p>
        )}
      </div>
    </GlassPanel>
  );
}

function PlaybookPanel() {
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  const toggleAcknowledge = (id: string) => {
    setAcknowledged((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <GlassPanel className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            playbook & rituals
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">协作行动模板</h2>
          <p className="mt-1 text-sm text-slate-400">
            结合最佳实践与实时动态，随时调用执行手册。
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {playbookSuggestions.map((playbook) => {
          const isDone = acknowledged[playbook.id];
          return (
            <div
              key={playbook.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{playbook.title}</p>
                  <p className="mt-2 text-xs text-slate-300">{playbook.summary}</p>
                  <p className="mt-2 text-[11px] text-slate-500">
                    负责人：{playbook.owner} ｜ {playbook.aiSupport}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleAcknowledge(playbook.id)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11px] font-semibold transition",
                    isDone
                      ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-300/30 hover:text-sky-100"
                  )}
                >
                  {isDone ? "已确认" : "标记完成"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-slate-400">
          <Users className="h-3.5 w-3.5" />
          协作例行节奏
        </div>
        <ul className="mt-3 space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
            <span>
              每日 10:00 快速对齐前一日指标波动，确认是否触发 AI 告警。
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
            <span>
              重大议题保持 4 小时内响应 SLA，必要时升级至跨部门战情。
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
            <span>每周五统一沉淀复盘报告，推送至洞察知识库。</span>
          </li>
        </ul>
      </div>
    </GlassPanel>
  );
}
