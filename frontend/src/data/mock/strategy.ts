import { PromptRecord, StrategyNode } from "@/types";

export const strategyTree: StrategyNode = {
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

export const promptHistory: PromptRecord[] = [
  {
    id: "prompt-001",
    role: "human",
    content: "请结合目标人群，输出一份新品发布整合营销策略框架。",
    createdAt: "2024-07-11T10:22:00+08:00",
  },
  {
    id: "prompt-002",
    role: "ai",
    content:
      "已完成策略框架初稿，建议在直播部分强调沉浸式体验场景，并引入剧情化脚本。",
    createdAt: "2024-07-11T10:23:30+08:00",
    score: 4.7,
  },
  {
    id: "prompt-003",
    role: "human",
    content: "加上达人协同行动计划，重点说明达人类型与内容示例。",
    createdAt: "2024-07-11T10:24:10+08:00",
  },
  {
    id: "prompt-004",
    role: "ai",
    content:
      "达人协同行动计划已补充，包含科技达人、生活方式 KOC 与直播体验官三类。",
    createdAt: "2024-07-11T10:24:50+08:00",
    score: 4.9,
  },
];

export const streamingDraft: string[] = [
  "【总体策略】围绕“未来随行”的品牌主张构建整合营销矩阵，以沉浸式体验和智能协同为核心叙事。",
  "【社交矩阵】微博预热话题 #未来随行#，搭配 3 支剧情短视频，在小红书投放互动话题挑战。",
  "【达人合作】科技测评达人深度体验性能亮点，生活方式 KOC 输出真实场景，直播体验官进行剧情化直播。",
  "【节奏规划】预热期聚焦故事化内容，发布期强化直播大事件，爆发期进行跨平台扩散与私域转化。",
];
