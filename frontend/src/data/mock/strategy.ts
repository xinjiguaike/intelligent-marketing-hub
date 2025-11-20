import { PromptRecord, StrategyNode } from "@/types";

export type StrategyKpi = {
  id: string;
  label: string;
  value: string;
  delta: number;
  caption: string;
};

export const strategyKpis: StrategyKpi[] = [
  {
    id: "active-plans",
    label: "活跃策划",
    value: "6",
    delta: 0.12,
    caption: "较上周 +12%",
  },
  {
    id: "pending-brief",
    label: "待审批 Brief",
    value: "2",
    delta: -0.33,
    caption: "审批平均用时 4.5h",
  },
  {
    id: "ai-completion",
    label: "AI 输出完成率",
    value: "87%",
    delta: 0.07,
    caption: "AI 生成 34 份策略片段",
  },
  {
    id: "collab-score",
    label: "协同评分",
    value: "4.7/5",
    delta: 0.03,
    caption: "近 7 日评审均分",
  },
];

export const strategyKnowledgeTree: StrategyNode = {
  id: "root",
  title: "新品营销策略总纲",
  description: "围绕新品上市构建的全渠道整合营销策略。",
  children: [
    {
      id: "goal",
      title: "业务目标",
      description: "提升新品发布首月销量与内容声量",
      tags: ["GMV ↑35%", "社媒声量 ↑50%"],
    },
    {
      id: "insight",
      title: "市场洞察",
      children: [
        {
          id: "persona",
          title: "核心人群画像",
          description: "科技潮流爱好者，关注品牌科技感与生活场景结合。",
          tags: ["25-35 岁", "一线城市", "购机频率 18 个月"],
        },
        {
          id: "trend",
          title: "内容趋势",
          description: "沉浸式体验视频成为主流，AI 生成视觉提升效率。",
          tags: ["沉浸体验", "AI 共创"],
        },
      ],
    },
    {
      id: "strategy",
      title: "策略方向",
      children: [
        {
          id: "social",
          title: "社交矩阵打造",
          description: "微博 + 小红书 + 视频号联动，打造 #未来随行# 话题热度。",
        },
        {
          id: "kol",
          title: "达人协同战役",
          description: "邀请科技测评达人与生活方式 KOC 共同讲述产品优势。",
        },
        {
          id: "live",
          title: "直播场景预热",
          description: "以“沉浸体验官”剧情化直播，加强产品体验感。",
        },
      ],
    },
    {
      id: "timeline",
      title: "执行节奏",
      children: [
        {
          id: "phase1",
          title: "预热期（T-14~T-7）",
          tags: ["故事预告片", "达人种草"],
        },
        {
          id: "phase2",
          title: "发布期（T-7~T）",
          tags: ["发布会直播", "站内广告上新"],
        },
        {
          id: "phase3",
          title: "爆发期（T~T+7）",
          tags: ["媒体二次传播", "限时福利"],
        },
      ],
    },
  ],
};

export const strategyRecentActivity = [
  {
    id: "activity-001",
    campaignId: "nova-air-x",
    campaignName: "未来随行新品发布",
    stage: "Joint Calibration",
    summary: "AI 补充了 18 条内容素材提案，待人工确认 CTA 与线下快闪联动。",
    aiHighlights: ["AI 输出节奏图谱", "素材创意完成度 82%", "4 个待确认节点"],
    owner: "策划 · 米拉",
    updatedAt: "2024-07-12T11:45:00+08:00",
    nextAction: "完善 CTA 并锁定线下资源",
    link: "/strategy/new?resume=nova-air-x",
  },
  {
    id: "activity-002",
    campaignId: "summer-sale",
    campaignName: "夏日焕新季",
    stage: "Execution Handoff",
    summary: "Workflow 已同步 12 个跨团队任务，审批节点仍有 2 个待确认。",
    aiHighlights: ["AI 建议补充会员运营触点", "直播脚本通过率 92%"],
    owner: "运营 · 赵敏",
    updatedAt: "2024-07-11T19:20:00+08:00",
    nextAction: "跟进审批节点并确认物料需求",
    link: "/strategy/new?resume=summer-sale",
  },
  {
    id: "activity-003",
    campaignId: "brand-anniversary",
    campaignName: "品牌周年感谢季",
    stage: "AI Digest",
    summary: "AI 完成洞察摘要与战役假设草稿，等待人工补充预算限制。",
    aiHighlights: ["生成 3 份受众细分", "发现 2 个风险提醒"],
    owner: "品牌 · 李然",
    updatedAt: "2024-07-10T15:30:00+08:00",
    nextAction: "填写预算上限并审核风险项",
    link: "/strategy/new?resume=brand-anniversary",
  },
];

