"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  BrainCircuit,
  ChartSpline,
  ChevronDown,
  Compass,
  LayoutDashboard,
  Palette,
  Bot,
  Presentation,
  Radar,
  ServerCog,
  SigmaSquare,
  UserRound,
  Workflow,
  Boxes,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { personalBoards } from "@/data/mock/orchestration";

type AppShellProps = {
  children: ReactNode;
};

const navItems = [
  {
    label: "个人工作台",
    href: "/",
    icon: UserRound,
  },
  {
    label: "总览驾驶舱",
    href: "/overview",
    icon: LayoutDashboard,
  },
  {
    label: "智能任务编排",
    href: "/workflow",
    icon: Workflow,
  },
  {
    label: "营销策划空间",
    href: "/strategy",
    icon: Presentation,
  },
  {
    label: "创意工作室",
    href: "/creative",
    icon: Palette,
  },
  {
    label: "运营中心",
    href: "/operations",
    icon: Radar,
  },
  {
    label: "洞察中心",
    href: "/insights",
    icon: ChartSpline,
  },
  {
    label: "品牌资源中心",
    href: "/assets",
    icon: Boxes,
  },
];

const secondaryItems = [
  {
    label: "AI 智能体中控",
    href: "/ai-control",
    icon: BrainCircuit,
  },
  {
    label: "数字员工管理",
    href: "/agents",
    icon: Bot,
  },
  {
    label: "系统偏好设置",
    href: "/settings",
    icon: ServerCog,
  },
  {
    label: "知识库",
    href: "/knowledge",
    icon: SigmaSquare,
  },
];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen text-slate-50">
      <aside className="hidden min-h-screen w-64 flex-col border-r border-white/5 bg-slate-950/45 backdrop-blur-xl lg:flex">
        <div className="flex h-16 items-center gap-2 px-6">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-sky-400/80 to-cyan-500/70 shadow-[0_0_25px_rgba(56,189,248,0.35)]">
            <BrainCircuit className="h-6 w-6 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold uppercase tracking-widest text-slate-100">
              A-Mind
            </span>
            <span className="text-[11px] uppercase tracking-[0.4em] text-slate-400">
              Intelligent Hub
            </span>
          </div>
        </div>
        <nav className="mt-4 flex-1 space-y-6 px-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`)
                }
              />
            ))}
          </ul>
          <div className="h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
          <ul className="space-y-1">
            {secondaryItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={pathname === item.href}
              />
            ))}
          </ul>
        </nav>
        <div className="border-t border-white/5 p-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-300">
              今日 AI 协同效率 <span className="font-semibold text-sky-300">92%</span>
            </p>
            <p className="mt-2 text-[11px] text-slate-500">
              继续保持人机协作节奏，确保关键里程碑按时交付。
            </p>
          </div>
        </div>
      </aside>
      <div className="relative flex min-h-screen flex-1 flex-col">
        <TopBar />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 pb-14 pt-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

type NavLinkProps = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
};

function NavLink({ href, label, icon: Icon, isActive }: NavLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-200",
          isActive
            ? "bg-gradient-to-r from-sky-500/20 to-cyan-400/10 text-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.35)]"
            : "text-slate-400 hover:text-sky-100 hover:bg-white/5"
        )}
      >
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/5 transition",
            isActive
              ? "border-sky-400/40 bg-sky-400/20 text-sky-100"
              : "group-hover:border-sky-300/30 group-hover:bg-sky-300/10 group-hover:text-sky-100"
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
}

function TopBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isRoleMenuOpen, setRoleMenuOpen] = useState(false);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  const activeUserId = searchParams?.get("user") ?? null;

  const activeRole = useMemo(() => {
    if (!personalBoards.length) {
      return null;
    }
    if (activeUserId) {
      const matched = personalBoards.find((board) => board.id === activeUserId);
      if (matched) {
        return matched;
      }
    }
    return personalBoards[0];
  }, [activeUserId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target as Node)) {
        setRoleMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setRoleMenuOpen(false);
  }, [pathname, activeUserId]);

  return (
    <header className="relative border-b border-white/5 bg-slate-950/40 backdrop-blur-2xl">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
      <div ref={roleMenuRef} className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative hidden max-w-sm flex-1 items-center md:flex">
              <input
                type="text"
                placeholder="搜索任务、活动、智能体..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-10 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <Compass className="h-4 w-4" />
              </span>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-2 py-[2px] text-[10px] uppercase tracking-widest text-slate-400">
                ⌘K
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen((prev) => !prev)}
                className={cn(
                  "flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-b from-slate-800/60 to-slate-900/80 px-2 py-1.5 text-sm text-slate-300 transition hover:border-sky-400/40 hover:text-sky-100",
                  isRoleMenuOpen && "border-sky-400/40 text-sky-100"
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-sm font-semibold">
                  {activeRole ? activeRole.owner.slice(0, 2) : "AI"}
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-400 transition-transform",
                    isRoleMenuOpen && "rotate-180 text-sky-200"
                  )}
                />
              </button>
              {isRoleMenuOpen && (
                <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-white/10 bg-slate-950/95 p-2 shadow-[0_12px_28px_rgba(2,6,23,0.45)] backdrop-blur-xl">
                  <div className="mb-2 px-2 text-[11px] uppercase tracking-[0.35em] text-slate-500">
                    切换用户
                  </div>
                  <div className="space-y-1">
                    {personalBoards.map((board) => {
                      const isActive = activeRole?.id === board.id;
                      return (
                        <Link
                          key={board.id}
                          href={`/?user=${board.id}`}
                          onClick={() => setRoleMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                            isActive
                              ? "border border-sky-400/40 bg-sky-400/15 text-sky-100 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                              : "border border-transparent text-slate-200 hover:border-sky-400/20 hover:bg-sky-400/10 hover:text-sky-100"
                          )}
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-white">{board.owner}</span>
                            <span className="text-[11px] text-slate-400">{board.role}</span>
                          </div>
                          {isActive && <span className="text-[11px] text-sky-200">当前</span>}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
