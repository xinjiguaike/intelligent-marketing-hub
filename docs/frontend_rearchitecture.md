# 智能营销组织前端重构方案

> 目标：依据新的组织运作逻辑，将所有前端页面、组件与交互重构至“组织协同”范式。本文定义角色旅程、协同空间三层视角、各业务域界面、组件接口以及可复用交互模式，确保每一位营销组织成员在系统中的操作都具备明确上下文与可执行路径。

---

## 1. 角色视角与核心诉求

| 角色 | 场景 | 主要目标 | 关键界面入口 | 关键交互 |
| --- | --- | --- | --- | --- |
| **组织指挥官 / 品牌管理者** | 统筹战役、能力供需、风险决策 | 保障战役目标按时交付；动态调配 AI/真人资源 | 协同空间 -> 全局作战地图 / 项目沙盘；组织大脑概览 | 拖拽作战编组调整优先级、批量批准能力补给、下发指令给 AI 团队、查看风险时间轴 |
| **策略总监 / 策划团队** | 构建营销策略、拆解任务包 | 快速获取上下文、驱动 AI 共创策略 | Strategy Hub、Campaign Sandbox、Workflow | 在沙盘中点击阶段，进入 Strategy Hub 编辑；使用 AI Digest/Joint Calibration；同步任务到 Workflow |
| **创意导演 / 创意团队** | 生产图文/视频资产、协作审批 | 借助 AI 提升产出质量并保持品牌一致 | Creative Studio、Assets、Execution Map | 模式化 AI 创作流程、片段级共创、版本时间线、同步到 Workflow |
| **运营负责人 / 媒介投放团队** | 管理发布排期、达人协作、投放执行 | 对齐策略节奏，确保渠道发布一致 | Operations Hub、Allied Creators、Campaign Sandbox | 拖拽排期甘特、审批达人协作步骤、接管 Workflow 任务、与 AI 协同调整排期 |
| **洞察分析师** | 监控数据、输出复盘洞察 | 将 AI 洞察与人工判断结合，指导下一轮策略 | Insight Center、Execution Map、Knowledge Hub | 请求 AI 分析、标注人工评语、生成复盘包并同步到协同空间 |
| **AI Workforce Lead / 技术运营** | 维护 AI 员工、训练数据、能力模型 | 确保 AI 能力覆盖与质量稳定 | 组织大脑 -> 能力模型库、AI Workforce | 克隆/扩编 AI 员工、调整能力边界、查看接管原因、发起训练任务 |
| **外部盟军（达人/机构）联络人** | 筛选、谈判、共创、交付 | 让外部资源无缝融入内部流程 | Allied Creators、Campaign Sandbox | 使用能力雷达筛选、签署联合作战协议、与 AI 联动交付物、同步 Workflow |

---

## 2. 全局框架与共同组件

### 2.1 应用框架
1. **顶栏（指挥带）**  
   - 包含 Logo、全局搜索（可搜索战役/任务/AI 员工/盟军）、组织时钟、AI 中控按钮、角色切换、个人中心。  
   - 组织时钟以时间轴显示当前冲刺，鼠标悬停可见关键节点。  
   - AI 中控按钮展开“即时指令”面板，可向任意 AI 员工发布命令或请求摘要。
2. **侧栏（组织帽导航）**  
   - 列出协同空间、组织大脑、各业务域、盟军、知识库等。  
   - 每个模块显示与协同空间层级的映射（如 Workflow 对应任务执行地图）。  
   - 侧栏支持按角色过滤：例如创意成员默认展开 Creative Studio 与相关 Workflow 列。
3. **AI Dock（右下浮标）**  
   - 显示当前活跃 AI 会话，支持切换/暂停/加速输出。  
   - 任何任务的 AI 流式输出都会在 Dock 中保留线程。
4. **通知与任务中心**  
   - 顶栏铃铛图标：合并风控、审批、能力补给请求等。  
   - 任务中心按“待指挥”“待接管”“AI 请求确认”分类，点击跳转到对应视图。

