import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CampaignCreationWizard } from "@/components/strategy/campaign-creation-wizard";

export default function StrategyNewPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-3">
        <Link
          href="/strategy"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100"
        >
          <ArrowLeft className="h-4 w-4" />
          返回营销策划空间
        </Link>
        <h1 className="text-2xl font-semibold text-white">新建营销策划</h1>
      </div>
      <CampaignCreationWizard />
    </div>
  );
}
