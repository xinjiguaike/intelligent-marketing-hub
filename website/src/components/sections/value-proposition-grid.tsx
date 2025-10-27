'use client';

import { useState } from "react";
import {
  coreValuePropositions,
  humanCollaborationHighlights,
} from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const tabs = [
  {
    key: "core",
    label: "核心价值",
    description: "聚焦策略、执行与复盘的全链路价值主张。",
    items: coreValuePropositions,
  },
  {
    key: "collab",
    label: "人机协同",
    description: "展示数字员工与真人团队的协同亮点。",
    items: humanCollaborationHighlights,
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
          description="在一屏中快速了解 IntelliM 的核心价值与协同优势。"
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
        <div className="grid gap-6 md:grid-cols-3">
          {current.items.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                <span className="h-9 w-9 rounded-full bg-blue-100 text-center text-sm leading-9">
                  {item.title.slice(0, 1)}
                </span>
                {item.title}
              </div>
              <p className="text-sm leading-6 text-slate-600">
                {item.description}
              </p>
              <p className="text-xs leading-5 text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