### 2.2 全局交互规范
- 所有卡片/按钮必须提供 hover、active、loading、disabled 四种状态。  
- 拖拽交互统一采用 `@dnd-kit`，提供可视化反馈与撤销。  
- 数据密集区域使用“玻璃态卡片 + 渐变描边”，强调层次。  
- 弹层遵循组织层级：协同空间 → 模块抽屉 → 组件浮层，避免遮挡全局上下文。

### 2.3 数据基础
- 全局状态由 Zustand 管理，命名空间示例：`useOrgStore`, `useSandboxStore`, `useWorkflowStore`。  
- Mock API 统一 `/api/mock/**`；SSE 输出使用 `ReadableStream` + 自定义 Hook。  
- 每个组件在文档中列明所需数据字段、接口与状态。

---

## 3. 协同空间三层视角

### 3.1 全局作战地图（HQ Map）
**布局**：两列 + 底部时间线。
- 左列（8 栏）：组织态势热力、能力充足度雷达、资源消耗图、战役优先级栈。
- 右列（4 栏）：能力补给请求、风险警报、指令历史、AI 队列面板。
- 底部：组织时钟与关键洞察时间线。

**核心组件与交互**：
1. `BattleOverviewCard`  
   - 显示战役名称、目标、阶段、风险指示。  
   - 支持拖拽调整优先级；双击进入项目沙盘。
2. `CapabilityRadar`  
   - 维度：策略、创意、运营、达人、洞察、技术。  
   - 点击维度可展开能力模型列表，显示“当前资源/需求”。
3. `OrgTimeline`  
   - 时间轴 + 事件标签（冲刺、复盘、决策节点）。  
   - 点击事件弹出抽屉，包含任务、负责人、AI 建议。
4. `CommandPalette`  
   - 输入框 + 预设指令（增派 AI、请求复盘、呼叫盟军等）。  
   - 调用后在右侧显示执行结果与链路。

### 3.2 项目作战沙盘（Campaign Sandbox）
**布局**：左（编组列表）-中（阶段轨道）-右（交付/风险）。
- 左侧 `BattleGroupsPanel` 列出每个编组、真人指挥官、AI 队列、外部盟军、能力模型。  
- 中部 `StageTrack` 使用横向轨道展示策略→创意→投放→复盘等阶段，每个阶段含能力条 (health) 与任务堆叠。  
- 右侧 `DeliveryConsole` 展示该战役的交付物、同步状态、阻塞点、AI 建议。

**交互**：
1. 拖拽任务在阶段间移动 → 弹出确认对话框，允许指定新的能力模型/负责人。  
2. 点击能力条 → 打开 `CapabilityDrawer`，可申请增援、查看接管记录。  
3. `GenerateSupplyOrder` 按钮 → 弹出表单选择能力缺口、执行期限，提交后出现在 HQ Map 的补给列表。  
4. `SandboxTimeline` → 显示该战役的关键事件，支持滤按“AI 输出”“人工接管”“盟军协同”。

### 3.3 任务执行地图（Execution Map / Workflow）
**结构**：顶部脉搏条 + 看板 + 右侧浮层 + 底部链路。
- 脉搏条 `TaskPulseBar`：总任务、AI 执行、待接管、警报、能力缺口。  
- 看板 `CapabilityKanban`：列（待规划 / AI 执行中 / 待人工确认 / 已完成），每列支持虚拟滚动。  
- 任务卡 `TaskCard`：显示标题、类型、能力模型、AI 负责人、人工负责人、执行模式、到期时间、最新事件。  
- 右侧浮层 `TaskDrawer`：包含对话线程、交付物、提示词、接管按钮、知识片段。  
- 底部 `TaskChainPulse`：按作战线路串联任务，突出瓶颈。

**交互要点**：
1. 拖动任务进入“待人工确认”列 → 弹出接管 modal（可选择原因、备注、交付要求）。  
2. `mode` 切换按钮（AI 自主/共创/人工） → 写入时间轴并通知能力模型。  
3. `AI Replay`：回放任务中 AI 与人工的对话，支持复制输出到知识库。  
4. `Rebalance Suggestions`：AI 提示按钮，点击后弹出建议列表，可批量调整优先级或责任人。

---

## 4. 各业务域界面与交互

