"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  Bolt,
  Command,
  ExternalLink,
  Map,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
} from "lucide-react";
import { AgentStrip } from "@/components/dashboard/agent-strip";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  battleCampaigns,
  battleGroups,
  capabilityMetrics,
  executionPulse,
  orgClockSnapshot,
  sandboxDeliveries,
  taskChains,
} from "@/data/mock/collaboration";
import {
  agentStatuses,
  insights,
  riskAlerts,
} from "@/data/mock/dashboard";
import { campaignPhases } from "@/data/mock/orchestration";
import { workflowColumns } from "@/data/mock/workflow";
import type { BattleCampaignStatus, CapabilityNeed, OrgClockEvent } from "@/types";

export function CollaborationSpace() {
  const [activeCampaignId, setActiveCampaignId] = useState<string | null>(
    battleCampaigns[0]?.id ?? null
  );

  const activeCampaign: BattleCampaignStatus | undefined = useMemo(() => {
    if (!activeCampaignId) {
      return battleCampaigns[0];
    }
    return battleCampaigns.find((camp) => camp.id === activeCampaignId) ?? battleCampaigns[0];
  }, [activeCampaignId]);

  return (
    <div className="space-y-10 pb-16">
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">协同空间</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">全局作战地图</h1>
            <p className="mt-1 text-sm text-slate-400">
              指挥 AI 员工与真人编组，实时掌握战役进度与能力供需。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-slate-200 transition hover:border-cyan-400/40 hover:text-white">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              快速接管
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400/90 via-cyan-400/90 to-blue-500/80 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition hover:scale-[1.02]">
              <Command className="h-4 w-4" />
              下达指令
            </button>
          </div>
        </div>
        <AgentStrip agents={agentStatuses} />
        <div className="grid gap-4 lg:grid-cols-[1.65fr_1fr]">
          <GlassPanel className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">战役优先级</p>
                <h2 className="mt-2 text-lg font-semibold text-white">作战编组</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                <Map className="h-4 w-4 text-sky-300" />
                {battleCampaigns.length} 个战役
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {battleCampaigns.map((campaign) => {
                const isActive = campaign.id === activeCampaign?.id;
                return (
                  <motion.button
                    key={campaign.id}
                    onClick={() => setActiveCampaignId(campaign.id)}
                    layout
                    className={cn(
                      "w-full rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-left transition",
                      isActive
                        ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_25px_rgba(56,189,248,0.25)]"
                        : "hover:border-cyan-400/30 hover:bg-cyan-400/5"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                          {campaign.stage}
                        </p>
                        <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                          priorityStyle(campaign.priority)
                        )}
                      >
                        <Target className="h-3.5 w-3.5" />
                        {campaign.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{campaign.objective}</p>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{campaign.commander}</span>
                        <span>{formatDate(campaign.due)} 截止</span>
                      </div>
                      <Progress value={campaign.progress * 100} className="h-2 bg-slate-800" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </GlassPanel>
          <GlassPanel className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">能力供需</p>
                <h2 className="mt-2 text-lg font-semibold text-white">组织大脑快照</h2>
              </div>
              <button className="inline-flex items-center gap-1 text-xs text-sky-300 hover:text-cyan-200">
                查看详情
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {capabilityMetrics.map((cap) => (
                <CapabilityRow key={cap.id} capability={cap} />
              ))}
            </div>
          </GlassPanel>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassPanel className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">组织时钟</p>
                <h2 className="mt-2 text-lg font-semibold text-white">
                  {orgClockSnapshot.sprint}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">下一次 {orgClockSnapshot.nextReview.label}</p>
                <p className="text-sm font-semibold text-sky-200">
                  {orgClockSnapshot.nextReview.time}
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-slate-400">当前焦点</p>
              <p className="mt-1 text-base font-semibold text-white">
                {orgClockSnapshot.focus}
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {orgClockSnapshot.events.map((event) => (
                <ClockEventRow key={event.id} event={event} />
              ))}
            </div>
          </GlassPanel>
          <GlassPanel className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">风险与洞察</p>
                <h2 className="mt-2 text-lg font-semibold text-white">待办脉冲</h2>
              </div>
              <button className="inline-flex items-center gap-2 text-xs text-sky-300 hover:text-cyan-200">
                <AlertTriangle className="h-3.5 w-3.5" />
                查看全部
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {riskAlerts.map((risk) => (
                <div
                  key={risk.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{risk.title}</span>
                    <span className={cn("text-xs", riskSeverityColor(risk.severity))}>
                      {risk.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{risk.description}</p>
                  <p className="mt-2 text-xs text-slate-500">负责人：{risk.owner}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-950/60">AI 洞察</p>
              <p className="mt-1 text-sm font-semibold text-white">{insights[0]?.title}</p>
              <p className="mt-1 text-xs text-slate-200">{insights[0]?.summary}</p>
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">项目沙盘</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {activeCampaign?.name ?? "作战编组"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              阶段进度、编组健康度与交付物同步，全局一屏掌控。
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 transition hover:border-cyan-400/40 hover:text-white">
            <Bolt className="h-4 w-4 text-cyan-300" />
            生成能力补给单
          </button>
        </div>
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.2fr_0.85fr]">
          <GlassPanel className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">作战编组</h3>
              <span className="text-xs text-slate-400">AI & 人类队列</span>
            </div>
            <div className="mt-4 space-y-3">
              {battleGroups.map((group) => (
                <div
                  key={group.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                        {group.focus}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">{group.label}</p>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        group.status === "alert"
                          ? "text-rose-300"
                          : group.status === "watch"
                            ? "text-amber-200"
                            : "text-emerald-200"
                      )}
                    >
                      {group.status === "alert"
                        ? "警报"
                        : group.status === "watch"
                          ? "关注"
                          : "稳定"}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-slate-400">
                    <p>指挥官：{group.commander}</p>
                    <p>AI：{group.aiMembers.join("、")}</p>
                    <p>真人：{group.humanMembers.join("、")}</p>
                    {group.allies && <p>盟军：{group.allies.join("、")}</p>}
                  </div>
                  <div className="mt-3">
                    <Progress value={group.health * 100} className="h-1.5 bg-slate-900" />
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
          <GlassPanel className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">阶段轨道</h3>
              <button className="text-xs text-sky-300 hover:text-cyan-200">查看详细</button>
            </div>
            <div className="mt-6 space-y-5">
              {campaignPhases.map((phase) => (
                <div key={phase.id} className="relative pl-6">
                  <div className="absolute left-0 top-1 h-8 w-1 rounded-full bg-gradient-to-b from-sky-400 to-cyan-300" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                        {phase.timeframe}
                      </p>
                      <h4 className="text-sm font-semibold text-white">{phase.title}</h4>
                    </div>
                    <span className="text-xs text-slate-400">
                      {Math.round(phase.progress * 100)}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{phase.objective}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {phase.participants.slice(0, 3).map((participant) => (
                      <span
                        key={participant.id}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px]",
                          participant.type === "ai"
                            ? "bg-sky-400/15 text-sky-100 border border-sky-400/30"
                            : "bg-amber-200/15 text-amber-100 border border-amber-400/20"
                        )}
                      >
                        <Sparkles className="h-3 w-3" />
                        {participant.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
          <GlassPanel className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">交付同步</h3>
              <button className="text-xs text-sky-300 hover:text-cyan-200">同步记录</button>
            </div>
            <div className="mt-4 space-y-3">
              {sandboxDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{delivery.title}</span>
                    <span className={cn("text-xs", deliveryStatusStyle(delivery.status))}>
                      {delivery.status === "synced"
                        ? "已同步"
                        : delivery.status === "pending"
                          ? "待处理"
                          : "冲突"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    所属：{delivery.linkedModule} ｜ 负责人：{delivery.owner}
                  </p>
                  <button className="mt-2 inline-flex items-center gap-2 text-xs text-sky-300 hover:text-cyan-200">
                    {delivery.action}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">任务执行地图</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Workflow 脉搏</h2>
            <p className="mt-1 text-sm text-slate-400">
              监控任务流转、接管节点与组织经验沉淀。
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-slate-200 hover:bg-white/20">
            <Play className="h-4 w-4 text-emerald-300" />
            打开执行空间
          </button>
        </div>
        <GlassPanel className="p-5">
          <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {[
                  { label: "总任务", value: executionPulse.total, accent: "text-white" },
                  {
                    label: "AI 执行",
                    value: executionPulse.executing,
                    accent: "text-cyan-200",
                  },
                  {
                    label: "待接管",
                    value: executionPulse.handover,
                    accent: "text-amber-200",
                  },
                  {
                    label: "已完成",
                    value: executionPulse.completed,
                    accent: "text-emerald-200",
                  },
                  {
                    label: "风险警报",
                    value: executionPulse.alerts,
                    accent: "text-rose-200",
                  },
                  {
                    label: "能力缺口",
                    value: executionPulse.capabilityGap,
                    accent: "text-sky-200",
                  },
                ].map((metric) => (
                  <div key={metric.label}>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                      {metric.label}
                    </p>
                    <p className={cn("mt-1 text-2xl font-semibold", metric.accent)}>
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-3 lg:flex-row">
                {taskChains.map((chain) => (
                  <div
                    key={chain.id}
                    className="flex-1 rounded-2xl border border-white/10 bg-slate-900/40 p-3"
                  >
                    <p className="text-xs text-slate-500">{chain.label}</p>
                    <p className="mt-1 text-sm text-white">{chain.tasks.join(" → ")}</p>
                    <span
                      className={cn(
                        "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]",
                        chain.health === "risk"
                          ? "bg-rose-400/20 text-rose-100"
                          : chain.health === "watch"
                            ? "bg-amber-400/20 text-amber-100"
                            : "bg-emerald-400/20 text-emerald-100"
                      )}
                    >
                      <ShieldCheck className="h-3 w-3" />
                      {chain.health === "risk" ? "需干预" : chain.health === "watch" ? "关注" : "健康"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {workflowColumns.map((column) => (
                <div
                  key={column.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                        {column.title}
                      </p>
                      <h4 className="text-sm text-slate-300">{column.description}</h4>
                    </div>
                    <span className="text-xs text-slate-400">{column.tasks.length} 项</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {column.tasks.slice(0, 2).map((task) => (
                      <div key={task.id} className="rounded-xl border border-white/10 p-3">
                        <p className="text-sm font-semibold text-white">{task.title}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {task.aiOwner} → {task.humanOwner ?? "待指派"}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500">
                          截止：{formatDate(task.dueAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </section>
    </div>
  );
}

function CapabilityRow({ capability }: { capability: CapabilityNeed }) {
  const percent = Math.min(100, (capability.available / capability.required) * 100);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            {capability.label}
          </p>
          <p className="text-sm font-semibold text-white">{capability.owner}</p>
        </div>
        <span className={cn("text-xs font-semibold", capabilityStatusColor(capability.status))}>
          {capability.status === "risk"
            ? "缺口严重"
            : capability.status === "watch"
              ? "需关注"
              : "充足"}
        </span>
      </div>
      <div className="mt-3 space-y-2 text-xs text-slate-400">
        <div className="flex items-center justify-between">
          <span>需求：{capability.required}</span>
          <span>可用：{capability.available}</span>
        </div>
        <Progress value={percent} className="h-1.5 bg-slate-900" />
      </div>
      {capability.note && (
        <p className="mt-2 text-[11px] text-slate-500">备注：{capability.note}</p>
      )}
    </div>
  );
}

function ClockEventRow({ event }: { event: OrgClockEvent }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl border",
          clockEventColor(event.impact)
        )}
      >
        <TimerReset className="h-4 w-4" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-white">{event.label}</p>
          <span className="text-xs text-slate-500">{event.time}</span>
        </div>
        <p className="text-xs text-slate-500">{event.owner}</p>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

function priorityStyle(priority: BattleCampaignStatus["priority"]) {
  switch (priority) {
    case "critical":
      return "bg-rose-400/20 text-rose-100 border border-rose-400/40";
    case "high":
      return "bg-amber-400/20 text-amber-100 border border-amber-400/40";
    case "medium":
      return "bg-sky-400/20 text-sky-100 border border-sky-400/40";
    default:
      return "bg-slate-500/20 text-slate-200 border border-slate-500/30";
  }
}

function capabilityStatusColor(status: CapabilityNeed["status"]) {
  switch (status) {
    case "risk":
      return "text-rose-300";
    case "watch":
      return "text-amber-200";
    default:
      return "text-emerald-200";
  }
}

function riskSeverityColor(severity: "low" | "medium" | "high") {
  switch (severity) {
    case "high":
      return "text-rose-300";
    case "medium":
      return "text-amber-200";
    default:
      return "text-slate-300";
  }
}

function deliveryStatusStyle(status: "synced" | "pending" | "blocked") {
  switch (status) {
    case "synced":
      return "text-emerald-200";
    case "pending":
      return "text-amber-200";
    default:
      return "text-rose-300";
  }
}

function clockEventColor(impact: OrgClockEvent["impact"]) {
  switch (impact) {
    case "critical":
      return "border-rose-400/40 bg-rose-400/10 text-rose-100";
    case "warning":
      return "border-amber-400/40 bg-amber-400/10 text-amber-100";
    default:
      return "border-emerald-400/40 bg-emerald-400/10 text-emerald-100";
  }
}
