import { AssetItem, TagSuggestion } from "@/types";

export const assetFilters = {
  types: ["全部", "图文", "海报", "视频"],
  channels: ["全渠道", "抖音", "小红书", "视频号", "微博", "B 站", "线下渠道"],
  styles: ["全部", "科技感", "生活化", "剧情化", "资讯向", "沉浸式"],
};

export const assets: AssetItem[] = [
  {
    id: "asset-001",
    title: "沉浸式体验海报",
    channel: "小红书",
    type: "image",
    cover:
      "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["海报", "科技感", "蓝紫色调"],
    recommendation: "适合用于预热期的剧情化种草发布。",
  },
  {
    id: "asset-002",
    title: "短视频脚本 - 剧情款",
    channel: "抖音",
    type: "copy",
    cover:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["脚本", "剧情", "产品亮点"],
    recommendation: "用于直播导流，突出智能交互差异化。",
  },
  {
    id: "asset-003",
    title: "达人测评视频片段",
    channel: "视频号",
    type: "video",
    cover:
      "https://images.pexels.com/photos/965879/pexels-photo-965879.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["视频", "测评", "生活方式"],
    recommendation: "适合二次创作剪辑，补充生活化视角。",
  },
  {
    id: "asset-004",
    title: "AI 指挥官发布会海报",
    channel: "微博",
    type: "image",
    cover:
      "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["发布会", "品牌", "视觉重点"],
    recommendation: "用于发布会倒计时预热，搭配话题热搜。",
  },
  {
    id: "asset-005",
    title: "线下沉浸式体验馆导览",
    channel: "线下渠道",
    type: "copy",
    cover:
      "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["导览词", "线下活动", "互动脚本"],
    recommendation: "用于门店讲解，结合互动任务提升参与度。",
  },
  {
    id: "asset-006",
    title: "新品功能讲解短视频",
    channel: "B 站",
    type: "video",
    cover:
      "https://images.pexels.com/photos/8102674/pexels-photo-8102674.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["教程", "功能讲解", "长尾关键词"],
    recommendation: "拆解产品卖点，适合长尾搜索与社群分享。",
  },
  {
    id: "asset-007",
    title: "用户案例白皮书摘录",
    channel: "官网",
    type: "copy",
    cover:
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["B2B", "案例研究", "销售支持"],
    recommendation: "放置于官网下载，供销售顾问发掘商机。",
  },
  {
    id: "asset-008",
    title: "直播间视觉屏风",
    channel: "直播间",
    type: "image",
    cover:
      "https://images.pexels.com/photos/19574780/pexels-photo-19574780.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["直播", "布景", "高对比"],
    recommendation: "用于直播背景布置，提升视觉记忆点。",
  },
  {
    id: "asset-009",
    title: "社交媒体互动问答脚本",
    channel: "微信",
    type: "copy",
    cover:
      "https://images.pexels.com/photos/3184308/pexels-photo-3184308.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["互动", "社群运营", "节奏引导"],
    recommendation: "结合私域活动安排，促进用户二次分享。",
  },
  {
    id: "asset-010",
    title: "达人探店 vlog 正片",
    channel: "小红书",
    type: "video",
    cover:
      "https://images.pexels.com/photos/8111032/pexels-photo-8111032.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["探店", "生活化", "剧情化"],
    recommendation: "适合作为投放素材，搭配位置定向与达人带货。",
  },
];

export const tagSuggestions: TagSuggestion[] = [
  {
    id: "suggest-001",
    assetId: "asset-001",
    tags: ["AI 共创", "未来感光影"],
    confidence: 0.92,
  },
  {
    id: "suggest-002",
    assetId: "asset-003",
    tags: ["体验口播", "场景沉浸"],
    confidence: 0.88,
  },
  {
    id: "suggest-003",
    assetId: "asset-006",
    tags: ["功能拆解", "核心卖点"],
    confidence: 0.9,
  },
  {
    id: "suggest-004",
    assetId: "asset-010",
    tags: ["线下体验", "达人联动"],
    confidence: 0.86,
  },
];
