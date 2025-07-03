# Little Bot UI/UX Specification

## Introduction

本文档定义了 "Little Bot" 插件的用户体验目标、信息架构、用户流程和视觉设计规范。它将作为视觉设计和前端开发的基石，以确保我们创造出一个内聚的、以用户为中心的、高效且专业的体验。

### Overall UX Goals & Principles

#### Target User Personas

- **效率型进阶用户 (The Power User)**: 熟悉 Obsidian，希望通过自然语言最大化工作效率，减少记忆和使用脚本的负担。
- **任务驱动型用户 (The Task-Oriented User)**: 非技术背景，希望插件能直观地帮助他们完成任务，而不必关心底层技术细节。

#### Usability Goals

- **速度**: 用户从激活 "Little Bot" 到完成一个指令的平均时间应尽可能短。
- **清晰度**: 交互界面必须一目了然，用户无需阅读说明文档即可理解如何使用。
- **可发现性**: 用户应能轻松发现插件的功能，例如通过清晰的建议列表。
- **低认知负荷**: 用户在与 Bot 交互时，应感觉流畅自然，无需过多思考。

#### Design Principles

1. **清晰第一 (Clarity First)**: 任何时候，清晰的沟通都优先于视觉上的花哨。界面元素应服务于功能，而不是分散注意力。
2. **无缝流程 (Frictionless Flow)**: 交互应被设计为尽可能地减少步骤和中断。优先使用默认值，只在绝对必要时才向用户请求输入。
3. **原生体验 (Native Feel)**: 插件的视觉风格必须与用户当前的 Obsidian 主题无缝集成，使其感觉像是 Obsidian 的一部分，而非一个外来应用。
4. **智能辅助 (Intelligent Assistance)**: 界面应体现出“智能”，例如通过提供上下文相关的建议列表，预测用户的需求。

### Change Log

| Date       | Version | Description              | Author     |
| :--------- | :------ | :----------------------- | :--------- |
| 2025-07-03 | 1.0     | Initial UX/UI Spec draft | Sally (UX) |

## Information Architecture (IA)

### Activation & Presentation

"Little Bot" 的核心交互发生在一个上下文感知的“指令面板”中。这个面板被设计为对用户当前工作流程的最小化干扰，并且其呈现方式会根据设备屏幕尺寸进行智能适配。

- **桌面端 (Desktop)**: 在较宽的屏幕上，指令面板会以一个浮动面板 (Floating Panel) 的形式，直接在当前光标行的上方优雅地出现，以保持编辑的上下文。
- **移动端 (Mobile)**: 在较窄的屏幕上，为了应对虚拟键盘和有限的空间，指令面板将以一个模态窗口的形式，固定在屏幕顶部，占据大部分屏幕宽度，以确保所有内容和建议列表都清晰可见。

graph TD
subgraph "用户当前笔记"
A("...笔记内容...")
end

    A \-- "通过快捷键或命令激活" \--\> B{Little Bot 指令面板};

    subgraph "呈现方式"
        C\["桌面端: 在光标上方浮动"\]
        D\["移动端: 固定在屏幕顶部"\]
    end

    B \--\> C;
    B \--\> D;

    C \-- "执行或退出" \--\> A
    D \-- "执行或退出" \--\> A

    style B fill:\#f9f,stroke:\#333,stroke-width:2px

### Dimensions & Responsiveness

- **桌面端 (屏幕宽度 \> 768px)**:
  - 面板具有一个固定的**最大宽度**（例如 max-width: 600px），以确保在宽屏上布局不会过分拉伸。
  - 高度是动态的，根据建议列表的内容平滑伸缩。
- **移动端 (屏幕宽度 \<= 768px)**:
  - 面板的宽度将是流体的，例如占据视窗宽度的 90% (width: 90vw)，并在两侧留有少量边距。
  - 高度同样是动态的，但可能会有一个最大高度（例如 max-height: 50vh），以防止其占据整个屏幕。
  - 所有交互元素（如列表项）都将有足够大的触摸目标区域，以方便点选。

### Layout & Components

指令面板的内部布局遵循极简和功能导向的原则。

1. **指令输入框 (Command Input)**: 这是面板的核心和视觉焦点。它是一个干净、无边框的输入区域，包含清晰的、引导性的 placeholder 文本。
2. **上下文提示区 (Contextual Hint Area)**: 位于输入框正上方的一个小文本区域。此区域通常是隐藏的，只在需要向用户提供额外引导时才会显示。
3. **建议列表 (Suggestions List)**: 一个在输入框下方动态出现的列表。每个列表项都经过精心设计，以传递最大信息量并提升操作效率。
   - **布局**: 每个列表项都包含三个部分：\[图标\] \[建议的文本\] \[快捷键提示\]。
   - **动态快捷键**: 列表中的前9个项目将被动态分配一个临时快捷键（Alt+1 到 Alt+9，在macOS上为 Opt+1 到 Opt+9）。

**示例列表项**:

| 图标 | 建议文本           | 快捷键提示 |
| :--- | :----------------- | :--------- |
| 🔍   | 搜索笔记           | Alt+1      |
| 📄   | 打开'我的项目'笔记 | Alt+2      |
| 📅   | 插入今天的日期     | Alt+3      |

