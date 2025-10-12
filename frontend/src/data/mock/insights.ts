import {
  AudienceSignal,
  ChannelInsight,
  CollaborationActivity,
  CollaborationMessage,
  CollaborationThread,
  Insight,
  InsightAction,
  InsightHighlight,
  InsightMetric,
  InsightReport,
} from "@/types";

export const realtimeMetrics: InsightMetric[] = [
  { id: "metric-views", label: "实时播放量", value: "1.24M", delta: 0.28, trend: "up" },
  {
    id: "metric-engagement",
    label: "互动率",
    value: "8.6%",
    delta: -0.04,
    trend: "down",
  },
  { id: "metric-conversion", label: "转化率", value: "3.1%", delta: 0.12, trend: "up" },
];

export const aiReasoning: Insight[] = [
  {
    id: "ai-node-001",
    title: "直播预约异常波动",
    summary: "预约量在 21:00 出现峰值，核心来源于私域社群的集中推送。",
    impact: "positive",
    chainOfThought: [
      "对比历史 7 日预约曲线，发现波动出现在固定时间段。",
      "排查渠道来源，确定企业微信社群贡献 65%。",
      "建议：增加直播暖场内容，维持社群活跃。",
    ],
    time: "2024-07-12T21:10:00+08:00",
  },
  {
    id: "ai-node-002",
    title: "达人内容投放效率",
    summary: "视频号达人内容点击率高于抖音 18%，但转化率低 9%。",
    impact: "neutral",
    chainOfThought: [
      "分析两渠道点击与转化漏斗，视频号在支付环节转化不足。",
      "建议：在视频号增加私域群引导，提高二次触达。",
    ],
    time: "2024-07-12T20:50:00+08:00",
  },
];

export const insightReports: InsightReport[] = [
  {
    id: "report-001",
    title: "新品发布周复盘报告",
    createdAt: "2024-07-08T18:00:00+08:00",
    summary: "聚焦首周 GMV、渠道曝光与 AI 自动化效率分析。",
    owner: "洞察 AI",
  },
  {
    id: "report-002",
    title: "达人投放阶段表现分析",
    createdAt: "2024-07-10T17:30:00+08:00",
    summary: "汇总达人内容表现，评估 ROI 与后续优化建议。",
    owner: "洞察团队",
  },
];

export const insightHighlights: InsightHighlight[] = [
  {
    id: "highlight-velocity",
    title: "直播转化提速",
    metric: "42.6%",
    change: 0.18,
    trend: "up",
    description: "高意向人群转化率环比提升，直播间私信驱动下单占比 36%。",
    owner: "运营 · 林舟",
    impact: "positive",
  },
  {
    id: "highlight-retention",
    title: "体验官复购回流",
    metric: "27%",
    change: 0.09,
    trend: "up",
    description: "体验官复购带来的 GMV 占比拉升至 27%，AI 召回脚本贡献 60%。",
    owner: "增长 · Aiden",
    impact: "positive",
  },
  {
    id: "highlight-alert",
    title: "达人口碑波动",
    metric: "口碑得分 7.2",
    change: -0.12,
    trend: "down",
    description: "重点达人在穿戴舒适度评价上出现负向评论，需及时跟进素材澄清。",
    owner: "品牌 · Echo",
    impact: "negative",
  },
  {
    id: "highlight-ai",
    title: "AI 智能总结",
    metric: "83 匹配度",
    change: 0.05,
    trend: "stable",
    description: "AI 对策略目标的匹配度稳定在 83%，建议补充线下活动数据。",
    owner: "洞察 AI",
    impact: "neutral",
  },
];

export const channelInsights: ChannelInsight[] = [
  {
    id: "channel-douyin",
    channel: "抖音直播",
    reach: "340K",
    engagement: "6.4%",
    conversion: "3.7%",
    trend: "up",
    narrative: "AI 推荐话术让停留时长提升 12%，建议保持互动节奏。",
  },
  {
    id: "channel-video",
    channel: "视频号",
    reach: "210K",
    engagement: "5.1%",
    conversion: "2.8%",
    trend: "stable",
    narrative: "需要强化支付引导页面的承接，考虑追加社群福利联动。",
  },
  {
    id: "channel-xhs",
    channel: "小红书",
    reach: "125K",
    engagement: "8.9%",
    conversion: "2.1%",
    trend: "up",
    narrative: "达人测评内容曝光破 10 万，图文笔记收藏率显著提高。",
  },
  {
    id: "channel-taobao",
    channel: "淘宝逛逛",
    reach: "96K",
    engagement: "3.5%",
    conversion: "1.6%",
    trend: "down",
    narrative: "流量入口权重下降，可尝试补充导购场景与直播联动位。",
  },
];

