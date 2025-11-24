# CLAUDE.md 指南

本文件旨在为 Claude Code (claude.ai/code) 在处理本代码库中的代码时提供指导。

## 项目概述

IntelliM (智能营销中心) 是一个基于 React + TypeScript + Vite 的现代前端项目，专注于营销自动化和智能分析功能。

## 开发命令

### 启动开发服务器
```bash
npm run dev
```
项目默认运行在 http://localhost:5173

### 构建项目
```bash
npm run build
```

### 代码质量检查
```bash
# ESLint 检查
npm run lint

# Prettier 格式化
npm run format
```

### 预览构建结果
```bash
npm run preview
```

## 项目架构

### 技术栈
- **前端框架**: React 18.2.0 + TypeScript
- **构建工具**: Vite 5.1.4
- **UI组件**: Ant Design 5.14.0
- **图表库**: Recharts 2.12.2
- **状态管理**: 基于 React Hooks 的本地状态管理
- **路由**: React Router DOM 6.22.2

### 核心架构模式
1. **组件化架构**: 采用函数组件 + Hooks 模式
2. **模块化设计**: 按功能域划分组件（auth、dashboard、marketing等）
3. **类型安全**: 全面使用 TypeScript 进行类型约束
4. **响应式设计**: 基于 CSS Grid 和 Flexbox 的布局系统

### 目录结构关键说明

```
src/
├── components/          # 通用UI组件
│   ├── ui/             # 基础UI组件（Button、Card、Input等）
│   ├── layout/         # 布局相关组件（Header、Sidebar等）
│   └── charts/         # 图表组件
├── features/           # 功能域组件（按业务模块划分）
│   ├── auth/          # 认证相关
│   ├── dashboard/     # 仪表板
│   ├── marketing/     # 营销功能
│   └── analytics/     # 数据分析
├── hooks/             # 自定义Hooks
├── lib/               # 工具库和配置
├── types/             # TypeScript类型定义
└── data/              # 模拟数据和静态数据
```

### 设计系统

#### 1. UI组件库
- **基础组件**: `/src/components/ui/` - 包含Button、Card、Input、Modal等基础组件
- **复合组件**: 基于Ant Design封装的业务组件
- **主题系统**: 支持亮色/暗色主题切换

#### 2. 图表系统
- 使用 Recharts 构建统一的数据可视化组件
- 支持响应式图表和主题适配
- 位于 `/src/components/charts/`

#### 3. 状态管理模式
- 使用 React Context 进行全局状态管理（主题、用户状态等）
- 本地状态优先使用 useState 和 useReducer
- 数据获取使用自定义 Hooks（如 useAuth、useTasks）

### 开发约定

#### 组件开发规范
1. 使用函数组件 + TypeScript
2. Props 接口以 `Props` 结尾（如 `ButtonProps`）
3. 组件文件使用 PascalCase 命名
4. 导出默认组件，按需导出类型和工具函数

#### 代码风格
- 使用 Prettier 进行代码格式化
- ESLint 进行代码质量检查
- 组件内部优先使用 CSS Modules 或 styled-components

#### 路由结构
- 基于 React Router 的嵌套路由
- 路由配置集中在 `/src/router/`
- 支持路由级别的代码分割和懒加载

### 数据层设计

#### 类型定义
- 全局类型定义在 `/src/types/`
- 组件特定类型定义在组件文件内部
- API 响应类型统一管理

#### 数据获取模式
- 使用自定义 Hooks 封装数据获取逻辑
- 模拟数据存储在 `/src/data/` 用于开发阶段
- 支持加载状态、错误处理和缓存机制

## 开发工作流

### 新功能开发
1. 在 `/src/features/` 对应模块下创建组件
2. 定义 TypeScript 接口和类型
3. 创建对应的自定义 Hooks（如需要）
4. 更新路由配置（如需要）
5. 添加模拟数据进行测试

### 组件复用
- 优先使用 `/src/components/ui/` 中的基础组件
- 业务组件按功能域在 `/src/features/` 中复用
- 跨功能域的通用组件提升到 `/src/components/`

### 主题和样式
- 使用 CSS 变量实现主题系统
- 响应式断点: mobile (<768px), tablet (768px-1024px), desktop (>1024px)
- 组件样式优先考虑 CSS-in-JS 或 CSS Modules

## 注意事项

- 项目使用相对路径导入（避免绝对路径配置复杂性）
- 所有 UI 文本内容应使用中文
- 图标使用 Ant Design 的图标系统
- 表单验证使用 React Hook Form 或 Ant Design Form
- 数据表格使用 Ant Design Table 组件