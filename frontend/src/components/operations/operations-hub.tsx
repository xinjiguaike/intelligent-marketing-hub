"use client";

import Link from "next/link";
import { accountMetrics, collaborationProgress, scheduleItems } from "@/data/mock/operations";
import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, CalendarRange, UsersRound } from "lucide-react";

export function OperationsHub() {
  return (
    <div className="space-y-6">
      <AccountOverview />
      <ScheduleTimeline />
      <CollaborationBoard />
    </div>
  );
}

function AccountOverview() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <BarChart3 className="h-4 w-4 text-sky-300" />
        媒介矩阵账号健康度
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

function ScheduleTimeline() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
          <CalendarRange className="h-4 w-4 text-sky-300" />
          投放排期甘特图（压缩视图）
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

function computeRelativePosition(start: string) {
  const dayStart = new Date("2024-07-12T08:00:00+08:00").getTime();
  const dayEnd = new Date("2024-07-16T22:00:00+08:00").getTime();
  const total = dayEnd - dayStart;
  const startTime = new Date(start).getTime();
  return ((startTime - dayStart) / total) * 100;
}

function computeDurationWidth(start: string, end: string) {
  const dayStart = new Date("2024-07-12T08:00:00+08:00").getTime();
  const dayEnd = new Date("2024-07-16T22:00:00+08:00").getTime();
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

function CollaborationBoard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
          <UsersRound className="h-4 w-4 text-sky-300" />
          KOL / KOC / KOS 协作进度
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