### 4.1 Strategy Hub
**模块**：
1. `CampaignBoard`：卡片列表示每个策略，含 KPI、阶段、风险。支持筛选器（角色、阶段、能力模型）。  
2. `KPI Overview`：展示活跃策划数、待审批 Brief、AI 输出完成率、依赖的资源。  
3. `Knowledge Base`：策略树、洞察卡、模板库，支持收藏、复制。  
4. `Recent Collaborations`：列表+时间轴，展示 AI 输出和人工指令累积记录。

**创建流程 (4 步)**：
1. **Brief Intake**  
   - 表单 + 品牌资产引用区。  
   - `AI Compliance Check` 按钮——弹出侧栏列出缺失项，支持自动填充建议。  
2. **AI Digest**  
   - 中区 `StreamingPanel` + 右侧 Prompt 记录 + 左侧思维链卡片。  
   - 思维链节点可标记“需人工确认”，自动推进到下一步。  
3. **Joint Calibration**  
   - 左：树状策略骨架 (支持拖拽节点/编辑)；右：AI 建议卡 + 对话串。  
   - `Apply Suggestion` 按钮 -> 将 AI 建议拖入策略树；支持版本对比 diff。  
4. **Execution Handoff**  
   - 列出任务包、素材需求、审批节点；`Sync to Workflow` 按钮显示结果卡。  
   - 支持导出 Markdown/PDF、生成分享链接。

### 4.2 Creative Studio
**布局**：左（灵感/资产）-中（AI 创意画布）-右（协同面板）。
- 模式切换（图文/海报/视频）通过上方 segmented control。  
- 画布内按段落/分镜展示，每个单元有 `AI Extend`、`Rewrite`、`Tone Control` 按钮。  
- 协同面板包含即时讨论、版本时间线、质量自检 checklist。  
- `Sync Workflow` 按钮触发任务推送，弹出结果列表 + 快捷链接。

### 4.3 Operations Hub
**区域**：
1. `Account Health`：矩阵账号、曝光节奏、健康指数。  
2. `Weekly Calendar`：跨渠道事件 + 策略焦点标签；支持拖拽调整。  
3. `Publishing Suggestions`：AI 自动给出发布窗口 / 内容建议，可一键生成 Workflow 任务。  
4. `Gantt Timeline`：投放排期，显示预算条和状态；拖动调整 → AI 重算排期。  
5. `KOL/KOC Progress`：按任务类型显示进度，标记异常与复盘入口。

### 4.4 Insight Center
- 顶部 `Realtime Metrics`：指标卡 + 折线图。  
- 中部 `AI Reasoning Graph`：节点表示洞察，点击查看 chain-of-thought。  
- 右侧 `Ask Insight` 输入区域 + 输出卡片（可收藏/引用到策略）。  
- 底部 `Review Reports`：复盘列表 + 审批按钮；可同步到知识库。  
- `Insight Thread` 抽屉：展示洞察与相关任务/盟军/策略的关联。

### 4.5 Brand Resource Center
- 入口 `Resource Dashboard`：账号、达人、商品、素材指标与警示。  
- `Accounts Manager`：表格 + 侧栏详情 + 批量授权操作。  
- `Advocates Manager`：达人/KOC 视图，显示任务状态、激励包、合同节点。  
- `Product Library`：SKU 卡片 + 参数 + 引用记录；一键推送到 Strategy/Creative。  
- `Asset Gallery`：瀑布流 + 标签 + 引用去向 + 质检状态；提供 AI 自动贴标签按钮。

### 4.6 Allied Creators（外部盟军）
- `Alliance Map`：泡泡图展示项目-盟军关系、角色、阶段。  
- `Capability Comparison Radar`：对比候选达人指标。  
- `Collaboration Pipeline`：四段（接触/谈判/共创/交付），每段有 Checklist 与 AI 支持动作。  
- `Battle Storyline`：详细记录盟军与 AI 产出的交付物、风险、复盘。  
- `SOW Editor`：在线编辑合同要点，与 Workflow 任务绑定。

### 4.7 AI Workforce & 组织大脑
- `Capabilities Grid`：卡片展示 role、AI 实例、human lead、auto/co-create/human-only 范围、指标。  
- `Capability Drawer`：历史接管率、任务样本、增援按钮。  
- `AI Workforce Table`：列出每个 AI 员工的状态、任务、训练建议。  
- `Training Workflow`：创建训练任务、上传数据、查看版本。  
- `Org Genome`：树状图显示真人- AI 隶属关系，空缺岗位用虚线框提示。

