import { CreativeWorkspace } from "@/components/creative/creative-workspace";

export default function CreativePage() {
  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">创意工作室</h1>
        <p className="text-sm text-slate-300">
          聚合灵感素材、AI 生成画布与数字员工协同区，一站式完成图文、海报、视频创作。
        </p>
      </section>
      <CreativeWorkspace />
    </div>
  );
}
