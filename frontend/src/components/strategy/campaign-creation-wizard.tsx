"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  strategyAiDigest,
  strategyAiSuggestions,
  strategyBriefChecklist,
  strategyBriefGuardrails,
  strategyBriefSummary,
  strategyCollaborationTimeline,
  strategyHandoffSummary,
  strategyJointStructure,
  strategyPromptHistory,
  strategyVersionHistory,
  type StrategyBriefChecklistItem,
} from "@/data/mock/strategy";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileText,
  Loader2,
  Map,
  PenLine,
  Sparkles,
  UploadCloud,
  Workflow,
} from "lucide-react";

const wizardSteps = [
  { id: "brief", title: "Brief Intake", caption: "采集并校验基础信息" },
  { id: "digest", title: "AI Digest", caption: "AI 解读并生成策略假设" },
  { id: "joint", title: "Joint Calibration", caption: "人机共创完善策略骨架" },
  { id: "handoff", title: "Execution Handoff", caption: "任务交接与导出同步" },
] as const;

type WizardStep = (typeof wizardSteps)[number];

type ChecklistState = Array<
  StrategyBriefChecklistItem & { status: "done" | "pending" | "flagged" }
>;

type ConfirmationState = Array<
  (typeof strategyAiDigest.confirmations)[number] & {
    status: "pending" | "todo" | "resolved";
  }
>;

type SuggestionState = Array<
  (typeof strategyAiSuggestions)[number] & {
    status: "pending" | "accepted" | "review";
  }
>;

const statusStyleMap = {
  done: {
    label: "已完成",
    className: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
  },
  pending: {
    label: "待处理",
    className: "border-amber-400/40 bg-amber-400/15 text-amber-100",
  },
  flagged: {
    label: "需补充",
    className: "border-rose-400/40 bg-rose-400/15 text-rose-100",
  },
} as const;

const confirmationStatus = {
  pending: {
    label: "待确认",
    className: "border-amber-400/40 bg-amber-400/15 text-amber-100",
  },
  todo: {
    label: "需补充",
    className: "border-rose-400/40 bg-rose-400/15 text-rose-100",
  },
  resolved: {
    label: "已确认",
    className: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
  },
} as const;

const jointStatusMap = {
  aligned: {
    label: "已对齐",
    className: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
  },
  review: {
    label: "待复核",
    className: "border-amber-400/40 bg-amber-400/10 text-amber-100",
  },
  pending: {
    label: "待确认",
    className: "border-slate-500/40 bg-slate-500/15 text-slate-200",
  },
} as const;

const suggestionStatusMap = {
  pending: {
    label: "待决定",
    className: "border-sky-400/40 bg-sky-400/15 text-sky-100",
  },
  accepted: {
    label: "已采纳",
    className: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
  },
  review: {
    label: "复核中",
    className: "border-amber-400/40 bg-amber-400/15 text-amber-100",
  },
} as const;

function useTimers() {
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const queue = (fn: () => void, delay: number) => {
    const timer = setTimeout(() => {
      fn();
      timersRef.current = timersRef.current.filter((item) => item !== timer);
    }, delay);
    timersRef.current.push(timer);
  };

  const clearAll = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  return { queue, clearAll };
}

