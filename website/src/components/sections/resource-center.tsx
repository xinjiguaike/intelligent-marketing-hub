import { resourceCenter } from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function ResourceCenter() {
  return (
    <section id="resources" className="space-y-12 border-t border-slate-200 pt-16">
      <SectionHeading
        eyebrow="资源中心"
        title="预约资料下载与人机协同知识"
        description="填写信息后即可获取白皮书、部署指南与复盘模板，帮助团队落地数字员工体系。"
      />
      <div className="grid gap-8 md:grid-cols-3">
        {resourceCenter.map((resource) => (
          <article
            key={resource.title}
            className="flex flex-col gap-3 rounded-3xl bg-white/80 p-6 text-sm text-slate-600 ring-1 ring-slate-200/70"
          >
            <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
            <p className="leading-6 text-slate-600">{resource.description}</p>
            <a
              href="#contact"
              className="mt-auto w-fit rounded-full border border-blue-200 px-4 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              预约获取
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
