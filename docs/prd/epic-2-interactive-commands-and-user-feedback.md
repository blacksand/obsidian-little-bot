# Epic 2: Interactive Commands and User Feedback

**Epic Goal**: Building upon the core engine, implement commands requiring parameter extraction and user interaction (open note, search note), and establish user-friendly feedback and error handling mechanisms to make the Bot's experience more robust and humane.

## Story 2.1 Implementing the Parameter Extraction Engine

- **作为一个 (As a)** "Little Bot" 插件,
- **我想要 (I want)** 解析用户的指令以抽取出预定义的参数（实体）,
- **以便于 (so that)** 我可以为指令执行器提供必需的输入信息。
- **验收标准**:
  1. 引擎能够根据命令模板中的定义，从用户输入中（例如 "打开'我的笔记'"）抽取出简单的字符串参数（例如 "我的笔记"）。
  2. 引擎能够处理更复杂的、包含多个实体的指令。
  3. 参数的抽取规则在基于笔记的命令模板中定义。
  4. 如果找到了参数，它将被传递给相应的指令执行器；如果未找到，则将其标记为缺失。

## Story 2.2 Implementing Smart Parameter Handling (Default Values and Interactive Prompts)

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 当我的指令缺少信息时，“Little Bot”能首先使用我预定义的默认值，只有在没有默认值的情况下才向我提问,
- **以便于 (so that)** 我的工作流能尽可能地无缝和高效。
- **验收标准**:
  1. 当一个指令因为缺少必要的参数而无法执行时，系统 **必须首先检查** 该参数在命令模板中是否定义了 **defaultValue**。
  2. 如果存在 defaultValue，系统将使用该值来补全参数，并 **直接继续执行指令**，不应弹出交互式提示。
  3. **只有在** 必要的参数缺失 **且** 没有定义 defaultValue 的情况下，系统才会向用户显示交互式提示界面。
  4. 交互式提示界面的用户体验（UX）与我们之前在故事板中设计的保持一致。

## Story 2.3 Implementing 'Open Note' and 'Search Note' Commands

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 使用自然语言来打开指定的笔记和执行搜索,
- **以便于 (so that)** 我可以更高效地在我的笔记库中导航。
- **验收标准**:
  1. 打开笔记 指令能够正确地使用参数抽取和交互式提示机制，来获取一个笔记名称，然后在新标签页中打开它。
  2. 搜索笔记 指令能够正确地使用参数抽取和交互式提示机制，来获取一个搜索查询词，然后打开Obsidian的搜索面板并填入该查询。

## Story 2.4 Implementing User-Friendly Error Feedback

- **作为一个 (As a)** 用户,
- **我想要 (I want)** 当我输入一个 "Little Bot" 无法理解的指令时，能收到一条清晰、有帮助的信息,
- **以便于 (so that)** 我能知道出了什么问题以及如何修正我的指令。
- **验收标准**:
  1. 如果初始的自然语言处理无法将用户的输入匹配到任何一个已知的意图，系统会向用户显示一条非技术性的、友好的反馈信息。
  2. 该反馈信息可以包含一些有效的指令示例，以引导用户。
  3. 系统绝对不能向用户显示技术性的错误代码或程序堆栈跟踪。
