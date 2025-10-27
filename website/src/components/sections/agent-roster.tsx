'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { agentProfiles } from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { asset } from "@/lib/utils";
import {
  BrainCircuit,
  ChartNoAxesColumn,
  PenTool,
  Rocket,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "策略 AI 指挥官": BrainCircuit,
  "洞察 AI 分析师": ChartNoAxesColumn,
  "创意 AI 制作人": PenTool,
  "执行 AI 调度员": Rocket,
};

export function AgentRoster() {
  return (
    <section id="agents" className="relative space-y-10 border-t border-slate-200 pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-12 h-64 bg-gradient-to-r from-blue-200/30 via-transparent to-cyan-200/30 blur-3xl" />
      <SectionHeading
        eyebrow="数字员工体系"
        title="四大 AI 角色协同真人团队分工"
        description="数字员工覆盖策略、洞察、创意与执行四大环节，真人成员聚焦高价值决策，协作流程在统一平台内完成交接与追踪。"
      />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-4 py-2 text-xs font-semibold text-blue-600">
            <Users className="h-3.5 w-3.5" />
            人机协同亮点
          </div>
          <p className="text-base leading-7 text-slate-600">
            策略指挥官同步项目目标，洞察分析师推送机会，创意制作人输出多模态资产，执行调度员掌控节奏。
            AI 负责算力与提醒，真人团队聚焦判断与关系。
          </p>
          <ul className="space-y-3 text-sm leading-6 text-slate-600">
            <li>· 同一视图查看人机交接状态</li>
            <li>· 数字员工自动记录交付与复盘</li>
            <li>· 可按组织结构配置权限与角色</li>
          </ul>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-white p-6 shadow-[0_22px_45px_rgba(15,23,42,0.1)]">
            <Image
              src={asset("/images/agent-network.svg")}
              alt="数字员工协同关系示意"
              width={520}
              height={320}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {agentProfiles.map((agent) => {
          const Icon = iconMap[agent.name] ?? BrainCircuit;
          return (
            <motion.article
              key={agent.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm transition hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/25 via-transparent to-cyan-100/25 opacity-80" />
              <div className="relative flex flex-1 flex-col items-center gap-4">
                <span className="rounded-2xl bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-400 p-3 text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900">{agent.name}</h3>
                  <p className="text-sm leading-6 text-slate-600">{agent.description}</p>
                </div>
              </div>
              <div className="relative mt-6 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/85 p-4 text-xs leading-6 text-slate-500">
                <p className="font-semibold text-slate-500">典型交付物</p>
                <ul className="space-y-1.5 text-slate-600">
                  {agent.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-center justify-center gap-2 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
