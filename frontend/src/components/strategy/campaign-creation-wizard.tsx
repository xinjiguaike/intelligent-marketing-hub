"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  strategyAiDigest,
  strategyAiSuggestions,
  strategyBriefChecklist,
  strategyBriefGuardrails,
  strategyBriefSummary,
  strategyCollaborationTimeline,
  strategyHandoffSummary,
  strategyJointStructure,
  strategyKeyOutputs,
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
  Omit<StrategyBriefChecklistItem, "status"> & {
    status: "done" | "pending" | "flagged";
  }
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
type HandoffTask = (typeof strategyHandoffSummary.newTasks)[number] & {
  status: "pending" | "synced";
};

type BriefFormState = {
  campaignName: string;
  timeframe: string;
  owner: string;
  budget: string;
  goalsInput: string;
  channelsInput: string;
  constraintsNote: string;
};

type InteractionNotesState = {
  brief: string;
  digest: string;
  joint: string;
  handoff: string;
};

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

const keyOutputStatusMap = {
  "已生成": {
    className: "text-emerald-200",
  },
  "人机共创中": {
    className: "text-sky-200",
  },
  "待复核": {
    className: "text-amber-200",
  },
} as const;

const splitMultiValue = (value: string) =>
  value
    .split(/[，,、/\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

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

  const [briefForm, setBriefForm] = useState<BriefFormState>(() => ({
    campaignName: strategyBriefSummary.campaignName,
    timeframe: strategyBriefSummary.timeframe,
    owner: strategyBriefSummary.owner,
    budget: strategyBriefSummary.budget,
    goalsInput: strategyBriefSummary.goals.join(" / "),
    channelsInput: strategyBriefSummary.primaryChannels.join(" / "),
    constraintsNote: "",
  }));

  const [interactionNotes, setInteractionNotes] = useState<InteractionNotesState>({
    brief: "",
    digest: "",
    joint: "",
    handoff: "",
  });

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
  const [handoffNewTasks, setHandoffNewTasks] = useState<HandoffTask[]>(() =>
    strategyHandoffSummary.newTasks.map((task) => ({
      ...task,
      status: "pending",
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

  const handleBriefFormChange = (
    field: keyof BriefFormState,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setBriefForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleInteractionNoteChange = (
    key: keyof InteractionNotesState,
    value: string
  ) => {
    setInteractionNotes((prev) => ({ ...prev, [key]: value }));
  };

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
            form={briefForm}
            onFormChange={handleBriefFormChange}
            aiNote={interactionNotes.brief}
            onAiNoteChange={(value) => handleInteractionNoteChange("brief", value)}
          />
        )}

        {activeStep.id === "digest" && (
          <AiDigestStep
            stream={aiDigestStream}
            isStreaming={isDigestStreaming}
            confirmations={confirmations}
            onResolve={handleResolveConfirmation}
            promptHistory={strategyPromptHistory}
            aiNote={interactionNotes.digest}
            onAiNoteChange={(value) => handleInteractionNoteChange("digest", value)}
          />
        )}

        {activeStep.id === "joint" && (
          <JointCalibrationStep
            workstreams={strategyJointStructure}
            suggestions={suggestions}
            onAcceptSuggestion={handleAcceptSuggestion}
            timeline={strategyCollaborationTimeline}
            versions={strategyVersionHistory}
            keyOutputs={strategyKeyOutputs}
            aiNote={interactionNotes.joint}
            onAiNoteChange={(value) => handleInteractionNoteChange("joint", value)}
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
            aiNote={interactionNotes.handoff}
            onAiNoteChange={(value) => handleInteractionNoteChange("handoff", value)}
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
  form: BriefFormState;
  onFormChange: (
    field: keyof BriefFormState,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  aiNote: string;
  onAiNoteChange: (value: string) => void;
};

function BriefIntakeStep({
  summary,
  guardrails,
  checklist,
  onCheck,
  isChecking,
  checkLog,
  form,
  onFormChange,
  aiNote,
  onAiNoteChange,
}: BriefIntakeStepProps) {
  const goals = splitMultiValue(form.goalsInput);
  const channels = splitMultiValue(form.channelsInput);
  const briefAiSuggestions = [
    "将 Brief 转写成标准模板并提示缺失项",
    "确认预算、KPI 是否互相矛盾并给出理由",
    "针对线下快闪活动列出必填安全信息",
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <h3 className="text-sm font-semibold text-white">Brief 快速填写入口</h3>
          <p className="mt-1 text-xs text-slate-400">
            在这里录入关键信息，系统会实时同步到下方概览与 AI 检查清单。
          </p>
          <div className="mt-4 grid gap-3 text-xs text-slate-300 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-slate-400">战役名称</span>
              <input
                className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-white outline-none transition focus:border-sky-400"
                value={form.campaignName}
                onChange={(event) => onFormChange("campaignName", event)}
                placeholder="如：未来随行新品发布"
              />
            </label>
            <label className="space-y-1">
              <span className="text-slate-400">时间范围</span>
              <input
                className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-white outline-none transition focus:border-sky-400"
                value={form.timeframe}
                onChange={(event) => onFormChange("timeframe", event)}
                placeholder="2024.08 - 2024.09"
              />
            </label>
            <label className="space-y-1">
              <span className="text-slate-400">负责人</span>
              <input
                className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-white outline-none transition focus:border-sky-400"
                value={form.owner}
                onChange={(event) => onFormChange("owner", event)}
                placeholder="品牌经理 · 李然"
              />
            </label>
            <label className="space-y-1">
              <span className="text-slate-400">预算上限</span>
              <input
                className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-white outline-none transition focus:border-sky-400"
                value={form.budget}
                onChange={(event) => onFormChange("budget", event)}
                placeholder="350 万"
              />
            </label>
          </div>
          <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-slate-400">业务目标（用 / 或换行分隔）</span>
              <textarea
                className="min-h-[76px] w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-white outline-none transition focus:border-sky-400"
                value={form.goalsInput}
                onChange={(event) => onFormChange("goalsInput", event)}
                placeholder="GMV +35% / 声量 +50%"
              />
            </label>
            <label className="space-y-1">
              <span className="text-slate-400">重点渠道（用 / 或换行分隔）</span>
              <textarea
                className="min-h-[76px] w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-white outline-none transition focus:border-sky-400"
                value={form.channelsInput}
                onChange={(event) => onFormChange("channelsInput", event)}
                placeholder="天猫旗舰店 / 抖音直播 / 私域社群"
              />
            </label>
          </div>
          <label className="mt-3 block text-xs text-slate-300">
            <span className="text-slate-400">补充约束或备注</span>
            <textarea
              className="mt-1 min-h-[80px] w-full rounded-2xl border border-dashed border-white/20 bg-slate-950/40 px-3 py-2 text-white outline-none transition focus:border-sky-400"
              value={form.constraintsNote}
              onChange={(event) => onFormChange("constraintsNote", event)}
              placeholder="示例：线下快闪需提供安全责任人、物料清单等信息"
            />
          </label>
        </div>
        <AiInteractionPanel
          title="如何让 NOVA 协助填写 Brief"
          description="把当前困惑写成一句话，或直接点击提示语调起 AI。NOVA 会读取左侧填入的信息给出校验意见。"
          suggestions={briefAiSuggestions}
          value={aiNote}
          onChange={onAiNoteChange}
          placeholder="示例：请帮我判断 Brief 是否可直接进入策略阶段，如不足请列出补充项"
        />
      </div>

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
            <li>战役名称：{form.campaignName || "未填写"}</li>
            <li>时间范围：{form.timeframe || "未填写"}</li>
            <li>负责人：{form.owner || "未填写"}</li>
            <li>预算上限：{form.budget || "未填写"}</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <h3 className="text-sm font-semibold text-white">目标与渠道</h3>
          <div className="mt-3">
            <p className="text-xs text-slate-400">业务目标</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-sky-100">
              {(goals.length ? goals : ["暂未填写"]).map((goal) => (
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
              {(channels.length ? channels : ["暂未填写"]).map((channel) => (
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
  aiNote: string;
  onAiNoteChange: (value: string) => void;
};

function AiDigestStep({
  stream,
  isStreaming,
  confirmations,
  onResolve,
  promptHistory,
  aiNote,
  onAiNoteChange,
}: AiDigestStepProps) {
  const digestAiSuggestions = [
    "总结刚才流式输出的要点，列出风险",
    "根据 Brief 给我 3 条不同假设的可行性",
    "继续追问：需要补充哪些数据点",
  ];
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
          <AiInteractionPanel
            title="如何继续追问 AI"
            description="将想要 AI 细化的方向写下来，例如请它加速生成竞品或受众洞察。"
            suggestions={digestAiSuggestions}
            value={aiNote}
            onChange={onAiNoteChange}
            placeholder="示例：请把当前假设转译为可视化看板的数据结构，并列出需要人工确认的 3 个节点"
          />
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
  keyOutputs: typeof strategyKeyOutputs;
  aiNote: string;
  onAiNoteChange: (value: string) => void;
};

function JointCalibrationStep({
  workstreams,
  suggestions,
  onAcceptSuggestion,
  timeline,
  versions,
  keyOutputs,
  aiNote,
  onAiNoteChange,
}: JointCalibrationStepProps) {
  const jointAiSuggestions = [
    "把内容策略做成 3 条 campaign message",
    "生成达人协作任务清单并区分 AI/人工",
    "查看是否有缺少 KPI 的策略段落",
  ];
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
          <AiInteractionPanel
            title="与 NOVA 共创提示"
            description="告诉 AI 你希望它补充的策略颗粒度，或直接点击提示词生成竞品、内容、达人等成果。"
            suggestions={jointAiSuggestions}
            value={aiNote}
            onChange={onAiNoteChange}
            placeholder="示例：请输出达人协同作战图的 V2 版本，突出内容分工 + 考核指标"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">关键输出成果</h3>
            <p className="text-xs text-slate-400">
              竞品分析、内容策略、达人战术等核心交付将在这里集中呈现。
            </p>
          </div>
          <Link href="#" className="text-[11px] text-sky-200 transition hover:text-sky-100">
            查看示例模版
          </Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {keyOutputs.map((output) => (
            <div
              key={output.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-300"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{output.owner}</span>
                <span className={keyOutputStatusMap[output.status]?.className ?? "text-slate-400"}>
                  {output.status}
                </span>
              </div>
              <h4 className="mt-2 text-base font-semibold text-white">{output.title}</h4>
              <p className="mt-2 leading-6 text-slate-300">{output.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-200">
                {output.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-slate-500">
                最近更新：
                {new Date(output.lastUpdated).toLocaleTimeString("zh-CN", {
                  hour12: false,
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
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
  aiNote: string;
  onAiNoteChange: (value: string) => void;
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
  aiNote,
  onAiNoteChange,
}: ExecutionHandoffStepProps) {
  const handoffAiSuggestions = [
    "总结关键交付物并提示缺失",
    "根据审批状态生成跟进提醒",
    "把任务包映射到 Workflow 看板的列",
  ];
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
        <div className="lg:col-span-2">
          <AiInteractionPanel
            title="交接阶段该如何问 AI"
            description="让 NOVA 帮你梳理导出物、审批或任务同步的优先级，点击提示即可一键生成指令。"
            suggestions={handoffAiSuggestions}
            value={aiNote}
            onChange={onAiNoteChange}
            placeholder="示例：请根据当前审批状态生成提醒话术，并把缺失的交付物列出来"
          />
        </div>
        {tasksSynced && (
          <div className="rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-xs text-sky-100 lg:col-span-2">
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

type AiInteractionPanelProps = {
  title: string;
  description: string;
  suggestions: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function AiInteractionPanel({
  title,
  description,
  suggestions,
  value,
  onChange,
  placeholder,
}: AiInteractionPanelProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(false);
  const handleSuggestionClick = (tip: string) => {
    onChange(value ? `${value}\n${tip}` : tip);
    setFeedback("已将提示语填入下方输入框，可继续补充后发送给 NOVA。");
    setHighlight(true);
    setTimeout(() => {
      setHighlight(false);
    }, 1200);
    setTimeout(() => {
      setFeedback(null);
    }, 3200);
  };
  return (
    <div className="rounded-2xl border border-sky-400/20 bg-sky-400/5 p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-sky-200" />
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs text-slate-200/80">{description}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-200">
        {suggestions.map((tip) => (
          <button
            key={tip}
            type="button"
            onClick={() => handleSuggestionClick(tip)}
            className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 transition hover:border-sky-300/60 hover:text-white"
          >
            {tip}
          </button>
        ))}
      </div>
      <div className="mt-3 text-xs text-slate-300">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-28 w-full rounded-2xl border border-white/15 bg-slate-950/40 px-3 py-2 text-white outline-none transition focus:border-sky-400",
            highlight && "border-sky-400/70 shadow-[0_0_0_2px_rgba(56,189,248,0.3)]"
          )}
        />
        <p className="mt-1 text-[11px] text-slate-400">
          NOVA 会记住这段指令，随时可复制到对话或触发下一步生成。
        </p>
        {feedback && (
          <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[11px] text-sky-100">
            <Sparkles className="h-3 w-3" />
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
