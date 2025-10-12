export type KnowledgeArticle = {
  id: string;
  title: string;
  summary: string;
  category: "策略模板" | "执行手册" | "复盘洞察" | "品牌资产";
  updatedAt: string;
  owner: string;
  tags: string[];
};

export type KnowledgeCollection = {
  id: string;
  title: string;
  description: string;
  items: KnowledgeArticle[];
};

export type KnowledgeDraft = {
  id: string;
  title: string;
  owner: string;
  reviewer: string;
  status: "待审核" | "修订中" | "待发布";
  updatedAt: string;
  linkedModule: string;
};

export type KnowledgeTag = {
  id: string;
  name: string;
  usage: number;
  lastUsedAt: string;
};

export const knowledgeCollections: KnowledgeCollection[] = [
  {
    id: "collection-strategy",
    title: "营销策略模板库",
    description: "沉淀爆发期、长尾期等不同节奏的策略模板，可直接引用到策划空间。",
    items: [
      {
        id: "article-001",
        title: "新品上市三阶段规划框架",
        summary: "涵盖预热、爆发、留量的关键 KPI 与常见触点搭配。",
        category: "策略模板",
        updatedAt: "2024-07-10",
        owner: "策略团队",
        tags: ["新品上市", "直播带货", "KOC"],
      },
      {
        id: "article-002",
        title: "短视频内容灵感生成提示词库",
        summary: "按故事线、场景、镜头语言拆解的脚本提示词合集。",
        category: "策略模板",
        updatedAt: "2024-07-08",
        owner: "创意团队",
        tags: ["短视频", "脚本", "故事线"],
      },
    ],
  },
  {
    id: "collection-execution",
    title: "执行与协同手册",
    description: "对齐跨团队合作的 SOP 与工具操作方式。",
    items: [
      {
        id: "article-003",
        title: "达人协作 SOP 3.2",
        summary: "从邀约、脚本确认到交付复盘的 7 个节点提醒。",
        category: "执行手册",
        updatedAt: "2024-07-05",
        owner: "达人运营",
        tags: ["达人合作", "SOP", "复盘"],
      },
      {
        id: "article-004",
        title: "品牌资产入库规范",
        summary: "品牌视觉、文案调性与文件命名规范，避免重复创建。",
        category: "品牌资产",
        updatedAt: "2024-07-04",
        owner: "品牌资源中心",
        tags: ["品牌资产", "命名规范"],
      },
    ],
  },
  {
    id: "collection-insight",
    title: "复盘洞察精选",
    description: "AI 与人工联合输出的关键洞察，帮助快速复制成功经验。",
    items: [
      {
        id: "article-005",
        title: "618 短视频爆款复盘",
        summary: "拆解热门视频成因、投放节奏与创意共通特征。",
        category: "复盘洞察",
        updatedAt: "2024-06-30",
        owner: "洞察团队",
        tags: ["复盘", "投放", "洞察"],
      },
      {
        id: "article-006",
        title: "直播预约转化提升 35% 案例",
        summary: "私域福利搭配直播预热的实战经验分享。",
        category: "复盘洞察",
        updatedAt: "2024-06-22",
        owner: "私域团队",
        tags: ["直播", "私域", "案例"],
      },
    ],
  },
];

export const knowledgeDrafts: KnowledgeDraft[] = [
  {
    id: "draft-001",
    title: "达人直播 SOP v3.1",
    owner: "达人运营",
    reviewer: "王月",
    status: "待审核",
    updatedAt: "2024-07-17 20:15",
    linkedModule: "运营中心 / 达人协同",
  },
  {
    id: "draft-002",
    title: "新品种草案例复盘",
    owner: "洞察团队",
    reviewer: "赵宁",
    status: "修订中",
    updatedAt: "2024-07-17 18:40",
    linkedModule: "洞察中心 / 复盘报告",
  },
  {
    id: "draft-003",
    title: "品牌资产入库命名规范 2.0",
    owner: "品牌资源中心",
    reviewer: "苏醒",
    status: "待发布",
    updatedAt: "2024-07-16 11:05",
    linkedModule: "品牌资源中心 / 素材管理",
  },
];

export const knowledgeTags: KnowledgeTag[] = [
  {
    id: "tag-001",
    name: "直播",
    usage: 42,
    lastUsedAt: "2024-07-17",
  },
  {
    id: "tag-002",
    name: "达人合作",
    usage: 35,
    lastUsedAt: "2024-07-18",
  },
  {
    id: "tag-003",
    name: "新品上市",
    usage: 27,
    lastUsedAt: "2024-07-16",
  },
  {
    id: "tag-004",
    name: "复盘",
    usage: 31,
    lastUsedAt: "2024-07-15",
  },
];
