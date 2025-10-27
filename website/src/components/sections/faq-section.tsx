import { faqs } from "@/data/mock/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function FAQSection() {
  return (
    <section id="faqs" className="space-y-10 border-t border-slate-200 pt-16">
      <SectionHeading
        eyebrow="常见问题"
        title="部署与合作常见问答"
        description="以下为客户最关注的问题。如需更多信息，可联系线下顾问获取演示与定制化方案。"
      />
      <div className="divide-y divide-slate-200">
        {faqs.map((faq, idx) => (
          <div key={faq.question} className="py-5">
            <div className="flex items-start gap-3 text-sm text-blue-600">
              <span className="font-semibold">Q:</span>
              <p className="text-base font-semibold text-slate-900">{faq.question}</p>
            </div>
            <div className="mt-2 flex items-start gap-3 text-sm leading-6 text-slate-600">
              <span className="font-semibold text-blue-500">A:</span>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
