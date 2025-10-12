"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  agentTeams as initialAgentTeams,
  digitalEmployees as initialAgents,
  skillGaps,
} from "@/data/mock/agents";
import {
  AlertTriangle,
  BadgeCheck,
  Bot,
  Users,
  UserCog,
  Workflow,
} from "lucide-react";
import type { DigitalEmployee, AgentTeam } from "@/data/mock/agents";
import { cn } from "@/lib/utils";

export default function AgentsPage() {
  const [agents, setAgents] = useState<DigitalEmployee[]>(initialAgents);
  const [teams, setTeams] = useState<AgentTeam[]>(initialAgentTeams);

  const stats = useMemo(() => {
    const totalAgents = agents.length;
    const onlineCount = agents.filter((agent) => agent.online).length;
    const executingTasks = agents.reduce(
      (total, agent) =>
        total +
        agent.workloads.filter((task) => task.status === "执行中").length,
      0,
    );
    const waitingHandover = agents.reduce(
      (total, agent) =>
        total +
        agent.workloads.filter((task) => task.status === "待接管").length,
      0,
    );
    return { totalAgents, onlineCount, executingTasks, waitingHandover };
  }, [agents]);

  return (
    <div className="space-y-8 pb-16">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-white">数字员工管理</h1>
        <p className="text-sm text-slate-300">
          统一查看各数字员工的能力焦点、任务排队与训练建议，支持人机混编团队快速协同。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="在线数字员工"
          value={`${stats.onlineCount}/${stats.totalAgents}`}
          caption="确保关键岗位有人值守"
        />
        <MetricCard
          title="执行中任务"
          value={`${stats.executingTasks} 个`}
          caption="跨策略/创意/运营正在推进"
        />
        <MetricCard
          title="待接管任务"
          value={`${stats.waitingHandover} 个`}
          caption="建议人工尽快确认"
          tone="warning"
        />
        <MetricCard
          title="协作小组"
          value={`${teams.length} 个`}
          caption="覆盖策略、创意、运营、洞察"
        />
      </section>

      <AddAgentForm onSubmit={setAgents} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <article
            key={agent.id}
            className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    {agent.role}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-white">
                    {agent.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">{agent.focus}</p>
                </div>
                <span
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-widest ${
                    agent.online
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                      : "border-slate-400/30 bg-slate-400/10 text-slate-200"
                  }`}
                >
                  <Bot className="h-3.5 w-3.5" />
                  {agent.online ? "在线" : "离线"}
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <p>归属团队：{agent.owner}</p>
                <div className="flex flex-wrap gap-1 text-[11px] text-sky-100">
                  {agent.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  当前任务
                </p>
                <div className="space-y-2">
                  {agent.workloads.map((workload) => (
                    <div
                      key={workload.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">
                          {workload.title}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {workload.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        更新时间：{formatDateTime(workload.updatedAt)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button className="rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-sky-100 transition hover:bg-sky-400/25">
                    转派任务
                  </button>
                  <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100">
                    调整权限
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">团队管理</h2>
            <p className="text-sm text-slate-400">
              管理人机混编小组，定义协作范围与沟通渠道，保持节奏一致。
            </p>
          </div>
        </div>
        <AddTeamForm teams={teams} onSubmit={setTeams} />
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-white">{team.name}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-widest text-slate-400">
                  <Users className="h-3.5 w-3.5" />
                  {team.members.length} 人
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                团队负责人：{team.lead}
              </p>
              <p className="mt-1 text-xs text-slate-400">协作焦点：{team.focus}</p>
              <div className="mt-3">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  激活数字员工
                </p>
                <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-sky-100">
                  {team.activeAgents.map((agent) => (
                    <span
                      key={agent}
                      className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1"
                    >
                      {agent}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>成员：{team.members.join("、")}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>协同频道：{team.contactChannel}</span>
                <button className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[11px] text-sky-100 transition hover:bg-sky-400/25">
                  管理团队
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">能力训练建议</h2>
            <p className="text-sm text-slate-400">
              根据任务反馈识别技能短板，及时补充知识或训练数据。
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 transition hover:border-sky-400/40 hover:text-sky-100">
            <BadgeCheck className="h-3.5 w-3.5" />
            一键同步训练集
          </button>
        </div>
        <div className="mt-5 space-y-3">
          {skillGaps.map((gap) => (
            <div
              key={gap.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">{gap.topic}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[11px] uppercase tracking-widest text-amber-200">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  影响：{gap.impact}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400">{gap.description}</p>
              <p className="mt-2 text-xs text-slate-300">
                建议动作：{gap.recommendedAction}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

type MetricCardProps = {
  title: string;
  value: string;
  caption: string;
  tone?: "default" | "warning";
};

function MetricCard({ title, value, caption, tone = "default" }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          {title}
        </p>
        <p
          className={`text-2xl font-semibold ${
            tone === "warning" ? "text-amber-200" : "text-white"
          }`}
        >
          {value}
        </p>
        <p className="inline-flex items-center gap-2 text-xs text-slate-400">
          <Workflow className="h-3.5 w-3.5 text-sky-300" />
          {caption}
        </p>
      </div>
    </div>
  );
}

type AddAgentFormProps = {
  onSubmit: React.Dispatch<React.SetStateAction<DigitalEmployee[]>>;
};

function AddAgentForm({ onSubmit }: AddAgentFormProps) {
  const [isOpen, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    owner: "",
    focus: "",
    skills: "",
    online: true,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = event.target;
    const parsedValue =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name || !form.role || !form.owner) {
      return;
    }

    const skillList = form.skills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const newAgent: DigitalEmployee = {
      id: `agent-${Date.now()}`,
      name: form.name,
      role: form.role,
      focus: form.focus || "未设置",
      owner: form.owner,
      online: form.online,
      skills: skillList.length ? skillList : ["待补充"],
      workloads: [],
    };

    onSubmit((prev) => [...prev, newAgent]);
    setForm({
      name: "",
      role: "",
      owner: "",
      focus: "",
      skills: "",
      online: true,
    });
    setOpen(false);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">添加数字员工</h2>
          <p className="text-sm text-slate-400">
            将新的 AI 能力接入协同网络，配置基础属性与负责团队。
          </p>
        </div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition",
            isOpen
              ? "border-sky-400/40 bg-sky-400/15 text-sky-100"
              : "border-white/10 bg-white/5 text-slate-200 hover:border-sky-400/30 hover:text-sky-100"
          )}
        >
          {isOpen ? "收起表单" : "添加数字员工"}
        </button>
      </header>
      {isOpen ? (
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              命名
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="例如：创意 AI · STUDIO"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              能力角色
            </label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="如：内容创作 / 运营排期"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              归属团队
            </label>
            <input
              name="owner"
              value={form.owner}
              onChange={handleChange}
              placeholder="如：创意团队"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              能力焦点
            </label>
            <input
              name="focus"
              value={form.focus}
              onChange={handleChange}
              placeholder="简要说明主要场景，例如“脚本撰写 / 视觉延展”"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              能力标签（以逗号分隔）
            </label>
            <textarea
              name="skills"
              value={form.skills}
              onChange={handleChange}
              rows={2}
              placeholder="例如：脚本撰写, 视觉风格建议, 素材整理"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-400">
            <input
              type="checkbox"
              name="online"
              checked={form.online}
              onChange={handleChange}
              className="h-4 w-4 rounded border-white/10 bg-white/5 text-sky-400 focus:ring-sky-400/40"
            />
            启用后立即上线
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25"
            >
              保存数字员工
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}

type AddTeamFormProps = {
  teams: AgentTeam[];
  onSubmit: React.Dispatch<React.SetStateAction<AgentTeam[]>>;
};

function AddTeamForm({ teams, onSubmit }: AddTeamFormProps) {
  const [isOpen, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lead: "",
    focus: "",
    members: "",
    activeAgents: "",
    contactChannel: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name || !form.lead) return;

    const parseList = (value: string) =>
      value
        .split(/[,，]/)
        .map((item) => item.trim())
        .filter(Boolean);

    const newTeam: AgentTeam = {
      id: `team-${Date.now()}`,
      name: form.name,
      lead: form.lead,
      focus: form.focus || "未设置",
      members: parseList(form.members),
      activeAgents: parseList(form.activeAgents),
      contactChannel: form.contactChannel || "#team-channel",
    };

    onSubmit((prev) => [...prev, newTeam]);
    setForm({
      name: "",
      lead: "",
      focus: "",
      members: "",
      activeAgents: "",
      contactChannel: "",
    });
    setOpen(false);
  }

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">
          当前共有 {teams.length} 个协作小组。
        </span>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition",
            isOpen
              ? "border-sky-400/40 bg-sky-400/15 text-sky-100"
              : "border-white/10 bg-white/5 text-slate-200 hover:border-sky-400/30 hover:text-sky-100"
          )}
        >
          <UserCog className="h-3.5 w-3.5" />
          {isOpen ? "收起表单" : "新建团队"}
        </button>
      </div>
      {isOpen ? (
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              团队名称
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="例如：创意共创小组"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              负责人
            </label>
            <input
              name="lead"
              value={form.lead}
              onChange={handleChange}
              placeholder="团队负责人姓名"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              成员列表（用逗号分隔）
            </label>
            <input
              name="members"
              value={form.members}
              onChange={handleChange}
              placeholder="如：林墨, 视觉设计, 脚本编辑"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              激活数字员工
            </label>
            <input
              name="activeAgents"
              value={form.activeAgents}
              onChange={handleChange}
              placeholder="如：创意 AI · STUDIO, 洞察 AI · SPARK"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              协作焦点
            </label>
            <input
              name="focus"
              value={form.focus}
              onChange={handleChange}
              placeholder="简要说明协作场景"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-slate-400">
              协同频道
            </label>
            <input
              name="contactChannel"
              value={form.contactChannel}
              onChange={handleChange}
              placeholder="如：#creative-lab"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25"
            >
              保存团队
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
