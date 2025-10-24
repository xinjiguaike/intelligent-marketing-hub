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

export const valuePropositions = [
  {
    title: "策划 → 执行全链路协同",
    description:
      "以智能营销驾驶舱为指挥桥，洞察、协作线程与任务编排模块实时联动，确保营销项目节奏和资源调度始终在线。",
    detail:
      "核心指标与风险脉冲实时推送，管理层可在同一界面完成状态跟踪与节奏决策。",
  },
  {
    title: "多角色数字员工贴身协同",
    description:
      "策划 AI、洞察 AI、创意 AI、运营 AI 与风控 AI 各司其职，围绕真人团队角色无缝流转任务与产出。",
    detail:
      "系统自动展示 AI 推理链与交接节点，真人团队聚焦关键审核与业务判断。",
  },
  {
    title: "数据驱动的持续优化闭环",
    description:
      "洞察中心实时汇聚渠道信号，自动形成行动草案；复盘档案与知识库沉淀最佳实践与行业资产。",
    detail:
      "从实时监测到复盘归档的指标链路完整呈现，保证经验沉淀与下一次迭代可复用。",
  },
];

export const flowNarrative = [
  {
    title: "洞察脉冲点亮营销机会",
    summary:
      "洞察 AI 对实时数据流进行监测，识别人群转化异常、达人合作风险等关键信号，自动生成行动建议与影响评估。",
    reference: "洞察面板聚合关键数据与推演结果，支持即时策略讨论。",
  },
  {
    title: "协作线程沉淀共识与行动",
    summary:
      "协作洞察工作区承接洞察，发起议题线程，记录 AI / 真人对话与节奏提示，自动生成可执行任务草案。",
    reference: "议题推进、行动提醒与沉淀模板在同一工作流中呈现。",
  },
  {
    title: "Workflow 看板调度人机执行",
    summary:
      "任务编排模块根据 AI 拆解与真人确认分配负责人、优先级和里程碑；风险任务由风控 AI 标注并提醒接管。",
    reference: "任务看板实时呈现执行脉搏、人机交接与调度建议。",
  },
  {
    title: "驾驶舱闭环复盘与知识沉淀",
    summary:
      "智能驾驶舱汇聚 KPI、风险、行动进展并回写到复盘档案；高价值行动沉淀为可复用指南，驱动下一次策划快速起步。",
    reference: "关键指标、风险提示与复盘结论集中呈现，形成持续优化闭环。",
  },
];

export const moduleShowcase = [
  {
    id: "overview",
    title: "智能营销驾驶舱",
    description:
      "一屏总览项目目标、关键洞察与执行节奏。AI 持续刷新行动提示、风险告警与里程碑，管理者随时掌握整体状况。",
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
      "数据实时脉冲、受众雷达与渠道对比，让策略团队快速定位增长机会。AI 思维链解释异常并生成行动草稿。",
    highlights: [
      "实时监测曝光、互动与转化波动",
      "多维人群与渠道视角支持快速定位机会",
      "AI 推理链路辅助解释与行动排序",
    ],
  },
  {
    id: "collaboration",
    title: "协作洞察工作区",
    description:
      "围绕议题线程组织跨团队共创。AI 与真人在同一界面协同，会议纪要与行动项自动生成并推送到 Workflow。",
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
      "通过任务看板统筹策划执行，AI 预先拆解任务、分配数字员工与真人负责人，并提供风险预警与调度建议。",
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
      "图文智创、海报智绘、视频智创三大创意空间，AI 续写、润色与分镜生成随选调用，并与 Workflow 无缝同步。",
    highlights: [
      "多场景创意画布整合灵感、准则与 AI 建议",
      "交付摘要追踪不同物料的进度状态",
      "一键推送创意任务并生成执行说明",
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
    title: "新品发布整合营销项目",
    outcomes: [
      "洞察 AI 识别核心受众与渠道组合，策略 AI 制定 4 周节奏计划",
      "创意 AI 在 48 小时内生成 120+ 核心物料，真人团队快速审核上线",
      "执行 AI 帮助媒体矩阵协同排期，风控 AI 避免重复投放与资源冲突",
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
      "新品直播 30 天内实现销售额同比提升 2.8 倍，创意交付周期缩短 37%，关键渠道 ROI 提升 31%。",
    insight:
      "通过系统化的洞察 → 协作 → Workflow 闭环，将传统三周的策划周期压缩到 6 天，实时复盘支持快速迭代。"
  },
  {
    brand: "美妆品牌 B",
    result:
      "联合达人共创项目中，AI 辅助完成 180 篇图文 60 条短视频初稿，真人团队仅需 20% 时间完成审核。",
    insight:
      "创意工坊与媒介枢纽协同，确保达人调度、素材生成与排期执行在一个视图内完成。"
  },
  {
    brand: "跨境电商 C",
    result:
      "通过多语言洞察与创意生成，5 个海外站点广告投放转化率提升 24%，线索成本下降 18%。",
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
