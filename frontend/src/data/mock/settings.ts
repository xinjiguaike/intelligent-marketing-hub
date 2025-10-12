export type PreferenceSection = {
  id: string;
  title: string;
  description: string;
  options: Array<{
    id: string;
    label: string;
    value: string;
    type: "toggle" | "select" | "input";
    hint?: string;
    options?: Array<{ label: string; value: string }>;
    enabled?: boolean;
  }>;
};

export const preferenceSections: PreferenceSection[] = [
  {
    id: "assistants",
    title: "智能体协同",
    description: "配置各数字员工的权限边界与默认输出格式。",
    options: [
      {
        id: "assistants-auto-handover",
        label: "启用 AI 自动接管低风险任务",
        value: "on",
        type: "toggle",
        hint: "关闭后需要人工手动分发任务。",
        enabled: true,
      },
      {
        id: "assistants-tone",
        label: "AI 输出语气",
        value: "professional",
        type: "select",
        options: [
          { label: "专业稳重", value: "professional" },
          { label: "活力亲和", value: "friendly" },
          { label: "数据导向", value: "analytical" },
        ],
      },
      {
        id: "assistants-sla",
        label: "AI 任务 SLA (分钟)",
        value: "8",
        type: "input",
        hint: "超过 SLA 将通知负责人介入。",
      },
    ],
  },
  {
    id: "notifications",
    title: "通知与告警",
    description: "设置不同渠道的提醒方式，保持团队同步节奏。",
    options: [
      {
        id: "notify-email",
        label: "邮件通知",
        value: "on",
        type: "toggle",
        enabled: true,
      },
      {
        id: "notify-wecom",
        label: "企业微信机器人推送",
        value: "on",
        type: "toggle",
        enabled: true,
      },
      {
        id: "notify-summary",
        label: "每日汇总时间",
        value: "18:30",
        type: "input",
        hint: "每日生成运营简报的时间。",
      },
    ],
  },
  {
    id: "security",
    title: "安全与权限",
    description: "管理数据访问与操作留痕，保障品牌资产安全。",
    options: [
      {
        id: "security-mfa",
        label: "强制启用双重验证",
        value: "on",
        type: "toggle",
        enabled: true,
      },
      {
        id: "security-session",
        label: "会话超时时间（分钟）",
        value: "45",
        type: "input",
      },
      {
        id: "security-audit",
        label: "AI 指令审计级别",
        value: "all",
        type: "select",
        options: [
          { label: "仅高风险任务", value: "high" },
          { label: "全部指令", value: "all" },
        ],
      },
    ],
  },
];
