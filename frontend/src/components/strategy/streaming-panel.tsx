"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Bot, Download, PenSquare } from "lucide-react";

type StreamingPanelProps = {
  segments: string[];
};

export function StreamingPanel({ segments }: StreamingPanelProps) {
  const [isPaused, setPaused] = useState(false);

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Bot className="h-4 w-4 text-sky-300" />
          <span>AI 流式生成文稿</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 transition hover:border-sky-300/30 hover:text-sky-200"
            onClick={() => setPaused((prev) => !prev)}
          >
            <PenSquare className="h-3.5 w-3.5" />
            {isPaused ? "继续输出" : "暂停编辑"}
          </button>
          <button className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 transition hover:border-sky-300/30 hover:text-sky-200">
            <Download className="h-3.5 w-3.5" />
            导出 Markdown
          </button>
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 text-sm text-slate-200">
        {segments.map((content, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 }}
            className="relative rounded-2xl border border-white/10 bg-slate-950/50 p-4 leading-7"
          >
            <span className="absolute -left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-sky-400/20 text-[11px] font-semibold text-sky-100">
              {index + 1}
            </span>
            {content}
          </motion.p>
        ))}
        {!isPaused && (
          <div className="flex items-center gap-2 text-xs text-sky-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
            正在生成思维链...
          </div>
        )}
      </div>
    </div>
  );
}
