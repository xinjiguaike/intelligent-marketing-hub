import { flowNarrative } from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function FlowNarrative() {
  return (
    <section className="space-y-8 border-t border-slate-200 pt-16">
      <SectionHeading
        eyebrow="人机协同流程"
        title="从洞察点亮到执行闭环的四段式旅程"
        description="每一步都与系统现有模块深度关联，帮助 KA 品牌把握实时机会并快速推进到可见结果。"
        align="left"
      />
      <div className="relative">
        <span className="absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-blue-200 via-slate-200 to-transparent md:block" />
        <ol className="space-y-10">
          {flowNarrative.map((item, index) => (
            <li key={item.title} className="relative flex flex-col gap-3 md:pl-16">
              <span className="absolute left-3 top-1 hidden h-6 w-6 rounded-full border-4 border-white bg-blue-500 shadow-md md:block" />
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 md:hidden">
                {index + 1}
              </span>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
                阶段 {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="text-base leading-7 text-slate-600">{item.summary}</p>
              <p className="text-sm text-slate-500">{item.reference}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