export const strategyBriefSummary = {
  campaignName: "未来随行新品发布",
  timeframe: "2024.08 - 2024.09",
  owner: "品牌经理 · 李然",
  budget: "350 万",
  goals: ["GMV 提升 35%", "声量提升 50%", "线下预约 8000+"],
  primaryChannels: ["天猫旗舰店", "抖音直播", "私域社群"],
  constraints: ["禁止夸大医疗/安全功效", "沿用品牌口号“未来随行”", "素材需符合科幻潮流调性"],
  attachments: [
    { id: "attach-001", name: "去年双 11 复盘.pdf", size: "4.2 MB" },
    { id: "attach-002", name: "竞品调研与达人名单.xlsx", size: "1.8 MB" },
  ],
};

export const strategyBriefChecklist = [
  {
    id: "check-goal",
    label: "核心业务指标已填写",
    status: "done",
    note: "GMV / 声量目标已确认",
  },
  {
    id: "check-channel",
    label: "重点渠道明确",
    status: "done",
    note: "天猫 / 抖音 / 私域",
  },
  {
    id: "check-constraint",
    label: "品牌限制项完整",
    status: "pending",
    note: "需补充线下活动安全规范",
  },
  {
    id: "check-attachment",
    label: "历史数据附件完整",
    status: "pending",
    note: "上传线下场地平面图",
  },
] as const;

export const strategyBriefGuardrails = [
  "遵循《未来随行语调手册》：科技感 + 生活化",
  "公开渠道内容需通过法务审批，提前 48h 提交",
  "所有达人合作必须注明“品牌合作”标签",
];

export const strategyPromptHistory: PromptRecord[] = [
  {
    id: "prompt-001",
    role: "human",
    content: "请结合目标人群，输出新品发布整合营销策略骨架。",
    createdAt: "2024-07-11T10:22:00+08:00",
  },
  {
    id: "prompt-002",
    role: "ai",
    content:
      "已生成策略骨架草稿，建议强化直播沉浸体验，并补充线下快闪节点。",
    createdAt: "2024-07-11T10:23:30+08:00",
    score: 4.7,
  },
  {
    id: "prompt-003",
    role: "human",
    content: "请细化达人协同行动计划，说明达人类型与内容示例。",
    createdAt: "2024-07-11T10:24:10+08:00",
  },
  {
    id: "prompt-004",
    role: "ai",
    content:
      "达人行动计划已补充：科技达人拆解功能、生活方式 KOC 场景呈现、直播体验官剧情互动。",
    createdAt: "2024-07-11T10:24:50+08:00",
    score: 4.9,
  },
  {
    id: "prompt-005",
    role: "human",
    content: "输出三条结尾 CTA 备选，并标记推荐组合。",
    createdAt: "2024-07-11T10:25:30+08:00",
  },
];

export const strategyAiDigest = {
  segments: [
    "【概况】新品定位“未来随行”，主张以全息交互打造全天候陪伴体验，结合线下快闪强化沉浸式触点。",
    "【目标人群】科技潮流青年（25-35 岁）与家庭升级人群（30-40 岁），关注效率与沉浸体验，偏好真实场景演示。",
    "【战役假设】以“沉浸+效率”双线叙事构建营销矩阵：线上剧情短片 + 线下快闪体验 + 会员深度互动。",
    "【渠道策略】天猫旗舰与抖音直播承载销售，微博/小红书提升声量，私域社群转化预约；线下快闪作为舆论发酵节点。",
  ],
  confirmations: [
    { id: "confirm-sensitive", label: "敏感词与合规风险清单", status: "pending" },
    { id: "confirm-budget", label: "预算分配与 ROI 预估", status: "pending" },
    { id: "confirm-offline", label: "线下快闪场地与审批流程", status: "todo" },
  ],
};

