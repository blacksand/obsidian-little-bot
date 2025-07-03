# Little Bot Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- 通过自然语言指令简化并自动化复杂的工作流程。
- 提供由用户个人笔记驱动的、高度个性化的AI自动完成建议。
- 集成远程大型语言模型（LLM）以执行高级文本生成任务（如摘要、扩写）。
- 作为其他强大插件（如Dataview）的智能编排中心，降低其使用门槛。
- 在发布后6个月内实现50,000次下载，并将30天用户留存率维持在40%以上。

### Background Context

目前，Obsidian 的强大功能很大程度上依赖于像 Templater 和 Dataview 这样的可扩展插件。然而，这些工具往往需要用户投入时间学习特定的语法和脚本知识，这为许多非技术背景或追求快速迭代的用户设立了无形的门槛。

"Little Bot" 的核心价值在于，它在用户和这些复杂系统之间创建了一个智能对话层。它旨在将用户的自然语言“意图”无缝地“翻译”成机器可执行的命令，从而让所有用户都能享受到高级工作流带来的效率提升。

### Change Log

| Date       | Version | Description                                          | Author    |
| :--------- | :------ | :--------------------------------------------------- | :-------- |
| 2025-07-03 | 1.1     | Added NFRs for accessibility and visual consistency. | John (PM) |
| 2025-07-03 | 1.0     | Initial PRD draft                                    | John (PM) |

## Requirements

### Functional

- **FR1**: 系统必须能够解析用户的自然语言输入，以从一个预定义列表 (打开笔记, 搜索笔记, 插入日期) 中识别出用户的意图。
- **FR2**: 系统必须能从自然语言输入中抽取出执行意图所必需的参数（实体），例如笔记名称或搜索关键词。
- **FR3**: 如果一个意图所必需的参数在初始指令中缺失，系统必须能够以交互方式提示用户输入缺失的信息。
- **FR4**: 在收集到所有必需的参数后，系统必须能够调用对应的Obsidian API来执行操作（例如，打开一个新标签页来展示笔记，或在搜索栏填入关键词并执行搜索）。
- **FR5**: 当系统无法将用户的输入识别为任何一个已知的意图时，必须提供一个用户友好的反馈（例如，“抱歉，我暂时无法理解这个指令，您可以试试‘打开笔记’或‘搜索’等”），而不是静默失败或显示技术性错误。

### Non Functional

- **NFR1**: 插件的后台进程（如指令监听）不能对Obsidian应用的UI流畅度（例如打字、滚动）造成可感知的性能下降。
- **NFR2**: MVP版本的所有指令处理（意图识别和实体抽取）必须完全在用户本地设备上运行，不依赖网络连接。
- **NFR3**: 对于模糊指令的交互式提示，其响应时间必须在200毫秒以内，以保证即时感。
- **NFR4**: 插件必须声明其兼容的Obsidian版本，并确保在这些版本中稳定运行。
- **NFR5**: 交互式提示界面必须支持完整的键盘操作（例如，使用上下箭头选择建议，使用回车键确认）。
- **NFR6**: 插件的UI组件（如提示框、建议列表）必须在视觉上适配用户当前的Obsidian主题，以确保原生一致的体验。

## Epics

### High-Level Epic Structure

- **Epic 1: 核心引擎与基础指令**: 建立插件的基础框架和核心指令解析引擎，并交付第一个无需交互的指令（插入日期），以验证端到端的执行流程。
- **Epic 2: 交互式指令与用户反馈**: 在核心引擎的基础上，实现需要参数提取和用户交互的指令（打开笔记，搜索笔记），并建立用户友好的反馈与错误处理机制。

## Epic 1: Core Engine and Basic Commands

**Epic Goal**: Establish the plugin's foundational framework and core command parsing engine, delivering the first non-interactive command (insert date) to validate the end-to-end execution flow.

### Story 1.1 Loading and Parsing Note-Based Command Templates

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 在一篇或多篇普通的 Obsidian 笔记中定义我的 "Little Bot" 指令,
- **以便于 (so that)** 我可以使用我熟悉的笔记和 Dataview 语法来轻松地查看和管理我的自定义指令。
- **验收标准**:
  1. 插件启动时必须检查 Dataview 插件是否已安装并启用。如果未启用，应在插件设置中或通过通知(Notice)提醒用户，"Little Bot" 的指令功能需要 Dataview 插件。
  2. 插件启动后，使用 Dataview API 查找所有包含特定属性（例如 type:: command-template）的笔记。
  3. 插件必须能够解析这些笔记中的内容（例如，一个特定语言的代码块或 frontmatter区域）来抽取出意图和参数的定义。
  4. 系统必须能够优雅地处理找到多篇命令模板笔记的情况，例如将所有定义合并在一起。
  5. 如果某一篇命令模板笔记中存在语法错误，插件应跳过该笔记的加载，并在开发者控制台记录一条清晰、用户友好的错误信息，指出是哪一篇笔记出了问题。

