import { OperationsHub } from "@/components/operations/operations-hub";

export default function OperationsPage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">运营矩阵中心</h1>
        <p className="text-sm text-slate-300">
          统一查看账号健康度、投放排期与 KOL/KOC 协作进度，实现跨渠道调度。
        </p>
      </section>
      <OperationsHub />
    </div>
  );
}
