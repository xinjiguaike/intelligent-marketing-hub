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

export const creativeTaskSummary = {
  campaign: "未来随行新品发布",
  focus: "全息智能眼镜 Nova Air X",
  keyMessage: "突出“未来随行”口号与全息交互卖点，场景切换需兼顾商务与生活。",
  deliverables: [
    { id: "deliverable-copy", label: "图文种草稿", owner: "策划 · 米拉", status: "进行中" },
    { id: "deliverable-poster", label: "海报 KV 构图", owner: "设计 · 韩宁", status: "待开启" },
    { id: "deliverable-video", label: "30s 短视频脚本", owner: "创意 · Alex", status: "进行中" },
  ],
  guardrails: [
    "文案需包含品牌口号“未来随行”与新品名称",
    "强调真实体验，不夸大医疗/安全功效",
    "保持科技感 + 生活化的语气平衡",
  ],
} as const;

export const creativePromptLibrary = [
  "请强化城市通勤与线下快闪的关联，让用户感知全天候陪伴体验。",
  "生成 3 条结尾 CTA 备选，突出预约体验与限时福利。",
  "围绕“手势交互”扩写场景细节，加入镜头特写与音效建议。",
] as const;

export const creativeChecklist = [
  {
    id: "check-tone",
    label: "语气保持科技感 + 生活化双风格",
    status: "done",
  },
  {
    id: "check-slogan",
    label: "明确呈现品牌口号与新品名称",
    status: "done",
  },
  {
    id: "check-cta",
    label: "包含可执行的 CTA 与线下预约信息",
    status: "pending",
  },
  {
    id: "check-assets",
    label: "同步设计与视频团队的素材需求",
    status: "pending",
  },
] as const;