export function CampaignCreationWizard() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const [briefChecklist, setBriefChecklist] = useState<ChecklistState>(() =>
    strategyBriefChecklist.map((item) => ({
      ...item,
      status: item.status as ChecklistState[number]["status"],
    }))
  );
  const [briefCheckLog, setBriefCheckLog] = useState("");
  const [isBriefChecking, setIsBriefChecking] = useState(false);

  const [aiDigestStream, setAiDigestStream] = useState("");
  const [isDigestStreaming, setIsDigestStreaming] = useState(false);
  const [digestHasStreamed, setDigestHasStreamed] = useState(false);
  const [confirmations, setConfirmations] = useState<ConfirmationState>(() =>
    strategyAiDigest.confirmations.map((item) => ({
      ...item,
      status: item.status as ConfirmationState[number]["status"],
    }))
  );

  const [suggestions, setSuggestions] = useState<SuggestionState>(() =>
    strategyAiSuggestions.map((item) => ({
      ...item,
      status: item.status as SuggestionState[number]["status"],
    }))
  );

  const [handoffWorkflow, setHandoffWorkflow] = useState(() => ({
    ...strategyHandoffSummary.workflow,
  }));
  const [handoffDeliverables, setHandoffDeliverables] = useState(() =>
    strategyHandoffSummary.deliverables.map((item) => ({ ...item }))
  );
  const [handoffNewTasks, setHandoffNewTasks] = useState(() =>
    strategyHandoffSummary.newTasks.map((task) => ({
      ...task,
      status: "pending" as const,
    }))
  );
  const [handoffSyncState, setHandoffSyncState] = useState<"idle" | "syncing" | "done">(
    "idle"
  );
  const [handoffApprovals, setHandoffApprovals] = useState(() =>
    strategyHandoffSummary.approvals.map((item) => ({ ...item }))
  );
  const [handoffNotice, setHandoffNotice] = useState<{
    type: "success" | "info";
    text: string;
  } | null>(null);
  const [hasSyncedTasks, setHasSyncedTasks] = useState(false);

  const { queue: queueTimer, clearAll: clearTimers } = useTimers();

  const activeStep = wizardSteps[activeStepIndex];

  const handleBriefCheck = () => {
    if (isBriefChecking) return;
    setBriefCheckLog("");
    setIsBriefChecking(true);
    clearTimers();
    const messages = [
      "AI 正在校验 Brief 完整度...",
      "检测品牌守护准则与约束条款...",
      "识别到 1 条合规风险：线下快闪安全规范未填写。",
      "建议补充附件：线下场地平面图；可直接上传至下方附件区。",
    ];
    messages.forEach((message, index) => {
      queueTimer(() => {
        setBriefCheckLog((prev) => (prev ? `${prev}\n${message}` : message));
        if (index === messages.length - 1) {
          setIsBriefChecking(false);
          setBriefChecklist((prev) =>
            prev.map((item) => {
              if (item.id === "check-constraint") {
                return { ...item, status: "flagged" };
              }
              if (item.id === "check-attachment") {
                return { ...item, status: "pending" };
              }
              return { ...item, status: "done" };
            })
          );
        }
      }, index * 800);
    });
  };

  useEffect(() => {
    if (activeStep.id === "digest" && !digestHasStreamed) {
      setIsDigestStreaming(true);
      setAiDigestStream("");
      strategyAiDigest.segments.forEach((segment, index) => {
        queueTimer(() => {
          setAiDigestStream((prev) =>
            prev ? `${prev}\n\n${segment}` : `${segment}`
          );
          if (index === strategyAiDigest.segments.length - 1) {
            setIsDigestStreaming(false);
            setDigestHasStreamed(true);
          }
        }, index * 900);
      });
    }
    // cleanup timers when leaving digest step
    return () => {
      if (activeStep.id !== "digest") {
        clearTimers();
        setIsDigestStreaming(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep.id]);

  const handleResolveConfirmation = (id: string) => {
    setConfirmations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "resolved" } : item
      )
    );
  };

  const handleAcceptSuggestion = (id: string) => {
    setSuggestions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "accepted" } : item
      )
    );
  };

  const handleSyncWorkflow = () => {
    if (handoffSyncState === "syncing") return;
    setHandoffSyncState("syncing");
    clearTimers();
    queueTimer(() => {
      setHandoffSyncState("done");
      setHasSyncedTasks(true);
      setHandoffWorkflow((prev) => ({
        ...prev,
        syncedTasks: prev.totalTasks,
        pendingTasks: 0,
        lastSyncAt: new Date().toISOString(),
      }));
      setHandoffDeliverables((prev) =>
        prev.map((item) =>
          item.id === "deliverable-playbook" ? { ...item, status: "已同步" } : item
        )
      );
      setHandoffNewTasks((prev) =>
        prev.map((task) => ({
          ...task,
          status: "synced" as const,
        }))
      );
      setHandoffNotice({
        type: "success",
        text: "已同步最新任务包至 Workflow，看板正在刷新。",
      });
    }, 1800);
  };

  const handleApprovalComplete = (approvalId: string) => {
    setHandoffApprovals((prev) =>
      prev.map((item) =>
        item.id === approvalId ? { ...item, status: "done" as const } : item
      )
    );
    const approval = strategyHandoffSummary.approvals.find((item) => item.id === approvalId);
    if (approval) {
      setHandoffNotice({
        type: "success",
        text: `已标记「${approval.label}」为完成。`,
      });
    }
  };

  const handleApprovalReminder = (approvalId: string) => {
    const approval = strategyHandoffSummary.approvals.find((item) => item.id === approvalId);
    if (approval) {
      setHandoffNotice({
        type: "info",
        text: `已向 ${approval.owner} 发送提醒通知。`,
      });
    }
  };

  const handleExport = (label: string) => {
    setHandoffNotice({
      type: "success",
      text: `已生成 ${label}，可在下载中心查看示例文件。`,
    });
  };

  useEffect(() => {
    if (!handoffNotice) return;
    const timer = setTimeout(() => {
      setHandoffNotice(null);
    }, 3600);
    return () => clearTimeout(timer);
  }, [handoffNotice]);

  const completedStepsCount = useMemo(() => {
    if (activeStepIndex === wizardSteps.length - 1) {
      return wizardSteps.length;
    }
    return activeStepIndex;
  }, [activeStepIndex]);

  const goNext = () => {
    if (activeStepIndex < wizardSteps.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
      <StepHeader
        steps={wizardSteps}
        activeStep={activeStep}
        completedCount={completedStepsCount}
        onStepClick={setActiveStepIndex}
      />

      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_0_28px_rgba(56,189,248,0.2)]">
        {activeStep.id === "brief" && (
          <BriefIntakeStep
            checklist={briefChecklist}
            guardrails={strategyBriefGuardrails}
            summary={strategyBriefSummary}
            onCheck={handleBriefCheck}
            isChecking={isBriefChecking}
            checkLog={briefCheckLog}
          />
        )}

        {activeStep.id === "digest" && (
          <AiDigestStep
            stream={aiDigestStream}
            isStreaming={isDigestStreaming}
            confirmations={confirmations}
            onResolve={handleResolveConfirmation}
            promptHistory={strategyPromptHistory}
          />
        )}

        {activeStep.id === "joint" && (
          <JointCalibrationStep
            workstreams={strategyJointStructure}
            suggestions={suggestions}
            onAcceptSuggestion={handleAcceptSuggestion}
            timeline={strategyCollaborationTimeline}
            versions={strategyVersionHistory}
          />
        )}

        {activeStep.id === "handoff" && (
          <ExecutionHandoffStep
            summary={strategyHandoffSummary}
            workflow={handoffWorkflow}
            deliverables={handoffDeliverables}
            approvals={handoffApprovals}
            syncState={handoffSyncState}
            notice={handoffNotice}
            newTasks={handoffNewTasks}
            tasksSynced={hasSyncedTasks}
            onSync={handleSyncWorkflow}
            onApprovalComplete={handleApprovalComplete}
            onApprovalRemind={handleApprovalReminder}
            onExport={handleExport}
          />
        )}
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-xs text-slate-400">
          <PenLine className="h-4 w-4 text-sky-300" />
          随时可保存草稿，切换步骤不会丢失进度。
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeStepIndex === 0}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100",
              activeStepIndex === 0 && "cursor-not-allowed opacity-60 hover:border-white/10"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            上一步
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={activeStepIndex === wizardSteps.length - 1}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-sm font-semibold text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.28)] transition hover:bg-sky-400/25",
              activeStepIndex === wizardSteps.length - 1 && "cursor-not-allowed opacity-60 hover:bg-sky-400/15"
            )}
          >
            下一步
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}

