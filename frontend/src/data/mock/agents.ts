export type DigitalEmployee = {
  id: string;
  name: string;
  role: string;
  focus: string;
  online: boolean;
  workloads: Array<{
    id: string;
    title: string;
    status: "执行中" | "待接管" | "已完成";
    updatedAt: string;
  }>;
  skills: string[];
  owner: string;
};

export type SkillGap = {
  id: string;
  topic: string;
  description: string;
  recommendedAction: string;
  impact: "高" | "中" | "低";
};

export type AgentTeam = {
  id: string;
  name: string;
  lead: string;
  members: string[];
  activeAgents: string[];
  focus: string;
  contactChannel: string;
};

export const digitalEmployees: DigitalEmployee[] = [
  {
    id: "agent-nova",
    name: "策划 AI · NOVA",
    role: "策略规划",
    focus: "活动拆解、目标树构建",
    online: true,
    owner: "策略团队",
    skills: ["战役拆解", "受众洞察", "流程编排"],
    workloads: [
      {
        id: "workload-001",
        title: "新品上市第二阶段策略",
        status: "执行中",
        updatedAt: "2024-07-18T09:00:00+08:00",
      },
      {
        id: "workload-002",
        title: "618 复盘洞察总结",
        status: "已完成",
        updatedAt: "2024-07-16T18:20:00+08:00",
      },
    ],
  },
  {
    id: "agent-studio",
    name: "创意 AI · STUDIO",
    role: "内容创作",
    focus: "短视频脚本、视觉延展",
    online: true,
    owner: "创意团队",
    skills: ["脚本撰写", "视觉风格建议", "素材整理"],
    workloads: [
      {
        id: "workload-003",
        title: "直播暖场短视频脚本",
        status: "待接管",
        updatedAt: "2024-07-18T08:45:00+08:00",
      },
      {
        id: "workload-004",
        title: "达人合作视觉物料套版",
        status: "执行中",
        updatedAt: "2024-07-17T20:10:00+08:00",
      },
    ],
  },
  {
    id: "agent-atlas",
    name: "运营 AI · ATLAS",
    role: "投放运营",
    focus: "排期调度、KOC 协同",
    online: false,
    owner: "运营团队",
    skills: ["排期优化", "达人匹配", "排班提醒"],
    workloads: [
      {
        id: "workload-005",
        title: "KOC 扩列名单清洗",
        status: "执行中",
        updatedAt: "2024-07-18T07:50:00+08:00",
      },
      {
        id: "workload-006",
        title: "京东超品日投放策略",
        status: "已完成",
        updatedAt: "2024-07-17T19:40:00+08:00",
      },
    ],
  },
  {
    id: "agent-spark",
    name: "洞察 AI · SPARK",
    role: "数据洞察",
    focus: "异常预警、复盘建议",
    online: true,
    owner: "洞察团队",
    skills: ["数据监测", "异常检测", "报告撰写"],
    workloads: [
      {
        id: "workload-007",
        title: "直播预约率异常预警",
        status: "执行中",
        updatedAt: "2024-07-18T09:10:00+08:00",
      },
      {
        id: "workload-008",
        title: "短视频 ROI 监控",
        status: "已完成",
        updatedAt: "2024-07-17T12:00:00+08:00",
      },
    ],
  },
];

export const skillGaps: SkillGap[] = [
  {
    id: "gap-001",
    topic: "直播间互动脚本",
    description: "需要更具人情味的即兴话术，建议补充场景素材训练集。",
    recommendedAction: "从品牌资源中心调取历史直播高光片段进行增训。",
    impact: "高",
  },
  {
    id: "gap-002",
    topic: "线下快闪场景建议",
    description: "运营 AI 对线下场景识别不足，无法给出完整物料清单。",
    recommendedAction: "同步线下执行手册到知识库，供 AI 学习引用。",
    impact: "中",
  },
  {
    id: "gap-003",
    topic: "用户评论语气判别",
    description: "洞察 AI 对新兴流行语识别偏低，可能导致情绪判断误差。",
    recommendedAction: "接入社交语料实时更新模型词典。",
    impact: "中",
  },
];

export const agentTeams: AgentTeam[] = [
  {
    id: "team-strategy",
    name: "策略指挥中心",
    lead: "苏醒",
    members: ["苏醒", "周岚", "策划 AI · NOVA"],
    activeAgents: ["策划 AI · NOVA"],
    focus: "战役拆解、跨团队目标对齐",
    contactChannel: "#strategy-sync",
  },
  {
    id: "team-creative",
    name: "创意共创小组",
    lead: "林墨",
    members: ["林墨", "创意 AI · STUDIO", "视觉设计", "脚本编辑"],
    activeAgents: ["创意 AI · STUDIO"],
    focus: "内容创意、视觉延展与素材质检",
    contactChannel: "#creative-lab",
  },
  {
    id: "team-operations",
    name: "运营排程组",
    lead: "王月",
    members: ["王月", "运营 AI · ATLAS", "达人运营", "私域运营"],
    activeAgents: ["运营 AI · ATLAS"],
    focus: "达人协同、投放排期与私域福利",
    contactChannel: "#operations-hub",
  },
  {
    id: "team-insight",
    name: "洞察分析室",
    lead: "赵宁",
    members: ["赵宁", "洞察 AI · SPARK", "数据分析师"],
    activeAgents: ["洞察 AI · SPARK"],
    focus: "数据预警、复盘总结与指标可视化",
    contactChannel: "#insight-watch",
  },
];
