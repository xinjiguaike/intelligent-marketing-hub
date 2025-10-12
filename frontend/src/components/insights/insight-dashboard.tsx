"use client";

import { aiReasoning, insightReports, realtimeMetrics } from "@/data/mock/insights";
import { InsightTimeline } from "@/components/dashboard/insight-timeline";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download, Search } from "lucide-react";

export function InsightDashboard() {
  return (
    <div className="space-y-6">
      <RealtimeMetrics />
      <ReasoningPanel />
      <ReportList />
    </div>
  );
}

function RealtimeMetrics() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {realtimeMetrics.map((metric) => {
        const trendUp = metric.trend === "up";
        const TrendIcon = trendUp ? ArrowUpRight : ArrowDownRight;

        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl"
          >
            <p className="text-sm text-slate-300">{metric.label}</p>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-3xl font-semibold text-white">{metric.value}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest ${
                  trendUp
                    ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                    : "border border-rose-400/30 bg-rose-400/10 text-rose-200"
                }`}
              >
                <TrendIcon className="h-3.5 w-3.5" />
                {metric.delta > 0 ? "+" : ""}
                {metric.delta * 100}%
              </span>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}

function ReasoningPanel() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-300">AI 思维链节点</div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-sky-400/40 hover:text-sky-100">
            <Search className="h-3.5 w-3.5" />
            Ask Insight
          </button>
          <button className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-sky-400/40 hover:text-sky-100">
            <Download className="h-3.5 w-3.5" />
            导出节点
          </button>
        </div>
      </div>
      <div className="mt-4">
        <InsightTimeline insights={aiReasoning} />
      </div>
    </section>
  );
}

function ReportList() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <h3 className="text-sm font-semibold text-white">复盘报告</h3>
      <div className="mt-4 space-y-4">
        {insightReports.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{new Date(report.createdAt).toLocaleDateString("zh-CN")}</span>
              <span>{report.owner}</span>
            </div>
            <h4 className="mt-2 text-base font-semibold text-white">{report.title}</h4>
            <p className="mt-2 text-slate-300">{report.summary}</p>
            <button className="mt-3 inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/20">
              查看详情
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
