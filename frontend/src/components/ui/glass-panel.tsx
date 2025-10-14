import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
};

export function GlassPanel({ children, className, glow = false }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-panel group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 text-slate-900 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.45)] backdrop-blur-xl transition",
        glow &&
          "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),transparent_60%)] before:opacity-0 before:transition-opacity group-hover:before:opacity-100",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/60 opacity-60 [mask:linear-gradient(white,transparent)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
