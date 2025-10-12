import { AgentStatus } from "@/types";

export type AiControlLog = {
  id: string;
  agentId: string;
  timestamp: string;
  message: string;
  level: "info" | "warning" | "error";
};

export type AiDirective = {
  id: string;
  title: string;
  description: string;
  targetAgent: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
  status: "pending" | "executing" | "completed";
};

export const controlAgents: AgentStatus[] = [
  {
    id: "planner-ai",
    name: "策划 AI · NOVA",
    role: "planner",
    status: "running",
    confidence: 0.87,
    tasksInQueue: 4,
    lastOutput: "第一波种草节奏方案",
    trend: 9,
  },
  {
    id: "creator-ai",
    name: "创意 AI · STUDIO",
    role: "creator",
    status: "idle",
    confidence: 0.92,
    tasksInQueue: 1,
    lastOutput: "短视频脚本场景分镜",
    trend: 3,
  },
  {
    id: "operator-ai",
    name: "运营 AI · ATLAS",
    role: "operator",
    status: "handover",
    confidence: 0.72,
    tasksInQueue: 2,
    lastOutput: "KOC 扩列名单质量评估",
    trend: -4,
  },
  {
    id: "insight-ai",
    name: "洞察 AI · SPARK",
    role: "analyst",
    status: "running",
    confidence: 0.9,
    tasksInQueue: 2,
    lastOutput: "直播预约转化预警",
    trend: 6,
  },
];

export const controlLogs: AiControlLog[] = [
  {
    id: "log-001",
    agentId: "insight-ai",
    timestamp: "2024-07-18T09:24:00+08:00",
    message: "直播转化漏斗异常，自动触发预警并通知运营 AI。",
    level: "warning",
  },
  {
    id: "log-002",
    agentId: "creator-ai",
    timestamp: "2024-07-18T08:52:00+08:00",
    message: "完成短视频分镜稿，待人工确认视觉风格标签。",
    level: "info",
  },
  {
    id: "log-003",
    agentId: "operator-ai",
    timestamp: "2024-07-18T08:20:00+08:00",
    message: "KOC 扩列名单存在数据缺失，请人工补全收货地址字段。",
    level: "warning",
  },
  {
    id: "log-004",
    agentId: "planner-ai",
    timestamp: "2024-07-18T08:02:00+08:00",
    message: "已根据新品节奏更新第二阶段目标树。",
    level: "info",
  },
];

export const controlDirectives: AiDirective[] = [
  {
    id: "directive-001",
    title: "对齐第二阶段传播策略",
    description: "总结种草期效果，给出爆发期传播节奏与达人搭配建议。",
    targetAgent: "策划 AI · NOVA",
    priority: "high",
    createdAt: "2024-07-18T07:45:00+08:00",
    status: "executing",
  },
  {
    id: "directive-002",
    title: "生成 KOC 问答剧本",
    description: "根据最新 FAQ 形成 6 条问答脚本，提供标准口径。",
    targetAgent: "运营 AI · ATLAS",
    priority: "medium",
    createdAt: "2024-07-18T07:30:00+08:00",
    status: "pending",
  },
  {
    id: "directive-003",
    title: "同步直播视觉素材",
    description: "拉取 Storyboard 并输出 3 套备用封面，供直播间动态切换。",
    targetAgent: "创意 AI · STUDIO",
    priority: "low",
    createdAt: "2024-07-17T22:30:00+08:00",
    status: "completed",
  },
];
