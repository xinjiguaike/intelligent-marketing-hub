'use client';

import { FormEvent, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";

type FormState = "idle" | "submitting" | "success";

export function ContactSection() {
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    setTimeout(() => {
      setState("success");
    }, 600);
  };

  return (
    <section id="contact" className="space-y-10 border-t border-slate-200 pt-16">
      <SectionHeading
        eyebrow="联系顾问"
        title="预约线下交流或深度演示"
        description="请留下您的需求与联系方式，我们将在 1 个工作日内与您联系，提供定制化的营销项目策划与系统演示。"
      />
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="公司名称 *">
              <input
                required
                name="company"
                placeholder="请输入公司全称"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </Field>
            <Field label="联系人姓名 *">
              <input
                required
                name="name"
                placeholder="请输入姓名"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </Field>
            <Field label="手机号码 *">
              <input
                required
                name="phone"
                type="tel"
                placeholder="用于安排线下沟通的联系方式"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </Field>
            <Field label="邮箱">
              <input
                name="email"
                type="email"
                placeholder="选填，用于发送资料"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </Field>
          </div>
          <Field label="关注场景 *">
            <select
              required
              name="scenario"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              defaultValue=""
            >
              <option value="" disabled>
                请选择
              </option>
              <option value="product-launch">新品发布项目</option>
              <option value="influencer">达人共创/直播运营</option>
              <option value="private-domain">私域与投放整合</option>
              <option value="other">其他定制化需求</option>
            </select>
          </Field>
          <Field label="补充信息">
            <textarea
              name="message"
              rows={4}
              placeholder="可描述当前挑战、期望目标或项目时间计划"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </Field>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={state !== "idle"}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {state === "submitting" ? "正在提交..." : "提交预约"}
            </button>
            {state === "success" ? (
              <p className="text-xs text-emerald-500">
                已收到您的信息，顾问将尽快与您联系。
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                信息将发送至线下销售团队，仅用于安排沟通。
              </p>
            )}
          </div>
        </form>
        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-blue-50/80 p-6 text-sm text-slate-600">
          <h3 className="text-base font-semibold text-slate-900">交流前准备</h3>
          <ul className="space-y-3 text-slate-600">
            <li>· 当前内容营销组织结构与角色分工概览</li>
            <li>· 关键业务指标与最近的项目目标</li>
            <li>· 与现有系统（CRM、投放、内容库）的集成诉求</li>
            <li>· 希望重点演示的模块或数字员工角色</li>
          </ul>
          <p className="text-xs text-slate-500">
            支持线下驻场共创与定制化导入服务，更多信息将在接洽后提供。
          </p>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2 text-xs text-slate-500">
      <span className="block uppercase tracking-[0.2em]">{label}</span>
      {children}
    </label>
  );
}
