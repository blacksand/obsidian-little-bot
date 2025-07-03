# **Little Bot Final Architecture Document**

## **1. Introduction**

本文档详细阐述了 "Little Bot" 插件的前端技术架构。它基于PRD和UI/UX规范，为开发者（包括AI代理）提供实现一个高效、专业且可维护的用户界面所需的具体蓝图和技术准则。

### 1.1. Change Log

| Date       | Version | Description                | Author              |
| :--------- | :------ | :------------------------- | :------------------ |
| 2025-07-03 | 1.0     | Initial architecture draft | Winston (Architect) |

## 2. High Level Architecture

### 2.1. Technical Summary

"Little Bot" 的前端架构是一个嵌入在Obsidian插件环境中的、高度优化的单页应用（SPA）界面。该架构的核心是基于 **shadcn/ui** 和 **Tailwind CSS v4** 构建的一个响应式、上下文感知的命令面板。它将采用组件化的设计模式，并通过一个清晰的事件和服务层与插件的后端逻辑（如NLP引擎和指令执行器）进行通信，实现前后端逻辑的解耦。

### 2.2. High Level Project Diagram

graph TD
subgraph "Phase 1: Plugin Initialization (on Obsidian startup)"
Init_Engine[Core Engine] -->|Uses| DV[Dataview Plugin API]
DV -->|Finds notes with 'type:: command-template'| CT[Command Templates (Notes)]
CT -->|Loads definitions into| Init_Engine
note over Init_Engine "指令定义被加载并缓存"
end

    subgraph "Phase 2: User Interaction"
        A[User in Editor]
        D[Command Palette (UI)]
        E[Core Engine]
        F[NLP Module]
        B[Obsidian API]
    end

    Init_Engine -.-> E

    A -- "Activates (Cmd+K)" --> D
    D -- "Sends input" --> E
    E -- "Uses cached definitions & NLP" --> F
    F -- "Returns intent/entities" --> E
    E -- "Executes action via" --> B
    B -- "Updates editor" --> A

    style D fill:#ccf

### 2.3. Architectural and Design Patterns

- **组件化架构 (Component-Based Architecture)**: 严格遵循组件化的开发模式，将UI拆分为独立的、可重用的部分。

* **本地优先 (Local-First)**: MVP版本的所有核心UI逻辑和状态管理都将在客户端本地运行。
* **依赖注入 (Dependency Injection)**: 核心服务将被设计为可注入的依赖项，以实现松耦合和高可测试性。

## 3. Frontend Tech Stack

| Category                 | Technology            | Version   | Purpose                   | Rationale                                                      |
| :----------------------- | :-------------------- | :-------- | :------------------------ | :------------------------------------------------------------- |
| **语言 (Language)**      | TypeScript            | ~5.4.0    | 提供类型安全，减少错误    | 与Obsidian插件开发生态兼容，提升代码质量和可维护性。           |
| **框架 (Framework)**     | React                 | ~18.2.0   | 构建用户界面的核心库      | shadcn/ui 基于React构建，拥有庞大的生态和社区支持。            |
| **Monorepo 编排器**      | Nx                    | ~19.0.0   | 智能任务运行与缓存        | 为复杂的monorepo提供依赖关系图分析和高效的任务编排。           |
| **插件构建工具**         | @nx/esbuild           | latest    | 构建和打包整个插件        | 极快的构建速度，将所有包的源码打包成Obsidian所需的单一JS文件。 |
| **UI 组件库**            | shadcn/ui             | latest    | 构建指令面板的核心组件    | 美观、可访问性好，且基于Tailwind。                             |
| **样式方案 (Styling)**   | Tailwind CSS          | v4.0-beta | 实现所有UI样式            | 通过@theme指令能更好地与Obsidian主题集成。                     |
| **测试框架 (Testing)**   | Vitest                | ~1.6.0    | 对所有包进行单元/组件测试 | 与TypeScript和React无缝集成，性能出色。                        |
| **测试库 (Testing Lib)** | React Testing Library | ~15.0.0   | 模拟用户交互，测试组件    | 鼓励编写面向用户行为的测试，确保组件的健壮性。                 |
| **包管理器**             | pnpm                  | ~9.1.0    | 依赖管理                  | 速度快，节省磁盘空间，并与Nx monorepo协同工作。                |

