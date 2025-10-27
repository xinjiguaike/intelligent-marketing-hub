'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { coreValuePropositions, flowNarrative } from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const tabs = [
  {
    key: "core",
    label: "核心价值",
    description: "聚焦策略、执行与复盘的全链路价值主张。",
  },
  {
    key: "timeline",
    label: "人机协同流程",
    description: "呈现人机协同的四个阶段，理解项目推进节奏。",
  },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ValuePropositionGrid() {
  const [activeTab, setActiveTab] = useState<TabKey>("core");
  const current = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];

  return (
    <section id="highlights" className="relative border-t border-slate-200 pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-8 h-56 bg-gradient-to-r from-blue-200/25 via-transparent to-cyan-200/25 blur-3xl" />
      <div className="relative space-y-8">
        <SectionHeading
          eyebrow="产品亮点"
          title="核心价值与人机协同"
          description="了解核心价值与人机协同节奏。"
          align="left"
        />
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-full border px-5 py-2 font-semibold transition",
                activeTab === tab.key
                  ? "border-blue-500 bg-blue-500 text-white shadow"
                  : "border-slate-300 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-600">{current.description}</p>
        {activeTab === "core" ? (
          <div className="grid gap-6 md:grid-cols-3">
            {coreValuePropositions.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex items-center gap-3 text-sm font-semibold text-blue-600">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-base font-semibold text-blue-600">
                    {item.title.slice(0, 1)}
                  </span>
                  {item.title}
                </div>
                <p className="text-sm font-medium leading-6 text-slate-700">
                  {item.description}
                </p>
                <p className="text-xs leading-5 text-slate-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative">
            <span className="absolute left-5 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-blue-200 via-slate-200 to-transparent md:block" />
            <ol className="space-y-8">
              {flowNarrative.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  className="relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:pl-16"
                >
                  <span className="absolute left-3 top-3 hidden h-6 w-6 rounded-full border-4 border-white bg-blue-500 shadow md:block" />
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    阶段 {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <ul className="space-y-1 text-sm leading-6 text-slate-600">
                    {[item.summary, item.reference].map((text, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
