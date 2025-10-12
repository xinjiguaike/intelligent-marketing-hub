import {
  AccountMetric,
  CollaborationProgress,
  ScheduleItem,
} from "@/types";

export const accountMetrics: AccountMetric[] = [
  {
    id: "acc-001",
    name: "官方抖音号",
    platform: "抖音",
    health: 0.86,
    growth: 0.18,
    status: "healthy",
  },
  {
    id: "acc-002",
    name: "品牌小红书",
    platform: "小红书",
    health: 0.72,
    growth: -0.12,
    status: "warning",
  },
  {
    id: "acc-003",
    name: "视频号旗舰",
    platform: "视频号",
    health: 0.63,
    growth: 0.06,
    status: "healthy",
  },
];

export const scheduleItems: ScheduleItem[] = [
  {
    id: "sch-001",
    title: "小红书直播预告",
    owner: "运营 AI",
    start: "2024-07-12T14:00:00+08:00",
    end: "2024-07-12T15:30:00+08:00",
    channel: "小红书",
  },
  {
    id: "sch-002",
    title: "抖音达人投放",
    owner: "创意 AI",
    start: "2024-07-13T10:00:00+08:00",
    end: "2024-07-13T18:00:00+08:00",
    channel: "抖音",
  },
  {
    id: "sch-003",
    title: "私域社群福利周",
    owner: "私域团队",
    start: "2024-07-14T09:00:00+08:00",
    end: "2024-07-16T20:00:00+08:00",
    channel: "企业微信",
  },
];

export const collaborationProgress: CollaborationProgress[] = [
  {
    id: "col-001",
    creator: "科技黑马",
    type: "KOL",
    status: "确认合作",
    nextStep: "等待脚本审核",
  },
  {
    id: "col-002",
    creator: "生活方式小宇",
    type: "KOC",
    status: "沟通中",
    nextStep: "AI 提供创意灵感",
  },
  {
    id: "col-003",
    creator: "校园体验官",
    type: "KOS",
    status: "接洽",
    nextStep: "安排产品寄送",
  },
];
