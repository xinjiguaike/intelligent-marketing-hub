import Link from "next/link";
import { notFound } from "next/navigation";
import { executionFlows } from "@/data/mock/orchestration";
import { ExecutionHero } from "@/components/execute/execution-hero";
import { ExecutionStream } from "@/components/execute/execution-stream";
import { ExecutionSteps } from "@/components/execute/execution-steps";
import { ArrowLeft } from "lucide-react";

const stageRouteMap: Record<string, string> = {
  策划拆解: "/strategy",
  创意共创: "/creative",
  发布投放: "/operations",
  复盘与留量: "/insights",
};

type ExecutionPageProps = {
  params: { id: string };
};

export default function ExecutionPage({ params }: ExecutionPageProps) {
  const flow = executionFlows.find((item) => item.id === params.id);
  if (!flow) {
    notFound();
  }

  const backHref = stageRouteMap[flow.stage] ?? "/";

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100"
        >
          <ArrowLeft className="h-4 w-4" />
          返回上一空间
        </Link>
        <p className="text-xs text-slate-400">
          执行流程 ID：{flow.id} ｜ 对接智能体：{flow.aiAgent}
        </p>
      </div>
      <ExecutionHero flow={flow} />
      <ExecutionStream flowId={flow.id} segments={flow.streamSegments} />
      <ExecutionSteps steps={flow.steps} />
    </div>
  );
}
