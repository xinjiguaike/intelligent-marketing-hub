"use client";

import { useEffect, useMemo, useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Bot, PauseCircle, PlayCircle, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ExecutionStreamProps = {
  segments: string[];
  flowId: string;
};

export function ExecutionStream({ segments, flowId }: ExecutionStreamProps) {
  const [isRunning, setRunning] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    if (visibleCount >= segments.length) {
      return;
    }
    const timer = setTimeout(() => {
      setVisibleCount((count) => Math.min(count + 1, segments.length));
    }, 1400);
    return () => clearTimeout(timer);
  }, [isRunning, visibleCount, segments.length]);

  const displayedSegments = useMemo(
    () => segments.slice(0, visibleCount),
    [segments, visibleCount]
  );

  const progress =
    segments.length === 0 ? 0 : Math.min((visibleCount / segments.length) * 100, 100);

  const handleStart = () => {
    if (segments.length === 0) {
      return;
    }
    if (visibleCount === 0) {
      setVisibleCount(1);
    }
    setRunning(true);
  };

  const handlePause = () => {
    setRunning((prev) => !prev);
  };

  const handleReset = () => {
    setRunning(false);
    setVisibleCount(0);
  };

  const hasFinished = visibleCount >= segments.length && segments.length > 0;

  return (
    <GlassPanel glow className="bg-white/[0.04] p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-400/15 text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">流式执行模拟</h2>
            <p className="text-xs text-slate-400">Flow ID · {flowId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <button
            onClick={handleStart}
            disabled={segments.length === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-2 font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.3)] transition hover:bg-sky-400/25 disabled:cursor-not-allowed disabled:border-slate-600/50 disabled:bg-slate-700/40 disabled:text-slate-400"
          >
            <PlayCircle className="h-4 w-4" />
            {visibleCount === 0 ? "开始执行" : "继续"}
          </button>
          <button
            onClick={handlePause}
            disabled={visibleCount === 0 || hasFinished}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-sky-300/30 hover:text-sky-100 disabled:cursor-not-allowed disabled:border-slate-600/50 disabled:text-slate-500"
          >
            <PauseCircle className="h-4 w-4" />
            {isRunning ? "暂停" : "暂停中"}
          </button>
          <button
            onClick={handleReset}
            disabled={visibleCount === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-sky-300/30 hover:text-sky-100 disabled:cursor-not-allowed disabled:border-slate-600/50 disabled:text-slate-500"
          >
            <RefreshCcw className="h-4 w-4" />
            重置
          </button>
        </div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-slate-900">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 space-y-3 text-sm text-slate-200">
        <AnimatePresence>
          {displayedSegments.map((segment, index) => (
            <motion.div
              key={`${flowId}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 leading-7 shadow-[0_0_20px_rgba(56,189,248,0.18)]"
            >
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-500">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-sky-400/20 text-[11px] font-semibold text-sky-100">
                  {index + 1}
                </span>
                AI 输出
              </div>
              {segment}
            </motion.div>
          ))}
        </AnimatePresence>
        {isRunning && visibleCount < segments.length && (
          <div className="flex items-center gap-2 text-xs text-sky-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
            正在生成后续步骤…
          </div>
        )}
        {hasFinished && (
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-100">
            执行模拟完成，已生成所有节点。
          </div>
        )}
      </div>
    </GlassPanel>
  );
}
