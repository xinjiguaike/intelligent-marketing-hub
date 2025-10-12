import { WorkflowTask } from "@/types";

type TaskFlowProps = {
  tasks: WorkflowTask[];
};

const flowAscii = `
┌────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────┐
│  策划输入  │──▶│  数字员工执行 │──▶│ 人工确认协同 │──▶│  交付归档 │
└────────────┘    └──────────────┘    └──────────────┘    └──────────┘
`;

export function TaskFlow({ tasks }: TaskFlowProps) {
  const handoverCount = tasks.filter((task) => task.status === "handover").length;
  const executingCount = tasks.filter((task) => task.status === "executing").length;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">任务流转 ASCII 示意</h3>
          <p className="text-xs text-slate-400">实时可视化人机协作链路</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
          AI 执行中 {executingCount} ｜ 待人工接管 {handoverCount}
        </div>
      </div>
      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-[11.5px] leading-6 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
        {flowAscii}
      </pre>
    </div>
  );
}
