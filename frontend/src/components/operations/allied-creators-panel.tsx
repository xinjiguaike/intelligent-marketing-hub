"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Handshake, BadgeCheck } from "lucide-react";
import { alliedCreators } from "@/data/mock/collaboration";
import { collaborationProgress, publishingSlots } from "@/data/mock/operations";
import { cn } from "@/lib/utils";

const stageFilters = ["接触", "谈判", "共创", "交付"] as const;

export function AlliedCreatorsPanel() {
  const [activeStage, setActiveStage] = useState<(typeof stageFilters)[number] | "全部">("全部");

  const creators = useMemo(() => {
    return alliedCreators.filter((creator) =>
      activeStage === "全部" ? true : creator.stage === activeStage
    );
  }, [activeStage]);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">外部盟军</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">达人成员编制</h1>
            <p className="mt-1 text-sm text-slate-400">
              以能力模型为基础统一管理达人筛选、谈判、共创与交付。
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-slate-100 hover:bg-white/15">
            <Handshake className="h-4 w-4 text-emerald-300" />
            发起新盟军
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <StageButton
            key="stage-all"
            label="全部"
            isActive={activeStage === "全部"}
            onClick={() => setActiveStage("全部")}
          />
          {stageFilters.map((stage) => (
            <StageButton
              key={stage}
              label={stage}
              isActive={activeStage === stage}
              onClick={() => setActiveStage(stage)}
            />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {creators.map((creator) => (
            <motion.div
              key={creator.id}
              layout
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                    {creator.stage}
                  </p>
                  <h3 className="text-lg font-semibold text-white">{creator.name}</h3>
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold",
                    creator.status === "at-risk"
                      ? "text-rose-300"
                      : creator.status === "pending"
                        ? "text-amber-200"
                        : "text-emerald-200"
                  )}
                >
                  {creator.status === "at-risk"
                    ? "需关注"
                    : creator.status === "pending"
                      ? "待确认"
                      : "执行中"}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{creator.role}</p>
              <p className="mt-2 text-xs text-slate-500">所属：{creator.linkedCampaign}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                <span>匹配度</span>
                <span className="text-sky-200">{Math.round(creator.fitScore * 100)}%</span>
              </div>
              <div className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 p-3 text-xs text-slate-400">
                <p>下一步：{creator.nextStep}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">协同流水线</p>
              <h2 className="mt-2 text-xl font-semibold text-white">SOW 执行进度</h2>
            </div>
            <span className="text-xs text-slate-400">
              {collaborationProgress.length} 位盟军在列
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {collaborationProgress.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                      {item.type}
                    </p>
                    <p className="text-base font-semibold text-white">{item.creator}</p>
                  </div>
                  <span className="text-xs text-slate-400">{item.status}</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">下一步：{item.nextStep}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">共创日程</p>
              <h2 className="mt-2 text-xl font-semibold text-white">盟军发布窗口</h2>
            </div>
            <button className="text-xs text-sky-300 hover:text-cyan-200">同步到排期</button>
          </div>
          <div className="mt-4 space-y-3">
            {publishingSlots.slice(0, 4).map((slot) => (
              <div
                key={slot.id}
                className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-sm text-slate-300"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{slot.account}</p>
                  <span className="text-xs text-slate-400">{slot.channel}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {slot.focus} ｜ {new Date(slot.scheduledAt).toLocaleString("zh-CN", {
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {slot.aiRecommendation && (
                  <p className="mt-2 text-xs text-slate-400">{slot.aiRecommendation}</p>
                )}
                <button className="mt-2 inline-flex items-center gap-1 text-xs text-sky-300 hover:text-cyan-200">
                  查看排期
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">盟军情报</p>
            <h2 className="mt-2 text-xl font-semibold text-white">协同建议</h2>
          </div>
          <button className="inline-flex items-center gap-2 text-xs text-sky-300 hover:text-cyan-200">
            <BadgeCheck className="h-4 w-4" />
            导出 SOW
          </button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { label: "AI 生成 SOW", value: "6 份", caption: "近 7 日" },
            { label: "待签署协议", value: "3 份", caption: "含达人激励" },
            { label: "共创交付", value: "8 件", caption: "同步 Workflow" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-white">{item.value}</p>
              <p className="text-xs text-slate-400">{item.caption}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

type StageButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function StageButton({ label, isActive, onClick }: StageButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm transition",
        isActive
          ? "border-sky-400/40 bg-sky-400/15 text-sky-100"
          : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-400/30 hover:text-white"
      )}
    >
      {label}
    </button>
  );
}
