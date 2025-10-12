import {
  CampaignCreationMoment,
  CampaignCreationOutput,
  CampaignCreationStage,
} from "@/types";

export const campaignCreationStages: CampaignCreationStage[] = [
  {
    id: "stage-brief",
    title: "品牌经理录入营销 Brief",
    owner: "human",
    status: "completed",
    description:
      "品牌经理提交活动目标、预算约束与重点渠道信息，触发 AI 数字员工启动策划流程。",
    duration: "约 5 分钟",
    humanActions: [
      "设定 GMV + 声量双目标，并明确预算与必投渠道",
      "上传上一季度活动数据与三条竞品参考案例",
    ],
    checkpoints: [
      { id: "brief-goal", label: "目标指标核对", status: "ready" },
      { id: "brief-constraint", label: "预算与约束确认", status: "ready" },
      { id: "brief-context", label: "历史数据导入", status: "ready" },
    ],
  },
  {
    id: "stage-ai-digest",
    title: "AI 数字员工 NOVA 解析 Brief",
    owner: "ai",
    status: "current",
    description:
      "AI 策划官 NOVA 自动读取 Brief，调取过往相似活动策略，梳理机会点并生成战役假设。",
    duration: "约 90 秒",
    aiActions: [
      "检索 8 个相似战役，提炼成功因子与风险提示",
      "结合目标人群画像与渠道数据生成增长假设",
      "给出初版战役节奏建议并标注需要人工确认的节点",
    ],
    humanActions: ["确认敏感词与品牌调性限制，防止策略偏离品牌规范"],
    checkpoints: [
      { id: "ai-ingest", label: "Brief 解析完成度 100%", status: "in-progress" },
      { id: "ai-hypothesis", label: "策略假设生成", status: "in-progress" },
      { id: "ai-review-list", label: "待人工校准项", status: "pending" },
    ],
  },
  {
    id: "stage-collab",
    title: "人机协同校准策略骨架",
    owner: "joint",
    status: "upcoming",
    description:
      "AI 提交策略骨架，由策划专家快速审阅关键假设，补充线下资源与渠道配比，形成 1.0 版战役方案。",
    duration: "约 15 分钟",
    aiActions: [
      "自动生成策略骨架（目标、洞察、传播框架、节奏）",
      "标记关键风险与需人工补充的线下资源",
    ],
    humanActions: [
      "根据实际资源池微调渠道权重与预算区间",
      "确认需人工审批的合规节点并分配负责人",
    ],
    checkpoints: [
      { id: "joint-outline", label: "策略骨架确认", status: "pending" },
      { id: "joint-budget", label: "预算分配校对", status: "pending" },
      { id: "joint-approval", label: "合规审核节点锁定", status: "pending" },
    ],
  },
  {
    id: "stage-handover",
    title: "AI 数字员工推送执行任务包",
    owner: "ai",
    status: "upcoming",
    description:
      "NOVA 根据确认版策略，拆解执行任务并推送至创意、运营、洞察团队的工作台，同时附上协同指引。",
    duration: "约 3 分钟",
    aiActions: [
      "生成跨角色任务包，自动匹配负责人与截止时间",
      "同步至 Workflow 看板并通知相关数字员工与真人协作者",
    ],
    checkpoints: [
      { id: "handover-tasks", label: "任务包生成", status: "pending" },
      { id: "handover-sync", label: "跨角色同步", status: "pending" },
    ],
    cta: {
      label: "打开 Workflow 看板",
      href: "/workflow?from=strategy-new",
      description: "查看任务包分发情况并继续推进执行",
    },
  },
];

export const campaignCreationMoments: CampaignCreationMoment[] = [
  {
    id: "moment-brief-submit",
    stageId: "stage-brief",
    timestamp: "09:30",
    sender: "human",
    speaker: "品牌经理 · 李然",
    role: "人类",
    action: "提交活动 Brief",
    content:
      "目标：双十一新品 GMV 提升 35%，品牌声量提升 50%。渠道侧重天猫、抖音与私域社群，预算 350 万。",
  },
  {
    id: "moment-brief-context",
    stageId: "stage-brief",
    timestamp: "09:31",
    sender: "human",
    speaker: "品牌经理 · 李然",
    role: "人类",
    action: "补充背景",
    content: "上传去年双十一活动数据与竞品战役拆解，标记沿用的达人名单与合作限制。",
  },
  {
    id: "moment-ai-ack",
    stageId: "stage-ai-digest",
    timestamp: "09:31",
    sender: "ai",
    speaker: "AI 策划官 NOVA",
    role: "AI 数字员工",
    action: "确认 Brief 已接收",
    content: "已解析 12 个业务指标与 8 条竞品案例，锁定目标人群：科技潮流青年 + 家庭升级族。",
  },
  {
    id: "moment-ai-hypothesis",
    stageId: "stage-ai-digest",
    timestamp: "09:32",
    sender: "ai",
    speaker: "AI 策划官 NOVA",
    role: "AI 数字员工",
    action: "生成战役假设",
    content:
      "建议采用“沉浸式体验 + 智能生活”双线叙事，预估可带动站外曝光 +42%。已同步需要人工确认的品牌敏感词清单。",
  },
  {
    id: "moment-human-adjust",
    stageId: "stage-ai-digest",
    timestamp: "09:33",
    sender: "human",
    speaker: "品牌经理 · 李然",
    role: "人类",
    action: "即时校准",
    content: "请在达人建议里加入品牌老友记 IP，并强调旗舰店线下快闪活动的联动。",
  },
  {
    id: "moment-ai-response",
    stageId: "stage-ai-digest",
    timestamp: "09:33",
    sender: "ai",
    speaker: "AI 策划官 NOVA",
    role: "AI 数字员工",
    action: "采纳指令",
    content: "已加入品牌老友记 IP，并为线下快闪生成导流节点。预计 60 秒内输出策略骨架草稿。",
  },
];

export const campaignCreationOutputs: CampaignCreationOutput[] = [
  {
    id: "output-outline",
    title: "营销策略骨架 0.9 版",
    description:
      "包含活动目标、核心洞察、三阶段节奏与主打渠道建议，自动标注需要人工二审的敏感节点。",
    owner: "ai",
    status: "ready",
    readyAt: "09:34",
    highlights: ["策略完整度 92%", "引用 8 个历史战役数据", "生成 4 个渠道 KPI 预测"],
    confidence: 0.93,
  },
  {
    id: "output-persona",
    title: "目标人群洞察快照",
    description:
      "聚合站内外行为数据，输出主力人群画像与内容偏好，附带高潜关键词清单。",
    owner: "ai",
    status: "in-progress",
    readyAt: "预计 09:35",
    highlights: ["匹配 3 个历史人群包", "拟合互动率预测"],
    confidence: 0.87,
  },
  {
    id: "output-playbook",
    title: "执行任务包建议",
    description:
      "将策略拆解为跨角色任务，生成交付清单与协同提示，用于推送至 Workflow 模块。",
    owner: "ai",
    status: "queued",
    readyAt: "待策略骨架确认",
    highlights: ["包含 18 个任务节点", "标记 5 个真人协作点"],
    confidence: 0.9,
    cta: {
      label: "跳转至 Workflow 接口",
      href: "/workflow?from=strategy-new",
    },
  },
];
