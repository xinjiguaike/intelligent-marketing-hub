import {
  CollaborationMessage,
  CreativeReference,
  CreativeVersion,
} from "@/types";

export const creativeTabs = ["图文智创", "海报智绘", "视频智创"] as const;

export const referenceAssets: CreativeReference[] = [
  {
    id: "ref-001",
    title: "未来随行故事海报",
    thumbnail:
      "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["海报", "科技感"],
  },
  {
    id: "ref-002",
    title: "沉浸式体验短视频",
    thumbnail:
      "https://images.pexels.com/photos/8549394/pexels-photo-8549394.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["视频", "体验"],
  },
  {
    id: "ref-003",
    title: "达人测评脚本",
    thumbnail:
      "https://images.pexels.com/photos/6953564/pexels-photo-6953564.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["脚本", "测评"],
  },
];

export const creativeVersions: CreativeVersion[] = [
  {
    id: "ver-001",
    label: "V1 · AI 初稿",
    timestamp: "2024-07-11T09:20:00+08:00",
    summary: "基础剧情结构与产品亮点梳理。",
  },
  {
    id: "ver-002",
    label: "V2 · 人工微调",
    timestamp: "2024-07-11T10:05:00+08:00",
    summary: "补充达人互动环节与镜头调度。",
  },
  {
    id: "ver-003",
    label: "V3 · AI 联合优化",
    timestamp: "2024-07-11T11:18:00+08:00",
    summary: "优化对话语气与转场提示。",
  },
];

export const collaborationMessages: CollaborationMessage[] = [
  {
    id: "msg-001",
    sender: "ai",
    content: "已完成短视频脚本结构，推荐添加场景沉浸式开篇。",
    createdAt: "2024-07-11T11:22:00+08:00",
  },
  {
    id: "msg-002",
    sender: "human",
    content: "请加强产品镜头细节，突出手势交互体验。",
    createdAt: "2024-07-11T11:24:10+08:00",
  },
  {
    id: "msg-003",
    sender: "ai",
    content: "已更新镜头段落，并补充手势交互描述。",
    createdAt: "2024-07-11T11:24:45+08:00",
  },
];

export const creativeDraft = `【分镜 01】\n场景：未来城市夜景，主角戴上新品开启全息界面，旁白：未来随行，从此刻开启。\n\n【分镜 02】\n场景：主角在地铁与办公场景之间切换，展示设备无缝连接能力，旁白：商务与生活随时切换。\n\n【分镜 03】\n场景：达人试用手势交互，AI 提供实时建议，旁白：智能助手，理解你的每个动作。`;
