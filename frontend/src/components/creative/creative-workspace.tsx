"use client";

import { useEffect, useRef, useState } from "react";
import {
  collaborationMessages,
  creativeCanvasMap,
  creativeChecklist,
  creativePromptLibrary,
  creativeTabs,
  creativeTaskSummary,
  creativeVersions,
  creativeWorkflowPush,
  referenceAssets,
} from "@/data/mock/creative";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleDashed,
  Clapperboard,
  GalleryHorizontalEnd,
  Lightbulb,
  ArrowRight,
  Loader2,
  NotebookPen,
  Palette,
  Save,
  Share2,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";

type CanvasMap = typeof creativeCanvasMap;
type CopyCanvas = CanvasMap["图文智创"];
type PosterCanvas = CanvasMap["海报智绘"];
type StoryboardCanvas = CanvasMap["视频智创"];
type CopySection = {
  id: string;
  title: string;
  content: string;
};
type CopyRefineMap = NonNullable<CopyCanvas["ai"]>["refine"];
type CopyRefineConfig = CopyRefineMap[keyof CopyRefineMap];
type StoryboardScene = {
  id: string;
  title: string;
  visual: string;
  dialogue: string;
};
type PosterState = {
  concept: string;
  tagline: string;
  palette: PosterCanvas["palette"][number][];
  focalPoints: string[];
  layoutNotes: string[];
};
type StoryboardState = {
  duration: string;
  scenes: StoryboardScene[];
  outro: string;
};

const tabIconMap = {
  图文智创: NotebookPen,
  海报智绘: Palette,
  视频智创: Clapperboard,
} as const;

const deliverableStatusMap = {
  进行中: {
    className: "border-sky-400/40 bg-sky-400/15 text-sky-100",
    icon: Timer,
  },
  待开启: {
    className: "border-slate-500/40 bg-slate-500/15 text-slate-300",
    icon: CircleDashed,
  },
  已完成: {
    className: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
    icon: CheckCircle2,
  },
  已推送: {
    className: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
    icon: CheckCircle2,
  },
} as const;

const checklistStatusMap = {
  done: {
    label: "已完成",
    className: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
    icon: CheckCircle2,
  },
  pending: {
    label: "待确认",
    className: "border-amber-400/40 bg-amber-400/10 text-amber-100",
    icon: CircleDashed,
  },
} as const;

const creationGuides = {
  copy: [
    {
      title: "1. 明确需求",
      detail: "从左侧资产库挑选灵感，核对守护准则与目标信息。",
    },
    {
      title: "2. AI 生成草稿",
      detail: "点击“AI 续写”生成段落，对指定段落使用“智能润色”补充细节。",
    },
    {
      title: "3. 调整并导出",
      detail: "在底部图文预览中检查整体内容，必要时再次润色后导出。",
    },
  ],
  poster: [
    {
      title: "1. 设定视觉方向",
      detail: "确认海报概念与调色板，结合资产库调整光效与构图。",
    },
    {
      title: "2. 获取 AI 建议",
      detail: "使用“AI 续写”获取布局/焦点建议，更新右侧视觉提示列表。",
    },
    {
      title: "3. 输出物料",
      detail: "同步设计需求至 Workflow，导出说明给设计执行。",
    },
  ],
  storyboard: [
    {
      title: "1. 拆解场景",
      detail: "核对剧情节奏与场景数量，补充关键镜头需求。",
    },
    {
      title: "2. 扩展分镜",
      detail: "通过“AI 续写”生成新增场景或对白，记录镜头备注。",
    },
    {
      title: "3. 交接执行",
      detail: "同步分镜任务至 Workflow，并导出脚本供拍摄团队使用。",
    },
  ],
} as const;

