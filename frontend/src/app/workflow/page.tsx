import { workflowColumns } from "@/data/mock/workflow";
import { KanbanBoard } from "@/components/workflow/kanban-board";
import { TaskFlow } from "@/components/workflow/task-flow";

export default function WorkflowPage() {
  const allTasks = workflowColumns.flatMap((column) => column.tasks);

  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">智能任务编排</h1>
        <p className="text-sm text-slate-300">
          AI 数字员工与真实团队的协作看板，可视化任务状态、优先级与流转路径。
        </p>
      </section>
      <KanbanBoard columns={workflowColumns} />
      <TaskFlow tasks={allTasks} />
    </div>
  );
}
