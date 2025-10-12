import { WorkflowColumn } from "@/types";

export const workflowColumns: WorkflowColumn[] = [
  {
    id: "column-planned",
    title: "待规划",
    description: "尚未分配给数字员工的任务",
    tasks: [
      {
        id: "task-001",
        title: "双 11 预热活动攻略",
        type: "营销策划",
        priority: "high",
        status: "planned",
        aiOwner: "策划 AI",
        humanOwner: "赵敏",
        dueAt: "2024-07-13T18:00:00+08:00",
        executionId: "exec-strategy",
        timeline: [
          { label: "任务创建", at: "2024-07-10T09:00:00+08:00" },
          { label: "等待指派", at: "2024-07-10T09:45:00+08:00" },
        ],
      },
    ],
  },
  {
    id: "column-executing",
    title: "AI 执行中",
    description: "数字员工正在处理的任务",
    tasks: [
      {
        id: "task-002",
        title: "小红书达人邀约函",
        type: "KOC/KOL",
        priority: "medium",
        status: "executing",
        aiOwner: "运营 AI",
        dueAt: "2024-07-12T14:00:00+08:00",
        executionId: "exec-launch",
        timeline: [
          { label: "策划输入完成", at: "2024-07-11T15:00:00+08:00" },
          { label: "自动生成邀约", at: "2024-07-11T15:05:00+08:00" },
        ],
      },
      {
        id: "task-003",
        title: "短视频脚本：沉浸体验篇",
        type: "内容创意",
        priority: "high",
        status: "executing",
        aiOwner: "创意 AI",
        dueAt: "2024-07-12T17:30:00+08:00",
        executionId: "exec-copy",
        timeline: [
          { label: "素材收集", at: "2024-07-11T20:40:00+08:00" },
          { label: "AI 草稿完成", at: "2024-07-12T08:15:00+08:00" },
        ],
      },
    ],
  },
  {
    id: "column-handover",
    title: "待人工确认",
    description: "需要人工审批或加持的任务",
    tasks: [
      {
        id: "task-004",
        title: "直播脚本口播确认",
        type: "直播运营",
        priority: "critical",
        status: "handover",
        aiOwner: "策划 AI",
        humanOwner: "主播团队",
        dueAt: "2024-07-12T12:00:00+08:00",
        executionId: "exec-copy",
        timeline: [
          { label: "AI 版本提交", at: "2024-07-12T09:10:00+08:00" },
          { label: "请求人工接管", at: "2024-07-12T09:12:00+08:00" },
        ],
      },
    ],
  },
  {
    id: "column-done",
    title: "已完成",
    description: "高质量交付并归档的任务",
    tasks: [
      {
        id: "task-005",
        title: "抖音渠道投放策略",
        type: "投放策略",
        priority: "medium",
        status: "completed",
        aiOwner: "洞察 AI",
        humanOwner: "孙悦",
        dueAt: "2024-07-10T16:00:00+08:00",
        executionId: "exec-launch",
        timeline: [
          { label: "AI 生成策略", at: "2024-07-09T11:20:00+08:00" },
          { label: "人工确认执行", at: "2024-07-09T14:45:00+08:00" },
          { label: "归档", at: "2024-07-10T16:05:00+08:00" },
        ],
      },
    ],
  },
];
