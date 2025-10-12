"use client";

import { AgentStatus } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Brain,
  Clock,
  PauseCircle,
  PlayCircle,
} from "lucide-react";

type AgentStripProps = {
  agents: AgentStatus[];
};

const statusMap: Record<
  AgentStatus["status"],
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  idle: { label: "待命", color: "text-sky-200", icon: PauseCircle },
  running: { label: "执行中", color: "text-emerald-300", icon: PlayCircle },
  blocked: { label: "阻塞", color: "text-rose-300", icon: AlertTriangle },
  handover: { label: "待人工接管", color: "text-amber-200", icon: Clock },
  cooldown: { label: "冷却", color: "text-slate-400", icon: Activity },
};

export function AgentStrip({ agents }: AgentStripProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Brain className="h-4 w-4 text-sky-300" />
          <span>数字员工实时状态</span>
        </div>
        <button className="text-xs text-sky-300 underline-offset-2 hover:text-cyan-200 hover:underline">
          查看日志
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {agents.map((agent) => {
          const status = statusMap[agent.status];
          const IndicatorIcon = status.icon;
          return (
            <motion.div
              key={agent.id}
              layout
              className={cn(
                "relative flex min-w-[260px] flex-1 flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl"
              )}
              whileHover={{ translateY: -4 }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 opacity-30 [mask:linear-gradient(transparent,white)]" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">角色</p>
                  <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-400/15 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.4)]">
                  <IndicatorIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="relative z-10 space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  {status.label}
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                  <span>
                    可信度{" "}
                    <span className="font-semibold text-sky-200">
                      {(agent.confidence * 100).toFixed(0)}%
                    </span>
                  </span>
                  <span>
                    队列任务{" "}
                    <span className="font-semibold text-sky-200">
                      {agent.tasksInQueue}
                    </span>
                  </span>
                </div>
                {agent.lastOutput && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-200">
                    <p className="font-medium text-slate-100">最新交付</p>
                    <p className="mt-1 text-slate-300">{agent.lastOutput}</p>
                  </div>
                )}
              </div>
              {typeof agent.trend === "number" && (
                <div className="relative z-10 mt-auto flex items-center gap-2 text-xs text-slate-400">
                  <IndicatorIcon className={cn("h-3.5 w-3.5", status.color)} />
                  <span
                    className={cn(
                      agent.trend > 0 ? "text-emerald-300" : "text-rose-300",
                      "font-semibold"
                    )}
                  >
                    {agent.trend > 0 ? "+" : ""}
                    {agent.trend}%
                  </span>
                  <span>效率波动（24h）</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