### 4.8 Knowledge Hub
- `Collections`：卡片 + 标签 +使用频次。  
- `Draft Review`：列表 + 审核/退回按钮。  
- `Tag Manager`：统计 + 清理建议。  
- 支持从任务/策略直接“保存片段到知识库”。

---

## 5. 组件清单与交互细节

### 5.1 核心组件
| 组件 | 描述 | 状态/交互 | 数据需求 |
| --- | --- | --- | --- |
| `GlassPanel` | 统一玻璃态卡片容器 | Hover 提升亮度；支持 `variant="warning"` 等 | `title`, `actions[]`, `content` |
| `AgentStrip` | 显示 AI 员工状态 | 动效：运行中的呼吸光；点击展开日志 | `id`, `name`, `status`, `tasksInQueue`, `confidence` |
| `CapabilityBadge` | 能力模型标识 | 显示自动化范围、健康度 | `id`, `role`, `health`, `mode` |
| `BattleTimeline` | 事件时间轴 | 节点可点击；支持过滤 | `events[]`（type, title, owner, ts） |
| `StreamingTextPanel` | 流式输出 | 显示 token 动画、暂停/继续、复制 | SSE 文本片段 |
| `TaskBoard` | 看板 | 支持拖拽、列展开、虚拟滚动 | `columns[]`, `tasks[]` |
| `AIThread` | AI 与人工对话 | 标签：系统/人工/AI；支持搜索 | `messages[]` |

### 5.2 动效与提示
- 所有 AI 相关按钮在执行时显示渐变 loading 条；完成后弹出 toast，并在 AI Dock 中记录。  
- 风险/警报卡使用脉冲红光，点击后展开详情 + 解决方案按钮。  
- 拖拽操作若失败（权限/冲突），出现 inline toast 并给出解决建议。  
- 数据空态：提供与角色相关的提示语 + 快速操作按钮。

---

## 6. 数据契约与状态管理

### 6.1 统一接口字段
- `BattleCampaign`: `{id, name, commander, stage, objectives, risks[], capabilityNeeds[], linkedTasks[]}`
- `CapabilityModel`: `{id, role, humanLead, aiVariants[], scope:{auto[], coCreate[], humanOnly[]}, metrics:{accuracy, throughput, handoverRate}, health}`
- `Task`: `{id, title, type, campaignId, capabilityId, aiOwner, humanOwner, mode, priority, status, dueAt, timeline[], handoverReasons[]}`
- `Ally`: `{id, name, roles[], stage, fitScore, capabilityModel, sow, tasks[]}`
- `Insight`: `{id, title, metrics, chainOfThought[], recommendation, linkedCampaign}`

### 6.2 Store 结构示例
```ts
type OrgState = {
  campaigns: BattleCampaign[];
  selectedCampaignId?: string;
  fetchCampaigns: () => Promise<void>;
  updateCampaignPriority: (id: string, priority: number) => void;
};

type WorkflowState = {
  columns: WorkflowColumn[];
  tasks: Record<string, Task>;
  moveTask: (taskId: string, targetColumn: string) => Promise<void>;
  rebalance: () => Promise<void>;
};
```

### 6.3 Mock 流程
1. `GET /api/mock/hq-map` → HQ Map 数据。  
2. `GET /api/mock/sandbox/:campaignId` → 项目沙盘。  
3. `GET /api/mock/workflow`、`PATCH /api/mock/workflow/task/:id`、`POST /api/mock/workflow/rebalance`.  
4. `POST /api/mock/strategy/ai-digest` (SSE)、`PATCH /api/mock/strategy/structure`.  
5. `POST /api/mock/creative/generate` (SSE)、`POST /api/mock/creative/sync-workflow`.  
6. `GET /api/mock/operations/calendar`、`GET /api/mock/allies`, `POST /api/mock/allies/sow`.  
7. `GET /api/mock/knowledge/*`.

---

