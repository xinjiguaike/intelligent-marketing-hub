"use client";

import Link from "next/link";
import {
  FormEvent,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowUpRight,
  CalendarClock,
  MoveRight,
  Plus,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";
import type { WorkflowColumn, WorkflowTask } from "@/types";

type KanbanBoardProps = {
  columns: WorkflowColumn[];
  onAddTask: (columnId: string, task: WorkflowTask) => void;
};

type TaskDraft = {
  title: string;
  type: string;
  priority: WorkflowTask["priority"];
  aiOwner: string;
  humanOwner: string;
  dueAt: string;
};

const columnStatusMap: Record<string, WorkflowTask["status"]> = {
  "column-planned": "planned",
  "column-executing": "executing",
  "column-handover": "handover",
  "column-done": "completed",
};

const statusLabelMap: Record<WorkflowTask["status"], string> = {
  planned: "待规划",
  executing: "AI 执行中",
  handover: "待人工接管",
  completed: "已完成",
};

const timelineLabelMap: Record<WorkflowTask["status"], string> = {
  planned: "任务创建",
  executing: "进入 AI 执行队列",
  handover: "请求人工接管",
  completed: "完成归档",
};

const priorityOptions: Array<{
  value: WorkflowTask["priority"];
  label: string;
}> = [
  { value: "low", label: "低" },
  { value: "medium", label: "中" },
  { value: "high", label: "高" },
  { value: "critical", label: "紧急" },
];

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

export function KanbanBoard({ columns, onAddTask }: KanbanBoardProps) {
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [draft, setDraft] = useState<TaskDraft>(() => createDefaultDraft(columns[0]));
  const [error, setError] = useState<string | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!activeColumnId) {
      return;
    }
    const frame = requestAnimationFrame(() => {
      titleInputRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [activeColumnId]);

  useEffect(() => {
    if (!activeColumnId) {
      setDraft((prev) => ({ ...prev, title: "" }));
    }
  }, [activeColumnId]);

  const handleOpenForm = (column: WorkflowColumn) => {
    setActiveColumnId(column.id);
    setDraft(createDefaultDraft(column));
    setError(null);
  };

  const handleCancel = () => {
    setActiveColumnId(null);
    setError(null);
  };

  const handleDraftChange = <K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) => {
    if (key === "dueAt" && typeof value === "string") {
      setDraft((prev) => ({ ...prev, dueAt: fromLocalInputValue(value) }));
    } else {
      setDraft((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = (column: WorkflowColumn) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) {
      setError("请填写任务名称");
      return;
    }

    const aiOwner = draft.aiOwner.trim() || "协作 AI";
    const humanOwner = draft.humanOwner.trim();
    const status = columnStatusMap[column.id] ?? "planned";
    const timelineLabel = timelineLabelMap[status] ?? "任务创建";

    const newTask: WorkflowTask = {
      id: createTaskId(),
      title,
      type: draft.type.trim() || "协同任务",
      priority: draft.priority,
      status,
      aiOwner,
      humanOwner: humanOwner || undefined,
      dueAt: draft.dueAt || getDefaultDueAt(),
      timeline: [
        {
          label: timelineLabel,
          at: new Date().toISOString(),
        },
      ],
    };

    onAddTask(column.id, newTask);
    setActiveColumnId(null);
    setError(null);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => {
        const columnStatus = columnStatusMap[column.id] ?? "planned";
        const isActive = activeColumnId === column.id;

        return (
          <div key={column.id} className="flex h-full flex-col gap-3">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-slate-300">
                  {statusLabelMap[columnStatus]}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">{column.description}</p>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {isActive ? (
                <AddTaskForm
                  draft={draft}
                  error={error}
                  onCancel={handleCancel}
                  onChange={handleDraftChange}
                  onSubmit={handleSubmit(column)}
                  titleRef={titleInputRef}
                  statusLabel={statusLabelMap[columnStatus]}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpenForm(column)}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-sky-400/40 bg-white/5 px-3 py-3 text-xs font-semibold text-slate-300 transition hover:border-sky-400/60 hover:text-sky-100"
                >
                  <Plus className="h-3.5 w-3.5" />
                  添加任务
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

type TaskCardProps = {
  task: WorkflowTask;
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

type AddTaskFormProps = {
  draft: TaskDraft;
  error: string | null;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onChange: <K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) => void;
  titleRef: RefObject<HTMLInputElement | null>;
  statusLabel: string;
};

function AddTaskForm({
  draft,
  error,
  onSubmit,
  onCancel,
  onChange,
  titleRef,
  statusLabel,
}: AddTaskFormProps) {
  const dueAtInput = useMemo(() => toLocalInputValue(draft.dueAt), [draft.dueAt]);

  return (
    <GlassPanel className="border-dashed border-sky-400/40 bg-sky-400/10 p-4">
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-sky-100">
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            {statusLabel} · 新任务
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-slate-200 transition hover:border-slate-200/50 hover:text-white"
          >
            <X className="h-3 w-3" />
            取消
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-300">任务名称</label>
          <input
            ref={titleRef}
            value={draft.title}
            onChange={(event) => onChange("title", event.target.value)}
            placeholder="例如：生成新品直播话术要点"
            className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none transition focus:border-sky-400/40 focus:text-sky-100"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs text-slate-300">任务类型</label>
            <input
              value={draft.type}
              onChange={(event) => onChange("type", event.target.value)}
              placeholder="如：营销策划 / 内容创意"
              className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none transition focus:border-sky-400/40 focus:text-sky-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-slate-300">优先级</label>
            <select
              value={draft.priority}
              onChange={(event) => onChange("priority", event.target.value as WorkflowTask["priority"])}
              className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none transition focus:border-sky-400/40 focus:text-sky-100"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs text-slate-300">AI 负责人</label>
            <input
              value={draft.aiOwner}
              onChange={(event) => onChange("aiOwner", event.target.value)}
              placeholder="如：策划 AI / 洞察 AI"
              className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none transition focus:border-sky-400/40 focus:text-sky-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-slate-300">协同成员（可选）</label>
            <input
              value={draft.humanOwner}
              onChange={(event) => onChange("humanOwner", event.target.value)}
              placeholder="如：品牌经理 · Echo"
              className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none transition focus:border-sky-400/40 focus:text-sky-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-300">截止时间</label>
          <input
            type="datetime-local"
            value={dueAtInput}
            onChange={(event) => onChange("dueAt", event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none transition focus:border-sky-400/40 focus:text-sky-100"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-rose-400/40 bg-rose-400/10 px-3 py-2 text-xs text-rose-100">
            {error}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/20 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/30"
          >
            <Sparkles className="h-3.5 w-3.5" />
            确认添加
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-200/40 hover:text-white"
          >
            取消
          </button>
        </div>
      </form>
    </GlassPanel>
  );
}

function createTaskId() {
  return `task-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function getDefaultDueAt() {
  return new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
}

function createDefaultDraft(column?: WorkflowColumn): TaskDraft {
  const template = column?.tasks[0];
  return {
    title: "",
    type: template?.type ?? "协同任务",
    priority: template?.priority ?? "medium",
    aiOwner: template?.aiOwner ?? "协作 AI",
    humanOwner: "",
    dueAt: getDefaultDueAt(),
  };
}

function toLocalInputValue(isoString: string) {
  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

function fromLocalInputValue(value: string) {
  if (!value) {
    return getDefaultDueAt();
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? getDefaultDueAt() : date.toISOString();
}
