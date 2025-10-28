export const navigation = [
  { label: "产品亮点", href: "#highlights" },
  { label: "能力矩阵", href: "#modules" },
  { label: "数字员工", href: "#agents" },
  { label: "行业方案", href: "#solutions" },
  { label: "成功案例", href: "#cases" },
  { label: "资源中心", href: "#resources" },
  { label: "联系顾问", href: "#contact" },
] as const;

export const heroContent = {
  eyebrow: "AI Native 内容营销操作系统",
  title: "IntelliM 数字员工驱动的全链路内容营销平台",
  description:
    "将营销策划、洞察分析、创意生产、渠道运营与复盘沉淀整合为一个连续的协同闭环。数字员工 24/7 巡航，真人团队专注决策与把关。",
  primaryCta: { label: "预约线下方案演示", href: "#contact" },
  secondaryCta: { label: "下载营销项目白皮书", href: "#resources" },
  metrics: [
    { label: "创意交付效率提升", value: "35%" },
    { label: "跨渠道投放 ROI提升", value: "28%" },
    { label: "协作沟通成本降低", value: "40%" },
  ],
};

export const coreValuePropositions = [
  {
    title: "策划 → 执行全链路协同",
    description:
      "一个驾驶舱串联洞察、协作与执行，让项目节奏与资源调度始终在线。",
    detail:
      "关键指标与风险即时提醒，管理层在同一界面完成节奏判断。",
  },
  {
    title: "多角色数字员工贴身协同",
    description:
      "策划、洞察、创意与运营 AI 分工明确，任务衔接围绕真人职责自然推进。",
    detail:
      "系统记录推理链与交接节点，真人只需聚焦关键审核。",
  },
  {
    title: "数据驱动的持续优化闭环",
    description:
      "洞察中心聚合渠道信号，自动产出行动草案并沉淀复盘资产。",
    detail:
      "实时监测到复盘归档一条链路，经验随时复用。",
  },
];

export const humanCollaborationHighlights = [
  {
    title: "数字员工角色清晰",
    description:
      "策略、洞察、创意与执行 AI 分工明确，自动衔接真人节点。",
    detail:
      "交接状态与责任人同屏可见，避免信息在多工具间流失。",
  },
  {
    title: "人机协作节奏轻盈",
    description:
      "AI 推行日程、提醒审核，真人聚焦关键判断与关系维护。",
    detail:
      "会议纪要、行动项与素材沉淀下来，形成可复用的协作节奏。",
  },
  {
    title: "权限与流程易定制",
    description:
      "支持按组织结构调整权限、视图与交付模板，贴合企业工作方式。",
    detail:
      "营销中台、品牌侧、代理商都可在同一体系内协作。",
  },
];

export const flowNarrative = [
  {
    title: "洞察脉冲点亮营销机会",
    summary:
      "洞察 AI 持续监测渠道波动，自动生成机会与风险提示。",
    reference: "洞察面板集中呈现数据与推演结论，方便迅速讨论。",
  },
  {
    title: "协作线程沉淀共识与行动",
    summary:
      "协作区承接洞察，线程内同步人机对话并自动生成任务草案。",
    reference: "议题推进、行动提醒与模板都聚合在同一流程。",
  },
  {
    title: "Workflow 看板调度人机执行",
    summary:
      "任务看板依据 AI 拆解与人工确认分配负责人与优先级。",
    reference: "执行脉搏、人机交接与提醒集中在一个看板。",
  },
  {
    title: "驾驶舱闭环复盘与知识沉淀",
    summary:
      "驾驶舱聚合 KPI、风险与进展，并自动回写至复盘档案。",
    reference: "结论一键沉淀为指南，下一次启动更轻松。",
  },
];

export const moduleShowcase = [
  {
    id: "overview",
    title: "智能营销驾驶舱",
    description:
      "一屏总览目标、洞察与节奏，AI 实时提醒行动与风险。",
    highlights: [
      "直观呈现项目起点与重点入口",
      "多角色协同状态与任务排队清晰可见",
      "进展指标与风险提示同屏展示",
    ],
  },
  {
    id: "insights",
    title: "洞察中心",
    description:
      "实时脉冲、人群雷达与渠道对比帮助迅速定位增长机会。",
    highlights: [
      "实时监测曝光、互动与转化波动",
      "多维人群与渠道视角支持快速判断",
      "AI 推理链路辅助解释与行动排序",
    ],
  },
  {
    id: "collaboration",
    title: "协作洞察工作区",
    description:
      "议题线程组织跨团队共创，AI 与真人在同一界面协同。",
    highlights: [
      "实时同步洞察与团队共识",
      "行动项自动流转并支持状态确认",
      "节奏提示保障会议与战情更新不断档",
    ],
  },
  {
    id: "workflow",
    title: "智能任务编排",
    description:
      "任务看板统筹执行，AI 拆解任务并协助分配与预警。",
    highlights: [
      "任务脉搏实时标注 AI 执行与人工接管情况",
      "自动记录人机交接与关键备注",
      "最新事件与风险提示滚动更新",
    ],
  },
  {
    id: "creative",
    title: "多模态创意工坊",
    description:
      "图文、海报、视频创意在同一空间生成并同步 Workflow。",
    highlights: [
      "多场景创意画布整合灵感、准则与 AI 建议",
      "交付摘要追踪不同物料进度",
      "一键推送创意任务并生成说明",
    ],
  },
  {
    id: "operations",
    title: "媒介运营枢纽",
    description:
      "跨平台账号健康、营销日历、内容排期与协作进度集中管理，AI 提前预警达人波动与排期冲突。",
    highlights: [
      "账号健康指数与增长趋势清晰可查",
      "营销日历聚合跨模块事件与负责人",
      "排期与执行洞察一站式完成",
    ],
  },
];