type StepHeaderProps = {
  steps: readonly WizardStep[];
  activeStep: WizardStep;
  completedCount: number;
  onStepClick: (index: number) => void;
};

function StepHeader({ steps, activeStep, completedCount, onStepClick }: StepHeaderProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {steps.map((step, index) => {
        const isActive = step.id === activeStep.id;
        const isCompleted = index < completedCount;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick(index)}
            className={cn(
              "flex flex-col gap-1 rounded-2xl border px-4 py-4 text-left transition",
              isActive
                ? "border-sky-400/60 bg-sky-400/15 text-white shadow-[0_0_22px_rgba(56,189,248,0.25)]"
                : isCompleted
                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-400/30 hover:text-sky-100"
            )}
          >
            <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Step {index + 1}
            </span>
            <span className="text-sm font-semibold">{step.title}</span>
            <span className="text-xs text-slate-400">{step.caption}</span>
          </button>
        );
      })}
    </div>
  );
}

type BriefIntakeStepProps = {
  summary: typeof strategyBriefSummary;
  guardrails: readonly string[];
  checklist: ChecklistState;
  onCheck: () => void;
  isChecking: boolean;
  checkLog: string;
};

function BriefIntakeStep({
  summary,
  guardrails,
  checklist,
  onCheck,
  isChecking,
  checkLog,
}: BriefIntakeStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">1. Brief 信息概览</h2>
          <p className="text-sm text-slate-300">
            快速核对目标、预算、渠道与附件。可在此执行 AI 合规检查。
          </p>
        </div>
        <button
          type="button"
          onClick={onCheck}
          disabled={isChecking}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25",
            isChecking && "cursor-not-allowed opacity-60"
          )}
        >
          {isChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {isChecking ? "AI 检查中..." : "AI 检查合规项"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <h3 className="text-sm font-semibold text-white">基础信息</h3>
          <ul className="mt-3 space-y-2 text-xs text-slate-300">
            <li>战役名称：{summary.campaignName}</li>
            <li>时间范围：{summary.timeframe}</li>
            <li>负责人：{summary.owner}</li>
            <li>预算上限：{summary.budget}</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <h3 className="text-sm font-semibold text-white">目标与渠道</h3>
          <div className="mt-3">
            <p className="text-xs text-slate-400">业务目标</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-sky-100">
              {summary.goals.map((goal) => (
                <span
                  key={goal}
                  className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-slate-400">重点渠道</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
              {summary.primaryChannels.map((channel) => (
                <span
                  key={channel}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">AI 检查清单</h3>
            <span className="text-xs text-slate-400">
              {checklist.filter((item) => item.status === "done").length} / {checklist.length}
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {checklist.map((item) => {
              const meta = statusStyleMap[item.status];
              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-xs text-slate-300"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-slate-200">{item.label}</span>
                    <span className={cn("inline-flex items-center gap-2 rounded-full border px-2 py-1", meta.className)}>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {meta.label}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">{item.note}</p>
                </div>
              );
            })}
          </div>
          {checkLog && (
            <div className="mt-3 rounded-xl border border-sky-400/30 bg-sky-400/10 p-3 text-xs text-sky-100">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI 检查结果
              </div>
              <pre className="mt-2 whitespace-pre-wrap leading-6 text-sky-50">
                {checkLog}
              </pre>
            </div>
          )}
        </div>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <h3 className="text-sm font-semibold text-white">品牌守护准则</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {guardrails.map((rule) => (
              <li key={rule} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                {rule}
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <p className="text-xs text-slate-400">附件</p>
            <div className="mt-2 space-y-2 text-xs text-slate-300">
              {summary.attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <span>{file.name}</span>
                  <span className="text-slate-500">{file.size}</span>
                </div>
              ))}
              <button className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-3 py-2 text-[11px] text-slate-400 transition hover:border-sky-400/40 hover:text-sky-100">
                <UploadCloud className="h-3.5 w-3.5" />
                上传附件
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type AiDigestStepProps = {
  stream: string;
  isStreaming: boolean;
  confirmations: ConfirmationState;
  onResolve: (id: string) => void;
  promptHistory: typeof strategyPromptHistory;
};

function AiDigestStep({
  stream,
  isStreaming,
  confirmations,
  onResolve,
  promptHistory,
}: AiDigestStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">2. AI 解读 Brief</h2>
          <p className="text-sm text-slate-300">
            展示 AI 生成的策略摘要与战役假设，确认关键节点后可进入共创阶段。
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
          <Bot className="h-3.5 w-3.5 text-sky-300" />
          AI 策划官 NOVA
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">AI 流式策划摘要</h3>
            <div className="inline-flex items-center gap-2 text-[11px] text-slate-400">
              <button className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 transition hover:border-sky-300/30 hover:text-sky-200">
                导出 Markdown
              </button>
              <button className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 transition hover:border-sky-300/30 hover:text-sky-200">
                暂停
              </button>
            </div>
          </div>
          <div className="mt-4 h-[260px] overflow-y-auto rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-slate-200">
            {stream ? (
              <pre className="whitespace-pre-wrap">{stream}</pre>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                正在等待 AI 输出...
              </div>
            )}
          </div>
          {!isStreaming && stream && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-100">
              <CheckCircle2 className="h-3.5 w-3.5" />
              完成生成，可进入人机共创
            </div>
          )}
          {isStreaming && (
            <div className="mt-3 inline-flex items-center gap-2 text-xs text-sky-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
              AI 正在补全策略假设...
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <h3 className="text-sm font-semibold text-white">需确认节点</h3>
            <div className="mt-3 space-y-2 text-xs text-slate-300">
              {confirmations.map((item) => {
                const meta = confirmationStatus[item.status];
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2"
                  >
                    <span>{item.label}</span>
                    <button
                      type="button"
                      onClick={() => onResolve(item.id)}
                      disabled={item.status === "resolved"}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1 transition",
                        meta.className,
                        item.status === "resolved" && "cursor-not-allowed opacity-60"
                      )}
                    >
                      {item.status === "resolved" ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {meta.label}
                        </>
                      ) : (
                        <>
                          <ClipboardCheck className="h-3.5 w-3.5" />
                          标记完成
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Prompt 协同记录</h3>
              <Link
                href="#"
                className="text-[11px] text-sky-200 transition hover:text-sky-100"
              >
                查看全部
              </Link>
            </div>
            <div className="mt-3 space-y-3 text-xs">
              {promptHistory.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-xl border p-3 leading-6",
                    item.role === "ai"
                      ? "border-sky-400/30 bg-sky-400/10 text-sky-100"
                      : "border-white/10 bg-white/5 text-slate-200"
                  )}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{item.role === "ai" ? "AI 回复" : "人工指令"}</span>
                    <span>
                      {new Date(item.createdAt).toLocaleTimeString("zh-CN", {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mt-2">{item.content}</p>
                  {typeof item.score === "number" && (
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-100">
                      协同评分 {item.score.toFixed(1)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type JointCalibrationStepProps = {
  workstreams: typeof strategyJointStructure;
  suggestions: SuggestionState;
  onAcceptSuggestion: (id: string) => void;
  timeline: typeof strategyCollaborationTimeline;
  versions: typeof strategyVersionHistory;
};

function JointCalibrationStep({
  workstreams,
  suggestions,
  onAcceptSuggestion,
  timeline,
  versions,
}: JointCalibrationStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">3. 人机共创校准策略</h2>
          <p className="text-sm text-slate-300">
            将 AI 输出的策略骨架与人工判断结合，采纳建议后同步更新版本。
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
          <Map className="h-3.5 w-3.5" />
          共创阶段
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {workstreams.map((stream) => {
          const meta = jointStatusMap[stream.status];
          return (
            <div
              key={stream.id}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-white">{stream.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{stream.summary}</p>
                </div>
                <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px]", meta.className)}>
                  {meta.label}
                </span>
              </div>
              <div className="mt-3 space-y-2 text-xs text-slate-300">
                {stream.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-400">
                负责人：{stream.owner}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">AI 建议</h3>
            <span className="text-[11px] text-slate-400">
              已采纳 {suggestions.filter((item) => item.status === "accepted").length} /{" "}
              {suggestions.length}
            </span>
          </div>
          <div className="mt-3 space-y-3">
            {suggestions.map((suggestion) => {
              const meta = suggestionStatusMap[suggestion.status];
              return (
                <div
                  key={suggestion.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-white">{suggestion.title}</h4>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px]",
                        meta.className
                      )}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-300">{suggestion.detail}</p>
                  <p className="mt-2 text-slate-400">影响：{suggestion.impact}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-slate-500">Owner：{suggestion.owner}</span>
                    <button
                      type="button"
                      onClick={() => onAcceptSuggestion(suggestion.id)}
                      disabled={suggestion.status === "accepted"}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sky-100 transition hover:bg-sky-400/20",
                        suggestion.status === "accepted" && "cursor-not-allowed opacity-50"
                      )}
                    >
                      采纳建议
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <h3 className="text-sm font-semibold text-white">协同记录</h3>
            <div className="mt-3 space-y-3">
              {timeline.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-xs",
                    item.sender === "ai"
                      ? "border-sky-400/30 bg-sky-400/10 text-sky-100"
                      : "border-white/10 bg-white/5 text-slate-200"
                  )}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{item.stage}</span>
                    <span>{item.timestamp}</span>
                  </div>
                  <p className="mt-2 text-slate-200">
                    {item.speaker} · {item.action}
                  </p>
                  <p className="mt-1">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">版本历史</h3>
              <Download className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-3 space-y-2 text-xs text-slate-300">
              {versions.map((version, index) => (
                <div
                  key={version.id}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span>{version.label}</span>
                    <span>
                      {new Date(version.timestamp).toLocaleTimeString("zh-CN", {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mt-1 text-slate-300">{version.summary}</p>
                  <p className="mt-1 text-slate-500">
                    {index === 0 ? "首个版本" : "较上一版 +45 分钟"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ExecutionHandoffStepProps = {
  summary: typeof strategyHandoffSummary;
  workflow: typeof strategyHandoffSummary.workflow;
  deliverables: Array<typeof strategyHandoffSummary.deliverables[number]>;
  approvals: Array<
    typeof strategyHandoffSummary.approvals[number] & { status: string }
  >;
  newTasks: Array<
    typeof strategyHandoffSummary.newTasks[number] & { status: "pending" | "synced" }
  >;
  tasksSynced: boolean;
  syncState: "idle" | "syncing" | "done";
  notice: { type: "success" | "info"; text: string } | null;
  onSync: () => void;
  onApprovalComplete: (id: string) => void;
  onApprovalRemind: (id: string) => void;
  onExport: (label: string) => void;
};

const approvalStatusMeta: Record<
  string,
  { label: string; className: string }
> = {
  pending: {
    label: "待确认",
    className: "text-amber-200",
  },
  "in-progress": {
    label: "进行中",
    className: "text-sky-200",
  },
  done: {
    label: "已完成",
    className: "text-emerald-200",
  },
};

function ExecutionHandoffStep({
  summary,
  workflow,
  deliverables,
  approvals,
  newTasks,
  tasksSynced,
  syncState,
  notice,
  onSync,
  onApprovalComplete,
  onApprovalRemind,
  onExport,
}: ExecutionHandoffStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">4. 执行交接与导出</h2>
          <p className="text-sm text-slate-300">
            汇总交付物、审批与任务包，同步至 Workflow 或导出文档，完成策划闭环。
          </p>
        </div>
        <button
          type="button"
          onClick={onSync}
          disabled={syncState !== "idle"}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-sm font-semibold text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.28)] transition hover:bg-sky-400/25",
            syncState !== "idle" && "cursor-not-allowed opacity-60"
          )}
        >
          {syncState === "syncing" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Workflow className="h-4 w-4" />
          )}
          {syncState === "idle" && "同步至 Workflow"}
          {syncState === "syncing" && "同步中..."}
          {syncState === "done" && "同步完成"}
        </button>
      </div>

      {notice && (
        <div
          className={cn(
            "rounded-2xl border px-4 py-3 text-xs",
            notice.type === "success"
              ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-100"
              : "border-sky-400/40 bg-sky-400/15 text-sky-100"
          )}
        >
          <div className="flex items-center gap-2">
            {notice.type === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {notice.text}
          </div>
        </div>
      )}

      {syncState === "done" && (
        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/15 px-4 py-3 text-xs text-emerald-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            已成功推送 {workflow.syncedTasks} 个任务至 Workflow，看板状态已刷新。
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <h3 className="text-sm font-semibold text-white">任务与交付物</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
                总任务数
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {workflow.totalTasks}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                已同步 {workflow.syncedTasks} / 待处理 {workflow.pendingTasks}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
                上次同步
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                {new Date(workflow.lastSyncAt).toLocaleTimeString("zh-CN", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="mt-1 text-xs text-slate-400">同步主负责：AI 策划官 NOVA</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs text-slate-300">
            {deliverables.map((deliverable) => (
              <div
                key={deliverable.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
              >
                <div>
                  <p className="text-sm text-white">{deliverable.label}</p>
                  <p className="text-[11px] text-slate-400">Owner：{deliverable.owner}</p>
                </div>
                <span className="text-[11px] text-slate-400">{deliverable.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <h3 className="text-sm font-semibold text-white">审批进度</h3>
            <div className="mt-3 space-y-2 text-xs text-slate-300">
              {approvals.map((approval) => (
                <div
                  key={approval.id}
                  className="space-y-2 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white">{approval.label}</p>
                    <span
                      className={cn(
                        "text-[11px] font-semibold",
                        approvalStatusMeta[approval.status]?.className ?? "text-slate-400"
                      )}
                    >
                      {approvalStatusMeta[approval.status]?.label ?? approval.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Owner：{approval.owner}</span>
                    <span>
                      截止{" "}
                      {new Date(approval.dueAt).toLocaleTimeString("zh-CN", {
                        hour12: false,
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => onApprovalComplete(approval.id)}
                      disabled={approval.status === "done"}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-emerald-100 transition hover:bg-emerald-400/20",
                        approval.status === "done" && "cursor-not-allowed opacity-60"
                      )}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      标记完成
                    </button>
                    <button
                      type="button"
                      onClick={() => onApprovalRemind(approval.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-300 transition hover:border-sky-400/30 hover:text-sky-100"
                    >
                      <AlertCircle className="h-3.5 w-3.5 text-amber-200" />
                      发送提醒
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <h3 className="text-sm font-semibold text-white">导出与分享</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
              {summary.exports.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onExport(item.label)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 transition hover:border-sky-400/30 hover:text-sky-100"
                >
                  <FileText className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              导出内容将包含最新策略骨架、AI 生成记录与任务分发明细。
            </p>
          </div>
        </div>
        {tasksSynced && (
          <div className="rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-xs text-sky-100">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">已推送至 Workflow 的任务</p>
                <p className="text-sky-100/80">在 Workflow 看板可继续分配这些新任务。</p>
              </div>
              <Link
                href="/workflow?from=strategy-handoff"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] text-sky-50 transition hover:border-white/40 hover:text-white"
              >
                打开 Workflow
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-3 space-y-2">
              {newTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/5 px-3 py-2"
                >
                  <div>
                    <p className="text-sm text-white">{task.title}</p>
                    <p className="text-[11px] text-sky-100/80">
                      AI：{task.aiOwner} · 负责人：{task.humanOwner}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/20 px-2 py-0.5 text-[11px] uppercase tracking-widest">
                    {task.column}
                  </span>
                  <span className="text-[11px] text-sky-100/80">
                    截止 {new Date(task.dueAt).toLocaleTimeString("zh-CN", {
                      hour12: false,
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-300" />
          提醒：完成审批和 Workflow 同步后，请在 24 小时内更新项目复盘看板。
        </div>
      </div>
    </div>
  );
}
