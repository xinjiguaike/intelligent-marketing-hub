import Link from "next/link";
import { InsightDashboard } from "@/components/insights/insight-dashboard";

export default function InsightPage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">洞察中心</h1>
        <p className="text-sm text-slate-300">
          实时掌握内容表现、AI 思维链推理与复盘报告，让数据驱动下一轮增长策略。需要跨团队共创时，可进入协作洞察工作区，联动执行动作。
        </p>
        <Link
          href="/insights/collaboration"
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/20"
        >
          进入协作洞察工作区
        </Link>
      </section>
      <InsightDashboard />
    </div>
  );
}