export const strategyCollaborationTimeline = [
  {
    id: "moment-brief-submit",
    timestamp: "09:30",
    stage: "Brief Intake",
    sender: "human",
    speaker: "品牌经理 · 李然",
    action: "提交 Brief",
    content:
      "目标：GMV +35%，声量 +50%，重点渠道天猫/抖音/私域，预算 350 万。",
  },
  {
    id: "moment-ai-ack",
    timestamp: "09:31",
    stage: "AI Digest",
    sender: "ai",
    speaker: "AI 策划官 NOVA",
    action: "解析 Brief",
    content: "完成指标解析，关联 8 个历史战役，准备输出策划假设。",
  },
  {
    id: "moment-human-adjust",
    timestamp: "09:33",
    stage: "Joint Calibration",
    sender: "human",
    speaker: "品牌经理 · 李然",
    action: "补充指令",
    content: "请强化线下快闪引流，并说明达人内容分工及 KPI。",
  },
  {
    id: "moment-ai-update",
    timestamp: "09:34",
    stage: "Joint Calibration",
    sender: "ai",
    speaker: "AI 策划官 NOVA",
    action: "生成调整版",
    content:
      "已更新策略骨架，新增线下引流动线与达人 KPI。准备拆解任务包。",
  },
] as const;

export const strategyAiSuggestions = [
  {
    id: "suggest-digital-twin",
    title: "在直播中引入“数字分身剧本”",
    detail: "使用沉浸式剧情引导产品试戴，增强科技感体验。",
    impact: "提高直播间停留与互动率",
    status: "pending",
    owner: "AI 提议",
  },
  {
    id: "suggest-community",
    title: "新增会员社群分层福利",
    detail: "对高价值用户推送线下快闪优先体验与专属礼包。",
    impact: "提升私域转化率",
    status: "accepted",
    owner: "策划 · 米拉",
  },
  {
    id: "suggest-ar",
    title: "AR 试戴功能联合发布",
    detail: "在抖音与小红书同步上线 AR 试戴滤镜，强化产品记忆点。",
    impact: "提升用户参与度",
    status: "review",
    owner: "设计 · 韩宁",
  },
];

export const strategyVersionHistory = [
  {
    id: "version-001",
    label: "V1 · AI 初稿",
    timestamp: "2024-07-11T09:20:00+08:00",
    summary: "AI 输出策略骨架与渠道建议。",
  },
  {
    id: "version-002",
    label: "V2 · 人工校准",
    timestamp: "2024-07-11T10:05:00+08:00",
    summary: "补充预算约束与线下资源安排。",
  },
  {
    id: "version-003",
    label: "V3 · 人机联调",
    timestamp: "2024-07-11T11:18:00+08:00",
    summary: "完善达人协同计划与 CTA 组合。",
  },
] as const;

export const strategyJointStructure = [
  {
    id: "pillar-goal",
    title: "业务目标与受众",
    status: "aligned",
    owner: "策划 · 米拉",
    summary: "目标拆解完成，锁定双人群与核心 KPI。",
    items: [
      "GMV +35% / 声量 +50%",
      "科技潮流青年 & 家庭升级族",
      "关键触点：线上剧情 / 线下快闪 / 私域会员",
    ],
  },
  {
    id: "pillar-content",
    title: "内容与触点策略",
    status: "review",
    owner: "创意 · Alex",
    summary: "AI 提出 18 条素材创意，待确认 CTA 与口径。",
    items: [
      "剧情短片 + 真实体验 vlog",
      "线下快闪沉浸空间脚本",
      "会员社群分层福利策划",
    ],
  },
  {
    id: "pillar-execution",
    title: "执行节奏与资源",
    status: "pending",
    owner: "运营 · 赵敏",
    summary: "任务包草稿已生成，线下资源与审批仍待确认。",
    items: [
      "预热期：剧情化内容铺垫",
      "发布期：发布会直播 + KOL 联动",
      "爆发期：跨平台扩散与私域转化",
    ],
  },
] as const;

