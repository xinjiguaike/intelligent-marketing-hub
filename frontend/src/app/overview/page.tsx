import {
  agentStatuses,
  dashboardKpis,
  goals,
  insights,
  milestones,
  riskAlerts,
} from "@/data/mock/dashboard";
import { AgentStrip } from "@/components/dashboard/agent-strip";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { GoalGrid } from "@/components/dashboard/goal-grid";
import { RiskPanel } from "@/components/dashboard/risk-panel";
import { MilestonePanel } from "@/components/dashboard/milestone-panel";
import { InsightTimeline } from "@/components/dashboard/insight-timeline";

export default function OverviewPage() {
  return (
    <div className="space-y-8 pb-12">
      <AgentStrip agents={agentStatuses} />
      <KpiCards items={dashboardKpis} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <GoalGrid goals={goals} />
          <InsightTimeline insights={insights} />
        </div>
        <div className="space-y-6">
          <RiskPanel risks={riskAlerts} />
          <MilestonePanel items={milestones} />
        </div>
      </div>
    </div>
  );
}