## 7. 响应式与无障碍
- ≥1440px：默认三列布局；HQ Map 显示完整热力图。  
- 1024-1439px：侧栏简化为图标，HQ Map 改为折叠卡片。  
- 768-1023px：协同空间切换为纵向堆叠；看板改为水平滑动。  
- ≤767px：默认进入任务列表视图 + AI Dock；复杂图表替换为统计卡。  
- ARIA：AI 输出区域使用 `aria-live="polite"`；拖拽目标在键盘上可通过上下左右移动；所有图表提供数据表模式。

---

## 8. 角色落地体验流程

### 8.1 指挥官（登录路径）
1. 登录后进入 HQ Map，查看战役热力 → 点击风险 → 打开 Task Drawer → 下达命令。  
2. 在 Sandbox 中拖动任务 → 指定能力模型 → 生成补给单。  
3. 返回 Workflow，检查待接管任务 → 指定负责人 → 记录接管原因。  
4. 打开 Allied Creators，审批新的联合作战协议 → 同步到 Sandbox。

### 8.2 策略总监
1. 在 Sandbox 中点选策略阶段 → 自动跳转 Strategy Hub 对应策划。  
2. 完成 AI Digest -> Joint Calibration -> Execution Handoff。  
3. Sync Workflow 后，查看 Execution Map 中任务状态，并通过 Task Drawer 留下指令。  
4. 将关键洞察保存至知识库，供下一次策略引用。

### 8.3 创意导演
1. 从 Sandbox 中点击创意阶段 → Creative Studio 打开相关战役画布。  
2. 使用 AI 续写/润色 → 查看版本时间线 → 提交给 Workflow。  
3. 在 Operations Hub 查看发布排期 → 确认与创意输出对齐。  
4. 如遇资源不足，直接在 AI Dock 请求增援或在 Capability Drawer 申请扩编。

### 8.4 运营负责人
1. Operations Hub 查看周历和排期甘特 → 拖动调整 → AI 自动生成建议。  
2. Allied Creators 中查看达人阶段，点击“共创”进入 Workflow 任务。  
3. 在 Execution Map 接管“待确认”任务，填写反馈并同步到 Sandbox。  
4. 复盘后将关键发现推送至 Insight Center。

### 8.5 洞察分析师
1. Insight Center 请求 AI 分析 → 将结果标注为“需人工审核”。  
2. 打开 Task Drawer，查看相关任务交付 → 在 Knowledge Hub 记录复盘。  
3. HQ Map 上发布洞察卡片，提醒相关编组。  
4. 与 Strategy Hub 共享洞察，影响下一次策划。

### 8.6 AI Workforce Lead
1. 组织大脑查看能力模型健康度 → 点击某模型 → 查看接管率与任务样本。  
2. 发起“增派 AI”或“训练任务”，选择数据集与目标指标。  
3. 在 Workflow 中监控新 AI 表现，如接管率过高则提醒真人审核。  
4. 更新模型 scope 并通知相关模块自动刷新。

---

## 9. 实施路径
1. **Stage 1：基础架构**  
   - 搭建全局 Layout、导航、AI Dock、Zustand store、Mock API。  
   - 实现 HQ Map 核心组件与 Sandbox 框架。
2. **Stage 2：Workflow + Strategy + Creative**  
   - 完成 Execution Map + Strategy Hub 全流程 + Creative Studio。  
   - 建立协同空间与 domain 模块的路由联动。
3. **Stage 3：Operations + Insights + Allied Creators + Resource Center**  
   - 实现运营/洞察/盟军/资源模块，打通数据。  
   - 构建 SOW 编辑器、Gantt、雷达图等组件。
4. **Stage 4：AI Workforce + Knowledge Hub + 组织大脑**  
   - 强化能力模型管理、训练流程、知识沉淀。  
   - 完成所有跨模块引用、指令/通知整合。
5. **Stage 5：精细交互与性能优化**  
   - 加入动画、无障碍、响应式优化。  
   - 对 Mock 数据进行 Storybook 演示，准备真实数据接入。

---

此方案为每个角色提供明确入口与交互路径，每个页面、组件、按钮都绑定了能力模型与组织上下文，确保系统真正成为“电子沙盘”。接下来即可按照实施路径逐步落地，实现一个以组织协同为核心的 AI Native 营销系统。***
