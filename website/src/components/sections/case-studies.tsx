import { caseStudies } from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function CaseStudies() {
  return (
    <section id="cases" className="space-y-10 border-t border-slate-200 pt-16">
      <SectionHeading
        eyebrow="成功案例"
        title="行业头部品牌的增长实践"
        description="通过真实营销项目的关键指标与洞察，看 IntelliM 如何在不同场景提升效率、放大创意价值并沉淀复盘资产。"
      />
      <div className="grid gap-8 md:grid-cols-3">
        {caseStudies.map((item) => (
          <article
            key={item.brand}
            className="flex flex-col gap-3 rounded-3xl bg-white/80 p-6 text-sm text-slate-600 ring-1 ring-slate-200/70"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-500">
                客户案例
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.brand}</h3>
            </div>
            <p className="leading-6 text-slate-700">{item.result}</p>
            <p className="text-xs leading-6 text-slate-500">{item.insight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
