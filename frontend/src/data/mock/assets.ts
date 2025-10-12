import { AssetItem, TagSuggestion } from "@/types";

export const assetFilters = {
  types: ["全部", "图文", "海报", "视频"],
  channels: ["全渠道", "抖音", "小红书", "视频号", "微博"],
  styles: ["全部", "科技感", "生活化", "剧情化"],
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
];
