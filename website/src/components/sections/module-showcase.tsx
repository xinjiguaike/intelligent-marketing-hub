'use client';

import { motion } from "framer-motion";
import { moduleShowcase } from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function ModuleShowcase() {
  return (
    <section id="modules" className="relative border-t border-slate-200 pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_65%)]" />
      <div className="relative space-y-10">
        <SectionHeading
          eyebrow="能力矩阵"
          title="六大能力协同打造营销智能中枢"
          description="六大模块覆盖策略洞察、协作执行、创意产出与渠道运营，全流程在人机协同中完成，从目标制定到复盘沉淀实现连续闭环。"
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {moduleShowcase.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-white/40"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
              </div>
              <p className="text-sm leading-6 text-slate-600">{module.description}</p>
              <ul className="space-y-2 text-xs text-slate-500">
                {module.highlights.map((highlight) => (
                  <li key={highlight}>· {highlight}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="rounded-2xl bg-blue-50/60 p-5 text-sm leading-6 text-slate-600">
          IntelliM 将六大能力融为一体：驾驶舱与洞察中心确保方向与机会，协作工作区与任务编排推进行动，
          创意工坊与媒介运营枢纽保障产出落地；所有节点都能在统一平台追踪、复盘并持续优化。
        </p>
      </div>
    </section>
  );
}
