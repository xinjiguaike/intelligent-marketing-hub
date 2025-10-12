"use client";

import { useMemo, useState } from "react";
import { KanbanBoard } from "@/components/workflow/kanban-board";
import { TaskFlow } from "@/components/workflow/task-flow";
import { TaskPulse } from "@/components/workflow/task-pulse";
import { workflowColumns } from "@/data/mock/workflow";
import type { WorkflowColumn, WorkflowTask } from "@/types";

export default function WorkflowPage() {
  const [columns, setColumns] = useState<WorkflowColumn[]>(() =>
    workflowColumns.map((column) => ({
      ...column,
      tasks: [...column.tasks],
    }))
  );

  const allTasks = useMemo(() => columns.flatMap((column) => column.tasks), [columns]);

  const handleAddTask = (columnId: string, task: WorkflowTask) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: [task, ...column.tasks],
            }
          : column
      )
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">智能任务编排</h1>
        <p className="text-sm text-slate-300">
          统筹“计划-执行-接管-归档”全链路，让 AI 与真人团队协作透明、可控、可调度。
        </p>
      </section>
      <TaskPulse tasks={allTasks} />
      <KanbanBoard columns={columns} onAddTask={handleAddTask} />
      <TaskFlow tasks={allTasks} />
    </div>
  );
}
