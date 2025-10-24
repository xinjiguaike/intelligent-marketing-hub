'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { heroContent } from "@/data/mock/site";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/60 to-white pt-24 pb-24 sm:pt-28 sm:pb-32"
    >
      <BackgroundGlow />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-xs font-medium uppercase tracking-[0.34em] text-blue-600">
            {heroContent.eyebrow}
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            {heroContent.title}
          </h1>
          <p className="text-lg leading-8 text-slate-600">{heroContent.description}</p>
          <ul className="grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
              <span>策略、洞察、协同、执行一体化流程，加速 KA 品牌策划。</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
              <span>数字员工与真人团队按角色分工协作，交付进度全程可视。</span>
            </li>
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={heroContent.primaryCta.href}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {heroContent.primaryCta.label}
            </a>
            <a
              href={heroContent.secondaryCta.href}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
            >
              {heroContent.secondaryCta.label}
            </a>
          </div>
          <div className="grid gap-4 text-sm text-slate-500 sm:grid-cols-3">
            {heroContent.metrics.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {metric.label}
                </p>
                <p className="text-3xl font-semibold text-slate-900">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="relative flex w-full max-w-lg justify-center px-4 sm:px-0 lg:justify-end"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/85 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>IntelliM overview</span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-medium text-blue-600">
                实时协同
              </span>
            </div>
            <div className="mt-5">
              <Image
                src="/images/hero-illustration.svg"
                alt="IntelliM 智能驾驶舱视图示意"
                width={520}
                height={360}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BackgroundGlow() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_65%)]" />
      <div className="absolute -left-40 top-24 h-72 w-72 rounded-full bg-blue-100 blur-[120px]" />
      <div className="absolute -right-32 bottom-8 h-64 w-64 rounded-full bg-cyan-100 blur-[140px]" />
    </>
  );
}
