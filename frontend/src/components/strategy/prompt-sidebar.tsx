"use client";

import { PromptRecord } from "@/types";
import { motion } from "framer-motion";
import { MessageCircle, Star } from "lucide-react";

type PromptSidebarProps = {
  history: PromptRecord[];
};

export function PromptSidebar({ history }: PromptSidebarProps) {
  return (
    <aside className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <div className="border-b border-white/5 px-5 py-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-sky-300" />
          Prompt 协同记录
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-2xl border p-4 text-sm ${
              item.role === "ai"
                ? "border-sky-400/30 bg-sky-400/10 text-sky-100"
                : "border-white/10 bg-white/5 text-slate-200"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{item.role === "ai" ? "AI 建议" : "人工指令"}</span>
              <span>
                {new Date(item.createdAt).toLocaleTimeString("zh-CN", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="mt-2 leading-6">{item.content}</p>
            {typeof item.score === "number" && (
              <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[11px] font-semibold text-emerald-200">
                <Star className="h-3 w-3" />
                协同评分 {item.score.toFixed(1)}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </aside>
  );
}
