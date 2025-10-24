'use client';

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation, heroContent } from "@/data/mock/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 transition">
        <Link
          href="#top"
          className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600"
        >
          IntelliM
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={heroContent.secondaryCta.href}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
          >
            {heroContent.secondaryCta.label}
          </Link>
          <Link
            href={heroContent.primaryCta.href}
            className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
          >
            {heroContent.primaryCta.label}
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <MobileMenu open={open} onNavigate={() => setOpen(false)} />
    </header>
  );
}

function MobileMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className={cn(
        "mt-2 w-full border-t border-slate-200 bg-white px-6 py-5 text-sm text-slate-600 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition duration-300 md:hidden",
        open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
      )}
    >
      <nav className="grid gap-4">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-transparent px-4 py-2 transition hover:border-blue-300 hover:text-blue-600"
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-6 grid gap-3">
        <Link
          href={heroContent.primaryCta.href}
          className="rounded-full bg-blue-600 px-4 py-2 text-center text-xs font-semibold text-white"
          onClick={onNavigate}
        >
          {heroContent.primaryCta.label}
        </Link>
        <Link
          href={heroContent.secondaryCta.href}
          className="rounded-full border border-slate-200 px-4 py-2 text-center text-xs font-semibold text-slate-700"
          onClick={onNavigate}
        >
          {heroContent.secondaryCta.label}
        </Link>
      </div>
    </div>
  );
}
