# 2. High Level Architecture

## 2.1. Technical Summary

"Little Bot" 的前端架构是一个嵌入在Obsidian插件环境中的、高度优化的单页应用（SPA）界面。该架构的核心是基于 **shadcn/ui** 和 **Tailwind CSS v4** 构建的一个响应式、上下文感知的命令面板。它将采用组件化的设计模式，并通过一个清晰的事件和服务层与插件的后端逻辑（如NLP引擎和指令执行器）进行通信，实现前后端逻辑的解耦。

## 2.2. High Level Project Diagram

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

## 2.3. Architectural and Design Patterns

- **组件化架构 (Component-Based Architecture)**: 严格遵循组件化的开发模式，将UI拆分为独立的、可重用的部分。

* **本地优先 (Local-First)**: MVP版本的所有核心UI逻辑和状态管理都将在客户端本地运行。
* **依赖注入 (Dependency Injection)**: 我们将全面采用 **Effect-TS** (https://effect.website/) 作为依赖注入和副作用管理的核心框架。核心服务将在 `packages/core` 中通过 `Context.Tag` 定义接口，并在具体的功能包中提供实现，以实现松耦合和高可测试性。