### Story 1.2 Implementing the "Insert Date" Command Executor

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 当我的“插入日期”意图被识别时，系统能在我的光标位置插入当前日期,
- **以便于 (so that)** 我可以快速地为我的笔记添加时间戳。
- **验收标准**:
  1. 系统内存在一个函数或模块，当被调用时，能够获取当前的日期。
  2. 日期会根据一个预定义的默认格式（例如 YYYY-MM-DD）进行格式化。
  3. 格式化后的日期字符串被正确地插入到当前激活的编辑器中的光标所在位置。

### Story 1.3 Connecting the Core Intent Engine with Individual Commands

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 当我输入用于插入日期的指令时，“Little Bot”的引擎能够识别出该意图并触发正确的操作,
- **以便于 (so that)** 我的指令能够被成功执行。
- **验收标准**:
  1. 系统能够通过一种方式（例如，一个命令面板中的命令）来接收用户的输入。
  2. 当用户的输入与“插入日期”意图的模式（来源于已解析的模板文件）相匹配时，系统能够正确地识别出该意图。
  3. Story 1.2 中定义的“插入日期”指令执行器被成功调用。
  4. 从用户输入到日期成功插入的整个端到端流程是功能完备且可测试的。

## Epic 2: Interactive Commands and User Feedback

**Epic Goal**: Building upon the core engine, implement commands requiring parameter extraction and user interaction (open note, search note), and establish user-friendly feedback and error handling mechanisms to make the Bot's experience more robust and humane.

### Story 2.1 Implementing the Parameter Extraction Engine

- **作为一个 (As a)** "Little Bot" 插件,
- **我想要 (I want)** 解析用户的指令以抽取出预定义的参数（实体）,
- **以便于 (so that)** 我可以为指令执行器提供必需的输入信息。
- **验收标准**:
  1. 引擎能够根据命令模板中的定义，从用户输入中（例如 "打开'我的笔记'"）抽取出简单的字符串参数（例如 "我的笔记"）。
  2. 引擎能够处理更复杂的、包含多个实体的指令。
  3. 参数的抽取规则在基于笔记的命令模板中定义。
  4. 如果找到了参数，它将被传递给相应的指令执行器；如果未找到，则将其标记为缺失。

### Story 2.2 Implementing Smart Parameter Handling (Default Values and Interactive Prompts)

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 当我的指令缺少信息时，“Little Bot”能首先使用我预定义的默认值，只有在没有默认值的情况下才向我提问,
- **以便于 (so that)** 我的工作流能尽可能地无缝和高效。
- **验收标准**:
  1. 当一个指令因为缺少必要的参数而无法执行时，系统 **必须首先检查** 该参数在命令模板中是否定义了 **defaultValue**。
  2. 如果存在 defaultValue，系统将使用该值来补全参数，并 **直接继续执行指令**，不应弹出交互式提示。
  3. **只有在** 必要的参数缺失 **且** 没有定义 defaultValue 的情况下，系统才会向用户显示交互式提示界面。
  4. 交互式提示界面的用户体验（UX）与我们之前在故事板中设计的保持一致。

### Story 2.3 Implementing 'Open Note' and 'Search Note' Commands

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 使用自然语言来打开指定的笔记和执行搜索,
- **以便于 (so that)** 我可以更高效地在我的笔记库中导航。
- **验收标准**:
  1. 打开笔记 指令能够正确地使用参数抽取和交互式提示机制，来获取一个笔记名称，然后在新标签页中打开它。
  2. 搜索笔记 指令能够正确地使用参数抽取和交互式提示机制，来获取一个搜索查询词，然后打开Obsidian的搜索面板并填入该查询。

### Story 2.4 Implementing User-Friendly Error Feedback

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 当我输入一个 "Little Bot" 无法理解的指令时，能收到一条清晰、有帮助的信息,
- **以便于 (so that)** 我能知道出了什么问题以及如何修正我的指令。
- **验收标准**:
  1. 如果初始的自然语言处理无法将用户的输入匹配到任何一个已知的意图，系统会向用户显示一条非技术性的、友好的反馈信息。
  2. 该反馈信息可以包含一些有效的指令示例，以引导用户。
  3. 系统绝对不能向用户显示技术性的错误代码或程序堆栈跟踪。

## Checklist Results Report

产品需求文档（PRD）已由产品经理（PM）使用 pm-checklist 进行了全面验证。所有部分均已“通过”或“基本通过”。文档在问题定义、MVP范围界定、功能性和非功能性需求、以及史诗和故事结构方面表现出色。已确认PRD为后续的UX设计和架构阶段提供了坚实的基础。
