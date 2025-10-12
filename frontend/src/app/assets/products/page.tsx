"use client";

import {
  productBundles,
  productResources,
} from "@/data/mock/brand-resources";
import {
  ChartPie,
  Package,
  Palmtree,
  Sparkles,
  Tags,
} from "lucide-react";
import { ReactNode, useState } from "react";

const statusTone: Record<string, string> = {
  上架: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  调优中: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  下线准备: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

const ALL_CATEGORY = "全部分类";

const PRODUCT_TOTAL_ASSETS = productResources.reduce(
  (sum, item) => sum + item.assetsLinked,
  0,
);

const PRODUCT_CHANNEL_SET = productResources.reduce((set, item) => {
  item.channels.forEach((channel) => set.add(channel));
  return set;
}, new Set<string>());

const PRODUCT_CATEGORIES = [
  ALL_CATEGORY,
  ...Array.from(
    productResources.reduce((set, item) => set.add(item.category), new Set<string>()),
  ),
];

const PRODUCT_CATEGORY_SUMMARY = Array.from(
  productResources.reduce((map, item) => {
    const existing = map.get(item.category);
    if (existing) {
      existing.count += 1;
      existing.assets += item.assetsLinked;
      item.channels.forEach((channel) => existing.channels.add(channel));
    } else {
      map.set(item.category, {
        count: 1,
        assets: item.assetsLinked,
        channels: new Set(item.channels),
      });
    }
    return map;
  }, new Map<string, { count: number; assets: number; channels: Set<string> }>()),
).map(([category, data]) => ({
  category,
  count: data.count,
  assets: data.assets,
  channels: Array.from(data.channels),
}));

const AVERAGE_ASSET_USAGE = Math.round(
  PRODUCT_TOTAL_ASSETS / productResources.length,
);

export default function ProductResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);

  const filteredProducts =
    activeCategory === ALL_CATEGORY
      ? productResources
      : productResources.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">商品资料管理</h1>
        <p className="text-sm text-slate-300">
          聚合品牌商品卖点、渠道适配与素材引用，实现策划、创意与投放的同源协同。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="在管商品"
          value={`${productResources.length} 个`}
          caption="覆盖硬件、服务与沉浸体验"
          icon={<Package className="h-5 w-5 text-emerald-300" />}
        />
        <MetricCard
          label="累计绑定素材"
          value={`${PRODUCT_TOTAL_ASSETS} 条`}
          caption="用于投放、内容与销售场景"
          icon={<Tags className="h-5 w-5 text-sky-300" />}
        />
        <MetricCard
          label="覆盖渠道"
          value={`${PRODUCT_CHANNEL_SET.size} 个`}
          caption="线上线下多触达阵列"
          icon={<Sparkles className="h-5 w-5 text-amber-300" />}
        />
        <MetricCard
          label="平均素材引用"
          value={`${AVERAGE_ASSET_USAGE} 条/品`}
          caption="衡量商品资料沉淀程度"
          icon={<ChartPie className="h-5 w-5 text-rose-300" />}
        />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white">商品资料库</h2>
            <p className="text-sm text-slate-400">
              支持按分类筛选，快速检索核心卖点、渠道适配与引用情况。
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25">
            新增商品资料
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                activeCategory === category
                  ? "border-sky-400/40 bg-sky-400/15 text-sky-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-sky-400/30 hover:text-sky-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full divide-y divide-white/5 text-sm text-slate-200">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">商品名称</th>
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">分类</th>
                <th className="px-4 py-3 text-left">核心卖点</th>
                <th className="px-4 py-3 text-left">推荐渠道</th>
                <th className="px-4 py-3 text-left">状态</th>
                <th className="px-4 py-3 text-right">绑定素材</th>
                <th className="px-4 py-3 text-left">更新时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/60">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.04]">
                  <td className="px-4 py-3 font-medium text-white">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{product.sku}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 text-slate-200">
                    {product.highlight}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-sky-100">
                      {product.channels.map((channel) => (
                        <span
                          key={channel}
                          className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1"
                        >
                          {channel}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${statusTone[product.status]}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {product.assetsLinked}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{product.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white">类别分布</h2>
            <p className="text-sm text-slate-400">
              了解不同商品类型的资产沉淀与渠道覆盖范围。
            </p>
          </div>
          <div className="mt-4 space-y-4">
            {PRODUCT_CATEGORY_SUMMARY.map((summary) => (
              <div
                key={summary.category}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300"
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-white">
                    {summary.category}
                  </p>
                  <span className="text-xs text-slate-400">
                    {summary.channels.length} 个渠道
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  商品数量：{summary.count} 个 · 绑定素材：{summary.assets} 条
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-sky-100">
                  {summary.channels.map((channel) => (
                    <span
                      key={channel}
                      className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white">模板包与引用</h2>
            <p className="text-sm text-slate-400">
              常用商品组合包与最近使用记录，便于快速调用。
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {productBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
              >
                <p className="text-base font-semibold text-white">
                  {bundle.title}
                </p>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  {bundle.owner}
                </p>
                <p className="mt-2 text-sm text-slate-200">{bundle.purpose}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>包含商品：{bundle.items}</span>
                  <span>近期使用：{bundle.lastUsedAt}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100">
            导出模板包
          </button>
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