export const agentProfiles = [
  {
    name: "策略 AI 指挥官",
    description:
      "统筹营销项目目标、关键指标与节奏，协调洞察与执行资源，确保策略路径随业务目标实时调整。",
    deliverables: ["项目策划蓝图", "节奏里程碑", "资源调度建议"],
  },
  {
    name: "洞察 AI 分析师",
    description:
      "持续扫描渠道与人群数据，结合历史资产生成洞察报告、风险预警与行动草案。",
    deliverables: ["实时脉冲播报", "受众雷达解读", "行动建议草案"],
  },
  {
    name: "创意 AI 制作人",
    description:
      "负责图文、海报、短视频等多模态内容生成与迭代，保障创意资产快速成型并符合品牌语调。",
    deliverables: ["图文草稿与润色", "海报视觉概念", "视频分镜脚本"],
  },
  {
    name: "执行 AI 调度员",
    description:
      "在 Workflow 看板中拆解任务、推荐负责人与优先级，监控风险并向真人团队发出接管提醒。",
    deliverables: ["任务拆解与指派", "风险监控提示", "复盘指标同步"],
  },
];

export const solutionScenarios = [
  {
    title: "新品发布整合营销",
    outcomes: [
      "洞察 AI 识别核心受众与渠道组合，策略 AI 制定节奏计划",
      "创意 AI 在 48 小时内产出核心物料，真人团队快速审核上线",
      "执行 AI 辅助排期并提醒风险，保证媒体资源不冲突",
    ],
  },
  {
    title: "达人共创与直播运营",
    outcomes: [
      "KOL 健康指数监控达人口碑波动，实时触发协作线程",
      "AI 自动生成达人简报与直播话术，真人公关团队精准把关",
      "任务看板记录执行过程与复盘结论，沉淀为随取随用的行动手册",
    ],
  },
  {
    title: "品牌口碑与私域增长",
    outcomes: [
      "受众雷达实时监控舆情脉络，洞察 AI 推演风险场景",
      "协作工作区沉淀跨部门应对策略，执行 AI 追踪落地",
      "复盘档案回写关键指标，为下一次活动提供决策依据",
    ],
  },
];

export const caseStudies = [
  {
    brand: "饮料集团 A",
    result:
      "新品直播 30 天销售额同比提升 2.8 倍，创意交付周期缩短 37%。",
    insight:
      "洞察 → 协作 → Workflow 闭环把三周策划压缩到 6 天，复盘驱动快速迭代。"
  },
  {
    brand: "美妆品牌 B",
    result:
      "达人共创项目中，AI 辅助完成 180 篇图文与 60 条视频初稿，真人审核用时减 80%。",
    insight:
      "创意工坊与媒介枢纽协同，确保达人调度、素材生成与排期执行在一个视图内完成。"
  },
  {
    brand: "跨境电商 C",
    result:
      "多语言洞察与创意生成让 5 个站点转化率提升 24%，线索成本下降 18%。",
    insight:
      "洞察中心的 AI 推理链与任务编排联动，使本地化内容与投放策略灵活响应市场波动。"
  },
];

export const resourceCenter = [
  {
    title: "AI 驱动内容营销白皮书",
    description: "拆解人机协同的组织落地路径，辅以营销项目案例与指标体系。",
  },
  {
    title: "数字员工部署指南",
    description: "从角色定义、权限矩阵到培训计划，快速落地企业内数字员工体系。",
  },
  {
    title: "营销项目复盘模板套件",
    description: "统一复盘结构，涵盖洞察追踪、执行交付与投放成效记录。",
  },
];

export const faqs = [
  {
    question: "是否支持企业现有数据与工具集成？",
    answer:
      "支持。通过开放 API 与 Webhook，可与 CRM、广告平台、内容生产工具打通；可配置私有化数据适配层。",
  },
  {
    question: "数字员工的输出如何审核与追踪？",
    answer:
      "系统为每个任务记录 AI → 真人的交接节点与审核状态，所有内容均可追溯来源与版本，满足风控要求。",
  },
  {
    question: "如何保障数据安全与合规？",
    answer:
      "可选择私有化或混合云部署，敏感数据在企业环境处理；系统支持访问控制、操作审计与加密存储策略。",
  },
];

export const footerLinks = [
  {
    title: "了解 IntelliM",
    items: [
      { label: "产品亮点", href: "#highlights" },
      { label: "能力矩阵", href: "#modules" },
      { label: "行业方案", href: "#solutions" },
    ],
  },
  {
    title: "资源与支持",
    items: [
      { label: "资源中心", href: "#resources" },
      { label: "常见问题", href: "#faqs" },
      { label: "隐私政策", href: "#" },
    ],
  },
  {
    title: "联系我们",
    items: [
      { label: "contact@intellim.ai", href: "mailto:contact@intellim.ai" },
      { label: "+86 21-800-0000", href: "tel:+862180000000" },
      { label: "预约线下交流", href: "#contact" },
    ],
  },
];
