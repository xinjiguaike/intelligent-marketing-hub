import {
  authorizationRequests,
  matrixAccounts,
} from "@/data/mock/brand-resources";
import { ArrowUpRight, KeyRound, RefreshCcw, ShieldCheck } from "lucide-react";
import { ReactNode } from "react";

const statusStyles: Record<string, string> = {
  已授权: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  待授权: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  授权失效: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export default function MatrixAccountsPage() {
  const authorized = matrixAccounts.filter((item) => item.status === "已授权");
  const pending = matrixAccounts.filter((item) => item.status === "待授权");
  const abnormal = matrixAccounts.filter((item) => item.status === "授权失效");
  const totalFollowers = matrixAccounts.reduce(
    (sum, item) => sum + item.followers,
    0,
  );

  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">媒介矩阵账号管理</h1>
        <p className="text-sm text-slate-300">
          统一掌握品牌自有与合作账号的授权状态、内容同步与资产绑定情况，确保跨渠道执行一致。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="已授权账号"
          value={`${authorized.length} 个`}
          caption="实时同步内容与投放排期"
          icon={<ShieldCheck className="h-5 w-5 text-emerald-300" />}
        />
        <MetricCard
          label="待授权账号"
          value={`${pending.length} 个`}
          caption="建议尽快完成授权绑定"
          icon={<KeyRound className="h-5 w-5 text-amber-300" />}
        />
        <MetricCard
          label="授权失效"
          value={`${abnormal.length} 个`}
          caption="请检查授权有效期或重新绑定"
          icon={<RefreshCcw className="h-5 w-5 text-rose-300" />}
        />
        <MetricCard
          label="矩阵总粉丝"
          value={formatNumber(totalFollowers)}
          caption="含品牌自营与合作账号"
          icon={<ArrowUpRight className="h-5 w-5 text-sky-300" />}
        />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white">账号列表</h2>
            <p className="text-sm text-slate-400">
              包含授权状态、绑定资产数量与最近同步时间。
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25">
            新增账号
          </button>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full divide-y divide-white/5 text-sm text-slate-200">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">账号名称</th>
                <th className="px-4 py-3 text-left">平台</th>
                <th className="px-4 py-3 text-left">分类</th>
                <th className="px-4 py-3 text-left">负责人</th>
                <th className="px-4 py-3 text-left">授权状态</th>
                <th className="px-4 py-3 text-right">粉丝数</th>
                <th className="px-4 py-3 text-right">绑定资产</th>
                <th className="px-4 py-3 text-left">最近同步</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/60">
              {matrixAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-white/[0.04]">
                  <td className="px-4 py-3 font-medium text-white">
                    {account.name}
                  </td>
                  <td className="px-4 py-3">{account.platform}</td>
                  <td className="px-4 py-3">{account.category}</td>
                  <td className="px-4 py-3">{account.owner}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${statusStyles[account.status]}`}
                    >
                      {account.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatNumber(account.followers)}
                  </td>
                  <td className="px-4 py-3 text-right">{account.boundAssets}</td>
                  <td className="px-4 py-3 text-slate-400">{formatDateTime(account.lastSync)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white">待处理授权请求</h2>
            <p className="text-sm text-slate-400">
              跟进合作方授权与数据同步范围，确保执行权限完整。
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100">
            导出授权清单
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {authorizationRequests.map((request) => (
            <div
              key={request.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
            >
              <div className="space-y-2">
                <div>
                  <p className="text-base font-semibold text-white">
                    {request.accountName}
                  </p>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    {request.platform}
                  </p>
                </div>
                <div className="space-y-1 text-xs text-slate-400">
                  <p>请求范围：{request.pendingScope.join("、")}</p>
                  <p>联系人：{request.contact}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>提交时间：{formatDateTime(request.requestedAt)}</span>
                <button className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold text-sky-100 transition hover:bg-sky-400/20">
                  处理
                </button>
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

function formatNumber(value: number) {
  return new Intl.NumberFormat("zh-CN").format(value);
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