export const creativeCanvasMap = {
  图文智创: {
    type: "copy",
    headline: "未来随行：城市穿梭的一天",
    tone: "科技感 · 生活化",
    sections: [
      {
        id: "copy-hero",
        title: "开篇场景",
        content:
          "晨曦中的城市地铁，人群匆匆。主角戴上 Nova Air X，启动全息导航，轻声说：“早上好，带我去今日第一站。” 全息光轨浮现，刷出今日行程。",
      },
      {
        id: "copy-feature",
        title: "核心卖点",
        content:
          "通勤途中，设备自动切换商务模式，将邮件与会议纪要以浮窗呈现；午后咖啡时间，则切换为生活模式，提示附近快闪与限时福利。",
      },
      {
        id: "copy-social",
        title: "社交亮点",
        content:
          "好友向主角发来实时共享视角，一同体验手势互动小游戏。全息界面根据兴趣推荐专属内容，保持对话温度。",
      },
      {
        id: "copy-cta",
        title: "结尾 CTA",
        content: "「未来随行·全息体验周」限量预约开启，即刻扫码报名，现场解锁更多沉浸惊喜。",
      },
    ],
    ai: {
      continuation: {
        result: {
          id: "copy-ai",
          title: "AI 续写 · 沉浸体验段落",
          content:
            "夜幕降临，Nova Air X 将快闪店灯光折射成全息星环。好友挥动手势完成预约，专属体验随即开启，城市因未来科技而柔和降噪。",
        },
        chunks: [
          "夜幕降临，Nova Air X 将快闪店灯光折射成全息星环。\n",
          "好友挥动手势完成预约，专属体验随即开启，\n",
          "城市因未来科技而柔和降噪。",
        ],
      },
      refine: {
        "copy-hero": {
          mode: "rewrite",
          result:
            "清晨的地铁穿梭如同流动的光束。主角戴上 Nova Air X，轻声唤醒全息导航，今日行程在半空中优雅展开，城市节奏被柔和蓝光重新定义。",
          chunks: [
            "✨ 正在润色开篇场景...\n",
            "清晨的地铁穿梭如同流动的光束。主角戴上 Nova Air X，轻声唤醒全息导航，\n",
            "今日行程在半空中优雅展开，城市节奏被柔和蓝光重新定义。",
          ],
        },
        "copy-cta": {
          mode: "append",
          result:
            "扫码预约「未来随行·全息体验周」，到店即享限定互动礼与 VIP 指南，提前锁定沉浸席位。",
          chunks: [
            "正在补充 CTA...\n",
            "扫码预约「未来随行·全息体验周」，到店即享限定互动礼与 VIP 指南，\n",
            "提前锁定沉浸席位。",
          ],
        },
      },
    },
  },
  海报智绘: {
    type: "poster",
    concept: "全息光轨穿梭夜色城市",
    tagline: "未来随行 眼见为实",
    palette: [
      { id: "color-1", hex: "#60A5FA", usage: "全息光轨主色" },
      { id: "color-2", hex: "#38BDF8", usage: "按钮与高光" },
      { id: "color-3", hex: "#0F172A", usage: "背景夜景" },
      { id: "color-4", hex: "#F8FAFC", usage: "标题字体" },
    ],
    focalPoints: [
      "主体人物佩戴设备，眼前生成全息界面",
      "右下角展示预约二维码 + 限时提示",
      "左上角放置品牌标识与口号排版",
    ],
    layoutNotes: [
      "保持对角线光轨，延伸至远处城市天际线",
      "全息界面使用流线型玻璃质感，提升科技氛围",
      "按钮采用渐变描边，突出“立即预约”动作",
    ],
    ai: {
      continuation: {
        result:
          "在海报右下角叠加全息粒子倒计时，配以「体验预约剩余 48 小时」提示，让 CTA 与主光轨形成呼应，增强临场紧迫感。",
        chunks: [
          "AI 正在分析视觉重心...\n",
          "建议在海报右下角叠加全息粒子倒计时，配以「体验预约剩余 48 小时」提示，\n",
          "让 CTA 与主光轨形成呼应，增强临场紧迫感。",
        ],
      },
    },
  },
  视频智创: {
    type: "storyboard",
    duration: "30 秒",
    scenes: [
      {
        id: "scene-1",
        title: "场景 01 · 夜色启程",
        visual: "俯瞰城市夜景，主角在高铁站戴上设备，脚下光轨延伸。",
        dialogue: "旁白：未来随行，从现在起动身。",
      },
      {
        id: "scene-2",
        title: "场景 02 · 通勤智联",
        visual: "地铁车厢中，全息界面贴合玻璃，展示商务待办与日程。",
        dialogue: "主角：会议改到 10 点？直接同步给团队。",
      },
      {
        id: "scene-3",
        title: "场景 03 · 生活切换",
        visual: "咖啡店内，设备识别好友进入，生成共享视角小游戏。",
        dialogue: "好友：这手势互动太酷了，我们快去线下体验店！",
      },
      {
        id: "scene-4",
        title: "场景 04 · 沉浸收束",
        visual: "快闪店内，线下导览与全息指引无缝衔接，灯光聚焦产品。",
        dialogue: "旁白：未来随行，眼见为实。即刻预约专属体验。",
      },
    ],
    outro: "落版展示品牌 LOGO、口号与预约二维码。",
    ai: {
      continuation: {
        result: {
          id: "scene-5",
          title: "场景 05 · 预约引导",
          visual:
            "夜幕下的快闪店外立面化身全息屏幕，主角与好友举起设备，屏幕浮现预约二维码与倒计时。",
          dialogue: "旁白：扫码预约，即刻开启未来随行的沉浸旅程。",
        },
        chunks: [
          "AI 正在补全收束镜头...\n",
          "夜幕下的快闪店外立面化身全息屏幕，主角与好友举起设备，二维码与倒计时缓缓浮现，\n",
          "旁白：扫码预约，即刻开启未来随行的沉浸旅程。",
        ],
      },
    },
  },
} as const;

export const creativeWorkflowPush = [
  {
    id: "creative-task-001",
    title: "图文种草稿 · 发布排期确认",
    column: "待规划",
    aiOwner: "策划 AI",
    humanOwner: "策划 · 米拉",
    dueAt: "2024-07-12T19:00:00+08:00",
  },
  {
    id: "creative-task-002",
    title: "海报 KV 光效微调需求",
    column: "AI 执行中",
    aiOwner: "设计 AI",
    humanOwner: "设计 · 韩宁",
    dueAt: "2024-07-12T21:30:00+08:00",
  },
  {
    id: "creative-task-003",
    title: "短视频脚本交接至运营看板",
    column: "待人工确认",
    aiOwner: "创意 AI",
    humanOwner: "运营 · 赵敏",
    dueAt: "2024-07-13T09:00:00+08:00",
  },
] as const;
