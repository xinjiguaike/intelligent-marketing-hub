import Link from "next/link";
import { AssetGallery } from "@/components/assets/asset-gallery";
import {
  BadgeCheck,
  CircleUserRound,
  Layers,
  Package,
  Share2,
  UsersRound,
} from "lucide-react";
import {
  advocateAccounts,
  assetLifecycles,
  matrixAccounts,
  productResources,
} from "@/data/mock/brand-resources";
import { assets } from "@/data/mock/assets";
import { ReactNode } from "react";

const overviewMetrics = [
  {
    title: "矩阵账号",
    value: `${matrixAccounts.length} 个`,
    caption: "品牌自营 + 达人共建渠道",
    icon: <UsersRound className="h-5 w-5 text-emerald-300" />,
  },
  {
    title: "活跃达人",
    value: `${advocateAccounts.filter((item) => item.status === "执行中").length} 位`,
    caption: "KOC/KOS/KOL 正在执行任务",
    icon: <CircleUserRound className="h-5 w-5 text-sky-300" />,
  },
  {
    title: "商品资料",
    value: `${productResources.length} 条`,
    caption: "含卖点、渠道与素材映射",
    icon: <Package className="h-5 w-5 text-amber-300" />,
  },
  {
    title: "内容资产",
    value: `${assets.length} 条`,
    caption: `${assetLifecycles.filter((item) => item.stage === "待质检").length} 条待质检`,
    icon: <BadgeCheck className="h-5 w-5 text-rose-300" />,
  },
];

const resourceModules = [
  {
    title: "媒介矩阵账号管理",
    description:
      "统一查看品牌自有与授权渠道账号的健康状态、负责人与绑定资产，支持批量授权与同步。",
    icon: Share2,
    cta: "进入账号矩阵",
    href: "/assets/accounts",
  },
  {
    title: "KOC / KOS 账号管理",
    description:
      "集中管理达人档案、激励任务与合作排期，实时追踪交付节点与活跃指数。",
    icon: CircleUserRound,
    cta: "管理达人账号",
    href: "/assets/advocates",
  },
  {
    title: "商品资料管理",
    description:
      "维护 SKU 卖点、渠道适配与素材引用，输出模板包便于策划与创意一键调用。",
    icon: Package,
    cta: "整理商品资料",
    href: "/assets/products",
  },
  {
    title: "素材与内容资产管理",
    description:
      "掌握内容资产生命周期、质检状态与 AI 标签建议，支持批量推送至营销排期。",
    icon: Layers,
    cta: "管理内容资产",
    href: "/assets/library",
  },
];

export default function AssetsPage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">品牌资源中心</h1>
        <p className="text-sm text-slate-300">
          汇聚媒介账号、KOC/KOS 档案、商品资料与内容资产，形成品牌一体化资源底座。
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <MetricCard
            key={metric.title}
            label={metric.title}
            value={metric.value}
            caption={metric.caption}
            icon={metric.icon}
          />
        ))}
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        {resourceModules.map((module) => (
          <div
            key={module.title}
            className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
          >
            <div className="space-y-3">
              <module.icon className="h-6 w-6 text-sky-300" />
              <h2 className="text-lg font-semibold text-white">{module.title}</h2>
              <p className="text-sm text-slate-300">{module.description}</p>
            </div>
            <Link
              href={module.href}
              className="mt-6 inline-flex w-max items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25"
            >
              {module.cta}
            </Link>
          </div>
        ))}
      </section>
      <section id="brand-assets" className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-white">内容资产总览</h2>
          <p className="text-sm text-slate-300">
            从素材盘点到复用轨迹一站可见，AI 自动标注潜力场景并支持快速推送到营销排期。
          </p>
        </div>
        <AssetGallery />
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