export const audienceSignals: AudienceSignal[] = [
  {
    id: "audience-young",
    segment: "24-30 岁 · 一线职场",
    lift: 0.24,
    timeWindow: "近 7 日",
    signal: "关注轻量化与隐私防护功能，偏好商业场景案例。",
    confidence: 0.92,
  },
  {
    id: "audience-tech",
    segment: "泛科技爱好者",
    lift: 0.18,
    timeWindow: "近 14 日",
    signal: "对全息协作功能保持高点击，期待更多应用演示。",
    confidence: 0.88,
  },
  {
    id: "audience-sport",
    segment: "户外运动用户",
    lift: -0.07,
    timeWindow: "近 7 日",
    signal: "户外防眩光体验反馈下降，建议补充骑行场景拍摄。",
    confidence: 0.74,
  },
];

export const insightActions: InsightAction[] = [
  {
    id: "action-briefing",
    title: "更新达人简报包并同步评价反馈",
    owner: "品牌 · Echo",
    dueAt: "2024-07-13T12:00:00+08:00",
    status: "pending",
    aiSupport: "提供评论语料摘要与澄清建议",
    impact: "high",
  },
  {
    id: "action-live",
    title: "直播间追加预约 CTA 与社群福利码",
    owner: "运营 · 林舟",
    dueAt: "2024-07-13T18:00:00+08:00",
    status: "in-progress",
    aiSupport: "生成 3 套 CTA 话术与弹幕脚本",
    impact: "medium",
  },
  {
    id: "action-offline",
    title: "整合线下快闪活动数据至洞察看板",
    owner: "洞察 AI",
    dueAt: "2024-07-14T10:00:00+08:00",
    status: "pending",
    aiSupport: "自动清洗 Excel 表格并匹配指标字段",
    impact: "medium",
  },
  {
    id: "action-ugc",
    title: "策划体验官挑战赛，激活 UGC 内容",
    owner: "增长 · Aiden",
    dueAt: "2024-07-15T09:30:00+08:00",
    status: "done",
    aiSupport: "给出挑战任务结构与激励建议",
    impact: "low",
  },
];

export const collaborationThreads: CollaborationThread[] = [
  {
    id: "thread-live",
    topic: "直播高峰动作回放",
    participants: ["林舟", "洞察 AI", "售后团队"],
    updatedAt: "2024-07-12T22:05:00+08:00",
    status: "同步中",
    summary: "确认高峰时段流量峰值与成交峰错位，需优化引导路径。",
    nextStep: "复盘后推送新的引导脚本并验证数据回落",
  },
  {
    id: "thread-ugc",
    topic: "体验官内容共创",
    participants: ["Aiden", "品牌顾问", "设计团队"],
    updatedAt: "2024-07-12T19:40:00+08:00",
    status: "待决策",
    summary: "已完成调研洞察，需要敲定主题标签与激励机制。",
    nextStep: "确认挑战赛奖励方案，安排首批达人上线时间",
  },
  {
    id: "thread-risk",
    topic: "达人口碑澄清方案",
    participants: ["Echo", "法务", "公关", "洞察 AI"],
    updatedAt: "2024-07-12T17:28:00+08:00",
    status: "同步中",
    summary: "口碑得分下滑集中于舒适度反馈，需准备官方回应。",
    nextStep: "收集真实用户体验证据，并发布澄清笔记",
  },
];

export const collaborationActivities: CollaborationActivity[] = [
  {
    id: "activity-001",
    type: "ai",
    title: "AI 推送高风险评论聚类",
    timestamp: "2024-07-12T16:05:00+08:00",
    detail: "重点关注舒适度与佩戴稳定性议题，建议 4 小时内响应。",
    owner: "洞察 AI",
  },
  {
    id: "activity-002",
    type: "team",
    title: "品牌团队提交澄清 Q&A 草案",
    timestamp: "2024-07-12T18:12:00+08:00",
    detail: "草案包含 8 个核心问题，将在直播前演练口径。",
    owner: "品牌 · Echo",
  },
  {
    id: "activity-003",
    type: "experiment",
    title: "社群福利码 A/B 测试启动",
    timestamp: "2024-07-12T20:35:00+08:00",
    detail: "版本 B 引导至用户故事墙，实时追踪预约转化差异。",
    owner: "增长 · Aiden",
  },
];

export const insightCollaborationMessages: CollaborationMessage[] = [
  {
    id: "insight-chat-001",
    sender: "ai",
    content: "我注意到口碑得分下滑主要集中在舒适度评价，需要快速给出澄清素材。",
    createdAt: "2024-07-12T16:08:00+08:00",
  },
  {
    id: "insight-chat-002",
    sender: "human",
    content: "已联系体验官补拍佩戴细节，我们补充一版“轻量佩戴”短视频。",
    createdAt: "2024-07-12T16:09:25+08:00",
  },
  {
    id: "insight-chat-003",
    sender: "ai",
    content: "建议同步收集线下体验反馈，我可以自动整理问卷数据。",
    createdAt: "2024-07-12T16:11:40+08:00",
  },
  {
    id: "insight-chat-004",
    sender: "human",
    content: "收到，线下团队今晚会导出数据，请提前预设清洗规则。",
    createdAt: "2024-07-12T16:13:05+08:00",
  },
  {
    id: "insight-chat-005",
    sender: "ai",
    content: "规则已配置，导入后 10 分钟内生成澄清要点和指标对齐建议。",
    createdAt: "2024-07-12T16:13:50+08:00",
  },
];
