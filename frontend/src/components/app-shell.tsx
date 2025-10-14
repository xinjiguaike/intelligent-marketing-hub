"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, Suspense, useEffect, useMemo, useRef, useState } from "react";
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
    <div className="flex min-h-screen bg-white/80 text-slate-900">
      <aside className="hidden min-h-screen w-64 flex-col border-r border-slate-200/70 bg-white/80 backdrop-blur-xl lg:flex">
        <div className="flex h-16 items-center gap-2 px-6">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-sky-400/90 to-cyan-500/80 shadow-[0_0_25px_rgba(59,130,246,0.25)]">
            <BrainCircuit className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-widest text-slate-900">
              IntelliM
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
        <div className="border-t border-slate-200/70 p-4">
          <div className="rounded-xl border border-slate-200/70 bg-white/90 p-4 shadow-sm">
            <p className="text-xs text-slate-600">
              今日 AI 协同效率 <span className="font-semibold text-sky-600">92%</span>
            </p>
            <p className="mt-2 text-[11px] text-slate-500">
              继续保持人机协作节奏，确保关键里程碑按时交付。
            </p>
          </div>
        </div>
      </aside>
      <div className="relative flex min-h-screen flex-1 flex-col">
        <Suspense fallback={<div className="h-16 border-b border-slate-200/70 bg-white/70" />}>
          <TopBar />
        </Suspense>
        <main className="mx-auto w-full max-w-[1400px] flex-1 rounded-3xl border border-slate-200/60 bg-white/90 px-4 pb-14 pt-6 shadow-[0_32px_120px_-48px_rgba(15,23,42,0.35)] sm:px-6 lg:px-8">
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
            ? "bg-gradient-to-r from-sky-100 via-cyan-50 to-transparent text-sky-700 shadow-[0_0_18px_rgba(59,130,246,0.18)]"
            : "text-slate-600 hover:text-sky-700 hover:bg-sky-50/80"
        )}
      >
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/70 bg-white/80 transition",
            isActive
              ? "border-sky-400/50 bg-sky-100 text-sky-700"
              : "group-hover:border-sky-400/40 group-hover:bg-sky-50 group-hover:text-sky-600"
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
    <header className="relative border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-200/40 to-transparent" />
      <div ref={roleMenuRef} className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative hidden max-w-sm flex-1 items-center md:flex">
              <input
                type="text"
                placeholder="搜索任务、活动、智能体..."
                className="w-full rounded-xl border border-slate-200/70 bg-white px-10 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-sky-200/40"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Compass className="h-4 w-4" />
              </span>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-slate-200/70 bg-slate-50 px-2 py-[2px] text-[10px] uppercase tracking-widest text-slate-500">
                ⌘K
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen((prev) => !prev)}
                className={cn(
                  "flex items-center gap-2 rounded-full border border-slate-200/70 bg-white px-2 py-1.5 text-sm text-slate-600 transition hover:border-sky-400/30 hover:text-sky-700 hover:shadow-sm",
                  isRoleMenuOpen && "border-sky-400/40 text-sky-700"
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-slate-100 text-sm font-semibold text-slate-700">
                  {activeRole ? activeRole.owner.slice(0, 2) : "AI"}
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-400 transition-transform",
                    isRoleMenuOpen && "rotate-180 text-sky-500"
                  )}
                />
              </button>
              {isRoleMenuOpen && (
                <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-slate-200/70 bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl">
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
                              ? "border border-sky-400/40 bg-sky-100 text-sky-700 shadow-[0_0_12px_rgba(59,130,246,0.18)]"
                              : "border border-transparent text-slate-600 hover:border-sky-400/30 hover:bg-sky-50 hover:text-sky-700"
                          )}
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">{board.owner}</span>
                            <span className="text-[11px] text-slate-500">{board.role}</span>
                          </div>
                          {isActive && <span className="text-[11px] text-sky-600">当前</span>}
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
