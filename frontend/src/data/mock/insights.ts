import { InsightMetric, InsightReport, Insight } from "@/types";

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
