import { faqs } from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function FAQSection() {
  return (
    <section id="faqs" className="space-y-12 border-t border-slate-200 pt-16">
      <SectionHeading
        eyebrow="常见问题"
        title="部署与合作常见问答"
        description="以下为客户最关注的问题。如需更多信息，可联系线下顾问获取演示与定制化方案。"
      />
      <div className="grid gap-8 md:grid-cols-2">
        {faqs.map((faq) => (
          <div key={faq.question} className="space-y-3">
            <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
            <p className="leading-7 text-slate-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
