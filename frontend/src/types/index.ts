export type AgentStatus = {
  id: string;
  name: string;
  role: "planner" | "creator" | "operator" | "analyst" | "other";
  status: "idle" | "running" | "blocked" | "handover" | "cooldown";
  confidence: number;
  tasksInQueue: number;
  lastOutput?: string;
  avatar?: string;
  trend?: number;
};

export type GoalProgress = {
  id: string;
  name: string;
  progress: number;
  deadline: string;
  owner: string;
};

export type Insight = {
  id: string;
  title: string;
  summary: string;
  impact: "positive" | "negative" | "neutral";
  chainOfThought: string[];
  time: string;
};

export type InsightHighlight = {
  id: string;
  title: string;
  metric: string;
  change: number;
  trend: "up" | "down" | "stable";
  description: string;
  owner: string;
  impact: Insight["impact"];
};

export type ChannelInsight = {
  id: string;
  channel: string;
  reach: string;
  engagement: string;
  conversion: string;
  trend: "up" | "down" | "stable";
  narrative: string;
};

export type AudienceSignal = {
  id: string;
  segment: string;
  lift: number;
  timeWindow: string;
  signal: string;
  confidence: number;
};

export type InsightAction = {
  id: string;
  title: string;
  owner: string;
  dueAt: string;
  status: "pending" | "in-progress" | "done";
  aiSupport: string;
  impact: "high" | "medium" | "low";
};

export type CollaborationThread = {
  id: string;
  topic: string;
  participants: string[];
  updatedAt: string;
  status: "同步中" | "待决策" | "已归档";
  summary: string;
  nextStep: string;
};

export type CollaborationActivity = {
  id: string;
  type: "ai" | "team" | "experiment";
  title: string;
  timestamp: string;
  detail: string;
  owner: string;
};

export type DashboardKpi = {
  id: string;
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down";
  caption: string;
};

export type RiskAlert = {
  id: string;
  title: string;
  severity: "low" | "medium" | "high";
  description: string;
  owner: string;
  eta: string;
};

export type Milestone = {
  id: string;
  title: string;
  dueAt: string;
  status: "on-track" | "at-risk" | "due-soon";
  description: string;
};

export type StrategyNode = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  children?: StrategyNode[];
};

export type PromptRecord = {
  id: string;
  role: "ai" | "human";
  content: string;
  createdAt: string;
  score?: number;
};

export type CreativeReference = {
  id: string;
  title: string;
  thumbnail: string;
  tags: string[];
};

export type CreativeVersion = {
  id: string;
  label: string;
  timestamp: string;
  summary: string;
};

export type CollaborationMessage = {
  id: string;
  sender: "ai" | "human";
  content: string;
  createdAt: string;
};

export type AssetItem = {
  id: string;
  title: string;
  channel: string;
  type: "image" | "video" | "copy";
  cover: string;
  tags: string[];
  recommendation: string;
};

export type TagSuggestion = {
  id: string;
  assetId: string;
  tags: string[];
  confidence: number;
};

export type AccountMetric = {
  id: string;
  name: string;
  platform: string;
  health: number;
  growth: number;
  status: "healthy" | "warning" | "critical";
};

export type ScheduleItem = {
  id: string;
  title: string;
  owner: string;
  start: string;
  end: string;
  channel: string;
};

export type CollaborationProgress = {
  id: string;
  creator: string;
  type: "KOL" | "KOC" | "KOS";
  status: "接洽" | "沟通中" | "确认合作" | "已发布";
  nextStep: string;
};

export type PublishingSlot = {
  id: string;
  account: string;
  channel: string;
  scheduledAt: string;
  status: "已确认" | "待确认" | "调整建议";
  focus: string;
  aiRecommendation?: string;
};

export type MatrixAccount = {
  id: string;
  name: string;
  platform: string;
  category: string;
  owner: string;
  status: "已授权" | "待授权" | "授权失效";
  followers: number;
  engagement: number;
  lastSync: string;
  boundAssets: number;
};

export type AuthorizationRequest = {
  id: string;
  accountName: string;
  platform: string;
  pendingScope: string[];
  requestedAt: string;
  contact: string;
};

export type AdvocateAccount = {
  id: string;
  name: string;
  type: "KOL" | "KOC" | "KOS";
  vertical: string;
  owner: string;
  status: "执行中" | "待签约" | "暂停合作";
  activationScore: number;
  tasksInFlight: number;
  nextDelivery: string;
};

export type AdvocateCampaign = {
  id: string;
  title: string;
  type: "种草" | "探店" | "晒单";
  owner: string;
  status: "进行中" | "待启动" | "待复盘";
  dueAt: string;
};

export type ProductResource = {
  id: string;
  name: string;
  sku: string;
  category: string;
  highlight: string;
  channels: string[];
  status: "上架" | "调优中" | "下线准备";
  assetsLinked: number;
  updatedAt: string;
};

