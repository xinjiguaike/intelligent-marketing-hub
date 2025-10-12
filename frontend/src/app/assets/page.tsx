import { AssetGallery } from "@/components/assets/asset-gallery";

export default function AssetsPage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">素材与内容库</h1>
        <p className="text-sm text-slate-300">
          汇集多渠道创意资产，支持 AI 智能贴标签与批量推送到内容计划。
        </p>
      </section>
      <AssetGallery />
    </div>
  );
}
