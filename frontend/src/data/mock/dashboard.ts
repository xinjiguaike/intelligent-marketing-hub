import {
  AgentStatus,
  DashboardKpi,
  GoalProgress,
  Insight,
  Milestone,
  RiskAlert,
} from "@/types";

export const agentStatuses: AgentStatus[] = [
  {
    id: "planner-ai",
    name: "策划 AI",
    role: "planner",
    status: "running",
    confidence: 0.86,
    tasksInQueue: 3,
    lastOutput: "《新品预热-社交矩阵》活动策略",
    trend: 12,
  },
  {
    id: "creator-ai",
    name: "创意 AI",
    role: "creator",
    status: "idle",
    confidence: 0.91,
    tasksInQueue: 1,
    lastOutput: "短视频脚本 - 场景体验篇",
    trend: 4,
  },
  {
    id: "operator-ai",
    name: "运营 AI",
    role: "operator",
    status: "handover",
    confidence: 0.74,
    tasksInQueue: 2,
    lastOutput: "KOC 扩列名单草稿",
    trend: -6,
  },
  {
    id: "insight-ai",
    name: "洞察 AI",
    role: "analyst",
    status: "running",
    confidence: 0.89,
    tasksInQueue: 2,
    lastOutput: "直播预约率异常波动预警",
    trend: 9,
  },
];

export const goals: GoalProgress[] = [
  {
    id: "goal-2024-q3",
    name: "新品上市整合战役",
    progress: 0.68,
    deadline: "2024-08-12T15:00:00+08:00",
    owner: "品牌管理者",
  },
  {
    id: "goal-short-video",
    name: "短视频矩阵曝光",
    progress: 0.54,
    deadline: "2024-07-28T12:00:00+08:00",
    owner: "创意团队",
  },
];

export const insights: Insight[] = [
  {
    id: "insight-001",
    title: "直播预约增长 35%",
    summary: "直播预热期预约量较上周提升 35%，AI 建议加码短视频投放。",
    chainOfThought: [
      "聚合多平台预约数据，发现增长曲线异常",
      "关联最近一次短视频推广节点，确定因果",
      "计算 ROI 并建议提高高意向人群预算",
    ],
    impact: "positive",
    time: "2024-07-12T09:24:00+08:00",
  },
  {
    id: "insight-002",
    title: "小红书内容互动率下降",
    summary:
      "近 48 小时小红书账号互动率下降 12%，AI 建议人工校对最新发布策略。",
    chainOfThought: [
      "拉取近 10 篇笔记互动数据，确认趋势下降",
      "交叉比对竞品互动表现，发现竞争加剧",
      "建议人工审阅内容风格与关键词覆盖",
    ],
    impact: "negative",
    time: "2024-07-12T08:40:00+08:00",
  },
];

export const dashboardKpis: DashboardKpi[] = [
  {
    id: "kpi-goal",
    label: "交付目标完成度",
    value: "68%",
    delta: 8.4,
    trend: "up",
    caption: "较上周",
  },
  {
    id: "kpi-ai-output",
    label: "AI 生成内容数",
    value: "124",
    delta: 12.5,
    trend: "up",
    caption: "过去 7 天",
  },
  {
    id: "kpi-approval",
    label: "协作审批通过率",
    value: "93%",
    delta: -2.3,
    trend: "down",
    caption: "人工接管次数",
  },
];

export const riskAlerts: RiskAlert[] = [
  {
    id: "risk-001",
    title: "投放素材审批超时",
    severity: "high",
    description: "抖音投放素材等待人工确认，已超时 4 小时。",
    owner: "创意 AI → 李欣",
    eta: "2024-07-12T11:30:00+08:00",
  },
  {
    id: "risk-002",
    title: "直播脚本待确认",
    severity: "medium",
    description: "直播导购脚本需要主播团队确认口播节奏。",
    owner: "策划 AI → 主播团队",
    eta: "2024-07-12T18:00:00+08:00",
  },
];

export const milestones: Milestone[] = [
  {
    id: "ms-001",
    title: "新品发布会彩排",
    dueAt: "2024-07-14T15:00:00+08:00",
    status: "due-soon",
    description: "线下场地确认、主持人流程彩排。",
  },
  {
    id: "ms-002",
    title: "达人短视频批量发布",
    dueAt: "2024-07-16T10:00:00+08:00",
    status: "on-track",
    description: "预计 8 条内容完成排期。",
  },
  {
    id: "ms-003",
    title: "投放策略复盘",
    dueAt: "2024-07-18T09:00:00+08:00",
    status: "at-risk",
    description: "AI 提醒预算消耗接近 80%，需复盘调整。",
  },
];