## 4. Engineering Practices & Project Setup

### 4.1. Project Structure (Monorepo)

我们将采用由 **Nx** 编排的 **pnpm monorepo** 结构，以实现最大程度的模块化、可测试性和可维护性。

/obsidian-plugin-little-bot
|-- /apps
| |-- /little-bot/ # Obsidian 插件的核心应用
| |-- /storybook/ # Storybook 应用，用于 UI 组件预览与测试
|-- /packages
| |-- /config-eslint/ # 共享的 ESLint 配置
| |-- /config-tailwind/ # 共享的 Tailwind CSS 配置
| |-- /config-testing/ # 共享的测试配置 (Vitest, Playwright)
| |-- /commands/ # 核心命令解析与管理逻辑
| |-- /nlp/ # 自然语言处理核心逻辑
| |-- /obsidian-mock/ # Obsidian API 的模拟库，用于测试
| |-- /ui/ # 共享 UI 组件库 (基于 shadcn/ui)
| |-- /utils/ # 通用工具函数 (将包含 logger)
| |-- /.../ # 其他功能包
|-- nx.json
|-- pnpm-workspace.yaml
|-- package.json

### 4.2. Internal API Contract & Module Boundaries

为了保证代码库的长期健康，我们将通过 **Nx 的 ESLint 规则 nx/enforce-module-boundaries** 来严格执行内部包之间的依赖关系。

- **核心原则**: UI 层只与 commands 包通信，commands 包作为编排器调用其他底层包。

### 4.3. State Management Philosophy

- **核心原则**: **避免使用全局状态管理库**。
- **实现方式**: 优先使用组件本地状态 (useState)，当状态需要在多个组件间共享时，使用 **React Context**。

### 4.4. Developer Experience & Scaffolding

- **核心原则**: 通过自动化工具提升开发效率和代码一致性。
- **实现方式**: 我们将开发一个**自定义的 Nx 插件 (Generator)**，用于自动化地创建符合我们所有规范的新模块和组件。

### 4.5. CI/CD and Release Workflow

- **核心原则**: 采用现代化的、自动化的流程来管理版本和发布。
- **实现方式**:
  1. **提交规范**: 所有 git commit **必须**遵循 **Conventional Commits** 规范。
  2. **版本与发布**: 使用 **nx release** 命令来自动化版本管理。
  3. **持续集成 (CI/CD)**: **GitHub Actions** 将被用于自动化测试、构建和发布流程。

## 5. Logging Strategy

为了在开发过程中获得强大的调试能力，同时严格遵守Obsidian插件的发布规范，我们将实现一个灵活的、环境感知的日志记录系统。

- **核心原则**: **严禁**在最终发布的生产版本代码中包含任何 console.log 调用。
- **实现方式**:
  1. 我们将在 packages/utils 中创建一个专用的 logger 模块。
  2. 该模块将提供多个日志级别，例如 logger.debug(), logger.info(), logger.warn(), logger.error()。
  3. 所有对 console 的调用都将包含在条件块中，该条件块会检查 process.env.NODE_ENV 的值。

     ```typescript
     // packages/utils/logger.ts
     export const logger = {
       debug: (message: string, ...args: any[]) => {
         if (process.env.NODE_ENV === 'development') {
           console.debug(`[Little Bot Debug]: ${message}`, ...args)
         }
       },
       // ... 其他级别
     }
     ```

  4. **死代码消除**: 在生产构建时（NODE_ENV 为 'production'），@nx/esbuild 构建工具会自动将这些 if 代码块（包括其中的 console 调用）从最终的 main.js 文件中完全移除。

- **好处**:
  - **开发时**: 开发者可以自由使用 logger.debug() 来输出详细的调试信息。
  - **发布时**: 最终产物干净、合规，不含任何控制台日志。
