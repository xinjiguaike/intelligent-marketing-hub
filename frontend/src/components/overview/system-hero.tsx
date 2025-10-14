"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, Sparkles, Users } from "lucide-react";
import type { InsightHighlight, Milestone } from "@/types";
import type { ReactNode } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";

type SystemHeroProps = {
  highlight?: InsightHighlight;
  actionCount: number;
  activeThreads: number;
  nextMilestone?: Milestone;
  lastAiUpdateLabel?: string;
};

export function SystemHero({
  highlight,
  actionCount,
  activeThreads,
  nextMilestone,
  lastAiUpdateLabel,
}: SystemHeroProps) {
  return (
    <GlassPanel glow className="bg-gradient-to-br from-white via-sky-50 to-sky-100/60 p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.36em] text-slate-500">
            overview cockpit
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">智能营销驾驶舱</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            聚焦关键指标、洞察与任务节奏。AI 实时推送变动，同时串联协作工作区，帮助团队在一个界面完成判断与决策。
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <HeroBadge label={`${actionCount} 个需推进动作`} icon={<Sparkles className="h-3.5 w-3.5 text-sky-500" />} />
            <HeroBadge label={`${activeThreads} 条活跃协作线程`} icon={<Users className="h-3.5 w-3.5 text-sky-500" />} />
            {lastAiUpdateLabel && (
              <HeroBadge
                label={`AI 最新更新 ${lastAiUpdateLabel}`}
                icon={<Sparkles className="h-3 w-3 text-sky-500" />}
              />
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-100 px-4 py-2 text-xs font-semibold text-sky-700 transition hover:bg-sky-200"
            >
              洞察中心
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/workflow"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-200/60 hover:text-sky-700"
            >
              任务编排
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/insights/collaboration"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-200/60 hover:text-sky-700"
            >
              协作洞察
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <div className="w-full max-w-sm space-y-4 rounded-2xl border border-slate-200/60 bg-white/90 p-4 text-sm text-slate-600">
          <p className="text-xs uppercase tracking-[0.32em] text-slate-500">即时焦点</p>
          {highlight ? (
            <div className="space-y-2 rounded-xl border border-sky-400/40 bg-sky-50 p-4">
              <div className="flex items-center justify-between text-xs text-sky-600">
                <span>{highlight.owner}</span>
                <span>{highlight.metric}</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900">{highlight.title}</h3>
              <p className="text-xs text-slate-500">{highlight.description}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-400">暂无关键洞察更新。</p>
          )}
          {nextMilestone ? (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white p-3 text-xs text-slate-600">
              <CalendarClock className="h-4 w-4 text-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">
                  {nextMilestone.title}
                </p>
                <p>{nextMilestone.description}</p>
                <p className="text-slate-500">
                  截止{" "}
                  {new Date(nextMilestone.dueAt).toLocaleString("zh-CN", {
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">暂无里程碑即将到期。</p>
          )}
        </div>
      </div>
    </GlassPanel>
  );
}

type HeroBadgeProps = {
  label: string;
  icon: ReactNode;
};

function HeroBadge({ label, icon }: HeroBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50 px-3 py-1 text-slate-600">
      {icon}
      <span>{label}</span>
    </span>
  );
}
