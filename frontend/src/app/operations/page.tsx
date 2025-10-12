import { OperationsHub } from "@/components/operations/operations-hub";

export default function OperationsPage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">运营中心</h1>
        <p className="text-sm text-slate-300">
          聚焦营销行为节奏，统筹账号发布日历、投放排期、KOL 排期与 KOC/KOS 任务活动。
        </p>
      </section>
      <OperationsHub />
    </div>
  );
}
