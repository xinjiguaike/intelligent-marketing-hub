import Link from "next/link";
import { StrategyNode } from "@/types";
import { StrategyTree } from "@/components/strategy/strategy-tree";
import { BookMarked, FolderOpen } from "lucide-react";

type StrategyKnowledgeBaseProps = {
  tree: StrategyNode;
};

export function StrategyKnowledgeBase({ tree }: StrategyKnowledgeBaseProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">策略知识库</h2>
          <p className="mt-1 text-xs text-slate-400">
            浏览沉淀的策略树结构，复用洞察与模板，点击节点可在创建流程中引用。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Link
            href="/strategy/new?resume=template"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/15 px-3 py-2 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.25)] transition hover:bg-sky-400/25"
          >
            <FolderOpen className="h-3.5 w-3.5" />
            使用模板启动
          </Link>
          <Link
            href="/docs/strategy-handbook"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:border-sky-400/30 hover:text-sky-100"
          >
            <BookMarked className="h-3.5 w-3.5" />
            品牌调性手册
          </Link>
        </div>
      </header>
      <div className="mt-5 flex-1 overflow-y-auto pr-2">
        <StrategyTree node={tree} />
      </div>
    </div>
  );
}
