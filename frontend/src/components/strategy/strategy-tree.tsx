import { StrategyNode } from "@/types";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Sparkles, Tag } from "lucide-react";

type StrategyTreeProps = {
  node: StrategyNode;
  depth?: number;
};

export function StrategyTree({ node, depth = 0 }: StrategyTreeProps) {
  const isRoot = depth === 0;
  return (
    <div className={cn("relative pl-4", isRoot && "pl-0")}>
      {!isRoot && (
        <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-sky-500/20 via-sky-400/60 to-transparent" />
      )}
      <div
        className={cn(
          "relative rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl transition",
          isRoot
            ? "bg-gradient-to-r from-sky-500/10 to-cyan-400/10"
            : "hover:border-sky-400/30"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            {!isRoot && <Sparkles className="h-4 w-4 text-sky-300" />}
            <span className="font-semibold text-white">{node.title}</span>
          </div>
          {node.tags && node.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {node.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1 text-[11px] font-medium text-sky-200"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {node.description && (
          <p className="mt-2 text-xs text-slate-300">{node.description}</p>
        )}
      </div>
      {node.children && node.children.length > 0 && (
        <div className="mt-4 space-y-4 pl-4">
          {node.children.map((child) => (
            <Fragment key={child.id}>
              <StrategyTree node={child} depth={depth + 1} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