## User Flows

### 核心交互流程：处理模糊指令

**用户目标**: 用户输入了一个不完整的指令（例如“显示我的任务”），并期望系统能智能地帮助他完成。

**流程图**:

```mermaid
sequenceDiagram
participant User as 用户
participant BotUI as 指令面板 (UI)
participant Engine as 核心引擎
participant NLP as NLP模块
participant Template as 命令模板 (笔记)
participant Obsidian as Obsidian API

    User-\>\>BotUI: 激活 Little Bot (例如, Cmd+K)
    User-\>\>BotUI: 输入 "显示我的任务"
    BotUI-\>\>Engine: 发送用户输入
    Engine-\>\>NLP: 请求解析输入
    NLP--\>\>Engine: 返回结果: {意图: "list\_tasks", 实体: {}}
    Engine-\>\>Template: 查找 "list\_tasks" 意图的定义
    Template--\>\>Engine: 返回定义: 需要参数 "来源" 和 "过滤条件"
    Engine-\>\>Template: 检查 "来源" 和 "过滤条件" 是否有默认值
    Template--\>\>Engine: 返回结果: 无默认值
    Engine-\>\>BotUI: 指示: 缺少参数，请向用户提问
    BotUI-\>\>User: 显示交互式提示界面 (含建议列表)
    User-\>\>BotUI: 从建议列表中选择 "本周未完成任务"
    BotUI-\>\>Engine: 发送用户选择，补全参数
    Engine-\>\>Obsidian: 执行最终指令 (生成 Dataview 代码块)
    Obsidian--\>\>BotUI: 操作成功
    BotUI-\>\>User: 关闭面板，显示结果
```

### Error Handling & Feedback

- **原则**: 即便指令本身有效，但在执行阶段失败时（例如，找不到指定的笔记），系统也必须向用户提供清晰、非技术性的反馈。
- **实现方式**:
  1. 当 "Little Bot" 尝试执行一个操作但失败时，核心引擎会捕获这个错误。
  2. 系统将通过一个 **非侵入式的 Toast 通知** 来显示一条简洁、友好的错误信息。
  3. **推荐实现**: 我们将使用 shadcn/ui 的 Sonner **组件** 来实现这些 Toast 通知，以确保视觉风格和交互体验与我们的整体设计保持一致。
- **错误信息示例**:
  - **对于** 打开笔记 **失败**: 一个 Toast 通知会从屏幕角落滑出，显示：“抱歉，我找不到名为‘一篇不存在的笔记’的笔记。请检查名称是否正确。”

## Component Library / Design System

### Core Component Selection

为了实现一个高效、专业且具有原生感的指令面板，我们将基于 **shadcn/ui 的** Command **组件** 进行构建。这个选择是基于以下几点考虑：

- **功能完备性**: 该组件提供了我们所需的核心交互模式，包括即时搜索、键盘导航（↑, ↓, Enter）以及分组显示。
- **设计一致性**: 我们可以通过CSS变量轻松地将该组件的视觉风格与用户的Obsidian主题进行深度集成，实现原生体验。
- **可访问性**: 该组件内置了良好的可访问性支持，满足了键盘操作要求。

### Styling Approach

为了确保最大程度的一致性、可维护性并与 shadcn/ui 生态系统保持一致，所有样式**必须**通过 **Tailwind CSS v4 工具类** 来实现。

- **核心原则**: 开发者**必须避免**编写自定义的CSS文件或使用内联 style 属性来进行布局和设计。所有的视觉表现都应通过组合Tailwind的工具类来达成。

### Color Palette & Theming

- **核心原则**: 所有颜色值**必须**从用户当前 Obsidian 主题提供的 CSS 变量中获取。**严禁在代码中硬编码任何颜色值**。
- **实现方式 (Tailwind v4)**: 开发者需要在项目的核心 CSS 文件（例如 global.css）中，使用 @theme 指令来定义与 Obsidian 主题变量相关联的自定义颜色。tailwind.config.js 文件将保持最小化配置。

**配置示例 (global.css):**

```example
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer theme {
  @theme {
    colors: {
      background: hsl(var(--background-primary)),
      foreground: hsl(var(--text-normal))
      primary: {
        DEFAULT: hsl(var(--interactive-accent)),
        foreground: hsl(var(--text-on-accent))
      },
      secondary: {
        DEFAULT: hsl(var(--background-secondary)),
        foreground: hsl(var(--text-muted))
      },
      accent: {
        DEFAULT: hsl(var(--interactive-accent-hover)),
        foreground: hsl(var(--text-on-accent))
      }
      /* ... 映射其他所有需要的颜色，例如 --background-modifier-border ... */
    }
  }
}
```

### Implementation Notes

- 我们将使用 shadcn/ui 的 Command 组件作为 "Little Bot" 指令面板的基础。
- 我们将扩展其功能，以支持我们独特的特性，例如集成图标和处理动态的临时快捷键。
- 根据本规范进行响应式布局调整。
