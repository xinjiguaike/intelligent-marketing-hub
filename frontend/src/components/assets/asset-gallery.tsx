"use client";

import Image from "next/image";
import {
  assets,
  assetFilters,
  tagSuggestions,
} from "@/data/mock/assets";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Filter, Sparkle, Tag } from "lucide-react";

const tabs = assetFilters.types;

export function AssetGallery() {
  const [activeType, setActiveType] = useState(tabs[0]);

  const filteredAssets =
    activeType === "全部"
      ? assets
      : assets.filter((asset) => {
          if (activeType === "图文") return asset.type === "copy";
          if (activeType === "海报") return asset.type === "image";
          if (activeType === "视频") return asset.type === "video";
          return true;
        });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveType(tab)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                activeType === tab
                  ? "border-sky-400/40 bg-sky-400/15 text-sky-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-400/30 hover:text-sky-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100">
          <Filter className="h-4 w-4" />
          筛选器
        </button>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredAssets.map((asset) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl"
          >
            <div className="relative h-40 w-full">
              <Image
                src={`${asset.cover}?auto=format&fit=crop&w=640&q=60`}
                alt={asset.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between text-xs text-slate-200">
                <div>
                  <p className="text-sm font-semibold text-white">{asset.title}</p>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
                    {asset.channel}
                  </p>
                </div>
                <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-2 py-1 text-[11px] text-sky-100">
                  {asset.type.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="space-y-3 px-4 py-4 text-xs text-slate-300">
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1"
                  >
                    <Tag className="h-3 w-3 text-sky-200" />
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-slate-200">{asset.recommendation}</p>
              <button className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/20">
                <CheckCircle2 className="h-4 w-4" />
                推送至内容计划
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Sparkle className="h-4 w-4 text-sky-300" />
          AI 自动贴标签建议
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {tagSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-300"
            >
              <div className="flex items-center justify-between">
                <span>资源 {suggestion.assetId}</span>
                <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-2 py-1 text-[11px] text-sky-100">
                  置信度 {(suggestion.confidence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestion.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1 text-[11px] text-sky-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 rounded-xl border border-emerald-400/30 bg-emerald-400/15 py-2 text-[11px] font-semibold text-emerald-200">
                  接受
                </button>
                <button className="flex-1 rounded-xl border border-rose-400/30 bg-rose-400/10 py-2 text-[11px] font-semibold text-rose-200">
                  拒绝
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
