# Repository Guidelines

## Project Structure & Module Organization
- 根目录包含 `docs/`（产品与交互说明）与 `frontend/`（Next.js 代码）。  
- 前端源码在 `frontend/src/`，按领域拆分：`components/`（可复用 UI）、`app/`（应用路由与页面）、`data/mock/`（演示用 Mock 数据）、`types/`（共享 TypeScript 类型）。  
- 静态资源位于 `frontend/public/`，文档或示意图更新请同步到 `docs/`，保持设计与实现一致。

## Build, Test, and Development Commands
- `npm run dev`：启动 Turbopack 开发服务器，默认监听 http://localhost:3000。  
- `npm run build`：编译生产包，务必在提交前确保无构建错误。  
- `npm run start`：以生产模式启动已编译的前端。  
- `npm run lint`：运行 ESLint；提交前必须通过，用于捕捉语法与风格问题。

## Coding Style & Naming Conventions
- 代码使用 TypeScript + React。组件采用 PascalCase 文件与导出命名（如 `TaskPulse.tsx`），工具函数与 hooks 采用 camelCase。  
- Tailwind classes 与 `cn()` 辅助组合时，请按布局→视觉→互动的顺序书写，便于 diff。  
- 统一使用 2 空格缩进（遵循项目 ESLint/Next.js 默认）。必要时添加简介明了的注释解释复杂逻辑或设计意图。

## Testing Guidelines
- 当前项目以演示为主，尚未配置自动化测试；如引入关键业务逻辑，建议使用 Vitest + React Testing Library，新测试文件放置于与组件同层的 `__tests__/` 目录。  
- 在提交中包含新增测试的运行说明（例如自定义 `npm test` 脚本），并确保 `npm run lint` 无误。  
- 对交互式变更，提供手动验证步骤或录屏链接，便于评审。

## Commit & Pull Request Guidelines
- 历史提交采用简短的祈使句（例如 “init project”）。继续保持：首字母小写、无需前缀；若团队约定 Conventional Commits，可在 PR 说明里标注类型。  
- PR 描述需覆盖变更目的、关键实现点、验证方式（命令或截图），以及更新的文档或 Mock 数据路径。  
- 关联 Issue 或需求任务时在描述末尾附 `Closes #123`，并在 UI 变更时附上截图/动图，确保评审者快速理解效果。  
- 合并前确认 CI（若有）、`npm run build` 与 `npm run lint` 均通过。