export type ProductBundle = {
  id: string;
  title: string;
  purpose: string;
  owner: string;
  items: number;
  lastUsedAt: string;
};

export type AssetLifecycle = {
  id: string;
  title: string;
  owner: string;
  stage: "待质检" | "执行中" | "已归档";
  channel: string;
  nextAction: string;
  status: "正常" | "异常";
};

export type OperationsCalendarEvent = {
  id: string;
  time: string;
  title: string;
  channel: string;
  type: "发布" | "投放" | "达人" | "资产" | "商品";
  owner: string;
  status?: "已确认" | "待定" | "风险";
};

export type OperationsCalendarDay = {
  date: string;
  label: string;
  focus: string;
  events: OperationsCalendarEvent[];
};

export type OperationalHighlight = {
  id: string;
  title: string;
  description: string;
  tag: string;
  source: "publishing" | "asset" | "product" | "workflow";
  actionText: string;
  actionLink: string;
};

export type InsightMetric = {
  id: string;
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down";
};

export type InsightReport = {
  id: string;
  title: string;
  createdAt: string;
  summary: string;
  owner: string;
};

export type WorkflowTask = {
  id: string;
  title: string;
  type: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "planned" | "executing" | "handover" | "completed";
  aiOwner: string;
  humanOwner?: string;
  dueAt: string;
  executionId?: string;
  timeline: Array<{ label: string; at: string }>;
};

export type WorkflowColumn = {
  id: string;
  title: string;
  description: string;
  tasks: WorkflowTask[];
};

export type CampaignParticipant = {
  id: string;
  name: string;
  type: "ai" | "human";
  role: string;
  load: number;
  progress: number;
};

export type CampaignTaskSegment = {
  id: string;
  title: string;
  ownerType: "ai" | "human" | "joint";
  ownerName: string;
  status: "not-started" | "in-progress" | "handover" | "done";
  dueAt: string;
  handoffTo?: string;
};

export type CampaignWorkstream = {
  id: string;
  label: string;
  focus: string;
  aiLead: string;
  humanLead: string;
  progress: number;
  tasks: CampaignTaskSegment[];
};

export type CampaignPhase = {
  id: string;
  title: string;
  objective: string;
  timeframe: string;
  progress: number;
  participants: CampaignParticipant[];
  workstreams: CampaignWorkstream[];
};

export type CampaignPlan = {
  id: string;
  name: string;
  owner: string;
  status: "in-progress" | "planning" | "completed";
  timeframe: string;
  focus: string;
  metrics: Array<{ label: string; value: string; trend?: number }>;
  tags: string[];
  ascii?: string;
  phases: CampaignPhase[];
};

export type PersonalTask = {
  id: string;
  title: string;
  category: string;
  dueAt: string;
  priority: "low" | "medium" | "high" | "critical";
  progress: number;
  status: "pending" | "active" | "review" | "done";
  aiPartner?: string;
  nextStep: string;
  alerts?: string[];
  executionId?: string;
};

export type PersonalLane = {
  id: string;
  title: string;
  caption: string;
  tasks: PersonalTask[];
};

export type PersonalBoard = {
  owner: string;
  role: string;
  aiPartner: string;
  focus: Array<{ id: string; label: string; value: string; trend: number }>;
  urgent: PersonalTask[];
  lanes: PersonalLane[];
};

export type JourneyStage = {
  id: string;
  stage: string;
  intent: string;
  aiTool: string;
  humanAction: string;
  deliverable: string;
  entryPoint: string;
  next: string;
  executionId?: string;
};

export type ExecutionFlowStep = {
  id: string;
  title: string;
  owner: "ai" | "human" | "joint";
  description: string;
  output?: string;
  duration: string;
};

export type ExecutionFlow = {
  id: string;
  title: string;
  stage: string;
  aiAgent: string;
  summary: string;
  entryPath: string;
  prerequisites: string[];
  streamSegments: string[];
  steps: ExecutionFlowStep[];
  metrics: Array<{ label: string; value: string; caption?: string }>;
};

export type CampaignCreationStage = {
  id: string;
  title: string;
  owner: "human" | "ai" | "joint";
  status: "completed" | "current" | "upcoming";
  description: string;
  duration: string;
  aiActions?: string[];
  humanActions?: string[];
  checkpoints?: Array<{
    id: string;
    label: string;
    status: "ready" | "in-progress" | "pending";
  }>;
  cta?: {
    label: string;
    href: string;
    description?: string;
  };
};

export type CampaignCreationMoment = {
  id: string;
  stageId: string;
  timestamp: string;
  sender: "human" | "ai";
  speaker: string;
  role: string;
  action: string;
  content: string;
};

export type CampaignCreationOutput = {
  id: string;
  title: string;
  description: string;
  owner: "ai" | "human" | "joint";
  status: "ready" | "in-progress" | "queued";
  readyAt: string;
  highlights: string[];
  confidence: number;
  cta?: {
    label: string;
    href: string;
  };
};
