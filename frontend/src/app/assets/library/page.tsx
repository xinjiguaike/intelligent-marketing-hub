import { assetLifecycles } from "@/data/mock/brand-resources";
import { assets, tagSuggestions } from "@/data/mock/assets";
import { AssetGallery } from "@/components/assets/asset-gallery";
import {
  ClipboardCheck,
  RefreshCw,
  ShieldAlert,
  Sparkle,
} from "lucide-react";
import { ReactNode } from "react";

const stageTone: Record<string, string> = {
  待质检: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  执行中: "border-sky-400/30 bg-sky-400/10 text-sky-100",
  已归档: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
};

const statusTone: Record<string, string> = {
  正常: "text-emerald-200",
  异常: "text-rose-200",
};

export default function AssetManagementPage() {
  const totalAssets = assets.length;
  const pendingQc = assetLifecycles.filter((item) => item.stage === "待质检");
  const anomalies = assetLifecycles.filter((item) => item.status === "异常");
  const tagCoverage = tagSuggestions.length;

  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">素材与内容资产管理</h1>
        <p className="text-sm text-slate-300">
          管理品牌内容资产的全生命周期，覆盖质检、复用、引用去向与 AI 标签建议，确保资产持续增值。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="资产总量"
          value={`${totalAssets} 条`}
          caption="包含图文、海报、视频等内容"
          icon={<RefreshCw className="h-5 w-5 text-sky-300" />}
        />
        <MetricCard
          label="待质检"
          value={`${pendingQc.length} 条`}
          caption="需人工复核的资产"
          icon={<ClipboardCheck className="h-5 w-5 text-amber-300" />}
        />
        <MetricCard
          label="异常告警"
          value={`${anomalies.length} 条`}
          caption="关注版权、规格或节奏异常"
          icon={<ShieldAlert className="h-5 w-5 text-rose-300" />}
        />
        <MetricCard
          label="AI 标签建议"
          value={`${tagCoverage} 组`}
          caption="待确认的智能标签提案"
          icon={<Sparkle className="h-5 w-5 text-emerald-300" />}
        />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-white">内容资产总览</h2>
              <p className="text-sm text-slate-400">
                支持筛选、批量推送与复用轨迹追踪。
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100">
                导入资产
              </button>
              <button className="rounded-full border border-sky-400/40 bg-sky-400/15 px-4 py-2 font-semibold text-sky-100 transition hover:bg-sky-400/25">
                推送至排期
              </button>
            </div>
          </div>
          <AssetGallery />
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white">资产流转看板</h2>
            <p className="text-sm text-slate-400">
              追踪每条资产的负责人、下一步动作与状态。
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100">
            导出报告
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {assetLifecycles.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-white">{item.title}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    {item.channel}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${stageTone[item.stage]}`}
                >
                  {item.stage}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>负责人：{item.owner}</p>
                <p>下一步：{item.nextAction}</p>
              </div>
              <p className={`mt-3 text-xs font-semibold ${statusTone[item.status]}`}>
                状态：{item.status}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-white">AI 标签建议</h2>
          <p className="text-sm text-slate-400">
            智能识别潜力场景与关键词，支持批量确认或驳回。
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tagSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>资产编号：{suggestion.assetId}</span>
                  <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1 text-[11px] text-sky-100">
                    置信度 {(suggestion.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-sky-100">
                  {suggestion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex gap-2 text-xs">
                <button className="flex-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 font-semibold text-emerald-200 transition hover:bg-emerald-400/20">
                  接受标签
                </button>
                <button className="flex-1 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-2 font-semibold text-rose-200 transition hover:bg-rose-400/20">
                  驳回建议
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  caption: string;
  icon: ReactNode;
};

function MetricCard({ label, value, caption, icon }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            {label}
          </p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p className="text-xs text-slate-400">{caption}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          {icon}
        </div>
      </div>
    </div>
  );
}
