import { valuePropositions } from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function ValuePropositionGrid() {
  return (
    <section id="highlights" className="relative border-t border-slate-200 pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-8 h-56 bg-gradient-to-r from-blue-200/25 via-transparent to-cyan-200/25 blur-3xl" />
      <div className="relative space-y-12">
        <SectionHeading
          eyebrow="核心价值"
          title="以数字员工驱动的营销闭环"
          description="聚焦策划协同、团队共创与数据复盘三大场景，覆盖从战略决策到执行落地的每一个关键节点。"
          align="left"
        />
        <div className="grid gap-10 md:grid-cols-3">
          {valuePropositions.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                <span className="h-10 w-10 rounded-full bg-blue-100 text-center text-base leading-10">
                  {item.title.slice(0, 1)}
                </span>
                {item.title}
              </div>
              <p className="text-base leading-7 text-slate-600">{item.description}</p>
              <p className="text-sm leading-6 text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