export const strategyHandoffSummary = {
  workflow: {
    totalTasks: 18,
    syncedTasks: 12,
    pendingTasks: 6,
    lastSyncAt: "2024-07-12T11:38:00+08:00",
  },
  deliverables: [
    {
      id: "deliverable-brief",
      label: "策划方案 v3",
      owner: "策划 · 米拉",
      status: "已确认",
    },
    {
      id: "deliverable-storyboard",
      label: "剧情短片脚本 · 版本 B",
      owner: "创意 · Alex",
      status: "待审批",
    },
    {
      id: "deliverable-playbook",
      label: "执行任务包（Workflow）",
      owner: "AI 策划官 NOVA",
      status: "同步中",
    },
  ],
  approvals: [
    {
      id: "approval-legal",
      label: "法务合规审核",
      owner: "法务 · 王珊",
      dueAt: "2024-07-13T18:00:00+08:00",
      status: "pending",
    },
    {
      id: "approval-finance",
      label: "预算确认",
      owner: "财务 · 陈耀",
      dueAt: "2024-07-13T12:00:00+08:00",
      status: "in-progress",
    },
  ],
  exports: [
    {
      id: "export-markdown",
      label: "导出 Markdown",
      format: "md",
    },
    {
      id: "export-pdf",
      label: "导出 PDF",
      format: "pdf",
    },
    {
      id: "export-share",
      label: "生成分享链接",
      format: "url",
    },
  ],
  newTasks: [
    {
      id: "task-sync-001",
      title: "站内发布会直播脚本审校",
      column: "待人工确认",
      aiOwner: "策划 AI",
      humanOwner: "直播负责人 · 许岚",
      dueAt: "2024-07-13T10:00:00+08:00",
    },
    {
      id: "task-sync-002",
      title: "线下快闪场地物料清单确认",
      column: "待规划",
      aiOwner: "运营 AI",
      humanOwner: "品牌经理 · 李然",
      dueAt: "2024-07-13T18:00:00+08:00",
    },
    {
      id: "task-sync-003",
      title: "达人内容脚本同步至创意工作室",
      column: "AI 执行中",
      aiOwner: "创意 AI",
      humanOwner: "创意 · Alex",
      dueAt: "2024-07-12T23:00:00+08:00",
    },
  ],
};

export type StrategyBriefChecklistItem = (typeof strategyBriefChecklist)[number];

// Backward compatibility alias if legacy imports remain.
export const strategyTree = strategyKnowledgeTree;

export const strategyKeyOutputs = [
  {
    id: "output-competition",
    title: "竞品分析报告",
    owner: "洞察 AI",
    status: "已生成",
    lastUpdated: "2024-07-11T22:10:00+08:00",
    summary:
      "横向对比 4 个主要竞品的卖点、渠道策略与达人组合，标记新品可差异化切入的“沉浸体验”诉求。",
    highlights: ["差异化主张 · 沉浸体验", "渠道空档 · 抖音剧情直播", "高潜达人池 · 科技体验官"],
  },
  {
    id: "output-content",
    title: "内容触点策略版块",
    owner: "创意 AI",
    status: "人机共创中",
    lastUpdated: "2024-07-12T09:15:00+08:00",
    summary:
      "围绕“沉浸 + 效率”双线叙事，拆解剧情短片、线下快闪与会员社群的内容主题、节奏与 KPI。",
    highlights: ["剧情短片 · 3 支脚本", "线下快闪 · 5 个互动点", "会员社群 · 分层触达"],
  },
  {
    id: "output-kol",
    title: "达人协同作战图",
    owner: "运营 AI",
    status: "待复核",
    lastUpdated: "2024-07-12T10:05:00+08:00",
    summary:
      "将科技测评达人、生活方式 KOC 与品牌主理人按阶段分组，明确内容形式、投放窗口与考核指标。",
    highlights: ["科技达人 · 功能拆解", "生活方式 KOC · 场景植入", "主理人 · 发布会直播"],
  },
] as const;
