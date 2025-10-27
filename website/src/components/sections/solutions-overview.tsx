import Image from "next/image";
import { solutionScenarios } from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { asset } from "@/lib/utils";

export function SolutionsOverview() {
  return (
    <section id="solutions" className="relative border-t border-slate-200 pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-12 h-60 bg-gradient-to-r from-blue-200/25 via-transparent to-indigo-200/25 blur-3xl" />
      <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="行业方案"
            title="面向 KA 品牌的线下销售场景"
            description="结合新品发布、达人共创、私域运营等典型营销项目，展示数字员工如何与真人团队协作，支撑线下销售转化。"
          />
          <p className="text-base leading-7 text-slate-600">
            我们将线下销售流程拆解为洞察研判、协作推进、执行落地与复盘沉淀四个阶段，基于行业最佳实践构建项目模板，
            帮助大型品牌快速复制成功经验并保持品牌语调统一。
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {solutionScenarios.map((scenario) => (
              <article key={scenario.title} className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">{scenario.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {scenario.outcomes.map((outcome) => (
                    <li key={outcome}>· {outcome}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>战役协同总览</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-medium text-blue-600">
              营销流程
            </span>
          </div>
          <div className="mt-6">
            <Image
              src={asset("/images/team-collaboration.svg")}
              alt="团队协同界面示意"
              width={520}
              height={320}
              className="h-auto w-full"
            />
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">
            从洞察到执行的跨团队节点一目了然，可视化追踪里程碑、风险与线下资源调配。
          </p>
        </div>
      </div>
    </section>
  );
}
