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
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl transition",
        glow &&
          "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_60%)] before:opacity-0 before:transition-opacity group-hover:before:opacity-100",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 opacity-40 [mask:linear-gradient(white,transparent)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
