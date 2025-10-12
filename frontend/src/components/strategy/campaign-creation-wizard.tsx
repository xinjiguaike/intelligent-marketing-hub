"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import {
  campaignCreationMoments,
  campaignCreationOutputs,
  campaignCreationStages,
} from "@/data/mock/campaign-creation";
import { CampaignCreationMoment, CampaignCreationOutput } from "@/types";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock,
  Loader2,
  PauseCircle,
  Sparkle,
  UsersRound,
} from "lucide-react";

const stageStatusMap = {
  completed: {
    label: "已完成",
    className: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
  },
  current: {
    label: "进行中",
    className: "border-sky-400/40 bg-sky-400/15 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.25)]",
  },
  upcoming: {
    label: "待开始",
    className: "border-slate-500/40 bg-slate-500/10 text-slate-200",
  },
} as const;

const ownerMap = {
  ai: {
    label: "AI 数字员工",
    className: "border-sky-400/40 bg-sky-400/10 text-sky-100",
    icon: Bot,
  },
  human: {
    label: "真人协作者",
    className: "border-white/15 bg-white/5 text-slate-200",
    icon: UsersRound,
  },
  joint: {
    label: "人机协同",
    className: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
    icon: Sparkle,
  },
} as const;

const checkpointStatusMap = {
  ready: {
    label: "已完成",
    className: "text-emerald-200",
    icon: CheckCircle2,
  },
  "in-progress": {
    label: "执行中",
    className: "text-sky-200",
    icon: Loader2,
  },
  pending: {
    label: "待处理",
    className: "text-slate-400",
    icon: PauseCircle,
  },
} as const;

const outputStatusMap = {
  ready: {
    label: "可用",
    className: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
    icon: CheckCircle2,
  },
  "in-progress": {
    label: "生成中",
    className: "border-sky-400/40 bg-sky-400/15 text-sky-100",
    icon: Loader2,
  },
  queued: {
    label: "已排队",
    className: "border-slate-500/40 bg-slate-500/10 text-slate-300",
    icon: PauseCircle,
  },
} as const;

function createMockMomentStream(
  items: readonly CampaignCreationMoment[],
  interval = 1200
) {
  let timer: ReturnType<typeof setInterval> | undefined;
  return new ReadableStream<CampaignCreationMoment>({
    start(controller) {
      let index = 0;
      const push = () => {
        if (index < items.length) {
          controller.enqueue(items[index]);
          index += 1;
        } else {
          if (timer) {
            clearInterval(timer);
          }
          controller.close();
        }
      };
      push();
      timer = setInterval(push, interval);
    },
    cancel() {
      if (timer) {
        clearInterval(timer);
      }
    },
  });
}

