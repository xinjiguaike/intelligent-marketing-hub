"use client";

import { ReactNode } from "react";
import Link from "next/link";
import {
  accountMetrics,
  collaborationProgress,
  operationsCalendar,
  operationalHighlights,
  publishingSlots,
  scheduleItems,
} from "@/data/mock/operations";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  Megaphone,
  Package2,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

export function OperationsHub() {
  return (
    <div className="space-y-6">
      <AccountOverview />
      <MarketingCalendar />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <ScheduleTimeline />
          <CollaborationBoard />
        </div>
        <div className="space-y-6">
          <PublishingCalendar />
          <OperationalInsights />
        </div>
      </div>
    </div>
  );
}

function AccountOverview() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <BarChart3 className="h-4 w-4 text-sky-300" />
        媒介矩阵账号健康与曝光节奏
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {accountMetrics.map((account) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">{account.name}</h3>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  {account.platform}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${
                  account.status === "healthy"
                    ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                    : account.status === "warning"
                    ? "border border-amber-400/30 bg-amber-400/10 text-amber-200"
                    : "border border-rose-400/30 bg-rose-400/10 text-rose-200"
                }`}
              >
                {account.status === "healthy"
                  ? "健康"
                  : account.status === "warning"
                  ? "需关注"
                  : "告警"}
              </span>
            </div>
            <div className="mt-4">
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
                  style={{ width: `${account.health * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                健康指数 {(account.health * 100).toFixed(0)}%
              </p>
              <p
                className={`text-xs font-semibold ${
                  account.growth >= 0 ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {account.growth >= 0 ? "+" : ""}
                {(account.growth * 100).toFixed(1)}% 近 7 天粉丝增长
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function MarketingCalendar() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
          <CalendarDays className="h-4 w-4 text-sky-300" />
          一周营销日历（跨渠道全景）
        </span>
        <Link
          href="/strategy"
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/25"
        >
          查看策略节奏
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {operationsCalendar.map((day) => (
          <div
            key={day.date}
            className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
          >
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-white">{day.focus}</p>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300">
                    {formatDayLabel(day.date)} {day.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  共 {day.events.length} 条跨模块事件
                </p>
              </div>
              <div className="space-y-2">
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{event.time}</span>
                      <span>{event.owner}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-white">
                      {event.title}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{event.channel}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 ${typeStyles[event.type].badge}`}
                      >
                        {typeStyles[event.type].icon}
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PublishingCalendar() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
          <CalendarClock className="h-4 w-4 text-sky-300" />
          账号发布日历（未来 72 小时）
        </span>
        <Link
          href="/workflow"
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/25"
        >
          调整排期
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {publishingSlots.map((slot) => (
          <div
            key={slot.id}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">{slot.account}</h3>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  {slot.channel}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${
                  slot.status === "已确认"
                    ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                    : slot.status === "待确认"
                    ? "border border-amber-400/30 bg-amber-400/10 text-amber-200"
                    : "border border-sky-400/30 bg-sky-400/10 text-sky-100"
                }`}
              >
                {slot.status}
              </span>
            </div>
            <div className="mt-3 text-xs text-slate-400">
              档期：{formatTime(slot.scheduledAt)}
            </div>
            <p className="mt-2 text-sm text-slate-200">{slot.focus}</p>
            {slot.aiRecommendation && (
              <p className="mt-3 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-3 text-xs text-sky-100">
                AI 建议：{slot.aiRecommendation}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ScheduleTimeline() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
          <CalendarRange className="h-4 w-4 text-sky-300" />
          投放排期甘特图（广告 & 内容）
        </span>
        <Link
          href="/execute/exec-launch"
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/25"
        >
          智能生成排期
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-4 space-y-4">
        {scheduleItems.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{item.title}</span>
              <span>
                {item.channel} · {item.owner}
              </span>
            </div>
            <div className="relative h-8 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950/70">
              <div
                className="absolute inset-y-1 rounded-lg bg-gradient-to-r from-sky-400/25 to-cyan-400/20 shadow-[0_0_18px_rgba(56,189,248,0.25)]"
                style={{
                  left: `${computeRelativePosition(item.start)}%`,
                  width: `${computeDurationWidth(item.start, item.end)}%`,
                }}
              />
              <div className="absolute inset-y-0 left-2 flex items-center text-xs text-slate-300">
                {formatTime(item.start)} ~ {formatTime(item.end)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CollaborationBoard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
          <UsersRound className="h-4 w-4 text-sky-300" />
          KOL / KOC / KOS 任务活动进度
        </span>
        <Link
          href="/execute/exec-retain"
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/25"
        >
          进入复盘流程
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/5 text-sm text-slate-200">
          <thead className="bg-slate-950/80 text-xs uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">创作者</th>
              <th className="px-4 py-3 text-left">类型</th>
              <th className="px-4 py-3 text-left">当前状态</th>
              <th className="px-4 py-3 text-left">下一步</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-slate-950/60">
            {collaborationProgress.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">{item.creator}</td>
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${
                      item.status === "确认合作"
                        ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                        : item.status === "沟通中"
                        ? "border border-amber-400/30 bg-amber-400/10 text-amber-200"
                        : "border border-sky-400/30 bg-sky-400/10 text-sky-100"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-300">{item.nextStep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function OperationalInsights() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
          <Sparkles className="h-4 w-4 text-sky-300" />
          跨模块智能提醒
        </span>
        <Link
          href="/overview"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100"
        >
          查看总览
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-4 space-y-4">
        {operationalHighlights.map((highlight) => (
          <div
            key={highlight.id}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 text-[11px] uppercase tracking-widest text-sky-100">
                {highlight.tag}
              </span>
              <span className="text-[11px] text-slate-500">
                来自 {sourceMap[highlight.source]}
              </span>
            </div>
            <p className="mt-3 text-base font-semibold text-white">{highlight.title}</p>
            <p className="mt-2 text-xs text-slate-400">{highlight.description}</p>
            <Link
              href={highlight.actionLink}
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-sky-100 transition hover:text-sky-200"
            >
              {highlight.actionText}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

const typeStyles: Record<
  "发布" | "投放" | "达人" | "资产" | "商品",
  { badge: string; icon: ReactNode }
> = {
  发布: {
    badge: "border-sky-400/30 bg-sky-400/10 text-sky-100",
    icon: <Megaphone className="h-3 w-3" />,
  },
  投放: {
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    icon: <Target className="h-3 w-3" />,
  },
  达人: {
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    icon: <UsersRound className="h-3 w-3" />,
  },
  资产: {
    badge: "border-rose-400/30 bg-rose-400/10 text-rose-200",
    icon: <Package2 className="h-3 w-3" />,
  },
  商品: {
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    icon: <Sparkles className="h-3 w-3" />,
  },
};

const sourceMap: Record<
  "publishing" | "asset" | "product" | "workflow",
  string
> = {
  publishing: "发布日历",
  asset: "内容资产",
  product: "品牌资源",
  workflow: "任务编排",
};

function computeRelativePosition(start: string) {
  const dayStart = new Date("2024-07-12T08:00:00+08:00").getTime();
  const dayEnd = new Date("2024-07-17T23:00:00+08:00").getTime();
  const total = dayEnd - dayStart;
  const startTime = new Date(start).getTime();
  return ((startTime - dayStart) / total) * 100;
}

function computeDurationWidth(start: string, end: string) {
  const dayStart = new Date("2024-07-12T08:00:00+08:00").getTime();
  const dayEnd = new Date("2024-07-17T23:00:00+08:00").getTime();
  const total = dayEnd - dayStart;
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  return ((endTime - startTime) / total) * 100;
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour12: false,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatDayLabel(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}
