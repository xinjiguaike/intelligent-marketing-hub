import { InsightDashboard } from "@/components/insights/insight-dashboard";

export default function InsightPage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">洞察中心</h1>
        <p className="text-sm text-slate-300">
          实时掌握内容表现、AI 思维链推理与复盘报告，让数据驱动下一轮增长策略。
        </p>
      </section>
      <InsightDashboard />
    </div>
  );
}
