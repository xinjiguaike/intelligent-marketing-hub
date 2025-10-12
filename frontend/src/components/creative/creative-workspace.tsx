"use client";

import { useMemo, useState } from "react";
import {
  collaborationMessages,
  creativeDraft,
  creativeTabs,
  creativeVersions,
  referenceAssets,
} from "@/data/mock/creative";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, GalleryHorizontalEnd, PenLine, Save, Star, Timer } from "lucide-react";

export function CreativeWorkspace() {
  const [activeTab, setActiveTab] = useState<(typeof creativeTabs)[number]>(
    creativeTabs[1]
  );

  const tabAction = useMemo(() => {
    return (
      {
        图文智创: {
          href: "/execute/exec-copy",
          label: "启动文案执行",
        },
        海报智绘: {
          href: "/execute/exec-poster",
          label: "生成主视觉",
        },
      } as Record<string, { href: string; label: string }>
    )[activeTab];
  }, [activeTab]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.4fr_0.8fr]">
      <aside className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
        <div>
          <h2 className="text-sm font-semibold text-white">灵感素材与品牌资产</h2>
          <p className="mt-1 text-xs text-slate-400">快速选取品牌资产作为参考。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {creativeTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === tab
                  ? "border-sky-400/40 bg-sky-400/15 text-sky-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-400/30 hover:text-sky-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {referenceAssets.map((asset) => (
            <div
              key={asset.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60"
            >
              <div className="relative h-32 w-full">
                <Image
                  src={`${asset.thumbnail}?auto=format&fit=crop&w=400&q=60`}
                  alt={asset.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <span className="font-semibold text-white">{asset.title}</span>
                  <GalleryHorizontalEnd className="h-4 w-4 text-sky-200" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 px-3 py-2">
                {asset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-400/15 text-sky-100 shadow-[0_0_22px_rgba(56,189,248,0.3)]">
              <PenLine className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{activeTab}</h2>
              <p className="text-xs text-slate-400">
                AI 与创意团队实时共创，支持版本管理与差异对比。
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {tabAction && (
              <Link
                href={tabAction.href}
                className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-2 text-xs font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.3)] transition hover:bg-sky-400/25"
              >
                {tabAction.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100">
              <Save className="h-4 w-4" />
              保存版本
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-2 text-xs font-semibold text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.35)] hover:bg-sky-400/25">
              推送至流程
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-sm text-slate-200 shadow-[0_0_25px_rgba(56,189,248,0.18)]">
          <pre className="h-full whitespace-pre-wrap leading-7">{creativeDraft}</pre>
        </div>
      </section>

      <aside className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
        <div>
          <h2 className="text-sm font-semibold text-white">协同记录与版本</h2>
          <p className="text-xs text-slate-400">
            记录 AI 与人工的讨论、版本评分与时序。
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.35em] text-slate-400">
            即时协同
          </h3>
          <div className="space-y-3">
            {collaborationMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border p-3 text-xs leading-6 ${
                  msg.sender === "ai"
                    ? "border-sky-400/30 bg-sky-400/10 text-sky-100"
                    : "border-white/10 bg-white/5 text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-slate-500">
                  <span>{msg.sender === "ai" ? "数字员工" : "创意师"}</span>
                  <span>
                    {new Date(msg.createdAt).toLocaleTimeString("zh-CN", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="mt-2">{msg.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.35em] text-slate-400">
            版本时间线
          </h3>
          <div className="space-y-3">
            {creativeVersions.map((version, index) => (
              <div
                key={version.id}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 text-xs text-slate-200"
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-slate-500">
                  <span>{version.label}</span>
                  <span>
                    {new Date(version.timestamp).toLocaleTimeString("zh-CN", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="mt-2">{version.summary}</p>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
                  <Timer className="h-3.5 w-3.5 text-sky-300" />
                  {`距离上版本 ${index === 0 ? "—" : "45 分钟"}`}
                  <Star className="h-3.5 w-3.5 text-amber-300" />
                  推荐采纳
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 text-xs text-sky-100 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
          AI 建议：基于社交平台数据，推荐在脚本结尾增加“私域福利”引导语句。
        </div>
      </aside>
    </div>
  );
}
