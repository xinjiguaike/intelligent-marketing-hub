import {
  advocateAccounts,
  advocateCampaigns,
} from "@/data/mock/brand-resources";
import {
  CalendarDays,
  CircleCheck,
  Clock4,
  UsersRound,
} from "lucide-react";
import { ReactNode } from "react";

const statusBadge: Record<string, string> = {
  执行中: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  待签约: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  暂停合作: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export default function AdvocateAccountsPage() {
  const active = advocateAccounts.filter((item) => item.status === "执行中");
  const pending = advocateAccounts.filter((item) => item.status === "待签约");
  const paused = advocateAccounts.filter((item) => item.status === "暂停合作");
  const averageActivation =
    advocateAccounts.reduce((sum, item) => sum + item.activationScore, 0) /
    advocateAccounts.length;

  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">KOC / KOS 账号管理</h1>
        <p className="text-sm text-slate-300">
          管理达人档案与激励任务节奏，串联合作状态、产出进度与交付提醒，保障种草矩阵高活跃。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="活跃达人"
          value={`${active.length} 位`}
          caption="当前执行中的 KOC/KOS / KOL"
          icon={<UsersRound className="h-5 w-5 text-emerald-300" />}
        />
        <MetricCard
          label="待签约"
          value={`${pending.length} 位`}
          caption="跟进合同与激励方案"
          icon={<Clock4 className="h-5 w-5 text-amber-300" />}
        />
        <MetricCard
          label="暂停合作"
          value={`${paused.length} 位`}
          caption="建议复盘合作质量与激励策略"
          icon={<CircleCheck className="h-5 w-5 text-rose-300" />}
        />
        <MetricCard
          label="平均活跃指数"
          value={`${Math.round(averageActivation * 100)}%`}
          caption="衡量达人响应速度与任务完成率"
          icon={<CalendarDays className="h-5 w-5 text-sky-300" />}
        />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white">达人档案列表</h2>
            <p className="text-sm text-slate-400">
              查看类型、垂直领域、任务数量与下一次交付节点。
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25">
            新增达人档案
          </button>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full divide-y divide-white/5 text-sm text-slate-200">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">达人名称</th>
                <th className="px-4 py-3 text-left">类型</th>
                <th className="px-4 py-3 text-left">垂直领域</th>
                <th className="px-4 py-3 text-left">负责人</th>
                <th className="px-4 py-3 text-left">活跃指数</th>
                <th className="px-4 py-3 text-left">任务数</th>
                <th className="px-4 py-3 text-left">合作状态</th>
                <th className="px-4 py-3 text-left">下一次交付</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/60">
              {advocateAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-white/[0.04]">
                  <td className="px-4 py-3 font-medium text-white">
                    {account.name}
                  </td>
                  <td className="px-4 py-3">{account.type}</td>
                  <td className="px-4 py-3">{account.vertical}</td>
                  <td className="px-4 py-3">{account.owner}</td>
                  <td className="px-4 py-3">
                    {(account.activationScore * 100).toFixed(0)}%
                  </td>
                  <td className="px-4 py-3">{account.tasksInFlight}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${statusBadge[account.status]}`}
                    >
                      {account.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {account.nextDelivery}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white">任务活动排期</h2>
            <p className="text-sm text-slate-400">
              聚合达人在途任务，快速定位进度状态与负责人。
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100">
            同步到运营中心
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {advocateCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
            >
              <p className="text-base font-semibold text-white">
                {campaign.title}
              </p>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                {campaign.type}
              </p>
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>负责人：{campaign.owner}</p>
                <p>状态：{campaign.status}</p>
                <p>节点：{campaign.dueAt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  caption: string;
  icon: ReactNode;
};

function MetricCard({ label, value, caption, icon }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            {label}
          </p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          <p className="text-xs text-slate-400">{caption}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          {icon}
        </div>
      </div>
    </div>
  );
}