export function CampaignCreationWizard() {
  const [timeline, setTimeline] = useState<CampaignCreationMoment[]>([]);
  const [isStreaming, setStreaming] = useState(true);
  const [outputs, setOutputs] = useState<CampaignCreationOutput[]>(() =>
    campaignCreationOutputs.map((item) => ({ ...item }))
  );

  useEffect(() => {
    let cancelled = false;
    setStreaming(true);
    setTimeline([]);

    const stream = createMockMomentStream(campaignCreationMoments, 1100);
    const reader = stream.getReader();

    const pump = async () => {
      try {
        while (!cancelled) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          if (value) {
            setTimeline((prev) => [...prev, value]);
          }
        }
        if (!cancelled) {
          setStreaming(false);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("模拟流式输出失败", error);
        }
      } finally {
        reader.releaseLock();
      }
    };

    void pump();

    return () => {
      cancelled = true;
      reader.cancel().catch(() => undefined);
    };
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => {
        setOutputs((prev) =>
          prev.map((item) =>
            item.id === "output-persona"
              ? {
                  ...item,
                  status: "ready",
                  readyAt: "09:35",
                  highlights: item.highlights.includes("已匹配品牌禁用词清单")
                    ? item.highlights
                    : [...item.highlights, "已匹配品牌禁用词清单"],
                }
              : item
          )
        );
      }, 3600)
    );

    timers.push(
      setTimeout(() => {
        setOutputs((prev) =>
          prev.map((item) =>
            item.id === "output-playbook"
              ? {
                  ...item,
                  status: "in-progress",
                  readyAt: "预计 09:36",
                }
              : item
          )
        );
      }, 5200)
    );

    timers.push(
      setTimeout(() => {
        setOutputs((prev) =>
          prev.map((item) =>
            item.id === "output-playbook"
              ? {
                  ...item,
                  status: "ready",
                  readyAt: "09:36",
                  highlights: item.highlights.includes("Workflow 已同步任务包")
                    ? item.highlights
                    : [...item.highlights, "Workflow 已同步任务包"],
                }
              : item
          )
        );
      }, 8200)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const stageMap = useMemo(
    () => Object.fromEntries(campaignCreationStages.map((stage) => [stage.id, stage.title])),
    []
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_1.3fr_0.9fr]">
      <GlassPanel className="flex flex-col bg-white/[0.04] p-0">
        <header className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
              Campaign Setup
            </p>
            <h2 className="mt-1 text-base font-semibold text-white">新建营销策划流程</h2>
            <p className="text-xs text-slate-400">
              清晰呈现从 Brief 输入到 AI 数字员工生成策划骨架的全过程。
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-sky-100 shadow-[0_0_16px_rgba(56,189,248,0.25)]">
            <Sparkle className="h-3.5 w-3.5" />
            AI 协同
          </span>
        </header>
        <div className="space-y-4 px-5 py-5">
          {campaignCreationStages.map((stage, index) => {
            const OwnerIcon = ownerMap[stage.owner].icon;
            const ownerStyle = ownerMap[stage.owner].className;
            const statusStyle = stageStatusMap[stage.status].className;
            const statusLabel = stageStatusMap[stage.status].label;

            return (
              <div
                key={stage.id}
                className={cn(
                  "rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition",
                  stage.status === "current" &&
                    "border-sky-400/50 shadow-[0_0_22px_rgba(56,189,248,0.25)]"
                )}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-2.5 py-1 text-slate-400">
                        Step {index + 1}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-semibold",
                          statusStyle
                        )}
                      >
                        {statusLabel}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                    <p className="text-sm text-slate-300">{stage.description}</p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 self-start rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest",
                      ownerStyle
                    )}
                  >
                    <OwnerIcon className="h-3.5 w-3.5" />
                    {ownerMap[stage.owner].label}
                  </span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  <Clock className="h-3.5 w-3.5 text-sky-300" />
                  {stage.duration}
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {stage.aiActions?.length ? (
                    <div className="rounded-xl border border-sky-400/20 bg-sky-400/5 p-3">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-sky-200">
                        <Bot className="h-3.5 w-3.5" />
                        AI 行动
                      </div>
                      <ul className="mt-2 space-y-2 text-sm text-sky-50/90">
                        {stage.aiActions.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {stage.humanActions?.length ? (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-300">
                        <UsersRound className="h-3.5 w-3.5" />
                        人工协同
                      </div>
                      <ul className="mt-2 space-y-2 text-sm text-slate-200">
                        {stage.humanActions.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                {stage.checkpoints?.length ? (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-400">
                      <ArrowRight className="h-3.5 w-3.5" />
                      协同进度
                    </div>
                    <div className="mt-3 space-y-2">
                      {stage.checkpoints.map((checkpoint) => {
                        const cpMeta = checkpointStatusMap[checkpoint.status];
                        const CpIcon = cpMeta.icon;
                        return (
                          <div
                            key={checkpoint.id}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/5 bg-slate-950/70 px-3 py-2"
                          >
                            <span className="text-sm text-slate-200">{checkpoint.label}</span>
                            <span className={cn("inline-flex items-center gap-1 text-xs", cpMeta.className)}>
                              <CpIcon className="h-3.5 w-3.5" />
                              {cpMeta.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
                {stage.cta ? (
                  <div className="mt-4 space-y-2">
                    {stage.cta.description ? (
                      <p className="text-xs text-sky-100/80">{stage.cta.description}</p>
                    ) : null}
                    <Link
                      href={stage.cta.href}
                      className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1.5 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/25"
                    >
                      {stage.cta.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </GlassPanel>

      <GlassPanel className="relative bg-white/[0.05]">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">AI 数字员工协同日志</h2>
            <p className="text-xs text-slate-400">
              记录人机交互节点，展示 NOVA 如何实时完成策略推理与响应。
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-[11px] font-semibold text-sky-100 shadow-[0_0_16px_rgba(56,189,248,0.25)]">
            {isStreaming ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                流式生成中
              </>
            ) : (
              <>
                <Sparkle className="h-3.5 w-3.5" />
                协同同步完成
              </>
            )}
          </span>
        </header>
        <div className="mt-6">
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/60 via-sky-400/20 to-transparent" />
            {timeline.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/60 p-6 text-center text-xs text-slate-400">
                正在等待 NOVA 解析 Brief，并与真人协作者建立协同链路...
              </div>
            ) : (
              <div className="space-y-5">
                {timeline.map((moment) => {
                  const isAi = moment.sender === "ai";
                  const Icon = isAi ? Bot : UsersRound;
                  return (
                    <div
                      key={moment.id}
                      className="relative rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                    >
                      <div
                        className={cn(
                          "absolute -left-[38px] top-5 flex h-8 w-8 items-center justify-center rounded-full border text-slate-100 shadow-[0_0_12px_rgba(56,189,248,0.25)]",
                          isAi
                            ? "border-sky-400/60 bg-sky-400/20 text-sky-100"
                            : "border-white/15 bg-white/10 text-slate-100"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400">
                        <span className="rounded-full border border-white/10 px-2 py-1">
                          {moment.timestamp}
                        </span>
                        <span className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
                          {moment.speaker}
                        </span>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-1 font-semibold",
                            isAi
                              ? "border-sky-400/40 bg-sky-400/15 text-sky-100"
                              : "border-white/10 bg-white/5 text-slate-200"
                          )}
                        >
                          {moment.action}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-200">{moment.content}</p>
                      <div className="mt-3 inline-flex items-center gap-2 text-[11px] text-slate-400">
                        <Sparkle className="h-3.5 w-3.5 text-sky-300" />
                        所属阶段：{stageMap[moment.stageId] ?? "—"}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="bg-white/[0.04]">
        <header className="space-y-2">
          <h2 className="text-base font-semibold text-white">AI 输出物 & 准备度</h2>
          <p className="text-xs text-slate-400">
            实时查看 NOVA 已完成与即将交付的文档、洞察与执行指引。
          </p>
        </header>
        <div className="mt-5 space-y-4">
          {outputs.map((output) => {
            const statusMeta = outputStatusMap[output.status];
            const StatusIcon = statusMeta.icon;
            const ownerMeta = ownerMap[output.owner];
            const OwnerIcon = ownerMeta.icon;

            return (
              <div
                key={output.id}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow-[0_0_16px_rgba(15,23,42,0.3)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400">
                      <span className="rounded-full border border-white/10 px-2 py-1">
                        {output.readyAt}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-semibold",
                          statusMeta.className
                        )}
                      >
                        <StatusIcon
                          className={cn(
                            "h-3.5 w-3.5",
                            output.status === "in-progress" && "animate-spin"
                          )}
                        />
                        {statusMeta.label}
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-white">{output.title}</h3>
                    <p className="mt-1 text-xs leading-6 text-slate-300">{output.description}</p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 self-start rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest",
                      ownerMeta.className
                    )}
                  >
                    <OwnerIcon className="h-3.5 w-3.5" />
                    {ownerMeta.label}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-slate-500">
                    <span>AI Confidence</span>
                    <span className="text-slate-300">
                      {Math.round(output.confidence * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-900">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-300"
                      style={{ width: `${Math.round(output.confidence * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {output.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200"
                    >
                      <Sparkle className="h-3.5 w-3.5 text-sky-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {output.cta ? (
                  <Link
                    href={output.cta.href}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-1.5 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/25"
                  >
                    {output.cta.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </div>
  );
}
