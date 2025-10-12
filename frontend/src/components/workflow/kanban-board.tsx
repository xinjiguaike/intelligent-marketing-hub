import { WorkflowColumn, WorkflowTask } from "@/types";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ArrowUpRight, CalendarClock, MoveRight, Users } from "lucide-react";
import Link from "next/link";

type KanbanBoardProps = {
  columns: WorkflowColumn[];
};

export function KanbanBoard({ columns }: KanbanBoardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <div key={column.id} className="flex h-full flex-col gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">{column.title}</h3>
            <p className="text-xs text-slate-400">{column.description}</p>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            <button className="mt-auto w-full rounded-xl border border-dashed border-sky-400/30 bg-white/5 py-3 text-xs text-slate-400 transition hover:border-sky-400/60 hover:text-sky-200">
              添加任务
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

type TaskCardProps = {
  task: WorkflowTask;
};

const priorityMap: Record<
  WorkflowTask["priority"],
  { label: string; className: string }
> = {
  low: { label: "低", className: "bg-slate-500/15 text-slate-300 border-slate-500/30" },
  medium: {
    label: "中",
    className: "bg-sky-400/15 text-sky-200 border-sky-400/30",
  },
  high: {
    label: "高",
    className: "bg-amber-400/15 text-amber-200 border-amber-400/30",
  },
  critical: {
    label: "紧急",
    className: "bg-rose-400/15 text-rose-200 border-rose-400/40",
  },
};

const statusAccent: Record<WorkflowTask["status"], string> = {
  planned: "from-slate-500/30 to-slate-600/10",
  executing: "from-cyan-400/30 to-blue-500/20",
  handover: "from-amber-400/30 to-amber-500/10",
  completed: "from-emerald-400/30 to-emerald-500/10",
};

function TaskCard({ task }: TaskCardProps) {
  const priority = priorityMap[task.priority];
  return (
    <GlassPanel
      glow
      className={cn(
        "flex flex-col gap-3 border-white/10 bg-gradient-to-br p-4",
        statusAccent[task.status]
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.35em] text-slate-200">
          {task.type}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-2 py-1 text-[11px] font-semibold uppercase tracking-widest",
            priority.className
          )}
        >
          {priority.label}
        </span>
      </div>
      <h4 className="text-base font-semibold text-white">{task.title}</h4>
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
        <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-2 py-1">
          <Users className="h-3.5 w-3.5 text-sky-200" />
          {task.aiOwner}
        </span>
        {task.humanOwner && (
          <>
            <MoveRight className="h-3 w-3 text-slate-400" />
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-2 py-1">
              <Users className="h-3.5 w-3.5 text-slate-200" />
              {task.humanOwner}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-300">
        <CalendarClock className="h-3.5 w-3.5 text-sky-200" />
        <span>
          {new Intl.DateTimeFormat("zh-CN", {
            hour12: false,
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(task.dueAt))}
        </span>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <p className="text-[11px] uppercase tracking-widest text-slate-400">轨迹</p>
        <ul className="mt-2 space-y-1 text-xs text-slate-300">
          {task.timeline.map((record, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
              <span>{record.label}</span>
              <span className="text-slate-500">
                {new Intl.DateTimeFormat("zh-CN", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(record.at))}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {task.executionId && (
        <Link
          href={`/execute/${task.executionId}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-2 text-xs font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.3)] transition hover:bg-sky-400/25"
        >
          进入执行空间
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </GlassPanel>
  );
}