export function CreativeWorkspace() {
  type DeliverableStatus = keyof typeof deliverableStatusMap;
  type Deliverable = Omit<
    (typeof creativeTaskSummary.deliverables)[number],
    "status"
  > & {
    status: DeliverableStatus;
  };
  type WorkflowTaskStatus = "pending" | "synced";
  type WorkflowTask = (typeof creativeWorkflowPush)[number] & {
    status: WorkflowTaskStatus;
  };

  const [activeTab, setActiveTab] = useState<(typeof creativeTabs)[number]>(
    creativeTabs[0]
  );
  const [isCollabOpen, setCollabOpen] = useState(false);
  const [deliverables, setDeliverables] = useState<Deliverable[]>(() =>
    creativeTaskSummary.deliverables.map((item) => ({ ...item }))
  );
  const [workflowSyncState, setWorkflowSyncState] = useState<
    "idle" | "syncing" | "done"
  >("idle");
  const [workflowNotice, setWorkflowNotice] = useState<string | null>(null);
  const [workflowTasks, setWorkflowTasks] = useState<WorkflowTask[]>(() =>
    creativeWorkflowPush.map((task) => ({ ...task, status: "pending" }))
  );
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleWorkflowSync = () => {
    if (workflowSyncState === "syncing" || workflowSyncState === "done") {
      return;
    }
    if (syncTimer.current) {
      clearTimeout(syncTimer.current);
    }
    setWorkflowSyncState("syncing");
    setWorkflowNotice(null);
    syncTimer.current = setTimeout(() => {
      setWorkflowSyncState("done");
      setDeliverables((prev) =>
        prev.map((item) =>
          item.id === "deliverable-copy" || item.id === "deliverable-video"
            ? { ...item, status: "已推送" }
            : item
        )
      );
      setWorkflowTasks((prev) =>
        prev.map((task) => ({ ...task, status: "synced" as const }))
      );
      setWorkflowNotice(
        "已推送 3 个创意任务至 Workflow，前往 Workflow 看板即可查看。"
      );
    }, 1400);
  };

  useEffect(() => {
    return () => {
      if (syncTimer.current) {
        clearTimeout(syncTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!workflowNotice) return;
    const timer = setTimeout(() => setWorkflowNotice(null), 3600);
    return () => clearTimeout(timer);
  }, [workflowNotice]);

  const initialCanvas = creativeCanvasMap[creativeTabs[0]];
  const [copySections, setCopySections] = useState<CopySection[]>(
    initialCanvas.type === "copy"
      ? initialCanvas.sections.map((section) => ({ ...section }))
      : []
  );
  const [posterData, setPosterData] = useState<PosterState | null>(null);
  const [storyboardData, setStoryboardData] = useState<StoryboardState | null>(null);

  const [isAiStreaming, setIsAiStreaming] = useState(false);
  const [aiStreamBuffer, setAiStreamBuffer] = useState("");
  const [aiStreamCompleted, setAiStreamCompleted] = useState(false);
  const [sectionStreamingId, setSectionStreamingId] = useState<string | null>(null);
  const [sectionStreamBuffer, setSectionStreamBuffer] = useState("");

  const isMounted = useRef(true);
  const streamTimers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      streamTimers.current.forEach(clearTimeout);
      streamTimers.current = [];
    };
  }, []);

  const clearStreamTimers = () => {
    streamTimers.current.forEach(clearTimeout);
    streamTimers.current = [];
  };

  useEffect(() => {
    const canvas = creativeCanvasMap[activeTab];
    clearStreamTimers();
    setIsAiStreaming(false);
    setAiStreamBuffer("");
    setAiStreamCompleted(false);
    setSectionStreamingId(null);
    setSectionStreamBuffer("");

    if (canvas.type === "copy") {
      setCopySections(canvas.sections.map((section) => ({ ...section })));
      setPosterData(null);
      setStoryboardData(null);
    } else if (canvas.type === "poster") {
      setPosterData({
        concept: canvas.concept,
        tagline: canvas.tagline,
        palette: canvas.palette.map((item) => ({ ...item })),
        focalPoints: [...canvas.focalPoints],
        layoutNotes: [...canvas.layoutNotes],
      });
      setCopySections([]);
      setStoryboardData(null);
    } else {
      setStoryboardData({
        duration: canvas.duration,
        scenes: canvas.scenes.map((scene) => ({ ...scene })),
        outro: canvas.outro,
      });
      setCopySections([]);
      setPosterData(null);
    }
  }, [activeTab]);

  const simulateStream = async (
    chunks: readonly string[],
    onChunk: (value: string) => void
  ) => {
    return new Promise<void>((resolve) => {
      let index = 0;
      let buffer = "";

      const emit = () => {
        if (!isMounted.current) {
          resolve();
          return;
        }

        if (index >= chunks.length) {
          resolve();
          return;
        }

        buffer += chunks[index];
        onChunk(buffer);
        index += 1;

        const timer = setTimeout(() => {
          emit();
        }, index < chunks.length ? 520 : 360);
        streamTimers.current.push(timer);
      };

      emit();
    });
  };

  const handleAiContinue = async () => {
    const canvas = creativeCanvasMap[activeTab];
    const continuation = canvas.ai?.continuation;

    if (!continuation || isAiStreaming || sectionStreamingId !== null) {
      return;
    }

    clearStreamTimers();
    setIsAiStreaming(true);
    setAiStreamBuffer("");
    setAiStreamCompleted(false);

    await simulateStream(continuation.chunks, (value) => {
      if (isMounted.current) {
        setAiStreamBuffer(value);
      }
    });

    if (!isMounted.current) {
      return;
    }

    setIsAiStreaming(false);
    setAiStreamCompleted(true);

    if (canvas.type === "copy") {
      const copyContinuation =
        continuation as NonNullable<CopyCanvas["ai"]>["continuation"];
      const sectionResult = copyContinuation.result;
      setCopySections((prev) => {
        const exists = prev.find((section) => section.id === sectionResult.id);
        if (exists) {
          return prev.map((section) =>
            section.id === sectionResult.id ? { ...sectionResult } : section
          );
        }
        return [...prev, { ...sectionResult }];
      });
    } else if (canvas.type === "poster") {
      const posterContinuation =
        continuation as NonNullable<PosterCanvas["ai"]>["continuation"];
      setPosterData((prev) => {
        if (!prev) {
          return prev;
        }
        if (prev.layoutNotes.includes(posterContinuation.result)) {
          return prev;
        }
        return {
          ...prev,
          layoutNotes: [...prev.layoutNotes, posterContinuation.result],
        };
      });
    } else if (canvas.type === "storyboard") {
      const storyboardContinuation =
        continuation as NonNullable<StoryboardCanvas["ai"]>["continuation"];
      setStoryboardData((prev) => {
        if (!prev) {
          return prev;
        }
        if (prev.scenes.some((scene) => scene.id === storyboardContinuation.result.id)) {
          return prev;
        }
        return {
          ...prev,
          scenes: [...prev.scenes, { ...storyboardContinuation.result }],
        };
      });
    }
  };

  const handleSectionRefine = async (sectionId: string) => {
    const canvas = creativeCanvasMap[activeTab];
    if (canvas.type !== "copy" || isAiStreaming || sectionStreamingId !== null) {
      return;
    }

    const refineMap = canvas.ai?.refine as Record<string, CopyRefineConfig> | undefined;
    const refineConfig = refineMap?.[sectionId];

    if (!refineConfig) {
      return;
    }

    clearStreamTimers();
    setSectionStreamingId(sectionId);
    setSectionStreamBuffer("");

    await simulateStream(refineConfig.chunks, (value) => {
      if (isMounted.current) {
        setSectionStreamBuffer(value);
      }
    });

    if (!isMounted.current) {
      return;
    }

    setCopySections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }
        if (refineConfig.mode === "append") {
          if (section.content.includes(refineConfig.result)) {
            return section;
          }
          return {
            ...section,
            content: `${section.content.trim()}\n\n${refineConfig.result}`,
          };
        }
        return {
          ...section,
          content: refineConfig.result,
        };
      })
    );

    setSectionStreamingId(null);
    setSectionStreamBuffer("");
  };

  const canvas = creativeCanvasMap[activeTab];
  const ActiveIcon = tabIconMap[activeTab];
  const guideSteps =
    canvas.type === "copy"
      ? creationGuides.copy
      : canvas.type === "poster"
      ? creationGuides.poster
      : creationGuides.storyboard;
  const copyRefineMap: Record<string, CopyRefineConfig> | undefined =
    canvas.type === "copy" && canvas.ai?.refine
      ? (canvas.ai.refine as Record<string, CopyRefineConfig>)
      : undefined;
  const aiContinuationAvailable = Boolean(canvas.ai?.continuation);
  const aiContinueDisabled =
    !aiContinuationAvailable || isAiStreaming || sectionStreamingId !== null;

  const fallbackPoster: PosterState | null =
    canvas.type === "poster"
      ? {
          concept: canvas.concept,
          tagline: canvas.tagline,
          palette: canvas.palette.map((item) => ({ ...item })),
          focalPoints: [...canvas.focalPoints],
          layoutNotes: [...canvas.layoutNotes],
        }
      : null;

  const fallbackStoryboard: StoryboardState | null =
    canvas.type === "storyboard"
      ? {
          duration: canvas.duration,
          scenes: canvas.scenes.map((scene) => ({ ...scene })),
          outro: canvas.outro,
        }
      : null;

  const copyPreview =
    canvas.type === "copy"
      ? copySections
          .map((section) => `${section.title}\n${section.content}`)
          .join("\n\n")
      : "";

  const gridTemplate = isCollabOpen
    ? "xl:grid-cols-[0.85fr_1.3fr_0.9fr]"
    : "xl:grid-cols-[0.95fr_1.25fr]";

  const handleCopyExport = () => {
    if (canvas.type !== "copy") return;
    setWorkflowNotice("已生成图文预览，可在下载中心查看示例导出。");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setCollabOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100"
        >
          {isCollabOpen ? "收起协同面板" : "展开协同面板"}
        </button>
      </div>
      <div className={cn("grid gap-6", gridTemplate)}>
        <aside className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-white">创意任务概览</h2>
          <p className="text-xs text-slate-400">
            聚焦当前战役目标，选择对应创作模式。
          </p>
          <div className="flex flex-wrap gap-2">
            {creativeTabs.map((tab) => {
              const Icon = tabIconMap[tab];
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                    activeTab === tab
                      ? "border-sky-400/40 bg-sky-400/15 text-sky-100 shadow-[0_0_16px_rgba(56,189,248,0.3)]"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-400/30 hover:text-sky-100"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow-[0_0_22px_rgba(56,189,248,0.18)]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
              Campaign Focus
            </p>
            <h3 className="mt-1 text-base font-semibold text-white">
              {creativeTaskSummary.campaign}
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              焦点：{creativeTaskSummary.focus}
            </p>
          </div>
          <p className="rounded-xl border border-white/10 bg-white/[0.05] p-3 text-xs text-slate-300">
            {creativeTaskSummary.keyMessage}
          </p>
          <div className="space-y-2">
            {deliverables.map((item) => {
              const status =
                deliverableStatusMap[item.status as keyof typeof deliverableStatusMap];
              const StatusIcon = status?.icon ?? Timer;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-[11px] text-slate-400">{item.owner}</p>
                  </div>
                  {status && (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-widest ${status.className}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {item.status}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <ShieldCheck className="h-4 w-4 text-sky-200" />
            品牌守护准则
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {creativeTaskSummary.guardrails.map((rule) => (
              <li
                key={rule}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
              >
                {rule}
              </li>
            ))}
          </ul>
          <div className="pt-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Lightbulb className="h-4 w-4 text-amber-300" />
              Prompt 建议
            </div>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
              {creativePromptLibrary.map((prompt) => (
                <li
                  key={prompt}
                  className="rounded-lg border border-dashed border-sky-400/30 bg-sky-400/10 px-3 py-2 text-sky-100/90"
                >
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.35em] text-slate-400">
            品牌资产
          </h3>
          <div className="space-y-3">
            {referenceAssets.map((asset) => (
              <div
                key={asset.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60"
              >
                <div className="relative h-28 w-full">
                  <Image
                    src={`${asset.thumbnail}&auto=format&fit=crop&w=480&q=70`}
                    alt={asset.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                    <span className="font-semibold text-white">{asset.title}</span>
                    <GalleryHorizontalEnd className="h-4 w-4 text-sky-200" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
        <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-400/15 text-sky-100 shadow-[0_0_22px_rgba(56,189,248,0.3)]">
              <ActiveIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {activeTab} · AI 创意画布
              </h2>
              <p className="text-xs text-slate-400">
                将策略拆解为可编辑内容，实时记录 AI 与人工的共同创作。
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleAiContinue}
              disabled={aiContinueDisabled}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-2 text-xs font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.3)] transition hover:bg-sky-400/25",
                aiContinueDisabled && "cursor-not-allowed opacity-60 hover:bg-sky-400/15"
              )}
            >
              <Sparkles className="h-4 w-4" />
              AI 续写
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100">
              <Save className="h-4 w-4" />
              保存版本
            </button>
            <button
              type="button"
              onClick={handleWorkflowSync}
              disabled={workflowSyncState !== "idle"}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-2 text-xs font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.35)]",
                workflowSyncState === "idle"
                  ? "transition hover:bg-sky-400/25"
                  : "cursor-not-allowed opacity-60"
              )}
            >
              {workflowSyncState === "syncing" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
              {workflowSyncState === "idle"
                ? "同步 Workflow"
                : workflowSyncState === "syncing"
                ? "同步中..."
                : "已同步"}
            </button>
          </div>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">AI 创作指引</h3>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-400">
              模式：{activeTab}
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {guideSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
              >
                <p className="text-sm font-semibold text-white">{step.title}</p>
                <p className="mt-1 text-slate-300">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {workflowNotice && (
          <div className="rounded-2xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-xs text-sky-100">
            {workflowNotice}
          </div>
        )}

        {(isAiStreaming || aiStreamBuffer) && canvas.ai?.continuation && (
          <div className="rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-xs text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.2)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" />
                {isAiStreaming ? "AI 续写中..." : "AI 续写完成"}
              </span>
              {!isAiStreaming && aiStreamBuffer && (
                <button
                  type="button"
                  onClick={() => setAiStreamBuffer("")}
                  className="text-[11px] text-sky-100/80 transition hover:text-sky-50"
                >
                  隐藏结果
                </button>
              )}
            </div>
            {aiStreamBuffer && (
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-sky-50">
                {aiStreamBuffer}
              </p>
            )}
          </div>
        )}

        <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-sm text-slate-200 shadow-[0_0_25px_rgba(56,189,248,0.18)]">
          {canvas.type === "copy" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/15 px-3 py-1 text-sky-100">
                  语气：{canvas.tone}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-slate-200">
                  主标题：{canvas.headline}
                </span>
                {aiStreamCompleted && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-100">
                    AI 已写入最新段落
                  </span>
                )}
              </div>
              <div className="space-y-4">
                {copySections.map((section) => (
                  <div
                    key={section.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                      {copyRefineMap?.[section.id] && (
                        <button
                          type="button"
                          onClick={() => handleSectionRefine(section.id)}
                          disabled={isAiStreaming || sectionStreamingId !== null}
                          className={cn(
                            "text-[11px] text-sky-200 transition hover:text-sky-100",
                            (isAiStreaming || sectionStreamingId !== null) &&
                              "cursor-not-allowed opacity-60 hover:text-sky-200"
                          )}
                        >
                          智能润色
                        </button>
                      )}
                    </div>
                    <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-200">
                      {section.content}
                    </p>
                    {sectionStreamingId === section.id && (
                      <div className="mt-3 rounded-xl border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-xs text-sky-100">
                        <div className="inline-flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5" />
                          AI 正在润色...
                        </div>
                        {sectionStreamBuffer && (
                          <p className="mt-2 whitespace-pre-wrap leading-6">
                            {sectionStreamBuffer}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">图文预览</h3>
                  <button
                    type="button"
                    onClick={handleCopyExport}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100"
                  >
                    导出 Markdown
                  </button>
                </div>
                <pre className="mt-3 max-h-64 overflow-y-auto whitespace-pre-wrap text-xs leading-6 text-slate-200">
                  {copyPreview || "当前暂无内容，可先使用 AI 续写生成文案草稿。"}
                </pre>
              </div>
            </div>
          )}

          {canvas.type === "poster" && fallbackPoster && (
            <PosterCanvasView poster={posterData ?? fallbackPoster} />
          )}

          {canvas.type === "storyboard" && fallbackStoryboard && (
            <StoryboardCanvasView
              storyboard={storyboardData ?? fallbackStoryboard}
            />
          )}

          {workflowSyncState === "done" && (
            <div className="mt-6 rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-xs text-sky-100">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">已推送至 Workflow 的创意任务</p>
                  <p className="text-sky-100/80">Workflow 看板将这些任务归入对应列，方便后续执行团队接管。</p>
                </div>
                <Link
                  href="/workflow?campaign=nova-air-x&source=creative"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] text-sky-50 transition hover:border-white/40 hover:text-white"
                >
                  打开 Workflow
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-3 space-y-2">
                {workflowTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col gap-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{task.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-white/30 px-2 py-0.5 text-[11px] uppercase tracking-widest">
                          {task.column}
                        </span>
                        <span className="rounded-full border border-white/30 px-2 py-0.5 text-[11px]">
                          {task.status === "synced" ? "已推送" : "待推送"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-sky-100/80">
                      <span>AI：{task.aiOwner}</span>
                      <span>负责人：{task.humanOwner}</span>
                      <span>
                        截止 {new Date(task.dueAt).toLocaleTimeString("zh-CN", {
                          hour12: false,
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {isCollabOpen && (
        <aside className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">协同对话</h2>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
              实时同步
            </span>
          </div>
          <div className="space-y-3">
            {collaborationMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "rounded-2xl border p-3 text-xs leading-6",
                  msg.sender === "ai"
                    ? "border-sky-400/30 bg-sky-400/10 text-sky-100"
                    : "border-white/10 bg-white/5 text-slate-200"
                )}
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-slate-500">
                  <span>{msg.sender === "ai" ? "数字员工" : "创意师"}</span>
                  <span>
                    {new Date(msg.createdAt).toLocaleTimeString("zh-CN", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="mt-2">{msg.content}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.35em] text-slate-400">
            版本时间线
          </h3>
          <div className="space-y-3">
            {creativeVersions.map((version, index) => (
              <div
                key={version.id}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 text-xs text-slate-200"
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-slate-500">
                  <span>{version.label}</span>
                  <span>
                    {new Date(version.timestamp).toLocaleTimeString("zh-CN", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="mt-2">{version.summary}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-400">
                  {index === 0 ? "首个版本" : "较上一版 +45 分钟"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.35em] text-slate-400">
            质量自检
          </h3>
          <div className="space-y-2 text-xs text-slate-300">
            {creativeChecklist.map((item) => {
              const status = checklistStatusMap[item.status];
              const StatusIcon = status.icon;
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-2xl border px-3 py-2 ${status.className}`}
                >
                  <span>{item.label}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest">
                    <StatusIcon className="h-3.5 w-3.5" />
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-xs text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
          AI 提醒：完成 CTA 与素材同步后，可通过右上角「同步 Workflow」推送至执行团队。
        </div>
        </aside>
      )}
      </div>
    </div>
  );
}

type PosterCanvasViewProps = {
  poster: PosterState;
};

function PosterCanvasView({ poster }: PosterCanvasViewProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
        <p className="text-xs uppercase tracking-[0.35em]">Core Concept</p>
        <h3 className="mt-1 text-lg font-semibold text-white">{poster.concept}</h3>
        <p className="mt-2 text-sm text-sky-100/80">{poster.tagline}</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">配色方案</h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {poster.palette.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
            >
              <span
                className="h-10 w-10 rounded-full border border-white/20 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                style={{ backgroundColor: item.hex }}
              />
              <div className="text-xs text-slate-300">
                <p className="font-semibold text-white">{item.hex}</p>
                <p>{item.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <h4 className="text-sm font-semibold text-white">视觉聚焦</h4>
          <ul className="mt-3 space-y-2 text-xs text-slate-300">
            {poster.focalPoints.map((point) => (
              <li
                key={point}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <h4 className="text-sm font-semibold text-white">排版提示</h4>
          <ul className="mt-3 space-y-2 text-xs text-slate-300">
            {poster.layoutNotes.map((note) => (
              <li
                key={note}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type StoryboardCanvasViewProps = {
  storyboard: StoryboardState;
};

function StoryboardCanvasView({ storyboard }: StoryboardCanvasViewProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-slate-300">
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/15 px-3 py-1 text-sky-100">
          总时长：{storyboard.duration}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-slate-200">
          场景数：{storyboard.scenes.length}
        </span>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {storyboard.scenes.map((scene, index) => (
          <div
            key={scene.id}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
                  Scene {index + 1}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-white">{scene.title}</h3>
              </div>
              <span className="text-[11px] text-sky-200">镜头备注</span>
            </div>
            <p className="mt-3 text-xs text-slate-300">视觉：{scene.visual}</p>
            <p className="mt-2 text-xs text-slate-200">对白：{scene.dialogue}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.2)]">
        {storyboard.outro}
      </div>
    </div>
  );
}
