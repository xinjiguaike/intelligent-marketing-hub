import { preferenceSections } from "@/data/mock/settings";
import { Check, ChevronDown } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-16">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">系统偏好设置</h1>
        <p className="text-sm text-slate-300">
          配置智能协同策略、通知节奏与安全参数，确保团队与数字员工协同一致。
        </p>
      </header>

      <section className="space-y-6">
        {preferenceSections.map((section) => (
          <article
            key={section.id}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
          >
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {section.title}
                </h2>
                <p className="text-sm text-slate-400">{section.description}</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100">
                <Check className="h-3.5 w-3.5" />
                保存更改
              </button>
            </header>
            <div className="mt-5 space-y-4">
              {section.options.map((option) => (
                <div
                  key={option.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{option.label}</p>
                      {option.hint ? (
                        <p className="text-xs text-slate-500">{option.hint}</p>
                      ) : null}
                    </div>
                    {renderControl(option)}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function renderControl(option: (typeof preferenceSections)[number]["options"][number]) {
  if (option.type === "toggle") {
    const active = option.value === "on";
    return (
      <button
        className={`relative h-7 w-12 rounded-full border transition ${
          active
            ? "border-emerald-400/40 bg-emerald-400/20"
            : "border-white/10 bg-white/5"
        }`}
      >
        <span
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition ${
            active ? "left-6" : "left-1"
          }`}
        />
      </button>
    );
  }

  if (option.type === "select" && option.options) {
    return (
      <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100">
        {option.options.find((item) => item.value === option.value)?.label ??
          "选择"}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100">
      {option.value}
    </div>
  );
}
