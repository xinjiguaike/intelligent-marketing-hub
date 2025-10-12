import Link from "next/link";
import {
  agentStatuses,
  dashboardKpis,
  goals,
  insights,
  milestones,
  riskAlerts,
} from "@/data/mock/dashboard";
import {
  insightActions,
  insightCollaborationMessages,
  insightHighlights,
  collaborationThreads,
} from "@/data/mock/insights";
import { workflowColumns } from "@/data/mock/workflow";
import { AgentStrip } from "@/components/dashboard/agent-strip";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { GoalGrid } from "@/components/dashboard/goal-grid";
import { RiskPanel } from "@/components/dashboard/risk-panel";
import { MilestonePanel } from "@/components/dashboard/milestone-panel";
import { InsightTimeline } from "@/components/dashboard/insight-timeline";
import { SystemHero } from "@/components/overview/system-hero";
import { InsightCollaborationPanel } from "@/components/overview/insight-collaboration-panel";
import { WorkflowSnapshot } from "@/components/overview/workflow-snapshot";

export default function OverviewPage() {
  const tasks = workflowColumns.flatMap((column) => column.tasks);
  const activeThreads = collaborationThreads.filter((thread) => thread.status !== "已归档");
  const pendingActions = insightActions.filter((action) => action.status !== "done");
  const heroHighlight = insightHighlights[0];
  const latestAiMessage = [...insightCollaborationMessages]
    .reverse()
    .find((message) => message.sender === "ai");
  const lastAiUpdateLabel = latestAiMessage
    ? new Date(latestAiMessage.createdAt).toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : undefined;
  const nextMilestone = [...milestones].sort(
    (a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime()
  )[0];

  return (
    <div className="space-y-8 pb-12">
      <SystemHero
        highlight={heroHighlight}
        actionCount={pendingActions.length}
        activeThreads={activeThreads.length}
        nextMilestone={nextMilestone}
        lastAiUpdateLabel={lastAiUpdateLabel}
      />
      <AgentStrip agents={agentStatuses} />
      <KpiCards items={dashboardKpis} />
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <InsightCollaborationPanel
            highlights={insightHighlights}
            threads={collaborationThreads}
            actions={insightActions}
            latestMessage={insightCollaborationMessages.at(-1)}
          />
          <GoalGrid goals={goals} />
          <InsightTimeline insights={insights} />
        </div>
        <div className="space-y-6">
          <WorkflowSnapshot tasks={tasks} />
          <RiskPanel risks={riskAlerts} />
          <MilestonePanel items={milestones} />
          <Link
            href="/insights/collaboration"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-sky-400/15 px-4 py-3 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/25"
          >
            协作洞察工作区
          </Link>
        </div>
      </div>
    </div>
  );
}
